import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions Légales",
  description: "Mentions légales du site Canevas Havane : éditeur, direction de la publication, hébergement et propriété intellectuelle.",
  robots: { index: false },
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
              Le site <strong>CANEVAS HAVANE</strong> est édité par la société SPLASH.INC, 
              Société par Actions Simplifiée (SAS) au capital de 10 000 €, dont le siège social est situé à Lyon, France. <br />
              Immatriculée au Registre du Commerce et des Sociétés sous le numéro 123 456 789 RCS Lyon.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-[var(--color-primary)]">2. Direction de la Publication</h2>
            <p>
              Le directeur de la publication est Lohan, agissant en qualité de Président.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-[var(--color-primary)]">3. Hébergement</h2>
            <p>
              Le site est hébergé par Vercel Inc., dont le siège social est situé au 340 S Lemon Ave #1192 Walnut, CA 91789, USA.
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
