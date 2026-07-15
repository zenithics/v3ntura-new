# Ecommerce Add-on — Claude Code Instructions

This file supplements the main `CLAUDE.md` with ecommerce-specific conventions.

## Architecture Overview

This project uses the Zenithics ecommerce add-on on top of the standard starter template:

- **Products** — Physical or digital items sold via `/shop`
- **Events** — Bookable events/shows with ticket types, sold via `/events`
- **Orders** — Created automatically after Stripe checkout
- **Customers** — Created/updated on each purchase
- **Email Templates** — Editable transactional emails managed in the CMS

Payment is handled via Stripe Checkout (redirect flow). Webhooks confirm payment and create orders.

## Key Patterns

### Prices are stored in pence/cents
All prices in the database are integers in the smallest currency unit (e.g. 1999 = £19.99).
Use `formatPrice()` from `src/utilities/formatPrice.ts` for display.

### Cart is client-side
Cart state lives in React context (`CartProvider`) and persists to `localStorage`.
The cart is NOT stored in the database — it only becomes an order after Stripe payment.

### Two item types in the cart
```ts
type: 'product'  // Physical/digital product
type: 'ticket'   // Event ticket
```
Both go through the same checkout flow.

### Stripe Checkout flow
1. Client calls `POST /api/checkout` with cart items
2. Server creates a Stripe Checkout Session with line items
3. Client redirects to Stripe's hosted checkout page
4. After payment, Stripe sends a webhook to `/api/webhooks/stripe`
5. Webhook handler creates the Order, updates stock/tickets, sends email

### Email templates
Emails are sent using templates stored in the `email-templates` collection.
Templates use `{{placeholder}}` syntax. Available placeholders:
- `{{orderNumber}}`, `{{customerName}}`, `{{orderTotal}}`
- `{{trackingUrl}}`, `{{trackingNumber}}`
- `{{eventTitle}}`, `{{eventDate}}`, `{{eventVenue}}`
- `{{refundAmount}}`, `{{orderUrl}}`, `{{eventUrl}}`, `{{ticketUrl}}`

## File Structure

```
src/
├── collections/
│   ├── Products.ts           # Physical & digital products
│   ├── ProductCategories.ts  # Shared categories (products + events)
│   ├── Events.ts             # Bookable events with ticket types
│   ├── Orders.ts             # Order records (created by webhook)
│   ├── Customers.ts          # Customer records
│   └── EmailTemplates.ts     # Editable transactional email templates
├── blocks/
│   ├── ProductGrid/          # Filterable product listing block
│   ├── FeaturedProducts/     # Featured products highlight block
│   ├── CartSummary/          # Shopping cart block
│   └── EventGrid/            # Event listing block
├── components/
│   ├── ProductCard/          # Product card component
│   ├── CartProvider/         # React context for cart state
│   └── Cart/CartIcon.tsx     # Header cart icon with badge
├── hooks/
│   └── useCart.ts            # Cart hook
├── stripe/
│   ├── checkout.ts           # Stripe Checkout session creation
│   └── webhooks.ts           # Webhook event handlers
├── utilities/
│   ├── formatPrice.ts        # Price formatting helper
│   └── emails.ts             # Transactional email sender
├── seed/
│   └── emailTemplates.ts     # Default email template data
└── app/(frontend)/
    ├── shop/                 # Product listing & detail pages
    ├── events/               # Event listing & detail pages
    ├── cart/                  # Cart page (optional)
    ├── checkout/success/     # Post-payment confirmation
    └── api/
        ├── checkout/         # Checkout API route
        └── webhooks/stripe/  # Stripe webhook endpoint
```

## When Adding New Features

### Adding a new product field
1. Add the field to `src/collections/Products.ts`
2. Run `pnpm dev` to auto-migrate the database
3. Update `ProductCard` and/or the product detail page if the field is visible

### Adding a new ticket type field
1. Add the field to the `ticketTypes` array in `src/collections/Events.ts`
2. Update the event detail page component if visible

### Adding a new email template
1. Add a new option to the `trigger` select in `EmailTemplates.ts`
2. Add the template data to `seed/emailTemplates.ts`
3. Call `sendOrderEmail('your-trigger', order, payload)` at the appropriate point

### Adding shipping options
Edit `src/stripe/checkout.ts` → `shipping_options` array to add/modify shipping rates.

## Do NOT

- Store cart state in the database (it's client-side by design)
- Call Stripe API from client-side code (always go through the API route)
- Modify order records from the frontend (orders are immutable after creation)
- Hard-code email content (always use the email templates collection)
- Store prices as floats (always use integers in pence/cents)
