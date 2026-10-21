import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { depot } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales · Ton dépôt — site de démonstration",
  description: "Ton dépôt est un fournisseur de matériel professionnel fictif : qui a réalisé ce site de démonstration, ce qu'il collecte, et d'où viennent ses images.",
  ...adressesDeLaPage("/exemples/ton-depot/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <MentionsDemonstration
      site="ton-depot"
      entreprise="Ton dépôt"
      polices="Bricolage Grotesque et Inter"
      enPlus={
        <>
          <p>
            Comme le ferait un vrai fournisseur, ce site affiche une adresse ({depot.adresse}), un numéro
            SIRET ({depot.siret}) et un téléphone ({depot.telephone}) : trois mentions d&apos;exemple. Le
            numéro appartient à une tranche que l&apos;ARCEP réserve aux œuvres de fiction.
          </p>
          <p>
            La vente est réservée aux professionnels : les prix sont affichés hors taxes, avec le TTC à
            côté. Le stock affiché est présenté comme le vrai stock du dépôt, et le délai est écrit
            quand une pièce manque : annoncer un produit qu&apos;on ne peut pas fournir en quantité
            raisonnable est une pratique commerciale trompeuse (code de la consommation, art. L121-4,
            5° et 7°), y compris entre professionnels (art. L121-5). Ici, modèles, références, stocks
            et prix sont des exemples.
          </p>
          <p>
            Aucune marque réelle n&apos;apparaît : la plaque signalétique porte « FABRICANT », et les
            modèles (AR-700, LV-500, FP-2…) sont inventés. La liste pour ouvrir un restaurant est
            présentée comme la liste de base, pas comme l&apos;équipement complet. La photo de la plaque
            est simulée : le site ne demande pas l&apos;accès à l&apos;appareil photo.
          </p>
          <p>
            La mise en page s&apos;inspire du modèle « Freight Command » de la bibliothèque MotionSites,
            transposé à un dépôt de pièces.
          </p>
        </>
      }
    />
  );
}
