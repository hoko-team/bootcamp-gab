# PRD Context - Page Events avec Filtres

Document de contexte pour la rédaction du PRD de la page événements.

---

## 1. Objectif

Créer une page `/events` permettant aux utilisateurs de :
- Visualiser tous les événements (à venir et passés)
- Filtrer par ville, type et période
- Accéder aux inscriptions (events à venir) ou replays (events passés)
- Partager des URLs filtrées (persistance dans l'URL)
- **Ajouter les events à leur calendrier**
- **Découvrir les speakers et leur bio**
- **Basculer entre vue carte et vue liste**

---

## 2. Spécifications des filtres

### Filtre Ville (multi-sélection)

| Valeur | Label | Comportement |
|--------|-------|--------------|
| `lille` | Lille | Match sur "Lille" dans location |
| `paris` | Paris | Match sur "Paris" dans location |
| `lyon` | Lyon | Match sur "Lyon" dans location |
| `remote` | Remote | Match sur "Remote", "En ligne", "Online" |

**Query param** : `city=lille,paris` (valeurs séparées par virgule)

### Filtre Type (single-sélection)

| Valeur | Label |
|--------|-------|
| `meetup` | Meetup |
| `webinar` | Webinar |
| `workshop` | Workshop |
| `conference` | Conference |

**Query param** : `type=meetup`

### Filtre Période (single-sélection)

| Valeur | Label | Logique |
|--------|-------|---------|
| `upcoming` | À venir | `is_past === false` OU `event_date > now` |
| `replays` | Replays disponibles | `is_past === true` ET `replay_url !== null` |
| `all` | Tous (défaut) | Pas de filtre |

**Query param** : `period=upcoming`

### Vue Carte/Liste (single-sélection)

| Valeur | Label | Comportement |
|--------|-------|--------------|
| `list` | Liste (défaut) | Grille de cartes |
| `map` | Carte | Carte Leaflet avec marqueurs |

**Query param** : `view=map`

### Filtre Tags (multi-sélection) - NOUVEAU

| Valeur | Label |
|--------|-------|
| `IA` | #IA |
| `GenAI` | #GenAI |
| `Builders` | #Builders |
| `Claude Code` | #Claude Code |
| `Workshop` | #Workshop |
| ... | (dynamique selon tags disponibles) |

**Query param** : `tag=IA,GenAI` (valeurs séparées par virgule)

### URL exemples

```
/events                                    # Tous les events (vue liste)
/events?view=map                           # Tous les events (vue carte)
/events?period=upcoming                    # Events à venir
/events?city=lille&type=meetup             # Meetups à Lille
/events?city=lille,paris&period=replays    # Replays Lille + Paris
/events?city=lyon&view=map                 # Events Lyon sur carte
/events?tag=IA                             # Events avec tag #IA
/events?tag=IA,GenAI&city=lille            # Events #IA ou #GenAI à Lille
```

---

## 3. Features additionnelles (Top 3)

### 3.1 Ajout au calendrier

Permettre aux utilisateurs d'ajouter un événement à leur calendrier personnel.

**Données disponibles** dans `event.calendar` :
```json
{
  "google_url": "https://calendar.google.com/calendar/render?action=TEMPLATE&...",
  "ical_data": "BEGIN:VCALENDAR\nVERSION:2.0\n..."
}
```

**UI proposée** :
- Bouton "Ajouter au calendrier" avec dropdown
- Options : Google Calendar, Apple Calendar (fichier .ics), Outlook
- Icône Calendar + texte

**Comportement** :
- Google : ouvre `google_url` dans nouvel onglet
- Apple/Outlook : télécharge fichier `.ics` généré depuis `ical_data`

### 3.2 Speakers avec bio

Afficher les intervenants de chaque événement avec leur profil.

**Données disponibles** :

`event.speakers` : `["user-1", "user-2"]` (IDs des speakers)

`data/users.json` :
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

**UI proposée** :
- Section "Speakers" dans EventCard (si speakers.length > 0)
- Avatar circulaire + Nom + Role @ Company
- Lien vers LinkedIn au clic
- Sur page détail : bio complète + liens sociaux

### 3.3 Vue carte / liste toggle

Permettre de basculer entre une vue liste (grille de cartes) et une vue carte interactive.

**UI proposée** :
- Toggle button group : [Liste] [Carte]
- Persisté dans l'URL (`?view=map`)
- Vue carte : EventsMap avec tous les events filtrés
- Vue liste : Grille responsive de EventCards

**Comportement** :
- Le toggle conserve les filtres actifs
- Sur mobile : vue liste par défaut, carte en option
- La carte utilise les `coordinates` de chaque event

### 3.4 Social proof (Avatars inscrits)

Afficher les avatars des premières personnes inscrites à l'event pour créer un sentiment d'FOMO.

**Données disponibles** dans `event.registered_users` :
```json
{
  "registered_users": ["user-1", "user-2", "user-3", "user-4"]
}
```

**UI proposée** :
- Section dans EventCard : "👤👤👤 +12 personnes"
- Avatars circulaires empilés (max 3-4 visibles)
- Au clic : ouvre une modale avec la liste complète
- Sur hover : tooltip "Pierre Burgy, Stéphane Dessein, ..."

**Comportement** :
- Affiche les 3-4 premiers avatars seulement
- "+X" pour le compte des autres
- Clic pour voir tous les inscrits

### 3.5 Taux de remplissage (Progress bar)

Afficher visuellement le taux de remplissage de l'event.

**Données disponibles** dans `event` :
```json
{
  "capacity": 83,
  "registered_count": 42
}
```

**Calcul** : `(registered_count / capacity) * 100`

**UI proposée** :
- Barre de progression visuelle
- Text : "42/83 places" ou "Complet" si 100%
- Couleur :
  - Verde si < 50%
  - Jaune si 50-80%
  - Organe si 80-95%
  - Rouge si 95%+
- Badge "Dernières places !" si 80%+

**Cas particulier** :
- Webinars (`capacity === null`) : afficher "156 inscriptions" seulement

### 3.6 Tags dynamiques

Ajouter un système de tags pour faciliter la découverte et le filtrage.

**Données disponibles** dans `event.tags` :
```json
{
  "tags": ["#IA", "#Programmation", "#Vibe Coding", "#Community"]
}
```

**UI proposée** :
- Affichés sous le titre de l'event
- Style : badges avec `#` préfixe
- Clickable pour filtrer par tag
- Couleurs différentes selon le tag

**Filtrage par tag** :
- URL param : `?tag=IA`
- Multi-sélection possible : `?tag=IA,GenAI`
- Les tags s'ajoutent aux autres filtres

**Génération de tags** :
- À partir de `event_type`, `location`, mots-clés
- 4-5 tags par event
- Commence par `#`

---

## 4. Structure des données

### Source : `data/events.json` (7 events)

```json
{
  "id": "event-4",
  "slug": "genai-builders-meetup-4",
  "title": "GenAI Builders Meetup #4",
  "description": "...",
  "short_description": "Nouvelle identité GAB avec Pierre Burgy (Strapi)...",
  "event_date": "2026-02-15T19:00:00Z",
  "event_end_date": "2026-02-15T22:00:00Z",
  "location": "Lille, Hauts-de-France",
  "address": "EuraTechnologies, 165 Av. de Bretagne, 59000 Lille, France",
  "coordinates": [50.6331, 3.0200],
  "image_url": "/images/events/meetup-4.webp",
  "registration_url": "https://lu.ma/hpup7z3i",
  "replay_url": null,
  "is_past": false,
  "event_type": "meetup",
  "capacity": 83,
  "registered_count": 42,
  "published": true,
  "speakers": ["user-1", "user-2", "user-3"],
  "tags": ["#GenAI", "#Builders", "#CMS", "#OCR"],
  "registered_users": ["user-4", "user-6", "user-8", "user-9"],
  "agenda": [
    {
      "time": "19:00",
      "title": "Accueil EuraTechnologies",
      "description": "Networking et café",
      "duration_minutes": 30
    },
    {
      "time": "19:30",
      "title": "Le CMS est mort, vive le CMS !",
      "description": "Pierre Burgy explique...",
      "duration_minutes": 35,
      "speaker_ids": ["user-1"]
    }
  ],
  "resources": [
    {
      "title": "Slides",
      "url": "/resources/slides.pdf",
      "type": "slides"
    }
  ],
  "gallery_urls": ["/images/events/meetup-4/photo-1.webp"],
  "calendar": {
    "google_url": "https://calendar.google.com/...",
    "ical_data": "BEGIN:VCALENDAR..."
  }
}
```

### Source : `data/users.json` (10 speakers)

```json
{
  "id": "user-1",
  "name": "Pierre Burgy",
  "role": "CEO",
  "company": "Strapi",
  "bio": "Fondateur et CEO de Strapi, le CMS headless open-source leader...",
  "avatar_url": "/images/speakers/pierre-burgy.webp",
  "linkedin_url": "https://linkedin.com/in/pierreburgy",
  "twitter_url": "https://twitter.com/pierreburgy"
}
```

### Events actuels (7 au total)

| Titre | Location | Type | Statut | Speakers |
|-------|----------|------|--------|----------|
| Lille AI Code Meetup | Lille | meetup | Passé | - |
| Lille AI Code Meetup #2 | Wambrechies | meetup | Passé | 2 |
| Lille AI Code Meetup #3 | SKEMA Lille | meetup | Passé (replay) | 4 |
| GenAI Builders Meetup #4 | EuraTechnologies | meetup | À venir | 3 |
| Workshop Claude Code | Paris | workshop | À venir | 1 |
| Webinar GenAI pour les devs | Remote | webinar | À venir | 2 |
| GAB Lyon - Premier Meetup | Lyon | meetup | À venir | - |

---

## 5. Composants existants

### EventCard (`components/events/event-card.tsx`)

Carte d'événement complète avec :
- Image (optionnelle) avec overlay Play pour replays
- Badge type + "Replay disponible"
- Date formatée (`formatEventDate`)
- Lieu avec icône MapPin
- Bouton CTA : "S'inscrire" ou "Voir le replay"

**À enrichir** :
- Section speakers (avatars + noms)
- Bouton "Ajouter au calendrier"

### EventsMap (`components/events/events-map.tsx`)

Carte Leaflet avec :
- Marqueurs par événement
- Popups avec détails
- Auto-fit bounds
- Coordonnées maintenant disponibles dans le JSON

---

## 6. Composants UI à ajouter (shadcn)

```bash
npx shadcn@latest add select
npx shadcn@latest add checkbox
npx shadcn@latest add toggle-group
npx shadcn@latest add dropdown-menu
npx shadcn@latest add avatar
```

---

## 7. Architecture technique proposée

### Structure fichiers

```
app/(public)/events/
├── page.tsx              # Server Component (metadata, fetch initial)
├── events-content.tsx    # Client Component (filtres, état, vue)
└── loading.tsx           # Skeleton pendant chargement

components/events/
├── event-card.tsx           # Existant - À enrichir (speakers, calendar, tags, social proof, progress)
├── event-filters.tsx        # NOUVEAU - Barre de filtres (incl. tags)
├── event-list.tsx           # NOUVEAU - Liste/grille filtrée
├── event-view-toggle.tsx    # NOUVEAU - Toggle carte/liste
├── event-speakers.tsx       # NOUVEAU - Section speakers
├── event-calendar-btn.tsx   # NOUVEAU - Bouton ajout calendrier
├── event-tags.tsx           # NOUVEAU - Affichage tags clickables
├── event-social-proof.tsx   # NOUVEAU - Avatars inscrits
├── event-progress-bar.tsx   # NOUVEAU - Barre de remplissage
├── events-map.tsx           # Existant
└── events-map-wrapper.tsx   # Existant

lib/
├── data/
│   ├── events.ts         # NOUVEAU - Helpers lecture events.json
│   └── users.ts          # NOUVEAU - Helpers lecture users.json
├── hooks/
│   └── use-event-filters.ts  # NOUVEAU - Hook filtres + URL
└── utils.ts              # Existant (formatEventDate)
```

### Helpers data (lib/data/)

```typescript
// lib/data/events.ts
import eventsData from "@/data/events.json";
import type { Event } from "@/lib/types";

export function getEvents(): Event[] {
  return eventsData.filter((e) => e.published);
}

export function getEventBySlug(slug: string): Event | undefined {
  return eventsData.find((e) => e.slug === slug);
}

export function getUpcomingEvents(): Event[] {
  return getEvents().filter((e) => !e.is_past);
}

// lib/data/users.ts
import usersData from "@/data/users.json";
import type { User } from "@/lib/types";

export function getUserById(id: string): User | undefined {
  return usersData.find((u) => u.id === id);
}

export function getSpeakersForEvent(speakerIds: string[]): User[] {
  return speakerIds.map(getUserById).filter(Boolean) as User[];
}
```

### Gestion des filtres (Client Component)

```tsx
// Pattern recommandé Next.js 15
"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";

interface EventFilters {
  city: string[];
  type: string | null;
  period: "all" | "upcoming" | "replays";
  view: "list" | "map";
  tag: string[];
}

function useEventFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const filters: EventFilters = {
    city: searchParams.get("city")?.split(",").filter(Boolean) || [],
    type: searchParams.get("type") || null,
    period: (searchParams.get("period") as EventFilters["period"]) || "all",
    view: (searchParams.get("view") as EventFilters["view"]) || "list",
  };

  const setFilters = (newFilters: Partial<EventFilters>) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(newFilters).forEach(([key, value]) => {
      if (value === null || value === "" || (Array.isArray(value) && value.length === 0)) {
        params.delete(key);
      } else if (Array.isArray(value)) {
        params.set(key, value.join(","));
      } else {
        params.set(key, value);
      }
    });

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const resetFilters = () => {
    router.push(pathname, { scroll: false });
  };

  return { filters, setFilters, resetFilters };
}
```

---

## 8. UX/UI recommandations

### Layout desktop

```
┌─────────────────────────────────────────────────────────────────┐
│ Events                                                          │
│ Meetups, webinars et workshops GenAI.                          │
├─────────────────────────────────────────────────────────────────┤
│ Ville: ☑ Lille ☑ Paris ☐ Lyon ☐ Remote                         │
│ Type:  [Tous ▼]     Période: [À venir] [Replays] [Tous]        │
│                                                                 │
│ 4 événements trouvés    [Réinitialiser]    [☰ Liste] [🗺 Carte] │
├─────────────────────────────────────────────────────────────────┤
│ ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐    │
│ │ 📅 15 fév 2026  │ │ 📅 10 mar 2026  │ │ 📅 20 mar 2026  │    │
│ │ GenAI Builders  │ │ Workshop Claude │ │ Webinar GenAI   │    │
│ │ #4              │ │ Code            │ │ pour les devs   │    │
│ │                 │ │                 │ │                 │    │
│ │ 👤👤👤 3 speakers│ │ 👤 1 speaker    │ │ 👤👤 2 speakers │    │
│ │ 📍 Lille        │ │ 📍 Paris        │ │ 🌐 Remote       │    │
│ │                 │ │                 │ │                 │    │
│ │ [📅 Calendrier] │ │ [📅 Calendrier] │ │ [📅 Calendrier] │    │
│ │ [S'inscrire →]  │ │ [S'inscrire →]  │ │ [S'inscrire →]  │    │
│ └─────────────────┘ └─────────────────┘ └─────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

### Layout mobile

- Filtres dans un Sheet/Drawer
- Bouton flottant "Filtres (2)" avec badge count
- Toggle carte/liste en haut
- Liste en colonne unique

### États vides

- Aucun résultat : "Aucun événement ne correspond à vos critères" + bouton reset
- Aucun event à venir : "Pas d'événement prévu pour le moment" + CTA newsletter

---

## 9. Critères d'acceptance

### Fonctionnels - Filtres

- [ ] Les 3 filtres fonctionnent indépendamment et combinés
- [ ] Multi-sélection ville fonctionne
- [ ] Single-sélection type et période fonctionne
- [ ] L'URL reflète les filtres actifs
- [ ] Le refresh conserve les filtres (via URL)
- [ ] Le partage d'URL filtrée fonctionne
- [ ] Le bouton "Réinitialiser" vide tous les filtres
- [ ] Le compteur d'événements se met à jour

### Fonctionnels - Calendrier

- [ ] Bouton "Ajouter au calendrier" visible sur chaque event à venir
- [ ] Dropdown avec options Google / Apple / Outlook
- [ ] Google Calendar ouvre dans nouvel onglet
- [ ] Apple/Outlook télécharge fichier .ics

### Fonctionnels - Speakers

- [ ] Section speakers affichée si event.speakers.length > 0
- [ ] Avatars + noms des speakers
- [ ] Clic sur speaker ouvre LinkedIn (nouvel onglet)
- [ ] Sur page détail : bio complète visible

### Fonctionnels - Vue carte/liste

- [ ] Toggle carte/liste fonctionnel
- [ ] Vue persistée dans URL (?view=map)
- [ ] Carte affiche uniquement events filtrés
- [ ] Popups carte affichent infos essentielles

### Fonctionnels - Social proof

- [ ] Avatars inscrits affichés sur EventCard
- [ ] Max 3-4 avatars visibles + "+X"
- [ ] Clic sur avatars ouvre modale avec liste complète
- [ ] Avatars récupérés depuis `event.registered_users`
- [ ] Absence d'avatars if `registered_users.length === 0`

### Fonctionnels - Taux de remplissage

- [ ] Barre de progression visuelle affichée
- [ ] Texte "X/Y places" ou "Complet"
- [ ] Couleurs dynamiques selon % (vert < 50%, jaune 50-80%, orange 80-95%, rouge 95%+)
- [ ] Badge "Dernières places !" si 80%+
- [ ] Webinars : affichage "X inscriptions" sans barre

### Fonctionnels - Tags

- [ ] Tags affichés sous titre EventCard
- [ ] Style badges avec "#" préfixe
- [ ] Clic sur tag filtre par ce tag
- [ ] Multi-sélection tags fonctionne
- [ ] Tags persistent dans URL (?tag=IA,GenAI)
- [ ] Tags combinables avec autres filtres

### Techniques

- [ ] SSR initial avec données (SEO)
- [ ] Filtrage côté client (réactivité)
- [ ] Pas de flash de contenu au chargement
- [ ] Mobile responsive
- [ ] Accessibilité (labels, focus, keyboard nav)

### Performance

- [ ] Filtrage instantané (pas de loading)
- [ ] URL mise à jour sans rechargement page
- [ ] Debounce sur changements rapides (optionnel)

---

## 10. Dépendances

| Dépendance | Statut | Action |
|------------|--------|--------|
| shadcn/select | Manquant | `npx shadcn@latest add select` |
| shadcn/checkbox | Manquant | `npx shadcn@latest add checkbox` |
| shadcn/toggle-group | Manquant | `npx shadcn@latest add toggle-group` |
| shadcn/dropdown-menu | Manquant | `npx shadcn@latest add dropdown-menu` |
| shadcn/avatar | Manquant | `npx shadcn@latest add avatar` |
| react-leaflet | Installé | - |
| data/events.json | Prêt | 7 events avec toutes les données |
| data/users.json | Prêt | 10 speakers avec profils complets |

---

## 11. Types TypeScript à créer

```typescript
// lib/types/event.ts
export interface EventAgendaItem {
  time: string;
  title: string;
  description: string;
  duration_minutes: number;
  speaker_ids?: string[];
}

export interface EventResource {
  title: string;
  url: string;
  type: "slides" | "code" | "video" | "article";
}

export interface EventCalendar {
  google_url: string;
  ical_data: string;
}

export interface Event {
  id: string;
  slug: string;
  title: string;
  description: string;
  short_description: string;
  event_date: string;
  event_end_date: string | null;
  location: string;
  address: string | null;
  coordinates: [number, number];
  image_url: string | null;
  registration_url: string | null;
  replay_url: string | null;
  is_past: boolean;
  event_type: "meetup" | "webinar" | "workshop" | "conference";
  capacity: number | null;
  registered_count: number;
  published: boolean;
  speakers: string[];
  tags: string[];
  registered_users: string[];
  agenda: EventAgendaItem[];
  resources: EventResource[];
  gallery_urls: string[];
  calendar: EventCalendar;
}

// lib/types/user.ts
export interface User {
  id: string;
  name: string;
  role: string;
  company: string;
  bio: string;
  avatar_url: string;
  linkedin_url: string | null;
  twitter_url: string | null;
}
```

---

## 12. Features innovantes (Next.js 15 + React 19)

### 12.1 View Transitions API

Utiliser la View Transitions API pour des transitions fluides entre les vues.

**Implémentation** :
```tsx
// app/(public)/events/layout.tsx
export default function EventsLayout({ children }) {
  return (
    <div className="view-transition-name">
      {children}
    </div>
  );
}

// Transition entre vue liste et carte
import { useTransition } from "react";

function EventViewToggle() {
  const [isPending, startTransition] = useTransition();
  
  const handleViewChange = (view) => {
    startTransition(() => {
      setView(view);
    });
  };
}
```

**Bénéfices** :
- Transitions fluides sans flash
- Meilleure UX perçue
- Support natif navigateur

### 12.2 Optimistic UI Updates

Mettre à jour l'UI immédiatement lors des interactions utilisateur.

**Cas d'usage** :
- Filtrage instantané (déjà implémenté avec `useMemo`)
- Ajout au calendrier : feedback immédiat avant confirmation
- Partage social : copie dans le presse-papier avec toast

**Implémentation** :
```tsx
// Optimistic filter update
const [optimisticFilters, setOptimisticFilters] = useOptimistic(
  filters,
  (state, newFilters) => ({ ...state, ...newFilters })
);
```

### 12.3 Analytics et Tracking

Suivre les interactions utilisateurs pour améliorer l'expérience.

**Événements à tracker** :
- Filtres appliqués (ville, type, période, tags)
- Changement de vue (liste ↔ carte)
- Clics sur événements
- Ajouts au calendrier
- Partages sociaux
- Inscriptions (via Luma)

**Implémentation** :
```tsx
// lib/analytics.ts
export function trackEvent(event: string, properties?: Record<string, any>) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", event, properties);
  }
}

