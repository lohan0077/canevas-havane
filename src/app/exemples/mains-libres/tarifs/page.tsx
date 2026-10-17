import type { Metadata } from "next";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, PRESTATIONS, PROFILS, euros, type Categorie } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Tarifs · Mains Libres — site de démonstration",
  description: "Les tarifs de Mains Libres, garage imaginaire : prix TTC d'exemple, pièces et main-d'œuvre comprises, par type de voiture.",
  ...adressesDeLaPage("/exemples/mains-libres/tarifs"),
};

const CATEGORIES: Categorie[] = ["citadine", "compacte", "suv"];

export default function Tarifs() {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-12 pb-20 space-y-12">
      <div className="max-w-3xl space-y-5">
        <p className="font-[family-name:var(--titres)] text-sm uppercase tracking-[0.18em] text-[var(--doux)]">Tarifs</p>
        <h1 className="text-5xl sm:text-7xl font-medium tracking-[-0.04em]">Le prix, <span className="text-[var(--accent-texte)]">pièces comprises.</span></h1>
        <p className="text-lg leading-relaxed text-[var(--doux)]">
          Toutes les prestations courantes, par type de voiture. Prix TTC, pièces et main-d'œuvre
          comprises. Le prix exact de ton modèle s'affiche quand tu tapes ta plaque.
        </p>
      </div>
      <div className="space-y-4">
        {PRESTATIONS.map((p) => (
          <section key={p.id} className="rounded-[24px] border border-[var(--trait)] bg-[var(--carte)] p-5 sm:p-7 grid gap-4 md:grid-cols-[1fr_2fr] md:items-center">
            <div>
              <h2 className="text-2xl font-medium">{p.nom}</h2>
              <p className="text-[var(--doux)]">{p.duree} d'atelier</p>
            </div>
            <dl className="grid grid-cols-3 gap-2">
              {CATEGORIES.map((c) => (
                <div key={c} className="rounded-2xl bg-[var(--fond)] p-3">
                  <dt className="text-sm text-[var(--doux)]">{PROFILS[c].titre}</dt>
                  <dd className="font-[family-name:var(--titres)] text-lg sm:text-xl font-bold">{euros(p.prix[c])}</dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
      <p className="text-sm text-[var(--doux)]">Prix TTC d'exemple : le garage est fictif. Une pièce imprévue fait toujours l'objet d'un devis, envoyé avec une photo, et rien n'est fait sans ton accord.</p>
      <Link href={`${DOSSIER}/rendez-vous`} className="inline-flex rounded-full bg-[var(--accent)] text-[var(--sur-accent)] px-7 py-4 font-[family-name:var(--titres)] text-lg font-bold">
        Choisir mon créneau
      </Link>
    </main>
  );
}
