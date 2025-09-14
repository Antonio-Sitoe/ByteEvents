import nodemailer from 'nodemailer'
import { render } from '@react-email/render'
import { env } from '@/lib/env'
import type { EmailJobData } from '@/@types/invitations-job'
import ByteEventsInviteEmail from './email-template'

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: true,
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASSWORD,
  },
})

interface SendEmailParams extends Pick<EmailJobData, 'email' | 'subject'> {
  username: string
  invitedByUsername: string
  invitedByEmail: string
  eventName: string
  inviteLink: string
}

export async function sendEmail({
  email,
  subject,
  username,
  invitedByUsername,
  invitedByEmail,
  eventName,
  inviteLink,
}: SendEmailParams) {
  const html = await render(
    <ByteEventsInviteEmail
      username={username}
      invitedByUsername={invitedByUsername}
      invitedByEmail={invitedByEmail}
      eventName={eventName}
      inviteLink={inviteLink}
    />
  )

  const info = await transporter.sendMail({
    from: `"ByteEvents" <${env.EMAIL_USER}>`,
    to: email,
    subject,
    html,
  })

  console.log('Email enviado:', info.messageId)
}
