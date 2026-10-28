import type { Metadata } from "next";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, aLUnite, jamaisFacture } from "../_composants/donnees";
import Intitule from "../_composants/Intitule";
import Forfait from "../_composants/Forfait";

export const metadata: Metadata = {
  title: "Tarifs · Premier Trajet — site de démonstration",
  description: "Le forfait permis B de Premier Trajet, auto-école imaginaire, ligne par ligne : heures de code, heures au volant, frais inclus, frais à ta charge, prix TTC d'exemple.",
  ...adressesDeLaPage("/exemples/premier-trajet/tarifs"),
};

export default function Tarifs() {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-20 space-y-16">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="space-y-8 lg:sticky lg:top-28">
          <Intitule niveau={1} pastille="Tarifs" titre={<>Le prix, <span className="text-[var(--doux)]">ligne par ligne.</span></>}>
            Heures de code, heures au volant, frais inclus, frais à ta charge. Tout ce que
            l'arrêté du 19 juin 1987 demande à une auto-école d'écrire, et rien en petits
            caractères.
          </Intitule>
          <p className="rounded-2xl bg-[var(--carte)] border border-[var(--trait)] p-5 text-sm leading-relaxed text-[var(--doux)]">
            Le nombre d'heures du forfait est celui du minimum réglementaire. Le tien, on
            l'estime ensemble à l'évaluation de départ, et il est inscrit au contrat.
          </p>
        </div>
        <Forfait />
      </div>

      <section className="space-y-6">
        <h2 className="text-3xl sm:text-4xl font-extrabold">À l'unité</h2>
        <div className="rounded-[26px] bg-[var(--carte)] border border-[var(--trait)] divide-y divide-[var(--trait)]">
          {aLUnite.map((p) => (
            <div key={p.nom + p.duree} className="flex items-baseline justify-between gap-4 px-5 sm:px-7 py-4">
              <span className="min-w-0">
                <span className="block font-semibold">{p.nom}</span>
                <span className="block text-sm text-[var(--doux)]">{p.duree}</span>
              </span>
              <span className="font-[family-name:var(--titres)] text-xl font-extrabold tabular-nums whitespace-nowrap">{p.prix}</span>
            </div>
          ))}
        </div>
        <p className="text-sm text-[var(--doux)]">Prix TTC d'exemple : l'école est fictive.</p>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-[26px] bg-[var(--sombre)] text-[var(--sur-sombre)] p-7 space-y-4">
          <h2 className="text-3xl font-extrabold">Jamais facturé</h2>
          <ul className="space-y-3">
            {jamaisFacture.map((x) => (
              <li key={x} className="flex gap-3">
                <span aria-hidden="true" className="shrink-0 self-start whitespace-nowrap rounded-full bg-[var(--accent)] text-[var(--sur-accent)] px-2.5 py-0.5 text-sm font-extrabold">0&nbsp;€</span>
                <span>{x}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm">La loi l'interdit : Code de la route, art. L213-2.</p>
        </div>
        <div className="rounded-[26px] bg-[var(--accent)] text-[var(--sur-accent)] p-7 flex flex-col justify-between gap-6">
          <p className="font-[family-name:var(--titres)] text-3xl font-extrabold leading-tight">
            Avant de payer quoi que ce soit : une heure au volant.
          </p>
          <Link href={`${DOSSIER}/evaluation`} className="self-start rounded-full bg-[var(--sombre)] text-[var(--sur-sombre)] px-6 h-12 inline-flex items-center font-bold">
            Réserver mon évaluation
          </Link>
        </div>
      </section>
    </main>
  );
}
