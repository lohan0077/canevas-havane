import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { EnTetePage } from "../_composants/Blocs";

export const metadata: Metadata = {
  title: "Mentions légales et crédits — Voix Basse, site de démonstration",
  description: "Voix Basse est un cabinet vétérinaire fictif : qui a réalisé ce site de démonstration, ce qu'il ne collecte pas, et d'où viennent ses photos.",
  ...adressesDeLaPage("/exemples/voix-basse/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <main>
      <EnTetePage surtitre="Mentions légales" titre="Ce qui est vrai, *ce qui est inventé.*" titreBalise="p" />
      <MentionsDemonstration
        site="voix-basse"
        entreprise="Voix Basse"
        polices="Instrument Serif, Manrope et Caveat"
        enPlus={
          <>
            <p>
              Sur un vrai site, cette page porterait les mentions propres aux vétérinaires. Ici,
              elles sont des exemples : vétérinaires inscrits au tableau de l&apos;Ordre des
              vétérinaires, conseil régional d&apos;exemple, numéros ordinaux 00000 et 00000 ;
              titre professionnel : docteur vétérinaire, diplôme délivré en France ; règles
              professionnelles : code de déontologie vétérinaire (Code rural et de la pêche
              maritime, articles R242-32 et suivants) ; assurance de responsabilité civile
              professionnelle souscrite auprès d&apos;un assureur d&apos;exemple.
            </p>
            <p>
              Le site dit « cabinet vétérinaire » : l&apos;appellation « clinique vétérinaire » est
              réservée aux établissements qui en remplissent les conditions (Code rural,
              art. R242-54). Il ne publie ni avis ni comparaison avec un autre cabinet
              (art. R242-35) : « Ici, on parle bas » décrit ce cabinet, et rien d&apos;autre. Les
              prix sont des exemples, TTC et datés, avec ce qu&apos;ils comprennent et ce qui peut
              s&apos;y ajouter (art. R242-35).
            </p>
            <p>
              « Viens pour rien » est une visite sans soin et sans frais. Avant d&apos;en faire un
              vrai lancement, un cabinet demande l&apos;accord de son conseil régional de
              l&apos;Ordre (la profession ne se pratique pas comme un commerce, art. R242-33) :
              Canevas Havane le fait vérifier quand un vrai cabinet commande ce site.
            </p>
            <p>
              Le calendrier de la première année est un exemple de protocole, pas une
              prescription. Le service de garde, son adresse et son numéro sont fictifs ; la
              garde de nuit est assurée, sur un vrai site, par une convention entre vétérinaires
              (art. R242-48). Les téléphones affichés appartiennent à la tranche que l&apos;ARCEP
              réserve aux œuvres de fiction. La date de naissance tapée sur l&apos;accueil reste
              dans le navigateur.
            </p>
            <p>
              Ce site réunit les deux vidéos des vétérinaires : « Créer une marque » (le nom, la
              question du stress, le créneau calme, viens pour rien) et « Remplir l&apos;agenda »
              (la date de naissance et sa première année, le visage du soir, la page de garde,
              les prix datés).
            </p>
          </>
        }
      />
    </main>
  );
}
