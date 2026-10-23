import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Accordeon from "../../_kit/Accordeon";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { EnTetePage, Surtitre } from "../_composants/Blocs";
import Reservation from "../_composants/Reservation";
import { FORMULE, QUESTIONS, photos, studio } from "../_composants/donnees";

// La réservation. La vidéo « Remplir l'agenda » : « Le client voit que tout le monde est
// gêné au début. Alors il réserve sa séance. » On choisit un créneau, on le réserve : la
// démonstration le confirme et dit que rien n'est envoyé.
export const metadata: Metadata = {
  title: "Réserver — Pour Plus Tard, site de démonstration",
  description: "Choisir la date d'une séance photo en famille, et sa boîte de vingt tirages. Site de démonstration : rien n'est envoyé ni enregistré.",
  ...adressesDeLaPage("/exemples/pour-plus-tard/reserver"),
};

export default function Reserver() {
  return (
    <main>
      <EnTetePage surtitre={`${FORMULE.nom} · ${FORMULE.prix} TTC, exemple`} titre="Ta date, *ton heure.*" tirages={[{ ...photos.minute1, legende: "minute 1" }, { ...photos.ratee, legende: "la ratée" }, { ...photos.minute40, legende: "minute 40" }]}>
        Tout le monde est gêné au début : c&apos;est prévu. Choisis un samedi ou un dimanche de
        novembre ; on te rappelle dans la journée pour choisir le lieu ensemble.
      </EnTetePage>

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-8 md:py-28 lg:grid-cols-[0.7fr_1.3fr]">
        <div className="space-y-6 lg:pt-6">
          <Apparition><Surtitre className="text-[var(--doux)]">Ce qui est prévu</Surtitre></Apparition>
          <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)] text-lg">
            {["Une heure, en extérieur ou chez toi", "Jusqu'à six personnes, enfants compris", "Vingt tirages dans une boîte à ton nom", "Réglé le jour de la séance, rien en ligne", `Ou par téléphone : ${studio.telephone}`].map((t) => (
              <li key={t} className="flex gap-3 py-3.5">
                <span aria-hidden="true" className="text-[var(--accent-texte)]">→</span>
                {t}
              </li>
            ))}
          </ul>
          <p className="text-[14px] text-[var(--doux)]">Le numéro appartient à la tranche que l&apos;ARCEP réserve aux œuvres de fiction.</p>
        </div>
        <Apparition de="zoom">
          <Reservation />
        </Apparition>
      </section>

      <section className="px-3 pb-3 sm:px-5 sm:pb-5">
        <div className="kit-grain overflow-hidden rounded-[6px] bg-[var(--sombre)] text-[var(--sur-sombre)]">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:px-10 md:py-28 lg:grid-cols-[0.7fr_1.3fr]">
            <div className="space-y-6">
              <Surtitre>Questions</Surtitre>
              <TitreRevele
                texte="Avant *de réserver.*"
                className="font-[family-name:var(--titres)] text-[clamp(2.4rem,4.6vw,3.8rem)] font-medium leading-[0.95] tracking-[-0.03em]"
                classeAccent="italic text-[#E0B48C]"
              />
            </div>
            <div className="[--doux:#E6D9C6] [--trait:#4A3D36]">
              <Accordeon questions={QUESTIONS.slice(2).map((q) => ({ question: q.q, reponse: q.r }))} nom="reserver" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
