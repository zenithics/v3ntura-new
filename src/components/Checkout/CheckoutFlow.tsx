'use client'

import React, { useState, useContext, useCallback, useEffect, useMemo } from 'react'
import { CartContext } from '@/components/CartProvider'
import { useRouter } from 'next/navigation'
import { StripeProvider } from '@/components/StripeProvider'
import { PaymentForm } from './PaymentForm'
import { formatPrice } from '@/utilities/formatPrice'

type CheckoutStep = 'contact' | 'shipping' | 'payment' | 'confirmation'

interface ShippingAddress {
  line1: string
  line2: string
  city: string
  county: string
  postcode: string
  country: string
}

interface ShippingOptionData {
  id: string
  label: string
  description: string
  price: number
  minOrderValue?: number
}

const FALLBACK_SHIPPING_OPTIONS: ShippingOptionData[] = [
  { id: 'standard', label: 'Standard Shipping', description: '3-5 business days', price: 399 },
  { id: 'express', label: 'Express Shipping', description: '1-2 business days', price: 699 },
  { id: 'free', label: 'Free Shipping', description: '5-7 business days', price: 0, minOrderValue: 5000 },
]

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.625rem',
  border: '1px solid #d1d5db',
  borderRadius: '0.375rem',
  fontSize: '0.9375rem',
  boxSizing: 'border-box',
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.8125rem',
  fontWeight: 500,
  marginBottom: '0.25rem',
}

const fieldStyle: React.CSSProperties = { marginBottom: '1rem' }

