import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import { CLES } from "../_composants/donnees";
import Trousseau from "../_composants/Trousseau";

export const metadata: Metadata = {
  title: "Le trousseau · Clés à Toi — site de démonstration",
  description: "Le trousseau de Clés à Toi, auto-école imaginaire : une clé par étape du permis, et la dernière qui s'allume le jour où on l'a.",
  ...adressesDeLaPage("/exemples/cles-a-toi/trousseau"),
};

export default function PageTrousseau() {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 sm:pt-14 pb-20 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
      <div className="space-y-6 lg:sticky lg:top-28">
        <p className="font-[family-name:var(--titres)] text-sm font-bold uppercase tracking-[0.16em] text-[var(--accent-texte)]">Ton espace</p>
        <h1 className="text-5xl sm:text-7xl font-bold tracking-[-0.04em]">Ton trousseau.</h1>
        <p className="text-xl leading-relaxed">
          Chaque élève a le sien. Une clé par étape : ton moniteur l'allume quand l'étape est
          faite. La dernière, c'est le permis.
        </p>
        <ol className="space-y-2 text-lg">
          {CLES.map((c, i) => (
            <li key={c.id} className="flex gap-3 border-b border-[var(--trait)] pb-2">
              <span className="font-[family-name:var(--titres)] font-bold tabular-nums w-6">{i + 1}</span>
              <span><strong className="font-[family-name:var(--titres)] font-semibold">{c.nom}</strong> — {c.detail}</span>
            </li>
          ))}
          <li className="flex gap-3">
            <span className="font-[family-name:var(--titres)] font-bold w-6">5</span>
            <span><strong className="font-[family-name:var(--titres)] font-semibold">Le permis</strong> — la dernière clé.</span>
          </li>
        </ol>
        <p className="text-[var(--doux)]">
          Le trousseau n'existe que sur le site : aucun objet n'est offert à l'inscription.
        </p>
      </div>
      <div id="trousseau" className="scroll-mt-24">
        <Trousseau />
      </div>
    </main>
  );
}
