import Link from "next/link";
import Apparition from "../../_kit/Apparition";
import FondVivant from "../../_kit/FondVivant";
import PhotoCinema from "../../_kit/PhotoCinema";
import TitreRevele from "../../_kit/TitreRevele";
import { CONTACT, DOSSIER } from "./donnees";

// La langue visuelle d'Ombre Lente : le temps long. Un romain fin et son italique
// (Instrument Serif), des années en chiffres immenses, la nuit verte d'un sous-bois et
// l'or d'une lumière de fin de journée, des photos aux grands arrondis comme une
// couronne d'arbre.

/** Le monogramme « OL » dans un cercle, et le nom. */
export function Marque() {
  return (
    <span className="flex items-center gap-2.5">
      <span aria-hidden="true" className="grid h-9 w-9 place-items-center rounded-full bg-[#D9A441] font-[family-name:var(--titres)] text-[16px] italic text-[#16291F]">
        OL
      </span>
      <span className="whitespace-nowrap font-[family-name:var(--titres)] text-[22px] leading-none">
        Ombre <span className="italic">Lente</span>
      </span>
    </span>
  );
}

/** L'intitulé au-dessus d'un titre : une année, un filet, un mot. */
export function Surtitre({ children, annee, clair = false }: { children: React.ReactNode; annee?: string; clair?: boolean }) {
  return (
    <p className={`flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.22em] ${clair ? "text-[#D9A441]" : "text-[var(--accent-texte)]"}`}>
      {annee && <span className="font-[family-name:var(--titres)] text-[17px] normal-case italic tracking-normal">{annee}</span>}
      {annee && <span aria-hidden="true" className="h-px w-8 bg-current opacity-60" />}
      {children}
    </p>
  );
}

/** Un bouton-lien en pilule. */
export function Bouton({ href, children, variante = "or" }: { href: string; children: React.ReactNode; variante?: "or" | "vert" | "contour" }) {
  const styles = {
    or: "bg-[#D9A441] text-[#16291F]",
    vert: "bg-[var(--encre)] text-[var(--fond)]",
    contour: "border border-current/40 hover:bg-[color-mix(in_oklab,currentColor_10%,transparent)]",
  }[variante];
  return (
    <Link href={href} className={`group inline-flex min-h-13 items-center gap-3 rounded-full px-6 py-3 text-[16px] font-semibold transition-transform hover:scale-[1.02] ${styles}`}>
      {children}
      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
    </Link>
  );
}

/** Le haut de chaque page intérieure : la nuit du sous-bois, une photo qui respire. */
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
  photo: { src: string };
  origine?: string;
}) {
  return (
    <section className="kit-grain relative isolate overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
      <PhotoCinema src={photo.src} alt="" priority origine={origine} className="opacity-55" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(22,41,31,0.6)_0%,rgba(22,41,31,0.7)_50%,rgba(22,41,31,0.96)_100%)]" />
      <div className="relative mx-auto max-w-7xl space-y-7 px-5 pb-16 pt-40 sm:px-8 md:pb-24 md:pt-52">
        <Apparition><Surtitre clair>{surtitre}</Surtitre></Apparition>
        <TitreRevele
          as="h1"
          auChargement
          texte={titre}
          className="max-w-5xl text-[clamp(3.4rem,8.5vw,8rem)] leading-[0.92] tracking-[-0.02em]"
          classeAccent="italic text-[#D9A441]"
        />
        {children && (
          <Apparition delai={400} className="max-w-2xl text-xl leading-relaxed">
            {children}
          </Apparition>
        )}
      </div>
    </section>
  );
}

/** Le dernier écran : la devise, sur le fond animé du sous-bois. */
export function AppelFinal() {
  return (
    <section className="px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <FondVivant couleurs={["#16291F", "#2E5236", "#B8862A"]} vitesse={0.6} />
        <div className="absolute inset-0 bg-[var(--sombre)]/45" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-24 sm:px-10 md:py-32 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div className="space-y-6">
            <Surtitre clair annee="25 novembre">Le prochain rendez-vous</Surtitre>
            <TitreRevele
              texte="On plante. *Le temps fait le reste.*"
              className="text-[clamp(2.8rem,7vw,6.2rem)] leading-[0.95] tracking-[-0.02em]"
              classeAccent="italic text-[#D9A441]"
            />
            <p className="max-w-xl text-lg leading-relaxed">
              Commandé avant le 15 novembre, livré le 24, planté le 25 — avec tous les autres.
            </p>
          </div>
          <Apparition className="flex flex-col items-start gap-4 lg:items-end" delai={200}>
            <Bouton href={`${DOSSIER}/arbres`}>Choisir mon arbre</Bouton>
            <p className="text-[15px]">
              Ou par téléphone : <span className="font-semibold tabular-nums">{CONTACT.telephone}</span>
            </p>
          </Apparition>
        </div>
      </div>
    </section>
  );
}
