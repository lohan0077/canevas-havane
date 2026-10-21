import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { cabinet } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "La Bonne Limite — site de démonstration",
  description: "La Bonne Limite est un cabinet de géomètre-expert fictif : qui a réalisé ce site de démonstration, ce qu'il collecte, et d'où viennent ses images.",
  ...adressesDeLaPage("/exemples/la-bonne-limite/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <MentionsDemonstration
      site="la-bonne-limite"
      entreprise="La Bonne Limite"
      polices="Space Grotesk et Inter"
      enPlus={
        <>
          <p>
            Géomètre-expert est une profession réglementée. Ce site affiche donc, en exemple, ce
            qu&apos;un vrai cabinet indiquerait : l&apos;inscription au tableau de l&apos;Ordre
            (n° {cabinet.inscription}), l&apos;assurance de responsabilité civile professionnelle
            ({cabinet.assurance}), le SIRET ({cabinet.siret}). Aucun logo de l&apos;Ordre n&apos;est
            utilisé.
          </p>
          <p>
            La publicité d&apos;un géomètre-expert n&apos;est permise que pour informer le public sur son
            activité, avec modération et correction, et elle est communiquée au conseil régional de
            l&apos;Ordre (décret n° 96-478 du 31 mai 1996, art. 53) : le site s&apos;en tient à des
            informations, sans comparaison, sans avis ni chiffre de clientèle. Seul un
            géomètre-expert inscrit peut fixer les limites des biens fonciers (loi n° 46-942 du
            7 mai 1946, art. 1er et 2). Le bornage se fait à frais communs (Code civil, art. 646) :
            la fourchette le rappelle. Les prix sont des exemples TTC.
          </p>
          <p>
            Le numéro {cabinet.telephone} appartient à une tranche que l&apos;ARCEP réserve aux
            œuvres de fiction ; l&apos;adresse est un exemple. Le formulaire de contact n&apos;envoie
            rien. La mise en page s&apos;inspire du modèle « TerraVision » de la bibliothèque
            MotionSites, transposé à un géomètre-expert.
          </p>
        </>
      }
    />
  );
}
