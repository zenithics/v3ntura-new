'use client'

import React, { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'

interface ReviewFormProps {
  productId: string | number
  onSuccess?: () => void
}

const StarSelector: React.FC<{ value: number; onChange: (v: number) => void }> = ({
  value,
  onChange,
}) => {
  const [hover, setHover] = useState(0)

  return (
    <div className="flex gap-1" role="group" aria-label="Select rating">
      {[1, 2, 3, 4, 5].map((star) => {
        const active = (hover || value) >= star
        return (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            aria-label={`${star} star${star !== 1 ? 's' : ''}`}
            className="transition-transform hover:scale-110 active:scale-95"
          >
            <svg viewBox="0 0 20 20" className="w-8 h-8" aria-hidden="true">
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                fill={active ? 'var(--color-primary, #E8177A)' : '#D1D5DB'}
              />
            </svg>
          </button>
        )
      })}
    </div>
  )
}

export const ReviewForm: React.FC<ReviewFormProps> = ({ productId, onSuccess }) => {
  const { customer } = useAuth()

  const [rating, setRating] = useState(0)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [name, setName] = useState(
    (customer as any)?.name ?? '',
  )
  const [email, setEmail] = useState(customer?.email ?? '')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (rating === 0) {
      setError('Please select a star rating.')
      return
    }
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product: productId,
          rating,
          title: title.trim() || undefined,
          body,
          customerName: name,
          customerEmail: email,
          customerId: customer?.id,
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Failed to submit review')

      setSuccess(true)
      onSuccess?.()
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-center">
        <div className="text-3xl mb-2">🎉</div>
        <p className="font-semibold text-emerald-800">Thank you for your review!</p>
        <p className="text-sm text-emerald-700 mt-1">
          Your review will appear once it has been approved.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Your Rating *</label>
        <StarSelector value={rating} onChange={setRating} />
      </div>

      <div>
        <label htmlFor="review-title" className="block text-sm font-medium mb-1">
          Review Title
        </label>
        <input
          id="review-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Love these nails!"
          className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:border-primary"
        />
      </div>

      <div>
        <label htmlFor="review-body" className="block text-sm font-medium mb-1">
          Review *
        </label>
        <textarea
          id="review-body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
          rows={4}
          placeholder="Share your experience with this product…"
          className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:border-primary resize-none"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="review-name" className="block text-sm font-medium mb-1">
            Name *
          </label>
          <input
            id="review-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Your name"
            className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:border-primary"
          />
        </div>
        <div>
          <label htmlFor="review-email" className="block text-sm font-medium mb-1">
            Email *
          </label>
          <input
            id="review-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="your@email.com"
            className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:border-primary"
          />
          <p className="text-xs text-muted-foreground mt-1">Not shown publicly</p>
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="bg-primary text-white px-6 py-2.5 rounded-full font-medium text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Submitting…' : 'Submit Review'}
      </button>
    </form>
  )
}
