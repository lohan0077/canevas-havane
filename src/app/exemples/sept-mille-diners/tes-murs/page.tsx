import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import Creneaux from "../../_kit/Creneaux";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, Appli, EnTetePage, Surtitre } from "../_composants/Blocs";
import TesMurs from "../_composants/TesMurs";
import { COMPRIS, CRENEAUX_COTES, GAMMES, PAS_COMPRIS, euros, photos } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Tes murs, ton prix — Sept Mille Dîners, site de démonstration",
  description:
    "La longueur de tes murs dessine ta cuisine, avec une fourchette TTC pose comprise ; ce qu'elle comprend, ce qu'elle ne comprend pas ; puis la prise de cotes chez toi. Site de démonstration.",
  ...adressesDeLaPage("/exemples/sept-mille-diners/tes-murs"),
};

export default function TesMursPage() {
  return (
    <main>
      <EnTetePage surtitre="Prix cuisine sur mesure avec pose" titre="Tes murs, *ton prix.*" photo={photos.planBois} origine="60% 50%">
        Mesure le long du mur, d&apos;un angle à l&apos;autre. Un seul mur : laisse le second vide, la cuisine sera
        droite. Deux murs : elle sera en L. La fourchette est TTC, pose comprise.
      </EnTetePage>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-8 md:py-24 lg:grid-cols-[1.35fr_0.65fr]">
        <Apparition de="zoom">
          <Appli adresse="Sept Mille Dîners · tes murs, ton prix" etape="Deux longueurs">
            <TesMurs />
          </Appli>
        </Apparition>
        <Apparition delai={150} className="space-y-4 self-start rounded-[2rem] bg-[var(--sombre)] p-7 text-[var(--sur-sombre)]">
          <p className="text-sm font-semibold uppercase tracking-[0.2em]">Le mètre linéaire</p>
          <ul className="divide-y divide-white/15">
            {GAMMES.map((g) => (
              <li key={g.id} className="space-y-0.5 py-3">
                <span className="block font-[family-name:var(--titres)] text-2xl">{g.nom}</span>
                <span className="block text-[15px] text-[var(--sur-sombre)]/90">{g.detail}</span>
                <span className="block text-lg lining-nums tabular-nums">{euros(g.min)} – {euros(g.max)}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-[var(--sur-sombre)]/90">TTC, pose comprise, hors électroménager · exemple. Pour une cuisine en L de 5,60 m en laqué : 11&nbsp;000 – 14&nbsp;000 €.</p>
        </Apparition>
      </section>

      <section className="border-y border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 md:grid-cols-2 md:py-28">
          <div className="space-y-6">
            <TitreRevele
              texte="Ce que la fourchette *comprend.*"
              className="font-[family-name:var(--titres)] text-[clamp(2.4rem,4.5vw,4rem)] leading-[0.98] tracking-[-0.03em]"
              classeAccent="italic text-[var(--accent-texte)]"
            />
            <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)] text-lg">
              {COMPRIS.map((x, i) => (
                <Apparition as="li" key={x} delai={i * 70} className="flex gap-4 py-3.5">
                  <span aria-hidden="true" className="text-[var(--accent-texte)]">✓</span>{x}
                </Apparition>
              ))}
            </ul>
          </div>
          <div className="space-y-6">
            <TitreRevele
              texte="Ce qu'elle *ne comprend pas.*"
              className="font-[family-name:var(--titres)] text-[clamp(2.4rem,4.5vw,4rem)] leading-[0.98] tracking-[-0.03em]"
              classeAccent="italic text-[var(--accent-texte)]"
            />
            <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)] text-lg text-[var(--doux)]">
              {PAS_COMPRIS.map((x, i) => (
                <Apparition as="li" key={x} delai={i * 70} className="flex gap-4 py-3.5">
                  <span aria-hidden="true">—</span>{x}
                </Apparition>
              ))}
            </ul>
            <p className="text-[17px] leading-relaxed">
              Rien n&apos;est « gratuit » : la prise de cotes, le plan et les réglages sont compris dans le prix
              de la cuisine. Le prix ferme est sur le devis, ligne par ligne.
            </p>
          </div>
        </div>
      </section>

      <section id="cotes" className="scroll-mt-20 mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6">
          <Apparition><Surtitre>Étape suivante</Surtitre></Apparition>
          <TitreRevele
            texte="La prise de cotes, *chez toi.*"
            className="font-[family-name:var(--titres)] text-[clamp(2.8rem,5.5vw,5rem)] leading-[0.95] tracking-[-0.035em]"
            classeAccent="italic text-[var(--accent-texte)]"
          />
          <Apparition as="p" delai={150} className="text-xl leading-relaxed text-[var(--doux)]">
            Une heure, mètre en main, avec Mathieu, qui dessinera ton plan. C&apos;est après elle que vient le
            devis, ligne par ligne, avec le prix ferme et la date de pose.
          </Apparition>
          <Apparition de="zoom" delai={200} className="relative aspect-[4/3] overflow-hidden [border-radius:50%_50%_2rem_2rem/45%_45%_2rem_2rem] bg-[var(--sombre)]">
            <Image src={photos.salle.src} alt={photos.salle.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </Apparition>
        </div>
        <Apparition de="zoom" className="self-start rounded-[2rem] border border-[var(--trait)] bg-[var(--carte)] p-5 sm:p-8">
          <p className="mb-5 font-[family-name:var(--titres)] text-3xl">Ta prise de cotes</p>
          <Creneaux
            creneaux={CRENEAUX_COTES}
            colonnes={2}
            titreCarte="Ta prise de cotes"
            bouton="Réserver ce créneau"
            confirmation="Prise de cotes réservée : {creneau}"
            note={"Créneaux de la semaine du 26 octobre. Ceux marqués « Pris » le sont pour l'exemple."}
          />
        </Apparition>
      </section>

      <AppelFinal />
    </main>
  );
}
