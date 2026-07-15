import React from 'react'
import Link from 'next/link'

export const metadata = {
  title: 'Order Cancelled',
  robots: { index: false },
}

export default function CheckoutCancelPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-16 bg-background">
      <div className="w-full max-w-lg text-center">
        <div className="text-5xl mb-6">🛒</div>

        <h1 className="text-2xl font-semibold text-foreground mb-3">
          Your order was cancelled
        </h1>

        <p className="text-muted-foreground mb-8">
          No payment was taken. Your cart is still saved — head back to the shop whenever you're
          ready.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Continue Shopping
          </Link>
          <Link
            href="/cart"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors"
          >
            View Cart
          </Link>
        </div>
      </div>
    </main>
  )
}
