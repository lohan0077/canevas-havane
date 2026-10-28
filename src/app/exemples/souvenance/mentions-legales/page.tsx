import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { EnTetePage } from "../_composants/Blocs";
import { CONTACT } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales et crédits — Souvenance, site de démonstration",
  description: "Souvenance est une savonnerie fictive : qui a réalisé ce site de démonstration, ce qu'il ne collecte pas, et d'où viennent ses images.",
  ...adressesDeLaPage("/exemples/souvenance/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <main>
      <EnTetePage surtitre="Souvenance · site de démonstration" titre="Ce qui est *inventé.*" titreEnParagraphe />
      <MentionsDemonstration
        site="souvenance"
        entreprise="Souvenance"
        polices="Bodoni Moda et Lora"
        enPlus={
          <>
            <p>
              Ce site réunit les deux vidéos des cosmétiques : « Créer une marque » (le nom, la question « ça sentait
              quoi, chez toi, enfant ? », l&apos;affiche du prochain savon) et « Remplir l&apos;agenda » (le numéro de
              lot en page d&apos;accueil, le séchoir et ses dates de sortie, la réservation du lot suivant).
            </p>
            <p>
              Ce qu&apos;une vraie marque de savons doit avoir fait avant le premier savon vendu, et qu&apos;elle
              indiquerait ici avec ses vrais numéros : un atelier déclaré auprès de la DGCCRF (code de la santé publique,
              art. L5131-2) ; une personne responsable établie dans l&apos;Union (règlement (CE) n° 1223/2009, art. 4) ;
              un rapport sur la sécurité de chaque savon, signé par l&apos;évaluateur (art. 10) ; la notification de
              chaque savon sur le portail européen CPNP (art. 13). Personne responsable fictive : Souvenance, 12 rue de
              l&apos;Exemple · exemple. SIRET 000 000 000 00000 · exemple.
            </p>
            <p>
              Les étiquettes montrées suivent l&apos;article 19 du règlement : contenu, date de durabilité minimale,
              numéro de lot, fonction, précautions, liste des ingrédients précédée de « Ingredients ». Les lots, les
              dates, les quantités, les listes d&apos;ingrédients et les prix sont des exemples. Aucune allégation sur
              la peau n&apos;est faite (art. 20 ; règlement (UE) n° 655/2013). Aucun décompte de réponses n&apos;est
              affiché : il n&apos;y en a pas. Le numéro {CONTACT.telephone} appartient à la tranche que l&apos;ARCEP
              réserve à la fiction ; l&apos;adresse est inventée.
            </p>
          </>
        }
      />
    </main>
  );
}
