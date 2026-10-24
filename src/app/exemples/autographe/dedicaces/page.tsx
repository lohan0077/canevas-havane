import type { Metadata } from "next";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, Bouton, EnTetePage, Surtitre } from "../_composants/Blocs";
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
    <main>
      <EnTetePage surtitre={`${DEDICACE.date} ${DEDICACE.annee} · ${DEDICACE.heure}`} titre="Séance de *dédicace.*" photo={photos.plume} signature={1}>
        Les producteurs viennent signer leurs pots à la boutique. Comme des écrivains, avec une table,
        un stylo, et une file d&apos;attente.
      </EnTetePage>

      <section className="px-3 pt-3 sm:px-5 sm:pt-5">
        <div className="kit-grain relative overflow-hidden rounded-[2rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
          <div className="mx-auto max-w-5xl space-y-10 px-5 py-20 sm:px-10 md:py-28">
            <div className="space-y-6">
              <Apparition><Surtitre clair>Le programme</Surtitre></Apparition>
              <TitreRevele texte="Trois auteurs, *une table.*" className="text-[clamp(2.8rem,6vw,5.4rem)] font-semibold leading-[0.95] tracking-[-0.03em]" classeAccent="font-normal italic text-[#E8B4A8]" />
            </div>
            <ol className="divide-y divide-white/20 border-y border-white/20">
              {DEDICACE.programme.map((p, i) => {
                const a = auteurDe(p.slug)!;
                return (
                  <Apparition as="li" key={p.slug} delai={i * 120} className="grid gap-3 py-8 md:grid-cols-[11rem_1fr_auto] md:items-center md:gap-8">
                    <span className="font-[family-name:var(--titres)] text-2xl tabular-nums text-[#E8B4A8]">{p.heure}</span>
                    <span className="space-y-1">
                      <Link href={`${DOSSIER}/auteurs/${a.slug}`} className="block font-[family-name:var(--titres)] text-[clamp(2.8rem,5vw,4.2rem)] font-semibold leading-none underline-offset-8 hover:underline">{a.prenom}</Link>
                      <span className="block text-xl text-[var(--sur-sombre)]/90">{a.metier}, {a.chiffre} {a.lieu} — {p.quoi}</span>
                    </span>
                    <Signature variante={a.signature} couleur="#E8B4A8" animee className="h-12 w-52" />
                  </Apparition>
                );
              })}
            </ol>
            <p className="text-sm text-[var(--sur-sombre)]/90">Date réelle du calendrier ; auteurs et programme d&apos;exemple : l&apos;épicerie est fictive.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-6">
          <Apparition><Surtitre>Sur place</Surtitre></Apparition>
          <TitreRevele texte="Comment *ça se passe.*" className="text-[clamp(2.6rem,5vw,4.6rem)] font-semibold leading-[0.95] tracking-[-0.03em]" classeAccent="font-normal italic text-[var(--accent-texte)]" />
        </div>
        <dl className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
          {PRATIQUE.map(([t, x], i) => (
            <Apparition key={t} delai={i * 90} className="grid gap-2 py-6 sm:grid-cols-[15rem_1fr] sm:gap-8">
              <dt className="font-[family-name:var(--titres)] text-2xl font-semibold">{t}</dt>
              <dd className="text-lg leading-relaxed text-[var(--doux)]">{x}</dd>
            </Apparition>
          ))}
        </dl>
      </section>

      <section className="border-y-2 border-[var(--encre)] bg-[var(--accent)] text-[var(--sur-accent)]">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-14 sm:px-8 md:flex-row md:items-center md:justify-between">
          <p className="max-w-2xl font-[family-name:var(--titres)] text-3xl leading-tight">
            À la boutique, {boutique.adresse}. Gratuit, sans achat obligatoire.
          </p>
          <Bouton href={`${DOSSIER}/auteurs`} variante="clair">Découvrir les auteurs</Bouton>
        </div>
      </section>

      <AppelFinal />
    </main>
  );
}