export const CheckoutFlow: React.FC = () => {
  const { items, total, clearCart } = useContext(CartContext)
  const router = useRouter()

  const [step, setStep] = useState<CheckoutStep>('contact')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [createAccount, setCreateAccount] = useState(false)
  const [password, setPassword] = useState('')
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    line1: '',
    line2: '',
    city: '',
    county: '',
    postcode: '',
    country: 'GB',
  })
  const [shippingOption, setShippingOption] = useState('standard')
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const [allShippingOptions, setAllShippingOptions] = useState<ShippingOptionData[]>(FALLBACK_SHIPPING_OPTIONS)

  const hasPhysicalProducts = items.some((item) => item.type === 'product')

  useEffect(() => {
    if (!hasPhysicalProducts) return
    fetch('/api/shipping-options')
      .then((r) => r.json())
      .then((data) => {
        if (data.options?.length) setAllShippingOptions(data.options)
      })
      .catch(() => {})
  }, [hasPhysicalProducts])

  const availableShipping = useMemo(
    () => allShippingOptions.filter((opt) => !opt.minOrderValue || total >= opt.minOrderValue),
    [allShippingOptions, total],
  )

  const selectedShipping = allShippingOptions.find((opt) => opt.id === shippingOption)
  const shippingCost = hasPhysicalProducts ? (selectedShipping?.price || 0) : 0
  const orderTotal = total + shippingCost

  useEffect(() => {
    if (items.length === 0 && !orderComplete) {
      router.push('/cart')
    }
  }, [items.length, router, orderComplete])

  const saveCartForRecovery = useCallback(async () => {
    if (!email || items.length === 0) return
    try {
      await fetch('/api/save-cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          customerName: name || undefined,
          items: items.map((item) => ({
            productId: item.productId,
            title: item.title,
            variantName: item.variantName,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            image: item.image,
            slug: item.slug,
            type: (item as any).type,
          })),
        }),
      })
    } catch {
      // Silent — never block checkout
    }
  }, [email, name, items])

  const handleContactSubmit = useCallback(async () => {
    if (!email) {
      setError('Email is required')
      return
    }
    if (!termsAccepted) {
      setError('Please accept the Terms & Conditions to continue')
      return
    }
    setError(null)

    if (createAccount && password) {
      try {
        const res = await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, name }),
        })
        const data = await res.json()
        if (!res.ok) {
          setError(data.error || 'Failed to create account')
          return
        }
      } catch (err: any) {
        setError(err.message || 'Registration failed')
        return
      }
    }

    if (hasPhysicalProducts) {
      setStep('shipping')
    } else {
      await createPaymentIntentAndAdvance()
    }
  }, [email, name, password, createAccount, termsAccepted, hasPhysicalProducts]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleShippingSubmit = useCallback(async () => {
    if (!shippingAddress.line1 || !shippingAddress.city || !shippingAddress.postcode) {
      setError('Please fill in your shipping address')
      return
    }
    setError(null)
    await createPaymentIntentAndAdvance()
  }, [shippingAddress]) // eslint-disable-line react-hooks/exhaustive-deps

  const createPaymentIntentAndAdvance = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          customerEmail: email,
          customerName: name,
          shippingOptionId: hasPhysicalProducts ? shippingOption : undefined,
          shippingAddress: hasPhysicalProducts ? shippingAddress : undefined,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Failed to start payment')
        return
      }

      setClientSecret(data.clientSecret)
      setStep('payment')
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }, [items, email, name, shippingOption, shippingAddress, hasPhysicalProducts])

  const handlePaymentSuccess = useCallback(() => {
    setOrderComplete(true)
    clearCart()
    setStep('confirmation')
  }, [clearCart])

  if (items.length === 0 && !orderComplete) return null

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 1rem' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '2rem' }}>Checkout</h1>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: step === 'confirmation' ? '1fr' : '1fr 380px',
          gap: '3rem',
          alignItems: 'start',
        }}
      >
        {/* ── Checkout Steps ── */}
        <div>
          {/* Step indicators */}
          {step !== 'confirmation' && (
            <div
              style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', fontSize: '0.8125rem' }}
            >
              {(['contact', 'shipping', 'payment'] as const).map((s, i) => (
                <div
                  key={s}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.375rem',
                    color: step === s ? 'inherit' : '#9ca3af',
                    fontWeight: step === s ? 600 : 400,
                  }}
                >
                  <span
                    style={{
                      width: '1.5rem',
                      height: '1.5rem',
                      borderRadius: '50%',
                      background: step === s ? '#000' : '#e5e5e5',
                      color: step === s ? '#fff' : '#9ca3af',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                    }}
                  >
                    {i + 1}
                  </span>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </div>
              ))}
            </div>
          )}

          {/* ── Contact ── */}
          {step === 'contact' && (
            <div>
              <h2 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>Contact Information</h2>

              <div style={fieldStyle}>
                <label style={labelStyle}>Email *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={saveCartForRecovery}
                  style={inputStyle}
                />
              </div>

              <div style={fieldStyle}>
                <label style={labelStyle}>Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div style={{ ...fieldStyle, marginBottom: '1.5rem' }}>
                <label style={labelStyle}>Phone (optional)</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div
                style={{
                  padding: '1rem',
                  background: '#f9fafb',
                  borderRadius: '0.5rem',
                  marginBottom: '1.5rem',
                }}
              >
                <label
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
                >
                  <input
                    type="checkbox"
                    checked={createAccount}
                    onChange={(e) => setCreateAccount(e.target.checked)}
                    style={{ width: '1rem', height: '1rem' }}
                  />
                  <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>
                    Create an account for faster checkout next time
                  </span>
                </label>

                {createAccount && (
                  <div style={{ marginTop: '0.75rem' }}>
                    <label style={labelStyle}>Password *</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Minimum 8 characters"
                      style={inputStyle}
                    />
                  </div>
                )}
              </div>

              <label
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.5rem',
                  cursor: 'pointer',
                  marginBottom: '1rem',
                }}
              >
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  required
                  style={{ marginTop: '0.125rem' }}
                />
                <span style={{ fontSize: '0.8125rem' }}>
                  I agree to the Terms &amp; Conditions and Privacy Policy.
                </span>
              </label>

              {error && (
                <p style={{ color: '#dc2626', fontSize: '0.8125rem', marginBottom: '0.75rem' }}>
                  {error}
                </p>
              )}

              <button
                type="button"
                onClick={handleContactSubmit}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: '#000',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  fontSize: '0.9375rem',
                  fontWeight: 500,
                }}
              >
                {hasPhysicalProducts ? 'Continue to Shipping' : 'Continue to Payment'}
              </button>
            </div>
          )}

          {/* ── Shipping ── */}
          {step === 'shipping' && (
            <div>
              <h2 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>Shipping Address</h2>

              <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={labelStyle}>Address Line 1 *</label>
                  <input
                    type="text"
                    value={shippingAddress.line1}
                    onChange={(e) =>
                      setShippingAddress((prev) => ({ ...prev, line1: e.target.value }))
                    }
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Address Line 2</label>
                  <input
                    type="text"
                    value={shippingAddress.line2}
                    onChange={(e) =>
                      setShippingAddress((prev) => ({ ...prev, line2: e.target.value }))
                    }
                    style={inputStyle}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={labelStyle}>City *</label>
                    <input
                      type="text"
                      value={shippingAddress.city}
                      onChange={(e) =>
                        setShippingAddress((prev) => ({ ...prev, city: e.target.value }))
                      }
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>County</label>
                    <input
                      type="text"
                      value={shippingAddress.county}
                      onChange={(e) =>
                        setShippingAddress((prev) => ({ ...prev, county: e.target.value }))
                      }
                      style={inputStyle}
                    />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={labelStyle}>Postcode *</label>
                    <input
                      type="text"
                      value={shippingAddress.postcode}
                      onChange={(e) =>
                        setShippingAddress((prev) => ({ ...prev, postcode: e.target.value }))
                      }
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Country</label>
                    <input
                      type="text"
                      value={shippingAddress.country}
                      onChange={(e) =>
                        setShippingAddress((prev) => ({ ...prev, country: e.target.value }))
                      }
                      style={inputStyle}
                    />
                  </div>
                </div>
              </div>

              <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>Shipping Method</h3>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  marginBottom: '1.5rem',
                }}
              >
                {availableShipping.map((opt) => (
                  <label
                    key={opt.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.75rem 1rem',
                      border: `2px solid ${shippingOption === opt.id ? '#000' : '#e5e5e5'}`,
                      borderRadius: '0.375rem',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <input
                        type="radio"
                        name="shipping"
                        checked={shippingOption === opt.id}
                        onChange={() => setShippingOption(opt.id)}
                        style={{ accentColor: '#000' }}
                      />
                      <div>
                        <div style={{ fontSize: '0.875rem', fontWeight: 500 }}>{opt.label}</div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                          {opt.description}
                        </div>
                      </div>
                    </div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>
                      {opt.price === 0 ? 'FREE' : formatPrice(opt.price)}
                    </div>
                  </label>
                ))}
              </div>

              {error && (
                <p style={{ color: '#dc2626', fontSize: '0.8125rem', marginBottom: '0.75rem' }}>
                  {error}
                </p>
              )}

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  type="button"
                  onClick={() => setStep('contact')}
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
                  onClick={handleShippingSubmit}
                  disabled={loading}
                  style={{
                    flex: 2,
                    padding: '0.75rem',
                    background: '#000',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '0.375rem',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontSize: '0.9375rem',
                    fontWeight: 500,
                    opacity: loading ? 0.6 : 1,
                  }}
                >
                  {loading ? 'Processing...' : 'Continue to Payment'}
                </button>
              </div>
            </div>
          )}

          {/* ── Payment ── */}
          {step === 'payment' && clientSecret && (
            <div>
              <h2 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>Payment</h2>
              <StripeProvider clientSecret={clientSecret}>
                <PaymentForm
                  onSuccess={handlePaymentSuccess}
                  onBack={() => setStep(hasPhysicalProducts ? 'shipping' : 'contact')}
                  amount={orderTotal}
                />
              </StripeProvider>
            </div>
          )}

          {/* ── Confirmation ── */}
          {step === 'confirmation' && (
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>
                Thank you for your order!
              </h2>
              <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
                A confirmation email has been sent to {email}.
              </p>
              <button
                type="button"
                onClick={() => router.push('/')}
                style={{
                  padding: '0.75rem 2rem',
                  background: '#000',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  fontSize: '0.9375rem',
                  fontWeight: 500,
                }}
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>

        {/* ── Order Summary Sidebar ── */}
        {step !== 'confirmation' && (
          <div
            style={{
              padding: '1.5rem',
              background: '#f9fafb',
              borderRadius: '0.5rem',
              border: '1px solid #e5e5e5',
              position: 'sticky',
              top: '2rem',
            }}
          >
            <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>
              Order Summary
            </h3>

            {items.map((item) => (
              <div
                key={item.cartItemId}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '0.75rem',
                  fontSize: '0.875rem',
                }}
              >
                <div>
                  <div style={{ fontWeight: 500 }}>{item.title}</div>
                  {item.variantName && (
                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{item.variantName}</div>
                  )}
                  <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Qty: {item.quantity}</div>
                </div>
                <div style={{ fontWeight: 500 }}>{formatPrice(item.unitPrice * item.quantity)}</div>
              </div>
            ))}

            <div
              style={{ borderTop: '1px solid #e5e5e5', paddingTop: '0.75rem', marginTop: '0.75rem' }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.875rem',
                  marginBottom: '0.375rem',
                }}
              >
                <span>Subtotal</span>
                <span>{formatPrice(total)}</span>
              </div>

              {hasPhysicalProducts && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.875rem',
                    marginBottom: '0.375rem',
                  }}
                >
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? 'FREE' : formatPrice(shippingCost)}</span>
                </div>
              )}

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontWeight: 600,
                  fontSize: '1rem',
                  paddingTop: '0.5rem',
                  borderTop: '1px solid #e5e5e5',
                  marginTop: '0.5rem',
                }}
              >
                <span>Total</span>
                <span>{formatPrice(orderTotal)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
