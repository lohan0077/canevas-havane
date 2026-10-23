import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Accordeon from "../../_kit/Accordeon";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { EnTetePage, Surtitre } from "../_composants/Blocs";
import Samedi from "../_composants/Samedi";
import { agence, photos } from "../_composants/donnees";

// « Un samedi matin par mois : trente minutes pour savoir si ton projet tient. Les vrais
// créneaux, en ligne. » Une vraie date (le premier samedi du mois), un prix (art. 18 :
// pas de sous-évaluation trompeuse), et la réservation qui ne part nulle part.
export const metadata: Metadata = {
  title: "Le samedi — Pavillon Bis, site de démonstration",
  description: "Un samedi matin par mois, trente minutes pour savoir si ton projet tient : les créneaux d'une agence d'architecture imaginaire. Démonstration, rien n'est envoyé.",
  ...adressesDeLaPage("/exemples/pavillon-bis/rendez-vous"),
};

const AVANT = [
  "Une photo de ta maison, et du terrain",
  "Sa surface, si tu la connais (l'avis de taxe foncière la donne souvent)",
  "Ce que tu voudrais changer, en une phrase",
  "Ton budget, même approximatif",
];

const QUESTIONS_SAMEDI = [
  {
    question: "Et si aucun samedi ne me convient ?",
    reponse: "Écris-le en réservant le prochain : on te propose un créneau en semaine. Le samedi existe pour ceux qui travaillent toute la semaine.",
  },
  {
    question: "Que se passe-t-il après les trente minutes ?",
    reponse: "Tu repars avec une réponse : le projet tient, ou pas, et ce qu'il demande. Si tu veux aller plus loin, on t'envoie une proposition de mission, avec sa rémunération, avant tout engagement.",
  },
  {
    question: "Pourquoi ce n'est pas gratuit ?",
    reponse: `Parce que c'est un vrai premier avis, donné par un architecte : ${agence.prixSamedi} (exemple), déduits si tu nous confies ensuite une mission.`,
  },
];

export default function RendezVous() {
  return (
    <main>
      <EnTetePage surtitre="Un samedi matin par mois" titre="Trente minutes pour *ton projet.*" photo={photos.croquis}>
        À l&apos;agence ou en visio, le premier samedi de chaque mois. On regarde ta maison, ton terrain,
        ton budget, et on te dit si le projet tient. {agence.prixSamedi} (exemple), déduits si tu nous
        confies ensuite une mission.
      </EnTetePage>

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-8 md:py-28 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-7 lg:pt-6">
          <Apparition><Surtitre className="text-[var(--doux)]">Avant de venir</Surtitre></Apparition>
          <TitreRevele
            texte="Ce qu'il faut *apporter.*"
            className="font-[family-name:var(--titres)] text-[clamp(2.4rem,4.6vw,3.8rem)] font-semibold leading-[0.95] tracking-[-0.04em]"
            classeAccent="italic font-normal text-[var(--accent-texte)]"
          />
          <ul className="space-y-3">
            {AVANT.map((a, i) => (
              <Apparition as="li" key={a} delai={i * 100} className="flex items-baseline gap-4 border-b border-[var(--trait)] pb-3 text-lg">
                <span className="font-[family-name:var(--titres)] italic text-[var(--accent-texte)]">{i + 1}</span>
                {a}
              </Apparition>
            ))}
          </ul>
        </div>
        <div id="creneaux" className="scroll-mt-24">
          <Apparition de="zoom">
            <Samedi />
          </Apparition>
        </div>
      </section>

      <section className="px-3 pb-3 sm:px-5 sm:pb-5">
        <div className="kit-grain overflow-hidden rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:px-10 md:py-28 lg:grid-cols-[0.7fr_1.3fr]">
            <div className="space-y-6">
              <Surtitre>Questions</Surtitre>
              <TitreRevele
                texte="Le samedi, *en pratique.*"
                className="font-[family-name:var(--titres)] text-[clamp(2.4rem,4.6vw,3.8rem)] font-semibold leading-[0.95] tracking-[-0.04em]"
                classeAccent="italic font-normal text-[var(--accent)]"
              />
            </div>
            <div className="[--doux:#E7E0D2] [--trait:#4A5A51]">
              <Accordeon questions={QUESTIONS_SAMEDI} nom="samedi" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
