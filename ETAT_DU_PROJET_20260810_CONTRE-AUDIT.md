# Canevas Havane — contre-audit du 10/08/2026

> Second audit de la journée, mené **sans reprendre aucun résultat du précédent** :
> chaque outil a été relancé, chaque mesure refaite. C'est la règle du plan C —
> un marqueur vert se prouve, il ne se recopie pas.
>
> Code audité : commit `7fa3274`, **identique à `origin/main`** (`git diff origin/main HEAD`
> ne renvoie rien). Ce qui est écrit ici décrit donc bien le site en ligne.

Légende : ✅ fait et vérifié · 🟠 partiel · 🔴 absent · ⬜ non vérifié (dit pourquoi) · — non applicable

---

## Niveau 1 — État par rapport aux 12 phases

| # | Étape | État | Preuve |
|---|---|---|---|
| 0 | Cadrage | 🔴 | `docs/` est vide, aucun dossier `spec/`. Aucun parcours critique écrit, aucun périmètre figé. |
| 1 | Socle | ✅ | 32 commits · distant GitHub · `.gitignore` + `.env.example` · aucun `.env` suivi (`git ls-files \| grep ^.env` → vide) · crochet `pre-commit` installé · `main` protégée (job « Vérifications » requis, PR obligatoire, ni force-push ni suppression). |
| 2 | Données et autorisations | — | Ni base de données, ni compte, ni ressource privée. Rien à cloisonner. |
| 3 | Interface | 🟠 | 13 pages, toutes avec métadonnées et canonique. **Mais** `og:url` renvoie vers l'accueil sur toutes les pages, et 14 textes passent sous le seuil de contraste (détail §3). |
| 4 | Développement | ✅ | `npx tsc --noEmit` → 0 · `npm run lint` → 0 · `npm test` → **15 tests, 15 verts** · validation Zod + deux plafonds + champ piège sur la seule route qui agit. Réserve écrite : les tests ne couvrent que `/api/contact`. |
| 5 | Sécurité (OWASP 2025) | 🟠 | Détail §2. Un défaut confirmé par exécution (CSRF), un socle en fin de support (Node 20). |
| 6 | Outillage | 🟠 | 4 outils tournent automatiquement en CI + gitleaks au commit. **Aucun ne regarde l'image Docker** — c'est par ce trou que Node 20 est passé (§1). |
| 7 | Conformité FR/UE | ✅ | LCEN : SIREN, adresse, hébergeur, directeur de publication ✅. RGPD : base légale, conservation, destinataires, droits, CNIL ✅. CGV : **« exclusivement destinées à des professionnels […] ne s'adressent pas aux consommateurs »** — ce qui rend légitimes l'absence de droit de rétractation et de médiateur de la consommation. TVA art. 293 B mentionnée sur `/tarifs` et `/cgv`. |
| 8 | Recette | 🟠 | 15 tests automatisés verts. Parcours joué à la main : non. Réception réelle d'un e-mail dans la boîte Gmail : ⬜ non vérifiable sans accès à la boîte. Restauration de sauvegarde : ⬜ jamais faite. |
| 9 | Déploiement | 🟠 | HTTPS + HSTS + CSP bloquante + 8 en-têtes vérifiés en production (§4). Contrôle HTTP après mise en ligne présent. **Retour arrière : jamais testé, et rien ne le permet en moins de 10 min** (§1). Sauvegardes VPS : ⬜ aucun accès serveur. |
| 10 | Exploitation | 🔴 | Aucun suivi d'erreurs (ni Sentry ni équivalent : `grep -riE "sentry\|glitchtip\|bugsnag"` → rien). Aucune alerte métier. Aucune procédure de rotation du mot de passe d'application Google. Aucun plan d'incident. |
| 11 | Automatisations | 🟠 | Une seule : le déploiement. **Elle tourne vraiment** — 5 derniers runs en succès, dernier le 10/08 13:48 UTC (`gh run list`). Journalisée dans GitHub Actions. Mais aucun interrupteur, et aucune alerte hors de l'onglet Actions. |
| 12 | Commercialisation | 🟠 | Pas de paiement en ligne : c'est le modèle, pas un manque. **Indexation Google confirmée : 10 pages référencées** (`site:canevas-havane.com`) — c'était « non vérifié » jusqu'ici. Mais `canevas-havane.com` **est absent de PushRank** (seuls `edificia.fr` et `kéo.fr` y sont) : l'agence vend du SEO et ne mesure pas le sien. |

