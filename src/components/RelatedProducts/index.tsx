import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import { Media } from '@/components/Media'

interface RelatedProductsProps {
  productId: string
  relatedProducts?: any[]
  categoryId?: string
  title?: string
  limit?: number
}

export async function RelatedProducts({
  productId,
  relatedProducts,
  categoryId,
  title = 'You may also like',
  limit = 4,
}: RelatedProductsProps) {
  let products = relatedProducts || []

  // If no manually curated related products, auto-suggest from same category
  if (products.length === 0 && categoryId) {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'products',
      where: {
        and: [
          { id: { not_equals: productId } },
          { category: { equals: categoryId } },
          { status: { equals: 'active' } },
        ],
      },
      limit,
      sort: '-createdAt',
    })
    products = result.docs
  }

  if (products.length === 0) return null

  return (
    <section className="py-16 px-6 bg-[var(--theme-bg,#FDF8FB)]">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-serif text-2xl md:text-3xl mb-8 text-center">{title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.slice(0, limit).map((product: any) => {
            const p = typeof product === 'object' ? product : null
            if (!p) return null
            const image = p.images?.[0]?.image
            const price = p.price ? (p.price / 100).toFixed(2) : null
            const comparePrice = p.compareAtPrice ? (p.compareAtPrice / 100).toFixed(2) : null

            return (
              <Link
                key={p.id}
                href={`/shop/${p.slug}`}
                className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {image && (
                  <div className="aspect-square overflow-hidden bg-gray-50">
                    <Media
                      resource={image}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="text-sm font-medium line-clamp-2 group-hover:text-[var(--brand-primary)] transition-colors">
                    {p.title}
                  </h3>
                  {price && (
                    <div className="mt-2 flex items-center gap-2">
                      <span className="font-semibold">£{price}</span>
                      {comparePrice && (
                        <span className="text-xs text-gray-400 line-through">
                          £{comparePrice}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
