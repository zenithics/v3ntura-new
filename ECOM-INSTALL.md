# Ecommerce Add-on Installation Guide

This add-on layers ecommerce functionality onto the Zenithics CMS Template (zenithics-starter).

## Prerequisites
- A working zenithics-starter project
- Stripe account (test mode is fine to start)
- Resend API key (for transactional emails)

## Step 1: Install Dependencies

```bash
pnpm add stripe
```

## Step 2: Copy Files

Copy all directories from this repo into your `src/` directory:

```bash
# Clone the ecom add-on
git clone https://github.com/zenithics/zenithics-ecom-addon.git ../ecom-addon-temp

# Copy everything into your project's src/
cp -r ../ecom-addon-temp/collections/* src/collections/
cp -r ../ecom-addon-temp/globals/* src/globals/
cp -r ../ecom-addon-temp/blocks/* src/blocks/
cp -r ../ecom-addon-temp/components/* src/components/
cp -r ../ecom-addon-temp/stripe src/
cp -r ../ecom-addon-temp/seed src/
cp -r ../ecom-addon-temp/hooks/* src/hooks/
cp -r ../ecom-addon-temp/utilities/* src/utilities/

# Copy routes
cp -r "../ecom-addon-temp/app/(frontend)/shop" "src/app/(frontend)/"
cp -r "../ecom-addon-temp/app/(frontend)/events" "src/app/(frontend)/"
cp -r "../ecom-addon-temp/app/(frontend)/checkout" "src/app/(frontend)/"
cp -r "../ecom-addon-temp/app/(frontend)/cart" "src/app/(frontend)/"
cp -r "../ecom-addon-temp/app/(frontend)/account" "src/app/(frontend)/"
mkdir -p "src/app/(frontend)/api"
cp -r "../ecom-addon-temp/app/(frontend)/api/"* "src/app/(frontend)/api/"

# Copy app-level routes (sitemaps, product feed)
cp -r ../ecom-addon-temp/app/products-sitemap.xml src/app/ 2>/dev/null
cp -r ../ecom-addon-temp/app/events-sitemap.xml src/app/ 2>/dev/null
cp -r ../ecom-addon-temp/app/products.xml src/app/ 2>/dev/null

# Copy docs
cp ../ecom-addon-temp/CLAUDE-ECOMMERCE.md .

# Clean up
rm -rf ../ecom-addon-temp
```

## Step 3: Register Collections in payload.config.ts

Add imports and register in the `collections` array:

```ts
import { Products } from './collections/Products'
import { ProductCategories } from './collections/ProductCategories'
import { Events } from './collections/Events'
import { Orders } from './collections/Orders'
import { Customers } from './collections/Customers'
import { Reviews } from './collections/Reviews'
import { DiscountCodes } from './collections/DiscountCodes'
import { EmailTemplates } from './collections/EmailTemplates'
import { AbandonedCarts } from './collections/AbandonedCarts'
import { DataRequests } from './collections/DataRequests'
import { seedEmailTemplates } from './seed/emailTemplates'
```

Add `onInit` handler:
```ts
onInit: async (payload) => {
  await seedEmailTemplates(payload)
},
```

## Step 4: Register Global

```ts
import { ShopSettings } from './globals/ShopSettings'
```

Add to the `globals` array.

## Step 5: Register Blocks

### In RenderBlocks.tsx:
```ts
import { ProductGridBlock } from '@/blocks/ProductGrid/Component'
import { FeaturedProductsBlock } from '@/blocks/FeaturedProducts/Component'
import { CartSummaryBlock } from '@/blocks/CartSummary/Component'
import { EventGridBlock } from '@/blocks/EventGrid/Component'

// Add to blockComponents:
productGrid: ProductGridBlock,
featuredProducts: FeaturedProductsBlock,
cartSummary: CartSummaryBlock,
eventGrid: EventGridBlock,
```

### In Pages/index.ts and PageTemplates.ts:
Import the block configs and add to the `blocks` array.

## Step 6: Add Cart + Auth Providers

In `src/providers/index.tsx`, wrap children:
```tsx
import { CartProvider } from '@/components/CartProvider'
import { AuthProvider } from '@/providers/Auth'
import { WishlistProvider } from '@/components/WishlistProvider'

// Wrap: <AuthProvider><CartProvider><WishlistProvider>{children}</WishlistProvider></CartProvider></AuthProvider>
```

## Step 7: Add Cart Icon to Header

In your Header client component:
```tsx
import { CartIcon } from '@/components/Cart/CartIcon'

// Add next to navigation: <CartIcon />
```

## Step 8: Add StripeModeBar to Layout

In `src/app/(frontend)/layout.tsx`:
```tsx
import { StripeModeBar } from '@/components/StripeModeBar'

// Add before Header: <StripeModeBar />
```

## Step 9: Environment Variables

Add to `.env`:
```
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
RESEND_API_KEY=re_...
```

## Step 10: Generate Types & Migrate

```bash
npx payload generate:types
npx payload migrate:create
npx payload migrate
```

## Step 11: Configure Shop Settings

1. Go to `/admin`
2. Navigate to Settings → Shop Settings
3. Add your Stripe keys (test mode first)
4. Set currency, store name, support email
5. Toggle to Live when ready to accept real payments

## Step 12: Set Up Stripe Webhook

1. Go to Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://your-domain.com/api/webhooks/stripe`
3. Select events: `checkout.session.completed`, `payment_intent.succeeded`
4. Copy the webhook signing secret to `.env` or Shop Settings
