import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { entreprise } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales · Bon Mardi — site de démonstration",
  description: "Bon Mardi est une entreprise fictive : qui a réalisé ce site de démonstration, ce qu'il collecte, et d'où viennent ses photos.",
  ...adressesDeLaPage("/exemples/bon-mardi/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <MentionsDemonstration
      site="bon-mardi"
      entreprise="Bon Mardi"
      polices="Bricolage Grotesque et Space Grotesk"
      enPlus={
        <>
          <p>
            Sur un vrai site, cette page nommerait l'entreprise, son adresse et son numéro SIRET.
            Ici, tout est exemple : SIRET {entreprise.siret}, 12 rue de l'Exemple, 00000
            Exemple-Ville. Le téléphone affiché, {entreprise.telephone}, appartient à la tranche que
            l'ARCEP réserve aux œuvres de fiction.
          </p>
          <p>
            <strong>Prix.</strong> Les prix par date sont des exemples, toutes taxes comprises,
            pour un déménagement de moins de 30 km ; ils sont indicatifs. Le prix ferme vient au
            devis, remis gratuitement avant tout contrat, qui indique la prestation exacte, le
            montant HT et TTC et la mention que ce prix est définitif (arrêté du 27 avril 2010
            relatif à la publicité des prix des prestations de déménagement, art. 1) ; les tarifs
            sont affichés (même arrêté, art. 5), ici sur la page « Tarifs et devis ». Le mardi
            coûte moins parce que le camion y est libre : aucune rareté n'est inventée, aucun
            compte à rebours n'est affiché.
          </p>
          <p>
            Le premier écran s'inspire du modèle « Daisy Sweet » de la bibliothèque MotionSites,
            transposé en billet de train.
          </p>
        </>
      }
    />
  );
}
