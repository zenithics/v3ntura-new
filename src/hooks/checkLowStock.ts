import type { CollectionAfterChangeHook } from 'payload'
import { sendEmail } from '@/lib/mailer'

export const checkLowStock: CollectionAfterChangeHook = async ({ doc, previousDoc, req }) => {
  if (!doc.trackStock || !doc.inventoryAlertEnabled) return doc
  if (!doc.lowStockThreshold || doc.stock === undefined) return doc

  const wasAbove = !previousDoc || (previousDoc.stock ?? 0) >= doc.lowStockThreshold
  const isBelow = doc.stock < doc.lowStockThreshold

  if (!wasAbove || !isBelow) return doc

  // Don't send if we already sent an alert within 24 hours
  if (doc.lastAlertSentAt) {
    const lastSent = new Date(doc.lastAlertSentAt).getTime()
    if (Date.now() - lastSent < 24 * 60 * 60 * 1000) return doc
  }

  try {
    const settings = (await req.payload.findGlobal({ slug: 'shop-settings' })) as any
    const alertEmail = settings?.inventoryAlertEmail || settings?.supportEmail

    if (!alertEmail) {
      console.log(`[LowStock] No alert email configured, skipping alert for "${doc.title}"`)
      return doc
    }

    const storeName = settings?.storeName || 'Store'

    await sendEmail({
      to: alertEmail,
      subject: `⚠️ Low Stock Alert: ${doc.title}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #d97706;">⚠️ Low Stock Alert</h2>
          <p><strong>${doc.title}</strong> is running low on stock.</p>
          <table style="border-collapse: collapse; margin: 16px 0;">
            <tr><td style="padding: 8px 16px 8px 0; font-weight: bold;">Current Stock:</td><td style="padding: 8px 0; color: ${doc.stock <= 0 ? '#dc2626' : '#d97706'}; font-weight: bold;">${doc.stock}</td></tr>
            <tr><td style="padding: 8px 16px 8px 0; font-weight: bold;">Alert Threshold:</td><td style="padding: 8px 0;">${doc.lowStockThreshold}</td></tr>
            ${doc.stock <= 0 ? '<tr><td colspan="2" style="padding: 8px 0; color: #dc2626; font-weight: bold;">🚨 This product is OUT OF STOCK</td></tr>' : ''}
          </table>
          <a href="${process.env.NEXT_PUBLIC_SERVER_URL || ''}/admin/collections/products/${doc.id}"
             style="display: inline-block; background: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
            View Product in Admin
          </a>
          <p style="color: #6b7280; font-size: 12px; margin-top: 24px;">— ${storeName} Inventory System</p>
        </div>
      `,
    })

    await req.payload.update({
      collection: 'products',
      id: doc.id,
      data: { lastAlertSentAt: new Date().toISOString() },
      context: { skipLowStockCheck: true },
    })

    console.log(`[LowStock] Alert sent for "${doc.title}" (stock: ${doc.stock})`)
  } catch (error) {
    console.error(`[LowStock] Failed to send alert for "${doc.title}":`, error)
  }

  return doc
}
