'use client'

import React, { useState, useMemo } from 'react'
import { ProductCard } from '@/components/ProductCard'

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name', label: 'Name A–Z' },
]

export const ShopClient: React.FC<{ products: any[]; categories: any[] }> = ({
  products,
  categories,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [sortBy, setSortBy] = useState('newest')

  const filtered = useMemo(() => {
    let list = [...products]

    if (activeCategory !== 'all') {
      list = list.filter((p) => {
        if (!p.categories) return false
        return p.categories.some(
          (c: any) => (typeof c === 'object' ? c.id : c) === activeCategory,
        )
      })
    }

    switch (sortBy) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        list.sort((a, b) => b.price - a.price)
        break
      case 'name':
        list.sort((a, b) => a.title.localeCompare(b.title))
        break
      default:
        break
    }

    return list
  }, [products, activeCategory, sortBy])

  return (
    <main className="min-h-screen bg-[#FDF8FB]">
      {/* Page header */}
      <div className="max-w-[1280px] mx-auto px-6 pt-12 pb-8">
        <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-2">
          Shop All Nails
        </h1>
        <p className="text-muted-foreground text-sm">
          {products.length} styles available · Free UK shipping over £30
        </p>
      </div>

      {/* Filters + Sort bar */}
      <div className="sticky top-[105px] z-30 bg-[#FDF8FB]/95 backdrop-blur-sm border-b border-[var(--brand-rose-mist)]">
        <div className="max-w-[1280px] mx-auto px-6 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          {/* Category pills */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                activeCategory === 'all'
                  ? 'bg-primary text-white'
                  : 'border border-[var(--brand-rose-mist)] text-foreground/70 hover:border-primary hover:text-primary'
              }`}
            >
              All Styles
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  activeCategory === cat.id
                    ? 'bg-primary text-white'
                    : 'border border-[var(--brand-rose-mist)] text-foreground/70 hover:border-primary hover:text-primary'
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>

          {/* Sort dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-xs border border-[var(--brand-rose-mist)] rounded-full px-4 py-1.5 bg-white text-foreground/70 focus:outline-none focus:border-primary cursor-pointer"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Product grid */}
      <div className="max-w-[1280px] mx-auto px-6 py-8">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">💅</div>
            <h2 className="font-serif text-2xl mb-2">Nothing here yet</h2>
            <p className="text-muted-foreground text-sm mb-6">
              No products in this category — check back soon!
            </p>
            <button
              onClick={() => setActiveCategory('all')}
              className="px-6 py-3 rounded-full bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors"
            >
              View All Products
            </button>
          </div>
        )}
      </div>
    </main>
  )
}
