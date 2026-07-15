export interface Carrier {
  name: string
  code: string
  trackingUrlTemplate: string // {tracking} is replaced with the tracking number
  country: 'UK' | 'US' | 'International'
}

export const carriers: Carrier[] = [
  // UK Carriers
  { name: 'Royal Mail', code: 'royal_mail', trackingUrlTemplate: 'https://www.royalmail.com/track-your-item#/tracking-results/{tracking}', country: 'UK' },
  { name: 'DPD (UK)', code: 'dpd_uk', trackingUrlTemplate: 'https://track.dpd.co.uk/parcels/{tracking}', country: 'UK' },
  { name: 'Evri (Hermes)', code: 'evri', trackingUrlTemplate: 'https://www.evri.com/track/parcel/{tracking}', country: 'UK' },
  { name: 'DHL (UK)', code: 'dhl_uk', trackingUrlTemplate: 'https://www.dhl.com/gb-en/home/tracking.html?tracking-id={tracking}', country: 'UK' },
  { name: 'Parcelforce', code: 'parcelforce', trackingUrlTemplate: 'https://www.parcelforce.com/track-trace?trackNumber={tracking}', country: 'UK' },
  { name: 'Yodel', code: 'yodel', trackingUrlTemplate: 'https://www.yodel.co.uk/track/{tracking}', country: 'UK' },
  { name: 'Amazon Logistics (UK)', code: 'amazon_uk', trackingUrlTemplate: 'https://track.amazon.co.uk/tracking/{tracking}', country: 'UK' },

  // US Carriers
  { name: 'USPS', code: 'usps', trackingUrlTemplate: 'https://tools.usps.com/go/TrackConfirmAction?tLabels={tracking}', country: 'US' },
  { name: 'UPS', code: 'ups', trackingUrlTemplate: 'https://www.ups.com/track?tracknum={tracking}', country: 'US' },
  { name: 'FedEx', code: 'fedex', trackingUrlTemplate: 'https://www.fedex.com/fedextrack/?trknbr={tracking}', country: 'US' },
  { name: 'DHL (US)', code: 'dhl_us', trackingUrlTemplate: 'https://www.dhl.com/us-en/home/tracking.html?tracking-id={tracking}', country: 'US' },

  // International
  { name: 'DHL International', code: 'dhl_intl', trackingUrlTemplate: 'https://www.dhl.com/global-en/home/tracking.html?tracking-id={tracking}', country: 'International' },
]

export function getCarrierByCode(code: string): Carrier | undefined {
  return carriers.find((c) => c.code === code)
}

export function generateTrackingUrl(carrierCode: string, trackingNumber: string): string | null {
  const carrier = getCarrierByCode(carrierCode)
  if (!carrier || !trackingNumber) return null
  return carrier.trackingUrlTemplate.replace('{tracking}', encodeURIComponent(trackingNumber))
}

export function getCarrierOptions(): { label: string; value: string }[] {
  return carriers.map((c) => ({
    label: `${c.name} (${c.country})`,
    value: c.code,
  }))
}
