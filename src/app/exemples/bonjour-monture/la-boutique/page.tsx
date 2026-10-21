import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { ATELIER, DOSSIER, EQUIPE, FAQ, entreprise, photos } from "../_composants/donnees";
import { Faq, Surtitre } from "../_composants/Blocs";

export const metadata: Metadata = {
  title: "La boutique · Bonjour Monture — site de démonstration",
  description: "Où venir, quand, qui t'accueille, et ce que fait l'atelier. Bonjour Monture est un opticien fictif, site de démonstration.",
  ...adressesDeLaPage("/exemples/bonjour-monture/la-boutique"),
};

export default function LaBoutique() {
  return (
    <main>
      <header className="mx-auto max-w-6xl px-5 pt-12 sm:pt-20 space-y-5">
        <Surtitre>La boutique</Surtitre>
        <h1 className="max-w-4xl text-[2.9rem] sm:text-7xl">
          Une petite boutique, <em className="text-[var(--accent-texte)]">une grande table.</em>
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed">
          Au fond, la table où se posent les plateaux. Derrière, l&apos;atelier. Devant, un mur
          de montures qu&apos;on regarde volontiers, mais qu&apos;on n&apos;essaie pas au hasard.
        </p>
      </header>

      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:py-20 md:grid-cols-[1.2fr_1fr] md:items-start">
        <Image
          src={photos.verte.src}
          width={photos.verte.largeur}
          height={photos.verte.hauteur}
          alt={photos.verte.alt}
          sizes="(min-width: 768px) 600px, 100vw"
          className="aspect-[4/3] w-full rounded-[4px] object-cover"
        />
        <dl className="grid gap-6">
          <div>
            <dt className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--accent-texte)]">Adresse</dt>
            <dd className="mt-1 font-[family-name:var(--titres)] text-3xl">{entreprise.adresse}<br />{entreprise.ville}</dd>
          </div>
          <div>
            <dt className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--accent-texte)]">Téléphone</dt>
            <dd className="mt-1 text-lg"><a href={`tel:${entreprise.telephoneLien}`} className="font-semibold underline underline-offset-4">{entreprise.telephone}</a></dd>
          </div>
          <div>
            <dt className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--accent-texte)]">Horaires</dt>
            <dd className="mt-2">
              <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
                {entreprise.horaires.map((h) => (
                  <li key={h.jours} className="flex justify-between gap-4 py-2.5"><span>{h.jours}</span><span className="font-semibold tabular-nums">{h.heures}</span></li>
                ))}
              </ul>
            </dd>
          </div>
          <p className="text-sm text-[var(--doux)]">Adresse et numéro d&apos;exemple : le numéro appartient à la tranche réservée à la fiction.</p>
        </dl>
      </section>

      <section className="bg-[var(--carte)] border-y border-[var(--trait)]">
        <div className="mx-auto max-w-6xl space-y-10 px-5 py-14 sm:py-20">
          <h2 className="text-4xl sm:text-5xl">Qui t&apos;accueille</h2>
          <ul className="grid gap-8 md:grid-cols-3">
            {EQUIPE.map((p) => (
              <li key={p.prenom} className="space-y-3">
                <span aria-hidden="true" className="grid h-14 w-14 place-items-center rounded-full bg-[var(--accent)] font-[family-name:var(--titres)] text-xl italic text-[var(--sur-accent)]">{p.initiales}</span>
                <h3 className="text-3xl">{p.prenom}</h3>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent-texte)]">{p.role}</p>
                <p className="leading-relaxed text-[var(--doux)]">« {p.phrase} »</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:py-20 lg:grid-cols-2">
        <div className="space-y-6">
          <h2 className="text-4xl sm:text-5xl">L&apos;atelier</h2>
          <ul className="space-y-5">
            {ATELIER.map((a) => (
              <li key={a.titre} className="space-y-1 border-t border-[var(--trait)] pt-4">
                <h3 className="text-2xl">{a.titre}</h3>
                <p className="leading-relaxed text-[var(--doux)]">{a.texte}</p>
              </li>
            ))}
          </ul>
          <p className="rounded-xl border border-[var(--trait)] bg-[var(--carte)] px-5 py-4 text-sm font-semibold">
            Un devis détaillé t&apos;est remis gratuitement, avant tout achat.
          </p>
        </div>
        <div className="space-y-6">
          <h2 className="text-4xl sm:text-5xl">Questions</h2>
          <Faq questions={FAQ} />
        </div>
      </section>

      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-14 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-[family-name:var(--titres)] text-4xl sm:text-5xl">Ton plateau t&apos;attend.</p>
          <Link href={`${DOSSIER}/essayage`} className="inline-flex min-h-13 items-center justify-center rounded-full bg-[var(--sur-sombre)] px-7 text-base font-bold text-[var(--sombre)]">
            Réserver mon essayage
          </Link>
        </div>
      </section>
    </main>
  );
}
