import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import Accordeon from "../_kit/Accordeon";
import Apparition from "../_kit/Apparition";
import CarteLueur from "../_kit/CarteLueur";
import Defilant from "../_kit/Defilant";
import FondVivant from "../_kit/FondVivant";
import PhotoCinema from "../_kit/PhotoCinema";
import RecitColle from "../_kit/RecitColle";
import TitreRevele from "../_kit/TitreRevele";
import { ACCENT_CLAIR, ACCENT_SOMBRE, AppelFinal, Appli, Bouton, Surtitre } from "./_composants/Blocs";
import Dimanche from "./_composants/Dimanche";
import Historique from "./_composants/Historique";
import Logo from "./_composants/Logo";
import MonAlarme from "./_composants/MonAlarme";
import PlanMaison from "./_composants/PlanMaison";
import { DEFILE, DELAI, DOSSIER, ENGAGEMENTS, ETAPES, FAQ, maison, photos } from "./_composants/donnees";

// L'accueil de Rien à Signaler. Il réunit les deux vidéos du métier : « Créer une
// marque » (le nom, la première question « t'as un chat ? », le message du dimanche) et
// « Remplir l'agenda » (la première nuit où l'on dort en août, le plan de la maison et sa
// fourchette pose comprise, le vrai délai de pose tout en haut). Premier écran :
// typographie seule sur la nuit qui bouge, et la notification qu'on aime recevoir.
export const metadata: Metadata = {
  title: "Rien à Signaler — alarmes et climatisation, site de démonstration",
  description:
    "Le site d'un installateur d'alarmes et de climatisation imaginaire qui ne vend pas la peur : la première question est « T'as un chat ? », le plan de ta maison donne la fourchette pose comprise, le vrai délai de pose est en haut du site, et chaque dimanche, un seul message.",
  ...adressesDeLaPage("/exemples/rien-a-signaler"),
};

const PHOTOS_ETAPES = [photos.chatSoleil, photos.cle, photos.toits, photos.cafe, photos.chambre];

