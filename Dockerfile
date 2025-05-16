FROM node:23.11.0

COPY package.json pnpm-lock.yaml /app/
WORKDIR /app

RUN npm i -g corepack && corepack enable && pnpm i

COPY . /app/
RUN pnpm run build

CMD ["node", "/app/build/index.js"]
