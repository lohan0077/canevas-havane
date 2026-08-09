import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de Confidentialité",
  description: "Politique de confidentialité de Canevas Havane : données collectées, finalité, durée de conservation, destinataires et droits RGPD.",
  alternates: { canonical: "/confidentialite" },
  robots: { index: false },
};

/** Dernière révision du texte — à mettre à jour à chaque modification de fond. */
const derniereMiseAJour = "9 août 2026";

export default function Confidentialite() {
  return (
    <div className="layout-safe-zone min-h-screen pb-48">
      <div className="max-centered-container px-6 max-w-4xl">
        <div className="mb-16 md:mb-24 space-y-6">
           <h1 className="text-3xl md:text-6xl font-medium uppercase tracking-tight text-[var(--color-foreground)] font-serif">Vie Privée</h1>
           <div className="h-[1px] w-24 bg-[var(--color-primary)]"></div>
           <p className="text-[var(--color-foreground)]/40 text-xs uppercase tracking-[0.3em]">
             Dernière mise à jour : {derniereMiseAJour}
           </p>
        </div>

        <div className="space-y-16 text-[var(--color-foreground)]/70 font-light leading-loose section-spacer">
          <section className="space-y-6">
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-[var(--color-primary)]">1. Responsable du Traitement</h2>
            <p>
              Le responsable du traitement des données est Lohan Gault, entrepreneur individuel,
              274 rue du Couas, 07430 Vernosc-lès-Annonay (SIREN 927 448 647). <br />
              Pour toute question relative à vos données :{" "}
              <a href="mailto:gaultlohan@gmail.com" className="text-[var(--color-primary)] hover:underline decoration-1 underline-offset-4">gaultlohan@gmail.com</a>
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-[var(--color-primary)]">2. Données Collectées</h2>
            <p>
              Nous collectons uniquement les informations que vous saisissez volontairement dans
              notre formulaire de contact : <strong>votre nom, votre adresse email et le contenu
              de votre message</strong>. Aucune autre donnée n'est collectée : le site ne dépose
              aucun cookie, n'utilise aucun outil de mesure d'audience et ne pratique aucun
              profilage.
            </p>
            <p>
              L'adresse IP à l'origine d'un envoi est utilisée de façon transitoire, en mémoire
              uniquement, pour limiter le nombre de messages par visiteur et bloquer les envois
              automatisés. Elle n'est ni enregistrée sur disque, ni conservée au-delà d'une heure.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-[var(--color-primary)]">3. Finalité et Base Légale</h2>
            <p>
              Vos données servent exclusivement à répondre à votre demande de devis ou de
              renseignements, puis à gérer la relation commerciale qui en découle.
            </p>
            <p>
              La base légale est votre <strong>consentement</strong> (article 6.1.a du RGPD),
              matérialisé par l'envoi volontaire du formulaire ; puis, si une relation
              commerciale s'engage, l'<strong>exécution de mesures précontractuelles et du
              contrat</strong> (article 6.1.b). La limitation du nombre d'envois repose sur
              notre <strong>intérêt légitime</strong> à protéger le service contre les abus
              (article 6.1.f).
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-[var(--color-primary)]">4. Durée de Conservation</h2>
            <p>
              Les messages restés sans suite commerciale sont supprimés au plus tard{" "}
              <strong>12 mois</strong> après le dernier échange. Lorsqu'une relation commerciale
              s'engage, les données sont conservées pendant toute sa durée, puis <strong>3 ans</strong>{" "}
              à compter du dernier contact à des fins de prospection. Les documents comptables
              associés sont conservés <strong>10 ans</strong>, comme l'impose le code de commerce.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-[var(--color-primary)]">5. Destinataires et Hébergement</h2>
            <p>
              Vos données ne sont ni vendues, ni louées, ni cédées à des tiers à des fins
              commerciales. Deux prestataires techniques y ont nécessairement accès :
            </p>
            <ul className="space-y-3 list-disc pl-6">
              <li>
                <strong>Hetzner Online GmbH</strong> (Allemagne) — hébergement du site.
                Les données restent sur le territoire de l'Union européenne.
              </li>
              <li>
                <strong>Google Ireland Ltd / Google LLC</strong> — les messages du formulaire
                sont acheminés et stockés dans une boîte Gmail. Ce traitement implique un
                transfert vers les États-Unis, encadré par les clauses contractuelles types
                de la Commission européenne et par le cadre de protection des données
                UE–États-Unis (<em>Data Privacy Framework</em>), auquel Google adhère.
              </li>
            </ul>
          </section>

          <section className="space-y-6">
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-[var(--color-primary)]">6. Vos Droits</h2>
            <p>
              Conformément au RGPD, vous disposez d'un droit d'<strong>accès</strong>, de{" "}
              <strong>rectification</strong>, d'<strong>effacement</strong>, de{" "}
              <strong>limitation</strong> du traitement, d'<strong>opposition</strong> et de{" "}
              <strong>portabilité</strong> de vos données, ainsi que du droit de retirer votre
              consentement à tout moment.
            </p>
            <p>
              Pour les exercer, écrivez à{" "}
              <a href="mailto:gaultlohan@gmail.com" className="text-[var(--color-primary)] hover:underline decoration-1 underline-offset-4">gaultlohan@gmail.com</a>.
              Une réponse vous sera apportée dans un délai d'un mois.
            </p>
            <p>
              Si vous estimez, après nous avoir contactés, que vos droits ne sont pas respectés,
              vous pouvez introduire une réclamation auprès de la <strong>CNIL</strong> —
              3 place de Fontenoy, TSA 80715, 75334 Paris Cedex 07 —{" "}
              <a href="https://www.cnil.fr/fr/plaintes" className="text-[var(--color-primary)] hover:underline decoration-1 underline-offset-4" target="_blank" rel="noopener noreferrer">www.cnil.fr/fr/plaintes</a>.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-[var(--color-primary)]">7. Cookies</h2>
            <p>
              <strong>Ce site ne dépose aucun cookie</strong> et n'utilise aucun traceur :
              ni mesure d'audience, ni publicité, ni réseau social. C'est la raison pour
              laquelle aucun bandeau de consentement ne vous est présenté — il n'y a rien
              à consentir.
            </p>
            <p>
              Si un outil de mesure d'audience venait à être ajouté, cette page serait mise à
              jour et un bandeau de consentement conforme serait mis en place au préalable.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-[var(--color-primary)]">8. Sécurité</h2>
            <p>
              Les échanges avec le site sont chiffrés de bout en bout (HTTPS, HSTS). L'envoi des
              messages vers la boîte de réception s'effectue par une liaison chiffrée. L'accès au
              serveur est restreint au responsable du traitement.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
