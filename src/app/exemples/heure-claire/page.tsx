import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import Creneaux from "../_kit/Creneaux";
import { Faq, Intitule, Section } from "./_composants/Blocs";
import { ChiffreDuMois, Courbe } from "./_composants/Delai";
import Simulateur from "./_composants/Simulateur";
import { DELAI_DU_MOIS, DOSSIER, EQUIPE, METHODE, MOIS_DU_CHIFFRE, heures, photos } from "./_composants/donnees";

// L'accueil d'Heure Claire. Les idées de la vidéo, en état de marche : le prix par mois
// (le statut, le chiffre d'affaires, et le prix tombe), et le délai de réponse du mois,
// en haut du site et en grand, avec ses six derniers mois — y compris celui où il est
// monté. Premier écran : la grille à filets du modèle « Data Relay » de MotionSites.
export const metadata: Metadata = {
  title: "Heure Claire — site de démonstration",
  description: "Site de démonstration d'un cabinet d'expertise comptable imaginaire, réalisé par Canevas Havane : vos honoraires par mois, et notre délai de réponse, publié chaque mois.",
  ...adressesDeLaPage("/exemples/heure-claire"),
};

const REPERES = [
  { titre: "Le prix, par mois", texte: "Selon votre statut et votre chiffre d'affaires, affiché avant tout échange." },
  { titre: "Le délai, publié", texte: `${heures(DELAI_DU_MOIS)} en moyenne en ${MOIS_DU_CHIFFRE}. Mis à jour le 1er de chaque mois.` },
  { titre: "La lettre de mission", texte: "Le prix y est écrit, et signé, avant de commencer." },
  { titre: "Un interlocuteur", texte: "Une personne du cabinet suit votre dossier, toute l'année." },
];

const CRENEAUX = [
  { libelle: "Lundi", sous: "9 h 30" },
  { libelle: "Lundi", sous: "17 h 00", pris: true },
  { libelle: "Mardi", sous: "12 h 30" },
  { libelle: "Jeudi", sous: "8 h 30" },
  { libelle: "Jeudi", sous: "18 h 00", pris: true },
  { libelle: "Vendredi", sous: "11 h 00" },
];

