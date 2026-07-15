'use client'

import React, { useState } from 'react'
import Link from 'next/link'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/customers/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) throw new Error()
      setSent(true)
    } catch {
      setError('Something went wrong. Please try again.')
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
          <h1 className="font-serif text-3xl mt-4 mb-2">Forgot your password?</h1>
          <p className="text-sm text-muted-foreground">We'll send you a reset link</p>
        </div>

        <div className="bg-white rounded-2xl border border-[var(--brand-rose-mist)] p-8">
          {sent ? (
            <div className="text-center py-4">
              <div className="text-4xl mb-4">📬</div>
              <h2 className="font-semibold text-lg mb-2">Check your inbox</h2>
              <p className="text-sm text-muted-foreground mb-6">
                If an account exists for <strong>{email}</strong>, you'll receive a reset link shortly.
              </p>
              <Link href="/account/login" className="text-sm text-primary font-medium hover:underline">
                ← Back to login
              </Link>
            </div>
          ) : (
            <>
              {error && (
                <div className="mb-5 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label className="block text-sm font-medium mb-1.5" htmlFor="email">Email address</label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[var(--brand-rose-mist)] text-sm focus:outline-none focus:border-primary transition-colors bg-white"
                    placeholder="you@example.com"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-full bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors disabled:opacity-60 shadow-[0_4px_16px_rgba(232,23,122,0.25)]"
                >
                  {loading ? 'Sending…' : 'Send Reset Link'}
                </button>
              </form>
              <p className="text-center text-sm text-muted-foreground mt-6">
                <Link href="/account/login" className="text-primary font-medium hover:underline">← Back to login</Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
