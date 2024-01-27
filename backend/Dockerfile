# STAGE 1
FROM node:18.17.1 as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# STAGE 2
FROM node:18.17.1-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production
COPY --from=builder /app/dist ./dist

EXPOSE 3001
CMD [ "node", "dist/src/main.js" ]
