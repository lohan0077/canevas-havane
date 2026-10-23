import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { EnTetePage } from "../_composants/Blocs";
import { atelier } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales et crédits — À Garder, site de démonstration",
  description: "À Garder est une imprimerie fictive : qui a réalisé ce site de démonstration, ce qu'il ne collecte pas, et d'où viennent ses images.",
  ...adressesDeLaPage("/exemples/a-garder/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <main>
      <EnTetePage surtitre="À savoir" titre="Une imprimerie *qui n'existe pas.*" />
      <MentionsDemonstration
        site="a-garder"
        entreprise="À Garder"
        polices="Instrument Serif et Zilla Slab"
        enPlus={
          <>
            <p>
              Ce site réunit les deux vidéos des imprimeurs : « Créer une marque » (l&apos;imprimerie
              qui n&apos;imprime que ce qu&apos;on garde, le papier envoyé par la poste avant la commande,
              les menus du restaurant d&apos;en face) et « Remplir l&apos;agenda » (l&apos;enseigne posée sur
              la photo de la façade, l&apos;avant / après, le dossier en mairie préparé).
            </p>
            <p>
              Les prix sont des exemples : toutes taxes comprises pour les particuliers (faire-part,
              menus de fête, cartes), hors taxes pour les commerces (enseignes, menus de restaurant),
              et la page le dit à chaque fois. Les prénoms des faire-part (« Léa &amp; Tom ») et le
              « Restaurant d&apos;exemple » sont inventés : aucun vrai restaurant n&apos;est nommé, et le
              menu imprimé n&apos;affiche aucun prix. Les façades sont dessinées et portent un nom de
              métier (« Boulangerie », « Librairie »), jamais le nom d&apos;un commerce.
            </p>
            <p>
              Le dossier d&apos;autorisation est décrit d&apos;après le Code de l&apos;environnement, dans sa
              version en vigueur depuis le 1er juillet 2026 : autorisation exigée dans certains lieux
              seulement (art. L. 581-18), trois pièces pour tout projet — mise en situation, vue avec
              et sans l&apos;enseigne, document graphique d&apos;intégration (art. R. 581-16) —, demande
              présentée par l&apos;exploitant et déposée en mairie en trois exemplaires (art. R. 581-9),
              décision sous deux mois (art. R. 581-13). Aucune enseigne du site ne clignote
              (art. R. 581-59). Ces informations sont générales ; le règlement local de publicité de
              chaque commune s&apos;applique.
            </p>
            <p>
              La boîte d&apos;échantillons ne demande aucune adresse et n&apos;envoie rien. Le montage
              « avant / après » fonctionne dans le navigateur : la photo choisie est lue sur
              l&apos;appareil et n&apos;est jamais envoyée. L&apos;adresse de l&apos;atelier, le SIRET
              ({atelier.siret}) et le numéro {atelier.telephone}, pris dans une tranche que
              l&apos;ARCEP réserve aux œuvres de fiction, sont des exemples. La première mise en page
              s&apos;inspirait du modèle « Kairo Studio » de la bibliothèque MotionSites, transposé à une
              imprimerie.
            </p>
          </>
        }
      />
    </main>
  );
}
