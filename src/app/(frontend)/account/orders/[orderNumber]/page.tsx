'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { formatPrice } from '@/utilities/formatPrice'
import { getCarrierByCode } from '@/utilities/carriers'

interface OrderItem {
  productTitle: string
  variantName?: string
  quantity: number
  unitPrice: number
  lineTotal: number
  product?: { slug?: string; images?: { image?: { url?: string } }[] }
}

interface Order {
  id: number
  orderNumber: string
  status: string
  total: number
  createdAt: string
  items: OrderItem[]
  customerName?: string
  customerEmail: string
  shippingAddress?: Record<string, string>
  trackingNumber?: string
  carrier?: string
  trackingUrl?: string
  shippedAt?: string
  deliveredAt?: string
}

const STEPS = ['pending', 'paid', 'processing', 'shipped', 'delivered']

const STATUS_STYLES: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  paid: 'bg-blue-100 text-blue-700',
  processing: 'bg-purple-100 text-purple-700',
  shipped: 'bg-indigo-100 text-indigo-700',
  delivered: 'bg-emerald-100 text-emerald-700',
  cancelled: 'bg-red-100 text-red-700',
  refunded: 'bg-gray-100 text-gray-700',
}

export default function OrderDetailPage() {
  const { customer, loading } = useAuth()
  const router = useRouter()
  const params = useParams<{ orderNumber: string }>()
  const [order, setOrder] = useState<Order | null>(null)
  const [orderLoading, setOrderLoading] = useState(true)

  useEffect(() => {
    if (!loading && !customer) router.replace('/account/login')
  }, [customer, loading, router])

  useEffect(() => {
    if (!customer || !params.orderNumber) return
    fetch(`/api/orders?where[orderNumber][equals]=${params.orderNumber}&depth=1`, {
      credentials: 'include',
    })
      .then(r => r.json())
      .then(d => setOrder(d.docs?.[0] ?? null))
      .catch(() => {})
      .finally(() => setOrderLoading(false))
  }, [customer, params.orderNumber])

  if (loading || !customer || orderLoading) {
    return <div className="flex justify-center py-20"><div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>
  }

  if (!order) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground">Order not found.</p>
        <Link href="/account/orders" className="text-primary text-sm hover:underline mt-4 block">← Back to orders</Link>
      </div>
    )
  }

  const stepIndex = STEPS.indexOf(order.status)
  const isCancelledOrRefunded = order.status === 'cancelled' || order.status === 'refunded'

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 flex-wrap">
        <Link href="/account/orders" className="text-sm text-muted-foreground hover:text-primary transition-colors">← Orders</Link>
        <span className="text-muted-foreground">/</span>
        <h1 className="font-serif text-xl">#{order.orderNumber}</h1>
        <span className={`text-xs font-medium px-3 py-1 rounded-full capitalize ${STATUS_STYLES[order.status] ?? STATUS_STYLES.pending}`}>
          {order.status}
        </span>
        <a
          href={`/api/orders/invoice?id=${order.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800 transition-colors ml-auto"
        >
          📄 Download Invoice
        </a>
      </div>

      {/* Progress bar */}
      {!isCancelledOrRefunded && (
        <div className="bg-white rounded-2xl border border-[var(--brand-rose-mist)] p-6">
          <h2 className="text-sm font-semibold mb-5">Order Progress</h2>
          <div className="flex items-center gap-0">
            {STEPS.map((step, i) => {
              const done = i <= stepIndex
              const isLast = i === STEPS.length - 1
              return (
                <React.Fragment key={step}>
                  <div className="flex flex-col items-center gap-1.5 shrink-0">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${done ? 'bg-primary text-white' : 'bg-[var(--brand-rose-mist)] text-muted-foreground'}`}>
                      {done && i < stepIndex ? '✓' : i + 1}
                    </div>
                    <span className={`text-[10px] capitalize hidden sm:block ${done ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                      {step}
                    </span>
                  </div>
                  {!isLast && (
                    <div className={`flex-1 h-0.5 mx-1 mb-4 ${i < stepIndex ? 'bg-primary' : 'bg-[var(--brand-rose-mist)]'}`} />
                  )}
                </React.Fragment>
              )
            })}
          </div>
        </div>
      )}

      {/* Tracking */}
      {order.trackingNumber && (
        <div className="bg-indigo-50 rounded-2xl border border-indigo-100 p-5">
          <h2 className="text-sm font-semibold mb-2">📦 Shipment Tracking</h2>
          <div className="space-y-1 text-sm text-foreground/80">
            {order.carrier && (
              <p>
                <span className="text-muted-foreground">Carrier: </span>
                {getCarrierByCode(order.carrier)?.name ?? order.carrier}
              </p>
            )}
            <p>
              <span className="text-muted-foreground">Tracking: </span>
              <span className="font-mono font-medium">{order.trackingNumber}</span>
            </p>
            {order.shippedAt && (
              <p>
                <span className="text-muted-foreground">Shipped: </span>
                {new Date(order.shippedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            )}
          </div>
          {order.trackingUrl && (
            <a
              href={order.trackingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 mt-3 px-4 py-2 bg-primary text-white text-xs font-semibold rounded-full hover:bg-primary/90 transition-colors"
            >
              Track Your Order →
            </a>
          )}
        </div>
      )}

      {/* Items */}
      <div className="bg-white rounded-2xl border border-[var(--brand-rose-mist)] p-6">
        <h2 className="text-sm font-semibold mb-5">Items</h2>
        <div className="flex flex-col gap-4">
          {order.items?.map((item, i) => {
            const img = item.product?.images?.[0]?.image
            return (
              <div key={i} className="flex gap-4">
                <div className="w-14 h-14 rounded-xl bg-[var(--brand-blush)] overflow-hidden shrink-0 flex items-center justify-center">
                  {typeof img === 'object' && img?.url ? (
                    <img src={img.url} alt={item.productTitle} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-2xl">💅</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{item.productTitle}</p>
                  {item.variantName && <p className="text-xs text-muted-foreground">{item.variantName}</p>}
                  <p className="text-xs text-muted-foreground mt-0.5">Qty: {item.quantity}</p>
                </div>
                <p className="text-sm font-bold text-primary shrink-0">{formatPrice(item.lineTotal)}</p>
              </div>
            )
          })}
        </div>

        <div className="border-t border-[var(--brand-rose-mist)] mt-5 pt-4 flex flex-col gap-2 text-sm">
          <div className="flex justify-between text-foreground/70">
            <span>Subtotal</span>
            <span>{formatPrice(order.total)}</span>
          </div>
          <div className="flex justify-between font-bold text-base">
            <span>Total</span>
            <span className="text-primary">{formatPrice(order.total)}</span>
          </div>
        </div>
      </div>

      {/* Shipping address */}
      {order.shippingAddress?.line1 && (
        <div className="bg-white rounded-2xl border border-[var(--brand-rose-mist)] p-6">
          <h2 className="text-sm font-semibold mb-3">Shipping Address</h2>
          <address className="text-sm text-foreground/80 not-italic leading-relaxed">
            <p>{order.customerName}</p>
            <p>{order.shippingAddress.line1}</p>
            {order.shippingAddress.line2 && <p>{order.shippingAddress.line2}</p>}
            <p>{order.shippingAddress.city}</p>
            {order.shippingAddress.county && <p>{order.shippingAddress.county}</p>}
            <p>{order.shippingAddress.postcode}</p>
            <p>{order.shippingAddress.country}</p>
          </address>
        </div>
      )}

      <p className="text-xs text-muted-foreground text-center">
        Ordered on {new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
      </p>
    </div>
  )
}
