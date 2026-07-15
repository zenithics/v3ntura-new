import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_hero_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_cta_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_cta_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum_pages_blocks_content_columns_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_content_columns_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_archive_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum_pages_blocks_archive_relation_to" AS ENUM('posts');
  CREATE TYPE "public"."enum_pages_blocks_features_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_pricing_plans_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_pricing_plans_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_hero_split_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_hero_split_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_hero_split_image_position" AS ENUM('right', 'left');
  CREATE TYPE "public"."enum_pages_blocks_hero_split_theme" AS ENUM('light', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_image_gallery_layout" AS ENUM('masonry', 'grid', 'scroll');
  CREATE TYPE "public"."enum_pages_blocks_home_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_home_hero_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_home_hero_style" AS ENUM('split', 'fullwidth', 'centred');
  CREATE TYPE "public"."enum_pages_blocks_home_hero_theme" AS ENUM('dark', 'light', 'pink');
  CREATE TYPE "public"."enum_pages_blocks_newsletter_theme" AS ENUM('dark', 'light', 'pink');
  CREATE TYPE "public"."enum_pages_blocks_team_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_video_embed_aspect_ratio" AS ENUM('16:9', '4:3', '1:1');
  CREATE TYPE "public"."enum_pages_blocks_video_embed_max_width" AS ENUM('small', 'medium', 'large', 'full');
  CREATE TYPE "public"."enum_pages_blocks_map_embed_map_height" AS ENUM('small', 'medium', 'large');
  CREATE TYPE "public"."enum_pages_blocks_map_embed_layout" AS ENUM('stacked', 'sideBySide');
  CREATE TYPE "public"."enum_pages_blocks_embed_max_width" AS ENUM('small', 'medium', 'large', 'full');
  CREATE TYPE "public"."enum_pages_blocks_banner_style" AS ENUM('info', 'warning', 'error', 'success');
  CREATE TYPE "public"."enum_pages_blocks_code_language" AS ENUM('typescript', 'javascript', 'css');
  CREATE TYPE "public"."enum_pages_hero_type" AS ENUM('none', 'highImpact', 'mediumImpact', 'lowImpact');
  CREATE TYPE "public"."enum_pages_advanced_seo_schema_type" AS ENUM('', 'WebPage', 'AboutPage', 'ContactPage', 'FAQPage', 'CollectionPage', 'CheckoutPage', 'SearchResultsPage');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_version_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_version_hero_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_archive_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum__pages_v_blocks_archive_relation_to" AS ENUM('posts');
  CREATE TYPE "public"."enum__pages_v_blocks_features_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__pages_v_blocks_pricing_plans_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_pricing_plans_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_split_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_split_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_split_image_position" AS ENUM('right', 'left');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_split_theme" AS ENUM('light', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_image_gallery_layout" AS ENUM('masonry', 'grid', 'scroll');
  CREATE TYPE "public"."enum__pages_v_blocks_home_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_home_hero_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_home_hero_style" AS ENUM('split', 'fullwidth', 'centred');
  CREATE TYPE "public"."enum__pages_v_blocks_home_hero_theme" AS ENUM('dark', 'light', 'pink');
  CREATE TYPE "public"."enum__pages_v_blocks_newsletter_theme" AS ENUM('dark', 'light', 'pink');
  CREATE TYPE "public"."enum__pages_v_blocks_team_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__pages_v_blocks_video_embed_aspect_ratio" AS ENUM('16:9', '4:3', '1:1');
  CREATE TYPE "public"."enum__pages_v_blocks_video_embed_max_width" AS ENUM('small', 'medium', 'large', 'full');
  CREATE TYPE "public"."enum__pages_v_blocks_map_embed_map_height" AS ENUM('small', 'medium', 'large');
  CREATE TYPE "public"."enum__pages_v_blocks_map_embed_layout" AS ENUM('stacked', 'sideBySide');
  CREATE TYPE "public"."enum__pages_v_blocks_embed_max_width" AS ENUM('small', 'medium', 'large', 'full');
  CREATE TYPE "public"."enum__pages_v_blocks_banner_style" AS ENUM('info', 'warning', 'error', 'success');
  CREATE TYPE "public"."enum__pages_v_blocks_code_language" AS ENUM('typescript', 'javascript', 'css');
  CREATE TYPE "public"."enum__pages_v_version_hero_type" AS ENUM('none', 'highImpact', 'mediumImpact', 'lowImpact');
  CREATE TYPE "public"."enum__pages_v_version_advanced_seo_schema_type" AS ENUM('', 'WebPage', 'AboutPage', 'ContactPage', 'FAQPage', 'CollectionPage', 'CheckoutPage', 'SearchResultsPage');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_posts_advanced_seo_schema_type" AS ENUM('', 'Article', 'NewsArticle', 'BlogPosting');
  CREATE TYPE "public"."enum_posts_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__posts_v_version_advanced_seo_schema_type" AS ENUM('', 'Article', 'NewsArticle', 'BlogPosting');
  CREATE TYPE "public"."enum__posts_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_media_folder" AS ENUM('general', 'logos', 'blog', 'team', 'icons', 'backgrounds');
  CREATE TYPE "public"."enum_page_templates_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_page_templates_hero_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_page_templates_blocks_cta_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_page_templates_blocks_cta_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_page_templates_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum_page_templates_blocks_content_columns_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_page_templates_blocks_content_columns_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_page_templates_blocks_archive_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum_page_templates_blocks_archive_relation_to" AS ENUM('posts');
  CREATE TYPE "public"."enum_page_templates_blocks_features_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_page_templates_blocks_pricing_plans_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_page_templates_blocks_pricing_plans_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_page_templates_blocks_hero_split_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_page_templates_blocks_hero_split_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_page_templates_blocks_hero_split_image_position" AS ENUM('right', 'left');
  CREATE TYPE "public"."enum_page_templates_blocks_hero_split_theme" AS ENUM('light', 'dark');
  CREATE TYPE "public"."enum_page_templates_blocks_image_gallery_layout" AS ENUM('masonry', 'grid', 'scroll');
  CREATE TYPE "public"."enum_page_templates_blocks_home_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_page_templates_blocks_home_hero_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_page_templates_blocks_home_hero_style" AS ENUM('split', 'fullwidth', 'centred');
  CREATE TYPE "public"."enum_page_templates_blocks_home_hero_theme" AS ENUM('dark', 'light', 'pink');
  CREATE TYPE "public"."enum_page_templates_blocks_newsletter_theme" AS ENUM('dark', 'light', 'pink');
  CREATE TYPE "public"."enum_page_templates_blocks_team_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_page_templates_blocks_video_embed_aspect_ratio" AS ENUM('16:9', '4:3', '1:1');
  CREATE TYPE "public"."enum_page_templates_blocks_video_embed_max_width" AS ENUM('small', 'medium', 'large', 'full');
  CREATE TYPE "public"."enum_page_templates_blocks_map_embed_map_height" AS ENUM('small', 'medium', 'large');
  CREATE TYPE "public"."enum_page_templates_blocks_map_embed_layout" AS ENUM('stacked', 'sideBySide');
  CREATE TYPE "public"."enum_page_templates_blocks_embed_max_width" AS ENUM('small', 'medium', 'large', 'full');
  CREATE TYPE "public"."enum_page_templates_blocks_banner_style" AS ENUM('info', 'warning', 'error', 'success');
  CREATE TYPE "public"."enum_page_templates_blocks_code_language" AS ENUM('typescript', 'javascript', 'css');
  CREATE TYPE "public"."enum_page_templates_category" AS ENUM('general', 'landing', 'service', 'about', 'contact', 'shop', 'blog');
  CREATE TYPE "public"."enum_page_templates_hero_type" AS ENUM('none', 'highImpact', 'mediumImpact', 'lowImpact');
  CREATE TYPE "public"."enum_popups_layout" AS ENUM('newsletter', 'announcement', 'discount', 'custom');
  CREATE TYPE "public"."enum_popups_trigger_type" AS ENUM('delay', 'exit_intent', 'scroll', 'immediate');
  CREATE TYPE "public"."enum_popups_size" AS ENUM('small', 'medium', 'large', 'banner');
  CREATE TYPE "public"."enum_popups_position" AS ENUM('center', 'bottom_left', 'bottom_right', 'bottom_center');
  CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'editor', 'viewer', 'customer');
  CREATE TYPE "public"."enum_activity_log_action" AS ENUM('create', 'update', 'delete', 'publish', 'unpublish', 'login');
  CREATE TYPE "public"."enum_redirects_to_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_forms_confirmation_type" AS ENUM('message', 'redirect');
  CREATE TYPE "public"."enum_payload_jobs_log_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_payload_jobs_log_state" AS ENUM('failed', 'succeeded');
  CREATE TYPE "public"."enum_payload_jobs_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_header_nav_items_left_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_header_nav_items_right_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_footer_column1_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_footer_column2_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_footer_column3_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_contact_widget_channels_channel_type" AS ENUM('whatsapp', 'messenger', 'tawkto', 'crisp', 'tidio', 'custom');
  CREATE TYPE "public"."enum_contact_widget_channels_icon" AS ENUM('chat', 'whatsapp', 'messenger', 'phone', 'email');
  CREATE TYPE "public"."enum_contact_widget_position" AS ENUM('bottom-right', 'bottom-left');
  CREATE TYPE "public"."enum_site_settings_timezone" AS ENUM('Europe/London', 'America/New_York', 'America/Los_Angeles', 'America/Chicago', 'Europe/Paris', 'Europe/Berlin', 'Australia/Sydney', 'Asia/Tokyo', 'Asia/Dubai');
  CREATE TYPE "public"."enum_site_settings_language" AS ENUM('en', 'en-GB', 'fr', 'de', 'es', 'it', 'nl', 'pt', 'ar');
  CREATE TYPE "public"."enum_site_settings_date_format" AS ENUM('DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY-MM-DD');
  CREATE TYPE "public"."enum_site_settings_currency_position" AS ENUM('before', 'after');
  CREATE TYPE "public"."enum_newsletter_settings_provider" AS ENUM('none', 'mailchimp', 'convertkit', 'brevo');
  CREATE TYPE "public"."enum_seo_settings_title_separator" AS ENUM(' | ', ' - ', ' — ');
  CREATE TYPE "public"."enum_seo_settings_sitemap_change_frequency" AS ENUM('always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never');
  CREATE TYPE "public"."enum_seo_settings_sitemap_priority" AS ENUM('1.0', '0.9', '0.8', '0.7', '0.6', '0.5', '0.3', '0.1');
  CREATE TYPE "public"."enum_seo_settings_breadcrumb_separator" AS ENUM('/', '›', '»', '→', '>');
  CREATE TYPE "public"."enum_seo_settings_business_type" AS ENUM('OnlineStore', 'LocalBusiness', 'Organization');
  CREATE TYPE "public"."enum_seo_settings_schema_article_type" AS ENUM('Article', 'NewsArticle', 'BlogPosting');
  CREATE TYPE "public"."enum_site_appearance_heading_font" AS ENUM('DM Serif Display', 'Inter', 'Poppins', 'Montserrat', 'Playfair Display', 'DM Sans', 'Outfit', 'Sora', 'Space Grotesk');
  CREATE TYPE "public"."enum_site_appearance_body_font" AS ENUM('Plus Jakarta Sans', 'Inter', 'DM Sans', 'Open Sans', 'Lato', 'Nunito', 'Source Sans 3', 'Work Sans', 'Outfit');
  CREATE TYPE "public"."enum_site_appearance_font_weight_heading" AS ENUM('400', '500', '600', '700', '800');
  CREATE TYPE "public"."enum_site_appearance_font_weight_body" AS ENUM('300', '400', '500');
  CREATE TYPE "public"."enum_mail_settings_provider" AS ENUM('resend', 'smtp', 'sendgrid', 'mailgun', 'ses');
  CREATE TYPE "public"."enum_mail_settings_mailgun_region" AS ENUM('US', 'EU');
  CREATE TABLE "pages_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_hero_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "pages_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_cta_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_cta_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "pages_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"rich_text" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" "enum_pages_blocks_content_columns_size" DEFAULT 'oneThird',
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_type" "enum_pages_blocks_content_columns_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_content_columns_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "pages_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_archive" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"intro_content" jsonb,
  	"populate_by" "enum_pages_blocks_archive_populate_by" DEFAULT 'collection',
  	"relation_to" "enum_pages_blocks_archive_relation_to" DEFAULT 'posts',
  	"limit" numeric DEFAULT 10,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_form_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"enable_intro" boolean,
  	"intro_content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_testimonials_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" jsonb,
  	"author" varchar,
  	"role" varchar,
  	"image_id" integer,
  	"rating" numeric
  );
  
  CREATE TABLE "pages_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'What Our Clients Say',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb
  );
  
  CREATE TABLE "pages_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Frequently Asked Questions',
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_features_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"description" jsonb,
  	"image_id" integer
  );
  
  CREATE TABLE "pages_blocks_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"columns" "enum_pages_blocks_features_columns" DEFAULT '3',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_stats_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"prefix" varchar,
  	"suffix" varchar
  );
  
  CREATE TABLE "pages_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_logo_carousel_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"company_name" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "pages_blocks_logo_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Trusted By',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_pricing_plans_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar,
  	"included" boolean DEFAULT true
  );
  
  CREATE TABLE "pages_blocks_pricing_plans_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_pricing_plans_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_pricing_plans_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "pages_blocks_pricing_plans" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"price" varchar,
  	"period" varchar,
  	"description" varchar,
  	"highlighted" boolean DEFAULT false,
  	"badge" varchar
  );
  
  CREATE TABLE "pages_blocks_pricing" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Simple, Transparent Pricing',
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_hero_split_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_hero_split_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_hero_split_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "pages_blocks_hero_split" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge_text" varchar,
  	"headline" varchar,
  	"subheadline" varchar,
  	"image_id" integer,
  	"image_position" "enum_pages_blocks_hero_split_image_position" DEFAULT 'right',
  	"theme" "enum_pages_blocks_hero_split_theme" DEFAULT 'light',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_how_it_works_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon_id" integer
  );
  
  CREATE TABLE "pages_blocks_how_it_works" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'How It Works',
  	"subheading" varchar,
  	"cta_text" varchar,
  	"cta_link" varchar DEFAULT '/shop',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_image_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"label" varchar,
  	"product_link" varchar
  );
  
  CREATE TABLE "pages_blocks_image_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"layout" "enum_pages_blocks_image_gallery_layout" DEFAULT 'masonry',
  	"cta_text" varchar,
  	"cta_link" varchar DEFAULT '/',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_home_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_home_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_home_hero_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "pages_blocks_home_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge" varchar,
  	"headline" varchar DEFAULT 'Press-On Perfection.',
  	"subheadline" varchar DEFAULT 'Welcome to your new site. Configure your content in the admin panel.',
  	"background_image_id" integer,
  	"style" "enum_pages_blocks_home_hero_style" DEFAULT 'split',
  	"theme" "enum_pages_blocks_home_hero_theme" DEFAULT 'dark',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_newsletter" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Get 10% off your first order',
  	"subheading" varchar DEFAULT 'Nail inspo, new drops & exclusive offers — no spam, ever.',
  	"button_label" varchar DEFAULT 'Subscribe',
  	"theme" "enum_pages_blocks_newsletter_theme" DEFAULT 'dark',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_team_grid_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" varchar,
  	"photo_id" integer,
  	"bio" varchar,
  	"linked_in" varchar,
  	"email" varchar
  );
  
  CREATE TABLE "pages_blocks_team_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"columns" "enum_pages_blocks_team_grid_columns" DEFAULT '3',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_video_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"video_u_r_l" varchar,
  	"aspect_ratio" "enum_pages_blocks_video_embed_aspect_ratio" DEFAULT '16:9',
  	"max_width" "enum_pages_blocks_video_embed_max_width" DEFAULT 'large',
  	"caption" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_map_embed_locations" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"address" varchar,
  	"google_maps_embed_u_r_l" varchar,
  	"phone" varchar,
  	"email" varchar,
  	"hours" varchar
  );
  
  CREATE TABLE "pages_blocks_map_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"map_height" "enum_pages_blocks_map_embed_map_height" DEFAULT 'medium',
  	"layout" "enum_pages_blocks_map_embed_layout" DEFAULT 'stacked',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"embed_u_r_l" varchar,
  	"height" numeric DEFAULT 500,
  	"max_width" "enum_pages_blocks_embed_max_width" DEFAULT 'large',
  	"show_border" boolean DEFAULT false,
  	"caption" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_timeline_events" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"date" varchar,
  	"title" varchar,
  	"description" jsonb,
  	"image_id" integer,
  	"icon" varchar
  );
  
  CREATE TABLE "pages_blocks_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"style" "enum_pages_blocks_banner_style" DEFAULT 'info',
  	"content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_code" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"language" "enum_pages_blocks_code_language" DEFAULT 'typescript',
  	"code" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"template_id" integer,
  	"title" varchar,
  	"hero_type" "enum_pages_hero_type" DEFAULT 'lowImpact',
  	"hero_rich_text" jsonb,
  	"hero_media_id" integer,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"advanced_seo_canonical_url" varchar,
  	"advanced_seo_noindex" boolean DEFAULT false,
  	"advanced_seo_nofollow" boolean DEFAULT false,
  	"advanced_seo_noarchive" boolean DEFAULT false,
  	"advanced_seo_nosnippet" boolean DEFAULT false,
  	"advanced_seo_schema_type" "enum_pages_advanced_seo_schema_type",
  	"advanced_seo_focus_keyword" varchar,
  	"published_at" timestamp(3) with time zone,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer,
  	"categories_id" integer
  );
  
  CREATE TABLE "_pages_v_version_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_version_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_version_hero_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_cta_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_cta_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"rich_text" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"size" "enum__pages_v_blocks_content_columns_size" DEFAULT 'oneThird',
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_type" "enum__pages_v_blocks_content_columns_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_content_columns_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_archive" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"intro_content" jsonb,
  	"populate_by" "enum__pages_v_blocks_archive_populate_by" DEFAULT 'collection',
  	"relation_to" "enum__pages_v_blocks_archive_relation_to" DEFAULT 'posts',
  	"limit" numeric DEFAULT 10,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_form_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"enable_intro" boolean,
  	"intro_content" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" jsonb,
  	"author" varchar,
  	"role" varchar,
  	"image_id" integer,
  	"rating" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'What Our Clients Say',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Frequently Asked Questions',
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_features_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"description" jsonb,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"columns" "enum__pages_v_blocks_features_columns" DEFAULT '3',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stats_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"prefix" varchar,
  	"suffix" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_logo_carousel_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"company_name" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_logo_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Trusted By',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pricing_plans_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"feature" varchar,
  	"included" boolean DEFAULT true,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pricing_plans_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_pricing_plans_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_pricing_plans_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pricing_plans" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"price" varchar,
  	"period" varchar,
  	"description" varchar,
  	"highlighted" boolean DEFAULT false,
  	"badge" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pricing" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Simple, Transparent Pricing',
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero_split_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_hero_split_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_hero_split_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero_split" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"badge_text" varchar,
  	"headline" varchar,
  	"subheadline" varchar,
  	"image_id" integer,
  	"image_position" "enum__pages_v_blocks_hero_split_image_position" DEFAULT 'right',
  	"theme" "enum__pages_v_blocks_hero_split_theme" DEFAULT 'light',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_how_it_works_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_how_it_works" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'How It Works',
  	"subheading" varchar,
  	"cta_text" varchar,
  	"cta_link" varchar DEFAULT '/shop',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_image_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"label" varchar,
  	"product_link" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_image_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"layout" "enum__pages_v_blocks_image_gallery_layout" DEFAULT 'masonry',
  	"cta_text" varchar,
  	"cta_link" varchar DEFAULT '/',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_home_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_home_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_home_hero_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_home_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"badge" varchar,
  	"headline" varchar DEFAULT 'Press-On Perfection.',
  	"subheadline" varchar DEFAULT 'Welcome to your new site. Configure your content in the admin panel.',
  	"background_image_id" integer,
  	"style" "enum__pages_v_blocks_home_hero_style" DEFAULT 'split',
  	"theme" "enum__pages_v_blocks_home_hero_theme" DEFAULT 'dark',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_newsletter" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Get 10% off your first order',
  	"subheading" varchar DEFAULT 'Nail inspo, new drops & exclusive offers — no spam, ever.',
  	"button_label" varchar DEFAULT 'Subscribe',
  	"theme" "enum__pages_v_blocks_newsletter_theme" DEFAULT 'dark',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_team_grid_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" varchar,
  	"photo_id" integer,
  	"bio" varchar,
  	"linked_in" varchar,
  	"email" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_team_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"columns" "enum__pages_v_blocks_team_grid_columns" DEFAULT '3',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_video_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"video_u_r_l" varchar,
  	"aspect_ratio" "enum__pages_v_blocks_video_embed_aspect_ratio" DEFAULT '16:9',
  	"max_width" "enum__pages_v_blocks_video_embed_max_width" DEFAULT 'large',
  	"caption" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_map_embed_locations" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"address" varchar,
  	"google_maps_embed_u_r_l" varchar,
  	"phone" varchar,
  	"email" varchar,
  	"hours" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_map_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"map_height" "enum__pages_v_blocks_map_embed_map_height" DEFAULT 'medium',
  	"layout" "enum__pages_v_blocks_map_embed_layout" DEFAULT 'stacked',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"embed_u_r_l" varchar,
  	"height" numeric DEFAULT 500,
  	"max_width" "enum__pages_v_blocks_embed_max_width" DEFAULT 'large',
  	"show_border" boolean DEFAULT false,
  	"caption" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_timeline_events" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"date" varchar,
  	"title" varchar,
  	"description" jsonb,
  	"image_id" integer,
  	"icon" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"style" "enum__pages_v_blocks_banner_style" DEFAULT 'info',
  	"content" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_code" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"language" "enum__pages_v_blocks_code_language" DEFAULT 'typescript',
  	"code" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_template_id" integer,
  	"version_title" varchar,
  	"version_hero_type" "enum__pages_v_version_hero_type" DEFAULT 'lowImpact',
  	"version_hero_rich_text" jsonb,
  	"version_hero_media_id" integer,
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"version_advanced_seo_canonical_url" varchar,
  	"version_advanced_seo_noindex" boolean DEFAULT false,
  	"version_advanced_seo_nofollow" boolean DEFAULT false,
  	"version_advanced_seo_noarchive" boolean DEFAULT false,
  	"version_advanced_seo_nosnippet" boolean DEFAULT false,
  	"version_advanced_seo_schema_type" "enum__pages_v_version_advanced_seo_schema_type",
  	"version_advanced_seo_focus_keyword" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_pages_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer,
  	"categories_id" integer
  );
  
  CREATE TABLE "posts_populated_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" varchar,
  	"bio" varchar,
  	"slug" varchar,
  	"twitter" varchar,
  	"linkedin" varchar,
  	"instagram" varchar,
  	"website" varchar,
  	"avatar_id" integer
  );
  
  CREATE TABLE "posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"hero_image_id" integer,
  	"content" jsonb,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"advanced_seo_canonical_url" varchar,
  	"advanced_seo_noindex" boolean DEFAULT false,
  	"advanced_seo_nofollow" boolean DEFAULT false,
  	"advanced_seo_schema_type" "enum_posts_advanced_seo_schema_type",
  	"advanced_seo_focus_keyword" varchar,
  	"published_at" timestamp(3) with time zone,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_posts_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "posts_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"posts_id" integer,
  	"categories_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "_posts_v_version_populated_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"name" varchar,
  	"role" varchar,
  	"bio" varchar,
  	"slug" varchar,
  	"twitter" varchar,
  	"linkedin" varchar,
  	"instagram" varchar,
  	"website" varchar,
  	"avatar_id" integer
  );
  
  CREATE TABLE "_posts_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_hero_image_id" integer,
  	"version_content" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"version_advanced_seo_canonical_url" varchar,
  	"version_advanced_seo_noindex" boolean DEFAULT false,
  	"version_advanced_seo_nofollow" boolean DEFAULT false,
  	"version_advanced_seo_schema_type" "enum__posts_v_version_advanced_seo_schema_type",
  	"version_advanced_seo_focus_keyword" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__posts_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_posts_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"posts_id" integer,
  	"categories_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "categories_breadcrumbs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"doc_id" integer,
  	"url" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar NOT NULL,
  	"parent_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar,
  	"folder" "enum_media_folder" DEFAULT 'general',
  	"caption" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_square_url" varchar,
  	"sizes_square_width" numeric,
  	"sizes_square_height" numeric,
  	"sizes_square_mime_type" varchar,
  	"sizes_square_filesize" numeric,
  	"sizes_square_filename" varchar,
  	"sizes_small_url" varchar,
  	"sizes_small_width" numeric,
  	"sizes_small_height" numeric,
  	"sizes_small_mime_type" varchar,
  	"sizes_small_filesize" numeric,
  	"sizes_small_filename" varchar,
  	"sizes_medium_url" varchar,
  	"sizes_medium_width" numeric,
  	"sizes_medium_height" numeric,
  	"sizes_medium_mime_type" varchar,
  	"sizes_medium_filesize" numeric,
  	"sizes_medium_filename" varchar,
  	"sizes_large_url" varchar,
  	"sizes_large_width" numeric,
  	"sizes_large_height" numeric,
  	"sizes_large_mime_type" varchar,
  	"sizes_large_filesize" numeric,
  	"sizes_large_filename" varchar,
  	"sizes_xlarge_url" varchar,
  	"sizes_xlarge_width" numeric,
  	"sizes_xlarge_height" numeric,
  	"sizes_xlarge_mime_type" varchar,
  	"sizes_xlarge_filesize" numeric,
  	"sizes_xlarge_filename" varchar,
  	"sizes_og_url" varchar,
  	"sizes_og_width" numeric,
  	"sizes_og_height" numeric,
  	"sizes_og_mime_type" varchar,
  	"sizes_og_filesize" numeric,
  	"sizes_og_filename" varchar
  );
  
  CREATE TABLE "media_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "page_templates_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_page_templates_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL,
  	"link_appearance" "enum_page_templates_hero_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "page_templates_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_page_templates_blocks_cta_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL,
  	"link_appearance" "enum_page_templates_blocks_cta_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "page_templates_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"rich_text" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "page_templates_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" "enum_page_templates_blocks_content_columns_size" DEFAULT 'oneThird',
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_type" "enum_page_templates_blocks_content_columns_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_page_templates_blocks_content_columns_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "page_templates_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "page_templates_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "page_templates_blocks_archive" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"intro_content" jsonb,
  	"populate_by" "enum_page_templates_blocks_archive_populate_by" DEFAULT 'collection',
  	"relation_to" "enum_page_templates_blocks_archive_relation_to" DEFAULT 'posts',
  	"limit" numeric DEFAULT 10,
  	"block_name" varchar
  );
  
  CREATE TABLE "page_templates_blocks_form_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"form_id" integer NOT NULL,
  	"enable_intro" boolean,
  	"intro_content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "page_templates_blocks_testimonials_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" jsonb NOT NULL,
  	"author" varchar NOT NULL,
  	"role" varchar,
  	"image_id" integer,
  	"rating" numeric
  );
  
  CREATE TABLE "page_templates_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'What Our Clients Say',
  	"block_name" varchar
  );
  
  CREATE TABLE "page_templates_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" jsonb NOT NULL
  );
  
  CREATE TABLE "page_templates_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Frequently Asked Questions',
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "page_templates_blocks_features_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar NOT NULL,
  	"description" jsonb,
  	"image_id" integer
  );
  
  CREATE TABLE "page_templates_blocks_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"columns" "enum_page_templates_blocks_features_columns" DEFAULT '3',
  	"block_name" varchar
  );
  
  CREATE TABLE "page_templates_blocks_stats_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL,
  	"prefix" varchar,
  	"suffix" varchar
  );
  
  CREATE TABLE "page_templates_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "page_templates_blocks_logo_carousel_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"logo_id" integer NOT NULL,
  	"company_name" varchar NOT NULL,
  	"url" varchar
  );
  
  CREATE TABLE "page_templates_blocks_logo_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Trusted By',
  	"block_name" varchar
  );
  
  CREATE TABLE "page_templates_blocks_pricing_plans_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar NOT NULL,
  	"included" boolean DEFAULT true
  );
  
  CREATE TABLE "page_templates_blocks_pricing_plans_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_page_templates_blocks_pricing_plans_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL,
  	"link_appearance" "enum_page_templates_blocks_pricing_plans_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "page_templates_blocks_pricing_plans" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"price" varchar NOT NULL,
  	"period" varchar,
  	"description" varchar,
  	"highlighted" boolean DEFAULT false,
  	"badge" varchar
  );
  
  CREATE TABLE "page_templates_blocks_pricing" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Simple, Transparent Pricing',
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "page_templates_blocks_hero_split_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_page_templates_blocks_hero_split_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL,
  	"link_appearance" "enum_page_templates_blocks_hero_split_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "page_templates_blocks_hero_split" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge_text" varchar,
  	"headline" varchar NOT NULL,
  	"subheadline" varchar,
  	"image_id" integer NOT NULL,
  	"image_position" "enum_page_templates_blocks_hero_split_image_position" DEFAULT 'right',
  	"theme" "enum_page_templates_blocks_hero_split_theme" DEFAULT 'light',
  	"block_name" varchar
  );
  
  CREATE TABLE "page_templates_blocks_how_it_works_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"icon_id" integer
  );
  
  CREATE TABLE "page_templates_blocks_how_it_works" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'How It Works',
  	"subheading" varchar,
  	"cta_text" varchar,
  	"cta_link" varchar DEFAULT '/shop',
  	"block_name" varchar
  );
  
  CREATE TABLE "page_templates_blocks_image_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"label" varchar,
  	"product_link" varchar
  );
  
  CREATE TABLE "page_templates_blocks_image_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"layout" "enum_page_templates_blocks_image_gallery_layout" DEFAULT 'masonry',
  	"cta_text" varchar,
  	"cta_link" varchar DEFAULT '/',
  	"block_name" varchar
  );
  
  CREATE TABLE "page_templates_blocks_home_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_page_templates_blocks_home_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL,
  	"link_appearance" "enum_page_templates_blocks_home_hero_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "page_templates_blocks_home_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge" varchar,
  	"headline" varchar DEFAULT 'Press-On Perfection.' NOT NULL,
  	"subheadline" varchar DEFAULT 'Welcome to your new site. Configure your content in the admin panel.',
  	"background_image_id" integer,
  	"style" "enum_page_templates_blocks_home_hero_style" DEFAULT 'split',
  	"theme" "enum_page_templates_blocks_home_hero_theme" DEFAULT 'dark',
  	"block_name" varchar
  );
  
  CREATE TABLE "page_templates_blocks_newsletter" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Get 10% off your first order',
  	"subheading" varchar DEFAULT 'Nail inspo, new drops & exclusive offers — no spam, ever.',
  	"button_label" varchar DEFAULT 'Subscribe',
  	"theme" "enum_page_templates_blocks_newsletter_theme" DEFAULT 'dark',
  	"block_name" varchar
  );
  
  CREATE TABLE "page_templates_blocks_team_grid_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" varchar NOT NULL,
  	"photo_id" integer,
  	"bio" varchar,
  	"linked_in" varchar,
  	"email" varchar
  );
  
  CREATE TABLE "page_templates_blocks_team_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"columns" "enum_page_templates_blocks_team_grid_columns" DEFAULT '3',
  	"block_name" varchar
  );
  
  CREATE TABLE "page_templates_blocks_video_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"video_u_r_l" varchar NOT NULL,
  	"aspect_ratio" "enum_page_templates_blocks_video_embed_aspect_ratio" DEFAULT '16:9',
  	"max_width" "enum_page_templates_blocks_video_embed_max_width" DEFAULT 'large',
  	"caption" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "page_templates_blocks_map_embed_locations" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"address" varchar,
  	"google_maps_embed_u_r_l" varchar NOT NULL,
  	"phone" varchar,
  	"email" varchar,
  	"hours" varchar
  );
  
  CREATE TABLE "page_templates_blocks_map_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"map_height" "enum_page_templates_blocks_map_embed_map_height" DEFAULT 'medium',
  	"layout" "enum_page_templates_blocks_map_embed_layout" DEFAULT 'stacked',
  	"block_name" varchar
  );
  
  CREATE TABLE "page_templates_blocks_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"embed_u_r_l" varchar NOT NULL,
  	"height" numeric DEFAULT 500,
  	"max_width" "enum_page_templates_blocks_embed_max_width" DEFAULT 'large',
  	"show_border" boolean DEFAULT false,
  	"caption" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "page_templates_blocks_timeline_events" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"date" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"description" jsonb,
  	"image_id" integer,
  	"icon" varchar
  );
  
  CREATE TABLE "page_templates_blocks_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "page_templates_blocks_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"style" "enum_page_templates_blocks_banner_style" DEFAULT 'info' NOT NULL,
  	"content" jsonb NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "page_templates_blocks_code" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"language" "enum_page_templates_blocks_code_language" DEFAULT 'typescript',
  	"code" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "page_templates" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"description" varchar,
  	"category" "enum_page_templates_category" DEFAULT 'general' NOT NULL,
  	"thumbnail_id" integer,
  	"hero_type" "enum_page_templates_hero_type" DEFAULT 'lowImpact' NOT NULL,
  	"hero_rich_text" jsonb,
  	"hero_media_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "page_templates_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer,
  	"categories_id" integer
  );
  
  CREATE TABLE "popups" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"active" boolean DEFAULT false,
  	"layout" "enum_popups_layout" DEFAULT 'newsletter',
  	"heading" varchar,
  	"body" jsonb,
  	"image_id" integer,
  	"discount_code" varchar,
  	"cta_text" varchar DEFAULT 'Subscribe',
  	"cta_url" varchar,
  	"success_message" varchar DEFAULT 'You''re in! Check your inbox for a confirmation.',
  	"custom_html" varchar,
  	"trigger_type" "enum_popups_trigger_type" DEFAULT 'delay',
  	"trigger_delay" numeric DEFAULT 5,
  	"trigger_scroll_percent" numeric DEFAULT 50,
  	"dismiss_days" numeric DEFAULT 30,
  	"show_once_per_session" boolean DEFAULT false,
  	"url_condition" varchar,
  	"size" "enum_popups_size" DEFAULT 'medium',
  	"position" "enum_popups_position" DEFAULT 'center',
  	"show_close_button" boolean DEFAULT true,
  	"overlay_dismiss" boolean DEFAULT true,
  	"background_color" varchar,
  	"starts_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "users_saved_addresses" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"line1" varchar,
  	"line2" varchar,
  	"city" varchar,
  	"county" varchar,
  	"postcode" varchar,
  	"country" varchar DEFAULT 'GB',
  	"is_default" boolean DEFAULT false
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" "enum_users_role" DEFAULT 'editor' NOT NULL,
  	"job_title" varchar,
  	"bio" varchar,
  	"avatar_id" integer,
  	"slug" varchar,
  	"website" varchar,
  	"twitter" varchar,
  	"linkedin" varchar,
  	"instagram" varchar,
  	"two_factor_enabled" boolean DEFAULT false,
  	"two_factor_secret" varchar,
  	"two_factor_backup_codes" jsonb,
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
  
  CREATE TABLE "activity_log" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"action" "enum_activity_log_action" NOT NULL,
  	"user_id" integer,
  	"user_name" varchar,
  	"collection" varchar,
  	"global_slug" varchar,
  	"document_id" varchar,
  	"document_title" varchar,
  	"timestamp" timestamp(3) with time zone NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "redirects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"from" varchar NOT NULL,
  	"to_type" "enum_redirects_to_type" DEFAULT 'reference',
  	"to_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "redirects_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE "forms_blocks_checkbox" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"default_value" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_country" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_email" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_message" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"message" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_number" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_select_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_select" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" varchar,
  	"placeholder" varchar,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_state" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" varchar,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_textarea" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" varchar,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_emails" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"email_to" varchar,
  	"cc" varchar,
  	"bcc" varchar,
  	"reply_to" varchar,
  	"email_from" varchar,
  	"subject" varchar DEFAULT 'You''ve received a new message.' NOT NULL,
  	"message" jsonb
  );
  
  CREATE TABLE "forms" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"submit_button_label" varchar,
  	"confirmation_type" "enum_forms_confirmation_type" DEFAULT 'message',
  	"confirmation_message" jsonb,
  	"redirect_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "form_submissions_submission_data" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"field" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "form_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "search_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"relation_to" varchar,
  	"category_i_d" varchar,
  	"title" varchar
  );
  
  CREATE TABLE "search" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"priority" numeric,
  	"slug" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"price" numeric,
  	"event_date" varchar,
  	"venue_name" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "search_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"posts_id" integer,
  	"pages_id" integer
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_jobs_log" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"executed_at" timestamp(3) with time zone NOT NULL,
  	"completed_at" timestamp(3) with time zone NOT NULL,
  	"task_slug" "enum_payload_jobs_log_task_slug" NOT NULL,
  	"task_i_d" varchar NOT NULL,
  	"input" jsonb,
  	"output" jsonb,
  	"state" "enum_payload_jobs_log_state" NOT NULL,
  	"error" jsonb
  );
  
  CREATE TABLE "payload_jobs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"input" jsonb,
  	"completed_at" timestamp(3) with time zone,
  	"total_tried" numeric DEFAULT 0,
  	"has_error" boolean DEFAULT false,
  	"error" jsonb,
  	"task_slug" "enum_payload_jobs_task_slug",
  	"queue" varchar DEFAULT 'default',
  	"wait_until" timestamp(3) with time zone,
  	"processing" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer,
  	"categories_id" integer,
  	"media_id" integer,
  	"page_templates_id" integer,
  	"popups_id" integer,
  	"users_id" integer,
  	"activity_log_id" integer,
  	"redirects_id" integer,
  	"forms_id" integer,
  	"form_submissions_id" integer,
  	"search_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "header_nav_items_left" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_header_nav_items_left_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  CREATE TABLE "header_nav_items_right" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_header_nav_items_right_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  CREATE TABLE "header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "header_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE "footer_column1_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_footer_column1_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  CREATE TABLE "footer_column2_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_footer_column2_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  CREATE TABLE "footer_column3_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_footer_column3_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"newsletter_heading" varchar DEFAULT 'Subscribe to our newsletter',
  	"newsletter_subtext" varchar DEFAULT 'Stay updated with our latest news and offers.',
  	"brand_name" varchar DEFAULT 'Your Brand',
  	"brand_tagline" varchar DEFAULT 'Your tagline goes here. Edit this in the Footer settings.',
  	"contact_email" varchar DEFAULT 'hello@example.com',
  	"contact_hours" varchar DEFAULT 'Mon–Fri, 9am–5pm GMT',
  	"instagram_url" varchar,
  	"tiktok_url" varchar,
  	"pinterest_url" varchar,
  	"facebook_url" varchar,
  	"column1_heading" varchar DEFAULT 'Shop',
  	"column2_heading" varchar DEFAULT 'Info',
  	"column3_heading" varchar DEFAULT 'Help',
  	"copyright_text" varchar DEFAULT '© {year} Your Brand. All rights reserved.',
  	"made_with_text" varchar DEFAULT '',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "footer_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE "company_details" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"company_name" varchar DEFAULT 'Your Company Ltd' NOT NULL,
  	"company_registration_number" varchar,
  	"vat_number" varchar,
  	"registered_address" varchar,
  	"website_url" varchar DEFAULT 'https://example.com',
  	"contact_email" varchar DEFAULT 'hello@example.com',
  	"contact_phone" varchar,
  	"data_protection_officer_email" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "contact_widget_channels" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"channel_type" "enum_contact_widget_channels_channel_type" NOT NULL,
  	"label" varchar,
  	"icon" "enum_contact_widget_channels_icon" DEFAULT 'chat',
  	"phone_number" varchar,
  	"default_message" varchar,
  	"facebook_page_id" varchar,
  	"tawkto_property_id" varchar,
  	"tawkto_widget_id" varchar,
  	"crisp_website_id" varchar,
  	"tidio_public_key" varchar,
  	"embed_code" varchar
  );
  
  CREATE TABLE "contact_widget_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL,
  	"link_url" varchar
  );
  
  CREATE TABLE "contact_widget" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"position" "enum_contact_widget_position" DEFAULT 'bottom-right',
  	"greeting" varchar DEFAULT 'Hi! How can we help?',
  	"primary_color" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"timezone" "enum_site_settings_timezone" DEFAULT 'Europe/London',
  	"language" "enum_site_settings_language" DEFAULT 'en-GB',
  	"date_format" "enum_site_settings_date_format" DEFAULT 'DD/MM/YYYY',
  	"currency_position" "enum_site_settings_currency_position" DEFAULT 'before',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "announcement_bar" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT false,
  	"text" varchar DEFAULT '🎉 Free shipping on orders over £30! Use code FREESHIP' NOT NULL,
  	"link_url" varchar,
  	"link_text" varchar,
  	"background_color" varchar DEFAULT '#E8177A',
  	"text_color" varchar DEFAULT '#FFFFFF',
  	"dismissible" boolean DEFAULT true,
  	"starts_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone,
  	"show_on_mobile" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "newsletter_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"provider" "enum_newsletter_settings_provider" DEFAULT 'none',
  	"mailchimp_api_key" varchar,
  	"mailchimp_list_id" varchar,
  	"mailchimp_server" varchar,
  	"convertkit_api_key" varchar,
  	"convertkit_form_id" varchar,
  	"brevo_api_key" varchar,
  	"brevo_list_id" numeric,
  	"popup_enabled" boolean DEFAULT false,
  	"popup_delay" numeric DEFAULT 5,
  	"popup_heading" varchar DEFAULT 'Get 10% off your first order',
  	"popup_body" varchar DEFAULT 'Join our mailing list for exclusive deals and new drops',
  	"popup_image_id" integer,
  	"popup_dismiss_days" numeric DEFAULT 7,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "seo_settings_sitemap_exclude_patterns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"pattern" varchar NOT NULL
  );
  
  CREATE TABLE "seo_settings_noindex_patterns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"pattern" varchar NOT NULL
  );
  
  CREATE TABLE "seo_settings_llms_additional_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"content" varchar
  );
  
  CREATE TABLE "seo_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"site_title" varchar DEFAULT 'Your Brand',
  	"title_separator" "enum_seo_settings_title_separator" DEFAULT ' | ',
  	"default_description" varchar,
  	"default_og_image_id" integer,
  	"google_search_console_code" varchar,
  	"bing_verification_code" varchar,
  	"ga4_measurement_id" varchar,
  	"gtm_id" varchar,
  	"clarity_project_id" varchar,
  	"hotjar_site_id" varchar,
  	"merchant_center_verification" varchar,
  	"apple_site_verification" varchar,
  	"meta_pixel_id" varchar,
  	"meta_capi_access_token" varchar,
  	"meta_test_event_code" varchar,
  	"tiktok_pixel_id" varchar,
  	"tiktok_events_api_access_token" varchar,
  	"reddit_pixel_id" varchar,
  	"reddit_conversions_api_token" varchar,
  	"gads_conversion_id" varchar,
  	"gads_conversion_label" varchar,
  	"pinterest_tag_id" varchar,
  	"pinterest_access_token" varchar,
  	"snapchat_pixel_id" varchar,
  	"facebook_url" varchar,
  	"instagram_url" varchar,
  	"twitter_handle" varchar,
  	"tiktok_url" varchar,
  	"linkedin_url" varchar,
  	"robots_txt_custom_rules" varchar,
  	"sitemap_pages" boolean DEFAULT true,
  	"sitemap_posts" boolean DEFAULT true,
  	"sitemap_change_frequency" "enum_seo_settings_sitemap_change_frequency" DEFAULT 'weekly',
  	"sitemap_priority" "enum_seo_settings_sitemap_priority" DEFAULT '0.7',
  	"breadcrumbs_enabled" boolean DEFAULT true,
  	"breadcrumb_separator" "enum_seo_settings_breadcrumb_separator" DEFAULT '/',
  	"breadcrumb_home_label" varchar DEFAULT 'Home',
  	"breadcrumb_show_on_pages_pages" boolean DEFAULT true,
  	"breadcrumb_show_on_pages_posts" boolean DEFAULT true,
  	"breadcrumb_schema" boolean DEFAULT true,
  	"business_type" "enum_seo_settings_business_type" DEFAULT 'OnlineStore',
  	"schema_logo_id" integer,
  	"founding_date" varchar,
  	"price_range" varchar,
  	"trailing_slash" boolean DEFAULT false,
  	"prefer_www" boolean DEFAULT false,
  	"llms_txt_enabled" boolean DEFAULT true,
  	"llms_description" varchar,
  	"llms_exclude_collections_exclude_products" boolean DEFAULT false,
  	"llms_exclude_collections_exclude_posts" boolean DEFAULT false,
  	"llms_exclude_collections_exclude_events" boolean DEFAULT false,
  	"llms_exclude_collections_exclude_categories" boolean DEFAULT false,
  	"schema_organization" boolean DEFAULT true,
  	"schema_website" boolean DEFAULT true,
  	"schema_product" boolean DEFAULT true,
  	"schema_article" boolean DEFAULT true,
  	"schema_event" boolean DEFAULT true,
  	"schema_f_a_q" boolean DEFAULT true,
  	"schema_breadcrumb" boolean DEFAULT true,
  	"schema_web_page" boolean DEFAULT false,
  	"schema_product_include_reviews" boolean DEFAULT true,
  	"schema_product_include_brand" boolean DEFAULT true,
  	"schema_product_brand_name" varchar,
  	"schema_article_type" "enum_seo_settings_schema_article_type" DEFAULT 'Article',
  	"google_indexing_enabled" boolean DEFAULT false,
  	"google_indexing_service_account_email" varchar,
  	"google_indexing_private_key" varchar,
  	"google_indexing_auto_submit_pages" boolean DEFAULT true,
  	"google_indexing_auto_submit_posts" boolean DEFAULT true,
  	"google_indexing_auto_submit_products" boolean DEFAULT true,
  	"google_indexing_auto_submit_events" boolean DEFAULT true,
  	"index_now_enabled" boolean DEFAULT false,
  	"index_now_api_key" varchar,
  	"index_now_auto_submit_pages" boolean DEFAULT true,
  	"index_now_auto_submit_posts" boolean DEFAULT true,
  	"index_now_auto_submit_products" boolean DEFAULT true,
  	"index_now_auto_submit_events" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "permalink_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"posts_prefix" varchar DEFAULT 'posts' NOT NULL,
  	"policies_prefix" varchar DEFAULT 'policies' NOT NULL,
  	"enable_redirects" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "privacy_settings_policies" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"version" varchar DEFAULT '1.0',
  	"effective_date" timestamp(3) with time zone,
  	"last_reviewed" timestamp(3) with time zone,
  	"content" jsonb NOT NULL
  );
  
  CREATE TABLE "privacy_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"cookie_consent_enabled" boolean DEFAULT true,
  	"banner_title" varchar DEFAULT 'We use cookies 🍪',
  	"banner_text" varchar DEFAULT 'We use cookies to improve your experience and measure site performance. Some cookies are essential, others help us understand how you use our site.',
  	"accept_all_label" varchar DEFAULT 'Accept All',
  	"reject_all_label" varchar DEFAULT 'Reject All',
  	"manage_prefs_label" varchar DEFAULT 'Manage Preferences',
  	"necessary_label" varchar DEFAULT 'Necessary',
  	"necessary_description" varchar DEFAULT 'Required for the site to work. Includes your cart, session, and consent settings. Cannot be disabled.',
  	"analytics_label" varchar DEFAULT 'Analytics',
  	"analytics_description" varchar DEFAULT 'Help us understand how visitors use our site (Google Analytics, Microsoft Clarity).',
  	"advertising_label" varchar DEFAULT 'Advertising',
  	"advertising_description" varchar DEFAULT 'Used to show you relevant ads and measure ad performance (Meta, TikTok, Reddit).',
  	"modal_title" varchar DEFAULT 'Cookie Preferences',
  	"modal_subtext" varchar DEFAULT 'Choose which cookies you allow. You can change these at any time.',
  	"save_prefs_label" varchar DEFAULT 'Save Preferences',
  	"cookie_settings_link_label" varchar DEFAULT 'Cookie Settings',
  	"consent_cookie_expiry" numeric DEFAULT 365,
  	"privacy_policy_page_id" integer,
  	"data_retention_months" numeric DEFAULT 36,
  	"activity_log_retention_days" numeric DEFAULT 365,
  	"checkout_consent_text" varchar DEFAULT 'I agree to the Terms & Conditions and Privacy Policy.',
  	"registration_consent_text" varchar DEFAULT 'I agree to the Terms & Conditions and Privacy Policy. I understand my data will be processed as described in the Privacy Policy.',
  	"newsletter_consent_text" varchar DEFAULT 'I agree to receive marketing emails. You can unsubscribe at any time.',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_appearance" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"logo_dark_id" integer,
  	"favicon_id" integer,
  	"primary_colour" varchar DEFAULT '#E8177A',
  	"secondary_colour" varchar DEFAULT '#2D1B3D',
  	"accent_colour" varchar DEFAULT '#B76E79',
  	"background_colour" varchar DEFAULT '#FFFFFF',
  	"text_colour" varchar DEFAULT '#1A1A1A',
  	"header_bg_colour" varchar DEFAULT '#f8fafc',
  	"footer_bg_colour" varchar DEFAULT '#2D1B3D',
  	"heading_font" "enum_site_appearance_heading_font" DEFAULT 'DM Serif Display',
  	"body_font" "enum_site_appearance_body_font" DEFAULT 'Plus Jakarta Sans',
  	"h1_size" varchar DEFAULT '3.5rem',
  	"h2_size" varchar DEFAULT '2.5rem',
  	"h3_size" varchar DEFAULT '2rem',
  	"h4_size" varchar DEFAULT '1.5rem',
  	"h5_size" varchar DEFAULT '1.25rem',
  	"body_size" varchar DEFAULT '1rem',
  	"font_weight_heading" "enum_site_appearance_font_weight_heading" DEFAULT '700',
  	"font_weight_body" "enum_site_appearance_font_weight_body" DEFAULT '400',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "not_found_page_suggested_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "not_found_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Page Not Found',
  	"subheading" varchar DEFAULT 'The page you''re looking for doesn''t exist or has been moved.',
  	"body" jsonb,
  	"cta_text" varchar DEFAULT 'Go Home',
  	"cta_url" varchar DEFAULT '/',
  	"secondary_cta_text" varchar,
  	"secondary_cta_url" varchar,
  	"background_image_id" integer,
  	"show_search_bar" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "code_injection" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"head_code" varchar,
  	"body_start_code" varchar,
  	"body_end_code" varchar,
  	"custom_c_s_s" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "maintenance_mode" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT false,
  	"heading" varchar DEFAULT 'We''ll be back soon',
  	"body" jsonb,
  	"show_countdown" boolean DEFAULT false,
  	"countdown_target" timestamp(3) with time zone,
  	"allowed_i_ps" varchar,
  	"background_image_id" integer,
  	"show_logo" boolean DEFAULT true,
  	"contact_email" varchar,
  	"password" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "mail_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"provider" "enum_mail_settings_provider" DEFAULT 'resend',
  	"resend_api_key" varchar,
  	"smtp_host" varchar,
  	"smtp_port" numeric DEFAULT 587,
  	"smtp_secure" boolean DEFAULT false,
  	"smtp_username" varchar,
  	"smtp_password" varchar,
  	"sendgrid_api_key" varchar,
  	"mailgun_api_key" varchar,
  	"mailgun_domain" varchar,
  	"mailgun_region" "enum_mail_settings_mailgun_region" DEFAULT 'US',
  	"ses_access_key_id" varchar,
  	"ses_secret_access_key" varchar,
  	"ses_region" varchar DEFAULT 'eu-west-2',
  	"from_name" varchar DEFAULT 'Your Store',
  	"from_email" varchar,
  	"reply_to_email" varchar,
  	"test_recipient" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "cms_branding" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"site_name" varchar DEFAULT 'Zenithics' NOT NULL,
  	"admin_logo_id" integer,
  	"admin_icon_id" integer,
  	"accent_color" varchar DEFAULT '#0066FF',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "pages_hero_links" ADD CONSTRAINT "pages_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_links" ADD CONSTRAINT "pages_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_content_columns" ADD CONSTRAINT "pages_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_content" ADD CONSTRAINT "pages_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_block" ADD CONSTRAINT "pages_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_block" ADD CONSTRAINT "pages_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_archive" ADD CONSTRAINT "pages_blocks_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_form_block" ADD CONSTRAINT "pages_blocks_form_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_form_block" ADD CONSTRAINT "pages_blocks_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials_testimonials" ADD CONSTRAINT "pages_blocks_testimonials_testimonials_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials_testimonials" ADD CONSTRAINT "pages_blocks_testimonials_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials" ADD CONSTRAINT "pages_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_items" ADD CONSTRAINT "pages_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq" ADD CONSTRAINT "pages_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_features_features" ADD CONSTRAINT "pages_blocks_features_features_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_features_features" ADD CONSTRAINT "pages_blocks_features_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_features" ADD CONSTRAINT "pages_blocks_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_stats" ADD CONSTRAINT "pages_blocks_stats_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats" ADD CONSTRAINT "pages_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_logo_carousel_logos" ADD CONSTRAINT "pages_blocks_logo_carousel_logos_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_logo_carousel_logos" ADD CONSTRAINT "pages_blocks_logo_carousel_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_logo_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_logo_carousel" ADD CONSTRAINT "pages_blocks_logo_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_plans_features" ADD CONSTRAINT "pages_blocks_pricing_plans_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_plans_links" ADD CONSTRAINT "pages_blocks_pricing_plans_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_plans" ADD CONSTRAINT "pages_blocks_pricing_plans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing" ADD CONSTRAINT "pages_blocks_pricing_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_split_links" ADD CONSTRAINT "pages_blocks_hero_split_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero_split"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_split" ADD CONSTRAINT "pages_blocks_hero_split_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_split" ADD CONSTRAINT "pages_blocks_hero_split_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_how_it_works_steps" ADD CONSTRAINT "pages_blocks_how_it_works_steps_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_how_it_works_steps" ADD CONSTRAINT "pages_blocks_how_it_works_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_how_it_works"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_how_it_works" ADD CONSTRAINT "pages_blocks_how_it_works_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_gallery_images" ADD CONSTRAINT "pages_blocks_image_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_gallery_images" ADD CONSTRAINT "pages_blocks_image_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_image_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_gallery" ADD CONSTRAINT "pages_blocks_image_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_home_hero_links" ADD CONSTRAINT "pages_blocks_home_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_home_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_home_hero" ADD CONSTRAINT "pages_blocks_home_hero_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_home_hero" ADD CONSTRAINT "pages_blocks_home_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_newsletter" ADD CONSTRAINT "pages_blocks_newsletter_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_team_grid_members" ADD CONSTRAINT "pages_blocks_team_grid_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_team_grid_members" ADD CONSTRAINT "pages_blocks_team_grid_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_team_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_team_grid" ADD CONSTRAINT "pages_blocks_team_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_video_embed" ADD CONSTRAINT "pages_blocks_video_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_map_embed_locations" ADD CONSTRAINT "pages_blocks_map_embed_locations_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_map_embed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_map_embed" ADD CONSTRAINT "pages_blocks_map_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_embed" ADD CONSTRAINT "pages_blocks_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_timeline_events" ADD CONSTRAINT "pages_blocks_timeline_events_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_timeline_events" ADD CONSTRAINT "pages_blocks_timeline_events_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_timeline" ADD CONSTRAINT "pages_blocks_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_banner" ADD CONSTRAINT "pages_blocks_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_code" ADD CONSTRAINT "pages_blocks_code_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_template_id_page_templates_id_fk" FOREIGN KEY ("template_id") REFERENCES "public"."page_templates"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_hero_media_id_media_id_fk" FOREIGN KEY ("hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_hero_links" ADD CONSTRAINT "_pages_v_version_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_links" ADD CONSTRAINT "_pages_v_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta" ADD CONSTRAINT "_pages_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content_columns" ADD CONSTRAINT "_pages_v_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content" ADD CONSTRAINT "_pages_v_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media_block" ADD CONSTRAINT "_pages_v_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media_block" ADD CONSTRAINT "_pages_v_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_archive" ADD CONSTRAINT "_pages_v_blocks_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_form_block" ADD CONSTRAINT "_pages_v_blocks_form_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_form_block" ADD CONSTRAINT "_pages_v_blocks_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials_testimonials" ADD CONSTRAINT "_pages_v_blocks_testimonials_testimonials_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials_testimonials" ADD CONSTRAINT "_pages_v_blocks_testimonials_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials" ADD CONSTRAINT "_pages_v_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_items" ADD CONSTRAINT "_pages_v_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq" ADD CONSTRAINT "_pages_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_features_features" ADD CONSTRAINT "_pages_v_blocks_features_features_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_features_features" ADD CONSTRAINT "_pages_v_blocks_features_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_features" ADD CONSTRAINT "_pages_v_blocks_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats_stats" ADD CONSTRAINT "_pages_v_blocks_stats_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats" ADD CONSTRAINT "_pages_v_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_logo_carousel_logos" ADD CONSTRAINT "_pages_v_blocks_logo_carousel_logos_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_logo_carousel_logos" ADD CONSTRAINT "_pages_v_blocks_logo_carousel_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_logo_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_logo_carousel" ADD CONSTRAINT "_pages_v_blocks_logo_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing_plans_features" ADD CONSTRAINT "_pages_v_blocks_pricing_plans_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_pricing_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing_plans_links" ADD CONSTRAINT "_pages_v_blocks_pricing_plans_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_pricing_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing_plans" ADD CONSTRAINT "_pages_v_blocks_pricing_plans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_pricing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing" ADD CONSTRAINT "_pages_v_blocks_pricing_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_split_links" ADD CONSTRAINT "_pages_v_blocks_hero_split_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero_split"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_split" ADD CONSTRAINT "_pages_v_blocks_hero_split_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_split" ADD CONSTRAINT "_pages_v_blocks_hero_split_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_how_it_works_steps" ADD CONSTRAINT "_pages_v_blocks_how_it_works_steps_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_how_it_works_steps" ADD CONSTRAINT "_pages_v_blocks_how_it_works_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_how_it_works"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_how_it_works" ADD CONSTRAINT "_pages_v_blocks_how_it_works_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_gallery_images" ADD CONSTRAINT "_pages_v_blocks_image_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_gallery_images" ADD CONSTRAINT "_pages_v_blocks_image_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_image_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_gallery" ADD CONSTRAINT "_pages_v_blocks_image_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_home_hero_links" ADD CONSTRAINT "_pages_v_blocks_home_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_home_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_home_hero" ADD CONSTRAINT "_pages_v_blocks_home_hero_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_home_hero" ADD CONSTRAINT "_pages_v_blocks_home_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_newsletter" ADD CONSTRAINT "_pages_v_blocks_newsletter_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team_grid_members" ADD CONSTRAINT "_pages_v_blocks_team_grid_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team_grid_members" ADD CONSTRAINT "_pages_v_blocks_team_grid_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_team_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team_grid" ADD CONSTRAINT "_pages_v_blocks_team_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_video_embed" ADD CONSTRAINT "_pages_v_blocks_video_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_map_embed_locations" ADD CONSTRAINT "_pages_v_blocks_map_embed_locations_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_map_embed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_map_embed" ADD CONSTRAINT "_pages_v_blocks_map_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_embed" ADD CONSTRAINT "_pages_v_blocks_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_timeline_events" ADD CONSTRAINT "_pages_v_blocks_timeline_events_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_timeline_events" ADD CONSTRAINT "_pages_v_blocks_timeline_events_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_timeline" ADD CONSTRAINT "_pages_v_blocks_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_banner" ADD CONSTRAINT "_pages_v_blocks_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_code" ADD CONSTRAINT "_pages_v_blocks_code_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_template_id_page_templates_id_fk" FOREIGN KEY ("version_template_id") REFERENCES "public"."page_templates"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_hero_media_id_media_id_fk" FOREIGN KEY ("version_hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_populated_authors" ADD CONSTRAINT "posts_populated_authors_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_populated_authors" ADD CONSTRAINT "posts_populated_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_version_populated_authors" ADD CONSTRAINT "_posts_v_version_populated_authors_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_version_populated_authors" ADD CONSTRAINT "_posts_v_version_populated_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_parent_id_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories_breadcrumbs" ADD CONSTRAINT "categories_breadcrumbs_doc_id_categories_id_fk" FOREIGN KEY ("doc_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "categories_breadcrumbs" ADD CONSTRAINT "categories_breadcrumbs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories" ADD CONSTRAINT "categories_parent_id_categories_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "media_texts" ADD CONSTRAINT "media_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_templates_hero_links" ADD CONSTRAINT "page_templates_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_templates_blocks_cta_links" ADD CONSTRAINT "page_templates_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_templates_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_templates_blocks_cta" ADD CONSTRAINT "page_templates_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_templates_blocks_content_columns" ADD CONSTRAINT "page_templates_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_templates_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_templates_blocks_content" ADD CONSTRAINT "page_templates_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_templates_blocks_media_block" ADD CONSTRAINT "page_templates_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_templates_blocks_media_block" ADD CONSTRAINT "page_templates_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_templates_blocks_archive" ADD CONSTRAINT "page_templates_blocks_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_templates_blocks_form_block" ADD CONSTRAINT "page_templates_blocks_form_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_templates_blocks_form_block" ADD CONSTRAINT "page_templates_blocks_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_templates_blocks_testimonials_testimonials" ADD CONSTRAINT "page_templates_blocks_testimonials_testimonials_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_templates_blocks_testimonials_testimonials" ADD CONSTRAINT "page_templates_blocks_testimonials_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_templates_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_templates_blocks_testimonials" ADD CONSTRAINT "page_templates_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_templates_blocks_faq_items" ADD CONSTRAINT "page_templates_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_templates_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_templates_blocks_faq" ADD CONSTRAINT "page_templates_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_templates_blocks_features_features" ADD CONSTRAINT "page_templates_blocks_features_features_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_templates_blocks_features_features" ADD CONSTRAINT "page_templates_blocks_features_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_templates_blocks_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_templates_blocks_features" ADD CONSTRAINT "page_templates_blocks_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_templates_blocks_stats_stats" ADD CONSTRAINT "page_templates_blocks_stats_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_templates_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_templates_blocks_stats" ADD CONSTRAINT "page_templates_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_templates_blocks_logo_carousel_logos" ADD CONSTRAINT "page_templates_blocks_logo_carousel_logos_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_templates_blocks_logo_carousel_logos" ADD CONSTRAINT "page_templates_blocks_logo_carousel_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_templates_blocks_logo_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_templates_blocks_logo_carousel" ADD CONSTRAINT "page_templates_blocks_logo_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_templates_blocks_pricing_plans_features" ADD CONSTRAINT "page_templates_blocks_pricing_plans_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_templates_blocks_pricing_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_templates_blocks_pricing_plans_links" ADD CONSTRAINT "page_templates_blocks_pricing_plans_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_templates_blocks_pricing_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_templates_blocks_pricing_plans" ADD CONSTRAINT "page_templates_blocks_pricing_plans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_templates_blocks_pricing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_templates_blocks_pricing" ADD CONSTRAINT "page_templates_blocks_pricing_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_templates_blocks_hero_split_links" ADD CONSTRAINT "page_templates_blocks_hero_split_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_templates_blocks_hero_split"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_templates_blocks_hero_split" ADD CONSTRAINT "page_templates_blocks_hero_split_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_templates_blocks_hero_split" ADD CONSTRAINT "page_templates_blocks_hero_split_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_templates_blocks_how_it_works_steps" ADD CONSTRAINT "page_templates_blocks_how_it_works_steps_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_templates_blocks_how_it_works_steps" ADD CONSTRAINT "page_templates_blocks_how_it_works_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_templates_blocks_how_it_works"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_templates_blocks_how_it_works" ADD CONSTRAINT "page_templates_blocks_how_it_works_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_templates_blocks_image_gallery_images" ADD CONSTRAINT "page_templates_blocks_image_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_templates_blocks_image_gallery_images" ADD CONSTRAINT "page_templates_blocks_image_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_templates_blocks_image_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_templates_blocks_image_gallery" ADD CONSTRAINT "page_templates_blocks_image_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_templates_blocks_home_hero_links" ADD CONSTRAINT "page_templates_blocks_home_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_templates_blocks_home_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_templates_blocks_home_hero" ADD CONSTRAINT "page_templates_blocks_home_hero_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_templates_blocks_home_hero" ADD CONSTRAINT "page_templates_blocks_home_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_templates_blocks_newsletter" ADD CONSTRAINT "page_templates_blocks_newsletter_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_templates_blocks_team_grid_members" ADD CONSTRAINT "page_templates_blocks_team_grid_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_templates_blocks_team_grid_members" ADD CONSTRAINT "page_templates_blocks_team_grid_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_templates_blocks_team_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_templates_blocks_team_grid" ADD CONSTRAINT "page_templates_blocks_team_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_templates_blocks_video_embed" ADD CONSTRAINT "page_templates_blocks_video_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_templates_blocks_map_embed_locations" ADD CONSTRAINT "page_templates_blocks_map_embed_locations_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_templates_blocks_map_embed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_templates_blocks_map_embed" ADD CONSTRAINT "page_templates_blocks_map_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_templates_blocks_embed" ADD CONSTRAINT "page_templates_blocks_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_templates_blocks_timeline_events" ADD CONSTRAINT "page_templates_blocks_timeline_events_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_templates_blocks_timeline_events" ADD CONSTRAINT "page_templates_blocks_timeline_events_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_templates_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_templates_blocks_timeline" ADD CONSTRAINT "page_templates_blocks_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_templates_blocks_banner" ADD CONSTRAINT "page_templates_blocks_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_templates_blocks_code" ADD CONSTRAINT "page_templates_blocks_code_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_templates" ADD CONSTRAINT "page_templates_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_templates" ADD CONSTRAINT "page_templates_hero_media_id_media_id_fk" FOREIGN KEY ("hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_templates_rels" ADD CONSTRAINT "page_templates_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."page_templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_templates_rels" ADD CONSTRAINT "page_templates_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_templates_rels" ADD CONSTRAINT "page_templates_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_templates_rels" ADD CONSTRAINT "page_templates_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "popups" ADD CONSTRAINT "popups_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_saved_addresses" ADD CONSTRAINT "users_saved_addresses_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users" ADD CONSTRAINT "users_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "activity_log" ADD CONSTRAINT "activity_log_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_checkbox" ADD CONSTRAINT "forms_blocks_checkbox_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_country" ADD CONSTRAINT "forms_blocks_country_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_email" ADD CONSTRAINT "forms_blocks_email_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_message" ADD CONSTRAINT "forms_blocks_message_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_number" ADD CONSTRAINT "forms_blocks_number_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_select_options" ADD CONSTRAINT "forms_blocks_select_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_select"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_select" ADD CONSTRAINT "forms_blocks_select_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_state" ADD CONSTRAINT "forms_blocks_state_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_text" ADD CONSTRAINT "forms_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_textarea" ADD CONSTRAINT "forms_blocks_textarea_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_emails" ADD CONSTRAINT "forms_emails_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_submissions_submission_data" ADD CONSTRAINT "form_submissions_submission_data_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_submissions" ADD CONSTRAINT "form_submissions_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "search_categories" ADD CONSTRAINT "search_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."search"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search" ADD CONSTRAINT "search_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."search"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_jobs_log" ADD CONSTRAINT "payload_jobs_log_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_page_templates_fk" FOREIGN KEY ("page_templates_id") REFERENCES "public"."page_templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_popups_fk" FOREIGN KEY ("popups_id") REFERENCES "public"."popups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_activity_log_fk" FOREIGN KEY ("activity_log_id") REFERENCES "public"."activity_log"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_redirects_fk" FOREIGN KEY ("redirects_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_forms_fk" FOREIGN KEY ("forms_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_form_submissions_fk" FOREIGN KEY ("form_submissions_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_search_fk" FOREIGN KEY ("search_id") REFERENCES "public"."search"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items_left" ADD CONSTRAINT "header_nav_items_left_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items_right" ADD CONSTRAINT "header_nav_items_right_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_column1_links" ADD CONSTRAINT "footer_column1_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_column2_links" ADD CONSTRAINT "footer_column2_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_column3_links" ADD CONSTRAINT "footer_column3_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_widget_channels" ADD CONSTRAINT "contact_widget_channels_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_widget"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_widget_faq_items" ADD CONSTRAINT "contact_widget_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_widget"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "newsletter_settings" ADD CONSTRAINT "newsletter_settings_popup_image_id_media_id_fk" FOREIGN KEY ("popup_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "seo_settings_sitemap_exclude_patterns" ADD CONSTRAINT "seo_settings_sitemap_exclude_patterns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."seo_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "seo_settings_noindex_patterns" ADD CONSTRAINT "seo_settings_noindex_patterns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."seo_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "seo_settings_llms_additional_sections" ADD CONSTRAINT "seo_settings_llms_additional_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."seo_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "seo_settings" ADD CONSTRAINT "seo_settings_default_og_image_id_media_id_fk" FOREIGN KEY ("default_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "seo_settings" ADD CONSTRAINT "seo_settings_schema_logo_id_media_id_fk" FOREIGN KEY ("schema_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "privacy_settings_policies" ADD CONSTRAINT "privacy_settings_policies_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."privacy_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "privacy_settings" ADD CONSTRAINT "privacy_settings_privacy_policy_page_id_pages_id_fk" FOREIGN KEY ("privacy_policy_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_appearance" ADD CONSTRAINT "site_appearance_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_appearance" ADD CONSTRAINT "site_appearance_logo_dark_id_media_id_fk" FOREIGN KEY ("logo_dark_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_appearance" ADD CONSTRAINT "site_appearance_favicon_id_media_id_fk" FOREIGN KEY ("favicon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "not_found_page_suggested_links" ADD CONSTRAINT "not_found_page_suggested_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."not_found_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "not_found_page" ADD CONSTRAINT "not_found_page_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "maintenance_mode" ADD CONSTRAINT "maintenance_mode_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cms_branding" ADD CONSTRAINT "cms_branding_admin_logo_id_media_id_fk" FOREIGN KEY ("admin_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cms_branding" ADD CONSTRAINT "cms_branding_admin_icon_id_media_id_fk" FOREIGN KEY ("admin_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_hero_links_order_idx" ON "pages_hero_links" USING btree ("_order");
  CREATE INDEX "pages_hero_links_parent_id_idx" ON "pages_hero_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_links_order_idx" ON "pages_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_links_parent_id_idx" ON "pages_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_order_idx" ON "pages_blocks_cta" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_parent_id_idx" ON "pages_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_path_idx" ON "pages_blocks_cta" USING btree ("_path");
  CREATE INDEX "pages_blocks_content_columns_order_idx" ON "pages_blocks_content_columns" USING btree ("_order");
  CREATE INDEX "pages_blocks_content_columns_parent_id_idx" ON "pages_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_content_order_idx" ON "pages_blocks_content" USING btree ("_order");
  CREATE INDEX "pages_blocks_content_parent_id_idx" ON "pages_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_content_path_idx" ON "pages_blocks_content" USING btree ("_path");
  CREATE INDEX "pages_blocks_media_block_order_idx" ON "pages_blocks_media_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_media_block_parent_id_idx" ON "pages_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_media_block_path_idx" ON "pages_blocks_media_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_media_block_media_idx" ON "pages_blocks_media_block" USING btree ("media_id");
  CREATE INDEX "pages_blocks_archive_order_idx" ON "pages_blocks_archive" USING btree ("_order");
  CREATE INDEX "pages_blocks_archive_parent_id_idx" ON "pages_blocks_archive" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_archive_path_idx" ON "pages_blocks_archive" USING btree ("_path");
  CREATE INDEX "pages_blocks_form_block_order_idx" ON "pages_blocks_form_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_form_block_parent_id_idx" ON "pages_blocks_form_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_form_block_path_idx" ON "pages_blocks_form_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_form_block_form_idx" ON "pages_blocks_form_block" USING btree ("form_id");
  CREATE INDEX "pages_blocks_testimonials_testimonials_order_idx" ON "pages_blocks_testimonials_testimonials" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonials_testimonials_parent_id_idx" ON "pages_blocks_testimonials_testimonials" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonials_testimonials_image_idx" ON "pages_blocks_testimonials_testimonials" USING btree ("image_id");
  CREATE INDEX "pages_blocks_testimonials_order_idx" ON "pages_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonials_parent_id_idx" ON "pages_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonials_path_idx" ON "pages_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "pages_blocks_faq_items_order_idx" ON "pages_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_items_parent_id_idx" ON "pages_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_order_idx" ON "pages_blocks_faq" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_parent_id_idx" ON "pages_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_path_idx" ON "pages_blocks_faq" USING btree ("_path");
  CREATE INDEX "pages_blocks_features_features_order_idx" ON "pages_blocks_features_features" USING btree ("_order");
  CREATE INDEX "pages_blocks_features_features_parent_id_idx" ON "pages_blocks_features_features" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_features_features_image_idx" ON "pages_blocks_features_features" USING btree ("image_id");
  CREATE INDEX "pages_blocks_features_order_idx" ON "pages_blocks_features" USING btree ("_order");
  CREATE INDEX "pages_blocks_features_parent_id_idx" ON "pages_blocks_features" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_features_path_idx" ON "pages_blocks_features" USING btree ("_path");
  CREATE INDEX "pages_blocks_stats_stats_order_idx" ON "pages_blocks_stats_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_stats_parent_id_idx" ON "pages_blocks_stats_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_order_idx" ON "pages_blocks_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_parent_id_idx" ON "pages_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_path_idx" ON "pages_blocks_stats" USING btree ("_path");
  CREATE INDEX "pages_blocks_logo_carousel_logos_order_idx" ON "pages_blocks_logo_carousel_logos" USING btree ("_order");
  CREATE INDEX "pages_blocks_logo_carousel_logos_parent_id_idx" ON "pages_blocks_logo_carousel_logos" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_logo_carousel_logos_logo_idx" ON "pages_blocks_logo_carousel_logos" USING btree ("logo_id");
  CREATE INDEX "pages_blocks_logo_carousel_order_idx" ON "pages_blocks_logo_carousel" USING btree ("_order");
  CREATE INDEX "pages_blocks_logo_carousel_parent_id_idx" ON "pages_blocks_logo_carousel" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_logo_carousel_path_idx" ON "pages_blocks_logo_carousel" USING btree ("_path");
  CREATE INDEX "pages_blocks_pricing_plans_features_order_idx" ON "pages_blocks_pricing_plans_features" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_plans_features_parent_id_idx" ON "pages_blocks_pricing_plans_features" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_plans_links_order_idx" ON "pages_blocks_pricing_plans_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_plans_links_parent_id_idx" ON "pages_blocks_pricing_plans_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_plans_order_idx" ON "pages_blocks_pricing_plans" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_plans_parent_id_idx" ON "pages_blocks_pricing_plans" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_order_idx" ON "pages_blocks_pricing" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_parent_id_idx" ON "pages_blocks_pricing" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_path_idx" ON "pages_blocks_pricing" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_split_links_order_idx" ON "pages_blocks_hero_split_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_split_links_parent_id_idx" ON "pages_blocks_hero_split_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_split_order_idx" ON "pages_blocks_hero_split" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_split_parent_id_idx" ON "pages_blocks_hero_split" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_split_path_idx" ON "pages_blocks_hero_split" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_split_image_idx" ON "pages_blocks_hero_split" USING btree ("image_id");
  CREATE INDEX "pages_blocks_how_it_works_steps_order_idx" ON "pages_blocks_how_it_works_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_how_it_works_steps_parent_id_idx" ON "pages_blocks_how_it_works_steps" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_how_it_works_steps_icon_idx" ON "pages_blocks_how_it_works_steps" USING btree ("icon_id");
  CREATE INDEX "pages_blocks_how_it_works_order_idx" ON "pages_blocks_how_it_works" USING btree ("_order");
  CREATE INDEX "pages_blocks_how_it_works_parent_id_idx" ON "pages_blocks_how_it_works" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_how_it_works_path_idx" ON "pages_blocks_how_it_works" USING btree ("_path");
  CREATE INDEX "pages_blocks_image_gallery_images_order_idx" ON "pages_blocks_image_gallery_images" USING btree ("_order");
  CREATE INDEX "pages_blocks_image_gallery_images_parent_id_idx" ON "pages_blocks_image_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_image_gallery_images_image_idx" ON "pages_blocks_image_gallery_images" USING btree ("image_id");
  CREATE INDEX "pages_blocks_image_gallery_order_idx" ON "pages_blocks_image_gallery" USING btree ("_order");
  CREATE INDEX "pages_blocks_image_gallery_parent_id_idx" ON "pages_blocks_image_gallery" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_image_gallery_path_idx" ON "pages_blocks_image_gallery" USING btree ("_path");
  CREATE INDEX "pages_blocks_home_hero_links_order_idx" ON "pages_blocks_home_hero_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_home_hero_links_parent_id_idx" ON "pages_blocks_home_hero_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_home_hero_order_idx" ON "pages_blocks_home_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_home_hero_parent_id_idx" ON "pages_blocks_home_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_home_hero_path_idx" ON "pages_blocks_home_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_home_hero_background_image_idx" ON "pages_blocks_home_hero" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_newsletter_order_idx" ON "pages_blocks_newsletter" USING btree ("_order");
  CREATE INDEX "pages_blocks_newsletter_parent_id_idx" ON "pages_blocks_newsletter" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_newsletter_path_idx" ON "pages_blocks_newsletter" USING btree ("_path");
  CREATE INDEX "pages_blocks_team_grid_members_order_idx" ON "pages_blocks_team_grid_members" USING btree ("_order");
  CREATE INDEX "pages_blocks_team_grid_members_parent_id_idx" ON "pages_blocks_team_grid_members" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_team_grid_members_photo_idx" ON "pages_blocks_team_grid_members" USING btree ("photo_id");
  CREATE INDEX "pages_blocks_team_grid_order_idx" ON "pages_blocks_team_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_team_grid_parent_id_idx" ON "pages_blocks_team_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_team_grid_path_idx" ON "pages_blocks_team_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_video_embed_order_idx" ON "pages_blocks_video_embed" USING btree ("_order");
  CREATE INDEX "pages_blocks_video_embed_parent_id_idx" ON "pages_blocks_video_embed" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_video_embed_path_idx" ON "pages_blocks_video_embed" USING btree ("_path");
  CREATE INDEX "pages_blocks_map_embed_locations_order_idx" ON "pages_blocks_map_embed_locations" USING btree ("_order");
  CREATE INDEX "pages_blocks_map_embed_locations_parent_id_idx" ON "pages_blocks_map_embed_locations" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_map_embed_order_idx" ON "pages_blocks_map_embed" USING btree ("_order");
  CREATE INDEX "pages_blocks_map_embed_parent_id_idx" ON "pages_blocks_map_embed" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_map_embed_path_idx" ON "pages_blocks_map_embed" USING btree ("_path");
  CREATE INDEX "pages_blocks_embed_order_idx" ON "pages_blocks_embed" USING btree ("_order");
  CREATE INDEX "pages_blocks_embed_parent_id_idx" ON "pages_blocks_embed" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_embed_path_idx" ON "pages_blocks_embed" USING btree ("_path");
  CREATE INDEX "pages_blocks_timeline_events_order_idx" ON "pages_blocks_timeline_events" USING btree ("_order");
  CREATE INDEX "pages_blocks_timeline_events_parent_id_idx" ON "pages_blocks_timeline_events" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_timeline_events_image_idx" ON "pages_blocks_timeline_events" USING btree ("image_id");
  CREATE INDEX "pages_blocks_timeline_order_idx" ON "pages_blocks_timeline" USING btree ("_order");
  CREATE INDEX "pages_blocks_timeline_parent_id_idx" ON "pages_blocks_timeline" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_timeline_path_idx" ON "pages_blocks_timeline" USING btree ("_path");
  CREATE INDEX "pages_blocks_banner_order_idx" ON "pages_blocks_banner" USING btree ("_order");
  CREATE INDEX "pages_blocks_banner_parent_id_idx" ON "pages_blocks_banner" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_banner_path_idx" ON "pages_blocks_banner" USING btree ("_path");
  CREATE INDEX "pages_blocks_code_order_idx" ON "pages_blocks_code" USING btree ("_order");
  CREATE INDEX "pages_blocks_code_parent_id_idx" ON "pages_blocks_code" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_code_path_idx" ON "pages_blocks_code" USING btree ("_path");
  CREATE INDEX "pages_template_idx" ON "pages" USING btree ("template_id");
  CREATE INDEX "pages_hero_hero_media_idx" ON "pages" USING btree ("hero_media_id");
  CREATE INDEX "pages_meta_meta_image_idx" ON "pages" USING btree ("meta_image_id");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_pages_id_idx" ON "pages_rels" USING btree ("pages_id");
  CREATE INDEX "pages_rels_posts_id_idx" ON "pages_rels" USING btree ("posts_id");
  CREATE INDEX "pages_rels_categories_id_idx" ON "pages_rels" USING btree ("categories_id");
  CREATE INDEX "_pages_v_version_hero_links_order_idx" ON "_pages_v_version_hero_links" USING btree ("_order");
  CREATE INDEX "_pages_v_version_hero_links_parent_id_idx" ON "_pages_v_version_hero_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_links_order_idx" ON "_pages_v_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_links_parent_id_idx" ON "_pages_v_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_order_idx" ON "_pages_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_parent_id_idx" ON "_pages_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_path_idx" ON "_pages_v_blocks_cta" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_content_columns_order_idx" ON "_pages_v_blocks_content_columns" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_content_columns_parent_id_idx" ON "_pages_v_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_content_order_idx" ON "_pages_v_blocks_content" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_content_parent_id_idx" ON "_pages_v_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_content_path_idx" ON "_pages_v_blocks_content" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_media_block_order_idx" ON "_pages_v_blocks_media_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_media_block_parent_id_idx" ON "_pages_v_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_media_block_path_idx" ON "_pages_v_blocks_media_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_media_block_media_idx" ON "_pages_v_blocks_media_block" USING btree ("media_id");
  CREATE INDEX "_pages_v_blocks_archive_order_idx" ON "_pages_v_blocks_archive" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_archive_parent_id_idx" ON "_pages_v_blocks_archive" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_archive_path_idx" ON "_pages_v_blocks_archive" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_form_block_order_idx" ON "_pages_v_blocks_form_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_form_block_parent_id_idx" ON "_pages_v_blocks_form_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_form_block_path_idx" ON "_pages_v_blocks_form_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_form_block_form_idx" ON "_pages_v_blocks_form_block" USING btree ("form_id");
  CREATE INDEX "_pages_v_blocks_testimonials_testimonials_order_idx" ON "_pages_v_blocks_testimonials_testimonials" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_testimonials_testimonials_parent_id_idx" ON "_pages_v_blocks_testimonials_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_testimonials_image_idx" ON "_pages_v_blocks_testimonials_testimonials" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_testimonials_order_idx" ON "_pages_v_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_testimonials_parent_id_idx" ON "_pages_v_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_path_idx" ON "_pages_v_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_faq_items_order_idx" ON "_pages_v_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_items_parent_id_idx" ON "_pages_v_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_order_idx" ON "_pages_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_parent_id_idx" ON "_pages_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_path_idx" ON "_pages_v_blocks_faq" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_features_features_order_idx" ON "_pages_v_blocks_features_features" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_features_features_parent_id_idx" ON "_pages_v_blocks_features_features" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_features_features_image_idx" ON "_pages_v_blocks_features_features" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_features_order_idx" ON "_pages_v_blocks_features" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_features_parent_id_idx" ON "_pages_v_blocks_features" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_features_path_idx" ON "_pages_v_blocks_features" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_stats_stats_order_idx" ON "_pages_v_blocks_stats_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_stats_parent_id_idx" ON "_pages_v_blocks_stats_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_order_idx" ON "_pages_v_blocks_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_parent_id_idx" ON "_pages_v_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_path_idx" ON "_pages_v_blocks_stats" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_logo_carousel_logos_order_idx" ON "_pages_v_blocks_logo_carousel_logos" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_logo_carousel_logos_parent_id_idx" ON "_pages_v_blocks_logo_carousel_logos" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_logo_carousel_logos_logo_idx" ON "_pages_v_blocks_logo_carousel_logos" USING btree ("logo_id");
  CREATE INDEX "_pages_v_blocks_logo_carousel_order_idx" ON "_pages_v_blocks_logo_carousel" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_logo_carousel_parent_id_idx" ON "_pages_v_blocks_logo_carousel" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_logo_carousel_path_idx" ON "_pages_v_blocks_logo_carousel" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_pricing_plans_features_order_idx" ON "_pages_v_blocks_pricing_plans_features" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pricing_plans_features_parent_id_idx" ON "_pages_v_blocks_pricing_plans_features" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pricing_plans_links_order_idx" ON "_pages_v_blocks_pricing_plans_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pricing_plans_links_parent_id_idx" ON "_pages_v_blocks_pricing_plans_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pricing_plans_order_idx" ON "_pages_v_blocks_pricing_plans" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pricing_plans_parent_id_idx" ON "_pages_v_blocks_pricing_plans" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pricing_order_idx" ON "_pages_v_blocks_pricing" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pricing_parent_id_idx" ON "_pages_v_blocks_pricing" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pricing_path_idx" ON "_pages_v_blocks_pricing" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_split_links_order_idx" ON "_pages_v_blocks_hero_split_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_split_links_parent_id_idx" ON "_pages_v_blocks_hero_split_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_split_order_idx" ON "_pages_v_blocks_hero_split" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_split_parent_id_idx" ON "_pages_v_blocks_hero_split" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_split_path_idx" ON "_pages_v_blocks_hero_split" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_split_image_idx" ON "_pages_v_blocks_hero_split" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_how_it_works_steps_order_idx" ON "_pages_v_blocks_how_it_works_steps" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_how_it_works_steps_parent_id_idx" ON "_pages_v_blocks_how_it_works_steps" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_how_it_works_steps_icon_idx" ON "_pages_v_blocks_how_it_works_steps" USING btree ("icon_id");
  CREATE INDEX "_pages_v_blocks_how_it_works_order_idx" ON "_pages_v_blocks_how_it_works" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_how_it_works_parent_id_idx" ON "_pages_v_blocks_how_it_works" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_how_it_works_path_idx" ON "_pages_v_blocks_how_it_works" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_image_gallery_images_order_idx" ON "_pages_v_blocks_image_gallery_images" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_image_gallery_images_parent_id_idx" ON "_pages_v_blocks_image_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_image_gallery_images_image_idx" ON "_pages_v_blocks_image_gallery_images" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_image_gallery_order_idx" ON "_pages_v_blocks_image_gallery" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_image_gallery_parent_id_idx" ON "_pages_v_blocks_image_gallery" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_image_gallery_path_idx" ON "_pages_v_blocks_image_gallery" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_home_hero_links_order_idx" ON "_pages_v_blocks_home_hero_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_home_hero_links_parent_id_idx" ON "_pages_v_blocks_home_hero_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_home_hero_order_idx" ON "_pages_v_blocks_home_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_home_hero_parent_id_idx" ON "_pages_v_blocks_home_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_home_hero_path_idx" ON "_pages_v_blocks_home_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_home_hero_background_image_idx" ON "_pages_v_blocks_home_hero" USING btree ("background_image_id");
  CREATE INDEX "_pages_v_blocks_newsletter_order_idx" ON "_pages_v_blocks_newsletter" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_newsletter_parent_id_idx" ON "_pages_v_blocks_newsletter" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_newsletter_path_idx" ON "_pages_v_blocks_newsletter" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_team_grid_members_order_idx" ON "_pages_v_blocks_team_grid_members" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_team_grid_members_parent_id_idx" ON "_pages_v_blocks_team_grid_members" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_team_grid_members_photo_idx" ON "_pages_v_blocks_team_grid_members" USING btree ("photo_id");
  CREATE INDEX "_pages_v_blocks_team_grid_order_idx" ON "_pages_v_blocks_team_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_team_grid_parent_id_idx" ON "_pages_v_blocks_team_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_team_grid_path_idx" ON "_pages_v_blocks_team_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_video_embed_order_idx" ON "_pages_v_blocks_video_embed" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_video_embed_parent_id_idx" ON "_pages_v_blocks_video_embed" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_video_embed_path_idx" ON "_pages_v_blocks_video_embed" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_map_embed_locations_order_idx" ON "_pages_v_blocks_map_embed_locations" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_map_embed_locations_parent_id_idx" ON "_pages_v_blocks_map_embed_locations" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_map_embed_order_idx" ON "_pages_v_blocks_map_embed" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_map_embed_parent_id_idx" ON "_pages_v_blocks_map_embed" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_map_embed_path_idx" ON "_pages_v_blocks_map_embed" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_embed_order_idx" ON "_pages_v_blocks_embed" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_embed_parent_id_idx" ON "_pages_v_blocks_embed" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_embed_path_idx" ON "_pages_v_blocks_embed" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_timeline_events_order_idx" ON "_pages_v_blocks_timeline_events" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_timeline_events_parent_id_idx" ON "_pages_v_blocks_timeline_events" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_timeline_events_image_idx" ON "_pages_v_blocks_timeline_events" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_timeline_order_idx" ON "_pages_v_blocks_timeline" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_timeline_parent_id_idx" ON "_pages_v_blocks_timeline" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_timeline_path_idx" ON "_pages_v_blocks_timeline" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_banner_order_idx" ON "_pages_v_blocks_banner" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_banner_parent_id_idx" ON "_pages_v_blocks_banner" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_banner_path_idx" ON "_pages_v_blocks_banner" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_code_order_idx" ON "_pages_v_blocks_code" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_code_parent_id_idx" ON "_pages_v_blocks_code" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_code_path_idx" ON "_pages_v_blocks_code" USING btree ("_path");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_template_idx" ON "_pages_v" USING btree ("version_template_id");
  CREATE INDEX "_pages_v_version_hero_version_hero_media_idx" ON "_pages_v" USING btree ("version_hero_media_id");
  CREATE INDEX "_pages_v_version_meta_version_meta_image_idx" ON "_pages_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "_pages_v_autosave_idx" ON "_pages_v" USING btree ("autosave");
  CREATE INDEX "_pages_v_rels_order_idx" ON "_pages_v_rels" USING btree ("order");
  CREATE INDEX "_pages_v_rels_parent_idx" ON "_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX "_pages_v_rels_path_idx" ON "_pages_v_rels" USING btree ("path");
  CREATE INDEX "_pages_v_rels_pages_id_idx" ON "_pages_v_rels" USING btree ("pages_id");
  CREATE INDEX "_pages_v_rels_posts_id_idx" ON "_pages_v_rels" USING btree ("posts_id");
  CREATE INDEX "_pages_v_rels_categories_id_idx" ON "_pages_v_rels" USING btree ("categories_id");
  CREATE INDEX "posts_populated_authors_order_idx" ON "posts_populated_authors" USING btree ("_order");
  CREATE INDEX "posts_populated_authors_parent_id_idx" ON "posts_populated_authors" USING btree ("_parent_id");
  CREATE INDEX "posts_populated_authors_avatar_idx" ON "posts_populated_authors" USING btree ("avatar_id");
  CREATE INDEX "posts_hero_image_idx" ON "posts" USING btree ("hero_image_id");
  CREATE INDEX "posts_meta_meta_image_idx" ON "posts" USING btree ("meta_image_id");
  CREATE UNIQUE INDEX "posts_slug_idx" ON "posts" USING btree ("slug");
  CREATE INDEX "posts_updated_at_idx" ON "posts" USING btree ("updated_at");
  CREATE INDEX "posts_created_at_idx" ON "posts" USING btree ("created_at");
  CREATE INDEX "posts__status_idx" ON "posts" USING btree ("_status");
  CREATE INDEX "posts_rels_order_idx" ON "posts_rels" USING btree ("order");
  CREATE INDEX "posts_rels_parent_idx" ON "posts_rels" USING btree ("parent_id");
  CREATE INDEX "posts_rels_path_idx" ON "posts_rels" USING btree ("path");
  CREATE INDEX "posts_rels_posts_id_idx" ON "posts_rels" USING btree ("posts_id");
  CREATE INDEX "posts_rels_categories_id_idx" ON "posts_rels" USING btree ("categories_id");
  CREATE INDEX "posts_rels_users_id_idx" ON "posts_rels" USING btree ("users_id");
  CREATE INDEX "_posts_v_version_populated_authors_order_idx" ON "_posts_v_version_populated_authors" USING btree ("_order");
  CREATE INDEX "_posts_v_version_populated_authors_parent_id_idx" ON "_posts_v_version_populated_authors" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_version_populated_authors_avatar_idx" ON "_posts_v_version_populated_authors" USING btree ("avatar_id");
  CREATE INDEX "_posts_v_parent_idx" ON "_posts_v" USING btree ("parent_id");
  CREATE INDEX "_posts_v_version_version_hero_image_idx" ON "_posts_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_posts_v_version_meta_version_meta_image_idx" ON "_posts_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_posts_v_version_version_slug_idx" ON "_posts_v" USING btree ("version_slug");
  CREATE INDEX "_posts_v_version_version_updated_at_idx" ON "_posts_v" USING btree ("version_updated_at");
  CREATE INDEX "_posts_v_version_version_created_at_idx" ON "_posts_v" USING btree ("version_created_at");
  CREATE INDEX "_posts_v_version_version__status_idx" ON "_posts_v" USING btree ("version__status");
  CREATE INDEX "_posts_v_created_at_idx" ON "_posts_v" USING btree ("created_at");
  CREATE INDEX "_posts_v_updated_at_idx" ON "_posts_v" USING btree ("updated_at");
  CREATE INDEX "_posts_v_latest_idx" ON "_posts_v" USING btree ("latest");
  CREATE INDEX "_posts_v_autosave_idx" ON "_posts_v" USING btree ("autosave");
  CREATE INDEX "_posts_v_rels_order_idx" ON "_posts_v_rels" USING btree ("order");
  CREATE INDEX "_posts_v_rels_parent_idx" ON "_posts_v_rels" USING btree ("parent_id");
  CREATE INDEX "_posts_v_rels_path_idx" ON "_posts_v_rels" USING btree ("path");
  CREATE INDEX "_posts_v_rels_posts_id_idx" ON "_posts_v_rels" USING btree ("posts_id");
  CREATE INDEX "_posts_v_rels_categories_id_idx" ON "_posts_v_rels" USING btree ("categories_id");
  CREATE INDEX "_posts_v_rels_users_id_idx" ON "_posts_v_rels" USING btree ("users_id");
  CREATE INDEX "categories_breadcrumbs_order_idx" ON "categories_breadcrumbs" USING btree ("_order");
  CREATE INDEX "categories_breadcrumbs_parent_id_idx" ON "categories_breadcrumbs" USING btree ("_parent_id");
  CREATE INDEX "categories_breadcrumbs_doc_idx" ON "categories_breadcrumbs" USING btree ("doc_id");
  CREATE UNIQUE INDEX "categories_slug_idx" ON "categories" USING btree ("slug");
  CREATE INDEX "categories_parent_idx" ON "categories" USING btree ("parent_id");
  CREATE INDEX "categories_updated_at_idx" ON "categories" USING btree ("updated_at");
  CREATE INDEX "categories_created_at_idx" ON "categories" USING btree ("created_at");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_square_sizes_square_filename_idx" ON "media" USING btree ("sizes_square_filename");
  CREATE INDEX "media_sizes_small_sizes_small_filename_idx" ON "media" USING btree ("sizes_small_filename");
  CREATE INDEX "media_sizes_medium_sizes_medium_filename_idx" ON "media" USING btree ("sizes_medium_filename");
  CREATE INDEX "media_sizes_large_sizes_large_filename_idx" ON "media" USING btree ("sizes_large_filename");
  CREATE INDEX "media_sizes_xlarge_sizes_xlarge_filename_idx" ON "media" USING btree ("sizes_xlarge_filename");
  CREATE INDEX "media_sizes_og_sizes_og_filename_idx" ON "media" USING btree ("sizes_og_filename");
  CREATE INDEX "media_texts_order_parent" ON "media_texts" USING btree ("order","parent_id");
  CREATE INDEX "page_templates_hero_links_order_idx" ON "page_templates_hero_links" USING btree ("_order");
  CREATE INDEX "page_templates_hero_links_parent_id_idx" ON "page_templates_hero_links" USING btree ("_parent_id");
  CREATE INDEX "page_templates_blocks_cta_links_order_idx" ON "page_templates_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "page_templates_blocks_cta_links_parent_id_idx" ON "page_templates_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "page_templates_blocks_cta_order_idx" ON "page_templates_blocks_cta" USING btree ("_order");
  CREATE INDEX "page_templates_blocks_cta_parent_id_idx" ON "page_templates_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "page_templates_blocks_cta_path_idx" ON "page_templates_blocks_cta" USING btree ("_path");
  CREATE INDEX "page_templates_blocks_content_columns_order_idx" ON "page_templates_blocks_content_columns" USING btree ("_order");
  CREATE INDEX "page_templates_blocks_content_columns_parent_id_idx" ON "page_templates_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX "page_templates_blocks_content_order_idx" ON "page_templates_blocks_content" USING btree ("_order");
  CREATE INDEX "page_templates_blocks_content_parent_id_idx" ON "page_templates_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "page_templates_blocks_content_path_idx" ON "page_templates_blocks_content" USING btree ("_path");
  CREATE INDEX "page_templates_blocks_media_block_order_idx" ON "page_templates_blocks_media_block" USING btree ("_order");
  CREATE INDEX "page_templates_blocks_media_block_parent_id_idx" ON "page_templates_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX "page_templates_blocks_media_block_path_idx" ON "page_templates_blocks_media_block" USING btree ("_path");
  CREATE INDEX "page_templates_blocks_media_block_media_idx" ON "page_templates_blocks_media_block" USING btree ("media_id");
  CREATE INDEX "page_templates_blocks_archive_order_idx" ON "page_templates_blocks_archive" USING btree ("_order");
  CREATE INDEX "page_templates_blocks_archive_parent_id_idx" ON "page_templates_blocks_archive" USING btree ("_parent_id");
  CREATE INDEX "page_templates_blocks_archive_path_idx" ON "page_templates_blocks_archive" USING btree ("_path");
  CREATE INDEX "page_templates_blocks_form_block_order_idx" ON "page_templates_blocks_form_block" USING btree ("_order");
  CREATE INDEX "page_templates_blocks_form_block_parent_id_idx" ON "page_templates_blocks_form_block" USING btree ("_parent_id");
  CREATE INDEX "page_templates_blocks_form_block_path_idx" ON "page_templates_blocks_form_block" USING btree ("_path");
  CREATE INDEX "page_templates_blocks_form_block_form_idx" ON "page_templates_blocks_form_block" USING btree ("form_id");
  CREATE INDEX "page_templates_blocks_testimonials_testimonials_order_idx" ON "page_templates_blocks_testimonials_testimonials" USING btree ("_order");
  CREATE INDEX "page_templates_blocks_testimonials_testimonials_parent_id_idx" ON "page_templates_blocks_testimonials_testimonials" USING btree ("_parent_id");
  CREATE INDEX "page_templates_blocks_testimonials_testimonials_image_idx" ON "page_templates_blocks_testimonials_testimonials" USING btree ("image_id");
  CREATE INDEX "page_templates_blocks_testimonials_order_idx" ON "page_templates_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "page_templates_blocks_testimonials_parent_id_idx" ON "page_templates_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "page_templates_blocks_testimonials_path_idx" ON "page_templates_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "page_templates_blocks_faq_items_order_idx" ON "page_templates_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "page_templates_blocks_faq_items_parent_id_idx" ON "page_templates_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "page_templates_blocks_faq_order_idx" ON "page_templates_blocks_faq" USING btree ("_order");
  CREATE INDEX "page_templates_blocks_faq_parent_id_idx" ON "page_templates_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "page_templates_blocks_faq_path_idx" ON "page_templates_blocks_faq" USING btree ("_path");
  CREATE INDEX "page_templates_blocks_features_features_order_idx" ON "page_templates_blocks_features_features" USING btree ("_order");
  CREATE INDEX "page_templates_blocks_features_features_parent_id_idx" ON "page_templates_blocks_features_features" USING btree ("_parent_id");
  CREATE INDEX "page_templates_blocks_features_features_image_idx" ON "page_templates_blocks_features_features" USING btree ("image_id");
  CREATE INDEX "page_templates_blocks_features_order_idx" ON "page_templates_blocks_features" USING btree ("_order");
  CREATE INDEX "page_templates_blocks_features_parent_id_idx" ON "page_templates_blocks_features" USING btree ("_parent_id");
  CREATE INDEX "page_templates_blocks_features_path_idx" ON "page_templates_blocks_features" USING btree ("_path");
  CREATE INDEX "page_templates_blocks_stats_stats_order_idx" ON "page_templates_blocks_stats_stats" USING btree ("_order");
  CREATE INDEX "page_templates_blocks_stats_stats_parent_id_idx" ON "page_templates_blocks_stats_stats" USING btree ("_parent_id");
  CREATE INDEX "page_templates_blocks_stats_order_idx" ON "page_templates_blocks_stats" USING btree ("_order");
  CREATE INDEX "page_templates_blocks_stats_parent_id_idx" ON "page_templates_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "page_templates_blocks_stats_path_idx" ON "page_templates_blocks_stats" USING btree ("_path");
  CREATE INDEX "page_templates_blocks_logo_carousel_logos_order_idx" ON "page_templates_blocks_logo_carousel_logos" USING btree ("_order");
  CREATE INDEX "page_templates_blocks_logo_carousel_logos_parent_id_idx" ON "page_templates_blocks_logo_carousel_logos" USING btree ("_parent_id");
  CREATE INDEX "page_templates_blocks_logo_carousel_logos_logo_idx" ON "page_templates_blocks_logo_carousel_logos" USING btree ("logo_id");
  CREATE INDEX "page_templates_blocks_logo_carousel_order_idx" ON "page_templates_blocks_logo_carousel" USING btree ("_order");
  CREATE INDEX "page_templates_blocks_logo_carousel_parent_id_idx" ON "page_templates_blocks_logo_carousel" USING btree ("_parent_id");
  CREATE INDEX "page_templates_blocks_logo_carousel_path_idx" ON "page_templates_blocks_logo_carousel" USING btree ("_path");
  CREATE INDEX "page_templates_blocks_pricing_plans_features_order_idx" ON "page_templates_blocks_pricing_plans_features" USING btree ("_order");
  CREATE INDEX "page_templates_blocks_pricing_plans_features_parent_id_idx" ON "page_templates_blocks_pricing_plans_features" USING btree ("_parent_id");
  CREATE INDEX "page_templates_blocks_pricing_plans_links_order_idx" ON "page_templates_blocks_pricing_plans_links" USING btree ("_order");
  CREATE INDEX "page_templates_blocks_pricing_plans_links_parent_id_idx" ON "page_templates_blocks_pricing_plans_links" USING btree ("_parent_id");
  CREATE INDEX "page_templates_blocks_pricing_plans_order_idx" ON "page_templates_blocks_pricing_plans" USING btree ("_order");
  CREATE INDEX "page_templates_blocks_pricing_plans_parent_id_idx" ON "page_templates_blocks_pricing_plans" USING btree ("_parent_id");
  CREATE INDEX "page_templates_blocks_pricing_order_idx" ON "page_templates_blocks_pricing" USING btree ("_order");
  CREATE INDEX "page_templates_blocks_pricing_parent_id_idx" ON "page_templates_blocks_pricing" USING btree ("_parent_id");
  CREATE INDEX "page_templates_blocks_pricing_path_idx" ON "page_templates_blocks_pricing" USING btree ("_path");
  CREATE INDEX "page_templates_blocks_hero_split_links_order_idx" ON "page_templates_blocks_hero_split_links" USING btree ("_order");
  CREATE INDEX "page_templates_blocks_hero_split_links_parent_id_idx" ON "page_templates_blocks_hero_split_links" USING btree ("_parent_id");
  CREATE INDEX "page_templates_blocks_hero_split_order_idx" ON "page_templates_blocks_hero_split" USING btree ("_order");
  CREATE INDEX "page_templates_blocks_hero_split_parent_id_idx" ON "page_templates_blocks_hero_split" USING btree ("_parent_id");
  CREATE INDEX "page_templates_blocks_hero_split_path_idx" ON "page_templates_blocks_hero_split" USING btree ("_path");
  CREATE INDEX "page_templates_blocks_hero_split_image_idx" ON "page_templates_blocks_hero_split" USING btree ("image_id");
  CREATE INDEX "page_templates_blocks_how_it_works_steps_order_idx" ON "page_templates_blocks_how_it_works_steps" USING btree ("_order");
  CREATE INDEX "page_templates_blocks_how_it_works_steps_parent_id_idx" ON "page_templates_blocks_how_it_works_steps" USING btree ("_parent_id");
  CREATE INDEX "page_templates_blocks_how_it_works_steps_icon_idx" ON "page_templates_blocks_how_it_works_steps" USING btree ("icon_id");
  CREATE INDEX "page_templates_blocks_how_it_works_order_idx" ON "page_templates_blocks_how_it_works" USING btree ("_order");
  CREATE INDEX "page_templates_blocks_how_it_works_parent_id_idx" ON "page_templates_blocks_how_it_works" USING btree ("_parent_id");
  CREATE INDEX "page_templates_blocks_how_it_works_path_idx" ON "page_templates_blocks_how_it_works" USING btree ("_path");
  CREATE INDEX "page_templates_blocks_image_gallery_images_order_idx" ON "page_templates_blocks_image_gallery_images" USING btree ("_order");
  CREATE INDEX "page_templates_blocks_image_gallery_images_parent_id_idx" ON "page_templates_blocks_image_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "page_templates_blocks_image_gallery_images_image_idx" ON "page_templates_blocks_image_gallery_images" USING btree ("image_id");
  CREATE INDEX "page_templates_blocks_image_gallery_order_idx" ON "page_templates_blocks_image_gallery" USING btree ("_order");
  CREATE INDEX "page_templates_blocks_image_gallery_parent_id_idx" ON "page_templates_blocks_image_gallery" USING btree ("_parent_id");
  CREATE INDEX "page_templates_blocks_image_gallery_path_idx" ON "page_templates_blocks_image_gallery" USING btree ("_path");
  CREATE INDEX "page_templates_blocks_home_hero_links_order_idx" ON "page_templates_blocks_home_hero_links" USING btree ("_order");
  CREATE INDEX "page_templates_blocks_home_hero_links_parent_id_idx" ON "page_templates_blocks_home_hero_links" USING btree ("_parent_id");
  CREATE INDEX "page_templates_blocks_home_hero_order_idx" ON "page_templates_blocks_home_hero" USING btree ("_order");
  CREATE INDEX "page_templates_blocks_home_hero_parent_id_idx" ON "page_templates_blocks_home_hero" USING btree ("_parent_id");
  CREATE INDEX "page_templates_blocks_home_hero_path_idx" ON "page_templates_blocks_home_hero" USING btree ("_path");
  CREATE INDEX "page_templates_blocks_home_hero_background_image_idx" ON "page_templates_blocks_home_hero" USING btree ("background_image_id");
  CREATE INDEX "page_templates_blocks_newsletter_order_idx" ON "page_templates_blocks_newsletter" USING btree ("_order");
  CREATE INDEX "page_templates_blocks_newsletter_parent_id_idx" ON "page_templates_blocks_newsletter" USING btree ("_parent_id");
  CREATE INDEX "page_templates_blocks_newsletter_path_idx" ON "page_templates_blocks_newsletter" USING btree ("_path");
  CREATE INDEX "page_templates_blocks_team_grid_members_order_idx" ON "page_templates_blocks_team_grid_members" USING btree ("_order");
  CREATE INDEX "page_templates_blocks_team_grid_members_parent_id_idx" ON "page_templates_blocks_team_grid_members" USING btree ("_parent_id");
  CREATE INDEX "page_templates_blocks_team_grid_members_photo_idx" ON "page_templates_blocks_team_grid_members" USING btree ("photo_id");
  CREATE INDEX "page_templates_blocks_team_grid_order_idx" ON "page_templates_blocks_team_grid" USING btree ("_order");
  CREATE INDEX "page_templates_blocks_team_grid_parent_id_idx" ON "page_templates_blocks_team_grid" USING btree ("_parent_id");
  CREATE INDEX "page_templates_blocks_team_grid_path_idx" ON "page_templates_blocks_team_grid" USING btree ("_path");
  CREATE INDEX "page_templates_blocks_video_embed_order_idx" ON "page_templates_blocks_video_embed" USING btree ("_order");
  CREATE INDEX "page_templates_blocks_video_embed_parent_id_idx" ON "page_templates_blocks_video_embed" USING btree ("_parent_id");
  CREATE INDEX "page_templates_blocks_video_embed_path_idx" ON "page_templates_blocks_video_embed" USING btree ("_path");
  CREATE INDEX "page_templates_blocks_map_embed_locations_order_idx" ON "page_templates_blocks_map_embed_locations" USING btree ("_order");
  CREATE INDEX "page_templates_blocks_map_embed_locations_parent_id_idx" ON "page_templates_blocks_map_embed_locations" USING btree ("_parent_id");
  CREATE INDEX "page_templates_blocks_map_embed_order_idx" ON "page_templates_blocks_map_embed" USING btree ("_order");
  CREATE INDEX "page_templates_blocks_map_embed_parent_id_idx" ON "page_templates_blocks_map_embed" USING btree ("_parent_id");
  CREATE INDEX "page_templates_blocks_map_embed_path_idx" ON "page_templates_blocks_map_embed" USING btree ("_path");
  CREATE INDEX "page_templates_blocks_embed_order_idx" ON "page_templates_blocks_embed" USING btree ("_order");
  CREATE INDEX "page_templates_blocks_embed_parent_id_idx" ON "page_templates_blocks_embed" USING btree ("_parent_id");
  CREATE INDEX "page_templates_blocks_embed_path_idx" ON "page_templates_blocks_embed" USING btree ("_path");
  CREATE INDEX "page_templates_blocks_timeline_events_order_idx" ON "page_templates_blocks_timeline_events" USING btree ("_order");
  CREATE INDEX "page_templates_blocks_timeline_events_parent_id_idx" ON "page_templates_blocks_timeline_events" USING btree ("_parent_id");
  CREATE INDEX "page_templates_blocks_timeline_events_image_idx" ON "page_templates_blocks_timeline_events" USING btree ("image_id");
  CREATE INDEX "page_templates_blocks_timeline_order_idx" ON "page_templates_blocks_timeline" USING btree ("_order");
  CREATE INDEX "page_templates_blocks_timeline_parent_id_idx" ON "page_templates_blocks_timeline" USING btree ("_parent_id");
  CREATE INDEX "page_templates_blocks_timeline_path_idx" ON "page_templates_blocks_timeline" USING btree ("_path");
  CREATE INDEX "page_templates_blocks_banner_order_idx" ON "page_templates_blocks_banner" USING btree ("_order");
  CREATE INDEX "page_templates_blocks_banner_parent_id_idx" ON "page_templates_blocks_banner" USING btree ("_parent_id");
  CREATE INDEX "page_templates_blocks_banner_path_idx" ON "page_templates_blocks_banner" USING btree ("_path");
  CREATE INDEX "page_templates_blocks_code_order_idx" ON "page_templates_blocks_code" USING btree ("_order");
  CREATE INDEX "page_templates_blocks_code_parent_id_idx" ON "page_templates_blocks_code" USING btree ("_parent_id");
  CREATE INDEX "page_templates_blocks_code_path_idx" ON "page_templates_blocks_code" USING btree ("_path");
  CREATE INDEX "page_templates_thumbnail_idx" ON "page_templates" USING btree ("thumbnail_id");
  CREATE INDEX "page_templates_hero_hero_media_idx" ON "page_templates" USING btree ("hero_media_id");
  CREATE INDEX "page_templates_updated_at_idx" ON "page_templates" USING btree ("updated_at");
  CREATE INDEX "page_templates_created_at_idx" ON "page_templates" USING btree ("created_at");
  CREATE INDEX "page_templates_rels_order_idx" ON "page_templates_rels" USING btree ("order");
  CREATE INDEX "page_templates_rels_parent_idx" ON "page_templates_rels" USING btree ("parent_id");
  CREATE INDEX "page_templates_rels_path_idx" ON "page_templates_rels" USING btree ("path");
  CREATE INDEX "page_templates_rels_pages_id_idx" ON "page_templates_rels" USING btree ("pages_id");
  CREATE INDEX "page_templates_rels_posts_id_idx" ON "page_templates_rels" USING btree ("posts_id");
  CREATE INDEX "page_templates_rels_categories_id_idx" ON "page_templates_rels" USING btree ("categories_id");
  CREATE INDEX "popups_image_idx" ON "popups" USING btree ("image_id");
  CREATE INDEX "popups_updated_at_idx" ON "popups" USING btree ("updated_at");
  CREATE INDEX "popups_created_at_idx" ON "popups" USING btree ("created_at");
  CREATE INDEX "users_saved_addresses_order_idx" ON "users_saved_addresses" USING btree ("_order");
  CREATE INDEX "users_saved_addresses_parent_id_idx" ON "users_saved_addresses" USING btree ("_parent_id");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_avatar_idx" ON "users" USING btree ("avatar_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "activity_log_user_idx" ON "activity_log" USING btree ("user_id");
  CREATE INDEX "activity_log_updated_at_idx" ON "activity_log" USING btree ("updated_at");
  CREATE INDEX "activity_log_created_at_idx" ON "activity_log" USING btree ("created_at");
  CREATE UNIQUE INDEX "redirects_from_idx" ON "redirects" USING btree ("from");
  CREATE INDEX "redirects_updated_at_idx" ON "redirects" USING btree ("updated_at");
  CREATE INDEX "redirects_created_at_idx" ON "redirects" USING btree ("created_at");
  CREATE INDEX "redirects_rels_order_idx" ON "redirects_rels" USING btree ("order");
  CREATE INDEX "redirects_rels_parent_idx" ON "redirects_rels" USING btree ("parent_id");
  CREATE INDEX "redirects_rels_path_idx" ON "redirects_rels" USING btree ("path");
  CREATE INDEX "redirects_rels_pages_id_idx" ON "redirects_rels" USING btree ("pages_id");
  CREATE INDEX "redirects_rels_posts_id_idx" ON "redirects_rels" USING btree ("posts_id");
  CREATE INDEX "forms_blocks_checkbox_order_idx" ON "forms_blocks_checkbox" USING btree ("_order");
  CREATE INDEX "forms_blocks_checkbox_parent_id_idx" ON "forms_blocks_checkbox" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_checkbox_path_idx" ON "forms_blocks_checkbox" USING btree ("_path");
  CREATE INDEX "forms_blocks_country_order_idx" ON "forms_blocks_country" USING btree ("_order");
  CREATE INDEX "forms_blocks_country_parent_id_idx" ON "forms_blocks_country" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_country_path_idx" ON "forms_blocks_country" USING btree ("_path");
  CREATE INDEX "forms_blocks_email_order_idx" ON "forms_blocks_email" USING btree ("_order");
  CREATE INDEX "forms_blocks_email_parent_id_idx" ON "forms_blocks_email" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_email_path_idx" ON "forms_blocks_email" USING btree ("_path");
  CREATE INDEX "forms_blocks_message_order_idx" ON "forms_blocks_message" USING btree ("_order");
  CREATE INDEX "forms_blocks_message_parent_id_idx" ON "forms_blocks_message" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_message_path_idx" ON "forms_blocks_message" USING btree ("_path");
  CREATE INDEX "forms_blocks_number_order_idx" ON "forms_blocks_number" USING btree ("_order");
  CREATE INDEX "forms_blocks_number_parent_id_idx" ON "forms_blocks_number" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_number_path_idx" ON "forms_blocks_number" USING btree ("_path");
  CREATE INDEX "forms_blocks_select_options_order_idx" ON "forms_blocks_select_options" USING btree ("_order");
  CREATE INDEX "forms_blocks_select_options_parent_id_idx" ON "forms_blocks_select_options" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_select_order_idx" ON "forms_blocks_select" USING btree ("_order");
  CREATE INDEX "forms_blocks_select_parent_id_idx" ON "forms_blocks_select" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_select_path_idx" ON "forms_blocks_select" USING btree ("_path");
  CREATE INDEX "forms_blocks_state_order_idx" ON "forms_blocks_state" USING btree ("_order");
  CREATE INDEX "forms_blocks_state_parent_id_idx" ON "forms_blocks_state" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_state_path_idx" ON "forms_blocks_state" USING btree ("_path");
  CREATE INDEX "forms_blocks_text_order_idx" ON "forms_blocks_text" USING btree ("_order");
  CREATE INDEX "forms_blocks_text_parent_id_idx" ON "forms_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_text_path_idx" ON "forms_blocks_text" USING btree ("_path");
  CREATE INDEX "forms_blocks_textarea_order_idx" ON "forms_blocks_textarea" USING btree ("_order");
  CREATE INDEX "forms_blocks_textarea_parent_id_idx" ON "forms_blocks_textarea" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_textarea_path_idx" ON "forms_blocks_textarea" USING btree ("_path");
  CREATE INDEX "forms_emails_order_idx" ON "forms_emails" USING btree ("_order");
  CREATE INDEX "forms_emails_parent_id_idx" ON "forms_emails" USING btree ("_parent_id");
  CREATE INDEX "forms_updated_at_idx" ON "forms" USING btree ("updated_at");
  CREATE INDEX "forms_created_at_idx" ON "forms" USING btree ("created_at");
  CREATE INDEX "form_submissions_submission_data_order_idx" ON "form_submissions_submission_data" USING btree ("_order");
  CREATE INDEX "form_submissions_submission_data_parent_id_idx" ON "form_submissions_submission_data" USING btree ("_parent_id");
  CREATE INDEX "form_submissions_form_idx" ON "form_submissions" USING btree ("form_id");
  CREATE INDEX "form_submissions_updated_at_idx" ON "form_submissions" USING btree ("updated_at");
  CREATE INDEX "form_submissions_created_at_idx" ON "form_submissions" USING btree ("created_at");
  CREATE INDEX "search_categories_order_idx" ON "search_categories" USING btree ("_order");
  CREATE INDEX "search_categories_parent_id_idx" ON "search_categories" USING btree ("_parent_id");
  CREATE INDEX "search_slug_idx" ON "search" USING btree ("slug");
  CREATE INDEX "search_meta_meta_image_idx" ON "search" USING btree ("meta_image_id");
  CREATE INDEX "search_price_idx" ON "search" USING btree ("price");
  CREATE INDEX "search_event_date_idx" ON "search" USING btree ("event_date");
  CREATE INDEX "search_venue_name_idx" ON "search" USING btree ("venue_name");
  CREATE INDEX "search_updated_at_idx" ON "search" USING btree ("updated_at");
  CREATE INDEX "search_created_at_idx" ON "search" USING btree ("created_at");
  CREATE INDEX "search_rels_order_idx" ON "search_rels" USING btree ("order");
  CREATE INDEX "search_rels_parent_idx" ON "search_rels" USING btree ("parent_id");
  CREATE INDEX "search_rels_path_idx" ON "search_rels" USING btree ("path");
  CREATE INDEX "search_rels_posts_id_idx" ON "search_rels" USING btree ("posts_id");
  CREATE INDEX "search_rels_pages_id_idx" ON "search_rels" USING btree ("pages_id");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_jobs_log_order_idx" ON "payload_jobs_log" USING btree ("_order");
  CREATE INDEX "payload_jobs_log_parent_id_idx" ON "payload_jobs_log" USING btree ("_parent_id");
  CREATE INDEX "payload_jobs_completed_at_idx" ON "payload_jobs" USING btree ("completed_at");
  CREATE INDEX "payload_jobs_total_tried_idx" ON "payload_jobs" USING btree ("total_tried");
  CREATE INDEX "payload_jobs_has_error_idx" ON "payload_jobs" USING btree ("has_error");
  CREATE INDEX "payload_jobs_task_slug_idx" ON "payload_jobs" USING btree ("task_slug");
  CREATE INDEX "payload_jobs_queue_idx" ON "payload_jobs" USING btree ("queue");
  CREATE INDEX "payload_jobs_wait_until_idx" ON "payload_jobs" USING btree ("wait_until");
  CREATE INDEX "payload_jobs_processing_idx" ON "payload_jobs" USING btree ("processing");
  CREATE INDEX "payload_jobs_updated_at_idx" ON "payload_jobs" USING btree ("updated_at");
  CREATE INDEX "payload_jobs_created_at_idx" ON "payload_jobs" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("posts_id");
  CREATE INDEX "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_page_templates_id_idx" ON "payload_locked_documents_rels" USING btree ("page_templates_id");
  CREATE INDEX "payload_locked_documents_rels_popups_id_idx" ON "payload_locked_documents_rels" USING btree ("popups_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_activity_log_id_idx" ON "payload_locked_documents_rels" USING btree ("activity_log_id");
  CREATE INDEX "payload_locked_documents_rels_redirects_id_idx" ON "payload_locked_documents_rels" USING btree ("redirects_id");
  CREATE INDEX "payload_locked_documents_rels_forms_id_idx" ON "payload_locked_documents_rels" USING btree ("forms_id");
  CREATE INDEX "payload_locked_documents_rels_form_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("form_submissions_id");
  CREATE INDEX "payload_locked_documents_rels_search_id_idx" ON "payload_locked_documents_rels" USING btree ("search_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "header_nav_items_left_order_idx" ON "header_nav_items_left" USING btree ("_order");
  CREATE INDEX "header_nav_items_left_parent_id_idx" ON "header_nav_items_left" USING btree ("_parent_id");
  CREATE INDEX "header_nav_items_right_order_idx" ON "header_nav_items_right" USING btree ("_order");
  CREATE INDEX "header_nav_items_right_parent_id_idx" ON "header_nav_items_right" USING btree ("_parent_id");
  CREATE INDEX "header_rels_order_idx" ON "header_rels" USING btree ("order");
  CREATE INDEX "header_rels_parent_idx" ON "header_rels" USING btree ("parent_id");
  CREATE INDEX "header_rels_path_idx" ON "header_rels" USING btree ("path");
  CREATE INDEX "header_rels_pages_id_idx" ON "header_rels" USING btree ("pages_id");
  CREATE INDEX "header_rels_posts_id_idx" ON "header_rels" USING btree ("posts_id");
  CREATE INDEX "footer_column1_links_order_idx" ON "footer_column1_links" USING btree ("_order");
  CREATE INDEX "footer_column1_links_parent_id_idx" ON "footer_column1_links" USING btree ("_parent_id");
  CREATE INDEX "footer_column2_links_order_idx" ON "footer_column2_links" USING btree ("_order");
  CREATE INDEX "footer_column2_links_parent_id_idx" ON "footer_column2_links" USING btree ("_parent_id");
  CREATE INDEX "footer_column3_links_order_idx" ON "footer_column3_links" USING btree ("_order");
  CREATE INDEX "footer_column3_links_parent_id_idx" ON "footer_column3_links" USING btree ("_parent_id");
  CREATE INDEX "footer_rels_order_idx" ON "footer_rels" USING btree ("order");
  CREATE INDEX "footer_rels_parent_idx" ON "footer_rels" USING btree ("parent_id");
  CREATE INDEX "footer_rels_path_idx" ON "footer_rels" USING btree ("path");
  CREATE INDEX "footer_rels_pages_id_idx" ON "footer_rels" USING btree ("pages_id");
  CREATE INDEX "footer_rels_posts_id_idx" ON "footer_rels" USING btree ("posts_id");
  CREATE INDEX "contact_widget_channels_order_idx" ON "contact_widget_channels" USING btree ("_order");
  CREATE INDEX "contact_widget_channels_parent_id_idx" ON "contact_widget_channels" USING btree ("_parent_id");
  CREATE INDEX "contact_widget_faq_items_order_idx" ON "contact_widget_faq_items" USING btree ("_order");
  CREATE INDEX "contact_widget_faq_items_parent_id_idx" ON "contact_widget_faq_items" USING btree ("_parent_id");
  CREATE INDEX "newsletter_settings_popup_image_idx" ON "newsletter_settings" USING btree ("popup_image_id");
  CREATE INDEX "seo_settings_sitemap_exclude_patterns_order_idx" ON "seo_settings_sitemap_exclude_patterns" USING btree ("_order");
  CREATE INDEX "seo_settings_sitemap_exclude_patterns_parent_id_idx" ON "seo_settings_sitemap_exclude_patterns" USING btree ("_parent_id");
  CREATE INDEX "seo_settings_noindex_patterns_order_idx" ON "seo_settings_noindex_patterns" USING btree ("_order");
  CREATE INDEX "seo_settings_noindex_patterns_parent_id_idx" ON "seo_settings_noindex_patterns" USING btree ("_parent_id");
  CREATE INDEX "seo_settings_llms_additional_sections_order_idx" ON "seo_settings_llms_additional_sections" USING btree ("_order");
  CREATE INDEX "seo_settings_llms_additional_sections_parent_id_idx" ON "seo_settings_llms_additional_sections" USING btree ("_parent_id");
  CREATE INDEX "seo_settings_default_og_image_idx" ON "seo_settings" USING btree ("default_og_image_id");
  CREATE INDEX "seo_settings_schema_logo_idx" ON "seo_settings" USING btree ("schema_logo_id");
  CREATE INDEX "privacy_settings_policies_order_idx" ON "privacy_settings_policies" USING btree ("_order");
  CREATE INDEX "privacy_settings_policies_parent_id_idx" ON "privacy_settings_policies" USING btree ("_parent_id");
  CREATE INDEX "privacy_settings_privacy_policy_page_idx" ON "privacy_settings" USING btree ("privacy_policy_page_id");
  CREATE INDEX "site_appearance_logo_idx" ON "site_appearance" USING btree ("logo_id");
  CREATE INDEX "site_appearance_logo_dark_idx" ON "site_appearance" USING btree ("logo_dark_id");
  CREATE INDEX "site_appearance_favicon_idx" ON "site_appearance" USING btree ("favicon_id");
  CREATE INDEX "not_found_page_suggested_links_order_idx" ON "not_found_page_suggested_links" USING btree ("_order");
  CREATE INDEX "not_found_page_suggested_links_parent_id_idx" ON "not_found_page_suggested_links" USING btree ("_parent_id");
  CREATE INDEX "not_found_page_background_image_idx" ON "not_found_page" USING btree ("background_image_id");
  CREATE INDEX "maintenance_mode_background_image_idx" ON "maintenance_mode" USING btree ("background_image_id");
  CREATE INDEX "cms_branding_admin_logo_idx" ON "cms_branding" USING btree ("admin_logo_id");
  CREATE INDEX "cms_branding_admin_icon_idx" ON "cms_branding" USING btree ("admin_icon_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_hero_links" CASCADE;
  DROP TABLE "pages_blocks_cta_links" CASCADE;
  DROP TABLE "pages_blocks_cta" CASCADE;
  DROP TABLE "pages_blocks_content_columns" CASCADE;
  DROP TABLE "pages_blocks_content" CASCADE;
  DROP TABLE "pages_blocks_media_block" CASCADE;
  DROP TABLE "pages_blocks_archive" CASCADE;
  DROP TABLE "pages_blocks_form_block" CASCADE;
  DROP TABLE "pages_blocks_testimonials_testimonials" CASCADE;
  DROP TABLE "pages_blocks_testimonials" CASCADE;
  DROP TABLE "pages_blocks_faq_items" CASCADE;
  DROP TABLE "pages_blocks_faq" CASCADE;
  DROP TABLE "pages_blocks_features_features" CASCADE;
  DROP TABLE "pages_blocks_features" CASCADE;
  DROP TABLE "pages_blocks_stats_stats" CASCADE;
  DROP TABLE "pages_blocks_stats" CASCADE;
  DROP TABLE "pages_blocks_logo_carousel_logos" CASCADE;
  DROP TABLE "pages_blocks_logo_carousel" CASCADE;
  DROP TABLE "pages_blocks_pricing_plans_features" CASCADE;
  DROP TABLE "pages_blocks_pricing_plans_links" CASCADE;
  DROP TABLE "pages_blocks_pricing_plans" CASCADE;
  DROP TABLE "pages_blocks_pricing" CASCADE;
  DROP TABLE "pages_blocks_hero_split_links" CASCADE;
  DROP TABLE "pages_blocks_hero_split" CASCADE;
  DROP TABLE "pages_blocks_how_it_works_steps" CASCADE;
  DROP TABLE "pages_blocks_how_it_works" CASCADE;
  DROP TABLE "pages_blocks_image_gallery_images" CASCADE;
  DROP TABLE "pages_blocks_image_gallery" CASCADE;
  DROP TABLE "pages_blocks_home_hero_links" CASCADE;
  DROP TABLE "pages_blocks_home_hero" CASCADE;
  DROP TABLE "pages_blocks_newsletter" CASCADE;
  DROP TABLE "pages_blocks_team_grid_members" CASCADE;
  DROP TABLE "pages_blocks_team_grid" CASCADE;
  DROP TABLE "pages_blocks_video_embed" CASCADE;
  DROP TABLE "pages_blocks_map_embed_locations" CASCADE;
  DROP TABLE "pages_blocks_map_embed" CASCADE;
  DROP TABLE "pages_blocks_embed" CASCADE;
  DROP TABLE "pages_blocks_timeline_events" CASCADE;
  DROP TABLE "pages_blocks_timeline" CASCADE;
  DROP TABLE "pages_blocks_banner" CASCADE;
  DROP TABLE "pages_blocks_code" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "_pages_v_version_hero_links" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_links" CASCADE;
  DROP TABLE "_pages_v_blocks_cta" CASCADE;
  DROP TABLE "_pages_v_blocks_content_columns" CASCADE;
  DROP TABLE "_pages_v_blocks_content" CASCADE;
  DROP TABLE "_pages_v_blocks_media_block" CASCADE;
  DROP TABLE "_pages_v_blocks_archive" CASCADE;
  DROP TABLE "_pages_v_blocks_form_block" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials_testimonials" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_items" CASCADE;
  DROP TABLE "_pages_v_blocks_faq" CASCADE;
  DROP TABLE "_pages_v_blocks_features_features" CASCADE;
  DROP TABLE "_pages_v_blocks_features" CASCADE;
  DROP TABLE "_pages_v_blocks_stats_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_logo_carousel_logos" CASCADE;
  DROP TABLE "_pages_v_blocks_logo_carousel" CASCADE;
  DROP TABLE "_pages_v_blocks_pricing_plans_features" CASCADE;
  DROP TABLE "_pages_v_blocks_pricing_plans_links" CASCADE;
  DROP TABLE "_pages_v_blocks_pricing_plans" CASCADE;
  DROP TABLE "_pages_v_blocks_pricing" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_split_links" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_split" CASCADE;
  DROP TABLE "_pages_v_blocks_how_it_works_steps" CASCADE;
  DROP TABLE "_pages_v_blocks_how_it_works" CASCADE;
  DROP TABLE "_pages_v_blocks_image_gallery_images" CASCADE;
  DROP TABLE "_pages_v_blocks_image_gallery" CASCADE;
  DROP TABLE "_pages_v_blocks_home_hero_links" CASCADE;
  DROP TABLE "_pages_v_blocks_home_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_newsletter" CASCADE;
  DROP TABLE "_pages_v_blocks_team_grid_members" CASCADE;
  DROP TABLE "_pages_v_blocks_team_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_video_embed" CASCADE;
  DROP TABLE "_pages_v_blocks_map_embed_locations" CASCADE;
  DROP TABLE "_pages_v_blocks_map_embed" CASCADE;
  DROP TABLE "_pages_v_blocks_embed" CASCADE;
  DROP TABLE "_pages_v_blocks_timeline_events" CASCADE;
  DROP TABLE "_pages_v_blocks_timeline" CASCADE;
  DROP TABLE "_pages_v_blocks_banner" CASCADE;
  DROP TABLE "_pages_v_blocks_code" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_rels" CASCADE;
  DROP TABLE "posts_populated_authors" CASCADE;
  DROP TABLE "posts" CASCADE;
  DROP TABLE "posts_rels" CASCADE;
  DROP TABLE "_posts_v_version_populated_authors" CASCADE;
  DROP TABLE "_posts_v" CASCADE;
  DROP TABLE "_posts_v_rels" CASCADE;
  DROP TABLE "categories_breadcrumbs" CASCADE;
  DROP TABLE "categories" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "media_texts" CASCADE;
  DROP TABLE "page_templates_hero_links" CASCADE;
  DROP TABLE "page_templates_blocks_cta_links" CASCADE;
  DROP TABLE "page_templates_blocks_cta" CASCADE;
  DROP TABLE "page_templates_blocks_content_columns" CASCADE;
  DROP TABLE "page_templates_blocks_content" CASCADE;
  DROP TABLE "page_templates_blocks_media_block" CASCADE;
  DROP TABLE "page_templates_blocks_archive" CASCADE;
  DROP TABLE "page_templates_blocks_form_block" CASCADE;
  DROP TABLE "page_templates_blocks_testimonials_testimonials" CASCADE;
  DROP TABLE "page_templates_blocks_testimonials" CASCADE;
  DROP TABLE "page_templates_blocks_faq_items" CASCADE;
  DROP TABLE "page_templates_blocks_faq" CASCADE;
  DROP TABLE "page_templates_blocks_features_features" CASCADE;
  DROP TABLE "page_templates_blocks_features" CASCADE;
  DROP TABLE "page_templates_blocks_stats_stats" CASCADE;
  DROP TABLE "page_templates_blocks_stats" CASCADE;
  DROP TABLE "page_templates_blocks_logo_carousel_logos" CASCADE;
  DROP TABLE "page_templates_blocks_logo_carousel" CASCADE;
  DROP TABLE "page_templates_blocks_pricing_plans_features" CASCADE;
  DROP TABLE "page_templates_blocks_pricing_plans_links" CASCADE;
  DROP TABLE "page_templates_blocks_pricing_plans" CASCADE;
  DROP TABLE "page_templates_blocks_pricing" CASCADE;
  DROP TABLE "page_templates_blocks_hero_split_links" CASCADE;
  DROP TABLE "page_templates_blocks_hero_split" CASCADE;
  DROP TABLE "page_templates_blocks_how_it_works_steps" CASCADE;
  DROP TABLE "page_templates_blocks_how_it_works" CASCADE;
  DROP TABLE "page_templates_blocks_image_gallery_images" CASCADE;
  DROP TABLE "page_templates_blocks_image_gallery" CASCADE;
  DROP TABLE "page_templates_blocks_home_hero_links" CASCADE;
  DROP TABLE "page_templates_blocks_home_hero" CASCADE;
  DROP TABLE "page_templates_blocks_newsletter" CASCADE;
  DROP TABLE "page_templates_blocks_team_grid_members" CASCADE;
  DROP TABLE "page_templates_blocks_team_grid" CASCADE;
  DROP TABLE "page_templates_blocks_video_embed" CASCADE;
  DROP TABLE "page_templates_blocks_map_embed_locations" CASCADE;
  DROP TABLE "page_templates_blocks_map_embed" CASCADE;
  DROP TABLE "page_templates_blocks_embed" CASCADE;
  DROP TABLE "page_templates_blocks_timeline_events" CASCADE;
  DROP TABLE "page_templates_blocks_timeline" CASCADE;
  DROP TABLE "page_templates_blocks_banner" CASCADE;
  DROP TABLE "page_templates_blocks_code" CASCADE;
  DROP TABLE "page_templates" CASCADE;
  DROP TABLE "page_templates_rels" CASCADE;
  DROP TABLE "popups" CASCADE;
  DROP TABLE "users_saved_addresses" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "activity_log" CASCADE;
  DROP TABLE "redirects" CASCADE;
  DROP TABLE "redirects_rels" CASCADE;
  DROP TABLE "forms_blocks_checkbox" CASCADE;
  DROP TABLE "forms_blocks_country" CASCADE;
  DROP TABLE "forms_blocks_email" CASCADE;
  DROP TABLE "forms_blocks_message" CASCADE;
  DROP TABLE "forms_blocks_number" CASCADE;
  DROP TABLE "forms_blocks_select_options" CASCADE;
  DROP TABLE "forms_blocks_select" CASCADE;
  DROP TABLE "forms_blocks_state" CASCADE;
  DROP TABLE "forms_blocks_text" CASCADE;
  DROP TABLE "forms_blocks_textarea" CASCADE;
  DROP TABLE "forms_emails" CASCADE;
  DROP TABLE "forms" CASCADE;
  DROP TABLE "form_submissions_submission_data" CASCADE;
  DROP TABLE "form_submissions" CASCADE;
  DROP TABLE "search_categories" CASCADE;
  DROP TABLE "search" CASCADE;
  DROP TABLE "search_rels" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_jobs_log" CASCADE;
  DROP TABLE "payload_jobs" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "header_nav_items_left" CASCADE;
  DROP TABLE "header_nav_items_right" CASCADE;
  DROP TABLE "header" CASCADE;
  DROP TABLE "header_rels" CASCADE;
  DROP TABLE "footer_column1_links" CASCADE;
  DROP TABLE "footer_column2_links" CASCADE;
  DROP TABLE "footer_column3_links" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "footer_rels" CASCADE;
  DROP TABLE "company_details" CASCADE;
  DROP TABLE "contact_widget_channels" CASCADE;
  DROP TABLE "contact_widget_faq_items" CASCADE;
  DROP TABLE "contact_widget" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "announcement_bar" CASCADE;
  DROP TABLE "newsletter_settings" CASCADE;
  DROP TABLE "seo_settings_sitemap_exclude_patterns" CASCADE;
  DROP TABLE "seo_settings_noindex_patterns" CASCADE;
  DROP TABLE "seo_settings_llms_additional_sections" CASCADE;
  DROP TABLE "seo_settings" CASCADE;
  DROP TABLE "permalink_settings" CASCADE;
  DROP TABLE "privacy_settings_policies" CASCADE;
  DROP TABLE "privacy_settings" CASCADE;
  DROP TABLE "site_appearance" CASCADE;
  DROP TABLE "not_found_page_suggested_links" CASCADE;
  DROP TABLE "not_found_page" CASCADE;
  DROP TABLE "code_injection" CASCADE;
  DROP TABLE "maintenance_mode" CASCADE;
  DROP TABLE "mail_settings" CASCADE;
  DROP TABLE "cms_branding" CASCADE;
  DROP TYPE "public"."enum_pages_hero_links_link_type";
  DROP TYPE "public"."enum_pages_hero_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_cta_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_cta_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_content_columns_size";
  DROP TYPE "public"."enum_pages_blocks_content_columns_link_type";
  DROP TYPE "public"."enum_pages_blocks_content_columns_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_archive_populate_by";
  DROP TYPE "public"."enum_pages_blocks_archive_relation_to";
  DROP TYPE "public"."enum_pages_blocks_features_columns";
  DROP TYPE "public"."enum_pages_blocks_pricing_plans_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_pricing_plans_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_hero_split_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_hero_split_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_hero_split_image_position";
  DROP TYPE "public"."enum_pages_blocks_hero_split_theme";
  DROP TYPE "public"."enum_pages_blocks_image_gallery_layout";
  DROP TYPE "public"."enum_pages_blocks_home_hero_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_home_hero_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_home_hero_style";
  DROP TYPE "public"."enum_pages_blocks_home_hero_theme";
  DROP TYPE "public"."enum_pages_blocks_newsletter_theme";
  DROP TYPE "public"."enum_pages_blocks_team_grid_columns";
  DROP TYPE "public"."enum_pages_blocks_video_embed_aspect_ratio";
  DROP TYPE "public"."enum_pages_blocks_video_embed_max_width";
  DROP TYPE "public"."enum_pages_blocks_map_embed_map_height";
  DROP TYPE "public"."enum_pages_blocks_map_embed_layout";
  DROP TYPE "public"."enum_pages_blocks_embed_max_width";
  DROP TYPE "public"."enum_pages_blocks_banner_style";
  DROP TYPE "public"."enum_pages_blocks_code_language";
  DROP TYPE "public"."enum_pages_hero_type";
  DROP TYPE "public"."enum_pages_advanced_seo_schema_type";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_version_hero_links_link_type";
  DROP TYPE "public"."enum__pages_v_version_hero_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_cta_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_cta_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_size";
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_archive_populate_by";
  DROP TYPE "public"."enum__pages_v_blocks_archive_relation_to";
  DROP TYPE "public"."enum__pages_v_blocks_features_columns";
  DROP TYPE "public"."enum__pages_v_blocks_pricing_plans_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_pricing_plans_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_hero_split_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_hero_split_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_hero_split_image_position";
  DROP TYPE "public"."enum__pages_v_blocks_hero_split_theme";
  DROP TYPE "public"."enum__pages_v_blocks_image_gallery_layout";
  DROP TYPE "public"."enum__pages_v_blocks_home_hero_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_home_hero_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_home_hero_style";
  DROP TYPE "public"."enum__pages_v_blocks_home_hero_theme";
  DROP TYPE "public"."enum__pages_v_blocks_newsletter_theme";
  DROP TYPE "public"."enum__pages_v_blocks_team_grid_columns";
  DROP TYPE "public"."enum__pages_v_blocks_video_embed_aspect_ratio";
  DROP TYPE "public"."enum__pages_v_blocks_video_embed_max_width";
  DROP TYPE "public"."enum__pages_v_blocks_map_embed_map_height";
  DROP TYPE "public"."enum__pages_v_blocks_map_embed_layout";
  DROP TYPE "public"."enum__pages_v_blocks_embed_max_width";
  DROP TYPE "public"."enum__pages_v_blocks_banner_style";
  DROP TYPE "public"."enum__pages_v_blocks_code_language";
  DROP TYPE "public"."enum__pages_v_version_hero_type";
  DROP TYPE "public"."enum__pages_v_version_advanced_seo_schema_type";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum_posts_advanced_seo_schema_type";
  DROP TYPE "public"."enum_posts_status";
  DROP TYPE "public"."enum__posts_v_version_advanced_seo_schema_type";
  DROP TYPE "public"."enum__posts_v_version_status";
  DROP TYPE "public"."enum_media_folder";
  DROP TYPE "public"."enum_page_templates_hero_links_link_type";
  DROP TYPE "public"."enum_page_templates_hero_links_link_appearance";
  DROP TYPE "public"."enum_page_templates_blocks_cta_links_link_type";
  DROP TYPE "public"."enum_page_templates_blocks_cta_links_link_appearance";
  DROP TYPE "public"."enum_page_templates_blocks_content_columns_size";
  DROP TYPE "public"."enum_page_templates_blocks_content_columns_link_type";
  DROP TYPE "public"."enum_page_templates_blocks_content_columns_link_appearance";
  DROP TYPE "public"."enum_page_templates_blocks_archive_populate_by";
  DROP TYPE "public"."enum_page_templates_blocks_archive_relation_to";
  DROP TYPE "public"."enum_page_templates_blocks_features_columns";
  DROP TYPE "public"."enum_page_templates_blocks_pricing_plans_links_link_type";
  DROP TYPE "public"."enum_page_templates_blocks_pricing_plans_links_link_appearance";
  DROP TYPE "public"."enum_page_templates_blocks_hero_split_links_link_type";
  DROP TYPE "public"."enum_page_templates_blocks_hero_split_links_link_appearance";
  DROP TYPE "public"."enum_page_templates_blocks_hero_split_image_position";
  DROP TYPE "public"."enum_page_templates_blocks_hero_split_theme";
  DROP TYPE "public"."enum_page_templates_blocks_image_gallery_layout";
  DROP TYPE "public"."enum_page_templates_blocks_home_hero_links_link_type";
  DROP TYPE "public"."enum_page_templates_blocks_home_hero_links_link_appearance";
  DROP TYPE "public"."enum_page_templates_blocks_home_hero_style";
  DROP TYPE "public"."enum_page_templates_blocks_home_hero_theme";
  DROP TYPE "public"."enum_page_templates_blocks_newsletter_theme";
  DROP TYPE "public"."enum_page_templates_blocks_team_grid_columns";
  DROP TYPE "public"."enum_page_templates_blocks_video_embed_aspect_ratio";
  DROP TYPE "public"."enum_page_templates_blocks_video_embed_max_width";
  DROP TYPE "public"."enum_page_templates_blocks_map_embed_map_height";
  DROP TYPE "public"."enum_page_templates_blocks_map_embed_layout";
  DROP TYPE "public"."enum_page_templates_blocks_embed_max_width";
  DROP TYPE "public"."enum_page_templates_blocks_banner_style";
  DROP TYPE "public"."enum_page_templates_blocks_code_language";
  DROP TYPE "public"."enum_page_templates_category";
  DROP TYPE "public"."enum_page_templates_hero_type";
  DROP TYPE "public"."enum_popups_layout";
  DROP TYPE "public"."enum_popups_trigger_type";
  DROP TYPE "public"."enum_popups_size";
  DROP TYPE "public"."enum_popups_position";
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_activity_log_action";
  DROP TYPE "public"."enum_redirects_to_type";
  DROP TYPE "public"."enum_forms_confirmation_type";
  DROP TYPE "public"."enum_payload_jobs_log_task_slug";
  DROP TYPE "public"."enum_payload_jobs_log_state";
  DROP TYPE "public"."enum_payload_jobs_task_slug";
  DROP TYPE "public"."enum_header_nav_items_left_link_type";
  DROP TYPE "public"."enum_header_nav_items_right_link_type";
  DROP TYPE "public"."enum_footer_column1_links_link_type";
  DROP TYPE "public"."enum_footer_column2_links_link_type";
  DROP TYPE "public"."enum_footer_column3_links_link_type";
  DROP TYPE "public"."enum_contact_widget_channels_channel_type";
  DROP TYPE "public"."enum_contact_widget_channels_icon";
  DROP TYPE "public"."enum_contact_widget_position";
  DROP TYPE "public"."enum_site_settings_timezone";
  DROP TYPE "public"."enum_site_settings_language";
  DROP TYPE "public"."enum_site_settings_date_format";
  DROP TYPE "public"."enum_site_settings_currency_position";
  DROP TYPE "public"."enum_newsletter_settings_provider";
  DROP TYPE "public"."enum_seo_settings_title_separator";
  DROP TYPE "public"."enum_seo_settings_sitemap_change_frequency";
  DROP TYPE "public"."enum_seo_settings_sitemap_priority";
  DROP TYPE "public"."enum_seo_settings_breadcrumb_separator";
  DROP TYPE "public"."enum_seo_settings_business_type";
  DROP TYPE "public"."enum_seo_settings_schema_article_type";
  DROP TYPE "public"."enum_site_appearance_heading_font";
  DROP TYPE "public"."enum_site_appearance_body_font";
  DROP TYPE "public"."enum_site_appearance_font_weight_heading";
  DROP TYPE "public"."enum_site_appearance_font_weight_body";
  DROP TYPE "public"."enum_mail_settings_provider";
  DROP TYPE "public"."enum_mail_settings_mailgun_region";`)
}
