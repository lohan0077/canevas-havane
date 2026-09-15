import type { NextConfig } from "next";

// Politique de sécurité du contenu.
//
// `'unsafe-inline'` sur les scripts est ici assumé : les pages sont pré-rendues
// statiquement (`x-nextjs-prerender: 1`), et la solution propre — un nonce par
// requête — impose un rendu dynamique, donc la perte du cache qui rend le site
// rapide. Ce que la politique protège malgré tout : le chargement de scripts
// depuis un domaine tiers, l'inclusion du site dans une iframe, la réécriture de
// `<base>`, et l'envoi d'un formulaire vers un domaine étranger.
// En développement uniquement, Next a besoin de deux choses que la politique de
// production interdit : `eval()` (outillage de débogage React — « React will never
// use eval() in production mode ») et une WebSocket vers localhost (rechargement à
// chaud ; sans elle, le navigateur sert silencieusement des pages périmées).
// La politique de production, elle, ne bouge pas : zéro violation constatée en CI.
const enDeveloppement = process.env.NODE_ENV === "development";

const csp = [
  "default-src 'self'",
  enDeveloppement
    ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'"
    : "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  enDeveloppement ? "connect-src 'self' ws:" : "connect-src 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  // Réintroduit avec le passage en mode bloquant : le navigateur l'ignorait — en
  // affichant une erreur — tant que la politique était en simple observation.
  "upgrade-insecure-requests",
].join("; ");

// En-têtes de sécurité appliqués à toutes les réponses.
const securityHeaders = [
  // Mode bloquant depuis le 10/08/2026. La politique a d'abord tourné en simple
  // observation ; les 13 pages ont été rechargées une à une dans un navigateur,
  // console ouverte, sans une seule violation. On bloque donc pour de bon.
  { key: "Content-Security-Policy", value: csp },
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
