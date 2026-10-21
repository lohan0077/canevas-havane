import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { entreprise } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Jamais Deux — site de démonstration",
  description: "Jamais Deux est une créatrice de bijoux fictive : qui a réalisé ce site de démonstration, ce qu'il collecte, et d'où viennent ses images.",
  ...adressesDeLaPage("/exemples/jamais-deux/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <div>
      <MentionsDemonstration
        site="jamais-deux"
        entreprise="Jamais Deux"
        polices="Instrument Serif et Archivo"
        enPlus={
          <>
            <p>
              Ce qu&apos;un vrai site de créatrice afficherait ici, avec des valeurs d&apos;exemple :
              entreprise individuelle, SIRET 000 000 000 00000 (exemple), TVA non applicable,
              art. 293 B du CGI (exemple) ; médiateur de la consommation : nom et adresse du
              médiateur choisi (exemple). Le téléphone affiché, {entreprise.telephone}, appartient à
              la tranche que l&apos;ARCEP réserve aux œuvres de fiction.
            </p>
            <p>
              Vente à distance : quatorze jours pour se rétracter après réception (code de la
              consommation, art. L221-18). Prix affichés toutes taxes comprises.
            </p>
            <p>
              Pièces uniques : l&apos;idée du site ne tient que si chaque numéro n&apos;est vraiment
              fabriqué qu&apos;une fois — une fausse rareté serait une pratique commerciale trompeuse
              (code de la consommation, art. L121-2). Les ventes marquées « Partie » sont des
              exemples ; la page d&apos;une pièce partie ne montre ni le nom ni la ville de qui
              l&apos;a achetée.
            </p>
            <p>
              Le mot « artisan » et ses dérivés sont réservés (code de l&apos;artisanat, art.
              L241-1) : le site dit « fait main », jamais « artisanal ». Bijoux en métal précieux :
              les obligations de titre et de poinçon du code général des impôts (art. 521 et
              suivants) s&apos;appliquent. La lettre du vendredi n&apos;est envoyée qu&apos;avec
              l&apos;accord préalable de l&apos;abonnée (code des postes et des communications
              électroniques, art. L34-5).
            </p>
            <p>
              Le premier écran s&apos;inspire du modèle « Fine Jewelry Shop » de MotionSites
              (mise en page transposée, aucun texte ni image repris). Les bijoux sont dessinés ;
              les photos de l&apos;atelier tiennent lieu de « film de fabrication ».
            </p>
          </>
        }
      />
    </div>
  );
}
