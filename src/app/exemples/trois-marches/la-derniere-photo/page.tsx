import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import { Intitule } from "../_composants/Blocs";
import DernierePhoto from "../_composants/DernierePhoto";
import Gravure from "../_composants/Gravure";
import { photos } from "../_composants/donnees";

// La dernière photo de famille, sur le perron : offerte à chaque vente, tirée sur papier,
// jamais publiée. Avec l'accord écrit de chacun ; pour un enfant, de ses deux parents.
// Pas de fausse rareté : elle est pour toutes les ventes.
export const metadata: Metadata = {
  title: "La dernière photo — Trois Marches, site de démonstration",
  description: "À chaque vente, la dernière photo de famille sur le perron, offerte et tirée sur papier. Exemple d'une agence immobilière imaginaire.",
  ...adressesDeLaPage("/exemples/trois-marches/la-derniere-photo"),
};

const ETAPES = [
  { titre: "Vous choisissez le moment", texte: "Un dimanche avant l'acte, la veille, ou le matin des clés." },
  { titre: "On vient avec l'appareil", texte: "Vingt minutes, sur les marches, devant la porte. Ceux qui veulent, comme ils veulent." },
  { titre: "Vous recevez le tirage", texte: "Une photo sur papier, 18 × 24, le jour de l'acte. Le fichier aussi, si vous le voulez." },
];

export default function PageDernierePhoto() {
  return (
    <>
      <section className="border-b border-[var(--trait)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <Intitule gauche niveau={1} surtitre="Offerte à chaque vente" titre={<>La dernière photo, <span className="italic">devant la maison.</span></>}>
              Celle qu&apos;on oublie de prendre, parce qu&apos;on a la tête dans les cartons. On la prend pour
              vous, sur le perron, et on vous la donne tirée sur papier.
            </Intitule>
            <ul className="space-y-2 text-[16px]">
              <li>· Comprise dans nos honoraires : 0 € de plus, inscrite au barème.</li>
              <li>· Seulement avec l&apos;accord écrit de chacun.</li>
              <li>· Jamais publiée, ni sur ce site, ni ailleurs.</li>
            </ul>
          </div>
          <div className="relative mx-auto w-full max-w-[400px] rotate-[2deg] bg-[var(--carte)] p-4 pb-16 shadow-[0_24px_50px_rgba(62,58,54,0.18)]">
            <div className="relative aspect-[3/4]">
              <Image src={photos.perron.src} alt={photos.perron.alt} fill priority sizes="400px" className="object-cover" />
            </div>
            <p className="absolute bottom-4 left-0 right-0 text-center font-[family-name:var(--f-caveat)] text-[26px]">En attendant la vôtre</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <ol className="grid gap-8 md:grid-cols-3">
          {ETAPES.map((e, i) => (
            <li key={e.titre} className="space-y-3 border-t border-[var(--encre)] pt-5">
              <p className="font-[family-name:var(--titres)] text-[44px] leading-none">{i + 1}</p>
              <h2 className="text-[26px] font-normal">{e.titre}</h2>
              <p className="leading-relaxed text-[var(--doux)]">{e.texte}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-[#E9EFE6]">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6">
            <Intitule gauche surtitre="Vous vendez avec nous" titre={<>Choisir <span className="italic">le moment.</span></>}>
              Le moment, puis l&apos;accord. Pour un enfant, il faut celui de ses deux parents.
            </Intitule>
            <Gravure id="tm-photo" className="w-full max-w-[380px] text-[var(--encre)]" />
          </div>
          <DernierePhoto />
        </div>
      </section>
    </>
  );
}
