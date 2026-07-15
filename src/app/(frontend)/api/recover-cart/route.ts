import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token')

  if (!token) {
    return NextResponse.redirect(new URL('/shop', req.url))
  }

  try {
    const payload = await getPayload({ config })

    const carts = await payload.find({
      collection: 'abandoned-carts',
      where: { recoveryToken: { equals: token } },
      limit: 1,
    })

    const cart = carts.docs[0]
    if (!cart) {
      return NextResponse.redirect(new URL('/shop', req.url))
    }

    await payload.update({
      collection: 'abandoned-carts',
      id: cart.id,
      data: {
        status: 'recovered',
        recoveredAt: new Date().toISOString(),
      },
    })

    const items = typeof cart.items === 'string' ? JSON.parse(cart.items as string) : cart.items
    const encoded = encodeURIComponent(JSON.stringify(items))
    const discountParam = cart.discountCode ? `&discount=${cart.discountCode}` : ''

    return NextResponse.redirect(
      new URL(`/cart?recover=${encoded}${discountParam}`, req.url),
    )
  } catch (error) {
    console.error('[RecoverCart]', error)
    return NextResponse.redirect(new URL('/shop', req.url))
  }
}
