import Image from "next/image";
import Link from "next/link";
import { DOSSIER, agence, euros, pourcent, prixHonorairesInclus, type Classe, type Maison } from "./donnees";

/** La feuille de la marque : trois traits, comme trois marches. Décoratif. */
export function Marches({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 18" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M12 4 H24 M8 9 H28 M4 14 H32" />
    </svg>
  );
}

/** Un titre de section, centré : les trois marches, un surtitre en petites capitales, le titre en Bodoni. */
export function Intitule({ surtitre, titre, children, gauche = false, niveau = 2 }: { surtitre: string; titre: React.ReactNode; children?: React.ReactNode; gauche?: boolean; niveau?: 1 | 2 }) {
  const Titre = niveau === 1 ? "h1" : "h2";
  return (
    <div className={`max-w-2xl space-y-4 ${gauche ? "" : "mx-auto text-center"}`}>
      <Marches className={`h-4 w-9 text-[var(--accent)] ${gauche ? "" : "mx-auto"}`} />
      <p className="text-[12px] font-semibold uppercase tracking-[0.28em] text-[var(--accent-texte)]">{surtitre}</p>
      <Titre className="text-[40px] font-normal leading-[1.02] tracking-[-0.01em] sm:text-[58px]">{titre}</Titre>
      {children && <div className="text-[17px] leading-relaxed text-[var(--doux)]">{children}</div>}
    </div>
  );
}

export function Section({ id, className = "", fondu = false, children, label }: { id?: string; className?: string; fondu?: boolean; children: React.ReactNode; label?: string }) {
  return (
    <section id={id} aria-label={label} className={`scroll-mt-24 ${fondu ? "bg-[#E9EFE6]" : ""}`}>
      <div className={`mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28 ${className}`}>{children}</div>
    </section>
  );
}

/* ---------- Classes énergie et climat (CCH L126-33) ---------- */

const LETTRES: Classe[] = ["A", "B", "C", "D", "E", "F", "G"];
const ENERGIE: Record<Classe, [string, string]> = {
  A: ["#009C6D", "#111111"], B: ["#52B153", "#111111"], C: ["#78BD76", "#111111"], D: ["#F4E70F", "#111111"],
  E: ["#F0B50F", "#111111"], F: ["#EB8235", "#111111"], G: ["#D7221F", "#FFFFFF"],
};
const CLIMAT: Record<Classe, [string, string]> = {
  A: ["#A3DBF8", "#111111"], B: ["#8DB5D4", "#111111"], C: ["#7893B2", "#111111"], D: ["#637290", "#FFFFFF"],
  E: ["#4F5370", "#FFFFFF"], F: ["#3B3651", "#FFFFFF"], G: ["#281B35", "#FFFFFF"],
};

/** Une échelle de A à G en couleur, en escalier : la classe du logement sort du rang. */
export function Echelle({ genre, classe }: { genre: "energie" | "climat"; classe: Classe }) {
  const couleurs = genre === "energie" ? ENERGIE : CLIMAT;
  return (
    <figure className="space-y-2">
      <figcaption className="text-[13px] font-semibold">
        {genre === "energie" ? "Classe énergie" : "Classe climat"} : {classe}
      </figcaption>
      <div className="flex items-end gap-1" aria-hidden="true">
        {LETTRES.map((l, i) => {
          const [fond, encre] = couleurs[l];
          const elle = l === classe;
          return (
            <span
              key={l}
              className={`flex flex-1 items-start justify-center rounded-t-[4px] pt-1 text-[12px] font-bold ${elle ? "outline outline-2 outline-offset-2 outline-[var(--encre)]" : ""}`}
              style={{ background: fond, color: encre, height: `${18 + i * 4 + (elle ? 14 : 0)}px` }}
            >
              {l}
            </span>
          );
        })}
      </div>
    </figure>
  );
}

/** Ce que l'arrêté du 10/01/2017 impose sur l'annonce : prix honoraires inclus en plus gros, le reste en dessous. */
export function PrixMaison({ maison, grand = false }: { maison: Maison; grand?: boolean }) {
  return (
    <div className="space-y-1.5">
      <p className="flex flex-wrap items-baseline gap-x-2">
        <span className={`font-[family-name:var(--titres)] leading-none tabular-nums ${grand ? "text-[50px]" : "text-[34px]"}`}>{euros(prixHonorairesInclus(maison))}</span>
        <span className="text-[14px] font-semibold">honoraires inclus</span>
      </p>
      <p className="text-[15px] tabular-nums">{euros(maison.horsHonoraires)} hors honoraires</p>
      <p className="text-[15px] font-semibold">Honoraires : {pourcent(maison.taux)} TTC à la charge de l&apos;acquéreur</p>
    </div>
  );
}

