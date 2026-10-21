import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, LOTS, PHOTOS, PRIX, RECETTES } from "../_composants/donnees";
import { Etiquette, Technique } from "../_composants/Elements";

export const metadata: Metadata = {
  title: "La Coulée — site de démonstration",
  description: "Les trois savons d'une savonnerie imaginaire, chacun avec son étiquette complète et ses ingrédients en noms INCI expliqués.",
  ...adressesDeLaPage("/exemples/la-coulee/savons"),
};

const LEXIQUE = [
  ["Sodium Olivate", "L'huile d'olive, une fois devenue savon."],
  ["Sodium Cocoate", "L'huile de coco, une fois devenue savon."],
  ["Aqua", "L'eau."],
  ["Glycerin", "La glycérine, qui se forme pendant la saponification."],
  ["Lavandula Angustifolia Oil", "L'huile essentielle de lavande vraie."],
  ["Rosmarinus Officinalis Leaf Oil", "L'huile essentielle de feuilles de romarin."],
  ["Linalool, Limonene", "Des composants des huiles essentielles, que l'étiquette doit nommer au-delà d'un certain seuil."],
];

export default function Savons() {
  const dernier = (id: string) => [...LOTS].reverse().find((l) => l.recette === id)!;
  return (
    <main>
      <section className="mx-auto max-w-6xl px-4 pb-6 pt-8 sm:px-8">
        <Technique>Les savons · 100 g · {PRIX} € TTC · exemple</Technique>
        <h1 className="mt-5 text-[54px] font-bold uppercase leading-[0.9] tracking-[-0.035em] sm:text-[96px]">Trois recettes, une base.</h1>
        <p className="mt-5 max-w-xl text-[19px] leading-relaxed">
          Chaque savon, avec son étiquette telle qu&apos;elle est imprimée, et ses ingrédients traduits en français.
        </p>
      </section>

      {Object.values(RECETTES).map((r) => (
        <section key={r.id} className="border-t border-[var(--trait)]" id={r.id}>
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-8 md:grid-cols-2 md:items-center">
            <div className="space-y-4">
              <h2 className="text-[38px] font-bold uppercase leading-[0.95] tracking-[-0.03em] sm:text-5xl">{r.nom}</h2>
              <p className="text-[19px]">{r.phrase}</p>
              {r.id === "lavande" && (
                <div className="overflow-hidden rounded-[6px]">
                  <Image src={PHOTOS.lavande.src} alt={PHOTOS.lavande.alt} width={PHOTOS.lavande.largeur} height={PHOTOS.lavande.hauteur} sizes="(min-width: 768px) 540px, 94vw" className="h-auto w-full" />
                </div>
              )}
              <p className="font-mono text-[13px] uppercase tracking-[0.1em] text-[var(--doux)]">Étiquette du lot {dernier(r.id).numero}</p>
            </div>
            <Etiquette lot={dernier(r.id)} />
          </div>
        </section>
      ))}

      <section className="bg-[var(--carte)] border-t border-[var(--encre)]">
        <div className="mx-auto max-w-6xl space-y-8 px-4 py-16 sm:px-8">
          <h2 className="text-[38px] font-bold uppercase leading-[0.95] tracking-[-0.03em] sm:text-5xl">Les mots de l&apos;étiquette.</h2>
          <dl className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
            {LEXIQUE.map(([t, d]) => (
              <div key={t} className="grid gap-1 py-4 sm:grid-cols-[0.9fr_1.1fr] sm:gap-6">
                <dt className="font-mono text-[15px] font-bold">{t}</dt>
                <dd className="text-[17px]">{d}</dd>
              </div>
            ))}
          </dl>
          <p className="text-[15px] text-[var(--doux)]">
            Listes d&apos;ingrédients d&apos;exemple. Pour un vrai savon, c&apos;est la personne chargée de
            l&apos;évaluation de la sécurité qui les arrête.
          </p>
          <Link href={`${DOSSIER}/sechoir`} className="inline-block rounded-[6px] bg-[var(--accent)] px-5 py-3 font-mono text-[13px] font-bold uppercase tracking-[0.12em] text-[var(--sur-accent)]">Le prochain lot</Link>
        </div>
      </section>
    </main>
  );
}
