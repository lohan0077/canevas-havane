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

**Reste à faire — par Lohan**

- Publier SPF et DMARC chez internet.bs (valeurs exactes dans `DEPLOIEMENT.md`).
- Protéger la branche `main` sur GitHub en exigeant le job « Vérifications ».
- Brancher UptimeRobot sur `/api/health` (procédure dans `DEPLOIEMENT.md`).
- Relire les CGV : elles décrivent la pratique telle que le site l'annonce, pas telle qu'elle
  est réellement négociée.
- Lancer `pre-commit install` une fois, pour activer le crochet.

**Dette restante**

Aucun test automatisé · dépôt public · actions GitHub épinglées par étiquette et non par
empreinte · CSP encore en mode observation (à basculer en bloquant après quelques jours) ·
aucun document de cadrage, README encore au gabarit `create-next-app` · `logo.webp` utilise
`fill` sans `sizes`.

**Non vérifié**

Sauvegardes et retour arrière du VPS Hetzner (pas d'accès serveur) · accessibilité RGAA
(aucun audit lancé) · réception effective du message de test du 09/08/2026 dans la boîte Gmail.

**Prouvé fonctionnel**

Le déploiement automatique tourne (commit `4fe69cb`). Le formulaire de contact tourne
(`POST /api/contact` → `{"ok":true}`, testé en production le 09/08/2026). `tsc`, `eslint`,
`npm run build`, Semgrep (103 règles), gitleaks et Trivy : tous à zéro.

---

## À ne jamais faire

- Déclarer « c'est sécurisé » sans avoir lancé le scan et collé sa sortie
- Annoncer un pourcentage de sécurité ou de complétude
- Ignorer une alerte sans écrire pourquoi (`// semgrep-ok: … parce que …`)
- Modifier directement sur le serveur ce qui devrait passer par un commit
- Répondre en anglais
