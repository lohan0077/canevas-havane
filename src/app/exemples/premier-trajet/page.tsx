import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, SEMAINES, HEURES, JOURS, ecole, etapes, jamaisFacture, moniteurs, photos, questions } from "./_composants/donnees";
import Intitule from "./_composants/Intitule";
import ReserverEvaluation from "./_composants/ReserverEvaluation";
import Forfait from "./_composants/Forfait";
import Faq from "./_composants/Faq";

// Le site imaginé dans la vidéo « Si je devais remplir l'agenda d'une auto-école » :
// un seul bouton sur l'accueil (réserver l'évaluation de départ), le prix ligne par
// ligne, les leçons réservées sur le site. Mise en page inspirée du modèle « Axle
// Journey » de MotionSites (tableau de bord en tuiles arrondies, navigation en
// pilules), transposée à une auto-école.
export const metadata: Metadata = {
  title: "Premier Trajet — site de démonstration",
  description: "Site de démonstration d'une auto-école imaginaire, réalisé par Canevas Havane : l'évaluation de départ en un clic, le forfait ligne par ligne, les leçons réservées sans appeler.",
  ...adressesDeLaPage("/exemples/premier-trajet"),
};

const CODE = [
  { titre: "En salle", texte: "Le mercredi à 18 h et le samedi à 11 h, avec Samir. Une séance d'une heure, des questions, des réponses expliquées." },
  { titre: "En ligne", texte: "Six mois d'accès compris dans le forfait, sur ton téléphone. Les séries reprennent là où tu t'es arrêté." },
  { titre: "Quand tu es prêt", texte: "Samir te dit quand tes séries sont régulières. Tu t'inscris à l'examen du code quand tu veux." },
];

