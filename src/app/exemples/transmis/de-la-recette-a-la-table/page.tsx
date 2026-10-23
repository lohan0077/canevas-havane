import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, Bouton, EnTetePage, MOUTARDE, Note, SAUCE } from "../_composants/Blocs";
import CarnetEssais from "../_composants/CarnetEssais";
import { DOSSIER, ETAPES, photos } from "../_composants/donnees";

// « On la refait en cuisine, et tu viens goûter. Et c'est ta grand-mère qui valide. »
// Le chemin de la page du cahier à la table, et le carnet d'essais de la blanquette de
// Mamie Jo (exemple) : au troisième essai, c'est elle qui valide.
export const metadata: Metadata = {
  title: "De la recette à la table — Transmis, site de démonstration",
  description: "La recette refaite en cuisine, essai après essai, jusqu'à ce que la personne qui l'a transmise la valide. Site de démonstration.",
  ...adressesDeLaPage("/exemples/transmis/de-la-recette-a-la-table"),
};

const PAS: [string, string][] = [
  ["Cuisiner avec toi dans notre laboratoire", "tu goûtes, tu ne cuisines pas. C'est une cuisine professionnelle, avec ses règles d'hygiène."],
  ["Mettre du vin dans la recette", "on la cuisine sans, et on retrouve le goût autrement."],
  ["Raconter une histoire qui n'est pas la tienne", "sur la carte de table, on n'écrit que ce que ta famille sait vraiment."],
];

export default function DeLaRecetteALaTable() {
  return (
    <main>
      <EnTetePage note="on la refait en cuisine" titre="Et c'est elle *qui valide.*" photo={photos.mains}>
        On refait la recette, essai après essai. Tu viens goûter, avec la personne qui te l&apos;a transmise si elle le peut. Tant
        qu&apos;elle ne dit pas «&nbsp;c&apos;est ça&nbsp;», on recommence.
      </EnTetePage>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div className="space-y-6 lg:sticky lg:top-28">
          <Apparition><Note>le carnet d&apos;essais</Note></Apparition>
          <TitreRevele texte="Trois essais, *un tampon.*" className="font-[family-name:var(--titres)] text-[clamp(3rem,5.5vw,4.8rem)] font-normal leading-[0.95]" classeAccent={SAUCE} />
          <Apparition as="p" delai={150} className="max-w-md text-lg leading-relaxed text-[var(--doux)]">
            Chaque essai, sa date, et ce qu&apos;a dit la personne qui l&apos;a transmise. Au troisième, c&apos;est elle qui valide.
          </Apparition>
        </div>
        <Apparition de="zoom"><CarnetEssais /></Apparition>
      </section>

      <section className="px-3 sm:px-5">
        <div className="kit-grain rounded-[2.5rem] bg-[var(--sombre)] px-6 py-16 text-[var(--sur-sombre)] sm:px-12 md:py-24">
          <div className="mx-auto max-w-6xl space-y-10">
            <TitreRevele texte="Les quatre *temps.*" className="font-[family-name:var(--titres)] text-[clamp(2.8rem,5vw,4.4rem)] font-normal leading-[0.95]" classeAccent={MOUTARDE} />
            <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {ETAPES.map((e, i) => (
                <Apparition as="li" key={e.titre} delai={i * 110} className="space-y-3">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[18px]">
                    <Image src={photos[e.photo].src} alt={photos[e.photo].alt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
                  </div>
                  <p className="font-[family-name:var(--f-caveat)] text-[34px] leading-none text-[#E9C46A]">{i + 1}.</p>
                  <h2 className="font-[family-name:var(--titres)] text-[26px] font-normal italic leading-tight">{e.titre}</h2>
                  <p className="leading-relaxed text-[var(--sur-sombre)]/90">{e.texte}</p>
                </Apparition>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl space-y-6 px-5 py-24 sm:px-8 md:py-32">
        <Apparition><Note>ce qu&apos;on ne fait pas</Note></Apparition>
        <ul className="space-y-4 text-lg leading-relaxed">
          {PAS.map(([non, pourquoi], i) => (
            <Apparition as="li" key={non} delai={i * 110} className="border-b border-[var(--trait)] pb-4">
              <span className="kit-barre">{non}</span>&nbsp;: {pourquoi}
            </Apparition>
          ))}
        </ul>
        <Bouton href={`${DOSSIER}#recette`}>Envoyer ma recette</Bouton>
      </section>

      <AppelFinal />
    </main>
  );
}
