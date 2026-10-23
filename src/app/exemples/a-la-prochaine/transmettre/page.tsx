import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import { AppelFinal, EnTetePage } from "../_composants/Blocs";
import Transmettre from "../_composants/Transmettre";
import { IMAGES } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Transmettre — À la Prochaine, site de démonstration",
  description: "Transmettre un bijou d'une marque imaginaire : inscrire le prénom suivant sous le numéro gravé, avec l'accord de chacun.",
  ...adressesDeLaPage("/exemples/a-la-prochaine/transmettre"),
};

const REGLES = [
  "Un prénom et une année : rien d'autre n'est publié.",
  "Ta ligne ne s'ajoute qu'avec ton accord, et après confirmation de la personne précédente.",
  "Tu peux la faire retirer à tout moment, d'un simple message à l'atelier.",
  "Une mise à taille est offerte à chaque transmission, à l'atelier.",
];

export default function PageTransmettre() {
  return (
    <main>
      <EnTetePage libelle="Transmettre" titre={"On te l'a *donné ?*"} photo={IMAGES.boite}>
        Alors la ligne vide est pour toi. Entre le numéro gravé et ton prénom : il s&apos;inscrira sous celui de la
        personne qui te l&apos;a transmis.
      </EnTetePage>
      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-[0.9fr_1.1fr] md:py-24">
        <ol className="space-y-6">
          {REGLES.map((r, i) => (
            <Apparition as="li" key={r} delai={i * 100} className="flex gap-5 border-t border-[var(--encre)] pt-5 text-lg leading-relaxed">
              <span className="font-[family-name:var(--titres)] text-4xl italic leading-none text-[var(--accent-texte)]">{["I", "II", "III", "IV"][i]}</span>
              {r}
            </Apparition>
          ))}
        </ol>
        <Apparition de="zoom" className="border border-[var(--trait)] bg-[var(--carte)] p-6 sm:p-8">
          <Transmettre />
        </Apparition>
      </section>
      <AppelFinal />
    </main>
  );
}
