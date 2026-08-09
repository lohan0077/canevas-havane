# Canevas Havane

Site vitrine de **Canevas Havane**, agence de création numérique de Lohan Gault
(micro-entreprise, SIREN 927 448 647). En ligne sur **https://canevas-havane.com**.

Le site présente une offre de partenariat : site livré sans avance de frais, rémunération
sur le bénéfice généré, abonnement SEO mensuel et option de rachat. Il ne vend rien en
ligne — il présente et il fait écrire.

## Ce que c'est techniquement

Next.js 16 (App Router) · React 19 · Tailwind 4 · TypeScript.

**Ni base de données, ni compte utilisateur, ni paiement.** Toutes les pages sont
statiques sauf deux routes serveur :

| Route | Rôle |
|---|---|
| `POST /api/contact` | Envoie le formulaire de contact par e-mail (SMTP Gmail). Plafonné, avec champ piège anti-robot. |
| `GET /api/health` | Point de contrôle pour la surveillance externe. 200 si tout va bien, 503 si la configuration d'envoi manque. |

## Démarrer en local

```bash
npm install
cp .env.example .env.local   # puis remplir SMTP_PASSWORD
npm run dev
```

Le site répond sur http://localhost:3000. Sans `SMTP_PASSWORD`, tout fonctionne sauf
l'envoi du formulaire, qui répond 503 — c'est voulu : en l'absence de configuration, on
refuse plutôt que d'échouer en silence.

Variables d'environnement : voir [`.env.example`](.env.example). Aucune ne doit jamais
entrer dans le dépôt — **il est public**.

## Vérifier avant d'enregistrer

```bash
npx tsc --noEmit && npm run lint
```

Le crochet pre-commit lance en plus gitleaks et les règles Semgrep maison :

```bash
pre-commit install   # une seule fois par machine
```

## Mettre en ligne

Un `push` sur `main` déclenche [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) :
le job **Vérifications** (typage, lint, compilation, gitleaks, Semgrep, Trivy) doit passer,
puis le déploiement copie le code sur le VPS Hetzner, reconstruit l'image Docker, recharge
Caddy et interroge `/api/health` pour confirmer que le site répond vraiment.

La branche `main` est protégée : le job Vérifications est exigé.

Procédure complète, secrets, DNS et dépannage : [`DEPLOIEMENT.md`](DEPLOIEMENT.md).

## Les règles du projet

[`CLAUDE.md`](CLAUDE.md) contient les non-négociables et l'état connu du projet.
Les deux qui reviennent le plus souvent :

- **Aucun secret dans le dépôt.** Il est public, et tout `NEXT_PUBLIC_*` l'est pour toujours.
- **Le texte légal doit décrire la réalité.** Si un traceur est ajouté un jour, `/confidentialite`
  et le bandeau de consentement se mettent à jour dans le même commit — pas plus tard.

Audit de sécurité et de conformité du 09/08/2026 : [`ETAT_DU_PROJET_20260809.md`](ETAT_DU_PROJET_20260809.md).
