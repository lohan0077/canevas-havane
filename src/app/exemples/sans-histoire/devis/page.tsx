import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import { Intitule } from "../_composants/Blocs";
import Devis from "../_composants/Devis";
import { entreprise } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Devis en 3 questions · Sans Histoire — site de démonstration",
  description: "Quoi, où, combien de nuits : la fourchette de prix d'un gardiennage, calculée sur la page. Démonstration de Canevas Havane, rien n'est envoyé.",
  ...adressesDeLaPage("/exemples/sans-histoire/devis"),
};

const ENSUITE = [
  { titre: "On vous rappelle", texte: "Dans la journée, pour caler la visite du site." },
  { titre: "On visite, gratuitement", texte: "Une heure sur place, de jour, avec vos consignes." },
  { titre: "Vous recevez le devis ferme", texte: "Avec les références des agents prévus et les mentions légales." },
];

export default function PageDevis() {
  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-6 pt-10 sm:pt-16 pb-20 sm:pb-28 grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
      <div className="space-y-10 lg:sticky lg:top-28">
        <Intitule niveau={1} surtitre="Devis en 3 questions" titre={<>Quoi, où, <span className="italic text-[var(--accent-texte)]">combien de nuits.</span></>}>
          Trois réponses, et la fourchette s&apos;affiche ici, tout de suite. Prix d&apos;exemple :
          HT pour un professionnel, TTC pour un particulier.
        </Intitule>
        <ol className="hidden lg:block space-y-5 border-t border-[var(--trait)] pt-6">
          {ENSUITE.map((e, i) => (
            <li key={e.titre} className="flex gap-4">
              <span className="font-[family-name:var(--titres)] text-2xl italic text-[var(--accent-texte)]">{i + 1}</span>
              <span><span className="block font-semibold">{e.titre}</span><span className="text-[var(--doux)]">{e.texte}</span></span>
            </li>
          ))}
        </ol>
      </div>
      <div className="space-y-10">
        <Devis />
        <div className="lg:hidden space-y-5">
          <h2 className="text-3xl font-normal">Et ensuite ?</h2>
          <ol className="space-y-5">
            {ENSUITE.map((e, i) => (
              <li key={e.titre} className="flex gap-4">
                <span className="font-[family-name:var(--titres)] text-2xl italic text-[var(--accent-texte)]">{i + 1}</span>
                <span><span className="block font-semibold">{e.titre}</span><span className="text-[var(--doux)]">{e.texte}</span></span>
              </li>
            ))}
          </ol>
        </div>
        <p className="text-[var(--doux)]">
          Plus pressé ? <a href={`tel:${entreprise.telephoneLien}`} className="font-semibold text-[var(--encre)] underline underline-offset-4">{entreprise.telephone}</a>, du lundi au vendredi, de 8 h à 19 h.
        </p>
      </div>
    </div>
  );
}
