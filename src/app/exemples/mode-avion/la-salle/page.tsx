import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import { photos, salle } from "../_composants/donnees";
import Casiers from "../_composants/Casiers";

export const metadata: Metadata = {
  title: "La salle · Mode Avion — site de démonstration",
  description: "La salle Mode Avion, salle de sport imaginaire : le mur de casiers de l'entrée, la règle d'une heure sans téléphone, et comment on te joint en urgence.",
  ...adressesDeLaPage("/exemples/mode-avion/la-salle"),
};

const REGLES = [
  { titre: "Une heure, au casier", texte: "Le téléphone et la montre qui vibre restent au casier pendant la séance. Le reste du temps, ils sont à toi." },
  { titre: "L'accueil répond", texte: `En cas d'urgence, tes proches appellent l'accueil au ${salle.accueil} (numéro de fiction). Quelqu'un vient te chercher sur le plateau.` },
  { titre: "Accessible", texte: "Une rangée de casiers à hauteur de fauteuil, près de la porte. L'accueil peut aussi garder ton téléphone." },
  { titre: "Écrit et accepté", texte: "La règle figure au règlement intérieur, lu et accepté à l'inscription. Pas de surprise en arrivant." },
];

export default function LaSalle() {
  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 sm:pt-14 pb-20 space-y-16">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
        <div className="space-y-5">
          <p className="font-[family-name:var(--titres)] text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent-texte)]">La salle</p>
          <h1 className="text-5xl sm:text-6xl font-semibold tracking-[-0.04em] leading-[1]">Le mur de casiers.</h1>
          <p className="text-lg leading-relaxed text-[var(--doux)]">À l'entrée, douze petits casiers. Tu choisis le tien, tu y poses ton téléphone, la porte se ferme pour une heure.</p>
        </div>
        <Casiers />
      </div>
      <ul className="grid gap-3 sm:grid-cols-2">
        {REGLES.map((r) => (
          <li key={r.titre} className="rounded-[26px] border border-[var(--trait)] p-6 space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight">{r.titre}</h2>
            <p className="leading-relaxed text-[var(--doux)]">{r.texte}</p>
          </li>
        ))}
      </ul>
      <div className="grid gap-8 md:grid-cols-2 md:items-center">
        <div className="relative aspect-[3/4] overflow-hidden rounded-[28px] bg-[var(--carte)]">
          <Image src={photos.barres.src} alt={photos.barres.alt} fill sizes="(min-width: 768px) 480px, 100vw" className="object-cover" />
        </div>
        <div className="space-y-4">
          <h2 className="text-4xl font-semibold tracking-[-0.04em]">Le plateau.</h2>
          <p className="text-lg leading-relaxed text-[var(--doux)]">Des barres, des haltères, des rameurs, et pas un écran sur les machines. Des coachs sur le plateau aux heures de pointe, pour montrer un mouvement.</p>
          <ul className="border-y border-[var(--trait)] divide-y divide-[var(--trait)]">
            {salle.horaires.map((h) => (
              <li key={h.jours} className="flex justify-between gap-4 py-3"><span>{h.jours}</span><span className="font-semibold">{h.heures}</span></li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
