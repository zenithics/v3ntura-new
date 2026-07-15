import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { processAbandonedCarts } from '@/utilities/abandonedCartCron'

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const payload = await getPayload({ config })
    await processAbandonedCarts(payload)
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('[AbandonedCartCron]', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
