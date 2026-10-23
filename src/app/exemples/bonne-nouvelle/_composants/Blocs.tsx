import Link from "next/link";
import Apparition from "../../_kit/Apparition";
import FondVivant from "../../_kit/FondVivant";
import TitreRevele from "../../_kit/TitreRevele";
import RendezVous from "./RendezVous";
import { PHRASE_L313_3, PHRASE_L322_2, entreprise } from "./donnees";

/** Le monogramme : BN dans un rond jaune, une onde verte, comme un appel qui arrive. */
export function Monogramme({ taille = 38 }: { taille?: number }) {
  return (
    <svg viewBox="0 0 48 48" width={taille} height={taille} aria-hidden="true" className="shrink-0">
      <circle cx="24" cy="24" r="22" fill="#F2C14E" />
      <path d="M38 12a19 19 0 0 1 0 24" fill="none" stroke="#3FA36B" strokeWidth="2.6" strokeLinecap="round" />
      <text x="22" y="30" textAnchor="middle" fontSize="16" fontWeight="600" fontFamily="var(--titres)" fill="#1B2A41">BN</text>
    </svg>
  );
}

/** Le monogramme et le nom, pour l'en-tête. */
export function Marque() {
  return (
    <span className="flex items-center gap-2.5">
      <Monogramme />
      <span className="whitespace-nowrap font-[family-name:var(--titres)] text-[22px] font-semibold tracking-[-0.02em]">Bonne Nouvelle</span>
    </span>
  );
}

/** Le petit intitulé au-dessus d'un titre : une pastille, un point vert qui palpite. */
export function Surtitre({ children, clair = false }: { children: React.ReactNode; clair?: boolean }) {
  return (
    <p
      className={`inline-flex items-center gap-2.5 rounded-full border px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.18em] ${
        clair ? "border-white/25 text-[#FFF8EC]" : "border-[var(--trait)] bg-[var(--carte)] text-[var(--encre)]"
      }`}
    >
      <span aria-hidden="true" className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3FA36B] opacity-60 motion-reduce:animate-none" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#3FA36B]" />
      </span>
      {children}
    </p>
  );
}

/** Un bouton-lien aux coins doux. */
export function Bouton({ href, children, variante = "jaune" }: { href: string; children: React.ReactNode; variante?: "jaune" | "nuit" | "contour" | "creme" }) {
  const styles = {
    jaune: "bg-[#F2C14E] text-[#1B2A41]",
    nuit: "bg-[#1B2A41] text-[#FFF8EC]",
    contour: "border-2 border-current/35 hover:bg-[color-mix(in_oklab,currentColor_8%,transparent)]",
    creme: "bg-[#FFF8EC] text-[#1B2A41]",
  }[variante];
  return (
    <Link href={href} className={`group inline-flex min-h-13 items-center gap-3 rounded-[14px] px-6 py-3 text-[16px] font-bold transition-transform hover:-translate-y-0.5 ${styles}`}>
      {children}
      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
    </Link>
  );
}

/** Classes des grands titres : Fraunces serré, l'italique en relief. */
export const TITRE = "font-medium leading-[0.95] tracking-[-0.035em]";
export const ACCENT = "italic font-normal text-[var(--accent-texte)]";
export const ACCENT_JAUNE = "italic font-normal text-[#F2C14E]";

/** Le fond de nuit des hauts de page : bleu nuit, vert, une pointe d'or, qui coulent. */
export function Nuit({ voile = 45 }: { voile?: number }) {
  return (
    <>
      <FondVivant couleurs={["#16233A", "#1F4A47", "#6E6A3A"]} vitesse={0.7} />
      <div className="absolute inset-0 bg-[#1B2A41]" style={{ opacity: voile / 100 }} />
    </>
  );
}

/** L'appel qui arrive : la carte d'un téléphone qui sonne, sans présumer la réponse. */
export function AppelEntrant({ className = "" }: { className?: string }) {
  return (
    <div className={`rounded-[1.75rem] border border-white/15 bg-[#22344F] p-5 text-[#FFF8EC] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)] ${className}`}>
      <p className="flex items-center justify-between text-[12px] font-bold uppercase tracking-[0.16em] text-[#DDE4EE]">
        Appel entrant
        <span className="tabular-nums">14:02</span>
      </p>
      <div className="mt-4 flex items-center gap-4">
        <span className="relative grid h-14 w-14 shrink-0 place-items-center">
          <span aria-hidden="true" className="absolute inset-0 animate-ping rounded-full bg-[#3FA36B] opacity-40 motion-reduce:animate-none" />
          <Monogramme taille={56} />
        </span>
        <span>
          <span className="block font-[family-name:var(--titres)] text-[24px] font-semibold leading-tight">Bonne Nouvelle</span>
          <span className="block text-[14px] text-[#DDE4EE]">Dossier n° 2 731 · la réponse des banques</span>
        </span>
      </div>
      <div aria-hidden="true" className="mt-5 grid grid-cols-2 gap-2 text-center text-[14px] font-bold">
        <span className="rounded-full bg-[#3FA36B] py-2.5 text-[#10251A]">Décrocher</span>
        <span className="rounded-full border border-white/25 py-2.5">Plus tard</span>
      </div>
      <p className="mt-4 text-[12px] leading-snug text-[#DDE4EE]">Oui ou non, on t&apos;appelle. Exemple : l&apos;entreprise est fictive.</p>
    </div>
  );
}

