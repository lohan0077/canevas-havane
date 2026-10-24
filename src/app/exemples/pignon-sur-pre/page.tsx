import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import Accordeon from "../_kit/Accordeon";
import Apparition from "../_kit/Apparition";
import TitreRevele from "../_kit/TitreRevele";
import { ACCENT_SOMBRE, AppelFinal, Bouton, Intitule, Surtitre, Titre } from "./_composants/Blocs";
import QuoiFaire from "./_composants/QuoiFaire";
import VueDuCiel from "./_composants/VueDuCiel";
import { DOSSIER, MACHINES, QUESTIONS, TENTES, euros, photos } from "./_composants/donnees";

// L'accueil de Pignon sur Pré. « Créer une marque » : « Je vendrais la plus belle salle de
// la région. Le pré où t'as grandi. » et la tente posée sur la vue du ciel (#pre).
// « Remplir l'agenda » : « Sur l'accueil, pas de catalogue. Une seule question : tu veux
// faire quoi ? » (#quoi), la réponse et l'option avec chauffeur.
//
// Version « carrée » (24/10/2026) : sept écrans, une idée par écran, une grille et une
// échelle de texte communes. Le récit du week-end est parti sur la page des tentes, la
// grille des disponibilités sur la sienne, le bal sur la sienne.
export const metadata: Metadata = {
  title: "Pignon sur Pré — tentes et engins, site de démonstration",
  description:
    "Le site d'un loueur imaginaire de tentes de réception et d'engins de jardin : une seule question, « tu veux faire quoi ? », la tente posée sur ton pré vu du ciel, et les vraies disponibilités, réservables en ligne.",
  ...adressesDeLaPage("/exemples/pignon-sur-pre"),
};

const QUESTIONS_ACCUEIL = [0, 1, 2, 3, 6].map((i) => QUESTIONS[i]);

