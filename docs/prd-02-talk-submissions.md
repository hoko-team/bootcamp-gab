# PRD 02 - Système de Soumission de Sujets de Talk

## 📋 Informations du Document

| Champ | Valeur |
|-------|--------|
| **Projet** | GAB Platform |
| **Feature** | Soumission et Gestion des Propositions de Talks |
| **Version** | 1.0 |
| **Date** | 16 janvier 2026 |
| **Statut** | Draft |
| **Auteur** | Claude Code |

---

## 🎯 Vision & Objectifs

### Vision
Permettre à la **communauté GAB de contribuer activement** au contenu des événements en proposant des sujets de talks de manière simple et structurée. Créer un **pipeline transparent** de la soumission à l'acceptation pour enrichir les événements avec des expertises diversifiées.

### Objectifs Business
1. **Engager la communauté** en donnant la parole aux membres
2. **Diversifier le contenu** des événements avec des perspectives variées
3. **Faciliter l'organisation** des événements avec un backlog de sujets qualifiés
4. **Découvrir de nouveaux speakers** au sein de la communauté
5. **Structurer le processus** de sélection des talks

### Objectifs Utilisateurs
- **En tant que membre** : Je veux proposer un sujet facilement sans créer de compte
- **En tant que speaker potentiel** : Je veux expliquer mon idée de façon détaillée
- **En tant que contributeur** : Je veux recevoir une confirmation de réception
- **En tant qu'organisateur** : Je veux centraliser toutes les propositions en un seul endroit

---

## 📦 Scope du Projet

### ✅ In Scope

#### Fonctionnalités Publiques (Frontend)
- Formulaire de soumission de talk accessible à tous (sans authentification)
- Champs structurés : informations speaker, détails du talk, préférences
- Validation client en temps réel (React Hook Form + Zod)
- Compteurs de caractères pour titre et description
- Sélection de l'événement cible (liste déroulante)
- Choix de la durée souhaitée (15, 30, 45 minutes)
- Page de confirmation après soumission réussie
- Email de confirmation automatique (optionnel Phase 1)

#### Backend & Base de Données
- Table Supabase `talk_submissions` avec schéma complet
- API route Next.js `/api/talk-submissions` (POST)
- Validation serveur avec Zod
- Stockage sécurisé des soumissions
- Timestamps automatiques (created_at, updated_at)
- Gestion des erreurs et logging

#### Workflow de Gestion (Basique)
- Statut par défaut : `pending` (en attente de review)
- Champ `notes` pour remarques internes
- Champ `reviewed_by` pour traçabilité
- Champ `reviewed_at` pour historique

### ❌ Out of Scope (Future Iterations)
- Interface d'administration complète (backoffice)
- Système de vote communautaire sur les talks
- Tableau de bord speaker pour suivre ses soumissions
- Notifications email pour changements de statut
- Système de commentaires entre organisateurs et speakers
- Export des soumissions en CSV/PDF
- Intégration avec un outil de gestion de projet (Notion, Trello)
- Analyse automatique de la qualité des propositions (IA)

---

## 👤 Personas & User Stories

### Persona 1 : Léa, Designer UX/UI
**Contexte** : Léa utilise l'IA dans son travail quotidien (Midjourney, ChatGPT) et veut partager son expérience avec la communauté GAB.

**User Stories :**
- 🎯 Je veux **proposer un sujet de talk sans créer de compte**
- 🎯 Je veux **expliquer mon sujet en détail** (titre + description longue)
- 🎯 Je veux **choisir la durée** de mon talk (15, 30 ou 45 min)
- 🎯 Je veux **sélectionner un événement** spécifique ou laisser les organisateurs décider
- 🎯 Je veux **recevoir une confirmation** que ma soumission a été reçue
- 🎯 Je veux **être contactée** si mon sujet est retenu

### Persona 2 : Marc, Développeur Senior
**Contexte** : Marc a développé un projet SaaS avec l'aide de Claude Code et veut présenter son retour d'expérience technique.

**User Stories :**
- 🎯 Je veux **décrire mon talk de façon structurée** (objectifs, points clés)
- 🎯 Je veux **indiquer mon niveau d'expertise** dans ma bio
- 🎯 Je veux **proposer pour le prochain meetup** disponible
- 🎯 Je veux **m'assurer que ma soumission est bien enregistrée**
- 🎯 Je veux **recevoir un email de confirmation** avec les détails

### Persona 3 : Julien, Organisateur GAB
**Contexte** : Julien organise les meetups GAB à Lille et cherche des speakers pour les prochains événements.

**User Stories :**
- 🎯 Je veux **recevoir toutes les propositions dans une base de données**
- 🎯 Je veux **filtrer les propositions** par événement, durée, statut
- 🎯 Je veux **voir les informations complètes** de chaque proposition
- 🎯 Je veux **changer le statut** d'une proposition (pending → reviewed → accepted/rejected)
- 🎯 Je veux **ajouter des notes internes** pour discussion avec l'équipe
- 🎯 Je veux **identifier rapidement** les propositions de qualité

---

## 🗺️ User Flows

### Flow 1 : Soumission d'un Talk (Speaker)

