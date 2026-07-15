import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function GET(req: NextRequest) {
  try {
    const payload = await getPayload({ config })

    const { user } = await payload.auth({ headers: req.headers })
    if (!user || (user as any).role === 'customer') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const products = await payload.find({
      collection: 'products',
      limit: 10000,
      sort: 'title',
      depth: 1,
    })

    const headers = [
      'ID', 'Title', 'Slug', 'Status', 'Product Type', 'Price (pence)', 'Compare At Price',
      'Tax Class', 'Stock', 'Track Stock', 'Low Stock Threshold', 'SKU',
      'Weight (g)', 'Shipping Class', 'Category', 'Featured', 'Short Description',
    ]

    const rows = products.docs.map((p: any) => [
      p.id,
      csvEscape(p.title || ''),
      csvEscape(p.slug || ''),
      p.status || 'draft',
      p.productType || 'physical',
      p.price || 0,
      p.compareAtPrice || '',
      p.taxClass || 'standard',
      p.stock ?? '',
      p.trackStock ? 'yes' : 'no',
      p.lowStockThreshold || '',
      p.sku || '',
      p.weight || '',
      p.shippingClass || 'standard',
      typeof p.category === 'object' ? p.category?.title || '' : '',
      p.featured ? 'yes' : 'no',
      csvEscape(p.shortDescription || ''),
    ])

    const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n')

    return new Response(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="products-export-${new Date().toISOString().split('T')[0]}.csv"`,
      },
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

function csvEscape(value: string): string {
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`
  }
  return value
}
