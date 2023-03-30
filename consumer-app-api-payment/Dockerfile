FROM node:14-alpine As installer

ENV NODE_ENV isntall

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

COPY . .

FROM node:14-alpine As builder

ENV NODE_ENV build

WORKDIR /usr/src/app

COPY --from=installer /usr/src/app/ ./

RUN  npm run build

FROM node:14-alpine as production

ENV NODE_ENV production

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/package*.json ./

RUN npm i --only=production

COPY --from=builder /usr/src/app/dist ./dist

CMD ["npm", "run", "start:prod"]