```
[Visiteur arrive sur /events ou page d'accueil]
    ↓
[Voit le CTA "Proposer un talk" en évidence]
    ↓
[Clique sur le bouton]
    ↓
[Accède au formulaire de soumission]
   (Option 1 : Modal sur /events)
   (Option 2 : Page dédiée /events/propose-talk)
    ↓
[Remplit le formulaire :]
    - Informations personnelles (nom, prénom, email)
    - Sélection événement cible
    - Titre du talk (max 100 caractères)
    - Description détaillée (500-2000 caractères)
    - Durée souhaitée (15/30/45 min)
    - Bio speaker (optionnel, max 500 caractères)
    - Consentement contact
    ↓
[Voit les validations en temps réel]
    - Compteurs de caractères
    - Messages d'erreur si champs invalides
    - Bouton "Soumettre" désactivé si formulaire incomplet
    ↓
[Clique sur "Soumettre ma proposition"]
    ↓
[Loader affiché pendant l'envoi]
    ↓
[Requête POST envoyée à /api/talk-submissions]
    ↓
[Backend valide et enregistre dans Supabase]
    ↓
[Page de confirmation affichée]
    - Message de remerciement
    - Résumé de la soumission
    - "Nous reviendrons vers vous sous 1-2 semaines"
    ↓
[Email de confirmation envoyé (optionnel)]
    ↓
[Speaker peut proposer un autre talk ou retourner à /events]
```

### Flow 2 : Gestion des Propositions (Organisateur) - Futur

```
[Organisateur se connecte au backoffice] (Non inclus dans ce PRD)
    ↓
[Accède à la liste des propositions]
    ↓
[Voit un tableau avec colonnes :]
    - Date de soumission
    - Nom du speaker
    - Titre du talk
    - Événement cible
    - Durée
    - Statut (Pending, Reviewed, Accepted, Rejected)
    ↓
[Filtre par statut "Pending"]
    ↓
[Clique sur une proposition pour voir les détails]
    ↓
[Modal affiche :]
    - Informations complètes du speaker
    - Titre et description complète
    - Bio du speaker
    - Date de soumission
    - Notes internes (si existantes)
    ↓
[Évalue la proposition]
    ↓
[Change le statut :]
    - "Reviewed" (en cours d'évaluation)
    - "Accepted" (talk retenu)
    - "Rejected" (talk non retenu)
    ↓
[Ajoute des notes internes]
    Ex: "Super sujet, à programmer pour le prochain meetup"
    ↓
[Enregistre les modifications]
    ↓
[Le speaker reçoit une notification] (Futur)
```

### Flow 3 : Gestion des Erreurs

```
[Speaker remplit le formulaire]
    ↓
[Clique sur "Soumettre"]
    ↓
[Erreur de validation client]
    → Affiche messages d'erreur sous les champs
    → Bouton reste désactivé
    → Speaker corrige les erreurs
    ↓
[OU Erreur réseau / serveur]
    → Affiche message d'erreur global
    → "Une erreur est survenue. Veuillez réessayer."
    → Données du formulaire préservées
    → Speaker peut réessayer
    ↓
[OU Erreur Supabase (ex: DB down)]
    → API retourne erreur 500
    → Affiche message d'erreur technique
    → "Service temporairement indisponible"
    → Propose de contacter support
```

---

## 🎨 Spécifications UI/UX

### Option 1 : Modal sur la Page `/events`

**Déclenchement :**
- Bouton CTA "Proposer un talk" en haut de la page `/events`
- Position : Hero section ou sticky en haut à droite

