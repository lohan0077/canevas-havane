import Creneaux from "../../_kit/Creneaux";
import { CRENEAUX, VERIFICATIONS } from "./donnees";

/** Les questions, en accordéon natif, encadrées de filets. */
export function Faq({ questions }: { questions: { question: string; reponse: string }[] }) {
  return (
    <div className="border-t-2 border-[var(--encre)]">
      {questions.map((q) => (
        <details key={q.question} className="group border-b-2 border-[var(--encre)] py-4">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-lg font-bold [&::-webkit-details-marker]:hidden">
            {q.question}
            <span aria-hidden="true" className="grid h-8 w-8 shrink-0 place-items-center bg-[var(--accent)] text-xl leading-none transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="pt-3 leading-relaxed text-[var(--doux)]">{q.reponse}</p>
        </details>
      ))}
    </div>
  );
}

/** Les trois vérifications de la visite, numérotées comme sur un plan. */
export function Verifications() {
  return (
    <ol className="border-2 border-[var(--encre)] bg-[var(--carte)]">
      {VERIFICATIONS.map((v, i) => (
        <li key={v.titre} className="flex gap-4 border-b-2 border-[var(--encre)] p-5 last:border-b-0">
          <span className="grid h-10 w-10 shrink-0 place-items-center bg-[var(--encre)] font-[family-name:var(--titres)] text-lg font-bold text-[#F2B134]">{i + 1}</span>
          <span className="space-y-1">
            <span className="block font-[family-name:var(--titres)] text-xl font-bold uppercase">{v.titre}</span>
            <span className="block leading-relaxed text-[var(--doux)]">{v.texte}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}

/** Le choix de la date de visite : les créneaux du kit, aux couleurs du bureau. */
export function DateDeVisite() {
  return (
    <div data-film="creneaux">
      <Creneaux
        creneaux={CRENEAUX}
        colonnes={3}
        titreCarte="Ta visite"
        bouton="Choisir cette date"
        confirmation="Visite : {creneau}"
        note="Créneaux d'exemple pour la semaine prochaine ; ceux marqués « Pris » sont inventés."
      />
    </div>
  );
}

/** L'affiche du lancement, au rayon des masses. */
export function Affiche() {
  return (
    <div aria-hidden="true" className="mx-auto w-full max-w-[300px] rotate-[-3deg] bg-[#1E2A38] p-7 text-[#F3EEE4] shadow-[0_30px_50px_-30px_rgba(30,42,56,.8)]">
      <p className="font-[family-name:var(--titres)] text-5xl font-bold uppercase leading-[0.95]">Avant la masse,</p>
      <p className="mt-1 font-[family-name:var(--titres)] text-5xl font-bold uppercase leading-[0.95] text-[#F2B134]">le calcul.</p>
      <p className="mt-10 text-[11px] font-bold uppercase tracking-[0.18em]">Belle Portée · bureau d&apos;études structure</p>
    </div>
  );
}

/** Le mur de la semaine : avant, après, et la poutre qui le remplace (dessin). */
export function MurDeLaSemaine() {
  return (
    <div aria-hidden="true" className="grid grid-cols-2 border-2 border-[var(--encre)]">
      {[false, true].map((apres) => (
        <div key={String(apres)} className={`relative aspect-[3/4] overflow-hidden ${apres ? "border-l-2 border-[var(--encre)]" : ""}`}>
          <div className="absolute inset-0 bg-[#EFE8DA]" />
          {apres ? (
            <>
              <div className="absolute inset-x-[14%] bottom-[8%] top-[30%] bg-[#C9D6DE]" />
              <div className="absolute inset-x-[16%] bottom-[8%] h-[16%] bg-[#FBF8F2]" />
              <div className="absolute inset-x-[10%] top-[24%] h-[6%] bg-[#1E2A38]" />
            </>
          ) : (
            <div className="absolute bottom-[8%] left-1/2 h-[46%] w-[26%] -translate-x-1/2 bg-[#8A6A4A]" />
          )}
          <div className="absolute inset-x-0 bottom-0 h-[8%] bg-[#D9CDB7]" />
          <span className="absolute left-2 top-2 bg-[#1E2A38] px-2 py-0.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#F2B134]">{apres ? "Après" : "Avant"}</span>
        </div>
      ))}
    </div>
  );
}
