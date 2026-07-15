import React from 'react'
import Link from 'next/link'
import { Media } from '@/components/Media'

interface UpsellProductsProps {
  products: any[]
  title?: string
}

export function UpsellProducts({ products, title = 'Complete the look' }: UpsellProductsProps) {
  if (!products || products.length === 0) return null

  return (
    <section className="py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-serif text-xl md:text-2xl mb-6">{title}</h2>
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-2 px-2 snap-x">
          {products.map((product: any) => {
            const p = typeof product === 'object' ? product : null
            if (!p) return null
            const image = p.images?.[0]?.image
            const price = p.price ? (p.price / 100).toFixed(2) : null

            return (
              <Link
                key={p.id}
                href={`/shop/${p.slug}`}
                className="flex-shrink-0 w-48 snap-start group"
              >
                {image && (
                  <div className="aspect-square rounded-lg overflow-hidden bg-gray-50 mb-3">
                    <Media
                      resource={image}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <h3 className="text-sm font-medium line-clamp-2">{p.title}</h3>
                {price && <p className="text-sm font-semibold mt-1">£{price}</p>}
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
