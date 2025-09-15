import Fastify, { type FastifyReply, type FastifyRequest } from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'

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
import { invitationRoutes } from './routes/invitations'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { authRoutes } from './routes/auth'

const app = Fastify()
  .withTypeProvider<ZodTypeProvider>()
  .setValidatorCompiler(validatorCompiler)
  .setSerializerCompiler(serializerCompiler)
  .register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  })
  .register(jwt, {
    secret: env.JWT_SECRET,
  })
  .decorate(
    'authenticate',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        console.log('Authenticating request')
        await request.jwtVerify()
      } catch (err) {
        console.log('Error authenticating request', err)
        reply.code(401).send({ error: 'Unauthorized' })
        return
      }
    }
  )
  .register(swaggerConfig)
  .register(healthRoutes)
  .register(authRoutes)
  .register(eventsRoutes)
  .register(speakerRoutes)
  .register(contactsRoutes)
  .register(invitationRoutes)

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