export default function HeureClaire() {
  return (
    <main>
      <section className="border-b border-[var(--trait)]">
        <div className="mx-auto grid max-w-6xl lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-7 px-4 py-12 sm:px-6 sm:py-20 lg:border-r lg:border-[var(--trait)]">
            <p className="inline-flex items-center gap-2 border border-[var(--trait)] bg-[var(--carte)] px-3 py-1.5 text-[12px] font-semibold uppercase tracking-[0.14em]">
              <span aria-hidden="true" className="h-2 w-2 bg-[var(--accent)] outline outline-1 outline-[var(--encre)]" />
              Expertise comptable · créateurs, indépendants, SCI
            </p>
            <h1 className="text-[50px] font-semibold tracking-[-0.03em] sm:text-[84px]">
              Le dimanche soir, <em className="font-normal">sans tableur.</em>
            </h1>
            <p className="max-w-xl text-[18px] leading-relaxed text-[var(--doux)]">
              Heure Claire tient la comptabilité des entreprises qui démarrent. Vous déposez vos
              pièces quand vous voulez ; nous les traitons en semaine. Le prix est affiché, le
              délai de réponse aussi.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="#honoraires" className="inline-flex min-h-[52px] items-center bg-[var(--encre)] px-6 font-semibold text-[var(--fond)]">
                Calculer mes honoraires
              </Link>
              <Link href={`${DOSSIER}/delai`} className="inline-flex min-h-[52px] items-center border border-[var(--encre)] px-6 font-semibold">
                Notre délai de réponse
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] border-t border-[var(--trait)] lg:aspect-auto lg:border-t-0">
            <Image src={photos.canape.src} alt={photos.canape.alt} fill priority sizes="(min-width: 1024px) 480px, 100vw" className="object-cover" />
          </div>
        </div>
        <ul className="mx-auto grid max-w-6xl border-t border-[var(--trait)] sm:grid-cols-2 lg:grid-cols-4">
          {REPERES.map((r, i) => (
            <li key={r.titre} className={`space-y-1.5 px-4 py-6 sm:px-6 ${i > 0 ? "border-t border-[var(--trait)] sm:border-t-0" : ""} ${i % 2 ? "sm:border-l" : ""} ${i > 1 ? "sm:border-t lg:border-t-0" : ""} ${i === 2 ? "lg:border-l" : ""} border-[var(--trait)]`}>
              <h2 className="font-[family-name:var(--texte)] text-[16px] font-semibold tracking-normal">{r.titre}</h2>
              <p className="text-[15px] leading-relaxed text-[var(--doux)]">{r.texte}</p>
            </li>
          ))}
        </ul>
      </section>

      <Section id="honoraires" className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <Intitule numero="01" surtitre="Honoraires" titre={<>Le prix, <em className="font-normal">avant le premier appel.</em></>}>
          Deux questions : votre statut, votre chiffre d&apos;affaires. Le prix s&apos;affiche, par
          mois. Il ne remplace pas la lettre de mission, qui le fixe par écrit avant de
          commencer ; il vous évite simplement d&apos;attendre un devis pour le connaître.
          <p className="mt-4">
            <Link href={`${DOSSIER}/honoraires`} className="font-semibold text-[var(--encre)] underline underline-offset-4">Le détail, statut par statut</Link>
          </p>
        </Intitule>
        <Simulateur />
      </Section>

      <Section id="delai" sombre className="grid gap-10 lg:grid-cols-2 lg:items-start">
        <div className="space-y-8">
          <Intitule numero="02" surtitre="Le chiffre du mois" titre={<>Notre délai de réponse, <em className="font-normal">publié.</em></>}>
            Le délai moyen entre votre message et notre première réponse écrite. Il est
            calculé chaque mois, et publié en haut de ce site, qu&apos;il soit bon ou non.
          </Intitule>
          <ChiffreDuMois />
        </div>
        <div className="space-y-5 lg:pt-[13.5rem]">
          <Courbe />
          <Link href={`${DOSSIER}/delai`} className="inline-block font-semibold underline underline-offset-4">Comment il est calculé</Link>
        </div>
      </Section>

      <Section className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div className="relative aspect-[4/5] max-h-[560px] overflow-hidden border border-[var(--trait)]">
          <Image src={photos.pieds.src} alt={photos.pieds.alt} fill sizes="(min-width: 1024px) 460px, 100vw" className="object-cover" />
        </div>
        <Intitule numero="03" surtitre="Vos soirées" titre={<>Une comptabilité <em className="font-normal">tenue en semaine.</em></>}>
          <p>
            Vous photographiez vos justificatifs quand ils arrivent, depuis votre téléphone.
            Nous les classons et les rapprochons du lundi au vendredi. À la fin du mois, vous
            recevez un état simple : ce qui est entré, ce qui est sorti, ce qui manque.
          </p>
          <p className="mt-4">Le dimanche soir reste à vous.</p>
        </Intitule>
      </Section>

      <Section id="methode" className="space-y-12">
        <Intitule numero="04" surtitre="Méthode" titre="Quatre étapes, écrites d'avance." />
        <ol className="grid border-l border-t border-[var(--trait)] sm:grid-cols-2 lg:grid-cols-4">
          {METHODE.map((m, i) => (
            <li key={m.titre} className="space-y-3 border-b border-r border-[var(--trait)] bg-[var(--carte)] p-6">
              <p className="flex items-baseline justify-between">
                <span className="font-[family-name:var(--titres)] text-4xl font-semibold tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--doux)]">{m.duree}</span>
              </p>
              <h3 className="text-[24px] font-semibold">{m.titre}</h3>
              <p className="leading-relaxed text-[var(--doux)]">{m.texte}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6">
          <Intitule numero="05" surtitre="Le cabinet" titre="Trois personnes, un dossier suivi." />
          <div className="relative aspect-[3/2] overflow-hidden border border-[var(--trait)]">
            <Image src={photos.feuilles.src} alt={photos.feuilles.alt} fill sizes="(min-width: 1024px) 460px, 100vw" className="object-cover" />
          </div>
        </div>
        <ul className="border-t border-[var(--trait)] self-start">
          {EQUIPE.map((p) => (
            <li key={p.initiales} className="grid grid-cols-[4rem_1fr] items-center gap-4 border-b border-[var(--trait)] py-5">
              <span className="grid h-14 w-14 place-items-center border border-[var(--encre)] font-[family-name:var(--titres)] text-xl font-semibold">{p.initiales}</span>
              <span>
                <span className="block text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--accent-texte)]">{p.role}</span>
                <span className="block text-[17px]">{p.phrase}</span>
              </span>
            </li>
          ))}
          <li className="py-4 text-sm text-[var(--doux)]">Équipe d&apos;exemple, présentée par ses initiales : le cabinet est fictif.</li>
        </ul>
      </Section>

      <Section id="questions" className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <Intitule numero="06" surtitre="Questions" titre="Ce qu'on nous demande." />
        <Faq />
      </Section>

      <Section id="echange" className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <Intitule numero="07" surtitre="Premier échange" titre="Trente minutes, pour faire le point.">
          Au cabinet ou par téléphone. Votre statut, votre activité, et ce dont vous avez
          réellement besoin. Le premier échange n&apos;engage à rien.
        </Intitule>
        <div className="max-w-2xl">
          <Creneaux
            creneaux={CRENEAUX}
            colonnes={3}
            titreCarte="Votre premier échange"
            bouton="Réserver ce créneau"
            confirmation="Créneau réservé : nous vous appellerons à l'heure dite."
            note="Créneaux d'exemple. Sur un vrai site, ils suivent l'agenda réel du cabinet."
          />
        </div>
      </Section>
    </main>
  );
}
