import Stripe from 'stripe'
import type { CartItem } from '@/components/CartProvider'

// Re-export a lazy stripe client for webhook signature verification
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  apiVersion: '2025-02-24.acacia',
})

interface CheckoutOptions {
  items: CartItem[]
  customerEmail?: string
  successUrl: string
  cancelUrl: string
  shippingRequired?: boolean
  metadata?: Record<string, string>
  discountCode?: string
  discountAmount?: number
  freeShipping?: boolean
}

async function getStripeClient(): Promise<{ stripe: Stripe; currency: string }> {
  // Try to read from ShopSettings via Payload local API
  try {
    const { getPayload } = await import('payload')
    const config = (await import('@payload-config')).default
    const payload = await getPayload({ config })

    const settings = await payload.findGlobal({ slug: 'shop-settings' })
    const mode = (settings as any)?.stripe?.mode || 'test'
    const currency = (settings as any)?.currency || 'gbp'

    const secretKey =
      mode === 'live'
        ? (settings as any)?.stripe?.liveSecretKey
        : (settings as any)?.stripe?.testSecretKey

    if (secretKey) {
      return {
        stripe: new Stripe(secretKey, { apiVersion: '2025-02-24.acacia' }),
        currency,
      }
    }
  } catch {
    // Fall through to env var fallback
  }

  // Fallback to environment variables
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) throw new Error('Stripe secret key not configured in ShopSettings or STRIPE_SECRET_KEY env var')
  return {
    stripe: new Stripe(key, { apiVersion: '2025-02-24.acacia' }),
    currency: 'gbp',
  }
}

export async function getStripeMode(): Promise<'test' | 'live'> {
  try {
    const { getPayload } = await import('payload')
    const config = (await import('@payload-config')).default
    const payload = await getPayload({ config })
    const settings = await payload.findGlobal({ slug: 'shop-settings' })
    return ((settings as any)?.stripe?.mode as 'test' | 'live') || 'test'
  } catch {
    return 'test'
  }
}

/**
 * Create a Stripe Checkout session for cart items.
 * Supports both products and event tickets.
 */
export async function createCheckoutSession({
  items,
  customerEmail,
  successUrl,
  cancelUrl,
  shippingRequired = false,
  metadata = {},
  discountCode,
  discountAmount,
  freeShipping = false,
}: CheckoutOptions): Promise<Stripe.Checkout.Session> {
  const { stripe, currency } = await getStripeClient()

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map((item) => ({
    price_data: {
      currency,
      product_data: {
        name: item.title,
        ...(item.variantName && { description: item.variantName }),
        ...(item.ticketTypeName && { description: `Ticket: ${item.ticketTypeName}` }),
        ...(item.image?.url && { images: [item.image.url] }),
      },
      unit_amount: item.unitPrice,
    },
    quantity: item.quantity,
  }))

  const sessionParams: Stripe.Checkout.SessionCreateParams = {
    mode: 'payment',
    line_items: lineItems,
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      ...metadata,
      cartItems: JSON.stringify(
        items.map((i) => ({
          productId: i.productId,
          eventId: i.eventId,
          quantity: i.quantity,
          variantName: i.variantName,
          ticketTypeName: i.ticketTypeName,
          type: i.type,
        })),
      ),
    },
  }

  // Add shipping for physical products
  if (shippingRequired) {
    sessionParams.shipping_address_collection = {
      allowed_countries: ['GB', 'US', 'CA', 'AU', 'IE', 'DE', 'FR', 'ES', 'IT', 'NL'],
    }
    sessionParams.shipping_options = [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: { amount: 399, currency },
          display_name: 'Standard Shipping',
          delivery_estimate: {
            minimum: { unit: 'business_day', value: 3 },
            maximum: { unit: 'business_day', value: 5 },
          },
        },
      },
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: { amount: 699, currency },
          display_name: 'Express Shipping',
          delivery_estimate: {
            minimum: { unit: 'business_day', value: 1 },
            maximum: { unit: 'business_day', value: 2 },
          },
        },
      },
    ]
  }

  if (customerEmail) {
    sessionParams.customer_email = customerEmail
  }

  // Apply discount coupon
  if (discountCode && discountAmount && discountAmount > 0) {
    try {
      const coupon = await stripe.coupons.create({
        amount_off: discountAmount,
        currency,
        name: discountCode,
        duration: 'once',
      })
      sessionParams.discounts = [{ coupon: coupon.id }]
      if (sessionParams.metadata) {
        sessionParams.metadata.discountCode = discountCode
        sessionParams.metadata.discountAmount = String(discountAmount)
      }
    } catch (err) {
      console.error('Failed to create Stripe coupon for discount:', err)
      // Proceed without discount rather than blocking checkout
    }
  }

  // Free shipping: add a free shipping option and make it the only one shown
  if (freeShipping && shippingRequired) {
    sessionParams.shipping_options = [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: { amount: 0, currency },
          display_name: `Free Shipping (${discountCode})`,
        },
      },
    ]
    if (sessionParams.metadata) {
      sessionParams.metadata.freeShipping = 'true'
    }
  }

  return stripe.checkout.sessions.create(sessionParams)
}

