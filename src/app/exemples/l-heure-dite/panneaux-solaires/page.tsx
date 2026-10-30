import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import { AppelFinal, Bouton, EnTetePage, Titre } from "../_composants/Blocs";
import { DOSSIER, PANNEAUX, POSE_SOLAIRE, photos } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Nos panneaux solaires — L'Heure Dite, site de démonstration",
  description:
    "Des panneaux, et de quoi savoir ce qu'ils font : la pose, la courbe de ton toit, et ce que ça coûte, pose comprise (prix d'exemple, TTC). Aucune économie annoncée. Site de démonstration.",
  ...adressesDeLaPage("/exemples/l-heure-dite/panneaux-solaires"),
};

export default function PanneauxSolaires() {
  return (
    <main>
      <EnTetePage titre="Des panneaux, et de quoi savoir ce qu'ils font.">
        Pas d&apos;économies annoncées en très gros : ton toit, heure par heure, et le moment où lancer la machine. On mesure
        ton vrai toit à la visite.
      </EnTetePage>

      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        {/* Trois choses qu'on livre, pas une suite : pas de numéros. */}
        <ul className="grid gap-10 md:grid-cols-3 md:gap-6">
          {POSE_SOLAIRE.map((p) => (
            <li key={p.titre} className="space-y-3 border-t-2 border-[var(--encre)] pt-5">
              <h2 className="font-[family-name:var(--titres)] text-2xl font-bold tracking-[-0.025em]">{p.titre}</h2>
              <p className="text-[17px] leading-relaxed text-[var(--doux)]">{p.texte}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto grid max-w-6xl gap-14 px-6 py-28 md:py-40 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-8">
            <div className="space-y-5">
              <Titre texte="Trois tailles de toit, pose comprise." />
            </div>
            <ul className="divide-y divide-white/15 border-y border-white/15">
              {PANNEAUX.map((p) => (
                <li key={p.taille} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4">
                  <span>
                    <span className="block font-[family-name:var(--titres)] text-2xl font-bold tracking-[-0.025em]">{p.taille}</span>
                    <span className="block text-[15px]">{p.detail}</span>
                  </span>
                  <span className="whitespace-nowrap font-[family-name:var(--titres)] text-3xl font-extrabold tracking-[-0.03em] tabular-nums">{p.prix}</span>
                </li>
              ))}
            </ul>
            <p className="max-w-[26rem] text-[15px] leading-relaxed">
              TTC, pose comprise, exemples, avant toute aide : on ne t&apos;en promet aucune. Un à deux jours sur le toit selon sa
              taille (exemple) ; le raccordement prend plus de temps : la date est au devis.
            </p>
          </div>
          <Apparition className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-[var(--sombre)]">
            <Image src={photos.panneaux.src} alt={photos.panneaux.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </Apparition>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-14 px-6 py-28 md:grid-cols-2 md:items-center md:py-40">
        <div className="space-y-6">
          <Titre texte="Au premier midi, on règle avec toi l'heure de la machine." />
          <Apparition as="p" delai={150} className="max-w-[26rem] text-lg leading-relaxed text-[var(--doux)]">
            Le lave-linge, le lave-vaisselle, le chauffe-eau : à la mise en service, on programme leur départ sur le pic de
            ton toit. Après la pose, le suivi te montre ta vraie journée sur ton téléphone.
          </Apparition>
          <Apparition delai={250}><Bouton href={`${DOSSIER}/ma-journee`}>Voir ton toit, heure par heure</Bouton></Apparition>
        </div>
        <Apparition className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[var(--sombre)]">
          <Image src={photos.tuiles.src} alt={photos.tuiles.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
        </Apparition>
      </section>

      <AppelFinal />
    </main>
  );
}
