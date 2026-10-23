import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, Arche, EnTetePage, Surtitre } from "../_composants/Blocs";
import Lecture from "../_composants/Lecture";
import ProposerLettre from "../_composants/ProposerLettre";
import { LETTRE, photos } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "La lettre de la semaine — Relue, site de démonstration",
  description: "Chaque semaine, Relue lit à voix haute une vraie lettre, avec l'accord de celui qui l'a écrite. Papeterie imaginaire, site de démonstration.",
  ...adressesDeLaPage("/exemples/relue/lettre-de-la-semaine"),
};

export default function LettreDeLaSemaine() {
  return (
    <main>
      <EnTetePage surtitre={`Chaque semaine · lettre n° ${LETTRE.numero}`} titre="Une vraie lettre, *lue à voix haute.*" photo={photos.lettres}>
        Avec l&apos;accord de celui qui l&apos;a écrite. Cette semaine : Robert, à Brest, en mai 1984.
      </EnTetePage>

      <section className="mx-auto grid max-w-7xl gap-14 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div className="space-y-8 lg:sticky lg:top-28">
          <Apparition><Surtitre>Écouter</Surtitre></Apparition>
          <TitreRevele
            texte="Neuf secondes, *quarante ans après.*"
            className="font-[family-name:var(--titres)] text-[clamp(2.6rem,5vw,4.6rem)] font-normal leading-[0.95] tracking-[-0.03em]"
            classeAccent="italic text-[var(--accent-texte)]"
          />
          <Apparition as="p" delai={150} className="max-w-md text-xl leading-relaxed text-[var(--doux)]">
            Les lignes s&apos;éclairent à mesure qu&apos;on les lit. Sur ce site de démonstration, le lecteur
            ne joue aucun son : il montre le geste.
          </Apparition>
        </div>
        <div className="rounded-[2rem] border border-[var(--trait)] bg-[#F3EADA] p-4 sm:p-8">
          <Lecture />
        </div>
      </section>

      <section className="px-3 sm:px-5">
        <div className="kit-grain overflow-hidden rounded-[2rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
          <div className="mx-auto grid max-w-6xl gap-14 px-6 py-20 sm:px-10 md:py-28 lg:grid-cols-2">
            <div className="space-y-6">
              <Apparition><Surtitre clair>Le droit de l&apos;auteur</Surtitre></Apparition>
              <TitreRevele
                texte="Le papier est à toi. *Le texte, à celui qui l'a écrit.*"
                className="font-[family-name:var(--titres)] text-[clamp(2.4rem,4.6vw,4.2rem)] font-normal leading-[0.98] tracking-[-0.03em]"
                classeAccent="italic text-[#F2C9A8]"
              />
              <Apparition as="p" delai={150} className="text-lg leading-relaxed">
                Une lettre reçue t&apos;appartient comme objet. Mais seul son auteur décide de la faire
                connaître (code de la propriété intellectuelle, art. L121-2) — ou ses héritiers, s&apos;il
                n&apos;est plus là. Alors on demande, toujours, avant de lire. Et si la lettre nomme
                d&apos;autres personnes, on change leur prénom, ou on leur demande aussi.
              </Apparition>
            </div>
            <div className="space-y-5 text-[var(--encre)]">
              <p className="font-[family-name:var(--titres)] text-3xl text-[var(--sur-sombre)]">Proposer une lettre</p>
              <ProposerLettre />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
        <Apparition de="rideau">
          <Arche photo={photos.plume} className="mx-auto aspect-[16/10] w-full max-w-4xl sm:aspect-[21/10]" sizes="(min-width: 1024px) 900px, 100vw" />
        </Apparition>
      </section>

      <AppelFinal />
    </main>
  );
}
