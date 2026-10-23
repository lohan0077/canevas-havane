import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, EnTetePage } from "../_composants/Blocs";
import Coulisses from "../_composants/Coulisses";
import { photos } from "../_composants/donnees";

// « Et sur TikTok, pas de mariés au coucher du soleil. Les coulisses. » (vidéo « Remplir
// l'agenda »). L'épisode montré est un exemple écrit pour la démonstration.
export const metadata: Metadata = {
  title: "Les coulisses — Et s'il pleut, site de démonstration",
  description: "Les coulisses du jour J, comme une wedding planner imaginaire les publierait : ce que les invités n'ont pas vu. Un épisode d'exemple, écrit pour la démonstration.",
  ...adressesDeLaPage("/exemples/et-s-il-pleut/coulisses"),
};

const REGLES = [
  { titre: "L'accord écrit des mariés", texte: "Avant chaque épisode, signé, et révocable : un mot, et la vidéo disparaît." },
  { titre: "Aucun visage d'invité", texte: "On filme les mains, les fleurs, les rallonges. Pas les gens qui n'ont rien demandé." },
  { titre: "Aucun prestataire nommé", texte: "Une arche en retard, ça arrive à tout le monde. Personne n'est montré du doigt." },
];

export default function PageCoulisses() {
  return (
    <main>
      <EnTetePage
        surtitre="Sur nos réseaux"
        titre="Pas de couchers de soleil. *Les coulisses.*"
        aside={
          <Apparition de="zoom" delai={250} data-film="coulisses" className="w-full [&_button]:shadow-[0_40px_80px_-30px_rgba(0,0,0,.7)] [&_button]:ring-1 [&_button]:ring-white/25 [&_figcaption]:text-[var(--sur-sombre)]">
            <Coulisses />
          </Apparition>
        }
      >
        Ce qu&apos;une wedding planner fait vraiment, c&apos;est ce que personne ne voit. Alors on le
        montre — après coup, et avec l&apos;accord des mariés.
      </EnTetePage>

      <section className="mx-auto max-w-6xl space-y-12 px-5 py-24 sm:px-8">
        <TitreRevele texte="Nos trois règles *pour filmer.*" className="text-[clamp(2.8rem,6vw,5rem)] font-normal leading-[0.96]" classeAccent="italic text-[var(--accent-texte)]" />
        <ol className="grid gap-6 md:grid-cols-3">
          {REGLES.map((r, i) => (
            <Apparition as="li" key={r.titre} delai={i * 120} className="space-y-3 border-t border-[var(--encre)] pt-5">
              <p className="font-[family-name:var(--titres)] text-5xl italic text-[var(--accent-texte)]">{i + 1}</p>
              <h2 className="text-2xl font-normal">{r.titre}</h2>
              <p className="leading-relaxed text-[var(--doux)]">{r.texte}</p>
            </Apparition>
          ))}
        </ol>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-5 pb-24 sm:px-8 lg:grid-cols-2 lg:items-center">
        <Apparition de="rideau" className="relative aspect-[3/4] max-h-[560px] overflow-hidden rounded-t-full">
          <Image src={photos.arche.src} alt={photos.arche.alt} fill sizes="(min-width: 1024px) 460px, 100vw" className="kit-cinema-img object-cover" />
        </Apparition>
        <div className="space-y-5">
          <TitreRevele texte="À 15 h, *tout est en place.*" className="text-[clamp(2.6rem,5vw,4.4rem)] font-normal leading-[0.98]" classeAccent="italic text-[var(--accent-texte)]" />
          <p className="text-lg leading-relaxed text-[var(--doux)]">L&apos;arche, les chaises, les fleurs. Ce que les invités voient en arrivant, c&apos;est la fin de notre journée — et le début de la leur.</p>
        </div>
      </section>

      <AppelFinal />
    </main>
  );
}
