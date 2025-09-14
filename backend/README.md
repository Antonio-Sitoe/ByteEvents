# ByteEvents Backend

Sistema de Gestão de Eventos - Backend API desenvolvido com Node.js, Fastify e TypeScript.

## 🚀 Funcionalidades

### Para Organizadores

- ✅ Criação e gestão de eventos
- ✅ Gestão de palestrantes
- ✅ Base de contactos
- ✅ Sistema de convites por email
- ✅ Relatórios e estatísticas
- ✅ Dashboard completo

### Para Participantes

- ✅ Bilhete digital com QR Code
- ✅ Visualização de eventos e palestrantes

## 🛠️ Tecnologias

- **Node.js** - Runtime JavaScript
- **TypeScript** - Tipagem estática
- **Fastify** - Framework web rápido
- **POSTGRESQL** - Banco de dados
- **JWT** - Autenticação
- **ZOD** - Validação de dados

## 📦 Instalação

1. **Clone o repositório**

```bash
git clone <repository-url>
cd ByteEvents/backend
```

2. **Instale as dependências**

```bash
npm install
```

3. **Configure as variáveis de ambiente**

```bash
cp env.example .env
```

Edite o arquivo `.env` com suas configurações:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database
DATABASE_URL=./database.sqlite

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-here



# Frontend URL
FRONTEND_URL=http://localhost:3001
```

4. **Execute o projeto**

Desenvolvimento:

```bash
npm run dev
```

Produção:

```bash
npm run build
npm start
```

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
