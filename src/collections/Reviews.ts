import type { CollectionConfig } from 'payload'
import { anyone } from '../access/anyone'
import { isAdmin } from '../access/isAdmin'
import { isAdminOrEditor } from '../access/isAdminOrEditor'
import { logCollectionChange, logCollectionDelete } from '../hooks/logActivity'

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['product', 'customerName', 'rating', 'status', 'createdAt'],
    group: 'Shop',
  },
  access: {
    create: anyone,
    read: ({ req }) => {
      // Public: only approved reviews; admins/editors see all
      if (req.user) return true
      return { status: { equals: 'approved' } }
    },
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'product',
      type: 'relationship',
      relationTo: 'products',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'customer',
      type: 'relationship',
      relationTo: 'customers',
      admin: {
        position: 'sidebar',
        description: 'Linked customer account if logged in',
      },
    },
    {
      name: 'customerName',
      type: 'text',
      required: true,
      label: 'Reviewer Name',
    },
    {
      name: 'customerEmail',
      type: 'email',
      required: true,
      admin: {
        description: 'Not shown publicly',
      },
    },
    {
      name: 'rating',
      type: 'number',
      required: true,
      min: 1,
      max: 5,
      admin: {
        description: '1–5 stars',
      },
    },
    {
      name: 'title',
      type: 'text',
      label: 'Review Title',
      admin: {
        placeholder: 'e.g. Love these nails!',
      },
    },
    {
      name: 'body',
      type: 'textarea',
      required: true,
      label: 'Review Body',
    },
    {
      name: 'verifiedPurchase',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Auto-set by system. Do not edit manually.',
        readOnly: true,
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'pending',
      required: true,
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Approved', value: 'approved' },
        { label: 'Rejected', value: 'rejected' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'adminReply',
      type: 'textarea',
      label: 'Admin Reply',
      admin: {
        description: 'Optional reply from the shop owner, shown publicly below the review',
      },
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        if (operation !== 'create') return doc

        try {
          const productId =
            typeof doc.product === 'object' ? doc.product.id : doc.product

          const orders = await req.payload.find({
            collection: 'orders',
            where: {
              and: [
                { customerEmail: { equals: doc.customerEmail } },
                { 'items.product': { equals: productId } },
              ],
            },
            limit: 1,
            depth: 0,
            req,
          })

          if (orders.totalDocs > 0) {
            await req.payload.update({
              collection: 'reviews',
              id: doc.id,
              data: { verifiedPurchase: true },
              req,
            })
          }
        } catch (err) {
          // Non-fatal — proceed without verified badge
          console.error('verifiedPurchase check failed:', err)
        }

        return doc
      },
      logCollectionChange,
    ],
    afterDelete: [logCollectionDelete],
  },
}
