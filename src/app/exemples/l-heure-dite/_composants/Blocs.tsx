import Image from "next/image";
import Link from "next/link";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { DOSSIER, FRANCE_RENOV, entreprise } from "./donnees";

// Les pièces communes de L'Heure Dite, version « carrée » (24/10/2026) : une seule
// échelle de texte, une grille, deux fonds qui alternent (le papier crème, le vert
// profond), l'orange du soleil réservé au bouton principal et aux mots en relief.

/** Le mot en relief dans un titre : l'italique de la didone, couleur de soleil. */
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
      <a href={FRANCE_RENOV.lien} rel="noopener noreferrer" className="mx-auto block max-w-6xl px-6 py-3 text-[14px] leading-snug sm:text-center">
        <span className="font-medium">France Rénov&apos;</span>
        <span aria-hidden="true"> · </span>
        <span className="underline underline-offset-2">{FRANCE_RENOV.message}</span>
      </a>
    </div>
  );
}

/** Le petit intitulé au-dessus d'un titre : une ligne discrète, en capitales espacées. */
export function Surtitre({ children, clair = false }: { children: React.ReactNode; clair?: boolean }) {
  return (
    <p className={`text-[12px] font-medium uppercase tracking-[0.2em] ${clair ? "text-[var(--sur-sombre)]" : "text-[var(--doux)]"}`}>
      {children}
    </p>
  );
}

/** Le titre d'un écran, révélé mot à mot ; `*mot*` passe en italique, couleur de soleil. */
export function Titre({
  texte,
  clair = false,
  taille = "grand",
  as = "h2",
  className = "",
}: {
  texte: string;
  clair?: boolean;
  taille?: "geant" | "grand" | "moyen";
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
}) {
  const tailles = {
    geant: "text-[clamp(2.75rem,6vw,5.25rem)] leading-[1]",
    grand: "text-[clamp(2.25rem,4.4vw,3.75rem)] leading-[1.05]",
    moyen: "text-[clamp(1.9rem,3.2vw,2.75rem)] leading-[1.1]",
  }[taille];
  return (
    <TitreRevele
      as={as}
      texte={texte}
      className={`font-[family-name:var(--titres)] font-normal tracking-[-0.02em] text-balance ${tailles} ${className}`}
      classeAccent={clair ? ACCENT_SOMBRE : ACCENT_CLAIR}
    />
  );
}

/** Un bouton-lien en pilule : plein (l'orange) ou en contour fin ; la flèche avance au survol. */
export function Bouton({ href, children, variante = "plein" }: { href: string; children: React.ReactNode; variante?: "plein" | "contour" | "clair" }) {
  const styles = {
    plein: "bg-[var(--accent)] text-[var(--sur-accent)]",
    contour: "border border-current/30 hover:bg-[color-mix(in_oklab,currentColor_8%,transparent)]",
    clair: "bg-[var(--fond)] text-[var(--encre)]",
  }[variante];
  return (
    <Link href={href} className={`group inline-flex h-12 items-center gap-3 rounded-full px-6 text-[15px] font-medium transition-colors ${styles}`}>
      {children}
      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
    </Link>
  );
}

