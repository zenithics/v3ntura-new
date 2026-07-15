'use client'

import React, { useState, useCallback } from 'react'
import { useForm, useField } from '@payloadcms/ui'
import type { FormState } from 'payload'

function buildRowId(): string {
  return Math.random().toString(36).slice(2, 10) + Math.random().toString(36).slice(2, 10)
}

function blockToFormState(block: Record<string, unknown>): FormState {
  const state: FormState = {}

  function process(value: unknown, path: string) {
    if (Array.isArray(value)) {
      const rows = value.map(() => ({ id: buildRowId(), isLoading: false }))
      state[path] = { value: value.length, initialValue: value.length, valid: true, rows }
      value.forEach((item, i) => {
        if (item && typeof item === 'object') {
          Object.entries(item as Record<string, unknown>).forEach(([k, v]) => {
            if (k !== 'id') process(v, `${path}.${i}.${k}`)
          })
          const rowId = (rows[i] as any).id
          state[`${path}.${i}.id`] = { value: rowId, initialValue: rowId, valid: true }
        }
      })
    } else if (value && typeof value === 'object') {
      state[path] = { value, initialValue: value, valid: true }
    } else {
      state[path] = { value, initialValue: value, valid: true }
    }
  }

  Object.entries(block).forEach(([key, value]) => {
    if (key !== 'blockType' && key !== 'id') {
      process(value, key)
    }
  })

  return state
}

export const AIBlockGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [expanded, setExpanded] = useState(false)

  const { addFieldRow } = useForm()
  const layoutField = useField<any[]>({ path: 'layout' })

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim()) return

    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/ai/generate-blocks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ prompt }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Failed to generate content')
        return
      }

      if (data.blocks && Array.isArray(data.blocks)) {
        let rowIndex = layoutField?.value?.length || 0
        for (const block of data.blocks) {
          addFieldRow({
            path: 'layout',
            blockType: block.blockType,
            rowIndex,
            schemaPath: 'layout',
            subFieldState: blockToFormState(block),
          })
          rowIndex++
        }
        setPrompt('')
        setExpanded(false)
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }, [prompt, addFieldRow, layoutField?.value?.length])

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 1rem',
          background: 'var(--theme-elevation-100)',
          border: '1px solid var(--theme-elevation-200)',
          borderRadius: '0.375rem',
          cursor: 'pointer',
          fontSize: '0.875rem',
          fontWeight: 500,
          color: 'var(--theme-text)',
          width: '100%',
          justifyContent: 'center',
        }}
      >
        ✨ AI Block Generator
        <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>{expanded ? '▲' : '▼'}</span>
      </button>

      {expanded && (
        <div
          style={{
            marginTop: '0.75rem',
            padding: '1rem',
            border: '1px solid var(--theme-elevation-200)',
            borderRadius: '0.375rem',
            background: 'var(--theme-elevation-50)',
          }}
        >
          <label
            style={{
              display: 'block',
              fontSize: '0.8125rem',
              fontWeight: 500,
              marginBottom: '0.5rem',
              color: 'var(--theme-text)',
            }}
          >
            Describe the section you want to build:
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder='e.g. "Build me a testimonials section with 3 reviews from happy customers"'
            rows={3}
            style={{
              width: '100%',
              padding: '0.625rem',
              border: '1px solid var(--theme-elevation-300)',
              borderRadius: '0.25rem',
              fontSize: '0.875rem',
              resize: 'vertical',
              background: 'var(--theme-input-bg)',
              color: 'var(--theme-text)',
              fontFamily: 'inherit',
            }}
          />

          {error && (
            <div
              style={{
                marginTop: '0.5rem',
                padding: '0.5rem',
                background: '#fef2f2',
                color: '#dc2626',
                borderRadius: '0.25rem',
                fontSize: '0.8125rem',
              }}
            >
              {error}
            </div>
          )}

          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
            <button
              type="button"
              onClick={handleGenerate}
              disabled={loading || !prompt.trim()}
              style={{
                padding: '0.5rem 1.25rem',
                background: loading ? 'var(--theme-elevation-200)' : 'var(--theme-success-500)',
                color: '#fff',
                border: 'none',
                borderRadius: '0.25rem',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '0.875rem',
                fontWeight: 500,
              }}
            >
              {loading ? '⏳ Generating...' : '✨ Generate Blocks'}
            </button>
            <button
              type="button"
              onClick={() => setExpanded(false)}
              style={{
                padding: '0.5rem 1rem',
                background: 'transparent',
                border: '1px solid var(--theme-elevation-300)',
                borderRadius: '0.25rem',
                cursor: 'pointer',
                fontSize: '0.875rem',
                color: 'var(--theme-text)',
              }}
            >
              Cancel
            </button>
          </div>

          <p
            style={{
              marginTop: '0.5rem',
              fontSize: '0.75rem',
              color: 'var(--theme-elevation-500)',
            }}
          >
            The AI uses your brand context and tone from System → AI Assistant settings.
          </p>
        </div>
      )}
    </div>
  )
}

export default AIBlockGenerator
