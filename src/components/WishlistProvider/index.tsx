'use client'

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

export interface WishlistItem {
  productId: string
  title: string
  price: number
  image?: { url: string; alt?: string } | null
  slug: string
  addedAt: number
}

interface WishlistContextType {
  items: WishlistItem[]
  addItem: (item: Omit<WishlistItem, 'addedAt'>) => void
  removeItem: (productId: string) => void
  toggleItem: (item: Omit<WishlistItem, 'addedAt'>) => void
  isInWishlist: (productId: string) => boolean
  clearWishlist: () => void
  itemCount: number
}

export const WishlistContext = createContext<WishlistContextType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  toggleItem: () => {},
  isInWishlist: () => false,
  clearWishlist: () => {},
  itemCount: 0,
})

const WISHLIST_KEY = 'zenithics-wishlist'

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<WishlistItem[]>([])
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(WISHLIST_KEY)
      if (stored) setItems(JSON.parse(stored))
    } catch {
      // ignore
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(items))
    } catch {
      // ignore
    }
  }, [items, hydrated])

  const addItem = useCallback((item: Omit<WishlistItem, 'addedAt'>) => {
    setItems((prev) => {
      if (prev.some((i) => i.productId === item.productId)) return prev
      return [...prev, { ...item, addedAt: Date.now() }]
    })
  }, [])

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId))
  }, [])

  const toggleItem = useCallback(
    (item: Omit<WishlistItem, 'addedAt'>) => {
      setItems((prev) => {
        const exists = prev.some((i) => i.productId === item.productId)
        if (exists) return prev.filter((i) => i.productId !== item.productId)
        return [...prev, { ...item, addedAt: Date.now() }]
      })
    },
    [],
  )

  const isInWishlist = useCallback(
    (productId: string) => items.some((i) => i.productId === productId),
    [items],
  )

  const clearWishlist = useCallback(() => setItems([]), [])

  const itemCount = items.length

  const value = useMemo(
    () => ({ items, addItem, removeItem, toggleItem, isInWishlist, clearWishlist, itemCount }),
    [items, addItem, removeItem, toggleItem, isInWishlist, clearWishlist, itemCount],
  )

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}

export const useWishlist = () => useContext(WishlistContext)
