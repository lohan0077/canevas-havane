import type { Metadata } from "next";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, ESSENCES, LIVRAISON, euros, hauteur, metres } from "../_composants/donnees";
import { Surtitre } from "../_composants/Elements";

export const metadata: Metadata = {
  title: "Ombre Lente — site de démonstration",
  description: "Les quatre arbres d'ombrage d'une pépinière imaginaire, avec leur hauteur indicative à cinq, dix et vingt ans.",
  ...adressesDeLaPage("/exemples/ombre-lente/arbres"),
};

export default function Arbres() {
  return (
    <main className="mx-auto max-w-5xl px-5 py-16 sm:px-8">
      <div className="max-w-2xl space-y-5">
        <Surtitre>Nos arbres · saison 2026 – 2027</Surtitre>
        <h1 className="text-[56px] font-normal sm:text-7xl">Quatre arbres, <span className="italic">quatre ombres.</span></h1>
        <p className="text-[17px] leading-relaxed text-[var(--doux)]">
          Des baliveaux à racines nues, livrés en novembre avec leur passeport phytosanitaire. Pour chacun, sa hauteur
          indicative dans cinq, dix et vingt ans.
        </p>
      </div>
      <ul className="mt-12 space-y-5">
        {ESSENCES.map((e) => (
          <li key={e.slug}>
            <Link href={`${DOSSIER}/arbres/${e.slug}`} className="block rounded-[30px] border border-[var(--trait)] bg-[var(--carte)] p-6 sm:p-8">
              <span className="flex flex-wrap items-baseline justify-between gap-3">
                <span className="font-[family-name:var(--titres)] text-[34px] leading-tight sm:text-[42px]">{e.nom}</span>
                <span className="text-xl font-bold tabular-nums">{euros(e.prix)} TTC</span>
              </span>
              <span className="mt-1 block text-[15px] italic text-[var(--doux)]">{e.latin} · {e.sol}</span>
              <span className="mt-6 grid grid-cols-4 gap-2 border-t border-[var(--trait)] pt-5 text-center">
                {[0, 5, 10, 20].map((n) => (
                  <span key={n}>
                    <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--doux)]">{n === 0 ? "Livré" : `${n} ans`}</span>
                    <span className="block text-[20px] font-bold tabular-nums">{metres(hauteur(e, n))}</span>
                  </span>
                ))}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-[14px] leading-relaxed text-[var(--doux)]">
        Prix TTC d&apos;exemple, livraison {euros(LIVRAISON)}. Hauteurs indicatives d&apos;exemple : une croissance moyenne en bon
        sol, selon l&apos;essence, l&apos;eau et la taille.
      </p>
    </main>
  );
}
