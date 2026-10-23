import Link from "next/link";
import Apparition from "../../_kit/Apparition";
import FondVivant from "../../_kit/FondVivant";
import PhotoCinema from "../../_kit/PhotoCinema";
import TitreRevele from "../../_kit/TitreRevele";
import { COULEURS, DOSSIER, LETTRES, cabinet } from "./donnees";

/** Le monogramme : un tiers, dans un carré jaune. */
export function Monogramme({ className = "h-9 w-9 text-[17px]" }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`grid shrink-0 place-items-center rounded-[8px] bg-[var(--accent)] font-[family-name:var(--titres)] font-bold text-[var(--sur-accent)] ${className}`}>
      ⅓
    </span>
  );
}

export function Marque() {
  return (
    <span className="flex items-center gap-2.5">
      <Monogramme />
      <span className="whitespace-nowrap font-[family-name:var(--titres)] text-[18px] font-semibold tracking-[-0.02em]">Tiers Regard</span>
    </span>
  );
}

/** Les sept barres de A à G, en escalier, comme l'étiquette. Décoratif. */
export function Barres({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`inline-flex flex-col gap-[2px] ${className}`}>
      {LETTRES.map((l, i) => (
        <span key={l} className="block h-[3px] rounded-r-full" style={{ background: COULEURS[l][0], width: `${10 + i * 3}px` }} />
      ))}
    </span>
  );
}

/** Une étiquette technique : petites capitales espacées, un trait jaune devant. */
export function Etiquette({ children, className = "", clair = false }: { children: React.ReactNode; className?: string; clair?: boolean }) {
  return (
    <p className={`flex items-center gap-2.5 text-[12px] font-medium uppercase tracking-[0.22em] ${clair ? "text-[#4B5563]" : "text-[var(--doux)]"} ${className}`}>
      <span aria-hidden="true" className={`h-px w-7 ${clair ? "bg-[#111827]" : "bg-[var(--accent)]"}`} />
      {children}
    </p>
  );
}

/** Un bouton-lien technique : coins à peine arrondis, une case pour la flèche. */
export function Bouton({ href, children, variante = "plein" }: { href: string; children: React.ReactNode; variante?: "plein" | "contour" | "sombre" }) {
  const styles = {
    plein: ["bg-[var(--accent)] text-[var(--sur-accent)]", "bg-[var(--sur-accent)] text-[var(--accent)]"],
    contour: ["border border-current/40", "border border-current/30"],
    sombre: ["bg-[#111827] text-[#F5D90A]", "bg-[#F5D90A] text-[#111827]"],
  }[variante];
  return (
    <Link href={href} className={`group inline-flex min-h-13 items-center justify-between gap-4 rounded-[10px] py-2 pl-5 pr-2 text-[13px] font-semibold uppercase tracking-[0.16em] transition-transform hover:scale-[1.02] ${styles[0]}`}>
      {children}
      <span aria-hidden="true" className={`grid h-9 w-9 place-items-center rounded-[7px] text-base transition-transform group-hover:translate-x-0.5 ${styles[1]}`}>→</span>
    </Link>
  );
}

/** Comme tout diagnostiqueur : la phrase qui accompagne chaque mention de l'indépendance. */
export function CommeTous({ className = "" }: { className?: string }) {
  return (
    <p className={`text-[15px] leading-relaxed ${className}`}>
      Comme tout diagnostiqueur : aucun lien avec ton agence, ni avec une entreprise de travaux, et
      aucun avantage accordé à quiconque pour être recommandé (code de la construction et de
      l&apos;habitation, art.&nbsp;L271-6 et R271-3).
    </p>
  );
}

