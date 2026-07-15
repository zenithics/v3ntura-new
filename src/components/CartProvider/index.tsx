'use client'

import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react'

export interface CartItem {
  cartItemId: string
  productId: string
  eventId?: string
  title: string
  unitPrice: number
  quantity: number
  variantName?: string
  ticketTypeName?: string
  image?: any
  slug: string
  type: 'product' | 'ticket'
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'cartItemId'>) => void
  removeItem: (cartItemId: string) => void
  updateQuantity: (cartItemId: string, quantity: number) => void
  clearCart: () => void
  total: number
  itemCount: number
}

export const CartContext = createContext<CartContextType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  total: 0,
  itemCount: 0,
})

const CART_STORAGE_KEY = 'zenithics-cart'

function generateCartItemId(item: Omit<CartItem, 'cartItemId'>): string {
  return `${item.type}-${item.productId || item.eventId}-${item.variantName || item.ticketTypeName || 'default'}`
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([])
  const [hydrated, setHydrated] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY)
      if (stored) {
        setItems(JSON.parse(stored))
      }
    } catch {
      // Ignore localStorage errors
    }
    setHydrated(true)
  }, [])

  // Save cart to localStorage on change
  useEffect(() => {
    if (hydrated) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
      } catch {
        // Ignore localStorage errors
      }
    }
  }, [items, hydrated])

  const addItem = useCallback((newItem: Omit<CartItem, 'cartItemId'>) => {
    const cartItemId = generateCartItemId(newItem)

    setItems((prev) => {
      const existing = prev.find((item) => item.cartItemId === cartItemId)
      if (existing) {
        return prev.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + (newItem.quantity || 1) }
            : item,
        )
      }
      return [...prev, { ...newItem, cartItemId }]
    })
  }, [])

  const removeItem = useCallback((cartItemId: string) => {
    setItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId))
  }, [])

  const updateQuantity = useCallback((cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId))
      return
    }
    setItems((prev) =>
      prev.map((item) => (item.cartItemId === cartItemId ? { ...item, quantity } : item)),
    )
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0),
    [items],
  )

  const itemCount = useMemo(
    () => items.reduce((count, item) => count + item.quantity, 0),
    [items],
  )

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, total, itemCount }}
    >
      {children}
    </CartContext.Provider>
  )
}
