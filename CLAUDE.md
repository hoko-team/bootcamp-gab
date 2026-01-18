# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
npm run dev          # Start dev server with Turbopack
npm run build        # Production build
npm run lint         # Run ESLint
npm start            # Start production server
```

Pre-commit verification: `npm run lint && npm run build` (both must pass)

## Architecture Overview

This is a Next.js 15 (App Router) application using React 19, Supabase, and Tailwind CSS. It's a community platform for GenAI adoption ("GAB - GenAI Builders").

### Key Architectural Patterns

**Dual Supabase Client Pattern**
- `lib/supabase/client.ts`: Browser client for Client Components
- `lib/supabase/server.ts`: Server client with cookie management for Server Components and API routes
- Always use the appropriate client based on component type
- Server client handles SSR authentication via cookies

**Data Sources**
- Database queries: Supabase (articles, resources, formations, events, subscribers, partners)
- Static data: JSON files in `/data` (e.g., events.json for immediate use before DB migration)
- The codebase is transitioning from static JSON to Supabase for event data

**Routing Structure**
- Route groups: `app/(public)/` contains all public pages
- Dynamic routes use [slug] pattern: `/blog/[slug]`, `/formations/[slug]`, `/ressources/[slug]`
- API routes in `app/api/` (e.g., newsletter subscription)

**Form Validation Flow**
1. Define Zod schema in `lib/validations/`
2. Use in API route with `.parse()` for validation
3. Client-side forms use react-hook-form with zodResolver
4. Example: [app/api/newsletter/route.ts:8](app/api/newsletter/route.ts#L8)

**Component Organization**
- `components/ui/`: shadcn/ui primitives (managed by CLI, don't edit directly)
- `components/[domain]/`: Domain-specific components (events, blog, resources, forms, layout, hero)
- Use `cn()` utility from `lib/utils.ts` for conditional Tailwind classes

**Type Safety**
- Database types auto-generated in `lib/supabase/types.ts`
- Use `Database` type for type-safe Supabase queries
- All components use TypeScript

### Environment Variables

Required variables (see `.env.local.example`):
- `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Client access
- `SUPABASE_SERVICE_ROLE_KEY`: Server-side privileged operations
- `RESEND_API_KEY`: Newsletter email delivery

### Conventions

**Language**: Code and comments in English, user-facing content in French
**Imports**: Use `@/` alias for absolute imports from root
**Styling**: Tailwind classes only, no custom CSS except in `app/globals.css`
**Server Components**: Default to Server Components, only use "use client" when necessary (forms, interactivity)

## Additional Documentation

See [AGENTS.md](AGENTS.md) for detailed tech stack, database schema, commit conventions, and project planning artifacts.
