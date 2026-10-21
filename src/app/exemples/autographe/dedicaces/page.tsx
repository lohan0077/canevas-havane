import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import Signature from "../_composants/Signature";
import { DEDICACE, DOSSIER, auteurDe, boutique, photos } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Dédicaces — Autographe, site de démonstration",
  description: "La séance de dédicace de l'épicerie Autographe (entreprise fictive) : les producteurs viennent signer leurs pots, comme des écrivains.",
  ...adressesDeLaPage("/exemples/autographe/dedicaces"),
};

const PRATIQUE = [
  ["On ne réserve pas.", "On fait la queue, comme pour un livre. Si la file est longue, l'auteur reste jusqu'au dernier pot."],
  ["On peut apporter son pot.", "Un pot acheté avant se fait signer aussi."],
  ["On peut goûter.", "Chaque auteur fait goûter ce qu'il signe. Les allergènes sont affichés sur la table : le pain d'épices contient du seigle, du lait et des œufs."],
  ["On peut filmer.", "Le comptoir, la file, la signature. Les auteurs sont d'accord ; demande quand même avant de filmer quelqu'un d'autre."],
];

export default function Dedicaces() {
  return (
    <div>
      <section className="mx-auto grid max-w-6xl gap-10 px-5 pb-16 pt-12 sm:pt-20 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent-texte)]">{DEDICACE.date} {DEDICACE.annee} · {DEDICACE.heure}</p>
          <h1 className="text-6xl font-semibold sm:text-8xl">Séance de <em className="font-normal">dédicace.</em></h1>
          <p className="max-w-lg text-xl leading-relaxed">
            Les producteurs viennent signer leurs pots à la boutique. Comme des écrivains,
            avec une table, un stylo, et une file d&apos;attente.
          </p>
          <Signature variante={1} animee className="h-16 w-80 text-[var(--accent)]" />
        </div>
        <div className="relative aspect-[3/2] overflow-hidden">
          <Image src={photos.miel.src} alt={photos.miel.alt} fill sizes="(min-width: 768px) 460px, 100vw" className="object-cover" priority />
        </div>
      </section>

      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto max-w-4xl space-y-8 px-5 py-16 sm:py-24">
          <h2 className="text-5xl font-semibold">Le programme</h2>
          <ol className="divide-y divide-[#F6EFE3]/25 border-y border-[#F6EFE3]/25">
            {DEDICACE.programme.map((p) => {
              const a = auteurDe(p.slug)!;
              return (
                <li key={p.slug} className="grid gap-2 py-6 sm:grid-cols-[10rem_1fr] sm:gap-6">
                  <span className="text-lg tabular-nums text-[#C9CFDD]">{p.heure}</span>
                  <span className="space-y-1">
                    <Link href={`${DOSSIER}/auteurs/${a.slug}`} className="block font-[family-name:var(--titres)] text-4xl underline-offset-4 hover:underline">{a.prenom}</Link>
                    <span className="block text-lg">{a.metier}, {a.chiffre} {a.lieu} — {p.quoi}</span>
                  </span>
                </li>
              );
            })}
          </ol>
          <p className="text-sm text-[#C9CFDD]">Date réelle du calendrier ; auteurs et programme d&apos;exemple : l&apos;épicerie est fictive.</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:py-24 md:grid-cols-[0.8fr_1.2fr]">
        <h2 className="text-5xl font-semibold">Comment <em className="font-normal">ça se passe.</em></h2>
        <dl className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
          {PRATIQUE.map(([t, x]) => (
            <div key={t} className="grid gap-1 py-5 sm:grid-cols-[14rem_1fr] sm:gap-6">
              <dt className="font-[family-name:var(--titres)] text-2xl font-semibold">{t}</dt>
              <dd className="text-lg leading-relaxed text-[var(--doux)]">{x}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="border-t-2 border-[var(--encre)] bg-[var(--carte)]">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-12 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xl">À la boutique, {boutique.adresse}. Gratuit, sans achat obligatoire.</p>
          <Link href={`${DOSSIER}/auteurs`} className="inline-flex min-h-12 items-center justify-center bg-[var(--accent)] px-6 font-semibold text-[var(--sur-accent)]">Découvrir les auteurs</Link>
        </div>
      </section>
    </div>
  );
}
