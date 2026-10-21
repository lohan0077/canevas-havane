import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Bascule from "../_composants/Bascule";
import Devis from "../_composants/Devis";
import { MOMENTS, PROTOCOLE, entreprise, photos } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Deux versions · Et s'il pleut — site de démonstration",
  description: "Un mariage d'exemple en deux versions, soleil ou pluie : la bascule, le protocole météo et le devis où le plan B est chiffré. Démonstration de Canevas Havane.",
  ...adressesDeLaPage("/exemples/et-s-il-pleut/deux-versions"),
};

export default function DeuxVersions() {
  return (
    <div>
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-14 space-y-6">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--doux)]">Un mariage d&apos;exemple</p>
        <h1 className="text-[52px] sm:text-8xl font-normal leading-[0.94] tracking-[-0.02em]">Soleil, <span className="italic">ou pluie.</span></h1>
        <p className="max-w-xl text-lg leading-relaxed text-[var(--doux)]">Tu bascules, et tu vois ton mariage dans les deux cas. Les lieux changent ; l&apos;heure, le déroulé et les gens restent.</p>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-16">
        <Bascule grand />
      </section>

      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-16 sm:py-20 space-y-8">
          <h2 className="text-[42px] sm:text-6xl font-normal leading-[0.98]">Côte à côte.</h2>
          <div className="overflow-hidden rounded-[24px] border border-[#4A5A70]">
            <div className="grid grid-cols-[1fr_1fr] bg-[#26313F] text-xs uppercase tracking-[0.18em]">
              <p className="px-4 py-3 text-[var(--accent)]">☀ Soleil</p>
              <p className="px-4 py-3 text-[#B9C6D6] border-l border-[#4A5A70]">☂ Pluie</p>
            </div>
            {MOMENTS.map((m) => (
              <div key={m.moment} className="border-t border-[#4A5A70]">
                <p className="px-4 pt-3 text-xs uppercase tracking-[0.16em] text-[#B9C6D6]">{m.moment} · {m.heure.replace(/ /g, " ")}</p>
                <div className="grid grid-cols-[1fr_1fr]">
                  <p className="px-4 pb-3 pt-1 font-[family-name:var(--titres)] text-lg leading-snug">{m.soleil}</p>
                  <p className="px-4 pb-3 pt-1 font-[family-name:var(--titres)] text-lg leading-snug border-l border-[#4A5A70]">{m.pluie}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div className="space-y-6">
          <h2 className="text-[42px] sm:text-6xl font-normal leading-[0.98]">Prévu, chiffré, <span className="italic">réservé.</span></h2>
          <p className="text-lg leading-relaxed text-[var(--doux)]">Le plan B a ses lignes dans le devis, comme le plan A. L&apos;annoncer sans le chiffrer, ce serait le promettre sans le tenir.</p>
          <ol className="space-y-4">
            {PROTOCOLE.map((p) => (
              <li key={p.quand} className="grid grid-cols-[92px_1fr] gap-3 border-t border-[var(--trait)] pt-3">
                <span className="font-[family-name:var(--titres)] text-xl italic">{p.quand.replace(/ /g, " ")}</span>
                <span className="leading-relaxed text-[var(--doux)]">{p.texte}</span>
              </li>
            ))}
          </ol>
        </div>
        <Devis />
      </section>

      <section className="relative isolate overflow-hidden bg-[#1E2733] text-[var(--sur-sombre)]">
        <Image src={photos.fenetre.src} alt="" fill sizes="100vw" className="-z-10 object-cover opacity-30" />
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-20 space-y-5">
          <p className="font-[family-name:var(--titres)] text-[44px] sm:text-7xl leading-[0.98]">Le jour J, tu ne regardes <span className="italic text-[var(--accent)]">plus le ciel.</span></p>
          <a href={`tel:${entreprise.telephoneLien}`} className="inline-flex rounded-full bg-[var(--accent)] text-[var(--sur-accent)] px-6 py-3.5 font-semibold">{entreprise.telephone}</a>
        </div>
      </section>
    </div>
  );
}
