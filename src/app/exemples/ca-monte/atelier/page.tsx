import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import { Libelle } from "../_composants/Blocs";
import { FORFAITS, IMAGES, entreprise, euros } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Ça Monte — site de démonstration",
  description: "L'atelier d'un magasin de vélos imaginaire : les forfaits, leurs prix affichés, le test de batterie et le marquage.",
  ...adressesDeLaPage("/exemples/ca-monte/atelier"),
};

export default function Atelier() {
  return (
    <div>
      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 lg:grid-cols-2 lg:items-center lg:py-20">
          <div className="space-y-5">
            <Libelle clair>L&apos;atelier</Libelle>
            <h1 className="font-bold uppercase leading-[0.95] tracking-tight text-[48px] sm:text-[80px]">Les prix, <span className="text-[#D7F23C]">avant.</span></h1>
            <p className="max-w-md text-lg leading-relaxed text-[#C3C7CC]">Tu sais ce que ça coûte avant de déposer ton vélo. Si on trouve autre chose, on t&apos;appelle avant de toucher à quoi que ce soit.</p>
          </div>
          <div className="relative aspect-[3/2] overflow-hidden rounded-[28px]">
            <Image src={IMAGES.atelier.src} alt={IMAGES.atelier.alt} width={IMAGES.atelier.largeur} height={IMAGES.atelier.hauteur} sizes="(min-width: 1024px) 540px, 100vw" priority className="h-full w-full object-cover" />
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-4xl px-5 py-14 lg:py-20">
        <ul className="divide-y-2 divide-[var(--sombre)] border-y-2 border-[var(--sombre)]">
          {FORFAITS.map((f) => (
            <li key={f.nom} className="grid gap-1 py-5 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-6">
              <span>
                <span className="block text-[22px] font-bold">{f.nom}</span>
                <span className="block leading-relaxed text-[var(--doux)]">{f.detail}</span>
              </span>
              <span className="font-[family-name:var(--titres)] text-[32px] font-bold tabular-nums">{euros(f.prix)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-[13px] text-[var(--doux)]">Prix TTC d&apos;exemple : le magasin est fictif.</p>
        <div className="mt-10 rounded-[28px] bg-[#D7F23C] p-6">
          <h2 className="font-bold uppercase leading-[0.98] tracking-tight text-[32px]">Déposer ton vélo</h2>
          <p className="mt-2 leading-relaxed">Sans rendez-vous du mardi au samedi. Rendu en 48 h la plupart du temps ; on te prévient si c&apos;est plus.</p>
          <a href={`tel:${entreprise.telephone.replace(/ /g, "")}`} className="mt-4 inline-flex min-h-12 items-center rounded-full bg-[var(--sombre)] px-6 font-bold tabular-nums text-[#D7F23C]">{entreprise.telephone}</a>
        </div>
      </section>
    </div>
  );
}
