import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import { PremiereHeure } from "../_composants/Formulaires";
import { Pastille } from "../_composants/Blocs";
import { IMAGES } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Tour du Quartier — site de démonstration",
  description: "Réserver sa première heure de vélo dans un magasin imaginaire : sur le parking, vélo et casque prêtés, offerte.",
  ...adressesDeLaPage("/exemples/tour-du-quartier/premiere-heure"),
};

const DEROULE = [
  "On règle la selle et le guidon à ta taille.",
  "Dix minutes à marcher à côté du vélo, freins serrés, pour l'apprivoiser.",
  "Les premiers tours de roue sur le parking, sans voiture, sans public.",
  "Si tu veux, la rue calme derrière le magasin. Sinon, la prochaine fois.",
];

export default function PagePremiereHeure() {
  return (
    <div className="mx-auto max-w-6xl px-5 pb-16 pt-8 lg:pt-14">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-5">
          <Pastille>Offerte · vélo et casque prêtés</Pastille>
          <h1 className="text-[52px] font-extrabold leading-[0.95] tracking-tight sm:text-[76px]">Ta première heure.</h1>
          <ol className="space-y-3">
            {DEROULE.map((d, i) => (
              <li key={d} className="flex gap-4 rounded-[24px] bg-[var(--carte)] p-4">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#F2C14E] font-[family-name:var(--titres)] font-extrabold">{i + 1}</span>
                <span className="leading-relaxed">{d}</span>
              </li>
            ))}
          </ol>
          <div className="relative hidden aspect-[3/2] overflow-hidden rounded-[32px] lg:block">
            <Image src={IMAGES.parking.src} alt={IMAGES.parking.alt} width={IMAGES.parking.largeur} height={IMAGES.parking.hauteur} sizes="540px" className="h-full w-full object-cover" />
          </div>
        </div>
        <PremiereHeure />
      </div>
    </div>
  );
}
