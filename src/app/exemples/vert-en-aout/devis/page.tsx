import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import { AppelFinal, Bouton, EnTetePage, Surtitre, Titre } from "../_composants/Blocs";
import { Devis } from "../_composants/Interactifs";
import { DOSSIER, PHOTOS } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Le devis — Vert en Août (démonstration)",
  description: "Le devis d'un paysagiste imaginaire, avec la ligne que personne ne met : l'arrosage qu'il faudra, l'été.",
  ...adressesDeLaPage("/exemples/vert-en-aout/devis"),
};

const POURQUOI = [
  {
    titre: "Pourquoi cette ligne ?",
    texte: "Parce qu'un jardin sec n'est pas un jardin sans eau. La première année, ses racines ne sont pas encore descendues : il faut l'aider. Le dire avant de signer, c'est éviter la surprise de juillet.",
  },
  {
    titre: "Et si l'arrosage est restreint ?",
    texte: "On suit l'arrêté de ta commune : les restrictions sont graduées, de la vigilance à la crise. Si ta commune est souvent en alerte, on garde les plantes les plus sensibles pour une plantation d'automne.",
  },
  {
    titre: "Et le crédit d'impôt ?",
    texte: "Pas sur ce devis : la création d'un jardin n'y ouvre pas droit. Il ne vaut que pour l'entretien, confié à une entreprise déclarée services à la personne.",
  },
];

export default function PageDevis() {
  return (
    <main>
      <EnTetePage surtitre="Un devis, pour exemple" titre="La ligne que *personne ne met.*" photo={PHOTOS.pots} note="devis n° 27">
        Sur chaque devis, avant le total : l&apos;arrosage qu&apos;il faudra, l&apos;été. Une estimation,
        écrite noir sur blanc, pour que tu saches ce que ton jardin te demandera.
      </EnTetePage>

      <section className="mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <Apparition de="zoom">
          <Devis />
        </Apparition>
        <div className="space-y-5">
          {POURQUOI.map((p, i) => (
            <Apparition key={p.titre} delai={i * 120} className="rounded-[2rem] border border-[var(--trait)] bg-[var(--carte)] p-7">
              <h2 className="text-2xl font-extrabold">{p.titre}</h2>
              <p className="mt-3 leading-relaxed text-[var(--doux)]">{p.texte}</p>
            </Apparition>
          ))}
        </div>
      </section>

      <section className="bg-[#E7D7B4]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-24 sm:px-8 md:py-28 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div className="space-y-6">
            <Apparition><Surtitre>Avant le devis</Surtitre></Apparition>
            <Titre texte="Les plantes, *pour ta commune.*" />
          </div>
          <Apparition delai={200} className="flex flex-wrap gap-3 lg:justify-end">
            <Bouton href={`${DOSSIER}#commune`} variante="sombre">Tape ta commune</Bouton>
            <Bouton href={`${DOSSIER}#photos`} variante="contour">Envoyer trois photos</Bouton>
          </Apparition>
        </div>
      </section>

      <AppelFinal />
    </main>
  );
}
