import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import { Surtitre } from "../_composants/Blocs";
import { cabinet, photos, porteOuverte } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Porte ouverte — Cinquante Minutes, site de démonstration",
  description:
    "La soirée porte ouverte d'un cabinet de psychologue imaginaire : on visite, on repart, personne ne demande rien.",
  ...adressesDeLaPage("/exemples/cinquante-minutes/porte-ouverte"),
};

export default function PorteOuverte() {
  return (
    <main>
      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-14 sm:py-20 grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <Surtitre clair>Pour l&apos;ouverture du cabinet</Surtitre>
            <h1 className="text-[46px] sm:text-7xl leading-[1.02]">
              Porte ouverte. <em className="text-[#C9A27E]">On ne vous demandera rien.</em>
            </h1>
            <p className="font-[family-name:var(--titres)] text-3xl [font-variant-numeric:lining-nums]">{porteOuverte.date}</p>
            <p className="text-xl text-[#E6D3BF]">{porteOuverte.heures} · {cabinet.adresse}, {cabinet.ville} (exemple)</p>
          </div>
          <div className="relative aspect-[3/2] overflow-hidden rounded-[24px]">
            <Image src={photos.entrouverte.src} alt={photos.entrouverte.alt} fill priority sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-5 sm:px-6 py-20 space-y-10">
        <h2 className="text-[36px] sm:text-5xl">Quatre règles, <em>pas une de plus.</em></h2>
        <ol className="space-y-4">
          {porteOuverte.regles.map((r, i) => (
            <li key={r} className="flex gap-5 rounded-[22px] bg-[var(--carte)] border border-[var(--trait)] p-6">
              <span className="font-[family-name:var(--titres)] text-4xl italic text-[var(--accent-texte)] [font-variant-numeric:lining-nums]">{i + 1}</span>
              <p className="text-lg leading-relaxed self-center">{r}</p>
            </li>
          ))}
        </ol>
        <div className="rounded-[26px] bg-[#3B2440] text-[var(--sur-sombre)] p-7 sm:p-10 space-y-3">
          <p className="font-[family-name:var(--titres)] text-3xl">L&apos;affiche</p>
          <p className="font-[family-name:var(--titres)] text-[34px] leading-tight italic text-[#C9A27E]">« Porte ouverte. On ne vous demandera rien. »</p>
          <p className="text-[#E6D3BF]">Cinquante Minutes · psychologue · {porteOuverte.date.toLowerCase()}, {porteOuverte.heures}</p>
        </div>
        <p className="text-[var(--doux)]">
          Une vraie date, dans un cabinet fictif : la soirée n&apos;aura pas lieu. Sur un vrai
          site, elle se tient hors des heures de séance, sans aucun patient présent.
        </p>
      </section>
    </main>
  );
}
