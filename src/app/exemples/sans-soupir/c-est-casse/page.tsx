import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, Bouton, EnTetePage } from "../_composants/Blocs";
import TarifDepannage from "../_composants/TarifDepannage";
import { DEPANNAGE, DOSSIER, euros, horsTaxe } from "../_composants/donnees";

// Porte 1 : le dépannage, prix clair. Sans crédit d'impôt, et c'est dit.
export const metadata: Metadata = {
  title: "C'est cassé : dépannage à domicile — Sans Soupir, site de démonstration",
  description: "Le dépannage informatique à domicile de Sans Soupir : déplacement, demi-heures, forfaits, en prix TTC et HT d'exemple. Sans crédit d'impôt, et c'est dit.",
  ...adressesDeLaPage("/exemples/sans-soupir/c-est-casse"),
};

const ON_FAIT = ["Ordinateur lent, virus, fenêtres qui s'ouvrent seules", "Imprimante, scanner, box, wifi", "Téléphone ou tablette qui ne se synchronise plus", "Récupérer des fichiers sur un vieil ordinateur"];
const ON_NE_FAIT_PAS = ["La soudure et les réparations de carte mère : on te dit où aller", "Le dépannage à distance, au téléphone", "La vente d'ordinateurs : on t'aide à choisir, tu achètes où tu veux"];

export default function CestCasse() {
  return (
    <main>
      <EnTetePage
        surtitre="Porte 1 · C'est cassé"
        titre="Dépannage, *prix clair.*"
        teinte="#FF9A80"
        aside={
          <Apparition de="droite" delai={250} className="w-full">
            <TarifDepannage />
          </Apparition>
        }
      >
        Un déplacement, puis le temps passé, à la demi-heure. Tu sais combien avant qu&apos;on sonne.
        Et on te le dit tout de suite : le dépannage n&apos;ouvre pas droit au crédit d&apos;impôt.
      </EnTetePage>

      <section className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
        <TitreRevele texte="Les *forfaits.*" className="mb-12 text-[clamp(2.8rem,6vw,5rem)] font-extrabold leading-[0.94] tracking-[-0.045em]" classeAccent="text-[#A8391B]" />
        <ul className="grid gap-5 md:grid-cols-3">
          {DEPANNAGE.forfaits.map((f, i) => (
            <Apparition as="li" key={f.titre} delai={i * 120} de="zoom" className="space-y-3 rounded-[2.2rem] bg-[#FFE8E1] p-7">
              <h2 className="text-2xl font-extrabold leading-tight">{f.titre}</h2>
              <p>{f.detail}</p>
              <p className="font-[family-name:var(--titres)] text-4xl font-extrabold">{euros(f.prix)} TTC</p>
              <p className="text-[15px]">soit {euros(horsTaxe(f.prix))} HT · déplacement compris · exemple</p>
            </Apparition>
          ))}
        </ul>
      </section>

      <section className="px-3 sm:px-5">
        <div className="rounded-[3rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 sm:px-10 md:grid-cols-2">
            <div className="space-y-5">
              <h2 className="text-[clamp(2.2rem,4vw,3.2rem)] font-extrabold">Ce qu&apos;on répare</h2>
              <ul className="space-y-3">
                {ON_FAIT.map((x) => (
                  <li key={x} className="flex gap-3 rounded-[1.4rem] bg-white/10 px-5 py-4"><span aria-hidden="true" className="font-bold text-[#7FD8BE]">✓</span>{x}</li>
                ))}
              </ul>
            </div>
            <div className="space-y-5">
              <h2 className="text-[clamp(2.2rem,4vw,3.2rem)] font-extrabold">Ce qu&apos;on ne fait pas</h2>
              <ul className="space-y-3">
                {ON_NE_FAIT_PAS.map((x) => (
                  <li key={x} className="flex gap-3 rounded-[1.4rem] border-2 border-dashed border-white/30 px-5 py-4"><span aria-hidden="true">✕</span>{x}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
        <div className="flex flex-col justify-between gap-6 rounded-[2.4rem] bg-[#7FD8BE] p-8 sm:flex-row sm:items-center sm:p-12">
          <p className="font-[family-name:var(--titres)] text-[clamp(1.8rem,3.4vw,2.6rem)] font-extrabold leading-tight">Et si au fond, tu voulais apprendre&nbsp;?</p>
          <Bouton href={`${DOSSIER}/cours-a-domicile`} variante="sombre">Porte 2 : les cours</Bouton>
        </div>
      </section>

      <AppelFinal />
    </main>
  );
}
