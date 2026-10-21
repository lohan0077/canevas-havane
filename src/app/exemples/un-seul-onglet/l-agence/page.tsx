import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, EQUIPE, ETAPES, FAQ, MENTIONS_TOURISME, entreprise, photos } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "L'agence · Un Seul Onglet — site de démonstration",
  description: "Qui sont les conseillers, comment se passent les trente minutes, et les mentions du Code du tourisme. Agence fictive, site de démonstration.",
  ...adressesDeLaPage("/exemples/un-seul-onglet/l-agence"),
};

export default function LAgence() {
  return (
    <main>
      <header className="mx-auto max-w-6xl space-y-4 px-5 pt-10 sm:pt-16">
        <p className="text-sm font-bold text-[var(--accent-texte)]">L&apos;agence</p>
        <h1 className="max-w-4xl text-[3rem] sm:text-7xl font-medium">On ouvre les onglets <em>à ta place.</em></h1>
      </header>
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:py-16 md:grid-cols-2 md:items-start">
        <Image src={photos.polynesie.src} width={photos.polynesie.largeur} height={photos.polynesie.hauteur} alt={photos.polynesie.alt} sizes="(min-width: 768px) 560px, 100vw" className="aspect-[4/3] w-full rounded-3xl object-cover" />
        <ol className="space-y-6">
          {ETAPES.map((e, i) => (
            <li key={e.titre} className="grid grid-cols-[2.5rem_1fr] gap-4">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-[var(--accent)] font-bold text-[var(--sur-accent)] tabular-nums">{i + 1}</span>
              <div className="space-y-1">
                <h2 className="text-2xl font-medium">{e.titre}</h2>
                <p className="leading-relaxed text-[var(--doux)]">{e.texte}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
      <section className="bg-[var(--carte)] border-y border-[var(--trait)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1fr_1.2fr]">
          <div className="space-y-4">
            <h2 className="text-4xl sm:text-5xl font-medium">Les conseillers</h2>
            <p className="text-[var(--doux)]">Prénoms d&apos;exemple : l&apos;agence est fictive.</p>
          </div>
          <ul className="space-y-4">
            {EQUIPE.map((p) => (
              <li key={p.prenom} className="flex items-center gap-4 rounded-2xl bg-[var(--fond)] p-4">
                <span aria-hidden="true" className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[var(--accent)] font-bold text-[var(--sur-accent)]">{p.initiales}</span>
                <span><span className="block font-[family-name:var(--titres)] text-2xl">{p.prenom}</span><span className="block text-sm text-[var(--doux)]">{p.role}</span></span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-4xl sm:text-5xl font-medium">Venir, ou pas</h2>
          <p className="text-lg leading-relaxed">{entreprise.adresse}, {entreprise.ville}<br />{entreprise.horaires}</p>
          <p><a href={`tel:${entreprise.telephoneLien}`} className="text-lg font-semibold underline underline-offset-4">{entreprise.telephone}</a></p>
          <p className="text-sm text-[var(--doux)]">Adresse et numéro d&apos;exemple : le numéro appartient à la tranche réservée à la fiction.</p>
          <Link href={`${DOSSIER}#questions`} className="inline-flex min-h-12 items-center rounded-xl bg-[var(--accent)] px-6 font-bold text-[var(--sur-accent)]">Ferme tes onglets</Link>
        </div>
        <dl className="grid gap-3 rounded-2xl bg-[var(--carte)] p-6 text-sm">
          <p className="font-[family-name:var(--titres)] text-2xl">Ce que dit le Code du tourisme</p>
          {MENTIONS_TOURISME.map((m) => (
            <div key={m.libelle}><dt className="font-bold">{m.libelle}</dt><dd className="text-[var(--doux)]">{m.valeur}</dd></div>
          ))}
        </dl>
      </section>
      <section className="mx-auto max-w-3xl space-y-4 px-5 pb-16">
        <h2 className="text-4xl font-medium">Questions</h2>
        <ul className="space-y-2">
          {FAQ.map((x) => (
            <li key={x.q} className="rounded-xl bg-[var(--carte)] p-5">
              <h3 className="font-[family-name:var(--texte)] font-bold">{x.q}</h3>
              <p className="mt-1 leading-relaxed text-[var(--doux)]">{x.r}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
