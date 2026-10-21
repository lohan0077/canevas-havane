import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Compteur from "../_composants/Compteur";
import Meules from "../_composants/Meules";
import MoisParMois from "../_composants/MoisParMois";
import { MEULES, photos } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Réserver une meule — Patience, site de démonstration",
  description: "Réserver sa meule de grande tomme à la fromagerie Patience (entreprise fictive) : six mois de cave, une photo par mois, prête le 14 avril.",
  ...adressesDeLaPage("/exemples/patience/meules"),
};

const ETAPES = [
  ["Aujourd'hui", "Tu choisis ton numéro. La meule reste en cave, à sa place."],
  ["Chaque mois", "On la retourne, on la brosse, on la photographie. Tu reçois la photo."],
  [`Le ${MEULES.pret}`, "Elle est prête. Tu viens la chercher, tu la paies au retrait."],
  ["Le samedi d'après", "On coupe les meules devant tout le quartier."],
];

export default function PageMeules() {
  return (
    <div>
      <section className="mx-auto grid max-w-6xl gap-10 px-5 pb-14 pt-12 sm:pt-20 md:grid-cols-[1fr_1fr]">
        <div className="space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--accent-texte)]">Réserver une meule</p>
          <h1 className="text-5xl sm:text-7xl">Prête le <em className="text-[var(--accent-texte)]">14 avril.</em></h1>
          <p className="text-lg leading-relaxed text-[var(--doux)]">
            Trente grandes tommes de 4 kg, entrées en cave le 14 octobre. Elles ont déjà
            commencé à compter :
          </p>
          <div className="rounded-[20px] border border-[var(--trait)] bg-[var(--carte)] p-6">
            <Compteur entree={MEULES.entree} dureeJours={182} />
          </div>
          <div className="relative aspect-[3/2] overflow-hidden rounded-[20px]">
            <Image src={photos.bloc.src} alt={photos.bloc.alt} fill sizes="(min-width: 768px) 560px, 100vw" className="object-cover" priority />
          </div>
        </div>
        <Meules />
      </section>

      <section className="border-y border-[var(--trait)] bg-[var(--sombre)]">
        <div className="mx-auto max-w-6xl space-y-10 px-5 py-16 sm:py-20">
          <h2 className="text-4xl">Six mois, <em className="text-[var(--accent-texte)]">pas à pas.</em></h2>
          <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {ETAPES.map(([t, x]) => (
              <li key={t} className="space-y-2 border-t border-[var(--accent)] pt-4">
                <p className="font-[family-name:var(--titres)] text-2xl italic">{t}</p>
                <p className="leading-relaxed text-[var(--doux)]">{x}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-8 px-5 py-16 sm:py-20">
        <h2 className="text-4xl">Une photo d&apos;elle, <em className="text-[var(--accent-texte)]">chaque mois.</em></h2>
        <MoisParMois />
        <p className="text-sm text-[var(--doux)]">Dessins à la place des photos : la meule est fictive.</p>
      </section>
    </div>
  );
}
