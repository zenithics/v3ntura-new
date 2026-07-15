'use client'

import React from 'react'
import Link from 'next/link'
import { useCart } from '@/hooks/useCart'
import { formatPrice } from '@/utilities/formatPrice'

interface ProductCardProps {
  product: any
  showPrice?: boolean
  averageRating?: number
  reviewCount?: number
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, showPrice = true, averageRating = 0, reviewCount = 0 }) => {
  const { addItem } = useCart()

  const firstImage =
    product.images?.[0]?.image && typeof product.images[0].image === 'object'
      ? product.images[0].image
      : null

  const isOutOfStock =
    product.productType === 'physical' && product.trackStock && product.stock <= 0

  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price
  const isNew = product.tags?.includes('new') || product.badge === 'new'
  const isBestseller = product.tags?.includes('bestseller') || product.badge === 'bestseller'

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (isOutOfStock || product.hasVariants) return
    addItem({
      productId: product.id,
      title: product.title,
      unitPrice: product.price,
      quantity: 1,
      image: firstImage,
      slug: product.slug,
      type: 'product',
    })
  }

  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group flex flex-col bg-white rounded-2xl border border-[var(--brand-rose-mist)] overflow-hidden hover:border-primary/40 hover:shadow-[0_4px_24px_rgba(232,23,122,0.08)] transition-all duration-300"
    >
      {/* Image container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[var(--brand-blush)]">
        {firstImage ? (
          <img
            src={firstImage.url}
            alt={product.images[0].alt || product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl">💅</div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {isNew && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[var(--brand-blush)] text-primary border border-primary/20">
              New In
            </span>
          )}
          {isBestseller && !isNew && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[var(--brand-rose-mist)] text-primary/80">
              Bestseller
            </span>
          )}
          {hasDiscount && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#FFF3E0] text-amber-700">
              Sale
            </span>
          )}
        </div>

        {/* Out of stock overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <span className="text-xs font-medium bg-white/90 px-3 py-1.5 rounded-full border border-border text-muted-foreground">
              Out of Stock
            </span>
          </div>
        )}

        {/* Quick add — appears on hover */}
        {!isOutOfStock && !product.hasVariants && (
          <div className="absolute bottom-0 inset-x-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button
              onClick={handleQuickAdd}
              className="w-full py-3 bg-[var(--brand-deep-plum)] text-white text-xs font-semibold tracking-wider hover:bg-primary transition-colors"
            >
              Quick Add
            </button>
          </div>
        )}
        {product.hasVariants && (
          <div className="absolute bottom-0 inset-x-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <div className="w-full py-3 bg-[var(--brand-deep-plum)] text-white text-xs font-semibold tracking-wider text-center">
              View Options →
            </div>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-semibold text-sm text-foreground mb-0.5 line-clamp-1 group-hover:text-primary transition-colors">
          {product.title}
        </h3>
        {product.shortDescription && (
          <p className="text-xs text-muted-foreground mb-2 line-clamp-1">{product.shortDescription}</p>
        )}
        {showPrice && (
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-sm font-bold text-primary">{formatPrice(product.price)}</span>
            {hasDiscount && (
              <span className="text-xs text-muted-foreground line-through">{formatPrice(product.compareAtPrice)}</span>
            )}
          </div>
        )}
        {reviewCount > 0 && (
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-0.5">
              {[1,2,3,4,5].map((s) => (
                <svg key={s} viewBox="0 0 20 20" className="w-3 h-3" aria-hidden="true">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    fill={averageRating >= s ? 'var(--color-primary, #E8177A)' : '#D1D5DB'} />
                </svg>
              ))}
            </div>
            <span className="text-[10px] text-muted-foreground">({reviewCount})</span>
          </div>
        )}
      </div>
    </Link>
  )
}
