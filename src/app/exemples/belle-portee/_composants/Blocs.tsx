import Link from "next/link";
import Apparition from "../../_kit/Apparition";
import Creneaux from "../../_kit/Creneaux";
import FondVivant from "../../_kit/FondVivant";
import PhotoCinema from "../../_kit/PhotoCinema";
import TitreRevele from "../../_kit/TitreRevele";
import { CRENEAUX, DOSSIER, VERIFICATIONS, bureau } from "./donnees";

/** Le quadrillage d'un plan, très léger, sur le plâtre. Un fond, rien d'autre. */
export const PLAN = "bg-[linear-gradient(rgba(30,42,56,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(30,42,56,0.07)_1px,transparent_1px)] bg-[size:32px_32px]";

/** Le monogramme : un P posé sur une poutre, dans un carré jaune. */
export function Marque() {
  return (
    <span className="flex items-center gap-2.5">
      <span aria-hidden="true" className="relative grid h-9 w-9 place-items-center bg-[var(--accent)] font-[family-name:var(--titres)] text-lg font-black text-[var(--sur-accent)]">
        P
        <span className="absolute inset-x-1 bottom-1 h-[3px] bg-[var(--sur-accent)]" />
      </span>
      <span className="whitespace-nowrap font-[family-name:var(--titres)] text-[17px] font-bold uppercase tracking-[0.04em]">Belle Portée</span>
    </span>
  );
}

/** Le petit intitulé au-dessus d'un titre : un carré jaune, des capitales espacées. */
export function Surtitre({ children, clair = false }: { children: React.ReactNode; clair?: boolean }) {
  return (
    <p className={`flex items-center gap-2.5 text-[12px] font-bold uppercase tracking-[0.2em] ${clair ? "text-[#F2B134]" : "text-[var(--accent-texte)]"}`}>
      <span aria-hidden="true" className="h-2.5 w-2.5 bg-[var(--accent)]" />
      {children}
    </p>
  );
}

/** Une cote de plan : une ligne, deux flèches, une mesure au milieu. Décorative. */
export function Cote({ texte, className = "", clair = false }: { texte: string; className?: string; clair?: boolean }) {
  const c = clair ? "text-[#F2B134]" : "text-[var(--encre)]";
  return (
    <div aria-hidden="true" className={`flex items-center gap-2 ${c} ${className}`}>
      <span className="h-3 w-px bg-current" />
      <span className="text-[11px] leading-none">◀</span>
      <span className="h-px flex-1 bg-current" />
      <span className="font-[family-name:var(--titres)] text-[13px] font-bold tracking-[0.08em]">{texte}</span>
      <span className="h-px flex-1 bg-current" />
      <span className="text-[11px] leading-none">▶</span>
      <span className="h-3 w-px bg-current" />
    </div>
  );
}

/** Un bouton-lien à angles droits, filet de 2 px. */
export function Bouton({ href, children, variante = "plein" }: { href: string; children: React.ReactNode; variante?: "plein" | "encre" | "contour" }) {
  const styles = {
    plein: "border-2 border-[var(--encre)] bg-[var(--accent)] text-[var(--sur-accent)]",
    encre: "border-2 border-[var(--encre)] bg-[var(--encre)] text-[#F2B134]",
    contour: "border-2 border-current",
  }[variante];
  return (
    <Link href={href} className={`group inline-flex min-h-13 items-center gap-3 px-5 py-3 text-[14px] font-bold uppercase tracking-[0.1em] transition-transform hover:-translate-y-0.5 ${styles}`}>
      {children}
      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
    </Link>
  );
}

/** Le haut de chaque page intérieure : le plâtre quadrillé, une photo encadrée qui respire. */
export function EnTetePage({
  surtitre,
  titre,
  children,
  photo,
  cote,
}: {
  surtitre: string;
  titre: string;
  children?: React.ReactNode;
  photo: { src: string };
  cote?: string;
}) {
  return (
    <section className={`relative border-b-2 border-[var(--encre)] ${PLAN}`}>
      <div className="mx-auto grid min-h-[64svh] max-w-7xl gap-8 px-4 pb-12 pt-28 sm:px-8 md:pt-32 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <div className="space-y-6">
          <Apparition><Surtitre>{surtitre}</Surtitre></Apparition>
          <TitreRevele
            as="h1"
            auChargement
            texte={titre}
            className="font-black uppercase text-[clamp(2.8rem,7.5vw,6.6rem)] leading-[0.9] tracking-[-0.02em]"
            classeAccent="text-[var(--accent-texte)]"
          />
          {children && (
            <Apparition delai={400} className="max-w-xl text-lg leading-relaxed">
              {children}
            </Apparition>
          )}
          {cote && <Cote texte={cote} className="max-w-md" />}
        </div>
        <Apparition de="rideau" delai={200} className="relative hidden aspect-[4/3] border-2 border-[var(--encre)] bg-[var(--sombre)] lg:block">
          <PhotoCinema src={photo.src} alt="" priority />
        </Apparition>
      </div>
    </section>
  );
}

