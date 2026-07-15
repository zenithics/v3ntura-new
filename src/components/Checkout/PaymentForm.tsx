'use client'

import React, { useState, useCallback } from 'react'
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { formatPrice } from '@/utilities/formatPrice'

interface PaymentFormProps {
  onSuccess: () => void
  onBack: () => void
  amount: number
}

export const PaymentForm: React.FC<PaymentFormProps> = ({ onSuccess, onBack, amount }) => {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = useCallback(async () => {
    if (!stripe || !elements) return

    setLoading(true)
    setError(null)

    try {
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/checkout/success`,
        },
        redirect: 'if_required',
      })

      if (result.error) {
        setError(result.error.message || 'Payment failed')
      } else if (result.paymentIntent?.status === 'succeeded') {
        onSuccess()
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }, [stripe, elements, onSuccess])

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <PaymentElement options={{ layout: 'accordion' }} />
      </div>

      {error && (
        <p style={{ color: '#dc2626', fontSize: '0.8125rem', marginBottom: '0.75rem' }}>{error}</p>
      )}

      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <button
          type="button"
          onClick={onBack}
          style={{
            flex: 1,
            padding: '0.75rem',
            background: 'transparent',
            border: '1px solid #d1d5db',
            borderRadius: '0.375rem',
            cursor: 'pointer',
            fontSize: '0.9375rem',
          }}
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!stripe || loading}
          style={{
            flex: 2,
            padding: '0.75rem',
            background: '#000',
            color: '#fff',
            border: 'none',
            borderRadius: '0.375rem',
            cursor: !stripe || loading ? 'not-allowed' : 'pointer',
            fontSize: '0.9375rem',
            fontWeight: 500,
            opacity: !stripe || loading ? 0.6 : 1,
          }}
        >
          {loading ? 'Processing...' : `Pay ${formatPrice(amount)}`}
        </button>
      </div>

      <div style={{ marginTop: '1rem', textAlign: 'center' }}>
        <p style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
          🔒 Payments are processed securely by Stripe
        </p>
      </div>
    </div>
  )
}
