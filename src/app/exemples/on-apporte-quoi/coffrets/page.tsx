import type { Metadata } from "next";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DessinProduit } from "../_composants/Dessins";
import Ingredients from "../_composants/Ingredients";
import { COMPOSITIONS, DOSSIER, RAYONS, allergenesDe, produits, type Budget } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Les coffrets — On Apporte Quoi, site de démonstration",
  description: "Les neuf coffrets de l'épicerie On Apporte Quoi (entreprise fictive), avec le poids, les ingrédients et les allergènes de chaque produit, affichés avant toute commande.",
  ...adressesDeLaPage("/exemples/on-apporte-quoi/coffrets"),
};

const BUDGETS: Budget[] = [20, 35, 50];

// Les neuf coffrets, et pour chaque produit tout ce qu'une fiche de vente à distance
// doit dire avant l'achat : dénomination, poids, ingrédients, allergènes, origine
// quand elle est requise (règlement (UE) n° 1169/2011, art. 9 et 14).
export default function Coffrets() {
  return (
    <div>
      <section className="mx-auto max-w-6xl space-y-6 px-5 pb-12 pt-12 sm:pt-20">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent-texte)]">Les coffrets</p>
        <h1 className="max-w-3xl text-5xl font-medium sm:text-7xl">
          Neuf coffrets, <em className="font-normal">tout ce qu&apos;il y a dedans.</em>
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed">
          Trois goûts, trois budgets. Chaque produit avec son poids, ses ingrédients et
          ses allergènes, écrits en gras. Pour huit personnes et plus, les sablés et les
          gressins passent en format partage, au même prix.
        </p>
        <p className="text-sm text-[var(--doux)]">Prix TTC d&apos;exemple : l&apos;épicerie est fictive. Paiement en boutique, au retrait.</p>
      </section>

      {RAYONS.map((rayon) => (
        <section key={rayon.gout} aria-labelledby={`rayon-${rayon.gout}`} className="border-t border-[var(--trait)]">
          <div className="mx-auto max-w-6xl space-y-8 px-5 py-14 sm:py-20">
            <div className="space-y-2">
              <h2 id={`rayon-${rayon.gout}`} className="text-4xl font-medium sm:text-5xl">{rayon.titre}</h2>
              <p className="text-lg text-[var(--doux)]">{rayon.phrase}</p>
            </div>
            <ul className="grid gap-6 lg:grid-cols-3">
              {BUDGETS.map((budget) => {
                const c = COMPOSITIONS[rayon.gout][budget];
                const allergenes = allergenesDe(c.contenu);
                return (
                  <li key={c.nom} className="flex flex-col gap-5 rounded-[28px] border border-[var(--trait)] bg-[var(--carte)] p-6">
                    <div className="flex items-end justify-center gap-1 rounded-2xl bg-[#EFE6D3] px-4 pt-5">
                      {c.contenu.map((cle) => (
                        <DessinProduit key={cle} dessin={produits[cle].dessin} teinte={produits[cle].teinte} className="h-16 w-12" />
                      ))}
                    </div>
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="text-2xl font-semibold">{c.nom}</h3>
                      <p className="whitespace-nowrap font-[family-name:var(--titres)] text-2xl font-semibold [font-variant-numeric:lining-nums]">{budget} € <span className="text-xs font-[family-name:var(--texte)] font-semibold uppercase tracking-[0.1em]">TTC</span></p>
                    </div>
                    <ul className="space-y-4 text-[15px] leading-relaxed">
                      {c.contenu.map((cle) => {
                        const p = produits[cle];
                        return (
                          <li key={cle} className="border-t border-[var(--trait)] pt-3">
                            <p className="font-semibold">
                              {p.nom} <span className="font-normal text-[var(--doux)] [font-variant-numeric:lining-nums]">· {p.poids}</span>
                            </p>
                            <p className="text-[var(--doux)]">
                              <Ingredients texte={p.ingredients} />
                              {p.origine && <> Origine : {p.origine}.</>}
                            </p>
                          </li>
                        );
                      })}
                    </ul>
                    <p className="mt-auto rounded-xl bg-[var(--fond)] px-4 py-3 text-sm">
                      <span className="font-semibold">Allergènes : </span>
                      {allergenes.length ? allergenes.join(" · ") : "aucun des quatorze allergènes réglementaires"}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      ))}

      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-16 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl font-[family-name:var(--titres)] text-3xl font-medium leading-tight sm:text-4xl">
            Tu ne sais toujours pas&nbsp;? <em className="font-normal">Réponds aux trois questions.</em>
          </p>
          <Link href={`${DOSSIER}#composer`} className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#E9C46A] px-6 font-semibold text-[#2A2118]">
            Composer mon coffret
          </Link>
        </div>
      </section>
    </div>
  );
}
