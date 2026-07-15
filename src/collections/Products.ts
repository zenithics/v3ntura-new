import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { isAdmin } from '../access/isAdmin'
import { isAdminOrEditor } from '../access/isAdminOrEditor'
import { slugField } from 'payload'
import { checkLowStock } from '../hooks/checkLowStock'
import { logCollectionChange, logCollectionDelete } from '../hooks/logActivity'
import { createIndexingHook } from '../hooks/submitToIndexing'
import { generatePreviewPath } from '../utilities/generatePreviewPath'
import { withAIGenerate } from '../utilities/withAIGenerate'

export const Products: CollectionConfig = {
  slug: 'products',
  access: {
    create: isAdminOrEditor,
    delete: isAdmin,
    read: anyone,
    update: isAdminOrEditor,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'productType', 'price', 'status', 'stock', 'updatedAt'],
    group: 'Shop',
    components: {
      beforeListTable: ['@/components/ProductActions'],
    },
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'products',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'products',
        req,
      }),
  },
  fields: [
    withAIGenerate({
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title',
    }),
    slugField({
      position: undefined,
    }),
    {
      name: 'productType',
      type: 'select',
      required: true,
      defaultValue: 'physical',
      options: [
        { label: 'Physical Product', value: 'physical' },
        { label: 'Digital Product', value: 'digital' },
      ],
      admin: {
        position: 'sidebar',
        description: 'For events/bookings, use the Events collection instead.',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Active', value: 'active' },
        { label: 'Archived', value: 'archived' },
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
        description: 'Show in Featured Products blocks',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Details',
          fields: [
            {
              name: 'description',
              type: 'richText',
              label: 'Product Description',
            },
            withAIGenerate({
              name: 'shortDescription',
              type: 'textarea',
              label: 'Short Description',
              maxLength: 200,
              admin: {
                description: 'Shown on product cards (max 200 chars)',
              },
            }),
          ],
        },
        {
          label: 'Pricing & Stock',
          fields: [
            {
              name: 'price',
              type: 'number',
              required: true,
              min: 0,
              admin: {
                description: 'Price in pence/cents (e.g. 1999 = £19.99)',
                step: 1,
              },
            },
            {
              name: 'compareAtPrice',
              type: 'number',
              min: 0,
              admin: {
                description: 'Original price for showing discounts (in pence/cents). Leave blank if no discount.',
                step: 1,
              },
            },
            {
              name: 'taxClass',
              type: 'select',
              label: 'Tax Class',
              defaultValue: 'standard',
              options: [
                { label: 'Standard Rate (20%)', value: 'standard' },
                { label: 'Reduced Rate (5%)', value: 'reduced' },
                { label: 'Zero Rate (0%)', value: 'zero' },
                { label: 'Tax Exempt', value: 'exempt' },
              ],
              admin: {
                description: "VAT rate applied to this product. Most physical goods are Standard (20%). Children's clothing and some food items may be Zero or Reduced.",
              },
            },
            {
              name: 'stock',
              type: 'number',
              required: true,
              defaultValue: 0,
              min: 0,
              admin: {
                step: 1,
                description: 'Available stock quantity. Set to 0 for out-of-stock.',
                condition: (_, siblingData) => siblingData?.productType === 'physical',
              },
            },
            {
              name: 'trackStock',
              type: 'checkbox',
              defaultValue: true,
              admin: {
                description: 'Uncheck for unlimited stock',
                condition: (_, siblingData) => siblingData?.productType === 'physical',
              },
            },
            {
              name: 'inventoryAlertEnabled',
              type: 'checkbox',
              label: 'Enable Low Stock Alerts',
              defaultValue: false,
              admin: {
                description: 'Send an email alert when stock falls below the threshold.',
                condition: (_, siblingData) => siblingData?.productType === 'physical',
              },
            },
            {
              name: 'lowStockThreshold',
              type: 'number',
              label: 'Low Stock Threshold',
              defaultValue: 5,
              min: 1,
              admin: {
                description: 'Alert fires when stock reaches this level.',
                step: 1,
                condition: (_, siblingData) =>
                  siblingData?.productType === 'physical' && siblingData?.inventoryAlertEnabled,
              },
            },
            {
              name: 'lastAlertSentAt',
              type: 'date',
              label: 'Last Alert Sent',
              admin: {
                readOnly: true,
                description: 'Auto-updated when an inventory alert email is sent.',
                condition: (_, siblingData) => siblingData?.inventoryAlertEnabled,
              },
            },
          ],
        },
        {
          label: 'Shipping',
          fields: [
            {
              name: 'weight',
              type: 'number',
              min: 0,
              admin: {
                description: 'Weight in grams (for shipping calculation)',
                condition: (data) => data?.productType === 'physical',
              },
            },
            {
              name: 'shippingClass',
              type: 'select',
              defaultValue: 'standard',
              options: [
                { label: 'Standard', value: 'standard' },
                { label: 'Heavy/Bulky', value: 'heavy' },
                { label: 'Free Shipping', value: 'free' },
              ],
              admin: {
                condition: (data) => data?.productType === 'physical',
              },
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
          label: 'Nail Details',
          fields: [
            {
              name: 'nailShape',
              type: 'select',
              hasMany: true,
              label: 'Available Nail Shapes',
              options: [
                { label: 'Almond', value: 'almond' },
                { label: 'Square', value: 'square' },
                { label: 'Coffin / Ballerina', value: 'coffin' },
                { label: 'Stiletto', value: 'stiletto' },
                { label: 'Oval', value: 'oval' },
                { label: 'Round', value: 'round' },
                { label: 'Squoval', value: 'squoval' },
              ],
              admin: {
                description: 'Select all shapes this design is available in',
              },
            },
            {
              name: 'finishType',
              type: 'select',
              label: 'Finish',
              options: [
                { label: 'Glossy', value: 'glossy' },
                { label: 'Matte', value: 'matte' },
                { label: 'Both Available', value: 'both' },
              ],
            },
            {
              name: 'isCustomOrder',
              type: 'checkbox',
              defaultValue: false,
              label: 'Custom Order',
              admin: {
                description:
                  'Enable if this is a fully custom / bespoke set. Replaces "Add to Cart" with a "Request Custom Set" CTA.',
              },
            },
            {
              name: 'careInstructions',
              type: 'richText',
              label: 'Care & Application Instructions',
              admin: {
                description: 'Shown on the product page under a collapsible section',
              },
            },
          ],
        },
        {
          label: 'Variants',
          fields: [
            {
              name: 'hasVariants',
              type: 'checkbox',
              defaultValue: false,
              label: 'This product has variants (e.g. size, colour)',
            },
            {
              name: 'variantOptions',
              type: 'array',
              label: 'Option Types',
              maxRows: 3,
              admin: {
                condition: (_, siblingData) => Boolean(siblingData?.hasVariants),
                description: 'Define up to 3 option types (e.g. Colour, Size, Material)',
              },
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                  label: 'Option Name',
                  admin: {
                    description: 'e.g. "Colour", "Size", "Material"',
                  },
                },
                {
                  name: 'displayType',
                  type: 'select',
                  defaultValue: 'buttons',
                  label: 'Display Type',
                  options: [
                    { label: 'Buttons', value: 'buttons' },
                    { label: 'Colour Swatches', value: 'swatches' },
                    { label: 'Dropdown', value: 'dropdown' },
                  ],
                },
                {
                  name: 'values',
                  type: 'array',
                  required: true,
                  minRows: 1,
                  label: 'Values',
                  fields: [
                    {
                      name: 'value',
                      type: 'text',
                      required: true,
                      label: 'Label',
                      admin: {
                        description: 'e.g. "Rose Pink", "Small", "Gel"',
                      },
                    },
                    {
                      name: 'swatchColor',
                      type: 'text',
                      label: 'Swatch Colour (hex)',
                      admin: {
                        description: 'e.g. #E8A0BF — only for colour swatches',
                      },
                    },
                    {
                      name: 'swatchImage',
                      type: 'upload',
                      relationTo: 'media',
                      label: 'Swatch Image',
                      admin: {
                        description: 'Use for patterns/textures instead of a solid colour',
                      },
                    },
                  ],
                },
              ],
            },
            {
              name: 'variants',
              type: 'array',
              label: 'Variant Combinations',
              admin: {
                condition: (_, siblingData) => Boolean(siblingData?.hasVariants),
                description:
                  'Each row is a specific combination (e.g. "Rose Pink / Small"). Add one row per combination you want to sell.',
              },
              fields: [
                {
                  name: 'variantLabel',
                  type: 'text',
                  required: true,
                  label: 'Label',
                  admin: {
                    description:
                      'e.g. "Rose Pink / Small" — combines the selected option values',
                  },
                },
                {
                  name: 'selectedOptions',
                  type: 'array',
                  required: true,
                  label: 'Selected Options',
                  admin: {
                    description:
                      'Which option values this variant represents — must match option names/values exactly',
                  },
                  fields: [
                    {
                      name: 'optionName',
                      type: 'text',
                      required: true,
                      label: 'Option',
                      admin: {
                        description: 'Must match an option name exactly (e.g. "Colour")',
                      },
                    },
                    {
                      name: 'optionValue',
                      type: 'text',
                      required: true,
                      label: 'Value',
                      admin: {
                        description: 'Must match a value label exactly (e.g. "Rose Pink")',
                      },
                    },
                  ],
                },
                {
                  name: 'sku',
                  type: 'text',
                  label: 'SKU',
                },
                {
                  name: 'price',
                  type: 'number',
                  min: 0,
                  label: 'Price Override',
                  admin: {
                    description: 'In pence/cents. Leave blank to use the base product price.',
                    step: 1,
                  },
                },
                {
                  name: 'stock',
                  type: 'number',
                  min: 0,
                  defaultValue: 0,
                  label: 'Stock',
                  admin: {
                    step: 1,
                  },
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Variant Image',
                  admin: {
                    description:
                      'Overrides the main product image when this variant is selected',
                  },
                },
                {
                  name: 'enabled',
                  type: 'checkbox',
                  defaultValue: true,
                  label: 'Available',
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
                withAIGenerate({
                  name: 'title',
                  type: 'text',
                  label: 'Meta Title',
                  admin: {
                    description: 'Defaults to product title if blank',
                  },
                }),
                withAIGenerate({
                  name: 'description',
                  type: 'textarea',
                  label: 'Meta Description',
                  maxLength: 160,
                }),
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'OG Image',
                  admin: {
                    description: 'Defaults to first product image if blank',
                  },
                },
              ],
            },
            {
              name: 'advancedSeo',
              type: 'group',
              label: 'Advanced SEO',
              admin: {},
              fields: [
                {
                  name: 'canonicalUrl',
                  type: 'text',
                  label: 'Canonical URL',
                  admin: { placeholder: 'https://example.com/original-product' },
                },
                {
                  name: 'gtin',
                  type: 'text',
                  label: 'GTIN / Barcode',
                  admin: { description: 'Global Trade Item Number (UPC, EAN, ISBN). Used in Product schema for Google Shopping.' },
                },
                {
                  name: 'mpn',
                  type: 'text',
                  label: 'MPN (Manufacturer Part Number)',
                  admin: { description: 'Used in Product schema. Recommended for Google Shopping if no GTIN.' },
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'noindex', type: 'checkbox', label: 'Noindex', defaultValue: false, admin: { width: '50%' } },
                    { name: 'nofollow', type: 'checkbox', label: 'Nofollow', defaultValue: false, admin: { width: '50%' } },
                  ],
                },
                {
                  name: 'focusKeyword',
                  type: 'text',
                  label: 'Focus Keyword',
                  admin: { placeholder: 'almond press on nails' },
                },
              ],
            },
          ],
        },
        {
          label: 'Related',
          fields: [
            {
              name: 'relatedProducts',
              type: 'relationship',
              relationTo: 'products',
              hasMany: true,
              label: 'Related Products',
              admin: {
                description:
                  'Products shown in the "You may also like" section. If left empty, the frontend will auto-suggest products from the same category.',
              },
              filterOptions: ({ id }) => ({
                id: { not_equals: id },
              }),
            },
            {
              name: 'upsellProducts',
              type: 'relationship',
              relationTo: 'products',
              hasMany: true,
              label: 'Upsell / Cross-sell Products',
              admin: {
                description:
                  'Products shown in the "Complete the look" or "Frequently bought together" section. Typically higher value or complementary items.',
              },
              filterOptions: ({ id }) => ({
                id: { not_equals: id },
              }),
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
    {
      name: 'stripePriceId',
      type: 'text',
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Auto-synced with Stripe',
      },
    },
  ],
  hooks: {
    afterChange: [
      async (args) => {
        if (args.context?.skipLowStockCheck) return args.doc
        return checkLowStock(args)
      },
      logCollectionChange,
      createIndexingHook('products'),
    ],
    afterDelete: [logCollectionDelete],
  },
}
