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

## État connu du projet — audit du 09/08/2026

Rapport complet : [`ETAT_DU_PROJET_20260809.md`](ETAT_DU_PROJET_20260809.md).

**Phases franchies : 1 / 12** (phase 3 — Interface — seule ✅ ; phases 2 et 12 sans objet).

Rien d'irréversible : `gitleaks detect` sur les 12 commits ne trouve **aucune fuite**, git est
en place, aucune donnée n'est stockée.

**Bloquant à la vente**

- **Aucune limitation de débit ni anti-robot sur `/api/contact`** — prouvé en production :
  10 POST consécutifs, aucun 429, et 4,5 s de traitement synchrone par requête. Inondation de
  la boîte Gmail et épuisement du quota d'envoi Google possibles. **C'est le seul défaut
  réellement exploitable du projet.**
- **La CI ne vérifie rien avant de déployer** — `deploy.yml` ne contient que le SCP et le
  `docker compose up`. Un commit qui casse le site part directement en production.
- **La politique de confidentialité et le bandeau annoncent des cookies de mesure d'audience
  qui n'existent pas** (aucun traceur dans `src/` ni `public/`). Le bandeau ne pilote rien.
- **Aucun suivi d'erreurs, aucune alerte** : si le formulaire tombe, personne ne l'apprend.
- **Prix affichés sans CGV ni mention « TVA non applicable, art. 293 B du CGI »**.

**Dette connue**

`jsonLdScript` (`src/lib/seo.ts:43`) n'échappe pas `<` · 4 vulnérabilités HIGH transitives
(sharp, postcss, nanoid) · pas de `Content-Security-Policy` ni de `Permissions-Policy` ·
aucun test automatisé, aucun crochet pre-commit · `main` non protégée et dépôt public ·
adresse incohérente entre les mentions légales (Vernosc-lès-Annonay) et `/contact` + JSON-LD
(Lyon) · ni SPF ni DMARC sur le domaine, aucun MX · aucun document de cadrage, README encore
au gabarit `create-next-app`.

**Non vérifié**

Sauvegardes et retour arrière du VPS Hetzner (pas d'accès serveur) · accessibilité RGAA
(aucun audit lancé) · réception effective du message de test du 09/08/2026 dans la boîte Gmail.

**Ce qui a été prouvé fonctionnel**

Le déploiement automatique tourne (commit `4fe69cb`, site à jour). Le formulaire de contact
tourne (`POST /api/contact` → `{"ok":true}` en 4,5 s, testé en production le 09/08/2026).
Six en-têtes de sécurité sont bien servis en production. `tsc` et `eslint` : 0 erreur.

---

## À ne jamais faire

- Déclarer « c'est sécurisé » sans avoir lancé le scan et collé sa sortie
- Annoncer un pourcentage de sécurité ou de complétude
- Ignorer une alerte sans écrire pourquoi (`// semgrep-ok: … parce que …`)
- Modifier directement sur le serveur ce qui devrait passer par un commit
- Répondre en anglais
