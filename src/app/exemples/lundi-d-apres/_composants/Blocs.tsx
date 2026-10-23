import Link from "next/link";
import Apparition from "../../_kit/Apparition";
import FondVivant from "../../_kit/FondVivant";
import TitreRevele from "../../_kit/TitreRevele";
import { DOSSIER, entreprise } from "./donnees";
import s from "./Lundi.module.css";

/** Le nom : un « l » dans un rond corail, et « lundi d'après » en bas de casse. */
export function Marque() {
  return (
    <span className="flex items-center gap-2.5">
      <span aria-hidden="true" className="grid h-9 w-9 place-items-center rounded-full bg-[var(--accent)] font-[family-name:var(--titres)] text-[19px] font-extrabold text-[var(--sur-accent)]">l</span>
      <span className="whitespace-nowrap font-[family-name:var(--titres)] text-[21px] font-extrabold lowercase leading-none tracking-[-0.03em]">lundi d&apos;après</span>
    </span>
  );
}

/** Le petit titre en bas de casse et en gras, posé dans un coin, avec sa pastille. */
export function Coin({ children, className = "", clair = false }: { children: React.ReactNode; className?: string; clair?: boolean }) {
  return (
    <p className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[13px] font-bold lowercase leading-tight ${clair ? "bg-[#3B2416] text-[#FFD9A0]" : "bg-[#F6E4CE] text-[var(--encre)]"} ${className}`}>
      <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[var(--accent)]" />
      {children}
    </p>
  );
}

/** Un bouton-lien en pilule épaisse, corail, crème, café ou au trait. */
export function Bouton({ href, children, variante = "plein" }: { href: string; children: React.ReactNode; variante?: "plein" | "trait" | "creme" | "cafe" }) {
  const styles = {
    plein: "bg-[var(--accent)] text-[var(--sur-accent)]",
    trait: "border-2 border-current/40 hover:bg-[color-mix(in_oklab,currentColor_10%,transparent)]",
    creme: "bg-[var(--fond)] text-[var(--encre)]",
    cafe: "bg-[var(--encre)] text-[var(--fond)]",
  }[variante];
  return (
    <Link href={href} className={`group inline-flex min-h-13 items-center gap-3 rounded-full px-6 py-3 font-[family-name:var(--titres)] text-[16px] font-bold lowercase transition-transform hover:-rotate-1 hover:scale-[1.03] ${styles}`}>
      {children}
      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">↗</span>
    </Link>
  );
}

/** Le titre en bas de casse, gras et serré ; le mot qui compte en corail. */
export const TITRE = "font-[family-name:var(--titres)] font-extrabold lowercase leading-[0.9] tracking-[-0.05em]";
export const CORAIL = "text-[var(--accent-texte)]";
export const CORAIL_CLAIR = "text-[#FF8A6E]";

/**
 * La machine à café du lundi, dessinée : une grande tasse, sa vapeur, et trois bulles
 * de conversation. Les phrases sont des exemples, sans personne derrière. Décor : la
 * légende dit la même chose en texte.
 */
export function MachineACafe() {
  const bulles = [
    { texte: "T'as vu la compta danser ?", x: "left-0 top-2", angle: "-4deg" },
    { texte: "On refait ça quand ?", x: "right-0 top-20", angle: "3deg" },
    { texte: "Le karaoké, sérieux…", x: "left-4 top-40", angle: "-2deg" },
  ];
  return (
    <div className="relative mx-auto h-[420px] w-full max-w-[360px]">
      <div aria-hidden="true">
        {bulles.map((b, i) => (
          <p
            key={b.texte}
            className={`${s.bulle} absolute ${b.x} z-10 rounded-[22px] rounded-bl-[6px] bg-[#FFF4E6] px-4 py-2.5 font-[family-name:var(--titres)] text-[17px] font-bold text-[#3B2416] shadow-[0_14px_30px_-18px_rgba(0,0,0,.6)]`}
            style={{ "--rang": i, "--angle": b.angle } as React.CSSProperties}
          >
            {b.texte}
          </p>
        ))}
        <svg viewBox="0 0 240 220" className="absolute bottom-0 left-1/2 w-[250px] -translate-x-1/2">
          <path className={s.vapeur} d="M95 40c-12-14 12-22 0-38" stroke="#FFF4E6" strokeWidth="5" fill="none" strokeLinecap="round" opacity=".5" />
          <path className={s.vapeur} d="M125 44c-12-14 12-22 0-38" stroke="#FFF4E6" strokeWidth="5" fill="none" strokeLinecap="round" opacity=".5" style={{ animationDelay: "-1.1s" }} />
          <path className={s.vapeur} d="M155 40c-12-14 12-22 0-38" stroke="#FFF4E6" strokeWidth="5" fill="none" strokeLinecap="round" opacity=".5" style={{ animationDelay: "-2.2s" }} />
          <path d="M40 70h160l-14 110a24 24 0 0 1-24 21H78a24 24 0 0 1-24-21z" fill="#FF6B4A" />
          <path d="M198 92h10a24 24 0 0 1 0 48h-16" stroke="#FF6B4A" strokeWidth="14" fill="none" />
          <ellipse cx="120" cy="70" rx="80" ry="12" fill="#3B2416" />
          <ellipse cx="120" cy="212" rx="96" ry="8" fill="#000" opacity=".2" />
          <text x="120" y="150" textAnchor="middle" fontSize="40" fontWeight="800" fill="#2A190F" style={{ fontFamily: "var(--titres)" }}>lundi</text>
        </svg>
      </div>
      <p className="sr-only">Une tasse de café dessinée, et trois phrases d&apos;exemple qu&apos;on entendrait lundi devant la machine à café.</p>
    </div>
  );
}

