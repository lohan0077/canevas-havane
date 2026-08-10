# CLAUDE.md — Canevas Havane

## Le projet

Site vitrine de **Canevas Havane**, agence de création numérique (Lohan Gault, micro-entreprise,
SIREN 927 448 647). Cible : dirigeants de PME cherchant un site haut de gamme. Modèle : site
livré sans avance de frais, rémunération sur le bénéfice généré, plus un abonnement SEO à
150 €/mois et un rachat possible à 10 × le bénéfice mensuel.

Next.js 16 · React 19 · Tailwind 4 · Docker sur VPS Hetzner derrière Caddy · déploiement
GitHub Actions au push sur `main`. **Ni base de données, ni compte utilisateur, ni paiement
en ligne.** Une seule route serveur : `/api/contact`, qui envoie un e-mail via le SMTP de Gmail.

L'utilisateur n'est pas développeur. Ne jamais lui demander de valider du code : expliquer
l'effet, proposer, vérifier soi-même par un test ou un outil. Répondre en français.

## Nature du projet

Neuf. En ligne depuis août 2026 sur https://canevas-havane.com.

---

## La règle qui gouverne toutes les autres

**On décide dans l'ordre inverse du coût de correction.** Une couleur se change en 30 secondes.
Un secret exposé ne se corrige pas — il se fait tourner, et le passé reste exposé.

## Rien n'est « fait » sans preuve

Une commande lancée et sa sortie collée, ou ce n'est pas fait. Jamais « c'est sécurisé »,
« les tests passent » ou « prêt » sans la preuve. Jamais de pourcentage.

## Chaque étape a une porte de sortie

Une condition vérifiable, pas une impression.

---

## Les non-négociables sur ce projet

1. **Aucun secret dans le code.** Tout `NEXT_PUBLIC_*` est public pour toujours. Le mot de
   passe d'application Google vit dans le `.env` du serveur, jamais dans le dépôt — et le
   dépôt GitHub est **public**.
2. **Toute route serveur** porte validation d'entrée + limitation de débit. Ici il n'y a ni
   authentification ni autorisation à poser (aucune ressource privée), donc ces deux-là ne
   se négocient pas.
3. **Échouer en se fermant.** Si la configuration SMTP manque, on refuse (503) — on n'envoie pas.
4. **Ne jamais faire confiance au client.** Nom, e-mail et message sont revalidés côté serveur.
5. **Erreurs** : message générique au client, détail dans le journal serveur. Jamais de trace
   SMTP renvoyée au navigateur.
6. **Zéro secret journalisé.**
7. **Aucun `dangerouslySetInnerHTML`** dont le contenu ne passe pas par un utilitaire qui
   échappe. Le JSON-LD est aujourd'hui statique ; le jour où un titre vient d'ailleurs, c'est
   une XSS.
8. **Le texte légal doit décrire la réalité.** Si on ajoute un traceur, on met à jour
   `/confidentialite` et le bandeau dans le même commit. Si on n'en a pas, on ne prétend pas
   en avoir.

## Après chaque fichier écrit

```bash
npx tsc --noEmit && npm run lint
```

## Jamais de travail sur `main`

Créer une branche avant la première modification, enregistrer en petits commits lisibles.

---

## État connu du projet — audit du 09/08/2026, corrections du même jour

Rapport d'audit complet : [`ETAT_DU_PROJET_20260809.md`](ETAT_DU_PROJET_20260809.md).
Les corrections vivent sur la branche `audit-20260809`.

**Corrigé et vérifié**

- **Limitation de débit sur `/api/contact`** — 3 envois / 15 min par IP, plus un plafond global
  de 40 / h qui protège le quota Gmail même si l'attaque change d'adresse. Prouvé en local :
  `200 200 200 429 429 429`. Plus un champ piège anti-robot, qui répond « envoyé » sans envoyer.
- **Validation par schéma Zod** sur la route de contact, à la place des tests écrits à la main.
- **La CI vérifie avant de déployer** — job `verifications` (tsc, lint, build, gitleaks,
  Semgrep, Trivy) et `deploy` qui en dépend, plus un contrôle HTTP après mise en ligne.
