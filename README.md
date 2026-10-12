# PRIMAL CROWN — Alpha 0.1

**Every Herd Has a Legacy.** Thailand-first, community-centered The Isle EVRIMA project.

> **STATUS: FOUNDATION / PRIVATE ALPHA SOFTWARE.** This repository does **not** host The Isle, does not claim online players, and does not process payments. The Isle is owned by its respective developer/publisher. All game files and credentials belong outside this repository.

## What already works in the foundation

- Responsive black/gold Next.js website: landing, party list and six **preview-only** supporter tiers.
- NestJS API: process health, DB readiness, honest game status (`unconfigured`), persisted community planning parties.
- Discord Bot: `/server`, `/help`, `/party create`, `/party list`, `/party join`, `/party close`.
- PostgreSQL schema migration, Docker Compose, CI pipeline and operations documents.
- Party groups are external planning sessions; they **do not** create groups inside The Isle.

## Quick start (local)

Requires Node.js 22+, npm 10+, Docker + Compose and Internet access for dependencies.

```bash
cp .env.example .env
# Change POSTGRES_PASSWORD everywhere it appears, DATABASE_URL and INTERNAL_API_TOKEN.
# INTERNAL_API_TOKEN must be at least 32 random characters.
docker compose up --build -d postgres api web
curl -f http://localhost:4000/v1/health
curl -f http://localhost:4000/v1/ready
```

Open **http://localhost:3000**. API docs are currently in [Architecture](docs/ARCHITECTURE.md) and [Runbook](docs/RUNBOOK.md).

The containers bind ports 3000, 4000 and 5432 on localhost, not the public network. Add an HTTPS reverse proxy before remote access.

### Discord (optional)

Create a Discord application and test guild, then set `DISCORD_BOT_TOKEN`, `DISCORD_APPLICATION_ID`, `DISCORD_TEST_GUILD_ID` and `INTERNAL_API_TOKEN` in the root `.env`. Register commands from the host (requires npm install):

```bash
npm install
npm run commands:register -w @primal-crown/discord-bot
docker compose --profile bot up -d discord-bot
```

The bot needs only Guilds intent and scoped permissions. Read [Discord Setup](docs/DISCORD.md). Live game integration and Steam Login are **not** implemented.

## Project structure

```text
apps/web           Next.js website and CSS design system
apps/api           NestJS REST API, PostgreSQL schema, bot authentication
apps/discord-bot   Discord slash commands
docs/              Architecture, operations, roadmap and decisions
docker-compose.yml Local Docker environment (no game executable)
.github/workflows  PR build and validation
```

## Security / Legal

- Do not commit game binaries, EOS/RCON secrets, Discord tokens or player data.
- Never expose PostgreSQL, Redis or RCON publicly.
- Paid tiers at 0 / 49 / 99 / 299 / 499 / 999 THB are display-only; payment processing remains disabled pending developer and processor clearance.
- See [Roadmap](docs/ROADMAP.md) for server POC, backups, HerdOS, moderation and future launch gates.

## Commands

```bash
npm run build
npm run typecheck
npm run test
npm run db:migrate
```

**Not production ready.** Perform real integration, load, crash recovery, privacy/security and game-license checks first.
