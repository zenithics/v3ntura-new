import type { Block } from 'payload'

export const CartSummary: Block = {
  slug: 'cartSummary',
  interfaceName: 'CartSummaryBlock',
  labels: {
    singular: 'Cart Summary',
    plural: 'Cart Summary Blocks',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Your Cart',
    },
    {
      name: 'emptyCartMessage',
      type: 'text',
      defaultValue: 'Your cart is empty',
    },
    {
      name: 'showContinueShopping',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'continueShoppingLink',
      type: 'text',
      defaultValue: '/shop',
      admin: {
        condition: (_, siblingData) => siblingData?.showContinueShopping,
      },
    },
  ],
}
