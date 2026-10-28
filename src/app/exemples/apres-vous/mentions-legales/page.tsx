import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import TitreRevele from "../../_kit/TitreRevele";
import { ACCENT, Surtitre } from "../_composants/Blocs";
import { entreprise } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales et crédits — Après Vous, site de démonstration",
  description: "Après Vous est une entreprise fictive : qui a réalisé ce site de démonstration, ce qu'il ne collecte pas, et d'où viennent ses photos.",
  ...adressesDeLaPage("/exemples/apres-vous/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <main>
      <section className="kit-grain relative overflow-hidden border-b border-[var(--trait)] bg-[var(--sombre)]">
        <div className="mx-auto max-w-3xl space-y-6 px-5 pb-14 pt-36 md:pt-44">
          <Apparition><Surtitre>Mentions légales</Surtitre></Apparition>
          <TitreRevele
            as="p"
            auChargement
            texte="Ce qui est inventé, *ce qui est vrai.*"
            className="font-[family-name:var(--titres)] text-[clamp(2.8rem,7vw,5.5rem)] leading-[0.95]"
            classeAccent={ACCENT}
          />
        </div>
      </section>
      <MentionsDemonstration
        site="apres-vous"
        entreprise="Après Vous"
        polices="Instrument Serif et Manrope"
        enPlus={
          <>
            <p>
              Sur un vrai site, cette page nommerait l&apos;entreprise, son adresse et son numéro SIRET. Ici, tout est
              exemple : SIRET {entreprise.siret}, 12 rue de l&apos;Exemple, 00000 Exemple-Ville. Le téléphone affiché,{" "}
              {entreprise.telephone}, appartient à la tranche que l&apos;ARCEP réserve aux œuvres de fiction.
            </p>
            <p>
              <strong>Les agents.</strong> Aucune donnée nominative : ni nom, ni prénom, ni visage — «&nbsp;{entreprise.equipe}&nbsp;».
              Les silhouettes sont dessinées. Publier le prénom ou la photo d&apos;un salarié demanderait son accord écrit,
              libre et retirable (Code civil, art. 9 ; RGPD).
            </p>
            <p>
              <strong>Le rapport de passage.</strong> Il contient des informations sur le travail des agents (heures
              d&apos;arrivée et de départ) : chaque salarié en est informé avant sa mise en place (Code du travail,
              art. L1222-4), et le comité social et économique est consulté quand l&apos;entreprise en a un
              (art. L2312-38). Le rapport ne nomme aucun agent. Les rapports affichés sont des exemples.
            </p>
            <p>
              <strong>Prix.</strong> Le site s&apos;adresse à des professionnels : les prix sont affichés hors taxes, et le
              site le dit. Ce sont des exemples ; le prix ferme vient au devis, après visite. «&nbsp;Vous ne nous verrez
              jamais&nbsp;» décrit l&apos;horaire de passage de tous les contrats de l&apos;entreprise imaginée : le soir,
              après le départ du client. L&apos;affiche est posée avec l&apos;accord du gestionnaire de l&apos;immeuble.
            </p>
            <p>
              Ce site réunit les deux vidéos du nettoyage : «&nbsp;Créer une marque&nbsp;» (le nom Après Vous,
              l&apos;équipe du soir, le petit mot, la série «&nbsp;Un bureau, la nuit&nbsp;») et «&nbsp;Remplir
              l&apos;agenda&nbsp;» (le rapport de passage chaque soir, la grille de prix en ligne). Les deux sites de
              démonstration d&apos;origine n&apos;en font plus qu&apos;un.
            </p>
          </>
        }
      />
    </main>
  );
}
