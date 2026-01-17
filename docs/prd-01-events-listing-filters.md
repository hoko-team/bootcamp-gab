# PRD 01 - Page Événements avec Système de Filtres

## 📋 Informations du Document

| Champ       | Valeur                                         |
| ----------- | ---------------------------------------------- |
| **Projet**  | GAB Platform                                   |
| **Feature** | Page Événements Dynamique avec Filtres Avancés |
| **Version** | 1.0                                            |
| **Date**    | 16 janvier 2026                                |
| **Statut**  | Draft                                          |
| **Auteur**  | Claude Code                                    |

---

## 🎯 Vision & Objectifs

### Vision

Créer une **page événements centralisée** permettant à la communauté GAB de découvrir facilement tous les événements (meetups, webinars, workshops, conférences) avec des **filtres puissants par ville, type et période** pour trouver rapidement les événements pertinents.

### Objectifs Business

1. **Augmenter la participation** aux événements en facilitant la découverte
2. **Valoriser les replays** pour engager les membres qui n'ont pas pu assister
3. **Supporter l'expansion géographique** en mettant en avant les villes actives
4. **Améliorer le SEO** avec des pages riches en contenu et filtrables
5. **Centraliser l'information** sur tous les événements GAB en un seul endroit

### Objectifs Utilisateurs

- **En tant que visiteur parisien** : Je veux voir uniquement les événements à Paris
- **En tant que membre remote** : Je veux filtrer par "webinar" pour trouver les événements en ligne
- **En tant que nouveau** : Je veux accéder aux replays pour découvrir ce que propose GAB
- **En tant que membre actif** : Je veux voir rapidement les prochains événements

---

## 📦 Scope du Projet

### ✅ In Scope

#### Phase 1 : Page Événements avec JSON

- Affichage de tous les événements depuis `data/events.json`
- Séparation claire : "Prochains événements" / "Replays disponibles"
- **Gestion de la ville** pour chaque événement (nouveau champ)
- Tri automatique (futurs par date croissante, passés par date décroissante)
- Composant `EventCard` réutilisable et enrichi
- Bouton CTA "S'inscrire" (événements futurs)
- Bouton CTA "Voir le replay" (événements passés avec replay)
- Player vidéo intégré pour les replays
- **États vides** si aucun événement dans une catégorie

#### Fonctionnalité Clé : Système de Filtres

- **Filtre par Ville** : Multi-sélection (Lille, Paris, Lyon, Remote, Toutes)
- **Filtre par Type** : Single-sélection (Tous, Meetup, Webinar, Workshop, Conférence)
- **Filtre par Période** :
  - Tous les événements
  - À venir uniquement
  - Passés avec replay uniquement
- **Compteurs dynamiques** : Affichage du nombre d'événements filtrés
- **Persistance des filtres** : URL query params pour partage
- **Reset des filtres** : Bouton "Réinitialiser"

#### Phase 2 : Connexion Supabase

- Migration des données de `events.json` vers table Supabase `events`
- Ajout de la colonne `city` dans la table
- Fetch dynamique depuis Supabase (Server Component)
- Mise en cache avec revalidation Next.js
- Support de la pagination (limite initiale : 12 événements par page)
- Filtrage côté serveur pour optimiser les performances

### ❌ Out of Scope (Future Iterations)

- Authentification utilisateur
- Système de favoris / événements sauvegardés
- Calendrier interactif avec vue mensuelle
- Synchronisation automatique avec Luma API
- Notifications push pour nouveaux événements
- Système de commentaires sur les événements
- Export iCal des événements
- Carte géographique des événements
- Recherche textuelle par mot-clé

---

## 👤 Personas & User Stories

### Persona 1 : Sophie, Product Manager à Paris

**Contexte** : Sophie travaille dans une startup parisienne et cherche des événements locaux sur l'IA pour networker.

**User Stories :**

- 🎯 Je veux **filtrer les événements par ville (Paris)** pour trouver des événements près de chez moi
- 🎯 Je veux **voir uniquement les meetups** car je préfère le format présentiel
- 🎯 Je veux **voir la date et le lieu** en un coup d'œil
- 🎯 Je veux **m'inscrire facilement** via le bouton "S'inscrire"

### Persona 2 : Marc, Développeur Remote à Lyon

**Contexte** : Marc travaille en full-remote et cherche des webinars sur l'IA qu'il peut suivre depuis chez lui.

**User Stories :**

- 🎯 Je veux **filtrer par "Webinar" et "Remote"** pour trouver des événements en ligne
- 🎯 Je veux **voir les événements à venir** uniquement (pas les passés)
- 🎯 Je veux **savoir si un événement est en ligne ou présentiel** immédiatement
- 🎯 Je veux **partager un lien filtré** avec mes collègues

