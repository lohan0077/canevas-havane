# Mise en ligne de canevas-havane.com

Déploiement sur le VPS Hetzner existant, selon le même schéma qu'Edificia :
**push sur `main` → GitHub Actions → SCP vers le serveur → `docker compose up --build` → Caddy**.

Suivre les étapes **dans l'ordre**. Pousser le code avant l'étape 3 ferait échouer le workflow.

---

## Prérequis

| Élément | Où le trouver |
|---|---|
| IP du serveur Hetzner | Console Hetzner Cloud |
| Clé API Resend | https://resend.com → API Keys |
| Accès DNS | Panneau internet.bs |
| Secrets SSH | Déjà utilisés par le dépôt `edificia` |

---

## Étape 1 — Secrets GitHub

Sur `github.com/lohan0077/canevas-havane` → **Settings → Secrets and variables → Actions → New repository secret**.

Les secrets ne se partagent pas entre dépôts : il faut recréer les trois mêmes que sur `edificia`.

| Nom | Valeur |
|---|---|
| `SSH_HOST` | IP du serveur Hetzner |
| `SSH_USER` | utilisateur SSH (identique à Edificia) |
| `SSH_PRIVATE_KEY` | clé privée de déploiement, en entier (`-----BEGIN…` à `-----END…` inclus) |

---

## Étape 2 — Variables d'environnement sur le serveur

En SSH sur le VPS :

```bash
mkdir -p ~/app/canevas-havane
cat > ~/app/canevas-havane/.env.production <<'EOF'
RESEND_API_KEY=colle_ta_cle_ici
CONTACT_TO_EMAIL=gaultlohan@gmail.com
CONTACT_FROM_EMAIL=Canevas Havane <contact@canevas-havane.com>
EOF
chmod 600 ~/app/canevas-havane/.env.production
```

Ce fichier survit aux déploiements : le SCP ajoute des fichiers sans supprimer ceux déjà présents.

> `CONTACT_FROM_EMAIL` n'est valable qu'une fois le domaine vérifié sur Resend (étape 6).
> En attendant, remplacer par `onboarding@resend.dev`, sinon les envois seront refusés.

---

## Étape 3 — Service Docker

Ajouter ce bloc dans `~/app/docker-compose.yml`, au même niveau que les services `edificia` et `caddy` :

```yaml
  canevas-havane:
    build:
      context: ./canevas-havane
    container_name: canevas-havane
    restart: unless-stopped
    env_file:
      - ./canevas-havane/.env.production
    expose:
      - "3000"
```

Le service doit être dans **le même fichier compose que Caddy** pour partager son réseau :
c'est ce qui permet à Caddy de joindre le conteneur par son nom.

---

## Étape 4 — Caddy

Ajouter dans le `Caddyfile`. La version courte est l'adresse canonique, le `www` redirige :

```
canevas-havane.com {
	reverse_proxy canevas-havane:3000
}

www.canevas-havane.com {
	redir https://canevas-havane.com{uri} permanent
}
```

Caddy demande et renouvelle le certificat HTTPS tout seul, dès que le domaine pointe sur le serveur.

---

## Étape 5 — DNS chez internet.bs

Deux enregistrements **A** vers l'IP du serveur Hetzner :

| Type | Nom | Valeur |
|---|---|---|
| A | `@` | IP du serveur |
| A | `www` | IP du serveur |

Propagation : de 10 minutes à quelques heures. Vérifier avec :

```bash
dig +short canevas-havane.com
```

Ne pas lancer le déploiement avant que cette commande retourne l'IP du serveur :
Caddy échouerait à obtenir le certificat et Let's Encrypt limite les tentatives.

---

## Étape 6 — Domaine d'envoi Resend (optionnel mais recommandé)

Sur resend.com → **Domains → Add Domain** → `canevas-havane.com`.
Resend affiche des enregistrements DKIM et SPF à ajouter chez internet.bs.
Une fois vérifié, les emails partent de `contact@canevas-havane.com` au lieu d'une adresse de test.

---

## Étape 7 — Déploiement

```bash
git push -u origin main
```

Le workflow part automatiquement. Suivi dans l'onglet **Actions** du dépôt.
Le premier build prend quelques minutes (installation des dépendances + build Next.js).

Vérifier ensuite sur le serveur :

```bash
docker compose ps canevas-havane
docker compose logs --tail=50 canevas-havane
```

---

## Étape 8 — Après la mise en ligne

1. **Search Console** — ajouter la propriété `canevas-havane.com`, puis soumettre `https://canevas-havane.com/sitemap.xml`
2. **PushRank** — créer un projet pour le domaine afin de suivre le site comme Edificia et Kéo
3. **Tester le formulaire de contact** depuis la page `/contact` et confirmer la réception de l'email
4. **Vérifier le partage** en collant l'URL sur LinkedIn : l'image Open Graph doit s'afficher

---

## Dépannage

| Symptôme | Cause probable |
|---|---|
| Workflow en échec sur l'étape SCP | Secrets GitHub manquants ou clé SSH incomplète |
| `502 Bad Gateway` | Conteneur non démarré — voir `docker compose logs canevas-havane` |
| Certificat HTTPS absent | DNS pas encore propagé, ou port 80 fermé sur le pare-feu Hetzner |
| Formulaire : « service non configuré » | `RESEND_API_KEY` absente du `.env.production` |
| Emails refusés par Resend | Domaine d'envoi non vérifié — utiliser `onboarding@resend.dev` en attendant |

---

## À compléter avant d'ouvrir le site au public

**Les mentions légales contiennent encore des données fictives** (« SPLASH.INC », RCS « 123 456 789 »).
En tant qu'auto-entrepreneur, la page doit indiquer : nom et prénom, adresse de l'activité,
numéro SIREN, et une adresse email de contact. Publier des mentions inexactes est une infraction.

Restent également en attente : les URLs des réseaux sociaux (liens inactifs sur `/contact`).
