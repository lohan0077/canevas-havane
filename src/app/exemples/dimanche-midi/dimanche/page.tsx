import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { ACCENT, ACCENT_CLAIR, EnTetePage, Surtitre, TITRE, VersRendezVous } from "../_composants/Blocs";
import Inscription from "../_composants/Inscription";
import { photos, programme } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Un dimanche par mois — Dimanche Midi, site de démonstration",
  description:
    "Un dimanche par mois, un cabinet de gestion de patrimoine imaginaire ouvre à midi : parents et enfants viennent ensemble ouvrir le carnet de famille.",
  ...adressesDeLaPage("/exemples/dimanche-midi/dimanche"),
};

export default function PageDimanche() {
  return (
    <main>
      <EnTetePage surtitre="Un dimanche par mois" titre="Le cabinet ouvre *à midi.*" photo={photos.salle} origine="50% 40%">
        Parents et enfants, ensemble, au cabinet, sur inscription. Sans frais. On ouvre le carnet de
        famille, et chacun pose ses questions.
      </EnTetePage>

      <section className="mx-auto grid grid-cols-1 max-w-7xl gap-14 px-4 py-16 sm:px-8 md:py-24 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div className="space-y-6 px-1">
          <Apparition><Surtitre>S&apos;inscrire</Surtitre></Apparition>
          <TitreRevele texte="Une place *à table.*" className={`text-[clamp(2.8rem,6vw,5.4rem)] ${TITRE}`} classeAccent={ACCENT} />
          <Apparition as="p" delai={150} className="max-w-md text-[18px] leading-relaxed text-[var(--doux)]">
            Un dimanche, combien de parents, combien d&apos;enfants. Aucun nom demandé : vous le direz en
            arrivant.
          </Apparition>
        </div>
        <Apparition de="zoom"><Inscription /></Apparition>
      </section>

      <section className="px-3 sm:px-5">
        <div className="rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
          <div className="mx-auto max-w-6xl space-y-12 px-6 py-20 sm:px-10 md:py-28">
            <div className="space-y-6">
              <Apparition><Surtitre clair>Le déroulé</Surtitre></Apparition>
              <TitreRevele texte="De midi *à trois heures.*" className={`text-[clamp(2.8rem,6vw,5.4rem)] ${TITRE}`} classeAccent={ACCENT_CLAIR} />
            </div>
            <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {programme.map((p, i) => (
                <Apparition as="li" key={p.heure} delai={i * 110} className="space-y-3 rounded-[1.75rem] bg-[#3A5848] p-6">
                  <p className="font-[family-name:var(--titres)] text-[44px] leading-none text-[#E3C374] [font-variant-numeric:lining-nums]">{p.heure}</p>
                  <p className="text-[19px] font-semibold">{p.titre}</p>
                  <p className="text-[15px] leading-relaxed text-[#E9DDC2]">{p.texte}</p>
                </Apparition>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl space-y-5 px-5 py-24 text-center sm:px-6">
        <p className="font-[family-name:var(--titres)] text-[clamp(2.4rem,5vw,4rem)] leading-[1]">
          Vous venez. <em className="text-[var(--accent-texte)]">Nous ne venons pas chez vous.</em>
        </p>
        <p className="text-[17px] leading-relaxed text-[var(--doux)]">
          Un rendez-vous à la maison, même demandé par la famille, serait du démarchage (code monétaire
          et financier, art. L341-1). Le dimanche se passe au cabinet : c&apos;est pour ça qu&apos;il existe.
        </p>
      </section>

      <VersRendezVous />
    </main>
  );
}
