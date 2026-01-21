# PRD : Page Events

## 1. Contexte et objectif

### Problème
Les utilisateurs (principalement non-membres de la communauté GAB) n'ont pas de moyen centralisé pour découvrir les événements de la communauté, s'y inscrire et accéder aux replays.

### Objectif
Créer une page events permettant de :
- Découvrir les événements à venir et passés
- Filtrer selon ses préférences (ville, type, format)
- S'inscrire via Luma (events à venir)
- Accéder aux replays (events passés)

### Utilisateurs cibles
- **Primaire** : Nouveaux visiteurs découvrant la communauté GAB
- **Secondaire** : Membres existants cherchant les prochains events ou replays

---

## 2. Fonctionnalités

### 2.1 Affichage des events

#### Structure de la page
```
[Titre + description]
[Barre de filtres]
[Section : Events à venir]     ← triés du plus proche au plus lointain
[Section : Events passés]      ← triés du plus récent au plus ancien
```

#### Informations affichées par event (EventCard)
- Image
- Type (badge : Meetup, Webinar, Workshop)
- Titre
- Date et heure
- Lieu (ville ou "En ligne")
- Badge "Replay disponible" (si applicable)
- Bouton action : "S'inscrire" ou "Voir le replay"

### 2.2 Système de filtres dynamiques

#### Filtres disponibles

| Filtre | Type | Options | Défaut |
|--------|------|---------|--------|
| Villes | Multi-sélection (chips) | Lille, Paris, Lyon | Toutes |
| Type | Single-sélection (chips) | Meetup, Webinar, Workshop | Tous |
| Remote | Checkbox | "Uniquement en ligne" | Décoché |
| Période | Single-sélection (chips) | À venir, Replays disponibles | Tous |

#### Comportements

- **Multi-sélection villes** : Affiche les events correspondant à AU MOINS une ville sélectionnée
- **Checkbox Remote cochée** : Affiche uniquement les events en ligne, le filtre villes reste visible mais est ignoré
- **Persistance URL** : Les filtres sont reflétés dans l'URL
  ```
  /events?villes=lille,paris&type=meetup&remote=true&periode=a-venir
  ```

#### Logique de filtrage période

| Valeur | Condition |
|--------|-----------|
| À venir | `event_date >= aujourd'hui` |
| Replays disponibles | `is_past === true AND replay_url !== null` |
| Tous (défaut) | Aucun filtre période |

### 2.3 États vides

Quand aucun event ne correspond aux filtres :

```
[Icône calendrier]
Aucun event trouvé pour ces critères.
[Bouton : Se tenir informé]  → lien vers inscription newsletter
```

### 2.4 Actions utilisateur

| Action | Comportement |
|--------|--------------|
| Clic "S'inscrire" | Ouvre `registration_url` (Luma) dans un nouvel onglet |
| Clic "Voir le replay" | Ouvre `replay_url` dans un nouvel onglet |
| Clic sur EventCard | Aucun (pas de page détail en V1) |

---

## 3. Design et UX

### 3.1 Desktop

- **Filtres** : Barre horizontale avec chips/tags
- **Layout** : Grille de cards (3 colonnes)
- **Sections** : Séparation visuelle entre "À venir" et "Passés"

### 3.2 Mobile

- **Filtres** : Bouton "Filtrer" ouvrant une bottom sheet
- **Layout** : Liste verticale (1 colonne)
- **Bottom sheet** : Affiche tous les filtres, bouton "Appliquer"

### 3.3 Composants UI (shadcn/ui)

| Élément | Composant |
|---------|-----------|
| Chips filtres | `Badge` ou `Toggle` |
| Checkbox remote | `Checkbox` |
| Cards events | `Card` (existant : `EventCard`) |
| Bottom sheet mobile | `Drawer` |
| Boutons | `Button` |
| État vide | Custom avec `Button` |

---

## 4. Données

### 4.1 Source

Données locales en JSON (pas de Supabase en V1).

**Fichier** : `data/events.json`

### 4.2 Structure d'un event

