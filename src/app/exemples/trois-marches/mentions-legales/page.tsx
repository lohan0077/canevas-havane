import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import Gravure from "../_composants/Gravure";

export const metadata: Metadata = {
  title: "Mentions légales et crédits — Trois Marches, site de démonstration",
  description: "Trois Marches est une agence immobilière fictive : qui a réalisé ce site de démonstration, ce qu'il ne collecte pas, et d'où viennent ses photos.",
  ...adressesDeLaPage("/exemples/trois-marches/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <main className="pt-24">
      <Gravure id="tm-mentions" className="mx-auto mt-6 w-full max-w-[520px] px-5 text-[var(--encre)]" />
      <div className="mx-4 mb-4 rounded-t-[3rem] rounded-b-[2rem] border border-[var(--trait)] bg-[var(--carte)] sm:mx-auto sm:max-w-4xl">
    <MentionsDemonstration
      site="trois-marches"
      entreprise="Trois Marches"
      polices="Playfair Display, Manrope et Caveat"
      enPlus={
        <>
          <p>
            Sur un vrai site, cette page porterait les mentions propres aux agents immobiliers. Ici,
            elles sont des exemples : Trois Marches, 8 rue de l&apos;Exemple, 69000 Lyon ; carte
            professionnelle « Transactions sur immeubles et fonds de commerce » n° CPI 0000 0000 0000
            0000, délivrée par la CCI de Lyon ; garantie financière apportée par un garant d&apos;exemple,
            dont le nom et l&apos;adresse sont indiqués ; assurance de responsabilité civile
            professionnelle et médiateur de la consommation d&apos;exemple (loi n° 70-9 du 2 janvier
            1970 ; décret n° 72-678 du 20 juillet 1972, art. 92 à 94).
          </p>
          <p>
            Chaque annonce donne le prix honoraires inclus en plus gros, le prix hors honoraires, les
            honoraires en pourcentage et qui les paie, et renvoie au barème (arrêté du 10 janvier 2017,
            art. 2 et 3) ; elle porte les classes énergie et climat et les dépenses d&apos;énergie
            estimées (code de la construction et de l&apos;habitation, art. L126-33). Les maisons, leurs
            histoires, les prénoms et les prix sont des exemples ; aucune annonce ne donne
            d&apos;adresse. Sur un vrai site, chaque récit serait publié avec l&apos;accord écrit de ceux
            qui l&apos;ont écrit, et la dernière photo ne serait prise qu&apos;avec l&apos;accord écrit de
            chacun — des deux parents pour un enfant — et jamais publiée. Le téléphone affiché
            appartient à la tranche que l&apos;ARCEP réserve aux œuvres de fiction.
          </p>
          <p>
            Le barème d&apos;accueil, le suivi du vendeur et les créneaux d&apos;estimation fonctionnent
            dans votre navigateur : rien n&apos;est envoyé ni enregistré. Les comptes rendus de visite
            sont des exemples ; les visiteurs n&apos;y sont jamais nommés.
          </p>
          <p>
            Ce site réunit les deux vidéos des agents immobiliers : « Créer une marque » (le nom,
            l&apos;histoire de chaque maison, la loi juste en dessous, la dernière photo sur le perron) et
            « Remplir l&apos;agenda » (le barème en page d&apos;accueil, le prix honoraires inclus en plus
            gros, le compte rendu de chaque visite le soir même, le bouton « Faire estimer ma maison »).
          </p>
          <p>
            Inspiration : les modèles « Heritage Grove » (papier crème, gravure au trait) et « Coastal
            Estate » de MotionSites (un très grand nom, des photos de maisons), transposés sans texte ni
            code repris. La gravure de la maison est dessinée pour ce site.
          </p>
        </>
      }
    />
      </div>
    </main>
  );
}
