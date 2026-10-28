import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import PlaceAtelier from "../_composants/PlaceAtelier";
import { AppelFinal, COINS, EnTetePage, Surtitre } from "../_composants/Blocs";
import { atelierInfo, cabinet, photos } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "L'atelier étiquettes — Rayon Frais, site de démonstration",
  description:
    "L'atelier du samedi matin d'une diététicienne imaginaire : à six, au rayon frais, on apprend à lire les étiquettes — jamais le cas de chacun.",
  ...adressesDeLaPage("/exemples/rayon-frais/atelier"),
};

const lining = "[font-variant-numeric:lining-nums]";

export default function Atelier() {
  return (
    <main>
      <EnTetePage surtitre="Atelier étiquettes · pour le lancement" titre="Samedi matin, *au rayon frais.*" photo={photos.cagettes}>
        À six, pendant une heure et quart, on apprend à lire une étiquette. Rendez-vous au
        rayon frais.
      </EnTetePage>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <Apparition className={`grid grid-cols-2 gap-px bg-[var(--encre)] ${lining} ${COINS}`}>
          {[["Date", atelierInfo.date], ["Heure", `${atelierInfo.heure} · ${atelierInfo.duree}`], ["À combien", `${atelierInfo.places} personnes`], ["Prix", `${atelierInfo.prix} (exemple)`]].map(([t, v]) => (
            <div key={t} className="bg-white p-6 sm:p-8">
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-[var(--doux)]">{t}</p>
              <p className="mt-2 font-[family-name:var(--titres)] text-2xl font-bold sm:text-3xl">{v}</p>
            </div>
          ))}
        </Apparition>
        <div className="space-y-5">
          <Apparition as="p" delai={150} className="text-xl leading-relaxed text-[var(--doux)]">
            Six places. On ne vous demande rien d&apos;autre que de venir : pas de nom à laisser
            ici, pas de questionnaire.
          </Apparition>
          <Apparition delai={250}>
            <PlaceAtelier />
          </Apparition>
        </div>
      </section>

      <section className="bg-white py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-6">
            <Apparition><Surtitre>Trois règles</Surtitre></Apparition>
            <TitreRevele
              texte="On parle d'étiquettes. *Jamais de vous.*"
              className="text-[clamp(2.6rem,5vw,4.6rem)] font-bold leading-[0.95] tracking-[-0.03em]"
              classeAccent="text-[var(--accent-texte)]"
            />
          </div>
          <ol className="space-y-4">
            {atelierInfo.regles.map((r, i) => (
              <Apparition as="li" key={r} delai={i * 120} de="droite" className="flex gap-5 rounded-[1.5rem] border-2 border-[var(--encre)] bg-[var(--fond)] p-6 shadow-[6px_6px_0_0_var(--encre)]">
                <span className={`font-[family-name:var(--titres)] text-5xl font-bold leading-none text-[var(--accent-texte)] ${lining}`}>{i + 1}</span>
                <p className="self-center text-lg leading-relaxed">{r}</p>
              </Apparition>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-3 py-3 sm:px-5 sm:py-5">
        <div className="grid overflow-hidden rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)] lg:grid-cols-2">
          <div className="relative min-h-[300px]">
            <Image src={photos.poivrons.src} alt={photos.poivrons.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
          <div className="space-y-8 px-6 py-20 sm:px-12">
            <Apparition><Surtitre>Le samedi, de 10 h à 11 h 15</Surtitre></Apparition>
            <ol className="space-y-5 border-l-4 border-dotted border-[#F2C94C] pl-6">
              {atelierInfo.deroule.map((d, i) => (
                <Apparition as="li" key={d.heure} delai={i * 120}>
                  <p className={`font-[family-name:var(--titres)] text-3xl font-bold text-[#F2C94C] ${lining}`}>{d.heure}</p>
                  <p className="text-lg leading-relaxed">{d.texte}</p>
                </Apparition>
              ))}
            </ol>
            <p className="text-[var(--sur-sombre)]/90">
              Une vraie date, dans un cabinet fictif : l&apos;atelier n&apos;aura pas lieu. Animé par{" "}
              {cabinet.dieteticienne}, diététicienne diplômée (exemple). Aucune enseigne n&apos;est
              partenaire, aucune marque n&apos;est recommandée.
            </p>
          </div>
        </div>
      </section>

      <AppelFinal />
    </main>
  );
}