/** Le cadre d'un outil : une barre fine, le cadran, le nom de l'écran. */
export function Appli({ titre, note, children, className = "" }: { titre: string; note: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-[var(--trait)] bg-[var(--carte)] text-[var(--encre)] shadow-[0_40px_90px_-50px_rgba(24,48,31,0.55)] ${className}`}>
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

/**
 * Le haut de chaque page intérieure : sombre, un titre fin, et derrière lui une photo
 * assez large pour le plein cadre (jamais agrandie) sous un voile vert ; sans photo, le
 * fond sombre seul.
 */
export function EnTetePage({
  surtitre,
  titre,
  children,
  photo,
  origine = "50% 50%",
}: {
  surtitre: React.ReactNode;
  titre: string;
  children?: React.ReactNode;
  photo?: { src: string; alt: string };
  origine?: string;
}) {
  return (
    <section className="relative isolate flex min-h-[64svh] flex-col overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
      {photo && (
        <>
          <Image src={photo.src} alt="" fill priority sizes="100vw" className="object-cover opacity-60" style={{ objectPosition: origine }} />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(24,48,31,0.6)_0%,rgba(24,48,31,0.45)_40%,rgba(24,48,31,0.95)_100%)]" />
        </>
      )}
      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col justify-end gap-7 px-6 pb-14 pt-36 md:pb-20">
        <Apparition><Surtitre clair>{surtitre}</Surtitre></Apparition>
        <Titre as="h1" texte={titre} clair taille="geant" className="max-w-4xl" />
        {children && (
          <Apparition delai={400} className="max-w-xl text-lg leading-relaxed text-[var(--sur-sombre)]">
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
    <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
      <div className="mx-auto grid max-w-6xl gap-14 px-6 py-28 md:py-40 lg:grid-cols-2 lg:items-end">
        <div className="space-y-6">
          <Apparition><Surtitre clair>La règle, pour tous</Surtitre></Apparition>
          <Titre texte="Pour ces travaux, personne n'a le droit de *te démarcher.*" clair />
          <Apparition as="p" delai={150} className="max-w-[26rem] text-lg leading-relaxed text-[var(--sur-sombre)]">
            Téléphone, SMS, e-mail, réseaux sociaux : la prospection d&apos;un particulier pour une pompe à chaleur ou des
            panneaux solaires est interdite à tous les professionnels, sauf contrat en cours (C. consom., art. L223-1 et
            L223-8). Ce n&apos;est pas notre mérite, c&apos;est la loi.
          </Apparition>
        </div>
        <Apparition delai={250} className="space-y-5 border-t border-white/20 pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
          <p className="font-[family-name:var(--titres)] text-[clamp(1.9rem,3.2vw,2.75rem)] leading-[1.1]">
            Tout le monde subit cette règle. Nous, on va <em className="text-[#F2B27A]">plus loin qu&apos;elle.</em>
          </p>
          <p className="max-w-[26rem] text-lg leading-relaxed text-[var(--sur-sombre)]">
            La loi permet de rappeler celui qui l&apos;a demandé, dans les cinq jours ouvrables. Nous, on te laisse choisir
            le jour et l&apos;heure. Et on appelle à cette heure-là.
          </p>
        </Apparition>
      </div>
    </section>
  );
}

/** L'affiche du lancement, avec, en bas, le message France Rénov' que toute publicité porte depuis le 1er octobre 2026. */
export function Affiche() {
  return (
    <figure className="mx-auto max-w-md overflow-hidden rounded-2xl border border-[var(--trait)] bg-[var(--carte)] text-left shadow-[0_30px_60px_-40px_rgba(31,61,43,.55)]">
      <div className="p-7 sm:p-9">
        <p className="font-[family-name:var(--titres)] text-[44px] leading-[1.02] tracking-[-0.02em]">
          Vous choisissez <em className="text-[var(--accent-texte)]">l&apos;heure.</em>
        </p>
        <p className="mt-4 text-xl">On appelle à cette heure-là.</p>
        <p className="mt-6 text-sm leading-relaxed text-[var(--doux)]">
          Pour ces travaux, le démarchage est interdit à tous les professionnels (C. consom., art. L223-1 et L223-8).
        </p>
        <p className="mt-6 flex items-center gap-2 text-sm font-medium">
          <Monogramme className="h-7 w-7" /> L&apos;Heure Dite · pompes à chaleur et solaire
        </p>
      </div>
      <p className="bg-[#E3EEF3] px-7 py-4 text-[13px] leading-snug text-[#14324A] sm:px-9">{FRANCE_RENOV.message}</p>
    </figure>
  );
}

/** Le dernier écran de chaque page : clair, centré, un bouton. */
export function AppelFinal() {
  return (
    <section className="border-t border-[var(--trait)]">
      <div className="mx-auto max-w-3xl space-y-8 px-6 py-28 text-center md:py-40">
        <Apparition><Surtitre>Comme chez le coiffeur</Surtitre></Apparition>
        <Titre texte={"À quelle *heure ?*"} />
        <Apparition as="p" delai={150} className="mx-auto max-w-lg text-lg leading-relaxed text-[var(--doux)]">
          Choisis le jour et l&apos;heure de ton appel. On appelle à ce moment-là, pas avant, et seulement pour ton devis.
        </Apparition>
        <Apparition delai={250} className="flex flex-col items-center gap-4">
          <Bouton href={`${DOSSIER}/rendez-vous`}>Choisir mon heure</Bouton>
          <p className="text-[15px] text-[var(--doux)]">
            Ou appelle-nous : <span className="whitespace-nowrap font-medium tabular-nums text-[var(--encre)]">{entreprise.telephone}</span>
          </p>
        </Apparition>
      </div>
    </section>
  );
}
