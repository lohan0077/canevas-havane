import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { SOMBRE } from "../_composants/Blocs";
import { Rosace } from "../_composants/Ornements";
import { cabinet } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales et crédits — Premier Billet, site de démonstration",
  description: "Premier Billet est un cabinet d'expertise comptable fictif : qui a réalisé ce site de démonstration, ce qu'il ne collecte pas, et d'où viennent ses photos.",
  ...adressesDeLaPage("/exemples/premier-billet/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <main style={SOMBRE} className="kit-grain relative isolate overflow-hidden bg-[var(--fond)] pt-24 text-[var(--encre)] [&_a]:text-[#E0C25A]">
      <Rosace className="pointer-events-none absolute -right-60 -top-40 -z-10 h-[44rem] w-[44rem] text-[#C9A227] opacity-20" />
      <MentionsDemonstration
        site="premier-billet"
        entreprise="Premier Billet"
        polices="Bodoni Moda, DM Sans et Caveat"
        enPlus={
          <>
            <p>
              Sur un vrai site, cette page porterait les mentions propres à l&apos;expertise
              comptable. Ici, elles sont des exemples : {cabinet.ordre} ; titre professionnel :
              expert-comptable, diplôme délivré en France ; règles professionnelles : code de
              déontologie des professionnels de l&apos;expertise comptable (décret n° 2012-432 du
              30 mars 2012) ; assurance de responsabilité civile professionnelle souscrite auprès
              d&apos;un assureur d&apos;exemple.
            </p>
            <p>
              Le site ne se compare à aucun autre cabinet (décret n° 2012-432, art. 152). Le délai
              de réponse et les honoraires affichés sont des exemples ; sur un vrai site, ils
              doivent être exacts et justifiables, et les honoraires sont convenus par écrit avant
              toute mission (ordonnance n° 45-2138, art. 24). Prix hors taxes : la clientèle est
              professionnelle.
            </p>
            <p>
              L&apos;outil « Votre première facture » fonctionne dans votre navigateur : rien
              n&apos;est envoyé ni enregistré. Il vérifie six mentions de base, une partie seulement
              des mentions obligatoires ; son tampon n&apos;est pas une certification. La facture
              encadrée et la rosace sont des dessins imaginaires, jamais la reproduction d&apos;un
              billet en euros. Le téléphone affiché appartient à la tranche que l&apos;ARCEP réserve
              aux œuvres de fiction.
            </p>
            <p>
              Ce site réunit les deux vidéos des experts-comptables : « Créer une marque » (le nom,
              la première facture qu&apos;on fête, l&apos;outil, le cadre) et « Remplir
              l&apos;agenda » (les honoraires par mois selon le statut, le délai de réponse publié
              chaque mois).
            </p>
          </>
        }
      />
    </main>
  );
}
