import Image from "next/image";
import Link from "next/link";
import { DOSSIER, agence, euros, pourcent, prixHonorairesInclus, type Annonce, type Classe } from "./donnees";

/** Un titre de section : un filet ambré, un surtitre en petites capitales, le titre en serif. */
export function Intitule({ surtitre, titre, children, clair = false, niveau = 2 }: { surtitre: string; titre: React.ReactNode; children?: React.ReactNode; clair?: boolean; niveau?: 1 | 2 }) {
  const Titre = niveau === 1 ? "h1" : "h2";
  return (
    <div className="max-w-2xl space-y-5">
      <p className={`flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.22em] ${clair ? "text-[var(--sur-sombre)]" : "text-[var(--accent-texte)]"}`}>
        <span aria-hidden="true" className="h-px w-10 bg-[var(--accent)]" />
        {surtitre}
      </p>
      <Titre className="text-[44px] leading-[1] tracking-[-0.01em] sm:text-[64px]">{titre}</Titre>
      {children && <div className={`text-[17px] leading-relaxed ${clair ? "text-[var(--sur-sombre)]" : "text-[var(--doux)]"}`}>{children}</div>}
    </div>
  );
}

export function Section({ id, className = "", sombre = false, children, label }: { id?: string; className?: string; sombre?: boolean; children: React.ReactNode; label?: string }) {
  return (
    <section id={id} aria-label={label} className={`scroll-mt-24 ${sombre ? "bg-[var(--sombre)] text-[var(--sur-sombre)]" : ""}`}>
      <div className={`mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28 ${className}`}>{children}</div>
    </section>
  );
}

/* ---------- Étiquettes énergie et climat (CCH L126-33) ---------- */

const LETTRES: Classe[] = ["A", "B", "C", "D", "E", "F", "G"];
// Couleurs des échelles du DPE ; le texte posé dessus tient 4,5:1 (calculé).
const ENERGIE: Record<Classe, [string, string]> = {
  A: ["#009C6D", "#111111"], B: ["#52B153", "#111111"], C: ["#78BD76", "#111111"], D: ["#F4E70F", "#111111"],
  E: ["#F0B50F", "#111111"], F: ["#EB8235", "#111111"], G: ["#D7221F", "#FFFFFF"],
};
const CLIMAT: Record<Classe, [string, string]> = {
  A: ["#A3DBF8", "#111111"], B: ["#8DB5D4", "#111111"], C: ["#7893B2", "#111111"], D: ["#637290", "#FFFFFF"],
  E: ["#4F5370", "#FFFFFF"], F: ["#3B3651", "#FFFFFF"], G: ["#281B35", "#FFFFFF"],
};

/** Une échelle de A à G en couleur, la classe du logement mise en avant. */
export function Echelle({ genre, classe, compacte = false }: { genre: "energie" | "climat"; classe: Classe; compacte?: boolean }) {
  const couleurs = genre === "energie" ? ENERGIE : CLIMAT;
  return (
    <figure className="space-y-2">
      <figcaption className="text-[13px] font-semibold uppercase tracking-[0.14em]">
        {genre === "energie" ? "Classe énergie" : "Classe climat"} {classe}
      </figcaption>
      <ol className={compacte ? "flex gap-1" : "space-y-1"} aria-hidden="true">
        {LETTRES.map((l, i) => {
          const [fond, encre] = couleurs[l];
          const elle = l === classe;
          return compacte ? (
            <li key={l} className={`grid flex-1 place-items-center rounded-[4px] text-[13px] font-bold ${elle ? "h-9 ring-2 ring-[var(--encre)] ring-offset-2 ring-offset-[var(--carte)]" : "h-7 opacity-80"}`} style={{ background: fond, color: encre }}>
              {l}
            </li>
          ) : (
            <li key={l} className="flex items-center gap-2">
              <span className={`flex h-7 items-center rounded-r-[6px] pl-2 text-[13px] font-bold ${elle ? "ring-2 ring-[var(--encre)] ring-offset-1" : ""}`} style={{ background: fond, color: encre, width: `${34 + i * 9}%` }}>
                {l}
              </span>
              {elle && <span className="text-[13px] font-bold">◀ ce logement</span>}
            </li>
          );
        })}
      </ol>
    </figure>
  );
}

/** Le bloc de prix qu'exige l'arrêté du 10/01/2017 : honoraires inclus en plus gros, qui paie, le %. */
export function PrixAnnonce({ annonce, grand = false }: { annonce: Annonce; grand?: boolean }) {
  return (
    <div className="space-y-1.5">
      <p className="flex flex-wrap items-baseline gap-x-2">
        <span className={`font-[family-name:var(--titres)] leading-none tabular-nums ${grand ? "text-[52px] sm:text-[64px]" : "text-[36px]"}`}>{euros(prixHonorairesInclus(annonce))}</span>
        <span className="text-[14px] font-semibold">honoraires inclus</span>
      </p>
      <p className="text-[15px] tabular-nums">{euros(annonce.horsHonoraires)} hors honoraires</p>
      <p className="text-[15px] font-semibold">Honoraires : {pourcent(annonce.tauxHonoraires)} TTC à la charge de l&apos;acquéreur</p>
    </div>
  );
}

