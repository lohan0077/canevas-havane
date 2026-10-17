import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import PlaceAtelier from "../_composants/PlaceAtelier";
import { atelierInfo, cabinet, photos } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "L'atelier étiquettes — Rayon Frais, site de démonstration",
  description:
    "L'atelier du samedi matin d'une diététicienne imaginaire : à six, au rayon frais, on apprend à lire les étiquettes — jamais le cas de chacun.",
  ...adressesDeLaPage("/exemples/rayon-frais/atelier"),
};

const lining = "[font-variant-numeric:lining-nums]";

export default function Atelier() {
  return (
    <main>
      <section className="px-3 sm:px-6 pt-3 sm:pt-6">
        <div className="max-w-6xl mx-auto overflow-hidden rounded-[34px] bg-[#C2402A] text-white grid lg:grid-cols-2">
          <div className="px-6 py-12 sm:px-12 sm:py-16 space-y-6">
            <p className="text-sm font-semibold">Atelier étiquettes · pour le lancement</p>
            <h1 className="text-[52px] sm:text-7xl font-bold leading-[0.98]">Samedi matin, au rayon frais.</h1>
            <dl className={`grid grid-cols-2 gap-3 ${lining}`}>
              <div className="rounded-2xl bg-[#A8321E] p-4"><dt className="text-sm">Date</dt><dd className="font-[family-name:var(--titres)] text-xl font-semibold">{atelierInfo.date}</dd></div>
              <div className="rounded-2xl bg-[#A8321E] p-4"><dt className="text-sm">Heure</dt><dd className="font-[family-name:var(--titres)] text-xl font-semibold">{atelierInfo.heure} · {atelierInfo.duree}</dd></div>
              <div className="rounded-2xl bg-[#A8321E] p-4"><dt className="text-sm">À combien</dt><dd className="font-[family-name:var(--titres)] text-xl font-semibold">{atelierInfo.places} personnes</dd></div>
              <div className="rounded-2xl bg-[#A8321E] p-4"><dt className="text-sm">Prix</dt><dd className="font-[family-name:var(--titres)] text-xl font-semibold">{atelierInfo.prix} (exemple)</dd></div>
            </dl>
            <PlaceAtelier />
          </div>
          <div className="relative min-h-[280px]">
            <Image src={photos.cagettes.src} alt={photos.cagettes.alt} fill priority sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-5 sm:px-6 py-20 space-y-8">
        <h2 className="text-[40px] sm:text-6xl font-bold leading-[1.02]">Trois règles.</h2>
        <ol className="space-y-3">
          {atelierInfo.regles.map((r, i) => (
            <li key={r} className="flex gap-5 rounded-[22px] border-2 border-[var(--encre)] bg-[var(--carte)] p-6">
              <span className={`font-[family-name:var(--titres)] text-4xl font-bold text-[var(--accent-texte)] ${lining}`}>{i + 1}</span>
              <p className="self-center text-lg leading-relaxed">{r}</p>
            </li>
          ))}
        </ol>
        <p className="text-[var(--doux)]">
          Une vraie date, dans un cabinet fictif : l&apos;atelier n&apos;aura pas lieu. Animé par{" "}
          {cabinet.dieteticienne}, diététicienne diplômée (exemple). Aucune enseigne n&apos;est
          partenaire, aucune marque n&apos;est recommandée.
        </p>
      </section>
    </main>
  );
}