### Persona 3 : Julie, Designer UX/UI à Lille

**Contexte** : Julie a découvert GAB récemment et veut rattraper son retard en regardant les replays.

**User Stories :**

- 🎯 Je veux **voir tous les replays disponibles** facilement
- 🎯 Je veux **filtrer par type** pour trouver les workshops qui m'intéressent
- 🎯 Je veux **regarder le replay directement** sur la page sans être redirigée
- 🎯 Je veux **voir la description complète** pour savoir ce qui a été couvert

### Persona 4 : Thomas, Entrepreneur Multi-Villes

**Contexte** : Thomas voyage entre Paris et Lille et veut voir les événements dans les deux villes.

**User Stories :**

- 🎯 Je veux **sélectionner plusieurs villes** en même temps (Paris + Lille)
- 🎯 Je veux **voir le nombre d'événements** par filtre appliqué
- 🎯 Je veux **réinitialiser les filtres** facilement en un clic
- 🎯 Je veux **partager l'URL filtrée** avec mon associé

---

## 🗺️ User Flows

### Flow 1 : Découverte et Inscription à un Événement Local

```
[Visiteur arrive sur /events]
    ↓
[Voit tous les événements (futurs + passés)]
    ↓
[Clique sur filtre "Ville : Paris"]
    ↓
[La liste se met à jour → affiche uniquement Paris]
    ↓
[Compteur affiche "5 événements"]
    ↓
[Clique sur une EventCard pour voir les détails]
    ↓
[Lit la description, voit date/lieu/capacité]
    ↓
[Clique sur "S'inscrire sur Luma"]
    ↓
[Redirigé vers Luma (nouvel onglet)]
    ↓
[S'inscrit et reçoit confirmation email]
```

### Flow 2 : Recherche d'un Webinar Remote

```
[Marc arrive sur /events]
    ↓
[Voit le panneau de filtres]
    ↓
[Sélectionne "Type : Webinar"]
    ↓
[Sélectionne "Ville : Remote"]
    ↓
[Sélectionne "Période : À venir uniquement"]
    ↓
[La liste affiche 3 webinars à venir]
    ↓
[Compteur : "3 événements"]
    ↓
[Choisit un événement et clique "S'inscrire"]
    ↓
[URL mise à jour : /events?type=webinar&city=remote&period=upcoming]
    ↓
[Partage l'URL avec ses collègues]
```

### Flow 3 : Visionnage de Replays par Type

```
[Julie arrive sur /events]
    ↓
[Clique sur "Période : Replays uniquement"]
    ↓
[La liste affiche tous les événements passés avec replay]
    ↓
[Clique sur "Type : Workshop"]
    ↓
[La liste se réduit aux workshops avec replay]
    ↓
[Compteur : "4 événements"]
    ↓
[Clique sur "Voir le replay" sur une carte]
    ↓
[Modal s'ouvre avec player vidéo intégré]
    ↓
[Regarde le replay (YouTube embed)]
    ↓
[Ferme la modal et explore d'autres replays]
```

### Flow 4 : Partage de Filtres Multi-Villes

```
[Thomas arrive sur /events]
    ↓
[Sélectionne "Ville : Paris"]
    ↓
[Maintient Ctrl/Cmd et sélectionne "Ville : Lille"]
    ↓
[La liste affiche événements Paris + Lille]
    ↓
[Compteur : "8 événements"]
    ↓
[Copie l'URL : /events?cities=paris,lille]
    ↓
[Envoie l'URL à son associé par Slack]
    ↓
[L'associé ouvre le lien → filtres appliqués automatiquement]
```

---

## 🎨 Spécifications UI/UX

### Layout Global de la Page `/events`

