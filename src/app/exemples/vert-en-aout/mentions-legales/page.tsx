import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { EnTetePage } from "../_composants/Blocs";
import { CONTACT, SAP } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales et crédits — Vert en Août, site de démonstration",
  description: "Vert en Août est un paysagiste fictif : qui a réalisé ce site de démonstration, ce qu'il ne collecte pas, et d'où viennent ses images.",
  ...adressesDeLaPage("/exemples/vert-en-aout/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <main>
      <EnTetePage surtitre="Mentions légales" titre="Un paysagiste *fictif.*">
        Vert en Août n&apos;existe pas : son nom, ses prix, ses devis, ses dates et ses semaines sont
        inventés pour les vidéos de Canevas Havane.
      </EnTetePage>
      <MentionsDemonstration
        site="vert-en-aout"
        entreprise="Vert en Août"
        polices="Figtree, Lora et Caveat"
        enPlus={
          <>
            <p>
              Ce site réunit les deux vidéos des paysagistes : « Créer une marque » (le nom Vert en
              Août, la commune qui donne les plantes adaptées à l&apos;été, la ligne d&apos;arrosage du
              devis, l&apos;affiche des restrictions, l&apos;album du 15 août) et « Remplir l&apos;agenda »
              (trois photos prises de la fenêtre, le croquis d&apos;hiver et le chantier au printemps,
              une page par arbre, l&apos;entretien et son crédit d&apos;impôt).
            </p>
            <p>
              Ce que dirait un vrai paysagiste, ici avec des numéros d&apos;exemple : SIRET 000 000 000
              00000 · exemple ; assurance décennale pour les travaux qui en relèvent (assureur et numéro
              de contrat · exemple). L&apos;entretien est assuré par {SAP.entreprise}, entreprise
              distincte déclarée services à la personne ({SAP.numero}), dont c&apos;est l&apos;activité
              exclusive ; la création n&apos;ouvre pas droit au crédit d&apos;impôt (CGI, art. 199
              sexdecies ; C. trav., L7232-1-1, L7232-1-2, D7231-1 ; circulaire du 3 janvier 2025,
              § I-5.2). Le devis montré, ses postes, ses quantités, son taux de TVA et ses prix sont des
              exemples ; les prix de l&apos;entretien sont ceux d&apos;une micro-entreprise en franchise
              (TVA non applicable, art. 293 B du CGI).
            </p>
            <p>
              Aucun jardin n&apos;est promis « sans arrosage » : la première année, il faut arroser. Le
              climat de l&apos;outil « Ta commune » est un exemple (un vrai site citerait les normales
              climatiques officielles de la commune). Les restrictions d&apos;eau sont présentées
              d&apos;après service-public.gouv.fr (« Êtes-vous concerné par des restrictions d&apos;eau ? »,
              7 juillet 2026). Les trois photos choisies restent sur votre appareil. L&apos;album du 15
              août est vide : aucune photo de jardin n&apos;est inventée, et les photos du site sont des
              illustrations, pas des jardins de l&apos;entreprise. Aucun avis, aucune note.
            </p>
            <p>
              Le numéro {CONTACT.telephone} appartient à la tranche que l&apos;ARCEP réserve à la
              fiction ; l&apos;adresse est inventée.
            </p>
          </>
        }
      />
    </main>
  );
}