/** Les trois vérifications de la visite, numérotées comme sur un plan. */
export function Verifications() {
  return (
    <ol className="border-2 border-[var(--encre)] bg-[var(--carte)]">
      {VERIFICATIONS.map((v, i) => (
        <Apparition as="li" key={v.titre} delai={i * 120} className="flex gap-4 border-b-2 border-[var(--encre)] p-5 last:border-b-0">
          <span className="grid h-11 w-11 shrink-0 place-items-center bg-[var(--encre)] font-[family-name:var(--titres)] text-lg font-black text-[#F2B134]">{i + 1}</span>
          <span className="space-y-1">
            <span className="block font-[family-name:var(--titres)] text-xl font-bold uppercase">{v.titre}</span>
            <span className="block leading-relaxed text-[var(--doux)]">{v.texte}</span>
          </span>
        </Apparition>
      ))}
    </ol>
  );
}

/** Le choix de la date de visite : les créneaux du kit, aux couleurs du bureau. */
export function DateDeVisite() {
  return (
    <div data-film="creneaux">
      <Creneaux
        creneaux={CRENEAUX}
        colonnes={3}
        titreCarte="Ta visite"
        bouton="Choisir cette date"
        confirmation="Visite : {creneau}"
        note="Créneaux d'exemple pour la semaine prochaine ; ceux marqués « Pris » sont inventés."
      />
    </div>
  );
}

/** L'affiche du lancement, au rayon des masses. Une image : la phrase est dite à côté. */
export function Affiche() {
  return (
    <div aria-hidden="true" className="mx-auto w-full max-w-[320px] rotate-[-3deg] border-2 border-[#1E2A38] bg-[#1E2A38] p-8 text-[#F3EEE4] shadow-[0_40px_60px_-30px_rgba(30,42,56,.9)]">
      <p className="font-[family-name:var(--titres)] text-[52px] font-black uppercase leading-[0.9]">Avant la masse,</p>
      <p className="mt-1 font-[family-name:var(--titres)] text-[52px] font-black uppercase leading-[0.9] text-[#F2B134]">le calcul.</p>
      <p className="mt-10 text-[11px] font-bold uppercase tracking-[0.18em]">Belle Portée · bureau d&apos;études structure</p>
    </div>
  );
}

/** Le mur de la semaine : avant, après, et la poutre qui le remplace (dessin). */
export function MurDeLaSemaine() {
  return (
    <div aria-hidden="true" className="grid grid-cols-2 border-2 border-[var(--encre)]">
      {[false, true].map((apres) => (
        <div key={String(apres)} className={`relative aspect-[3/4] overflow-hidden ${apres ? "border-l-2 border-[var(--encre)]" : ""}`}>
          <div className="absolute inset-0 bg-[#EFE8DA]" />
          {apres ? (
            <>
              <div className="absolute inset-x-[14%] bottom-[8%] top-[30%] bg-[#C9D6DE]" />
              <div className="absolute inset-x-[16%] bottom-[8%] h-[16%] bg-[#FBF8F2]" />
              <div className="absolute inset-x-[10%] top-[24%] h-[6%] bg-[#1E2A38]" />
            </>
          ) : (
            <div className="absolute bottom-[8%] left-1/2 h-[46%] w-[26%] -translate-x-1/2 bg-[#8A6A4A]" />
          )}
          <div className="absolute inset-x-0 bottom-0 h-[8%] bg-[#D9CDB7]" />
          <span className="absolute left-2 top-2 bg-[#1E2A38] px-2 py-0.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#F2B134]">{apres ? "Après" : "Avant"}</span>
        </div>
      ))}
    </div>
  );
}

/** Le dernier écran de chaque page : sur le fond animé, les deux portes du cabinet. */
export function AppelFinal() {
  return (
    <section className="p-3 sm:p-5">
      <div className="relative isolate overflow-hidden border-2 border-[var(--encre)] bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <FondVivant couleurs={["#1E2A38", "#2E3D52", "#9A6A14"]} />
        <div className="absolute inset-0 bg-[var(--sombre)]/45" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-24 sm:px-10 md:py-32 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div className="space-y-6">
            <Surtitre clair>Avant d&apos;agir</Surtitre>
            <TitreRevele
              texte="Avant la masse, *le calcul.* Avant la clôture, *la borne.*"
              className="font-black uppercase text-[clamp(2.4rem,6vw,5.2rem)] leading-[0.92] tracking-[-0.01em]"
              classeAccent="text-[#F2B134]"
            />
            <Cote texte="OUVREZ GRAND" clair className="max-w-md" />
          </div>
          <Apparition className="flex flex-col items-start gap-3 lg:items-end" delai={200}>
            <Bouton href={`${DOSSIER}/mon-mur`}>Mon mur en photo</Bouton>
            <Bouton href={`${DOSSIER}/prix`} variante="contour">Le prix d&apos;un bornage</Bouton>
            <p className="pt-2 text-[15px] text-[var(--sur-sombre)]/90">
              Ou au téléphone : <a href={`tel:${bureau.telephoneLien}`} className="font-bold tabular-nums underline underline-offset-4">{bureau.telephone}</a>
            </p>
          </Apparition>
        </div>
      </div>
    </section>
  );
}
