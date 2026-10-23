import Image from "next/image";
import Link from "next/link";
import Apparition from "../../_kit/Apparition";
import FondVivant from "../../_kit/FondVivant";
import TitreRevele from "../../_kit/TitreRevele";
import Marque from "./Marque";
import { DOSSIER, entreprise, type Photo } from "./donnees";

/** La bulle au « S » qui ne soupire pas, et le nom. */
export function NomMarque() {
  return (
    <span className="flex items-center gap-2.5">
      <Marque taille={36} />
      <span className="whitespace-nowrap font-[family-name:var(--titres)] text-[20px] font-bold tracking-[-0.02em]">Sans Soupir</span>
    </span>
  );
}

/** L'intitulé au-dessus d'un titre : une pastille ronde et pleine. */
export function Surtitre({ children, clair = false }: { children: React.ReactNode; clair?: boolean }) {
  return (
    <p className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[14px] font-bold ${clair ? "bg-[var(--fond)] text-[var(--encre)]" : "bg-[var(--sombre)] text-[var(--sur-sombre)]"}`}>
      <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[var(--accent)]" />
      {children}
    </p>
  );
}

/** Un gros bouton-lien, bien rond, qu'on ne rate pas. */
export function Bouton({ href, children, variante = "plein" }: { href: string; children: React.ReactNode; variante?: "plein" | "sombre" | "contour" | "clair" }) {
  const style = {
    plein: "bg-[var(--accent)] text-[var(--sur-accent)]",
    sombre: "bg-[var(--sombre)] text-[var(--sur-sombre)]",
    contour: "border-[3px] border-current",
    clair: "bg-[var(--fond)] text-[var(--encre)]",
  }[variante];
  return (
    <Link href={href} className={`group inline-flex min-h-14 items-center justify-center gap-3 rounded-full px-7 py-3 text-[18px] font-bold transition-transform hover:-translate-y-0.5 ${style}`}>
      {children}
      <span aria-hidden="true" className="grid h-7 w-7 place-items-center rounded-full bg-current/15 transition-transform duration-300 group-hover:translate-x-1">→</span>
    </Link>
  );
}

/**
 * Le haut de chaque page intérieure : un aplat de couleur franche (celle de la porte),
 * un titre énorme révélé mot à mot, et une photo arrondie qui se découvre.
 */
export function EnTetePage({
  surtitre,
  titre,
  children,
  photo,
  teinte = "#FCE7BF",
  film,
  aside,
}: {
  surtitre: string;
  titre: string;
  children?: React.ReactNode;
  photo?: Photo;
  teinte?: string;
  film?: string;
  aside?: React.ReactNode;
}) {
  return (
    <section data-film={film} className="relative overflow-hidden text-[var(--encre)]" style={{ background: teinte }}>
      <div className={`relative mx-auto grid max-w-7xl gap-12 px-5 pb-16 pt-32 sm:px-8 md:pb-24 md:pt-40 ${photo || aside ? "lg:grid-cols-[1.1fr_0.9fr] lg:items-center" : ""}`}>
        <div className="space-y-7">
          <Apparition><Surtitre>{surtitre}</Surtitre></Apparition>
          <TitreRevele
            as="h1"
            auChargement
            texte={titre}
            className="max-w-5xl text-[clamp(3.2rem,8.5vw,7.8rem)] font-extrabold leading-[0.92] tracking-[-0.045em]"
            classeAccent="text-[var(--sombre)] underline decoration-[var(--accent)] decoration-[0.09em] underline-offset-[0.12em]"
          />
          {children && (
            <Apparition delai={400} className="max-w-xl text-[21px] leading-relaxed">
              {children}
            </Apparition>
          )}
        </div>
        {aside ??
          (photo && (
            <Apparition de="rideau" delai={250} className="relative mx-auto aspect-[4/5] w-full max-w-[440px] overflow-hidden rounded-[3rem] rounded-tr-[10rem] shadow-[0_40px_80px_-40px_rgba(34,50,61,.6)]">
              <Image src={photo.src} alt={photo.alt} fill priority sizes="(min-width: 1024px) 440px, 90vw" className="kit-cinema-img object-cover" />
            </Apparition>
          ))}
      </div>
    </section>
  );
}

/** Le dernier écran de chaque page : sur le fond vivant, le téléphone et les deux portes. */
export function AppelFinal() {
  return (
    <section className="px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="relative isolate overflow-hidden rounded-[3rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <FondVivant couleurs={["#2F4858", "#3F6377", "#C98A1E"]} vitesse={0.8} />
        <div className="absolute inset-0 bg-[var(--sombre)]/45" />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-24 sm:px-10 md:py-32 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
          <div className="space-y-6">
            <Surtitre clair>Du lundi au samedi</Surtitre>
            <TitreRevele
              texte={"Tu peux *répéter\u202f?*"}
              className="text-[clamp(3.4rem,9vw,8rem)] font-extrabold leading-[0.92] tracking-[-0.045em]"
              classeAccent="text-[var(--accent)]"
            />
            <p className="max-w-xl text-[21px] leading-relaxed">
              Oui. Autant de fois qu&apos;il faut, sans soupirer. Et le dimanche, ton téléphone ne
              sonne plus pour l&apos;imprimante.
            </p>
          </div>
          <Apparition delai={200} className="flex flex-col items-start gap-3 lg:items-end">
            <Bouton href={`${DOSSIER}/cours-a-domicile`}>Je veux apprendre</Bouton>
            <Bouton href={`${DOSSIER}/c-est-casse`} variante="contour">C&apos;est cassé</Bouton>
            <p className="pt-2 text-[17px]">
              Ou au téléphone : <span className="whitespace-nowrap font-bold">{entreprise.telephone}</span>
            </p>
          </Apparition>
        </div>
      </div>
    </section>
  );
}
