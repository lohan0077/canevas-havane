import Image from "next/image";
import Link from "next/link";
import Apparition from "../../_kit/Apparition";
import { DOSSIER, FRANCE_RENOV, entreprise } from "./donnees";

// Les pièces communes de L'Heure Dite. Identité « faïence et émail » (30/10/2026), tirée
// de la photo de l'horloge : le blanc des carreaux, le vert d'émail du cadre et des
// frises, le noir des chiffres, une touche de rouge pour la trotteuse. Archivo, une
// grotesque de plaque émaillée, pour les titres ; Work Sans pour lire. Deux fonds qui
// alternent (le blanc faïence, le noir d'aiguille), le vert réservé au bouton principal,
// au cadran et à la frise d'émail, qui sépare les grands moments. Passe « frontend-design »
// (30/10/2026) : les titres se lisent d'un seul tenant, sans mot en vert ni surtitre en
// capitales ; un bouton dit ce qu'il fait, sans flèche.

/**
 * Le monogramme : l'horloge de la photo en miniature. Le cadre vert, le cadran blanc,
 * les deux aiguilles à midi et demi, la trotteuse rouge sur neuf heures.
 */
export function Monogramme({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <circle cx="20" cy="20" r="19.5" fill="#2E7A32" />
      <circle cx="20" cy="20" r="19.5" fill="none" stroke="#1F5A23" strokeWidth="1" />
      <circle cx="20" cy="20" r="13.2" fill="#FFFFFF" stroke="#C9A55B" strokeWidth="1.1" />
      <path d="M20 20.5V9.6" stroke="#101512" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M20 19.5v12.2" stroke="#101512" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M21 20H9.2" stroke="#D8392B" strokeWidth="0.9" strokeLinecap="round" />
      <circle cx="20" cy="20" r="1.5" fill="#D8392B" />
    </svg>
  );
}

export function Marque() {
  return (
    <span className="flex items-center gap-2.5">
      <Monogramme className="h-9 w-9" />
      <span className="whitespace-nowrap font-[family-name:var(--titres)] text-[20px] font-extrabold tracking-[-0.03em]">L&apos;Heure Dite</span>
    </span>
  );
}

/**
 * La frise d'émail, celle des carreaux de la photo : une bande verte coupée de joints,
 * un filet de blanc, un liseré vert. Elle sépare les grands moments de la page.
 */
export function Lisere({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`relative ${className}`}>
      <div className="h-3 bg-[var(--accent)] [background-image:linear-gradient(90deg,rgba(255,255,255,0.6)_1.5px,transparent_1.5px),linear-gradient(180deg,rgba(255,255,255,0.22),transparent_45%,rgba(0,0,0,0.12))] [background-size:132px_100%,100%_100%]" />
      <div className="h-[5px] bg-[var(--fond)]" />
      <div className="h-1 bg-[var(--accent)] [background-image:linear-gradient(90deg,rgba(255,255,255,0.6)_1.5px,transparent_1.5px)] [background-size:66px_100%]" />
    </div>
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
        <span className="font-semibold">France Rénov&apos; :</span>{" "}
        <span className="underline underline-offset-2">{FRANCE_RENOV.message}</span>
      </a>
    </div>
  );
}

/**
 * Le titre d'un écran, d'un seul tenant : Archivo serrée, noire sur la faïence, claire sur
 * le noir (la couleur vient de la section). Le parti pris est la taille et la graisse, pas
 * un mot mis à part.
 */
export function Titre({
  texte,
  taille = "grand",
  as: Balise = "h2",
  className = "",
  id,
}: {
  texte: string;
  taille?: "geant" | "grand" | "moyen";
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  id?: string;
}) {
  const tailles = {
    geant: "text-[clamp(3rem,7vw,6.25rem)] leading-[0.92] font-extrabold tracking-[-0.045em]",
    grand: "text-[clamp(2.2rem,4.4vw,3.6rem)] leading-[1.02] font-bold tracking-[-0.035em]",
    moyen: "text-[clamp(1.8rem,3vw,2.5rem)] leading-[1.08] font-bold tracking-[-0.03em]",
  }[taille];
  return (
    <Balise id={id} className={`font-[family-name:var(--titres)] text-balance ${tailles} ${className}`}>
      {texte}
    </Balise>
  );
}

