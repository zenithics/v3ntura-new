/**
 * Simple in-memory rate limiter for API routes.
 * Uses a Map with automatic cleanup of expired entries.
 *
 * Note: This is per-serverless-instance on Vercel. For truly global
 * rate limiting at scale, you'd use Vercel KV or Upstash Redis.
 * This is sufficient for preventing casual abuse and brute-force attacks.
 */

interface RateLimitEntry {
  count: number
  resetAt: number
}

const rateLimitMap = new Map<string, RateLimitEntry>()

// Clean up expired entries every 5 minutes
setInterval(() => {
  const now = Date.now()
  for (const [key, entry] of rateLimitMap) {
    if (now > entry.resetAt) {
      rateLimitMap.delete(key)
    }
  }
}, 5 * 60 * 1000)

interface RateLimitOptions {
  /** Maximum number of requests allowed in the window */
  maxRequests: number
  /** Time window in seconds */
  windowSeconds: number
}

interface RateLimitResult {
  allowed: boolean
  remaining: number
  resetAt: number
}

/**
 * Check if a request is rate-limited.
 *
 * @param key - Unique identifier (e.g. IP address, email, or combined)
 * @param options - Rate limit configuration
 * @returns Whether the request is allowed
 */
export function checkRateLimit(key: string, options: RateLimitOptions): RateLimitResult {
  const now = Date.now()
  const entry = rateLimitMap.get(key)

  if (!entry || now > entry.resetAt) {
    const resetAt = now + options.windowSeconds * 1000
    rateLimitMap.set(key, { count: 1, resetAt })
    return { allowed: true, remaining: options.maxRequests - 1, resetAt }
  }

  if (entry.count >= options.maxRequests) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt }
  }

  entry.count++
  return { allowed: true, remaining: options.maxRequests - entry.count, resetAt: entry.resetAt }
}

/**
 * Get the client IP from request headers.
 */
export function getClientIP(headers: Headers): string {
  return (
    headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    headers.get('x-real-ip') ||
    'unknown'
  )
}