```typescript
interface Event {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  event_date: string;           // ISO 8601
  event_end_date: string | null;
  location: string | null;      // "Lille", "Paris", "Lyon" ou null si remote
  is_remote: boolean;           // true = en ligne
  image_url: string | null;
  registration_url: string | null;
  replay_url: string | null;
  is_past: boolean;
  event_type: "meetup" | "webinar" | "workshop";
  published: boolean;
}
```

> Note : Ajout du champ `is_remote` par rapport au type Supabase existant.

### 4.3 Helpers à créer

**Fichier** : `lib/data/events.ts`

```typescript
// Récupérer tous les events publiés
getEvents(): Event[]

// Filtrer les events
filterEvents(events: Event[], filters: EventFilters): Event[]

// Trier les events (à venir chrono, passés antéchrono)
sortEvents(events: Event[]): { upcoming: Event[], past: Event[] }
```

---

## 5. Spécifications techniques

### 5.1 Structure des fichiers

```
data/
└── events.json

lib/
├── data/
│   └── events.ts          # Helpers lecture/filtrage
└── validations/
    └── events.ts          # Schema Zod (optionnel)

app/(public)/events/
└── page.tsx               # Page events (Server Component + Client filters)

components/events/
├── event-card.tsx         # Existant (à adapter si besoin)
├── event-filters.tsx      # Nouveau : barre de filtres
├── event-filters-mobile.tsx  # Nouveau : bottom sheet mobile
└── event-empty-state.tsx  # Nouveau : état vide
```

### 5.2 Gestion des filtres URL

Utiliser `nuqs` ou `useSearchParams` de Next.js pour :
- Lire les filtres depuis l'URL au chargement
- Mettre à jour l'URL sans rechargement lors des changements de filtres
- Permettre le partage d'URL filtrées

### 5.3 Performance

- Server Component pour le rendu initial
- Client Component pour les filtres interactifs
- Pas de pagination en V1 (volume faible attendu)

---

## 6. Critères de succès

| Critère | Mesure |
|---------|--------|
| Fonctionnel | Tous les filtres fonctionnent correctement |
| URL persistance | Les filtres sont reflétés dans l'URL |
| États vides | Tous les cas d'états vides sont gérés |
| Responsive | Fonctionne sur desktop et mobile |
| Accessibilité | Navigation clavier, labels ARIA |

---

## 7. Hors scope V1

- Page détail event (`/events/[slug]`)
- Vidéo replay intégrée (lien externe uniquement)
- Pagination / infinite scroll
- Recherche textuelle
- Connexion Supabase
- Intégration calendrier (Google Calendar, iCal)
- Notifications / rappels

---

## 8. Questions ouvertes

1. **Nombre d'events mock** : Combien d'events créer pour les tests ? (suggestion : 6-8)
2. **Images** : Utiliser des images placeholder ou des vraies images d'events GAB ?
3. **Dates** : Créer des events avec des dates futures réalistes ?

---

## Annexes

### A. Maquette simplifiée (ASCII)

```
┌─────────────────────────────────────────────────────────┐
│  Events                                                 │
│  Découvrez nos meetups, webinars et workshops           │
├─────────────────────────────────────────────────────────┤
│  [Lille] [Paris] [Lyon]  │ [Meetup] [Webinar] [Workshop]│
│  ☐ Uniquement en ligne   │ [À venir] [Replays]          │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Prochains events                                       │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐                │
│  │  Event 1 │ │  Event 2 │ │  Event 3 │                │
│  └──────────┘ └──────────┘ └──────────┘                │
│                                                         │
│  ─────────────────────────────────────────────────────  │
│                                                         │
│  Events passés                                          │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐                │
│  │  Event 4 │ │  Event 5 │ │  Event 6 │                │
│  │  Replay  │ │  Replay  │ │          │                │
│  └──────────┘ └──────────┘ └──────────┘                │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### B. Format URL filtres

| Paramètre | Valeurs possibles | Exemple |
|-----------|-------------------|---------|
| `villes` | lille,paris,lyon (CSV) | `?villes=lille,paris` |
| `type` | meetup,webinar,workshop | `?type=meetup` |
| `remote` | true | `?remote=true` |
| `periode` | a-venir,replays | `?periode=a-venir` |

---

*Document créé le 2026-01-20*
