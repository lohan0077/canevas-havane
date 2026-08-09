# État du projet — Canevas Havane

> **Note ajoutée après coup, le 9 août 2026.** Ce rapport décrit l'état du projet **avant**
> corrections. Les points marqués « bloquant à la vente », ainsi que la majorité de la dette,
> ont été traités le jour même sur la branche `audit-20260809` — voir la section « État connu
> du projet » du `CLAUDE.md` pour ce qui a changé et ce qui reste. Le rapport est conservé
> tel quel : c'est le point de comparaison.
>
> **Un défaut non listé ci-dessous a été découvert pendant les corrections** : le site chargeait
> les polices depuis `fonts.googleapis.com` et une image depuis `grainy-gradients.vercel.app`
> (qui renvoyait un 404). Deux tiers non déclarés recevaient l'adresse IP de chaque visiteur.
> C'est la pose de la CSP qui l'a révélé — aucun des quatre passages d'audit ne l'avait vu.

**Date :** 9 août 2026
**Dépôt :** `github.com/lohan0077/canevas-havane` — branche d'audit `audit-20260809`
**Site en ligne :** https://canevas-havane.com (HTTP 200, servi par Caddy sur `204.168.134.208`)
**Nature :** site vitrine Next.js 16, 12 pages, une seule route serveur (`/api/contact`).
Pas de base de données, pas de compte utilisateur, pas de paiement en ligne.

Légende : ✅ fait et vérifié · 🟠 partiel · 🔴 absent · ⬜ non vérifié · — non applicable

---

## Ce qui n'a pas pu être vérifié, et pourquoi

Les cinq outils de code répondent (`semgrep 1.172.0`, `gitleaks 8.30.1`, `trivy 0.73.0`,
`gh 2.97.0`, `pre-commit 4.6.1`).

En revanche **aucun connecteur MCP d'infrastructure n'est installé** — `claude mcp list` ne
retourne que `bright-data` et `pushrank`. Conséquence limitée ici : le projet n'a ni base de
données ni Stripe, donc l'essentiel de la fiche « état réel » ne s'applique pas. Restent hors
de portée : l'état du VPS Hetzner (sauvegardes, mises à jour système, configuration Caddy) et
la console Google du compte SMTP.

---

## Niveau 1 — État par rapport aux 12 phases

