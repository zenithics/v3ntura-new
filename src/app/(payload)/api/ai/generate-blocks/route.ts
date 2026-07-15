import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { headers as getHeaders } from 'next/headers'
import { getAIConfig } from '../../../../../utilities/getAIConfig'

const BLOCK_SCHEMA_PROMPT = `You are a CMS content generator. You produce JSON block configurations for a Payload CMS page builder.

Available block types and their fields:

1. "content" — Rich text content section
   Fields: heading (text), richText (rich text — use Lexical JSON format with simple paragraph nodes)

2. "cta" — Call to action
   Fields: heading (text), description (text), buttonText (text), buttonLink (text)

3. "features" — Feature grid
   Fields: heading (text), subheading (text), features (array of { title, description, icon })

4. "testimonials" — Customer testimonials
   Fields: heading (text), testimonials (array of { quote, author, role, company })

5. "faq" — FAQ accordion
   Fields: heading (text), faqs (array of { question, answer })

6. "stats" — Statistics/counters
   Fields: heading (text), stats (array of { label, value, suffix })

7. "howItWorks" — Step-by-step process
   Fields: heading (text), steps (array of { title, description })

8. "teamGrid" — Team member grid
   Fields: heading (text), subheading (text), columns ("2"|"3"|"4"), members (array of { name, role, bio })

9. "pricing" — Pricing table
   Fields: heading (text), plans (array of { name, price, description, features (array of text), featured (boolean) })

10. "newsletter" — Newsletter signup
    Fields: heading (text), description (text), buttonText (text)

11. "timeline" — Timeline/milestones
    Fields: heading (text), subheading (text), events (array of { date, title, description (plain text string — NOT rich text) })

12. "videoEmbed" — Video embed
    Fields: heading (text), videoURL (text — YouTube or Vimeo URL), caption (text)

13. "mapEmbed" — Map/location
    Fields: heading (text), locations (array of { name, address, phone, email, hours, googleMapsEmbedURL })

RULES:
- Return ONLY a JSON array of block objects. No markdown, no explanation.
- Each block must have a "blockType" field matching one of the slugs above.
- For rich text fields, use this Lexical format:
  {"root":{"type":"root","children":[{"type":"paragraph","children":[{"type":"text","text":"Your text here","format":0,"mode":"normal"}],"direction":"ltr","format":"","indent":0,"version":1}],"direction":"ltr","format":"","indent":0,"version":1}}
- For timeline event descriptions, use a plain text string, NOT Lexical JSON.
- Generate realistic, relevant content based on the user's prompt.
- Generate 1-3 blocks per request unless the user asks for more.
- Make content specific to the business/context described.`

export async function POST(req: NextRequest) {
  try {
    const payload = await getPayload({ config: configPromise })
    const headers = await getHeaders()
    const { user } = await payload.auth({ headers })

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const aiConfig = await getAIConfig()

    if (!aiConfig.enabled) {
      return NextResponse.json(
        {
          error:
            'AI features are disabled. An admin can enable them in System → AI Assistant.',
        },
        { status: 403 },
      )
    }

    if (!aiConfig.apiKey) {
      return NextResponse.json(
        {
          error:
            'No API key configured. An admin can add one in System → AI Assistant → Connection tab.',
        },
        { status: 500 },
      )
    }

    const { prompt } = await req.json()

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })
    }

    const systemPrompt = `${BLOCK_SCHEMA_PROMPT}\n\n--- BRAND CONTEXT ---\n${aiConfig.systemContext}`

    const client = new Anthropic({ apiKey: aiConfig.apiKey })

    const message = await client.messages.create({
      model: aiConfig.model,
      max_tokens: 4096,
      system: systemPrompt,
      messages: [{ role: 'user', content: prompt }],
    })

    const responseText =
      message.content[0].type === 'text' ? message.content[0].text : ''

    let blocks
    try {
      const cleaned = responseText.replace(/```json?\n?/g, '').replace(/```\n?/g, '').trim()
      blocks = JSON.parse(cleaned)
    } catch {
      return NextResponse.json(
        { error: 'AI returned invalid JSON. Try rephrasing your prompt.', raw: responseText },
        { status: 422 },
      )
    }

    if (!Array.isArray(blocks)) {
      blocks = [blocks]
    }

    blocks = blocks.map((block: any, index: number) => ({
      ...block,
      id: `ai-${Date.now()}-${index}`,
    }))

    return NextResponse.json({ blocks })
  } catch (error: any) {
    console.error('AI block generation error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to generate content' },
      { status: 500 },
    )
  }
}
