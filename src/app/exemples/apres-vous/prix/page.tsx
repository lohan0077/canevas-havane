import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { ACCENT, AppelFinal, EnTetePage, Surtitre } from "../_composants/Blocs";
import Grille from "../_composants/Grille";
import { COMPRIS, PASSAGES, SURFACES, euros, photos, prixMensuel } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Nos prix — Après Vous, site de démonstration",
  description: "Le prix mensuel du nettoyage de vos bureaux, tout de suite, selon la surface et les passages par semaine. Prix d'exemple hors taxes, prix ferme au devis après visite.",
  ...adressesDeLaPage("/exemples/apres-vous/prix"),
};

export default function Prix() {
  return (
    <main>
      <EnTetePage surtitre="Nos prix · hors taxes" titre="Votre prix, *tout de suite.*" photo={photos.bureau}>
        Nos clients sont des entreprises&nbsp;: nos prix sont affichés hors taxes, TVA à 20&nbsp;% en sus. Ce sont des prix
        d&apos;exemple&nbsp;; le prix ferme vient au devis, après une visite de vos locaux.
      </EnTetePage>

      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div className="space-y-6 lg:sticky lg:top-28">
          <Apparition><Surtitre>Deux questions</Surtitre></Apparition>
          <TitreRevele texte="Votre surface. *Vos passages.*" className="font-[family-name:var(--titres)] text-[clamp(3rem,6vw,5.2rem)] font-normal leading-[0.95]" classeAccent={ACCENT} />
          <Apparition as="p" delai={150} className="max-w-md text-lg leading-relaxed text-[var(--doux)]">
            Et votre prix mensuel s&apos;affiche, hors taxes. Si le chiffre vous va, laissez un numéro&nbsp;: on vient voir vos
            bureaux, un soir ou un matin, et le devis arrive avec le prix ferme.
          </Apparition>
        </div>
        <Apparition de="zoom"><Grille /></Apparition>
      </section>

      <section className="border-y border-[var(--trait)] bg-[var(--sombre)]">
        <div className="mx-auto max-w-6xl space-y-8 px-5 py-20 sm:px-8 md:py-28">
          <TitreRevele texte="Toute la grille, *par mois, HT.*" className="font-[family-name:var(--titres)] text-[clamp(2.6rem,5vw,4.4rem)] font-normal leading-[0.95]" classeAccent={ACCENT} />
          <Apparition className="overflow-x-auto rounded-[14px] border border-[var(--trait)] bg-[var(--carte)]">
            <table className="w-full min-w-[360px] text-left tabular-nums">
              <caption className="sr-only">Prix mensuels d&apos;exemple hors taxes, selon la surface et les passages par semaine</caption>
              <thead>
                <tr className="border-b border-[var(--accent)] text-[12px] uppercase tracking-[0.2em] text-[var(--accent-texte)]">
                  <th scope="col" className="p-4 font-semibold">Surface</th>
                  {PASSAGES.map((p) => <th key={p} scope="col" className="p-4 text-right font-semibold">{p}&nbsp;/&nbsp;sem.</th>)}
                </tr>
              </thead>
              <tbody>
                {SURFACES.map((s) => (
                  <tr key={s} className="border-b border-[var(--trait)] last:border-0">
                    <th scope="row" className="whitespace-nowrap p-4 font-[family-name:var(--titres)] text-2xl font-normal">{s}&nbsp;m²</th>
                    {PASSAGES.map((p) => <td key={p} className="whitespace-nowrap p-4 text-right text-lg">{euros(prixMensuel(s, p))}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </Apparition>
          <p className="text-sm text-[var(--doux)]">Prix d&apos;exemple, hors taxes, en euros par mois. L&apos;entreprise est fictive.</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-14 px-5 py-24 sm:px-8 md:grid-cols-2 md:items-center md:py-32">
        <div className="space-y-6">
          <Apparition><Surtitre>Compris dans le prix</Surtitre></Apparition>
          <TitreRevele texte="Ce que paie *votre mensualité.*" className="font-[family-name:var(--titres)] text-[clamp(2.8rem,5.5vw,4.8rem)] font-normal leading-[0.95]" classeAccent={ACCENT} />
          <ul className="space-y-3">
            {COMPRIS.map((c, i) => (
              <Apparition as="li" key={c} delai={i * 90} className="flex gap-4 border-b border-[var(--trait)] pb-3 text-lg">
                <span aria-hidden="true" className="text-[var(--accent-texte)]">◆</span>
                {c}
              </Apparition>
            ))}
          </ul>
        </div>
        <Apparition de="rideau" className="relative aspect-[4/5] overflow-hidden rounded-t-full border border-[var(--trait)]">
          <Image src={photos.chiffon.src} alt={photos.chiffon.alt} fill sizes="(min-width: 768px) 540px, 100vw" className="object-cover" />
        </Apparition>
      </section>

      <AppelFinal />
    </main>
  );
}
