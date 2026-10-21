import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import { AppelFinal, PrixPiano, Surtitre } from "../_composants/Blocs";

// Les tarifs, comme l'arrêté du 17 mars 2015 le demande pour les cours à domicile (la
// vidéo n'en montre aucun, le site les doit quand même : art. 2 et 4).
export const metadata: Metadata = {
  title: "Tarifs · Clair de Salon — site de démonstration",
  description: "Le prix d'un cours de piano à domicile, à l'heure, HT et TTC, frais compris, et l'avantage fiscal à part (exemple). Site de démonstration.",
  ...adressesDeLaPage("/exemples/clair-de-salon/tarifs"),
};

const PRESTATIONS = [
  { nom: "Cours de piano à domicile", detail: "Adultes et enfants, tous niveaux, sur ton piano. Activité de services à la personne : cours à domicile." },
  { nom: "Concert de salon", detail: "Une fois par mois, chez un élève. Gratuit pour les élèves et pour leurs invités." },
];

export default function Tarifs() {
  return (
    <main>
      <section className="max-w-5xl mx-auto px-5 pt-10 pb-16 sm:pt-16 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="space-y-6">
          <Surtitre>Tarifs</Surtitre>
          <h1 className="text-[48px] sm:text-7xl">Le prix, <span className="italic text-[var(--accent-texte)]">en entier.</span></h1>
          <p className="text-lg leading-relaxed">
            À l&apos;heure, hors taxes et toutes taxes comprises, déplacement compris. Et
            l&apos;avantage fiscal à part, parce que c&apos;est la règle pour les cours à domicile.
          </p>
          <ul className="border-t border-[var(--encre)]">
            {PRESTATIONS.map((p) => (
              <li key={p.nom} className="border-b border-[var(--trait)] py-4 space-y-1">
                <h2 className="text-2xl">{p.nom}</h2>
                <p className="text-[var(--doux)]">{p.detail}</p>
              </li>
            ))}
          </ul>
        </div>
        <PrixPiano />
      </section>
      <AppelFinal />
    </main>
  );
}