// Usage
trackEvent("filter_applied", {
  filter_type: "city",
  filter_value: "lille",
  result_count: filteredEvents.length,
});
```

### 12.4 Partage social amélioré

Permettre de partager facilement des événements ou des vues filtrées.

**Features** :
- Bouton "Partager" sur chaque EventCard
- Partage de vue filtrée (URL avec query params)
- Métadonnées Open Graph dynamiques
- Copie rapide du lien avec toast

**Implémentation** :
```tsx
// components/events/event-share-btn.tsx
export function EventShareBtn({ event, filters }) {
  const shareUrl = `${window.location.origin}/events?${new URLSearchParams(filters).toString()}`;
  
  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: event.title,
        text: event.short_description,
        url: shareUrl,
      });
    } else {
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Lien copié !");
    }
  };
}
```

### 12.5 Recommandations basées sur les tags

Suggérer des événements similaires basés sur les tags et l'historique.

**Algorithme** :
- Événements avec tags communs
- Événements dans la même ville
- Événements du même type
- Événements à venir (priorité)

**UI** :
- Section "Vous pourriez aussi aimer" en bas de page
- Badge "Recommandé" sur EventCard
- Animation subtile au hover

### 12.6 Filtres sauvegardés (localStorage)

Permettre aux utilisateurs de sauvegarder leurs filtres préférés.

**Features** :
- Bouton "Sauvegarder ces filtres"
- Liste de filtres sauvegardés dans sidebar
- Nom personnalisable pour chaque filtre
- Partage de filtres sauvegardés (URL)

**Implémentation** :
```tsx
// lib/hooks/use-saved-filters.ts
export function useSavedFilters() {
  const [savedFilters, setSavedFilters] = useState<SavedFilter[]>(() => {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem("saved-event-filters");
    return stored ? JSON.parse(stored) : [];
  });

  const saveFilters = (filters: EventFilters, name: string) => {
    const newSaved = [...savedFilters, { id: crypto.randomUUID(), name, filters }];
    setSavedFilters(newSaved);
    localStorage.setItem("saved-event-filters", JSON.stringify(newSaved));
  };
}
```

### 12.7 Export de liste d'événements

Permettre d'exporter la liste filtrée d'événements.

**Formats** :
- CSV (pour calendrier Excel)
- iCal (fichier .ics avec tous les événements)
- JSON (pour développeurs)
- PDF (pour impression)

**UI** :
- Bouton "Exporter" dans la barre d'outils
- Dropdown avec options de format
- Toast de confirmation après export

### 12.8 Notifications push (Web Push API)

Notifier les utilisateurs des nouveaux événements ou changements.

**Cas d'usage** :
- Nouvel événement publié
- Événement bientôt complet (80%+)
- Rappel 24h avant l'événement
- Nouveau replay disponible

**Implémentation** :
```tsx
// app/api/notifications/subscribe/route.ts
export async function POST(req: Request) {
  const subscription = await req.json();
  // Enregistrer dans Supabase
  // Utiliser service worker pour envoyer notifications
}
```

### 12.9 Mode sombre amélioré

Améliorer l'expérience en mode sombre avec des animations et transitions.

**Features** :
- Toggle smooth entre light/dark
- Couleurs adaptées pour la carte Leaflet
- Images avec overlay adaptatif
- Préférence sauvegardée (localStorage + cookie)

### 12.10 Performance optimizations

Optimisations pour une expérience ultra-fluide.

**Techniques** :
- Virtual scrolling pour grandes listes (react-window)
- Lazy loading des images (Next.js Image)
- Prefetching des données (React Server Components)
- Debounce sur les filtres (déjà implémenté)
- Memoization des composants coûteux

**Implémentation** :
```tsx
// Virtual scrolling pour EventList
import { FixedSizeGrid } from "react-window";

