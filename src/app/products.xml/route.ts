import { getPayload } from 'payload'
import config from '@payload-config'
import { getServerSideURL } from '@/utilities/getURL'

function esc(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET(): Promise<Response> {
  const payload = await getPayload({ config })

  const seo = (await payload.findGlobal({ slug: 'seo-settings' }).catch(() => null)) as any

  if (!seo?.productFeedEnabled) {
    return new Response('Feed disabled', { status: 404 })
  }

  const siteUrl = getServerSideURL()

  const { docs: products } = await payload.find({
    collection: 'products',
    where: { status: { equals: 'active' } },
    limit: 1000,
    depth: 2,
  })

  const { docs: shopSettings } = await payload
    .find({ collection: 'globals' as any })
    .catch(() => ({ docs: [] }))
  const shop = (await payload.findGlobal({ slug: 'shop-settings' }).catch(() => null)) as any
  const currency = ((shop?.currency as string) || 'GBP').toUpperCase()

  const items = products.map((product: any) => {
    const price = ((product.price || 0) / 100).toFixed(2)
    const inStock = product.trackStock ? (product.stock || 0) > 0 : true

    const image =
      product.images?.[0] && typeof product.images[0] === 'object'
        ? product.images[0].url ||
          product.images[0].sizes?.card?.url ||
          product.images[0].sizes?.thumbnail?.url
        : null
    const imageUrl = image
      ? image.startsWith('http') ? image : `${siteUrl}${image}`
      : null

    const category =
      product.category && typeof product.category === 'object'
        ? product.category.title || product.category.name || ''
        : ''

    const description = esc(
      product.description?.substring(0, 500) ||
        product.shortDescription?.substring(0, 500) ||
        product.title,
    )

    return `
  <item>
    <g:id>${esc(String(product.id))}</g:id>
    <g:title>${esc(product.title)}</g:title>
    <g:description>${description}</g:description>
    <g:link>${siteUrl}/shop/${esc(product.slug)}</g:link>
    ${imageUrl ? `<g:image_link>${esc(imageUrl)}</g:image_link>` : ''}
    <g:availability>${inStock ? 'in_stock' : 'out_of_stock'}</g:availability>
    <g:price>${price} ${currency}</g:price>
    <g:condition>new</g:condition>
    <g:brand>${esc(seo?.siteTitle || 'Your Brand')}</g:brand>
    ${product.sku ? `<g:mpn>${esc(product.sku)}</g:mpn>` : ''}
    ${category ? `<g:product_type>${esc(category)}</g:product_type>` : ''}
    ${product.productType === 'digital' ? '<g:product_type>Digital</g:product_type>' : ''}
  </item>`
  })

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>${esc(seo?.siteTitle || 'Your Brand')} Products</title>
    <link>${siteUrl}</link>
    <description>Product feed for Google Merchant Center</description>
    ${items.join('\n')}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  })
}