**Layout de la Modal :**
```
┌─────────────────────────────────────────────────────────┐
│  [X]                                    Proposer un talk │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Vous avez une expertise à partager avec la             │
│  communauté GAB ? Proposez un sujet pour nos            │
│  prochains événements !                                 │
│                                                         │
│  ─────────────────────────────────────────────────────  │
│                                                         │
│  [Formulaire complet]                                   │
│  (Scrollable si nécessaire)                             │
│                                                         │
│  [Bouton : Soumettre ma proposition]                    │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Caractéristiques :**
- Max-width : 700px
- Max-height : 90vh avec scroll interne
- Fond overlay sombre
- Fermeture avec ESC ou X
- Responsive mobile : full screen

### Option 2 : Page Dédiée `/events/propose-talk`

**Navigation :**
- Lien dans la navbar : "Proposer un talk"
- Bouton CTA sur la page `/events`
- Footer link

**Layout de la Page :**
```
┌──────────────────────────────────────────────────────────┐
│  Header (GAB Platform)                                   │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  [Hero Section Minimal]                                  │
│  ────────────────────────────────────────────────────    │
│  📢 Proposer un sujet de talk                            │
│                                                          │
│  Partagez votre expertise avec la communauté GAB        │
│  Meetups • Webinars • Workshops                         │
│                                                          │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  ┌────────────────────────────────────────────────────┐ │
│  │                                                    │ │
│  │  [Formulaire de Soumission]                        │ │
│  │  (Container max-width: 700px, centré)              │ │
│  │                                                    │ │
│  └────────────────────────────────────────────────────┘ │
│                                                          │
├──────────────────────────────────────────────────────────┤
│  Footer                                                  │
└──────────────────────────────────────────────────────────┘
```

**Caractéristiques :**
- Page dédiée avec URL propre
- SEO optimisé (meta tags)
- Breadcrumb : Accueil > Événements > Proposer un talk
- Pas de distractions (focus sur le formulaire)

### Formulaire de Soumission (Détaillé)

**Structure en Sections :**

```
┌─────────────────────────────────────────────────────────┐
│  SECTION 1 : Informations Personnelles                  │
│  ──────────────────────────────────────────────────────  │
│                                                         │
│  [Label] Prénom *                                       │
│  [Input Text]                                           │
│                                                         │
│  [Label] Nom *                                          │
│  [Input Text]                                           │
│                                                         │
│  [Label] Email *                                        │
│  [Input Email]                                          │
│  💡 Nous utiliserons cet email pour vous contacter     │
│                                                         │
├─────────────────────────────────────────────────────────┤
│  SECTION 2 : Détails du Talk                            │
│  ──────────────────────────────────────────────────────  │
│                                                         │
│  [Label] Événement cible *                              │
│  [Select Dropdown]                                      │
│  ↓ Prochain meetup Lille (15 mars 2026)                │
│  ↓ Prochain webinar GAB (22 mars 2026)                 │
│  ↓ À déterminer avec les organisateurs                 │
│                                                         │
│  [Label] Titre du talk *                                │
│  [Input Text] (max 100 caractères)                      │
│  📝 45 / 100 caractères                                 │
│                                                         │
│  [Label] Description détaillée *                        │
│  [Textarea] (min 500, max 2000 caractères)              │
│  Décrivez votre sujet, les points clés que vous         │
│  souhaitez aborder, le public cible...                  │
│  📝 782 / 2000 caractères (min 500)                     │
│                                                         │
│  [Label] Durée souhaitée *                              │
│  [Radio Group]                                          │
│  ○ 15 minutes (Lightning talk - format court)          │
│  ◉ 30 minutes (Talk standard)                          │
│  ○ 45 minutes (Talk approfondi avec démo)              │
│                                                         │
├─────────────────────────────────────────────────────────┤
│  SECTION 3 : À propos de vous (optionnel)               │
│  ──────────────────────────────────────────────────────  │
│                                                         │
│  [Label] Bio / Présentation                             │
│  [Textarea] (max 500 caractères)                        │
│  Parlez-nous de vous : votre parcours, votre            │
│  expertise, vos projets...                              │
│  📝 128 / 500 caractères                                │
│                                                         │
├─────────────────────────────────────────────────────────┤
│  SECTION 4 : Consentement                               │
│  ──────────────────────────────────────────────────────  │
│                                                         │
│  [Checkbox] ☑ J'accepte d'être contacté par l'équipe   │
│                GAB concernant ma proposition de talk    │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  [Bouton : Soumettre ma proposition]                    │
│  (Pleine largeur, désactivé si formulaire invalide)     │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Validation en Temps Réel :**

| Champ | Règles de Validation | Message d'Erreur |
|-------|---------------------|------------------|
| **Prénom** | Min 2 caractères, Max 50 | "Le prénom doit contenir au moins 2 caractères" |
| **Nom** | Min 2 caractères, Max 50 | "Le nom doit contenir au moins 2 caractères" |
| **Email** | Format email valide | "Veuillez entrer un email valide" |
| **Titre** | Min 10 caractères, Max 100 | "Le titre doit contenir entre 10 et 100 caractères" |
| **Description** | Min 500 caractères, Max 2000 | "La description doit contenir entre 500 et 2000 caractères" |
| **Durée** | Obligatoire | "Veuillez sélectionner une durée" |
| **Consentement** | Doit être coché | "Vous devez accepter d'être contacté pour soumettre un talk" |

**Compteurs de Caractères :**
- Position : Sous le champ concerné
- Couleur :
  - Gris : Neutre
  - Orange : Approche de la limite min/max
  - Rouge : Limite min non atteinte ou max dépassée
  - Vert : Longueur valide

**États du Bouton "Soumettre" :**
- **Désactivé** : Formulaire invalide, style grisé, cursor not-allowed
- **Normal** : Formulaire valide, style primary, cursor pointer
- **Loading** : Envoi en cours, spinner, texte "Envoi en cours..."
- **Success** : (transitoire) Checkmark, texte "Envoyé !"

### Page de Confirmation

**Affichée après soumission réussie :**

