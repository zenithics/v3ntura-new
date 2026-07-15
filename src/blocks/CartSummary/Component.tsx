'use client'

import React from 'react'
import Link from 'next/link'
import { useCart } from '@/hooks/useCart'
import { formatPrice } from '@/utilities/formatPrice'

import type { CartSummaryBlock as CartSummaryBlockProps } from '@/payload-types'

export const CartSummaryBlock: React.FC<CartSummaryBlockProps> = ({
  heading = 'Your Cart',
  emptyCartMessage = 'Your cart is empty',
  showContinueShopping = true,
  continueShoppingLink = '/shop',
}) => {
  const { items, removeItem, updateQuantity, total, itemCount } = useCart()

  if (items.length === 0) {
    return (
      <div className="container max-w-2xl text-center py-12">
        <h2 className="text-2xl font-bold mb-4">{heading}</h2>
        <p className="text-muted-foreground mb-6">{emptyCartMessage}</p>
        {showContinueShopping && (
          <Link
            href={continueShoppingLink ?? '/shop'}
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
          >
            Continue Shopping
          </Link>
        )}
      </div>
    )
  }

  return (
    <div className="container max-w-4xl">
      <h2 className="text-2xl font-bold mb-8">
        {heading} ({itemCount} {itemCount === 1 ? 'item' : 'items'})
      </h2>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.cartItemId}
            className="flex items-center gap-4 p-4 rounded-lg border border-border bg-card"
          >
            {item.image && (
              <img
                src={typeof item.image === 'string' ? item.image : item.image.url}
                alt={item.title}
                className="w-20 h-20 object-cover rounded-md"
              />
            )}

            <div className="flex-1 min-w-0">
              <h3 className="font-semibold truncate">{item.title}</h3>
              {item.variantName && (
                <p className="text-sm text-muted-foreground">{item.variantName}</p>
              )}
              <p className="text-sm font-medium">{formatPrice(item.unitPrice)}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                className="w-8 h-8 rounded border border-border flex items-center justify-center hover:bg-muted transition-colors"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="w-8 text-center text-sm">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                className="w-8 h-8 rounded border border-border flex items-center justify-center hover:bg-muted transition-colors"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <p className="font-semibold w-20 text-right">
              {formatPrice(item.unitPrice * item.quantity)}
            </p>

            <button
              onClick={() => removeItem(item.cartItemId)}
              className="text-muted-foreground hover:text-destructive transition-colors"
              aria-label="Remove item"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col items-end gap-4">
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Subtotal</p>
          <p className="text-2xl font-bold">{formatPrice(total)}</p>
          <p className="text-xs text-muted-foreground">Shipping calculated at checkout</p>
        </div>

        <Link
          href="/checkout"
          className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
        >
          Proceed to Checkout
        </Link>

        {showContinueShopping && (
          <Link
            href={continueShoppingLink ?? '/shop'}
            className="text-sm text-muted-foreground hover:text-foreground underline transition-colors"
          >
            Continue Shopping
          </Link>
        )}
      </div>
    </div>
  )
}
