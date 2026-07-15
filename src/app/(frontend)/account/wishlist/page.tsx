'use client'

import React from 'react'
import Link from 'next/link'
import { useWishlist } from '@/components/WishlistProvider'
import { WishlistButton } from '@/components/WishlistButton'
import { formatPrice } from '@/utilities/formatPrice'

export default function WishlistPage() {
  const { items, clearWishlist } = useWishlist()

  return (
    <div className="container py-16 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">My Wishlist</h1>
        {items.length > 0 && (
          <button
            onClick={clearWishlist}
            className="text-xs text-muted-foreground hover:text-destructive transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🤍</div>
          <h2 className="text-lg font-semibold mb-2">Your wishlist is empty</h2>
          <p className="text-muted-foreground text-sm mb-6">
            Save products you love by clicking the heart icon.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center h-10 px-6 rounded-full bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Browse the Shop
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item) => (
            <div
              key={item.productId}
              className="group relative rounded-2xl border border-border bg-card overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Image */}
              <Link href={`/shop/${item.slug}`} className="block aspect-square bg-muted overflow-hidden">
                {item.image?.url ? (
                  <img
                    src={item.image.url}
                    alt={item.image.alt || item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl">💅</div>
                )}
              </Link>

              {/* Remove button */}
              <div className="absolute top-3 right-3">
                <WishlistButton
                  product={{ id: item.productId, title: item.title, slug: item.slug }}
                  size="sm"
                />
              </div>

              {/* Info */}
              <div className="p-4">
                <Link
                  href={`/shop/${item.slug}`}
                  className="font-semibold text-sm hover:text-primary transition-colors block truncate"
                >
                  {item.title}
                </Link>
                <p className="text-primary font-bold text-sm mt-1">{formatPrice(item.price)}</p>

                <Link
                  href={`/shop/${item.slug}`}
                  className="mt-3 w-full flex items-center justify-center h-9 rounded-full bg-primary text-white text-xs font-medium hover:bg-primary/90 transition-colors"
                >
                  View Product
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
