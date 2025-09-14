import { env } from '@/lib/env'
import { Worker } from 'bullmq'
import { sendEmail } from './email-config'
import { emailConnection } from './email-conection'
import type { EmailJobData } from '@/@types/invitations-job'

const worker = new Worker(
  'emailQueue',
  async (job) => {
    const { email, subject, token, username, eventTitle } =
      job.data as EmailJobData
    console.log(job.data)
    try {
      const sendData = {
        email,
        subject,
        username: username,
        invitedByUsername: 'ByteEvents Team',
        invitedByEmail: 'team@byteevents.com',
        eventName: eventTitle,
        inviteLink: `${env.FRONTEND_URL}/sign-in?token=${token}`,
      }
      console.log('Dados para envio de e-mail:', sendData)
      await sendEmail(sendData)
    } catch (error) {
      console.error(`Erro ao enviar o e-mail para ${email}:`, error)
      throw error
    }
  },
  {
    connection: emailConnection,
  }
)

worker.on('completed', (job) => {
  console.log(`Job ${job?.id} concluído com sucesso!`)
})

worker.on('failed', async (job, err) => {
  console.log(`Job ${job?.id} falhou com o erro:`, err)
})

console.log('Worker do BullMQ iniciado e aguardando jobs...')
