'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useWishlist } from '@/components/WishlistProvider'

export const WishlistIcon: React.FC = () => {
  const { itemCount } = useWishlist()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <Link
      href="/account/wishlist"
      aria-label={`Wishlist${mounted && itemCount > 0 ? ` (${itemCount} item${itemCount !== 1 ? 's' : ''})` : ''}`}
      className="relative flex items-center justify-center w-9 h-9 rounded-full text-muted-foreground hover:text-foreground transition-colors"
    >
      <svg
        viewBox="0 0 24 24"
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
      {mounted && itemCount > 0 && (
        <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center leading-none">
          {itemCount > 9 ? '9+' : itemCount}
        </span>
      )}
    </Link>
  )
}
