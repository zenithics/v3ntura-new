'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const AUTH_ROUTES = ['/account/login', '/account/register', '/account/forgot-password']

const NAV = [
  { href: '/account', label: 'Dashboard', exact: true },
  { href: '/account/orders', label: 'Order History' },
  { href: '/account/details', label: 'Account Details' },
  { href: '/account/addresses', label: 'Addresses' },
]

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // Auth pages are full-screen — no sidebar
  if (AUTH_ROUTES.some(r => pathname.startsWith(r))) {
    return <>{children}</>
  }

  return (
    <div className="bg-[#FDF8FB] min-h-screen">
      <div className="max-w-[1280px] mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="md:w-56 shrink-0">
            <nav className="bg-white rounded-2xl border border-[var(--brand-rose-mist)] overflow-hidden">
              {NAV.map(({ href, label, exact }) => {
                const active = exact ? pathname === href : pathname.startsWith(href)
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center px-5 py-3.5 text-sm font-medium border-b border-[var(--brand-rose-mist)] last:border-0 transition-colors ${
                      active
                        ? 'bg-[var(--brand-blush)] text-primary'
                        : 'text-foreground/80 hover:text-primary hover:bg-[var(--brand-blush)]/40'
                    }`}
                  >
                    {label}
                  </Link>
                )
              })}
            </nav>
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </div>
  )
}
