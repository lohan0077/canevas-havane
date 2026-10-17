import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import RendezVous from "../_composants/RendezVous";

export const metadata: Metadata = {
  title: "Rendez-vous · Mains Libres — site de démonstration",
  description: "Le créneau de dépôt chez Mains Libres, garage imaginaire : la prestation, le jour, l'heure, sans appeler.",
  ...adressesDeLaPage("/exemples/mains-libres/rendez-vous"),
};

export default function PageRendezVous() {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-12 pb-20 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
      <div className="space-y-5 lg:sticky lg:top-28 lg:self-start">
        <p className="font-[family-name:var(--titres)] text-sm uppercase tracking-[0.18em] text-[var(--doux)]">Rendez-vous</p>
        <h1 className="text-5xl sm:text-7xl font-medium tracking-[-0.04em]">Ton créneau. <span className="text-[var(--accent-texte)]">Sans appeler.</span></h1>
        <p className="text-lg leading-relaxed text-[var(--doux)]">
          Choisis la prestation, puis l'heure de dépôt. Tu laisses la voiture et la clé ; tu
          suis l'avancement sur le site.
        </p>
      </div>
      <RendezVous />
    </main>
  );
}
