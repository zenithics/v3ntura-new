import type { Block } from 'payload'

export const EventGrid: Block = {
  slug: 'eventGrid',
  interfaceName: 'EventGridBlock',
  labels: {
    singular: 'Events Grid',
    plural: 'Event Grid Blocks',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Section Heading',
      defaultValue: 'Upcoming Events',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Intro Text',
    },
    {
      name: 'source',
      type: 'select',
      defaultValue: 'upcoming',
      options: [
        { label: 'All Upcoming Events', value: 'upcoming' },
        { label: 'Specific Category', value: 'category' },
        { label: 'Featured Only', value: 'featured' },
        { label: 'Hand-picked Events', value: 'manual' },
      ],
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'product-categories',
      admin: {
        condition: (_, siblingData) => siblingData?.source === 'category',
      },
    },
    {
      name: 'selectedEvents',
      type: 'relationship',
      relationTo: 'events',
      hasMany: true,
      admin: {
        condition: (_, siblingData) => siblingData?.source === 'manual',
      },
    },
    {
      name: 'columns',
      type: 'select',
      defaultValue: '3',
      options: [
        { label: '2 Columns', value: '2' },
        { label: '3 Columns', value: '3' },
      ],
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 6,
      min: 1,
      max: 20,
      admin: {
        description: 'Maximum events to show',
        condition: (_, siblingData) => siblingData?.source !== 'manual',
      },
    },
    {
      name: 'showPriceFrom',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show "From £X" pricing',
    },
  ],
}
