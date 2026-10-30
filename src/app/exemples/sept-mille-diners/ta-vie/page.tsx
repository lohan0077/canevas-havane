import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import { AppelFinal, Appli, Bouton, EnTetePage, PORCELAINE, Titre } from "../_composants/Blocs";
import TaVie from "../_composants/TaVie";
import { DOSSIER, NOTES, photos } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Ta vie, ton plan — Sept Mille Dîners, site de démonstration",
  description:
    "Trois questions sur ta vie — combien à table, qui cuisine, qui fait la vaisselle — et le plan de cuisine qui va avec. Marque de cuisines imaginaire, site de démonstration.",
  ...adressesDeLaPage("/exemples/sept-mille-diners/ta-vie"),
};

const RUBRIQUES = [
  { cle: "combien", titre: "Combien à table", sous: "décide de la table", photo: photos.service },
  { cle: "cuisine", titre: "Qui cuisine", sous: "décide des postes de travail", photo: photos.cocotte },
  { cle: "vaisselle", titre: "Qui fait la vaisselle", sous: "décide du lave-vaisselle", photo: photos.tasses },
] as const;

export default function PageTaVie() {
  return (
    <main>
      <EnTetePage titre="Ta vie, ton plan." photo={photos.table} origine="50% 35%">
        Pas de catalogue : il te montrerait la cuisine des autres. Trois questions suffisent pour commencer la tienne : le reste se
        décide chez toi, mètre en main.
      </EnTetePage>

      <section id="outil" className={PORCELAINE}>
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <Apparition>
            <Appli adresse="Ta vie, ton plan" etape="Trois questions">
              <TaVie />
            </Appli>
          </Apparition>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl space-y-14 px-6 py-28 md:py-40">
          <Titre texte="Le plan qui va avec ta vie. Pas avec la photo." className="max-w-3xl" />
          <div className="grid gap-10 md:grid-cols-3 md:gap-6">
            {RUBRIQUES.map((r, i) => (
              <Apparition key={r.cle} delai={i * 120} className="space-y-5">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[var(--sombre)]">
                  <Image src={r.photo.src} alt={r.photo.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover [filter:saturate(0.88)]" />
                </div>
                <div className="space-y-1">
                  <h2 className="font-[family-name:var(--titres)] text-[1.75rem] font-normal leading-tight">{r.titre}</h2>
                  <p className="text-[15px] text-[var(--doux)]">Ta réponse {r.sous}.</p>
                </div>
                <ul className="divide-y divide-[var(--trait)] border-t border-[var(--trait)]">
                  {Object.values(NOTES[r.cle]).map((n) => (
                    <li key={n.titre} className="py-3">
                      <span className="block font-medium">{n.titre}</span>
                      <span className="block text-[15px] leading-relaxed text-[var(--doux)]">{n.texte}</span>
                    </li>
                  ))}
                </ul>
              </Apparition>
            ))}
          </div>
          <Apparition className="flex flex-wrap items-center gap-4">
            <Bouton href={`${DOSSIER}/tes-murs`}>Mesurer mes murs</Bouton>
            <p className="text-[15px] text-[var(--doux)]">La longueur de tes murs donne la fourchette, TTC, pose comprise.</p>
          </Apparition>
        </div>
      </section>

      <AppelFinal />
    </main>
  );
}