export default function PignonSurPre() {
  return (
    <main>
      {/* ---------- Premier écran : la tente éclairée, la nuit, plein cadre ---------- */}
      {/* Aucun voile : le titre se pose sur le ciel de nuit, au-dessus de la tente (mesuré sous chaque lettre). Sur
          téléphone, la tente occupe le bas de l'écran : les deux boutons y sont pleins, et la phrase d'accompagnement
          laisse sa place. */}
      <section className="relative isolate flex min-h-[calc(100svh-3rem)] flex-col overflow-hidden bg-[#0B1022] text-[var(--sur-sombre)] lg:min-h-[100svh]">
        <Image src={photos.tenteNuit.src} alt="" fill priority sizes="(max-width: 1023px) 160vh, 100vw" className="object-cover object-[50%_100%]" />
        <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col justify-between gap-10 px-6 pb-8 pt-32 lg:justify-start lg:pb-16 lg:pt-36">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end lg:gap-12">
            <div className="space-y-6">
              <Apparition><Surtitre clair>Pignon sur Pré · tentes et engins, livrés chez toi</Surtitre></Apparition>
              <TitreRevele
                as="h1"
                auChargement
                texte="Ta salle des fêtes, *chez toi.*"
                className="font-[family-name:var(--titres)] text-[10.5vw] font-normal leading-[1] tracking-[-0.025em] text-balance lg:text-[clamp(2.9rem,6.4vw,5.75rem)]"
                classeAccent={ACCENT_SOMBRE}
              />
            </div>
            <div className="hidden space-y-6 lg:block">
              <Apparition as="p" delai={450} className="text-lg leading-relaxed">
                La plus belle salle de la région, c&apos;est le pré où tu as grandi. On y pose la tente, et on prépare le terrain.
              </Apparition>
              <Apparition delai={650} className="flex flex-wrap gap-3">
                <Bouton href={`${DOSSIER}#pre`}>Poser une tente sur mon pré</Bouton>
                <Bouton href={`${DOSSIER}#quoi`} variante="contour">Tu veux faire quoi&nbsp;?</Bouton>
              </Apparition>
            </div>
          </div>
          <Apparition delai={650} className="flex flex-col gap-3 lg:hidden">
            <Bouton href={`${DOSSIER}#pre`} className="justify-center">Poser une tente sur mon pré</Bouton>
            <Bouton href={`${DOSSIER}#quoi`} variante="nuit" className="justify-center">Tu veux faire quoi&nbsp;?</Bouton>
          </Apparition>
        </div>
      </section>

      {/* ---------- 01. Tu veux faire quoi ? ---------- */}
      <section id="quoi" className="scroll-mt-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 py-28 md:py-40 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-16">
          <div className="lg:sticky lg:top-28">
            <Intitule
              numero="01"
              surtitre="Pas de catalogue"
              titre="Tu veux faire *quoi ?*"
              texte="Une seule question. Tu choisis, et le site te dit quelle tente ou quelle machine, combien de jours, et combien ça coûte, livrée. Avec chauffeur si tu préfères regarder."
            />
          </div>
          <Apparition delai={150}><QuoiFaire /></Apparition>
        </div>
      </section>

      {/* ---------- 02. Ton pré, vu du ciel ---------- */}
      <section id="pre" className="scroll-mt-20 bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 py-28 md:py-40 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
          <div className="lg:sticky lg:top-28">
            <Intitule
              numero="02"
              surtitre="Ton pré, vu du ciel"
              titre="Tape ton adresse. *On pose la tente.*"
              texte="À l'échelle, avec les tables. Tu vois tout de suite si elle rentre, et où. Ça rentre ? Tu réserves. Et tu préviens les voisins."
              clair
            />
          </div>
          <Apparition delai={150} className="rounded-2xl bg-[var(--fond)] p-4 text-[var(--encre)] sm:p-6">
            <VueDuCiel />
          </Apparition>
        </div>
      </section>

      {/* ---------- Une phrase, une photo : le pré ---------- */}
      {/* Le pré au couchant, sans tente ni toile : c'est lui qu'on vend. La phrase se pose en bas à gauche, sur
          l'herbe la plus sombre ; la photo n'est pas voilée. */}
      <section id="pre-natal" className="relative isolate flex min-h-[92svh] overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <Image src={photos.pre.src} alt={photos.pre.alt} fill sizes="(max-width: 1023px) 130vh, 100vw" className="object-cover object-[0%_100%]" />
        <div className="relative mx-auto flex w-full max-w-6xl items-end px-6 pb-12 pt-40 md:pb-16">
          <div className="max-w-[30rem] space-y-5">
            <Apparition><Surtitre clair>Le pré où tu as grandi</Surtitre></Apparition>
            <Titre texte={"On ne vend pas de la toile. On\u00a0vend *ton pré.*"} clair />
          </div>
        </div>
      </section>

      {/* ---------- 03. Ce qu'on loue ---------- */}
      <section id="materiel" className="scroll-mt-24 bg-[var(--carte)]">
        <div className="mx-auto max-w-6xl space-y-14 px-6 py-28 md:py-40">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_minmax(0,26rem)] lg:items-end">
            <div className="space-y-6">
              <Apparition><Surtitre>03 — Ce qu&apos;on loue</Surtitre></Apparition>
              <Titre texte="Trois tentes, *six engins.*" />
            </div>
            <Apparition as="p" delai={150} className="text-lg leading-relaxed text-[var(--doux)]">
              Pas trois cents machines&nbsp;: celles qu&apos;il faut pour un samedi chez soi. Capacités du fabricant, prix TTC
              livrés, en exemple.
            </Apparition>
          </div>
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-4">
              <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-[var(--doux)]">Les tentes · le week-end</p>
              <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
                {TENTES.map((t) => (
                  <li key={t.id}>
                    <Link href={`${DOSSIER}/tentes`} className="group grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 py-5">
                      <span className="font-[family-name:var(--titres)] text-2xl tracking-[-0.01em]">{t.largeur} × {t.longueur} m</span>
                      <span className="text-[15px] tabular-nums">{euros(t.prix)} TTC</span>
                      <span className="text-[15px] text-[var(--doux)]">{t.invites} invités assis · capacité du fabricant</span>
                      <span className="text-[13px] text-[var(--doux)]">exemple</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-[var(--doux)]">Les engins · la journée, livrés</p>
              <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
                {MACHINES.map((m) => (
                  <li key={m.id}>
                    <Link href={`${DOSSIER}/engins#${m.id}`} className="flex items-baseline justify-between gap-6 py-[1.05rem]">
                      <span className="text-[17px]">{m.court}</span>
                      <span className="text-[15px] tabular-nums text-[var(--doux)]">{euros(m.jour)} TTC · exemple</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Bouton href={`${DOSSIER}/disponibilites`} variante="contour">Les vraies disponibilités</Bouton>
            <Bouton href={`${DOSSIER}/le-bal`} variante="contour">Le bal du lancement</Bouton>
          </div>
        </div>
      </section>

      {/* ---------- 04. Questions ---------- */}
      <section id="questions" className="scroll-mt-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-14 px-6 py-28 md:py-40 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-6">
            <Apparition><Surtitre>04 — Questions</Surtitre></Apparition>
            <Titre texte="Avant de *réserver.*" />
            <Apparition className="relative mt-6 hidden aspect-[4/5] overflow-hidden rounded-2xl lg:block">
              <Image src={photos.tenteJardin.src} alt={photos.tenteJardin.alt} fill sizes="30vw" className="object-cover" />
            </Apparition>
          </div>
          <Apparition delai={150}>
            <Accordeon questions={QUESTIONS_ACCUEIL.map((q) => ({ question: q.q, reponse: q.r }))} />
          </Apparition>
        </div>
      </section>

      <AppelFinal />
    </main>
  );
}
