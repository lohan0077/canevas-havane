import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, VOYAGES, euros, photos } from "../_composants/donnees";
import Billet from "../_composants/Billet";

export const metadata: Metadata = {
  title: "Les voyages promis · Parole Tenue — site de démonstration",
  description: "Les six voyages qu'on promet le plus, avec le bon mois pour partir et un budget d'exemple. Agence fictive, site de démonstration.",
  ...adressesDeLaPage("/exemples/parole-tenue/voyages"),
};

export default function Voyages() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-12 sm:py-20 space-y-14">
      <header className="max-w-3xl space-y-5">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-texte)]">Les voyages promis</p>
        <h1 className="text-[3rem] sm:text-7xl font-normal">Six promesses, <em>et leur bon mois.</em></h1>
        <p className="text-lg leading-relaxed">
          Les voyages qu&apos;on promet le plus, et ceux qu&apos;on repousse le plus longtemps. Pour
          chacun : quand partir, combien de temps, et un budget d&apos;exemple pour deux.
        </p>
      </header>
      <ul className="space-y-10">
        {VOYAGES.map((v, i) => {
          const p = v.photo ? photos[v.photo] : null;
          return (
            <li key={v.id} className={`grid gap-6 border-t-2 border-[var(--encre)] pt-8 md:grid-cols-2 md:items-center ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
              {p ? (
                <Image src={p.src} width={p.largeur} height={p.hauteur} alt={p.alt} sizes="(min-width: 768px) 540px, 100vw" className="aspect-[3/2] w-full rounded-[6px] object-cover" />
              ) : (
                <div className="grid aspect-[3/2] place-items-center rounded-[6px] bg-[#F3EAD8] p-8">
                  <div className="w-full max-w-[280px]"><Billet ou={v.nom} pour="un jour" angle={-3} /></div>
                </div>
              )}
              <div className="space-y-3">
                <p className="font-[family-name:var(--titres)] text-2xl italic text-[var(--accent-texte)]">«&nbsp;{v.phrase}&nbsp;»</p>
                <h2 className="text-4xl sm:text-5xl font-normal">{v.nom}</h2>
                <dl className="grid grid-cols-2 gap-3 text-sm">
                  <div><dt className="text-[var(--doux)]">Le bon mois</dt><dd className="font-semibold">{v.pourquoi}</dd></div>
                  <div><dt className="text-[var(--doux)]">Durée</dt><dd className="font-semibold">{v.duree}</dd></div>
                  <div className="col-span-2"><dt className="text-[var(--doux)]">Budget exemple, pour deux, TTC</dt><dd className="font-[family-name:var(--titres)] text-3xl [font-variant-numeric:lining-nums]">{euros(v.budget)}</dd></div>
                </dl>
              </div>
            </li>
          );
        })}
      </ul>
      <p className="text-sm text-[var(--doux)]">
        Budgets d&apos;exemple : ce ne sont pas des offres. Le prix réel est écrit dans le formulaire
        d&apos;information remis avant tout contrat de voyage (Code du tourisme, art. L.211-8).
      </p>
      <Link href={`${DOSSIER}#promesse`} className="inline-flex min-h-13 items-center justify-center rounded-full bg-[var(--accent)] px-8 font-semibold text-[var(--sur-accent)]">
        Écrire ma promesse
      </Link>
    </main>
  );
}
