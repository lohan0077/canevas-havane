import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { CONTACT, SAP } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Vue Cadrée — site de démonstration",
  description: "Vue Cadrée est un paysagiste fictif : qui a réalisé ce site de démonstration, ce qu'il collecte, et d'où viennent ses images.",
  ...adressesDeLaPage("/exemples/vue-cadree/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <main>
      <MentionsDemonstration
        site="vue-cadree"
        entreprise="Vue Cadrée"
        polices="Zilla Slab, Work Sans et Caveat"
        enPlus={
          <>
            <p>
              Deux entreprises fictives, comme le ferait un vrai paysagiste qui crée et entretient des jardins : Vue
              Cadrée pour la création (SIRET 000 000 000 00000 · exemple) ; {SAP.entreprise} pour l&apos;entretien,
              entreprise déclarée services à la personne ({SAP.numero}), dont c&apos;est l&apos;activité exclusive
              (code du travail, art. L7232-1-1 et L7232-1-2). Seul l&apos;entretien peut ouvrir droit au crédit
              d&apos;impôt (CGI, art. 199 sexdecies), et le site ne l&apos;affiche que là.
            </p>
            <p>
              Les prix sont donnés hors taxes et toutes taxes comprises ; la mention de l&apos;avantage fiscal est
              détachée du prix et écrite plus petit (arrêté du 17 mars 2015, art. 4 et 5). « TVA non applicable,
              art. 293 B du CGI » : exemple d&apos;une micro-entreprise en franchise ; cet article est remplacé au 1er
              janvier 2027 par la recodification du CGI. Prix, semaines et numéros sont des exemples. Les conseils de
              taille sont généraux, pour un arbre de jardin. Le numéro {CONTACT.telephone} appartient à la tranche que
              l&apos;ARCEP réserve à la fiction ; l&apos;adresse est inventée.
            </p>
            <p>
              Premier écran inspiré du modèle « Palomar Labs » de la bibliothèque MotionSites, transposé à un paysagiste.
              Croquis dessiné pour ce site.
            </p>
          </>
        }
      />
    </main>
  );
}
