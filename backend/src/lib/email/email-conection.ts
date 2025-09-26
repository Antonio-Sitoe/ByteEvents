import { env } from '@/lib/env'
import { ConnectionOptions } from 'bullmq'

export const emailConnection: ConnectionOptions = {
  host: env.EMAIL_HOST || 'localhost',
  port: env.EMAIL_PORT || 6379,
}
