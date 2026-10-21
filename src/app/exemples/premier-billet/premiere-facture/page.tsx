import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import PremiereFacture from "../_composants/PremiereFacture";
import { Section } from "../_composants/Blocs";

// L'outil de la vidéo : « tu fais ta première facture, avec les mentions obligatoires.
// Juste du premier coup. » Six mentions de base, cochées à mesure ; la page dit que ce
// n'est qu'une partie de la liste (C. com., L441-9 ; CGI, ann. II, art. 242 nonies A).
export const metadata: Metadata = {
  title: "Votre première facture — Premier Billet, site de démonstration",
  description: "Un outil pour faire sa première facture avec les mentions de base, sur le site de démonstration d'un cabinet d'expertise comptable imaginaire. Rien n'est envoyé.",
  ...adressesDeLaPage("/exemples/premier-billet/premiere-facture"),
};

export default function PremiereFacturePage() {
  return (
    <main>
      <Section className="max-w-2xl! pt-10 sm:pt-16">
        <div data-film="haut-outil" className="mb-8 space-y-4">
          <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-[var(--accent-texte)]">Outil gratuit</p>
          <h1 className="text-[42px] font-semibold leading-[1.04] sm:text-6xl">
            Votre première facture, <em className="font-normal">juste du premier coup.</em>
          </h1>
        </div>
        <PremiereFacture />
      </Section>
    </main>
  );
}
