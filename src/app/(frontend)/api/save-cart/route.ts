import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import crypto from 'crypto'

export async function POST(req: NextRequest) {
  try {
    const { email, customerName, items } = await req.json()

    if (!email || !items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Email and items required' }, { status: 400 })
    }

    const payload = await getPayload({ config })

    const existing = await payload.find({
      collection: 'abandoned-carts',
      where: {
        and: [
          { email: { equals: email } },
          { status: { in: ['abandoned', 'email-sent'] } },
        ],
      },
      limit: 1,
      sort: '-createdAt',
    })

    const recoveryToken = crypto.randomBytes(32).toString('hex')
    const cartItems = items.map((item: any) => ({
      productId: item.productId,
      title: item.title,
      variantName: item.variantName || null,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      image: item.image?.url || null,
      slug: item.slug || null,
      type: item.type || 'product',
    }))

    if (existing.docs.length > 0) {
      await payload.update({
        collection: 'abandoned-carts',
        id: existing.docs[0].id,
        data: {
          items: cartItems,
          customerName: customerName || undefined,
          recoveryToken,
          status: 'abandoned',
          emailsSent: 0,
          lastEmailSentAt: undefined,
        },
      })
    } else {
      await payload.create({
        collection: 'abandoned-carts',
        data: {
          email,
          customerName: customerName || undefined,
          items: cartItems,
          recoveryToken,
          status: 'abandoned',
        },
      })
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('[SaveCart]', error)
    return NextResponse.json({ error: 'Failed to save cart' }, { status: 500 })
  }
}
