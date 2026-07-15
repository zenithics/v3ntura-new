import type Stripe from 'stripe'
import type { Payload } from 'payload'
import { sendOrderEmail } from '@/utilities/emails'
import { calculateTax, getTaxConfig } from '@/utilities/tax'
import {
  sendMetaCapi,
  sendTiktokEvent,
  sendRedditConversion,
  sendGadsConversion,
  sendPinterestConversion,
} from '@/lib/adConversions'

function generateOrderNumber(): string {
  const date = new Date()
  const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '')
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `ORD-${dateStr}-${rand}`
}

interface NormalisedAddress {
  line1: string
  line2: string
  city: string
  county: string
  postcode: string
  country: string
}

interface OrderPaymentData {
  cartItems: any[]
  customerEmail: string
  customerName: string
  shippingAddress?: NormalisedAddress | null
  stripePaymentIntentId?: string
  stripeSessionId?: string
  stripeCustomerId?: string
  discountCode?: string | null
  discountAmount?: number | null
  shippingCost?: number | null
}

/**
 * Core order-creation logic shared by both Checkout Session and Payment Intent flows.
 */
async function createOrderFromPayment(data: OrderPaymentData, payload: Payload): Promise<void> {
  const {
    cartItems,
    customerEmail,
    customerName,
    shippingAddress,
    stripePaymentIntentId,
    stripeSessionId,
    stripeCustomerId,
    discountCode,
    discountAmount,
    shippingCost,
  } = data

  // Find or create customer record
  let customer
  const existingCustomers = await payload.find({
    collection: 'customers',
    where: { email: { equals: customerEmail } },
    limit: 1,
  })

  if (existingCustomers.docs.length > 0) {
    customer = existingCustomers.docs[0]
  } else {
    customer = await payload.create({
      collection: 'customers',
      data: { email: customerEmail, name: customerName, stripeCustomerId },
    })
  }

  // Build order items and update stock/ticket counts
  const orderItems = []
  const itemTaxClasses: string[] = []

  for (const cartItem of cartItems) {
    if (cartItem.type === 'product') {
      const product = await payload.findByID({ collection: 'products', id: cartItem.productId })

      if (product) {
        const variant = cartItem.variantName
          ? product.variants?.find((v: any) => v.name === cartItem.variantName)
          : null
        const unitPrice = (variant as any)?.priceOverride ?? variant?.price ?? product.price

        orderItems.push({
          product: cartItem.productId,
          variantName: cartItem.variantName || undefined,
          quantity: cartItem.quantity,
          unitPrice,
          lineTotal: unitPrice * cartItem.quantity,
          productTitle: product.title,
        })
        itemTaxClasses.push((product as any)?.taxClass || 'standard')

        if (product.trackStock) {
          await payload.update({
            collection: 'products',
            id: cartItem.productId,
            data: { stock: Math.max(0, (product.stock || 0) - cartItem.quantity) },
          })
        }
      }
    } else if (cartItem.type === 'ticket') {
      const event = await payload.findByID({ collection: 'events', id: cartItem.eventId })

      if (event) {
        const ticketType = event.ticketTypes?.find(
          (t: any) => t.name === cartItem.ticketTypeName,
        )

        orderItems.push({
          product: cartItem.eventId,
          variantName: `Ticket: ${cartItem.ticketTypeName}`,
          quantity: cartItem.quantity,
          unitPrice: ticketType?.price || 0,
          lineTotal: (ticketType?.price || 0) * cartItem.quantity,
          productTitle: `${event.title} - ${cartItem.ticketTypeName}`,
        })
        itemTaxClasses.push('exempt')

        if (ticketType) {
          const updatedTicketTypes = event.ticketTypes?.map((t: any) =>
            t.name === cartItem.ticketTypeName
              ? { ...t, sold: (t.sold || 0) + cartItem.quantity }
              : t,
          )
          await payload.update({
            collection: 'events',
            id: cartItem.eventId,
            data: { ticketTypes: updatedTicketTypes },
          })
        }
      }
    }
  }

  const orderTotal = orderItems.reduce((sum, item) => sum + item.lineTotal, 0)

  const taxConfig = await getTaxConfig()
  const taxLineItems = orderItems.map((item, i) => ({
    unitPrice: item.unitPrice,
    quantity: item.quantity,
    taxClass: itemTaxClasses[i] || taxConfig.defaultTaxClass,
  }))
  const taxResult = calculateTax(taxLineItems, taxConfig)

  const shippingCostInPence = shippingCost ?? 0

  const order = await payload.create({
    collection: 'orders',
    data: {
      orderNumber: generateOrderNumber(),
      status: 'paid',
      items: orderItems,
      customerEmail,
      customerName,
      total: orderTotal,
      subtotal: taxResult.subtotal,
      taxAmount: taxResult.taxAmount,
      taxRate: taxResult.effectiveRate,
      taxBreakdown: taxResult.breakdown,
      shippingCost: shippingCostInPence,
      ...(stripeSessionId && { stripeSessionId }),
      ...(stripePaymentIntentId && { stripePaymentIntentId }),
      ...(discountCode && { discountCode }),
      ...(discountAmount != null && { discountAmount }),
      ...(shippingAddress && { shippingAddress }),
    },
  })

  // Mark any abandoned cart as recovered
  try {
    const abandonedCarts = await payload.find({
      collection: 'abandoned-carts',
      where: {
        and: [
          { email: { equals: customerEmail } },
          { status: { in: ['abandoned', 'email-sent'] } },
        ],
      },
      limit: 5,
    })
    for (const cart of abandonedCarts.docs) {
      await payload.update({
        collection: 'abandoned-carts',
        id: cart.id,
        data: { status: 'recovered', recoveredAt: new Date().toISOString() },
      })
    }
  } catch {
    // Don't fail order creation
  }

  // Increment discount code usage
  if (discountCode) {
    try {
      const discountResult = await payload.find({
        collection: 'discount-codes',
        where: { code: { equals: discountCode } },
        limit: 1,
        depth: 0,
      })
      const discountDoc = discountResult.docs[0]
      if (discountDoc) {
        await payload.update({
          collection: 'discount-codes',
          id: discountDoc.id,
          data: { usedCount: (discountDoc.usedCount ?? 0) + 1 },
        })
      }
    } catch (err) {
      console.error('Failed to increment discount usedCount:', err)
    }
  }

  // Update customer stats
  await payload.update({
    collection: 'customers',
    id: customer.id,
    data: {
      orderCount: (customer.orderCount || 0) + 1,
      totalSpent: (customer.totalSpent || 0) + orderTotal,
    },
  })

  // Send confirmation email
  const hasTickets = cartItems.some((item: any) => item.type === 'ticket')
  await sendOrderEmail(
    hasTickets ? 'booking-confirmation' : 'order-confirmation',
    order,
    payload,
  )

  // Ad conversion events
  const eventId = `purchase_${order.id}`
  const conversionData = {
    value: orderTotal,
    currency: 'GBP',
    orderId: (order as any).orderNumber,
    contentIds: cartItems.filter((i: any) => i.type === 'product').map((i: any) => i.productId),
    email: customerEmail,
  }

  const seo = await (async () => {
    try {
      return (await payload.findGlobal({ slug: 'seo-settings' })) as any
    } catch {
      return null
    }
  })()

  await Promise.allSettled([
    sendMetaCapi('Purchase', conversionData, eventId, payload),
    sendTiktokEvent('CompletePayment', conversionData, payload),
    sendRedditConversion('Purchase', conversionData, payload),
    seo?.gadsConversionId && seo?.gadsConversionLabel
      ? sendGadsConversion(
          seo.gadsConversionId,
          seo.gadsConversionLabel,
          orderTotal,
          'GBP',
          (order as any).orderNumber,
        )
      : Promise.resolve(),
    seo?.pinterestTagId
      ? sendPinterestConversion(
          seo.pinterestTagId,
          'checkout',
          conversionData,
          seo.pinterestAccessToken,
        )
      : Promise.resolve(),
  ])
}

