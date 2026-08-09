// Limitation de débit en mémoire — seau de jetons.
//
// Le site tourne dans un conteneur unique (`docker-compose.yml`), donc un compteur
// en mémoire suffit et reste exact. Le jour où il y a plusieurs instances, chacune
// aurait son propre compteur : il faudrait alors passer à Redis (@upstash/ratelimit).

type Seau = { jetons: number; dernierRemplissage: number };

const seaux = new Map<string, Seau>();

export function limiterDebit(
  cle: string,
  { max, fenetreMs }: { max: number; fenetreMs: number },
): { autorise: boolean; resteMs: number } {
  const maintenant = Date.now();
  const seau = seaux.get(cle) ?? { jetons: max, dernierRemplissage: maintenant };

  const ecoule = maintenant - seau.dernierRemplissage;
  if (ecoule > fenetreMs) {
    seau.jetons = max;
    seau.dernierRemplissage = maintenant;
  }

  if (seau.jetons <= 0) {
    seaux.set(cle, seau);
    return { autorise: false, resteMs: fenetreMs - ecoule };
  }

  seau.jetons -= 1;
  seaux.set(cle, seau);
  return { autorise: true, resteMs: 0 };
}

// Purge périodique : sans elle, la carte grossit indéfiniment sous une attaque
// qui fait tourner les adresses IP.
setInterval(() => {
  const maintenant = Date.now();
  for (const [cle, seau] of seaux) {
    if (maintenant - seau.dernierRemplissage > 3_600_000) seaux.delete(cle);
  }
}, 600_000).unref?.();

export const BAREMES = {
  // Un visiteur légitime envoie un message, éventuellement deux s'il se trompe.
  // 3 par quart d'heure et par IP laisse de la marge sans laisser passer un robot.
  contactParIp: { max: 3, fenetreMs: 15 * 60_000 },
  // Plafond global, toutes IP confondues : protège le quota d'envoi du compte
  // Google même si l'attaque vient de centaines d'adresses différentes.
  contactGlobal: { max: 40, fenetreMs: 60 * 60_000 },
} as const;

/** Adresse du client telle que transmise par Caddy. */
export function adresseClient(request: Request): string {
  const transmise = request.headers.get("x-forwarded-for");
  if (transmise) return transmise.split(",")[0]?.trim() || "inconnue";
  return request.headers.get("x-real-ip")?.trim() || "inconnue";
}
