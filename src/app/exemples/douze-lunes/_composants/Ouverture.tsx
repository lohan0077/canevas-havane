"use client";

import Image from "next/image";
import Link from "next/link";
import { ChampNaissance } from "./Annee";
import { DOSSIER, cabinet, photos } from "./donnees";
import { useMoment } from "./Moment";
import Appeler from "./Appeler";
import { Croissant } from "./EnTete";

/** Des étoiles fixes (pas de hasard : le rendu serveur et le navigateur doivent s'accorder). */
// Elles restent sur le bord haut et le bord droit, loin du texte.
const ETOILES = [
  [6, 2.5, 1.5], [18, 1.2, 1], [31, 3, 1.5], [47, 1.6, 1], [62, 2.8, 1.5], [78, 1.4, 1], [90, 3.2, 1.5],
  [96, 9, 1], [93, 16, 1.5], [97, 24, 1], [94, 33, 1.5], [97, 44, 1],
];

export function Ciel({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {ETOILES.map(([x, y, r]) => (
        <span key={`${x}-${y}`} className="absolute rounded-full bg-[#F3EBDB] opacity-60" style={{ left: `${x}%`, top: `${y}%`, width: r * 2, height: r * 2 }} />
      ))}
    </div>
  );
}

/** L'état du cabinet, à l'heure du visiteur. */
export function EtatDuCabinet() {
  const { ouvert, rouvre, apercu, moment } = useMoment();
  if (ouvert === null) return <span>Lun. – ven. 8&nbsp;h&nbsp;30 – 19&nbsp;h · sam. 9&nbsp;h – 12&nbsp;h&nbsp;30</span>;
  if (apercu && moment === "soir") return <span>Aperçu du site du soir · le cabinet est ouvert en ce moment</span>;
  if (apercu && moment === "jour") return <span>Aperçu du site de jour · le cabinet est fermé en ce moment</span>;
  return ouvert ? <span>Ouvert aujourd&apos;hui · on vous reçoit jusqu&apos;à 19&nbsp;h, 12&nbsp;h&nbsp;30 le samedi</span> : <span>Fermé · réouverture {rouvre}</span>;
}

export default function Ouverture() {
  const { moment } = useMoment();

  if (moment === "soir") {
    return (
      <section data-film="ouverture-soir" className="relative overflow-hidden">
        <Ciel />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-5 pb-16 pt-10 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:pt-20">
          <div className="space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full border border-[var(--trait)] bg-[var(--carte)] px-4 py-2 text-sm font-bold">
              <Croissant className="h-4 w-4 text-[var(--accent-texte)]" />
              <EtatDuCabinet />
            </p>
            <h1 className="text-[46px] sm:text-7xl">
              Une urgence&nbsp;? <span className="block text-[var(--accent-texte)]">C&apos;est par ici.</span>
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-[var(--doux)]">
              Le cabinet est fermé. Ce soir, la garde est assurée par le {cabinet.garde.nom.toLowerCase()} : un numéro,
              une adresse, et vous y êtes.
            </p>
          </div>
          <div className="rounded-[28px] border border-[var(--trait)] bg-[var(--carte)] p-6 sm:p-8 space-y-5">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--accent-texte)]">Vétérinaire de garde ce soir</p>
            <div className="space-y-1">
              <p className="font-[family-name:var(--titres)] text-3xl">{cabinet.garde.nom}</p>
              <p className="text-[var(--doux)]">à {cabinet.garde.distance} · ouvert toute la nuit · exemple</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Appeler numero={cabinet.garde.telephone} libelle="Appeler la garde" />
              <Link href={`${DOSSIER}/garde`} className="grid min-h-[56px] place-items-center rounded-full border-2 border-[var(--accent)] px-5 text-center font-bold">
                Qui appeler cette nuit
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section data-film="ouverture-jour" className="relative">
      <div className="mx-auto grid max-w-6xl gap-0 px-0 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-10 lg:pt-10">
        <div className="relative aspect-[4/3] overflow-hidden sm:rounded-[32px] lg:aspect-[5/6] lg:order-2">
          <Image
            src={photos.chaton.src}
            alt={photos.chaton.alt}
            fill
            priority
            sizes="(min-width: 1024px) 480px, 100vw"
            className="object-cover object-[50%_40%]"
          />
        </div>
        <div className="relative z-10 -mt-14 mx-4 rounded-[28px] border border-[var(--trait)] bg-[var(--carte)] p-6 shadow-[0_30px_60px_-40px_rgba(27,35,64,0.55)] sm:mx-0 sm:p-9 lg:order-1 lg:mt-0">
          <ChampNaissance />
          <p className="mt-5 flex items-center gap-2 text-sm text-[var(--doux)]">
            <span className="h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]" aria-hidden="true" />
            <EtatDuCabinet />
          </p>
        </div>
      </div>
    </section>
  );
}
