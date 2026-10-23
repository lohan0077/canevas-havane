import Link from "next/link";
import Apparition from "../../_kit/Apparition";
import FondVivant from "../../_kit/FondVivant";
import PhotoCinema from "../../_kit/PhotoCinema";
import TitreRevele from "../../_kit/TitreRevele";
import { DOSSIER, FRANCE_RENOV, entreprise } from "./donnees";

/** L'accent des titres : l'italique de la didone, couleur de soleil sur fond sombre. */
export const ACCENT_SOMBRE = "italic text-[#F2B27A]";
export const ACCENT_CLAIR = "italic text-[var(--accent-texte)]";

/** Le monogramme : un H dans le cadran, et un point à midi. */
export function Monogramme({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <circle cx="20" cy="20" r="19" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <text x="20" y="28" textAnchor="middle" fontSize="21" fontFamily="var(--titres)" fill="currentColor">H</text>
      <circle cx="20" cy="4.5" r="2.2" fill="var(--accent)" />
    </svg>
  );
}

export function Marque() {
  return (
    <span className="flex items-center gap-2.5">
      <Monogramme className="h-9 w-9" />
      <span className="whitespace-nowrap font-[family-name:var(--titres)] text-[21px] tracking-[-0.01em]">L&apos;Heure Dite</span>
    </span>
  );
}

/**
 * Le lien France Rénov', au premier rang de chaque page : le message de l'annexe I de
 * l'arrêté du 7 juillet 2026, sans un mot changé, cliquable vers la page que l'arrêté
 * désigne (C. consom., art. L122-26). Le tournage de la vidéo « Remplir l'agenda » remonte
 * jusqu'à lui (« je le mettrais tout en haut »).
 */
export function BandeauRenov() {
  return (
    <div id="france-renov" className="border-b border-[#9CC3D5] bg-[#E3EEF3] text-[#14324A]">
      <a href={FRANCE_RENOV.lien} rel="noopener noreferrer" className="mx-auto block max-w-6xl px-4 py-3 text-[14px] leading-snug sm:text-center">
        <span className="font-semibold">France Rénov&apos;</span>
        <span aria-hidden="true"> · </span>
        <span className="underline underline-offset-2">{FRANCE_RENOV.message}</span>
      </a>
    </div>
  );
}

/** Le petit intitulé : une heure de cadran (un trait), puis les capitales espacées. */
export function Surtitre({ children, clair = false }: { children: React.ReactNode; clair?: boolean }) {
  return (
    <p className={`flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.24em] ${clair ? "text-[var(--sur-sombre)]" : "text-[var(--accent-texte)]"}`}>
      <span aria-hidden="true" className="relative inline-block h-4 w-4 rounded-full border border-current">
        <span className="absolute left-1/2 top-[2px] h-[6px] w-px -translate-x-1/2 bg-current" />
        <span className="absolute left-1/2 top-1/2 h-px w-[5px] -translate-y-1/2 bg-current" />
      </span>
      {children}
    </p>
  );
}

/** Un bouton-lien en pilule ; la flèche avance au survol. */
export function Bouton({ href, children, variante = "plein" }: { href: string; children: React.ReactNode; variante?: "plein" | "contour" | "clair" | "nuit" }) {
  const styles = {
    plein: "bg-[var(--accent)] text-[var(--sur-accent)]",
    contour: "border border-current/35 hover:bg-[color-mix(in_oklab,currentColor_8%,transparent)]",
    clair: "bg-[var(--fond)] text-[var(--encre)]",
    nuit: "bg-[var(--sombre)] text-[var(--sur-sombre)]",
  }[variante];
  return (
    <Link href={href} className={`group inline-flex min-h-13 items-center gap-3 rounded-full px-7 py-3 text-[16px] font-semibold transition-transform hover:scale-[1.02] ${styles}`}>
      {children}
      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
    </Link>
  );
}

