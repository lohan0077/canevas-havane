import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de Confidentialité",
  description: "Politique de confidentialité de Canevas Havane : collecte des données, utilisation, droits RGPD et cookies.",
  robots: { index: false },
};

export default function Confidentialite() {
  return (
    <div className="layout-safe-zone min-h-screen pb-48">
      <div className="max-centered-container px-6 max-w-4xl">
        <div className="mb-16 md:mb-24 space-y-6">
           <h1 className="text-3xl md:text-6xl font-medium uppercase tracking-tight text-[var(--color-foreground)] font-serif">Vie Privée</h1>
           <div className="h-[1px] w-24 bg-[var(--color-primary)]"></div>
        </div>

        <div className="space-y-16 text-[var(--color-foreground)]/70 font-light leading-loose section-spacer">
          <section className="space-y-6">
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-[var(--color-primary)]">1. Collecte des Données</h2>
            <p>
              Nous collectons uniquement les informations que vous choisissez de nous fournir via notre formulaire de contact (nom, email, message). 
              Ces données sont traitées avec la plus grande confidentialité et ne sont jamais cédées à des tiers.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-[var(--color-primary)]">2. Utilisation des Données</h2>
            <p>
              Vos données sont exclusivement utilisées pour répondre à vos demandes de devis ou de renseignements, et pour la gestion de la relation client qui en découle.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-[var(--color-primary)]">3. Vos Droits</h2>
            <p>
              Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données personnelles. 
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-[var(--color-primary)]">4. Cookies</h2>
            <p>
              Notre site utilise des cookies de mesure d'audience anonymes pour améliorer votre expérience de navigation. 
              Vous pouvez configurer vos préférences via le bandeau de consentement affiché lors de votre première visite.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
