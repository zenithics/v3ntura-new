import { getPayload } from 'payload'
import config from '@payload-config'
import { getServerSideURL } from '@/utilities/getURL'

export async function GET() {
  const payload = await getPayload({ config })
  const siteUrl = getServerSideURL()

  const categories = await payload.find({
    collection: 'product-categories',
    limit: 1000,
    select: { slug: true, updatedAt: true },
  })

  // Categories are currently filtered client-side on /shop — no dedicated
  // category pages exist. URLs point to /shop as the canonical landing page.
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${categories.docs
  .map(
    (cat) => `  <url>
    <loc>${siteUrl}/shop</loc>
    <lastmod>${new Date(cat.updatedAt).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`,
  )
  .join('\n')}
</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
