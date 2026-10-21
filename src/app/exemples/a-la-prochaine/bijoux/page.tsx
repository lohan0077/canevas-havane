import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import { Libelle } from "../_composants/Blocs";
import { BIJOUX, euros } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "À la Prochaine — site de démonstration",
  description: "Les quatre bijoux d'une marque imaginaire : en or plein, gravés d'un numéro, faits pour être transmis.",
  ...adressesDeLaPage("/exemples/a-la-prochaine/bijoux"),
};

export default function Bijoux() {
  return (
    <div>
      <section className="mx-auto max-w-6xl px-5 pb-6 pt-10 lg:pt-16">
        <Libelle>Les bijoux</Libelle>
        <h1 className="mt-4 max-w-3xl text-[56px] sm:text-[80px]">
          Faits pour durer <em>plus que toi.</em>
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--doux)]">
          Quatre bijoux, en or jaune 750 millièmes. Chacun est gravé de son numéro avant de quitter l&apos;atelier, et porte les poinçons que la loi impose à l&apos;or.
        </p>
      </section>
      <div className="mx-auto max-w-6xl divide-y divide-[var(--trait)] px-5">
        {BIJOUX.map((b, i) => (
          <article key={b.id} id={b.id} className="grid scroll-mt-20 gap-8 py-12 md:grid-cols-2 md:items-center">
            <div className={`relative aspect-[4/5] overflow-hidden ${i % 2 ? "md:order-2" : ""}`}>
              <Image src={b.image.src} alt={b.image.alt} width={b.image.largeur} height={b.image.hauteur} sizes="(min-width: 768px) 540px, 100vw" className="h-full w-full object-cover" />
            </div>
            <div className="space-y-4">
              <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[var(--accent-texte)]">{b.type}</p>
              <h2 className="text-[52px] italic">{b.nom}</h2>
              <p className="text-lg leading-relaxed text-[var(--doux)]">{b.texte}</p>
              <dl className="divide-y divide-[var(--trait)] border-y border-[var(--trait)] text-[15px]">
                <div className="flex justify-between gap-6 py-3"><dt className="text-[var(--doux)]">Matière</dt><dd className="font-semibold">{b.matiere}</dd></div>
                <div className="flex justify-between gap-6 py-3"><dt className="text-[var(--doux)]">Gravure</dt><dd className="font-semibold">Son numéro, à l&apos;intérieur</dd></div>
                <div className="flex justify-between gap-6 py-3"><dt className="text-[var(--doux)]">Prix</dt><dd className="font-semibold">{euros(b.prix)} TTC · exemple</dd></div>
              </dl>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
