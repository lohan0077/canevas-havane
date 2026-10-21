import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import CalculVacances from "../_composants/CalculVacances";
import { OFFRES, entreprise, euros, photos } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Nos nuits et nos prix · Veilleuse — site de démonstration",
  description: "Maison, commerce, chantier, fête : ce que Veilleuse veille la nuit, et à quel prix d'exemple. Démonstration de Canevas Havane.",
  ...adressesDeLaPage("/exemples/veilleuse/nos-nuits"),
};

const PROS = [
  { titre: "Commerce, rondes de nuit", detail: "trois rondes à heures variables, rideau et alarme vérifiés", prix: 120 },
  { titre: "Chantier, agent sur place", detail: "de 19 h à 7 h, un agent, le rapport le matin", prix: 290 },
  { titre: "Entrepôt, rondes de nuit", detail: "quatre rondes, quais et accès vérifiés", prix: 150 },
];

export default function NosNuits() {
  return (
    <div>
      <section className="max-w-6xl mx-auto px-5 sm:px-6 pt-10 sm:pt-16 pb-16 grid gap-10 lg:grid-cols-2 lg:items-start">
        <div className="space-y-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent-texte)]">Nos nuits et nos prix</p>
          <h1 className="text-[44px] sm:text-7xl font-normal leading-[1.0]">Ta maison, <span className="text-[var(--accent-texte)]">quand tu pars.</span></h1>
          <p className="text-lg leading-relaxed text-[var(--doux)]">
            Choisis le nombre de nuits et de passages&nbsp;: le prix s&apos;affiche tout de suite.
            Pas de « tarif sur demande ».
          </p>
          <div className="relative aspect-[16/9] overflow-hidden rounded-[28px] bg-[#1A2B24]">
            <Image src={photos.maison.src} alt={photos.maison.alt} fill sizes="(min-width: 1024px) 540px, 100vw" className="object-cover" />
          </div>
        </div>
        <CalculVacances />
      </section>

      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-20 space-y-10">
          <div className="space-y-4 max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)]">Pour les professionnels</p>
            <h2 className="text-[40px] sm:text-6xl font-normal leading-[1.02]">Commerces, chantiers, entrepôts.</h2>
            <p className="text-[#C9C2B3]">Prix hors taxes, par nuit, à titre d&apos;exemple. Le prix ferme vient après la visite, gratuite.</p>
          </div>
          <ul className="divide-y divide-[#3E5449] border-y border-[#3E5449]">
            {PROS.map((p) => (
              <li key={p.titre} className="py-5 grid gap-1 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-8">
                <span className="font-[family-name:var(--titres)] text-2xl">{p.titre}</span>
                <span className="text-xl font-bold tabular-nums sm:text-right">dès {euros(p.prix)} HT</span>
                <span className="text-[#C9C2B3] sm:col-span-2">{p.detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 sm:px-6 py-20 sm:py-24 space-y-10">
        <h2 className="text-[40px] sm:text-6xl font-normal leading-[1.02]">Tout ce qu&apos;on veille.</h2>
        <ul className="grid gap-4 sm:grid-cols-2">
          {OFFRES.map((o) => (
            <li key={o.titre} className="rounded-[26px] bg-[var(--carte)] border border-[var(--trait)] p-6 space-y-3">
              <h3 className="text-[28px] font-normal leading-tight">{o.titre}</h3>
              <p className="leading-relaxed text-[var(--doux)]">{o.texte}</p>
              <p className="font-bold">{o.prix} <span className="font-normal text-sm text-[var(--doux)]">· exemple, {o.pour}</span></p>
            </li>
          ))}
        </ul>
        <p className="text-[var(--doux)]">
          Une question avant&nbsp;? <a href={`tel:${entreprise.telephoneLien}`} className="font-bold text-[var(--encre)] underline underline-offset-4">{entreprise.telephone}</a>, on répond jusqu&apos;à 22 h.
        </p>
      </section>
    </div>
  );
}
