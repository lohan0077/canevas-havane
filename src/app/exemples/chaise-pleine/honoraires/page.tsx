import type { Metadata } from "next";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER } from "../_composants/donnees";
import Honoraires from "../_composants/Honoraires";

// « Combien coûte un cabinet de recrutement » : ce que les gens tapent (suggestions
// Google relevées le 15/10/2026). La réponse : un exemple chiffré, ligne par ligne.
export const metadata: Metadata = {
  title: "Honoraires · Chaise Pleine — site de démonstration",
  description: "Combien coûte un cabinet de recrutement ? Des exemples de forfaits, ligne par ligne, en HT. Site de démonstration, prix d'exemple.",
  ...adressesDeLaPage("/exemples/chaise-pleine/honoraires"),
};

export default function PageHonoraires() {
  return (
    <main className="mx-auto max-w-4xl space-y-10 px-4 py-8 sm:px-5 sm:py-16">
      <header className="space-y-3">
        <p className="text-sm font-bold text-[var(--accent-texte)]">Combien coûte un cabinet de recrutement&nbsp;?</p>
        <h1 className="text-[2.35rem] sm:text-6xl font-extrabold tracking-tight">Un exemple chiffré, <span className="text-[var(--accent-texte)]">ligne par ligne.</span></h1>
        <p className="text-lg leading-relaxed">Pas « nous consulter ». Choisis un poste type : le forfait et son détail.</p>
      </header>
      <Honoraires />
      <section className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2 rounded-2xl bg-[var(--carte)] p-6">
          <h2 className="text-2xl font-extrabold">Forfait, pas pourcentage</h2>
          <p className="leading-relaxed text-[var(--doux)]">Beaucoup de cabinets facturent une part du salaire annuel. Nous, un forfait écrit avant de commencer : tu sais ce que tu paies avant de signer.</p>
        </div>
        <div className="space-y-2 rounded-2xl bg-[var(--carte)] p-6">
          <h2 className="text-2xl font-extrabold">Les candidats ne paient rien</h2>
          <p className="leading-relaxed text-[var(--doux)]">Placement gratuit pour les candidats : aucune rétribution ne peut leur être demandée (Code du travail, art. L.5321-3).</p>
        </div>
      </section>
      <div className="flex flex-col gap-3 rounded-2xl bg-[#2A343D] p-6 text-[#F4F1EA] sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xl font-extrabold">Le tien, en vingt minutes.</p>
        <Link href={`${DOSSIER}#vingt-minutes`} className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#F28C6B] px-6 font-bold text-[#2A343D]">Réserver 20 minutes</Link>
      </div>
    </main>
  );
}
