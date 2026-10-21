import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import { NOTES, photos } from "../_composants/donnees";
import TaVie from "../_composants/TaVie";

export const metadata: Metadata = {
  title: "Ta vie, ton plan · Sept Mille Dîners — site de démonstration",
  description: "Trois questions sur ta vie — combien à table, qui cuisine, qui fait la vaisselle — et le plan de cuisine qui va avec. Marque de cuisines imaginaire, site de démonstration.",
  ...adressesDeLaPage("/exemples/sept-mille-diners/ta-vie"),
};

const RUBRIQUES = [
  { cle: "combien", titre: "Combien à table", sous: "décide de la table" },
  { cle: "cuisine", titre: "Qui cuisine", sous: "décide des postes de travail" },
  { cle: "vaisselle", titre: "Qui fait la vaisselle", sous: "décide du lave-vaisselle" },
] as const;

export default function PageTaVie() {
  return (
    <div>
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-16 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-5 min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[var(--accent-texte)]">Pas de catalogue</p>
          <h1 className="text-[3rem] sm:text-7xl">Ta vie, <span className="italic">ton plan.</span></h1>
          <p className="text-xl leading-relaxed text-[var(--doux)]">
            Un catalogue te montre la cuisine des autres. Trois questions suffisent pour commencer la
            tienne : le reste se décide chez toi, mètre en main.
          </p>
        </div>
        <div className="min-w-0">
          <TaVie />
        </div>
      </section>

      <section className="border-y border-[var(--trait)] bg-[var(--carte)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 space-y-10">
          <h2 className="text-5xl">Ce que chaque réponse <span className="italic">change.</span></h2>
          <div className="grid gap-6 md:grid-cols-3">
            {RUBRIQUES.map((r) => (
              <div key={r.cle} className="space-y-3">
                <h3 className="text-2xl">{r.titre} <span className="italic text-[var(--doux)]">{r.sous}</span></h3>
                <ul className="space-y-2">
                  {Object.values(NOTES[r.cle]).map((n) => (
                    <li key={n.titre} className="rounded-[16px] border border-[var(--trait)] bg-[var(--fond)] p-3">
                      <span className="block font-semibold">{n.titre}</span>
                      <span className="block text-sm text-[var(--doux)]">{n.texte}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="relative aspect-[4/3] sm:aspect-[21/9] rounded-[24px] overflow-hidden bg-[var(--sombre)]">
          <Image src={photos.cocotte.src} alt={photos.cocotte.alt} fill sizes="(min-width: 1152px) 1104px, 100vw" className="object-cover" />
        </div>
        <p className="mt-4 font-[family-name:var(--titres)] text-3xl italic">Le plan qui va avec ta vie. Pas avec la photo.</p>
      </section>
    </div>
  );
}