**Écart avec le rapport de ce matin (4/12) :** je déclasse deux phases. La **6** parce que
la chaîne d'outils, quoique complète sur le code, ne regarde jamais l'image qui exécute ce
code — et c'est précisément là qu'est le défaut le plus sérieux du jour. La **3** parce que
la mesure de contraste refaite ne retrouve pas le « 0 » annoncé (§3).

---

## Niveau 2 — Audit approfondi

### 1. Ce qu'il faut corriger

#### 🟠 A. L'image Docker tourne sur un Node qui n'est plus corrigé

`Dockerfile:1` — `FROM node:20-alpine`, et la CI compile aussi en Node 20.

**Node 20 est sorti du support le 30 avril 2026.** Nous sommes le 10 août : trois mois et
demi sans le moindre correctif de sécurité sur le moteur. Toute faille découverte depuis
dans Node 20 y restera, définitivement.

```
Node 24 | fin de support: 2028-04-30
Node 22 | fin de support: 2027-04-30
Node 20 | fin de support: 2026-04-30      <- l'image du projet
--- date du jour: 2026-08-10 ---
```

Comptage des vulnérabilités graves des trois images, mesuré aujourd'hui :

```
node:20-alpine -> 20 vulnerabilites HIGH/CRITICAL      <- l'image actuelle
node:22-alpine -> 8  vulnerabilites HIGH/CRITICAL
node:24-alpine -> 7  vulnerabilites HIGH/CRITICAL
```

**Pourquoi personne ne l'a vu :** la CI lance `trivy fs` — qui lit les fichiers du dépôt,
donc `package-lock.json` et le `Dockerfile`. Elle ne lance **jamais** `trivy image`, qui
seul ouvre l'image et voit ce qu'elle contient. Les 20 vulnérabilités étaient hors du champ
de vision de la chaîne d'outils. Le filet avait un trou, et le rapport de ce matin
concluait « Trivy : 0 vulnérabilité » en toute bonne foi.

Nuance honnête sur l'exploitabilité : ces 20 CVE visent surtout `npm`, `tar`, `minimatch`,
`sigstore` — des outils de compilation. Le site en production exécute `node server.js` et
ne s'en sert pas. Le risque immédiat est donc faible. Ce qui est sérieux, c'est le
principe : **plus aucun correctif n'arrivera pour ce moteur.**

#### 🟠 B. Un site tiers peut faire envoyer des e-mails depuis le navigateur de ses visiteurs

`src/app/api/contact/route.ts` — la route ne vérifie ni `Origin`, ni `Referer`, ni
`Content-Type`.

Un `POST` en `Content-Type: text/plain` portant un corps JSON est ce que la norme appelle
une « requête simple » : le navigateur l'envoie **sans demander l'autorisation au préalable**.
Prouvé par exécution contre un serveur SMTP piège — la réponse est `{"ok":true}` et le
courriel part réellement :

```
curl -X POST http://<hôte>/api/contact \
  -H 'Content-Type: text/plain;charset=UTF-8' \
  -H 'Origin: https://site-attaquant.example' \
  --data-binary '{"name":"X","email":"x@evil.tld","message":"..."}'
```

**Ce que ça permet concrètement.** N'importe quel site tiers déclenche un envoi chez chacun
de ses visiteurs. Chaque visiteur apporte **sa propre adresse IP réelle** : le plafond de
3 par IP ne freine rien, puisque l'attaquant ne dépense pas ses propres adresses. Le contenu
du message est entièrement choisi par l'attaquant. Conséquences, dans l'ordre de gravité :

