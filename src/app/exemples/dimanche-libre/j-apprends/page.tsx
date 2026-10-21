import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { COURS, DOSSIER, euros, photos } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Je veux apprendre : cours à domicile · Dimanche Libre — site de démonstration",
  description: "Les cours d'informatique à domicile de Dimanche Libre : appeler la famille en vidéo, ranger ses photos, payer en ligne sans stress. Prix HT et TTC d'exemple.",
  ...adressesDeLaPage("/exemples/dimanche-libre/j-apprends"),
};

const DEROULE = [
  { temps: "0 min", texte: "On s'assoit à côté de toi. Tu tiens la souris, ou la tablette." },
  { temps: "10 min", texte: "On fait une fois ensemble, lentement." },
  { temps: "45 min", texte: "Tu refais seul. On ne touche plus à rien." },
  { temps: "1 h 20", texte: "On écrit la fiche ensemble, en gros, pour le frigo." },
];

export default function JApprends() {
  return (
    <div>
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-14 pb-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div className="space-y-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#14614E]">Porte 2 · Je veux apprendre</p>
          <h1 className="text-[48px] sm:text-7xl font-extrabold leading-[0.95] tracking-[-0.03em]">Des cours qui donnent envie.</h1>
          <p className="text-lg leading-relaxed text-[var(--doux)]">Une heure et demie chez toi, sur ton propre appareil. On ne parle pas de « paramètres » : on parle de ce que tu veux faire.</p>
        </div>
        <div className="relative aspect-[3/2] overflow-hidden rounded-[30px]">
          <Image src={photos.tablette.src} alt={photos.tablette.alt} fill preload loading="eager" sizes="(min-width: 1024px) 460px, 100vw" className="object-cover" />
        </div>
      </section>

      <section data-film="cours" className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <ul className="grid gap-4 md:grid-cols-2">
          {COURS.map((c, i) => (
            <li key={c.id} id={`cours-${c.id}`} className="rounded-[30px] p-6 sm:p-8 space-y-4" style={{ background: c.teinte }}>
              <p className="flex items-center justify-between text-sm font-bold">
                <span>Cours {i + 1}</span>
                <span className="rounded-full bg-[var(--carte)] px-3 py-1">{c.duree} chez toi</span>
              </p>
              <h2 className="text-[34px] sm:text-4xl font-extrabold leading-[1.0] tracking-[-0.02em]">{c.titre}</h2>
              <p className="text-[17px] leading-relaxed">{c.texte}</p>
              <p className="flex flex-wrap items-baseline gap-x-3 border-t border-[var(--encre)]/15 pt-4">
                <span className="font-[family-name:var(--titres)] text-3xl font-extrabold tabular-nums">{euros(c.ht * 1.2)} TTC</span>
                <span className="text-[15px] tabular-nums">{euros(c.ht)} HT · exemple</span>
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* L'avantage fiscal, à part du prix. */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <div className="rounded-[30px] border-2 border-[#1B7A63] bg-[var(--carte)] p-6 sm:p-8 space-y-3">
          <h2 className="text-2xl sm:text-3xl font-extrabold">Et le crédit d&apos;impôt&nbsp;?</h2>
          <p className="leading-relaxed">
            Les cours, l&apos;installation et la maintenance des logiciels chez toi peuvent ouvrir
            droit au crédit d&apos;impôt pour les services à la personne, sous conditions&nbsp;:
            une entreprise déclarée, une prestation à ta résidence, et un plafond de 3&nbsp;000&nbsp;€
            de dépenses par an et par foyer. Les prix ci-dessus sont ceux que tu paies&nbsp;;
            l&apos;avantage fiscal se calcule à part, sur ta déclaration.
          </p>
          <Link href={`${DOSSIER}/credit-d-impot`} className="inline-block font-bold underline underline-offset-4 decoration-[#1B7A63] decoration-[3px]">La vraie réponse, situation par situation →</Link>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-20 sm:pb-28 space-y-8">
        <h2 className="text-[38px] sm:text-5xl font-extrabold leading-[1.0] tracking-[-0.02em]">Un cours, minute par minute.</h2>
        <ol className="space-y-3">
          {DEROULE.map((d) => (
            <li key={d.temps} className="grid grid-cols-[84px_1fr] gap-4 rounded-[22px] bg-[var(--carte)] border border-[var(--trait)] px-5 py-4">
              <span className="font-[family-name:var(--titres)] text-xl font-extrabold tabular-nums text-[var(--accent-texte)]">{d.temps.replace(/ /g, " ")}</span>
              <span className="leading-relaxed">{d.texte}</span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
