import type { GlobalConfig } from 'payload'
import { isAdmin } from '../access/isAdmin'

export const AISettings: GlobalConfig = {
  slug: 'ai-settings',
  label: 'AI Assistant',
  admin: {
    group: 'System',
    description: 'Configure the AI writing assistant that powers content generation across the CMS.',
  },
  access: {
    read: isAdmin,
    update: isAdmin,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Connection',
          fields: [
            {
              name: 'enabled',
              type: 'checkbox',
              defaultValue: false,
              label: 'Enable AI Features',
              admin: {
                description: 'Toggle AI content generation on or off across the entire CMS.',
              },
            },
            {
              name: 'apiKey',
              type: 'text',
              label: 'Anthropic API Key',
              admin: {
                description:
                  'Your Anthropic API key. Get one from console.anthropic.com/settings/keys — this is stored securely in the database and never exposed to non-admin users.',
                condition: (data) => Boolean(data?.enabled),
              },
            },
            {
              name: 'model',
              type: 'select',
              label: 'AI Model',
              defaultValue: 'claude-sonnet-4-20250514',
              options: [
                {
                  label: 'Claude Sonnet 4 (recommended — fast & cost-effective)',
                  value: 'claude-sonnet-4-20250514',
                },
                {
                  label: 'Claude Opus 4 (most capable — slower & more expensive)',
                  value: 'claude-opus-4-20250514',
                },
                {
                  label: 'Claude Haiku (fastest — cheapest, less nuanced)',
                  value: 'claude-3-5-haiku-20241022',
                },
              ],
              admin: {
                description:
                  'Which AI model to use. Sonnet is the best balance of speed, quality, and cost.',
                condition: (data) => Boolean(data?.enabled),
              },
            },
          ],
        },
        {
          label: 'Brand & Tone',
          fields: [
            {
              name: 'businessContext',
              type: 'textarea',
              label: 'Business Context',
              admin: {
                description:
                  'Describe the business in detail — what it does, who it serves, key products/services, location, unique selling points. The AI uses this to write relevant, on-brand content.',
                rows: 6,
                placeholder:
                  'e.g. "Acme Ltd is a professional services firm based in London, UK. We specialise in web development, digital marketing, and brand strategy. Our target audience is small and medium businesses looking to grow their online presence."',
              },
            },
            {
              name: 'writingTone',
              type: 'select',
              label: 'Writing Tone',
              defaultValue: 'professional',
              options: [
                {
                  label: 'Professional — clear, authoritative, trustworthy',
                  value: 'professional',
                },
                {
                  label: 'Friendly & Casual — warm, approachable, conversational',
                  value: 'casual',
                },
                {
                  label: 'Playful & Fun — energetic, youthful, emoji-friendly',
                  value: 'playful',
                },
                {
                  label: 'Luxury & Premium — elegant, refined, aspirational',
                  value: 'luxury',
                },
                { label: 'Bold & Edgy — confident, direct, unconventional', value: 'bold' },
                {
                  label: 'Empathetic & Caring — supportive, understanding, gentle',
                  value: 'empathetic',
                },
                {
                  label: 'Technical & Precise — detailed, factual, expert-level',
                  value: 'technical',
                },
              ],
              admin: {
                description: 'The overall writing style the AI should use.',
              },
            },
            {
              name: 'writingGuidelines',
              type: 'textarea',
              label: 'Additional Writing Guidelines',
              admin: {
                description:
                  'Any specific rules for the AI to follow — brand words to use, words to avoid, formatting preferences, etc.',
                rows: 4,
                placeholder:
                  'e.g. "Always use British English. Never use the word \'cheap\' — use \'affordable\' instead. Our brand colour is rose gold. Refer to customers as \'babes\' in casual contexts."',
              },
            },
            {
              name: 'targetAudience',
              type: 'textarea',
              label: 'Target Audience',
              admin: {
                description:
                  'Describe the ideal customer. The AI tailors its language and messaging to resonate with this audience.',
                rows: 3,
                placeholder:
                  'e.g. "Women aged 18-40 in the UK, fashion-conscious, active on Instagram and TikTok, willing to pay premium prices for quality nail services."',
              },
            },
            {
              name: 'examplePhrases',
              type: 'array',
              label: 'Brand Phrases & Taglines',
              admin: {
                description: 'Key phrases the AI can reference or draw inspiration from.',
              },
              fields: [
                {
                  name: 'phrase',
                  type: 'text',
                  required: true,
                  label: 'Phrase',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
