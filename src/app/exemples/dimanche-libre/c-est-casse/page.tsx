import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import TarifDepannage from "../_composants/TarifDepannage";
import { DEPANNAGE, DOSSIER, euros, horsTaxe, photos } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "C'est cassé : dépannage à domicile · Dimanche Libre — site de démonstration",
  description: "Le dépannage informatique à domicile de Dimanche Libre : déplacement, demi-heures, forfaits, en prix TTC d'exemple. Démonstration de Canevas Havane.",
  ...adressesDeLaPage("/exemples/dimanche-libre/c-est-casse"),
};

const ON_FAIT = ["Ordinateur lent, virus, fenêtres qui s'ouvrent seules", "Imprimante, scanner, box, wifi", "Téléphone ou tablette qui ne se synchronise plus", "Récupérer des fichiers sur un vieil ordinateur"];
const ON_NE_FAIT_PAS = ["La soudure et les réparations de carte mère : on te dit où aller", "Le dépannage à distance, au téléphone", "La vente d'ordinateurs : on t'aide à choisir, tu achètes où tu veux"];

export default function CestCasse() {
  return (
    <div>
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-14 pb-14 grid gap-10 lg:grid-cols-2 lg:items-start">
        <div className="space-y-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent-texte)]">Porte 1 · C&apos;est cassé</p>
          <h1 className="text-[48px] sm:text-7xl font-extrabold leading-[0.95] tracking-[-0.03em]">Dépannage, prix clair.</h1>
          <p className="text-lg leading-relaxed text-[var(--doux)]">
            Un déplacement, puis le temps passé, à la demi-heure. Tu sais combien avant qu&apos;on
            sonne. Et on te le dit tout de suite&nbsp;: le dépannage n&apos;ouvre pas droit au
            crédit d&apos;impôt.
          </p>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[30px]">
            <Image src={photos.imprimante.src} alt={photos.imprimante.alt} fill sizes="(min-width: 1024px) 540px, 100vw" className="object-cover" />
          </div>
        </div>
        <TarifDepannage />
      </section>

      <section className="px-3">
        <div className="max-w-6xl mx-auto rounded-[36px] bg-[#FFE8E1] px-5 py-14 sm:px-10 space-y-8">
          <h2 className="text-[38px] sm:text-5xl font-extrabold leading-[1.0] tracking-[-0.02em]">Les forfaits.</h2>
          <ul className="grid gap-3 md:grid-cols-3">
            {DEPANNAGE.forfaits.map((f) => (
              <li key={f.titre} className="rounded-[26px] bg-[var(--carte)] p-5 space-y-3">
                <h3 className="text-2xl font-extrabold leading-tight">{f.titre}</h3>
                <p className="text-[var(--doux)]">{f.detail}</p>
                <p className="font-[family-name:var(--titres)] text-3xl font-extrabold tabular-nums">{euros(f.prix)} TTC</p>
                <p className="text-sm text-[var(--doux)]">soit {euros(horsTaxe(f.prix))} HT · déplacement compris · exemple</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 grid gap-10 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold">Ce qu&apos;on répare</h2>
          <ul className="space-y-2.5">
            {ON_FAIT.map((x) => <li key={x} className="flex gap-3 rounded-[18px] bg-[var(--carte)] border border-[var(--trait)] px-4 py-3"><span aria-hidden="true" className="font-bold text-[#14614E]">✓</span>{x}</li>)}
          </ul>
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold">Ce qu&apos;on ne fait pas</h2>
          <ul className="space-y-2.5">
            {ON_NE_FAIT_PAS.map((x) => <li key={x} className="flex gap-3 rounded-[18px] border-2 border-dashed border-[var(--trait)] px-4 py-3 text-[var(--doux)]"><span aria-hidden="true">✕</span>{x}</li>)}
          </ul>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <div className="rounded-[30px] bg-[var(--sombre)] text-[var(--sur-sombre)] p-6 sm:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <p className="font-[family-name:var(--titres)] text-3xl font-extrabold leading-tight">Et si au fond, tu voulais apprendre&nbsp;?</p>
          <Link href={`${DOSSIER}/j-apprends`} className="shrink-0 rounded-full bg-[#7FD8BE] text-[var(--encre)] px-6 py-3.5 font-bold text-center">Porte 2 : les cours</Link>
        </div>
      </section>
    </div>
  );
}
