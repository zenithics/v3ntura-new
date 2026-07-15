'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

export default function AccountDetailsPage() {
  const { customer, loading, refreshCustomer } = useAuth()
  const router = useRouter()

  const [form, setForm] = useState({ name: '', email: '', phone: '', marketing: false })
  const [pwForm, setPwForm] = useState({ current: '', next: '', confirm: '' })
  const [saving, setSaving] = useState(false)
  const [pwSaving, setPwSaving] = useState(false)
  const [success, setSuccess] = useState('')
  const [pwSuccess, setPwSuccess] = useState('')
  const [error, setError] = useState('')
  const [pwError, setPwError] = useState('')

  useEffect(() => {
    if (!loading && !customer) router.replace('/account/login')
  }, [customer, loading, router])

  useEffect(() => {
    if (customer) {
      setForm({ name: customer.name ?? '', email: customer.email, phone: customer.phone ?? '', marketing: customer.marketingOptIn ?? false })
    }
  }, [customer])

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(prev => ({ ...prev, [field]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setSaving(true)
    try {
      const res = await fetch(`/api/customers/${customer!.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name: form.name, phone: form.phone, marketingOptIn: form.marketing }),
      })
      if (!res.ok) throw new Error()
      await refreshCustomer()
      setSuccess('Details updated successfully.')
    } catch {
      setError('Failed to save. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    setPwError('')
    setPwSuccess('')
    if (pwForm.next !== pwForm.confirm) { setPwError("Passwords don't match."); return }
    if (pwForm.next.length < 8) { setPwError('Password must be at least 8 characters.'); return }
    setPwSaving(true)
    try {
      const res = await fetch('/api/customers/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ currentPassword: pwForm.current, newPassword: pwForm.next }),
      })
      if (!res.ok) throw new Error()
      setPwSuccess('Password updated.')
      setPwForm({ current: '', next: '', confirm: '' })
    } catch {
      setPwError('Failed to update password. Check your current password is correct.')
    } finally {
      setPwSaving(false)
    }
  }

  if (loading || !customer) {
    return <div className="flex justify-center py-20"><div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>
  }

  return (
    <div className="space-y-6">
      <h1 className="font-serif text-2xl">Account Details</h1>

      {/* Profile */}
      <div className="bg-white rounded-2xl border border-[var(--brand-rose-mist)] p-6">
        <h2 className="font-semibold text-sm mb-5">Personal Information</h2>

        {success && <div className="mb-4 px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm">{success}</div>}
        {error && <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">{error}</div>}

        <form onSubmit={handleProfileSave} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Full Name</label>
              <input
                type="text"
                value={form.name}
                onChange={set('name')}
                className="w-full px-4 py-3 rounded-xl border border-[var(--brand-rose-mist)] text-sm focus:outline-none focus:border-primary transition-colors bg-white"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Phone</label>
              <input
                type="tel"
                value={form.phone}
                onChange={set('phone')}
                className="w-full px-4 py-3 rounded-xl border border-[var(--brand-rose-mist)] text-sm focus:outline-none focus:border-primary transition-colors bg-white"
                placeholder="+44 7700 000000"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Email</label>
            <input
              type="email"
              value={form.email}
              disabled
              className="w-full px-4 py-3 rounded-xl border border-[var(--brand-rose-mist)] text-sm bg-[var(--brand-blush)]/40 text-muted-foreground cursor-not-allowed"
            />
            <p className="text-xs text-muted-foreground mt-1">Contact support to change your email address.</p>
          </div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={form.marketing} onChange={set('marketing')} className="w-4 h-4 accent-primary" />
            <span className="text-sm text-muted-foreground">Receive nail inspo, new drops & exclusive offers</span>
          </label>
          <button
            type="submit"
            disabled={saving}
            className="self-start px-8 py-3 rounded-full bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors disabled:opacity-60"
          >
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
        </form>
      </div>

      {/* Password */}
      <div className="bg-white rounded-2xl border border-[var(--brand-rose-mist)] p-6">
        <h2 className="font-semibold text-sm mb-5">Change Password</h2>

        {pwSuccess && <div className="mb-4 px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm">{pwSuccess}</div>}
        {pwError && <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">{pwError}</div>}

        <form onSubmit={handlePasswordChange} className="flex flex-col gap-4">
          {[
            { id: 'current', label: 'Current Password', field: 'current', auto: 'current-password' },
            { id: 'next', label: 'New Password', field: 'next', auto: 'new-password' },
            { id: 'confirm', label: 'Confirm New Password', field: 'confirm', auto: 'new-password' },
          ].map(({ id, label, field, auto }) => (
            <div key={id}>
              <label className="block text-sm font-medium mb-1.5">{label}</label>
              <input
                id={id}
                type="password"
                required
                autoComplete={auto}
                value={pwForm[field as keyof typeof pwForm]}
                onChange={e => setPwForm(prev => ({ ...prev, [field]: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl border border-[var(--brand-rose-mist)] text-sm focus:outline-none focus:border-primary transition-colors bg-white"
                placeholder="••••••••"
              />
            </div>
          ))}
          <button
            type="submit"
            disabled={pwSaving}
            className="self-start px-8 py-3 rounded-full bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors disabled:opacity-60"
          >
            {pwSaving ? 'Updating…' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  )
}
