import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { product, rating, title, body: reviewBody, customerName, customerEmail, customerId } = body

    if (!product || !rating || !reviewBody || !customerName || !customerEmail) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 },
      )
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { success: false, message: 'Rating must be between 1 and 5' },
        { status: 400 },
      )
    }

    const payload = await getPayload({ config: configPromise })

    await payload.create({
      collection: 'reviews',
      data: {
        product,
        rating,
        title: title || undefined,
        body: reviewBody,
        customerName,
        customerEmail,
        customer: customerId || undefined,
        status: 'pending',
        verifiedPurchase: false,
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Review submitted. It will appear once approved.',
    })
  } catch (error: any) {
    console.error('Review submission error:', error)
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to submit review' },
      { status: 500 },
    )
  }
}