```
┌─────────────────────────────────────────────────────────────┐
│  Header (GAB Platform)                                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  [Hero Section]                                             │
│  📅 Événements GAB                                          │
│  Découvrez nos meetups, webinars et workshops              │
│  dans toute la France et en ligne                          │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  ┌───────────────────┐  ┌─────────────────────────────┐    │
│  │                   │  │                             │    │
│  │  [FILTRES]        │  │  [LISTE ÉVÉNEMENTS]        │    │
│  │  ─────────────    │  │  ───────────────────        │    │
│  │                   │  │                             │    │
│  │  🏙️ Ville         │  │  📍 Prochains (5)          │    │
│  │  ☑ Toutes         │  │                             │    │
│  │  ☐ Lille          │  │  ┌──────────┐ ┌──────────┐ │    │
│  │  ☐ Paris          │  │  │ Event 1  │ │ Event 2  │ │    │
│  │  ☐ Lyon           │  │  │ [Card]   │ │ [Card]   │ │    │
│  │  ☐ Remote         │  │  └──────────┘ └──────────┘ │    │
│  │                   │  │                             │    │
│  │  📋 Type          │  │  ┌──────────┐ ┌──────────┐ │    │
│  │  ◉ Tous           │  │  │ Event 3  │ │ Event 4  │ │    │
│  │  ○ Meetup         │  │  │ [Card]   │ │ [Card]   │ │    │
│  │  ○ Webinar        │  │  └──────────┘ └──────────┘ │    │
│  │  ○ Workshop       │  │                             │    │
│  │  ○ Conférence     │  │  ┌──────────┐              │    │
│  │                   │  │  │ Event 5  │              │    │
│  │  📅 Période       │  │  │ [Card]   │              │    │
│  │  ◉ Tous           │  │  └──────────┘              │    │
│  │  ○ À venir        │  │                             │    │
│  │  ○ Replays        │  │  ─────────────────────────  │    │
│  │                   │  │                             │    │
│  │  [Réinitialiser]  │  │  🎬 Replays (12)           │    │
│  │                   │  │                             │    │
│  └───────────────────┘  │  ┌──────────┐ ┌──────────┐ │    │
│                         │  │ Event A  │ │ Event B  │ │    │
│                         │  │ + Replay │ │ + Replay │ │    │
│                         │  └──────────┘ └──────────┘ │    │
│                         │                             │    │
│                         │  [Charger plus...]          │    │
│                         └─────────────────────────────┘    │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  [Newsletter CTA]                                           │
│  Ne manquez aucun événement - Recevez les annonces         │
├─────────────────────────────────────────────────────────────┤
│  Footer                                                     │
└─────────────────────────────────────────────────────────────┘
```

### Panneau de Filtres (Sidebar)

**Position** : Sidebar gauche, sticky pendant le scroll

**Composants :**

**1. Filtre Ville (Multi-sélection)**

```
🏙️ Ville
──────────────────────
☑ Toutes les villes
☐ Lille (12)
☐ Paris (8)
☐ Lyon (3)
☐ Remote (15)
☐ Autres (2)
```

- Checkboxes multi-sélection
- Compteur entre parenthèses = nombre d'événements par ville
- "Toutes" décoche automatiquement les autres sélections

**2. Filtre Type (Single sélection)**

```
📋 Type d'événement
──────────────────────
◉ Tous (40)
○ Meetup (18)
○ Webinar (12)
○ Workshop (7)
○ Conférence (3)
```

- Radio buttons single-sélection
- Compteur entre parenthèses
- Style différent pour l'option active (bold + couleur primary)

**3. Filtre Période (Single sélection)**

```
📅 Période
──────────────────────
◉ Tous les événements (40)
○ À venir uniquement (15)
○ Replays disponibles (25)
```

- Radio buttons single-sélection
- Compteur entre parenthèses
- Option "Replays" filtre automatiquement les événements passés avec `replay_url`

**4. Actions**

```
[Bouton : Réinitialiser les filtres]
```

- Remet tous les filtres à leur état par défaut
- Désactivé si aucun filtre n'est appliqué

### Composant EventCard (Enrichi)

**Layout :**

```
┌────────────────────────────────────────┐
│  [Image de l'événement]                │  ← 16:9 aspect ratio
│  🏷️ Badge: "Meetup"  📍 Lille         │  ← Type + Ville
│  ▶️  Icon Play (si replay)             │  ← Overlay si replay disponible
├────────────────────────────────────────┤
│  📅 Jeudi 15 février 2026 · 19h00      │  ← Date formatée FR
│  📍 Lille, Hauts-de-France             │  ← Localisation complète
│  👥 32 / 50 places                     │  ← Capacité (optionnel)
│                                        │
│  [Titre de l'événement]                │  ← H3, 2 lignes max, ellipsis
│  [Description courte]                  │  ← 3 lignes max, ellipsis
│                                        │
│  [Bouton CTA]                          │  ← Pleine largeur
│  "S'inscrire" ou "Voir le replay"     │
└────────────────────────────────────────┘
```

**Badge Ville** (nouveau) :

- Affiché en haut à droite avec le type
- Couleur différenciée par ville :
  - Lille : Vert
  - Paris : Bleu
  - Lyon : Rouge
  - Remote : Violet
  - Autres : Gris

**États visuels :**

