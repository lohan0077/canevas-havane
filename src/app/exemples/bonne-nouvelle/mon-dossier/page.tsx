import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import { Intitule } from "../_composants/Blocs";
import Suivi from "../_composants/Suivi";

export const metadata: Metadata = {
  title: "Suivre un dossier — Bonne Nouvelle, site de démonstration",
  description:
    "Le dossier de prêt immobilier suivi comme un colis, chez un courtier imaginaire : reçu, envoyé aux banques, réponse, fonds versés, avec deux dossiers d'exemple.",
  ...adressesDeLaPage("/exemples/bonne-nouvelle/mon-dossier"),
};

const QUAND = [
  { titre: "Quand la banque répond", texte: "Oui ou non, on t'appelle le jour même. Puis l'étape s'affiche ici." },
  { titre: "Quand il manque une pièce", texte: "On te le dit ici, et par message : laquelle, et pourquoi." },
  { titre: "Quand rien ne bouge", texte: "C'est nous qui relançons les banques. Tu n'as pas à le faire." },
];

export default function MonDossier() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-10 pb-20 sm:px-6 sm:pt-16">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="space-y-8 px-1">
          <Intitule niveau={1} libelle="Suivre un dossier" titre={<>Ton dossier, <em>comme un colis.</em></>}>
            <p>Entre ton numéro de dossier. Chaque étape s&apos;affiche avec sa date. Plus besoin d&apos;appeler pour savoir.</p>
          </Intitule>
          <ul className="space-y-4">
            {QUAND.map((q) => (
              <li key={q.titre} className="border-l-4 border-[#3FA36B] pl-4">
                <p className="text-[17px] font-semibold">{q.titre}</p>
                <p className="text-[15px] leading-relaxed text-[var(--doux)]">{q.texte}</p>
              </li>
            ))}
          </ul>
        </div>
        <Suivi />
      </div>
    </div>
  );
}
