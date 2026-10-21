import type { Metadata } from "next";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import Recherche from "../_composants/Recherche";
import Signature from "../_composants/Signature";
import { AUTEURS, DOSSIER } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Les auteurs — Autographe, site de démonstration",
  description: "Le catalogue des auteurs de l'épicerie Autographe (entreprise fictive) : une apicultrice, un arboriculteur, une oléicultrice… On y cherche quelqu'un, pas un produit.",
  ...adressesDeLaPage("/exemples/autographe/auteurs"),
};

export default function Auteurs() {
  return (
    <div>
      <section className="mx-auto grid max-w-6xl gap-10 px-5 pb-14 pt-12 sm:pt-20 md:grid-cols-[1fr_1fr] md:items-end">
        <div className="space-y-5">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent-texte)]">Le catalogue</p>
          <h1 className="text-6xl font-semibold sm:text-7xl">Les <em className="font-normal">auteurs.</em></h1>
          <p className="max-w-md text-lg leading-relaxed">
            Six personnes, et tout ce qu&apos;elles font. Chacune a un numéro, comme un
            auteur dans une collection.
          </p>
        </div>
        <Recherche />
      </section>

      <section className="border-t-2 border-[var(--encre)]">
        <ul className="mx-auto grid max-w-6xl gap-px bg-[var(--trait)] sm:grid-cols-2 lg:grid-cols-3">
          {[...AUTEURS].sort((a, b) => a.numero - b.numero).map((a) => (
            <li key={a.slug} className="bg-[var(--fond)]">
              <Link href={`${DOSSIER}/auteurs/${a.slug}`} className="group flex h-full flex-col gap-3 p-6 sm:p-8">
                <span className="text-sm tabular-nums text-[var(--doux)]">n° {a.numero} · exemple</span>
                <span className="font-[family-name:var(--titres)] text-5xl font-semibold leading-none group-hover:italic">{a.prenom}</span>
                <Signature variante={a.signature} className="h-9 w-44 text-[var(--accent)]" />
                <span className="text-lg">{a.metier}, {a.chiffre} {a.lieu}</span>
                <span className="mt-auto pt-3 text-[15px] text-[var(--doux)]">{a.oeuvres.map((o) => o.nom).join(" · ")}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <p className="mx-auto max-w-6xl px-5 py-8 text-sm text-[var(--doux)]">Auteurs, lieux, pots et prix d&apos;exemple : l&apos;épicerie est fictive.</p>
    </div>
  );
}
