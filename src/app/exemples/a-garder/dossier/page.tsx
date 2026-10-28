import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, EnTetePage, Surtitre } from "../_composants/Blocs";
import Dossier from "../_composants/Dossier";

// La page « Le dossier en mairie ». La vidéo « Remplir l'agenda » : « Le dossier, tu le
// prépares. Ton client n'a plus qu'à le signer et le déposer. » Les articles cités ont
// été lus sur Légifrance pour la vidéo (versions en vigueur depuis le 01/07/2026) :
// voir Videos/agenda-imprimeurs/SOURCES.md.
export const metadata: Metadata = {
  title: "Le dossier en mairie — À Garder, site de démonstration",
  description: "Le dossier d'autorisation d'enseigne, pièce par pièce : quand il est exigé, ce qu'il contient, qui le signe et le dépose. Démonstration d'une imprimerie imaginaire.",
  ...adressesDeLaPage("/exemples/a-garder/dossier"),
};

const LIEUX = [
  "Sur un immeuble classé ou inscrit au titre des monuments historiques, et aux abords d'un monument historique",
  "Dans un site patrimonial remarquable, un site classé ou inscrit, un parc naturel régional",
  "Dans une commune couverte par un règlement local de publicité",
];

export default function LeDossier() {
  return (
    <main>
      <EnTetePage nuit surtitre="Le dossier en mairie" titre="On prépare. *Tu signes, tu déposes.*">
        Une enseigne n&apos;a pas toujours besoin d&apos;autorisation. Quand il en faut une, la demande vient
        de toi, l&apos;exploitant de la boutique : nous, on monte les pièces.
      </EnTetePage>

      <section className="mx-auto grid max-w-6xl gap-14 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-10">
          <div className="space-y-5">
            <Apparition><Surtitre>Trois pièces, pour toute enseigne</Surtitre></Apparition>
            <TitreRevele
              texte="Touche *chaque pièce.*"
              className="text-[clamp(2.6rem,5vw,4.4rem)] font-normal italic leading-[0.95] tracking-[-0.03em]"
              classeAccent="not-italic text-[var(--accent-texte)]"
            />
            <p className="text-lg leading-relaxed text-[var(--doux)]">
              La demande comporte une mise en situation de l&apos;enseigne, une vue de la façade avec
              et sans l&apos;enseigne, et un document graphique d&apos;intégration (art. R. 581-16, 1°).
              C&apos;est ce que l&apos;atelier prépare pour toi.
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-normal italic">Quand faut-il une autorisation&nbsp;?</h2>
            <p className="leading-relaxed text-[var(--doux)]">
              L&apos;installation d&apos;une enseigne est soumise à autorisation dans certains lieux (Code de
              l&apos;environnement, art. L. 581-18) :
            </p>
            <ul className="space-y-3">
              {LIEUX.map((l) => (
                <li key={l} className="flex gap-3 leading-relaxed">
                  <span aria-hidden="true" className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]" />
                  {l}
                </li>
              ))}
            </ul>
            <p className="text-sm leading-relaxed text-[var(--doux)]">
              Ailleurs, on pose sans demande, en respectant le règlement national. On vérifie pour ton
              adresse avant de dessiner.
            </p>
          </div>
        </div>
        <Apparition de="droite" className="lg:sticky lg:top-28 lg:self-start">
          <Dossier />
        </Apparition>
      </section>

      <section className="px-3 sm:px-5">
        <div className="kit-grain rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 sm:px-10 md:grid-cols-3">
            {[
              ["Qui dépose, et comment", "La demande est présentée par la personne ou l'entreprise qui exerce l'activité signalée. Elle part en trois exemplaires : par lettre recommandée, par voie électronique, ou déposée à la mairie (art. R. 581-9)."],
              ["Combien de temps", "La décision tombe dans les deux mois d'un dossier complet. Sans réponse dans ce délai, l'autorisation est réputée accordée dans les termes demandés (art. R. 581-13)."],
              ["Dans un lieu protégé", "Trois pièces de plus : un plan de coupe de la façade, deux photographies de l'environnement, la description des matériaux (art. R. 581-16, 2°). Et l'accord de l'architecte des Bâtiments de France ou du préfet, selon le lieu (art. R. 581-16-1)."],
            ].map(([t, x], i) => (
              <Apparition key={t} delai={i * 120} className="space-y-3">
                <h2 className="font-[family-name:var(--titres)] text-3xl font-normal italic text-[#F5C76A]">{t}</h2>
                <p className="leading-relaxed">{x}</p>
              </Apparition>
            ))}
          </div>
          <p className="mx-auto max-w-3xl px-6 pb-16 text-center text-[15px] leading-relaxed">
            Information générale, à jour des articles en vigueur depuis le 1er juillet 2026. Le
            règlement local de publicité de chaque commune s&apos;applique et peut être plus strict que le
            règlement national.
          </p>
        </div>
      </section>

      <div className="h-20" />
      <AppelFinal />
    </main>
  );
}
