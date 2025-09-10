import { Queue } from 'bullmq'
import { emailConnection } from './email-conection'

export const emailQueue = new Queue('emailQueue', {
  connection: emailConnection,
})
