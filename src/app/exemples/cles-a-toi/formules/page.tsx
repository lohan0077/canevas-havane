import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Creneaux from "../../_kit/Creneaux";
import { aLUnite, ecole, euros, forfait } from "../_composants/donnees";
import Simulateur from "../_composants/Simulateur";

export const metadata: Metadata = {
  title: "Formules · Clés à Toi — site de démonstration",
  description: "La formule de Clés à Toi, auto-école imaginaire, ligne par ligne : heures, frais inclus, frais à charge, en TTC d'exemple ; et l'évaluation de départ à réserver.",
  ...adressesDeLaPage("/exemples/cles-a-toi/formules"),
};

const EVALUATIONS = [
  { libelle: "Mar.", sous: "7 h 30" },
  { libelle: "Mer.", sous: "17 h", pris: true },
  { libelle: "Mer.", sous: "18 h" },
  { libelle: "Jeu.", sous: "19 h" },
  { libelle: "Sam.", sous: "9 h", pris: true },
  { libelle: "Sam.", sous: "10 h 30" },
];

export default function Formules() {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 sm:pt-14 pb-20 space-y-20">
      <div className="max-w-3xl space-y-5">
        <p className="font-[family-name:var(--titres)] text-sm font-bold uppercase tracking-[0.16em] text-[var(--accent-texte)]">Formules</p>
        <h1 className="text-5xl sm:text-7xl font-bold tracking-[-0.04em]">Tout est écrit. Même ce qui n'est pas compris.</h1>
        <p className="text-xl leading-relaxed">
          Heures de code, heures au volant, frais inclus, frais à ta charge : tout ce que
          l'arrêté du 19 juin 1987 demande à une auto-école d'écrire, en prix TTC.
        </p>
      </div>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <article className="rounded-[32px] bg-[var(--carte)] border border-[var(--trait)] overflow-hidden">
          <div className="p-6 sm:p-8 space-y-6">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-3xl sm:text-4xl font-bold">{forfait.nom}</h2>
              <span className="shrink-0 rounded-full border border-[var(--encre)] px-3 py-1 text-xs font-semibold">Exemple</span>
            </div>
            <dl className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
              {forfait.heures.map((h) => (
                <div key={h.libelle} className="flex items-baseline justify-between gap-4 py-3">
                  <dt>
                    <span className="block font-[family-name:var(--titres)] font-semibold">{h.libelle}</span>
                    <span className="block text-[var(--doux)]">{h.detail}</span>
                  </dt>
                  <dd className="font-[family-name:var(--titres)] text-2xl font-bold whitespace-nowrap">{h.valeur}</dd>
                </div>
              ))}
            </dl>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <h3 className="font-[family-name:var(--titres)] text-sm font-bold uppercase tracking-[0.14em] text-[var(--accent-texte)]">Inclus</h3>
                <ul className="space-y-1.5 text-lg">
                  {forfait.inclus.map((x) => <li key={x} className="flex gap-2"><span aria-hidden="true">✓</span>{x}</li>)}
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-[family-name:var(--titres)] text-sm font-bold uppercase tracking-[0.14em] text-[var(--accent-texte)]">À ta charge</h3>
                <ul className="space-y-1.5 text-lg">
                  {forfait.aCharge.map((x) => <li key={x} className="flex gap-2"><span aria-hidden="true">·</span>{x}</li>)}
                </ul>
              </div>
            </div>
          </div>
          <div className="flex items-baseline justify-between gap-4 bg-[var(--sombre)] text-[var(--sur-sombre)] px-6 sm:px-8 py-5">
            <span className="font-[family-name:var(--titres)] font-semibold">Total</span>
            <span className="font-[family-name:var(--titres)] text-4xl font-bold tabular-nums">{euros(forfait.total)}</span>
          </div>
          <p className="px-6 sm:px-8 py-4 text-[var(--doux)]">
            {ecole.nom}, auto-école · {ecole.adresse} · agrément n° {ecole.agrement} (exemple). Arrêté du 19 juin 1987, art. 3.
          </p>
        </article>

        <div className="space-y-6">
          <div className="rounded-[32px] bg-[var(--carte)] border border-[var(--trait)] p-6 sm:p-8 space-y-4">
            <h2 className="text-3xl font-bold">À l'unité</h2>
            <ul className="divide-y divide-[var(--trait)]">
              {aLUnite.map((p) => (
                <li key={p.nom} className="flex items-baseline justify-between gap-4 py-3">
                  <span>
                    <span className="block font-[family-name:var(--titres)] font-semibold">{p.nom}</span>
                    <span className="block text-[var(--doux)]">{p.duree}</span>
                  </span>
                  <span className="font-[family-name:var(--titres)] text-xl font-bold whitespace-nowrap tabular-nums">{euros(p.prix)}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[32px] bg-[var(--sombre)] text-[var(--sur-sombre)] p-6 sm:p-8 space-y-3">
            <h2 className="text-3xl font-bold">Jamais facturé</h2>
            <p className="text-lg leading-relaxed">La présentation à l'examen, la restitution de ton dossier, son transfert vers une autre école. La loi l'interdit (Code de la route, art. L213-2).</p>
          </div>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-2 lg:items-center">
        <div className="space-y-4">
          <h2 className="text-5xl font-bold tracking-[-0.03em]">Et s'il te faut plus de 20 heures ?</h2>
          <p className="text-xl leading-relaxed">Glisse jusqu'au nombre d'heures estimé : le calcul se fait sous tes yeux, avec les prix de cette page.</p>
        </div>
        <Simulateur />
      </section>

      <section id="evaluation" className="scroll-mt-24 grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <p className="font-[family-name:var(--titres)] text-sm font-bold uppercase tracking-[0.16em] text-[var(--accent-texte)]">Pour commencer</p>
          <h2 className="text-5xl font-bold tracking-[-0.03em]">L'évaluation, au départ de chez toi.</h2>
          <p className="text-xl leading-relaxed">Une heure au volant avec Inès ou Théo, {euros(aLUnite[0].prix)} (exemple). À la fin, le nombre d'heures prévu, que le contrat reprendra.</p>
        </div>
        <Creneaux
          creneaux={EVALUATIONS}
          colonnes={3}
          titreCarte="Ton évaluation"
          bouton="Réserver ce départ"
          confirmation="Évaluation réservée : on passe te prendre."
          note="Créneaux d'exemple : certains sont déjà pris."
        />
      </section>
    </main>
  );
}
