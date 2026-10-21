import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import { Libelle } from "../_composants/Blocs";
import Taille from "../_composants/Taille";
import { FILM, entreprise } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Jamais Deux — site de démonstration",
  description: "L'atelier d'une créatrice de bijoux imaginaire : comment naît une pièce, en quoi elle est faite, comment trouver sa taille.",
  ...adressesDeLaPage("/exemples/jamais-deux/atelier"),
};

const MATIERE = [
  { t: "Argent massif", d: "Au titre de 925 millièmes, pour chaque pièce. Le titre figure sur sa fiche." },
  { t: "Pierres", d: "Choisies une à une, jamais par lot : il n'en faut qu'une par pièce." },
  { t: "Entretien", d: "Un chiffon doux suffit. L'argent noircit à l'air : c'est normal, et ça se repolit à l'atelier, sans frais, à vie." },
  { t: "Expédition", d: "En lettre suivie, dans un écrin numéroté, sous 48 h ouvrées. Retrait possible à l'atelier, sur rendez-vous." },
];

export default function Atelier() {
  return (
    <div>
      <section className="mx-auto max-w-6xl px-5 py-14 lg:py-20">
        <div className="max-w-3xl space-y-5">
          <Libelle>L&apos;atelier</Libelle>
          <h1 className="text-[56px] sm:text-[80px]">
            Comment naît <em className="text-[var(--accent-texte)]">une pièce.</em>
          </h1>
          <p className="text-lg leading-relaxed text-[var(--doux)]">
            Je m&apos;appelle {entreprise.creatrice}. Tout se fait à la main, à un seul établi : pas de moule, pas de série. C&apos;est pour ça qu&apos;une pièce ne se refait pas.
          </p>
        </div>
        <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {FILM.map((f, i) => (
            <li key={f.legende} className="space-y-3">
              <div className="relative aspect-[4/3] overflow-hidden bg-[var(--sombre)] sm:aspect-[4/5]">
                <Image src={f.image.src} alt={f.image.alt} width={f.image.largeur} height={f.image.hauteur} sizes="(min-width: 1024px) 270px, (min-width: 640px) 50vw, 100vw" className={`h-full w-full object-cover ${i === 2 ? "object-[75%_50%]" : i === 0 ? "object-right" : ""}`} />
              </div>
              <p className="font-[family-name:var(--titres)] text-4xl text-[var(--accent-texte)] tabular-nums">0{i + 1}</p>
              <h2 className="text-3xl">{f.legende}</h2>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-y border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 lg:grid-cols-2 lg:py-20">
          <div className="space-y-5">
            <Libelle>Trouver sa taille</Libelle>
            <h2 className="text-5xl">Un fil, une règle, <em>et c&apos;est tout.</em></h2>
            <p className="text-lg leading-relaxed text-[var(--doux)]">
              Fais le tour de ton doigt avec un fil, à la base, sans serrer. Mesure-le à plat : en France, la taille d&apos;une bague, c&apos;est ce nombre de millimètres.
            </p>
          </div>
          <Taille />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 lg:py-20">
        <Libelle>La matière et le reste</Libelle>
        <dl className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {MATIERE.map((m) => (
            <div key={m.t} className="space-y-2 border-t border-[var(--encre)] pt-5">
              <dt className="font-[family-name:var(--titres)] text-3xl">{m.t}</dt>
              <dd className="leading-relaxed text-[var(--doux)]">{m.d}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-10 max-w-2xl text-[15px] leading-relaxed text-[var(--doux)]">
          « Fait main » décrit ici la façon de faire. Le mot « artisan » et ses dérivés sont réservés à ceux qui en ont la qualité (code de l&apos;artisanat, art. L241-1) : ce site ne les emploie pas.
        </p>
      </section>
    </div>
  );
}
