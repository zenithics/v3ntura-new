'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

const FIELDS = [
  { name: 'line1', label: 'Address Line 1', placeholder: '123 High Street', required: true },
  { name: 'line2', label: 'Address Line 2', placeholder: 'Flat 2', required: false },
  { name: 'city', label: 'Town / City', placeholder: 'London', required: true },
  { name: 'county', label: 'County', placeholder: 'Greater London', required: false },
  { name: 'postcode', label: 'Postcode', placeholder: 'SW1A 1AA', required: true },
  { name: 'country', label: 'Country', placeholder: 'United Kingdom', required: true },
]

type AddressForm = Record<string, string>

export default function AddressesPage() {
  const { customer, loading, refreshCustomer } = useAuth()
  const router = useRouter()

  const [form, setForm] = useState<AddressForm>({ line1: '', line2: '', city: '', county: '', postcode: '', country: 'United Kingdom' })
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!loading && !customer) router.replace('/account/login')
  }, [customer, loading, router])

  useEffect(() => {
    if (customer?.defaultAddress) {
      setForm({ ...form, ...Object.fromEntries(Object.entries(customer.defaultAddress).filter(([, v]) => v)) })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customer])

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setSaving(true)
    try {
      const res = await fetch(`/api/customers/${customer!.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ defaultAddress: form }),
      })
      if (!res.ok) throw new Error()
      await refreshCustomer()
      setSuccess('Address saved successfully.')
    } catch {
      setError('Failed to save address. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  if (loading || !customer) {
    return <div className="flex justify-center py-20"><div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>
  }

  return (
    <div>
      <h1 className="font-serif text-2xl mb-6">Addresses</h1>

      <div className="bg-white rounded-2xl border border-[var(--brand-rose-mist)] p-6">
        <h2 className="font-semibold text-sm mb-5">Default Shipping Address</h2>

        {success && <div className="mb-4 px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm">{success}</div>}
        {error && <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {FIELDS.map(({ name, label, placeholder, required }) => (
            <div key={name}>
              <label className="block text-sm font-medium mb-1.5">
                {label} {required && <span className="text-primary">*</span>}
              </label>
              <input
                type="text"
                required={required}
                value={form[name] ?? ''}
                onChange={set(name)}
                className="w-full px-4 py-3 rounded-xl border border-[var(--brand-rose-mist)] text-sm focus:outline-none focus:border-primary transition-colors bg-white"
                placeholder={placeholder}
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={saving}
            className="self-start px-8 py-3 rounded-full bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors disabled:opacity-60"
          >
            {saving ? 'Saving…' : 'Save Address'}
          </button>
        </form>
      </div>
    </div>
  )
}
