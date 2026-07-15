'use client'

import React, { useEffect, useState } from 'react'
import { useWishlist } from '@/components/WishlistProvider'
import { cn } from '@/utilities/ui'

interface WishlistButtonProps {
  product: {
    id: string
    title: string
    price?: number
    images?: { image?: any; alt?: string }[]
    slug: string
  }
  className?: string
  size?: 'sm' | 'md'
  showLabel?: boolean
}

export const WishlistButton: React.FC<WishlistButtonProps> = ({
  product,
  className,
  size = 'md',
  showLabel = false,
}) => {
  const { toggleItem, isInWishlist } = useWishlist()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const inWishlist = mounted && isInWishlist(String(product.id))

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const image =
      product.images?.[0]?.image && typeof product.images[0].image === 'object'
        ? { url: product.images[0].image.url, alt: product.images[0].alt || product.title }
        : null

    toggleItem({
      productId: String(product.id),
      title: product.title,
      price: product.price || 0,
      image,
      slug: product.slug,
    })
  }

  const iconSize = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'
  const btnSize = size === 'sm' ? 'w-8 h-8' : 'w-10 h-10'

  return (
    <button
      onClick={handleClick}
      aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
      title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
      className={cn(
        'flex items-center justify-center gap-1.5 rounded-full border transition-all',
        inWishlist
          ? 'border-rose-300 bg-rose-50 text-rose-500 hover:bg-rose-100'
          : 'border-border bg-card text-muted-foreground hover:border-rose-300 hover:text-rose-400',
        showLabel ? 'px-3 h-9 text-xs font-medium' : btnSize,
        className,
      )}
    >
      <svg
        viewBox="0 0 24 24"
        className={cn(iconSize, 'transition-transform', inWishlist ? 'scale-110' : '')}
        fill={inWishlist ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
      {showLabel && (inWishlist ? 'Saved' : 'Save')}
    </button>
  )
}
