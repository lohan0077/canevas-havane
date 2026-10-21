import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";

export const metadata: Metadata = {
  title: "Mentions légales et crédits — Premier Billet, site de démonstration",
  description: "Premier Billet est un cabinet d'expertise comptable fictif : qui a réalisé ce site de démonstration, ce qu'il ne collecte pas, et d'où viennent ses photos.",
  ...adressesDeLaPage("/exemples/premier-billet/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <main>
      <MentionsDemonstration
        site="premier-billet"
        entreprise="Premier Billet"
        polices="Bodoni Moda, DM Sans et Caveat"
        enPlus={
          <>
            <p>
              Sur un vrai site, cette page porterait les mentions propres à l&apos;expertise
              comptable. Ici, elles sont des exemples : société d&apos;expertise comptable inscrite
              au tableau de l&apos;Ordre des experts-comptables, conseil régional d&apos;exemple,
              numéro d&apos;inscription 00 000 000 ; titre professionnel : expert-comptable,
              diplôme délivré en France ; règles professionnelles : code de déontologie des
              professionnels de l&apos;expertise comptable (décret n° 2012-432 du 30 mars 2012) ;
              assurance de responsabilité civile professionnelle souscrite auprès d&apos;un
              assureur d&apos;exemple.
            </p>
            <p>
              L&apos;outil « Votre première facture » fonctionne dans votre navigateur : rien n&apos;est
              envoyé ni enregistré. Il vérifie six mentions de base, une partie seulement des
              mentions obligatoires ; son tampon n&apos;est pas une certification. Le billet et la
              facture encadrés sont des dessins imaginaires, jamais la reproduction d&apos;un billet
              en euros. Le téléphone affiché appartient à la tranche que l&apos;ARCEP réserve aux
              œuvres de fiction.
            </p>
          </>
        }
      />
    </main>
  );
}
