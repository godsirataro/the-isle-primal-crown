# Discord Alpha Setup

1. Create a server for PRIMAL CROWN, with rules, Welcome, Party Finder, Support and Staff channels. Use distinct staff roles.
2. Create a Discord Application at https://discord.com/developers/applications and add a bot with **minimal** permissions: Use Application Commands, Send Messages (and View Channels in test areas). No Administrator permission.
3. Invite the bot to a private test guild via OAuth2. Get the application ID, bot token and test guild ID. Never place secrets in Git.
4. Set `DISCORD_BOT_TOKEN`, `DISCORD_APPLICATION_ID`, `DISCORD_TEST_GUILD_ID`, `API_BASE_URL`, `INTERNAL_API_TOKEN` in a local environment.
5. Run `npm run commands:register -w @primal-crown/discord-bot` and `npm run dev:bot` after the API and DB are running.
6. Verify `/server`, `/party create`, `/party list`, `/party join`, `/party close` in the test guild.

**Important:** Bot commands create only external community planning parties; joining them does **not** group dinosaurs in-game. Do not ask for Steam passwords. Discord permissions, privacy and The Isle rules still apply.

For Alpha, commands are test-guild only. Do not publish globally until moderation, rate limits and privacy procedures are tested.
