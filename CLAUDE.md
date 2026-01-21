# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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
- **Database** : Supabase (PostgreSQL)
- **Hosting** : Vercel
- **Styling** : Tailwind CSS + tailwindcss-animate
- **UI** : shadcn/ui (Radix UI + class-variance-authority)
- **Forms** : React Hook Form + Zod
- **Maps** : Leaflet + react-leaflet
- **Intégrations** : Luma (events), Resend (newsletter)

## Architecture du projet

```
app/
├── (public)/             # Pages publiques (SSG)
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
│   ├── button.tsx        # Variants: default, destructive, outline, secondary, ghost, link
│   ├── card.tsx          # Card, CardHeader, CardContent, CardFooter
│   ├── badge.tsx
│   ├── form.tsx          # React Hook Form integration
│   ├── input.tsx
│   ├── sheet.tsx         # Mobile menu
│   ├── skeleton.tsx
│   └── toast.tsx
├── layout/               # Header, Footer
├── hero/                 # Hero, AnimatedStripes
├── events/               # EventCard, EventsMap, EventsMapWrapper
├── blog/                 # ArticleCard
├── resources/            # ResourceCard, CopyButton
└── forms/                # NewsletterForm

data/
├── events.json           # 7 événements avec speakers, agenda, calendar
└── users.json            # 10 speakers avec profils complets

docs/
└── prd-events-filters-context.md  # PRD page events avec filtres

lib/
├── supabase/             # Client, server, types générés
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

## Design system

### Couleurs (variables CSS HSL)

- `--primary` / `--primary-foreground` : couleur principale
- `--secondary` / `--secondary-foreground` : couleur secondaire
- `--muted` / `--muted-foreground` : texte atténué
- `--accent` / `--accent-foreground` : accents
- `--destructive` : actions destructives
- `--background` / `--foreground` : fond et texte
- `--border`, `--input`, `--ring` : bordures et focus

### Typographie

- `font-heading` : Mode (titres)
- `font-body` : Capriola (corps de texte)
- `font-mono` : ui-monospace (code)

### Dark mode

Supporté via `darkMode: ["class"]` dans Tailwind.

## Patterns Next.js 15

### Client Components avec SSR désactivé

Pour les composants qui ne fonctionnent pas côté serveur (ex: Leaflet), utiliser un wrapper :

```tsx
// components/example/example-wrapper.tsx
"use client";

import dynamic from "next/dynamic";

const Example = dynamic(
  () => import("./example").then((mod) => mod.Example),
  { ssr: false, loading: () => <div>Chargement...</div> }
);

export function ExampleWrapper(props) {
  return <Example {...props} />;
}
```

### Routes dynamiques

Les routes `[slug]` utilisent `generateStaticParams()` pour le SSG :

```tsx
export async function generateStaticParams() {
  const items = await fetchItems();
  return items.map((item) => ({ slug: item.slug }));
}
```

## Données JSON locales

### Events (`data/events.json`)

7 événements avec structure enrichie :

```json
{
  "id": "event-4",
  "slug": "genai-builders-meetup-4",
  "title": "GenAI Builders Meetup #4",
  "short_description": "Nouvelle identité GAB...",
  "event_date": "2026-02-15T19:00:00Z",
  "event_end_date": "2026-02-15T22:00:00Z",
  "location": "Lille, Hauts-de-France",
  "address": "EuraTechnologies, 165 Av. de Bretagne, 59000 Lille",
  "coordinates": [50.6331, 3.0200],
  "event_type": "meetup",
  "is_past": false,
  "capacity": 83,
  "registered_count": 42,
  "speakers": ["user-1", "user-2"],
  "tags": ["#GenAI", "#Builders", "#CMS"],
  "registered_users": ["user-4", "user-6", "user-8"],
  "agenda": [
    { "time": "19:00", "title": "Accueil", "duration_minutes": 30 },
    { "time": "19:30", "title": "Talk", "speaker_ids": ["user-1"] }
  ],
  "resources": [{ "title": "Slides", "url": "/...", "type": "slides" }],
  "gallery_urls": ["/images/events/..."],
  "calendar": {
    "google_url": "https://calendar.google.com/...",
    "ical_data": "BEGIN:VCALENDAR..."
  }
}
```

**Champs pour features :**
- `capacity` + `registered_count` : Taux de remplissage (progress bar)
- `tags` : Tags dynamiques (#IA, #GenAI, etc.)
- `registered_users` : IDs des inscrits pour social proof (avatars)

### Users/Speakers (`data/users.json`)

10 speakers avec profils :

```json
{
  "id": "user-1",
  "name": "Pierre Burgy",
  "role": "CEO",
  "company": "Strapi",
  "bio": "Fondateur et CEO de Strapi...",
  "avatar_url": "/images/speakers/pierre-burgy.webp",
  "linkedin_url": "https://linkedin.com/in/pierreburgy",
  "twitter_url": "https://twitter.com/pierreburgy"
}
```

### Liaison Events <-> Speakers

```tsx
// Récupérer les speakers d'un event
import usersData from "@/data/users.json";

