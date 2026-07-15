import type { CollectionConfig } from 'payload'
import { isAdmin } from '../access/isAdmin'
import { isAdminOrEditor } from '../access/isAdminOrEditor'

export const AbandonedCarts: CollectionConfig = {
  slug: 'abandoned-carts',
  labels: { singular: 'Abandoned Cart', plural: 'Abandoned Carts' },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'itemCount', 'cartTotal', 'status', 'emailsSent', 'createdAt'],
    group: 'Shop',
    description:
      'Carts saved at checkout that were not completed. Recovery emails are sent automatically.',
  },
  access: {
    create: () => true,
    read: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      index: true,
    },
    {
      name: 'customerName',
      type: 'text',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'abandoned',
      options: [
        { label: '🛒 Abandoned', value: 'abandoned' },
        { label: '📧 Email Sent', value: 'email-sent' },
        { label: '✅ Recovered', value: 'recovered' },
        { label: '⏭️ Expired', value: 'expired' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'items',
      type: 'json',
      required: true,
      admin: {
        description:
          'Cart items snapshot: [{productId, title, variantName, quantity, unitPrice, image}]',
      },
    },
    {
      name: 'itemCount',
      type: 'number',
      admin: { readOnly: true },
    },
    {
      name: 'cartTotal',
      type: 'number',
      label: 'Cart Total (pence)',
      admin: { readOnly: true },
    },
    {
      name: 'recoveryToken',
      type: 'text',
      unique: true,
      index: true,
      admin: {
        readOnly: true,
        description: 'Unique token for the recovery link.',
      },
    },
    {
      name: 'emailsSent',
      type: 'number',
      defaultValue: 0,
      admin: {
        readOnly: true,
        description: 'Number of recovery emails sent for this cart.',
      },
    },
    {
      name: 'lastEmailSentAt',
      type: 'date',
      admin: { readOnly: true },
    },
    {
      name: 'recoveredAt',
      type: 'date',
      admin: { readOnly: true },
    },
    {
      name: 'discountCode',
      type: 'text',
      admin: {
        description:
          'Discount code included in recovery email (optional, for incentive-based recovery).',
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data?.items) {
          try {
            const items = typeof data.items === 'string' ? JSON.parse(data.items) : data.items
            data.itemCount = items.reduce((sum: number, i: any) => sum + (i.quantity || 1), 0)
            data.cartTotal = items.reduce(
              (sum: number, i: any) => sum + (i.unitPrice || 0) * (i.quantity || 1),
              0,
            )
          } catch {
            // ignore parse errors
          }
        }
        return data
      },
    ],
  },
}
