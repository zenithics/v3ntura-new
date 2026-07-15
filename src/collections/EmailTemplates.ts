import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { isAdmin } from '../access/isAdmin'
import { isAdminOrEditor } from '../access/isAdminOrEditor'
import { logCollectionChange, logCollectionDelete } from '../hooks/logActivity'

export const EmailTemplates: CollectionConfig = {
  slug: 'email-templates',
  access: {
    create: isAdmin,
    delete: isAdmin,
    read: authenticated,
    update: isAdminOrEditor,
  },
  admin: {
    useAsTitle: 'name',
    group: 'System',
    description: 'Customise the emails sent to customers for orders and bookings.',
  },
  hooks: {
    beforeChange: [
      ({ data, originalDoc, operation }) => {
        // Lock name and trigger after creation — they are the template's identity
        if (operation === 'update' && originalDoc) {
          data.name = originalDoc.name
          data.trigger = originalDoc.trigger
        }
        return data
      },
    ],
    afterChange: [logCollectionChange],
    afterDelete: [logCollectionDelete],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Template identifier — set on creation, cannot be changed afterwards',
      },
    },
    {
      name: 'trigger',
      type: 'select',
      required: true,
      options: [
        { label: 'Order Confirmation', value: 'order-confirmation' },
        { label: 'Payment Received', value: 'payment-received' },
        { label: 'Order Shipped', value: 'order-shipped' },
        { label: 'Order Delivered', value: 'order-delivered' },
        { label: 'Order Cancelled', value: 'order-cancelled' },
        { label: 'Booking Confirmation', value: 'booking-confirmation' },
        { label: 'Refund Notification', value: 'refund-notification' },
        { label: 'Abandoned Cart (1 hour)', value: 'abandoned-cart-1h' },
        { label: 'Abandoned Cart (24 hours)', value: 'abandoned-cart-24h' },
      ],
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'enabled',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'Disable to stop sending this email type',
      },
    },
    {
      name: 'subject',
      type: 'text',
      required: true,
      admin: {
        description:
          'Use {{orderNumber}}, {{customerName}}, {{eventTitle}}, {{eventDate}} as placeholders',
      },
    },
    {
      name: 'preheader',
      type: 'text',
      admin: {
        description: 'Preview text shown in email clients before opening',
      },
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      admin: {
        description: 'Main heading inside the email',
      },
    },
    {
      name: 'bodyText',
      type: 'textarea',
      required: true,
      label: 'Body Copy',
      admin: {
        description:
          'The main email message. Placeholders: {{customerName}}, {{orderNumber}}, {{orderTotal}}, {{trackingUrl}}, {{trackingNumber}}, {{eventTitle}}, {{eventDate}}, {{eventVenue}}, {{ticketType}}, {{refundAmount}}',
        rows: 8,
      },
    },
    {
      name: 'ctaText',
      type: 'text',
      label: 'Button Text',
      admin: {
        description: 'e.g. "View Your Order", "Get Directions", "Download Tickets"',
      },
    },
    {
      name: 'ctaUrl',
      type: 'text',
      label: 'Button URL',
      admin: {
        description:
          'Use {{orderUrl}}, {{eventUrl}}, or {{ticketUrl}} as placeholders, or a fixed URL',
      },
    },
    {
      name: 'footerText',
      type: 'textarea',
      label: 'Footer Copy',
      admin: {
        description: 'Additional text below the main content (e.g. returns policy, contact info)',
        rows: 3,
      },
    },
    {
      name: 'includeOrderItems',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Show the itemised order/ticket summary in the email',
      },
    },
  ],
  timestamps: true,
}
