'use client'

import React, { useEffect, useContext, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { CartContext } from '@/components/CartProvider'

function CheckoutSuccessContent() {
  const { customer } = useAuth()
  const { clearCart } = useContext(CartContext)
  const searchParams = useSearchParams()
  const orderNumber = searchParams.get('order')
  const email = searchParams.get('email')

  useEffect(() => {
    clearCart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main className="bg-[#FDF8FB] min-h-screen flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-lg text-center">
        <div className="text-5xl mb-6">🎉💅✨</div>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
          Order Confirmed
        </div>

        <h1 className="font-serif text-4xl md:text-5xl mb-4 leading-tight">
          You're going to slay!
        </h1>

        {orderNumber && (
          <p className="text-sm text-muted-foreground mb-2">
            Order <span className="font-semibold text-foreground">#{orderNumber}</span>
          </p>
        )}

        <p className="text-sm text-muted-foreground leading-relaxed mb-8 max-w-sm mx-auto">
          Thank you for your order! A confirmation is on its way to{' '}
          <span className="font-medium text-foreground">{email ?? 'your inbox'}</span>.
        </p>

        {/* Trust signals */}
        <div className="grid grid-cols-3 gap-4 mb-10 max-w-sm mx-auto">
          {[
            { icon: '📦', label: 'Packed with care' },
            { icon: '🚚', label: 'Tracked delivery' },
            { icon: '↩️', label: '30-day returns' },
          ].map(({ icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-1.5 bg-white rounded-xl border border-[var(--brand-rose-mist)] p-3">
              <span className="text-2xl">{icon}</span>
              <span className="text-[10px] text-muted-foreground text-center leading-tight">{label}</span>
            </div>
          ))}
        </div>

        {/* Account prompt for guests */}
        {!customer && (
          <div className="bg-[var(--brand-blush)] rounded-2xl border border-[var(--brand-rose-mist)] p-6 mb-8 text-left">
            <h2 className="font-semibold text-sm mb-1">Track your order</h2>
            <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
              Create a free account to track your delivery, view order history, and reorder your favourites in seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href={`/account/register${email ? `?email=${encodeURIComponent(email)}` : ''}`}
                className="flex-1 py-3 rounded-full bg-primary text-white text-xs font-bold text-center hover:bg-primary/90 transition-colors"
              >
                Create Account
              </Link>
              <Link
                href="/account/login"
                className="flex-1 py-3 rounded-full border border-[var(--brand-rose-mist)] text-xs font-bold text-center hover:bg-white transition-colors"
              >
                Sign In
              </Link>
            </div>
          </div>
        )}

        {customer && (
          <div className="bg-[var(--brand-blush)] rounded-2xl border border-[var(--brand-rose-mist)] p-5 mb-8 text-left">
            <p className="text-sm text-muted-foreground">
              Signed in as <span className="font-medium text-foreground">{customer.email}</span>.{' '}
              <Link href="/account/orders" className="text-primary hover:underline">View your orders →</Link>
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/shop"
            className="px-8 py-4 rounded-full bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors shadow-[0_4px_16px_rgba(232,23,122,0.25)]"
          >
            Continue Shopping
          </Link>
          <Link
            href="/"
            className="px-8 py-4 rounded-full border border-[var(--brand-rose-mist)] text-sm font-bold hover:bg-white transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense>
      <CheckoutSuccessContent />
    </Suspense>
  )
}
