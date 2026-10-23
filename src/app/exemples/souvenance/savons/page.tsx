import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, Bouton, EnTetePage, Etiquette, Surtitre } from "../_composants/Blocs";
import { Pain } from "../_composants/Pain";
import { DOSSIER, ETATS, LEXIQUE, PHOTOS, PHOTO_DU_SAVON, PRIX, SAVONS, dernierLot } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Les trois savons — Souvenance, site de démonstration",
  description: "Les trois savons d'une savonnerie imaginaire, chacun avec son souvenir, son odeur, son dernier lot et son étiquette complète, ingrédients traduits.",
  ...adressesDeLaPage("/exemples/souvenance/savons"),
};

export default function Savons() {
  return (
    <main>
      <EnTetePage surtitre={`Les savons · 100 g · ${PRIX} € TTC · exemple`} titre="Trois odeurs *d'enfance.*" photo={PHOTOS.linge}>
        Pour chacun : le souvenir, l&apos;odeur, son dernier lot, et l&apos;étiquette telle qu&apos;elle est imprimée.
      </EnTetePage>

      {SAVONS.map((s, i) => {
        const p = PHOTOS[PHOTO_DU_SAVON[s.slug]];
        const lot = dernierLot(s.slug);
        return (
          <section key={s.slug} id={s.slug} className="scroll-mt-24 border-b border-[var(--trait)]">
            <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 md:grid-cols-2 md:items-center md:py-28">
              <div className={`relative ${i % 2 ? "md:order-2" : ""}`}>
                <Apparition de="rideau" className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[2rem]">
                  <Image src={p.src} alt={p.alt} fill sizes="(min-width: 768px) 520px, 92vw" className="object-cover" />
                </Apparition>
                <Apparition de="zoom" delai={300} className="absolute -bottom-8 left-1/2 w-[62%] -translate-x-1/2">
                  <Pain savon={s} lot={lot.numero} incline={i % 2 ? 4 : -4} />
                </Apparition>
              </div>
              <div className="space-y-6 pt-8 md:pt-0">
                <Apparition><Surtitre>Le souvenir · {s.souvenir.toLowerCase()}</Surtitre></Apparition>
                <TitreRevele
                  texte={`*${s.nom}*`}
                  className="font-[family-name:var(--titres)] text-[clamp(2.8rem,5.5vw,5rem)] leading-[0.95] tracking-[-0.02em]"
                  classeAccent="italic"
                />
                <Apparition as="p" delai={150} className="text-[20px] leading-relaxed">{s.odeur}</Apparition>
                <Apparition as="p" delai={200} className="text-[15px] font-semibold uppercase tracking-[0.14em] text-[var(--doux)]">
                  Dernier lot : {lot.numero} · {ETATS[lot.etat].toLowerCase()} · {lot.sortie}
                </Apparition>
                <Apparition delai={250}>
                  <Etiquette lot={lot} />
                </Apparition>
              </div>
            </div>
          </section>
        );
      })}

      <section className="px-3 py-5 sm:px-5">
        <div className="kit-grain relative overflow-hidden rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:px-10 md:py-28 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="space-y-6">
              <Apparition><Surtitre clair>Les mots de l&apos;étiquette</Surtitre></Apparition>
              <TitreRevele
                texte="En latin, *puis en français.*"
                className="font-[family-name:var(--titres)] text-[clamp(2.6rem,5vw,4.6rem)] leading-[0.95] tracking-[-0.02em]"
                classeAccent="italic text-[#E8C4BC]"
              />
              <Apparition as="p" delai={150} className="text-[17px] leading-relaxed text-[var(--sur-sombre)]/90">
                Listes d&apos;ingrédients d&apos;exemple. Pour un vrai savon, c&apos;est la personne chargée de
                l&apos;évaluation de la sécurité qui les arrête, allergènes compris.
              </Apparition>
              <Apparition delai={250}>
                <Bouton href={`${DOSSIER}#souvenir`} variante="clair">Trouver le mien</Bouton>
              </Apparition>
            </div>
            <Apparition as="ul" delai={100} className="divide-y divide-white/15 border-y border-white/15">
              {LEXIQUE.map(([t, d]) => (
                <li key={t} className="grid gap-1 py-4 sm:grid-cols-[0.9fr_1.1fr] sm:gap-6">
                  <span className="font-[family-name:var(--titres)] text-[19px] italic text-[#E8C4BC]">{t}</span>
                  <span className="text-[17px] leading-relaxed text-[var(--sur-sombre)]/90">{d}</span>
                </li>
              ))}
            </Apparition>
          </div>
        </div>
      </section>

      <AppelFinal />
    </main>
  );
}
