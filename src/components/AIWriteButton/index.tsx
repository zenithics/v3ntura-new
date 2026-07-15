'use client'

import React, { useState, useCallback } from 'react'
import { useField, useFormFields, useDocumentInfo } from '@payloadcms/ui'

interface AIWriteButtonProps {
  path: string
  fieldLabel?: string
}

export const AIWriteButton: React.FC<AIWriteButtonProps> = ({ path, fieldLabel }) => {
  const [loading, setLoading] = useState(false)
  const [showContext, setShowContext] = useState(false)
  const [context, setContext] = useState('')
  const [error, setError] = useState<string | null>(null)

  const field = useField<string>({ path })
  const { id, collectionSlug } = useDocumentInfo()

  const titleField = useFormFields(([fields]) => fields?.title)
  const documentTitle = (titleField?.value as string) || ''

  const handleGenerate = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/ai/generate-copy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          fieldName: path,
          fieldLabel: fieldLabel || path.split('.').pop(),
          currentValue: field.value || '',
          context: context || undefined,
          collectionSlug,
          documentTitle,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Failed to generate')
        return
      }

      if (data.text) {
        field.setValue(data.text)
        setShowContext(false)
        setContext('')
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }, [path, field, context, collectionSlug, documentTitle, fieldLabel])

  return (
    <div style={{ position: 'relative', display: 'inline-block', marginLeft: '0.5rem' }}>
      <button
        type="button"
        onClick={() => {
          if (showContext) {
            handleGenerate()
          } else {
            setShowContext(true)
          }
        }}
        disabled={loading}
        title="Generate with AI"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.25rem',
          padding: '0.25rem 0.5rem',
          background: loading ? 'var(--theme-elevation-200)' : 'transparent',
          border: '1px solid var(--theme-elevation-300)',
          borderRadius: '0.25rem',
          cursor: loading ? 'not-allowed' : 'pointer',
          fontSize: '0.75rem',
          color: 'var(--theme-text)',
          whiteSpace: 'nowrap',
        }}
      >
        {loading ? '⏳' : '✨'} {loading ? 'Writing...' : 'Generate'}
      </button>

      {showContext && !loading && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            marginTop: '0.25rem',
            padding: '0.75rem',
            background: 'var(--theme-bg)',
            border: '1px solid var(--theme-elevation-300)',
            borderRadius: '0.375rem',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: 100,
            minWidth: '280px',
          }}
        >
          <label
            style={{
              display: 'block',
              fontSize: '0.75rem',
              fontWeight: 500,
              marginBottom: '0.375rem',
              color: 'var(--theme-text)',
            }}
          >
            Extra context (optional — press Enter to generate):
          </label>
          <input
            type="text"
            value={context}
            onChange={(e) => setContext(e.target.value)}
            placeholder="e.g. for the about us page, summer promo..."
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                handleGenerate()
              }
              if (e.key === 'Escape') {
                setShowContext(false)
              }
            }}
            autoFocus
            style={{
              width: '100%',
              padding: '0.375rem 0.5rem',
              border: '1px solid var(--theme-elevation-300)',
              borderRadius: '0.25rem',
              fontSize: '0.8125rem',
              background: 'var(--theme-input-bg)',
              color: 'var(--theme-text)',
            }}
          />

          {error && (
            <p style={{ color: '#dc2626', fontSize: '0.75rem', marginTop: '0.25rem' }}>{error}</p>
          )}

          <div style={{ display: 'flex', gap: '0.375rem', marginTop: '0.5rem' }}>
            <button
              type="button"
              onClick={handleGenerate}
              style={{
                padding: '0.25rem 0.75rem',
                background: 'var(--theme-success-500)',
                color: '#fff',
                border: 'none',
                borderRadius: '0.25rem',
                cursor: 'pointer',
                fontSize: '0.75rem',
                fontWeight: 500,
              }}
            >
              ✨ Generate
            </button>
            <button
              type="button"
              onClick={() => {
                setShowContext(false)
                setContext('')
                setError(null)
              }}
              style={{
                padding: '0.25rem 0.75rem',
                background: 'transparent',
                border: '1px solid var(--theme-elevation-300)',
                borderRadius: '0.25rem',
                cursor: 'pointer',
                fontSize: '0.75rem',
                color: 'var(--theme-text)',
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

export default AIWriteButton