- **Futur** : Border primaire (vert), bouton "S'inscrire"
- **Passé avec replay** : Border secondaire, badge "Replay", bouton "Voir le replay"
- **Passé sans replay** : Border grise, badge "Terminé", pas de CTA
- **Complet** : Badge "Complet" rouge, bouton désactivé
- **Hover** : Scale légère + border plus vive + ombre

### Modal Player Vidéo

**Déclenchement** : Clic sur "Voir le replay" ou sur l'icône Play

**Layout :**

```
┌──────────────────────────────────────────────────────┐
│  [X]                                                 │ ← Bouton fermer
│                                                      │
│  [Titre de l'événement]                              │
│  📅 Date · 📍 Ville                                  │
│                                                      │
│  ┌────────────────────────────────────────────────┐ │
│  │                                                │ │
│  │         [Player Vidéo YouTube]                 │ │
│  │                                                │ │
│  │         (16:9 aspect ratio)                    │ │
│  │                                                │ │
│  └────────────────────────────────────────────────┘ │
│                                                      │
│  [Description de l'événement]                        │
│  Markdown formaté                                    │
│                                                      │
└──────────────────────────────────────────────────────┘
```

**Fonctionnalités :**

- Embed YouTube responsive
- Fermeture avec ESC ou bouton X
- Fond overlay sombre (backdrop)
- Vidéo s'arrête à la fermeture
- Scroll si description longue

### États Vides

**Aucun événement à venir :**

```
┌────────────────────────────────────────┐
│            📅                          │
│                                        │
│  Aucun événement prévu pour le moment  │
│                                        │
│  Inscrivez-vous à la newsletter pour   │
│  être notifié des prochains événements │
│                                        │
│  [Bouton : Recevoir les annonces]      │
└────────────────────────────────────────┘
```

**Aucun replay disponible :**

```
┌────────────────────────────────────────┐
│            🎬                          │
│                                        │
│  Aucun replay disponible actuellement  │
│                                        │
│  Les replays des événements passés     │
│  seront publiés ici prochainement      │
└────────────────────────────────────────┘
```

**Aucun résultat après filtrage :**

```
┌────────────────────────────────────────┐
│            🔍                          │
│                                        │
│  Aucun événement ne correspond         │
│  à vos critères                        │
│                                        │
│  [Bouton : Réinitialiser les filtres]  │
└────────────────────────────────────────┘
```

### Responsive Mobile

**Mobile (< 768px) :**

- Filtres en modal/drawer (ouverture avec bouton "Filtrer")
- EventCards en colonne unique
- Sticky "Filtrer" button en bas de l'écran
- Badge ville et type superposés sur l'image

**Tablet (768px - 1024px) :**

- Filtres en sidebar rétractable
- Grid 2 colonnes pour les EventCards

**Desktop (> 1024px) :**

- Layout présenté ci-dessus
- Grid 3 colonnes pour les EventCards

---

## 🛠️ Spécifications Fonctionnelles

### Phase 1 : Implémentation avec JSON

#### Nouveau Champ dans `data/events.json`

**Ajout du champ `city` :**

```json
{
  "id": "event-1",
  "slug": "lille-ai-code-meetup-1",
  "title": "Lille AI Code Meetup",
  "city": "Lille",
  "location": "Lille, Hauts-de-France",
  "event_type": "meetup",
  ...
}
```

**Valeurs acceptées pour `city` :**

- `"Lille"`
- `"Paris"`
- `"Lyon"`
- `"Remote"` (pour les webinars en ligne)
- `"Autre"` (pour les villes occasionnelles)

#### Logique de Filtrage

**Priorité d'application des filtres :**

1. Filtre Période (tri de base)
2. Filtre Ville (multi-sélection)
3. Filtre Type (single-sélection)

**Combinaison des filtres :**

- Les filtres s'appliquent avec un AND logique
- Exemple : Ville=Paris AND Type=Meetup AND Période=À venir
- Si aucun filtre : afficher tous les événements

**Compteurs dynamiques :**

- Recalculés à chaque changement de filtre
- Affichés entre parenthèses à côté de chaque option
- Grisés si compteur = 0 (option non sélectionnable)

#### Persistance des Filtres (URL Query Params)

**Format d'URL :**

```
/events?cities=paris,lille&type=meetup&period=upcoming
```

**Paramètres :**

- `cities` : Liste séparée par virgules (multi-sélection)
- `type` : Valeur unique (meetup, webinar, workshop, conference)
- `period` : Valeur unique (all, upcoming, replays)

**Comportement :**

- Les filtres sont appliqués au chargement de la page
- L'URL est mise à jour en temps réel (history.pushState)
- Le partage de l'URL préserve les filtres
- Le bouton Back/Forward du navigateur fonctionne

#### Tri des Événements

**Événements à venir :**

