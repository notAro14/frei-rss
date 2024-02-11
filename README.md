# FreiRSS

FreiRSS is a simple and clean RSS feed reader. Those are the features currenlty implemented

- discover any website's RSS feed if it has one
- subscribe to RSS feed
- mark an article as read
- see unread articles
- see this month articles
- see all articles of a subscribed feed
- refresh a subscribed feed to get latest articles
- read article excerpt and content (if available) with the in-app reader

## Tech stack

FreiRSS is a SPA built on top of

- [RSS parser](https://github.com/rbren/rss-parser)
- Next.js
- Typescript
- Redux Toolkit
- Radix themes and Tailwind
- Supabase
- Vitest

## How to launch locally

### Pre-requisites

> [TODO] Full documentation

- pnpm, docker, node (LTS)
- create github and google oauth app
- create Supabase project
- setup Supabase locally and link to remote project
- create and fill a `.env` file based on `.env.example`
- apply migrations
- start local Supabase

### Local dev

- clone the repo
- install dependencies
- generate supabase types
- run with `pnpm dev`

## Handy scripts

### Generate supabase types

```bash
npx supabase gen types typescript --project-id $SUPABASE_PROJECT_ID --schema public > src/types/supabase.ts
```
