# CLAUDE.md - GAB Platform

Plateforme communautaire pour l'adoption de l'IA générative par les professionnels.

## Commandes

```bash
npm install          # Installer les dépendances
npm run dev          # Serveur de développement (Turbopack)
npm run build        # Build de production
npm run lint         # Linter ESLint
npm run start        # Serveur de production
```

## Vérifications avant commit

Toujours exécuter ces commandes avant de commiter :

```bash
npm run lint && npm run build
```

Les deux doivent passer sans erreur.

## Conventions de commits

Format Conventional Commits obligatoire :

```
<type>(<scope>): <description>

Types: feat, fix, docs, style, refactor, test, chore
Scope: optionnel (blog, events, resources, formations, ui, api)
```

Exemples :

- `feat(blog): add article sharing buttons`
- `fix(events): correct date formatting for past events`
- `chore: update dependencies`

## Stack technique

- **Framework** : Next.js 15 (App Router, React 19)
- **Hosting** : Vercel
- **Styling** : Tailwind CSS
- **UI** : shadcn/ui (composants dans `components/ui/`)
- **Forms** : React Hook Form + Zod
- **Intégrations** : Luma (events), Resend (newsletter)

## Structure du projet

```
app/
├── (marketing)/          # Pages publiques (SSG)
│   ├── page.tsx          # Landing
│   ├── events/           # Événements + replays
│   ├── blog/             # Articles [slug]
│   ├── ressources/       # Ressources [slug]
│   ├── formations/       # Formations [slug]
│   └── soutenir/         # Page de soutien
├── api/newsletter/       # Route API newsletter
└── layout.tsx            # Layout racine

components/
├── ui/                   # shadcn (ne pas modifier directement)
├── layout/               # Header, Footer, Navigation
├── events/               # EventCard, EventList
├── blog/                 # ArticleCard
├── resources/            # ResourceCard, CopyButton
└── forms/                # NewsletterForm

lib/
├── validations/          # Schémas Zod
└── utils.ts              # Helpers (cn, formatDate)
```

## Conventions de code

- **Langue** : Français pour la communication, anglais pour le code
- **Routing** : App Router (file-based)
- **Data fetching** : Server Components par défaut
- **Mutations** : Server Actions
- **Validation** : Schémas Zod dans `lib/validations/`
- **Imports UI** : Toujours depuis `@/components/ui/`
- **Styles** : Tailwind uniquement, utiliser `cn()` pour les classes conditionnelles

## Variables d'environnement requises

```
RESEND_API_KEY=
```

## Documentation détaillée

- Architecture : `_bmad-output/planning-artifacts/architecture.md`
- PRD : `_bmad-output/planning-artifacts/prd.md`
- UX Design : `_bmad-output/planning-artifacts/ux-design-specification.md`
