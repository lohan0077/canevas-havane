# Node 22 LTS, supporté jusqu'au 30/04/2027.
#
# L'image était sur Node 20, sorti du support le 30/04/2026 : plus aucun correctif
# de sécurité n'arrivait pour le moteur qui exécute le site. Contre-audit du
# 10/08/2026. Quand cette date approchera, on remonte d'une version LTS — et
# l'étape `trivy image` de la CI le rappellera avant qu'il soit tard.
FROM node:22-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED 1
# NEXT_PUBLIC_* est figé à la compilation : il doit être fourni ici, pas au runtime.
ARG NEXT_PUBLIC_SITE_URL=https://canevas-havane.com
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# npm est retiré de l'image qui tourne en production.
#
# Le serveur démarre par `node server.js` : il n'installe rien, ne compile rien,
# et n'appelle jamais npm. Or npm embarque `tar`, `sigstore`, `picomatch` et
# `ip-address`, qui portaient à eux seuls la totalité des vulnérabilités graves
# relevées sur l'image de base. On ne les met pas sous le tapis avec un fichier
# d'exceptions : on supprime le code, donc le risque. C'est aussi ce qui permet
# à `trivy image` de rester une vraie porte de sortie en CI plutôt qu'une alerte
# rouge permanente qu'on finirait par contourner.
RUN rm -rf /usr/local/lib/node_modules/npm /usr/local/bin/npm /usr/local/bin/npx

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
# Next.js écrit le cache d'optimisation des images ici au runtime :
# sans ce dossier accessible en écriture, chaque image est recalculée à chaque requête.
RUN mkdir -p .next/cache && chown -R nextjs:nodejs .next
USER nextjs
EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"
CMD ["node", "server.js"]