export default function PremierTrajet() {
  const libres = JOURS.flatMap((j) => HEURES.map((h) => ({ j, h }))).filter(({ j, h }) => !SEMAINES[0].pris.includes(`${j.court}-${h}`));
  return (
    <main>
      {/* 1. L'ouverture : le titre, le bouton unique, la route. */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10 pb-14 grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
        <div className="flex flex-col gap-6 lg:justify-between">
          <div className="space-y-4">
            <p className="inline-flex items-center gap-2 rounded-full bg-[var(--carte)] border border-[var(--trait)] px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em]">
              <span aria-hidden="true" className="w-2 h-2 rounded-full bg-[var(--accent)]" />
              Auto-école · Ta Ville
            </p>
            <h1 id="titre" className="text-[52px] sm:text-7xl font-extrabold tracking-[-0.035em] leading-[0.95]">
              Le premier trajet. <span className="block text-[var(--doux)]">Tout seul.</span>
            </h1>
            <p className="text-lg leading-relaxed max-w-md">
              Sans personne sur le siège d'à côté. Ça commence par une heure au volant, pour
              savoir combien il t'en faudra.
            </p>
          </div>
          <ReserverEvaluation />
        </div>

        <div className="relative min-h-[420px] lg:min-h-[620px] rounded-[32px] overflow-hidden bg-[var(--sombre)]">
          <Image src={photos.retroviseur.src} alt={photos.retroviseur.alt} fill priority sizes="(min-width: 1024px) 600px, 100vw" className="object-cover" />
          <div className="absolute left-4 right-4 bottom-4 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-[var(--carte)] p-4">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--doux)]">Passager avant</p>
              <p className="font-[family-name:var(--titres)] text-2xl font-extrabold">Personne</p>
            </div>
            <div className="rounded-2xl bg-[var(--sombre)] text-[var(--sur-sombre)] p-4">
              <p className="text-xs font-bold uppercase tracking-[0.12em]">Destination</p>
              <p className="font-[family-name:var(--titres)] text-2xl font-extrabold">Chez toi</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Ce qui est écrit avant de signer. */}
      <section aria-label="Avant de signer" className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <ul className="grid gap-3 sm:grid-cols-3">
          {[
            { gros: "1 h", texte: "d'évaluation au volant, avant tout contrat" },
            { gros: "Écrites", texte: "tes heures estimées, inscrites au contrat" },
            { gros: "Ligne à ligne", texte: "le prix : ce qui est inclus, ce qui reste à ta charge" },
          ].map((t) => (
            <li key={t.gros} className="rounded-[24px] bg-[var(--carte)] border border-[var(--trait)] p-6 space-y-2">
              <p className="font-[family-name:var(--titres)] text-4xl font-extrabold tracking-tight">{t.gros}</p>
              <p className="text-[var(--doux)]">{t.texte}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* 3. Comment ça commence : la route, étape par étape. */}
      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 space-y-12">
          <Intitule clair pastille="Comment ça commence" titre={<>Cinq étapes. <span className="text-[var(--accent)]">Une seule à réserver.</span></>}>
            Le contrat se signe après une évaluation : la loi l'impose. Chez nous, c'est la
            porte d'entrée, et la seule chose à réserver pour commencer.
          </Intitule>
          <ol className="relative grid gap-4 lg:grid-cols-5">
            <span aria-hidden="true" className="absolute left-[27px] top-6 bottom-6 w-0 border-l-[3px] border-dashed border-[var(--accent)] lg:hidden" />
            {etapes.map((e, i) => (
              <li key={e.titre} className="relative flex gap-4 lg:block lg:space-y-4">
                <span className="relative z-10 grid place-items-center shrink-0 w-14 h-14 rounded-2xl bg-[var(--accent)] text-[var(--sur-accent)] font-[family-name:var(--titres)] text-2xl font-extrabold">
                  {i + 1}
                </span>
                <div className="space-y-1.5 rounded-[22px] bg-[var(--sur-sombre)]/[0.06] border border-[var(--sur-sombre)]/15 p-5 flex-1">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--accent)]">{e.duree}</p>
                  <h3 className="text-xl font-extrabold">{e.titre}</h3>
                  <p className="leading-relaxed">{e.texte}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="text-sm">Code de la route, art. L213-2 : le contrat est conclu après une évaluation préalable du candidat.</p>
        </div>
      </section>

      {/* 4. Le prix, ligne par ligne. */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 grid gap-10 lg:grid-cols-2 lg:items-start">
        <div className="space-y-8">
          <Intitule pastille="Le prix" titre={<>Ligne par ligne. <span className="text-[var(--doux)]">Rien en bas de page.</span></>}>
            Heures de code, heures au volant, frais inclus, frais à ta charge. Un arrêté de
            1987 l'exige déjà de toute publicité d'auto-école : on en a fait la vitrine.
          </Intitule>
          <div className="rounded-[24px] bg-[var(--carte)] border border-[var(--trait)] p-6 space-y-3">
            <p className="font-bold">Jamais facturé, nulle part :</p>
            <ul className="space-y-2">
              {jamaisFacture.map((x) => (
                <li key={x} className="flex gap-3">
                  <span aria-hidden="true" className="shrink-0 whitespace-nowrap font-extrabold">0&nbsp;€</span>
                  <span>{x}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-[var(--doux)]">Code de la route, art. L213-2.</p>
          </div>
          <Link href={`${DOSSIER}/tarifs`} className="inline-flex items-center gap-2 rounded-full bg-[var(--sombre)] text-[var(--sur-sombre)] px-6 h-12 font-bold">
            Tous les tarifs <span aria-hidden="true">→</span>
          </Link>
        </div>
        <Forfait compact />
      </section>

      {/* 5. L'image : le siège d'à côté, vide. */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="relative min-h-[460px] rounded-[32px] overflow-hidden bg-[var(--sombre)]">
            <Image src={photos.campagne.src} alt={photos.campagne.alt} fill sizes="(min-width: 1024px) 460px, 100vw" className="object-cover" />
          </div>
          <div className="rounded-[32px] bg-[var(--accent)] text-[var(--sur-accent)] p-8 sm:p-12 flex flex-col justify-between gap-10">
            <p className="text-xs font-bold uppercase tracking-[0.16em]">Ce qu'on vend, au fond</p>
            <p className="font-[family-name:var(--titres)] text-4xl sm:text-6xl font-extrabold tracking-[-0.03em] leading-[1]">
              Pas un forfait. Le jour où le siège passager est vide.
            </p>
            <p className="text-lg max-w-md">
              Un trajet à toi, à l'heure que tu veux, jusqu'où tu veux. Tout le reste, c'est
              pour y arriver.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Les leçons, en vrai. */}
      <section className="bg-[var(--carte)] border-y border-[var(--trait)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-8">
            <Intitule pastille="Les leçons" titre={<>En vrai, sur le site. <span className="text-[var(--doux)]">Sans appeler.</span></>}>
              Le planning de la semaine, tel qu'il est : ce qui est pris, ce qui est libre. Tu
              touches ton créneau, c'est réservé.
            </Intitule>
            <ul className="grid gap-2">
              {libres.slice(0, 4).map(({ j, h }) => (
                <li key={`${j.court}-${h}`} className="flex items-center justify-between rounded-2xl bg-[var(--fond)] border border-[var(--trait)] px-5 py-3.5">
                  <span className="font-semibold">{j.long}, {h}</span>
                  <span className="rounded-full bg-[var(--accent)] text-[var(--sur-accent)] px-3 py-0.5 text-xs font-bold">Libre</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-[var(--doux)]">Créneaux d'exemple, cette semaine.</p>
            <Link href={`${DOSSIER}/lecons`} className="inline-flex items-center gap-2 rounded-full bg-[var(--sombre)] text-[var(--sur-sombre)] px-6 h-12 font-bold">
              Tout le planning <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="relative aspect-[3/2] rounded-[32px] overflow-hidden bg-[var(--sombre)]">
            <Image src={photos.volant.src} alt={photos.volant.alt} fill sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      {/* 7. Le code. */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 space-y-10">
        <Intitule pastille="Le code" titre={<>Le code, <span className="text-[var(--doux)]">en salle ou dans la poche.</span></>} />
        <ul className="grid gap-3 md:grid-cols-3">
          {CODE.map((c, i) => (
            <li key={c.titre} className="rounded-[24px] bg-[var(--carte)] border border-[var(--trait)] p-6 space-y-3">
              <p className="font-[family-name:var(--titres)] text-sm font-extrabold tabular-nums text-[var(--accent-texte)]">0{i + 1}</p>
              <h3 className="text-2xl font-extrabold">{c.titre}</h3>
              <p className="leading-relaxed text-[var(--doux)]">{c.texte}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* 8. L'équipe. */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20 space-y-10">
        <Intitule pastille="L'équipe" titre={<>Trois prénoms. <span className="text-[var(--doux)]">Un seul numéro.</span></>}>
          Deux enseignants de la conduite, titulaires de l'autorisation d'enseigner, et
          Samir au code et à l'accueil.
        </Intitule>
        <ul className="grid gap-3 md:grid-cols-3">
          {moniteurs.map((m) => (
            <li key={m.prenom} className="rounded-[24px] bg-[var(--carte)] border border-[var(--trait)] p-6 flex gap-4">
              <span aria-hidden="true" className="grid place-items-center shrink-0 w-14 h-14 rounded-2xl bg-[var(--sombre)] text-[var(--accent)] font-[family-name:var(--titres)] text-2xl font-extrabold">
                {m.initiale}
              </span>
              <div className="space-y-1">
                <h3 className="text-xl font-extrabold">{m.prenom}</h3>
                <p className="text-sm font-semibold text-[var(--accent-texte)]">{m.role}</p>
                <p className="leading-relaxed text-[var(--doux)]">{m.phrase}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="text-sm text-[var(--doux)]">Prénoms d'exemple : l'école et son équipe sont fictives.</p>
      </section>

      {/* 9. Les questions. */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <Intitule pastille="Questions" titre={<>Avant de <span className="text-[var(--doux)]">t'inscrire.</span></>} />
        <Faq questions={questions} />
      </section>

      {/* 10. Le dernier appel. */}
      <section className="px-4 sm:px-6 pb-20">
        <div className="max-w-6xl mx-auto rounded-[32px] bg-[var(--sombre)] text-[var(--sur-sombre)] p-8 sm:p-14 grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <div className="space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent)]">Prochaine évaluation libre</p>
            <p className="font-[family-name:var(--titres)] text-5xl sm:text-6xl font-extrabold tracking-[-0.03em] leading-[0.98]">
              Samedi, 10&nbsp;h. <span className="text-[var(--accent)]">C'est libre.</span>
            </p>
            <p className="text-lg">Une heure au volant avec Nadia. Tu repars avec tes heures estimées.</p>
          </div>
          <div className="space-y-4">
            <Link href={`${DOSSIER}/evaluation`} className="flex justify-center rounded-full bg-[var(--accent)] text-[var(--sur-accent)] px-6 py-4 text-lg font-extrabold">
              Réserver mon évaluation
            </Link>
            <p className="text-sm">
              Ou au {ecole.telephone}, du mardi au samedi. Créneau d'exemple : l'école est fictive.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
