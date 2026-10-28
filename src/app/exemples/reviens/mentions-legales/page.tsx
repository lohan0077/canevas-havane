import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { EnTetePage } from "../_composants/Blocs";
import { depot } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales et crédits — Reviens., site de démonstration",
  description: "Reviens. est un dépôt de matériel professionnel fictif : qui a réalisé ce site de démonstration, ce qu'il ne collecte pas, et d'où viennent ses photos.",
  ...adressesDeLaPage("/exemples/reviens/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <main>
      <EnTetePage surtitre="Site de démonstration" titre="Ce qui est *inventé.*" balise="p" />
      <MentionsDemonstration
        site="reviens"
        entreprise="Reviens."
        polices="Archivo et Work Sans"
        enPlus={
          <>
            <p>
              Ce site réunit les deux vidéos du matériel professionnel : « Créer une marque » (la marque
              Reviens., l&apos;outil gravé au prénom de son propriétaire, la gravure en direct, la journée
              gravure, l&apos;affiche) et « Remplir l&apos;agenda » (le bouton « En panne », la pièce trouvée
              d&apos;après la plaque avec le vrai stock, le comptoir du samedi soir, la liste du matériel
              pour ouvrir un restaurant).
            </p>
            <p>
              Comme le ferait un vrai fournisseur, ce site affiche une adresse ({depot.adresse}), un numéro
              SIRET ({depot.siret}) et un téléphone ({depot.telephone}) : trois mentions d&apos;exemple. Le
              numéro appartient à une tranche que l&apos;ARCEP réserve aux œuvres de fiction.
            </p>
            <p>
              La vente est réservée aux professionnels : les prix sont affichés hors taxes, avec le TTC à
              côté, et marqués « exemple ». Le stock affiché est présenté comme le vrai stock du dépôt, et
              le délai est écrit quand une pièce manque : annoncer un produit qu&apos;on ne peut pas fournir
              en quantité raisonnable est une pratique commerciale trompeuse (code de la consommation,
              art. L121-4, 5° et 7°), y compris entre professionnels (art. L121-5). Modèles, références,
              stocks et prix sont des exemples.
            </p>
            <p>
              Aucune marque réelle n&apos;apparaît : la plaque signalétique porte « FABRICANT », les modèles
              (AR-700, LV-500, FP-2…) sont inventés, les outils sont dessinés sans logo. La liste pour
              ouvrir un restaurant est la liste de base, pas l&apos;équipement complet. La photo de la plaque
              est simulée : le site ne demande pas l&apos;accès à l&apos;appareil photo.
            </p>
            <p>
              La journée gravure est gratuite et sans obligation d&apos;achat ; graver l&apos;outil d&apos;un
              autre fabricant peut toucher à sa garantie, et la page demande de le vérifier. L&apos;affiche
              n&apos;est posée que dans les dépôts qui l&apos;acceptent. Les prénoms sont inventés.
            </p>
          </>
        }
      />
    </main>
  );
}
