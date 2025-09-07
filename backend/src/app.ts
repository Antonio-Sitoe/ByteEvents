import Fastify from 'fastify'
import cors from '@fastify/cors'
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { env } from './lib/env'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { healthRoutes } from './routes/health'
import { swaggerConfig } from './lib/swagger'
import { eventsRoutes } from './routes/events'

const app = Fastify()
  .withTypeProvider<ZodTypeProvider>()
  .setValidatorCompiler(validatorCompiler)
  .setSerializerCompiler(serializerCompiler)
  .register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  })
  .register(swaggerConfig)
  .register(healthRoutes)
  .register(eventsRoutes)
// app.register(authRoutes)

app
  .listen({ port: env.PORT })
  .then(() => {
    console.log(`Server is running on port http://localhost:${env.PORT}`)
  })
  .catch((err) => {
    app.log.error(err)
    process.exit(1)
  })
