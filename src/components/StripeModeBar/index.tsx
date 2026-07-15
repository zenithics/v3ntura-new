import { getPayload } from 'payload'
import config from '@payload-config'

export async function StripeModeBar() {
  try {
    const payload = await getPayload({ config })
    const settings = await payload.findGlobal({ slug: 'shop-settings' })
    const mode = (settings as any)?.stripe?.mode

    if (mode !== 'test') return null
  } catch {
    // If settings not yet configured, assume test (safe default)
  }

  return (
    <div className="w-full bg-amber-400 text-amber-900 text-center text-xs font-semibold py-2 px-4 z-50">
      ⚠️ Stripe Test Mode — No real payments are being processed
    </div>
  )
}
