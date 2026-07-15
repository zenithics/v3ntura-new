import React, { Suspense } from 'react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import { ProductDetail } from './page.client'
import { ReviewList, getProductRating } from '@/components/Reviews/ReviewList'
import { ReviewForm } from '@/components/Reviews/ReviewForm'
import { ReviewStars } from '@/components/Reviews/ReviewStars'
import { RelatedProducts } from '@/components/RelatedProducts'
import { UpsellProducts } from '@/components/UpsellProducts'
import { getServerSideURL } from '@/utilities/getURL'
import { getContentUrl, getPrefix } from '@/utilities/getContentUrl'
import { productSchema } from '@/utilities/generateJsonLd'
import { applyAdvancedSeo } from '@/utilities/buildSeoMeta'

type Args = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config })

  const products = await payload.find({
    collection: 'products',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  })

  const product = products.docs[0]
  if (!product) return { title: 'Product Not Found' }

  const metadata: Metadata = {
    title: product.meta?.title || product.title,
    description: product.meta?.description || product.shortDescription,
    openGraph: {
      title: product.meta?.title || product.title,
      description: product.meta?.description || product.shortDescription || '',
      images: product.meta?.image
        ? [{ url: (product.meta.image as any).url }]
        : product.images?.[0]?.image
          ? [{ url: (product.images[0].image as any).url }]
          : [],
    },
  }

  return applyAdvancedSeo(metadata, (product as any).advancedSeo)
}

export default async function ProductPage({ params }: Args) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const [products, seoSettings] = await Promise.all([
    payload.find({
      collection: 'products',
      where: { slug: { equals: slug }, status: { equals: 'active' } },
      limit: 1,
      depth: 2,
    }),
    payload.findGlobal({ slug: 'seo-settings' }).catch(() => null) as any,
  ])

  const product = products.docs[0]
  if (!product) notFound()

  const { average, count } = await getProductRating(product.id)

  const [productPath, shopPrefix] = await Promise.all([
    getContentUrl('products', slug),
    getPrefix('products'),
  ])
  const productUrl = getServerSideURL() + productPath
  const productImage =
    product.images?.[0]?.image && typeof product.images[0].image === 'object'
      ? (product.images[0].image as any).url
      : undefined

  // Build Product JSON-LD
  let productJsonLd: any = null
  if (seoSettings?.schemaProduct !== false) {
    productJsonLd = await productSchema(product)

    if ((product as any).advancedSeo?.gtin) productJsonLd.gtin = (product as any).advancedSeo.gtin
    if ((product as any).advancedSeo?.mpn) productJsonLd.mpn = (product as any).advancedSeo.mpn

    if (seoSettings?.schemaProductIncludeReviews !== false && count > 0) {
      productJsonLd.aggregateRating = {
        '@type': 'AggregateRating',
        ratingValue: average.toFixed(1),
        reviewCount: count,
      }
    }

    if (seoSettings?.schemaProductIncludeBrand !== false) {
      productJsonLd.brand = {
        '@type': 'Brand',
        name:
          seoSettings?.schemaProductBrandName ||
          seoSettings?.siteTitle ||
          'Your Brand',
      }
    }
  }

  return (
    <>
      {productJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
        />
      )}

      <ProductDetail
        product={product}
        averageRating={average}
        reviewCount={count}
        productUrl={productUrl}
        productImage={productImage}
        shopPrefix={shopPrefix.replace(/^\//, '')}
      />

      {(product as any).upsellProducts?.length > 0 && (
        <UpsellProducts products={(product as any).upsellProducts} />
      )}

      <RelatedProducts
        productId={String(product.id)}
        relatedProducts={(product as any).relatedProducts}
        categoryId={
          Array.isArray(product.category) && product.category.length > 0
            ? typeof product.category[0] === 'object'
              ? String((product.category[0] as any).id)
              : String(product.category[0])
            : undefined
        }
      />

      {/* Reviews section */}
      <section id="reviews" className="container py-12 max-w-3xl">
        <h2 className="text-2xl font-bold mb-6">
          Customer Reviews
          {count > 0 && (
            <span className="ml-3 inline-flex items-center gap-2 text-base font-normal text-muted-foreground">
              <ReviewStars rating={average} size="small" />
              {average.toFixed(1)} ({count} review{count !== 1 ? 's' : ''})
            </span>
          )}
        </h2>

        <Suspense fallback={<div className="text-sm text-muted-foreground">Loading reviews…</div>}>
          <ReviewList productId={product.id} />
        </Suspense>

        <div className="mt-10 pt-8 border-t border-border">
          <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
          <ReviewForm productId={product.id} />
        </div>
      </section>
    </>
  )
}