- Tri par `event_date` croissant (le plus proche en premier)
- Filtrage : `new Date(event.event_date) >= now`

**Événements passés (replays) :**

- Tri par `event_date` décroissant (le plus récent en premier)
- Filtrage : `new Date(event.event_date) < now AND event.replay_url !== null`

### Phase 2 : Migration vers Supabase

#### Modification du Schéma de Table `events`

**Ajout de la colonne `city` :**

```sql
ALTER TABLE public.events
ADD COLUMN city TEXT CHECK (city IN ('Lille', 'Paris', 'Lyon', 'Remote', 'Autre'));
```

**Index pour optimiser les filtres :**

```sql
CREATE INDEX idx_events_city ON public.events(city);
CREATE INDEX idx_events_type ON public.events(event_type);
CREATE INDEX idx_events_date ON public.events(event_date);
CREATE INDEX idx_events_published ON public.events(published);
```

**Index composé pour les requêtes fréquentes :**

```sql
CREATE INDEX idx_events_city_type_date
ON public.events(city, event_type, event_date)
WHERE published = true;
```

#### Fetch Optimisé depuis Supabase

**Requête de base :**

- Filtrer par `published = true`
- Appliquer les filtres ville, type, période côté serveur
- Limiter à 12 résultats par page
- Implémenter la pagination avec `range()`

**Cache et Revalidation :**

- Revalidation toutes les heures (`revalidate: 3600`)
- Cache partagé entre les utilisateurs avec les mêmes filtres
- Invalidation manuelle possible via API

#### Pagination

**Type de pagination :** "Load More" (infinite scroll)

**Comportement :**

- Afficher 12 événements initiaux
- Bouton "Charger plus" en bas de liste
- Charger 12 événements supplémentaires à chaque clic
- Cacher le bouton si tous les événements sont affichés

**Compteur total :**

- Afficher "Affichage de X sur Y événements"
- Exemple : "Affichage de 12 sur 45 événements"

---

## 📊 Critères d'Acceptation

### Phase 1 : Implémentation JSON

#### AC1 : Affichage de Base des Événements

- [ ] La page `/events` charge et affiche tous les événements depuis `data/events.json`
- [ ] Les événements sont séparés en deux sections : "Prochains" et "Replays"
- [ ] Les événements futurs sont triés par date croissante
- [ ] Les événements passés avec replay sont triés par date décroissante
- [ ] Seuls les événements avec `published: true` sont affichés
- [ ] Le champ `city` est présent et affiché sur chaque EventCard

#### AC2 : Filtre par Ville

- [ ] Le panneau de filtres affiche toutes les villes disponibles
- [ ] Les villes affichent le compteur d'événements entre parenthèses
- [ ] La sélection multiple fonctionne (checkboxes)
- [ ] "Toutes les villes" décoche toutes les autres options
- [ ] La liste d'événements se met à jour en temps réel
- [ ] Le compteur total est mis à jour

#### AC3 : Filtre par Type

- [ ] Le panneau de filtres affiche tous les types (Tous, Meetup, Webinar, Workshop, Conférence)
- [ ] Les types affichent le compteur d'événements entre parenthèses
- [ ] La sélection unique fonctionne (radio buttons)
- [ ] L'option active a un style visuel distinct
- [ ] La liste d'événements se met à jour en temps réel
- [ ] Le compteur total est mis à jour

#### AC4 : Filtre par Période

- [ ] Le panneau de filtres affiche les 3 options (Tous, À venir, Replays)
- [ ] Les options affichent le compteur d'événements entre parenthèses
- [ ] La sélection unique fonctionne (radio buttons)
- [ ] "À venir" filtre les événements futurs uniquement
- [ ] "Replays" filtre les événements passés avec `replay_url` non null
- [ ] La liste d'événements se met à jour en temps réel

#### AC5 : Combinaison de Filtres

- [ ] Les filtres Ville + Type + Période fonctionnent ensemble (AND logique)
- [ ] Le compteur total reflète le nombre d'événements après tous les filtres
- [ ] Si aucun résultat : afficher l'état vide avec bouton "Réinitialiser"
- [ ] Les compteurs dans les filtres sont mis à jour selon la combinaison active

#### AC6 : Réinitialisation des Filtres

- [ ] Le bouton "Réinitialiser" est présent en bas du panneau de filtres
- [ ] Un clic remet tous les filtres à "Tous" / "Toutes"
- [ ] La liste affiche tous les événements
- [ ] Le bouton est désactivé si aucun filtre n'est appliqué

#### AC7 : Persistance des Filtres (URL)

