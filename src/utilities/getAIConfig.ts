import { getPayload } from 'payload'
import configPromise from '@payload-config'

export interface AIConfig {
  enabled: boolean
  apiKey: string | null
  model: string
  systemContext: string
}

const TONE_DESCRIPTIONS: Record<string, string> = {
  professional: 'Write in a professional, clear, and authoritative tone.',
  casual: 'Write in a friendly, warm, and conversational tone.',
  playful: 'Write in a playful, energetic, and fun tone. Use enthusiasm and energy.',
  luxury: 'Write in an elegant, refined, and aspirational tone. Use sophisticated language.',
  bold: 'Write in a bold, confident, and direct tone. Be unconventional and punchy.',
  empathetic: 'Write in a supportive, understanding, and caring tone.',
  technical: 'Write in a precise, detailed, and expert-level tone.',
}

export async function getAIConfig(): Promise<AIConfig> {
  const payload = await getPayload({ config: configPromise })

  const settings = await payload.findGlobal({
    slug: 'ai-settings',
  })

  const enabled = Boolean(settings?.enabled)
  const apiKey = (settings?.apiKey as string) || process.env.ANTHROPIC_API_KEY || null
  const model = (settings?.model as string) || 'claude-sonnet-4-20250514'

  const contextParts: string[] = []

  const toneKey = (settings?.writingTone as string) || 'professional'
  contextParts.push(TONE_DESCRIPTIONS[toneKey] || TONE_DESCRIPTIONS.professional)

  if (settings?.businessContext) {
    contextParts.push(`\nBusiness context: ${settings.businessContext}`)
  }

  if (settings?.targetAudience) {
    contextParts.push(`\nTarget audience: ${settings.targetAudience}`)
  }

  if (settings?.writingGuidelines) {
    contextParts.push(`\nWriting guidelines: ${settings.writingGuidelines}`)
  }

  const phrases = settings?.examplePhrases as Array<{ phrase: string }> | undefined
  if (phrases && phrases.length > 0) {
    contextParts.push(
      `\nBrand phrases to reference: ${phrases.map((p) => `"${p.phrase}"`).join(', ')}`,
    )
  }

  contextParts.push('\nUse British English spelling.')

  return {
    enabled,
    apiKey,
    model,
    systemContext: contextParts.join('\n'),
  }
}
