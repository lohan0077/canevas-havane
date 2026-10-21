import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MonMur from "../_composants/MonMur";

// « Sur le site, tu prends ton mur en photo. Tu dis ce qu'il y a au-dessus, et la
// largeur que tu veux ouvrir. » L'outil, filmé tel quel (Videos/marque-bureaux-etudes).
export const metadata: Metadata = {
  title: "Belle Portée — site de démonstration",
  description: "Ton mur en photo, ce qu'il y a au-dessus, la largeur à ouvrir : ce que la visite vérifiera. Démonstration d'un bureau d'études structure imaginaire.",
  ...adressesDeLaPage("/exemples/belle-portee/mon-mur"),
};

export default function PageMonMur() {
  return (
    <section className="mx-auto grid max-w-6xl gap-10 px-5 pb-20 pt-8 sm:pt-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
      <div className="space-y-5 lg:pt-4">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent-texte)]">Ton projet</p>
        <h1 className="text-5xl font-bold uppercase leading-[0.95] sm:text-7xl">Ton mur, en photo.</h1>
        <p className="text-lg leading-relaxed">
          Trois réponses, et on sait quoi regarder en arrivant. La photo reste sur ton
          téléphone : rien n&apos;est envoyé.
        </p>
        <ul className="hidden space-y-2 border-l-4 border-[var(--accent)] pl-4 text-[var(--doux)] lg:block">
          <li>Prends le mur de face, en entier, du sol au plafond.</li>
          <li>Si tu peux, une deuxième photo du plafond, au-dessus du mur.</li>
          <li>Pas besoin de mesurer au millimètre : on mesurera sur place.</li>
        </ul>
      </div>
      <MonMur />
    </section>
  );
}
