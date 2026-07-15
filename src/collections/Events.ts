import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { isAdmin } from '../access/isAdmin'
import { isAdminOrEditor } from '../access/isAdminOrEditor'
import { slugField } from 'payload'
import { logCollectionChange, logCollectionDelete } from '../hooks/logActivity'
import { createIndexingHook } from '../hooks/submitToIndexing'
import { generatePreviewPath } from '../utilities/generatePreviewPath'

export const Events: CollectionConfig = {
  slug: 'events',
  access: {
    create: isAdminOrEditor,
    delete: isAdmin,
    read: anyone,
    update: isAdminOrEditor,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'eventDate', 'venue', 'status', 'updatedAt'],
    group: 'Content',
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'events',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'events',
        req,
      }),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    slugField({
      position: undefined,
    }),
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'On Sale', value: 'on-sale' },
        { label: 'Sold Out', value: 'sold-out' },
        { label: 'Cancelled', value: 'cancelled' },
        { label: 'Past', value: 'past' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Show in featured events sections',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Event Details',
          fields: [
            {
              name: 'description',
              type: 'richText',
              label: 'Event Description',
            },
            {
              name: 'shortDescription',
              type: 'textarea',
              label: 'Short Description',
              maxLength: 200,
              admin: {
                description: 'Shown on event cards (max 200 chars)',
              },
            },
            {
              name: 'eventDate',
              type: 'date',
              required: true,
              admin: {
                date: {
                  pickerAppearance: 'dayAndTime',
                  displayFormat: 'dd/MM/yyyy HH:mm',
                },
                description: 'When the event starts',
              },
            },
            {
              name: 'eventEndDate',
              type: 'date',
              admin: {
                date: {
                  pickerAppearance: 'dayAndTime',
                  displayFormat: 'dd/MM/yyyy HH:mm',
                },
                description: 'When the event ends (optional)',
              },
            },
            {
              name: 'doorsOpen',
              type: 'date',
              admin: {
                date: {
                  pickerAppearance: 'timeOnly',
                  displayFormat: 'HH:mm',
                },
                description: 'Doors open time (optional)',
              },
            },
          ],
        },
        {
          label: 'Venue',
          fields: [
            {
              name: 'venue',
              type: 'group',
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                  label: 'Venue Name',
                },
                {
                  name: 'address',
                  type: 'textarea',
                  label: 'Full Address',
                },
                {
                  name: 'city',
                  type: 'text',
                },
                {
                  name: 'postcode',
                  type: 'text',
                },
                {
                  name: 'mapUrl',
                  type: 'text',
                  label: 'Google Maps Link',
                  admin: {
                    description: 'Link to the venue on Google Maps',
                  },
                },
              ],
            },
            {
              name: 'isOnline',
              type: 'checkbox',
              defaultValue: false,
              label: 'This is an online event',
            },
            {
              name: 'onlineUrl',
              type: 'text',
              label: 'Online Event URL',
              admin: {
                condition: (_, siblingData) => siblingData?.isOnline,
                description: 'Zoom/Teams/YouTube link (sent to ticket holders after purchase)',
              },
            },
          ],
        },
        {
          label: 'Tickets',
          fields: [
            {
              name: 'ticketTypes',
              type: 'array',
              required: true,
              minRows: 1,
              maxRows: 10,
              labels: {
                singular: 'Ticket Type',
                plural: 'Ticket Types',
              },
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                  label: 'Ticket Name',
                  admin: {
                    description: 'e.g. "General Admission", "VIP", "Early Bird"',
                  },
                },
                {
                  name: 'price',
                  type: 'number',
                  required: true,
                  min: 0,
                  admin: {
                    description: 'Price in pence/cents (e.g. 1500 = £15.00). Set to 0 for free tickets.',
                    step: 1,
                  },
                },
                {
                  name: 'capacity',
                  type: 'number',
                  required: true,
                  min: 1,
                  admin: {
                    description: 'Maximum tickets available for this type',
                    step: 1,
                  },
                },
                {
                  name: 'sold',
                  type: 'number',
                  defaultValue: 0,
                  min: 0,
                  admin: {
                    readOnly: true,
                    description: 'Tickets sold (auto-updated)',
                    step: 1,
                  },
                },
                {
                  name: 'maxPerOrder',
                  type: 'number',
                  defaultValue: 10,
                  min: 1,
                  admin: {
                    description: 'Maximum tickets a single customer can buy',
                    step: 1,
                  },
                },
                {
                  name: 'saleStart',
                  type: 'date',
                  admin: {
                    date: {
                      pickerAppearance: 'dayAndTime',
                      displayFormat: 'dd/MM/yyyy HH:mm',
                    },
                    description: 'When this ticket goes on sale (optional — immediate if blank)',
                  },
                },
                {
                  name: 'saleEnd',
                  type: 'date',
                  admin: {
                    date: {
                      pickerAppearance: 'dayAndTime',
                      displayFormat: 'dd/MM/yyyy HH:mm',
                    },
                    description: 'When sales close (optional — event date if blank)',
                  },
                },
                {
                  name: 'description',
                  type: 'textarea',
                  admin: {
                    description: 'What\'s included with this ticket type',
                  },
                },
                {
                  name: 'stripePriceId',
                  type: 'text',
                  admin: {
                    readOnly: true,
                    description: 'Auto-synced with Stripe',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Images',
          fields: [
            {
              name: 'images',
              type: 'array',
              minRows: 1,
              maxRows: 10,
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
                {
                  name: 'alt',
                  type: 'text',
                  label: 'Alt Text',
                },
              ],
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'meta',
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: 'Meta Title',
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: 'Meta Description',
                  maxLength: 160,
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'OG Image',
                },
              ],
            },
            {
              name: 'advancedSeo',
              type: 'group',
              label: 'Advanced SEO',
              admin: {},
              fields: [
                { name: 'canonicalUrl', type: 'text', label: 'Canonical URL' },
                {
                  type: 'row',
                  fields: [
                    { name: 'noindex', type: 'checkbox', label: 'Noindex', defaultValue: false, admin: { width: '50%' } },
                    { name: 'nofollow', type: 'checkbox', label: 'Nofollow', defaultValue: false, admin: { width: '50%' } },
                  ],
                },
                { name: 'focusKeyword', type: 'text', label: 'Focus Keyword' },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'product-categories',
      hasMany: true,
      admin: {
        position: 'sidebar',
        description: 'Use shared categories (e.g. "Comedy", "Music", "Workshop")',
      },
    },
    {
      name: 'stripeProductId',
      type: 'text',
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Auto-synced with Stripe',
      },
    },
  ],
  hooks: {
    afterChange: [logCollectionChange, createIndexingHook('events')],
    afterDelete: [logCollectionDelete],
  },
}
