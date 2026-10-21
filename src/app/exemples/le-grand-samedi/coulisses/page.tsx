import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Coulisses from "../_composants/Coulisses";
import { photos } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Les coulisses · Le Grand Samedi — site de démonstration",
  description: "Les coulisses du jour J, comme Le Grand Samedi les publierait : ce que les invités n'ont pas vu. Un épisode d'exemple, écrit pour la démonstration.",
  ...adressesDeLaPage("/exemples/le-grand-samedi/coulisses"),
};

const REGLES = [
  { titre: "L'accord écrit des mariés", texte: "Avant chaque épisode, signé, et révocable : un mot, et la vidéo disparaît." },
  { titre: "Aucun visage d'invité", texte: "On filme les mains, les fleurs, les rallonges. Pas les gens qui n'ont rien demandé." },
  { titre: "Aucun prestataire nommé", texte: "Une arche en retard, ça arrive à tout le monde. Personne n'est montré du doigt." },
];

export default function PageCoulisses() {
  return (
    <div>
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 sm:pt-14 pb-16 grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div className="space-y-6">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-[var(--accent-texte)]">Sur nos réseaux</p>
          <h1 className="text-[56px] sm:text-8xl font-normal leading-[0.94] tracking-[-0.02em]">Pas de couchers de soleil. <span className="italic text-[var(--accent-texte)]">Les coulisses.</span></h1>
          <p className="max-w-lg text-lg leading-relaxed text-[var(--doux)]">Ce qu&apos;un wedding planner fait vraiment, c&apos;est ce que personne ne voit. Alors on le montre — après coup, et avec l&apos;accord des mariés.</p>
        </div>
        <div data-film="coulisses">
          <Coulisses />
        </div>
      </section>

      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-16 sm:py-20 space-y-10">
          <h2 className="text-[42px] sm:text-6xl font-normal leading-[0.98]">Nos trois règles <span className="italic text-[#D9B98A]">pour filmer.</span></h2>
          <ol className="grid gap-6 md:grid-cols-3">
            {REGLES.map((r, i) => (
              <li key={r.titre} className="space-y-3 border-t border-[#4A3238] pt-5">
                <p className="font-[family-name:var(--titres)] text-4xl italic text-[#D9B98A]">{i + 1}</p>
                <h3 className="text-2xl font-normal">{r.titre}</h3>
                <p className="leading-relaxed text-[#CDBDB5]">{r.texte}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 grid gap-8 lg:grid-cols-2 lg:items-center">
        <div className="relative aspect-[3/4] max-h-[520px] overflow-hidden rounded-[30px]">
          <Image src={photos.chaises.src} alt={photos.chaises.alt} fill sizes="(min-width: 1024px) 460px, 100vw" className="object-cover object-[50%_55%]" />
        </div>
        <div className="space-y-5">
          <h2 className="text-[42px] sm:text-6xl font-normal leading-[0.98]">À 15 h, <span className="italic">tout est en place.</span></h2>
          <p className="text-lg leading-relaxed text-[var(--doux)]">Les chaises, les fleurs, les rubans. Ce que les invités voient en arrivant, c&apos;est la fin de notre journée — et le début de la leur.</p>
        </div>
      </section>
    </div>
  );
}
