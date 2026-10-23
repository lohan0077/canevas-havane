import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import FondVivant from "../../_kit/FondVivant";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, CHANFREIN_GRAND, Chapitre } from "../_composants/Blocs";
import Plaque from "../_composants/Plaque";
import Registre from "../_composants/Registre";
import { photos } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Le registre — Après Nous, site de démonstration",
  description: "Tape le numéro gravé sous ton meuble, lis son registre, et écris la ligne suivante : le site d'un atelier imaginaire.",
  ...adressesDeLaPage("/exemples/apres-nous/registre"),
};

export default function PageRegistre() {
  return (
    <main>
      {/* Le haut de page est l'outil : on tape le numéro gravé, le registre s'ouvre. */}
      <section className="kit-grain relative isolate overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <FondVivant couleurs={["#2A190E", "#4A2E1A", "#8A5A2E"]} vitesse={0.6} />
        <div className="absolute inset-0 bg-[var(--sombre)]/55" />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 pb-16 pt-32 sm:px-8 md:pb-24 md:pt-40 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="min-w-0 space-y-7">
            <Apparition><Chapitre numero="II" clair>Le registre</Chapitre></Apparition>
            <TitreRevele
              as="h1"
              auChargement
              texte="Tape son numéro. *Lis sa vie.*"
              className="font-[family-name:var(--titres)] text-[clamp(3.2rem,7vw,6.6rem)] leading-[0.94] tracking-[-0.02em]"
              classeAccent="italic text-[#E0B36A]"
            />
            <Apparition as="p" delai={300} className="max-w-md text-lg leading-relaxed text-[var(--sur-sombre)]/90">
              Sous chaque meuble d&apos;Après Nous, un numéro est gravé au fer. Il ouvre son registre : ce que
              l&apos;atelier a écrit, puis ce que la famille ajoute.
            </Apparition>
            <Apparition as="figure" de="zoom" delai={400} className="space-y-3">
              <Plaque className="w-full max-w-[420px] rotate-[-2deg] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.7)]" />
              <figcaption className="text-sm text-[var(--sur-sombre)]/90">Où le trouver : sous le plateau, côté mur, à côté du nom de l&apos;atelier.</figcaption>
            </Apparition>
          </div>
          <Apparition de="droite" delai={150} className="min-w-0 rounded-[1.5rem] bg-[var(--fond)] p-4 text-[var(--encre)] sm:p-6">
            <Registre />
          </Apparition>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-[1fr_1fr] lg:items-center">
        <Apparition de="rideau" className={`relative aspect-[4/3] overflow-hidden ${CHANFREIN_GRAND}`}>
          <Image src={photos.cernes.src} alt={photos.cernes.alt} fill sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" />
        </Apparition>
        <dl className="border-t border-[var(--encre)]">
          {[
            ["Qui écrit ?", "L'atelier écrit l'arbre, les heures, la livraison. Ensuite, ceux qui ont le meuble, avec le code remis à la livraison."],
            ["Qui lit ?", "Tous ceux qui ont le numéro. Le registre ne porte ni nom complet ni adresse : une initiale suffit."],
            ["Et plus tard ?", "Le registre suit le meuble. S'il change de famille, la nouvelle continue d'écrire."],
          ].map(([t, d], i) => (
            <Apparition key={t} delai={i * 100} className="grid gap-1 border-b border-[var(--trait)] py-5 sm:grid-cols-[9rem_1fr]">
              <dt className="font-[family-name:var(--titres)] text-2xl">{t}</dt>
              <dd className="text-lg leading-relaxed text-[var(--doux)]">{d}</dd>
            </Apparition>
          ))}
        </dl>
      </section>
      <AppelFinal />
    </main>
  );
}
