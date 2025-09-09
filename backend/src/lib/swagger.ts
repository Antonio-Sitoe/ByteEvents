import type { FastifyInstance } from 'fastify'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'
import { env } from './env'

export function swaggerConfig(app: FastifyInstance) {
  app.register(swagger, {
    swagger: {
      info: {
        title: 'ByteEvents API',
        description: 'API para gestão de eventos',
        version: '1.0.0',
      },
      host: `localhost:${env.PORT}`,
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
      securityDefinitions: {
        bearerAuth: {
          type: 'apiKey',
          name: 'Authorization',
          in: 'header',
          description:
            'JWT Authorization header using the Bearer scheme. Example: "Authorization: Bearer {token}"',
        },
      },
      tags: [
        { name: 'auth', description: 'Autenticação e usuários' },
        { name: 'events', description: 'Gestão de eventos' },
        { name: 'speakers', description: 'Gestão de palestrantes' },
        { name: 'participants', description: 'Gestão de participantes' },
      ],
    },
  })

  app.register(swaggerUi, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false,
    },
    uiHooks: {
      onRequest: (_request, _reply, next) => {
        next()
      },
      preHandler: (_request, _reply, next) => {
        next()
      },
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, _request, _reply) => {
      return swaggerObject
    },
    transformSpecificationClone: true,
  })
}
