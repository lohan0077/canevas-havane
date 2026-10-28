import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SITES } from "@/app/exemples/_registre";
import { adressesDeLaPage } from "@/lib/seo";
import { MENTION_POSITIONNEMENT, PHRASE_POSITIONNEMENT } from "@/components/Positionnement";
import DemandeAppel from "./DemandeAppel";

// La page du « lien en bio » : là où arrivent les spectateurs des vidéos TikTok et
// Instagram. Elle dit l'offre en une phrase, montre les sites filmés, et prend une
// demande d'appel de quinze minutes. Les mots de l'offre suivent /tarifs et les CGV :
// rien n'est dû sans rendez-vous, vente ou demande de devis passés via le site.

export const metadata: Metadata = {
  title: "Votre site, sans avance de frais",
  description:
    "Je crée votre site sans avance de frais : vous ne payez que sur les rendez-vous, ventes et demandes de devis qu'il vous apporte. Les sites des vidéos, et un appel de quinze minutes.",
  // Une page d'arrivée de campagne, pas une page à trouver sur Google : elle reprend
  // l'accueil et /tarifs, et présente des démonstrations elles-mêmes hors index.
  robots: { index: false, follow: true },
  ...adressesDeLaPage("/bio"),
};

// Les sites filmés dans les dix premières vidéos, dans l'ordre de publication
// (Videos/TOP-10.md, hors dépôt).
const ORDRE = [
  "neuf-etes",
  "et-s-il-pleut",
  "sept-mille-diners",
  "l-heure-dite",
  "le-pourquoi",
  "pavillon-bis",
  "transmis",
  "lundi-d-apres",
  "douze-mois",
  "pignon-sur-pre",
];

const sites = ORDRE.flatMap((nom) => {
  const site = SITES.find((s) => s.chemin === `/exemples/${nom}`);
  return site && "image" in site ? [site] : [];
});

const etapes = [
  {
    titre: "Quinze minutes",
    texte: "Au téléphone ou en visio : votre métier, ce qui fait venir vos clients, ce qui les retient.",
  },
  {
    // La même phrase que sur l'accueil et /expertise (components/Positionnement.tsx).
    titre: "Votre positionnement",
    texte: `${PHRASE_POSITIONNEMENT} ${MENTION_POSITIONNEMENT}`,
  },
  {
    titre: "Je crée le site",
    texte: "Sans avance de frais. Le montant de chaque rendez-vous, vente ou demande de devis est fixé ensemble, au devis.",
  },
  {
    titre: "Vous payez sur ce qu'il apporte",
    texte: "Chaque rendez-vous, vente ou demande passés via le site est noté dans un journal que vous vérifiez ligne par ligne. Sans eux, aucune facture.",
  },
];

// Les titres sont en Plus Jakarta : la Cormorant du site décale les accents
// (« à », « ê », « ç »…) et ces titres en portent.
const TITRE = "[font-family:var(--font-plus)] font-semibold tracking-tight";

export default function PageBio() {
  return (
    <main className="w-full">
      <section className="mx-auto max-w-5xl px-6 pt-36 pb-20 md:pt-48 md:pb-28">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-primary-texte)]">
          Le lien des vidéos
        </p>
        <h1 className={`${TITRE} mt-6 text-[clamp(2.5rem,6vw,4.75rem)] leading-[1.02] text-[var(--color-foreground)]`}>
          Votre site, sans avance de frais.
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[var(--color-foreground)] md:text-xl">
          Je le crée. Vous ne payez que sur les rendez-vous, les ventes et les demandes de
          devis qu&apos;il vous apporte. Aucun abonnement pour le site.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href="#appel"
            className="inline-flex h-12 items-center justify-center rounded-full bg-[var(--color-foreground)] px-7 text-[15px] font-medium text-[var(--color-background)] transition-opacity hover:opacity-90"
          >
            Demander un appel de 15 minutes
          </a>
          <a
            href="#sites"
            className="inline-flex h-12 items-center justify-center rounded-full border border-[var(--color-foreground)]/25 px-7 text-[15px] font-medium text-[var(--color-foreground)] transition-colors hover:border-[var(--color-foreground)]"
          >
            Voir les sites des vidéos
          </a>
        </div>
      </section>

      <section id="sites" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-20 md:py-28">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-primary-texte)]">
          01 — Les sites des vidéos
        </p>
        <h2 className={`${TITRE} mt-5 max-w-3xl text-[clamp(2rem,4vw,3.25rem)] leading-[1.05]`}>
          Les entreprises sont inventées. Les sites sont vrais.
        </h2>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-foreground)]/80">
          Chacun a été construit pour de bon, puis filmé. Ouvrez-les, essayez les outils :
          rien de ce que vous y tapez n&apos;est envoyé.
        </p>
        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sites.map((site) => (
            <li key={site.chemin}>
              <Link
                href={site.chemin}
                className="group block h-full overflow-hidden rounded-2xl border border-[var(--color-foreground)]/10 bg-white/60 transition-colors hover:border-[var(--color-foreground)]/30"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={site.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-6">
                  <p className="text-sm font-medium text-[var(--color-primary-texte)]">{site.metier}</p>
                  <p className={`${TITRE} mt-2 text-2xl text-[var(--color-foreground)]`}>{site.nom}</p>
                  <p className="mt-3 line-clamp-3 text-[15px] leading-relaxed text-[var(--color-foreground)]/80">{site.idee}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/exemples"
          className="mt-10 inline-block text-[15px] font-medium text-[var(--color-primary-texte)] underline decoration-1 underline-offset-4"
        >
          Les autres métiers
        </Link>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-20 md:py-28">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-primary-texte)]">
          02 — Comment ça se passe
        </p>
        <ol className="mt-12 grid gap-10 md:grid-cols-2">
          {etapes.map((etape, i) => (
            <li key={etape.titre} className="border-t border-[var(--color-foreground)]/15 pt-6">
              <p className="text-sm font-medium text-[var(--color-foreground)]/80">{String(i + 1).padStart(2, "0")}</p>
              <p className={`${TITRE} mt-3 text-2xl text-[var(--color-foreground)]`}>{etape.titre}</p>
              <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-foreground)]/80">{etape.texte}</p>
            </li>
          ))}
        </ol>
        <p className="mt-12 max-w-2xl text-[15px] leading-relaxed text-[var(--color-foreground)]/80">
          Le référencement naturel est une prestation à part, à 150 € par mois. Tout le
          détail, rachat du site compris :{" "}
          <Link href="/tarifs" className="font-medium text-[var(--color-primary-texte)] underline decoration-1 underline-offset-4">
            les tarifs
          </Link>
          .
        </p>
      </section>

      <section id="appel" className="mx-auto max-w-3xl scroll-mt-24 px-6 pt-20 pb-32 md:pt-28 md:pb-40">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-primary-texte)]">
          03 — Quinze minutes
        </p>
        <h2 className={`${TITRE} mt-5 text-[clamp(2rem,4vw,3.25rem)] leading-[1.05]`}>
          Dites-moi votre métier.
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-[var(--color-foreground)]/80">
          Je vous écris sous 24 heures ouvrées avec trois créneaux de quinze minutes.
        </p>
        <DemandeAppel />
      </section>
    </main>
  );
}
