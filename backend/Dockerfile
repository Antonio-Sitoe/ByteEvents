FROM node:22-alpine

WORKDIR /app

RUN apk add --no-cache python3 make g++

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

RUN npm ci --only=production

RUN mkdir -p uploads

EXPOSE 3333

CMD ["npm", "start"]