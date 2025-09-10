import { Worker } from 'bullmq'

import { env } from '@/lib/env'
import { sendEmail } from './email-config'
import { emailConnection } from './email-conection'
import { EmailJobData } from '@/@types/invitations-job'

const worker = new Worker(
  'emailQueue',
  async (job) => {
    const { email, subject, ticket, username, eventTitle } =
      job.data as EmailJobData
    console.log('Dados do job:', job.data)
    console.log(`Processando job: ${job.id} para o e-mail: ${email}`)
    try {
      const sendData = {
        email,
        subject,
        username: username,
        invitedByUsername: 'ByteEvents Team',
        invitedByEmail: 'team@byteevents.com',
        eventName: eventTitle,
        inviteLink: `${env.FRONTEND_URL}/event/${ticket}?email=${email}`,
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