/**
 * Le haut de chaque page intérieure : le fond vivant de la marque (café, corail, ciel)
 * sous un voile, le titre en bas de casse révélé à l'arrivée.
 */
export function EnTetePage({
  coin,
  titre,
  children,
  niveau = "h1",
}: {
  coin: string;
  titre: string;
  children?: React.ReactNode;
  niveau?: "h1" | "p";
}) {
  return (
    <section className="kit-grain relative isolate overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
      <FondVivant couleurs={["#2A190F", "#7A2E1C", "#3E6E73"]} vitesse={0.8} />
      <div className="absolute inset-0 bg-[#2A190F]/55" />
      <div className="relative mx-auto max-w-7xl space-y-7 px-5 pb-16 pt-40 sm:px-8 md:pb-24 md:pt-48">
        <Apparition><Coin clair>{coin}</Coin></Apparition>
        <TitreRevele as={niveau} auChargement texte={titre} className={`max-w-5xl text-[clamp(3.4rem,9vw,8.4rem)] ${TITRE}`} classeAccent={CORAIL_CLAIR} />
        {children && (
          <Apparition delai={450} className="max-w-2xl text-lg leading-relaxed text-[var(--sur-sombre)]/90 md:text-xl">
            {children}
          </Apparition>
        )}
      </div>
    </section>
  );
}

/** Le dernier écran de chaque page : la question du lundi, sur le fond vivant. */
export function AppelFinal() {
  return (
    <section className="px-3 pb-3 pt-3 sm:px-5 sm:pb-5">
      <div className="kit-grain relative isolate overflow-hidden rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <FondVivant couleurs={["#2A190F", "#B8381F", "#3E6E73"]} />
        <div className="absolute inset-0 bg-[#2A190F]/50" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-24 sm:px-10 md:py-32 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div className="space-y-6">
            <Coin clair>soirée d&apos;entreprise ou mariage</Coin>
            <TitreRevele
              texte={"Vous en parlerez *encore lundi.*"}
              className={`text-[clamp(3.2rem,8vw,7rem)] ${TITRE}`}
              classeAccent={CORAIL_CLAIR}
            />
            <p className="max-w-xl text-lg leading-relaxed text-[var(--sur-sombre)]/90">
              Une entreprise&nbsp;? Écrivez la phrase de lundi, on construit la soirée à l&apos;envers. Un mariage&nbsp;? Notez la
              chanson interdite, et bloquez votre samedi.
            </p>
          </div>
          <Apparition className="flex flex-col items-start gap-4 lg:items-end" delai={200}>
            <Bouton href={`${DOSSIER}#question`}>écrire notre phrase</Bouton>
            <Bouton href={`${DOSSIER}/samedis-libres`} variante="creme">bloquer un samedi</Bouton>
            <p className="text-[15px] text-[var(--sur-sombre)]/90">
              Ou par téléphone : <span className="font-semibold tabular-nums">{entreprise.telephone}</span>
            </p>
          </Apparition>
        </div>
      </div>
    </section>
  );
}
