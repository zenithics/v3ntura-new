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

export default function AccountDashboard() {
  const { customer, loading, logout } = useAuth()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [ordersLoading, setOrdersLoading] = useState(true)

  useEffect(() => {
    if (!loading && !customer) router.replace('/account/login')
  }, [customer, loading, router])

  useEffect(() => {
    if (!customer) return
    fetch(`/api/orders?where[customerEmail][equals]=${encodeURIComponent(customer.email)}&sort=-createdAt&limit=5`, {
      credentials: 'include',
    })
      .then(r => r.json())
      .then(d => setOrders(d.docs ?? []))
      .catch(() => {})
      .finally(() => setOrdersLoading(false))
  }, [customer])

  const handleLogout = async () => {
    await logout()
    router.push('/')
  }

  if (loading || !customer) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="bg-white rounded-2xl border border-[var(--brand-rose-mist)] p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl mb-1">
              Hi, {customer.name?.split(' ')[0] ?? 'there'} 👋
            </h1>
            <p className="text-sm text-muted-foreground">{customer.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2 shrink-0"
          >
            Sign out
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-[var(--brand-blush)] rounded-xl p-4">
            <p className="text-2xl font-bold text-primary">{customer.orderCount ?? 0}</p>
            <p className="text-xs text-muted-foreground mt-1">Total Orders</p>
          </div>
          <div className="bg-[var(--brand-blush)] rounded-xl p-4">
            <p className="text-2xl font-bold text-primary">{formatPrice(customer.totalSpent ?? 0)}</p>
            <p className="text-xs text-muted-foreground mt-1">Lifetime Spend</p>
          </div>
        </div>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { href: '/account/orders', label: 'Order History', icon: '📦' },
          { href: '/account/details', label: 'Account Details', icon: '✏️' },
          { href: '/account/addresses', label: 'Addresses', icon: '📍' },
          { href: '/shop', label: 'Shop Now', icon: '💅' },
        ].map(({ href, label, icon }) => (
          <Link
            key={href}
            href={href}
            className="bg-white rounded-xl border border-[var(--brand-rose-mist)] p-4 flex items-center gap-3 hover:border-primary hover:shadow-sm transition-all group"
          >
            <span className="text-2xl">{icon}</span>
            <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{label}</span>
          </Link>
        ))}
      </div>

      {/* Recent orders */}
      <div className="bg-white rounded-2xl border border-[var(--brand-rose-mist)] p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-semibold text-base">Recent Orders</h2>
          <Link href="/account/orders" className="text-xs text-primary hover:underline">View all</Link>
        </div>

        {ordersLoading ? (
          <div className="flex justify-center py-8">
            <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-sm text-muted-foreground mb-4">No orders yet.</p>
            <Link
              href="/shop"
              className="inline-flex items-center px-6 py-2.5 rounded-full bg-primary text-white text-xs font-bold hover:bg-primary/90 transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {orders.map(order => (
              <Link
                key={order.id}
                href={`/account/orders/${order.orderNumber}`}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-[var(--brand-blush)]/40 transition-colors group"
              >
                <div>
                  <p className="text-sm font-medium group-hover:text-primary transition-colors">
                    #{order.orderNumber}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${STATUS_STYLES[order.status] ?? STATUS_STYLES.pending}`}>
                    {order.status}
                  </span>
                  <span className="text-sm font-bold text-primary">{formatPrice(order.total)}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
