import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, EnTetePage, Pastille } from "../_composants/Blocs";
import Course from "../_composants/Course";
import { Inscription } from "../_composants/Formulaires";
import { COURSE } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "La course de lenteur — Tour du Quartier, site de démonstration",
  description: "La course de lenteur d'un magasin de vélos imaginaire, sur son parking : le dernier arrivé gagne, et il n'y a rien à gagner.",
  ...adressesDeLaPage("/exemples/tour-du-quartier/course-de-lenteur"),
};

const REGLES = [
  { t: "Le dernier arrivé gagne", d: "Vingt mètres en ligne droite, le plus lentement possible." },
  { t: "Pied à terre : éliminé", d: "Mais on peut recommencer. Autant de fois qu'on veut." },
  { t: "Sur le parking du magasin", d: "Fermé aux voitures pour la matinée. Jamais sur la route." },
  { t: "Rien à gagner", d: "Pas de lot, pas de podium, pas de classement publié. Juste le plaisir d'avoir été lent." },
  { t: "Casque prêté", d: "Obligatoire pour les moins de douze ans, prêté à tout le monde." },
];

export default function PageCourse() {
  return (
    <main>
      <EnTetePage pastille={`${COURSE.date} · ${COURSE.heure} · ${COURSE.lieu}`} titre="La course *de lenteur.*">
        Le premier dimanche du magasin. Le dernier arrivé gagne.
      </EnTetePage>

      <section className="mx-auto grid max-w-7xl gap-14 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div className="space-y-8">
          <Apparition><Pastille>Le règlement, en entier</Pastille></Apparition>
          <TitreRevele
            texte="Cinq règles. *Aucune pression.*"
            className="font-[family-name:var(--titres)] text-[clamp(2.2rem,4.4vw,3.8rem)] font-bold leading-[0.98] tracking-[-0.05em]"
            classeAccent="text-[var(--accent-texte)]"
          />
          <ul className="grid gap-3 sm:grid-cols-2">
            {REGLES.map((r, i) => (
              <Apparition as="li" key={r.t} delai={i * 100} de="zoom" className="rounded-[28px] bg-[var(--carte)] p-6 shadow-[0_20px_40px_-32px_rgba(31,58,44,0.6)]">
                <p className="font-[family-name:var(--titres)] text-lg font-bold leading-tight">{r.t}</p>
                <p className="mt-2 leading-relaxed text-[var(--doux)]">{r.d}</p>
              </Apparition>
            ))}
          </ul>
          <p className="text-[13px] text-[var(--doux)]">Date d&apos;exemple, entrée libre : le magasin est fictif.</p>
        </div>
        <div className="space-y-6 lg:sticky lg:top-28">
          <div className="rounded-[40px] bg-[var(--sombre)] p-5 text-[var(--sur-sombre)] sm:p-6">
            <Course />
          </div>
          <Inscription />
        </div>
      </section>

      <AppelFinal />
    </main>
  );
}
