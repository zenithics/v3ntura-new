import { NextResponse } from 'next/server'
import { getShippingOptions } from '@/stripe/checkout'

export async function GET() {
  try {
    const options = await getShippingOptions()
    return NextResponse.json({ options })
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to load shipping options' }, { status: 500 })
  }
}
