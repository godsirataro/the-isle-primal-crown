# ADR 0001 — Modular monorepo for Alpha

Status: Accepted for Foundation.

Use npm workspaces with Next.js, NestJS, discord.js and PostgreSQL. Keep the official game server separate from community services to avoid competing CPU and failure domains. Shared-secret Bot-to-API authentication is an Alpha stepping stone; public mutating endpoints need end-user OAuth sessions/permissions before launch. Make public server status unavailable until real verified integration exists. No speculative game data.
