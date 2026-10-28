import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, EnTetePage, Surtitre } from "../_composants/Blocs";
import Compteur from "../_composants/Compteur";
import Dessin from "../_composants/Dessin";
import { FROMAGES, photos } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "La cave — Patience, site de démonstration",
  description: "La cave de la fromagerie Patience (entreprise fictive) : chaque fromage, qui le fait, son lait, son âge en jours qui tourne, et la date où son affinage s'achève.",
  ...adressesDeLaPage("/exemples/patience/cave"),
};

export default function Cave() {
  return (
    <main>
      <EnTetePage surtitre="La cave" titre="Tout ce qui *attend.*" photo={photos.cave}>
        Chaque fromage, sa date d&apos;entrée dans notre cave, et son âge — qui tourne pendant que
        tu lis. Quand la barre est pleine, l&apos;affinage prévu est fini.
      </EnTetePage>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-24">
        <ol className="divide-y-2 divide-[var(--encre)] border-y-2 border-[var(--encre)]">
          {FROMAGES.map((f, i) => (
            <Apparition as="li" key={f.slug} delai={i * 60} className="grid gap-8 py-12 md:grid-cols-[6rem_1fr_1fr] md:items-start">
              <p className="font-[family-name:var(--titres)] text-6xl italic text-[var(--accent-texte)] [font-variant-numeric:lining-nums]">{f.numero}</p>
              <div className="space-y-3">
                <h2 className="text-[clamp(2.2rem,4vw,3.4rem)] leading-tight">{f.nom}</h2>
                <Dessin forme={f.forme} teinte={f.teinte} className="h-16 w-24" />
                <p className="text-lg">{f.quiLeFait} · {f.dOu.toLowerCase()}</p>
                <p className="text-[var(--doux)]">Lait {f.lait.toLowerCase().replace(",", "")} · {f.poids} · allergène : <strong>lait</strong> · exemple</p>
                <p className="leading-relaxed">{f.soin}</p>
                <p className="font-[family-name:var(--titres)] text-xl italic">{f.phrase}</p>
              </div>
              <div className="rounded-t-[5rem] rounded-b-[1rem] border-2 border-[var(--encre)] bg-[var(--carte)] px-6 pb-6 pt-12">
                <Compteur entree={f.entree} dureeJours={f.dureeJours} taille="grand" />
              </div>
            </Apparition>
          ))}
        </ol>
        <p className="mt-6 text-sm text-[var(--doux)]">Dates d&apos;entrée en cave d&apos;exemple : la fromagerie est fictive. L&apos;âge est calculé à partir d&apos;elles, dans ton navigateur.</p>
      </section>

      <section className="px-3 sm:px-5">
        <div className="relative isolate overflow-hidden rounded-t-[3rem] rounded-b-[2rem] bg-[var(--sombre)] text-[var(--sur-sombre)] sm:rounded-t-[10rem]">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 pb-20 pt-24 sm:px-10 md:pt-32 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div className="space-y-6">
              <Surtitre clair>Le lait</Surtitre>
              <TitreRevele texte="Cru ou thermisé. *C'est écrit.*" className="text-[clamp(2.6rem,5vw,4.6rem)] leading-[0.95] tracking-[-0.03em]" classeAccent="italic text-[#E3B85C]" />
              <p className="max-w-md text-xl leading-relaxed text-[var(--sur-sombre)]/90">
                De vache, de chèvre, de brebis ; cru ou thermisé. Sur chaque carte, sur l&apos;étiquette posée
                à la coupe, et avant chaque commande. Le lait est aussi l&apos;allergène de tous nos fromages.
              </p>
            </div>
            <div className="relative aspect-[3/2] overflow-hidden rounded-t-[8rem] rounded-b-[1rem]">
              <Image src={photos.chevre.src} alt={photos.chevre.alt} fill sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <div className="h-16" />
      <AppelFinal />
    </main>
  );
}