```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│                      ✅                                   │
│                                                          │
│            Merci pour votre proposition !                │
│                                                          │
│  Votre sujet de talk a bien été enregistré.             │
│  Notre équipe l'examinera dans les prochains jours.     │
│                                                          │
│  ─────────────────────────────────────────────────────   │
│                                                          │
│  📋 Résumé de votre proposition                          │
│                                                          │
│  Titre : "Comment l'IA générative a transformé..."      │
│  Durée : 30 minutes                                      │
│  Événement : Prochain meetup Lille (15 mars 2026)       │
│                                                          │
│  ─────────────────────────────────────────────────────   │
│                                                          │
│  📧 Un email de confirmation a été envoyé à :            │
│     marie@example.com                                    │
│                                                          │
│  💬 Nous reviendrons vers vous sous 1-2 semaines         │
│     si votre sujet est retenu.                           │
│                                                          │
│  ─────────────────────────────────────────────────────   │
│                                                          │
│  [Bouton : Proposer un autre talk]                       │
│  [Bouton : Retour aux événements]                        │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

**Caractéristiques :**
- Centré verticalement et horizontalement
- Animation d'entrée (fade + slide up)
- Icône checkmark verte en grand
- Résumé clair de la soumission
- Actions claires pour la suite

### États d'Erreur

**Erreur de Validation Client :**
```
┌─────────────────────────────────────┐
│  [Champ avec erreur]                │
│  ❌ Message d'erreur en rouge       │
└─────────────────────────────────────┘
```

**Erreur Serveur Générale :**
```
┌──────────────────────────────────────────────────┐
│  ⚠️                                               │
│                                                  │
│  Une erreur est survenue                         │
│                                                  │
│  Impossible d'envoyer votre proposition pour     │
│  le moment. Veuillez réessayer dans quelques     │
│  instants.                                       │
│                                                  │
│  Si le problème persiste, contactez-nous à :    │
│  contact@gab-platform.com                        │
│                                                  │
│  [Bouton : Réessayer]                            │
└──────────────────────────────────────────────────┘
```

**Erreur Réseau :**
```
┌──────────────────────────────────────────────────┐
│  📡                                               │
│                                                  │
│  Problème de connexion                           │
│                                                  │
│  Vérifiez votre connexion internet et réessayez. │
│                                                  │
│  [Bouton : Réessayer]                            │
└──────────────────────────────────────────────────┘
```

### Responsive Mobile

**Mobile (< 768px) :**
- Formulaire en colonne unique
- Sections empilées verticalement
- Inputs et boutons pleine largeur
- Font sizes adaptées (min 16px pour éviter zoom iOS)
- Padding réduit pour maximiser l'espace
- Modal en plein écran si Option 1

**Tablet (768px - 1024px) :**
- Container max-width: 600px centré
- Espacement confortable

**Desktop (> 1024px) :**
- Container max-width: 700px centré
- Espacement généreux
- Focus states bien visibles

---

## 🛠️ Spécifications Fonctionnelles

### Table Supabase `talk_submissions`

**Colonnes :**

| Colonne | Type | Contraintes | Description |
|---------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY, DEFAULT gen_random_uuid() | Identifiant unique |
| `first_name` | TEXT | NOT NULL | Prénom du speaker |
| `last_name` | TEXT | NOT NULL | Nom du speaker |
| `email` | TEXT | NOT NULL | Email de contact |
| `event_id` | UUID | FOREIGN KEY events(id) ON DELETE SET NULL, NULL | Événement cible (optionnel) |
| `event_preference` | TEXT | NULL | "next_available" ou "tbd" |
| `talk_title` | TEXT | NOT NULL, CHECK (length <= 100) | Titre du talk |
| `talk_description` | TEXT | NOT NULL, CHECK (length BETWEEN 500 AND 2000) | Description détaillée |
| `duration` | INTEGER | NOT NULL, CHECK (duration IN (15, 30, 45)) | Durée en minutes |
| `speaker_bio` | TEXT | NULL, CHECK (length <= 500) | Bio du speaker (optionnel) |
| `status` | TEXT | DEFAULT 'pending', CHECK (status IN ('pending', 'reviewed', 'accepted', 'rejected')) | Statut de la proposition |
| `reviewed_by` | UUID | FOREIGN KEY auth.users(id) ON DELETE SET NULL, NULL | ID de l'organisateur qui a review |
| `reviewed_at` | TIMESTAMPTZ | NULL | Date de la dernière review |
| `notes` | TEXT | NULL | Notes internes pour les organisateurs |
| `created_at` | TIMESTAMPTZ | DEFAULT now() | Date de création |
| `updated_at` | TIMESTAMPTZ | DEFAULT now() | Date de dernière modification |

**Index :**
```sql
CREATE INDEX idx_talk_submissions_email ON talk_submissions(email);
CREATE INDEX idx_talk_submissions_status ON talk_submissions(status);
CREATE INDEX idx_talk_submissions_event_id ON talk_submissions(event_id);
CREATE INDEX idx_talk_submissions_created_at ON talk_submissions(created_at DESC);
```

**Row Level Security (RLS) :**
```sql
-- Politique 1 : Tout le monde peut soumettre
CREATE POLICY "Allow public submissions"
  ON talk_submissions
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Politique 2 : Seuls les admins peuvent lire
CREATE POLICY "Allow admins to read"
  ON talk_submissions
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

-- Politique 3 : Seuls les admins peuvent modifier
CREATE POLICY "Allow admins to update"
  ON talk_submissions
  FOR UPDATE
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');
```

**Trigger pour updated_at :**
```sql
CREATE TRIGGER update_talk_submissions_updated_at
  BEFORE UPDATE ON talk_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

