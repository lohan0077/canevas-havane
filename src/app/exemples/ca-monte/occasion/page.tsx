import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import { CarteOccasion, Libelle } from "../_composants/Blocs";
import { OCCASIONS } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Ça Monte — site de démonstration",
  description: "Les vélos d'occasion d'un magasin imaginaire : chacun a sa fiche, sa batterie testée et son marquage, comme la loi l'impose.",
  ...adressesDeLaPage("/exemples/ca-monte/occasion"),
};

export default function Occasions() {
  return (
    <div className="mx-auto max-w-6xl px-5 pb-16 pt-8 lg:pt-14">
      <Libelle>L&apos;occasion</Libelle>
      <h1 className="mt-4 max-w-3xl font-bold uppercase leading-[0.95] tracking-tight text-[48px] sm:text-[80px]">Révisés, testés, marqués.</h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--doux)]">
        Chaque vélo d&apos;occasion passe à l&apos;atelier avant d&apos;arriver ici. Sa fiche dit ce qu&apos;on a changé, ce que vaut encore sa batterie, et à quelle taille il va.
      </p>
      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {OCCASIONS.map((o) => <li key={o.id}><CarteOccasion o={o} /></li>)}
      </ul>
      <p className="mt-4 text-[13px] text-[var(--doux)]">Vélos sans marque, prix TTC et tests d&apos;exemple : le magasin est fictif.</p>
    </div>
  );
}
