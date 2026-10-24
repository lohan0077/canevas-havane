import Link from "next/link";
import Apparition from "../../_kit/Apparition";
import FondVivant from "../../_kit/FondVivant";
import PhotoCinema from "../../_kit/PhotoCinema";
import TitreRevele from "../../_kit/TitreRevele";
import { DOSSIER, PRIX, entreprise } from "./donnees";

/** Le monogramme : une lune dans un rond, et le nom en Bodoni. */
export function Marque() {
  return (
    <span className="flex items-center gap-2.5">
      <span aria-hidden="true" className="grid h-9 w-9 place-items-center rounded-full bg-[var(--accent)] text-lg leading-none text-[var(--sur-accent)]">☾</span>
      <span className="whitespace-nowrap font-[family-name:var(--titres)] text-[21px] tracking-[0.01em]">Clair de Salon</span>
    </span>
  );
}

/** Le petit intitulé au-dessus d'un titre, comme sur un programme de concert : deux filets. */
export function Surtitre({ children, clair = false, centre = false }: { children: React.ReactNode; clair?: boolean; centre?: boolean }) {
  return (
    <p className={`flex items-center gap-3 text-[12px] font-bold uppercase tracking-[0.26em] ${centre ? "justify-center" : ""} ${clair ? "text-[#E7C774]" : "text-[var(--accent-texte)]"}`}>
      <span aria-hidden="true" className="h-px w-8 bg-current" />
      {children}
      {centre && <span aria-hidden="true" className="h-px w-8 bg-current" />}
    </p>
  );
}

/** Un bouton-lien en pilule. */
export function Bouton({ href, children, variante = "plein" }: { href: string; children: React.ReactNode; variante?: "plein" | "contour" | "clair" }) {
  const styles = {
    plein: "bg-[var(--accent)] text-[var(--sur-accent)]",
    contour: "border border-current/40 hover:bg-[color-mix(in_oklab,currentColor_10%,transparent)]",
    clair: "bg-[var(--fond)] text-[var(--encre)]",
  }[variante];
  return (
    <Link href={href} className={`group inline-flex min-h-13 items-center gap-3 rounded-full px-6 py-3 text-[16px] font-semibold transition-transform hover:scale-[1.02] ${styles}`}>
      {children}
      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
    </Link>
  );
}

/** Une note à la main, dans la marge du cahier (Caveat). */
export function Note({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={`font-[family-name:var(--f-caveat)] text-[26px] leading-tight text-[var(--accent-texte)] -rotate-2 origin-left ${className}`}>{children}</p>;
}

/**
 * Le haut de chaque page intérieure : la nuit du salon, comme l'accueil (l'en-tête
 * flottant l'attend), avec une photo qui respire si on en donne une, sinon le fond animé.
 */
export function EnTetePage({
  surtitre,
  titre,
  children,
  photo,
  origine,
  filmTitre,
}: {
  surtitre: React.ReactNode;
  titre: string;
  children?: React.ReactNode;
  photo?: { src: string };
  origine?: string;
  filmTitre?: string;
}) {
  return (
    <section className="kit-grain relative isolate flex min-h-[64svh] flex-col justify-end overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
      {photo ? (
        <>
          <PhotoCinema src={photo.src} alt="" priority origine={origine} className="opacity-50" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(30,42,68,0.55)_0%,rgba(30,42,68,0.72)_50%,rgba(30,42,68,0.97)_100%)]" />
        </>
      ) : (
        <>
          <FondVivant couleurs={["#1E2A44", "#2C3B5E", "#7A3434"]} />
          <div className="absolute inset-0 bg-[var(--sombre)]/50" />
        </>
      )}
      <div className="relative mx-auto w-full max-w-6xl space-y-7 px-5 pb-16 pt-40 sm:px-8 md:pb-24 md:pt-48">
        <Apparition><Surtitre clair>{surtitre}</Surtitre></Apparition>
        <span data-film={filmTitre} className="block">
          <TitreRevele
            as="h1"
            auChargement
            texte={titre}
            className="max-w-5xl text-[clamp(3.2rem,9vw,8rem)] leading-[0.95] tracking-[-0.02em]"
            classeAccent="italic text-[#E7C774]"
          />
        </span>
        {children && (
          <Apparition delai={400} className="max-w-2xl text-xl leading-relaxed text-[var(--sur-sombre)]/90">
            {children}
          </Apparition>
        )}
      </div>
    </section>
  );
}

/**
 * Le prix d'une heure de cours, piano ou maths, comme l'arrêté du 17 mars 2015 le
 * demande : à l'heure, HT et TTC, frais annexes, mode d'intervention, devis ; puis
 * l'avantage fiscal à part, détaché du prix, en caractères nettement plus petits (art. 5).
 */
