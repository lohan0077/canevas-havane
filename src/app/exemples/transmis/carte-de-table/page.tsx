import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import { Note } from "../_composants/Blocs";
import CarteDeTable from "../_composants/CarteDeTable";

// « Et le jour J, sur chaque table, une carte : d'où vient le plat, et qui l'a
// transmis. » La carte s'écrit et se compose à mesure ; elle ne dit que l'histoire vraie
// de la famille (une origine inventée serait trompeuse) : le site le rappelle.
export const metadata: Metadata = {
  title: "La carte de table · Transmis — site de démonstration",
  description: "Sur chaque table, une carte : d'où vient le plat, et qui l'a transmis. Écrite avec ton histoire vraie. Site de démonstration.",
  ...adressesDeLaPage("/exemples/transmis/carte-de-table"),
};

export default function PageCarteDeTable() {
  return (
    <div className="max-w-6xl mx-auto px-5 pt-10 pb-16 sm:pt-16 sm:pb-24 space-y-10">
      <div className="max-w-2xl space-y-4">
        <Note>Le jour J</Note>
        <h1 className="text-[48px] sm:text-7xl font-normal">Sur chaque table, <em className="text-[var(--accent-texte)]">une carte.</em></h1>
        <p className="text-lg leading-relaxed text-[var(--doux)]">D&apos;où vient le plat, et qui l&apos;a transmis. Écris-la : elle se compose à mesure.</p>
      </div>
      <CarteDeTable />
    </div>
  );
}
