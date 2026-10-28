import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { EnTetePage } from "../_composants/Blocs";
import { entreprise } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales et crédits — Tour du Quartier, site de démonstration",
  description: "Tour du Quartier est un magasin de vélos fictif : qui a réalisé ce site de démonstration, ce qu'il ne collecte pas, et d'où viennent ses photos.",
  ...adressesDeLaPage("/exemples/tour-du-quartier/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <main>
      <EnTetePage pastille="Site de démonstration" titre="Ce qui est *inventé.*" balise="p" />
      <MentionsDemonstration
        site="tour-du-quartier"
        entreprise="Tour du Quartier"
        polices="Unbounded et Figtree"
        enPlus={
          <>
            <p>
              Ce site réunit les deux vidéos des magasins de vélos : « Créer une marque » (le magasin
              Tour du Quartier, la question « t&apos;as pas pédalé depuis combien de temps ? », la première
              heure sur le parking, l&apos;affiche, la course de lenteur) et « Remplir l&apos;agenda » (la
              page « Lundi matin » et son « ton trajet, c&apos;est combien ? », l&apos;essai réservé en ligne
              sur ton vrai trajet, la fiche des vélos d&apos;occasion).
            </p>
            <p>
              Ce qu&apos;un vrai site de magasin de vélos afficherait ici, avec des valeurs
              d&apos;exemple : SAS au capital de 5 000 € (exemple), RCS 000 000 000 (exemple), TVA
              intracommunautaire FR 00 000000000 (exemple) ; médiateur de la consommation (exemple). Le
              téléphone affiché, {entreprise.telephone}, appartient à la tranche que l&apos;ARCEP réserve
              aux œuvres de fiction.
            </p>
            <p>
              Marquage : les cycles vendus par un commerçant, neufs depuis le 1er janvier 2021 et
              d&apos;occasion depuis le 1er juillet 2021, font l&apos;objet d&apos;une identification inscrite
              au fichier national unique des cycles identifiés (code des transports, art. L1271-2 et
              L1271-3). Le site le présente comme une obligation, pas comme un mérite du magasin.
              L&apos;identifiant affiché est un exemple.
            </p>
            <p>
              Vélos à assistance électrique : l&apos;assistance s&apos;interrompt à 25 km/h ; les temps de
              trajet du site supposent 18 à 20 km/h de moyenne et sont marqués « estimation ». Tests
              de batterie, prix et forfaits : exemples. Aucune marque de vélo n&apos;est citée ; les vélos
              sont dessinés. Le casque est obligatoire à vélo pour les moins de douze ans ; il est
              prêté à tous.
            </p>
            <p>
              La course de lenteur se tient sur le parking du magasin, hors de la voie publique, et ne
              promet aucun lot : ce n&apos;est pas un jeu-concours. Un vrai magasin vérifierait que son
              assurance couvre l&apos;événement et les essais. La première heure est offerte sans
              obligation d&apos;achat. Les prénoms (Paul, Inès, Malo) sont inventés.
            </p>
          </>
        }
      />
    </main>
  );
}
