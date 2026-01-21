# PROGRESS.md

Suivi de l'avancement du projet GAB (Groupe des Augmented Builders).

## Pages

| Page | Route | Statut | Notes |
|------|-------|--------|-------|
| Landing | `/` | ✅ Fait | Hero, features, map events, newsletter |
| Events | `/events` | ✅ Fait | Filtres complets, vue liste/carte, toutes features |
| Blog | `/blog` | 🔄 En cours | Structure OK, pas de contenu |
| Blog Article | `/blog/[slug]` | 🔄 En cours | Route dynamique prête |
| Ressources | `/ressources` | 🔄 En cours | Structure OK, placeholder |
| Ressource Detail | `/ressources/[slug]` | 🔄 En cours | Route dynamique prête |
| Formations | `/formations` | 🔄 En cours | Structure OK, placeholder |
| Formation Detail | `/formations/[slug]` | 🔄 En cours | Route dynamique prête |
| Soutenir | `/soutenir` | 🔄 En cours | Page de soutien/donation |

## Composants

| Composant | Statut | Notes |
|-----------|--------|-------|
| Header | ✅ Fait | Navigation responsive avec Sheet mobile |
| Footer | ✅ Fait | Liens, newsletter |
| Hero | ✅ Fait | Image de fond, stripes animées, event card |
| EventCard | ✅ Fait | Affichage événement enrichi (speakers, calendar, progress, social proof, tags) |
| EventsMap | ✅ Fait | Carte Leaflet interactive avec marqueurs |
| EventsMapWrapper | ✅ Fait | Wrapper SSR désactivé pour Leaflet |
| EventFilters | ✅ Fait | Filtres complets (ville, type, période, tags) avec Sheet mobile |
| EventList | ✅ Fait | Grille responsive d'EventCards |
| EventViewToggle | ✅ Fait | Toggle vue liste/carte |
| EventSpeakers | ✅ Fait | Affichage speakers avec avatars |
| EventCalendarBtn | ✅ Fait | Dropdown Google/Apple/Outlook |
| EventTags | ✅ Fait | Tags clickables pour filtrage |
| EventSocialProof | ✅ Fait | Avatars inscrits avec "+X" |
| EventProgressBar | ✅ Fait | Barre de progression avec couleurs dynamiques |
| ArticleCard | ✅ Fait | Carte article blog |
| ResourceCard | ✅ Fait | Carte ressource |
| NewsletterForm | ✅ Fait | Formulaire inscription newsletter |
| CopyButton | ✅ Fait | Copie dans le presse-papier |

## Fonctionnalités

### ✅ Fait

- [x] Layout responsive (Header/Footer)
- [x] Hero section avec animation
- [x] Carte interactive des événements (Leaflet)
- [x] Formulaire newsletter (UI)
- [x] Design system shadcn/ui configuré
- [x] Types Supabase définis
- [x] Dark mode support (config Tailwind)
- [x] **Page événements complète avec filtres**
- [x] **Filtres multi-critères** (ville, type, période, tags)
- [x] **Vue liste/carte** avec toggle
- [x] **EventCard enrichi** (speakers, calendar, progress, social proof, tags)
- [x] **Hook useEventFilters** avec persistance URL
- [x] **Helpers data** (events.ts, users.ts)
- [x] **Filtrage côté client** avec useMemo
- [x] **Composants shadcn** (checkbox, toggle-group, dropdown-menu, avatar)

### 🔄 En cours

- [ ] Connexion Supabase pour les événements (migration depuis JSON)
- [ ] Intégration Luma pour inscriptions
- [ ] View Transitions API
- [ ] Analytics tracking
- [ ] Partage social amélioré
- [ ] Recherche full-text

### 📅 À faire

- [ ] Filtres sauvegardés (localStorage)
- [ ] Export de liste d'événements
- [ ] Notifications push
- [ ] Recommandations basées sur tags
- [ ] Comparaison d'événements

### A faire

- [ ] Blog avec articles Supabase
- [ ] Ressources avec filtres (type, parcours, difficulté)
- [ ] Formations avec modules
- [ ] Page partenaires
- [ ] Intégration Resend pour newsletter
- [ ] SEO (metadata, sitemap, robots.txt)
- [ ] Analytics
- [ ] Tests E2E

## Base de données

| Table | Statut | Notes |
|-------|--------|-------|
| events | Types OK | En attente de données |
| articles | Types OK | En attente de données |
| resources | Types OK | En attente de données |
| formations | Types OK | En attente de données |
| subscribers | Types OK | API newsletter à connecter |
| partners | Types OK | En attente de données |

## API Routes

| Route | Méthode | Statut | Notes |
|-------|---------|--------|-------|
| `/api/newsletter` | POST | En cours | Structure prête, Resend à configurer |

## Prochaines priorités

1. **Migration Supabase** : Connecter les événements depuis Supabase (actuellement JSON)
2. **Features UX avancées** : View Transitions, Analytics, Partage social
3. **Newsletter** : Intégration Resend
4. **Blog** : Premiers articles
5. **Recherche** : Barre de recherche full-text

## État actuel de la page Events

### ✅ Implémenté

- **Structure complète** : Page Server Component + Client Component pour interactivité
- **Filtres avancés** :
  - Multi-sélection ville (Lille, Paris, Lyon, Remote, etc.)
  - Multi-sélection type (Meetup, Webinar, Workshop, Conference)
  - Période (Tous, À venir, Passés)
  - Multi-sélection tags dynamiques
- **Vue liste/carte** : Toggle avec persistance URL
- **EventCard enrichi** :
  - Speakers avec avatars et liens LinkedIn
  - Bouton calendrier (Google/Apple/Outlook)
  - Barre de progression (taux de remplissage)
  - Social proof (avatars inscrits)
  - Tags clickables
- **Responsive** : Sheet mobile pour filtres, grille adaptative
- **Performance** : Filtrage instantané avec useMemo, pas de rechargement

### 📊 Statistiques

- **7 événements** dans `data/events.json`
- **10 speakers** dans `data/users.json`
- **11 composants** dédiés aux événements
- **1 hook custom** (useEventFilters)
- **2 helpers data** (events.ts, users.ts)

---

*Dernière mise à jour : Janvier 2026*
*Page Events : ✅ Complète avec toutes les features core*