- **Textes légaux alignés sur la réalité** — bandeau de cookies supprimé (aucun traceur, donc
  aucun consentement à recueillir), politique de confidentialité complétée (base légale, durées,
  Google et Hetzner comme destinataires, droits complets, réclamation CNIL), CGV rédigées,
  mention « TVA non applicable, art. 293 B du CGI » sur `/tarifs`.
- **Ressources externes rapatriées** — Google Fonts est désormais servi depuis notre domaine via
  `next/font`, et `noise.svg` est local. Les deux transmettaient l'IP des visiteurs à des tiers
  non déclarés, et l'image renvoyait un 404 depuis un moment.
- **En-têtes** — `Permissions-Policy` ajouté, `Content-Security-Policy-Report-Only` posée.
  Zéro violation constatée sur une compilation de production.
- **Dépendances** — `npm audit` et `trivy` : 0 vulnérabilité (4 HIGH auparavant).
- **`jsonLdScript` échappe** les chevrons et les séparateurs de ligne Unicode.
- **Garde-fous** — `.pre-commit-config.yaml` et `semgrep/regles-maison.yml` adaptées au projet.

---

## Audit du 10/08/2026 — ce qui a changé

Rapport complet : [`ETAT_DU_PROJET_20260810.md`](ETAT_DU_PROJET_20260810.md).
Phases franchies : 4 / 12. Aucun défaut irréversible.

**Refermé depuis le 09/08**

- **SPF et DMARC publiés** — `dig` : `v=spf1 -all` et `v=DMARC1; p=reject`. Posture
  cohérente pour un domaine qui n'émet pas de courrier. **Conséquence : écrire un jour
  depuis `contact@canevas-havane.com` exigera de modifier ce SPF d'abord.**
- **Crochet `pre-commit` posé** (`.git/hooks/pre-commit` généré par pre-commit).
- **README complet** — il n'est plus au gabarit `create-next-app`.
- **La limitation de débit résiste à un en-tête forgé** — prouvé en production :
  4 envois depuis une `X-Forwarded-For` forgée → `200 200 200 429`, puis `429` depuis une
  autre adresse forgée. Caddy réécrit l'en-tête. **Cette protection dépend de Caddy, pas
  du code** : `src/lib/rate-limit.ts` fait confiance à `X-Forwarded-For` sans le vérifier.

**Trouvé le 10/08 et corrigé le même jour** (branche `correctifs-audit-20260810`)

1. **Le formulaire de contact pouvait être coupé une heure pour 42 requêtes.** Le plafond
   global était décompté **avant** la lecture et la validation du corps : une requête dont
   le contenu n'était même pas du JSON consommait un jeton, gratuitement. Reproduit —
   14 adresses × 3 requêtes malformées, puis un prospect légitime reçoit `429 … Retry-After:
   3577`. Le plafond global n'est désormais décompté qu'au moment où un e-mail va partir.
   **Le test `des requêtes malformées ne ferment pas le formulaire aux visiteurs légitimes`
   existe pour ça : s'il devient rouge, on a remis le décompte trop tôt.**
2. **Corps de requête non plafonné** — 20 000 063 octets étaient acceptés et analysés.
   `lireCorpsPlafonne()` (`src/lib/corps-requete.ts`) refuse au-delà de 16 Ko, sur
   `Content-Length` puis morceau par morceau pour l'envoi en flux.
3. **Newsletter fantôme retirée.** Le bloc de `/blog` promettait une lettre d'information
   inexistante, postait vers `/api/contact`, n'avait pas de champ piège et consommait le
   compteur du formulaire de contact. Il invite maintenant à écrire.
4. **Information RGPD au point de collecte** ajoutée sous le formulaire, avec le lien vers
   `/confidentialite`.
5. **Contraste** — 258 textes sur 840 étaient sous le seuil. Zéro aujourd'hui, sur les
   13 pages. Voir la règle ci-dessous.
6. **`main` est protégée** — job « Vérifications » requis, PR obligatoire, ni force-push ni
   suppression. Les administrateurs ne sont pas soumis : la porte de secours reste ouverte.