/** Les mentions énergie d'une annonce, dans les mots de la fiche Service-Public F16096. */
export function Depenses({ annonce }: { annonce: Annonce }) {
  return (
    <p className="text-[15px] leading-relaxed">
      Montant estimé des dépenses annuelles d&apos;énergie pour un usage standard : entre {euros(annonce.depenses[0])} et{" "}
      {euros(annonce.depenses[1])} par an. Année de référence des prix de l&apos;énergie : 2025.
    </p>
  );
}

export function CarteAnnonce({ annonce, priorite = false }: { annonce: Annonce; priorite?: boolean }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[22px] border border-[var(--trait)] bg-[var(--carte)]">
      <div className="relative aspect-[4/3]">
        <Image src={annonce.photo.src} alt={annonce.photo.alt} fill priority={priorite} sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw" className="object-cover" />
        <span className="absolute left-3 top-3 rounded-full bg-[var(--sombre)] px-3 py-1 text-[12px] font-semibold text-[var(--sur-sombre)]">Annonce : exemple</span>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="space-y-1">
          <h3 className="text-[28px]">{annonce.titre} · {annonce.surface} m²</h3>
          <p className="text-[15px] text-[var(--doux)]">{annonce.secteur}</p>
        </div>
        <PrixAnnonce annonce={annonce} />
        <Echelle genre="energie" classe={annonce.energie} compacte />
        <Echelle genre="climat" classe={annonce.climat} compacte />
        <p className="text-[14px] text-[var(--doux)]">Dépenses d&apos;énergie estimées : {euros(annonce.depenses[0])} à {euros(annonce.depenses[1])} par an (prix 2025).</p>
        <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-2 text-[15px] font-semibold">
          <Link href={`${DOSSIER}/annonces/${annonce.slug}`} className="underline decoration-[var(--accent)] decoration-2 underline-offset-[6px]">Voir l&apos;annonce</Link>
          <Link href={`${DOSSIER}#bareme`} className="underline decoration-[var(--trait)] decoration-2 underline-offset-[6px]">Notre barème d&apos;honoraires</Link>
        </div>
      </div>
    </article>
  );
}

/** Les mentions du décret n° 72-678 (art. 92 à 94), en clair. Toutes d'exemple. */
export function MentionsPro({ clair = false }: { clair?: boolean }) {
  return (
    <div className={`space-y-1.5 text-[14px] leading-relaxed ${clair ? "text-[var(--sur-sombre)]" : "text-[var(--doux)]"}`}>
      <p>
        {agence.nom}, agence immobilière · {agence.adresse} (exemple).
      </p>
      <p>
        Carte professionnelle « Transactions sur immeubles et fonds de commerce » n°&nbsp;{agence.carte.replace(/ /g, " ")}, délivrée par la {agence.cci} (exemple).
      </p>
      <p>Garant : {agence.garant} (exemple).</p>
      <p>
        Barème d&apos;honoraires :{" "}
        <Link href={`${DOSSIER}#bareme`} className="font-semibold underline underline-offset-4">sur l&apos;accueil de ce site</Link>, à l&apos;entrée de l&apos;agence et en vitrine.
      </p>
    </div>
  );
}

/** Le haut sombre des pages intérieures : la barre de navigation passe dessus. */
export function HautDePage({ surtitre, titre, children }: { surtitre: string; titre: React.ReactNode; children?: React.ReactNode }) {
  return (
    <header className="-mt-[72px] bg-[var(--sombre)] bg-[radial-gradient(120%_80%_at_80%_0%,#3A3F6E_0%,transparent_60%)] pt-[72px] text-[var(--sur-sombre)]">
      <div className="mx-auto max-w-6xl space-y-5 px-5 pb-14 pt-12 sm:px-8 sm:pb-20 sm:pt-16">
        <p className="flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.22em]">
          <span aria-hidden="true" className="h-px w-10 bg-[var(--accent)]" />
          {surtitre}
        </p>
        <h1 className="text-[52px] leading-[0.98] tracking-[-0.01em] sm:text-[80px]">{titre}</h1>
        {children && <div className="max-w-xl text-[17px] leading-relaxed">{children}</div>}
      </div>
    </header>
  );
}

export function PiedDeSite() {
  return (
    <div className="border-t border-[var(--trait)] bg-[var(--fond)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1fr_1.4fr]">
        <div className="space-y-3">
          <p className="font-[family-name:var(--titres)] text-[34px] leading-none">{agence.nom}</p>
          <p className="text-[15px] text-[var(--doux)]">Agence immobilière. Le barème d&apos;abord, le compte rendu le soir même.</p>
          <p className="text-[15px]">
            <a href={`tel:${agence.telephone.replace(/ /g, "")}`} className="font-semibold underline underline-offset-4">{agence.telephone}</a>
            <span className="text-[var(--doux)]"> · numéro de fiction</span>
          </p>
          <p className="text-[15px]">
            <Link href={`${DOSSIER}/mentions-legales`} className="underline underline-offset-4">Mentions légales et crédits</Link>
          </p>
        </div>
        <MentionsPro />
      </div>
    </div>
  );
}
