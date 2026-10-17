import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import { euros, reparation } from "../_composants/donnees";
import Comparateur from "../_composants/Comparateur";
import Etiquette from "../_composants/Etiquette";

export const metadata: Metadata = {
  title: "Une réparation · Capot Ouvert — site de démonstration",
  description: "La page privée d'une réparation chez Capot Ouvert, garage imaginaire : photos d'avant et d'après, la pièce changée et pourquoi, la facture en TTC.",
  ...adressesDeLaPage("/exemples/capot-ouvert/reparation"),
};

export default function Reparation() {
  const r = reparation;
  const total = r.lignes.reduce((t, l) => t + l.prix, 0);
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10 pb-20 space-y-10">
      <div id="entete-reparation" className="space-y-3 scroll-mt-24">
        <p className="inline-flex items-center gap-2 rounded-md bg-[var(--sombre)] px-3 py-1.5 text-sm font-semibold text-[var(--sur-sombre)]">
          <span aria-hidden="true">🔒</span> Lien privé · page d'exemple
        </p>
        <h1 className="text-5xl sm:text-7xl font-bold tracking-[-0.02em]">{r.voiture}, {r.objet.toLowerCase()}</h1>
        <p className="text-lg [font-variant-numeric:lining-nums]">Réparation {r.numero} · {r.date} · {r.kilometrage} · exemple</p>
      </div>

      <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
        <Comparateur />
        <div className="space-y-6">
          <section data-film="piece" className="rounded-[14px] border-[3px] border-[var(--trait)] bg-[var(--carte)] p-5 sm:p-7 space-y-3 scroll-mt-24">
            <p className="flex items-center gap-3">
              <span aria-hidden="true" className="grid h-10 w-10 place-items-center rounded-md bg-[var(--accent)] text-xl font-bold text-[var(--sur-accent)]">✓</span>
              <span className="font-[family-name:var(--titres)] text-sm font-bold uppercase tracking-[0.14em] text-[var(--accent-texte)]">Pièce changée</span>
            </p>
            <h2 className="text-3xl font-bold">{r.piece}</h2>
            <p className="text-lg leading-relaxed"><strong>Pourquoi :</strong> {r.raison}</p>
          </section>

          <section className="rounded-[14px] border-[3px] border-[var(--trait)] bg-[var(--carte)] p-5 sm:p-7 space-y-3">
            <h2 className="text-3xl font-bold">La facture</h2>
            <ul className="border-t-2 border-[var(--trait)]">
              {r.lignes.map((l) => (
                <li key={l.libelle} className="flex items-baseline justify-between gap-4 border-b-2 border-[var(--trait)] py-3">
                  <span>{l.libelle}</span>
                  <span className="font-semibold whitespace-nowrap [font-variant-numeric:lining-nums]">{euros(l.prix)}</span>
                </li>
              ))}
            </ul>
            <p className="flex items-baseline justify-between gap-4 font-[family-name:var(--titres)] text-2xl font-bold">
              <span>Total</span><span className="[font-variant-numeric:lining-nums]">{euros(total)}</span>
            </p>
            <p className="text-sm text-[var(--doux)]">Montants d'exemple. Devis validé par le client avant la réparation.</p>
          </section>

          <section className="space-y-6 pt-4">
            <h2 className="text-3xl font-bold">Ta pièce t'attend à l'accueil</h2>
            <Etiquette />
          </section>
        </div>
      </div>

      <p className="max-w-2xl text-[var(--doux)]">
        Cette page est privée : seul le client a le lien. Les photos montrent la pièce, jamais
        la plaque ni la personne, et rien n'est publié sans son accord.
      </p>
    </main>
  );
}
