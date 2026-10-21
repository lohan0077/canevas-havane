import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import EspaceClient from "../_composants/EspaceClient";

export const metadata: Metadata = {
  title: "Qui vient ce soir · Veilleuse — site de démonstration",
  description: "L'espace client d'exemple de Veilleuse : le prénom de l'agent de ce soir, ses horaires et les références de sa carte professionnelle. Démonstration de Canevas Havane.",
  ...adressesDeLaPage("/exemples/veilleuse/ce-soir"),
};

const POINTS = [
  { titre: "Son prénom, pas un matricule", texte: "Tu sais qui sonne s'il faut sonner, et qui t'écrit le matin." },
  { titre: "Sa carte professionnelle", texte: "Les références, avant la nuit. La loi te permet de les demander ; tu n'as pas à le faire." },
  { titre: "Visible de toi seul", texte: "Ce sont des données personnelles de nos agents : elles restent dans ton espace, jamais sur une page publique." },
];

export default function CeSoir() {
  return (
    <div className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 pt-8 sm:pt-16 pb-20 sm:pb-28 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="space-y-6 lg:sticky lg:top-28">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)]">Espace client · démonstration</p>
          <h1 className="text-[44px] sm:text-7xl font-normal leading-[1.0]">Qui vient <span className="text-[var(--accent)]">ce soir.</span></h1>
          <p className="text-lg leading-relaxed text-[#C9C2B3]">
            Voici ce que voit un client de Veilleuse en ouvrant son espace, l&apos;après-midi.
            L&apos;agent, les prénoms et les numéros sont des exemples.
          </p>
        </div>
        <EspaceClient />
        <ul className="lg:col-start-1 grid gap-6">
          {POINTS.map((p) => (
            <li key={p.titre} className="flex gap-4">
              <span aria-hidden="true" className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--accent)] shadow-[0_0_10px_3px_rgba(244,201,93,0.45)]" />
              <span className="space-y-1">
                <span className="block font-[family-name:var(--titres)] text-2xl">{p.titre}</span>
                <span className="block leading-relaxed text-[#C9C2B3]">{p.texte}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
