import type { Payload } from 'payload'
import { sendEmail } from '@/lib/mailer'

interface RecoveryStep {
  trigger: string
  delayMs: number
  emailNumber: number
}

const RECOVERY_STEPS: RecoveryStep[] = [
  { trigger: 'abandoned-cart-1h', delayMs: 60 * 60 * 1000, emailNumber: 1 },
  { trigger: 'abandoned-cart-24h', delayMs: 24 * 60 * 60 * 1000, emailNumber: 2 },
]

export async function processAbandonedCarts(payload: Payload) {
  const now = Date.now()

  for (const step of RECOVERY_STEPS) {
    const cutoffDate = new Date(now - step.delayMs).toISOString()

    const carts = await payload.find({
      collection: 'abandoned-carts',
      where: {
        and: [
          { status: { in: ['abandoned', 'email-sent'] } },
          { emailsSent: { less_than: step.emailNumber } },
          { createdAt: { less_than: cutoffDate } },
        ],
      },
      limit: 50,
    })

    if (carts.docs.length === 0) continue

    const templates = await payload.find({
      collection: 'email-templates',
      where: { trigger: { equals: step.trigger } },
      limit: 1,
    })

    const template = templates.docs[0]
    if (!template || !template.enabled) continue

    for (const cart of carts.docs) {
      try {
        const items =
          typeof cart.items === 'string' ? JSON.parse(cart.items as string) : cart.items
        const siteUrl = process.env.NEXT_PUBLIC_SERVER_URL || ''
        const recoveryLink = `${siteUrl}/api/recover-cart?token=${cart.recoveryToken}`

        const itemSummary = (items as any[])
          .map(
            (i: any) =>
              `${i.title}${i.variantName ? ` (${i.variantName})` : ''} × ${i.quantity}`,
          )
          .join(', ')

        const cartTotalFormatted = cart.cartTotal
          ? `£${((cart.cartTotal as number) / 100).toFixed(2)}`
          : ''

        const replacements: Record<string, string> = {
          '{{customerName}}': (cart.customerName as string) || 'there',
          '{{email}}': cart.email,
          '{{cartTotal}}': cartTotalFormatted,
          '{{itemCount}}': String(cart.itemCount || 0),
          '{{itemSummary}}': itemSummary,
          '{{recoveryLink}}': recoveryLink,
          '{{discountCode}}': (cart.discountCode as string) || '',
        }

        let subject = template.subject
        let bodyText = template.bodyText
        let heading = template.heading
        let ctaText = template.ctaText || 'Complete Your Order'
        let ctaUrl = template.ctaUrl || '{{recoveryLink}}'

        for (const [placeholder, value] of Object.entries(replacements)) {
          const escaped = placeholder.replace(/[{}]/g, '\\$&')
          subject = subject.replace(new RegExp(escaped, 'g'), value)
          bodyText = bodyText.replace(new RegExp(escaped, 'g'), value)
          heading = heading.replace(new RegExp(escaped, 'g'), value)
          ctaText = ctaText.replace(new RegExp(escaped, 'g'), value)
          ctaUrl = ctaUrl.replace(new RegExp(escaped, 'g'), value)
        }

        await sendEmail({
          to: cart.email,
          subject,
          html: buildEmailHtml({ heading, bodyText, ctaText, ctaUrl }),
        })

        await payload.update({
          collection: 'abandoned-carts',
          id: cart.id,
          data: {
            status: 'email-sent',
            emailsSent: step.emailNumber,
            lastEmailSentAt: new Date().toISOString(),
          },
        })

        console.log(`[AbandonedCart] Sent "${step.trigger}" email to ${cart.email}`)
      } catch (error) {
        console.error(`[AbandonedCart] Failed for cart ${cart.id}:`, error)
      }
    }
  }

  // Expire old abandoned carts after 30 days
  const expiryCutoff = new Date(now - 30 * 24 * 60 * 60 * 1000).toISOString()
  await payload.update({
    collection: 'abandoned-carts',
    where: {
      and: [
        { status: { in: ['abandoned', 'email-sent'] } },
        { createdAt: { less_than: expiryCutoff } },
      ],
    },
    data: { status: 'expired' },
  })
}

function buildEmailHtml({
  heading,
  bodyText,
  ctaText,
  ctaUrl,
}: {
  heading: string
  bodyText: string
  ctaText: string
  ctaUrl: string
}): string {
  return `
    <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
      <h1 style="font-size: 24px; margin-bottom: 16px;">${heading}</h1>
      <p style="font-size: 16px; line-height: 1.6; color: #333;">${bodyText.replace(/\n/g, '<br>')}</p>
      ${
        ctaText && ctaUrl
          ? `<a href="${ctaUrl}" style="display: inline-block; background: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 16px;">${ctaText}</a>`
          : ''
      }
    </div>
  `
}
