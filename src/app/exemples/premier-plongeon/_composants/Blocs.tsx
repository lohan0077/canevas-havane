import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { DOSSIER, ANNEE, gammes, lundi, premiereSemaineLibre, type Chantier, type Gamme, type Photo } from "./donnees";
import { Intitule, PhotoPlaque, Plaque, styles as s } from "./Habillage";
import BandeauDemonstration from "../../_composants/BandeauDemonstration";
import EnTete from "./EnTete";

/** Le haut de chaque page intérieure : bandeau de démonstration, puis navigation. */
export function HautDePage() {
  return (
    <>
      <BandeauDemonstration entreprise="Premier Plongeon" />
      <EnTete />
    </>
  );
}

/** L'en-tête d'une page intérieure : son titre, sa phrase, et une photo. */
export function TetePage({
  libelle,
  titre,
  children,
  photo,
  actions,
}: {
  libelle: string;
  titre: ReactNode;
  children?: ReactNode;
  photo?: Photo;
  actions?: ReactNode;
}) {
  return (
    <section className="max-w-6xl mx-auto px-5 sm:px-6 pt-14 sm:pt-20 pb-16 sm:pb-20 grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-center">
      <div className="space-y-9">
        <Intitule niveau={1} libelle={libelle} titre={titre}>
          {children}
        </Intitule>
        {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
      </div>
      {photo && <PhotoPlaque photo={photo} ratio="5 / 4" sizes="(min-width: 1024px) 540px, 100vw" coupe={28} priority />}
    </section>
  );
}

/** Une section de page, bornée et aérée ; `sombre` la pose sur le fond un cran plus clair. */
export function Section({
  children,
  id,
  sombre = false,
  className = "",
}: {
  children: ReactNode;
  id?: string;
  sombre?: boolean;
  className?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-20 ${sombre ? "border-y border-[rgba(255,255,255,0.13)] bg-[#070b13]" : ""}`}>
      <div className={`max-w-6xl mx-auto px-5 sm:px-6 py-20 sm:py-28 ${className}`}>{children}</div>
    </section>
  );
}

/** La carte d'une gamme : photo, nom, dimensions, prix « à partir de ». */
export function CarteGamme({ gamme, titre = "h3" }: { gamme: Gamme; titre?: "h2" | "h3" }) {
  const Titre = titre;
  return (
    <Link href={`${DOSSIER}/piscines#${gamme.id}`} className={`${s.carte} group block focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-4`}>
      <PhotoPlaque photo={gamme.photo} ratio="4 / 5" sizes="(min-width: 1024px) 270px, (min-width: 640px) 45vw, 100vw" coupe={22} />
      <div className="pt-5 space-y-2">
        <p className={`${s.technique} text-xs text-[#e8d1cb]`}>Coque {gamme.coque}{" "}m</p>
        <Titre className={`${s.titre} text-2xl`}>{gamme.nom}</Titre>
        <p className="text-[#b9c0cc]">Jardin de {gamme.jardin}</p>
        <p className={`${s.technique} pt-1 text-sm text-white group-hover:text-[#e8d1cb] transition-colors`}>
          À partir de {gamme.apartir} <span aria-hidden="true">→</span>
        </p>
      </div>
    </Link>
  );
}

/** La carte d'un chantier : photo, numéro, lieu, durée. */
export function CarteChantier({ chantier, titre = "h3" }: { chantier: Chantier; titre?: "h2" | "h3" }) {
  const Titre = titre;
  return (
    <Link href={`${DOSSIER}/chantiers/${chantier.slug}`} className={`${s.carte} group block focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-4`}>
      <PhotoPlaque photo={chantier.photo} ratio="3 / 2" sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 100vw" coupe={22} />
      <div className="pt-5 space-y-2">
        <p className="flex items-center justify-between gap-4">
          <span className={`${s.technique} text-xs text-[#e8d1cb]`}>Chantier n° {chantier.numero}</span>
          <span className={`${s.technique} text-[11px] text-[#8f98a8]`}>{chantier.duree}</span>
        </p>
        <Titre className={`${s.titre} text-2xl`}>{chantier.titre}</Titre>
        <p className="text-[#b9c0cc]">{chantier.lieu}</p>
        <p className={`${s.technique} pt-1 text-sm text-white group-hover:text-[#e8d1cb] transition-colors`}>
          Le chantier jour par jour <span aria-hidden="true">→</span>
        </p>
      </div>
    </Link>
  );
}

/** La grille des quatre gammes. */
export function GrilleGammes({ titre = "h3" }: { titre?: "h2" | "h3" }) {
  return (
    <ul className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
      {gammes.map((g) => (
        <li key={g.id}>
          <CarteGamme gamme={g} titre={titre} />
        </li>
      ))}
    </ul>
  );
}

/** Le bandeau qui clôt chaque page : la prochaine semaine libre, et les deux actions. */
export function AppelFinal() {
  const date = lundi(ANNEE, premiereSemaineLibre).toLocaleDateString("fr-FR", { day: "numeric", month: "long", timeZone: "UTC" });
  return (
    <section className="max-w-6xl mx-auto px-5 sm:px-6 pb-24">
      <Plaque coupe={28}>
        <div className="relative grid lg:grid-cols-[1fr_auto] gap-8 items-center p-8 sm:p-12 overflow-hidden">
          <Image src="/exemples/premier-plongeon/photos/reflets.webp" alt="" fill sizes="100vw" className="object-cover opacity-[0.12]" />
          <div className="relative space-y-4">
            <p className={s.libelle}>
              <span className={s.carre} aria-hidden="true" />
              Saison {ANNEE}
            </p>
            <p className={`${s.titre} text-3xl sm:text-4xl`}>
              Prochaine semaine libre&nbsp;: <span className="text-[#e8d1cb]">semaine {premiereSemaineLibre}</span>
            </p>
            <p className="text-lg text-[#b9c0cc]">À partir du {date}. Les semaines de printemps partent les premières.</p>
          </div>
          <div className="relative flex flex-wrap gap-3">
            <Link href={`${DOSSIER}/ma-date`} className={s.bouton}>Choisir ma semaine</Link>
            <Link href={`${DOSSIER}/prix`} className={s.boutonFantome}>Calculer mon prix</Link>
          </div>
        </div>
      </Plaque>
    </section>
  );
}
