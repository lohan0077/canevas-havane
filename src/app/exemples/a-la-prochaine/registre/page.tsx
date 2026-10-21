import type { Metadata } from "next";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import Registre from "../_composants/Registre";
import { Libelle } from "../_composants/Blocs";
import { DOSSIER, REGISTRE, bijouDe } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "À la Prochaine — site de démonstration",
  description: "Le registre d'une marque de bijoux imaginaire : chaque numéro gravé a sa page, avec les prénoms de celles et ceux qui l'ont porté.",
  ...adressesDeLaPage("/exemples/a-la-prochaine/registre"),
};

export default function PageRegistre() {
  return (
    <div>
      <section className="mx-auto grid max-w-6xl gap-10 px-5 pb-16 pt-10 md:grid-cols-[0.9fr_1.1fr] lg:pt-16">
        <div className="space-y-5">
          <Libelle>Le registre</Libelle>
          <h1 className="text-[56px] sm:text-[80px]">
            Ton numéro, <em>sa page.</em>
          </h1>
          <p className="text-lg leading-relaxed text-[var(--doux)]">
            Le numéro est gravé à l&apos;intérieur de ton bijou. Tape-le : sa page s&apos;ouvre, avec les prénoms de celles et ceux qui l&apos;ont porté.
          </p>
        </div>
        <Registre />
      </section>

      <section className="border-t border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <h2 className="text-4xl sm:text-5xl">Les derniers numéros <em>inscrits</em></h2>
          <ul className="mt-8 divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
            {REGISTRE.map((n) => {
              const b = bijouDe(n);
              const dernier = n.inscriptions.at(-1)!;
              return (
                <li key={n.numero}>
                  <Link href={`${DOSSIER}/registre/${n.numero}`} className="grid grid-cols-[72px_1fr_auto] items-baseline gap-3 py-4 hover:bg-[var(--fond)]">
                    <span className="font-[family-name:var(--titres)] text-2xl tabular-nums">{n.numero}</span>
                    <span>
                      <span className="block font-[family-name:var(--titres)] text-2xl italic">{dernier.prenom}, {dernier.annee}</span>
                      <span className="block text-sm text-[var(--doux)]">{b.type} «&nbsp;{b.nom}&nbsp;»</span>
                    </span>
                    <span aria-hidden="true" className="text-xl">→</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-[var(--doux)]">
            Le registre ne publie qu&apos;un prénom et une année, avec l&apos;accord de chacun ; chaque ligne peut être retirée à tout moment. Numéros et prénoms d&apos;exemple : la marque est fictive.
          </p>
        </div>
      </section>
    </div>
  );
}