function VirtualizedEventList({ events }) {
  return (
    <FixedSizeGrid
      columnCount={3}
      columnWidth={400}
      height={600}
      rowCount={Math.ceil(events.length / 3)}
      rowHeight={500}
    >
      {({ columnIndex, rowIndex, style }) => (
        <div style={style}>
          <EventCard event={events[rowIndex * 3 + columnIndex]} />
        </div>
      )}
    </FixedSizeGrid>
  );
}
```

### 12.11 Recherche full-text

Ajouter une barre de recherche pour trouver des événements par mots-clés.

**Recherche** :
- Titre, description, tags
- Nom des speakers
- Lieu
- Highlight des résultats

**UI** :
- Barre de recherche en haut de page
- Suggestions en temps réel
- Filtres combinables avec recherche

### 12.12 Comparaison d'événements

Permettre de comparer plusieurs événements côte à côte.

**Features** :
- Sélection multiple d'événements
- Vue de comparaison (tableau)
- Export de comparaison
- Partage de comparaison

### 12.13 Intégration calendrier externe

Synchronisation avec calendriers externes (Google Calendar, Outlook).

**Features** :
- Connexion OAuth (Google, Microsoft)
- Synchronisation bidirectionnelle
- Rappels automatiques
- Statut de participation

### 12.14 Gamification

Encourager l'engagement avec des badges et points.

**Features** :
- Badges pour participation (premier event, 5 events, etc.)
- Points pour interactions (partage, commentaire)
- Leaderboard (optionnel, privé)
- Récompenses (early access, merch)

---

## 13. Patterns Next.js 15 modernes

### 13.1 Server Components par défaut

Utiliser les Server Components pour le rendu initial et le SEO.

```tsx
// app/(public)/events/page.tsx (Server Component)
export default async function EventsPage() {
  const events = await getEvents(); // Fetch côté serveur
  return <EventsContent events={events} />;
}
```

### 13.2 Client Components pour interactivité

Utiliser "use client" uniquement pour les composants interactifs.

```tsx
// components/events/event-filters.tsx (Client Component)
"use client";
export function EventFilters() {
  // Interactivité uniquement ici
}
```

### 13.3 Suspense et loading states

Utiliser Suspense pour les états de chargement.

```tsx
<Suspense fallback={<EventsSkeleton />}>
  <EventsContent />
