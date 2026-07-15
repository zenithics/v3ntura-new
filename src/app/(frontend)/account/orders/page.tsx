'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { formatPrice } from '@/utilities/formatPrice'

interface Order {
  id: number
  orderNumber: string
  status: string
  total: number
  createdAt: string
  items?: { productTitle: string; quantity: number }[]
}

const STATUS_STYLES: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  paid: 'bg-blue-100 text-blue-700',
  processing: 'bg-purple-100 text-purple-700',
  shipped: 'bg-indigo-100 text-indigo-700',
  delivered: 'bg-emerald-100 text-emerald-700',
  cancelled: 'bg-red-100 text-red-700',
  refunded: 'bg-gray-100 text-gray-700',
}

export default function OrdersPage() {
  const { customer, loading } = useAuth()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [ordersLoading, setOrdersLoading] = useState(true)

  useEffect(() => {
    if (!loading && !customer) router.replace('/account/login')
  }, [customer, loading, router])

  useEffect(() => {
    if (!customer) return
    fetch(`/api/orders?where[customerEmail][equals]=${encodeURIComponent(customer.email)}&sort=-createdAt&limit=50&depth=0`, {
      credentials: 'include',
    })
      .then(r => r.json())
      .then(d => setOrders(d.docs ?? []))
      .catch(() => {})
      .finally(() => setOrdersLoading(false))
  }, [customer])

  if (loading || !customer) {
    return <div className="flex justify-center py-20"><div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>
  }

  return (
    <div>
      <h1 className="font-serif text-2xl mb-6">Order History</h1>

      {ordersLoading ? (
        <div className="flex justify-center py-20"><div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>
      ) : orders.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[var(--brand-rose-mist)] p-12 text-center">
          <div className="text-5xl mb-4">📦</div>
          <h2 className="font-semibold text-lg mb-2">No orders yet</h2>
          <p className="text-sm text-muted-foreground mb-6">Your order history will appear here once you make a purchase.</p>
          <Link href="/shop" className="inline-flex items-center px-8 py-3.5 rounded-full bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors shadow-[0_4px_16px_rgba(232,23,122,0.25)]">
            Shop Now
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {orders.map(order => (
            <Link
              key={order.id}
              href={`/account/orders/${order.orderNumber}`}
              className="bg-white rounded-2xl border border-[var(--brand-rose-mist)] p-5 hover:shadow-sm hover:border-primary/30 transition-all group"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-sm group-hover:text-primary transition-colors">
                    Order #{order.orderNumber}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className={`text-xs font-medium px-3 py-1 rounded-full capitalize ${STATUS_STYLES[order.status] ?? STATUS_STYLES.pending}`}>
                    {order.status}
                  </span>
                  <span className="text-sm font-bold text-primary">{formatPrice(order.total)}</span>
                  <span className="text-muted-foreground text-sm group-hover:text-primary transition-colors">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
