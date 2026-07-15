import type { CollectionBeforeChangeHook } from 'payload'
import { generateTrackingUrl } from '../../utilities/carriers'

export const setTrackingUrl: CollectionBeforeChangeHook = async ({ data, originalDoc }) => {
  const carrier = data?.carrier ?? originalDoc?.carrier
  const trackingNumber = data?.trackingNumber ?? originalDoc?.trackingNumber

  if (carrier && trackingNumber) {
    data.trackingUrl = generateTrackingUrl(carrier, trackingNumber)
  }

  // Auto-set shippedAt when status changes to 'shipped'
  if (data?.status === 'shipped' && originalDoc?.status !== 'shipped' && !data.shippedAt) {
    data.shippedAt = new Date().toISOString()
  }

  // Auto-set deliveredAt when status changes to 'delivered'
  if (data?.status === 'delivered' && originalDoc?.status !== 'delivered' && !data.deliveredAt) {
    data.deliveredAt = new Date().toISOString()
  }

  return data
}
