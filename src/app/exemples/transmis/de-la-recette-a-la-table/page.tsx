import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import { AppelFinal, Bouton, EnTetePage, Section, Titre } from "../_composants/Blocs";
import CarnetEssais from "../_composants/CarnetEssais";
import { DOSSIER, ETAPES, photos } from "../_composants/donnees";

// « On la refait en cuisine, et tu viens goûter. Et c'est ta grand-mère qui valide. »
// Le carnet d'essais de la blanquette de Mamie Jo (exemple) : au troisième essai, c'est
// elle qui valide. Puis les quatre temps, et ce qu'on ne fait pas.
export const metadata: Metadata = {
  title: "De la recette à la table — Transmis, site de démonstration",
  description: "La recette refaite en cuisine, essai après essai, jusqu'à ce que la personne qui l'a transmise la valide. Site de démonstration.",
  ...adressesDeLaPage("/exemples/transmis/de-la-recette-a-la-table"),
};

const PHOTOS_ETAPES = [photos.papier, photos.mains, photos.ragout, photos.poisson];

const PAS: [string, string][] = [
  ["Cuisiner avec toi dans notre laboratoire", "tu goûtes, tu ne cuisines pas. C'est une cuisine professionnelle, avec ses règles d'hygiène."],
  ["Mettre du vin dans la recette", "on la cuisine sans, et on retrouve le goût autrement."],
  ["Raconter une histoire qui n'est pas la tienne", "sur la carte de table, on n'écrit que ce que ta famille sait vraiment."],
];

export default function DeLaRecetteALaTable() {
  return (
    <main>
      <EnTetePage titre="On la refait en cuisine, et c'est elle qui valide." photo={photos.mains} origine="50% 35%">
        On refait la recette, essai après essai. Tu viens goûter, avec la personne qui te l&apos;a transmise si elle le peut. Tant
        qu&apos;elle ne dit pas «&nbsp;c&apos;est ça&nbsp;», on recommence.
      </EnTetePage>

      <Section className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div className="space-y-6 lg:sticky lg:top-28">
          <Titre texte="Trois essais, un tampon." />
          <p className="max-w-md text-lg leading-relaxed text-[var(--doux)]">
            Le carnet d&apos;essais&nbsp;: chaque essai, sa date, et ce qu&apos;a dit la personne qui l&apos;a transmise. Au troisième,
            c&apos;est elle qui valide.
          </p>
        </div>
        <Apparition delai={150}><CarnetEssais /></Apparition>
      </Section>

      <Section fond="bg-[var(--sombre)] text-[var(--sur-sombre)]" className="space-y-14">
        <Titre texte="De la page à la table, en quatre temps." clair />
        <ol className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-6">
          {ETAPES.map((e, i) => (
            <Apparition as="li" key={e.titre} delai={i * 90} className="space-y-4">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                <Image src={PHOTOS_ETAPES[i].src} alt={PHOTOS_ETAPES[i].alt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
              </div>
              <p className="text-[15px]">Étape {i + 1}</p>
              <h2 className="font-[family-name:var(--titres)] text-xl font-normal leading-snug">{e.titre}</h2>
              <p className="text-[15px] leading-relaxed">{e.texte}</p>
            </Apparition>
          ))}
        </ol>
      </Section>

      <Section>
        <div className="max-w-3xl space-y-10">
        <Titre texte="Trois choses qu'on ne fait jamais." />
        <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)] text-lg leading-relaxed">
          {PAS.map(([non, pourquoi]) => (
            <li key={non} className="py-5">
              <span className="line-through decoration-[var(--accent)] decoration-[0.09em]">{non}</span>&nbsp;: <span className="text-[var(--doux)]">{pourquoi}</span>
            </li>
          ))}
        </ul>
        <Bouton href={`${DOSSIER}#recette`}>Envoyer ma recette</Bouton>
        </div>
      </Section>

      <AppelFinal />
    </main>
  );
}