- [ ] Les filtres actifs sont reflétés dans l'URL (query params)
- [ ] Le format d'URL est correct : `/events?cities=paris,lille&type=meetup&period=upcoming`
- [ ] Au chargement de la page, les filtres sont appliqués depuis l'URL
- [ ] Le partage de l'URL préserve les filtres
- [ ] Le bouton Back/Forward du navigateur fonctionne correctement

#### AC8 : Composant EventCard

- [ ] Le badge ville est affiché en haut de la carte
- [ ] Le badge ville a une couleur différente selon la ville
- [ ] Le badge type est affiché à côté du badge ville
- [ ] L'image de l'événement est en 16:9 avec fallback si null
- [ ] La date est formatée correctement (ex: "jeudi 15 février 2026 · 19h00")
- [ ] La localisation complète est affichée
- [ ] Le titre est tronqué à 2 lignes avec ellipsis
- [ ] La description est tronquée à 3 lignes avec ellipsis
- [ ] La capacité est affichée si disponible (ex: "32 / 50 places")
- [ ] Le bouton CTA affiche "S'inscrire" pour les événements futurs
- [ ] Le bouton CTA affiche "Voir le replay" pour les événements avec replay
- [ ] Les événements complets affichent un badge "Complet" et désactivent le CTA

#### AC9 : Player Vidéo

- [ ] Le clic sur "Voir le replay" ouvre une modal
- [ ] La modal affiche le titre, la date et la ville de l'événement
- [ ] Le player YouTube est intégré et fonctionnel
- [ ] La modal est responsive avec aspect ratio 16:9
- [ ] La modal se ferme avec ESC, bouton X ou clic sur backdrop
- [ ] La vidéo s'arrête automatiquement à la fermeture
- [ ] La description de l'événement est affichée sous la vidéo

#### AC10 : États Vides

- [ ] Si aucun événement à venir : afficher l'état vide approprié
- [ ] Si aucun replay disponible : afficher l'état vide approprié
- [ ] Si aucun résultat après filtrage : afficher l'état vide avec bouton reset
- [ ] Les états vides incluent une icône et un message explicatif
- [ ] Les états vides proposent une action (newsletter ou réinitialiser)

#### AC11 : Responsive

- [ ] Sur mobile (< 768px) : filtres en modal/drawer
- [ ] Sur mobile : bouton "Filtrer" sticky en bas
- [ ] Sur mobile : EventCards en colonne unique
- [ ] Sur tablet (768-1024px) : sidebar rétractable + grid 2 colonnes
- [ ] Sur desktop (> 1024px) : sidebar fixe + grid 3 colonnes
- [ ] La navigation mobile est fluide et intuitive

### Phase 2 : Migration Supabase

#### AC12 : Migration des Données

- [ ] Le script de migration ajoute la colonne `city` à la table `events`
- [ ] Les index sont créés correctement
- [ ] Toutes les données de `events.json` sont migrées
- [ ] Les valeurs de `city` sont valides et conformes au CHECK constraint
- [ ] Aucune donnée n'est perdue ou corrompue

#### AC13 : Fetch depuis Supabase

- [ ] La page `/events` récupère les événements depuis Supabase
- [ ] Les filtres sont appliqués côté serveur (requête optimisée)
- [ ] La page est un Server Component (SSR/SSG)
- [ ] Le cache Next.js fonctionne correctement
- [ ] La revalidation se fait toutes les heures
- [ ] Si erreur Supabase : afficher un message d'erreur gracieux

#### AC14 : Performance

- [ ] Le temps de chargement initial est < 2 secondes
- [ ] Les images sont optimisées avec Next.js Image
- [ ] Les index Supabase accélèrent les requêtes de filtrage
- [ ] Le cache réduit les appels à Supabase pour les requêtes identiques
- [ ] La pagination limite le nombre d'événements chargés

#### AC15 : Pagination

- [ ] Seuls 12 événements sont affichés initialement
- [ ] Le bouton "Charger plus" est visible si plus de 12 événements
- [ ] Un clic charge 12 événements supplémentaires
- [ ] Le bouton disparaît quand tous les événements sont affichés
- [ ] Le compteur "Affichage de X sur Y" est correct
- [ ] La pagination fonctionne avec les filtres appliqués

---

## 📊 Métriques de Succès

### Métriques d'Engagement

- **Taux d'utilisation des filtres** : > 40% des visiteurs utilisent au moins un filtre
- **Taux de clics sur "S'inscrire"** : > 15% des visiteurs
- **Taux de visionnage de replays** : > 20% des visiteurs
- **Taux de partage d'URL filtrée** : Mesurer les vues via URL avec query params
- **Temps moyen sur la page** : > 2 minutes

### Métriques Techniques

