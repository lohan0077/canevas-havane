import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { ACCENT, EnTetePage, Surtitre, TITRE, VersRendezVous } from "../_composants/Blocs";
import Moments from "../_composants/Moments";
import { moments, photos } from "../_composants/donnees";

// L'idée de la vidéo « Remplir l'agenda » : « pas de produits. Des moments de vie : je vends
// ma boîte, j'hérite, je pars à la retraite. » Filmé : le doigt touche chaque moment.
export const metadata: Metadata = {
  title: "Ce qui t'arrive — Dimanche Midi, site de démonstration",
  description:
    "Vendre sa boîte, hériter, partir à la retraite, attendre un enfant : chez un conseiller en gestion de patrimoine imaginaire, on part de ce qui t'arrive, pas d'un produit.",
  ...adressesDeLaPage("/exemples/dimanche-midi/moments"),
};

export default function PageMoments() {
  return (
    <main>
      <EnTetePage surtitre="Ce qui t'arrive" titre="D'abord ta vie, *ensuite l'argent.*" photo={photos.banc} origine="50% 55%">
        Touche ce qui t&apos;arrive : les questions à se poser, ce qu&apos;on regarde ensemble, et qui
        d&apos;autre consulter. Aucun produit nommé, aucun rendement promis.
      </EnTetePage>

      <section className="mx-auto grid grid-cols-1 max-w-7xl gap-12 px-4 py-16 sm:px-8 md:py-24 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
        <div className="space-y-6 px-1 lg:sticky lg:top-28">
          <Apparition><Surtitre>Quatre moments</Surtitre></Apparition>
          <TitreRevele texte="Les questions *d'abord.*" className={`text-[clamp(2.8rem,5.6vw,5rem)] ${TITRE}`} classeAccent={ACCENT} />
          <Apparition as="p" delai={150} className="text-[18px] leading-relaxed text-[var(--doux)]">
            Aucun placement n&apos;est proposé avant d&apos;avoir répondu à ces questions.
          </Apparition>
        </div>
        <Apparition de="zoom"><Moments detail /></Apparition>
      </section>

      <section className="border-t border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto max-w-7xl space-y-10 px-5 py-20 sm:px-8 md:py-28">
          <TitreRevele texte="Ce qu'on regarde, *moment par moment.*" className={`text-[clamp(2.6rem,5vw,4.6rem)] ${TITRE}`} classeAccent={ACCENT} />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {moments.map((m, i) => (
              <Apparition as="article" key={m.cle} delai={i * 100} className="space-y-4 rounded-[2rem] bg-[var(--fond)] p-7">
                <h2 className="font-[family-name:var(--titres)] text-[38px] italic leading-tight">{m.libelle}</h2>
                <ul className="space-y-2 text-[16px] leading-snug text-[var(--doux)]">
                  {m.ensemble.map((e) => (
                    <li key={e} className="flex gap-3">
                      <span aria-hidden="true" className="text-[var(--accent-texte)]">—</span>
                      {e}
                    </li>
                  ))}
                </ul>
                <p className="border-t border-[var(--trait)] pt-3 text-[15px] leading-relaxed"><span className="font-semibold">Qui d&apos;autre consulter : </span>{m.autres}</p>
              </Apparition>
            ))}
          </div>
        </div>
      </section>

      <VersRendezVous />
    </main>
  );
}
