import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, Appli, Bouton, EnTetePage, Surtitre } from "../_composants/Blocs";
import TaVie from "../_composants/TaVie";
import { DOSSIER, NOTES, photos } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Ta vie, ton plan — Sept Mille Dîners, site de démonstration",
  description:
    "Trois questions sur ta vie — combien à table, qui cuisine, qui fait la vaisselle — et le plan de cuisine qui va avec. Marque de cuisines imaginaire, site de démonstration.",
  ...adressesDeLaPage("/exemples/sept-mille-diners/ta-vie"),
};

const RUBRIQUES = [
  { cle: "combien", titre: "Combien à table", sous: "décide de la table", photo: photos.table },
  { cle: "cuisine", titre: "Qui cuisine", sous: "décide des postes de travail", photo: photos.cocotte },
  { cle: "vaisselle", titre: "Qui fait la vaisselle", sous: "décide du lave-vaisselle", photo: photos.tasses },
] as const;

export default function PageTaVie() {
  return (
    <main>
      <EnTetePage surtitre="Pas de catalogue" titre="Ta vie, *ton plan.*" photo={photos.table} origine="50% 30%">
        Un catalogue te montre la cuisine des autres. Trois questions suffisent pour commencer la tienne :
        le reste se décide chez toi, mètre en main.
      </EnTetePage>

      <section id="outil" className="mx-auto max-w-7xl px-4 py-16 sm:px-8 md:py-24">
        <Apparition de="zoom">
          <Appli adresse="Sept Mille Dîners · ta vie, ton plan" etape="Trois questions">
            <TaVie />
          </Appli>
        </Apparition>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 md:pb-32">
        <div className="mb-12 space-y-6">
          <Apparition><Surtitre>Ce que chaque réponse change</Surtitre></Apparition>
          <TitreRevele
            texte="Le plan qui va avec ta vie. *Pas avec la photo.*"
            className="max-w-4xl font-[family-name:var(--titres)] text-[clamp(2.6rem,5.5vw,5rem)] leading-[0.96] tracking-[-0.035em]"
            classeAccent="italic text-[var(--accent-texte)]"
          />
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {RUBRIQUES.map((r, i) => (
            <Apparition key={r.cle} de="zoom" delai={i * 140} className="overflow-hidden rounded-[2rem] border border-[var(--trait)] bg-[var(--carte)]">
              <div className="relative aspect-[16/10] bg-[var(--sombre)]">
                <Image src={r.photo.src} alt={r.photo.alt} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
              </div>
              <div className="space-y-4 p-7">
                <p className="font-[family-name:var(--titres)] text-3xl">
                  {r.titre} <span className="block text-lg italic text-[var(--accent-texte)]">{r.sous}</span>
                </p>
                <ul className="space-y-3">
                  {Object.values(NOTES[r.cle]).map((n) => (
                    <li key={n.titre} className="border-t border-[var(--trait)] pt-3">
                      <span className="block font-semibold">{n.titre}</span>
                      <span className="block text-[15px] text-[var(--doux)]">{n.texte}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Apparition>
          ))}
        </div>
        <Apparition delai={200} className="mt-12 flex flex-wrap items-center gap-4">
          <Bouton href={`${DOSSIER}/tes-murs`}>Maintenant, tes murs</Bouton>
          <p className="text-[var(--doux)]">La longueur de tes murs donne la fourchette, TTC, pose comprise.</p>
        </Apparition>
      </section>

      <AppelFinal />
    </main>
  );
}
