import type { Metadata } from "next";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER } from "../_composants/donnees";
import Dossier from "../_composants/Dossier";

// La page « Le dossier en mairie ». La vidéo : « Le dossier, tu le prépares. Ton
// client n'a plus qu'à le signer et le déposer. » Les articles cités ont été lus
// sur Légifrance pour la vidéo (versions en vigueur depuis le 01/07/2026) : voir
// Videos/agenda-imprimeurs/SOURCES.md.
export const metadata: Metadata = {
  title: "Façade Allumée — site de démonstration",
  description: "Le dossier d'autorisation d'enseigne, pièce par pièce : quand il est exigé, ce qu'il contient, qui le signe et le dépose. Démonstration d'un enseigniste imaginaire.",
  ...adressesDeLaPage("/exemples/facade-allumee/dossier"),
};

const LIEUX = [
  "Sur un immeuble classé ou inscrit au titre des monuments historiques, et aux abords d'un monument historique",
  "Dans un site patrimonial remarquable, un site classé ou inscrit, un parc naturel régional",
  "Dans une commune couverte par un règlement local de publicité",
];

export default function LeDossier() {
  return (
    <>
      <section className="mx-auto max-w-6xl space-y-6 px-5 pb-12 pt-14 sm:pt-20">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent-texte)]">Le dossier en mairie</p>
        <h1 className="max-w-4xl text-5xl sm:text-7xl">
          On prépare. <span className="italic text-[var(--accent-texte)]">Tu signes, tu déposes.</span>
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-[var(--doux)]">
          Une enseigne n&apos;a pas toujours besoin d&apos;autorisation. Quand il en faut une, la
          demande vient de toi, l&apos;exploitant de la boutique : nous, on monte les pièces.
        </p>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-5 pb-20 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl">Quand faut-il une autorisation&nbsp;?</h2>
            <p className="leading-relaxed text-[var(--doux)]">
              L&apos;installation d&apos;une enseigne est soumise à autorisation dans certains lieux
              (Code de l&apos;environnement, art. L. 581-18) :
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
              Ailleurs, on pose sans demande, en respectant le règlement national. On vérifie pour
              ton adresse avant de dessiner.
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-4xl">Trois pièces, pour toute enseigne</h2>
            <p className="leading-relaxed text-[var(--doux)]">
              La demande comporte une mise en situation de l&apos;enseigne, une vue de la façade
              avec et sans l&apos;enseigne, et un document graphique d&apos;intégration (art. R. 581-16,
              1°). Touche chaque pièce : c&apos;est ce que l&apos;atelier prépare pour toi.
            </p>
          </div>
        </div>
        <Dossier />
      </section>

      <section className="border-y border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:py-20 md:grid-cols-3">
          <div className="space-y-3">
            <h2 className="text-3xl">Qui dépose, et comment</h2>
            <p className="leading-relaxed text-[var(--doux)]">
              La demande est présentée par la personne ou l&apos;entreprise qui exerce l&apos;activité
              signalée. Elle part en trois exemplaires : par lettre recommandée, par voie
              électronique, ou déposée à la mairie (art. R. 581-9).
            </p>
          </div>
          <div className="space-y-3">
            <h2 className="text-3xl">Combien de temps</h2>
            <p className="leading-relaxed text-[var(--doux)]">
              La décision tombe dans les deux mois d&apos;un dossier complet. Sans réponse dans ce
              délai, l&apos;autorisation est réputée accordée dans les termes demandés
              (art. R. 581-13).
            </p>
          </div>
          <div className="space-y-3">
            <h2 className="text-3xl">Dans un lieu protégé</h2>
            <p className="leading-relaxed text-[var(--doux)]">
              Trois pièces de plus : un plan de coupe de la façade, deux photographies de
              l&apos;environnement, la description des matériaux (art. R. 581-16, 2°). Et l&apos;accord de
              l&apos;architecte des Bâtiments de France ou du préfet, selon le lieu (art. R. 581-16-1).
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl space-y-6 px-5 py-16 text-center sm:py-20">
        <p className="text-sm leading-relaxed text-[var(--doux)]">
          Information générale, à jour des articles en vigueur depuis le 1er juillet 2026. Le
          règlement local de publicité de chaque commune s&apos;applique et peut être plus strict
          que le règlement national.
        </p>
        <Link href={DOSSIER} className="inline-flex min-h-[52px] items-center rounded-full bg-[var(--accent)] px-7 font-bold text-[var(--sur-accent)]">
          Commencer par la photo de ta façade
        </Link>
      </section>
    </>
  );
}
