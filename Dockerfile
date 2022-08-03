FROM node:16-alpine

WORKDIR /app

COPY ./package.json ./
COPY ./tsconfig.json ./
COPY ./pnpm-lock.yaml ./

RUN npx pnpm install --frozen-lockfile

COPY ./src ./src

CMD [ "npx", "pnpm", "start"]
