import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Accordeon from "../../_kit/Accordeon";
import Apparition from "../../_kit/Apparition";
import { EnTetePage, Titre } from "../_composants/Blocs";
import Samedi from "../_composants/Samedi";
import { ETAPES, HONORAIRES, LOI, QUESTIONS, agence, photos } from "../_composants/donnees";

// « Un samedi matin par mois : trente minutes pour savoir si ton projet tient. Les vrais
// créneaux, en ligne. » Une vraie date (le premier samedi du mois), un prix (art. 18 :
// pas de sous-évaluation trompeuse), et la réservation qui ne part nulle part. Depuis la
// version « carrée » de l'accueil, la page porte aussi ce qui en est sorti : la règle des
// 150 m², la méthode et les honoraires, dits avant de commencer (art. 46).
export const metadata: Metadata = {
  title: "Le samedi — Pavillon Bis, site de démonstration",
  description: "Un samedi matin par mois, trente minutes pour savoir si ton projet tient : les créneaux, la règle des 150 m² et les honoraires d'une agence d'architecture imaginaire. Démonstration, rien n'est envoyé.",
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
  { question: QUESTIONS[5].q, reponse: QUESTIONS[5].r },
];

export default function RendezVous() {
  return (
    <main>
      <EnTetePage titre="Trente minutes pour ton projet." photo={photos.croquis}>
        À l&apos;agence ou en visio, le premier samedi de chaque mois. On regarde ta maison, ton terrain,
        ton budget, et on te dit si le projet tient. {agence.prixSamedi} (exemple), déduits si tu nous
        confies ensuite une mission.
      </EnTetePage>

      {/* ---------- Les créneaux ---------- */}
      <section>
        <div className="mx-auto grid max-w-6xl gap-14 px-4 py-24 sm:px-6 md:py-36 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-6 lg:pt-6">
            <Titre texte="Ce qu'il faut apporter." taille="moyen" />
            <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
              {AVANT.map((a) => (
                <li key={a} className="py-4 text-lg">{a}</li>
              ))}
            </ul>
          </div>
          <div id="creneaux" className="scroll-mt-24">
            {/* Sans apparition : les créneaux sont filmés dès la première image. */}
            <Samedi />
          </div>
        </div>
      </section>

      {/* ---------- La règle, sans détour ---------- */}
      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto max-w-6xl space-y-14 px-6 py-28 md:py-40">
          <div className="grid gap-8 lg:grid-cols-[1fr_minmax(0,26rem)] lg:items-end">
            <Titre texte={"Au-delà de 150 m², avec permis : architecte obligatoire."} />
            <p className="text-lg leading-relaxed">En dessous ? On te le dit aussi. Loi n° 77-2 du 3 janvier 1977, art. 3 et 4 ; code de l&apos;urbanisme, art. R431-2 et R*421-14.</p>
          </div>
          <ol className="grid gap-x-10 gap-y-2 md:grid-cols-2">
            {LOI.map((l) => (
              <li key={l.titre} className="space-y-2 border-t border-white/20 py-6">
                <span className="block font-[family-name:var(--titres)] text-[1.5rem] leading-tight">{l.titre}</span>
                <span className="block text-[17px] leading-relaxed">{l.texte}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- Du samedi au chantier, et les honoraires ---------- */}
      <section>
        <div className="mx-auto grid max-w-6xl gap-16 px-6 py-28 md:py-40 lg:grid-cols-2">
          <div className="space-y-8">
            <Titre texte="Du samedi au chantier." taille="moyen" />
            <ol className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
              {ETAPES.map((e) => (
                <li key={e.titre} className="space-y-1 py-5">
                  <span className="block font-[family-name:var(--titres)] text-[1.4rem] leading-tight">{e.titre}</span>
                  <span className="block text-[16px] leading-relaxed text-[var(--doux)]">{e.texte}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="space-y-8">
            <Titre texte="Les honoraires, dits avant de commencer." taille="moyen" />
            <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
              {HONORAIRES.map(([quoi, prix, note]) => (
                <li key={quoi} className="flex items-baseline justify-between gap-6 py-5">
                  <span>
                    <span className="block text-lg">{quoi}</span>
                    <span className="block text-[15px] text-[var(--doux)]">{note}</span>
                  </span>
                  <span className="shrink-0 text-right font-[family-name:var(--titres)] text-[1.5rem] tabular-nums">
                    {prix}
                    <span className="block font-[family-name:var(--texte)] text-[13px] text-[var(--doux)]">exemple</span>
                  </span>
                </li>
              ))}
            </ul>
            <p className="text-[15px] leading-relaxed text-[var(--doux)]">
              Au forfait, fixé avant le début de la mission, ou selon la mission. Avant tout engagement, nous
              t&apos;en communiquons les modalités ; elles figurent au contrat.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- Questions ---------- */}
      <section className="border-t border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto grid max-w-6xl gap-14 px-6 py-28 md:py-36 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-6">
            <Titre texte="Le samedi, en pratique." taille="moyen" />
          </div>
          <Apparition delai={150}>
            <Accordeon questions={QUESTIONS_SAMEDI} nom="samedi" />
          </Apparition>
        </div>
      </section>
    </main>
  );
}
