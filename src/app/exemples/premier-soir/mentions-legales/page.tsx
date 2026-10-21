import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { entreprise } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales · Premier Soir — site de démonstration",
  description: "Premier Soir est une entreprise fictive : qui a réalisé ce site de démonstration, ce qu'il collecte, et d'où viennent ses photos.",
  ...adressesDeLaPage("/exemples/premier-soir/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <MentionsDemonstration
      site="premier-soir"
      entreprise="Premier Soir"
      polices="DM Serif Display et Figtree"
      enPlus={
        <>
          <p>
            Sur un vrai site, cette page nommerait l'entreprise, son adresse et son numéro SIRET.
            Ici, tout est exemple : SIRET {entreprise.siret}, 12 rue de l'Exemple, 00000
            Exemple-Ville. Le téléphone affiché, {entreprise.telephone}, appartient à la tranche que
            l'ARCEP réserve aux œuvres de fiction.
          </p>
          <p>
            <strong>La promesse.</strong> « Ce soir, tu dors dans ton lit » ne vaut que pour un
            déménagement livré dans la journée (moins de {entreprise.seuilKm} km et {entreprise.seuilM3} m³ dans
            cet exemple) et pour ce qui est coché au devis ; le site, l'affiche et l'outil « On remonte
            quoi ? » le disent. Une promesse sans limite serait trompeuse sur les résultats attendus
            du service (Code de la consommation, art. L121-2).
          </p>
          <p>
            <strong>Devis et prix.</strong> Le devis est remis gratuitement avant tout contrat, avec
            la prestation exacte, le montant HT et TTC et la mention que ce prix est définitif (arrêté
            du 27 avril 2010 relatif à la publicité des prix des prestations de déménagement, art. 1).
            Les prix et durées affichés sont des exemples.
          </p>
          <p>
            Le premier écran s'inspire du modèle « Camper Overnight » de la bibliothèque MotionSites,
            transposé à un immeuble à la nuit tombée.
          </p>
        </>
      }
    />
  );
}
