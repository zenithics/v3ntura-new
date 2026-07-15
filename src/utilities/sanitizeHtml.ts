/**
 * Sanitise rich text HTML content to prevent stored XSS.
 * Strips dangerous tags and attributes from HTML strings.
 *
 * This is a lightweight server-side sanitiser. For full XSS prevention,
 * React's JSX already escapes rendered content. This catches edge cases
 * where rich text HTML is rendered with dangerouslySetInnerHTML.
 */

// Dangerous URL schemes
const DANGEROUS_SCHEMES = /^(javascript|data|vbscript):/i

/**
 * Sanitise an HTML string.
 * Removes script tags, event handlers, dangerous URLs, and disallowed tags.
 */
export function sanitizeHtml(html: string): string {
  if (!html || typeof html !== 'string') return ''

  let sanitized = html

  // Remove script tags and their content
  sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')

  // Remove event handlers (onclick, onerror, onload, etc.)
  sanitized = sanitized.replace(/\s+on\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, '')

  // Remove style attributes that could contain expressions
  sanitized = sanitized.replace(/\s+style\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, '')

  // Remove dangerous URI schemes from href and src
  sanitized = sanitized.replace(
    /(href|src)\s*=\s*(?:"([^"]*)"|'([^']*)')/gi,
    (match, attr, doubleQuoted, singleQuoted) => {
      const url = doubleQuoted || singleQuoted || ''
      if (DANGEROUS_SCHEMES.test(url.trim())) {
        return `${attr}="#"`
      }
      return match
    },
  )

  // Remove dangerous tags (with their content where applicable)
  const dangerousTags = [
    'iframe', 'object', 'embed', 'form', 'input', 'textarea',
    'select', 'button', 'applet', 'meta', 'link', 'base',
  ]
  for (const tag of dangerousTags) {
    const openClose = new RegExp(`<${tag}\\b[^>]*>[\\s\\S]*?<\\/${tag}>`, 'gi')
    const selfClose = new RegExp(`<${tag}\\b[^>]*\\/?>`, 'gi')
    sanitized = sanitized.replace(openClose, '')
    sanitized = sanitized.replace(selfClose, '')
  }

  return sanitized
}
