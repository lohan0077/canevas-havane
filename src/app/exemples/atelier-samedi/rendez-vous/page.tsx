import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import { Faq, Intitule, Section } from "../_composants/Blocs";
import Samedi from "../_composants/Samedi";
import { agence } from "../_composants/donnees";

// « Un samedi matin par mois : trente minutes pour savoir si ton projet tient. Les vrais
// créneaux, en ligne. » Une vraie date (le premier samedi du mois), un prix (art. 18 :
// pas de sous-évaluation trompeuse), et la réservation qui ne part nulle part.
export const metadata: Metadata = {
  title: "Le samedi — Atelier Samedi, site de démonstration",
  description: "Un samedi matin par mois, trente minutes pour savoir si ton projet tient : les créneaux d'une agence d'architecture imaginaire. Démonstration, rien n'est envoyé.",
  ...adressesDeLaPage("/exemples/atelier-samedi/rendez-vous"),
};

const AVANT = [
  "Une photo de ta maison, et du terrain",
  "Sa surface, si tu la connais (l'avis de taxe foncière la donne souvent)",
  "Ce que tu voudrais changer, en une phrase",
  "Ton budget, même approximatif",
];

const QUESTIONS_SAMEDI = [
  {
    q: "Et si aucun samedi ne me convient ?",
    r: "Écris-le en réservant le prochain : on te propose un créneau en semaine. Le samedi existe pour ceux qui travaillent toute la semaine.",
  },
  {
    q: "Que se passe-t-il après les trente minutes ?",
    r: "Tu repars avec une réponse : le projet tient, ou pas, et ce qu'il demande. Si tu veux aller plus loin, on t'envoie une proposition de mission, avec sa rémunération, avant tout engagement.",
  },
];

export default function RendezVous() {
  return (
    <main>
      <Section className="grid gap-10 pt-10 sm:pt-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <Intitule niveau={1} surtitre="Un samedi matin par mois" titre="Trente minutes pour ton projet.">
          <p>
            À l&apos;agence ou en visio, le premier samedi de chaque mois. On regarde ta maison,
            ton terrain, ton budget, et on te dit si le projet tient.
          </p>
          <p className="mt-4">Trente minutes : {agence.prixRendezVous} (exemple), déduits si tu nous confies ensuite une mission.</p>
        </Intitule>
        <Samedi />
      </Section>

      <Section sombre className="grid gap-10 lg:grid-cols-2">
        <Intitule surtitre="Avant de venir" titre="Ce qu'il faut apporter." />
        <ul className="space-y-3">
          {AVANT.map((a, i) => (
            <li key={a} className="flex items-baseline gap-4 border-b border-[var(--trait)] pb-3 text-[18px]">
              <span className="font-[family-name:var(--titres)] text-[15px] font-bold text-[var(--accent-texte)]">0{i + 1}</span>
              {a}
            </li>
          ))}
        </ul>
      </Section>

      <Section className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <Intitule surtitre="Questions" titre="Le samedi, en pratique." />
        <Faq questions={QUESTIONS_SAMEDI} />
      </Section>
    </main>
  );
}
