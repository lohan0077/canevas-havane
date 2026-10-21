import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import { ouvertures, photos, pieces } from "../_composants/donnees";
import Fournee from "../_composants/Fournee";

export const metadata: Metadata = {
  title: "La fournée · Sortie de Four — site de démonstration",
  description: "Site de démonstration d'un atelier de céramique imaginaire : toutes les pièces de la fournée d'octobre, en ligne ou parties, une seule de chaque.",
  ...adressesDeLaPage("/exemples/sortie-de-four/fournee"),
};

const enLigne = pieces.filter((p) => !p.partie).length;
const parties = pieces.length - enLigne;

export default function LaFournee() {
  return (
    <div>
      <section className="mx-auto grid max-w-6xl gap-10 px-5 pb-12 pt-10 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div className="space-y-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--accent-texte)]">
            Sortie du four le {ouvertures.derniere.date}
          </p>
          <h1 className="text-[56px] font-normal sm:text-8xl">
            La fournée <span className="italic">d&apos;octobre.</span>
          </h1>
          <p className="max-w-xl text-lg leading-relaxed">
            {pieces.length} pièces sont sorties du four. {enLigne} sont encore en ligne, {parties} sont parties. Une
            seule de chaque : quand elle est partie, elle est partie.
          </p>
        </div>
        <Image
          src={photos.fournee.src}
          width={photos.fournee.largeur}
          height={photos.fournee.hauteur}
          alt={photos.fournee.alt}
          sizes="(min-width: 1024px) 380px, 100vw"
          priority
          className="aspect-[16/10] w-full rounded-[28px] object-cover lg:aspect-[4/5]"
        />
      </section>

      <section className="mx-auto max-w-6xl space-y-6 px-5 pb-16 sm:px-6" id="pieces">
        <Fournee />
        <p className="text-sm text-[var(--doux)]">
          Pièces, prix et ventes d&apos;exemple : l&apos;atelier est fictif. Prix TTC ; envoi en plus, indiqué sur chaque page.
        </p>
      </section>

      <section className="bg-[var(--sombre)] px-5 py-16 text-[var(--sur-sombre)] sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="text-4xl font-normal sm:text-5xl">
            Pas de réassort. <span className="italic text-[#E39A6E]">Une autre fournée.</span>
          </h2>
          <p className="max-w-md text-lg text-[#D9C3AE]">
            La suivante sort du four le {ouvertures.prochaine.date}, à {ouvertures.prochaine.heure}, en direct. Ce
            seront d&apos;autres pièces, avec d&apos;autres numéros.
          </p>
        </div>
      </section>
    </div>
  );
}
