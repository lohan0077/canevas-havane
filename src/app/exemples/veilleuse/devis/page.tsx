import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import { AppelFinal, EnTetePage } from "../_composants/Blocs";
import Devis from "../_composants/Devis";
import { entreprise } from "../_composants/donnees";

// Le devis en trois questions. La vidéo « Remplir l'agenda » : « Sur le site, un devis
// en trois questions : quoi, où, combien de nuits. » Filmé tel quel
// (Videos/agenda-securite/tournage.mjs).
export const metadata: Metadata = {
  title: "Devis en 3 questions — Veilleuse, site de démonstration",
  description: "Quoi, où, combien de nuits : la fourchette de prix d'une nuit de veille, calculée sur la page. Démonstration de Canevas Havane, rien n'est envoyé.",
  ...adressesDeLaPage("/exemples/veilleuse/devis"),
};

const ENSUITE = [
  { titre: "On te rappelle", texte: "Dans la journée, pour caler la visite." },
  { titre: "On passe voir, gratuitement", texte: "Une heure sur place, de jour, avec tes consignes." },
  { titre: "Tu reçois le devis ferme", texte: "Avec le prénom de l'agent prévu, les références de sa carte, et les mentions légales." },
];

export default function PageDevis() {
  return (
    <main>
      <EnTetePage
        surtitre="Devis en 3 questions"
        titre="Quoi, où, *combien de nuits.*"
        aside={
          <Apparition de="droite" delai={250} className="w-full text-[var(--encre)]">
            <Devis />
          </Apparition>
        }
      >
        Trois réponses, et la fourchette s&apos;affiche ici, tout de suite. Prix d&apos;exemple : HT pour
        un professionnel, TTC pour un particulier.
      </EnTetePage>

      <section className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
        <h2 className="mb-12 text-[clamp(2.6rem,5vw,4.4rem)] font-normal leading-[0.98]">Et ensuite&nbsp;?</h2>
        <ol className="grid gap-5 md:grid-cols-3">
          {ENSUITE.map((e, i) => (
            <Apparition as="li" key={e.titre} delai={i * 120} className="space-y-3 rounded-[2rem] border border-[var(--trait)] bg-[var(--carte)] p-7">
              <span className="block font-[family-name:var(--titres)] text-5xl text-[var(--accent-texte)]">{i + 1}</span>
              <span className="block text-2xl font-bold">{e.titre}</span>
              <span className="block leading-relaxed text-[var(--doux)]">{e.texte}</span>
            </Apparition>
          ))}
        </ol>
        <p className="mt-10 text-lg text-[var(--doux)]">
          Plus pressé ? <a href={`tel:${entreprise.telephoneLien}`} className="font-bold text-[var(--encre)] underline underline-offset-4">{entreprise.telephone}</a>, du lundi au vendredi, de 8 h à 19 h.
        </p>
      </section>

      <AppelFinal />
    </main>
  );
}
