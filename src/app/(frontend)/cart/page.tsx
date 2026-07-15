'use client'

import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { CartContext } from '@/components/CartProvider'
import { formatPrice } from '@/utilities/formatPrice'
import { useAuth } from '@/hooks/useAuth'

interface DiscountInfo {
  code: string
  discountType: 'percentage' | 'fixed_amount' | 'free_shipping'
  discountValue?: number
  discountAmount: number
  message: string
}

export default function CartPage() {
  const { items, addItem, removeItem, updateQuantity, total, itemCount } = useContext(CartContext)
  const { customer } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const recover = params.get('recover')
    if (!recover) return
    try {
      const recovered = JSON.parse(decodeURIComponent(recover))
      if (Array.isArray(recovered)) {
        recovered.forEach((item: any) => {
          addItem({
            productId: item.productId,
            title: item.title,
            variantName: item.variantName || undefined,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            image: item.image ? { url: item.image } : undefined,
            slug: item.slug || '',
            type: item.type || 'product',
          } as any)
        })
      }
      window.history.replaceState({}, '', '/cart')
    } catch {
      // ignore malformed recovery param
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const [promoInput, setPromoInput] = useState('')
  const [discount, setDiscount] = useState<DiscountInfo | null>(null)
  const [applyLoading, setApplyLoading] = useState(false)
  const [applyError, setApplyError] = useState('')
  const shipping = total >= 3000 ? 0 : 395
  const discountAmount = discount?.discountType === 'free_shipping' ? shipping : (discount?.discountAmount ?? 0)
  const effectiveShipping = discount?.discountType === 'free_shipping' ? 0 : shipping
  const orderTotal = total + effectiveShipping - (discount?.discountType !== 'free_shipping' ? discountAmount : 0)

  const handleApplyCode = async () => {
    if (!promoInput.trim()) return
    setApplyLoading(true)
    setApplyError('')
    setDiscount(null)

    try {
      const res = await fetch('/api/validate-discount', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: promoInput.trim(),
          cartItems: items.map((i) => ({
            productId: i.productId,
            quantity: i.quantity,
            unitPrice: i.unitPrice,
          })),
          customerEmail: customer?.email,
        }),
      })

      const data = await res.json()

      if (!data.valid) {
        setApplyError(data.message || 'Invalid discount code')
      } else {
        setDiscount({
          code: data.code,
          discountType: data.discountType,
          discountValue: data.discountValue,
          discountAmount: data.discountAmount,
          message: data.message,
        })
        setPromoInput('')
      }
    } catch {
      setApplyError('Failed to apply code. Please try again.')
    } finally {
      setApplyLoading(false)
    }
  }

  const handleCheckout = () => {
    router.push('/checkout')
  }

  if (itemCount === 0) {
    return (
      <main className="bg-[#FDF8FB] min-h-screen flex items-center justify-center">
        <div className="text-center px-6 max-w-sm">
          <div className="text-6xl mb-6">🛍️</div>
          <h1 className="font-serif text-3xl mb-3">Your bag is empty</h1>
          <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
            Looks like you haven't added any nail sets yet. Browse our collections to find your perfect look.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors shadow-[0_4px_16px_rgba(232,23,122,0.25)]"
          >
            Shop All Nails
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="bg-[#FDF8FB] min-h-screen">
      <div className="max-w-[1280px] mx-auto px-6 py-10">
        <h1 className="font-serif text-4xl mb-8">Your Bag ({itemCount})</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Item list */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {items.map((item) => (
              <div
                key={item.cartItemId}
                className="bg-white rounded-2xl border border-[var(--brand-rose-mist)] p-5 flex gap-5"
              >
                {/* Image */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-[var(--brand-blush)] shrink-0">
                  {item.image?.url ? (
                    <img src={item.image.url} alt={item.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-3xl">💅</div>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Link
                        href={`/shop/${item.slug}`}
                        className="font-semibold text-sm hover:text-primary transition-colors line-clamp-1"
                      >
                        {item.title}
                      </Link>
                      {item.variantName && (
                        <p className="text-xs text-muted-foreground mt-0.5">{item.variantName}</p>
                      )}
                    </div>
                    <span className="text-sm font-bold text-primary shrink-0">
                      {formatPrice(item.unitPrice * item.quantity)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    {/* Quantity control */}
                    <div className="flex items-center gap-1 border border-[var(--brand-rose-mist)] rounded-full overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.cartItemId, Math.max(0, item.quantity - 1))}
                        className="w-8 h-8 flex items-center justify-center hover:bg-[var(--brand-blush)] transition-colors text-sm"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-xs font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-[var(--brand-blush)] transition-colors text-sm"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.cartItemId)}
                      className="text-xs text-muted-foreground hover:text-destructive transition-colors underline underline-offset-2"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <Link
              href="/shop"
              className="text-sm text-primary font-medium hover:underline underline-offset-2 transition-colors self-start mt-2"
            >
              ← Continue Shopping
            </Link>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-[var(--brand-rose-mist)] p-6 sticky top-28">
              <h2 className="font-semibold text-base mb-5">Order Summary</h2>

              {/* Promo code */}
              <div className="mb-5">
                {discount ? (
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2.5">
                    <div>
                      <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                        {discount.code} applied
                      </p>
                      <p className="text-xs text-emerald-600 mt-0.5">{discount.message}</p>
                    </div>
                    <button
                      onClick={() => setDiscount(null)}
                      className="text-emerald-600 hover:text-emerald-800 text-lg ml-2 leading-none"
                      aria-label="Remove discount code"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => { setPromoInput(e.target.value.toUpperCase()); setApplyError('') }}
                        onKeyDown={(e) => e.key === 'Enter' && handleApplyCode()}
                        placeholder="Promo code"
                        className="flex-1 border border-[var(--brand-rose-mist)] rounded-xl px-3 py-2 text-sm bg-background focus:outline-none focus:border-primary uppercase placeholder:normal-case"
                      />
                      <button
                        onClick={handleApplyCode}
                        disabled={applyLoading || !promoInput.trim()}
                        className="px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                      >
                        {applyLoading ? '…' : 'Apply'}
                      </button>
                    </div>
                    {applyError && (
                      <p className="text-xs text-red-600 mt-1.5">{applyError}</p>
                    )}
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-3 text-sm mb-5">
                <div className="flex justify-between text-foreground/70">
                  <span>Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
                  <span>{formatPrice(total)}</span>
                </div>
                {discount && discount.discountType !== 'free_shipping' && discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Discount ({discount.code})</span>
                    <span>−{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-foreground/70">
                  <span>Shipping</span>
                  {effectiveShipping === 0 ? (
                    <span className="text-emerald-600 font-medium">
                      Free{discount?.discountType === 'free_shipping' ? ' (code applied)' : ''}
                    </span>
                  ) : (
                    <span>{formatPrice(effectiveShipping)}</span>
                  )}
                </div>
                {effectiveShipping > 0 && (
                  <p className="text-xs text-muted-foreground bg-[var(--brand-blush)] rounded-lg px-3 py-2">
                    Add <strong>{formatPrice(3000 - total)}</strong> more for free shipping 🚚
                  </p>
                )}
              </div>

              <div className="flex justify-between font-bold text-base border-t border-[var(--brand-rose-mist)] pt-4 mb-5">
                <span>Total</span>
                <span className="text-primary">{formatPrice(Math.max(0, orderTotal))}</span>
              </div>

              <button
                onClick={handleCheckout}
                className="block w-full py-4 rounded-full bg-primary text-white text-sm font-bold text-center hover:bg-primary/90 transition-colors shadow-[0_4px_16px_rgba(232,23,122,0.25)] hover:shadow-[0_6px_20px_rgba(232,23,122,0.35)]"
              >
                Checkout Securely →
              </button>

              <div className="flex items-center justify-center gap-3 mt-4 text-[10px] text-muted-foreground">
                <span>🔒 Secure checkout</span>
                <span>·</span>
                <span>Free returns</span>
                <span>·</span>
                <span>SSL encrypted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
