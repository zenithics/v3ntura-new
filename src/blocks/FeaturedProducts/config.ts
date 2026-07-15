import type { Block } from 'payload'

export const FeaturedProducts: Block = {
  slug: 'featuredProducts',
  interfaceName: 'FeaturedProductsBlock',
  labels: {
    singular: 'Featured Products',
    plural: 'Featured Products Blocks',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Featured Products',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'displayType',
      type: 'select',
      defaultValue: 'grid',
      options: [
        { label: 'Grid', value: 'grid' },
        { label: 'Carousel', value: 'carousel' },
      ],
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 4,
      min: 1,
      max: 12,
      admin: {
        description: 'Number of featured products to show',
      },
    },
    {
      name: 'showPrices',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'ctaText',
      type: 'text',
      defaultValue: 'View All Products',
      label: 'CTA Button Text',
    },
    {
      name: 'ctaLink',
      type: 'text',
      defaultValue: '/shop',
      label: 'CTA Button Link',
    },
  ],
}