export function Depenses({ maison }: { maison: Maison }) {
  return (
    <p className="text-[14px] leading-relaxed">
      Montant estimé des dépenses annuelles d&apos;énergie pour un usage standard : entre {euros(maison.depenses[0])} et{" "}
      {euros(maison.depenses[1])} par an. Année de référence des prix de l&apos;énergie : 2025.
    </p>
  );
}

/** Une maison en vignette : l'histoire d'abord, le prix légal ensuite. */
export function CarteMaison({ maison }: { maison: Maison }) {
  return (
    <article className="flex h-full flex-col border border-[var(--trait)] bg-[var(--carte)]">
      <div className="relative aspect-[4/3] border-b border-[var(--trait)]">
        <Image src={maison.photo.src} alt={maison.photo.alt} fill sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw" className="object-cover" />
        <span className="absolute left-3 top-3 bg-[var(--carte)] px-2.5 py-1 text-[12px] font-semibold">Annonce : exemple</span>
      </div>
      <div className="flex flex-1 flex-col gap-5 p-6">
        <blockquote className="space-y-2">
          <p className="font-[family-name:var(--titres)] text-[24px] italic leading-snug">«&nbsp;{maison.histoire.citation}&nbsp;»</p>
          <footer className="text-[14px] text-[var(--doux)]">{maison.histoire.auteur} · exemple</footer>
        </blockquote>
        <div className="space-y-4 border-t border-[var(--trait)] pt-5">
          <h3 className="text-[22px] font-normal">{maison.titre} · {maison.surface}&nbsp;m²</h3>
          <PrixMaison maison={maison} />
          <div className="grid grid-cols-2 gap-4">
            <Echelle genre="energie" classe={maison.energie} />
            <Echelle genre="climat" classe={maison.climat} />
          </div>
          <p className="text-[14px] text-[var(--doux)]">Énergie estimée : {euros(maison.depenses[0])} à {euros(maison.depenses[1])} par an (prix 2025).</p>
        </div>
        <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 text-[15px] font-semibold">
          <Link href={`${DOSSIER}/maisons/${maison.slug}`} className="underline decoration-[var(--accent)] underline-offset-[6px]">Lire son histoire</Link>
          <Link href={`${DOSSIER}/bareme`} className="underline decoration-[var(--trait)] underline-offset-[6px]">Notre barème</Link>
        </div>
      </div>
    </article>
  );
}

/** Les mentions du décret n° 72-678 (art. 92 à 94), toutes d'exemple. */
export function MentionsAgence() {
  return (
    <div className="space-y-1.5 text-[14px] leading-relaxed">
      <p>{agence.nom}, agence immobilière · {agence.adresse} (exemple).</p>
      <p>
        Carte professionnelle « Transactions sur immeubles et fonds de commerce » n°&nbsp;{agence.carte.replace(/ /g, " ")}, délivrée par la {agence.cci} (exemple).
      </p>
      <p>Garant : {agence.garant} (exemple).</p>
      <p>
        <Link href={`${DOSSIER}/bareme`} className="font-semibold underline underline-offset-4">Barème d&apos;honoraires</Link> en ligne, en vitrine et à l&apos;entrée de l&apos;agence.
      </p>
    </div>
  );
}

export function PiedDeSite() {
  return (
    <div className="border-t border-[var(--trait)] bg-[var(--fond)]">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1fr_1.3fr]">
          <div className="space-y-3">
            <p className="flex items-center gap-3">
              <span aria-hidden="true" className="grid h-11 w-11 place-items-center rounded-full border border-[var(--encre)] font-[family-name:var(--titres)] text-[15px] tracking-[0.1em]">III</span>
              <span className="font-[family-name:var(--titres)] text-[28px]">Trois Marches</span>
            </p>
            <p className="font-[family-name:var(--titres)] text-[19px] italic">Chaque maison a son histoire.</p>
            <p className="text-[15px]">
              <a href={`tel:${agence.telephone.replace(/ /g, "")}`} className="font-semibold underline underline-offset-4">{agence.telephone}</a>
              <span className="text-[var(--doux)]"> · numéro de fiction</span>
            </p>
            <p className="text-[15px]">
              <Link href={`${DOSSIER}/mentions-legales`} className="underline underline-offset-4">Mentions légales et crédits</Link>
            </p>
          </div>
          <div className="text-[var(--doux)]">
            <MentionsAgence />
          </div>
        </div>
      </div>
    </div>
  );
}