7. **CSP en mode bloquant**, actions GitHub épinglées par empreinte, `lastmod` du sitemap
   honnête, 17 images complétées avec `sizes`.

### La règle de couleur, à ne plus jamais enfreindre

`--color-primary` (#F27438) est réservé aux **aplats, bordures, dégradés et ornements**.
Pour du **texte**, utiliser `--color-primary-texte` (#B04A15) : l'orange vif donne 2,54:1
sur le beige, très loin des 4,5:1 exigés. Sur fond sombre le rapport s'inverse, et une
règle de `globals.css` y redéfinit la variable — ne pas la contourner en écrivant la
couleur en dur. De même, pas de texte sous `/70` sur fond clair ni sous `/60` sur fond
sombre. Aucune couleur unique ne peut satisfaire les deux fonds : c'est arithmétique.

**Dette restante**

Aucun suivi d'erreurs (pas de Sentry) · aucun document de cadrage · dépôt public · les
tests couvrent la route de contact, rien d'autre · le contraste est gardé par des règles
Semgrep sur les classes écrites, pas par une mesure en navigateur rejouée en CI.

Les 275 fichiers d'outillage BMAD sont sortis du suivi git le 10/08/2026 : ils restent sur
le disque, mais ne sont plus publiés ni recopiés sur le serveur à chaque déploiement.

**Non vérifié — et pourquoi**

Sauvegardes et restauration du VPS Hetzner, retour arrière d'un déploiement (aucun accès
serveur) · supervision externe sur `/api/health` (invérifiable de l'extérieur) · réception
effective d'un message dans la boîte Gmail · indexation Google (jeton `bright-data` expiré)
· `canevas-havane.com` n'est suivi dans aucun outil de mesure (absent de PushRank).

**Prouvé fonctionnel le 10/08/2026**

`tsc`, `eslint`, `npm run build` : 0 erreur · **15 tests, tous verts** (`npm test`) ·
Semgrep 105 règles sur 94 fichiers : 0 signalement · gitleaks sur l'historique : 0 fuite ·
`trivy fs` et `npm audit` : 0 vulnérabilité — **mais `trivy image` n'a jamais été lancé, et
l'image en porte 20 : voir le contre-audit ci-dessous** · contraste : le chiffre annoncé ce
matin (« 0 sur 812 mesurés ») **n'est pas reproductible**, aucun script du dépôt ne le rejoue ;
la remesure du soir en trouve 14 sur 1494 · CSP bloquante sans une seule violation ·
`https://canevas-havane.com/api/health` → `{"status":"ok"}` · échec fermé démontré (503 sans
configuration SMTP) · injection d'en-tête SMTP neutralisée par nodemailer · dernier
déploiement automatique en succès (10/08/2026 11:16 UTC).

---

## Contre-audit du 10/08/2026 (soir) — ce qu'un second passage a trouvé

Rapport complet : [`ETAT_DU_PROJET_20260810_CONTRE-AUDIT.md`](ETAT_DU_PROJET_20260810_CONTRE-AUDIT.md).
Tous les outils ont été **relancés**, aucune conclusion du matin reprise telle quelle.
Phases franchies : 3 / 11 applicables. Aucun défaut irréversible.

**En production depuis le 10/08/2026 17:19 UTC** (PR #4, déploiement en succès).
Vérifié sur le site en ligne juste après : `/api/health` → `ok` · les 13 pages en 200 ·
`og:url` propre à chaque page · l'attaque du formulaire refusée (`415` / `403`) · le vrai
formulaire non bloqué (400 de validation, testé depuis un navigateur sans envoyer d'e-mail)
· contraste **1450 mesures, 0 sous le seuil** · aucune violation CSP en console.

**Prouvé en CI** (GitHub, pas seulement en local) : `tsc` 0 · `eslint` 0 · **22 tests
verts** · build · Semgrep 165 règles : 0 signalement · gitleaks sur l'historique : 0 fuite ·
`trivy fs` 0 · **`trivy image` sur l'image de production : 0** · **contraste : 1450 mesures,
0 sous le seuil**.

**Deux défauts trouvés — corrigés et prouvés le même soir**

1. **Le socle n'était plus corrigé.** `Dockerfile` était sur `node:20-alpine`. **Node 20 est
   sorti du support le 30/04/2026** : plus aucun correctif de sécurité.
   `trivy image node:20-alpine` → **20 vulnérabilités HIGH/CRITICAL**.
   **Pourquoi la CI ne l'a pas vu : elle lançait `trivy fs`, jamais `trivy image`.**
   `trivy fs` lit les fichiers du dépôt ; il n'ouvre pas l'image qui exécute le code.
   → Passé en **Node 22 LTS** (jusqu'au 30/04/2027), **npm retiré de l'image de production**
   (il portait à lui seul toutes les vulnérabilités, via `tar`, `sigstore`, `picomatch`,
   `ip-address` — or le serveur démarre par `node server.js` et n'appelle jamais npm).
   Image finale mesurée : **0 HIGH/CRITICAL**, `node v22.23.2`, npm absent, accueil 200,
   santé `ok`. **Ne pas remplacer ce retrait par un fichier d'exceptions** : une alerte
   permanente finit toujours par être contournée, le code vulnérable en place.
   **Deux gardes, qui n'attrapent pas la même chose :** l'étape `trivy image` de la CI (les
   failles) et la règle Semgrep `image-node-hors-support` (**la date** — une version peut
   être hors support sans qu'aucune faille n'ait encore été publiée contre elle). Quand
   Node 22 approchera d'avril 2027, mettre à jour la liste de versions de cette règle.
2. **CSRF sur `/api/contact`** — prouvé par exécution contre un SMTP piège. La route ne
   vérifiait ni `Origin`, ni `Referer`, ni `Content-Type` ; un `POST` en `text/plain` portant
   du JSON est une « requête simple », envoyée sans autorisation préalable. Un site tiers
   faisait donc envoyer des e-mails depuis le navigateur de ses visiteurs, **chacun avec sa
   propre IP** — le plafond de 3 par IP ne freinait rien, et le plafond global de 40/h
   fermait le formulaire aux vrais prospects. `form-action 'self'` ne protège pas de ça :
   cette directive gouverne nos formulaires, pas un `fetch()` lancé depuis la page d'un tiers.
   → `Content-Type: application/json` exigé (415 sinon), `Origin` étranger refusé (403),
   **avant tout compteur** — une requête étrangère ne doit pas entamer le quota du visiteur
   dont le navigateur a été détourné. Un `Origin` absent reste accepté : les navigateurs le
   posent toujours sur un POST inter-sites, donc son absence signifie curl, une sonde ou un
   test. Attaque rejouée contre l'image finale : `415 / 403 / 403`, et `502` pour le vrai
   formulaire — vérifié aussi depuis un navigateur sur `/contact`, sans violation CSP.
   **Le bloc de tests `origine de la requête (CSRF)` existe pour ça : s'il devient rouge, la
   porte est rouverte.** Éprouvé par mutation — gardes neutralisées, 5 tests tombent.

**La leçon d'écriture qui va avec** : `origineEtrangere()` est écrit sans `try`/`catch`
(`URL.canParse`). Dans une fonction dont la valeur de retour décide d'un refus, une exception
attrapée est le chemin le plus court vers un échec qui s'ouvre — la règle maison
`echec-ouvert` a signalé la première version, et elle avait raison.

**Dette résorbée dans la foulée**

- **Adresse canonique et `og:url` viennent désormais de la même fonction**,
  `adressesDeLaPage()` dans `src/lib/seo.ts` : elles ne peuvent plus diverger parce
  qu'elles ne s'écrivent plus séparément. Deux pièges découverts en le faisant, à ne
  jamais réapprendre : **Next *remplace* `openGraph` au lieu de le fusionner** (les
  articles du journal perdaient `og:site_name`, `og:locale` et `og:url`), et **déclarer
  un `openGraph` désactive la convention de fichier `opengraph-image.png`** — ma première
  version a fait perdre son image de partage à `/tarifs`. Pour surcharger, passer un
  second argument à `adressesDeLaPage()` ; ne jamais redéclarer `openGraph` en entier.
  Garde : règle `canonique-ecrit-a-la-main`.
- **Contraste : 0 sous le seuil sur 1450 mesurés**, et **la mesure tourne à chaque
  poussée** (`outils/contraste.mjs` dans la CI). Les 7 ornements portent
  `aria-hidden="true"`. Le script exempte les éléments décoratifs — WCAG 1.4.3 le permet,
  **à condition qu'ils soient déclarés tels**. Couplage volontaire : ce qui sort de la
  mesure sort aussi de la restitution vocale.
- **Un retour arrière existe** — le déploiement étiquette l'image en service
  `canevas-havane:precedente` avant de la remplacer ; `outils/retour-arriere.sh` la remet
  en ligne sans rien reconstruire. Vérifié en bac à sable. **Jamais joué sur le serveur :
  la phase 9 n'est donc pas franchie**, et c'est pour ça que le déploiement ne l'appelle
  pas tout seul.
- **`docs/CADRAGE.md`** — la phase 0 a enfin un document. Les points sans réponse dans le
  code y sont marqués « à confirmer » plutôt que devinés.
- **Rotation des journaux** du conteneur (5 × 10 Mo). Ce n'est **pas** un suivi d'erreurs.

**Dette restante** — aucun suivi d'erreurs, aucune alerte, aucune sonde externe ·
`canevas-havane.com` absent de PushRank · les tests ne couvrent que `/api/contact`.

### Ce que la CI a trouvé et que la vérification locale ne pouvait pas trouver

À garder en tête avant d'annoncer qu'une étape de CI « devrait marcher » : la première
version de l'étape de contraste passait en local et a échoué sur GitHub, pour deux raisons
qu'aucun test local n'exposait.

1. **`npx -p playwright node script.mjs` n'installe pas playwright là où `node` le cherche.**
   En local, un lien symbolique masquait le problème. Playwright est désormais une
   dépendance de développement épinglée — versionnée, verrouillée par `package-lock`, et
   absente de l'image de production (le runner ne copie que `.next/standalone`).
2. **`next start` ne fonctionne pas avec `output: standalone`** — Next l'écrit dans ses
   propres journaux. La CI démarre maintenant `node .next/standalone/server.js`, donc
   exactement le serveur que lance le conteneur. On mesure ce qui part en ligne.

S'y ajoute un garde-fou né d'une vraie erreur : une mesure locale a porté sur **kéo.fr**,
qui occupait le port choisi, et a rendu des résultats absurdes sans le signaler. La CI
vérifie désormais que le port sert bien Canevas Havane avant de mesurer quoi que ce soit.

**Refermé sans rien faire** — l'indexation Google est **confirmée : 10 pages référencées**
(`site:canevas-havane.com`). Ce point était « non vérifié » faute de jeton.

### La règle de mesure, apprise ce soir

Un résultat qu'aucune commande du dépôt ne rejoue n'est pas une preuve. Le « 0 texte sous le
seuil sur 812 mesurés » du matin n'a pas pu être reproduit : la remesure indépendante trouve
14 échecs sur 1494 textes. **Toute mesure annoncée dans ce fichier doit pouvoir être relancée
par une commande écrite ici.**

Deux pièges qui faussent silencieusement une mesure de contraste, à connaître :
**Tailwind 4 renvoie les couleurs calculées en `oklab(...)`** — un analyseur qui attend
`rgb(...)` y lit du noir et produit des centaines de faux échecs (ma première passe en a
annoncé 600). Il faut faire résoudre la couleur par le navigateur. Et **un texte peint par
un dégradé a une couleur transparente** : son contraste ne se calcule pas, il se regarde —
on le compte à part, jamais en « conforme ».

---

## Après chaque fichier écrit — la commande complète

```bash
npx tsc --noEmit && npm run lint && npm test
```

---

## À ne jamais faire

- Déclarer « c'est sécurisé » sans avoir lancé le scan et collé sa sortie
- Annoncer un pourcentage de sécurité ou de complétude
- Ignorer une alerte sans écrire pourquoi (`// semgrep-ok: … parce que …`)
- Modifier directement sur le serveur ce qui devrait passer par un commit
- Répondre en anglais
