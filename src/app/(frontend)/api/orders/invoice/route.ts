import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { jsPDF } from 'jspdf'

export async function GET(req: NextRequest) {
  const orderId = req.nextUrl.searchParams.get('id')

  if (!orderId) {
    return NextResponse.json({ error: 'Order ID required' }, { status: 400 })
  }

  try {
    const payload = await getPayload({ config })

    const { user } = await payload.auth({ headers: req.headers })
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const order = (await payload.findByID({
      collection: 'orders',
      id: orderId,
      depth: 1,
    })) as any

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    if ((user as any).role === 'customer' && order.customerEmail !== (user as any).email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    const [shopSettings, companyDetails] = await Promise.all([
      payload.findGlobal({ slug: 'shop-settings' }).catch(() => null),
      payload.findGlobal({ slug: 'company-details' }).catch(() => null),
    ]) as any[]

    const storeName = shopSettings?.storeName || 'Store'
    const vatNumber = shopSettings?.taxRegistrationNumber || ''
    const companyName = companyDetails?.companyName || storeName
    const companyAddress = companyDetails?.registeredAddress || ''
    const companyEmail = companyDetails?.contactEmail || shopSettings?.supportEmail || ''

    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.getWidth()
    let y = 20

    // Header
    doc.setFontSize(24)
    doc.setFont('helvetica', 'bold')
    doc.text('INVOICE', 14, y)

    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.text(companyName, pageWidth - 14, y, { align: 'right' })
    y += 6
    if (companyAddress) {
      doc.text(companyAddress, pageWidth - 14, y, { align: 'right' })
      y += 5
    }
    if (companyEmail) {
      doc.text(companyEmail, pageWidth - 14, y, { align: 'right' })
      y += 5
    }
    if (vatNumber) {
      doc.text(`VAT: ${vatNumber}`, pageWidth - 14, y, { align: 'right' })
      y += 5
    }

    y += 10

    // Order details
    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.text('Invoice Number:', 14, y)
    doc.setFont('helvetica', 'normal')
    doc.text(order.orderNumber || orderId, 60, y)
    y += 6
    doc.setFont('helvetica', 'bold')
    doc.text('Date:', 14, y)
    doc.setFont('helvetica', 'normal')
    doc.text(
      new Date(order.createdAt).toLocaleDateString('en-GB', {
        day: 'numeric', month: 'long', year: 'numeric',
      }),
      60,
      y,
    )
    y += 6
    doc.setFont('helvetica', 'bold')
    doc.text('Status:', 14, y)
    doc.setFont('helvetica', 'normal')
    doc.text((order.status || 'pending').toUpperCase(), 60, y)

    y += 10

    // Bill To
    doc.setFont('helvetica', 'bold')
    doc.text('Bill To:', 14, y)
    y += 6
    doc.setFont('helvetica', 'normal')
    if (order.customerName) { doc.text(order.customerName, 14, y); y += 5 }
    if (order.customerEmail) { doc.text(order.customerEmail, 14, y); y += 5 }
    if (order.shippingAddress) {
      const addr = order.shippingAddress
      const addressLines = [addr.line1, addr.line2, `${addr.city || ''} ${addr.postcode || ''}`.trim(), addr.country].filter(Boolean)
      addressLines.forEach((line: string) => { doc.text(line, 14, y); y += 5 })
    }

    y += 10

    // Items table header
    doc.setFillColor(245, 245, 245)
    doc.rect(14, y - 4, pageWidth - 28, 8, 'F')
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(9)
    doc.text('Item', 16, y)
    doc.text('Qty', 120, y, { align: 'center' })
    doc.text('Unit Price', 145, y, { align: 'right' })
    doc.text('Total', pageWidth - 16, y, { align: 'right' })
    y += 8

    // Items
    doc.setFont('helvetica', 'normal')
    const items = order.items || []
    items.forEach((item: any) => {
      const title = item.productTitle || 'Item'
      const variant = item.variantName ? ` (${item.variantName})` : ''
      doc.text(`${title}${variant}`, 16, y)
      doc.text(String(item.quantity || 1), 120, y, { align: 'center' })
      doc.text(`£${((item.unitPrice || 0) / 100).toFixed(2)}`, 145, y, { align: 'right' })
      doc.text(`£${((item.lineTotal || 0) / 100).toFixed(2)}`, pageWidth - 16, y, { align: 'right' })
      y += 7
    })

    y += 5
    doc.setDrawColor(200, 200, 200)
    doc.line(100, y, pageWidth - 14, y)
    y += 8

    // Totals
    doc.setFont('helvetica', 'normal')
    if (order.subtotal) {
      doc.text('Subtotal:', 130, y)
      doc.text(`£${(order.subtotal / 100).toFixed(2)}`, pageWidth - 16, y, { align: 'right' })
      y += 6
    }
    if (order.shippingCost) {
      doc.text('Shipping:', 130, y)
      doc.text(`£${(order.shippingCost / 100).toFixed(2)}`, pageWidth - 16, y, { align: 'right' })
      y += 6
    }
    if (order.discountAmount) {
      doc.text('Discount:', 130, y)
      doc.text(`-£${(order.discountAmount / 100).toFixed(2)}`, pageWidth - 16, y, { align: 'right' })
      y += 6
    }
    if (order.taxAmount) {
      doc.text(`VAT (${order.taxRate || 20}%):`, 130, y)
      doc.text(`£${(order.taxAmount / 100).toFixed(2)}`, pageWidth - 16, y, { align: 'right' })
      y += 6
    }

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(12)
    doc.text('Total:', 130, y)
    doc.text(`£${((order.total || 0) / 100).toFixed(2)}`, pageWidth - 16, y, { align: 'right' })

    y += 15
    doc.setFontSize(8)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(150)
    doc.text('Thank you for your order.', 14, y)
    if (vatNumber) {
      y += 4
      doc.text(`VAT Registration Number: ${vatNumber}`, 14, y)
    }

    const pdfBuffer = Buffer.from(doc.output('arraybuffer'))

    return new Response(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="invoice-${order.orderNumber || orderId}.pdf"`,
      },
    })
  } catch (error: any) {
    console.error('[Invoice]', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