export default function RienASignaler() {
  return (
    <main>
      {/* ---------- Premier écran : la nuit, et la notification du dimanche ---------- */}
      <section className="kit-grain relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <FondVivant couleurs={["#0B1328", "#1E3A5F", "#3F6E5A"]} vitesse={0.8} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(16,26,49,0.25)_0%,rgba(16,26,49,0.7)_70%)]" />
        <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center gap-9 px-5 pb-14 pt-32 text-center sm:px-8">
          <Apparition><Surtitre clair>Alarmes et clim · {maison.ville}</Surtitre></Apparition>
          <TitreRevele
            as="h1"
            auChargement
            texte="Rien à *signaler.*"
            className="font-[family-name:var(--titres)] text-[clamp(4rem,13vw,12rem)] font-semibold leading-[0.86] tracking-[-0.065em]"
            classeAccent={ACCENT_SOMBRE}
          />
          <Apparition de="zoom" delai={550} className="w-full max-w-md">
            <div className="rounded-[1.6rem] border border-white/15 bg-[color-mix(in_oklab,var(--sombre)_86%,transparent)] p-4 text-left shadow-[0_30px_70px_-30px_rgba(0,0,0,0.8)] backdrop-blur-xl">
              <p className="flex items-center gap-2.5 text-[13px]">
                <Logo taille={22} />
                <span className="font-semibold">Rien à Signaler</span>
                <span className="ml-auto text-[var(--sur-sombre)]/90">dimanche, 9:00</span>
              </p>
              <p className="mt-2 font-[family-name:var(--titres)] text-xl font-semibold tracking-[-0.02em]">Cette semaine : rien à signaler.</p>
              <p className="text-[15px] text-[var(--sur-sombre)]/90">0 alerte · 0 fausse alerte. Bon dimanche.</p>
            </div>
          </Apparition>
          <TitreRevele
            as="p"
            auChargement
            delai={800}
            texte="Une alarme qui ne vend pas la peur. Une clim qui vend la première nuit où tu dors, *en plein mois d'août.*"
            className="max-w-3xl font-[family-name:var(--titres)] text-[clamp(1.25rem,2.2vw,1.75rem)] leading-[1.3] tracking-[-0.02em]"
            classeAccent={ACCENT_SOMBRE}
          />
          <Apparition delai={1100} className="flex flex-wrap justify-center gap-3">
            <Bouton href="#premiere-question">Composer mon alarme</Bouton>
            <Bouton href="#ma-maison" variante="contour">Ma clim, pièce par pièce</Bouton>
          </Apparition>
        </div>
        <Apparition as="ul" delai={1300} className="relative mx-auto grid w-full max-w-6xl grid-cols-1 gap-px border-t border-white/15 px-5 font-[family-name:var(--titres)] text-[15px] sm:grid-cols-3 sm:px-8">
          {[
            ["Sans télésurveillance", "et le site le dit"],
            [`Délai de pose : ${DELAI.valeur}`, "le vrai, chaque lundi"],
            ["Pas de démarchage", "tu viens par le site"],
          ].map(([fort, doux]) => (
            <li key={fort} className="flex items-baseline justify-between gap-3 py-4 sm:block sm:py-5">
              <span className="block font-semibold">{fort}</span>
              <span className="block text-[14px] text-[var(--sur-sombre)]/90">{doux}</span>
            </li>
          ))}
        </Apparition>
      </section>

      {/* ---------- Le bandeau qui défile ---------- */}
      <div className="bg-[var(--accent)] py-5 text-[var(--sur-accent)]">
        <Defilant
          duree={42}
          separateur="✓"
          elements={DEFILE}
          classeElement="font-[family-name:var(--titres)] text-xl font-semibold tracking-[-0.02em] whitespace-nowrap md:text-2xl"
        />
      </div>

      {/* ---------- Pas la peur ---------- */}
      <section className="mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-8 md:py-36 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="space-y-8">
          <Apparition><Surtitre>Ce qu&apos;on vend</Surtitre></Apparition>
          <Apparition as="p" className="font-[family-name:var(--titres)] text-[clamp(2.6rem,5.6vw,5rem)] font-semibold leading-[1] tracking-[-0.05em]">
            Pas <span className="kit-barre">la peur.</span>{" "}
            <span className={ACCENT_CLAIR}>Le moment où tu fermes la porte, et où tu n&apos;y penses plus.</span>
          </Apparition>
          <Apparition as="p" delai={200} className="max-w-xl text-xl leading-relaxed text-[var(--doux)]">
            Pas d&apos;ombre derrière la fenêtre, pas de sirène en pleine nuit, aucun chiffre de cambriolage.
            Et pour la clim, pas un appareil : la première nuit où tu dors, en plein mois d&apos;août.
          </Apparition>
        </div>
        <div className="relative">
          <Apparition de="zoom" className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-[var(--sombre)]">
            <Image src={photos.cle.src} alt={photos.cle.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </Apparition>
          <Apparition de="droite" delai={250} className="absolute -bottom-8 -left-2 w-[58%] sm:-left-10">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border-[6px] border-[var(--fond)] bg-[var(--sombre)]">
              <Image src={photos.chatSoleil.src} alt={photos.chatSoleil.alt} fill sizes="(min-width: 1024px) 24vw, 58vw" className="object-cover" />
            </div>
          </Apparition>
        </div>
      </section>

      {/* ---------- Outil n° 1 : la première question ---------- */}
      <section id="premiere-question" className="scroll-mt-24 px-3 sm:px-5">
        <div className="kit-grain relative overflow-hidden rounded-[2rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
          <div className="mx-auto grid max-w-6xl gap-12 px-3 py-20 sm:px-10 md:py-28 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="space-y-6 px-2 sm:px-0">
              <Apparition><Surtitre clair>Ton alarme</Surtitre></Apparition>
              <TitreRevele
                texte="La première question, c'est pas *maison ou appartement.*"
                className="font-[family-name:var(--titres)] text-[clamp(2.4rem,5vw,4.4rem)] font-semibold leading-[1] tracking-[-0.05em]"
                classeAccent={`${ACCENT_SOMBRE} kit-barre`}
              />
              <Apparition as="p" delai={150} className="max-w-md text-lg leading-relaxed text-[var(--sur-sombre)]/90">
                C&apos;est : t&apos;as un chat ? Leur cauchemar, c&apos;est la sirène à trois heures du matin, à cause
                du chat. Alors on commence par lui.
              </Apparition>
            </div>
            <Apparition de="zoom" delai={150}>
              <Appli titre="Mon alarme" etat="Question 1 sur 3">
                <MonAlarme />
              </Appli>
            </Apparition>
          </div>
        </div>
      </section>

      {/* ---------- Outil n° 2 : la maison, pièce par pièce ---------- */}
      <section id="ma-maison" className="scroll-mt-24 mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-36">
        <div className="mb-12 grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div className="space-y-6">
            <Apparition><Surtitre>Ta clim</Surtitre></Apparition>
            <TitreRevele
              texte="Pas une clim. *La première nuit où tu dors.*"
              className="font-[family-name:var(--titres)] text-[clamp(2.8rem,6.4vw,6rem)] font-semibold leading-[0.95] tracking-[-0.055em]"
              classeAccent={ACCENT_CLAIR}
            />
          </div>
          <Apparition as="p" delai={150} className="text-xl leading-relaxed text-[var(--doux)]">
            Le plan de ta maison : touche la chambre, puis le salon. Le site compte les unités et te donne la
            fourchette, TTC, pose comprise. C&apos;est exactement ce que tu tapes sur Google.
          </Apparition>
        </div>
        <Apparition de="zoom">
          <Appli titre="Ma maison" etat="Plan · exemple">
            <PlanMaison />
          </Appli>
        </Apparition>
      </section>

      {/* ---------- Le bento : délai, engagements, attestation ---------- */}
      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 md:pb-36">
        <div className="grid gap-4 md:grid-cols-6">
          <Apparition de="zoom" className="rounded-[2rem] bg-[var(--sombre)] p-7 text-[var(--sur-sombre)] sm:p-10 md:col-span-4 md:row-span-2">
            <div className="grid h-full gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <div className="space-y-6">
                <p className="font-[family-name:var(--titres)] text-sm uppercase tracking-[0.18em]">Le vrai délai de pose</p>
                <p className="font-[family-name:var(--titres)] text-[clamp(4rem,9vw,7.5rem)] font-semibold leading-[0.85] tracking-[-0.06em] tabular-nums">{DELAI.valeur}</p>
                <p className="max-w-sm text-lg leading-relaxed text-[var(--sur-sombre)]/90">
                  Tout en haut du site, mis à jour chaque lundi. En avril, neuf jours ; en juin, cinq semaines.
                  On le voit grimper, et on signe au printemps.
                </p>
                <Link href={`${DOSSIER}/ma-date`} className="inline-block font-[family-name:var(--titres)] font-semibold text-[#A9D3AE] underline-offset-4 hover:underline">Réserver ma date de pose →</Link>
              </div>
              <Historique sombre />
            </div>
          </Apparition>
          {ENGAGEMENTS.slice(0, 2).map((e, i) => (
            <Apparition key={e.titre} de="zoom" delai={120 + i * 120} className="md:col-span-2">
              <CarteLueur className="h-full rounded-[2rem] border border-[var(--trait)] bg-[var(--carte)] p-7">
                <p className="font-[family-name:var(--titres)] text-2xl font-semibold leading-tight tracking-[-0.03em]">{e.titre}</p>
                <p className="mt-3 text-[17px] leading-relaxed text-[var(--doux)]">{e.texte}</p>
              </CarteLueur>
            </Apparition>
          ))}
          <Apparition de="zoom" delai={120} className="relative min-h-[300px] overflow-hidden rounded-[2rem] bg-[var(--sombre)] text-[var(--sur-sombre)] md:col-span-3">
            <Image src={photos.oreiller.src} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover opacity-55" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,26,49,0.1)_20%,rgba(16,26,49,0.94)_100%)]" />
            <div className="absolute bottom-6 left-7 right-7 space-y-1">
              <p className="font-[family-name:var(--titres)] text-sm uppercase tracking-[0.18em]">Nuit du 12 août, 3 h 00</p>
              <p className="font-[family-name:var(--f-instrument)] text-5xl italic">Tu dors.</p>
            </div>
          </Apparition>
          <Apparition id="attestation" de="zoom" delai={240} className="scroll-mt-24 flex flex-col justify-between gap-6 rounded-[2rem] bg-[var(--accent)] p-7 text-[var(--sur-accent)] md:col-span-3">
            <p className="font-[family-name:var(--titres)] text-sm font-semibold uppercase tracking-[0.18em]">Attestation de capacité · fluides frigorigènes</p>
            <p className="font-[family-name:var(--titres)] text-4xl font-semibold tracking-[-0.04em] tabular-nums">N° {maison.attestation}</p>
            <p className="text-[16px] leading-relaxed">
              Délivrée par un organisme agréé, valable jusqu&apos;au {maison.validite}. Poser et mettre en service une clim split
              demande un opérateur qui la détient (C. env., art. R543-78 et R543-99). Numéro, organisme et date d&apos;exemple.
            </p>
          </Apparition>
        </div>
      </section>

      {/* ---------- Le récit, de la question à la première nuit ---------- */}
      <section className="border-y border-[var(--trait)] bg-[var(--carte)] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-10 space-y-6 md:mb-4">
            <Apparition><Surtitre>Comment ça se passe</Surtitre></Apparition>
            <TitreRevele
              texte="De la première question *à la première nuit.*"
              className="max-w-4xl font-[family-name:var(--titres)] text-[clamp(2.6rem,5.5vw,5rem)] font-semibold leading-[0.98] tracking-[-0.05em]"
              classeAccent={ACCENT_CLAIR}
            />
          </div>
          <RecitColle
            etapes={ETAPES.map((e, i) => ({
              surtitre: e.moment,
              titre: e.titre,
              texte: <p>{e.texte}</p>,
              visuel: <Image src={PHOTOS_ETAPES[i].src} alt={PHOTOS_ETAPES[i].alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />,
            }))}
          />
        </div>
      </section>

      {/* ---------- Le message du dimanche ---------- */}
      <section className="relative isolate overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <PhotoCinema src={photos.cafe.src} alt="" origine="50% 40%" className="opacity-30" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,26,49,0.96)_0%,rgba(16,26,49,0.85)_55%,rgba(16,26,49,0.7)_100%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-7">
            <Apparition><Surtitre clair>Chaque dimanche, 9 h</Surtitre></Apparition>
            <TitreRevele
              texte="Un seul message. *Rien à signaler.*"
              className="font-[family-name:var(--titres)] text-[clamp(2.8rem,6.5vw,6rem)] font-semibold leading-[0.95] tracking-[-0.055em]"
              classeAccent={ACCENT_SOMBRE}
            />
            <Apparition as="p" delai={150} className="max-w-xl text-xl leading-relaxed text-[var(--sur-sombre)]/90">
              Pas une notification à chaque porte ouverte. Le dimanche matin, le résumé de ta semaine : un
              rapport automatique de ton alarme. Personne ne l&apos;écrit, personne ne regarde chez toi.
            </Apparition>
            <Apparition delai={250}><Bouton href={`${DOSSIER}/le-dimanche`} variante="clair">Ce que dit le message</Bouton></Apparition>
          </div>
          <Apparition de="droite" delai={150} className="rounded-[2rem] bg-[var(--fond)] p-5 text-[var(--encre)] sm:p-8">
            <Dimanche />
          </Apparition>
        </div>
      </section>

      {/* ---------- Questions ---------- */}
      <section id="questions" className="scroll-mt-24 mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 md:py-36 lg:grid-cols-[0.7fr_1.3fr]">
        <div className="space-y-6">
          <Apparition><Surtitre>Vos questions</Surtitre></Apparition>
          <TitreRevele
            texte="Ce qu'on nous demande, *calmement.*"
            className="font-[family-name:var(--titres)] text-[clamp(2.4rem,4.6vw,4.2rem)] font-semibold leading-[1] tracking-[-0.05em]"
            classeAccent={ACCENT_CLAIR}
          />
        </div>
        <Apparition delai={150}>
          <Accordeon questions={FAQ.map((q) => ({ question: q.q, reponse: q.r }))} />
        </Apparition>
      </section>

      <AppelFinal />
    </main>
  );
}
