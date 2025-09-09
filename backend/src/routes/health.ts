import type { FastifyInstance } from 'fastify'
import { z } from 'zod'

export async function healthRoutes(app: FastifyInstance) {
  app.get(
    '/',
    {
      schema: z.object({
        message: z.string(),
        timestamp: z.string(),
        service: z.string(),
      }),
    },
    (_, res) => {
      res.send({
        message: 'ByteEvents API is running',
        timestamp: new Date().toISOString(),
        service: 'ByteEvents API',
      })
    },
  )
}
