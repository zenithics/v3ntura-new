import { getPayload } from 'payload'
import config from '@payload-config'
import { getServerSideURL } from '@/utilities/getURL'

export const dynamic = 'force-dynamic'

export async function GET() {
  const payload = await getPayload({ config })
  const siteUrl = getServerSideURL()

  const seoSettings = (await payload.findGlobal({ slug: 'seo-settings' }).catch(() => null)) as any

  if (seoSettings?.sitemapEvents === false) {
    return new Response(
      '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>',
      { headers: { 'Content-Type': 'application/xml' } },
    )
  }

  const changefreq = seoSettings?.sitemapChangeFrequency || 'weekly'
  const priority = seoSettings?.sitemapPriority || '0.8'
  const excludePatterns: string[] = (seoSettings?.sitemapExcludePatterns || []).map(
    (p: any) => p.pattern,
  )

  const events = await payload.find({
    collection: 'events',
    where: { _status: { equals: 'published' } },
    limit: 500,
  })

  const urls = events.docs
    .filter((event: any) => {
      const path = `/events/${event.slug}`
      return !excludePatterns.some((pattern) => path.startsWith(pattern))
    })
    .map(
      (event: any) => `
  <url>
    <loc>${siteUrl}/events/${event.slug}</loc>
    <lastmod>${new Date(event.updatedAt).toISOString()}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`,
    )

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('')}
</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
