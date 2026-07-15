'use client'

import React, { useState, useCallback } from 'react'
import { useDocumentInfo, useFormFields } from '@payloadcms/ui'

export const DataRequestActions: React.FC = () => {
  const { id } = useDocumentInfo()
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const requestType = useFormFields(([fields]) => fields?.requestType?.value)
  const email = useFormFields(([fields]) => fields?.email?.value)
  const status = useFormFields(([fields]) => fields?.status?.value)

  const handleExport = useCallback(async () => {
    if (!email) {
      setError('Email is required')
      return
    }

    const confirmed = window.confirm(
      `Generate a data export for ${email}? This will compile all data held about this person.`,
    )
    if (!confirmed) return

    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/gdpr/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, dataRequestId: id }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Export failed')
        return
      }

      setResult(data)
      setTimeout(() => window.location.reload(), 1500)
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }, [email, id])

  const handleErasure = useCallback(async () => {
    if (!email) {
      setError('Email is required')
      return
    }

    const confirmed = window.confirm(
      `⚠️ IRREVERSIBLE: Anonymise all personal data for ${email}?\n\nThis will:\n- Replace names, emails, addresses with [REDACTED]\n- Delete activity log entries\n- Keep financial records (order totals, dates) for HMRC\n\nThis cannot be undone.`,
    )
    if (!confirmed) return

    const doubleConfirm = window.confirm(
      `Are you absolutely sure? Proceeding will anonymise all data for: ${email}`,
    )
    if (!doubleConfirm) return

    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/gdpr/erasure', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, dataRequestId: id }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Erasure failed')
        return
      }

      setResult(data)
      setTimeout(() => window.location.reload(), 1500)
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }, [email, id])

  if (status === 'fulfilled') {
    return (
      <div
        style={{
          padding: '0.75rem',
          background: '#ecfdf5',
          border: '1px solid #6ee7b7',
          borderRadius: '0.375rem',
          marginTop: '1rem',
        }}
      >
        <p style={{ fontSize: '0.875rem', color: '#065f46', fontWeight: 500 }}>
          ✅ This request has been fulfilled.
        </p>
      </div>
    )
  }

  if (result) {
    return (
      <div
        style={{
          padding: '0.75rem',
          background: '#ecfdf5',
          border: '1px solid #6ee7b7',
          borderRadius: '0.375rem',
          marginTop: '1rem',
        }}
      >
        <p style={{ fontSize: '0.875rem', color: '#065f46', fontWeight: 500 }}>
          ✅ Request processed successfully. Refreshing...
        </p>
      </div>
    )
  }

  return (
    <div
      style={{
        padding: '1rem',
        background: 'var(--theme-elevation-50)',
        border: '1px solid var(--theme-elevation-200)',
        borderRadius: '0.5rem',
        marginTop: '1rem',
      }}
    >
      <h4 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.75rem' }}>
        Process Request
      </h4>

      <p
        style={{
          fontSize: '0.8125rem',
          color: 'var(--theme-elevation-500)',
          marginBottom: '1rem',
        }}
      >
        Save the request first (with email and type), then use these buttons to process it.
      </p>

      {error && (
        <p style={{ color: '#dc2626', fontSize: '0.8125rem', marginBottom: '0.75rem' }}>
          {error}
        </p>
      )}

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        {requestType === 'export' && (
          <button
            type="button"
            onClick={handleExport}
            disabled={loading || !email}
            style={{
              padding: '0.5rem 1rem',
              background: '#2563eb',
              color: '#fff',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '0.8125rem',
              fontWeight: 500,
              opacity: loading ? 0.6 : 1,
            }}
          >
            {loading ? 'Exporting...' : '📄 Generate Data Export'}
          </button>
        )}

        {requestType === 'erasure' && (
          <button
            type="button"
            onClick={handleErasure}
            disabled={loading || !email}
            style={{
              padding: '0.5rem 1rem',
              background: '#dc2626',
              color: '#fff',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '0.8125rem',
              fontWeight: 500,
              opacity: loading ? 0.6 : 1,
            }}
          >
            {loading ? 'Processing...' : '🗑️ Anonymise Data (Irreversible)'}
          </button>
        )}

        {requestType === 'rectification' && (
          <p style={{ fontSize: '0.8125rem', color: 'var(--theme-elevation-500)' }}>
            Rectification requests must be handled manually. Find the data subject&apos;s records
            across Users, Customers, and Orders, make the corrections, then mark this request as
            fulfilled.
          </p>
        )}
      </div>
    </div>
  )
}

export default DataRequestActions
