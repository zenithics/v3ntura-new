import type { CollectionAfterChangeHook } from 'payload'
import { sendOrderEmail } from '@/utilities/emails'

const STATUS_TO_TRIGGER: Record<string, string> = {
  shipped: 'order-shipped',
  delivered: 'order-delivered',
  cancelled: 'order-cancelled',
  refunded: 'refund-notification',
}

export const sendOrderStatusEmail: CollectionAfterChangeHook = async ({
  doc,
  previousDoc,
  operation,
  req,
}) => {
  // Only send on status changes, not on order creation (webhook handles that)
  if (operation !== 'update') return doc
  if (!previousDoc?.status || !doc?.status) return doc
  if (previousDoc.status === doc.status) return doc

  const trigger = STATUS_TO_TRIGGER[doc.status]
  if (!trigger) return doc

  if (!doc.customerEmail) return doc

  try {
    await sendOrderEmail(trigger, doc, req.payload)
    console.log(
      `[OrderEmail] Sent "${trigger}" email to ${doc.customerEmail} for order ${doc.orderNumber}`,
    )
  } catch (error) {
    // Log but don't fail the order update
    console.error(`[OrderEmail] Failed to send "${trigger}" email:`, error)
  }

  return doc
}