1. le plafond global de 40 envois par heure est épuisé, et **le formulaire se ferme aux
   vrais prospects** pendant une heure ;
2. la boîte de réception se remplit de messages qui ont l'air légitimes ;
3. le quota d'envoi du compte Google est consommé.

`form-action 'self'` dans la CSP **ne protège pas** de cela : cette directive gouverne les
formulaires servis par nos propres pages, pas un `fetch()` lancé depuis la page d'un tiers.

#### 🟡 C. Partager une page renvoie vers l'accueil

`src/app/layout.tsx:43` — `openGraph.url` vaut `siteUrl`, figé, et toutes les pages en
héritent. Mesuré en production sur `/tarifs` :

```
<link rel="canonical" href="https://canevas-havane.com/tarifs"/>     <- correct
<meta property="og:url" content="https://canevas-havane.com"/>       <- renvoie a l'accueil
```

Quelqu'un partage la page Tarifs sur LinkedIn ou WhatsApp : l'aperçu pointe vers l'accueil.
Les partages ne s'accumulent pas sur la bonne adresse. Même défaut sur `twitter.title` et
`twitter.description`, figés eux aussi dans le layout.

#### 🟡 D. Contraste : 14 textes sous le seuil, et un chiffre invérifiable dans la doc

Mesure refaite en navigateur (Chromium), 13 pages, thèmes clair et sombre :

```
=== TOTAL : 1494 textes mesures, 14 sous le seuil WCAG AA, 62 en degrade (a verifier a l'oeil) ===
```

Les 14 sont tous de même nature — de grands mots d'ornement en filigrane :

```
-> 1.01:1 (exige 3:1) 72px  rgb(245,242,235) sur rgb(244,241,234)  « PURETÉ »
-> 1.01:1 (exige 3:1) 72px  rgb(245,242,235) sur rgb(244,241,234)  « HÉRITAGE »
-> 1.01:1 (exige 3:1) 192px rgb(245,242,235) sur rgb(244,241,234)  « 01 » « 02 » « 03 »
-> 1.14:1 (exige 3:1) 128px rgb(38,33,31)    sur rgb(26,21,19)     « Canevas Havane »
```

Ce sont des décors voulus (`text-[var(--color-foreground)]/[0.05]`, `select-none`,
`pointer-events-none`), pas des textes à lire. Le vrai défaut n'est donc pas le contraste :
c'est qu'ils **ne portent pas `aria-hidden="true"`**. Un lecteur d'écran les annonce, et une
personne aveugle entend « PURETÉ, HÉRITAGE, 01, 02, 03 » sans qu'aucun de ces mots ne veuille
dire quoi que ce soit à cet endroit.

**Le point de méthode, plus important que le défaut lui-même.** Le `CLAUDE.md` affirme
« 0 texte sous le seuil de contraste sur 812 mesurés, 13 pages ». Ma mesure indépendante en
trouve 14 sur 1494. Je ne peux pas rapprocher les deux chiffres : **aucun script du dépôt ne
permet de rejouer la mesure de ce matin.** Un résultat qu'on ne peut pas relancer n'est pas
une preuve — c'est un souvenir. Le script que j'ai écrit pour ce contre-audit est joint
(§ « Ce que je propose ») précisément pour que ce chiffre redevienne vérifiable.

Deux pièges de mesure valent d'être notés, parce qu'ils font passer un audit à côté :
Tailwind 4 renvoie les couleurs calculées en `oklab(...)`, qu'un analyseur attendant
`rgb(...)` lit comme du noir — ma première passe annonçait ainsi 600 faux échecs. Et les
62 textes peints par un dégradé ont une couleur transparente : leur contraste **n'est pas
mesurable** par ce moyen, ils sont comptés à part et jamais silencieusement en « conforme ».

#### 🟡 E. Aucun retour arrière

