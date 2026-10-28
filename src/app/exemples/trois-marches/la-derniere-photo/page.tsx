import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { ACCENT, AppelFinal, EnTetePage, Surtitre, TITRE } from "../_composants/Blocs";
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
    <main>
      <EnTetePage
        surtitre="Offerte à chaque vente"
        titre="La dernière photo, *devant la maison.*"
        aCote={
          <div className="relative mx-auto w-full max-w-[360px] rotate-[2deg] bg-white p-4 pb-16 shadow-[0_30px_60px_-20px_rgba(62,58,54,0.35)]">
            <div className="relative aspect-[3/4]">
              <Image src={photos.perron.src} alt={photos.perron.alt} fill priority sizes="360px" className="object-cover" />
            </div>
            <p className="absolute bottom-4 left-0 right-0 text-center font-[family-name:var(--f-caveat)] text-[28px]">En attendant la vôtre</p>
          </div>
        }
      >
        Celle qu&apos;on oublie de prendre, parce qu&apos;on a la tête dans les cartons. On la prend pour
        vous, sur le perron, et on vous la donne tirée sur papier. Comprise dans nos honoraires,
        inscrite au barème à 0 € ; seulement avec l&apos;accord écrit de chacun ; jamais publiée.
      </EnTetePage>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28">
        <ol className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {ETAPES.map((e, i) => (
            <li key={e.titre} className="space-y-3 rounded-t-[999px] border border-[var(--trait)] bg-[var(--carte)] px-7 pb-8 pt-16">
              <p className="text-center font-[family-name:var(--titres)] text-[54px] italic leading-none text-[var(--accent-texte)]">{i + 1}</p>
              <h2 className="text-[26px] font-normal">{e.titre}</h2>
              <p className="leading-relaxed text-[var(--doux)]">{e.texte}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-[#E9EFE6]">
        <div className="mx-auto grid grid-cols-1 max-w-7xl gap-12 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6">
            <Apparition><Surtitre>Vous vendez avec nous</Surtitre></Apparition>
            <TitreRevele texte="Choisir *le moment.*" className={`text-[clamp(2.8rem,5.6vw,5rem)] ${TITRE}`} classeAccent={ACCENT} />
            <p className="text-[18px] leading-relaxed text-[var(--doux)]">Le moment, puis l&apos;accord. Pour un enfant, il faut celui de ses deux parents.</p>
            <Gravure id="tm-photo" className="w-full max-w-[380px] text-[var(--encre)]" />
          </div>
          <DernierePhoto />
        </div>
      </section>
      <AppelFinal />
    </main>
  );
}
