import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { headers as getHeaders } from 'next/headers'

const REDACTED = '[REDACTED]'

/**
 * POST /api/gdpr/erasure — Anonymise all PII for an email address.
 * Financial records (order totals, dates) are KEPT for HMRC compliance.
 * PII (names, emails, addresses, phone numbers) is replaced with [REDACTED].
 */
export async function POST(req: NextRequest) {
  try {
    const payload = await getPayload({ config: configPromise })
    const hdrs = await getHeaders()
    const { user } = await payload.auth({ headers: hdrs })

    // Only admins can process erasure
    if (!user || (user as any).role !== 'admin') {
      return NextResponse.json({ error: 'Only admins can process data erasure' }, { status: 403 })
    }

    const { email, dataRequestId } = await req.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const erasureLog: string[] = []

    // Anonymise Users
    const users = await payload.find({
      collection: 'users',
      where: { email: { equals: email } },
      limit: 10,
      overrideAccess: true,
    })
    for (const u of users.docs) {
      if ((u as any).role === 'customer') {
        await payload.update({
          collection: 'users',
          id: u.id,
          data: {
            email: `redacted-${u.id}@deleted.local`,
            name: REDACTED,
            savedAddresses: [],
          },
          overrideAccess: true,
        })
        erasureLog.push(`User ${u.id}: email, name, addresses anonymised`)
      } else {
        erasureLog.push(`User ${u.id}: skipped (non-customer role: ${(u as any).role})`)
      }
    }

    // Anonymise Customers
    try {
      const customers = await payload.find({
        collection: 'customers',
        where: { email: { equals: email } },
        limit: 10,
        overrideAccess: true,
      })
      for (const c of customers.docs) {
        await payload.update({
          collection: 'customers',
          id: c.id,
          data: {
            email: `redacted-${c.id}@deleted.local`,
            name: REDACTED,
            phone: REDACTED,
          } as any,
          overrideAccess: true,
        })
        erasureLog.push(`Customer ${c.id}: email, name, phone anonymised`)
      }
    } catch {
      // Collection may not exist
    }

    // Anonymise Orders — keep financial data for HMRC
    try {
      const orders = await payload.find({
        collection: 'orders',
        where: { customerEmail: { equals: email } },
        limit: 100,
        overrideAccess: true,
      })
      for (const o of orders.docs) {
        await payload.update({
          collection: 'orders',
          id: o.id,
          data: {
            customerEmail: `redacted-${o.id}@deleted.local`,
            customerName: REDACTED,
            shippingAddress: {
              line1: REDACTED,
              line2: '',
              city: REDACTED,
              county: '',
              postcode: REDACTED,
              country: REDACTED,
            },
          } as any,
          overrideAccess: true,
        })
        erasureLog.push(
          `Order ${(o as any).orderNumber}: customer PII anonymised, financial data retained`,
        )
      }
    } catch {
      // Collection may not exist
    }

    // Anonymise Reviews
    try {
      const reviews = await payload.find({
        collection: 'reviews',
        where: { customerEmail: { equals: email } },
        limit: 100,
        overrideAccess: true,
      })
      for (const r of reviews.docs) {
        await payload.update({
          collection: 'reviews',
          id: r.id,
          data: {
            customerName: REDACTED,
            customerEmail: `redacted-${r.id}@deleted.local`,
          } as any,
          overrideAccess: true,
        })
        erasureLog.push(`Review ${r.id}: customer PII anonymised, review content retained`)
      }
    } catch {
      // Collection may not exist
    }

    // Delete activity log entries for this email
    try {
      const activities = await payload.find({
        collection: 'activity-log',
        where: { userEmail: { equals: email } },
        limit: 500,
        depth: 0,
      })
      for (const a of activities.docs) {
        await payload.delete({ collection: 'activity-log', id: a.id })
      }
      if (activities.docs.length > 0) {
        erasureLog.push(`Activity log: ${activities.docs.length} entries deleted`)
      }
    } catch {
      // Collection may not exist
    }

    if (dataRequestId) {
      await payload.update({
        collection: 'data-requests',
        id: dataRequestId,
        data: {
          erasureLog,
          status: 'fulfilled',
          fulfilledAt: new Date().toISOString(),
        },
      })
    }

    return NextResponse.json({
      success: true,
      erasureLog,
      message: 'PII has been anonymised. Financial records retained for HMRC compliance.',
    })
  } catch (error: any) {
    console.error('Data erasure error:', error)
    return NextResponse.json({ error: error.message || 'Erasure failed' }, { status: 500 })
  }
}
