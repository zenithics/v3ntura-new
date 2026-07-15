'use client'

import React, { useState, useRef } from 'react'

export const ProductActions: React.FC = () => {
  const [importing, setImporting] = useState(false)
  const [result, setResult] = useState<any>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const handleExport = () => {
    window.open('/api/products/export', '_blank')
  }

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setImporting(true)
    setResult(null)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch('/api/products/import', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      })

      const data = await res.json()
      setResult(data)
    } catch (err: any) {
      setResult({ error: err.message })
    } finally {
      setImporting(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  return (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '16px' }}>
      <button
        onClick={handleExport}
        style={{
          padding: '8px 16px',
          background: '#18181b',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '13px',
        }}
      >
        📥 Export CSV
      </button>
      <label
        style={{
          padding: '8px 16px',
          background: importing ? '#a1a1aa' : '#18181b',
          color: '#fff',
          borderRadius: '6px',
          cursor: importing ? 'not-allowed' : 'pointer',
          fontSize: '13px',
        }}
      >
        {importing ? 'Importing...' : '📤 Import CSV'}
        <input
          ref={fileRef}
          type="file"
          accept=".csv"
          onChange={handleImport}
          disabled={importing}
          style={{ display: 'none' }}
        />
      </label>
      {result && (
        <span style={{ fontSize: '13px', color: result.error ? '#dc2626' : '#16a34a' }}>
          {result.error
            ? `Error: ${result.error}`
            : `✅ Created: ${result.created}, Updated: ${result.updated}${result.errors?.length ? `, Errors: ${result.errors.length}` : ''}`}
        </span>
      )}
    </div>
  )
}

export default ProductActions
