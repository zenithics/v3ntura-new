'use client'

import React from 'react'
import { useDocumentInfo } from '@payloadcms/ui'

export const InvoiceButton: React.FC = () => {
  const { id } = useDocumentInfo()

  if (!id) return null

  return (
    <button
      onClick={() => window.open(`/api/orders/invoice?id=${id}`, '_blank')}
      style={{
        padding: '8px 16px',
        background: '#18181b',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '13px',
        marginTop: '8px',
      }}
    >
      📄 Download Invoice PDF
    </button>
  )
}

export default InvoiceButton
