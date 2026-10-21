import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { maison } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales et crédits — Moins le Quart, site de démonstration",
  description: "Moins le Quart est une marque de café fictive : qui a réalisé ce site de démonstration, ce qu'il collecte, et d'où viennent ses images.",
  ...adressesDeLaPage("/exemples/moins-le-quart/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <div>
      <MentionsDemonstration
        site="moins-le-quart"
        entreprise="Moins le Quart"
        polices="Outfit et Lora"
        enPlus={
          <>
            <p>
              Mentions qu&apos;afficherait la vraie marque, ici avec des valeurs
              d&apos;exemple : Moins le Quart, SIRET 000 000 000 00000 (exemple),{" "}
              {maison.adresse} (adresse fictive). Le téléphone {maison.telephone}{" "}
              appartient à la tranche que l&apos;ARCEP réserve aux œuvres de fiction.
            </p>
            <p>
              L&apos;accueil lit l&apos;heure de ton téléphone pour te proposer un café : elle
              reste dans ton navigateur, rien n&apos;est envoyé. « Au réveil », « pour la
              pause », « le soir » désignent des moments de la journée : le site ne prête au
              café ni au décaféiné aucun effet (règlement (CE) n° 1924/2006). Cafés et prix
              TTC d&apos;exemple.
            </p>
          </>
        }
      />
    </div>
  );
}