`.github/workflows/deploy.yml` — le déploiement fait `docker compose up -d --build`. Si le
site part cassé, le contrôle HTTP qui suit passe le workflow au rouge… et **le site reste
cassé**. Aucune image précédente n'est conservée, aucune commande ne rétablit l'état d'avant.
La porte de sortie de la phase 9 — « retour arrière testé en moins de 10 minutes » — n'est
pas franchie.

#### 🟡 F. Points mineurs, sans urgence

- **Fenêtre fixe du limiteur** (`src/lib/rate-limit.ts`) : la fenêtre est ancrée au premier
  appel plutôt que glissante. 3 envois en fin de fenêtre puis 3 au début de la suivante font
  6 envois en quelques secondes depuis une même IP. Borné par le plafond global.
- **Aucun `concurrency:` dans le workflow** : deux poussées rapprochées déploient en parallèle.
- **HSTS sans `preload`**, et pas de `Cross-Origin-Resource-Policy`. Cosmétique ici.
- **`/cgv`, `/confidentialite` et `/mentions-legales` sont absents du sitemap.** Sans gravité,
  elles sont liées depuis le pied de page.

### 2. OWASP Top 10:2025, catégorie par catégorie

| | Catégorie | État | Preuve |
|---|---|---|---|
| A01 | Contrôle d'accès | — | Aucun compte, aucune ressource privée. Rien à contrôler. |
| A02 | Défaillances cryptographiques | ✅ | HTTPS + HSTS `max-age=31536000; includeSubDomains` vérifiés en prod. Secrets hors dépôt : `gitleaks detect` sur **29 commits → `no leaks found`**. |
| A03 | Injection | ✅ | Validation Zod sur les 4 champs. Injection d'en-tête SMTP **re-testée aujourd'hui contre un SMTP piège** : `\r\n` transformés en espaces, un seul `RCPT TO`, dot-stuffing appliqué — le `.CRLF` et le faux `MAIL FROM` restent dans le corps. Aucun `dangerouslySetInnerHTML` non échappé (`jsonLdScript` échappe `<`, `>`, U+2028/29). |
| A04 | Conception non sûre | 🟠 | Le plafond global de 40/h est un point de rupture unique : il ferme le formulaire à tous. Aggravé par le CSRF (§1.B). |
| A05 | Mauvaise configuration | 🟠 | En-têtes complets et CSP bloquante ✅. **Mais socle en fin de support** (§1.A) et absence de vérification d'origine (§1.B). |
| A06 | Composants vulnérables | 🟠 | `npm audit` → **0 vulnérabilité**. `trivy fs` → **0**. **`trivy image node:20-alpine` → 20 HIGH/CRITICAL**, jamais lancé par la CI. |
| A07 | Identification | — | Aucune authentification. |
| A08 | Intégrité logicielle | ✅ | Les 4 actions GitHub sont épinglées par empreinte de commit. Gitleaks, Semgrep et Trivy installés en versions figées plutôt qu'appelés via des actions tierces. |
| A09 | Journalisation | 🟠 | La route journalise ses refus sans jamais écrire de secret. **Mais rien ne collecte ces journaux** : ils meurent dans le conteneur, personne n'est alerté (§ phase 10). |
| A10 | Échec en s'ouvrant | ✅ | Sans configuration SMTP, la route renvoie **503 et n'envoie pas** — c'est ce que les 15 tests exercent, `beforeEach` supprimant les variables SMTP. Bombe gzip (5 Mo → 4,9 Ko) → 400, corps non décompressé. `Content-Length` menteur → 400. Corps chunked de 400 Ko → **413**. |

### 3. Ce qui a été relancé aujourd'hui, avec les sorties

