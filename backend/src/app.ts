import Fastify from 'fastify'
import cors from '@fastify/cors'

import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'

import { env } from './lib/env'
import { healthRoutes } from './routes/health'
import { swaggerConfig } from './lib/swagger'
import { eventsRoutes } from './routes/events'
import { speakerRoutes } from './routes/speakers'
import { contactsRoutes } from './routes/contacts'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

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
  .register(speakerRoutes)
  .register(contactsRoutes)
// app.register(authRoutes)

app
  .listen({ port: env.PORT })
  .then(() => {
    console.log(`Server is running on port http://localhost:${env.PORT}`)
  })
  .catch((err) => {
    console.log(err)
    app.log.error(err)
    process.exit(1)
  })
