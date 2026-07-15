import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { sendEmail } from '@/lib/mailer'

export async function POST(req: NextRequest) {
  try {
    const payload = await getPayload({ config: configPromise })

    // Must be authenticated admin
    const { user } = await payload.auth({ headers: req.headers })
    if (!user) {
      return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
    }

    const settings = await payload.findGlobal({ slug: 'mail-settings', depth: 0 })
    const to = settings?.testRecipient || (user as { email: string }).email

    if (!to) {
      return NextResponse.json({ error: 'No test recipient configured in Email Settings' }, { status: 400 })
    }

    await sendEmail({
      to,
      subject: 'Test email — your email is configured correctly!',
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 40px auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 8px;">
          <h2 style="color: #111827; margin: 0 0 16px;">✅ Email configured correctly</h2>
          <p style="color: #374151; margin: 0 0 12px;">
            This test email was sent from your CMS admin panel to confirm that your email settings are working.
          </p>
          <p style="color: #6b7280; font-size: 13px; margin: 0;">
            Provider: <strong>${settings?.provider || 'resend'}</strong><br>
            Sent to: <strong>${to}</strong>
          </p>
        </div>
      `,
    })

    return NextResponse.json({ success: true, sentTo: to })
  } catch (error) {
    console.error('Test email failed:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to send test email' },
      { status: 500 },
    )
  }
}
