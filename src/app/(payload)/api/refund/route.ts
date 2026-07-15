import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { headers as getHeaders } from 'next/headers'
import { stripe } from '@/stripe/checkout'
import { checkRateLimit, getClientIP } from '@/utilities/rateLimit'

export async function POST(req: NextRequest) {
  try {
    const clientIP = getClientIP(req.headers)
    const { allowed } = checkRateLimit(`refund:${clientIP}`, { maxRequests: 5, windowSeconds: 300 })
    if (!allowed) {
      return NextResponse.json(
        { error: 'Too many refund attempts. Please try again later.' },
        { status: 429 },
      )
    }

    const payload = await getPayload({ config: configPromise })
    const headers = await getHeaders()
    const { user } = await payload.auth({ headers })

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const role = (user as any).role
    if (role !== 'admin' && role !== 'editor') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await req.json()
    const { orderId, amount, reason, note } = body

    if (!orderId) {
      return NextResponse.json({ error: 'orderId is required' }, { status: 400 })
    }

    const order = await payload.findByID({ collection: 'orders', id: orderId })

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    const paymentIntentId = (order as any).stripePaymentIntentId
    const stripeSessionId = (order as any).stripeSessionId

    if (!paymentIntentId && !stripeSessionId) {
      return NextResponse.json(
        { error: 'This order has no Stripe payment to refund' },
        { status: 400 },
      )
    }

    const orderTotal: number = (order as any).total || 0
    const alreadyRefunded: number = (order as any).totalRefunded || 0
    const maxRefundable = orderTotal - alreadyRefunded

    const refundAmount: number = amount != null ? Number(amount) : maxRefundable

    if (refundAmount <= 0) {
      return NextResponse.json({ error: 'Nothing left to refund' }, { status: 400 })
    }

    if (refundAmount > maxRefundable) {
      return NextResponse.json(
        {
          error: `Refund amount (${refundAmount}p) exceeds refundable balance (${maxRefundable}p)`,
        },
        { status: 400 },
      )
    }

    // Resolve payment intent id — for session-based orders fetch it from Stripe
    let piId = paymentIntentId
    if (!piId && stripeSessionId) {
      const session = await stripe.checkout.sessions.retrieve(stripeSessionId)
      piId =
        typeof session.payment_intent === 'string'
          ? session.payment_intent
          : session.payment_intent?.id
    }

    if (!piId) {
      return NextResponse.json(
        { error: 'Could not resolve Stripe payment intent' },
        { status: 400 },
      )
    }

    const refundParams: Parameters<typeof stripe.refunds.create>[0] = {
      payment_intent: piId,
      amount: refundAmount,
    }

    if (reason && ['duplicate', 'fraudulent', 'requested_by_customer'].includes(reason)) {
      refundParams.reason = reason as 'duplicate' | 'fraudulent' | 'requested_by_customer'
    }

    const stripeRefund = await stripe.refunds.create(refundParams)

    const newTotalRefunded = alreadyRefunded + refundAmount
    const existingRefunds: any[] = (order as any).refunds || []

    await payload.update({
      collection: 'orders',
      id: orderId,
      data: {
        totalRefunded: newTotalRefunded,
        status: newTotalRefunded >= orderTotal ? 'refunded' : (order as any).status,
        refunds: [
          ...existingRefunds,
          {
            stripeRefundId: stripeRefund.id,
            amount: refundAmount,
            reason: reason || null,
            note: note || null,
            refundedAt: new Date().toISOString(),
          },
        ],
      },
    })

    return NextResponse.json({
      success: true,
      refundId: stripeRefund.id,
      amountRefunded: refundAmount,
      totalRefunded: newTotalRefunded,
    })
  } catch (err: any) {
    console.error('Refund error:', err)
    return NextResponse.json({ error: err?.message || 'Refund failed' }, { status: 500 })
  }
}
