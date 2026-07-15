import { getPayload } from 'payload'
import config from '@payload-config'
import { getServerSideURL } from '@/utilities/getURL'

export const dynamic = 'force-dynamic'

export async function GET() {
  const payload = await getPayload({ config })
  const siteUrl = getServerSideURL()

  const seoSettings = (await payload.findGlobal({ slug: 'seo-settings' }).catch(() => null)) as any

  if (seoSettings?.sitemapProducts === false) {
    return new Response(
      '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"></urlset>',
      { headers: { 'Content-Type': 'application/xml' } },
    )
  }

  const changefreq = seoSettings?.sitemapChangeFrequency || 'weekly'
  const priority = seoSettings?.sitemapPriority || '0.8'
  const excludePatterns: string[] = (seoSettings?.sitemapExcludePatterns || []).map(
    (p: any) => p.pattern,
  )

  const products = await payload.find({
    collection: 'products',
    where: { _status: { equals: 'published' } },
    limit: 500,
    depth: 1,
  })

  const urls = products.docs
    .filter((product: any) => {
      const path = `/shop/${product.slug}`
      return !excludePatterns.some((pattern) => path.startsWith(pattern))
    })
    .map((product: any) => {
      const image =
        product.images?.[0] && typeof product.images[0] === 'object' ? product.images[0] : null

      const imageTag = image
        ? `
      <image:image>
        <image:loc>${siteUrl}${image.url}</image:loc>
        <image:title>${escapeXml(product.title)}</image:title>
      </image:image>`
        : ''

      return `
  <url>
    <loc>${siteUrl}/shop/${product.slug}</loc>
    <lastmod>${new Date(product.updatedAt).toISOString()}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>${imageTag}
  </url>`
    })

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.join('')}
</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}

function escapeXml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
