#!/usr/bin/env bash
#
# Retour arrière — remet en ligne l'image qui tournait avant la dernière mise en ligne.
#
# À lancer SUR LE SERVEUR, depuis ~/app/canevas-havane :
#
#     bash outils/retour-arriere.sh
#
# Ce qu'il fait : le déploiement étiquette l'image en service `canevas-havane:precedente`
# juste avant de la remplacer. Ce script la remet en `:courante` et redémarre le
# conteneur sans rien reconstruire — donc sans dépendre du code, qui est justement
# ce qu'on soupçonne.
#
# Ce qu'il ne fait PAS : toucher à Caddy. Le 09/08/2026, redémarrer Caddy lui a fait
# relire un Caddyfile tronqué et a mis trois sites hors ligne d'un coup. Caddy joint
# le conteneur par son alias réseau, qui ne change pas.
#
# ⚠️ Ce script n'a jamais été exécuté sur le serveur. Tant qu'il ne l'a pas été une
#    fois, en conditions réelles, la phase 9 de la méthode n'est pas franchie : une
#    procédure de secours jamais jouée n'est pas une procédure de secours. C'est
#    aussi pour ça que le déploiement ne l'appelle pas tout seul — un retour arrière
#    automatique non éprouvé fait plus de dégâts que la panne qu'il prétend réparer.

set -euo pipefail

cd "$(dirname "$0")/.."

if ! docker image inspect canevas-havane:precedente >/dev/null 2>&1; then
  echo "Aucune image précédente enregistrée : il n'y a rien où revenir." >&2
  echo "Images disponibles :" >&2
  docker images canevas-havane --format '  {{.Repository}}:{{.Tag}}  ({{.CreatedSince}})' >&2
  exit 1
fi

echo "Image précédente trouvée :"
docker images canevas-havane:precedente --format '  créée {{.CreatedSince}}, {{.Size}}'

docker image tag canevas-havane:precedente canevas-havane:courante
docker compose up -d --no-build

echo "Attente du redémarrage…"
sleep 15

for tentative in 1 2 3 4 5; do
  code=$(curl -s -o /dev/null -w '%{http_code}' --max-time 15 https://canevas-havane.com/api/health || true)
  echo "Tentative $tentative : HTTP $code"
  if [ "$code" = "200" ]; then
    echo "Le site répond de nouveau. Retour arrière terminé."
    exit 0
  fi
  sleep 10
done

echo "Le site ne répond toujours pas (dernier code : $code)." >&2
echo "La panne ne vient donc pas du code déployé — regarder Caddy, le réseau Docker," >&2
echo "ou le fichier .env du serveur." >&2
exit 1
