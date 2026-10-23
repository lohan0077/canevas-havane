import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import { AppelFinal, Bouton, EnTetePage } from "../_composants/Blocs";
import { DOSSIER, ETAPES, photos } from "../_composants/donnees";

// La vidéo « Remplir l'agenda » : « Et une page que personne ne fait : comment se passe un
// bornage. » Les étapes suivent la fiche Service-public.fr F3037 ; les frais communs, le
// Code civil, art. 646 (lus pour la vidéo, voir Videos/agenda-bureaux-etudes/SOURCES.md).
export const metadata: Metadata = {
  title: "Le bornage, étape par étape — Belle Portée, site de démonstration",
  description: "Un bornage, comment ça se passe ? Qui est convoqué, combien de temps, qui signe quoi : le guide d'un cabinet de géomètre-expert imaginaire.",
  ...adressesDeLaPage("/exemples/belle-portee/bornage"),
};

const PHOTOS = [photos.prairie, photos.parcelles, photos.champs, photos.cloture];

export default function LeBornage() {
  return (
    <main>
      <EnTetePage surtitre="Le guide" titre="Un bornage, *comment ça se passe ?*" photo={photos.prairie} cote="LA LIMITE">
        Qui est convoqué · combien de temps · qui signe quoi.
      </EnTetePage>

      <section className="mx-auto max-w-4xl px-4 py-14 sm:px-8 md:py-20">
        <ol data-film="etapes" className="relative space-y-8 border-l-2 border-dashed border-[var(--encre)] pl-8 sm:pl-10">
          {ETAPES.map((e, i) => (
            <li key={e.titre} id={`etape-${i + 1}`} className="relative scroll-mt-24">
              <span aria-hidden="true" className="absolute -left-[49px] top-2 grid h-9 w-9 place-items-center border-2 border-[var(--encre)] bg-[var(--accent)] sm:-left-[57px]">
                <span className="h-2.5 w-2.5 bg-[var(--encre)]" />
              </span>
              <Apparition className="grid overflow-hidden border-2 border-[var(--encre)] bg-[var(--carte)] sm:grid-cols-[0.9fr_1.1fr]">
                <div className="relative h-44 border-b-2 border-[var(--encre)] sm:h-auto sm:border-b-0 sm:border-r-2">
                  <Image src={PHOTOS[i].src} alt={PHOTOS[i].alt} fill sizes="(min-width: 640px) 360px, 100vw" className="object-cover" />
                </div>
                <div className="space-y-3 p-6">
                  <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-[var(--accent-texte)]">Étape {i + 1} sur 4</p>
                  <h2 className="text-[28px] font-black uppercase leading-none">{e.titre}</h2>
                  <p className="text-lg leading-relaxed">{e.court}</p>
                  <p className="leading-relaxed text-[var(--doux)]">{e.detail}</p>
                </div>
              </Apparition>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-y-2 border-[var(--encre)] bg-[var(--accent)] text-[var(--sur-accent)]">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-8 md:grid-cols-3">
          {[
            ["Qui paie ?", "Le bornage se fait à frais communs (Code civil, art. 646) : en général, les voisins partagent."],
            ["Combien de temps ?", "Quelques semaines pour rechercher les titres et réunir tout le monde ; une demi-journée sur place. Délais d'exemple."],
            ["Et si on n'est pas d'accord ?", "Personne ne signe contre son gré. Le bornage peut alors être demandé au juge, qui s'appuie en général sur l'avis d'un géomètre-expert."],
          ].map(([t, x], i) => (
            <Apparition key={t} delai={i * 100} className="space-y-2">
              <h2 className="text-2xl font-black uppercase">{t}</h2>
              <p className="leading-relaxed">{x}</p>
            </Apparition>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl space-y-5 px-4 py-16 text-center">
        <p className="text-sm text-[var(--doux)]">D&apos;après la fiche « Bornage » de Service-public.fr (F3037) et le Code civil, art. 646. Information générale.</p>
        <Bouton href={`${DOSSIER}/prix`} variante="encre">Voir le prix pour ton terrain</Bouton>
      </section>
      <AppelFinal />
    </main>
  );
}
