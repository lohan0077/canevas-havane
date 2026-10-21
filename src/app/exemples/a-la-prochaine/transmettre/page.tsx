import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Transmettre from "../_composants/Transmettre";
import { Libelle } from "../_composants/Blocs";

export const metadata: Metadata = {
  title: "À la Prochaine — site de démonstration",
  description: "Transmettre un bijou d'une marque imaginaire : inscrire le prénom suivant sous le numéro gravé, avec l'accord de chacun.",
  ...adressesDeLaPage("/exemples/a-la-prochaine/transmettre"),
};

const REGLES = [
  "Un prénom et une année : rien d'autre n'est publié.",
  "Ta ligne ne s'ajoute qu'avec ton accord, et après confirmation de la personne précédente.",
  "Tu peux la faire retirer à tout moment, d'un simple message à la boutique.",
  "Une mise à taille est offerte à chaque transmission, à la boutique.",
];

export default function PageTransmettre() {
  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-5 pb-16 pt-10 md:grid-cols-[0.9fr_1.1fr] lg:pt-16">
      <div className="space-y-5">
        <Libelle>Transmettre</Libelle>
        <h1 className="text-[56px] sm:text-[80px]">
          On te l&apos;a <em>donné&nbsp;?</em>
        </h1>
        <p className="text-lg leading-relaxed text-[var(--doux)]">
          Alors la ligne vide est pour toi. Entre le numéro gravé et ton prénom : il s&apos;inscrira sous celui de la personne qui te l&apos;a transmis.
        </p>
        <ul className="space-y-3 pt-2">
          {REGLES.map((r) => (
            <li key={r} className="flex gap-3 leading-relaxed">
              <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-texte)]" />
              {r}
            </li>
          ))}
        </ul>
      </div>
      <div className="border border-[var(--trait)] bg-[var(--carte)] p-6 sm:p-8">
        <Transmettre />
      </div>
    </div>
  );
}
