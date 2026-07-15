import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { headers as getHeaders } from 'next/headers'
import { getAIConfig } from '../../../../../utilities/getAIConfig'

const BASE_SYSTEM_PROMPT = `You are a professional copywriter for websites and marketing. You write concise, compelling copy for specific form fields in a CMS.

RULES:
- Return ONLY the generated text — no quotes, no explanation, no markdown.
- Match the tone and length appropriate for the field type.
- Be specific and relevant to the context provided.
- For headings: 3-8 words, punchy and clear.
- For descriptions/subheadings: 1-2 sentences.
- For short descriptions: max 200 characters.
- For button text: 2-4 words, action-oriented.
- For meta titles: max 60 characters, include key terms.
- For meta descriptions: max 155 characters, include a call to action.
- For alt text: describe the image concisely for accessibility.`

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
        { error: 'AI features are disabled. An admin can enable them in System → AI Assistant.' },
        { status: 403 },
      )
    }

    if (!aiConfig.apiKey) {
      return NextResponse.json(
        { error: 'No API key configured. An admin can add one in System → AI Assistant.' },
        { status: 500 },
      )
    }

    const { fieldName, fieldLabel, currentValue, context, collectionSlug, documentTitle } =
      await req.json()

    if (!fieldName) {
      return NextResponse.json({ error: 'fieldName is required' }, { status: 400 })
    }

    const userPrompt = [
      `Generate copy for the "${fieldLabel || fieldName}" field.`,
      documentTitle ? `This is for a ${collectionSlug || 'page'} titled "${documentTitle}".` : '',
      context ? `Additional context: ${context}` : '',
      currentValue ? `Current value (improve this): "${currentValue}"` : '',
    ]
      .filter(Boolean)
      .join('\n')

    const systemPrompt = `${BASE_SYSTEM_PROMPT}\n\n--- BRAND CONTEXT ---\n${aiConfig.systemContext}`

    const client = new Anthropic({ apiKey: aiConfig.apiKey })

    const message = await client.messages.create({
      model: aiConfig.model,
      max_tokens: 500,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }],
    })

    const text = message.content[0].type === 'text' ? message.content[0].text.trim() : ''

    return NextResponse.json({ text })
  } catch (error: any) {
    console.error('AI copy generation error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to generate copy' },
      { status: 500 },
    )
  }
}
