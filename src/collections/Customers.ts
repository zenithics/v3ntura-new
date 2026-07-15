import type { CollectionConfig } from 'payload'
import { isAdmin } from '../access/isAdmin'

export const Customers: CollectionConfig = {
  slug: 'customers',
  auth: {
    tokenExpiration: 604800, // 7 days
    cookies: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
    },
  },
  access: {
    // Public registration (POST /api/customers handled by auth)
    create: () => true,
    delete: isAdmin,
    read: ({ req: { user } }) => {
      if (!user) return false
      // Customers can only see their own record
      if ((user as any)?.collection === 'customers') {
        return { id: { equals: user.id } }
      }
      return true
    },
    update: ({ req: { user } }) => {
      if (!user) return false
      if ((user as any)?.collection === 'customers') {
        return { id: { equals: user.id } }
      }
      return true
    },
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'name', 'orderCount', 'totalSpent', 'createdAt'],
    group: 'Shop',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'marketingOptIn',
      type: 'checkbox',
      defaultValue: false,
      label: 'Marketing Emails',
      admin: {
        description: 'Customer has consented to receive marketing emails',
      },
    },
    {
      name: 'defaultAddress',
      type: 'group',
      label: 'Default Shipping Address',
      fields: [
        { name: 'line1', type: 'text' },
        { name: 'line2', type: 'text' },
        { name: 'city', type: 'text' },
        { name: 'county', type: 'text', label: 'County / State' },
        { name: 'postcode', type: 'text', label: 'Postcode / ZIP' },
        { name: 'country', type: 'text', defaultValue: 'United Kingdom' },
      ],
    },
    {
      name: 'orderCount',
      type: 'number',
      defaultValue: 0,
      admin: { readOnly: true },
    },
    {
      name: 'totalSpent',
      type: 'number',
      defaultValue: 0,
      admin: {
        readOnly: true,
        description: 'Lifetime spend in pence/cents',
      },
    },
    {
      name: 'stripeCustomerId',
      type: 'text',
      admin: {
        readOnly: true,
        description: 'Auto-synced with Stripe',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: { description: 'Internal notes about this customer' },
    },
  ],
  timestamps: true,
}
