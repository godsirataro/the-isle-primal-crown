FROM node:22-alpine
WORKDIR /app
COPY package.json ./
COPY apps/web/package.json ./apps/web/package.json
COPY apps/api/package.json ./apps/api/package.json
COPY apps/discord-bot/package.json ./apps/discord-bot/package.json
RUN npm install --no-audit --no-fund
COPY apps/web ./apps/web
ARG NEXT_PUBLIC_DISCORD_INVITE_URL=""
ENV NEXT_PUBLIC_DISCORD_INVITE_URL=${NEXT_PUBLIC_DISCORD_INVITE_URL}
RUN npm run build -w @primal-crown/web
EXPOSE 3000
CMD ["npm","run","start","-w","@primal-crown/web"]
