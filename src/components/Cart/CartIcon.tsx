'use client'

import React from 'react'
import Link from 'next/link'
import { useCart } from '@/hooks/useCart'

/**
 * A cart icon with item count badge.
 * Drop this into your Header component.
 */
export const CartIcon: React.FC = () => {
  const { itemCount } = useCart()

  return (
    <Link href="/cart" className="relative inline-flex items-center p-2 hover:opacity-80 transition-opacity">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="8" cy="21" r="1" />
        <circle cx="19" cy="21" r="1" />
        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
      </svg>
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </Link>
  )
}
