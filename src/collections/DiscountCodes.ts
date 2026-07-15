import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { isAdmin } from '../access/isAdmin'
import { isAdminOrEditor } from '../access/isAdminOrEditor'
import { logCollectionChange, logCollectionDelete } from '../hooks/logActivity'

export const DiscountCodes: CollectionConfig = {
  slug: 'discount-codes',
  admin: {
    useAsTitle: 'code',
    defaultColumns: ['code', 'discountType', 'discountValue', 'usedCount', 'active', 'expiresAt'],
    group: 'Shop',
  },
  access: {
    create: isAdminOrEditor,
    read: authenticated,
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data?.code && typeof data.code === 'string') {
          data.code = data.code.toUpperCase().trim()
        }
        return data
      },
    ],
    afterChange: [logCollectionChange],
    afterDelete: [logCollectionDelete],
  },
  fields: [
    {
      name: 'code',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Discount code (auto-uppercased)',
      },
    },
    {
      name: 'description',
      type: 'text',
      label: 'Admin Note',
      admin: {
        description: 'Internal note only — not shown to customers',
      },
    },
    {
      name: 'discountType',
      type: 'select',
      required: true,
      options: [
        { label: 'Percentage off', value: 'percentage' },
        { label: 'Fixed amount off', value: 'fixed_amount' },
        { label: 'Free shipping', value: 'free_shipping' },
      ],
    },
    {
      name: 'discountValue',
      type: 'number',
      min: 0,
      admin: {
        description:
          'For percentage: 1–100 (e.g. 20 = 20% off). For fixed_amount: value in pence (e.g. 500 = £5 off). Not used for free_shipping.',
        condition: (_, siblingData) =>
          siblingData?.discountType === 'percentage' ||
          siblingData?.discountType === 'fixed_amount',
      },
    },
    {
      name: 'minimumOrderValue',
      type: 'number',
      min: 0,
      admin: {
        description: 'Minimum cart total in pence to apply this code. Leave blank for no minimum.',
      },
    },
    {
      name: 'maximumUses',
      type: 'number',
      min: 1,
      admin: {
        description: 'Total times this code can be used. Leave blank for unlimited.',
      },
    },
    {
      name: 'usedCount',
      type: 'number',
      defaultValue: 0,
      admin: {
        readOnly: true,
        description: 'Automatically incremented on successful orders',
      },
    },
    {
      name: 'perCustomerLimit',
      type: 'number',
      min: 1,
      admin: {
        description: 'Max times a single customer (by email) can use this code. Leave blank for unlimited.',
      },
    },
    {
      name: 'applicableProducts',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
      admin: {
        description: 'Leave blank to apply to all products',
      },
    },
    {
      name: 'applicableCategories',
      type: 'relationship',
      relationTo: 'product-categories',
      hasMany: true,
      admin: {
        description: 'Leave blank to apply to all categories',
      },
    },
    {
      name: 'startsAt',
      type: 'date',
      admin: {
        description: 'Code is not valid before this date. Leave blank for immediate.',
        date: { pickerAppearance: 'dayOnly', displayFormat: 'dd/MM/yyyy' },
      },
    },
    {
      name: 'expiresAt',
      type: 'date',
      admin: {
        description: 'Code expires at end of this date. Leave blank to never expire.',
        date: { pickerAppearance: 'dayOnly', displayFormat: 'dd/MM/yyyy' },
      },
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'Uncheck to disable this code without deleting it',
      },
    },
  ],
}
