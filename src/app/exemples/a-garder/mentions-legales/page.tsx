import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { atelier } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "À Garder — site de démonstration",
  description: "À Garder est une imprimerie fictive : qui a réalisé ce site de démonstration, ce qu'il collecte, et d'où viennent ses images.",
  ...adressesDeLaPage("/exemples/a-garder/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <MentionsDemonstration
      site="a-garder"
      entreprise="À Garder"
      polices="Instrument Serif et Zilla Slab"
      enPlus={
        <>
          <p>
            Les prix sont des exemples : toutes taxes comprises pour les particuliers, hors taxes
            pour les restaurateurs, et la page le dit à chaque fois. Les prénoms des faire-part
            (« Léa &amp; Tom ») et le « Restaurant d&apos;exemple » sont inventés : aucun vrai
            restaurant n&apos;est nommé, et le menu imprimé n&apos;affiche aucun prix.
          </p>
          <p>
            La boîte d&apos;échantillons ne demande aucune adresse et n&apos;envoie rien : le choix des
            papiers reste dans le navigateur. L&apos;adresse de l&apos;atelier, le SIRET
            ({atelier.siret}) et le numéro {atelier.telephone}, pris dans une tranche que
            l&apos;ARCEP réserve aux œuvres de fiction, sont des exemples. La mise en page
            s&apos;inspire du modèle « Kairo Studio » de la bibliothèque MotionSites, transposé à
            une imprimerie.
          </p>
        </>
      }
    />
  );
}
