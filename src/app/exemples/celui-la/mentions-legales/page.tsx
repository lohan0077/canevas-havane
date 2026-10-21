import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { boutique } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales et crédits — Celui-Là, site de démonstration",
  description: "Celui-Là est une fromagerie fictive : qui a réalisé ce site de démonstration, ce qu'il collecte, et d'où viennent ses images.",
  ...adressesDeLaPage("/exemples/celui-la/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <div>
      <MentionsDemonstration
        site="celui-la"
        entreprise="Celui-Là"
        polices="Young Serif et Work Sans"
        enPlus={
          <>
            <p>
              Mentions qu&apos;afficherait la vraie fromagerie, ici avec des valeurs
              d&apos;exemple : Celui-Là, SIRET 000 000 000 00000 (exemple),{" "}
              {boutique.adresse} (adresse fictive). Le téléphone {boutique.telephone}{" "}
              appartient à la tranche que l&apos;ARCEP réserve aux œuvres de fiction.
            </p>
            <p>
              Les fromages, leurs producteurs (Madeleine, Bastien, Lucie, Hugo, Sarah et
              Jean), leurs distances et leurs prix sont inventés. Une vraie fromagerie
              n&apos;écrit sur la carte que ce qui est vrai : un fromage n&apos;est présenté
              comme fait « avec le lait de ses chèvres », « dans sa ferme », que s&apos;il
              l&apos;est (décret n° 2007-628, art. 9-1). Le traitement du lait (cru,
              thermisé, pasteurisé) est indiqué pour chaque fromage (même décret, art. 14
              et 20). Le lait, allergène, est signalé avant la commande (règlement (UE)
              n° 1169/2011, art. 14 et 44). Retrait en boutique uniquement ; rien n&apos;est
              payé en ligne.
            </p>
          </>
        }
      />
    </div>
  );
}