const speakers = event.speakers
  .map(id => usersData.find(u => u.id === id))
  .filter(Boolean);
```

## Base de données Supabase

### Tables et types (définis dans `lib/supabase/types.ts`)

**articles**
- `slug`, `title`, `content`, `excerpt`
- `category`, `tags[]`, `featured_image`
- `published`, `published_at`

**resources**
- `slug`, `title`, `content`
- `type`: `"guide" | "skill" | "template" | "prompt"`
- `parcours[]`
- `difficulty`: `"beginner" | "intermediate" | "advanced"`

**formations**
- `slug`, `title`, `description`
- `parcours`, `modules` (JSONB)

**events**
- `slug`, `title`, `description`
- `event_date`, `event_end_date`, `location`
- `image_url`, `registration_url`, `replay_url`
- `is_past`, `published`, `capacity`
- `event_type`: `"meetup" | "webinar" | "workshop" | "conference"`

**subscribers**
- `email`, `confirmed`, `parcours[]`

**partners**
- `name`, `logo_url`, `website`, `active`

### Type helpers

```tsx
import type { Event, Article, Resource } from "@/lib/supabase/types";
```

## Composants clés

### EventCard (`components/events/event-card.tsx`)

Carte d'événement avec :
- Image avec overlay "Play" pour les replays
- Badge event_type + "Replay disponible"
- Date formatée, lieu
- Bouton inscription ou replay

### EventsMap (`components/events/events-map.tsx`)

Carte interactive Leaflet :
- Marqueurs pour chaque événement
- Popups avec détails (type, titre, date, lieu, capacité)
- Auto-fit bounds sur les marqueurs
- Utiliser `EventsMapWrapper` pour l'import (SSR désactivé)
- Coordonnées disponibles dans `data/events.json`

## Features page Events

### Social Proof (Avatars inscrits)

Affiche les avatars des 3-4 premiers inscrits avec "+X" pour les autres.

```tsx
// Récupérer les inscrits
import usersData from "@/data/users.json";

const registeredUsers = event.registered_users
  .slice(0, 3)
  .map(id => usersData.find(u => u.id === id));

// UI
<div className="flex items-center gap-2">
  <div className="flex -space-x-2">
    {registeredUsers.map(u => (
      <Image
        src={u.avatar_url}
        alt={u.name}
        className="w-6 h-6 rounded-full border"
      />
    ))}
  </div>
  {event.registered_count > 3 && (
    <span className="text-sm text-muted-foreground">
      +{event.registered_count - 3}
    </span>
  )}
</div>
```

### Taux de remplissage (Progress bar)

Calcul : `(registered_count / capacity) * 100`

```tsx
const fillPercentage = event.capacity
  ? (event.registered_count / event.capacity) * 100
  : 0;

const fillColor = fillPercentage < 50 ? 'bg-green-500'
  : fillPercentage < 80 ? 'bg-yellow-500'
  : fillPercentage < 95 ? 'bg-orange-500'
  : 'bg-red-500';

// UI
<div className="space-y-1">
  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
    <div
      className={`h-full transition-all ${fillColor}`}
      style={{ width: `${fillPercentage}%` }}
    />
  </div>
  <p className="text-xs text-muted-foreground">
    {event.registered_count}/{event.capacity} places
    {fillPercentage >= 80 && "  • Dernières places !"}
  </p>
</div>
```

### Tags dynamiques

Filtrage par tags avec URL persistence.

```tsx
// UI
<div className="flex flex-wrap gap-1">
  {event.tags.map(tag => (
    <Link
      href={`/events?tag=${tag.slice(1)}`}
      className="text-xs px-2 py-1 bg-primary/10 text-primary rounded hover:bg-primary/20"
    >
      {tag}
    </Link>
  ))}
</div>

// Filtrage côté client
const matchesTags = (event, selectedTags) => {
  if (selectedTags.length === 0) return true;
  return selectedTags.some(tag =>
    event.tags.some(eventTag =>
      eventTag.toLowerCase().includes(tag.toLowerCase())
    )
  );
};
```

## Documentation

- **PRD Events avec Filtres** : `docs/prd-events-filters-context.md`
  - Spécifications filtres (ville, type, période, tags)
  - Features : calendrier, speakers, vue carte/liste, social proof, progress bar, tags
  - Architecture technique et composants à créer
  - Critères d'acceptance
