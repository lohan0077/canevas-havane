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

Aucun suivi d'erreurs (pas de Sentry) · 276 fichiers d'outillage BMAD publiés sur un dépôt
public et recopiés au déploiement · aucun document de cadrage · dépôt public · les tests
couvrent la route de contact, rien d'autre.

**Non vérifié — et pourquoi**

Sauvegardes et restauration du VPS Hetzner, retour arrière d'un déploiement (aucun accès
serveur) · supervision externe sur `/api/health` (invérifiable de l'extérieur) · réception
effective d'un message dans la boîte Gmail · indexation Google (jeton `bright-data` expiré)
· `canevas-havane.com` n'est suivi dans aucun outil de mesure (absent de PushRank).

**Prouvé fonctionnel le 10/08/2026**

`tsc`, `eslint`, `npm run build` : 0 erreur · **15 tests, tous verts** (`npm test`) ·
Semgrep 105 règles sur 94 fichiers : 0 signalement · gitleaks sur l'historique : 0 fuite ·
Trivy et `npm audit` : 0 vulnérabilité · **0 texte sous le seuil de contraste sur 812
mesurés, 13 pages** · CSP bloquante sans une seule violation ·
`https://canevas-havane.com/api/health` → `{"status":"ok"}` · échec fermé démontré (503 sans
configuration SMTP) · injection d'en-tête SMTP neutralisée par nodemailer · dernier
déploiement automatique en succès (10/08/2026 11:16 UTC).

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