</Suspense>
```

### 13.4 Streaming SSR

Streamer le contenu pour un Time to First Byte (TTFB) optimal.

```tsx
// next.config.ts
export default {
  experimental: {
    serverActions: true,
  },
};
```

### 13.5 Partial Prerendering (PPR)

Prérendre les parties statiques, streamer les parties dynamiques.

```tsx
// app/(public)/events/page.tsx
export const experimental_ppr = true;
```

### 13.6 Server Actions

Utiliser Server Actions pour les mutations (futur : favoris, notes).

```tsx
// app/actions/events.ts
"use server";

export async function saveEventToFavorites(eventId: string) {
  // Logique serveur
}
```

---

## 14. Roadmap d'implémentation

### Phase 1 : Core (✅ Fait)
- [x] Structure de base
- [x] Filtres (ville, type, période, tags)
- [x] Vue liste/carte
- [x] EventCard enrichi (speakers, calendar, progress, social proof)
- [x] Hook useEventFilters

### Phase 2 : UX améliorée (🔄 En cours)
- [ ] View Transitions API
- [ ] Optimistic UI updates
- [ ] Analytics tracking
- [ ] Partage social amélioré
- [ ] Recherche full-text

### Phase 3 : Features avancées (📅 À venir)
- [ ] Filtres sauvegardés
- [ ] Export de liste
- [ ] Notifications push
- [ ] Recommandations
- [ ] Comparaison d'événements

### Phase 4 : Intégrations (📅 Future)
- [ ] OAuth calendriers
- [ ] Gamification
- [ ] API publique
- [ ] Webhooks

---

*Contexte préparé pour M7 - Janvier 2026*
*Mis à jour avec features innovantes Next.js 15 + React 19*