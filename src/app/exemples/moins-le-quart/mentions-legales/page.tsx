import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { EnTetePage } from "../_composants/Blocs";
import { maison } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales et crédits — Moins le Quart, site de démonstration",
  description: "Moins le Quart est une marque fictive : qui a réalisé ce site de démonstration, ce qu'il ne collecte pas, et d'où viennent ses images.",
  ...adressesDeLaPage("/exemples/moins-le-quart/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <main>
      <EnTetePage surtitre="Site de démonstration" titre="Ce qui est *inventé.*" balise="p" />
      <MentionsDemonstration
        site="moins-le-quart"
        entreprise="Moins le Quart"
        polices="Sora et Lora"
        enPlus={
          <>
            <p>
              Ce site réunit les deux vidéos des torréfacteurs : « Créer une marque » (chaque café porte
              une heure, l&apos;accueil suit la tienne et propose le déca le soir) et « Remplir le carnet
              de commandes » (« tu fais ton café comment ? », la mouture et les deux cafés pour ta
              cafetière, la date de torréfaction en gros, l&apos;abonnement réglé en tasses).
            </p>
            <p>
              Mentions qu&apos;afficherait la vraie marque, ici avec des valeurs d&apos;exemple : Moins le
              Quart, SIRET 000 000 000 00000 (exemple), {maison.adresse}, {maison.ville} (adresse
              fictive). Le téléphone {maison.telephone} appartient à la tranche que l&apos;ARCEP réserve
              aux œuvres de fiction.
            </p>
            <p>
              L&apos;accueil lit l&apos;heure de ton téléphone pour te proposer un café, et la date de
              torréfaction affichée est le dernier mardi, calculé de même : tout reste dans ton
              navigateur, rien n&apos;est envoyé. « Au réveil », « pour la pause », « le soir » désignent
              des moments de la journée : le site ne prête au café ni au décaféiné aucun effet
              (règlement (CE) n° 1924/2006). Le « 7 g par tasse » de l&apos;abonnement est un repère
              d&apos;exemple, pas une recommandation. Café seulement : aucune boisson alcoolique. Cafés,
              quantités et prix TTC d&apos;exemple ; rien n&apos;est payé en ligne.
            </p>
          </>
        }
      />
    </main>
  );
}
