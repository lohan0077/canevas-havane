import type { Metadata } from "next";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, cabinet, reponse } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Diététicienne ou nutritionniste ? — Mardi Soir, site de démonstration",
  description:
    "La page d'une diététicienne imaginaire qui répond à « diététicienne ou nutritionniste ? », avec son diplôme dessous : diététicien est un titre protégé par la loi.",
  ...adressesDeLaPage("/exemples/mardi-soir/dieteticienne-ou-nutritionniste"),
};

export default function DieteticienneOuNutritionniste() {
  return (
    <main>
      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="max-w-4xl mx-auto px-5 sm:px-6 pt-10 pb-14 sm:py-20 space-y-6">
          <p className="text-sm font-semibold text-[#F2C14E]">La question que tout le monde tape</p>
          <h1 className="text-[44px] sm:text-7xl leading-[1.02]">{reponse.titre}</h1>
          <p className="text-xl leading-relaxed text-[#D6E2DC]">{reponse.court}</p>
          <div id="diplome" className="rounded-[24px] bg-[#F2C14E] text-[#173B33] p-6 space-y-1" data-film="diplome">
            <p className="text-sm font-semibold">Mon diplôme</p>
            <p className="font-[family-name:var(--titres)] text-2xl">{cabinet.dieteticienne}, diététicienne</p>
            <p>{cabinet.diplome}</p>
            <p className="[font-variant-numeric:lining-nums]">N° ADELI {cabinet.adeli} (exemple)</p>
            <p className="pt-2 text-sm font-semibold">Code de la santé publique, art. L4371-2 et L4372-2</p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-5 sm:px-6 py-16 space-y-4">
        {reponse.points.map((p, i) => (
          <article key={p.titre} id={`point-${i + 1}`} className="rounded-[26px] bg-[var(--carte)] border border-[var(--trait)] p-6 sm:p-8 space-y-3">
            <h2 className="text-[28px] sm:text-4xl">{p.titre}</h2>
            <p className="text-lg leading-relaxed">{p.texte}</p>
            {p.source && <p className="text-sm font-semibold text-[var(--accent-texte)]">{p.source}</p>}
          </article>
        ))}
        <p className="pt-2 text-[var(--doux)]">
          Résumé des textes, à lire en entier sur Légifrance. Cette page répond à une question de
          vocabulaire ; elle ne remplace ni un avis médical, ni une séance.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Link href={`${DOSSIER}/reserver`} className="inline-flex items-center justify-center min-h-14 rounded-full bg-[var(--encre)] text-[var(--fond)] px-8 text-lg font-semibold">Réserver un soir</Link>
          <Link href={`${DOSSIER}#frigo`} className="inline-flex items-center justify-center min-h-14 rounded-full border-2 border-[var(--encre)] px-8 text-lg font-semibold">Votre frigo, d&apos;abord</Link>
        </div>
      </section>
    </main>
  );
}
