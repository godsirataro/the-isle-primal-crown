# Alpha 0.1 Architecture

## Scope

- **Game:** Official The Isle EVRIMA dedicated server is an EXTERNAL SERVICE. No game files, reverse engineering, memory reading, or injections are included.
- **Web:** Next.js responsive brand landing + public server-status/parties pages + membership preview (billing disabled).
- **API:** NestJS, PostgreSQL, public GET endpoints and shared-secret-protected bot mutations.
- **Discord:** discord.js slash commands to create, list, join and close *community planning parties*. These are **NOT native game groups**.
- **Operations:** Docker Compose for web/API/bot/Postgres only; game binaries are managed by a separate host or service.

```text
Web Browser -> Next.js (3000) -> NestJS HTTP API (4000) -> PostgreSQL (5432)
Discord -> Discord Bot -> authenticated internal API -> PostgreSQL
The Isle EVRIMA -> NOT CONNECTED in Alpha 0.1; game status = unconfigured
```

## Trust boundaries

1. Browser GET endpoints are public. No browser API call can create/update parties.
2. Mutations require `Authorization: Bearer INTERNAL_API_TOKEN` and are initiated by the trusted Discord bot; Discord identifies members.
3. Never commit tokens, user data, game executables, or payments credentials.
4. RCON is not implemented. It must never be exposed to browser clients, and the future gateway requires an allowlist and audit log.
5. This repo makes no promises about official in-game player data or population until tested integration exists.

## Future increments

1. Steam OpenID account linking with strict identity verification.
2. HerdOS persistent herds + permissions + invitations.
3. Nest finder, seasonal events, moderation and staff audit.
4. Game status RCON adapter only after compatibility, authorization and load testing.
5. Membership entitlements and payment sandbox; live collection requires game-owner/commercial and payment-provider approval.

## Deployment

See [RUNBOOK](RUNBOOK.md) for bring-up, health checks, backups and incident operations.
