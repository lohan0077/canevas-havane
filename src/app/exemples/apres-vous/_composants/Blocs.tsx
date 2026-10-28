import Link from "next/link";
import Apparition from "../../_kit/Apparition";
import FondVivant from "../../_kit/FondVivant";
import PhotoCinema from "../../_kit/PhotoCinema";
import TitreRevele from "../../_kit/TitreRevele";
import { DOSSIER, entreprise } from "./donnees";

/** Le monogramme « AV » dans un cercle d'or, et le nom. */
export function Marque() {
  return (
    <span className="flex items-center gap-2.5">
      <span aria-hidden="true" className="grid h-9 w-9 place-items-center rounded-full border border-[var(--accent)] font-[family-name:var(--titres)] text-[15px] italic tracking-[0.04em] text-[var(--accent)]">
        AV
      </span>
      <span className="whitespace-nowrap font-[family-name:var(--titres)] text-[22px] leading-none">Après Vous</span>
    </span>
  );
}

/** L'intitulé au-dessus d'un titre : un filet d'or, des petites capitales espacées. */
export function Surtitre({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.2em] text-[var(--accent-texte)] sm:tracking-[0.3em] ${className}`}>
      <span aria-hidden="true" className="h-px w-10 bg-[var(--accent)]" />
      {children}
    </p>
  );
}

/** Un bouton-lien rectangulaire, coins à peine adoucis : la maison est sobre. */
export function Bouton({ href, children, variante = "plein" }: { href: string; children: React.ReactNode; variante?: "plein" | "filet" }) {
  const styles = {
    plein: "bg-[var(--accent)] text-[var(--sur-accent)] hover:bg-[#F2C46A]",
    filet: "border border-current/40 hover:border-[var(--accent)]",
  }[variante];
  return (
    <Link href={href} className={`group inline-flex min-h-13 items-center gap-4 rounded-[6px] px-6 py-3 text-[15px] font-semibold tracking-[0.02em] transition-colors ${styles}`}>
      {children}
      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
    </Link>
  );
}

/** Le titre en grand, l'italique d'Instrument Serif pour le mot qui compte. */
export const ACCENT = "italic text-[var(--accent-texte)]";

/**
 * Le haut de chaque page intérieure : la nuit, une photo qui respire derrière un voile
 * épais, et le titre révélé à l'arrivée.
 */
export function EnTetePage({
  surtitre,
  titre,
  children,
  photo,
  origine,
}: {
  surtitre: string;
  titre: string;
  children?: React.ReactNode;
  photo: { src: string };
  origine?: string;
}) {
  return (
    <section className="kit-grain relative isolate overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
      <PhotoCinema src={photo.src} alt="" priority origine={origine} className="opacity-45" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,18,34,0.7)_0%,rgba(11,18,34,0.55)_45%,#0B1222_100%)]" />
      <div className="relative mx-auto max-w-6xl space-y-7 px-5 pb-16 pt-40 sm:px-8 md:pb-24 md:pt-52">
        <Apparition><Surtitre>{surtitre}</Surtitre></Apparition>
        <TitreRevele
          as="h1"
          auChargement
          texte={titre}
          className="max-w-5xl font-[family-name:var(--titres)] text-[clamp(3.4rem,9vw,8rem)] font-normal leading-[0.92] tracking-[-0.02em]"
          classeAccent={ACCENT}
        />
        {children && (
          <Apparition delai={450} className="max-w-2xl text-lg leading-relaxed text-[var(--sur-sombre)]/90 md:text-xl">
            {children}
          </Apparition>
        )}
      </div>
    </section>
  );
}

/** Le petit mot laissé chaque matin sur le bureau de l'accueil. Signé : l'équipe du soir. */
export function PetitMot({ className = "" }: { className?: string }) {
  return (
    <figure data-film="petit-mot" className={`mx-auto w-full max-w-[340px] rotate-[-3deg] border-t-[12px] border-[#6FB7A8] bg-[#FFFDF6] p-7 text-[#121C33] shadow-[0_40px_60px_-24px_rgba(0,0,0,.7)] ${className}`}>
      <p className="text-[13px] font-semibold uppercase tracking-[0.28em]">Après Vous</p>
      <p className="mt-6 font-[family-name:var(--titres)] text-[34px] italic leading-tight">
        Passé à 20&nbsp;h&nbsp;12.
        <br />
        Bonne journée&nbsp;!
      </p>
      <figcaption className="mt-6 text-right font-[family-name:var(--titres)] text-2xl italic">— L&apos;équipe du soir</figcaption>
    </figure>
  );
}

/** L'affiche du lancement, pour les halls de bureaux. */
export function Affiche({ className = "" }: { className?: string }) {
  return (
    <figure className={`mx-auto w-full max-w-[340px] rotate-[3deg] border border-[var(--trait)] bg-[#0B1222] p-8 text-[#F5F1E8] shadow-[0_40px_60px_-30px_rgba(0,0,0,.8)] ${className}`}>
      <p className="font-[family-name:var(--titres)] text-[46px] leading-[1.02]">
        Vous ne nous verrez <span className="italic text-[#E9B44C]">jamais.</span>
      </p>
      <p className="mt-14 text-xs font-semibold uppercase tracking-[0.24em]">Après Vous · nettoyage de bureaux</p>
    </figure>
  );
}

/** Le dernier écran de chaque page : les clés, sur le fond animé de la nuit. */
export function AppelFinal() {
  return (
    <section className="px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="kit-grain relative isolate overflow-hidden rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <FondVivant couleurs={["#0B1222", "#1F3466", "#8A6420"]} />
        <div className="absolute inset-0 bg-[#0B1222]/45" />
        <div className="relative mx-auto max-w-5xl space-y-8 px-6 py-24 text-center sm:px-10 md:py-36">
          <Apparition className="flex justify-center"><Surtitre>Un devis, après une visite</Surtitre></Apparition>
          <TitreRevele
            texte={"Vous nous confieriez *vos clés ?*"}
            className="mx-auto max-w-4xl font-[family-name:var(--titres)] text-[clamp(3rem,8vw,7rem)] font-normal leading-[0.95]"
            classeAccent={ACCENT}
          />
          <Apparition as="p" delai={200} className="mx-auto max-w-xl text-lg leading-relaxed text-[var(--sur-sombre)]/90">
            Une visite de vos bureaux, un soir ou un matin, et un devis avec le prix ferme, hors taxes.
          </Apparition>
          <Apparition delai={300} className="flex flex-wrap justify-center gap-3">
            <Bouton href={`${DOSSIER}/prix`}>Votre prix, tout de suite</Bouton>
            <Bouton href={`${DOSSIER}/rapport-de-passage`} variante="filet">Voir un rapport du soir</Bouton>
          </Apparition>
          <p className="text-[15px] text-[var(--sur-sombre)]/90">
            Ou par téléphone : <span className="font-semibold tabular-nums">{entreprise.telephone}</span> · du lundi au vendredi, 9 h – 18 h. Le soir, on travaille.
          </p>
        </div>
      </div>
    </section>
  );
}
