import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import { photos } from "../_composants/donnees";
import Plaque from "../_composants/Plaque";
import Registre from "../_composants/Registre";

export const metadata: Metadata = {
  title: "Le registre · Après Nous — site de démonstration",
  description: "Site de démonstration d'un atelier d'ébénisterie imaginaire : tape le numéro gravé sous ton meuble, lis son registre, et écris la ligne suivante.",
  ...adressesDeLaPage("/exemples/apres-nous/registre"),
};

export default function PageRegistre() {
  return (
    <>
      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-5 pb-20 pt-10 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="min-w-0 space-y-8">
          <div className="space-y-5" id="haut">
            <p className="text-xs font-semibold uppercase tracking-[0.3em]">Le registre</p>
            <h1 className="text-[50px] sm:text-7xl">
              Tape son numéro. <span className="italic">Lis sa vie.</span>
            </h1>
            <p className="text-lg leading-relaxed">
              Sous chaque meuble d&apos;Après Nous, un numéro est gravé au fer. Il ouvre son
              registre : ce que l&apos;atelier a écrit, puis ce que la famille ajoute.
            </p>
          </div>
          <Registre />
        </div>
        <div className="space-y-6">
          <figure className="space-y-3">
            <Plaque className="w-full shadow-[0_30px_60px_-30px_rgba(59,36,22,0.6)]" />
            <figcaption className="text-sm text-[var(--doux)]">Où le trouver : sous le plateau, côté mur, à côté du nom de l&apos;atelier.</figcaption>
          </figure>
          <Image src={photos.cernes.src} width={photos.cernes.largeur} height={photos.cernes.hauteur} alt={photos.cernes.alt} sizes="(min-width: 1024px) 560px, 100vw" className="aspect-[16/10] w-full object-cover" />
          <dl className="border-t border-[var(--encre)]">
            {[
              ["Qui écrit ?", "L'atelier écrit l'arbre, les heures, la livraison. Ensuite, ceux qui ont le meuble, avec le code remis à la livraison."],
              ["Qui lit ?", "Tous ceux qui ont le numéro. Le registre ne porte ni nom complet ni adresse : une initiale suffit."],
              ["Et plus tard ?", "Le registre suit le meuble. S'il change de famille, la nouvelle continue d'écrire."],
            ].map(([t, d]) => (
              <div key={t} className="grid gap-1 border-b border-[var(--trait)] py-4 sm:grid-cols-[8rem_1fr]">
                <dt className="font-[family-name:var(--titres)] text-xl">{t}</dt>
                <dd className="text-[var(--doux)]">{d}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
