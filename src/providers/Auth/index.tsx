'use client'

import React, { createContext, useCallback, useEffect, useState } from 'react'

import type { Customer } from '@/payload-types'

interface RegisterInput {
  name: string
  email: string
  password: string
  marketingOptIn?: boolean
}

interface AuthContextType {
  customer: Customer | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (data: RegisterInput) => Promise<void>
  logout: () => Promise<void>
  refreshCustomer: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType>({
  customer: null,
  loading: true,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  refreshCustomer: async () => {},
})

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [loading, setLoading] = useState(true)

  const refreshCustomer = useCallback(async () => {
    try {
      const res = await fetch('/api/customers/me', { credentials: 'include' })
      const data = await res.json()
      setCustomer(data?.user ?? null)
    } catch {
      setCustomer(null)
    }
  }, [])

  useEffect(() => {
    refreshCustomer().finally(() => setLoading(false))
  }, [refreshCustomer])

  const login = useCallback(async (email: string, password: string) => {
    const res = await fetch('/api/customers/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    })
    const data = await res.json()
    if (!res.ok) {
      throw new Error(data?.errors?.[0]?.message || data?.message || 'Login failed')
    }
    setCustomer(data.user)
  }, [])

  const register = useCallback(
    async ({ name, email, password, marketingOptIn }: RegisterInput) => {
      const res = await fetch('/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, marketingOptIn }),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data?.errors?.[0]?.message || data?.message || 'Registration failed')
      }
      await login(email, password)
    },
    [login],
  )

  const logout = useCallback(async () => {
    await fetch('/api/customers/logout', { method: 'POST', credentials: 'include' })
    setCustomer(null)
  }, [])

  return (
    <AuthContext.Provider value={{ customer, loading, login, register, logout, refreshCustomer }}>
      {children}
    </AuthContext.Provider>
  )
}
