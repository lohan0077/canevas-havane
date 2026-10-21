import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Creneaux from "../../_kit/Creneaux";
import { COMPRIS, CRENEAUX_COTES, GAMMES, PAS_COMPRIS, euros, photos } from "../_composants/donnees";
import TesMurs from "../_composants/TesMurs";

export const metadata: Metadata = {
  title: "Ma cuisine, mes murs · Jusqu'au Café — site de démonstration",
  description: "La longueur de tes murs dessine ta cuisine, avec une fourchette TTC pose comprise ; puis la prise de cotes chez toi. Cuisiniste imaginaire, site de démonstration.",
  ...adressesDeLaPage("/exemples/jusqu-au-cafe/ma-cuisine"),
};

export default function MaCuisine() {
  return (
    <div>
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-16 grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="space-y-5 min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--accent-texte)]">Ma cuisine</p>
          <h1 className="text-[2.8rem] sm:text-7xl font-light">Tes murs, <span className="italic text-[var(--accent-texte)]">en mètres.</span></h1>
          <p className="text-xl leading-relaxed text-[var(--doux)]">
            Mesure le long du mur, d&apos;un angle à l&apos;autre. Un seul mur : laisse le second vide, la
            cuisine sera droite. Deux murs : elle sera en L.
          </p>
          <div className="rounded-[22px] border border-[var(--trait)] p-5 space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--doux)]">Prix au mètre linéaire, TTC, pose comprise · exemple</p>
            <ul className="space-y-2">
              {GAMMES.map((g) => (
                <li key={g.id} className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <span><span className="font-semibold">{g.nom}</span> <span className="text-sm text-[var(--doux)]">· {g.detail}</span></span>
                  <span className="tabular-nums">{euros(g.min)} – {euros(g.max)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="min-w-0 rounded-[26px] bg-[var(--carte)] border border-[var(--trait)] p-4 sm:p-6">
          <TesMurs />
        </div>
      </section>

      <section className="border-y border-[var(--trait)] bg-[var(--carte)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 grid gap-6 md:grid-cols-2">
          <div className="space-y-3">
            <h2 className="text-4xl font-light">Ce que la fourchette <span className="italic">comprend.</span></h2>
            <ul className="space-y-2 text-lg">
              {COMPRIS.map((x) => (
                <li key={x} className="flex gap-3"><span aria-hidden="true" className="text-[var(--accent-texte)]">✓</span>{x}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-3">
            <h2 className="text-4xl font-light">Ce qu&apos;elle ne comprend pas.</h2>
            <ul className="space-y-2 text-lg text-[var(--doux)]">
              {PAS_COMPRIS.map((x) => (
                <li key={x} className="flex gap-3"><span aria-hidden="true">—</span>{x}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="cotes" className="scroll-mt-20 max-w-6xl mx-auto px-4 sm:px-6 py-16 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-5">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--accent-texte)]">Étape suivante</p>
          <h2 className="text-5xl font-light">La prise de cotes, <span className="italic">chez toi.</span></h2>
          <p className="text-xl leading-relaxed text-[var(--doux)]">
            Une heure, mètre en main, avec Mathieu, qui dessinera ton plan. C&apos;est après elle que vient
            le devis, ligne par ligne, avec le prix ferme.
          </p>
          <div className="relative aspect-[4/3] rounded-[22px] overflow-hidden bg-[var(--carte)]">
            <Image src={photos.salle.src} alt={photos.salle.alt} fill sizes="(min-width: 1024px) 480px, 100vw" className="object-cover" />
          </div>
        </div>
        <Creneaux
          creneaux={CRENEAUX_COTES}
          colonnes={2}
          titreCarte="Ta prise de cotes"
          bouton="Réserver ce créneau"
          confirmation="Prise de cotes réservée : {creneau}"
          note={"Créneaux de la semaine du 19\u00A0octobre. Ceux marqués «\u00A0Pris\u00A0» le sont pour l'exemple."}
        />
      </section>
    </div>
  );
}