| # | Étape | État | Preuve |
|---|---|---|---|
| 0 | Cadrage | 🔴 | `docs/` est vide, `_bmad-output/` est vide, `README.md` est encore le gabarit `create-next-app`. Aucun parcours critique écrit, aucune liste des données personnelles collectées. |
| 1 | Socle | 🟠 | `git` + distant OK, 14 commits, `.gitignore` couvre `.env*`, `git ls-files \| grep '^\.env'` ne renvoie **rien**. Mais : `main` **non protégée** (`gh api .../protection` → 404 « Branch not protected »), **dépôt public**, **aucun crochet pre-commit** (`.pre-commit-config.yaml` absent, `.git/hooks/` vide), **pas de `CLAUDE.md`**. |
| 2 | Données et autorisations | — | Aucune base de données, aucun locataire, aucun compte. Les seules données personnelles transitent par le formulaire de contact vers Gmail. |
| 3 | Interface | ✅ | 12/12 pages ont `metadata` **et** `canonical` (les deux qui n'en ont pas dans `page.tsx` — `/blog` et `/contact` — les portent dans leur `layout.tsx`). `metadataBase`, `openGraph` et `twitter` déclarés globalement. `<html lang="fr">`. 21 balises `<Image>`, 21 `alt` associés. Page 404 personnalisée présente. |
| 4 | Développement | 🟠 | `npx tsc --noEmit` → **0 erreur**. `npm run lint` → **0 erreur**. Mais : **aucun exécuteur de tests** dans `package.json`, **aucun fichier `.test.*` / `.spec.*` / `e2e`** dans le dépôt. Sur 1 route serveur : 1 valide ses entrées à la main (pas de schéma Zod), **0 a une limitation de débit**. |
| 5 | Sécurité OWASP 2025 | 🟠 | Détail ligne par ligne ci-dessous. Le point dur : A04 (limitation de débit absente, prouvée en production). |
| 6 | Outillage | 🔴 | La CI (`.github/workflows/deploy.yml`) ne contient **que le déploiement** : pas de `tsc`, pas de lint, pas de test, pas de gitleaks, pas de Semgrep, pas de Trivy. Un `push` sur `main` part directement en production sans aucune porte. Aucun outil ne tourne automatiquement. |
| 7 | Conformité FR/UE | 🟠 | Mentions légales complètes (éditeur, SIREN 927 448 647, SIRET, APE, directeur de publication, hébergeur Hetzner avec adresse et téléphone) ✅. Politique de confidentialité présente mais **incomplète et inexacte** — détail ci-dessous. Pas de CGV alors que des prix sont affichés. Pas de mention de TVA. |
| 8 | Recette | 🟠 | **Formulaire de contact testé en production le 09/08/2026** : `POST /api/contact` → `{"ok":true}` en 4,5 s. Le SMTP est donc bien configuré sur le serveur et Gmail a accepté le message. Reste à confirmer la réception côté boîte. Aucune suite de tests automatisée, aucun parcours manuel documenté, aucune sauvegarde restaurée. |
| 9 | Déploiement | 🟠 | HTTPS + redirection `http → https` en 308 ✅. `Strict-Transport-Security`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Cross-Origin-Opener-Policy`, `X-Permitted-Cross-Domain-Policies` **tous présents en production** ✅. `poweredByHeader: false` ✅. Manquent : **`Content-Security-Policy`** et **`Permissions-Policy`** (`curl -I` → 0 occurrence). Sauvegardes du VPS ⬜ non vérifiées. Retour arrière jamais testé. |
| 10 | Exploitation | 🔴 | Aucun suivi d'erreurs (`grep -riE "sentry\|posthog\|logtail\|datadog"` → rien). Les `console.error` de la route de contact partent dans les journaux Docker et personne ne les lit. Aucune alerte : si le mot de passe d'application Google expire, le formulaire renverra 502 et **personne ne le saura**. Aucun plan de rotation des secrets. |
| 11 | Automatisations | 🟠 | Une seule automatisation : le déploiement GitHub Actions. **Elle tourne réellement** — le commit `4fe69cb` (« Test du déploiement automatique ») en est la trace, et le site sert bien la version courante. Elle n'a pas d'interrupteur autre que la désactivation du workflow, et un échec n'alerte que par e-mail GitHub. |
| 12 | Commercialisation | — / 🟠 | Aucun cycle d'abonnement en ligne : pas de paiement, pas d'activation, pas de facturation automatique. Le site est un catalogue qui affiche des prix (0 € et 150 €/mois) et renvoie vers un formulaire. Rien à auditer côté paiement ; mais l'affichage de prix sans CGV ni mention de TVA relève de la phase 7. |

---

## Phase 5 — OWASP Top 10:2025, ligne par ligne

| Catégorie | État | Preuve / raisonnement |
|---|---|---|
| A01 Contrôle d'accès | — | Aucune ressource protégée : toutes les pages sont publiques, la seule route serveur est un formulaire public par conception. Semgrep signale « route sans garde d'autorisation » sur `/api/contact` : **faux positif assumé**, une route de contact publique n'a pas de garde à avoir. |
| A02 Défaillances cryptographiques | ✅ | HTTPS forcé (308), HSTS `max-age=31536000; includeSubDomains`. SMTP sur le port 587 avec `secure: port === 465` → STARTTLS correctement négocié. Aucune donnée stockée, donc rien à chiffrer au repos. |
| A03 Injection | ✅ | Pas de SQL, pas de `eval`, pas d'appel shell. **Injection d'en-tête e-mail vérifiée et écartée** : les valeurs `replyTo` et `subject` reçoivent le nom saisi par le visiteur, mais nodemailer neutralise les retours à la ligne dans toute valeur d'en-tête (`node_modules/nodemailer/lib/mime-node/index.js:1124` et suivantes → `.replace(/\r?\n|\r/g, ' ')`). |
| A04 Conception non sécurisée | 🔴 | **Aucune limitation de débit et aucune protection anti-robot sur `/api/contact`.** Prouvé en production : 10 requêtes POST consécutives → `400 400 400 400 400 400 400 400 400 400`, aucun 429. Aggravant : la route attend la réponse SMTP de façon synchrone — **4,5 s par requête mesurées**. Une poignée de requêtes parallèles suffit à saturer les connexions du conteneur, et un robot peut à la fois inonder la boîte Gmail et faire dépasser le quota d'envoi du compte Google (le formulaire cesserait alors de fonctionner). |
| A05 Mauvaise configuration | 🟠 | Six en-têtes de sécurité présents ✅, mais **`Content-Security-Policy` absent** et `Permissions-Policy` absent. Le Dockerfile est propre : Trivy le classe **0 mauvaise configuration**, l'image tourne en utilisateur non-root (`USER nextjs`, uid 1001). |
| A06 Composants vulnérables | 🟠 | `trivy fs` + `npm audit` → **4 vulnérabilités HIGH, 0 CRITICAL** : `nanoid` 3.3.16 (CVE-2026-67213), `postcss` 8.4.31 (CVE-2026-45623 + GHSA-r28c-9q8g-f849), `sharp` 0.34.5 (GHSA-f88m-g3jw-g9cj, vulnérabilités libvips héritées). Les trois sont des dépendances transitives de `next`. `sharp` sert l'optimisation d'images **au runtime** : c'est celle qui compte vraiment ici. |
| A07 Authentification | — | Aucune authentification dans le produit. |
| A08 Intégrité logicielle | 🟠 | `package-lock.json` versionné ✅, `npm ci` dans le Dockerfile ✅. Mais les actions GitHub sont épinglées par étiquette (`appleboy/scp-action@v0.1.7`) et non par empreinte SHA : une étiquette peut être redéplacée. Le workflow envoie `source: "."` — **tout le contenu du dépôt** — vers le serveur, sans liste blanche. |
| A09 Journalisation et supervision | 🔴 | Deux `console.error` dans toute l'application, aucun collecteur, aucune alerte. Une panne du formulaire est invisible. |
| A10 Échec ouvert / SSRF | ✅ | Vérifié explicitement : la route **échoue en se fermant**. Configuration SMTP incomplète → 503 sans envoi ; échec d'envoi → 502 ; JSON illisible → 400. Aucun message d'erreur interne n'est renvoyé au client (`console.error` côté serveur, texte générique côté client). Aucune requête sortante pilotée par une URL fournie par l'utilisateur → pas de surface SSRF. |

---

## Phase 7 — Conformité, en détail

**Ce qui est en règle**

- Mentions légales conformes à l'art. 6-III de la LCEN : identité, adresse, SIREN/SIRET, code APE, directeur de la publication, hébergeur avec adresse et téléphone.
- Responsable du traitement nommé et joignable.

**Ce qui ne l'est pas**

1. 🟠 **La politique de confidentialité affirme quelque chose de faux.** Section 5 : « Notre site utilise des cookies de mesure d'audience anonymes ». Le bandeau de consentement dit « analyser notre audience ». Or `grep -rniE "gtag|google-analytics|googletagmanager|matomo|plausible|hotjar|analytics"` sur `src/` et `public/` ne renvoie **aucune occurrence** : il n'y a aucun traceur. Déclarer une collecte inexistante est un défaut d'information au sens du RGPD — et c'est le genre de contradiction qu'un contrôle relève immédiatement.
2. 🟠 **Le bandeau de cookies ne pilote rien.** `cookie-consent` n'est lu nulle part ailleurs que dans `CookieConsent.tsx` lui-même. Il ne bloque ni ne déclenche quoi que ce soit. De plus le bouton « Décliner » est visuellement très en retrait par rapport à « Accepter le voyage » — c'est précisément le déséquilibre que la CNIL sanctionne. Comme il n'y a aucun traceur, **aucun bandeau n'est légalement requis** : le supprimer est plus conforme que le garder.
3. 🟠 **Politique de confidentialité incomplète.** Manquent : la base légale du traitement, la **durée de conservation** des messages, les **destinataires** (Google/Gmail est destinataire des données du formulaire, et c'est un transfert hors UE à mentionner), le droit à la limitation, à l'opposition et à la portabilité, et le **droit de réclamation auprès de la CNIL**.
4. 🟠 **Prix affichés sans CGV ni mention de TVA.** `/tarifs` annonce « 150 €/mois » et « 0 € ». En micro-entreprise en franchise en base, la mention « TVA non applicable, art. 293 B du CGI » doit accompagner les prix, et un abonnement mensuel appelle des conditions générales (durée, résiliation, rétractation).
5. 🟡 **Incohérence d'adresse.** Les mentions légales situent l'activité à Vernosc-lès-Annonay (07), tandis que la page contact affiche « Lyon, Fr. » et que le JSON-LD déclare `addressLocality: "Lyon"`. Deux adresses différentes dans le même site : c'est mauvais pour le référencement local, et douteux juridiquement.
6. 🟡 **Accessibilité (RGAA) non évaluée.** Aucun audit lancé. Deux points visibles à l'œil dans le code : beaucoup de textes en `opacity 0.2` à `0.3` sur fond clair (contraste vraisemblablement sous le seuil AA), et des libellés en `text-[9px]`.

---

## Niveau 2 — Audit approfondi

### 1. Le code

| Outil | Résultat |
|---|---|
| `gitleaks detect` (historique complet) | **12 commits scannés, 1,95 Mo, aucune fuite.** Aucun secret n'est jamais entré dans le dépôt. |
| `semgrep` (p/typescript, p/nodejs, p/security-audit + règles maison) | **12 signalements** : 10 × `html-injecte-sans-assainissement`, 1 × `route-mutante-sans-validation`, 1 × `route-sans-garde-autorisation`. |
| `trivy fs` (vuln + misconfig + secret) | **4 HIGH, 0 CRITICAL** sur `package-lock.json` ; **0 mauvaise configuration** sur le Dockerfile ; **0 secret**. |
| `npx tsc --noEmit` | 0 erreur. |
| `npm run lint` | 0 erreur. |

**Lecture des 12 signalements Semgrep :**

- Les **10 `dangerouslySetInnerHTML`** sont tous des balises JSON-LD (`jsonLdScript()` dans `src/lib/seo.ts:43`). Les données injectées sont aujourd'hui **entièrement statiques** — constantes du code et `src/app/blog/articles.ts`, écrit à la main. **Ce n'est donc pas exploitable en l'état.** Mais `jsonLdScript` fait un `JSON.stringify` nu : il n'échappe pas `<`. Le jour où un titre d'article vient d'un formulaire, d'un CMS ou d'un fichier importé, une chaîne contenant `</script>` sort du bloc et exécute du JavaScript. C'est une dette d'une ligne à rembourser maintenant, pas plus tard.
- `route-mutante-sans-validation` sur `/api/contact` : **partiellement fondé**. La validation existe et elle est correcte (champs obligatoires, format d'e-mail, longueurs plafonnées à 200/200/5000), mais elle est écrite à la main. Un schéma Zod la rendrait vérifiable et réutilisable. Priorité basse.
- `route-sans-garde-autorisation` : faux positif, cf. A01.

### 2. L'état réel

Pas de base de données, pas de Stripe : la majeure partie de cette section est sans objet.
Ce qui a pu être mesuré sur le système qui tourne :

| Point | Résultat |
|---|---|
| DNS | `canevas-havane.com` et `www` → `204.168.134.208`. Cohérent avec `DEPLOIEMENT.md`. |
| HTTPS | 200, `via: 1.1 Caddy`, `alt-svc: h3`. Redirection 308 depuis HTTP. |
| En-têtes | 6 présents, **CSP et Permissions-Policy absents**. |
| `robots.txt` | Servi, `Disallow: /api/`, sitemap déclaré ✅. |
| `sitemap.xml` | Servi, URLs absolues correctes ✅. |
| Enregistrement MX | **Aucun.** Il n'existe pas d'adresse `@canevas-havane.com` ; le site affiche une adresse Gmail personnelle. |
| SPF / DMARC | **Aucun des deux.** Seule une clé `google-site-verification` est publiée. Le domaine peut être usurpé dans des e-mails sans qu'aucune règle ne s'y oppose. |
| Formulaire de contact | **Testé en réel le 09/08/2026** → `HTTP 200 {"ok":true}` en 4,5 s. |
| VPS Hetzner | ⬜ Sauvegardes, mises à jour système, journaux, configuration Caddy : hors de portée sans accès au serveur. |

### 3. La logique

Un seul module sensible existe (`/api/contact`) et il a été relu ligne à ligne plutôt que confié
à une passe adversariale — 63 lignes, sans état, sans base, sans autorisation. Les quatre angles
d'attaque examinés :

| Attaque | Résultat |
|---|---|
| Injection d'en-tête e-mail via le champ « nom » (`\r\nBcc:`) | **Échoue** — neutralisée par nodemailer (preuve en A03). |
| Corps JSON malformé, champs manquants, champs surdimensionnés | **Échoue** — 400 propre, testé en production (10 × 400). |
| Fuite d'information via les messages d'erreur | **Échoue** — l'erreur SMTP part dans `console.error`, le client ne reçoit qu'un texte générique. |
| Inondation du formulaire / épuisement du quota Gmail | **Réussit.** Rien ne l'empêche. C'est le seul défaut réellement exploitable du projet. |

### 4. Le fonctionnement

- Tests automatisés : **il n'y en a aucun**. Rien à lancer, rien à coller.
- Déploiement automatique : **il tourne** (commit `4fe69cb`, site à jour).
- Formulaire de contact : **il tourne** (test réel ci-dessus).
- Exige un humain : confirmer la réception du message de test dans la boîte Gmail ; renouveler le mot de passe d'application Google ; toute intervention sur le VPS.

---

## ── SYNTHÈSE ──

```
Phases franchies : 1 / 12   (seule la phase 3 — Interface — est ✅ ;
                             phases 2 et 12 sans objet pour ce projet)

🔴 Irréversible
   (aucun) — pas de secret fuité, git en place, aucune donnée stockée à perdre.

🟠 Bloquant à la vente
   1. Aucune limitation de débit sur /api/contact — prouvé en prod, 10 requêtes sans 429,
      4,5 s de traitement chacune. Inondation de la boîte + épuisement du quota Gmail.
   2. La CI déploie sans aucune vérification — un commit qui casse le site part en prod.
   3. Politique de confidentialité qui déclare des cookies inexistants + bandeau qui ne
      pilote rien, avec un « Décliner » minoré. Contradiction visible et sanctionnable.
   4. Aucune alerte : si le formulaire tombe, personne ne l'apprend.
   5. Prix affichés sans CGV ni mention « TVA non applicable, art. 293 B du CGI ».

🟡 Dette
   6. jsonLdScript n'échappe pas « < » — inoffensif aujourd'hui, XSS le jour où un contenu
      vient d'ailleurs que du code.
   7. 4 vulnérabilités HIGH transitives (sharp / postcss / nanoid).
   8. Content-Security-Policy et Permissions-Policy absents.
   9. Aucun test automatisé, aucun crochet pre-commit, pas de CLAUDE.md.
  10. main non protégée, dépôt public, actions GitHub épinglées par étiquette.
  11. Adresse incohérente : Vernosc-lès-Annonay dans les mentions, Lyon sur /contact et
      dans le JSON-LD.
  12. Ni SPF ni DMARC sur le domaine ; aucun MX (adresse de contact = Gmail personnel).
  13. Aucun document de cadrage ; README encore au gabarit create-next-app.

⬜ Non vérifié
  14. Sauvegardes du VPS Hetzner, mises à jour système, retour arrière — aucun accès serveur.
  15. Réception effective du message de test dans la boîte Gmail — à confirmer par Lohan.
  16. Accessibilité RGAA — aucun audit lancé.
```

## ── LE CHEMIN LE PLUS COURT ──

La plus petite séquence qui fait passer le plus de rouges au vert, dans l'ordre.

| # | Action | Qui | Durée | Ce que ça ferme |
|---|---|---|---|---|
| 1 | Limitation de débit + champ piège (honeypot) sur `/api/contact` | agent | 30 min | 🟠 1 — le seul défaut réellement exploitable |
| 2 | Réécrire la section « Cookies » de la politique de confidentialité et **supprimer le bandeau** (aucun traceur ⇒ aucun bandeau requis) | agent | 20 min | 🟠 3 |
| 3 | Compléter la politique : base légale, durée de conservation, Google/Gmail comme destinataire, droits complets, réclamation CNIL | agent | 30 min | 🟠 3 |
| 4 | Ajouter au workflow une étape bloquante avant le déploiement : `tsc` + `lint` + `gitleaks` + `npm audit` | agent | 30 min | 🟠 2 |
| 5 | `npm audit fix` puis relancer Trivy pour prouver le résultat | agent | 15 min | 🟡 7 |
| 6 | Échapper `<` dans `jsonLdScript` + règle Semgrep maison qui interdit `JSON.stringify` nu dans un `dangerouslySetInnerHTML` | agent | 20 min | 🟡 6 |
| 7 | `Content-Security-Policy` + `Permissions-Policy` dans `next.config.ts`, vérifiés par `curl -I` après déploiement | agent | 45 min | 🟡 8 |
| 8 | Trancher l'adresse (Vernosc ou Lyon) et l'unifier sur les 3 emplacements | **Lohan** décide, agent applique | 10 min | 🟡 11 |
| 9 | Crochet pre-commit (gitleaks) + `CLAUDE.md` + protection de `main` sur GitHub | agent, sauf la protection = **Lohan** | 30 min | 🟡 9, 🟡 10 |
| 10 | Publier SPF et DMARC sur `canevas-havane.com` (panneau internet.bs) | **Lohan** | 20 min | 🟡 12 |
| 11 | Écrire les CGV et ajouter la mention TVA sur `/tarifs` | **Lohan** rédige le fond, agent met en page | 1 h | 🟠 5 |
| 12 | Suivi d'erreurs (Sentry, offre gratuite) + alerte sur échec d'envoi | agent | 1 h | 🟠 4 |
| 13 | Vérifier et documenter les sauvegardes du VPS, tester un retour arrière | **Lohan** + agent | 1 h | ⬜ 14 |

Les étapes 1 à 4 sont celles qui comptent : environ **deux heures** pour éteindre tout ce qui
est bloquant à la vente, hors CGV.

---

## Règles à poser pour que ces défauts ne reviennent pas

| Défaut constaté | Ce qui l'empêchera de revenir |
|---|---|
| Route publique sans limitation de débit | Règle Semgrep : tout `export async function POST` dans `src/app/api/**` sans appel à un limiteur ⇒ blocage |
| `JSON.stringify` nu dans `dangerouslySetInnerHTML` | Règle Semgrep dédiée + un utilitaire `jsonLdScript` unique qui échappe |
| Déploiement sans vérification | Le workflow `deploy` ne se déclenche qu'après un job `checks` réussi (`needs: checks`) |
| Secret poussé par accident | Crochet pre-commit `gitleaks protect --staged` |
| Texte légal qui décrit une réalité inexistante | Test automatisé : si `grep` trouve un traceur, la page cookies doit le mentionner — et l'inverse |
