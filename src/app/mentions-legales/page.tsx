import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions Légales",
  description: "Mentions légales du site Canevas Havane : éditeur, direction de la publication, hébergement et propriété intellectuelle.",
  alternates: { canonical: "/mentions-legales" },
  robots: { index: false },
};

/** Informations légales obligatoires (art. 6-III de la LCEN) pour un entrepreneur individuel. */
const editeur = {
  nomComplet: "Lohan Gault",
  adresse: "274 rue du Couas, 07430 Vernosc-lès-Annonay, France",
  siren: "927 448 647",
  siret: "927 448 647 00010",
  email: "gaultlohan@gmail.com",
};

export default function MentionsLegales() {
  return (
    <div className="layout-safe-zone min-h-screen pb-48">
      <div className="max-centered-container px-6 max-w-4xl">
        <div className="mb-16 md:mb-24 space-y-6">
           <h1 className="text-3xl md:text-6xl font-medium uppercase tracking-tight text-[var(--color-foreground)] font-serif">Mentions Légales</h1>
           <div className="h-[1px] w-24 bg-[var(--color-primary)]"></div>
        </div>

        <div className="space-y-16 text-[var(--color-foreground)]/70 font-light leading-loose section-spacer">
          <section className="space-y-6">
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-[var(--color-primary)]">1. Éditeur du Site</h2>
            <p>
              Le site <strong>CANEVAS HAVANE</strong> est édité par {editeur.nomComplet}, entrepreneur individuel
              exerçant sous le régime de la micro-entreprise, dont le siège de l'activité est situé
              au {editeur.adresse}. <br />
              Immatriculé au Registre National des Entreprises sous le numéro SIREN {editeur.siren}
              (SIRET {editeur.siret}), code APE 8299Z — Autres activités de soutien aux entreprises. <br />
              Contact : <a href={`mailto:${editeur.email}`} className="text-[var(--color-primary)] hover:underline decoration-1 underline-offset-4">{editeur.email}</a>
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-[var(--color-primary)]">2. Direction de la Publication</h2>
            <p>
              Le directeur de la publication est {editeur.nomComplet}, en qualité d'entrepreneur individuel.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-[var(--color-primary)]">3. Hébergement</h2>
            <p>
              Le site est hébergé par Hetzner Online GmbH, Industriestr. 25, 91710 Gunzenhausen, Allemagne.
              Téléphone : +49 (0)9831 505-0.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-[var(--color-primary)]">4. Propriété Intellectuelle</h2>
            <p>
              L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. 
              Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