- **LCP (Largest Contentful Paint)** : < 2 secondes
- **FID (First Input Delay)** : < 100ms
- **CLS (Cumulative Layout Shift)** : < 0.1
- **Taux d'erreur fetch Supabase** : < 0.5%
- **Cache hit ratio** : > 80%

### Métriques de Qualité

- **Score Lighthouse Performance** : > 90
- **Score Lighthouse Accessibility** : > 95
- **Couverture des villes** : Au moins 3 villes actives
- **Taux de replays disponibles** : > 60% des événements passés

---

## 🗓️ Plan de Déploiement

### Phase 1 : Implémentation JSON (2 semaines)

**Semaine 1 : Setup et Composants**

- Enrichir `data/events.json` avec le champ `city` et des images
- Créer le composant `EventFilters`
- Créer le composant `VideoPlayerModal`
- Enrichir le composant `EventCard` avec badge ville

**Semaine 2 : Intégration et Tests**

- Implémenter la logique de filtrage dans la page `/events`
- Ajouter la persistance URL avec query params
- Implémenter les états vides
- Tests responsiveness et accessibilité
- Validation SEO

**Livrable Phase 1 :**

- Page `/events` fonctionnelle avec filtres
- Données JSON enrichies
- Tests manuels validés

### Phase 2 : Migration Supabase (1 semaine)

**Jours 1-2 : Migration Base de Données**

- Créer le script de migration SQL
- Ajouter la colonne `city` avec contraintes
- Créer les index optimisés
- Migrer les données de JSON vers Supabase
- Valider l'intégrité des données

**Jours 3-4 : Refactoring Page**

- Remplacer l'import JSON par fetch Supabase
- Implémenter le filtrage côté serveur
- Configurer le cache et revalidation Next.js
- Implémenter la pagination

**Jour 5 : Tests et Déploiement**

- Tests de performance (requêtes, cache)
- Tests de revalidation
- Validation en staging
- Déploiement en production
- Monitoring post-déploiement

**Livrable Phase 2 :**

- Page `/events` connectée à Supabase
- Performance optimisée
- Données migrées et validées

---

## 🚨 Risques & Mitigations

### Risque 1 : Performances de Filtrage avec Beaucoup d'Événements

**Impact** : Moyen
**Probabilité** : Moyenne (si > 100 événements)
**Mitigation** :

- Implémenter la pagination dès le début
- Utiliser des index Supabase optimisés
- Filtrer côté serveur en Phase 2
- Mettre en cache les listes filtrées

### Risque 2 : Complexité UX avec Multi-Sélection Ville

**Impact** : Moyen
**Probabilité** : Moyenne
**Mitigation** :

- Afficher clairement les villes sélectionnées
- Ajouter un badge "X villes sélectionnées"
- Permettre de désélectionner facilement
- Tester avec de vrais utilisateurs

### Risque 3 : Images Manquantes pour les Événements

**Impact** : Faible
**Probabilité** : Élevée
**Mitigation** :

- Utiliser des images placeholder de qualité (Unsplash)
- Générer des gradients dynamiques basés sur la ville
- Afficher l'icône GAB en fallback

### Risque 4 : URLs Luma Invalides ou Expirées

**Impact** : Élevé
**Probabilité** : Moyenne
**Mitigation** :

- Valider les URLs côté serveur avant insertion
- Ajouter un champ `is_registration_open` dans la DB
- Désactiver le bouton "S'inscrire" si URL invalide
- Afficher un message "Inscriptions fermées"

### Risque 5 : Replays YouTube Supprimés ou Privés

**Impact** : Moyen
**Probabilité** : Faible
**Mitigation** :

- Vérifier la disponibilité des replays régulièrement (cron job)
- Afficher un message "Replay temporairement indisponible"
- Stocker une copie de backup sur Vimeo ou autre plateforme

### Risque 6 : Migration Supabase Échoue

**Impact** : Élevé
**Probabilité** : Faible
**Mitigation** :

- Tester la migration en environnement de staging
- Garder `events.json` comme fallback temporaire
- Créer un rollback plan détaillé
- Logger toutes les erreurs de migration
- Faire une sauvegarde complète avant migration

---

## 🔮 Évolutions Futures (Post-MVP)

### V2 : Filtres Avancés

- Recherche textuelle par mot-clé (titre, description)
- Filtre par date spécifique (date picker)
- Filtre par capacité (< 30, 30-50, > 50 places)
- Filtre par statut (Disponible, Complet, Terminé)
- Sauvegarde des filtres préférés (avec authentification)

### V3 : Carte Géographique

