import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, Bouton, COINS, Surtitre } from "../_composants/Blocs";
import { DOSSIER, cabinet, reponse } from "../_composants/donnees";

// La page que la vidéo « Remplir l'agenda » filme : la réponse à la question que tout le
// monde tape, avec le diplôme dessous. Diététicien est un titre protégé par la loi.
export const metadata: Metadata = {
  title: "Diététicienne ou nutritionniste ? — Rayon Frais, site de démonstration",
  description:
    "La page d'une diététicienne imaginaire qui répond à « diététicienne ou nutritionniste ? », avec son diplôme dessous : diététicien est un titre protégé par la loi.",
  ...adressesDeLaPage("/exemples/rayon-frais/dieteticienne-ou-nutritionniste"),
};

const TONS = ["bg-white", "bg-[#F2C94C] text-[#1F3B24]", "bg-white", "bg-[var(--fond)]"];

export default function DieteticienneOuNutritionniste() {
  return (
    <main>
      <section className="relative overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-3 bg-[repeating-linear-gradient(90deg,currentColor_0_18px,transparent_18px_30px)] opacity-25" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 pb-20 pt-32 sm:px-8 md:pt-40 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
          <div className="space-y-7">
            <Apparition><Surtitre>La question que tout le monde tape</Surtitre></Apparition>
            <TitreRevele
              as="h1"
              auChargement
              texte={"Diététicienne ou *nutritionniste ?*"}
              className="text-[clamp(3rem,7.4vw,6.8rem)] font-bold leading-[0.92] tracking-[-0.03em]"
              classeAccent="text-[#F2C94C]"
            />
            <Apparition as="p" delai={400} className="max-w-xl text-xl leading-relaxed text-[var(--sur-sombre)]/90">{reponse.court}</Apparition>
          </div>
          <Apparition de="zoom" delai={500} className="rotate-[-2deg]">
            <div id="diplome" className={`scroll-mt-28 bg-[#F2C94C] p-7 text-[#1F3B24] ${COINS}`} data-film="diplome">
              <p className="text-sm font-bold uppercase tracking-[0.14em]">Mon diplôme</p>
              <p className="mt-2 font-[family-name:var(--titres)] text-3xl font-bold">{cabinet.dieteticienne}, diététicienne</p>
              <p className="mt-2">{cabinet.diplome} (exemple)</p>
              <p className="[font-variant-numeric:lining-nums]">N° ADELI {cabinet.adeli} (exemple)</p>
              <p className="mt-4 border-t-2 border-dashed border-[#1F3B24]/40 pt-3 text-sm font-bold">Code de la santé publique, art. L4371-2 et L4372-2</p>
            </div>
          </Apparition>
        </div>
      </section>

      <section className="mx-auto max-w-5xl space-y-5 px-5 py-20 sm:px-8 md:py-28">
        {reponse.points.map((p, i) => (
          <Apparition as="article" key={p.titre} id={`point-${i + 1}`} delai={i * 80} className={`scroll-mt-28 rounded-[1.75rem] border-2 border-[var(--encre)] p-7 shadow-[8px_8px_0_0_var(--encre)] sm:p-9 ${TONS[i]}`}>
            <p className="font-[family-name:var(--titres)] text-lg font-bold [font-variant-numeric:lining-nums]">{String(i + 1).padStart(2, "0")}</p>
            <h2 className="mt-1 text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.02]">{p.titre}</h2>
            <p className="mt-3 text-lg leading-relaxed">{p.texte}</p>
            {p.source && <p className="mt-3 text-sm font-bold">{p.source}</p>}
          </Apparition>
        ))}
        <p className="pt-4 text-[var(--doux)]">
          Résumé des textes, à lire en entier sur Légifrance. Cette page répond à une question de
          vocabulaire ; elle ne remplace ni un avis médical, ni une séance.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Bouton href={`${DOSSIER}/reserver`}>Réserver un soir</Bouton>
          <Bouton href={`${DOSSIER}#frigo`} variante="contour">Votre frigo, d&apos;abord</Bouton>
        </div>
      </section>

      <AppelFinal />
    </main>
  );
}
