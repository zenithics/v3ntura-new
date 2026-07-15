import type { Block } from 'payload'

export const ProductGrid: Block = {
  slug: 'productGrid',
  interfaceName: 'ProductGridBlock',
  labels: {
    singular: 'Product Grid',
    plural: 'Product Grid Blocks',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Section Heading',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Intro Text',
    },
    {
      name: 'source',
      type: 'select',
      defaultValue: 'all',
      options: [
        { label: 'All Active Products', value: 'all' },
        { label: 'Specific Category', value: 'category' },
        { label: 'Hand-picked Products', value: 'manual' },
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
      name: 'selectedProducts',
      type: 'relationship',
      relationTo: 'products',
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
        { label: '4 Columns', value: '4' },
      ],
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 12,
      min: 1,
      max: 50,
      admin: {
        description: 'Maximum products to show',
        condition: (_, siblingData) => siblingData?.source !== 'manual',
      },
    },
    {
      name: 'showFilters',
      type: 'checkbox',
      defaultValue: false,
      label: 'Show category filter bar',
    },
    {
      name: 'showSorting',
      type: 'checkbox',
      defaultValue: false,
      label: 'Show sort dropdown (price, name, newest)',
    },
  ],
}