```
=== outils ===
semgrep 1.172.0 · gitleaks 8.30.1 · trivy 0.73.0 · gh 2.97.0 · pre-commit 4.6.1

=== code ===
npx tsc --noEmit                       -> TSC OK
npm run lint                           -> 0 signalement
npm test                               -> Test Files 1 passed · Tests 15 passed (15)
gitleaks detect (historique complet)    -> 29 commits scanned · no leaks found
semgrep (162 regles, 52 fichiers)       -> Findings: 0 (0 blocking)
npm audit                              -> found 0 vulnerabilities
trivy fs                               -> package-lock.json 0 · Dockerfile 0
trivy image node:20-alpine             -> 20 HIGH/CRITICAL          <- LE TROU

=== production ===
https://canevas-havane.com/api/health  -> {"status":"ok"}
en-tetes                               -> CSP bloquante, HSTS, X-Frame-Options DENY,
                                          X-Content-Type-Options, Referrer-Policy,
                                          Permissions-Policy, COOP, X-Permitted-Cross-Domain
dig TXT canevas-havane.com             -> "v=spf1 -all"
dig TXT _dmarc                         -> "v=DMARC1; p=reject; rua=mailto:..."
dig MX                                 -> vide (le domaine ne recoit pas de courrier)
site:canevas-havane.com (Google)       -> 10 pages indexees
gh run list                            -> 5 derniers deploiements en succes

=== mesure navigateur ===
contraste, 13 pages x 2 themes         -> 1494 mesures, 14 sous le seuil, 62 en degrade
```

### 4. Ce que je n'ai pas pu vérifier, et pourquoi

- **Sauvegardes du VPS et restauration** — aucun accès au serveur Hetzner. Une sauvegarde
  jamais restaurée n'existe pas : c'est l'une des quatre erreurs irréversibles de la méthode.
- **Réception réelle d'un message dans la boîte Gmail** — aucun accès à la boîte. La chaîne
  est prouvée jusqu'au `DATA` SMTP, pas au-delà.
- **Réécriture de `X-Forwarded-For` par Caddy** — hors du dépôt, sur un serveur inaccessible.
  Toute la limitation par IP en dépend : `src/lib/rate-limit.ts` fait confiance à cet en-tête
  sans le vérifier. Si la configuration de Caddy change, la protection tombe **en silence**.
- **Les 62 textes en dégradé** — leur contraste ne se mesure pas par calcul, il se regarde.
- **Supervision externe sur `/api/health`** — invérifiable depuis l'extérieur.

---

## ── SYNTHÈSE ──

**Phases franchies : 3 / 11 applicables** (1 Socle, 4 Développement, 7 Conformité).
La phase 2 est sans objet : ni base, ni compte, ni paiement.

🔴 **Irréversible** — aucun. Aucun secret n'a fuité (`gitleaks` sur l'historique complet),
git est en place avec 32 commits, aucune donnée personnelle n'est collectée sans base légale.

🟠 **Bloquant** — deux points :
- **A.** Le socle d'exécution n'est plus corrigé depuis 3 mois et demi (Node 20).
- **B.** N'importe quel site tiers peut fermer le formulaire de contact aux prospects, et
  remplir la boîte de réception, sans posséder une seule adresse IP.

🟡 **Dette** — `og:url` figé (C) · ornements non masqués aux lecteurs d'écran (D) · aucun
retour arrière (E) · aucun suivi d'erreurs · aucun document de cadrage · tests limités à une
route · site absent de PushRank · points mineurs (F).

⬜ **Non vérifié** — sauvegardes et restauration · réception réelle d'un e-mail · dépendance
à la configuration de Caddy · supervision externe · les 62 textes en dégradé.

## ── LE CHEMIN LE PLUS COURT ──

Dans l'ordre : ce qui coûte le plus cher à corriger plus tard passe en premier.