### API Route `/api/talk-submissions`

**Endpoint :** `POST /api/talk-submissions`

**Headers :**
```
Content-Type: application/json
```

**Body (JSON) :**
```json
{
  "firstName": "Marie",
  "lastName": "Dupont",
  "email": "marie@example.com",
  "eventId": "uuid-or-null",
  "eventPreference": "next_available" | "tbd",
  "talkTitle": "Comment l'IA générative a transformé mon workflow design",
  "talkDescription": "Dans ce talk, je partage...",
  "duration": 30,
  "speakerBio": "Designer UX/UI avec 5 ans d'expérience...",
  "consent": true
}
```

**Réponses :**

**201 Created (Succès) :**
```json
{
  "message": "Soumission enregistrée avec succès",
  "data": {
    "id": "uuid-generated",
    "talk_title": "Comment l'IA générative...",
    "status": "pending",
    "created_at": "2026-01-16T10:30:00Z"
  }
}
```

**400 Bad Request (Validation échouée) :**
```json
{
  "error": "Données invalides",
  "details": [
    {
      "field": "talkDescription",
      "message": "La description doit contenir au moins 500 caractères"
    }
  ]
}
```

**500 Internal Server Error :**
```json
{
  "error": "Erreur lors de l'enregistrement",
  "message": "Service temporairement indisponible"
}
```

### Validation Zod (Client & Serveur)

**Schéma de Validation :**

**Champs :**
- `firstName` : string, min 2, max 50
- `lastName` : string, min 2, max 50
- `email` : string, email format
- `eventId` : string UUID optionnel
- `eventPreference` : enum ["next_available", "tbd"], default "next_available"
- `talkTitle` : string, min 10, max 100
- `talkDescription` : string, min 500, max 2000
- `duration` : enum [15, 30, 45], transformé en integer
- `speakerBio` : string optionnel, max 500
- `consent` : boolean, must be true

### Email de Confirmation (Optionnel Phase 1)

**Déclencheur :** Après insertion réussie dans Supabase

**Contenu de l'Email :**

```
Objet : Votre proposition de talk a bien été reçue - GAB Platform

Bonjour Marie,

Merci d'avoir proposé un sujet de talk pour nos événements GAB !

📋 Résumé de votre proposition :

Titre : "Comment l'IA générative a transformé mon workflow design"
Durée : 30 minutes
Événement cible : Prochain meetup Lille (15 mars 2026)

Notre équipe examinera votre proposition dans les prochains jours.
Si votre sujet est retenu, nous vous contacterons à cette adresse email.

En attendant, n'hésitez pas à :
- Participer à nos prochains événements : https://gab-platform.com/events
- Rejoindre notre communauté Discord : [lien]
- Suivre notre newsletter : [lien]

À bientôt,
L'équipe GAB

---
GAB Platform - Communauté IA Générative
https://gab-platform.com
```

**Service d'envoi :**
- Resend (recommandé)
- OU Mailchimp Transactional
- OU Brevo

---

## 📊 Critères d'Acceptation

### Frontend - Formulaire de Soumission

#### AC1 : Affichage et Accessibilité du Formulaire
- [ ] Le formulaire est accessible via un bouton "Proposer un talk" sur `/events`
- [ ] Le formulaire s'affiche en modal OU sur une page dédiée `/events/propose-talk`
- [ ] Tous les champs sont présents et correctement labellés
- [ ] Les champs obligatoires sont marqués d'une `*`
- [ ] Le formulaire est responsive (mobile, tablet, desktop)
- [ ] Les inputs ont des placeholders clairs
- [ ] Le formulaire est accessible (WCAG AA)

#### AC2 : Validation Client en Temps Réel
- [ ] Les champs obligatoires déclenchent une erreur si laissés vides
- [ ] L'email est validé avec un format correct
- [ ] Le titre est limité à 100 caractères maximum
- [ ] La description est limitée à 500-2000 caractères
- [ ] La bio est limitée à 500 caractères maximum
- [ ] Les messages d'erreur s'affichent sous les champs concernés
- [ ] Le bouton "Soumettre" est désactivé si le formulaire est invalide
- [ ] La checkbox de consentement doit être cochée pour activer le bouton

#### AC3 : Compteurs de Caractères
- [ ] Un compteur est affiché pour le titre (X / 100)
- [ ] Un compteur est affiché pour la description (X / 2000, min 500)
- [ ] Un compteur est affiché pour la bio (X / 500)
- [ ] Les compteurs se mettent à jour en temps réel
- [ ] La couleur du compteur change selon la validation (gris/orange/rouge/vert)

#### AC4 : Sélection de l'Événement
- [ ] La liste déroulante affiche les événements à venir
- [ ] L'option "À déterminer avec les organisateurs" est présente
- [ ] La sélection est sauvegardée correctement
- [ ] Si aucun événement à venir : afficher uniquement "À déterminer"

#### AC5 : Choix de la Durée
- [ ] Les 3 options de durée sont affichées (15, 30, 45 minutes)
- [ ] Les descriptions sont claires (Lightning, Standard, Approfondi)
- [ ] La sélection unique fonctionne (radio buttons)
- [ ] Une durée est sélectionnée par défaut (30 minutes)

