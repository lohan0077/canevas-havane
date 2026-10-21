import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import { moments, photos } from "../_composants/donnees";
import { Intitule, Photo } from "../_composants/Blocs";
import Moments from "../_composants/Moments";

export const metadata: Metadata = {
  title: "Ce qui t'arrive — Ligne par Ligne, site de démonstration",
  description:
    "Vendre sa boîte, hériter, partir à la retraite, attendre un enfant : chez un conseiller en gestion de patrimoine imaginaire, on part de ce qui t'arrive, pas d'un produit.",
  ...adressesDeLaPage("/exemples/ligne-par-ligne/moments"),
};

export default function PageMoments() {
  return (
    <div>
      <section className="mx-auto grid max-w-6xl gap-10 px-4 pt-10 pb-20 sm:px-6 sm:pt-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="space-y-8 px-1">
          <Intitule niveau={1} libelle="Ce qui t'arrive" titre={<>D&apos;abord ta vie, <em>ensuite l&apos;argent.</em></>}>
            <p>Touche ce qui t&apos;arrive : les questions à se poser, ce qu&apos;on regarde ensemble, et qui d&apos;autre consulter.</p>
          </Intitule>
          <Photo photo={photos.banc} sizes="(min-width: 1024px) 420px, 100vw" className="hidden aspect-[3/2] rounded-[24px] lg:block" />
        </div>
        <Moments detail />
      </section>

      <section className="border-t border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto max-w-6xl space-y-10 px-5 py-20 sm:px-6">
          <Intitule libelle="Quatre moments" titre={<>Ce qu&apos;on regarde, <em>moment par moment.</em></>} />
          <div className="grid gap-5 sm:grid-cols-2">
            {moments.map((m) => (
              <article key={m.cle} className="space-y-3 rounded-[22px] bg-[var(--fond)] p-6">
                <h2 className="text-[28px] font-normal">{m.libelle}</h2>
                <ul className="space-y-1.5 text-[15px] leading-snug text-[var(--doux)]">
                  {m.ensemble.map((e) => (
                    <li key={e} className="flex gap-3">
                      <span aria-hidden="true" className="text-[var(--accent-texte)]">—</span>
                      {e}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
