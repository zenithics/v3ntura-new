'use client'

import React from 'react'
import Link from 'next/link'
import { ProductCard } from '@/components/ProductCard'

import type { FeaturedProductsBlock as FeaturedProductsBlockProps } from '@/payload-types'

export const FeaturedProductsBlock: React.FC<
  FeaturedProductsBlockProps & {
    products?: any[]
  }
> = ({ heading, description, products = [], ctaText, ctaLink, showPrices = true }) => {
  return (
    <div className="container">
      {(heading || description) && (
        <div className="text-center mb-12 max-w-2xl mx-auto">
          {heading && <h2 className="text-3xl font-bold mb-4">{heading}</h2>}
          {description && <p className="text-muted-foreground">{description}</p>}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} showPrice={showPrices ?? true} />
        ))}
      </div>

      {ctaText && ctaLink && (
        <div className="text-center mt-10">
          <Link
            href={ctaLink}
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
          >
            {ctaText}
          </Link>
        </div>
      )}
    </div>
  )
}
