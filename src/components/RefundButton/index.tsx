'use client'

import React, { useState } from 'react'
import { useDocumentInfo } from '@payloadcms/ui'

type RefundReason = 'duplicate' | 'fraudulent' | 'requested_by_customer' | ''

const RefundButton: React.FC = () => {
  const { id, savedData } = useDocumentInfo()

  const orderTotal: number = (savedData as any)?.total || 0
  const alreadyRefunded: number = (savedData as any)?.totalRefunded || 0
  const maxRefundable = orderTotal - alreadyRefunded
  const stripePaymentIntentId = (savedData as any)?.stripePaymentIntentId
  const stripeSessionId = (savedData as any)?.stripeSessionId

  const hasStripePayment = Boolean(stripePaymentIntentId || stripeSessionId)

  const [isOpen, setIsOpen] = useState(false)
  const [refundType, setRefundType] = useState<'full' | 'partial'>('full')
  const [partialAmount, setPartialAmount] = useState('')
  const [reason, setReason] = useState<RefundReason>('requested_by_customer')
  const [note, setNote] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)

  const formatPence = (pence: number) => `£${(pence / 100).toFixed(2)}`

  const handleSubmit = async () => {
    setLoading(true)
    setResult(null)

    const amount =
      refundType === 'full'
        ? maxRefundable
        : Math.round(parseFloat(partialAmount || '0') * 100)

    if (!amount || amount <= 0) {
      setResult({ success: false, message: 'Enter a valid refund amount' })
      setLoading(false)
      return
    }

    try {
      const res = await fetch('/api/refund', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ orderId: id, amount, reason: reason || undefined, note: note || undefined }),
      })

      const data = await res.json()

      if (!res.ok) {
        setResult({ success: false, message: data.error || 'Refund failed' })
      } else {
        setResult({
          success: true,
          message: `Refunded ${formatPence(data.amountRefunded)} successfully (Stripe ID: ${data.refundId})`,
        })
        setIsOpen(false)
        // Reload the page to show updated refund history
        setTimeout(() => window.location.reload(), 1500)
      }
    } catch {
      setResult({ success: false, message: 'Network error — please try again' })
    } finally {
      setLoading(false)
    }
  }

  if (!hasStripePayment) {
    return (
      <div style={{ padding: '12px 0', color: '#888', fontSize: 14 }}>
        No Stripe payment linked — refunds are only available for orders processed via Stripe.
      </div>
    )
  }

  if (maxRefundable <= 0) {
    return (
      <div style={{ padding: '12px 0', color: '#888', fontSize: 14 }}>
        This order has been fully refunded ({formatPence(alreadyRefunded)}).
      </div>
    )
  }

  return (
    <div style={{ padding: '8px 0' }}>
      {result && (
        <div
          style={{
            padding: '10px 14px',
            borderRadius: 6,
            marginBottom: 12,
            fontSize: 14,
            background: result.success ? '#ecfdf5' : '#fef2f2',
            color: result.success ? '#065f46' : '#991b1b',
            border: `1px solid ${result.success ? '#6ee7b7' : '#fca5a5'}`,
          }}
        >
          {result.message}
        </div>
      )}

      <div
        style={{
          padding: '12px 16px',
          background: '#fffbeb',
          border: '1px solid #fcd34d',
          borderRadius: 8,
          marginBottom: 12,
          fontSize: 13,
        }}
      >
        <strong>Order total:</strong> {formatPence(orderTotal)} &nbsp;·&nbsp;{' '}
        <strong>Refunded:</strong> {formatPence(alreadyRefunded)} &nbsp;·&nbsp;{' '}
        <strong>Refundable:</strong> {formatPence(maxRefundable)}
      </div>

      {!isOpen ? (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          style={{
            padding: '8px 20px',
            background: '#dc2626',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: 14,
          }}
        >
          Issue Refund
        </button>
      ) : (
        <div
          style={{
            border: '1px solid #e5e7eb',
            borderRadius: 8,
            padding: 16,
            background: '#fff',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            maxWidth: 420,
          }}
        >
          <h4 style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>Issue Refund</h4>

          {/* Refund type */}
          <div style={{ display: 'flex', gap: 8 }}>
            {(['full', 'partial'] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setRefundType(t)}
                style={{
                  padding: '6px 16px',
                  borderRadius: 6,
                  border: '1px solid',
                  borderColor: refundType === t ? '#dc2626' : '#d1d5db',
                  background: refundType === t ? '#fef2f2' : '#f9fafb',
                  color: refundType === t ? '#dc2626' : '#374151',
                  fontWeight: refundType === t ? 600 : 400,
                  cursor: 'pointer',
                  fontSize: 13,
                  textTransform: 'capitalize',
                }}
              >
                {t === 'full' ? `Full (${formatPence(maxRefundable)})` : 'Partial'}
              </button>
            ))}
          </div>

          {/* Partial amount input */}
          {refundType === 'partial' && (
            <div>
              <label style={{ display: 'block', fontSize: 13, marginBottom: 4, fontWeight: 500 }}>
                Amount (£)
              </label>
              <input
                type="number"
                step="0.01"
                min="0.01"
                max={(maxRefundable / 100).toFixed(2)}
                value={partialAmount}
                onChange={(e) => setPartialAmount(e.target.value)}
                placeholder={`Max £${(maxRefundable / 100).toFixed(2)}`}
                style={{
                  width: '100%',
                  padding: '7px 10px',
                  border: '1px solid #d1d5db',
                  borderRadius: 6,
                  fontSize: 14,
                  boxSizing: 'border-box',
                }}
              />
            </div>
          )}

          {/* Reason */}
          <div>
            <label style={{ display: 'block', fontSize: 13, marginBottom: 4, fontWeight: 500 }}>
              Reason
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value as RefundReason)}
              style={{
                width: '100%',
                padding: '7px 10px',
                border: '1px solid #d1d5db',
                borderRadius: 6,
                fontSize: 14,
                background: '#fff',
                boxSizing: 'border-box',
              }}
            >
              <option value="requested_by_customer">Customer request</option>
              <option value="duplicate">Duplicate</option>
              <option value="fraudulent">Fraudulent</option>
              <option value="">No reason</option>
            </select>
          </div>

          {/* Internal note */}
          <div>
            <label style={{ display: 'block', fontSize: 13, marginBottom: 4, fontWeight: 500 }}>
              Internal Note (optional)
            </label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. Item damaged in transit"
              style={{
                width: '100%',
                padding: '7px 10px',
                border: '1px solid #d1d5db',
                borderRadius: 6,
                fontSize: 14,
                boxSizing: 'border-box',
              }}
            />
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              style={{
                flex: 1,
                padding: '8px 0',
                background: loading ? '#f87171' : '#dc2626',
                color: '#fff',
                border: 'none',
                borderRadius: 6,
                cursor: loading ? 'not-allowed' : 'pointer',
                fontWeight: 600,
                fontSize: 14,
              }}
            >
              {loading ? 'Processing…' : 'Confirm Refund'}
            </button>
            <button
              type="button"
              onClick={() => { setIsOpen(false); setResult(null) }}
              disabled={loading}
              style={{
                padding: '8px 16px',
                background: '#f3f4f6',
                color: '#374151',
                border: '1px solid #d1d5db',
                borderRadius: 6,
                cursor: 'pointer',
                fontSize: 14,
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default RefundButton
