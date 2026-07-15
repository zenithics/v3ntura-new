'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

export default function RegisterPage() {
  const { register, customer } = useAuth()
  const router = useRouter()

  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', marketing: false })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (customer) {
    router.replace('/account')
    return null
  }

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(prev => ({ ...prev, [field]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirm) {
      setError("Passwords don't match.")
      return
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }
    setLoading(true)
    try {
      await register({ name: form.name, email: form.email, password: form.password, marketingOptIn: form.marketing })
      router.push('/account')
    } catch (err: any) {
      setError(err.message ?? 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-[#FDF8FB] min-h-screen flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="font-serif text-2xl text-foreground hover:text-primary transition-colors">
            Your Brand
          </Link>
          <h1 className="font-serif text-3xl mt-4 mb-2">Create an account</h1>
          <p className="text-sm text-muted-foreground">Join and track your orders</p>
        </div>

        <div className="bg-white rounded-2xl border border-[var(--brand-rose-mist)] p-8">
          {error && (
            <div className="mb-5 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-medium mb-1.5" htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                required
                autoComplete="name"
                value={form.name}
                onChange={set('name')}
                className="w-full px-4 py-3 rounded-xl border border-[var(--brand-rose-mist)] text-sm focus:outline-none focus:border-primary transition-colors bg-white"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={form.email}
                onChange={set('email')}
                className="w-full px-4 py-3 rounded-xl border border-[var(--brand-rose-mist)] text-sm focus:outline-none focus:border-primary transition-colors bg-white"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5" htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                required
                autoComplete="new-password"
                value={form.password}
                onChange={set('password')}
                className="w-full px-4 py-3 rounded-xl border border-[var(--brand-rose-mist)] text-sm focus:outline-none focus:border-primary transition-colors bg-white"
                placeholder="At least 8 characters"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5" htmlFor="confirm">Confirm Password</label>
              <input
                id="confirm"
                type="password"
                required
                autoComplete="new-password"
                value={form.confirm}
                onChange={set('confirm')}
                className="w-full px-4 py-3 rounded-xl border border-[var(--brand-rose-mist)] text-sm focus:outline-none focus:border-primary transition-colors bg-white"
                placeholder="Repeat password"
              />
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.marketing}
                onChange={set('marketing')}
                className="mt-0.5 w-4 h-4 accent-primary"
              />
              <span className="text-xs text-muted-foreground leading-relaxed">
                Send me nail inspo, new drops, and exclusive discounts. You can unsubscribe anytime.
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-full bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_4px_16px_rgba(232,23,122,0.25)]"
            >
              {loading ? 'Creating account…' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{' '}
            <Link href="/account/login" className="text-primary font-medium hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
