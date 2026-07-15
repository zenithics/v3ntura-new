'use client'

import React, { useState } from 'react'
import { useCart } from '@/hooks/useCart'
import { formatPrice } from '@/utilities/formatPrice'
import RichText from '@/components/RichText'

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

export const EventDetail: React.FC<{ event: any }> = ({ event }) => {
  const { addItem } = useCart()
  const [selectedTickets, setSelectedTickets] = useState<Record<string, number>>({})
  const [addedToCart, setAddedToCart] = useState(false)

  const firstImage =
    event.images?.[0]?.image && typeof event.images[0].image === 'object'
      ? event.images[0].image
      : null

  const updateTicketCount = (ticketName: string, delta: number, max: number) => {
    setSelectedTickets((prev) => {
      const current = prev[ticketName] || 0
      const newVal = Math.max(0, Math.min(max, current + delta))
      return { ...prev, [ticketName]: newVal }
    })
  }

  const totalTickets = Object.values(selectedTickets).reduce((sum, qty) => sum + qty, 0)

  const handleAddToCart = () => {
    if (totalTickets === 0) return

    for (const [ticketName, qty] of Object.entries(selectedTickets)) {
      if (qty <= 0) continue

      const ticketType = event.ticketTypes?.find((t: any) => t.name === ticketName)
      if (!ticketType) continue

      addItem({
        productId: event.id,
        eventId: event.id,
        title: event.title,
        unitPrice: ticketType.price,
        quantity: qty,
        ticketTypeName: ticketName,
        image: firstImage,
        slug: event.slug,
        type: 'ticket',
      })
    }

    setAddedToCart(true)
    setSelectedTickets({})
    setTimeout(() => setAddedToCart(false), 2000)
  }

  return (
    <div className="container py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Event info — 2 cols */}
        <div className="lg:col-span-2">
          {firstImage && (
            <div className="aspect-[16/9] rounded-lg overflow-hidden mb-8">
              <img
                src={firstImage.url}
                alt={event.images[0].alt || event.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <h1 className="text-3xl font-bold mb-4">{event.title}</h1>

          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground mb-8">
            <div className="flex items-center gap-2">
              <span>📅</span>
              <span>{formatEventDate(event.eventDate)}</span>
            </div>
            {event.doorsOpen && (
              <div className="flex items-center gap-2">
                <span>🚪</span>
                <span>Doors: {new Date(event.doorsOpen).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            )}
            {event.venue?.name && (
              <div className="flex items-center gap-2">
                <span>📍</span>
                <span>{event.venue.name}{event.venue.city ? `, ${event.venue.city}` : ''}</span>
              </div>
            )}
          </div>

          {event.description && (
            <div className="prose max-w-none">
              <RichText data={event.description} enableGutter={false} />
            </div>
          )}

          {/* Venue details */}
          {event.venue?.address && (
            <div className="mt-8 p-6 rounded-lg border border-border bg-card">
              <h3 className="font-semibold mb-2">Venue</h3>
              <p className="text-sm text-muted-foreground whitespace-pre-line">{event.venue.address}</p>
              {event.venue.postcode && (
                <p className="text-sm text-muted-foreground">{event.venue.postcode}</p>
              )}
              {event.venue.mapUrl && (
                <a
                  href={event.venue.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline mt-2 inline-block"
                >
                  View on Google Maps →
                </a>
              )}
            </div>
          )}
        </div>

        {/* Ticket selection — sticky sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-lg border border-border bg-card p-6">
            <h2 className="text-lg font-semibold mb-4">Tickets</h2>

            {event.status === 'sold-out' ? (
              <p className="text-center text-muted-foreground py-4">This event is sold out.</p>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {event.ticketTypes?.map((ticket: any) => {
                    const remaining = ticket.capacity - (ticket.sold || 0)
                    const isSoldOut = remaining <= 0
                    const qty = selectedTickets[ticket.name] || 0

                    return (
                      <div key={ticket.name} className="p-4 rounded-md border border-border">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium">{ticket.name}</span>
                          <span className="font-semibold">{formatPrice(ticket.price)}</span>
                        </div>
                        {ticket.description && (
                          <p className="text-xs text-muted-foreground mb-2">{ticket.description}</p>
                        )}
                        {isSoldOut ? (
                          <p className="text-xs text-destructive font-medium">Sold Out</p>
                        ) : (
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">
                              {remaining} remaining
                            </span>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateTicketCount(ticket.name, -1, ticket.maxPerOrder || 10)}
                                className="w-7 h-7 rounded border border-border flex items-center justify-center text-sm hover:bg-muted transition-colors"
                              >
                                −
                              </button>
                              <span className="w-6 text-center text-sm">{qty}</span>
                              <button
                                onClick={() => updateTicketCount(ticket.name, 1, Math.min(remaining, ticket.maxPerOrder || 10))}
                                className="w-7 h-7 rounded border border-border flex items-center justify-center text-sm hover:bg-muted transition-colors"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={totalTickets === 0}
                  className={`w-full py-3 px-6 rounded-md font-medium text-sm transition-colors ${
                    addedToCart
                      ? 'bg-green-600 text-white'
                      : totalTickets === 0
                        ? 'bg-muted text-muted-foreground cursor-not-allowed'
                        : 'bg-primary text-primary-foreground hover:bg-primary/90'
                  }`}
                >
                  {addedToCart
                    ? '✓ Added to Cart'
                    : totalTickets === 0
                      ? 'Select Tickets'
                      : `Add ${totalTickets} Ticket${totalTickets > 1 ? 's' : ''} to Cart`}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
