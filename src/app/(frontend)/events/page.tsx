import React from 'react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import { formatPrice } from '@/utilities/formatPrice'

export const metadata: Metadata = {
  title: 'Events',
  description: 'Browse upcoming events and book tickets',
}

export const dynamic = 'force-dynamic'

function formatEventDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default async function EventsPage() {
  const payload = await getPayload({ config })

  const events = await payload.find({
    collection: 'events',
    where: {
      status: { in: ['on-sale', 'sold-out'] },
      eventDate: { greater_than_equal: new Date().toISOString() },
    },
    sort: 'eventDate',
    limit: 50,
    depth: 2,
  })

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-8">Upcoming Events</h1>

      {events.docs.length > 0 ? (
        <div className="space-y-6">
          {events.docs.map((event) => {
            const firstImage =
              event.images?.[0]?.image && typeof event.images[0].image === 'object'
                ? event.images[0].image
                : null

            const lowestPrice = event.ticketTypes
              ? Math.min(...event.ticketTypes.map((t) => t.price))
              : null

            return (
              <Link
                key={event.id}
                href={`/events/${event.slug}`}
                className="group flex flex-col md:flex-row rounded-lg border border-border bg-card overflow-hidden hover:shadow-lg transition-shadow"
              >
                {firstImage && (
                  <div className="md:w-72 aspect-[16/9] md:aspect-auto overflow-hidden flex-shrink-0">
                    <img
                      src={(firstImage as any).url}
                      alt={(event.images![0] as any).alt || event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-sm text-primary font-medium mb-1">
                    {formatEventDate(event.eventDate)}
                  </p>
                  <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {event.title}
                  </h2>
                  {event.venue?.name && (
                    <p className="text-sm text-muted-foreground mb-2">
                      📍 {event.venue.name}{event.venue.city ? `, ${event.venue.city}` : ''}
                    </p>
                  )}
                  {event.shortDescription && (
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {event.shortDescription}
                    </p>
                  )}
                  <div className="mt-auto flex items-center justify-between">
                    {lowestPrice !== null && (
                      <span className="font-medium">
                        {lowestPrice === 0 ? 'Free' : `From ${formatPrice(lowestPrice)}`}
                      </span>
                    )}
                    <span className="text-sm text-primary font-medium">
                      {event.status === 'sold-out' ? 'Sold Out' : 'Get Tickets →'}
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      ) : (
        <p className="text-center text-muted-foreground py-12">
          No upcoming events. Check back soon!
        </p>
      )}
    </div>
  )
}
