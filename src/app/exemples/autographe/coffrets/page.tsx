import type { Metadata } from "next";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, EnTetePage, Surtitre } from "../_composants/Blocs";
import { DessinProduit } from "../_composants/Dessins";
import Ingredients from "../_composants/Ingredients";
import { COMPOSITIONS, DOSSIER, RAYONS, allergenesDe, auteursDu, nomCourt, photos, produit, type Budget } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Les coffrets — Autographe, site de démonstration",
  description: "Les neuf coffrets de l'épicerie Autographe (entreprise fictive) : des pots signés par leurs auteurs, avec le poids, les ingrédients et les allergènes de chaque produit, affichés avant toute commande.",
  ...adressesDeLaPage("/exemples/autographe/coffrets"),
};

const BUDGETS: Budget[] = [20, 35, 50];

// Les neuf coffrets, et pour chaque pot tout ce qu'une fiche de vente à distance doit
// dire avant l'achat : dénomination, poids, ingrédients, allergènes, origine quand
// elle est requise (règlement (UE) n° 1169/2011, art. 9 et 14) — et son auteur.
export default function Coffrets() {
  return (
    <main>
      <EnTetePage surtitre={"On apporte quoi\u00a0?"} titre="Neuf coffrets, *tout ce qu'il y a dedans.*" photo={photos.coffret} signature={2}>
        Trois goûts, trois budgets, des pots signés par leurs auteurs. Chaque pot avec son poids, ses
        ingrédients et ses allergènes, écrits en gras. Pour huit personnes et plus, on double les
        biscuits ; le coffret garde son prix.
      </EnTetePage>

      {RAYONS.map((rayon, r) => (
        <section key={rayon.gout} aria-labelledby={`rayon-${rayon.gout}`} className={r % 2 ? "bg-[var(--carte)]" : ""}>
          <div className="mx-auto max-w-7xl space-y-10 px-5 py-20 sm:px-8 md:py-24">
            <div className="grid gap-4 lg:grid-cols-[1fr_1fr] lg:items-end">
              <div className="space-y-5">
                <Apparition><Surtitre>Rayon {r + 1} sur 3</Surtitre></Apparition>
                <TitreRevele texte={rayon.titre} className="text-[clamp(2.6rem,5vw,4.6rem)] font-semibold leading-[0.95] tracking-[-0.03em]" />
              </div>
              <Apparition as="p" delai={150} className="text-xl text-[var(--doux)]">{rayon.phrase}</Apparition>
            </div>
            <ul className="grid gap-5 lg:grid-cols-3">
              {BUDGETS.map((budget, i) => {
                const c = COMPOSITIONS[rayon.gout][budget];
                const allergenes = allergenesDe(c.contenu);
                return (
                  <Apparition as="li" key={c.nom} delai={i * 110} className="flex flex-col gap-5 border-2 border-[var(--encre)] bg-[var(--fond)] p-6">
                    <div className="flex items-end justify-center gap-1 bg-[#C8A06A] px-4 pt-5">
                      {c.contenu.map((cle) => {
                        const { oeuvre } = produit(cle);
                        return <DessinProduit key={cle} dessin={oeuvre.dessin} teinte={oeuvre.teinte} className="h-16 w-12" />;
                      })}
                    </div>
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="text-[1.7rem] font-semibold">{c.nom}</h3>
                      <p className="whitespace-nowrap font-[family-name:var(--titres)] text-3xl font-semibold [font-variant-numeric:lining-nums]">{budget} € <span className="font-[family-name:var(--texte)] text-xs font-semibold uppercase tracking-[0.1em]">TTC</span></p>
                    </div>
                    <p className="font-[family-name:var(--titres)] text-lg italic text-[var(--accent-texte)]">Signé {auteursDu(c.contenu).map((a) => a.prenom).join(", ")}</p>
                    <ul className="space-y-4 text-[15px] leading-relaxed">
                      {c.contenu.map((cle) => {
                        const { auteur, oeuvre } = produit(cle);
                        return (
                          <li key={cle} className="border-t border-[var(--trait)] pt-3">
                            <p className="font-semibold">
                              {nomCourt(cle)} <span className="font-normal text-[var(--doux)] [font-variant-numeric:lining-nums]">· {oeuvre.poids}</span>
                            </p>
                            <p className="text-[var(--doux)]">
                              <Link href={`${DOSSIER}/auteurs/${auteur.slug}`} className="underline underline-offset-2">{auteur.prenom}, n° {auteur.numero}</Link>
                              {" — "}
                              <Ingredients texte={oeuvre.ingredients} />
                              {oeuvre.origine && <> Origine : {oeuvre.origine}.</>}
                            </p>
                          </li>
                        );
                      })}
                    </ul>
                    <p className="mt-auto bg-[var(--carte)] px-4 py-3 text-sm">
                      <span className="font-semibold">Allergènes : </span>
                      {allergenes.length ? allergenes.join(" · ") : "aucun des quatorze allergènes réglementaires"}
                    </p>
                  </Apparition>
                );
              })}
            </ul>
          </div>
        </section>
      ))}
      <p className="mx-auto max-w-7xl px-5 pb-12 text-sm text-[var(--doux)] sm:px-8">
        Prix TTC d&apos;exemple : l&apos;épicerie est fictive. Le prix comprend les pots, la boîte, la ficelle
        et la carte. Paiement en boutique, au retrait.
      </p>

      <AppelFinal />
    </main>
  );
}
