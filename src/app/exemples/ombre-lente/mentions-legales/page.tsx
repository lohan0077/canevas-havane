import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { EnTetePage } from "../_composants/Blocs";
import { CONTACT, PHOTOS } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales et crédits — Ombre Lente, site de démonstration",
  description: "Ombre Lente est une pépinière fictive : qui a réalisé ce site de démonstration, ce qu'il ne collecte pas, et d'où viennent ses photos.",
  ...adressesDeLaPage("/exemples/ombre-lente/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <main>
      <EnTetePage surtitre="Ombre Lente" titre="Mentions *légales.*" photo={PHOTOS.feuilles} />
      <div className="[&_h1]:hidden [&_h2]:font-normal">
        <MentionsDemonstration
          site="ombre-lente"
          entreprise="Ombre Lente"
          polices="Instrument Serif et Manrope"
          enPlus={
            <>
              <p>
                Sur un vrai site, on lirait ici le nom de la pépinière, son numéro SIRET (exemple :
                000 000 000 00000), son adresse et son numéro d&apos;enregistrement au registre officiel
                des opérateurs professionnels de végétaux (exemple : FR 00000). Les prix sont affichés
                TTC ; ce sont des exemples, comme les frais de livraison.
              </p>
              <p>
                Tout végétal destiné à la plantation vendu à distance voyage avec son passeport
                phytosanitaire (règlement (UE) 2016/2031, art. 79, 81 et 83) : les étiquettes montrées
                sont des exemples. Les hauteurs à vingt ans et les années de première récolte sont des
                estimations d&apos;exemple, pas des promesses : elles dépendent de l&apos;essence, de la
                variété, du porte-greffe, du sol et de l&apos;entretien. Un arbre qui dépassera deux
                mètres se plante à deux mètres au moins de la limite de propriété, sauf règlement ou
                usage local contraire (Code civil, art. 671).
              </p>
              <p>
                Le numéro affiché, {CONTACT.telephone}, appartient à la tranche que l&apos;ARCEP réserve
                aux œuvres de fiction : il ne sonne chez personne. L&apos;adresse est inventée. Aucune
                photo de client n&apos;est montrée : les vignettes du film sont des dessins.
              </p>
              <p>
                Ce site réunit les deux vidéos des jardineries : « Créer une marque » (le nom Ombre
                Lente, l&apos;ombre de dans vingt ans, le passeport sur chaque fiche, le film de vingt
                ans) et « Remplir l&apos;agenda » (la première récolte annoncée variété par variété, le
                passeport en photo, la plantation de tous le 25 novembre, la commande sur le site).
              </p>
            </>
          }
        />
      </div>
    </main>
  );
}
