import type { GlobalConfig } from 'payload'
import { logGlobalChange } from '@/hooks/logActivity'

export const ShopSettings: GlobalConfig = {
  slug: 'shop-settings',
  label: 'Shop Settings',
  admin: {
    group: 'Shop',
    description: 'Manage your store configuration and Stripe payment connection.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General',
          fields: [
            {
              name: 'storeName',
              type: 'text',
              label: 'Store Name',
              defaultValue: 'Your Store',
              admin: { description: 'Displayed in emails and receipts.' },
            },
            {
              name: 'supportEmail',
              type: 'email',
              label: 'Support Email',
            },
            {
              name: 'inventoryAlertEmail',
              type: 'email',
              label: 'Inventory Alert Email',
              admin: {
                description:
                  'Email address for low-stock notifications. Defaults to Support Email if blank.',
              },
            },
            {
              name: 'currency',
              type: 'select',
              label: 'Currency',
              defaultValue: 'gbp',
              options: [
                { label: '£ GBP (British Pound)', value: 'gbp' },
                { label: '$ USD (US Dollar)', value: 'usd' },
                { label: '€ EUR (Euro)', value: 'eur' },
              ],
            },
            {
              name: 'stripe',
              type: 'group',
              label: 'Stripe Configuration',
              fields: [
                {
                  name: 'mode',
                  type: 'select',
                  label: 'Mode',
                  defaultValue: 'test',
                  options: [
                    { label: '🧪 Test Mode', value: 'test' },
                    { label: '🟢 Live Mode', value: 'live' },
                  ],
                  admin: {
                    description: 'Switch to Live when ready to accept real payments.',
                  },
                },
                {
                  name: 'testPublishableKey',
                  type: 'text',
                  label: 'Test Publishable Key',
                  admin: {
                    description: 'Starts with pk_test_...',
                    condition: (_, siblingData) => siblingData?.mode === 'test',
                  },
                },
                {
                  name: 'testSecretKey',
                  type: 'text',
                  label: 'Test Secret Key',
                  admin: {
                    description: 'Starts with sk_test_... — keep this private!',
                    condition: (_, siblingData) => siblingData?.mode === 'test',
                  },
                },
                {
                  name: 'livePublishableKey',
                  type: 'text',
                  label: 'Live Publishable Key',
                  admin: {
                    description: 'Starts with pk_live_...',
                    condition: (_, siblingData) => siblingData?.mode === 'live',
                  },
                },
                {
                  name: 'liveSecretKey',
                  type: 'text',
                  label: 'Live Secret Key',
                  admin: {
                    description: 'Starts with sk_live_... — keep this private!',
                    condition: (_, siblingData) => siblingData?.mode === 'live',
                  },
                },
                {
                  name: 'webhookSecret',
                  type: 'text',
                  label: 'Webhook Secret',
                  admin: {
                    description: 'Starts with whsec_... — used to verify webhook events from Stripe.',
                  },
                },
              ],
            },
            {
              name: 'shippingMethods',
              type: 'array',
              label: 'Shipping Methods',
              admin: {
                description: 'Configure shipping options shown at checkout. At least one method is required for physical products.',
                initCollapsed: true,
              },
              defaultValue: [
                { methodId: 'standard', name: 'Standard Shipping', description: '3-5 business days', price: 399, enabled: true },
                { methodId: 'express', name: 'Express Shipping', description: '1-2 business days', price: 699, enabled: true },
                { methodId: 'free', name: 'Free Shipping', description: '5-7 business days', price: 0, freeShippingThreshold: 5000, enabled: true },
              ],
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'methodId',
                      type: 'text',
                      required: true,
                      label: 'Method ID',
                      admin: { width: '25%', description: 'Unique identifier (e.g. standard, express, free)' },
                    },
                    {
                      name: 'name',
                      type: 'text',
                      required: true,
                      label: 'Display Name',
                      admin: { width: '35%' },
                    },
                    {
                      name: 'price',
                      type: 'number',
                      required: true,
                      label: 'Price (pence)',
                      min: 0,
                      admin: { width: '20%', description: 'e.g. 399 = £3.99. Set to 0 for free.' },
                    },
                    {
                      name: 'enabled',
                      type: 'checkbox',
                      defaultValue: true,
                      label: 'Enabled',
                      admin: { width: '20%' },
                    },
                  ],
                },
                {
                  name: 'description',
                  type: 'text',
                  label: 'Description',
                  admin: { description: 'e.g. "3-5 business days"' },
                },
                {
                  name: 'freeShippingThreshold',
                  type: 'number',
                  label: 'Minimum Order for This Method (pence)',
                  min: 0,
                  admin: {
                    description: 'If set, this shipping option only appears when the cart subtotal meets this amount. e.g. 5000 = £50.00',
                  },
                },
                {
                  name: 'shippingClasses',
                  type: 'select',
                  hasMany: true,
                  label: 'Restrict to Shipping Classes',
                  options: [
                    { label: 'Standard', value: 'standard' },
                    { label: 'Heavy/Bulky', value: 'heavy' },
                    { label: 'Free Shipping', value: 'free' },
                  ],
                  admin: {
                    description: 'If set, this method only applies when ALL cart items match these shipping classes. Leave blank for all products.',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Tax / VAT',
          fields: [
            {
              name: 'taxEnabled',
              type: 'checkbox',
              defaultValue: true,
              label: 'Enable Tax Calculation',
              admin: {
                description: 'When enabled, tax is calculated on orders based on the rates below.',
              },
            },
            {
              name: 'pricesIncludeTax',
              type: 'checkbox',
              defaultValue: true,
              label: 'Product Prices Include Tax',
              admin: {
                description:
                  'UK standard: prices shown to customers already include VAT. If checked, tax is extracted from the price rather than added on top.',
              },
            },
            {
              name: 'taxRegistrationNumber',
              type: 'text',
              label: 'VAT Registration Number',
              admin: { description: 'Displayed on invoices and receipts.' },
            },
            {
              name: 'taxRates',
              type: 'array',
              label: 'Tax Rates',
              admin: {
                description: 'Define tax rates. Products are assigned a tax class which maps to these rates.',
                initCollapsed: true,
              },
              defaultValue: [
                { taxClass: 'standard', label: 'Standard Rate', rate: 20, enabled: true },
                { taxClass: 'reduced', label: 'Reduced Rate', rate: 5, enabled: true },
                { taxClass: 'zero', label: 'Zero Rate', rate: 0, enabled: true },
              ],
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'taxClass',
                      type: 'text',
                      required: true,
                      label: 'Tax Class ID',
                      admin: {
                        width: '25%',
                        description: 'e.g. standard, reduced, zero',
                      },
                    },
                    {
                      name: 'label',
                      type: 'text',
                      required: true,
                      label: 'Display Label',
                      admin: { width: '40%' },
                    },
                    {
                      name: 'rate',
                      type: 'number',
                      required: true,
                      label: 'Rate (%)',
                      min: 0,
                      max: 100,
                      admin: {
                        width: '15%',
                        description: 'e.g. 20 for 20%',
                      },
                    },
                    {
                      name: 'enabled',
                      type: 'checkbox',
                      defaultValue: true,
                      label: 'Active',
                      admin: { width: '20%' },
                    },
                  ],
                },
              ],
            },
            {
              name: 'defaultTaxClass',
              type: 'text',
              defaultValue: 'standard',
              label: 'Default Tax Class',
              admin: {
                description:
                  'Tax class applied to products that don\'t have one explicitly set. Default: "standard" (20% VAT).',
              },
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [logGlobalChange],
  },
}
