import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { headers as getHeaders } from 'next/headers'

/**
 * POST /api/gdpr/export — Generate a data export for an email address.
 * Returns all data held about that person across all collections.
 */
export async function POST(req: NextRequest) {
  try {
    const payload = await getPayload({ config: configPromise })
    const hdrs = await getHeaders()
    const { user } = await payload.auth({ headers: hdrs })

    if (!user || !['admin', 'editor'].includes((user as any).role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    const { email, dataRequestId } = await req.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const exportData: Record<string, any> = {
      exportedAt: new Date().toISOString(),
      dataSubjectEmail: email,
      collections: {},
    }

    // Users
    const users = await payload.find({
      collection: 'users',
      where: { email: { equals: email } },
      limit: 10,
      depth: 0,
    })
    if (users.docs.length > 0) {
      exportData.collections.users = users.docs.map((u: any) => ({
        id: u.id,
        email: u.email,
        name: u.name,
        role: u.role,
        createdAt: u.createdAt,
        updatedAt: u.updatedAt,
        savedAddresses: u.savedAddresses,
      }))
    }

    // Customers
    try {
      const customers = await payload.find({
        collection: 'customers',
        where: { email: { equals: email } },
        limit: 10,
        depth: 0,
      })
      if (customers.docs.length > 0) {
        exportData.collections.customers = customers.docs.map((c: any) => ({
          id: c.id,
          email: c.email,
          name: c.name,
          phone: c.phone,
          orderCount: c.orderCount,
          totalSpent: c.totalSpent,
          createdAt: c.createdAt,
        }))
      }
    } catch {
      // Collection may not exist
    }

    // Orders
    try {
      const orders = await payload.find({
        collection: 'orders',
        where: { customerEmail: { equals: email } },
        limit: 100,
        depth: 0,
      })
      if (orders.docs.length > 0) {
        exportData.collections.orders = orders.docs.map((o: any) => ({
          id: o.id,
          orderNumber: o.orderNumber,
          status: o.status,
          items: o.items,
          total: o.total,
          shippingAddress: o.shippingAddress,
          createdAt: o.createdAt,
        }))
      }
    } catch {
      // Collection may not exist
    }

    // Reviews
    try {
      const reviews = await payload.find({
        collection: 'reviews',
        where: { customerEmail: { equals: email } },
        limit: 100,
        depth: 0,
      })
      if (reviews.docs.length > 0) {
        exportData.collections.reviews = reviews.docs.map((r: any) => ({
          id: r.id,
          rating: r.rating,
          title: r.title,
          content: r.content,
          status: r.status,
          createdAt: r.createdAt,
        }))
      }
    } catch {
      // Collection may not exist
    }

    // Activity log entries
    try {
      const activities = await payload.find({
        collection: 'activity-log',
        where: { userEmail: { equals: email } },
        limit: 100,
        depth: 0,
      })
      if (activities.docs.length > 0) {
        exportData.collections.activityLog = activities.docs.map((a: any) => ({
          action: a.action,
          collection: a.collection,
          documentId: a.documentId,
          timestamp: a.createdAt,
        }))
      }
    } catch {
      // Collection may not exist
    }

    if (dataRequestId) {
      await payload.update({
        collection: 'data-requests',
        id: dataRequestId,
        data: {
          exportData,
          status: 'fulfilled',
          fulfilledAt: new Date().toISOString(),
        },
      })
    }

    return NextResponse.json({ success: true, data: exportData })
  } catch (error: any) {
    console.error('Data export error:', error)
    return NextResponse.json({ error: error.message || 'Export failed' }, { status: 500 })
  }
}