/** Un bouton-lien en pilule : plein (le vert d'émail), en contour fin, ou clair. */
export function Bouton({ href, children, variante = "plein" }: { href: string; children: React.ReactNode; variante?: "plein" | "contour" | "clair" }) {
  const styles = {
    plein: "bg-[var(--accent)] text-[var(--sur-accent)]",
    contour: "border border-current/30 hover:bg-[color-mix(in_oklab,currentColor_8%,transparent)]",
    clair: "bg-[var(--fond)] text-[var(--encre)]",
  }[variante];
  return (
    <Link href={href} className={`inline-flex h-12 items-center rounded-full px-6 text-[15px] font-medium transition-colors ${styles}`}>
      {children}
    </Link>
  );
}

/** Le cadre d'un outil : une barre fine, le cadran, le nom de l'écran. */
export function Appli({ titre, note, children, className = "" }: { titre: string; note: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-[1.4rem] border border-[var(--trait)] bg-[var(--carte)] text-[var(--encre)] shadow-[0_40px_90px_-50px_rgba(16,21,18,0.55)] ${className}`}>
      <div className="flex items-center justify-between gap-3 border-b border-[var(--trait)] px-5 py-3.5">
        <span className="flex items-center gap-2.5 font-[family-name:var(--titres)] text-lg font-bold tracking-[-0.02em]">
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
 * Le haut de chaque page intérieure : sombre, un grand titre, et derrière lui une photo
 * assez large pour le plein cadre (jamais agrandie) sous un voile vert ; sans photo, le
 * fond sombre seul. Le titre et sa phrase disent de quoi parle la page : pas d'intitulé
 * au-dessus.
 */
export function EnTetePage({
  titre,
  children,
  photo,
  origine = "50% 50%",
}: {
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
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,21,18,0.62)_0%,rgba(16,21,18,0.45)_40%,rgba(16,21,18,0.95)_100%)]" />
        </>
      )}
      {!photo && (
        // Sans photo, le mur de faïence de l'accueil, en négatif.
        <div aria-hidden="true" className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:84px_84px] [mask-image:linear-gradient(180deg,#000,transparent_85%)]" />
      )}
      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col justify-end gap-7 px-6 pb-14 pt-36 md:pb-20">
        <Titre as="h1" texte={titre} taille="geant" className="max-w-4xl" />
        {children && (
          <Apparition delai={400} className="max-w-xl text-lg leading-relaxed text-[var(--sur-sombre)]">
            {children}
          </Apparition>
        )}
      </div>
      <Lisere className="relative" />
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
          <Titre texte="Pour ces travaux, personne n'a le droit de te démarcher." />
          <Apparition as="p" delai={150} className="max-w-[26rem] text-lg leading-relaxed text-[var(--sur-sombre)]">
            Téléphone, SMS, e-mail, réseaux sociaux : la prospection d&apos;un particulier pour une pompe à chaleur ou des
            panneaux solaires est interdite à tous les professionnels, sauf contrat en cours (C. consom., art. L223-1 et
            L223-8). Ce n&apos;est pas notre mérite, c&apos;est la loi.
          </Apparition>
        </div>
        <Apparition delai={250} className="space-y-5 border-t border-white/20 pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
          <p className="font-[family-name:var(--titres)] text-[clamp(1.8rem,3vw,2.5rem)] font-bold leading-[1.08] tracking-[-0.03em]">
            Tout le monde subit cette règle. Nous, on va plus loin qu&apos;elle.
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
    <figure className="mx-auto max-w-md overflow-hidden rounded-[1.4rem] border border-[var(--trait)] bg-[var(--carte)] text-left shadow-[0_30px_60px_-40px_rgba(16,21,18,.55)]">
      <Lisere />
      <div className="p-7 sm:p-9">
        <p className="font-[family-name:var(--titres)] text-[44px] font-extrabold leading-[0.98] tracking-[-0.045em]">
          Vous choisissez l&apos;heure.
        </p>
        <p className="mt-4 text-xl">On appelle à cette heure-là.</p>
        <p className="mt-6 text-sm leading-relaxed text-[var(--doux)]">
          Pour ces travaux, le démarchage est interdit à tous les professionnels (C. consom., art. L223-1 et L223-8).
        </p>
        <p className="mt-6 flex items-center gap-2 text-sm font-medium">
          <Monogramme className="h-7 w-7" /> L&apos;Heure Dite, pompes à chaleur et solaire
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
        <Titre texte={"À quelle heure ?"} />
        <Apparition as="p" delai={150} className="mx-auto max-w-lg text-lg leading-relaxed text-[var(--doux)]">
          Comme chez le coiffeur : choisis le jour et l&apos;heure de ton appel. On appelle à ce moment-là, pas avant, et
          seulement pour ton devis.
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
