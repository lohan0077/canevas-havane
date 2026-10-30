import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import Creneaux from "../../_kit/Creneaux";
import { AppelFinal, Appli, EnTetePage, PORCELAINE, Surtitre, Titre } from "../_composants/Blocs";
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
      <EnTetePage surtitre="Prix cuisine sur mesure avec pose" titre="Tes murs, *ton prix.*">
        Mesure le long du mur, d&apos;un angle à l&apos;autre. Un seul mur : laisse le second vide, la cuisine sera droite.
        Deux murs : elle sera en L. La fourchette est TTC, pose comprise.
      </EnTetePage>

      <section className={PORCELAINE}>
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:py-28 lg:grid-cols-[1.4fr_0.6fr]">
        <Apparition>
          <Appli adresse="Sept Mille Dîners · tes murs, ton prix" etape="Deux longueurs">
            <TesMurs />
          </Appli>
        </Apparition>
        <Apparition delai={150} className="space-y-4 self-start">
          <Surtitre>Le mètre linéaire</Surtitre>
          <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
            {GAMMES.map((g) => (
              <li key={g.id} className="space-y-0.5 py-3">
                <span className="block font-[family-name:var(--titres)] text-xl">{g.nom}</span>
                <span className="block text-[15px] text-[var(--doux)]">{g.detail}</span>
                <span className="block tabular-nums">{euros(g.min)} – {euros(g.max)}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm leading-relaxed text-[var(--doux)]">
            TTC, pose comprise, hors électroménager · exemple. Pour une cuisine en L de 5,60 m en laqué : 11&nbsp;000 – 14&nbsp;000 €.
          </p>
        </Apparition>
      </div>
      </section>

      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto grid max-w-6xl gap-14 px-6 py-28 md:grid-cols-2 md:py-40">
          <div className="space-y-8">
            <Titre texte="Ce que la fourchette *comprend.*" taille="moyen" />
            <ul className="divide-y divide-white/15 border-y border-white/15 text-lg">
              {COMPRIS.map((x, i) => (
                <Apparition as="li" key={x} delai={i * 70} className="flex gap-4 py-3.5">
                  <span aria-hidden="true" className="text-[var(--accent-texte)]">✓</span>{x}
                </Apparition>
              ))}
            </ul>
          </div>
          <div className="space-y-8">
            <Titre texte="Ce qu'elle *ne comprend pas.*" taille="moyen" />
            <ul className="divide-y divide-white/15 border-y border-white/15 text-lg">
              {PAS_COMPRIS.map((x, i) => (
                <Apparition as="li" key={x} delai={i * 70} className="flex gap-4 py-3.5">
                  <span aria-hidden="true">—</span>{x}
                </Apparition>
              ))}
            </ul>
            <p className="max-w-[26rem] text-lg leading-relaxed">
              Rien n&apos;est « gratuit » : la prise de cotes, le plan et les réglages sont compris dans le prix de la cuisine.
              Le prix ferme est sur le devis, ligne par ligne.
            </p>
          </div>
        </div>
      </section>

      <section id="cotes" className={`scroll-mt-20 ${PORCELAINE}`}>
      <div className="mx-auto grid max-w-6xl gap-14 px-6 py-28 md:py-40 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6">
          <Apparition><Surtitre>Étape suivante</Surtitre></Apparition>
          <Titre texte="La prise de cotes, *chez toi.*" />
          <Apparition as="p" delai={150} className="max-w-[26rem] text-lg leading-relaxed text-[var(--doux)]">
            Une heure, mètre en main, avec Mathieu, qui dessinera ton plan. C&apos;est après elle que vient le devis, ligne par
            ligne, avec le prix ferme et la date de pose.
          </Apparition>
          <Apparition delai={200} className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[var(--sombre)]">
            <Image src={photos.salle.src} alt={photos.salle.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </Apparition>
        </div>
        <Apparition className="self-start rounded-2xl border border-[var(--trait)] bg-[var(--carte)] p-5 sm:p-8">
          <p className="mb-5 font-[family-name:var(--titres)] text-2xl">Ta prise de cotes</p>
          <Creneaux
            creneaux={CRENEAUX_COTES}
            colonnes={2}
            titreCarte="Ta prise de cotes"
            bouton="Réserver ce créneau"
            confirmation="Prise de cotes réservée : {creneau}"
            note={"Créneaux de la semaine du 26 octobre. Ceux marqués « Pris » le sont pour l'exemple."}
          />
        </Apparition>
      </div>
      </section>

      <AppelFinal monde="nuit" />
    </main>
  );
}
