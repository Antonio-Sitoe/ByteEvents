# ByteEvents

## Visão Geral

O ByteEvents é uma aplicação full-stack para gestão de eventos, composta por um backend em Node.js/TypeScript e um frontend em Angular.

## Diagrama de Arquitetura

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │     Backend     │    │   Banco de      │
│   (Angular)     │◄──►│   (Node.js)     │◄──►│   Dados         │
│   Port: 4200    │    │   Port: 3333    │    │   (PostgreSQL)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │
                                ▼
                       ┌─────────────────┐
                       │     Cache       │
                       │     (Redis)     │
                       │   Port: 6379    │
                       └─────────────────┘
```

## Componentes Principais

### Frontend (Angular)

- **Tecnologia:** Angular 20 + TypeScript
- **UI:** Tailwind CSS + DaisyUI
- **Porta:** 4200
- **Funcionalidades:**
  - Dashboard administrativo
  - Área do participante
  - Componentes reutilizáveis
  - Design responsivo

### Backend (Node.js)

- **Tecnologia:** Node.js 22 + TypeScript + Fastify
- **Porta:** 3333
- **Funcionalidades:**
  - API REST
  - Autenticação JWT
  - Sistema de convites por email
  - Documentação Swagger

### Banco de Dados

- **Tecnologia:** PostgreSQL 15
- **Porta:** 5433
- **ORM:** Drizzle
- **Tabelas principais:**
  - users
  - events
  - speakers
  - contacts
  - invitations
  - participants

### Cache

- **Tecnologia:** Redis 6
- **Porta:** 6379
- **Uso:** Filas de email (BullMQ)

## Fluxo de Dados

### 1. Autenticação

```
Frontend → Backend → JWT Token → Frontend
```

### 2. Gestão de Eventos

```
Frontend → Backend API → PostgreSQL → Backend → Frontend
```

### 3. Sistema de Convites

```
Backend → Redis Queue → Email Worker → Email Service
```

## Estrutura de Pastas

```
ByteEvents/
├── backend/           # API Node.js
│   ├── src/
│   │   ├── routes/    # Endpoints da API
│   │   ├── db/        # Schemas e migrações
│   │   ├── lib/       # Utilitários e configurações
│   │   └── utils/     # Validações e schemas
│   └── docker-compose.yml
└── frontend/          # Aplicação Angular
    └── src/
        ├── app/
        │   ├── pages/     # Páginas da aplicação
        │   ├── shared/    # Componentes compartilhados
        │   └── core/      # Serviços e guards
        └── assets/        # Recursos estáticos
```

## Deploy

### Desenvolvimento

- Backend: `npm run dev && npm run worker`
- Frontend: `npm start`
- Banco: `docker-compose up -d`

### Produção

- Backend: `npm run build && npm start && npm run worker`
- Frontend: `npm run build`
- Banco: Docker containers

## Monitoramento

- **API Docs:** http://localhost:3333/docs
- **Health Check:** http://localhost:3333/health

## Comunicação

- **Frontend ↔ Backend:** HTTP/HTTPS (REST API)
- **Backend ↔ Banco:** Drizzle ORM
- **Backend ↔ Redis:** BullMQ
- **Email Service:** Nodemailer
