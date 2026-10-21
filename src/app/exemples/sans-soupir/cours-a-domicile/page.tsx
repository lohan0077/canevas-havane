import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import Eligible from "../_composants/Eligible";
import { COURS, DOSSIER, euros, photos } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Cours à domicile · Sans Soupir — site de démonstration",
  description: "Les cours d'informatique à domicile de Sans Soupir : prix HT et TTC d'exemple, et ce qui peut ouvrir droit au crédit d'impôt. Démonstration de Canevas Havane.",
  ...adressesDeLaPage("/exemples/sans-soupir/cours-a-domicile"),
};

const PROMESSES = [
  { titre: "Tu tiens la souris", texte: "On ne fait jamais à ta place. On montre, tu refais." },
  { titre: "On répète", texte: "Autant de fois qu'il faut, autrement à chaque fois." },
  { titre: "On écrit la fiche", texte: "Ensemble, en gros, avant de partir." },
];

export default function CoursADomicile() {
  return (
    <div>
      <section className="max-w-6xl mx-auto px-5 sm:px-6 pt-8 sm:pt-14 pb-14 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-5">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--accent-texte)]">Cours à domicile</p>
          <h1 className="text-[44px] sm:text-7xl font-bold leading-[1.0] tracking-[-0.035em]">Une heure et demie. <span className="text-[var(--accent-texte)]">Ton rythme.</span></h1>
          <p className="text-xl leading-relaxed text-[var(--doux)]">Chez toi, sur ton ordinateur, ta tablette ou ton téléphone.</p>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-[32px]">
          <Image src={photos.lunettes.src} alt={photos.lunettes.alt} fill preload loading="eager" sizes="(min-width: 1024px) 480px, 100vw" className="object-cover object-[50%_35%]" />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 sm:px-6 pb-16">
        <ul className="grid gap-3 md:grid-cols-3">
          {COURS.map((c) => (
            <li key={c.titre} className="rounded-[28px] bg-[var(--carte)] border border-[var(--trait)] p-6 space-y-3">
              <h2 className="text-2xl font-bold leading-tight">{c.titre}</h2>
              <p className="text-[var(--doux)]">{c.detail}</p>
              <p className="font-[family-name:var(--titres)] text-4xl font-bold tabular-nums">{euros(c.ht * 1.2)} <span className="text-xl">TTC</span></p>
              <p className="text-[15px] text-[var(--doux)] tabular-nums">soit {euros(c.ht)} HT · prix d&apos;exemple</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-[#DCEBF3]">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-16 grid gap-6 md:grid-cols-3">
          {PROMESSES.map((p) => (
            <div key={p.titre} className="space-y-2">
              <h2 className="text-2xl font-bold">{p.titre}</h2>
              <p className="text-lg leading-relaxed text-[var(--doux)]">{p.texte}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-5 sm:px-6 py-20 space-y-6">
        <h2 className="text-[38px] sm:text-5xl font-bold leading-[1.02] tracking-[-0.03em]">Et le crédit d&apos;impôt&nbsp;?</h2>
        <p className="text-xl leading-relaxed text-[var(--doux)]">
          Apprendre à domicile peut y ouvrir droit, si l&apos;entreprise est déclarée services à la
          personne et que les cours restent son activité principale. Le dépannage, non. Les prix
          ci-dessus sont ceux que tu paies ; l&apos;avantage fiscal se calcule à part.
        </p>
        <Eligible />
        <p className="text-lg">Une panne en plus du cours&nbsp;? On regarde, et on te dit le prix avant&nbsp;: c&apos;est du dépannage, sans crédit d&apos;impôt.</p>
        <Link href={`${DOSSIER}/fiches`} className="inline-flex rounded-full bg-[var(--sombre)] text-[var(--sur-sombre)] px-6 py-3.5 font-bold">En attendant : les fiches gratuites</Link>
      </section>
    </div>
  );
}
