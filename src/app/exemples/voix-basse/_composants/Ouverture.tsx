"use client";

import Link from "next/link";
import Apparition from "../../_kit/Apparition";
import PhotoCinema from "../../_kit/PhotoCinema";
import TitreRevele from "../../_kit/TitreRevele";
import { ChampNaissance } from "./Annee";
import Appeler from "./Appeler";
import { Ciel, Croissant, PastilleEtat } from "./Blocs";
import { useMoment } from "./Moment";
import { DOSSIER, cabinet, photos } from "./donnees";

/**
 * Le premier écran de l'accueil, partagé en deux. Le jour : « Ici, on parle bas », le
 * seul champ du site (sa date de naissance) et le chat qui dort au soleil. Le soir, le
 * cabinet fermé : qui appeler, où aller. La pastille d'état et son interrupteur restent
 * en haut, pour voir l'autre visage.
 */
export default function Ouverture() {
  const { moment } = useMoment();

  if (moment === "soir") {
    return (
      <section data-film="ouverture-soir" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden">
        <Ciel />
        <div className="relative mx-auto grid w-full max-w-7xl flex-1 items-center gap-12 px-5 pb-16 pt-28 sm:px-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8">
            <PastilleEtat />
            <TitreRevele
              as="h1"
              auChargement
              texte={"Une urgence ? *C'est par ici.*"}
              className="text-[clamp(3.6rem,9vw,8.6rem)] leading-[0.92] tracking-[-0.025em]"
              classeAccent="italic text-[var(--accent-texte)]"
            />
            <Apparition as="p" delai={300} className="max-w-xl text-xl leading-relaxed text-[var(--doux)]">
              Le cabinet est fermé. Ce soir, la garde est assurée par le{" "}
              {cabinet.garde.nom.toLowerCase()} : un numéro, une adresse, et vous y êtes.
            </Apparition>
          </div>
          <Apparition de="zoom" delai={250} className="rounded-[2rem] border border-[var(--trait)] bg-[var(--carte)] p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <Croissant className="h-6 w-6 text-[var(--accent-texte)]" />
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--accent-texte)]">Vétérinaire de garde ce soir</p>
            </div>
            <p className="mt-4 font-[family-name:var(--titres)] text-4xl">{cabinet.garde.nom}</p>
            <p className="mt-1 text-[var(--doux)]">à {cabinet.garde.distance} · ouvert toute la nuit · exemple</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Appeler numero={cabinet.garde.telephone} libelle="Appeler la garde" />
              <Link href={`${DOSSIER}/garde`} className="grid min-h-[56px] place-items-center rounded-full border-2 border-[var(--accent)] px-5 text-center font-bold">
                Qui appeler cette nuit
              </Link>
            </div>
          </Apparition>
        </div>
      </section>
    );
  }

  return (
    <section data-film="ouverture-jour" className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(40%_50%_at_20%_30%,color-mix(in_oklab,var(--accent)_35%,transparent),transparent_70%)]" />
      <div className="mx-auto grid min-h-[100svh] w-full max-w-[90rem] gap-8 px-4 pb-6 pt-28 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6 lg:pb-5 lg:pt-24">
        <div className="flex flex-col justify-center gap-8 px-1 lg:px-6">
          <Apparition><PastilleEtat /></Apparition>
          <TitreRevele
            as="h1"
            auChargement
            texte="Ici, on parle *bas.*"
            className="text-[clamp(4.2rem,10.5vw,10rem)] leading-[0.86] tracking-[-0.035em]"
            classeAccent="italic text-[var(--accent-texte)]"
          />
          <Apparition as="p" delai={350} className="max-w-xl text-xl leading-relaxed text-[var(--doux)]">
            {cabinet.accroche}. Pas des soins d&apos;abord : du calme. Une salle à part pour les
            chats, un créneau avant l&apos;ouverture, et toute sa première année, posée dès la
            naissance.
          </Apparition>
          <Apparition delai={500} de="zoom" className="max-w-xl rounded-[2rem] border border-[var(--trait)] bg-[var(--carte)] p-6 shadow-[0_40px_80px_-50px_rgba(47,74,62,0.6)] sm:p-8">
            <ChampNaissance titreNiveau={2} />
          </Apparition>
        </div>
        <Apparition de="rideau" delai={150} className="relative min-h-[420px] overflow-hidden rounded-[2.5rem] lg:min-h-0">
          <PhotoCinema src={photos.soleil.src} alt={photos.soleil.alt} priority origine="45% 60%" sizes="(min-width: 1024px) 48vw, 100vw" />
          <div className="absolute inset-x-4 bottom-4 flex flex-wrap gap-2 sm:inset-x-6 sm:bottom-6">
            <Link href={`${DOSSIER}/rendez-vous`} className="rounded-full bg-[var(--carte)] px-4 py-2.5 text-[15px] font-semibold text-[var(--encre)] shadow-lg">
              Créneau calme · 8 h, avant l&apos;ouverture →
            </Link>
            <Link href={`${DOSSIER}/pour-rien`} className="rounded-full bg-[var(--accent)] px-4 py-2.5 text-[15px] font-semibold text-[var(--sur-accent)] shadow-lg">
              Viens pour rien →
            </Link>
          </div>
        </Apparition>
      </div>
    </section>
  );
}

/**
 * Le soir, le premier écran cède la place à la garde : le champ de la date de naissance
 * descend alors au-dessus de son calendrier, pour rester sur l'accueil.
 */
export function ChampSiSoir() {
  const { moment } = useMoment();
  if (moment !== "soir") return null;
  return (
    <div className="rounded-[2rem] border border-[var(--trait)] bg-[var(--carte)] p-6 sm:p-8">
      <ChampNaissance titreNiveau={2} />
    </div>
  );
}