// ── Payment Intent (on-page checkout) ────────────────────────────────────────

interface CreatePaymentIntentOptions {
  items: CartItem[]
  customerEmail: string
  shippingCost: number
  metadata?: Record<string, string>
}

export function calculateOrderTotal(items: CartItem[], shippingCost: number): number {
  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0)
  return subtotal + shippingCost
}

export async function createPaymentIntent({
  items,
  customerEmail,
  shippingCost,
  metadata = {},
}: CreatePaymentIntentOptions): Promise<Stripe.PaymentIntent> {
  const amount = calculateOrderTotal(items, shippingCost)

  const existingCustomers = await stripe.customers.list({ email: customerEmail, limit: 1 })
  const customerId =
    existingCustomers.data.length > 0
      ? existingCustomers.data[0].id
      : (await stripe.customers.create({ email: customerEmail })).id

  return stripe.paymentIntents.create({
    amount,
    currency: 'gbp',
    customer: customerId,
    receipt_email: customerEmail,
    automatic_payment_methods: { enabled: true },
    metadata: {
      ...metadata,
      cartItems: JSON.stringify(
        items.map((i) => ({
          productId: i.productId,
          eventId: i.eventId,
          quantity: i.quantity,
          variantName: i.variantName,
          ticketTypeName: i.ticketTypeName,
          type: i.type,
        })),
      ),
      shippingCost: String(shippingCost),
    },
  })
}

export interface ShippingOption {
  id: string
  label: string
  description: string
  price: number
  minOrderValue?: number
  shippingClasses?: string[]
}

const DEFAULT_SHIPPING_OPTIONS: ShippingOption[] = [
  { id: 'standard', label: 'Standard Shipping', description: '3-5 business days', price: 399 },
  { id: 'express', label: 'Express Shipping', description: '1-2 business days', price: 699 },
  { id: 'free', label: 'Free Shipping', description: '5-7 business days', price: 0, minOrderValue: 5000 },
]

export async function getShippingOptions(): Promise<ShippingOption[]> {
  try {
    const { getPayload } = await import('payload')
    const cfg = (await import('@payload-config')).default
    const payload = await getPayload({ config: cfg })
    const settings = (await payload.findGlobal({ slug: 'shop-settings' })) as any
    const methods = settings?.shippingMethods

    if (!methods || !Array.isArray(methods) || methods.length === 0) {
      return DEFAULT_SHIPPING_OPTIONS
    }

    return methods
      .filter((m: any) => m.enabled !== false)
      .map((m: any) => ({
        id: m.methodId,
        label: m.name,
        description: m.description || '',
        price: m.price || 0,
        minOrderValue: m.freeShippingThreshold || undefined,
        shippingClasses: m.shippingClasses || undefined,
      }))
  } catch {
    return DEFAULT_SHIPPING_OPTIONS
  }
}

// Backward-compatible export for any code still importing SHIPPING_OPTIONS directly
export const SHIPPING_OPTIONS = DEFAULT_SHIPPING_OPTIONS
