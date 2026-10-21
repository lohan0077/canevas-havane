import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { maison } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales · Relue — site de démonstration",
  description: "Relue est une papeterie fictive : qui a réalisé ce site de démonstration, ce qu'il collecte, et d'où viennent ses images.",
  ...adressesDeLaPage("/exemples/relue/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <MentionsDemonstration
      site="relue"
      entreprise="Relue"
      polices="Instrument Serif et DM Sans"
      enPlus={
        <>
          <p>
            La lettre de la semaine (« Ma Jeanne… », signée Robert, Brest, 12 mai 1984) est inventée
            pour l&apos;exemple. Une vraie lettre ne serait lue qu&apos;avec l&apos;accord de son auteur ou
            de ses héritiers : celui qui l&apos;a reçue possède le papier, pas le texte (code de la
            propriété intellectuelle, art. L121-2). Le lecteur de ce site ne joue aucun son.
          </p>
          <p>
            « Postée dans un an, jour pour jour » désigne la date de dépôt de la lettre, pas sa date
            de distribution. Sur un vrai site, l&apos;adresse donnée ne servirait qu&apos;à poster la
            lettre et serait effacée ensuite ; ici, rien n&apos;est demandé ni enregistré.
          </p>
          <p>
            Les prix sont des prix TTC d&apos;exemple. L&apos;adresse, {maison.adresse}, est une adresse
            d&apos;exemple ; le numéro {maison.telephone} appartient à une tranche que l&apos;ARCEP
            réserve aux œuvres de fiction. La mise en page s&apos;inspire du modèle « Editorial
            Collection CTA » de la bibliothèque MotionSites, transposé à une papeterie.
          </p>
        </>
      }
    />
  );
}