/**
 * Handle a successful Stripe Checkout Session (hosted checkout flow).
 */
export async function handleCheckoutCompleted(
  session: Stripe.Checkout.Session,
  payload: Payload,
): Promise<void> {
  const addr = session.shipping_details?.address
  await createOrderFromPayment(
    {
      cartItems: JSON.parse(session.metadata?.cartItems || '[]'),
      customerEmail: session.customer_details?.email || session.customer_email || '',
      customerName: session.customer_details?.name || '',
      stripeSessionId: session.id,
      stripePaymentIntentId:
        typeof session.payment_intent === 'string'
          ? session.payment_intent
          : session.payment_intent?.id,
      stripeCustomerId:
        typeof session.customer === 'string' ? session.customer : session.customer?.id,
      discountCode: session.metadata?.discountCode || null,
      discountAmount: session.metadata?.discountAmount
        ? parseInt(session.metadata.discountAmount, 10)
        : null,
      shippingAddress: addr
        ? {
            line1: addr.line1 || '',
            line2: addr.line2 || '',
            city: addr.city || '',
            county: addr.state || '',
            postcode: addr.postal_code || '',
            country: addr.country || '',
          }
        : null,
    },
    payload,
  )
}

/**
 * Handle a successful Stripe Payment Intent (on-page checkout flow).
 */
export async function handlePaymentIntentSucceeded(
  paymentIntent: Stripe.PaymentIntent,
  payload: Payload,
): Promise<void> {
  const rawAddress = paymentIntent.metadata?.shippingAddress
  const addr = rawAddress ? JSON.parse(rawAddress) : null

  await createOrderFromPayment(
    {
      cartItems: JSON.parse(paymentIntent.metadata?.cartItems || '[]'),
      customerEmail: paymentIntent.receipt_email || '',
      customerName: paymentIntent.metadata?.customerName || '',
      stripePaymentIntentId: paymentIntent.id,
      stripeCustomerId:
        typeof paymentIntent.customer === 'string'
          ? paymentIntent.customer
          : paymentIntent.customer?.id,
      shippingAddress: addr,
      shippingCost: paymentIntent.metadata?.shippingCost
        ? parseInt(paymentIntent.metadata.shippingCost, 10)
        : 0,
    },
    payload,
  )
}
