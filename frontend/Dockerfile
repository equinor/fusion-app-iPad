FROM node:alpine as base

WORKDIR /app
COPY . .
WORKDIR /app/frontend
RUN npm install

EXPOSE 3000

ENTRYPOINT npm start
