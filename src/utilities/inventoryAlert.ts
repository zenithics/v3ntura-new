import { sendEmail } from '@/lib/mailer'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

interface AlertOptions {
  productId: string
  productTitle: string
  currentStock: number
  threshold: number
  slug: string
}

export async function sendLowStockAlert(opts: AlertOptions): Promise<void> {
  const { productId, productTitle, currentStock, threshold, slug } = opts

  let recipientEmail = process.env.INVENTORY_ALERT_EMAIL || process.env.FROM_EMAIL
  try {
    const payload = await getPayload({ config: configPromise })
    const shop = await payload.findGlobal({ slug: 'shop-settings', depth: 0 })
    if ((shop as any)?.inventoryAlertEmail) {
      recipientEmail = (shop as any).inventoryAlertEmail
    } else if ((shop as any)?.supportEmail) {
      recipientEmail = (shop as any).supportEmail
    }
  } catch {
    // fall through to env var
  }

  if (!recipientEmail) return

  const adminUrl = `${process.env.NEXT_PUBLIC_SERVER_URL || ''}/admin/collections/products/${productId}`
  const shopUrl = `${process.env.NEXT_PUBLIC_SERVER_URL || ''}/shop/${slug}`

  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;">
      <h2 style="color:#E8177A;margin-top:0;">Low Stock Alert</h2>
      <p>The following product has reached its low-stock threshold:</p>
      <table style="width:100%;border-collapse:collapse;margin:16px 0;">
        <tr>
          <td style="padding:8px;border:1px solid #eee;font-weight:bold;">Product</td>
          <td style="padding:8px;border:1px solid #eee;">${productTitle}</td>
        </tr>
        <tr>
          <td style="padding:8px;border:1px solid #eee;font-weight:bold;">Current Stock</td>
          <td style="padding:8px;border:1px solid #eee;color:#E8177A;font-weight:bold;">${currentStock}</td>
        </tr>
        <tr>
          <td style="padding:8px;border:1px solid #eee;font-weight:bold;">Alert Threshold</td>
          <td style="padding:8px;border:1px solid #eee;">${threshold}</td>
        </tr>
      </table>
      <div style="margin-top:20px;">
        <a href="${adminUrl}" style="display:inline-block;padding:10px 20px;background:#E8177A;color:white;text-decoration:none;border-radius:6px;margin-right:8px;">Update Stock in Admin</a>
        <a href="${shopUrl}" style="display:inline-block;padding:10px 20px;border:1px solid #E8177A;color:#E8177A;text-decoration:none;border-radius:6px;">View Product</a>
      </div>
    </div>
  `

  await sendEmail({
    to: recipientEmail,
    subject: `Low Stock Alert: ${productTitle} (${currentStock} remaining)`,
    html,
    text: `Low stock alert: ${productTitle} has ${currentStock} units remaining (threshold: ${threshold}). Update stock: ${adminUrl}`,
  })
}
