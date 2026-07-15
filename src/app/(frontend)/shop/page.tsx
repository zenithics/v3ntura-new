import React from 'react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { ShopClient } from './page.client'

export const metadata: Metadata = {
  title: 'Shop',
  description: 'Browse our full range of press-on nail sets. French tips, glitter, solid colours and custom designer sets.',
}

export const dynamic = 'force-dynamic'

export default async function ShopPage() {
  const payload = await getPayload({ config })

  const [products, categories] = await Promise.all([
    payload.find({
      collection: 'products',
      where: { status: { equals: 'active' } },
      sort: '-createdAt',
      limit: 50,
      depth: 2,
    }),
    payload.find({
      collection: 'product-categories',
      sort: 'title',
      limit: 50,
    }),
  ])

  return <ShopClient products={products.docs} categories={categories.docs} />
}
