import * as OTPAuth from 'otpauth'
import crypto from 'crypto'

const BACKUP_CODE_COUNT = 8
const BACKUP_CODE_LENGTH = 10

export function generateTOTPSecret(accountName: string, issuer = 'Site Admin'): {
  secret: string
  uri: string
} {
  const totp = new OTPAuth.TOTP({
    issuer,
    label: accountName,
    algorithm: 'SHA1',
    digits: 6,
    period: 30,
  })

  const secret = totp.secret.base32

  return { secret, uri: totp.toString() }
}

export function validateTOTPCode(base32Secret: string, code: string): boolean {
  try {
    const totp = new OTPAuth.TOTP({
      algorithm: 'SHA1',
      digits: 6,
      period: 30,
      secret: OTPAuth.Secret.fromBase32(base32Secret),
    })

    const delta = totp.validate({ token: code, window: 1 })
    return delta !== null
  } catch {
    return false
  }
}

export function generateBackupCodes(): string[] {
  return Array.from({ length: BACKUP_CODE_COUNT }, () =>
    crypto.randomBytes(BACKUP_CODE_LENGTH / 2).toString('hex'),
  )
}

export function hashBackupCode(code: string): string {
  return crypto.createHash('sha256').update(code).digest('hex')
}

export function validateBackupCode(storedHashes: string[], submittedCode: string): number {
  const hash = hashBackupCode(submittedCode.toLowerCase().trim())
  return storedHashes.findIndex((h) => h === hash)
}
