import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import { Arche, EnTetePage } from "../_composants/Blocs";
import Estimation from "../_composants/Estimation";
import { agence, photos } from "../_composants/donnees";

// « Faire estimer ma maison » : le seul bouton du premier écran de l'accueil, et sa page.
// Le vendeur choisit son créneau lui-même. La carte professionnelle est en vue, avec son
// lieu de délivrance (décret n° 72-678, art. 92) — numéro d'exemple.
export const metadata: Metadata = {
  title: "Faire estimer ma maison — Trois Marches, site de démonstration",
  description: "Choisir soi-même son créneau d'estimation : une visite sur place, un avis de valeur écrit à 0 €, le barème avant tout. Exemple d'une agence immobilière imaginaire.",
  ...adressesDeLaPage("/exemples/trois-marches/estimation"),
};

const DEROULE = ["Une visite sur place, une heure", "Un avis de valeur écrit, 0 €", "Notre barème, avant tout"];

export default function PageEstimation() {
  return (
    <main>
      <EnTetePage surtitre="Estimation" titre="Faire estimer *ma maison.*" photo={photos.salon}>
        Choisis ton créneau. On vient chez toi, une heure, et tu reçois un avis de valeur écrit : 0&nbsp;€,
        sans engagement. Carte professionnelle n°&nbsp;{agence.carte}, délivrée par la {agence.cci} (exemple).
      </EnTetePage>

      <div className="mx-auto grid grid-cols-1 max-w-7xl gap-12 px-5 py-14 sm:px-8 md:py-20 lg:grid-cols-[1.1fr_0.9fr]">
        <Apparition as="section" de="zoom" aria-label="Les créneaux" className="rounded-[2rem] border border-[var(--trait)] bg-[var(--carte)] p-5 shadow-[0_40px_80px_-50px_rgba(62,58,54,0.6)] sm:p-8">
          <Estimation />
        </Apparition>
        <aside className="space-y-8">
          <ol className="space-y-4">
            {DEROULE.map((d, i) => (
              <Apparition as="li" key={d} delai={i * 120} className="flex items-baseline gap-4 border-b border-[var(--trait)] pb-4">
                <span className="font-[family-name:var(--titres)] text-[34px] italic text-[var(--accent-texte)]">{i + 1}</span>
                <span className="text-[22px]">{d}</span>
              </Apparition>
            ))}
          </ol>
          <Arche photo={photos.lampe} sizes="(min-width: 1024px) 35vw, 100vw" className="aspect-[4/5] w-full max-w-[360px]" />
        </aside>
      </div>
    </main>
  );
}
