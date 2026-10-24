import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, EnTetePage, Libelle } from "../_composants/Blocs";
import Taille from "../_composants/Taille";
import { FILM, IMAGES, entreprise } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "L'atelier — À la Prochaine, site de démonstration",
  description: "L'atelier d'une marque de bijoux imaginaire : comment naît une pièce, en quoi elle est faite, comment trouver sa taille.",
  ...adressesDeLaPage("/exemples/a-la-prochaine/atelier"),
};

const MATIERE = [
  { t: "Argent et or", d: "Argent massif au titre de 925 millièmes, or jaune au titre de 750 millièmes. Le titre figure sur la fiche de chaque pièce, et le poinçon sur la pièce." },
  { t: "Le numéro", d: "Gravé à la main, à l'intérieur de l'anneau, au dos de la plaque ou sur le fermoir. Il s'ajoute aux poinçons ; il ne les remplace pas." },
  { t: "Entretien", d: "Un chiffon doux suffit. L'argent noircit à l'air : c'est normal, et ça se repolit à l'atelier, sans frais." },
  { t: "Expédition", d: "En lettre suivie, dans un écrin numéroté, sous 48 h ouvrées. Retrait possible à l'atelier." },
];

export default function Atelier() {
  return (
    <main>
      <EnTetePage libelle="L'atelier" titre="Comment naît *une pièce.*" photo={IMAGES.flamme}>
        Je m&apos;appelle {entreprise.creatrice}. Tout se fait à la main, à un seul établi : pas de moule, pas de série.
        C&apos;est pour ça qu&apos;une pièce ne se refait pas.
      </EnTetePage>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28">
        <div className="mb-12 space-y-6">
          <Apparition><Libelle>Le film de sa fabrication</Libelle></Apparition>
          <TitreRevele
            texte="Quatre plans, *quinze secondes.*"
            className="font-[family-name:var(--titres)] text-[clamp(2.8rem,6vw,5.6rem)] leading-[0.92] tracking-[-0.02em]"
            classeAccent="italic text-[var(--accent-texte)]"
          />
        </div>
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FILM.map((f, i) => (
            <Apparition as="li" key={f.legende} delai={i * 120} de="zoom" className="space-y-4">
              <div className="relative aspect-[4/5] overflow-hidden bg-[var(--sombre)]">
                <Image src={f.image.src} alt={f.image.alt} fill sizes="(min-width: 1024px) 280px, (min-width: 640px) 50vw, 100vw" className={`object-cover ${i === 2 ? "object-[75%_50%]" : i === 0 ? "object-right" : ""}`} />
                <span className="absolute left-3 top-3 bg-[var(--sombre)] px-2 py-1 text-[12px] font-semibold tabular-nums text-[var(--sur-sombre)]">{f.temps}</span>
              </div>
              <p className="font-[family-name:var(--titres)] text-5xl tabular-nums text-[var(--accent-texte)]">0{i + 1}</p>
              <h2 className="font-[family-name:var(--titres)] text-3xl">{f.legende}</h2>
            </Apparition>
          ))}
        </ol>
      </section>

      <section className="px-3 sm:px-5">
        <div className="mx-auto grid max-w-7xl gap-12 rounded-[2.5rem] bg-[var(--sombre)] px-5 py-20 text-[var(--sur-sombre)] sm:px-10 md:py-28 lg:grid-cols-2">
          <div className="space-y-6">
            <Apparition><Libelle clair>Trouver sa taille</Libelle></Apparition>
            <TitreRevele
              texte="Un fil, une règle, *et c'est tout.*"
              className="font-[family-name:var(--titres)] text-[clamp(2.8rem,5.5vw,5rem)] leading-[0.92] tracking-[-0.02em]"
              classeAccent="italic text-[#C9A86A]"
            />
            <Apparition as="p" delai={150} className="text-lg leading-relaxed text-[var(--sur-sombre)]/90">
              Fais le tour de ton doigt avec un fil, à la base, sans serrer. Mesure-le à plat : en France, la taille
              d&apos;une bague, c&apos;est ce nombre de millimètres.
            </Apparition>
            <Apparition de="rideau" delai={200} className="relative hidden aspect-[16/10] overflow-hidden lg:block">
              <Image src={IMAGES.ajustage.src} alt={IMAGES.ajustage.alt} fill sizes="560px" className="object-cover" />
            </Apparition>
          </div>
          <Apparition de="zoom" delai={100} className="text-[var(--encre)]">
            <Taille />
          </Apparition>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28">
        <Apparition><Libelle>La matière et le reste</Libelle></Apparition>
        <dl className="mt-10 grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {MATIERE.map((m, i) => (
            <Apparition key={m.t} delai={i * 100} className="space-y-2 border-t border-[var(--encre)] pt-5">
              <dt className="font-[family-name:var(--titres)] text-4xl">{m.t}</dt>
              <dd className="leading-relaxed text-[var(--doux)]">{m.d}</dd>
            </Apparition>
          ))}
        </dl>
        <p className="mt-12 max-w-2xl text-[15px] leading-relaxed text-[var(--doux)]">
          « Fait main » décrit ici la façon de faire. Le mot « artisan » et ses dérivés sont réservés à ceux qui en ont la
          qualité (code de l&apos;artisanat, art. L241-1) : ce site ne les emploie pas.
        </p>
      </section>
      <AppelFinal />
    </main>
  );
}
