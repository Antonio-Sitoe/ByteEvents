FROM node:22-alpine

WORKDIR /app

RUN apk add --no-cache python3 make g++

COPY package*.json ./
RUN npm ci --no-audit --no-fund

COPY . .
RUN npm run build

RUN npm ci --only=production --no-audit --no-fund && npm cache clean --force

RUN mkdir -p uploads

COPY start.sh ./
RUN chmod +x start.sh

EXPOSE 10000

CMD ["./start.sh"]