#### AC6 : Soumission du Formulaire
- [ ] Un clic sur "Soumettre" déclenche la validation complète
- [ ] Un loader est affiché pendant l'envoi (spinner + texte "Envoi en cours...")
- [ ] Le bouton est désactivé pendant l'envoi
- [ ] Si succès : afficher la page de confirmation
- [ ] Si erreur : afficher un message d'erreur clair
- [ ] Le formulaire ne se réinitialise qu'en cas de succès

### Backend - API & Base de Données

#### AC7 : Table Supabase `talk_submissions`
- [ ] La table est créée avec toutes les colonnes spécifiées
- [ ] Les contraintes CHECK sont appliquées (length, enum values)
- [ ] Les foreign keys sont correctement configurées
- [ ] Les index sont créés pour optimiser les requêtes
- [ ] Les timestamps `created_at` et `updated_at` sont automatiques
- [ ] Le trigger `updated_at` fonctionne correctement

#### AC8 : Row Level Security (RLS)
- [ ] La policy "Allow public submissions" permet l'insertion sans authentification
- [ ] La policy "Allow admins to read" restreint la lecture aux admins uniquement
- [ ] La policy "Allow admins to update" restreint la modification aux admins
- [ ] Les tentatives d'accès non autorisé sont bloquées

#### AC9 : API Route POST `/api/talk-submissions`
- [ ] L'endpoint accepte les requêtes POST avec Content-Type: application/json
- [ ] Le body JSON est parsé correctement
- [ ] La validation Zod côté serveur fonctionne
- [ ] Les données valides sont insérées dans Supabase
- [ ] Le statut par défaut est défini à "pending"
- [ ] Une réponse 201 Created est retournée en cas de succès
- [ ] Une réponse 400 Bad Request est retournée en cas de validation échouée
- [ ] Une réponse 500 Internal Server Error est retournée en cas d'erreur Supabase

#### AC10 : Validation Serveur
- [ ] Tous les champs obligatoires sont validés
- [ ] Les longueurs min/max sont vérifiées
- [ ] Le format email est validé
- [ ] Les valeurs enum sont validées (duration, eventPreference)
- [ ] Les erreurs de validation sont retournées avec détails (champ + message)

### Confirmation & Feedback

#### AC11 : Page de Confirmation
- [ ] Après soumission réussie : redirection vers page de confirmation
- [ ] La page affiche un message de remerciement
- [ ] Un résumé de la soumission est affiché (titre, durée, événement)
- [ ] L'email de contact est rappelé
- [ ] Un CTA "Proposer un autre talk" est présent
- [ ] Un CTA "Retour aux événements" est présent

#### AC12 : Email de Confirmation (Optionnel Phase 1)
- [ ] Un email est envoyé à l'adresse fournie après soumission
- [ ] L'email contient le résumé de la proposition
- [ ] L'email explique les prochaines étapes
- [ ] L'email inclut des liens vers la communauté GAB
- [ ] Le template email est responsive et bien formaté

### Gestion des Erreurs

#### AC13 : Affichage des Erreurs
- [ ] Les erreurs de validation client sont affichées en temps réel
- [ ] Les erreurs réseau sont détectées et affichées
- [ ] Les erreurs serveur sont affichées avec un message générique
- [ ] Un bouton "Réessayer" est proposé en cas d'erreur
- [ ] Les données du formulaire sont préservées en cas d'erreur
- [ ] Les erreurs 500 suggèrent de contacter le support

---

## 📊 Métriques de Succès

### Métriques d'Engagement
- **Taux de clics sur "Proposer un talk"** : > 5% des visiteurs de `/events`
- **Taux de complétion du formulaire** : > 60% des formulaires commencés
- **Nombre de soumissions par mois** : > 10 propositions
- **Taux de qualité** : > 70% des soumissions avec description > 1000 caractères
- **Taux de spam/invalides** : < 5% des soumissions

### Métriques de Performance
- **Temps de soumission du formulaire** : < 2 secondes (API response)
- **Taux d'erreur API** : < 1%
- **Disponibilité de l'API** : > 99.5%
- **Score Lighthouse Formulaire** : > 90 (Performance, Accessibility)

### Métriques de Conversion (Organisateurs)
- **Taux de review des propositions** : > 80% reviewées sous 2 semaines
- **Taux d'acceptation** : 30-50% des propositions acceptées
- **Délai moyen de réponse** : < 10 jours
- **Taux de talks programmés** : > 70% des talks acceptés effectivement programmés

---

## 🗓️ Plan de Déploiement

### Phase 1 : Implémentation MVP (2 semaines)

**Semaine 1 : Backend & Base de Données**
- Jour 1-2 : Créer la table Supabase `talk_submissions`
  - Définir le schéma SQL
  - Créer les contraintes et index
  - Configurer les RLS policies
  - Tester les insertions manuelles
- Jour 3-4 : Créer l'API route `/api/talk-submissions`
  - Implémenter la validation Zod
  - Gérer l'insertion dans Supabase
  - Gérer les erreurs et logging
  - Tester avec Postman/Insomnia
