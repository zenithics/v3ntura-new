'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/hooks/useCart'
import { formatPrice } from '@/utilities/formatPrice'
import RichText from '@/components/RichText'
import { SocialShare } from '@/components/SocialShare'
import { WishlistButton } from '@/components/WishlistButton'
import { VariantSelector } from '@/components/VariantSelector'

const NAIL_SHAPES = ['Almond', 'Coffin', 'Stiletto', 'Square', 'Oval', 'Round']

export const ProductDetail: React.FC<{
  product: any
  averageRating?: number
  reviewCount?: number
  productUrl?: string
  productImage?: string
  shopPrefix?: string
}> = ({ product, averageRating = 0, reviewCount = 0, productUrl = '', productImage, shopPrefix = 'shop' }) => {
  const { addItem } = useCart()
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null)
  const [activeVariant, setActiveVariant] = useState<any>(null)
  const [selectedShape, setSelectedShape] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)
  const [openAccordion, setOpenAccordion] = useState<string | null>('details')

  const hasNewVariantSystem = Boolean(product.variantOptions && product.variantOptions.length > 0)
  const oldActiveVariant =
    !hasNewVariantSystem && product.hasVariants
      ? product.variants?.find((v: any) => v.name === selectedVariant)
      : null

  const currentPrice = activeVariant?.price ?? oldActiveVariant?.priceOverride ?? product.price
  const comparePrice = product.compareAtPrice
  const hasDiscount = comparePrice && comparePrice > currentPrice

  const isOutOfStock =
    product.productType === 'physical' &&
    product.trackStock &&
    (hasNewVariantSystem
      ? activeVariant
        ? (activeVariant.stock ?? product.stock)
        : product.stock
      : (oldActiveVariant?.stockOverride ?? product.stock)) <= 0

  const canAddToCart =
    !isOutOfStock &&
    (!product.hasVariants ||
      (hasNewVariantSystem ? activeVariant !== null : Boolean(selectedVariant)))

  const handleAddToCart = () => {
    if (!canAddToCart) return

    const firstImage =
      product.images?.[0]?.image && typeof product.images[0].image === 'object'
        ? product.images[0].image
        : null

    addItem({
      productId: product.id,
      title: product.title,
      unitPrice: currentPrice,
      quantity,
      variantName:
        (hasNewVariantSystem ? activeVariant?.variantLabel : selectedVariant) || undefined,
      image:
        (activeVariant?.image && typeof activeVariant.image === 'object'
          ? activeVariant.image
          : null) || firstImage,
      slug: product.slug,
      type: 'product',
    })

    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2500)
  }

  const toggleAccordion = (key: string) =>
    setOpenAccordion(openAccordion === key ? null : key)

  const accordions = [
    {
      key: 'details',
      label: "What's Included",
      content: '24 press-on nails in 12 sizes, prep pad, mini nail file, and application instructions.',
    },
    {
      key: 'apply',
      label: 'How to Apply',
      content: 'Clean nails thoroughly with the prep pad. Select the right size for each nail. Press firmly for 30 seconds. Lasts up to 2–3 weeks.',
    },
    {
      key: 'care',
      label: 'Care Instructions',
      content: 'Avoid prolonged water exposure for the first hour. Wear gloves for heavy cleaning. To remove, soak in warm water or use acetone. Reusable if removed carefully.',
    },
    {
      key: 'shipping',
      label: 'Shipping & Returns',
      content: 'Free UK shipping on orders over £30. Standard delivery 3–5 business days. Express available. Free returns within 30 days.',
    },
  ]

  return (
    <main className="bg-[#FDF8FB] min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-[1280px] mx-auto px-6 pt-5 pb-2">
        <nav className="flex items-center gap-2 text-xs text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link href={`/${shopPrefix}`} className="hover:text-primary transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-foreground">{product.title}</span>
        </nav>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16">

          {/* ── Left: image gallery ── */}
          <div className="flex gap-4">
            {/* Thumbnails */}
            {product.images?.length > 1 && (
              <div className="hidden sm:flex flex-col gap-2 w-16 shrink-0">
                {product.images.map((img: any, i: number) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-colors shrink-0 ${
                      i === selectedImage ? 'border-primary' : 'border-[var(--brand-rose-mist)]'
                    }`}
                  >
                    {typeof img.image === 'object' && (
                      <img src={img.image.url} alt={img.alt || ''} className="w-full h-full object-cover" />
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Main image */}
            <div className="flex-1">
              <div className="aspect-square rounded-2xl overflow-hidden bg-[var(--brand-blush)]">
                {selectedImage === -1 &&
                activeVariant?.image &&
                typeof activeVariant.image === 'object' ? (
                  <img
                    src={activeVariant.image.url}
                    alt={activeVariant.variantLabel || product.title}
                    className="w-full h-full object-cover"
                  />
                ) : product.images?.[selectedImage]?.image &&
                  typeof product.images[selectedImage].image === 'object' ? (
                  <img
                    src={product.images[selectedImage].image.url}
                    alt={product.images[selectedImage].alt || product.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-8xl">💅</div>
                )}
              </div>

              {/* Mobile thumbnail strip */}
              {product.images?.length > 1 && (
                <div className="flex gap-2 mt-3 sm:hidden overflow-x-auto">
                  {product.images.map((img: any, i: number) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`w-14 h-14 rounded-lg overflow-hidden border-2 shrink-0 transition-colors ${
                        i === selectedImage ? 'border-primary' : 'border-[var(--brand-rose-mist)]'
                      }`}
                    >
                      {typeof img.image === 'object' && (
                        <img src={img.image.url} alt={img.alt || ''} className="w-full h-full object-cover" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ── Right: product info ── */}
          <div className="flex flex-col">
            <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-2 leading-tight">
              {product.title}
            </h1>

            {/* Average rating */}
            {reviewCount > 0 && (
              <a href="#reviews" className="flex items-center gap-2 mb-3 w-fit group">
                <div className="flex items-center gap-0.5">
                  {[1,2,3,4,5].map((s) => (
                    <svg key={s} viewBox="0 0 20 20" className="w-4 h-4">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                        fill={averageRating >= s ? 'var(--color-primary, #E8177A)' : '#D1D5DB'} />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors">
                  {averageRating.toFixed(1)} ({reviewCount} review{reviewCount !== 1 ? 's' : ''})
                </span>
              </a>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-5">
              <span className="text-2xl font-bold text-primary">{formatPrice(currentPrice)}</span>
              {hasDiscount && (
                <span className="text-base text-muted-foreground line-through">{formatPrice(comparePrice)}</span>
              )}
              {hasDiscount && (
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-[#FFF3E0] text-amber-700">
                  Save {Math.round(((comparePrice - currentPrice) / comparePrice) * 100)}%
                </span>
              )}
            </div>

            {product.shortDescription && (
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                {product.shortDescription}
              </p>
            )}

            {/* Nail shape selector */}
            {product.nailShape?.length > 0 && (
              <div className="mb-5">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-foreground/60">
                    Nail Shape
                    {selectedShape && <span className="ml-2 text-primary font-bold normal-case tracking-normal">{selectedShape}</span>}
                  </label>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.nailShape.map((shape: string) => (
                    <button
                      key={shape}
                      onClick={() => setSelectedShape(shape === selectedShape ? null : shape)}
                      className={`px-4 py-2 rounded-full text-xs font-semibold border transition-colors capitalize ${
                        selectedShape === shape
                          ? 'bg-[var(--brand-deep-plum)] text-white border-[var(--brand-deep-plum)]'
                          : 'border-[var(--brand-rose-mist)] text-foreground/70 hover:border-primary hover:text-primary'
                      }`}
                    >
                      {shape.charAt(0).toUpperCase() + shape.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Variant selector — new multi-option system */}
            {product.hasVariants && hasNewVariantSystem && (
              <div className="mb-6">
                <VariantSelector
                  options={product.variantOptions}
                  variants={product.variants || []}
                  basePrice={product.price}
                  onVariantChange={(variant, _selections) => {
                    setActiveVariant(variant)
                    if (variant?.image && typeof variant.image === 'object') {
                      setSelectedImage(-1)
                    } else {
                      if (selectedImage === -1) setSelectedImage(0)
                    }
                  }}
                />
              </div>
            )}

            {/* Variant selector — legacy single-dimension system */}
            {product.hasVariants && !hasNewVariantSystem && product.variants && (
              <div className="mb-5">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-foreground/60">
                    Length
                    {selectedVariant && (
                      <span className="ml-2 text-primary font-bold normal-case tracking-normal">
                        {selectedVariant}
                      </span>
                    )}
                  </label>
                  <button className="text-xs text-primary underline underline-offset-2">
                    Size guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((variant: any) => (
                    <button
                      key={variant.name}
                      onClick={() => setSelectedVariant(variant.name)}
                      className={`px-4 py-2 rounded-full text-xs font-semibold border transition-colors ${
                        selectedVariant === variant.name
                          ? 'bg-[var(--brand-deep-plum)] text-white border-[var(--brand-deep-plum)]'
                          : 'border-[var(--brand-rose-mist)] text-foreground/70 hover:border-primary hover:text-primary'
                      }`}
                    >
                      {variant.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <label className="text-xs font-semibold uppercase tracking-wider text-foreground/60 block mb-2">
                Quantity
              </label>
              <div className="flex items-center gap-1 w-fit border border-[var(--brand-rose-mist)] rounded-full overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center text-foreground hover:bg-[var(--brand-blush)] transition-colors text-lg"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="w-10 text-center text-sm font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center text-foreground hover:bg-[var(--brand-blush)] transition-colors text-lg"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart + Wishlist */}
            <div className="flex items-center gap-3 mb-3">
            <button
              onClick={handleAddToCart}
              disabled={!canAddToCart}
              className={`flex-1 py-4 rounded-full text-sm font-bold tracking-wide transition-all duration-200 ${
                addedToCart
                  ? 'bg-emerald-500 text-white'
                  : !canAddToCart
                    ? 'bg-muted text-muted-foreground cursor-not-allowed'
                    : 'bg-primary text-white hover:bg-primary/90 shadow-[0_4px_16px_rgba(232,23,122,0.25)] hover:shadow-[0_6px_20px_rgba(232,23,122,0.35)]'
              }`}
            >
              {addedToCart
                ? '✓ Added to Bag!'
                : isOutOfStock
                  ? 'Out of Stock'
                  : product.hasVariants && !canAddToCart
                    ? 'Select Options'
                    : `Add to Bag — ${formatPrice(currentPrice * quantity)}`}
            </button>
            <WishlistButton product={product} />
            </div>

            {/* Trust signals */}
            <div className="grid grid-cols-3 gap-3 py-5 border-y border-[var(--brand-rose-mist)] mb-6">
              {[
                { icon: '🚚', text: 'Free UK shipping over £30' },
                { icon: '↩️', text: 'Free returns within 30 days' },
                { icon: '💅', text: 'Lasts 2–3 weeks' },
              ].map(({ icon, text }) => (
                <div key={text} className="text-center">
                  <div className="text-xl mb-1">{icon}</div>
                  <p className="text-[10px] text-muted-foreground leading-tight">{text}</p>
                </div>
              ))}
            </div>

            {/* Share */}
            {productUrl && (
              <div className="mb-5">
                <SocialShare
                  url={productUrl}
                  title={product.title}
                  description={product.shortDescription || undefined}
                  image={productImage}
                />
              </div>
            )}

            {/* Accordions */}
            <div className="flex flex-col divide-y divide-[var(--brand-rose-mist)]">
              {accordions.map(({ key, label, content }) => (
                <div key={key}>
                  <button
                    onClick={() => toggleAccordion(key)}
                    className="w-full flex items-center justify-between py-4 text-left"
                  >
                    <span className="text-sm font-semibold text-foreground">{label}</span>
                    <span className={`text-muted-foreground transition-transform duration-200 text-lg leading-none ${openAccordion === key ? 'rotate-45' : ''}`}>
                      +
                    </span>
                  </button>
                  {openAccordion === key && (
                    <div className="pb-4 text-sm text-muted-foreground leading-relaxed">
                      {key === 'details' && product.description ? (
                        <RichText data={product.description} enableGutter={false} />
                      ) : (
                        <p>{content}</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky mobile add-to-cart */}
      <div className="fixed bottom-0 inset-x-0 p-4 bg-white/95 backdrop-blur-sm border-t border-[var(--brand-rose-mist)] md:hidden z-40">
        <button
          onClick={handleAddToCart}
          disabled={!canAddToCart}
          className={`w-full py-4 rounded-full text-sm font-bold transition-all ${
            addedToCart
              ? 'bg-emerald-500 text-white'
              : !canAddToCart
                ? 'bg-muted text-muted-foreground cursor-not-allowed'
                : 'bg-primary text-white'
          }`}
        >
          {addedToCart ? '✓ Added!' : `Add to Bag — ${formatPrice(currentPrice * quantity)}`}
        </button>
      </div>
    </main>
  )
}
