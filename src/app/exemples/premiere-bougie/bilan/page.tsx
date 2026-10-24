import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import Bilan from "../_composants/Bilan";
import { AppelFinal, EnTetePage, Surtitre } from "../_composants/Blocs";
import { BILAN } from "../_composants/donnees";

// « Comment on compte » : la méthode du bilan de la vidéo « Créer une marque ». Tout le
// monde compté, les départs aussi (pas d'omission trompeuse, C. consom., art. L.121-3),
// jamais une ligne par personne (RGPD, art. 4). Chiffres d'exemple.
export const metadata: Metadata = {
  title: "Comment on compte — Première Bougie, site de démonstration",
  description: "Le bilan de Première Bougie : qui est compté, comment on sait qu'une recrue est toujours là, et pourquoi jamais une ligne par personne. Chiffres d'exemple.",
  ...adressesDeLaPage("/exemples/premiere-bougie/bilan"),
};

const REGLES = [
  { t: "Tout le monde est compté", d: "Chaque recrue arrivée il y a plus d'un an entre dans le bilan. Pas de tri, pas de « recrutements représentatifs »." },
  { t: "Les départs aussi", d: "Partie avant sa première année, pour quelque raison que ce soit : elle est comptée dans « Parties ». Ne montrer que ceux qui restent serait trompeur." },
  { t: "On le sait sans surveiller", d: "Les points à 30, 90 et 180 jours, puis au jour 365, sont convenus dès le départ avec l'entreprise et avec la personne. On ne la cherche pas en ligne." },
  { t: "Jamais une ligne par personne", d: "Ni nom, ni poste, ni entreprise, ni date de départ : dans un bassin d'emploi, un intitulé et une date suffisent à reconnaître quelqu'un." },
  { t: "Mis à jour chaque jour 365", d: "Chaque première bougie fait bouger le bilan, d'un côté ou de l'autre." },
];

export default function PageBilan() {
  return (
    <main>
      <EnTetePage surtitre="Comment on compte" titre="Un bilan, *deux chiffres.*">
        {BILAN.recrues} recrues arrivées il y a plus d&apos;un an ; {BILAN.toujoursLa} toujours là ; {BILAN.parties} parties. Des
        chiffres d&apos;exemple : le cabinet est fictif. Voilà comment un vrai cabinet devrait les compter.
      </EnTetePage>

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-8 md:py-28 lg:grid-cols-[1fr_1fr] lg:items-start">
        <Apparition de="zoom" className="lg:sticky lg:top-28">
          <Bilan />
        </Apparition>
        <div className="space-y-6">
          <Apparition><Surtitre className="text-[var(--doux)]">Cinq règles</Surtitre></Apparition>
          <ol className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
            {REGLES.map((r, i) => (
              <Apparition as="li" key={r.t} delai={i * 100} className="grid grid-cols-[3rem_1fr] gap-4 py-7">
                <span className="font-[family-name:var(--titres)] text-[2.6rem] italic leading-none text-[var(--accent-texte)]">{i + 1}</span>
                <span className="space-y-2">
                  <span className="block font-[family-name:var(--titres)] text-[1.8rem] leading-tight">{r.t}</span>
                  <span className="block text-[17px] leading-relaxed text-[var(--doux)]">{r.d}</span>
                </span>
              </Apparition>
            ))}
          </ol>
        </div>
      </section>

      <AppelFinal />
    </main>
  );
}