- Jour 5 : Tests backend
  - Tests unitaires de la validation
  - Tests d'intégration avec Supabase
  - Tests de performance

**Semaine 2 : Frontend & Intégration**
- Jour 1-2 : Créer le composant `TalkSubmissionForm`
  - Créer le schéma Zod client
  - Implémenter React Hook Form
  - Ajouter les compteurs de caractères
  - Styliser avec Tailwind + shadcn/ui
- Jour 3 : Intégration sur `/events`
  - Ajouter le bouton CTA
  - Intégrer le formulaire (modal ou page)
  - Connecter à l'API
  - Gérer les états (loading, success, error)
- Jour 4 : Page de confirmation
  - Créer la page de confirmation
  - Ajouter les CTAs de retour
  - Tester le flow complet
- Jour 5 : Tests et Polish
  - Tests responsive (mobile, tablet, desktop)
  - Tests d'accessibilité (WCAG)
  - Tests de validation (edge cases)
  - Corrections bugs et polish UI

**Livrable Phase 1 :**
- Formulaire fonctionnel et accessible
- API opérationnelle
- Soumissions stockées dans Supabase
- Documentation technique

### Phase 2 : Email de Confirmation (Optionnel - 1 semaine)

**Jour 1-2 : Intégration Resend**
- Configurer Resend avec la clé API
- Créer le template d'email HTML
- Tester l'envoi d'emails

**Jour 3-4 : Implémentation dans l'API**
- Ajouter la fonction d'envoi email après insertion
- Gérer les erreurs d'envoi (ne pas bloquer la soumission)
- Logger les emails envoyés

**Jour 5 : Tests**
- Tester l'envoi d'emails
- Valider le template sur différents clients (Gmail, Outlook, etc.)
- Tests de performance

**Livrable Phase 2 :**
- Emails de confirmation automatiques
- Template responsive et professionnel

---

## 🚨 Risques & Mitigations

### Risque 1 : Spam de Soumissions
**Impact** : Moyen
**Probabilité** : Moyenne
**Mitigation** :
- Ajouter un Honeypot field invisible pour piéger les bots
- Limiter à 3 soumissions par email par jour (rate limiting)
- Implémenter un CAPTCHA (hCaptcha ou Cloudflare Turnstile) si nécessaire
- Ajouter une modération manuelle des nouvelles soumissions

### Risque 2 : Soumissions de Faible Qualité
**Impact** : Moyen
**Probabilité** : Moyenne
**Mitigation** :
- Imposer une description longue (min 500 caractères)
- Ajouter des exemples et guides dans le formulaire
- Clarifier les attentes dans la page d'introduction
- Créer un guide "Comment proposer un bon talk"

### Risque 3 : Erreurs de Soumission (Réseau, Serveur)
**Impact** : Élevé
**Probabilité** : Faible
**Mitigation** :
- Sauvegarder les données du formulaire dans localStorage
- Permettre de réessayer facilement
- Afficher des messages d'erreur clairs
- Logger toutes les erreurs pour debugging
- Mettre en place un monitoring (Sentry)

### Risque 4 : Surcharge de Propositions
**Impact** : Moyen
**Probabilité** : Faible (bonne nouvelle!)
**Mitigation** :
- Créer un backlog organisé par priorité
- Définir un processus de review efficace
- Communiquer clairement les délais de réponse
- Prévoir une interface de gestion (backoffice) rapidement

### Risque 5 : Pas d'Interface d'Administration
**Impact** : Élevé
**Probabilité** : Élevée (hors scope Phase 1)
**Mitigation** :
- Utiliser Supabase Studio pour consulter les soumissions
- Créer des requêtes SQL préparées pour les organisateurs
- Planifier le développement du backoffice en Phase 3
- Exporter en CSV si nécessaire temporairement

### Risque 6 : Abandons du Formulaire (UX)
**Impact** : Moyen
**Probabilité** : Moyenne
**Mitigation** :
- Simplifier au maximum le formulaire
- Afficher une barre de progression
- Sauvegarder automatiquement dans localStorage
- Réduire les champs obligatoires au strict minimum
- Tester avec de vrais utilisateurs

---

## 🔮 Évolutions Futures (Post-MVP)

