import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, Bouton, EnTetePage, Surtitre } from "../_composants/Blocs";
import DepotPhoto from "../_composants/DepotPhoto";
import { DOSSIER, MUR, VITRINE, photos } from "../_composants/donnees";

// Le coup de lancement de la vidéo « Créer une marque » : « Apporte la plus vieille photo
// de ta famille. On l'expose en vitrine, avec ton accord. » Le mur est dessiné (des cadres
// et des années, aucune photo réelle) ; le dépôt se prépare ici, et rien n'est envoyé.
export const metadata: Metadata = {
  title: "La vitrine — Pour Plus Tard, site de démonstration",
  description: "Apporte la plus vieille photo de ta famille : exposée en vitrine en novembre, avec l'accord de chacun. Site de démonstration réalisé par Canevas Havane.",
  ...adressesDeLaPage("/exemples/pour-plus-tard/la-vitrine"),
};

const REGLES = [
  { titre: "Avec l'accord de chacun", texte: "Des personnes sur la photo si elles sont vivantes, ou de leurs proches. Sans accord, la photo ne va pas en vitrine." },
  { titre: "L'original repart avec toi", texte: "On la scanne devant toi, au comptoir. C'est un tirage qui est exposé, jamais ta photo." },
  { titre: "Plutôt une photo de famille", texte: "Un vieux portrait de studio reste protégé soixante-dix ans après la mort de son photographe. Une photo prise par un grand-oncle, elle, est à la famille." },
];

const FONDS = [
  "bg-[linear-gradient(#b9a17f_0_55%,#7a6249_55%)]",
  "bg-[radial-gradient(circle_at_50%_40%,#cdb48e_0_30%,#8c735a_31%)]",
  "bg-[linear-gradient(160deg,#d3bf9c_0_50%,#6e5946_50%)]",
];

export default function LaVitrine() {
  return (
    <main>
      <EnTetePage
        surtitre={`La vitrine · ${VITRINE.dates}`}
        titre="Apporte ta plus vieille *photo.*"
        tirages={[{ ...photos.vieuxTirage, legende: "1957" }, { ...photos.boite1942, legende: "1942" }, { ...photos.albumFleurs, legende: "l'album" }]}
      >
        On l&apos;expose en vitrine, avec ton accord. Du 2 au 28 novembre, la vitrine du studio devient un
        mur : les plus vieilles photos de famille du quartier, une par famille. Et en bas à droite, un
        cadre vide.
      </EnTetePage>

      {/* ---------- Le mur ---------- */}
      <section aria-label="Le mur de la vitrine, dessiné" className="bg-[#C9A27E] text-[#2A211D]">
        <div className="mx-auto max-w-7xl space-y-10 px-5 py-20 sm:px-8 md:py-28">
          <div className="max-w-3xl space-y-6">
            <Apparition><Surtitre numero="1">Le mur</Surtitre></Apparition>
            <TitreRevele
              texte="Un mur entier *de grands-parents.*"
              className="font-[family-name:var(--titres)] text-[clamp(2.6rem,5.6vw,4.8rem)] font-medium leading-[0.95] tracking-[-0.03em]"
              classeAccent="italic"
            />
          </div>
          <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4 lg:grid-cols-6">
            {MUR.map((annee, i) => (
              <Apparition as="li" key={annee} de="zoom" delai={i * 60} className={`bg-[#FBF7EF] p-2 pb-1 shadow-[0_18px_30px_-20px_rgba(0,0,0,0.7)] ${i % 3 === 1 ? "rotate-[1.5deg]" : i % 3 === 2 ? "-rotate-1" : ""}`}>
                <span aria-hidden="true" className={`block aspect-[4/5] ${FONDS[i % 3]} [filter:sepia(.4)]`} />
                <span className="block pt-0.5 text-center font-[family-name:var(--f-caveat)] text-[21px] leading-tight text-[#3B2F2A]">{annee}</span>
              </Apparition>
            ))}
            <li className="grid border-2 border-dashed border-[#2A211D] p-2 pb-1">
              <span className="grid aspect-[4/5] place-items-center text-center font-[family-name:var(--titres)] text-xl italic">Et nous&nbsp;?</span>
              <span className="block pt-0.5 text-center font-[family-name:var(--f-caveat)] text-[21px] leading-tight">2026</span>
            </li>
          </ul>
          <p className="text-[15px]">Cadres dessinés : aucune photo réelle n&apos;est montrée ici, le studio est fictif.</p>
        </div>
      </section>

      {/* ---------- Les règles et le dépôt ---------- */}
      <section className="mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[1fr_1.1fr] lg:items-start">
        <div className="space-y-8">
          <div className="space-y-6">
            <Apparition><Surtitre numero="2" className="text-[var(--doux)]">Les règles du mur</Surtitre></Apparition>
            <TitreRevele
              texte="Trois règles, *pas une de plus.*"
              className="font-[family-name:var(--titres)] text-[clamp(2.4rem,4.6vw,3.8rem)] font-medium leading-[0.95] tracking-[-0.03em]"
              classeAccent="italic text-[var(--accent-texte)]"
            />
          </div>
          <ol className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
            {REGLES.map((r, i) => (
              <Apparition as="li" key={r.titre} delai={i * 110} className="grid grid-cols-[3rem_1fr] gap-4 py-6">
                <span className="font-[family-name:var(--titres)] text-[2.2rem] italic leading-none text-[var(--accent-texte)]">{i + 1}</span>
                <span className="space-y-2">
                  <span className="block font-[family-name:var(--titres)] text-[1.6rem] leading-tight">{r.titre}</span>
                  <span className="block text-[17px] leading-relaxed text-[var(--doux)]">{r.texte}</span>
                </span>
              </Apparition>
            ))}
          </ol>
        </div>
        <div className="space-y-5">
          <Apparition><Surtitre numero="3" className="text-[var(--doux)]">Préparer ton dépôt</Surtitre></Apparition>
          <Apparition de="zoom">
            <DepotPhoto />
          </Apparition>
        </div>
      </section>

      {/* ---------- Et nous ? ---------- */}
      <section className="px-3 sm:px-5">
        <div className="overflow-hidden rounded-[6px] bg-[var(--accent)] text-[var(--sur-accent)]">
          <div className="mx-auto max-w-4xl space-y-7 px-6 py-20 text-center sm:px-10 md:py-28">
            <TitreRevele
              texte={"Et nous, *on a quoi\u202f?*"}
              className="font-[family-name:var(--titres)] text-[clamp(3rem,7vw,6rem)] font-medium leading-[0.92] tracking-[-0.035em]"
              classeAccent="italic"
            />
            <p className="mx-auto max-w-xl text-lg leading-relaxed">
              Chacun repart du mur avec la même question. La réponse tient dans une boîte de vingt tirages.
            </p>
            <Bouton href={`${DOSSIER}/la-boite`} variante="clair">Voir la boîte</Bouton>
          </div>
        </div>
      </section>

      <div className="h-6" />
      <AppelFinal />
    </main>
  );
}
