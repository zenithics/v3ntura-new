import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_product_grid_source" AS ENUM('all', 'category', 'manual');
  CREATE TYPE "public"."enum_pages_blocks_product_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_featured_products_display_type" AS ENUM('grid', 'carousel');
  CREATE TYPE "public"."enum_pages_blocks_event_grid_source" AS ENUM('upcoming', 'category', 'featured', 'manual');
  CREATE TYPE "public"."enum_pages_blocks_event_grid_columns" AS ENUM('2', '3');
  CREATE TYPE "public"."enum__pages_v_blocks_product_grid_source" AS ENUM('all', 'category', 'manual');
  CREATE TYPE "public"."enum__pages_v_blocks_product_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__pages_v_blocks_featured_products_display_type" AS ENUM('grid', 'carousel');
  CREATE TYPE "public"."enum__pages_v_blocks_event_grid_source" AS ENUM('upcoming', 'category', 'featured', 'manual');
  CREATE TYPE "public"."enum__pages_v_blocks_event_grid_columns" AS ENUM('2', '3');
  CREATE TYPE "public"."enum_page_templates_blocks_product_grid_source" AS ENUM('all', 'category', 'manual');
  CREATE TYPE "public"."enum_page_templates_blocks_product_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_page_templates_blocks_featured_products_display_type" AS ENUM('grid', 'carousel');
  CREATE TYPE "public"."enum_page_templates_blocks_event_grid_source" AS ENUM('upcoming', 'category', 'featured', 'manual');
  CREATE TYPE "public"."enum_page_templates_blocks_event_grid_columns" AS ENUM('2', '3');
  CREATE TYPE "public"."enum_products_nail_shape" AS ENUM('almond', 'square', 'coffin', 'stiletto', 'oval', 'round', 'squoval');
  CREATE TYPE "public"."enum_products_variant_options_display_type" AS ENUM('buttons', 'swatches', 'dropdown');
  CREATE TYPE "public"."enum_products_product_type" AS ENUM('physical', 'digital');
  CREATE TYPE "public"."enum_products_status" AS ENUM('draft', 'active', 'archived');
  CREATE TYPE "public"."enum_products_tax_class" AS ENUM('standard', 'reduced', 'zero', 'exempt');
  CREATE TYPE "public"."enum_products_shipping_class" AS ENUM('standard', 'heavy', 'free');
  CREATE TYPE "public"."enum_products_finish_type" AS ENUM('glossy', 'matte', 'both');
  CREATE TYPE "public"."enum_events_status" AS ENUM('draft', 'on-sale', 'sold-out', 'cancelled', 'past');
  CREATE TYPE "public"."enum_orders_refunds_reason" AS ENUM('duplicate', 'fraudulent', 'requested_by_customer');
  CREATE TYPE "public"."enum_orders_status" AS ENUM('pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded');
  CREATE TYPE "public"."enum_orders_carrier" AS ENUM('royal_mail', 'dpd_uk', 'evri', 'dhl_uk', 'parcelforce', 'yodel', 'amazon_uk', 'usps', 'ups', 'fedex', 'dhl_us', 'dhl_intl');
  CREATE TYPE "public"."enum_reviews_status" AS ENUM('pending', 'approved', 'rejected');
  CREATE TYPE "public"."enum_discount_codes_discount_type" AS ENUM('percentage', 'fixed_amount', 'free_shipping');
  CREATE TYPE "public"."enum_email_templates_trigger" AS ENUM('order-confirmation', 'payment-received', 'order-shipped', 'order-delivered', 'order-cancelled', 'booking-confirmation', 'refund-notification', 'abandoned-cart-1h', 'abandoned-cart-24h');
  CREATE TYPE "public"."enum_abandoned_carts_status" AS ENUM('abandoned', 'email-sent', 'recovered', 'expired');
  CREATE TYPE "public"."enum_data_requests_request_type" AS ENUM('export', 'erasure', 'rectification');
  CREATE TYPE "public"."enum_data_requests_status" AS ENUM('pending', 'in_progress', 'fulfilled', 'rejected');
  CREATE TYPE "public"."enum_shop_settings_shipping_methods_shipping_classes" AS ENUM('standard', 'heavy', 'free');
  CREATE TYPE "public"."enum_shop_settings_currency" AS ENUM('gbp', 'usd', 'eur');
  CREATE TYPE "public"."enum_shop_settings_stripe_mode" AS ENUM('test', 'live');
  CREATE TYPE "public"."enum_ai_settings_model" AS ENUM('claude-sonnet-4-20250514', 'claude-opus-4-20250514', 'claude-3-5-haiku-20241022');
  CREATE TYPE "public"."enum_ai_settings_writing_tone" AS ENUM('professional', 'casual', 'playful', 'luxury', 'bold', 'empathetic', 'technical');
  CREATE TABLE "pages_blocks_product_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"source" "enum_pages_blocks_product_grid_source" DEFAULT 'all',
  	"category_id" integer,
  	"columns" "enum_pages_blocks_product_grid_columns" DEFAULT '3',
  	"limit" numeric DEFAULT 12,
  	"show_filters" boolean DEFAULT false,
  	"show_sorting" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_featured_products" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Featured Products',
  	"description" varchar,
  	"display_type" "enum_pages_blocks_featured_products_display_type" DEFAULT 'grid',
  	"limit" numeric DEFAULT 4,
  	"show_prices" boolean DEFAULT true,
  	"cta_text" varchar DEFAULT 'View All Products',
  	"cta_link" varchar DEFAULT '/shop',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cart_summary" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Your Cart',
  	"empty_cart_message" varchar DEFAULT 'Your cart is empty',
  	"show_continue_shopping" boolean DEFAULT true,
  	"continue_shopping_link" varchar DEFAULT '/shop',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_event_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Upcoming Events',
  	"description" varchar,
  	"source" "enum_pages_blocks_event_grid_source" DEFAULT 'upcoming',
  	"category_id" integer,
  	"columns" "enum_pages_blocks_event_grid_columns" DEFAULT '3',
  	"limit" numeric DEFAULT 6,
  	"show_price_from" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_product_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"source" "enum__pages_v_blocks_product_grid_source" DEFAULT 'all',
  	"category_id" integer,
  	"columns" "enum__pages_v_blocks_product_grid_columns" DEFAULT '3',
  	"limit" numeric DEFAULT 12,
  	"show_filters" boolean DEFAULT false,
  	"show_sorting" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_featured_products" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Featured Products',
  	"description" varchar,
  	"display_type" "enum__pages_v_blocks_featured_products_display_type" DEFAULT 'grid',
  	"limit" numeric DEFAULT 4,
  	"show_prices" boolean DEFAULT true,
  	"cta_text" varchar DEFAULT 'View All Products',
  	"cta_link" varchar DEFAULT '/shop',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cart_summary" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Your Cart',
  	"empty_cart_message" varchar DEFAULT 'Your cart is empty',
  	"show_continue_shopping" boolean DEFAULT true,
  	"continue_shopping_link" varchar DEFAULT '/shop',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_event_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Upcoming Events',
  	"description" varchar,
  	"source" "enum__pages_v_blocks_event_grid_source" DEFAULT 'upcoming',
  	"category_id" integer,
  	"columns" "enum__pages_v_blocks_event_grid_columns" DEFAULT '3',
  	"limit" numeric DEFAULT 6,
  	"show_price_from" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "page_templates_blocks_product_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"source" "enum_page_templates_blocks_product_grid_source" DEFAULT 'all',
  	"category_id" integer,
  	"columns" "enum_page_templates_blocks_product_grid_columns" DEFAULT '3',
  	"limit" numeric DEFAULT 12,
  	"show_filters" boolean DEFAULT false,
  	"show_sorting" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "page_templates_blocks_featured_products" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Featured Products',
  	"description" varchar,
  	"display_type" "enum_page_templates_blocks_featured_products_display_type" DEFAULT 'grid',
  	"limit" numeric DEFAULT 4,
  	"show_prices" boolean DEFAULT true,
  	"cta_text" varchar DEFAULT 'View All Products',
  	"cta_link" varchar DEFAULT '/shop',
  	"block_name" varchar
  );
  
  CREATE TABLE "page_templates_blocks_cart_summary" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Your Cart',
  	"empty_cart_message" varchar DEFAULT 'Your cart is empty',
  	"show_continue_shopping" boolean DEFAULT true,
  	"continue_shopping_link" varchar DEFAULT '/shop',
  	"block_name" varchar
  );
  
  CREATE TABLE "page_templates_blocks_event_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Upcoming Events',
  	"description" varchar,
  	"source" "enum_page_templates_blocks_event_grid_source" DEFAULT 'upcoming',
  	"category_id" integer,
  	"columns" "enum_page_templates_blocks_event_grid_columns" DEFAULT '3',
  	"limit" numeric DEFAULT 6,
  	"show_price_from" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "products_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"alt" varchar
  );
  
  CREATE TABLE "products_nail_shape" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_products_nail_shape",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "products_variant_options_values" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"swatch_color" varchar,
  	"swatch_image_id" integer
  );
  
  CREATE TABLE "products_variant_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"display_type" "enum_products_variant_options_display_type" DEFAULT 'buttons'
  );
  
  CREATE TABLE "products_variants_selected_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"option_name" varchar,
  	"option_value" varchar
  );
  
  CREATE TABLE "products_variants" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant_label" varchar,
  	"sku" varchar,
  	"price" numeric,
  	"stock" numeric DEFAULT 0,
  	"image_id" integer,
  	"enabled" boolean DEFAULT true
  );
  
  CREATE TABLE "products" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar NOT NULL,
  	"product_type" "enum_products_product_type" DEFAULT 'physical' NOT NULL,
  	"status" "enum_products_status" DEFAULT 'draft' NOT NULL,
  	"featured" boolean DEFAULT false,
  	"description" jsonb,
  	"short_description" varchar,
  	"price" numeric NOT NULL,
  	"compare_at_price" numeric,
  	"tax_class" "enum_products_tax_class" DEFAULT 'standard',
  	"stock" numeric DEFAULT 0,
  	"track_stock" boolean DEFAULT true,
  	"inventory_alert_enabled" boolean DEFAULT false,
  	"low_stock_threshold" numeric DEFAULT 5,
  	"last_alert_sent_at" timestamp(3) with time zone,
  	"weight" numeric,
  	"shipping_class" "enum_products_shipping_class" DEFAULT 'standard',
  	"finish_type" "enum_products_finish_type",
  	"is_custom_order" boolean DEFAULT false,
  	"care_instructions" jsonb,
  	"has_variants" boolean DEFAULT false,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"advanced_seo_canonical_url" varchar,
  	"advanced_seo_gtin" varchar,
  	"advanced_seo_mpn" varchar,
  	"advanced_seo_noindex" boolean DEFAULT false,
  	"advanced_seo_nofollow" boolean DEFAULT false,
  	"advanced_seo_focus_keyword" varchar,
  	"stripe_product_id" varchar,
  	"stripe_price_id" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "products_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"products_id" integer,
  	"product_categories_id" integer
  );
  
  CREATE TABLE "product_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar NOT NULL,
  	"description" varchar,
  	"image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "events_ticket_types" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"price" numeric NOT NULL,
  	"capacity" numeric NOT NULL,
  	"sold" numeric DEFAULT 0,
  	"max_per_order" numeric DEFAULT 10,
  	"sale_start" timestamp(3) with time zone,
  	"sale_end" timestamp(3) with time zone,
  	"description" varchar,
  	"stripe_price_id" varchar
  );
  
  CREATE TABLE "events_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"alt" varchar
  );
  
  CREATE TABLE "events" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar NOT NULL,
  	"status" "enum_events_status" DEFAULT 'draft' NOT NULL,
  	"featured" boolean DEFAULT false,
  	"description" jsonb,
  	"short_description" varchar,
  	"event_date" timestamp(3) with time zone NOT NULL,
  	"event_end_date" timestamp(3) with time zone,
  	"doors_open" timestamp(3) with time zone,
  	"venue_name" varchar NOT NULL,
  	"venue_address" varchar,
  	"venue_city" varchar,
  	"venue_postcode" varchar,
  	"venue_map_url" varchar,
  	"is_online" boolean DEFAULT false,
  	"online_url" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"advanced_seo_canonical_url" varchar,
  	"advanced_seo_noindex" boolean DEFAULT false,
  	"advanced_seo_nofollow" boolean DEFAULT false,
  	"advanced_seo_focus_keyword" varchar,
  	"stripe_product_id" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "events_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"product_categories_id" integer
  );
  
  CREATE TABLE "orders_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"product_id" integer,
  	"product_title" varchar NOT NULL,
  	"variant_name" varchar,
  	"quantity" numeric DEFAULT 1 NOT NULL,
  	"unit_price" numeric NOT NULL,
  	"line_total" numeric NOT NULL
  );
  
  CREATE TABLE "orders_refunds" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"stripe_refund_id" varchar,
  	"amount" numeric,
  	"reason" "enum_orders_refunds_reason",
  	"note" varchar,
  	"refunded_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "orders" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order_number" varchar NOT NULL,
  	"status" "enum_orders_status" DEFAULT 'pending' NOT NULL,
  	"subtotal" numeric,
  	"shipping_cost" numeric DEFAULT 0,
  	"tax_amount" numeric DEFAULT 0,
  	"tax_rate" numeric,
  	"tax_breakdown" jsonb,
  	"customer_email" varchar NOT NULL,
  	"customer_name" varchar,
  	"customer_id" integer,
  	"shipping_address_line1" varchar,
  	"shipping_address_line2" varchar,
  	"shipping_address_city" varchar,
  	"shipping_address_county" varchar,
  	"shipping_address_postcode" varchar,
  	"shipping_address_country" varchar,
  	"total" numeric NOT NULL,
  	"discount_code" varchar,
  	"discount_amount" numeric,
  	"stripe_session_id" varchar,
  	"stripe_payment_intent_id" varchar,
  	"carrier" "enum_orders_carrier",
  	"tracking_number" varchar,
  	"tracking_url" varchar,
  	"shipped_at" timestamp(3) with time zone,
  	"delivered_at" timestamp(3) with time zone,
  	"shipping_notes" varchar,
  	"notes" varchar,
  	"total_refunded" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "customers_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "customers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"phone" varchar,
  	"marketing_opt_in" boolean DEFAULT false,
  	"default_address_line1" varchar,
  	"default_address_line2" varchar,
  	"default_address_city" varchar,
  	"default_address_county" varchar,
  	"default_address_postcode" varchar,
  	"default_address_country" varchar DEFAULT 'United Kingdom',
  	"order_count" numeric DEFAULT 0,
  	"total_spent" numeric DEFAULT 0,
  	"stripe_customer_id" varchar,
  	"notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "reviews" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"product_id" integer NOT NULL,
  	"customer_id" integer,
  	"customer_name" varchar NOT NULL,
  	"customer_email" varchar NOT NULL,
  	"rating" numeric NOT NULL,
  	"title" varchar,
  	"body" varchar NOT NULL,
  	"verified_purchase" boolean DEFAULT false,
  	"status" "enum_reviews_status" DEFAULT 'pending' NOT NULL,
  	"admin_reply" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "discount_codes" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"code" varchar NOT NULL,
  	"description" varchar,
  	"discount_type" "enum_discount_codes_discount_type" NOT NULL,
  	"discount_value" numeric,
  	"minimum_order_value" numeric,
  	"maximum_uses" numeric,
  	"used_count" numeric DEFAULT 0,
  	"per_customer_limit" numeric,
  	"starts_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone,
  	"active" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "discount_codes_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"products_id" integer,
  	"product_categories_id" integer
  );
  
  CREATE TABLE "email_templates" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"trigger" "enum_email_templates_trigger" NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"subject" varchar NOT NULL,
  	"preheader" varchar,
  	"heading" varchar NOT NULL,
  	"body_text" varchar NOT NULL,
  	"cta_text" varchar,
  	"cta_url" varchar,
  	"footer_text" varchar,
  	"include_order_items" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "abandoned_carts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL,
  	"customer_name" varchar,
  	"status" "enum_abandoned_carts_status" DEFAULT 'abandoned',
  	"items" jsonb NOT NULL,
  	"item_count" numeric,
  	"cart_total" numeric,
  	"recovery_token" varchar,
  	"emails_sent" numeric DEFAULT 0,
  	"last_email_sent_at" timestamp(3) with time zone,
  	"recovered_at" timestamp(3) with time zone,
  	"discount_code" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "data_requests" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"request_type" "enum_data_requests_request_type" NOT NULL,
  	"email" varchar NOT NULL,
  	"subject_name" varchar,
  	"status" "enum_data_requests_status" DEFAULT 'pending' NOT NULL,
  	"notes" varchar,
  	"rejection_reason" varchar,
  	"fulfilled_at" timestamp(3) with time zone,
  	"export_data" jsonb,
  	"erasure_log" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "shop_settings_shipping_methods_shipping_classes" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_shop_settings_shipping_methods_shipping_classes",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "shop_settings_shipping_methods" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"method_id" varchar NOT NULL,
  	"name" varchar NOT NULL,
  	"price" numeric NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"description" varchar,
  	"free_shipping_threshold" numeric
  );
  
  CREATE TABLE "shop_settings_tax_rates" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tax_class" varchar NOT NULL,
  	"label" varchar NOT NULL,
  	"rate" numeric NOT NULL,
  	"enabled" boolean DEFAULT true
  );
  
  CREATE TABLE "shop_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"store_name" varchar DEFAULT 'Your Store',
  	"support_email" varchar,
  	"inventory_alert_email" varchar,
  	"currency" "enum_shop_settings_currency" DEFAULT 'gbp',
  	"stripe_mode" "enum_shop_settings_stripe_mode" DEFAULT 'test',
  	"stripe_test_publishable_key" varchar,
  	"stripe_test_secret_key" varchar,
  	"stripe_live_publishable_key" varchar,
  	"stripe_live_secret_key" varchar,
  	"stripe_webhook_secret" varchar,
  	"tax_enabled" boolean DEFAULT true,
  	"prices_include_tax" boolean DEFAULT true,
  	"tax_registration_number" varchar,
  	"default_tax_class" varchar DEFAULT 'standard',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "ai_settings_example_phrases" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"phrase" varchar NOT NULL
  );
  
  CREATE TABLE "ai_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT false,
  	"api_key" varchar,
  	"model" "enum_ai_settings_model" DEFAULT 'claude-sonnet-4-20250514',
  	"business_context" varchar,
  	"writing_tone" "enum_ai_settings_writing_tone" DEFAULT 'professional',
  	"writing_guidelines" varchar,
  	"target_audience" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "pages_rels" ADD COLUMN "products_id" integer;
  ALTER TABLE "pages_rels" ADD COLUMN "events_id" integer;
  ALTER TABLE "_pages_v_rels" ADD COLUMN "products_id" integer;
  ALTER TABLE "_pages_v_rels" ADD COLUMN "events_id" integer;
  ALTER TABLE "page_templates_rels" ADD COLUMN "products_id" integer;
  ALTER TABLE "page_templates_rels" ADD COLUMN "events_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "products_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "product_categories_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "events_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "orders_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "customers_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "reviews_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "discount_codes_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "email_templates_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "abandoned_carts_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "data_requests_id" integer;
  ALTER TABLE "payload_preferences_rels" ADD COLUMN "customers_id" integer;
  ALTER TABLE "pages_blocks_product_grid" ADD CONSTRAINT "pages_blocks_product_grid_category_id_product_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."product_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_product_grid" ADD CONSTRAINT "pages_blocks_product_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_featured_products" ADD CONSTRAINT "pages_blocks_featured_products_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cart_summary" ADD CONSTRAINT "pages_blocks_cart_summary_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_event_grid" ADD CONSTRAINT "pages_blocks_event_grid_category_id_product_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."product_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_event_grid" ADD CONSTRAINT "pages_blocks_event_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_product_grid" ADD CONSTRAINT "_pages_v_blocks_product_grid_category_id_product_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."product_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_product_grid" ADD CONSTRAINT "_pages_v_blocks_product_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_featured_products" ADD CONSTRAINT "_pages_v_blocks_featured_products_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cart_summary" ADD CONSTRAINT "_pages_v_blocks_cart_summary_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_event_grid" ADD CONSTRAINT "_pages_v_blocks_event_grid_category_id_product_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."product_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_event_grid" ADD CONSTRAINT "_pages_v_blocks_event_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_templates_blocks_product_grid" ADD CONSTRAINT "page_templates_blocks_product_grid_category_id_product_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."product_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_templates_blocks_product_grid" ADD CONSTRAINT "page_templates_blocks_product_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_templates_blocks_featured_products" ADD CONSTRAINT "page_templates_blocks_featured_products_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_templates_blocks_cart_summary" ADD CONSTRAINT "page_templates_blocks_cart_summary_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_templates_blocks_event_grid" ADD CONSTRAINT "page_templates_blocks_event_grid_category_id_product_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."product_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_templates_blocks_event_grid" ADD CONSTRAINT "page_templates_blocks_event_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_images" ADD CONSTRAINT "products_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_images" ADD CONSTRAINT "products_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_nail_shape" ADD CONSTRAINT "products_nail_shape_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_variant_options_values" ADD CONSTRAINT "products_variant_options_values_swatch_image_id_media_id_fk" FOREIGN KEY ("swatch_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_variant_options_values" ADD CONSTRAINT "products_variant_options_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_variant_options"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_variant_options" ADD CONSTRAINT "products_variant_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_variants_selected_options" ADD CONSTRAINT "products_variants_selected_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_variants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_variants" ADD CONSTRAINT "products_variants_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_variants" ADD CONSTRAINT "products_variants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products" ADD CONSTRAINT "products_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_product_categories_fk" FOREIGN KEY ("product_categories_id") REFERENCES "public"."product_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "product_categories" ADD CONSTRAINT "product_categories_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events_ticket_types" ADD CONSTRAINT "events_ticket_types_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_images" ADD CONSTRAINT "events_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events_images" ADD CONSTRAINT "events_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events_rels" ADD CONSTRAINT "events_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_rels" ADD CONSTRAINT "events_rels_product_categories_fk" FOREIGN KEY ("product_categories_id") REFERENCES "public"."product_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "orders_items" ADD CONSTRAINT "orders_items_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "orders_items" ADD CONSTRAINT "orders_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "orders_refunds" ADD CONSTRAINT "orders_refunds_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "orders" ADD CONSTRAINT "orders_customer_id_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "customers_sessions" ADD CONSTRAINT "customers_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."customers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reviews" ADD CONSTRAINT "reviews_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "reviews" ADD CONSTRAINT "reviews_customer_id_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "discount_codes_rels" ADD CONSTRAINT "discount_codes_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."discount_codes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "discount_codes_rels" ADD CONSTRAINT "discount_codes_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "discount_codes_rels" ADD CONSTRAINT "discount_codes_rels_product_categories_fk" FOREIGN KEY ("product_categories_id") REFERENCES "public"."product_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "shop_settings_shipping_methods_shipping_classes" ADD CONSTRAINT "shop_settings_shipping_methods_shipping_classes_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."shop_settings_shipping_methods"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "shop_settings_shipping_methods" ADD CONSTRAINT "shop_settings_shipping_methods_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."shop_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "shop_settings_tax_rates" ADD CONSTRAINT "shop_settings_tax_rates_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."shop_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ai_settings_example_phrases" ADD CONSTRAINT "ai_settings_example_phrases_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ai_settings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_product_grid_order_idx" ON "pages_blocks_product_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_product_grid_parent_id_idx" ON "pages_blocks_product_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_product_grid_path_idx" ON "pages_blocks_product_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_product_grid_category_idx" ON "pages_blocks_product_grid" USING btree ("category_id");
  CREATE INDEX "pages_blocks_featured_products_order_idx" ON "pages_blocks_featured_products" USING btree ("_order");
  CREATE INDEX "pages_blocks_featured_products_parent_id_idx" ON "pages_blocks_featured_products" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_featured_products_path_idx" ON "pages_blocks_featured_products" USING btree ("_path");
  CREATE INDEX "pages_blocks_cart_summary_order_idx" ON "pages_blocks_cart_summary" USING btree ("_order");
  CREATE INDEX "pages_blocks_cart_summary_parent_id_idx" ON "pages_blocks_cart_summary" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cart_summary_path_idx" ON "pages_blocks_cart_summary" USING btree ("_path");
  CREATE INDEX "pages_blocks_event_grid_order_idx" ON "pages_blocks_event_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_event_grid_parent_id_idx" ON "pages_blocks_event_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_event_grid_path_idx" ON "pages_blocks_event_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_event_grid_category_idx" ON "pages_blocks_event_grid" USING btree ("category_id");
  CREATE INDEX "_pages_v_blocks_product_grid_order_idx" ON "_pages_v_blocks_product_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_product_grid_parent_id_idx" ON "_pages_v_blocks_product_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_product_grid_path_idx" ON "_pages_v_blocks_product_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_product_grid_category_idx" ON "_pages_v_blocks_product_grid" USING btree ("category_id");
  CREATE INDEX "_pages_v_blocks_featured_products_order_idx" ON "_pages_v_blocks_featured_products" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_featured_products_parent_id_idx" ON "_pages_v_blocks_featured_products" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_featured_products_path_idx" ON "_pages_v_blocks_featured_products" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cart_summary_order_idx" ON "_pages_v_blocks_cart_summary" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cart_summary_parent_id_idx" ON "_pages_v_blocks_cart_summary" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cart_summary_path_idx" ON "_pages_v_blocks_cart_summary" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_event_grid_order_idx" ON "_pages_v_blocks_event_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_event_grid_parent_id_idx" ON "_pages_v_blocks_event_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_event_grid_path_idx" ON "_pages_v_blocks_event_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_event_grid_category_idx" ON "_pages_v_blocks_event_grid" USING btree ("category_id");
  CREATE INDEX "page_templates_blocks_product_grid_order_idx" ON "page_templates_blocks_product_grid" USING btree ("_order");
  CREATE INDEX "page_templates_blocks_product_grid_parent_id_idx" ON "page_templates_blocks_product_grid" USING btree ("_parent_id");
  CREATE INDEX "page_templates_blocks_product_grid_path_idx" ON "page_templates_blocks_product_grid" USING btree ("_path");
  CREATE INDEX "page_templates_blocks_product_grid_category_idx" ON "page_templates_blocks_product_grid" USING btree ("category_id");
  CREATE INDEX "page_templates_blocks_featured_products_order_idx" ON "page_templates_blocks_featured_products" USING btree ("_order");
  CREATE INDEX "page_templates_blocks_featured_products_parent_id_idx" ON "page_templates_blocks_featured_products" USING btree ("_parent_id");
  CREATE INDEX "page_templates_blocks_featured_products_path_idx" ON "page_templates_blocks_featured_products" USING btree ("_path");
  CREATE INDEX "page_templates_blocks_cart_summary_order_idx" ON "page_templates_blocks_cart_summary" USING btree ("_order");
  CREATE INDEX "page_templates_blocks_cart_summary_parent_id_idx" ON "page_templates_blocks_cart_summary" USING btree ("_parent_id");
  CREATE INDEX "page_templates_blocks_cart_summary_path_idx" ON "page_templates_blocks_cart_summary" USING btree ("_path");
  CREATE INDEX "page_templates_blocks_event_grid_order_idx" ON "page_templates_blocks_event_grid" USING btree ("_order");
  CREATE INDEX "page_templates_blocks_event_grid_parent_id_idx" ON "page_templates_blocks_event_grid" USING btree ("_parent_id");
  CREATE INDEX "page_templates_blocks_event_grid_path_idx" ON "page_templates_blocks_event_grid" USING btree ("_path");
  CREATE INDEX "page_templates_blocks_event_grid_category_idx" ON "page_templates_blocks_event_grid" USING btree ("category_id");
  CREATE INDEX "products_images_order_idx" ON "products_images" USING btree ("_order");
  CREATE INDEX "products_images_parent_id_idx" ON "products_images" USING btree ("_parent_id");
  CREATE INDEX "products_images_image_idx" ON "products_images" USING btree ("image_id");
  CREATE INDEX "products_nail_shape_order_idx" ON "products_nail_shape" USING btree ("order");
  CREATE INDEX "products_nail_shape_parent_idx" ON "products_nail_shape" USING btree ("parent_id");
  CREATE INDEX "products_variant_options_values_order_idx" ON "products_variant_options_values" USING btree ("_order");
  CREATE INDEX "products_variant_options_values_parent_id_idx" ON "products_variant_options_values" USING btree ("_parent_id");
  CREATE INDEX "products_variant_options_values_swatch_image_idx" ON "products_variant_options_values" USING btree ("swatch_image_id");
  CREATE INDEX "products_variant_options_order_idx" ON "products_variant_options" USING btree ("_order");
  CREATE INDEX "products_variant_options_parent_id_idx" ON "products_variant_options" USING btree ("_parent_id");
  CREATE INDEX "products_variants_selected_options_order_idx" ON "products_variants_selected_options" USING btree ("_order");
  CREATE INDEX "products_variants_selected_options_parent_id_idx" ON "products_variants_selected_options" USING btree ("_parent_id");
  CREATE INDEX "products_variants_order_idx" ON "products_variants" USING btree ("_order");
  CREATE INDEX "products_variants_parent_id_idx" ON "products_variants" USING btree ("_parent_id");
  CREATE INDEX "products_variants_image_idx" ON "products_variants" USING btree ("image_id");
  CREATE UNIQUE INDEX "products_slug_idx" ON "products" USING btree ("slug");
  CREATE INDEX "products_meta_meta_image_idx" ON "products" USING btree ("meta_image_id");
  CREATE INDEX "products_updated_at_idx" ON "products" USING btree ("updated_at");
  CREATE INDEX "products_created_at_idx" ON "products" USING btree ("created_at");
  CREATE INDEX "products_rels_order_idx" ON "products_rels" USING btree ("order");
  CREATE INDEX "products_rels_parent_idx" ON "products_rels" USING btree ("parent_id");
  CREATE INDEX "products_rels_path_idx" ON "products_rels" USING btree ("path");
  CREATE INDEX "products_rels_products_id_idx" ON "products_rels" USING btree ("products_id");
  CREATE INDEX "products_rels_product_categories_id_idx" ON "products_rels" USING btree ("product_categories_id");
  CREATE UNIQUE INDEX "product_categories_slug_idx" ON "product_categories" USING btree ("slug");
  CREATE INDEX "product_categories_image_idx" ON "product_categories" USING btree ("image_id");
  CREATE INDEX "product_categories_updated_at_idx" ON "product_categories" USING btree ("updated_at");
  CREATE INDEX "product_categories_created_at_idx" ON "product_categories" USING btree ("created_at");
  CREATE INDEX "events_ticket_types_order_idx" ON "events_ticket_types" USING btree ("_order");
  CREATE INDEX "events_ticket_types_parent_id_idx" ON "events_ticket_types" USING btree ("_parent_id");
  CREATE INDEX "events_images_order_idx" ON "events_images" USING btree ("_order");
  CREATE INDEX "events_images_parent_id_idx" ON "events_images" USING btree ("_parent_id");
  CREATE INDEX "events_images_image_idx" ON "events_images" USING btree ("image_id");
  CREATE UNIQUE INDEX "events_slug_idx" ON "events" USING btree ("slug");
  CREATE INDEX "events_meta_meta_image_idx" ON "events" USING btree ("meta_image_id");
  CREATE INDEX "events_updated_at_idx" ON "events" USING btree ("updated_at");
  CREATE INDEX "events_created_at_idx" ON "events" USING btree ("created_at");
  CREATE INDEX "events_rels_order_idx" ON "events_rels" USING btree ("order");
  CREATE INDEX "events_rels_parent_idx" ON "events_rels" USING btree ("parent_id");
  CREATE INDEX "events_rels_path_idx" ON "events_rels" USING btree ("path");
  CREATE INDEX "events_rels_product_categories_id_idx" ON "events_rels" USING btree ("product_categories_id");
  CREATE INDEX "orders_items_order_idx" ON "orders_items" USING btree ("_order");
  CREATE INDEX "orders_items_parent_id_idx" ON "orders_items" USING btree ("_parent_id");
  CREATE INDEX "orders_items_product_idx" ON "orders_items" USING btree ("product_id");
  CREATE INDEX "orders_refunds_order_idx" ON "orders_refunds" USING btree ("_order");
  CREATE INDEX "orders_refunds_parent_id_idx" ON "orders_refunds" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "orders_order_number_idx" ON "orders" USING btree ("order_number");
  CREATE INDEX "orders_customer_idx" ON "orders" USING btree ("customer_id");
  CREATE INDEX "orders_updated_at_idx" ON "orders" USING btree ("updated_at");
  CREATE INDEX "orders_created_at_idx" ON "orders" USING btree ("created_at");
  CREATE INDEX "customers_sessions_order_idx" ON "customers_sessions" USING btree ("_order");
  CREATE INDEX "customers_sessions_parent_id_idx" ON "customers_sessions" USING btree ("_parent_id");
  CREATE INDEX "customers_updated_at_idx" ON "customers" USING btree ("updated_at");
  CREATE INDEX "customers_created_at_idx" ON "customers" USING btree ("created_at");
  CREATE UNIQUE INDEX "customers_email_idx" ON "customers" USING btree ("email");
  CREATE INDEX "reviews_product_idx" ON "reviews" USING btree ("product_id");
  CREATE INDEX "reviews_customer_idx" ON "reviews" USING btree ("customer_id");
  CREATE INDEX "reviews_updated_at_idx" ON "reviews" USING btree ("updated_at");
  CREATE INDEX "reviews_created_at_idx" ON "reviews" USING btree ("created_at");
  CREATE UNIQUE INDEX "discount_codes_code_idx" ON "discount_codes" USING btree ("code");
  CREATE INDEX "discount_codes_updated_at_idx" ON "discount_codes" USING btree ("updated_at");
  CREATE INDEX "discount_codes_created_at_idx" ON "discount_codes" USING btree ("created_at");
  CREATE INDEX "discount_codes_rels_order_idx" ON "discount_codes_rels" USING btree ("order");
  CREATE INDEX "discount_codes_rels_parent_idx" ON "discount_codes_rels" USING btree ("parent_id");
  CREATE INDEX "discount_codes_rels_path_idx" ON "discount_codes_rels" USING btree ("path");
  CREATE INDEX "discount_codes_rels_products_id_idx" ON "discount_codes_rels" USING btree ("products_id");
  CREATE INDEX "discount_codes_rels_product_categories_id_idx" ON "discount_codes_rels" USING btree ("product_categories_id");
  CREATE UNIQUE INDEX "email_templates_trigger_idx" ON "email_templates" USING btree ("trigger");
  CREATE INDEX "email_templates_updated_at_idx" ON "email_templates" USING btree ("updated_at");
  CREATE INDEX "email_templates_created_at_idx" ON "email_templates" USING btree ("created_at");
  CREATE INDEX "abandoned_carts_email_idx" ON "abandoned_carts" USING btree ("email");
  CREATE UNIQUE INDEX "abandoned_carts_recovery_token_idx" ON "abandoned_carts" USING btree ("recovery_token");
  CREATE INDEX "abandoned_carts_updated_at_idx" ON "abandoned_carts" USING btree ("updated_at");
  CREATE INDEX "abandoned_carts_created_at_idx" ON "abandoned_carts" USING btree ("created_at");
  CREATE INDEX "data_requests_updated_at_idx" ON "data_requests" USING btree ("updated_at");
  CREATE INDEX "data_requests_created_at_idx" ON "data_requests" USING btree ("created_at");
  CREATE INDEX "shop_settings_shipping_methods_shipping_classes_order_idx" ON "shop_settings_shipping_methods_shipping_classes" USING btree ("order");
  CREATE INDEX "shop_settings_shipping_methods_shipping_classes_parent_idx" ON "shop_settings_shipping_methods_shipping_classes" USING btree ("parent_id");
  CREATE INDEX "shop_settings_shipping_methods_order_idx" ON "shop_settings_shipping_methods" USING btree ("_order");
  CREATE INDEX "shop_settings_shipping_methods_parent_id_idx" ON "shop_settings_shipping_methods" USING btree ("_parent_id");
  CREATE INDEX "shop_settings_tax_rates_order_idx" ON "shop_settings_tax_rates" USING btree ("_order");
  CREATE INDEX "shop_settings_tax_rates_parent_id_idx" ON "shop_settings_tax_rates" USING btree ("_parent_id");
  CREATE INDEX "ai_settings_example_phrases_order_idx" ON "ai_settings_example_phrases" USING btree ("_order");
  CREATE INDEX "ai_settings_example_phrases_parent_id_idx" ON "ai_settings_example_phrases" USING btree ("_parent_id");
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_templates_rels" ADD CONSTRAINT "page_templates_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_templates_rels" ADD CONSTRAINT "page_templates_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_product_categories_fk" FOREIGN KEY ("product_categories_id") REFERENCES "public"."product_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_orders_fk" FOREIGN KEY ("orders_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_customers_fk" FOREIGN KEY ("customers_id") REFERENCES "public"."customers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_reviews_fk" FOREIGN KEY ("reviews_id") REFERENCES "public"."reviews"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_discount_codes_fk" FOREIGN KEY ("discount_codes_id") REFERENCES "public"."discount_codes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_email_templates_fk" FOREIGN KEY ("email_templates_id") REFERENCES "public"."email_templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_abandoned_carts_fk" FOREIGN KEY ("abandoned_carts_id") REFERENCES "public"."abandoned_carts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_data_requests_fk" FOREIGN KEY ("data_requests_id") REFERENCES "public"."data_requests"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_customers_fk" FOREIGN KEY ("customers_id") REFERENCES "public"."customers"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_rels_products_id_idx" ON "pages_rels" USING btree ("products_id");
  CREATE INDEX "pages_rels_events_id_idx" ON "pages_rels" USING btree ("events_id");
  CREATE INDEX "_pages_v_rels_products_id_idx" ON "_pages_v_rels" USING btree ("products_id");
  CREATE INDEX "_pages_v_rels_events_id_idx" ON "_pages_v_rels" USING btree ("events_id");
  CREATE INDEX "page_templates_rels_products_id_idx" ON "page_templates_rels" USING btree ("products_id");
  CREATE INDEX "page_templates_rels_events_id_idx" ON "page_templates_rels" USING btree ("events_id");
  CREATE INDEX "payload_locked_documents_rels_products_id_idx" ON "payload_locked_documents_rels" USING btree ("products_id");
  CREATE INDEX "payload_locked_documents_rels_product_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("product_categories_id");
  CREATE INDEX "payload_locked_documents_rels_events_id_idx" ON "payload_locked_documents_rels" USING btree ("events_id");
  CREATE INDEX "payload_locked_documents_rels_orders_id_idx" ON "payload_locked_documents_rels" USING btree ("orders_id");
  CREATE INDEX "payload_locked_documents_rels_customers_id_idx" ON "payload_locked_documents_rels" USING btree ("customers_id");
  CREATE INDEX "payload_locked_documents_rels_reviews_id_idx" ON "payload_locked_documents_rels" USING btree ("reviews_id");
  CREATE INDEX "payload_locked_documents_rels_discount_codes_id_idx" ON "payload_locked_documents_rels" USING btree ("discount_codes_id");
  CREATE INDEX "payload_locked_documents_rels_email_templates_id_idx" ON "payload_locked_documents_rels" USING btree ("email_templates_id");
  CREATE INDEX "payload_locked_documents_rels_abandoned_carts_id_idx" ON "payload_locked_documents_rels" USING btree ("abandoned_carts_id");
  CREATE INDEX "payload_locked_documents_rels_data_requests_id_idx" ON "payload_locked_documents_rels" USING btree ("data_requests_id");
  CREATE INDEX "payload_preferences_rels_customers_id_idx" ON "payload_preferences_rels" USING btree ("customers_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_product_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_featured_products" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_cart_summary" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_event_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_product_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_featured_products" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_cart_summary" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_event_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_templates_blocks_product_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_templates_blocks_featured_products" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_templates_blocks_cart_summary" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_templates_blocks_event_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_nail_shape" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_variant_options_values" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_variant_options" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_variants_selected_options" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_variants" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "product_categories" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "events_ticket_types" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "events_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "events" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "events_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "orders_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "orders_refunds" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "orders" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "customers_sessions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "customers" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "reviews" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "discount_codes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "discount_codes_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "email_templates" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "abandoned_carts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "data_requests" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "shop_settings_shipping_methods_shipping_classes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "shop_settings_shipping_methods" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "shop_settings_tax_rates" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "shop_settings" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "ai_settings_example_phrases" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "ai_settings" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_product_grid" CASCADE;
  DROP TABLE "pages_blocks_featured_products" CASCADE;
  DROP TABLE "pages_blocks_cart_summary" CASCADE;
  DROP TABLE "pages_blocks_event_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_product_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_featured_products" CASCADE;
  DROP TABLE "_pages_v_blocks_cart_summary" CASCADE;
  DROP TABLE "_pages_v_blocks_event_grid" CASCADE;
  DROP TABLE "page_templates_blocks_product_grid" CASCADE;
  DROP TABLE "page_templates_blocks_featured_products" CASCADE;
  DROP TABLE "page_templates_blocks_cart_summary" CASCADE;
  DROP TABLE "page_templates_blocks_event_grid" CASCADE;
  DROP TABLE "products_images" CASCADE;
  DROP TABLE "products_nail_shape" CASCADE;
  DROP TABLE "products_variant_options_values" CASCADE;
  DROP TABLE "products_variant_options" CASCADE;
  DROP TABLE "products_variants_selected_options" CASCADE;
  DROP TABLE "products_variants" CASCADE;
  DROP TABLE "products" CASCADE;
  DROP TABLE "products_rels" CASCADE;
  DROP TABLE "product_categories" CASCADE;
  DROP TABLE "events_ticket_types" CASCADE;
  DROP TABLE "events_images" CASCADE;
  DROP TABLE "events" CASCADE;
  DROP TABLE "events_rels" CASCADE;
  DROP TABLE "orders_items" CASCADE;
  DROP TABLE "orders_refunds" CASCADE;
  DROP TABLE "orders" CASCADE;
  DROP TABLE "customers_sessions" CASCADE;
  DROP TABLE "customers" CASCADE;
  DROP TABLE "reviews" CASCADE;
  DROP TABLE "discount_codes" CASCADE;
  DROP TABLE "discount_codes_rels" CASCADE;
  DROP TABLE "email_templates" CASCADE;
  DROP TABLE "abandoned_carts" CASCADE;
  DROP TABLE "data_requests" CASCADE;
  DROP TABLE "shop_settings_shipping_methods_shipping_classes" CASCADE;
  DROP TABLE "shop_settings_shipping_methods" CASCADE;
  DROP TABLE "shop_settings_tax_rates" CASCADE;
  DROP TABLE "shop_settings" CASCADE;
  DROP TABLE "ai_settings_example_phrases" CASCADE;
  DROP TABLE "ai_settings" CASCADE;
  ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_products_fk";
  
  ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_events_fk";
  
  ALTER TABLE "_pages_v_rels" DROP CONSTRAINT "_pages_v_rels_products_fk";
  
  ALTER TABLE "_pages_v_rels" DROP CONSTRAINT "_pages_v_rels_events_fk";
  
  ALTER TABLE "page_templates_rels" DROP CONSTRAINT "page_templates_rels_products_fk";
  
  ALTER TABLE "page_templates_rels" DROP CONSTRAINT "page_templates_rels_events_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_products_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_product_categories_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_events_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_orders_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_customers_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_reviews_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_discount_codes_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_email_templates_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_abandoned_carts_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_data_requests_fk";
  
  ALTER TABLE "payload_preferences_rels" DROP CONSTRAINT "payload_preferences_rels_customers_fk";
  
  DROP INDEX "pages_rels_products_id_idx";
  DROP INDEX "pages_rels_events_id_idx";
  DROP INDEX "_pages_v_rels_products_id_idx";
  DROP INDEX "_pages_v_rels_events_id_idx";
  DROP INDEX "page_templates_rels_products_id_idx";
  DROP INDEX "page_templates_rels_events_id_idx";
  DROP INDEX "payload_locked_documents_rels_products_id_idx";
  DROP INDEX "payload_locked_documents_rels_product_categories_id_idx";
  DROP INDEX "payload_locked_documents_rels_events_id_idx";
  DROP INDEX "payload_locked_documents_rels_orders_id_idx";
  DROP INDEX "payload_locked_documents_rels_customers_id_idx";
  DROP INDEX "payload_locked_documents_rels_reviews_id_idx";
  DROP INDEX "payload_locked_documents_rels_discount_codes_id_idx";
  DROP INDEX "payload_locked_documents_rels_email_templates_id_idx";
  DROP INDEX "payload_locked_documents_rels_abandoned_carts_id_idx";
  DROP INDEX "payload_locked_documents_rels_data_requests_id_idx";
  DROP INDEX "payload_preferences_rels_customers_id_idx";
  ALTER TABLE "pages_rels" DROP COLUMN "products_id";
  ALTER TABLE "pages_rels" DROP COLUMN "events_id";
  ALTER TABLE "_pages_v_rels" DROP COLUMN "products_id";
  ALTER TABLE "_pages_v_rels" DROP COLUMN "events_id";
  ALTER TABLE "page_templates_rels" DROP COLUMN "products_id";
  ALTER TABLE "page_templates_rels" DROP COLUMN "events_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "products_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "product_categories_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "events_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "orders_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "customers_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "reviews_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "discount_codes_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "email_templates_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "abandoned_carts_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "data_requests_id";
  ALTER TABLE "payload_preferences_rels" DROP COLUMN "customers_id";
  DROP TYPE "public"."enum_pages_blocks_product_grid_source";
  DROP TYPE "public"."enum_pages_blocks_product_grid_columns";
  DROP TYPE "public"."enum_pages_blocks_featured_products_display_type";
  DROP TYPE "public"."enum_pages_blocks_event_grid_source";
  DROP TYPE "public"."enum_pages_blocks_event_grid_columns";
  DROP TYPE "public"."enum__pages_v_blocks_product_grid_source";
  DROP TYPE "public"."enum__pages_v_blocks_product_grid_columns";
  DROP TYPE "public"."enum__pages_v_blocks_featured_products_display_type";
  DROP TYPE "public"."enum__pages_v_blocks_event_grid_source";
  DROP TYPE "public"."enum__pages_v_blocks_event_grid_columns";
  DROP TYPE "public"."enum_page_templates_blocks_product_grid_source";
  DROP TYPE "public"."enum_page_templates_blocks_product_grid_columns";
  DROP TYPE "public"."enum_page_templates_blocks_featured_products_display_type";
  DROP TYPE "public"."enum_page_templates_blocks_event_grid_source";
  DROP TYPE "public"."enum_page_templates_blocks_event_grid_columns";
  DROP TYPE "public"."enum_products_nail_shape";
  DROP TYPE "public"."enum_products_variant_options_display_type";
  DROP TYPE "public"."enum_products_product_type";
  DROP TYPE "public"."enum_products_status";
  DROP TYPE "public"."enum_products_tax_class";
  DROP TYPE "public"."enum_products_shipping_class";
  DROP TYPE "public"."enum_products_finish_type";
  DROP TYPE "public"."enum_events_status";
  DROP TYPE "public"."enum_orders_refunds_reason";
  DROP TYPE "public"."enum_orders_status";
  DROP TYPE "public"."enum_orders_carrier";
  DROP TYPE "public"."enum_reviews_status";
  DROP TYPE "public"."enum_discount_codes_discount_type";
  DROP TYPE "public"."enum_email_templates_trigger";
  DROP TYPE "public"."enum_abandoned_carts_status";
  DROP TYPE "public"."enum_data_requests_request_type";
  DROP TYPE "public"."enum_data_requests_status";
  DROP TYPE "public"."enum_shop_settings_shipping_methods_shipping_classes";
  DROP TYPE "public"."enum_shop_settings_currency";
  DROP TYPE "public"."enum_shop_settings_stripe_mode";
  DROP TYPE "public"."enum_ai_settings_model";
  DROP TYPE "public"."enum_ai_settings_writing_tone";`)
}
