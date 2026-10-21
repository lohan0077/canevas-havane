import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { entreprise } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Ça Monte — site de démonstration",
  description: "Ça Monte est un magasin de vélos fictif : qui a réalisé ce site de démonstration, ce qu'il collecte, et d'où viennent ses images.",
  ...adressesDeLaPage("/exemples/ca-monte/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <div>
      <MentionsDemonstration
        site="ca-monte"
        entreprise="Ça Monte"
        polices="Space Grotesk et Inter"
        enPlus={
          <>
            <p>
              Ce qu&apos;un vrai site de magasin de vélos afficherait ici, avec des valeurs
              d&apos;exemple : SARL au capital de 10 000 € (exemple), RCS 000 000 000 (exemple),
              TVA intracommunautaire FR 00 000000000 (exemple) ; médiateur de la consommation
              (exemple). Le téléphone affiché, {entreprise.telephone}, appartient à la tranche que
              l&apos;ARCEP réserve aux œuvres de fiction.
            </p>
            <p>
              Marquage : les cycles vendus par un commerçant, neufs depuis le 1er janvier 2021 et
              d&apos;occasion depuis le 1er juillet 2021, font l&apos;objet d&apos;une identification
              inscrite au fichier national unique des cycles identifiés (code des transports,
              art. L1271-2 et L1271-3). Le site le présente comme une obligation, pas comme un
              mérite du magasin. L&apos;identifiant affiché est un exemple.
            </p>
            <p>
              Vélos à assistance électrique : l&apos;assistance s&apos;interrompt à 25 km/h ; les
              temps de trajet du site supposent 18 à 20 km/h de moyenne et sont marqués
              « estimation ». Tests de batterie, prix et forfaits : exemples. Aucune marque de
              vélo n&apos;est citée ; les vélos sont dessinés.
            </p>
            <p>
              Le premier écran s&apos;inspire du modèle « Bold Studio » de MotionSites (mise en page
              transposée, aucun texte ni image repris).
            </p>
          </>
        }
      />
    </div>
  );
}
