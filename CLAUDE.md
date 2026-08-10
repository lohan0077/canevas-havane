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

**Ouvert — à traiter en premier**

0. **Le formulaire de contact peut être coupé pendant une heure pour 42 requêtes.**
   `src/app/api/contact/route.ts:46` décompte le plafond global **avant** de lire le corps
   (ligne 57) et avant de le valider (ligne 62). Une requête dont le corps n'est même pas du
   JSON consomme donc un jeton du plafond horaire, gratuitement. Reproduit : 14 adresses ×
   3 requêtes malformées → un prospect légitime reçoit `429 … Retry-After: 3577`. Personne
   n'est prévenu : le site répond 200 et `/api/health` répond `ok`. **Correctif : ne
   décompter le plafond global qu'après la validation et après le champ piège.** Au passage,
   plafonner la taille du corps : 20 000 063 octets sont aujourd'hui acceptés et analysés,
   et `website` est le seul champ du schéma sans `.max()`.

1. **Le formulaire « newsletter » de `/blog` ment.** Il promet une lettre d'information qui
   n'existe pas, poste vers `POST /api/contact`, n'a pas de champ piège, consomme le
   compteur du formulaire de contact, et collecte une adresse e-mail pour une finalité que
   la politique de confidentialité ne déclare pas. Violation directe de la règle n° 8
   ci-dessus. Décider : le retirer, ou le tenir.
2. **Aucune information RGPD au point de collecte** — ni `/contact` ni `/blog` ne renvoient
   à `/confidentialite`. Le lien n'existe que dans le pied de page.
3. **`main` toujours non protégée** — `gh api …/branches/main/protection` → 404. Le job
   « Vérifications » existe mais rien n'oblige à le franchir.
4. **Un message d'erreur Zod brut, en anglais**, est renvoyé au visiteur quand un champ
   manque (`Invalid input: expected string, received undefined`).

**Dette mesurée**

Aucun test automatisé (aucun exécuteur installé) · contraste **2,54:1 mesuré** sur les
libellés de 10–11 px en accent `rgb(242,116,56)`, sous le seuil AA de 4,5:1 · 20 images en
`fill` sans `sizes` (le héros part en 3840 px, 136 Ko au lieu de 85) · CSP encore en mode
observation · aucun suivi d'erreurs · `sitemap.ts` annonce `lastModified: new Date()` ·
276 fichiers d'outillage BMAD publiés sur un dépôt public et recopiés au déploiement ·
actions GitHub épinglées par étiquette · aucun document de cadrage · dépôt public.

**Non vérifié — et pourquoi**

Sauvegardes et restauration du VPS Hetzner, retour arrière d'un déploiement (aucun accès
serveur) · supervision externe sur `/api/health` (invérifiable de l'extérieur) · réception
effective d'un message dans la boîte Gmail · indexation Google (jeton `bright-data` expiré).

**Prouvé fonctionnel le 10/08/2026**

`tsc`, `eslint`, `npm run build` : 0 erreur · Semgrep 103 règles sur 91 fichiers : 0
signalement · gitleaks sur l'historique : 0 fuite · Trivy et `npm audit` : 0 vulnérabilité ·
`https://canevas-havane.com/api/health` → `{"status":"ok"}` · échec fermé démontré (503 sans
configuration SMTP) · injection d'en-tête SMTP neutralisée par nodemailer · dernier
déploiement automatique en succès (10/08/2026 11:16 UTC).

---

## À ne jamais faire

- Déclarer « c'est sécurisé » sans avoir lancé le scan et collé sa sortie
- Annoncer un pourcentage de sécurité ou de complétude
- Ignorer une alerte sans écrire pourquoi (`// semgrep-ok: … parce que …`)
- Modifier directement sur le serveur ce qui devrait passer par un commit
- Répondre en anglais
