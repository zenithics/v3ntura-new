import React from 'react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import { EventDetail } from './page.client'
import { eventSchema } from '@/utilities/generateJsonLd'
import { applyAdvancedSeo } from '@/utilities/buildSeoMeta'

type Args = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config })

  const events = await payload.find({
    collection: 'events',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  })

  const event = events.docs[0]
  if (!event) return { title: 'Event Not Found' }

  const metadata: Metadata = {
    title: event.meta?.title || event.title,
    description: event.meta?.description || (event as any).shortDescription,
  }

  return applyAdvancedSeo(metadata, (event as any).advancedSeo)
}

export default async function EventPage({ params }: Args) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const [events, seoSettings] = await Promise.all([
    payload.find({ collection: 'events', where: { slug: { equals: slug } }, limit: 1, depth: 2 }),
    payload.findGlobal({ slug: 'seo-settings' }).catch(() => null) as any,
  ])

  const event = events.docs[0]
  if (!event) notFound()

  let eventJsonLd: any = null
  if (seoSettings?.schemaEvent !== false) {
    eventJsonLd = eventSchema(event)
  }

  return (
    <>
      {eventJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
        />
      )}
      <EventDetail event={event} />
    </>
  )
}
