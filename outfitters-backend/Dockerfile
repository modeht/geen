FROM node:lts-alpine

RUN npm i -g pnpm
RUN npm i -g @nestjs/cli

WORKDIR /app

COPY package.json .

COPY pnpm-lock.yaml .

RUN pnpm install

COPY . .

RUN pnpm build

EXPOSE 3000

CMD [ "pnpm", "start:prod"]
