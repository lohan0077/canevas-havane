import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { atelier } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales · Sortie de Four — site de démonstration",
  description: "Sortie de Four est un atelier de céramique fictif : qui a réalisé ce site de démonstration, ce qu'il collecte, et d'où viennent ses images.",
  ...adressesDeLaPage("/exemples/sortie-de-four/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <div>
      <MentionsDemonstration
        site="sortie-de-four"
        entreprise="Sortie de Four"
        polices="Instrument Serif, DM Sans et Caveat"
        enPlus={
          <>
            <p>
              Comme le ferait un vrai atelier, ce site affiche une adresse ({atelier.adresse}), un
              numéro SIRET ({atelier.siret}) et un téléphone ({atelier.telephone}) : trois mentions
              d&apos;exemple. Le numéro appartient à une tranche que l&apos;ARCEP réserve aux œuvres de
              fiction.
            </p>
            <p>
              « Pièce unique » est pris au pied de la lettre : chaque numéro n&apos;existe qu&apos;une fois,
              et « Partie » veut dire vendue. Le site n&apos;affiche ni « bientôt épuisé » ni compte à
              rebours : déclarer faussement qu&apos;un produit ne sera disponible que très peu de temps
              est une pratique commerciale trompeuse (code de la consommation, art. L121-4, 7°).
              Les dates d&apos;ouverture du four sont de vraies dates du calendrier ; les pièces, leurs
              états et leurs prix (TTC) sont des exemples.
            </p>
            <p>
              Le site ne dit ni « artisan d&apos;art » ni « maître artisan » : ces titres sont réservés
              aux personnes qui y ont droit (loi n° 96-603 du 5 juillet 1996, art. 20 ; décret
              n° 98-247 ; arrêté du 24 décembre 2015 fixant la liste des métiers d&apos;art), et rien
              ne l&apos;établit pour un atelier imaginaire. Sur un vrai site, la vidéo d&apos;une pièce
              est celle de son tournage ; ici, c&apos;est une animation.
            </p>
            <p>
              Comme pour tout achat à distance, l&apos;acheteur dispose de quatorze jours pour se
              rétracter (code de la consommation, art. L221-18). L&apos;ouverture de la page
              s&apos;inspire du modèle « Kairo Studio » de la bibliothèque MotionSites, transposé à un
              atelier de céramique.
            </p>
          </>
        }
      />
    </div>
  );
}
