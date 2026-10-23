import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import { EnTetePage } from "../_composants/Blocs";
import Suivi from "../_composants/Suivi";

// L'outil de la vidéo « Créer une marque » : « ton dossier se suit comme un colis. Reçu,
// envoyé aux banques, accord, fonds versés. » L'étape s'appelle « Réponse des banques » :
// rien ne présume l'accord (C. consom. L313-5, 2°). Filmé : le doigt touche « Suivre », puis
// chaque étape.
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
    <main>
      <EnTetePage surtitre="Suivre un dossier" titre="Ton dossier, *comme un colis.*" aCote={<Suivi />}>
        Entre ton numéro de dossier. Chaque étape s&apos;affiche avec sa date. Plus besoin d&apos;appeler
        pour savoir : c&apos;est nous qui appelons.
      </EnTetePage>
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-24">
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {QUAND.map((q, i) => (
            <Apparition as="li" key={q.titre} delai={i * 120} de="zoom" className="space-y-3 rounded-[1.75rem] border border-[var(--trait)] bg-white p-7">
              <span aria-hidden="true" className="block h-1.5 w-12 rounded-full bg-[#3FA36B]" />
              <p className="font-[family-name:var(--titres)] text-[28px] font-semibold leading-tight tracking-[-0.02em]">{q.titre}</p>
              <p className="text-[16px] leading-relaxed text-[var(--doux)]">{q.texte}</p>
            </Apparition>
          ))}
        </ul>
      </section>
    </main>
  );
}
