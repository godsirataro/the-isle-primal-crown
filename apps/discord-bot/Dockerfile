FROM node:22-alpine
WORKDIR /app
COPY package.json ./
COPY apps/web/package.json ./apps/web/package.json
COPY apps/api/package.json ./apps/api/package.json
COPY apps/discord-bot/package.json ./apps/discord-bot/package.json
RUN npm install --no-audit --no-fund
COPY apps/discord-bot ./apps/discord-bot
RUN npm run build -w @primal-crown/discord-bot
CMD ["npm","run","start","-w","@primal-crown/discord-bot"]
