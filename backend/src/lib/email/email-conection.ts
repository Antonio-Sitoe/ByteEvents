import { env } from '@/lib/env'

export const emailConnection = {
  host: env.EMAIL_HOST || 'localhost',
  port: env.EMAIL_PORT || 6379,
}
