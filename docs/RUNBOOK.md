# Operator Runbook — Alpha 0.1

This foundation is not a public production game server.

## Local start

1. Install Node.js 22+, npm 10+, Docker Engine with Compose.
2. `cp .env.example .env` and replace the two example secrets with strong random values.
3. `npm install` (requires Internet access).
4. `docker compose up --build -d postgres api web`.
5. Verify: `curl -f http://localhost:4000/v1/health`, `curl -f http://localhost:4000/v1/ready`, then visit http://localhost:3000.
6. The game-server status intentionally reports `unconfigured`. Do not represent it as online.
7. To enable Discord, create an application/bot and scope it to your test guild; provide bot env vars and start `docker compose --profile bot up -d discord-bot`. Register slash commands: `npm run commands:register -w @primal-crown/discord-bot` after setting env locally.

## Backups

- Development backup: `docker compose exec -T postgres pg_dump -U primal -d primal_crown -Fc > primal-backup.dump` (adapt user and DB to your .env).
- Restore into a **separate test database** using `pg_restore`; confirm party rows are present. Never run restore against a live DB before a verified offsite snapshot.
- Production requires encrypted offsite backups and a tested recovery time objective. Docker local volume alone is not a backup.

## Security gates

- Compose binds API, web and PostgreSQL to 127.0.0.1; put Caddy/Nginx with TLS in front for remote access.
- Rotate token if compromised, limit VM SSH access, patch OS, monitor Docker logs.
- Expose only the game UDP/TCP ports actually required by the documented dedicated-server release; RCON stays private.
- No payment collection, game-integrated group creation or real game-player statuses in this stage.

## Acceptance

- [ ] API health and readiness pass
- [ ] First migration creates parties/members tables
- [ ] Bot creates/joins/closes a community party with confirmed Discord identity
- [ ] Unauthenticated mutation returns HTTP 401
- [ ] Web shows real API state and never fabricates online players
- [ ] 24-hour smoke run, dependency scanning and restore drill (not executed in this PR)