- Vue carte interactive avec marqueurs par ville
- Clic sur marqueur pour voir les événements de la ville
- Calcul de distance depuis la localisation utilisateur
- Filtrage par rayon géographique

### V4 : Calendrier Interactif

- Vue calendrier mensuel des événements
- Changement de mois/année
- Affichage des événements par jour
- Export iCal des événements sélectionnés

### V5 : Personnalisation

- Authentification utilisateur
- Système de favoris / événements sauvegardés
- Notifications email avant un événement
- Recommandations personnalisées selon le parcours

---

## 📚 Composants & Fichiers

### Fichiers à Créer

| Fichier                                    | Description                               |
| ------------------------------------------ | ----------------------------------------- |
| `components/events/event-filters.tsx`      | Panneau de filtres (ville, type, période) |
| `components/events/video-player-modal.tsx` | Modal avec player YouTube                 |
| `hooks/use-event-filters.ts`               | Hook custom pour gérer l'état des filtres |
| `lib/utils/filter-events.ts`               | Fonctions utilitaires de filtrage         |

### Fichiers à Modifier

| Fichier                            | Modifications                                |
| ---------------------------------- | -------------------------------------------- |
| `app/(public)/events/page.tsx`     | Intégrer filtres, pagination, fetch données  |
| `components/events/event-card.tsx` | Ajouter badge ville, améliorer UI            |
| `data/events.json`                 | Ajouter champ `city` et enrichir données     |

### Nouveaux Composants shadcn/ui à Utiliser

- `Dialog` (pour le player vidéo modal)
- `Checkbox` (pour les filtres multi-sélection ville)
- `RadioGroup` (pour les filtres single-sélection)
- `Sheet` (pour les filtres mobile en drawer)
- `Badge` (pour les badges ville et type)
- `Skeleton` (pour les états de chargement)

---

## ✅ Checklist de Lancement

### Avant Phase 1

- [ ] Valider les wireframes avec l'équipe
- [ ] Enrichir `data/events.json` avec au moins 10 événements
- [ ] Ajouter des images de qualité pour chaque événement
- [ ] Ajouter des replays YouTube valides pour les événements passés
- [ ] Définir la palette de couleurs pour les badges ville

### Avant Phase 2

- [ ] Configurer les variables d'environnement Vercel
- [ ] Créer un environnement de staging pour tests
- [ ] Préparer le script de migration et le tester
- [ ] Planifier une fenêtre de maintenance si nécessaire

### Avant le Lancement Public

- [ ] Tests end-to-end sur tous les filtres et combinaisons
- [ ] Tests de performance (Lighthouse, WebPageTest)
- [ ] Audit SEO (meta tags, sitemap, structured data)
- [ ] Audit accessibilité (WCAG AA)
- [ ] Tests cross-browser (Chrome, Firefox, Safari, Edge)
- [ ] Tests responsive (mobile, tablet, desktop)
- [ ] Documentation utilisateur rédigée
- [ ] Annonce Discord/Newsletter préparée
- [ ] Monitoring mis en place (Sentry, Vercel Analytics)

---

## 📞 Questions Ouvertes

### À Clarifier avec l'Équipe

1. **Liste des villes prioritaires** : Quelles villes ajouter au-delà de Lille/Paris/Lyon ?
2. **Images par défaut** : Utiliser Unsplash ou créer des visuels custom ?
3. **Hébergement replays** : YouTube uniquement ou aussi Vimeo/Loom ?
4. **Fréquence de revalidation** : 1h, 30min ou temps réel ?
5. **Limite de pagination** : 12 événements par page ou autre ?

### Décisions en Attente

- [ ] Design exact des badges ville (couleurs, icônes)
- [ ] Comportement mobile des filtres (modal vs drawer vs accordion)
- [ ] Type de pagination (Load More vs pagination classique)
- [ ] Affichage des événements complets (cacher ou désactiver)

---

## 🎉 Conclusion

Ce PRD définit une **page événements avec système de filtres puissant** qui permettra à la communauté GAB de découvrir facilement les événements pertinents selon leur localisation, leurs préférences de format, et leur disponibilité.

**Points clés :**

- 🏙️ Gestion multi-villes avec badges colorés
- 🔍 Filtres combinables (ville + type + période)
- 🔗 Partage d'URL avec filtres préservés
- 📱 Expérience responsive optimisée
- ⚡ Performance avec cache et pagination

**Prochaines étapes :**

1. Validation de ce PRD avec l'équipe
2. Clarification des questions ouvertes
3. Estimation des efforts (story points)
4. Début de l'implémentation Phase 1

---

**Version** : 1.0
**Dernière mise à jour** : 16 janvier 2026
**Statut** : Ready for Review 🚀