/** Le cadre d'un outil : une barre fine, un cadran qui tourne, et le nom de l'écran. */
export function Appli({ titre, note, children, className = "" }: { titre: string; note: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-[2rem] border border-[var(--trait)] bg-[var(--carte)] text-[var(--encre)] shadow-[0_40px_90px_-45px_rgba(24,48,31,0.6)] ${className}`}>
      <div className="flex items-center justify-between gap-3 border-b border-[var(--trait)] px-5 py-3.5">
        <span className="flex items-center gap-2.5 font-[family-name:var(--titres)] text-lg">
          <Monogramme className="h-6 w-6" />
          {titre}
        </span>
        <span className="text-[13px] text-[var(--doux)]">{note}</span>
      </div>
      <div className="p-4 sm:p-7">{children}</div>
    </div>
  );
}

/** Le haut de chaque page intérieure : sombre, une photo qui respire, le titre très grand. */
export function EnTetePage({
  surtitre,
  titre,
  children,
  photo,
  origine,
}: {
  surtitre: React.ReactNode;
  titre: string;
  children?: React.ReactNode;
  photo?: { src: string; alt: string };
  origine?: string;
}) {
  return (
    <section className="kit-grain relative isolate overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
      {photo ? (
        <>
          <PhotoCinema src={photo.src} alt="" priority origine={origine} className="opacity-50" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(24,48,31,0.6)_0%,rgba(24,48,31,0.74)_55%,rgba(24,48,31,0.96)_100%)]" />
        </>
      ) : (
        <>
          <FondVivant couleurs={["#18301F", "#2D5A3A", "#B5652E"]} vitesse={0.6} />
          <div className="absolute inset-0 bg-[var(--sombre)]/50" />
        </>
      )}
      <div className="relative mx-auto max-w-7xl space-y-7 px-5 pb-20 pt-36 sm:px-8 md:pb-28 md:pt-48">
        <Apparition><Surtitre clair>{surtitre}</Surtitre></Apparition>
        <TitreRevele
          as="h1"
          auChargement
          texte={titre}
          className="max-w-5xl font-[family-name:var(--titres)] text-[clamp(3.2rem,8vw,7.6rem)] leading-[0.95] tracking-[-0.03em]"
          classeAccent={ACCENT_SOMBRE}
        />
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
 * La règle du secteur, dite pour ce qu'elle est : une loi qui vaut pour tous. La marque
 * ne s'en fait pas un mérite (C. consom., art. L121-4, 10°) ; elle va plus loin.
 */
export function LaRegle() {
  return (
    <section className="px-3 sm:px-5">
      <div className="kit-grain relative overflow-hidden rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 sm:px-10 md:py-32 lg:grid-cols-2 lg:items-end">
          <div className="space-y-6">
            <Apparition><Surtitre clair>La règle, pour tous</Surtitre></Apparition>
            <TitreRevele
              texte="Pour ces travaux, personne n'a le droit de *te démarcher.*"
              className="font-[family-name:var(--titres)] text-[clamp(2.6rem,5.4vw,4.8rem)] leading-[1] tracking-[-0.025em]"
              classeAccent={ACCENT_SOMBRE}
            />
            <Apparition as="p" delai={150} className="text-lg leading-relaxed text-[var(--sur-sombre)]/90">
              Téléphone, SMS, e-mail, réseaux sociaux : la prospection d&apos;un particulier pour une pompe à
              chaleur ou des panneaux solaires est interdite à tous les professionnels, sauf contrat en cours
              (C. consom., art. L223-1 et L223-8). Ce n&apos;est pas notre mérite, c&apos;est la loi.
            </Apparition>
          </div>
          <Apparition delai={250} className="space-y-5 border-t border-white/20 pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
            <p className="font-[family-name:var(--titres)] text-[clamp(2rem,3.6vw,3.2rem)] leading-[1.08]">
              Tout le monde subit cette règle. Nous, on va <em className="text-[#F2B27A]">plus loin qu&apos;elle.</em>
            </p>
            <p className="text-lg leading-relaxed text-[var(--sur-sombre)]/90">
              La loi permet de rappeler celui qui l&apos;a demandé, dans les cinq jours ouvrables. Nous, on te laisse
              choisir le jour et l&apos;heure. Et on appelle à cette heure-là.
            </p>
          </Apparition>
        </div>
      </div>
    </section>
  );
}

/** L'affiche du lancement, avec, en bas, le message France Rénov' que toute publicité porte depuis le 1er octobre 2026. */
export function Affiche() {
  return (
    <figure className="mx-auto max-w-md rotate-[-2deg] rounded-[6px] border border-[var(--trait)] bg-[var(--carte)] p-7 text-left shadow-[0_30px_50px_-30px_rgba(31,61,43,.55)] sm:p-9">
      <p className="font-[family-name:var(--titres)] text-[46px] leading-[1.02] tracking-[-0.02em]">
        Vous choisissez <em className="text-[var(--accent-texte)]">l&apos;heure.</em>
      </p>
      <p className="mt-4 text-xl">On appelle à cette heure-là.</p>
      <p className="mt-6 text-sm leading-relaxed text-[var(--doux)]">
        Pour ces travaux, le démarchage est interdit à tous les professionnels (C. consom., art. L223-1 et L223-8).
      </p>
      <p className="mt-6 flex items-center gap-2 text-sm font-semibold">
        <Monogramme className="h-7 w-7" /> L&apos;Heure Dite · pompes à chaleur et solaire
      </p>
      <p className="-mx-7 -mb-7 mt-5 rounded-b-[6px] bg-[#E3EEF3] px-7 py-4 text-[13px] leading-snug text-[#14324A] sm:-mx-9 sm:-mb-9 sm:px-9">
        {FRANCE_RENOV.message}
      </p>
    </figure>
  );
}

/** Le dernier écran de chaque page : sur le fond vivant, l'heure qu'on choisit. */
export function AppelFinal() {
  return (
    <section className="px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <FondVivant couleurs={["#18301F", "#2F5B3B", "#C2703D"]} />
        <div className="absolute inset-0 bg-[var(--sombre)]/50" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-24 sm:px-10 md:py-32 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div className="space-y-6">
            <Surtitre clair>Comme chez le coiffeur</Surtitre>
            <TitreRevele
              texte={"À quelle *heure ?*"}
              className="font-[family-name:var(--titres)] text-[clamp(3.4rem,9vw,8rem)] leading-[0.92] tracking-[-0.03em]"
              classeAccent={ACCENT_SOMBRE}
            />
            <p className="max-w-xl text-lg leading-relaxed text-[var(--sur-sombre)]/90">
              Choisis le jour et l&apos;heure de ton appel. On appelle à ce moment-là, pas avant, et seulement pour
              ton devis.
            </p>
          </div>
          <Apparition className="flex flex-col items-start gap-4 lg:items-end" delai={200}>
            <Bouton href={`${DOSSIER}/rendez-vous`}>Choisir mon heure</Bouton>
            <p className="text-[15px] text-[var(--sur-sombre)]/90">
              Ou appelle-nous : <span className="whitespace-nowrap font-semibold tabular-nums">{entreprise.telephone}</span>
            </p>
          </Apparition>
        </div>
      </div>
    </section>
  );
}
