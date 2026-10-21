import type { Metadata } from "next";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import Commande from "../_composants/Commande";
import DateTorrefaction from "../_composants/DateTorrefaction";
import { IconeMethode } from "../_composants/Icones";
import { CAFES, DOSSIER, METHODES, ORDRE_METHODES, euros } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Les cafés — Pas Quinze, site de démonstration",
  description: "Les six cafés du torréfacteur Pas Quinze (entreprise fictive), deux par cafetière, avec la bonne mouture et des mots de tous les jours.",
  ...adressesDeLaPage("/exemples/pas-quinze/cafes"),
};

export default function Cafes() {
  return (
    <div>
      <section className="bg-[var(--accent)] text-[var(--encre)]">
        <div className="mx-auto max-w-6xl space-y-5 px-5 py-14 sm:py-20">
          <p className="text-sm font-bold uppercase tracking-[0.18em]">Les cafés</p>
          <h1 className="text-[2.6rem] font-black uppercase leading-[0.95] sm:text-7xl">Six cafés.<br />Deux par cafetière.</h1>
          <p className="max-w-xl text-lg font-semibold">
            Tous torréfiés le mardi — le sachet en vente cette semaine date du <DateTorrefaction />.
          </p>
        </div>
      </section>

      {ORDRE_METHODES.map((cle, i) => {
        const m = METHODES[cle];
        return (
          <section key={cle} id={cle} className={`scroll-mt-14 ${i % 2 ? "bg-[var(--carte)]" : ""} border-b-[3px] border-[var(--encre)]`}>
            <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 md:grid-cols-[0.8fr_1.2fr]">
              <div className="space-y-3">
                <IconeMethode methode={cle} className="h-14 w-14" />
                <h2 className="text-3xl font-black uppercase sm:text-4xl">{m.libelle}</h2>
                <p className="font-bold uppercase tracking-[0.1em] text-[var(--accent-texte)]">Mouture {m.mouture}</p>
                <p className="leading-relaxed text-[var(--doux)]">{m.conseil}</p>
              </div>
              <ul className="grid gap-4 sm:grid-cols-2">
                {m.cafes.map((c) => (
                  <li key={c} className="space-y-3 rounded-[22px] border-[3px] border-[var(--encre)] bg-[var(--carte)] p-5">
                    <span aria-hidden="true" className="block h-14 w-14 rounded-full" style={{ background: CAFES[c].teinte }} />
                    <p className="font-[family-name:var(--titres)] text-2xl font-bold">{CAFES[c].nom}</p>
                    <p className="font-bold">{CAFES[c].enClair}</p>
                    <p className="text-[var(--doux)]">{CAFES[c].phrase}</p>
                    <p className="tabular-nums">{euros(CAFES[c].prix250)} TTC les 250 g <span className="text-sm text-[var(--doux)]">· exemple</span></p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        );
      })}

      <section id="commander" className="scroll-mt-14 mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:py-24 md:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-4">
          <h2 className="text-4xl font-black uppercase leading-[0.95] sm:text-5xl">Commander <span className="text-[var(--accent-texte)]">au sachet.</span></h2>
          <p className="text-lg leading-relaxed">Tu choisis la mouture, les sachets, et tu passes les chercher à la brûlerie à partir du mercredi.</p>
          <p className="text-lg leading-relaxed">Envie que ça arrive tout seul ? <Link href={`${DOSSIER}/abonnement`} className="font-bold underline underline-offset-4">L&apos;abonnement se règle en tasses.</Link></p>
        </div>
        <Commande />
      </section>
    </div>
  );
}
