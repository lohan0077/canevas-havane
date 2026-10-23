import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import { CommeTous, EnTetePage, Etiquette } from "../_composants/Blocs";
import RendezVous from "../_composants/RendezVous";
import { PREPARER, cabinet, photos } from "../_composants/donnees";

// La vidéo « Remplir l'agenda » : « Et le rendez-vous se prend en ligne. Ton numéro de
// certification, bien en vue. » C'est le propriétaire qui choisit son diagnostiqueur et
// son créneau. Créneaux d'exemple ; rien n'est envoyé.
export const metadata: Metadata = {
  title: "Rendez-vous — Tiers Regard, site de démonstration",
  description: "Choisir son créneau de diagnostic immobilier en ligne, la certification en vue, et ce qu'il faut préparer pour la visite. Exemple d'un diagnostiqueur imaginaire.",
  ...adressesDeLaPage("/exemples/tiers-regard/rendez-vous"),
};

export default function PageRendezVous() {
  return (
    <main>
      <EnTetePage etiquette="Rendez-vous" titre="Ton créneau, *en ligne.*" photo={photos.salon} origine="45% 45%">
        C&apos;est toi qui commandes ton diagnostic, et toi qui choisis ton diagnostiqueur. Une à trois
        heures sur place, selon le bien (exemple).
      </EnTetePage>
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-8 md:py-20 lg:grid-cols-[1.1fr_0.9fr]">
        <div id="agenda">
          <Apparition de="zoom">
            <RendezVous />
          </Apparition>
        </div>
        <div className="space-y-6">
          <Apparition className="space-y-4 rounded-[1.25rem] border border-[var(--trait)] bg-[var(--carte)] p-6">
            <h2 className="font-[family-name:var(--titres)] text-[24px] font-semibold tracking-[-0.03em]">Ce qu&apos;il faut préparer</h2>
            <ul className="space-y-3">
              {PREPARER.map((p) => (
                <li key={p} className="flex gap-3 text-[16px] leading-relaxed">
                  <span aria-hidden="true" className="mt-[0.7em] h-1.5 w-1.5 shrink-0 bg-[var(--accent)]" />
                  {p}
                </li>
              ))}
            </ul>
          </Apparition>
          <Apparition delai={150} className="space-y-3">
            <Etiquette>Comme tout diagnostiqueur</Etiquette>
            <CommeTous className="text-[var(--doux)]" />
            <p className="text-[15px] text-[var(--doux)]">Ou par téléphone : <span className="font-semibold tabular-nums text-[var(--encre)]">{cabinet.telephone}</span> (numéro de fiction).</p>
          </Apparition>
        </div>
      </section>
    </main>
  );
}
