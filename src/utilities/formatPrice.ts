/**
 * Format a price in pence/cents to a display string.
 * e.g. 1999 → "£19.99", 0 → "Free"
 */
export function formatPrice(amountInPence: number, currency: string = 'GBP'): string {
  if (amountInPence === 0) return 'Free'

  const symbols: Record<string, string> = {
    GBP: '£',
    USD: '$',
    EUR: '€',
  }

  const symbol = symbols[currency] || '£'
  const amount = (amountInPence / 100).toFixed(2)
  return `${symbol}${amount}`
}
