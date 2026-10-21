import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import { FORMULES, euros, photos } from "../_composants/donnees";
import { Crochets } from "../_composants/Blocs";
import ReserverSamedi from "../_composants/ReserverSamedi";

// « Le client se demande plus s'il a besoin d'un DJ. Il bloque son samedi, direct sur
// le site. » Les samedis de juin et juillet 2027, libres ou pris (exemple) ; on en
// touche un, « Ton samedi est libre », et « Bloquer ma date ».
export const metadata: Metadata = {
  title: "Samedis libres · Deux Heures — site de démonstration",
  description: "Les samedis encore libres, et ton samedi bloqué directement sur le site. Site de démonstration : rien n'est envoyé.",
  ...adressesDeLaPage("/exemples/deux-heures/samedis-libres"),
};

export default function SamedisLibresPage() {
  return (
    <div>
      <section className="max-w-6xl mx-auto px-5 pt-8 pb-16 sm:pt-14 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="space-y-5">
          <Crochets>Juin · juillet 2027</Crochets>
          <h1 className="text-[44px] sm:text-[88px] uppercase leading-[0.9] tracking-[-0.05em]">
            <span className="font-extrabold">Ton</span> <span className="font-light">samedi</span>
          </h1>
          <p className="text-lg leading-relaxed text-[var(--doux)]">
            Les samedis encore libres, les vrais : la grille change quand une date est réservée, pas pour te presser. Touche
            le tien, et bloque-le.
          </p>
          <div className="relative hidden lg:block aspect-[16/9] overflow-hidden rounded-[28px]">
            <Image src={photos.rayons.src} alt={photos.rayons.alt} fill sizes="480px" className="object-cover" />
          </div>
        </div>
        <ReserverSamedi />
      </section>

      <section className="border-t border-[var(--trait)] bg-[var(--carte)]">
        <div className="max-w-6xl mx-auto px-5 py-14 sm:py-20 grid gap-8 md:grid-cols-[1fr_1fr]">
          <div className="space-y-3">
            <h2 className="text-[28px] sm:text-4xl font-extrabold uppercase leading-[1] tracking-[-0.03em]">Et après <span className="font-light">avoir bloqué&nbsp;?</span></h2>
            <ol className="space-y-3 text-lg leading-relaxed">
              <li><strong>1.</strong> On t&apos;appelle, et on lit ensemble le règlement de la salle : l&apos;heure de fin, le volume, l&apos;installation.</li>
              <li><strong>2.</strong> Tu remplis ta fiche : la chanson interdite, celle du bal, celles qui feront lever la famille.</li>
              <li><strong>3.</strong> Le jour J, on s&apos;installe l&apos;après-midi. Le reste, c&apos;est la piste.</li>
            </ol>
          </div>
          <ul className="space-y-3">
            {FORMULES.map((f) => (
              <li key={f.nom} className="flex items-baseline justify-between gap-4 border-b border-[var(--trait)] pb-3">
                <span className="font-semibold">{f.nom}</span>
                <span className="tabular-nums">{f.nom === "Une heure de plus" ? "+ " : ""}{euros(f.prix)} TTC <span className="text-[var(--doux)]">· exemple</span></span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
