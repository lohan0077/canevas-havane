import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import { AppelFinal, EnTetePage, Surtitre, Titre } from "../_composants/Blocs";
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
      <EnTetePage surtitre="Sur nos réseaux" titre="Pas de couchers de soleil. *Les coulisses.*" photo={photos.chaises} origine="50% 55%">
        Ce qu&apos;une wedding planner fait vraiment, c&apos;est ce que personne ne voit. Alors on le
        montre — après coup, et avec l&apos;accord des mariés.
      </EnTetePage>

      <section className="mx-auto grid max-w-6xl gap-16 px-6 py-28 md:py-40 lg:grid-cols-2 lg:items-center">
        <div className="space-y-6">
          <Apparition><Surtitre>Un épisode d&apos;exemple</Surtitre></Apparition>
          <Titre texte={"14 h 10 : *l'arche n'est pas là.*"} />
          <p className="max-w-[26rem] text-lg leading-relaxed text-[var(--doux)]">
            14 h 40 : montée. Les mariés n&apos;ont rien vu. Touche le téléphone pour passer d&apos;un plan à
            l&apos;autre.
          </p>
        </div>
        <Apparition data-film="coulisses"><Coulisses /></Apparition>
      </section>

      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto max-w-6xl space-y-14 px-6 py-28 md:py-40">
          <div className="space-y-5">
            <Apparition><Surtitre clair>Pour filmer</Surtitre></Apparition>
            <Titre texte="Nos trois *règles.*" clair />
          </div>
          <ol className="grid gap-10 md:grid-cols-3">
            {REGLES.map((r, i) => (
              <Apparition as="li" key={r.titre} delai={i * 120} className="space-y-3 border-t border-white/20 pt-5">
                <p className="text-[12px] font-medium uppercase tracking-[0.2em]">0{i + 1}</p>
                <h2 className="font-[family-name:var(--titres)] text-2xl font-normal">{r.titre}</h2>
                <p className="leading-relaxed">{r.texte}</p>
              </Apparition>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-16 px-6 py-28 md:py-40 lg:grid-cols-2 lg:items-center">
        <Apparition className="relative aspect-[4/5] max-h-[560px] overflow-hidden rounded-2xl">
          <Image src={photos.arche.src} alt={photos.arche.alt} fill sizes="(min-width: 1024px) 460px, 100vw" className="object-cover" />
        </Apparition>
        <div className="space-y-6">
          <Titre texte="À 15 h, *tout est en place.*" />
          <p className="max-w-[26rem] text-lg leading-relaxed text-[var(--doux)]">L&apos;arche, les chaises, les fleurs. Ce que les invités voient en arrivant, c&apos;est la fin de notre journée — et le début de la leur.</p>
        </div>
      </section>

      <AppelFinal />
    </main>
  );
}
