import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

interface CartItem {
  productId: string | number
  quantity: number
  unitPrice: number
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { code, cartItems, customerEmail } = body as {
      code: string
      cartItems: CartItem[]
      customerEmail?: string
    }

    if (!code || !cartItems?.length) {
      return NextResponse.json(
        { valid: false, message: 'Code and cart items are required' },
        { status: 400 },
      )
    }

    const payload = await getPayload({ config: configPromise })

    // Find the discount code
    const result = await payload.find({
      collection: 'discount-codes',
      where: { code: { equals: code.toUpperCase().trim() } },
      limit: 1,
      depth: 1,
    })

    const discount = result.docs[0]

    if (!discount) {
      return NextResponse.json({ valid: false, message: 'Invalid discount code' })
    }

    if (!discount.active) {
      return NextResponse.json({ valid: false, message: 'This discount code is no longer active' })
    }

    const now = new Date()

    if (discount.startsAt && new Date(discount.startsAt) > now) {
      return NextResponse.json({ valid: false, message: 'This discount code is not yet active' })
    }

    if (discount.expiresAt && new Date(discount.expiresAt) < now) {
      return NextResponse.json({ valid: false, message: 'This discount code has expired' })
    }

    if (discount.maximumUses && (discount.usedCount ?? 0) >= discount.maximumUses) {
      return NextResponse.json({ valid: false, message: 'This discount code has reached its usage limit' })
    }

    // Per-customer limit check
    if (discount.perCustomerLimit && customerEmail) {
      const customerOrders = await payload.find({
        collection: 'orders',
        where: {
          and: [
            { customerEmail: { equals: customerEmail } },
            { discountCode: { equals: discount.code } },
          ],
        },
        limit: 0,
        depth: 0,
      })

      if (customerOrders.totalDocs >= discount.perCustomerLimit) {
        return NextResponse.json({
          valid: false,
          message: `You have already used this code ${discount.perCustomerLimit} time${discount.perCustomerLimit !== 1 ? 's' : ''}`,
        })
      }
    }

    // Calculate cart total
    const cartTotal = cartItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0)

    // Minimum order value check
    if (discount.minimumOrderValue && cartTotal < discount.minimumOrderValue) {
      const { formatPrice } = await import('@/utilities/formatPrice')
      return NextResponse.json({
        valid: false,
        message: `Minimum order of ${formatPrice(discount.minimumOrderValue)} required for this code`,
      })
    }

    // Applicable products/categories check
    const applicableProductIds = Array.isArray(discount.applicableProducts)
      ? discount.applicableProducts.map((p: any) => (typeof p === 'object' ? String(p.id) : String(p)))
      : []

    if (applicableProductIds.length > 0) {
      const eligible = cartItems.filter((item) =>
        applicableProductIds.includes(String(item.productId)),
      )
      if (eligible.length === 0) {
        return NextResponse.json({
          valid: false,
          message: 'This code only applies to specific products not in your cart',
        })
      }
    }

    // Calculate discount amount
    let discountAmount = 0

    if (discount.discountType === 'percentage' && discount.discountValue) {
      discountAmount = Math.round(cartTotal * (discount.discountValue / 100))
    } else if (discount.discountType === 'fixed_amount' && discount.discountValue) {
      discountAmount = Math.min(discount.discountValue, cartTotal)
    } else if (discount.discountType === 'free_shipping') {
      discountAmount = 0 // Handled at checkout
    }

    return NextResponse.json({
      valid: true,
      discountType: discount.discountType,
      discountValue: discount.discountValue,
      discountAmount,
      code: discount.code,
      message:
        discount.discountType === 'free_shipping'
          ? 'Free shipping applied!'
          : `${discount.discountType === 'percentage' ? `${discount.discountValue}% off` : `£${(discountAmount / 100).toFixed(2)} off`} applied!`,
    })
  } catch (error: any) {
    console.error('Validate discount error:', error)
    return NextResponse.json(
      { valid: false, message: 'Failed to validate discount code' },
      { status: 500 },
    )
  }
}