/** La certification, domaine par domaine : « bien en vue ». Numéros d'exemple. */
export function Certification({ compacte = false }: { compacte?: boolean }) {
  const domaines = ["DPE", "Amiante", "Électricité", "Gaz", "Plomb", "Termites"];
  return (
    <div className="space-y-3" data-film="certification">
      <p className="text-[15px] font-semibold leading-snug">
        {cabinet.diagnostiqueuse}, certifiée par un organisme accrédité · certificat n°&nbsp;0000 (exemple) ·
        assurance de responsabilité civile professionnelle (exemple)
      </p>
      <ul className="flex flex-wrap gap-1.5">
        {domaines.map((d) => (
          <li key={d} className="rounded-[6px] border border-current/25 px-2.5 py-1 text-[12px] font-semibold uppercase tracking-[0.12em]">
            <span aria-hidden="true" className="mr-1.5">■</span>
            {d}
          </li>
        ))}
      </ul>
      {!compacte && (
        <p className="text-[14px] leading-relaxed opacity-90">
          La certification se délivre domaine par domaine, pour une durée limitée. Elle se vérifie dans
          l&apos;annuaire officiel des diagnostiqueurs certifiés du ministère.
        </p>
      )}
    </div>
  );
}

/** Le haut de chaque page intérieure : la nuit, une photo qui respire ou le fond animé. */
export function EnTetePage({
  etiquette,
  titre,
  children,
  photo,
  origine,
  cote,
}: {
  etiquette: React.ReactNode;
  titre: string;
  children?: React.ReactNode;
  photo?: { src: string };
  origine?: string;
  cote?: React.ReactNode;
}) {
  return (
    <section className="kit-grain relative isolate flex min-h-[64svh] flex-col justify-end overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
      {photo ? (
        <>
          <PhotoCinema src={photo.src} alt="" priority origine={origine} className="opacity-45" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,10,16,0.6)_0%,rgba(7,10,16,0.7)_50%,rgba(7,10,16,0.97)_100%)]" />
        </>
      ) : (
        <>
          <FondVivant couleurs={["#070A10", "#1A2333", "#5C520C"]} />
          <div className="absolute inset-0 bg-[var(--sombre)]/50" />
        </>
      )}
      <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-4 pb-14 pt-36 sm:px-8 md:pb-20 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
        <div className="space-y-6">
          <Apparition><Etiquette>{etiquette}</Etiquette></Apparition>
          <TitreRevele
            as="h1"
            auChargement
            texte={titre}
            className="max-w-4xl font-semibold text-[clamp(2.6rem,7vw,6.2rem)] leading-[0.95] tracking-[-0.045em]"
            classeAccent="text-[var(--accent-texte)]"
          />
          {children && (
            <Apparition delai={400} className="max-w-2xl text-lg leading-relaxed text-[var(--sur-sombre)]/90">
              {children}
            </Apparition>
          )}
        </div>
        {cote && <Apparition delai={500} de="droite">{cote}</Apparition>}
      </div>
    </section>
  );
}

/** Le dernier écran de chaque page : la chute de la vidéo, sur le fond animé. */
export function AppelFinal() {
  return (
    <section className="px-3 pb-3 pt-3 sm:px-5 sm:pb-5">
      <div className="relative isolate overflow-hidden rounded-[2rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <FondVivant couleurs={["#070A10", "#16233A", "#6B5E0A"]} />
        <div className="absolute inset-0 bg-[var(--sombre)]/45" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-24 sm:px-10 md:py-32 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div className="space-y-6">
            <Etiquette>Rendez-vous en ligne</Etiquette>
            <p className="font-[family-name:var(--titres)] text-[clamp(1.4rem,3vw,2.2rem)] font-medium tracking-[-0.02em] text-[var(--sur-sombre)]/90">Tout le monde la veut belle.</p>
            <TitreRevele
              texte="Nous, on la veut *vraie.*"
              className="font-semibold text-[clamp(3rem,8vw,7rem)] leading-[0.92] tracking-[-0.05em]"
              classeAccent="text-[var(--accent-texte)]"
            />
          </div>
          <Apparition className="flex flex-col items-start gap-4 lg:items-end" delai={200}>
            <Bouton href={`${DOSSIER}/rendez-vous`}>Prendre rendez-vous</Bouton>
            <p className="text-[15px] text-[var(--sur-sombre)]/90">
              Ou appelle le <a href={`tel:${cabinet.telephoneLien}`} className="font-semibold tabular-nums underline underline-offset-4">{cabinet.telephone}</a> · numéro de fiction
            </p>
          </Apparition>
        </div>
      </div>
    </section>
  );
}
