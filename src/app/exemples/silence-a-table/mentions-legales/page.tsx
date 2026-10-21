import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { entreprise } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales · Silence à Table — site de démonstration",
  description: "Silence à Table est une entreprise fictive : qui a réalisé ce site de démonstration, ce qu'il collecte, et d'où viennent ses photos.",
  ...adressesDeLaPage("/exemples/silence-a-table/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <div>
      <MentionsDemonstration
        site="silence-a-table"
        entreprise="Silence à Table"
        polices="Instrument Serif et Figtree"
        enPlus={
          <>
            <p>
              Sur un vrai site, cette page nommerait la société du traiteur, son adresse et son
              numéro SIRET. Ici, tout est exemple : SIRET{" "}
              {entreprise.siret}, 12 rue de l&apos;Exemple, 00000 Exemple-Ville. Le téléphone affiché,{" "}
              {entreprise.telephone}, appartient à la tranche que l&apos;ARCEP réserve aux œuvres de
              fiction.
            </p>
            <p>
              Les prix sont affichés par personne, toutes taxes comprises, et sont des exemples. Les
              allergènes sont indiqués plat par plat, parmi les quatorze de l&apos;annexe II du
              règlement (UE) n° 1169/2011 ; pour des repas non préemballés, cette information est
              donnée par écrit, sans que le client ait à la demander (décret n° 2015-447). Les
              allergies et les régimes sont demandés avant toute commande. Aucune boisson
              alcoolisée n&apos;est proposée sur ce site.
            </p>
            <p>
              Les mariages présentés sont des exemples : aucun nom, aucune photo d&apos;invités. Les
              créneaux de dégustation « complets » sont un exemple ; aucun avis, aucune note
              n&apos;est affiché.
            </p>
            <p>
              La mise en page s&apos;inspire du modèle « Luxury Ecommerce Design » de la bibliothèque
              MotionSites, transposé à un traiteur de mariage.
            </p>
          </>
        }
      />
    </div>
  );
}
