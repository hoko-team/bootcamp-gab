-- Seed data for public.events
-- Run in Supabase Studio > SQL Editor

create table if not exists public.events (
  id text primary key,
  slug text not null unique,
  title text not null,
  description text not null,
  event_date timestamptz not null,
  event_end_date timestamptz null,
  location text not null,
  image_url text null,
  registration_url text null,
  replay_url text null,
  is_past boolean not null default false,
  event_type text not null,
  capacity integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.events enable row level security;

drop policy if exists "Public read published events" on public.events;
create policy "Public read published events"
  on public.events
  for select
  using (published = true);

drop policy if exists "Service role manage events" on public.events;
create policy "Service role manage events"
  on public.events
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

insert into public.events (
  id,
  slug,
  title,
  description,
  event_date,
  event_end_date,
  location,
  image_url,
  registration_url,
  replay_url,
  is_past,
  event_type,
  capacity,
  published
) values
  (
    'event-1',
    'gab-meetup-1',
    'GAB Meetup #1',
    'Rejoins la communauté tech lilloise pour le premier meetup français dédié à la pointe de la **Programmation Assistée par IA** : du Vibe Coding aux agents de codage IA comme Windsurf, Cursor ou Cline qui transforment la façon de créer des logiciels.

## C''est quoi ce meetup ?

On se retrouve pour échanger, partager des astuces et explorer ensemble comment l''IA transforme notre façon de coder. Que tu sois dev confirmé ou simple curieux, viens découvrir comment créer des applis en discutant simplement avec une IA.

## Au menu :

* Des démos bluffantes de code généré par IA
* Des retours d''expérience de ceux qui l''utilisent déjà
* Des échanges informels sur les possibilités et limites
* Un espace pour tester et expérimenter

## Tu es concerné si :

* Tu codes et tu veux gagner en productivité
* Tu as des idées mais pas les compétences techniques
* Tu es curieux des nouvelles façons de créer du logiciel
* Tu veux rencontrer d''autres passionnés de tech

## Pourquoi venir ?

* Pour voir en direct ce qu''on peut faire avec ces outils
* Pour éviter les galères en apprenant des autres
* Pour élargir ton réseau local de tech enthusiasts
* Pour passer un bon moment autour d''une passion commune

**Ramène ta bonne humeur, tes questions et tes idées ! On se retrouve pour viber ensemble et repousser les limites de la création logicielle !**

_PS: Débutants bienvenus - pas besoin d''être un expert pour participer !_',
    '2026-01-18T19:00:00Z',
    null,
    'Lille, Hauts-de-France',
    null,
    'https://luma.com/nssmjiml',
    null,
    true,
    'meetup',
    68,
    true
  ),
  (
    'event-2',
    'gab-meetup-2',
    'GAB Meetup #2',
    'Rejoins la communauté tech lilloise pour la deuxième édition du meetup dédié à la **programmation assistée par IA** : du Vibe Coding aux agents de codage IA comme Windsurf, Cursor ou Claude Code qui transforment la façon de créer des produits digitaux.

## C''est quoi ce meetup ?

On se retrouve pour échanger, partager des astuces et explorer ensemble comment l''IA transforme notre façon de coder. Que tu sois dev confirmé ou simple curieux, viens découvrir comment créer des applis bosstées par de l''IA.

## Au menu :

* Un retour d''expérience de Stéphane Dessein, CTO et Quentin Janon, développeur web chez **Le Fourgon** sur la refonte de leur site web marchand. Ils nous font le plaisir de nous recevoir pour cette seconde édition.

_Mais aussi..._

* Des démos de produits créés avec de l''IA
* Les dernières actus et astuces du moment
* Des échanges informels sur les possibilités et limites

## Tu es concerné si :

* Tu codes et tu veux gagner en productivité
* Tu as des idées mais pas les compétences techniques
* Tu es curieux des nouvelles façons de créer du logiciel
* Tu veux rencontrer d''autres passionnés de tech

## Pourquoi venir ?

* Pour découvrir ce qu''on peut faire avec ces outils
* Pour apprendre des autres membres de la communauté
* Pour élargir ton réseau local de tech enthusiasts
* Pour passer un bon moment autour d''une passion commune

**Ramène ta bonne humeur, tes questions et tes idées ! On se retrouve pour viber ensemble et repousser les limites !**

_PS: Débutants bienvenus - pas besoin d''être un expert pour participer !_',
    '2026-02-01T19:00:00Z',
    null,
    'Le Fourgon, 270 Av. de l''Espace Bâtiment C, 59118 Wambrechies, France',
    null,
    'https://luma.com/pmlqn16v',
    null,
    true,
    'meetup',
    49,
    true
  ),
  (
    'event-3',
    'gab-meetup-3',
    'GAB Meetup #3',
    'Rejoins la communauté lilloise pour cette **3ᵉ édition** placée sous le signe de l''exploration et du partage entre profils **Tech** et **non-Tech**

👉 Que tu sois **développeur**, **marketeur**, **entrepreneur**, ou simplement **curieux**, viens découvrir comment l''IA transforme la façon de **concevoir des logiciels et des contenus**.

**👨‍💻 Au programme (work in progress) :**

* **Pierre-Yves Banaszak et Julien Robidet** du collectif **Hoko** présenteront les dernières nouveautés en matière de développement assisté par IA, ainsi qu''un retour d''expérience terrain.
* **Antoine Crespin** partagera son point de vue de **non-tech** avec un retour d''expérience sur le **Vibe Coding**
* **Quentin Tousart** montrera comment **utiliser Claude Code efficacement sans avoir d''expérience en développement**
* **François Xavier Cao** détaillera la mise en place **d''un** RAG sur mesure pour le traitement de données confidentielles : défis, bonnes pratiques et alternatives

**🍻 Et comme toujours…**

On prolonge la soirée autour d''un verre et de quelques snacks offerts par notre sponsor **Proppl** pour **networker, échanger des idées et débattre ensemble des pratiques de demain**.

👉 **Inscris-toi dès maintenant** pour ne pas manquer cette soirée conviviale et inspirante !

---

**EDITION SPONSOR**

🤝 **Proppl**, LA solution de recrutement par recommandation est sponsor de cette édition !',
    '2026-03-01T19:00:00Z',
    null,
    'SKEMA Business School - Campus Lille, Av. Willy Brandt, 59777 Lille, France',
    null,
    'https://luma.com/wt1i17z6',
    null,
    true,
    'meetup',
    81,
    true
  ),
  (
    'event-4',
    'gab-meetup-4',
    'GAB Meetup #4',
    '🚨 Le Lille AI Code Meetup fait peau neuve et devient GAB - GenAI Builders.

L''IA Générative transforme la manière dont nous construisons des produits digitaux. Rejoins la communauté tech lilloise pour la quatrième édition de ce meetup pour partager ou découvrir ces nouveaux usages.

## C''est quoi ce meetup ?

On se retrouve pour échanger, partager des astuces et explorer ensemble comment l''IA transforme radicalement la manière dont nous construisons des produits digitaux. Que tu travailles dans le monde du produit ou simplement curieux, viens découvrir comment l''IA générative peut accélérer ton quotidien.

## Au menu :

* **Le CMS est mort, vive le CMS !**
**Pierre Burgy**, CEO de Strapi, viendra nous expliquer comment l''IA générative rebat les cartes pour les éditeurs de solution de gestion de contenus et comment lui et ses équipes travaillent sur le CMS du futur
* **Maîtriser l''OCR à l''ère de l''agentic**
Louis Choquel, CTO de Pipelex nous présentera les pièges à éviter dans le domaine de l''extraction de données agentic et comment y remédier.
* **Refactoring de code legacy avec l''IA**
**Nicolas Rocq**, TENKAN8 - groupe UMITEK abordera la rétro documentation avec l''IA. Un sujet qui parle à tous ceux qui héritent de projets sans doc ou mal documentés.

_Mais aussi..._

* Des démos de produits créés avec de l''IA
* Les dernières actus et astuces du moment
* Des échanges informels sur les possibilités et limites

## Tu es concerné si :

* Tu codes et tu veux gagner en productivité
* Tu as des idées mais pas les compétences techniques
* Tu es curieux des nouvelles façons de créer du logiciel
* Tu veux rencontrer d''autres passionnés de tech

## Pourquoi venir ?

* Pour découvrir ce qu''on peut faire avec ces outils
* Pour apprendre des autres membres de la communauté
* Pour élargir ton réseau ou retrouver des connaissances dans un cadre convivial
* Pour passer un bon moment autour d''une passion commune

**Ramène ta bonne humeur, tes questions et tes idées ! On se retrouve pour viber ensemble et repousser les limites !**

_PS: Débutants bienvenus - pas besoin d''être un expert pour participer !_',
    '2026-04-01T19:00:00Z',
    null,
    'EuraTechnologies, 165 Av. de Bretagne, 59000 Lille, France',
    null,
    'https://luma.com/hpup7z3i',
    null,
    false,
    'meetup',
    83,
    true
  )
on conflict (slug) do update set
  title = excluded.title,
  description = excluded.description,
  event_date = excluded.event_date,
  event_end_date = excluded.event_end_date,
  location = excluded.location,
  image_url = excluded.image_url,
  registration_url = excluded.registration_url,
  replay_url = excluded.replay_url,
  is_past = excluded.is_past,
  event_type = excluded.event_type,
  capacity = excluded.capacity,
  published = excluded.published,
  updated_at = now()
;
