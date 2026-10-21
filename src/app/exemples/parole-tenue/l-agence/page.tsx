import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Creneaux from "../../_kit/Creneaux";
import { CRENEAUX, ETAPES, FAQ, MENTIONS_TOURISME, entreprise, photos } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "L'agence · Parole Tenue — site de démonstration",
  description: "Comment on tient une promesse, un rendez-vous, et les mentions du Code du tourisme. Agence fictive, site de démonstration.",
  ...adressesDeLaPage("/exemples/parole-tenue/l-agence"),
};

export default function LAgence() {
  return (
    <main>
      <header className="mx-auto max-w-6xl space-y-5 px-5 pt-12 sm:pt-20">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-texte)]">L&apos;agence</p>
        <h1 className="max-w-4xl text-[3rem] sm:text-7xl font-normal">On ne vend qu&apos;une chose : <em>les voyages promis.</em></h1>
      </header>
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:py-16 md:grid-cols-2 md:items-start">
        <Image src={photos.venise.src} width={photos.venise.largeur} height={photos.venise.hauteur} alt={photos.venise.alt} sizes="(min-width: 768px) 540px, 100vw" className="aspect-[4/3] w-full rounded-t-full object-cover" />
        <ol className="space-y-6">
          {ETAPES.map((e, i) => (
            <li key={e.titre} className="grid grid-cols-[2.5rem_1fr] gap-3 border-t-2 border-[var(--encre)] pt-4">
              <span className="font-[family-name:var(--titres)] text-4xl italic text-[var(--accent-texte)] [font-variant-numeric:lining-nums]">{i + 1}</span>
              <div className="space-y-1"><h2 className="text-2xl font-normal">{e.titre}</h2><p className="leading-relaxed text-[var(--doux)]">{e.texte}</p></div>
            </li>
          ))}
        </ol>
      </section>
      <section id="rendez-vous" className="scroll-mt-20 border-y-2 border-[var(--encre)] bg-[#F3EAD8]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-4">
            <h2 className="text-4xl sm:text-5xl font-normal">Un rendez-vous, <em>pour la tenir.</em></h2>
            <p className="leading-relaxed">Une heure, à l&apos;agence ({entreprise.adresse}, {entreprise.ville}) ou en visio. Gratuit, sans engagement.</p>
            <p><a href={`tel:${entreprise.telephoneLien}`} className="font-semibold underline underline-offset-4">{entreprise.telephone}</a> · {entreprise.horaires}</p>
          </div>
          <Creneaux
            creneaux={CRENEAUX}
            colonnes={3}
            titreCarte="Ton rendez-vous"
            bouton="Réserver ce rendez-vous"
            confirmation="Réservé : {creneau}. On viendra avec une date et un budget, à toi de dire oui."
            note="Créneaux pris : exemple."
          />
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-4xl font-normal">Ce que dit le Code du tourisme</h2>
          <dl className="grid gap-3 text-sm">
            {MENTIONS_TOURISME.map((m) => (<div key={m.libelle} className="border-t border-[var(--trait)] pt-3"><dt className="font-semibold">{m.libelle}</dt><dd className="text-[var(--doux)]">{m.valeur}</dd></div>))}
          </dl>
          <p className="text-sm text-[var(--doux)]">Art. R.211-2. Si l&apos;agence fait défaut, sa garantie financière sert à rembourser les sommes versées (art. L.211-18 ; conditions à l&apos;art. R.211-31).</p>
        </div>
        <div className="space-y-4">
          <h2 className="text-4xl font-normal">Questions</h2>
          <ul className="space-y-4">
            {FAQ.map((x) => (<li key={x.q} className="border-t border-[var(--trait)] pt-3"><h3 className="font-[family-name:var(--texte)] text-base font-semibold">{x.q}</h3><p className="mt-1 leading-relaxed text-[var(--doux)]">{x.r}</p></li>))}
          </ul>
        </div>
      </section>
    </main>
  );
}
