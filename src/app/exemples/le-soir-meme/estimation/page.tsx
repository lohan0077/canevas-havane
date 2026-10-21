import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import { HautDePage } from "../_composants/Blocs";
import Estimation from "../_composants/Estimation";
import { agence, photos } from "../_composants/donnees";

// « Faire estimer ma maison » : le seul bouton de l'accueil. Le vendeur choisit son
// créneau lui-même. La carte professionnelle est en vue, avec son lieu de délivrance
// (décret n° 72-678, art. 92) — numéro d'exemple.
export const metadata: Metadata = {
  title: "Faire estimer ma maison — Le Soir Même, site de démonstration",
  description: "Choisir soi-même son créneau d'estimation : une visite sur place, un avis de valeur écrit, le barème avant tout. Exemple d'une agence immobilière imaginaire.",
  ...adressesDeLaPage("/exemples/le-soir-meme/estimation"),
};

const DEROULE = ["Une visite sur place", "Un avis de valeur écrit", "Notre barème, avant tout"];

export default function PageEstimation() {
  return (
    <>
      <HautDePage surtitre="Estimation" titre={<>Faire estimer <span className="italic text-[var(--accent)]">ma maison.</span></>}>
        <p>Choisis ton créneau. On vient chez toi, une heure, et tu reçois un avis de valeur écrit : 0&nbsp;€, sans engagement.</p>
        <p className="mt-4 text-[14px]">
          Carte pro n°&nbsp;{agence.carte.replace(/ /g, " ")}, délivrée par la {agence.cci} (exemple)
        </p>
      </HautDePage>

      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-12 sm:px-8 lg:grid-cols-[1.1fr_0.9fr]">
        <section aria-label="Les créneaux">
          <Estimation />
        </section>
        <aside className="space-y-8">
          <ol className="space-y-4">
            {DEROULE.map((d, i) => (
              <li key={d} className="flex items-baseline gap-4 border-b border-[var(--trait)] pb-4">
                <span className="font-[family-name:var(--titres)] text-[30px] italic text-[var(--accent-texte)]">{i + 1}</span>
                <span className="text-[22px]">{d}</span>
              </li>
            ))}
          </ol>
          <div className="relative aspect-[3/2] overflow-hidden rounded-[24px]">
            <Image src={photos.salon.src} alt={photos.salon.alt} fill sizes="(min-width: 1024px) 460px, 100vw" className="object-cover" />
          </div>
        </aside>
      </div>
    </>
  );
}
