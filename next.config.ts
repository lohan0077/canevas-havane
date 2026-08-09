import type { NextConfig } from "next";

// Politique de sécurité du contenu.
//
// `'unsafe-inline'` sur les scripts est ici assumé : les pages sont pré-rendues
// statiquement (`x-nextjs-prerender: 1`), et la solution propre — un nonce par
// requête — impose un rendu dynamique, donc la perte du cache qui rend le site
// rapide. Ce que la politique protège malgré tout : le chargement de scripts
// depuis un domaine tiers, l'inclusion du site dans une iframe, la réécriture de
// `<base>`, et l'envoi d'un formulaire vers un domaine étranger.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  // `upgrade-insecure-requests` est volontairement absent : le navigateur l'ignore
  // dans une politique en mode observation et affiche une erreur dans la console à
  // chaque page. À réintroduire le jour où l'on passe en mode bloquant. En attendant,
  // HSTS impose déjà le HTTPS.
].join("; ");

// En-têtes de sécurité appliqués à toutes les réponses.
const securityHeaders = [
  // Mode observation : les violations sont signalées dans la console du navigateur,
  // rien n'est bloqué. À basculer en "Content-Security-Policy" une fois qu'on a
  // vérifié qu'aucune page ne remonte de violation.
  { key: "Content-Security-Policy-Report-Only", value: csp },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
  { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  },
];

const nextConfig: NextConfig = {
  // Requis par le Dockerfile : produit un serveur autonome dans .next/standalone
  output: "standalone",
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2678400, // 31 jours
  },
  async headers() {
    return [
      { source: "/(.*)", headers: securityHeaders },
      {
        source: "/_next/static/(.*)",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/(.*)\\.(ico|png|svg|jpg|jpeg|webp|avif|woff2|woff)",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      // La route de contact ne doit jamais être mise en cache : sa réponse dépend
      // du compteur de limitation de débit.
      {
        source: "/api/(.*)",
        headers: [{ key: "Cache-Control", value: "no-store" }],
      },
    ];
  },
};

export default nextConfig;