| # | Ce qu'on fait | Qui | Temps | Ce qui devient vert |
|---|---|---|---|---|
| 1 | Passer l'image et la CI en **Node 22 LTS**, et **ajouter `trivy image` à la CI** pour que le trou se referme pour de bon | agent | 30 min | 🟠 A · phases 5, 6 |
| 2 | **Exiger `Content-Type: application/json` et refuser les `Origin` étrangers** sur `/api/contact`, avec un test par cas | agent | 30 min | 🟠 B · phase 5 |
| 3 | **Rendre `og:url` propre à chaque page** (une ligne par page ou un utilitaire partagé) | agent | 20 min | 🟡 C · phase 3 |
| 4 | **`aria-hidden="true"` sur les ornements**, et le script de contraste versionné + branché en CI | agent | 40 min | 🟡 D · phase 3 |
| 5 | **Étiqueter les images Docker et écrire la commande de retour arrière**, puis la jouer une fois pour de vrai | agent + Lohan | 1 h | 🟡 E · phase 9 |
| 6 | **Brancher un suivi d'erreurs** (Sentry, offre gratuite) et une sonde externe sur `/api/health` | agent + Lohan (comptes) | 1 h | 🔴 phase 10 |
| 7 | **Envoyer un vrai message par le formulaire** et confirmer sa réception dans Gmail | Lohan | 5 min | ⬜ phase 8 |
| 8 | **Vérifier les sauvegardes Hetzner et en restaurer une** | Lohan | 1 h | ⬜ phase 8, erreur irréversible n°3 |
| 9 | **Ajouter `canevas-havane.com` à PushRank** | Lohan | 10 min | 🟡 phase 12 |
| 10 | **Écrire le document de cadrage** (une page : pour qui, quel parcours, quelles données) | agent + Lohan | 1 h | 🔴 phase 0 |

Les points 1 et 2 se tiennent en une heure et referment les deux 🟠.

---

## Ce que je propose pour que chaque défaut ne revienne pas

La méthode demande, pour chaque défaut, la règle ou le test qui le rendra impossible.

| Défaut | Le garde-fou |
|---|---|
| A — image en fin de support | Une étape `trivy image` dans la CI **et** une règle Semgrep qui refuse un `FROM node:<version>` dont le support est terminé. Le premier attrape les vulnérabilités, le second attrape la date. |
| B — CSRF | Un test qui envoie `Content-Type: text/plain` et attend un 415, plus un test qui envoie un `Origin` étranger et attend un 403. Sans eux, la protection se ferait retirer sans bruit à la première refonte. |
| C — `og:url` figé | Une règle Semgrep : toute page qui déclare `alternates.canonical` doit déclarer `openGraph.url`. Les deux vont par paire. |
| D — contraste et ornements | `contraste.mjs` (écrit pour ce contre-audit, joint au rapport) versionné dans le dépôt et lancé en CI sur la version compilée. C'est ce qui manque aujourd'hui : la garde actuelle est une règle Semgrep sur les classes **écrites**, qui ne voit pas la couleur **rendue**. |
| E — retour arrière | Rien ne remplace de l'avoir joué une fois. Le garde-fou est la trace de cette répétition, écrite dans `DEPLOIEMENT.md`. |
| F — fenêtre du limiteur | Un test qui envoie 3 requêtes, avance l'horloge jusqu'au bord de la fenêtre, en envoie 3 autres, et fixe le comportement attendu. |

Le script `contraste.mjs` est prêt : il parcourt les 13 pages dans les deux thèmes, résout
les couleurs `oklab` par le navigateur lui-même, isole les textes en dégradé, et **sort en
code d'erreur 1** dès qu'un texte passe sous le seuil — ce qui suffit à faire échouer la CI.

---

## Corrections appliquées le 10/08/2026 au soir

Les deux 🟠 sont refermés. La dette 🟡 reste ouverte, par décision.

### A — Node 22 LTS, et le trou de la CI rebouché

