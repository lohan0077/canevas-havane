import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import { Inscription } from "../_composants/Formulaires";
import { Pastille } from "../_composants/Blocs";
import { COURSE } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Tour du Quartier — site de démonstration",
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
    <div>
      <section className="bg-[#F2C14E]">
        <div className="mx-auto max-w-6xl px-5 py-14 lg:py-20">
          <p className="text-[14px] font-bold uppercase tracking-[0.1em]">{COURSE.date} · {COURSE.heure} · {COURSE.lieu}</p>
          <h1 className="mt-3 text-[56px] font-extrabold leading-[0.92] tracking-tight sm:text-[96px]">La course de lenteur.</h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed">Le premier dimanche du magasin. Le dernier arrivé gagne.</p>
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-14 lg:grid-cols-2">
        <div className="space-y-4">
          <Pastille couleur="#E3EFD9">Le règlement, en entier</Pastille>
          <ul className="space-y-3">
            {REGLES.map((r) => (
              <li key={r.t} className="rounded-[24px] bg-[var(--carte)] p-5">
                <p className="text-[21px] font-extrabold">{r.t}</p>
                <p className="mt-1 leading-relaxed text-[var(--doux)]">{r.d}</p>
              </li>
            ))}
          </ul>
          <p className="text-[13px] text-[var(--doux)]">Date d&apos;exemple, entrée libre : le magasin est fictif.</p>
        </div>
        <Inscription />
      </section>
    </div>
  );
}
