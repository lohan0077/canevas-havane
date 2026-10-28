import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, EnTetePage, Surtitre } from "../_composants/Blocs";
import { Chaises } from "../_composants/Outils";
import { CONCERT, photos } from "../_composants/donnees";

// La vidéo « Créer une marque » : « Et une fois par mois, un concert de salon, chez un
// élève. Six élèves, douze chaises, et les voisins. » Une invitation entre particuliers,
// entrée libre, un programme du domaine public.
export const metadata: Metadata = {
  title: "Concerts de salon — Clair de Salon, site de démonstration",
  description: "Une fois par mois, un concert de salon chez un élève : six élèves au piano, douze chaises, entrée libre. Site de démonstration d'une entreprise imaginaire.",
  ...adressesDeLaPage("/exemples/clair-de-salon/concerts"),
};

export default function Concerts() {
  return (
    <main>
      <EnTetePage surtitre="Une fois par mois" titre="Concert *de salon.*" photo={photos.salon} origine="50% 60%">
        Chez un élève qui l&apos;accepte, dans son salon, sur son piano. {CONCERT.eleves} élèves jouent
        ce qu&apos;ils savent ; {CONCERT.chaises} chaises pour les écouter. Entrée libre, voisins bienvenus.
      </EnTetePage>
      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-8 md:py-28 lg:grid-cols-2 lg:items-start">
        <Apparition de="zoom">
          <div className="space-y-5 rounded-[2rem] border border-[var(--trait)] bg-[var(--carte)] p-7 text-center shadow-[0_40px_90px_-50px_rgba(30,42,68,0.55)] sm:p-10">
            <p aria-hidden="true" className="flex items-center justify-center gap-3 text-[var(--accent-texte)]"><span className="h-px w-12 bg-current" />☾<span className="h-px w-12 bg-current" /></p>
            <p className="text-[12px] font-bold uppercase tracking-[0.24em] text-[var(--doux)]">Prochain concert</p>
            <p className="font-[family-name:var(--titres)] text-5xl leading-none">{CONCERT.date}</p>
            <p className="text-xl italic">{CONCERT.heure}, {CONCERT.chez}</p>
            <ol className="space-y-2 border-t border-[var(--trait)] pt-5 text-left">
              {CONCERT.programme.map((m, i) => (
                <li key={m} className="flex gap-3"><span className="font-[family-name:var(--titres)] italic text-[var(--accent-texte)] [font-variant-numeric:lining-nums]">{i + 1}.</span>{m}</li>
              ))}
            </ol>
            <p className="text-sm text-[var(--doux)]">Date et programme d&apos;exemple. Des œuvres du domaine public, jouées entre amis.</p>
          </div>
        </Apparition>
        <div className="space-y-6">
          <Apparition><Surtitre>Entrée libre</Surtitre></Apparition>
          <TitreRevele
            texte="Garde-toi *une chaise.*"
            className="text-[clamp(2.6rem,5vw,4.5rem)] leading-[0.98] tracking-[-0.02em]"
            classeAccent="italic text-[var(--accent-texte)]"
          />
          <Apparition delai={150}>
            <Chaises />
          </Apparition>
        </div>
      </section>
      <AppelFinal />
    </main>
  );
}