export function PrixCours({ id = "carte-prix" }: { id?: string }) {
  return (
    <div id={id} data-film="prix" className="relative overflow-hidden rounded-[2rem] border border-[var(--trait)] bg-[var(--carte)] p-6 shadow-[0_40px_90px_-50px_rgba(30,42,68,0.55)] sm:p-10">
      <p className="flex items-center justify-between gap-3">
        <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-[var(--doux)]">Piano ou maths · chez toi · 1 heure</span>
        <span className="rotate-[4deg] rounded-full border-2 border-[var(--accent-texte)] px-3 py-0.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--accent-texte)]">Exemple</span>
      </p>
      <p className="mt-4 font-[family-name:var(--titres)] leading-none [font-variant-numeric:lining-nums]">
        <span className="text-[104px] sm:text-[150px]">{PRIX.heure}&nbsp;€</span>
        <span className="ml-3 inline-block align-[0.9em] text-2xl italic leading-tight">TTC<br />l&apos;heure</span>
      </p>
      <dl className="mt-6 space-y-3 border-t border-[var(--trait)] pt-5 leading-snug">
        <div><dt className="font-bold">Hors taxes</dt><dd>{PRIX.heure},00&nbsp;€ HT l&apos;heure · {PRIX.tva} (exemple) : HT = TTC.</dd></div>
        <div><dt className="font-bold">Cours de piano de 45 minutes</dt><dd>30&nbsp;€ TTC, soit {PRIX.heure}&nbsp;€ TTC rapportés à l&apos;heure.</dd></div>
        <div><dt className="font-bold">Frais annexes</dt><dd>{PRIX.frais}</dd></div>
        <div><dt className="font-bold">Mode d&apos;intervention</dt><dd>Prestataire : {entreprise.nom} envoie la professeure et facture le cours.</dd></div>
        <div><dt className="font-bold">Devis</dt><dd>Gratuit. Remis avant le premier cours dès 100&nbsp;€ TTC par mois, et sur simple demande en dessous.</dd></div>
      </dl>
      <div id="a-part" data-film="avantage" className="mt-6 rounded-2xl border border-dashed border-[var(--doux)] bg-[var(--fond)] px-4 py-3 text-[13px] leading-snug">
        <p className="font-bold">Avantage fiscal, sous conditions</p>
        <p>
          Crédit d&apos;impôt de 50&nbsp;% des sommes versées, dans la limite d&apos;un plafond annuel
          (CGI, art. 199 sexdecies) : {PRIX.heure * PRIX.credit}&nbsp;€ l&apos;heure après crédit
          d&apos;impôt. Cours chez l&apos;élève, en individuel ; activité déclarée en services à la
          personne (n°&nbsp;{entreprise.sap}, exemple). Ni visio, ni cours en groupe.
        </p>
      </div>
    </div>
  );
}

/** Le dernier écran de chaque page : l'affiche du lancement, sur le fond animé de la nuit. */
export function AppelFinal() {
  return (
    <section className="px-3 pb-3 pt-3 sm:px-5 sm:pb-5">
      <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <FondVivant couleurs={["#1E2A44", "#33456B", "#8C3B3B"]} />
        <div className="absolute inset-0 bg-[var(--sombre)]/45" />
        <div className="relative mx-auto max-w-5xl space-y-8 px-6 py-24 text-center sm:px-10 md:py-32">
          <p aria-hidden="true" className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-[#E7C774] text-3xl text-[#E7C774]">☾</p>
          <TitreRevele
            texte="Ton piano s'est *assez reposé.*"
            className="mx-auto max-w-4xl text-[clamp(3rem,8vw,6.8rem)] leading-[0.95] tracking-[-0.02em]"
            classeAccent="italic text-[#E7C774]"
          />
          <p className="mx-auto max-w-xl text-lg leading-relaxed text-[var(--sur-sombre)]/90">
            Et le chapitre du dernier contrôle aussi. Un premier cours chez toi, sur le morceau
            ou le chapitre que tu choisis.
          </p>
          <Apparition delai={200} className="flex flex-wrap justify-center gap-3">
            <Bouton href={`${DOSSIER}/reserver`}>Réserver un cours</Bouton>
            <a href={`tel:${entreprise.telephoneLien}`} className="inline-flex min-h-13 items-center rounded-full border border-current/40 px-6 font-semibold tabular-nums">
              {entreprise.telephone}
            </a>
          </Apparition>
          <p className="text-sm text-[var(--sur-sombre)]/85">Numéro fictif, réservé par l&apos;ARCEP aux œuvres de fiction.</p>
        </div>
      </div>
    </section>
  );
}
