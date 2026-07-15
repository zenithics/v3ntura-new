import type { Payload } from 'payload'
import type { EmailTemplate } from '@/payload-types'

type EmailTemplateData = Omit<EmailTemplate, 'id' | 'createdAt' | 'updatedAt' | 'sizes' | 'collection' | 'deletedAt'>

/**
 * Seed the default email templates.
 * Run once after installing the addon:
 *   npx tsx seed/emailTemplates.ts
 * Or call from a Payload seed script.
 */
export async function seedEmailTemplates(payload: Payload): Promise<void> {
  const templates: EmailTemplateData[] = [
    {
      name: 'Order Confirmation',
      trigger: 'order-confirmation',
      enabled: true,
      subject: 'Order confirmed — {{orderNumber}}',
      preheader: 'Thanks for your order! Here are your details.',
      heading: 'Order Confirmed ✅',
      bodyText:
        'Hi {{customerName}},\n\nThanks for your order! We\'ve received your payment and your order {{orderNumber}} is being processed.\n\nWe\'ll send you another email when your order ships.',
      ctaText: 'View Your Order',
      ctaUrl: '{{orderUrl}}',
      footerText:
        'If you have any questions about your order, just reply to this email.\n\nThanks for shopping with us!',
      includeOrderItems: true,
    },
    {
      name: 'Payment Received',
      trigger: 'payment-received',
      enabled: false, // Disabled by default — order-confirmation covers this
      subject: 'Payment received — {{orderNumber}}',
      preheader: 'We\'ve received your payment.',
      heading: 'Payment Received 💳',
      bodyText:
        'Hi {{customerName}},\n\nWe\'ve received your payment of {{orderTotal}} for order {{orderNumber}}.\n\nYour order is now being processed.',
      ctaText: '',
      ctaUrl: '',
      footerText: '',
      includeOrderItems: false,
    },
    {
      name: 'Order Shipped',
      trigger: 'order-shipped',
      enabled: true,
      subject: 'Your order is on its way! — {{orderNumber}}',
      preheader: 'Your order has been shipped.',
      heading: 'Your Order Has Shipped 📦',
      bodyText:
        'Hi {{customerName}},\n\nGreat news — your order {{orderNumber}} has been shipped!\n\nTracking number: {{trackingNumber}}',
      ctaText: 'Track Your Order',
      ctaUrl: '{{trackingUrl}}',
      footerText:
        'Please allow 3-5 business days for delivery. If you have any questions, reply to this email.',
      includeOrderItems: true,
    },
    {
      name: 'Booking Confirmation',
      trigger: 'booking-confirmation',
      enabled: true,
      subject: 'Booking confirmed — {{eventTitle}}',
      preheader: 'You\'re all set! Here are your ticket details.',
      heading: 'Booking Confirmed 🎟️',
      bodyText:
        'Hi {{customerName}},\n\nYou\'re booked in for {{eventTitle}} on {{eventDate}}!\n\nYour booking reference is {{orderNumber}}. Please bring this email or quote your booking reference at the door.',
      ctaText: 'View Event Details',
      ctaUrl: '{{eventUrl}}',
      footerText:
        'Need to cancel or change your booking? Reply to this email and we\'ll sort it out.',
      includeOrderItems: true,
    },
    {
      name: 'Refund Notification',
      trigger: 'refund-notification',
      enabled: true,
      subject: 'Refund processed — {{orderNumber}}',
      preheader: 'Your refund has been processed.',
      heading: 'Refund Processed 💰',
      bodyText:
        'Hi {{customerName}},\n\nWe\'ve processed a refund of {{refundAmount}} for your order {{orderNumber}}.\n\nPlease allow 5-10 business days for the refund to appear on your statement.',
      ctaText: '',
      ctaUrl: '',
      footerText: 'If you have any questions, reply to this email.',
      includeOrderItems: false,
    },
    {
      name: 'Abandoned Cart (1 hour)',
      trigger: 'abandoned-cart-1h',
      enabled: true,
      subject: "You left something behind! 🛒",
      preheader: 'Your cart is waiting for you.',
      heading: 'Forgot something?',
      bodyText:
        'Hi {{customerName}},\n\nYou left {{itemCount}} item(s) in your cart:\n\n{{itemSummary}}\n\nYour cart total is {{cartTotal}}. Complete your order before these items sell out!',
      ctaText: 'Complete Your Order',
      ctaUrl: '{{recoveryLink}}',
      footerText: '',
      includeOrderItems: false,
    },
    {
      name: 'Abandoned Cart (24 hours)',
      trigger: 'abandoned-cart-24h',
      enabled: true,
      subject: 'Your cart is waiting for you ✨',
      preheader: 'Still thinking it over?',
      heading: 'Still thinking it over?',
      bodyText:
        'Hi {{customerName}},\n\nYour cart with {{itemCount}} item(s) is still waiting:\n\n{{itemSummary}}\n\nDon\'t miss out — complete your order today.',
      ctaText: 'Return to Your Cart',
      ctaUrl: '{{recoveryLink}}',
      footerText: '',
      includeOrderItems: false,
    },
    {
      name: 'Order Delivered',
      trigger: 'order-delivered',
      enabled: true,
      subject: 'Your order {{orderNumber}} has been delivered!',
      preheader: 'Your order has arrived.',
      heading: 'Order Delivered ✅',
      bodyText:
        'Great news, {{customerName}}! Your order {{orderNumber}} has been delivered.\n\nIf you have any issues with your order, please don\'t hesitate to contact us.',
      ctaText: 'View Order',
      ctaUrl: '{{orderUrl}}',
      footerText: 'Thank you for shopping with us!',
      includeOrderItems: true,
    },
    {
      name: 'Order Cancelled',
      trigger: 'order-cancelled',
      enabled: true,
      subject: 'Your order {{orderNumber}} has been cancelled',
      preheader: 'Your order has been cancelled.',
      heading: 'Order Cancelled',
      bodyText:
        'Hi {{customerName}},\n\nYour order {{orderNumber}} has been cancelled.\n\nIf you have any questions, please contact our support team.',
      ctaText: 'Contact Support',
      ctaUrl: '{{orderUrl}}',
      footerText: 'If you believe this is an error, please reply to this email.',
      includeOrderItems: true,
    },
  ]

  for (const template of templates) {
    const existing = await payload.find({
      collection: 'email-templates',
      where: { trigger: { equals: template.trigger } },
      limit: 1,
    })

    if (existing.docs.length === 0) {
      try {
        await payload.create({
          collection: 'email-templates',
          data: template,
        })
        console.log(`✅ Created email template: ${template.name}`)
      } catch (err: any) {
        // Race condition: another worker created it between our check and insert
        if (err?.data?.errors?.[0]?.message === 'Value must be unique') {
          console.log(`⏭️  Email template "${template.name}" already exists (race), skipping.`)
        } else {
          throw err  // Re-throw unexpected errors
        }
      }
    } else {
      console.log(`⏭️  Email template "${template.name}" already exists, skipping.`)
    }
  }
}
