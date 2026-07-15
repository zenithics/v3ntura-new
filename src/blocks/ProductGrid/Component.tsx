'use client'

import React from 'react'
import { ProductCard } from '@/components/ProductCard'

import type { ProductGridBlock as ProductGridBlockProps } from '@/payload-types'

const columnClasses: Record<string, string> = {
  '2': 'md:grid-cols-2',
  '3': 'md:grid-cols-2 lg:grid-cols-3',
  '4': 'md:grid-cols-2 lg:grid-cols-4',
}

export const ProductGridBlock: React.FC<
  ProductGridBlockProps & {
    products?: any[] // Populated server-side or via API
  }
> = ({ heading, description, columns = '3', products = [] }) => {
  return (
    <div className="container">
      {(heading || description) && (
        <div className="text-center mb-12 max-w-2xl mx-auto">
          {heading && <h2 className="text-3xl font-bold mb-4">{heading}</h2>}
          {description && <p className="text-muted-foreground">{description}</p>}
        </div>
      )}

      {products.length > 0 ? (
        <div
          className={`grid grid-cols-1 ${columnClasses[columns ?? '3'] || columnClasses['3']} gap-6`}
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">No products found.</p>
      )}
    </div>
  )
}
