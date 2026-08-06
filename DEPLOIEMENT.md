# Mise en ligne de canevas-havane.com

Déploiement sur le VPS Hetzner existant, selon le même schéma qu'Edificia :
**push sur `main` → GitHub Actions → SCP vers le serveur → `docker compose up --build` → Caddy**.

Suivre les étapes **dans l'ordre**. Pousser le code avant l'étape 5 ferait échouer le workflow.

---

## Prérequis

| Élément | Valeur / où le trouver |
|---|---|
| IP du serveur Hetzner | `204.168.134.208` (serveur-openclaw-v1) |
| Dépôt GitHub | `github.com/lohan0077/canevas-havane` |
| Accès DNS | Panneau internet.bs |
| Secrets SSH | Déjà utilisés par le dépôt `edificia` |

---

## Étape 1 — Mot de passe d'application Google

Le formulaire de contact envoie les messages via le SMTP de Gmail.

1. Activer la validation en deux étapes : https://myaccount.google.com/security
2. Générer le mot de passe : https://myaccount.google.com/apppasswords
3. Nom de l'application : `canevas-havane`
4. Conserver les 16 caractères affichés — ils ne seront plus jamais montrés

> La page `apppasswords` reste inaccessible tant que la validation en deux étapes n'est pas active.
> Ce mot de passe n'est **pas** celui du compte Google.

Limite d'envoi : environ 500 messages par jour, très au-delà des besoins d'un formulaire.

---

## Étape 2 — Secrets GitHub

Sur `github.com/lohan0077/canevas-havane` → **Settings → Secrets and variables → Actions → New repository secret**.

Les secrets ne se partagent pas entre dépôts : il faut recréer les trois mêmes que sur `edificia`.

| Nom | Valeur |
|---|---|
| `SSH_HOST` | `204.168.134.208` |
| `SSH_USER` | utilisateur SSH (identique à Edificia) |
| `SSH_PRIVATE_KEY` | clé privée de déploiement, en entier (`-----BEGIN…` à `-----END…` inclus) |

---

## Étape 3 — Variables d'environnement sur le serveur

En SSH sur le VPS :

```bash
mkdir -p ~/app/canevas-havane
cat > ~/app/canevas-havane/.env.production <<'EOF'
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=gaultlohan@gmail.com
SMTP_PASSWORD=colle_le_mot_de_passe_application
CONTACT_TO_EMAIL=gaultlohan@gmail.com
EOF
chmod 600 ~/app/canevas-havane/.env.production
```

Ce fichier survit aux déploiements : le SCP ajoute des fichiers sans supprimer ceux déjà présents.

Les messages arriveront depuis l'adresse Gmail, avec l'adresse du visiteur en **répondre à** :
un simple « Répondre » dans Gmail écrit donc directement au prospect.

---

## Étape 4 — Service Docker et Caddy

**Sauvegarder avant de modifier :**

```bash
cp ~/app/docker-compose.yml ~/app/docker-compose.yml.bak && cp ~/app/Caddyfile ~/app/Caddyfile.bak
```

Ajouter ce bloc dans `~/app/docker-compose.yml`, au même niveau d'indentation que `edificia` :

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

Si le service `edificia` déclare un `networks:`, reproduire la même déclaration.
Le service doit être dans **le même fichier compose que Caddy** pour partager son réseau.

Contrôler la syntaxe :

```bash
cd ~/app && docker compose config > /dev/null && echo "compose valide"
```

Puis ajouter dans le `Caddyfile` :

```
canevas-havane.com {
	reverse_proxy canevas-havane:3000
}

www.canevas-havane.com {
	redir https://canevas-havane.com{uri} permanent
}
```

Ne pas redémarrer Caddy maintenant : le domaine ne pointe pas encore sur le serveur.

---

## Étape 5 — DNS chez internet.bs

Deux enregistrements **A**. Supprimer d'abord tout enregistrement de parking existant sur `@` ou `www`.

| Type | Nom | Valeur | TTL |
|---|---|---|---|
| A | `@` | `204.168.134.208` | 3600 |
| A | `www` | `204.168.134.208` | 3600 |

Propagation : de 10 minutes à quelques heures. Vérifier :

```bash
dig +short canevas-havane.com
```

Ne pas lancer le déploiement avant que cette commande retourne `204.168.134.208` :
Caddy échouerait à obtenir le certificat, et Let's Encrypt limite les tentatives ratées.

---

## Étape 6 — Déploiement

```bash
git push -u origin main
```

Le workflow part automatiquement. Suivi dans l'onglet **Actions** du dépôt.
Le premier passage prend 3 à 6 minutes.

Vérifier ensuite sur le serveur :

```bash
cd ~/app && docker compose ps canevas-havane
```

```bash
cd ~/app && docker compose logs --tail=50 canevas-havane
```

---

## Étape 7 — Vérifications

```bash
curl -sI https://canevas-havane.com | head -3
```

Attendu : `HTTP/2 200`.

```bash
curl -sI https://www.canevas-havane.com | head -3
```

Attendu : `HTTP/2 301` vers la version sans `www`.

Puis tester le formulaire depuis `/contact` et confirmer la réception sur Gmail.

---

## Étape 8 — Après la mise en ligne

1. **Search Console** — ajouter la propriété `canevas-havane.com`, puis soumettre `sitemap.xml`
2. **PushRank** — créer un projet pour le domaine, en profil « vitrine » comme Kéo
3. **Vérifier le partage** en collant l'URL sur LinkedIn : l'image Open Graph doit s'afficher

---

## Dépannage

| Symptôme | Cause probable |
|---|---|
| Workflow en échec sur « Deploy to VPS » | Secrets GitHub manquants ou clé SSH tronquée |
| Workflow en échec sur « Build and Restart » | Erreur de syntaxe : `docker compose config` |
| `502 Bad Gateway` | Conteneur planté — `docker compose logs --tail=100 canevas-havane` |
| Certificat HTTPS absent | DNS pas propagé, ou ports 80/443 fermés sur le pare-feu Hetzner |
| Caddy ignore le domaine | `docker compose restart caddy` |
| Formulaire : « service non configuré » | Une variable SMTP manque dans `.env.production` |
| `Invalid login` dans les logs | Mot de passe d'application incorrect, ou validation en deux étapes désactivée |

Retour arrière si besoin :

```bash
cp ~/app/docker-compose.yml.bak ~/app/docker-compose.yml && cp ~/app/Caddyfile.bak ~/app/Caddyfile
```

---

## À compléter avant d'ouvrir le site au public

**Les mentions légales contiennent encore des données fictives** (« SPLASH.INC », RCS « 123 456 789 »).
En tant qu'auto-entrepreneur, la page doit indiquer : nom et prénom, adresse de l'activité,
numéro SIREN, et une adresse email de contact. Publier des mentions inexactes est une infraction.

Restent également en attente : les URLs des réseaux sociaux (liens inactifs sur `/contact`).
