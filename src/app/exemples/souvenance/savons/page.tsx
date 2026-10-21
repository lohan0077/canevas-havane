import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, PHOTOS, PHOTO_DU_SAVON, PRIX, SAVONS } from "../_composants/donnees";
import { Etiquette, Pain, Surtitre } from "../_composants/Elements";

export const metadata: Metadata = {
  title: "Souvenance — site de démonstration",
  description: "Les trois savons d'une marque imaginaire, chacun avec son souvenir, son odeur et son étiquette complète.",
  ...adressesDeLaPage("/exemples/souvenance/savons"),
};

export default function Savons() {
  return (
    <main>
      <section className="mx-auto max-w-4xl px-5 pb-8 pt-14 text-center sm:px-8">
        <Surtitre>Les trois savons · {PRIX} € TTC · exemple</Surtitre>
        <h1 className="mt-5 text-[52px] font-normal leading-[1.02] sm:text-7xl">Trois odeurs <span className="italic text-[var(--accent-texte)]">d&apos;enfance.</span></h1>
        <p className="mx-auto mt-5 max-w-lg text-[18px] leading-relaxed text-[var(--doux)]">
          Pour chacun : le souvenir, l&apos;odeur, et l&apos;étiquette telle qu&apos;elle est imprimée.
        </p>
      </section>
      {SAVONS.map((s, i) => {
        const p = PHOTOS[PHOTO_DU_SAVON[s.slug]];
        return (
          <section key={s.slug} id={s.slug} className="scroll-mt-20 border-t border-[var(--trait)]">
            <div className="mx-auto grid max-w-5xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-2 md:items-center">
              <div className={`space-y-6 ${i % 2 ? "md:order-2" : ""}`}>
                <div className="overflow-hidden rounded-[28px]">
                  <Image src={p.src} alt={p.alt} width={p.largeur} height={p.hauteur} sizes="(min-width: 768px) 460px, 92vw" className="h-[260px] w-full object-cover" />
                </div>
                <Pain savon={s} incline={i % 2 ? 3 : -3} />
              </div>
              <div className="space-y-4">
                <Surtitre>Le souvenir · {s.souvenir.toLowerCase()}</Surtitre>
                <h2 className="text-[44px] font-normal italic leading-[1.02]">{s.nom}</h2>
                <p className="text-[19px] leading-relaxed">{s.odeur}</p>
                <Etiquette savon={s} />
              </div>
            </div>
          </section>
        );
      })}
      <section className="bg-[var(--carte)] border-t border-[var(--trait)]">
        <div className="mx-auto max-w-3xl space-y-4 px-5 py-14 text-center sm:px-8">
          <p className="text-[16px] leading-relaxed text-[var(--doux)]">
            Listes d&apos;ingrédients d&apos;exemple. Pour un vrai savon, c&apos;est la personne chargée de l&apos;évaluation
            de la sécurité qui les arrête, allergènes compris.
          </p>
          <Link href={`${DOSSIER}#souvenir`} className="inline-block rounded-full bg-[var(--accent)] px-7 py-3.5 font-semibold text-[var(--sur-accent)]">Trouver le mien</Link>
        </div>
      </section>
    </main>
  );
}
