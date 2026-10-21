import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Envies from "../_composants/Envies";
import Paraphe from "../_composants/Paraphe";
import { Libelle } from "../_composants/Blocs";
import { ENVIES, euros, livre } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Paraphe — site de démonstration",
  description: "Pas de rayons, des envies : pour un train de trois heures, pour quelqu'un qui n'aime pas lire… et pour chacune, un livre lu et paraphé.",
  ...adressesDeLaPage("/exemples/paraphe/envies"),
};

export default function PageEnvies() {
  return (
    <div>
      <section className="mx-auto max-w-3xl px-5 pb-14 pt-8 lg:pt-14">
        <Libelle>Les envies</Libelle>
        <h1 className="mt-3 text-[48px] leading-[1.02] sm:text-[72px]">
          Pas de rayons. <em>Des envies.</em>
        </h1>
        <div className="mt-6">
          <Envies />
        </div>
      </section>
      <section className="border-t border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <h2 className="text-[36px] leading-tight sm:text-[44px]">Toutes les envies, <em>d&apos;un coup d&apos;œil.</em></h2>
          <ul className="mt-8 divide-y divide-dashed divide-[var(--trait)] border-y border-[var(--trait)]">
            {ENVIES.map((e) => {
              const l = livre(e.livre);
              return (
                <li key={e.id} className="grid gap-2 py-5 md:grid-cols-[1fr_1.2fr_auto] md:items-center md:gap-6">
                  <p className="font-[family-name:var(--titres)] text-[24px] italic">{e.libelle}</p>
                  <p>
                    <strong>{l.titre}</strong>, {l.auteur} <span className="text-[var(--doux)]">· {euros(l.prix)}</span>
                  </p>
                  <p className="flex items-center gap-2 text-[14px] text-[var(--doux)]">
                    lu par {l.lecteur}
                    <Paraphe lecteur={l.lecteur} anime={false} className="h-8 w-20 text-[#2B4C8C]" />
                  </p>
                </li>
              );
            })}
          </ul>
          <p className="mt-4 text-[13px] text-[var(--doux)]">Prix fixés par l&apos;éditeur, les mêmes partout (exemples). Lecteurs imaginaires : la librairie est fictive.</p>
        </div>
      </section>
    </div>
  );
}
