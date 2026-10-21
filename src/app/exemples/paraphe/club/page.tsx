import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Club from "../_composants/Club";
import { Libelle } from "../_composants/Blocs";
import { CLUB, IMAGES } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Paraphe — site de démonstration",
  description: "Le club des livres pas finis d'une librairie imaginaire : chacun apporte celui qu'il a lâché page cinquante.",
  ...adressesDeLaPage("/exemples/paraphe/club"),
};

const DEROULE = [
  { h: "19 h", t: "On s'assoit. Chacun pose sur la table le livre qu'il a lâché." },
  { h: "19 h 15", t: "Un par un, on dit la page où l'on s'est arrêté, et pourquoi. Personne n'a tort." },
  { h: "20 h 15", t: "Les lecteurs de la boutique proposent, à chacun, un livre qu'il finira." },
  { h: "20 h 45", t: "On repart. Avec ou sans livre : on ne vend rien ce soir-là." },
];

export default function PageClub() {
  return (
    <div>
      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-2 md:items-center lg:py-20">
          <div className="space-y-5">
            <Libelle clair>Le premier soir · {CLUB.date} · {CLUB.heure}</Libelle>
            <h1 className="text-[52px] leading-[1.02] sm:text-[76px]">
              Le club des livres <em>pas finis.</em>
            </h1>
            <p className="text-lg leading-relaxed">
              Chacun apporte celui qu&apos;il a lâché page cinquante. Et repart avec un livre qu&apos;il va finir. Celui-là, oui.
            </p>
          </div>
          <Club />
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-[1.2fr_0.8fr]">
        <div>
          <h2 className="text-[40px] leading-tight sm:text-[52px]">Comment <em>ça se passe.</em></h2>
          <ol className="mt-8 divide-y divide-dashed divide-[var(--trait)] border-y border-[var(--trait)]">
            {DEROULE.map((d) => (
              <li key={d.h} className="grid grid-cols-[88px_1fr] gap-4 py-5">
                <span className="font-[family-name:var(--titres)] text-[24px] italic text-[var(--accent-texte)]">{d.h}</span>
                <span className="leading-relaxed">{d.t}</span>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-[13px] text-[var(--doux)]">Soirée gratuite, sans achat, {CLUB.places}. Date d&apos;exemple : la librairie est fictive.</p>
        </div>
        <div className="relative aspect-[3/2] overflow-hidden md:aspect-[4/5]">
          <Image src={IMAGES.lunettes.src} alt={IMAGES.lunettes.alt} width={IMAGES.lunettes.largeur} height={IMAGES.lunettes.hauteur} sizes="(min-width: 768px) 440px, 100vw" className="h-full w-full object-cover" />
        </div>
      </section>
    </div>
  );
}
