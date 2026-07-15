'use client'

import React from 'react'
import Link from 'next/link'
import { formatPrice } from '@/utilities/formatPrice'

import type { EventGridBlock as EventGridBlockProps } from '@/payload-types'

const columnClasses: Record<string, string> = {
  '2': 'md:grid-cols-2',
  '3': 'md:grid-cols-2 lg:grid-cols-3',
}

function formatEventDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function getLowestPrice(ticketTypes: any[]): number | null {
  if (!ticketTypes || ticketTypes.length === 0) return null
  const prices = ticketTypes.map((t) => t.price).filter((p) => typeof p === 'number')
  return prices.length > 0 ? Math.min(...prices) : null
}

export const EventGridBlock: React.FC<
  EventGridBlockProps & {
    events?: any[]
  }
> = ({ heading, description, columns = '3', events = [], showPriceFrom = true }) => {
  return (
    <div className="container">
      {(heading || description) && (
        <div className="text-center mb-12 max-w-2xl mx-auto">
          {heading && <h2 className="text-3xl font-bold mb-4">{heading}</h2>}
          {description && <p className="text-muted-foreground">{description}</p>}
        </div>
      )}

      {events.length > 0 ? (
        <div
          className={`grid grid-cols-1 ${columnClasses[columns ?? '3'] || columnClasses['3']} gap-6`}
        >
          {events.map((event) => {
            const lowestPrice = getLowestPrice(event.ticketTypes)
            const firstImage =
              event.images?.[0]?.image &&
              typeof event.images[0].image === 'object'
                ? event.images[0].image
                : null

            return (
              <Link
                key={event.id}
                href={`/events/${event.slug}`}
                className="group flex flex-col rounded-lg border border-border bg-card overflow-hidden hover:shadow-lg transition-shadow"
              >
                {firstImage && (
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={firstImage.url}
                      alt={event.images[0].alt || event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-5 flex flex-col flex-1">
                  <p className="text-sm text-primary font-medium mb-1">
                    {formatEventDate(event.eventDate)}
                  </p>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                    {event.title}
                  </h3>
                  {event.venue?.name && (
                    <p className="text-sm text-muted-foreground mb-3">
                      📍 {event.venue.name}{event.venue.city ? `, ${event.venue.city}` : ''}
                    </p>
                  )}
                  {event.shortDescription && (
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {event.shortDescription}
                    </p>
                  )}
                  <div className="mt-auto flex items-center justify-between">
                    {showPriceFrom && lowestPrice !== null && (
                      <span className="text-sm font-medium">
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
        <p className="text-center text-muted-foreground">No upcoming events.</p>
      )}
    </div>
  )
}
