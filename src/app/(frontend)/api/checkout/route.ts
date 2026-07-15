import { NextRequest, NextResponse } from 'next/server'
import {
  createPaymentIntent,
  calculateOrderTotal,
  getShippingOptions,
} from '@/stripe/checkout'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { items, customerEmail, shippingOptionId, shippingAddress, customerName } = body

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })
    }

    if (!customerEmail) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const hasPhysicalProducts = items.some((item: any) => item.type === 'product')
    let shippingCost = 0

    if (hasPhysicalProducts) {
      const subtotal = items.reduce(
        (sum: number, item: any) => sum + item.unitPrice * item.quantity,
        0,
      )
      const shippingOptions = await getShippingOptions()
      const selectedShipping = shippingOptions.find((opt) => opt.id === shippingOptionId)

      if (!selectedShipping) {
        return NextResponse.json({ error: 'Invalid shipping option' }, { status: 400 })
      }

      if (
        selectedShipping.id === 'free' &&
        selectedShipping.minOrderValue &&
        subtotal < selectedShipping.minOrderValue
      ) {
        return NextResponse.json(
          { error: 'Order does not meet minimum for free shipping' },
          { status: 400 },
        )
      }

      shippingCost = selectedShipping.price
    }

    const paymentIntent = await createPaymentIntent({
      items,
      customerEmail,
      shippingCost,
      metadata: {
        customerName: customerName || '',
        shippingAddress: shippingAddress ? JSON.stringify(shippingAddress) : '',
        shippingOptionId: shippingOptionId || '',
      },
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      amount: paymentIntent.amount,
    })
  } catch (error: any) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create payment' },
      { status: 500 },
    )
  }
}