### Phase 3 : Interface d'Administration (Backoffice)
- Dashboard pour les organisateurs avec authentification
- Liste des soumissions avec filtres (statut, événement, durée)
- Vue détaillée de chaque proposition
- Changement de statut (pending → reviewed → accepted/rejected)
- Ajout de notes internes
- Export CSV des soumissions
- Statistiques (nombre par mois, taux d'acceptation, etc.)

### Phase 4 : Notifications & Workflow
- Email automatique lors du changement de statut
- Email de relance si pas de nouvelles sous 3 semaines
- Notifications Discord pour les nouveaux talks soumis
- Workflow de validation en plusieurs étapes
- Attribution d'un talk à un événement spécifique

### Phase 5 : Système de Vote Communautaire
- Authentification des membres
- Vote sur les propositions de talks
- Classement par votes
- Affichage public des talks les plus demandés
- Badge "Top voted" sur les propositions

### Phase 6 : Dashboard Speaker
- Authentification speaker via email
- Vue de toutes ses propositions
- Statut en temps réel
- Modification d'une proposition en attente
- Historique des talks donnés
- Statistiques de participation

### Phase 7 : Intégrations Avancées
- Synchronisation avec Notion pour la gestion interne
- Export vers Google Calendar après acceptation
- Intégration avec Luma pour création automatique d'événement
- Génération automatique de visuels d'annonce
- Analyse IA de la qualité des propositions

---

## 📚 Composants & Fichiers

### Fichiers à Créer

| Fichier | Description |
|---------|-------------|
| `components/forms/talk-submission-form.tsx` | Formulaire complet de soumission |
| `components/forms/talk-confirmation.tsx` | Page de confirmation après soumission |
| `app/(public)/events/propose-talk/page.tsx` | Page dédiée (Option 2) |
| `app/api/talk-submissions/route.ts` | API route pour soumissions |
| `lib/validations/talk-submission.ts` | Schéma Zod de validation |
| `lib/email/send-talk-confirmation.ts` | Fonction d'envoi email (Phase 2) |
| `scripts/create-talk-submissions-table.sql` | Script SQL de création de table |

### Fichiers à Modifier

| Fichier | Modifications |
|---------|---------------|
| `app/(public)/events/page.tsx` | Ajouter bouton CTA "Proposer un talk" |
| `lib/types/content.ts` | Ajouter type `TalkSubmission` |

### Composants shadcn/ui à Utiliser

- `Dialog` (pour le formulaire en modal - Option 1)
- `Input` (pour les champs texte)
- `Textarea` (pour description et bio)
- `Select` (pour la sélection d'événement)
- `RadioGroup` (pour la durée)
- `Checkbox` (pour le consentement)
- `Button` (pour les CTAs)
- `Label` (pour les labels de champs)
- `Alert` (pour les messages d'erreur)
- `Skeleton` (pour les états de chargement)

---

## ✅ Checklist de Lancement

### Avant le Développement
- [ ] Valider les wireframes du formulaire avec l'équipe
- [ ] Choisir entre Option 1 (modal) et Option 2 (page dédiée)
- [ ] Définir les événements à afficher dans la liste déroulante
- [ ] Préparer le template d'email de confirmation (si Phase 2)
- [ ] Configurer Resend ou autre service d'email (si Phase 2)

### Avant le Déploiement en Staging
- [ ] Créer la table `talk_submissions` dans Supabase staging
- [ ] Configurer les RLS policies
- [ ] Tester l'insertion manuelle de données
- [ ] Tester l'API avec Postman
- [ ] Valider le formulaire sur tous les devices
- [ ] Tester tous les cas d'erreur

### Avant le Déploiement en Production
- [ ] Créer la table `talk_submissions` dans Supabase production
- [ ] Configurer les variables d'environnement Vercel
- [ ] Tests end-to-end complets
- [ ] Audit accessibilité (Lighthouse, axe DevTools)
- [ ] Validation SEO de la page `/events/propose-talk`
- [ ] Monitoring mis en place (Sentry, logs)
- [ ] Documentation organisateurs rédigée
- [ ] Annonce communauté préparée (Discord, Newsletter)

---

## 📞 Questions Ouvertes

### À Clarifier avec l'Équipe
1. **Option d'affichage** : Modal sur `/events` OU page dédiée `/events/propose-talk` ?
2. **Email de confirmation** : Prioritaire en Phase 1 ou peut attendre Phase 2 ?
3. **Service d'email** : Resend, Mailchimp Transactional ou Brevo ?
4. **Liste des événements** : Afficher uniquement les 3 prochains ou tous les événements à venir ?
5. **Modération** : Qui s'occupera de la review des propositions ?
6. **Délai de réponse** : Quel engagement de délai communiquer aux speakers ?

### Décisions en Attente
- [ ] Priorité de développement du backoffice d'administration
- [ ] Besoin d'un CAPTCHA dès le lancement ou attendre de voir le volume de spam
- [ ] Affichage public des talks soumis (avec vote communautaire) : priorité ?
- [ ] Intégration avec un outil existant (Notion, Trello, Linear) pour la gestion interne

---

## 🎉 Conclusion

Ce PRD définit un **système complet de soumission de talks** qui permettra à la communauté GAB de contribuer activement au contenu des événements. La solution proposée est **simple, accessible et scalable**.

**Points clés :**
- 📝 Formulaire structuré et guidé
- ✅ Validation robuste client et serveur
- 💾 Stockage sécurisé dans Supabase
- 📧 Confirmation automatique (Phase 2)
- 🔒 RLS pour sécuriser les données
- 🚀 API performante et fiable

**Prochaines étapes :**
1. Validation de ce PRD avec l'équipe
2. Clarification des questions ouvertes
3. Choix de l'option d'affichage (modal vs page)
4. Estimation des efforts (story points)
5. Début de l'implémentation

---

**Version** : 1.0
**Dernière mise à jour** : 16 janvier 2026
**Statut** : Ready for Review 🚀
