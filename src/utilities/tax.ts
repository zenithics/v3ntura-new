interface TaxConfig {
  enabled: boolean
  pricesIncludeTax: boolean
  defaultTaxClass: string
  taxRates: Array<{
    taxClass: string
    rate: number
    enabled?: boolean
  }>
}

interface TaxLineItem {
  unitPrice: number // in pence
  quantity: number
  taxClass?: string
}

interface TaxResult {
  subtotal: number // sum of line totals (tax-inclusive if pricesIncludeTax)
  taxAmount: number // total tax in pence
  effectiveRate: number // blended rate as percentage
  breakdown: Array<{
    taxClass: string
    rate: number
    taxableAmount: number
    taxAmount: number
  }>
}

export function calculateTax(items: TaxLineItem[], config: TaxConfig): TaxResult {
  if (!config.enabled) {
    const subtotal = items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0)
    return { subtotal, taxAmount: 0, effectiveRate: 0, breakdown: [] }
  }

  const breakdownMap = new Map<string, { rate: number; taxableAmount: number; taxAmount: number }>()
  let totalTax = 0
  let subtotal = 0

  for (const item of items) {
    const lineTotal = item.unitPrice * item.quantity
    subtotal += lineTotal

    const taxClass = item.taxClass || config.defaultTaxClass
    const rateConfig = config.taxRates.find(
      (r) => r.taxClass === taxClass && r.enabled !== false,
    )
    const rate = rateConfig?.rate ?? 0

    if (rate === 0) continue

    let taxAmount: number
    let taxableAmount: number

    if (config.pricesIncludeTax) {
      // Extract tax from inclusive price: tax = price - price / (1 + rate/100)
      taxAmount = Math.round(lineTotal - lineTotal / (1 + rate / 100))
      taxableAmount = lineTotal - taxAmount
    } else {
      taxableAmount = lineTotal
      taxAmount = Math.round(lineTotal * (rate / 100))
    }

    totalTax += taxAmount

    const existing = breakdownMap.get(taxClass)
    if (existing) {
      existing.taxableAmount += taxableAmount
      existing.taxAmount += taxAmount
    } else {
      breakdownMap.set(taxClass, { rate, taxableAmount, taxAmount })
    }
  }

  const effectiveRate =
    subtotal > 0 ? Math.round((totalTax / (subtotal - totalTax)) * 10000) / 100 : 0

  return {
    subtotal,
    taxAmount: totalTax,
    effectiveRate,
    breakdown: Array.from(breakdownMap.entries()).map(([taxClass, data]) => ({
      taxClass,
      ...data,
    })),
  }
}

export async function getTaxConfig(): Promise<TaxConfig> {
  try {
    const { getPayload } = await import('payload')
    const config = (await import('@payload-config')).default
    const payload = await getPayload({ config })
    const settings = (await payload.findGlobal({ slug: 'shop-settings' })) as any

    return {
      enabled: settings?.taxEnabled ?? true,
      pricesIncludeTax: settings?.pricesIncludeTax ?? true,
      defaultTaxClass: settings?.defaultTaxClass || 'standard',
      taxRates: settings?.taxRates || [{ taxClass: 'standard', rate: 20, enabled: true }],
    }
  } catch {
    return {
      enabled: true,
      pricesIncludeTax: true,
      defaultTaxClass: 'standard',
      taxRates: [{ taxClass: 'standard', rate: 20, enabled: true }],
    }
  }
}
