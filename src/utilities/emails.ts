import type { Payload } from 'payload'
import { sendEmail } from '@/lib/mailer'

/**
 * Send a transactional email using the email templates from Payload.
 *
 * Uses Resend (configured in Payload's email adapter) or falls back to
 * any SMTP transport configured in payload.config.
 *
 * Template placeholders are replaced with order data before sending.
 */
export async function sendOrderEmail(
  trigger: string,
  order: any,
  payload: Payload,
): Promise<void> {
  try {
    // Fetch the email template
    const templates = await payload.find({
      collection: 'email-templates',
      where: { trigger: { equals: trigger } },
      limit: 1,
    })

    const template = templates.docs[0]
    if (!template || !template.enabled) {
      console.log(`Email template "${trigger}" not found or disabled, skipping.`)
      return
    }

    // Build replacement map
    const replacements: Record<string, string> = {
      '{{orderNumber}}': order.orderNumber || '',
      '{{customerName}}': order.customerName || 'Customer',
      '{{orderTotal}}': formatPriceSimple(order.total),
      '{{trackingUrl}}': order.trackingUrl || '#',
      '{{trackingNumber}}': order.trackingNumber || '',
      '{{refundAmount}}': formatPriceSimple(order.refundAmount || 0),
      '{{orderUrl}}': `${process.env.NEXT_PUBLIC_SERVER_URL || ''}/account/orders/${order.orderNumber}`,
      '{{carrier}}': order.carrier || '',
      '{{shippingNotes}}': order.shippingNotes || '',
      '{{cancelReason}}': order.cancelReason || 'No reason provided',
      '{{deliveredDate}}': order.deliveredAt
        ? new Date(order.deliveredAt).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })
        : '',
      '{{shippedDate}}': order.shippedAt
        ? new Date(order.shippedAt).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })
        : '',
    }

    // Add event-specific replacements if available
    if (order.items?.[0]?.productTitle) {
      replacements['{{eventTitle}}'] = order.items[0].productTitle
    }

    // Apply replacements
    let subject = template.subject
    let bodyText = template.bodyText
    let heading = template.heading
    let ctaText = template.ctaText || ''
    let ctaUrl = template.ctaUrl || ''
    let footerText = template.footerText || ''

    for (const [placeholder, value] of Object.entries(replacements)) {
      subject = subject.replace(new RegExp(escapeRegex(placeholder), 'g'), value)
      bodyText = bodyText.replace(new RegExp(escapeRegex(placeholder), 'g'), value)
      heading = heading.replace(new RegExp(escapeRegex(placeholder), 'g'), value)
      ctaText = ctaText.replace(new RegExp(escapeRegex(placeholder), 'g'), value)
      ctaUrl = ctaUrl.replace(new RegExp(escapeRegex(placeholder), 'g'), value)
      footerText = footerText.replace(new RegExp(escapeRegex(placeholder), 'g'), value)
    }

    // Build order items HTML
    let itemsHtml = ''
    if (template.includeOrderItems && order.items) {
      itemsHtml = `
        <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
          <thead>
            <tr style="border-bottom: 2px solid #e5e7eb;">
              <th style="text-align: left; padding: 8px 0; font-size: 14px;">Item</th>
              <th style="text-align: center; padding: 8px 0; font-size: 14px;">Qty</th>
              <th style="text-align: right; padding: 8px 0; font-size: 14px;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${order.items
              .map(
                (item: any) => `
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 8px 0; font-size: 14px;">
                  ${item.productTitle}${item.variantName ? ` (${item.variantName})` : ''}
                </td>
                <td style="text-align: center; padding: 8px 0; font-size: 14px;">${item.quantity}</td>
                <td style="text-align: right; padding: 8px 0; font-size: 14px;">${formatPriceSimple(item.lineTotal)}</td>
              </tr>
            `,
              )
              .join('')}
            <tr>
              <td colspan="2" style="text-align: right; padding: 12px 0; font-weight: bold; font-size: 14px;">Total</td>
              <td style="text-align: right; padding: 12px 0; font-weight: bold; font-size: 14px;">${formatPriceSimple(order.total)}</td>
            </tr>
          </tbody>
        </table>
      `
    }

    // Build email HTML
    const html = buildEmailHtml({
      preheader: template.preheader || '',
      heading,
      bodyText: bodyText.replace(/\n/g, '<br>'),
      itemsHtml,
      ctaText,
      ctaUrl,
      footerText: footerText.replace(/\n/g, '<br>'),
    })

    // Send via CMS-configured mail provider (MailSettings global)
    await sendEmail({ to: order.customerEmail, subject, html })

    console.log(`✅ Email "${trigger}" sent to ${order.customerEmail} for order ${order.orderNumber}`)
  } catch (error) {
    console.error(`❌ Failed to send email "${trigger}" for order ${order.orderNumber}:`, error)
  }
}

function buildEmailHtml(params: {
  preheader: string
  heading: string
  bodyText: string
  itemsHtml: string
  ctaText: string
  ctaUrl: string
  footerText: string
}): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!--[if !mso]><!-->
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
    body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
  </style>
  <!--<![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: #f9fafb;">
  ${params.preheader ? `<div style="display: none; max-height: 0; overflow: hidden;">${params.preheader}</div>` : ''}

  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="width: 100%; max-width: 600px; border-collapse: collapse;">
          <!-- Main content -->
          <tr>
            <td style="background-color: #ffffff; border-radius: 8px; padding: 40px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
              <h1 style="margin: 0 0 16px; font-size: 24px; font-weight: 700; color: #111827;">
                ${params.heading}
              </h1>
              <div style="font-size: 15px; line-height: 1.6; color: #374151; margin-bottom: 24px;">
                ${params.bodyText}
              </div>

              ${params.itemsHtml}

              ${
                params.ctaText && params.ctaUrl
                  ? `
              <div style="text-align: center; margin: 32px 0;">
                <a href="${params.ctaUrl}" style="display: inline-block; background-color: #111827; color: #ffffff; padding: 12px 32px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 14px;">
                  ${params.ctaText}
                </a>
              </div>
              `
                  : ''
              }

              ${
                params.footerText
                  ? `
              <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #e5e7eb; font-size: 13px; color: #6b7280; line-height: 1.5;">
                ${params.footerText}
              </div>
              `
                  : ''
              }
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `
}

function formatPriceSimple(amountInPence: number): string {
  if (amountInPence === 0) return 'Free'
  return `£${(amountInPence / 100).toFixed(2)}`
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
