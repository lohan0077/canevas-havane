import type { Metadata } from "next";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import FondVivant from "../../_kit/FondVivant";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, Libelle } from "../_composants/Blocs";
import Registre from "../_composants/Registre";
import { DOSSIER, PIECES, grave, nomForme } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Le registre — À la Prochaine, site de démonstration",
  description: "Le registre d'une marque de bijoux imaginaire : chaque numéro gravé a sa page, avec les prénoms de celles et ceux qui l'ont porté.",
  ...adressesDeLaPage("/exemples/a-la-prochaine/registre"),
};

export default function PageRegistre() {
  const inscrites = PIECES.filter((p) => p.registre?.length).reverse();
  return (
    <main>
      {/* Le haut de page est l'outil : on tape le numéro gravé, sa page s'ouvre. */}
      <section className="kit-grain relative isolate overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <FondVivant couleurs={["#152B26", "#1F3D35", "#6E5524"]} vitesse={0.7} />
        <div className="absolute inset-0 bg-[var(--sombre)]/55" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-16 pt-32 sm:px-8 md:pb-24 md:pt-40 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="space-y-6">
            <Apparition><Libelle clair>Le registre</Libelle></Apparition>
            <TitreRevele
              as="h1"
              auChargement
              texte="Ton numéro, *sa page.*"
              className="font-[family-name:var(--titres)] text-[clamp(3.4rem,8vw,7.4rem)] leading-[0.92] tracking-[-0.02em]"
              classeAccent="italic text-[#C9A86A]"
            />
            <Apparition as="p" delai={300} className="max-w-md text-lg leading-relaxed text-[var(--sur-sombre)]/90">
              Le numéro est gravé à l&apos;intérieur de ton bijou. Tape-le : sa page s&apos;ouvre, avec le premier nom, puis
              les suivants. Et en dessous, une ligne vide.
            </Apparition>
          </div>
          <Apparition de="droite" delai={150}>
            <Registre sombre />
          </Apparition>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-24">
        <h2 className="font-[family-name:var(--titres)] text-[clamp(2.6rem,5vw,4.4rem)] leading-[0.95]">Les derniers numéros <em>inscrits</em></h2>
        <ul className="mt-10 divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
          {inscrites.map((p, i) => {
            const dernier = p.registre!.at(-1)!;
            return (
              <Apparition as="li" key={p.numero} delai={i * 80}>
                <Link href={`${DOSSIER}/pieces/${p.numero}`} className="grid grid-cols-[84px_1fr_auto] items-baseline gap-4 py-5 transition-colors hover:bg-[var(--carte)]">
                  <span className="font-[family-name:var(--titres)] text-3xl tabular-nums">{grave(p.numero)}</span>
                  <span>
                    <span className="block font-[family-name:var(--titres)] text-3xl italic">{dernier.prenom}, {dernier.annee}</span>
                    <span className="block text-sm text-[var(--doux)]">{nomForme(p)} «&nbsp;{p.nom}&nbsp;» · partie le {p.partieLe}</span>
                  </span>
                  <span aria-hidden="true" className="text-2xl">→</span>
                </Link>
              </Apparition>
            );
          })}
        </ul>
        <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-[var(--doux)]">
          Le registre ne publie qu&apos;un prénom et une année, avec l&apos;accord de chacun ; chaque ligne peut être retirée à
          tout moment. Numéros et prénoms d&apos;exemple : la marque est fictive.
        </p>
      </section>
      <AppelFinal />
    </main>
  );
}