/** Le haut de chaque page intérieure : la nuit qui coule, un titre très grand. */
export function EnTetePage({
  surtitre,
  titre,
  children,
  aCote,
}: {
  surtitre: string;
  titre: string;
  children?: React.ReactNode;
  aCote?: React.ReactNode;
}) {
  return (
    <section className="kit-grain relative isolate overflow-hidden bg-[#1B2A41] text-[#FFF8EC]">
      <Nuit />
      <div className={`relative mx-auto grid grid-cols-1 max-w-7xl gap-12 px-5 pb-16 pt-36 sm:px-8 md:pb-24 md:pt-44 ${aCote ? "lg:grid-cols-[1.15fr_0.85fr] lg:items-end" : ""}`}>
        <div className="space-y-7">
          <Apparition><Surtitre clair>{surtitre}</Surtitre></Apparition>
          <TitreRevele
            as="h1"
            auChargement
            texte={titre}
            className={`max-w-5xl text-[clamp(3.2rem,8vw,7.6rem)] ${TITRE}`}
            classeAccent={ACCENT_JAUNE}
          />
          {children && (
            <Apparition delai={350} className="max-w-2xl text-[19px] leading-relaxed text-[#E6EBF2]">
              {children}
            </Apparition>
          )}
        </div>
        {aCote && <Apparition de="zoom" delai={300}>{aCote}</Apparition>}
      </div>
    </section>
  );
}

/** L'affiche de lancement, en vrai : la question, la signature, les mentions lisibles. */
export function Affiche({ className = "" }: { className?: string }) {
  return (
    <figure data-film="affiche" className={`rounded-[10px] bg-[#1B2A41] p-7 text-[#FFF8EC] shadow-[0_50px_90px_-40px_rgba(27,42,65,0.85)] sm:p-10 ${className}`}>
      <Monogramme taille={52} />
      <p className="mt-6 font-[family-name:var(--titres)] text-[48px] font-medium leading-[1] tracking-[-0.03em] sm:text-[56px]">
        Oui ou non, <em className="font-normal text-[#F2C14E]">on t&apos;appelle.</em>
      </p>
      <p className="mt-6 text-[13px] font-bold uppercase tracking-[0.14em]">Bonne Nouvelle · courtage en crédit immobilier</p>
      <div className="mt-6 space-y-2 border-t border-[#3A4A63] pt-4 text-[12px] leading-relaxed text-[#DDE4EE]">
        <p>{entreprise.nom}, {entreprise.adresse} · {entreprise.categorie} · ORIAS n°&nbsp;{entreprise.orias} (exemple)</p>
        <p>{PHRASE_L322_2}</p>
        <p>{PHRASE_L313_3}</p>
      </div>
      <figcaption className="sr-only">L&apos;affiche de lancement de Bonne Nouvelle, avec les mentions que la loi impose</figcaption>
    </figure>
  );
}

/**
 * En bas de chaque page (le gabarit le pose) : le client choisit son créneau. Personne ne
 * l'appelle pour le lui proposer (C. consom. L223-1).
 */
export function CreneauEnBas() {
  return (
    <section id="rendez-vous" className="scroll-mt-24 px-3 pb-3 pt-3 sm:px-5 sm:pb-5 sm:pt-5">
      <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-[#1B2A41] text-[#FFF8EC]">
        <Nuit voile={40} />
        <div className="relative mx-auto grid grid-cols-1 max-w-6xl gap-12 px-5 py-20 sm:px-10 md:py-28 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div className="space-y-7">
            <Surtitre clair>Rendez-vous</Surtitre>
            <TitreRevele
              texte="Tu choisis *ton créneau.*"
              className={`text-[clamp(3.2rem,7.4vw,6.6rem)] ${TITRE}`}
              classeAccent={ACCENT_JAUNE}
            />
            <p className="max-w-md text-[18px] leading-relaxed text-[#E6EBF2]">
              Au cabinet ou en visio, une heure, sans engagement. Personne ne t&apos;appelle pour te le
              proposer : c&apos;est toi qui viens. Ensuite, c&apos;est nous qui appelons, pour ton dossier.
            </p>
          </div>
          <div className="rounded-[2rem] bg-[#FFF8EC] p-5 text-[#1B2A41] shadow-[0_50px_90px_-50px_rgba(0,0,0,0.7)] sm:p-8">
            <RendezVous />
          </div>
        </div>
      </div>
    </section>
  );
}
