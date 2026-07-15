import type { TextField, TextareaField } from 'payload'

/**
 * Wraps a text or textarea field config to add an AI generate button in the admin UI.
 * Click ✨ Generate next to the field to generate copy with brand context from AI Settings.
 */
export function withAIGenerate<T extends TextField | TextareaField>(field: T): T {
  return {
    ...field,
    admin: {
      ...field.admin,
      components: {
        ...field.admin?.components,
        afterInput: [
          ...(field.admin?.components?.afterInput || []),
          {
            path: '@/components/AIWriteButton',
            clientProps: {
              fieldLabel: typeof field.label === 'string' ? field.label : field.name,
            },
          },
        ],
      },
    },
  } as T
}
