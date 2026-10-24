import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import { AppelFinal, EnTetePage } from "../_composants/Blocs";
import PremiereFacture from "../_composants/PremiereFacture";

// L'outil de la vidéo « Créer une marque » : « tu fais ta première facture, avec les
// mentions obligatoires. Juste du premier coup. » Six mentions de base, cochées à mesure ;
// la page dit que ce n'est qu'une partie de la liste (C. com., L441-9 ; CGI, ann. II,
// art. 242 nonies A). Filmé : le haut, puis les mentions, puis l'exemple qui se remplit.
export const metadata: Metadata = {
  title: "Votre première facture — Premier Billet, site de démonstration",
  description: "Un outil pour faire sa première facture avec les mentions de base, sur le site de démonstration d'un cabinet d'expertise comptable imaginaire. Rien n'est envoyé.",
  ...adressesDeLaPage("/exemples/premier-billet/premiere-facture"),
};

export default function PremiereFacturePage() {
  return (
    <main>
      <EnTetePage surtitre="Outil gratuit" titre="Votre première facture, *juste du premier coup.*" data-film="haut-outil">
        Six mentions de base, cochées à mesure que vous remplissez, et l&apos;aperçu de la facture
        telle qu&apos;elle partirait. Pour tout le monde, client du cabinet ou non.
      </EnTetePage>
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 md:py-20">
        <PremiereFacture />
      </section>
      <AppelFinal />
    </main>
  );
}
