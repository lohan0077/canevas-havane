import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import { GATEAUX, TAILLES, euros, prix } from "../_composants/donnees";
import { Pastille, TableauAllergenes } from "../_composants/Blocs";

export const metadata: Metadata = {
  title: "Les gâteaux — Avant les Bougies — site de démonstration",
  description: "Les gâteaux d'anniversaire d'une pâtisserie imaginaire : prix pour 6 à 30 personnes, recette, et les 14 allergènes, gâteau par gâteau.",
  ...adressesDeLaPage("/exemples/avant-les-bougies/gateaux"),
};

// Ce que les gens tapent : « combien coûte un gâteau d'anniversaire pour 20
// personnes », « … pour 10 personnes » (suggestions Google, 15/10/2026). Chaque fiche
// donne le prix par taille, et les allergènes avant toute commande.
export default function LesGateaux() {
  return (
    <main className="mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-6 sm:pt-16">
      <div className="max-w-3xl space-y-5">
        <Pastille>Les gâteaux</Pastille>
        <h1 className="text-[56px] font-extrabold uppercase leading-[0.88] tracking-[-0.03em] sm:text-[96px]">
          Combien pour <span className="text-[var(--accent-texte)]">combien&nbsp;?</span>
        </h1>
        <p className="text-lg">Chaque gâteau, son prix de 6 à 30 parts, sa recette, ses allergènes. Avant de commander, pas après.</p>
      </div>

      <div className="mt-12 space-y-8">
        {GATEAUX.map((g) => (
          <article key={g.id} id={g.id} className="grid gap-6 overflow-hidden rounded-[32px] border-2 border-[var(--encre)] bg-[var(--carte)] md:grid-cols-[0.8fr_1.2fr]">
            <div className="relative aspect-[4/3] md:aspect-auto">
              <Image src={g.photo.src} alt={g.photo.alt} width={g.photo.largeur} height={g.photo.hauteur} sizes="(min-width: 768px) 420px, 100vw" className="h-full w-full object-cover" />
            </div>
            <div className="space-y-4 p-5 sm:p-7">
              <h2 className="text-4xl font-extrabold">{g.nom}</h2>
              <p className="text-lg text-[var(--doux)]">{g.recette}</p>
              <div className="rounded-2xl bg-[#FFD9DF] p-4">
                <p className="text-sm font-bold uppercase tracking-[0.12em]">Allergènes</p>
                <p className="text-lg font-bold">{g.allergenes.join(", ")}.</p>
                {g.precision && <p className="text-sm">{g.precision}</p>}
              </div>
              <table className="w-full text-left">
                <caption className="sr-only">Prix du {g.nom} selon le nombre de parts, TTC, exemple</caption>
                <thead><tr className="text-xs uppercase tracking-[0.12em] text-[var(--doux)]"><th className="pb-1 font-bold">Parts</th><th className="pb-1 text-right font-bold">Prix TTC</th></tr></thead>
                <tbody className="divide-y divide-[var(--trait)]">
                  {TAILLES.map((t) => (
                    <tr key={t} className={t === 20 ? "font-extrabold" : ""}>
                      <td className="py-1.5 tabular-nums">{t} parts</td>
                      <td className="py-1.5 text-right tabular-nums">{euros(prix(g, t))}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-xs text-[var(--doux)]">Prix TTC d&apos;exemple. Plaque en chocolat avec un prénom&nbsp;: 3&nbsp;€.</p>
            </div>
          </article>
        ))}
      </div>

      <section className="mt-16 space-y-5">
        <h2 className="text-4xl font-extrabold uppercase leading-[0.95] tracking-[-0.02em]">Les 14 allergènes, <span className="text-[var(--accent-texte)]">gâteau par gâteau</span></h2>
        <p className="max-w-2xl text-[var(--doux)]">
          La liste officielle des quatorze allergènes, et ce que chaque gâteau contient. Les
          gâteaux sont faits dans le même atelier : en cas d&apos;allergie sévère, appelez-nous avant de commander.
        </p>
        <TableauAllergenes />
      </section>
    </main>
  );
}
