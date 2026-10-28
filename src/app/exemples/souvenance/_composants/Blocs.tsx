import Link from "next/link";
import Apparition from "../../_kit/Apparition";
import FondVivant from "../../_kit/FondVivant";
import PhotoCinema from "../../_kit/PhotoCinema";
import TitreRevele from "../../_kit/TitreRevele";
import { CONTACT, DOSSIER, PRIX, PROCHAIN, savonDe, type Lot } from "./donnees";

/** Le monogramme « S » dans une arche, comme un miroir d'armoire, et le nom. */
export function Marque() {
  return (
    <span className="flex items-center gap-2.5">
      <span aria-hidden="true" className="grid h-9 w-7 place-items-center rounded-t-full rounded-b-[4px] bg-[var(--accent)] pt-1 font-[family-name:var(--titres)] text-[19px] italic text-[var(--sur-accent)]">
        S
      </span>
      <span className="whitespace-nowrap font-[family-name:var(--titres)] text-[21px] tracking-[0.01em]">Souvenance</span>
    </span>
  );
}

/** Le petit intitulé au-dessus d'un titre : un filet, des capitales espacées. */
export function Surtitre({ children, clair = false }: { children: React.ReactNode; clair?: boolean }) {
  return (
    <p className={`flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.3em] ${clair ? "text-[var(--sur-sombre)]" : "text-[var(--accent-texte)]"}`}>
      <span aria-hidden="true" className={`h-px w-9 ${clair ? "bg-[#E8C4BC]" : "bg-[var(--accent-texte)]"}`} />
      {children}
    </p>
  );
}

/** Un bouton-lien en pilule, avec sa flèche qui avance au survol. */
export function Bouton({ href, children, variante = "plein" }: { href: string; children: React.ReactNode; variante?: "plein" | "contour" | "clair" | "encre" }) {
  const styles = {
    plein: "bg-[var(--accent)] text-[var(--sur-accent)]",
    contour: "border border-current/40 hover:bg-[color-mix(in_oklab,currentColor_10%,transparent)]",
    clair: "bg-[var(--fond)] text-[var(--encre)]",
    encre: "bg-[var(--encre)] text-[var(--fond)]",
  }[variante];
  return (
    <Link href={href} className={`group inline-flex min-h-13 items-center gap-3 rounded-full px-7 py-3 text-[16px] font-semibold transition-transform hover:scale-[1.02] ${styles}`}>
      {children}
      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
    </Link>
  );
}

/**
 * L'étiquette d'un savon, avec ce que demande l'article 19 du règlement (CE)
 * n° 1223/2009. Une information, pas un argument : toutes les marques y sont tenues.
 */
export function Etiquette({ lot }: { lot: Lot }) {
  const s = savonDe(lot.savon);
  return (
    <div className="relative mx-auto w-full max-w-[380px] rounded-[6px] border border-[#D9C9B6] bg-[#FFFBF5] p-6 text-[#3E2532] shadow-[0_24px_50px_-34px_rgba(42,24,32,0.7)]" data-film="etiquette">
      <p className="text-center text-[11px] font-semibold uppercase tracking-[0.34em]">Souvenance</p>
      <p className="mt-1 text-center font-[family-name:var(--titres)] text-[26px] italic leading-tight">{s.nom}</p>
      <p className="mt-1 text-center text-[13px]">Savon pour les mains et le corps · 100 g</p>
      <div className="mt-4 space-y-2 border-t border-[#D9C9B6] pt-3 text-[13px] leading-snug">
        <p>À utiliser de préférence avant fin {lot.ddm}</p>
        <p className="inline-block rounded-full border-2 border-[#3E2532] px-3 py-0.5 font-semibold tabular-nums">Lot {lot.numero}</p>
        <p><span className="font-semibold">Ingredients :</span> {s.inci}</p>
        <p>Éviter le contact avec les yeux.</p>
        <p>Personne responsable : Souvenance, 12 rue de l&apos;Exemple · exemple</p>
      </div>
    </div>
  );
}

/** Le dernier écran de chaque page : le prochain lot, sur le fond animé de la marque. */
export function AppelFinal() {
  const s = savonDe(PROCHAIN.savon);
  return (
    <section className="px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <FondVivant couleurs={["#2A1820", "#5B3447", "#8E6F9E"]} vitesse={0.8} />
        <div className="absolute inset-0 bg-[var(--sombre)]/50" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-24 sm:px-10 md:py-32 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div className="space-y-6">
            <Surtitre clair>Le prochain lot</Surtitre>
            <TitreRevele
              texte={`Le lot ${PROCHAIN.numero} sort *${PROCHAIN.sortie}.*`}
              className="font-[family-name:var(--titres)] text-[clamp(3rem,7.5vw,6.8rem)] leading-[0.95] tracking-[-0.02em]"
              classeAccent="italic text-[#E8C4BC]"
            />
            <p className="max-w-xl text-lg leading-relaxed text-[var(--sur-sombre)]/90">
              {PROCHAIN.savons} savons « {s.nom} », coulés le {PROCHAIN.coule.replace(" 2026", "")}. Réserve le tien : il
              part le jour où il sort du séchoir.
            </p>
          </div>
          <Apparition className="flex flex-col items-start gap-4 lg:items-end" delai={200}>
            <Bouton href={`${DOSSIER}/sechoir#reserver`}>Réserver dans le lot {PROCHAIN.numero}</Bouton>
            <p className="text-[15px] text-[var(--sur-sombre)]/90">
              {PRIX} € TTC le savon, exemple · <span className="tabular-nums">{CONTACT.telephone}</span>
            </p>
          </Apparition>
        </div>
      </div>
    </section>
  );
}

/**
 * Le haut de chaque page intérieure : sombre comme l'accueil (l'en-tête flottant
 * l'attend), une photo qui respire derrière le titre, ou le fond animé.
 * `titreEnParagraphe` : quand la page porte déjà son propre h1 (les mentions).
 */
export function EnTetePage({
  surtitre,
  titre,
  children,
  photo,
  titreEnParagraphe = false,
}: {
  surtitre: React.ReactNode;
  titre: string;
  children?: React.ReactNode;
  photo?: { src: string; alt: string };
  titreEnParagraphe?: boolean;
}) {
  return (
    <section className="kit-grain relative isolate overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
      {photo ? (
        <>
          <PhotoCinema src={photo.src} alt="" priority className="opacity-50" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(42,24,32,0.55)_0%,rgba(42,24,32,0.72)_55%,rgba(42,24,32,0.96)_100%)]" />
        </>
      ) : (
        <>
          <FondVivant couleurs={["#2A1820", "#4A2E3A", "#6E5A86"]} vitesse={0.7} />
          <div className="absolute inset-0 bg-[var(--sombre)]/55" />
        </>
      )}
      <div className="relative mx-auto max-w-7xl space-y-7 px-5 pb-16 pt-40 sm:px-8 md:pb-24 md:pt-48">
        <Apparition><Surtitre clair>{surtitre}</Surtitre></Apparition>
        <TitreRevele
          as={titreEnParagraphe ? "p" : "h1"}
          auChargement
          texte={titre}
          className="max-w-5xl font-[family-name:var(--titres)] text-[clamp(3.2rem,8vw,7.4rem)] leading-[0.95] tracking-[-0.02em]"
          classeAccent="italic text-[#E8C4BC]"
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
