import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, ETAPES, photos } from "../_composants/donnees";
import { Note } from "../_composants/Blocs";
import CarnetEssais from "../_composants/CarnetEssais";

// « On la refait en cuisine, et tu viens goûter. Et c'est ta grand-mère qui valide. »
// Le chemin de la page du cahier à la table, et le carnet d'essais de la blanquette de
// Mamie Jo (exemple) : au troisième essai, c'est elle qui valide.
export const metadata: Metadata = {
  title: "De la recette à la table · Transmis — site de démonstration",
  description: "La recette refaite en cuisine, essai après essai, jusqu'à ce que la personne qui l'a transmise la valide. Site de démonstration.",
  ...adressesDeLaPage("/exemples/transmis/de-la-recette-a-la-table"),
};

export default function DeLaRecetteALaTable() {
  return (
    <div>
      <section className="max-w-6xl mx-auto px-5 pt-10 pb-14 sm:pt-16 grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
        <div className="space-y-5">
          <Note>On la refait en cuisine</Note>
          <h1 className="text-[48px] sm:text-7xl font-normal">Et c&apos;est elle <em className="text-[var(--accent-texte)]">qui valide.</em></h1>
          <p className="text-lg leading-relaxed text-[var(--doux)]">
            On refait la recette, essai après essai. Tu viens goûter, avec la personne qui te l&apos;a transmise si elle le
            peut. Tant qu&apos;elle ne dit pas « c&apos;est ça », on recommence.
          </p>
          <div className="relative hidden lg:block aspect-[3/4] max-w-sm overflow-hidden rounded-[6px]">
            <Image src={photos.mains.src} alt={photos.mains.alt} fill sizes="380px" className="object-cover" />
          </div>
        </div>
        <CarnetEssais />
      </section>

      <section className="border-t border-[var(--trait)] bg-[var(--carte)]">
        <div className="max-w-6xl mx-auto px-5 py-16 sm:py-24 space-y-10">
          <h2 className="text-[42px] sm:text-6xl font-normal">Les quatre temps.</h2>
          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ETAPES.map((e, i) => (
              <li key={e.titre} className="space-y-2 border-t-2 border-[var(--encre)] pt-4">
                <p className="font-[family-name:var(--f-caveat)] text-[34px] leading-none text-[var(--accent-texte)]">{i + 1}.</p>
                <h3 className="text-[26px] italic leading-tight">{e.titre}</h3>
                <p className="leading-relaxed text-[var(--doux)]">{e.texte}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-5 py-16 sm:py-20 space-y-5">
        <h2 className="text-[36px] sm:text-5xl font-normal">Ce qu&apos;on ne fait pas</h2>
        <ul className="space-y-3 text-lg leading-relaxed">
          <li>— Cuisiner avec toi dans notre laboratoire : tu goûtes, tu ne cuisines pas. C&apos;est une cuisine professionnelle, avec ses règles d&apos;hygiène.</li>
          <li>— Mettre du vin dans la recette : on la cuisine sans, et on retrouve le goût autrement.</li>
          <li>— Raconter une histoire qui n&apos;est pas la tienne sur la carte de table.</li>
        </ul>
        <Link href={`${DOSSIER}#recette`} className="inline-flex h-14 items-center rounded-full bg-[var(--accent)] px-7 text-[17px] font-semibold text-[var(--sur-accent)]">
          Envoyer ma recette
        </Link>
      </section>
    </div>
  );
}