`Dockerfile` passe de `node:20-alpine` à `node:22-alpine` (supporté jusqu'au 30/04/2027),
et la CI compile désormais sur la même version — compiler sur un moteur et exécuter sur un
autre, c'est tester autre chose que ce qui tourne.

**npm est retiré de l'image de production.** Les vulnérabilités graves ne venaient pas du
site : elles venaient de `tar`, `sigstore`, `picomatch` et `ip-address`, embarqués dans npm.
Or le serveur démarre par `node server.js` et n'appelle jamais npm. Plutôt que d'ajouter un
fichier d'exceptions — qui aurait laissé le code vulnérable en place et rendu l'alerte
permanente, donc contournée tôt ou tard — on supprime le code.

Mesuré sur l'image réellement construite :

```
node:20-alpine (avant)            -> 20 HIGH/CRITICAL
image finale corrigee (apres)     ->  0 HIGH/CRITICAL au total
trivy image --exit-code 1          -> exit=0

node --version dans l'image       -> v22.23.2
npm dans l'image                  -> absent (voulu)
accueil                           -> HTTP 200
/api/health                       -> {"status":"ok"}
```

Deux gardes, qui n'attrapent pas la même chose :

- une étape **`trivy image`** dans la CI, qui construit l'image et l'ouvre — ce que
  `trivy fs` ne fait jamais ;
- une règle Semgrep **`image-node-hors-support`**, qui attrape la *date* plutôt que les
  failles : une version peut être hors support sans qu'aucune faille n'ait encore été
  publiée contre elle. Vérifiée sur le défaut d'origine :
  ```
  ❯❯❱ semgrep.image-node-hors-support
           1┆ FROM node:20-alpine AS base
  ```

### B — Le formulaire n'accepte plus les demandes venues d'ailleurs

`src/app/api/contact/route.ts` exige `Content-Type: application/json` (415 sinon) et refuse
tout `Origin` étranger (403). Le contrôle passe **avant tout compteur** : une requête
étrangère n'entame plus le quota du visiteur dont le navigateur a été utilisé à son insu.

L'origine est comparée à l'hôte de la requête, puis à l'adresse du site — le développement
local et les prévisualisations fonctionnent donc sans liste à tenir à jour. Un `Origin`
absent reste accepté : les navigateurs le posent toujours sur un POST inter-sites, donc son
absence signifie curl, une sonde ou un test — jamais une page tierce.

Écrit sans `try`/`catch` (`URL.canParse`) : dans une fonction dont la valeur de retour décide
d'un refus, une exception attrapée est le chemin le plus court vers un échec qui s'ouvre.
La règle maison `echec-ouvert` avait d'ailleurs signalé la première version.

**L'attaque de l'audit, rejouée contre l'image finale :**

```
text/plain depuis un tiers : HTTP 415      (avant : 200, et l'e-mail partait)
json depuis un tiers       : HTTP 403
origine opaque (null)      : HTTP 403
le formulaire du site      : HTTP 502      (va jusqu'a l'envoi SMTP : aucun serveur n'ecoute)
```

Vérifié aussi depuis un vrai navigateur, sur la vraie page `/contact`, avec l'`Origin` posé
par le navigateur : `502`, et aucune violation CSP en console. Le formulaire n'est pas cassé.

**7 tests ajoutés** (15 → 22). Ils ont été éprouvés par mutation : en neutralisant les deux
gardes, 5 d'entre eux passent au rouge, puis reviennent au vert une fois la protection
rétablie. Un test qui ne tombe jamais ne garde rien.

### Vérification complète après corrections

```
npx tsc --noEmit    -> 0 erreur
npm run lint        -> 0 signalement
npm test            -> Test Files 1 passed · Tests 22 passed (22)
npm run build       -> succes
semgrep             -> Findings: 0 (0 blocking) · 163 regles · 54 fichiers
trivy image         -> exit=0
```

### Ce qui reste ouvert

La dette 🟡 du tableau ci-dessus, inchangée : `og:url` figé, ornements non masqués aux
lecteurs d'écran, contraste non branché en CI, aucun retour arrière, aucun suivi d'erreurs,
aucun document de cadrage, site absent de PushRank. Et les ⬜ non vérifiables sans accès :
sauvegardes, réception réelle d'un e-mail, dépendance à la configuration de Caddy.

**Rien n'est parti en production** : ces corrections vivent sur la branche
`contre-audit-20260810`.
