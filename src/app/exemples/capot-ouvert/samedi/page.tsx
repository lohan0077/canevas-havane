import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import { PROGRAMME, photos } from "../_composants/donnees";
import InscriptionSamedi from "../_composants/InscriptionSamedi";

export const metadata: Metadata = {
  title: "Le samedi · Capot Ouvert — site de démonstration",
  description: "Samedi, capot ouvert : l'atelier gratuit de Capot Ouvert, garage imaginaire. Les niveaux, les pneus, la roue de secours, un samedi matin par mois.",
  ...adressesDeLaPage("/exemples/capot-ouvert/samedi"),
};

export default function Samedi() {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10 pb-20 space-y-14">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
        <div className="space-y-5">
          <p className="text-sm font-bold uppercase tracking-[0.16em]">Un samedi matin par mois · gratuit</p>
          <h1 className="text-6xl sm:text-8xl font-bold tracking-[-0.03em] leading-[0.92]">Samedi, capot ouvert.</h1>
          <p className="text-xl leading-relaxed">
            Deux heures à l'atelier pour apprendre ce que personne ne t'a montré : vérifier tes
            niveaux, tes pneus, et trouver la roue de secours. Avec ou sans voiture.
          </p>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-[14px] border-[3px] border-[var(--trait)] bg-[var(--sombre)]">
          <Image src={photos.jauge.src} alt={photos.jauge.alt} fill sizes="(min-width: 1024px) 560px, 100vw" className="object-cover object-[50%_45%]" />
        </div>
      </div>

      <ol className="grid gap-4 md:grid-cols-3">
        {PROGRAMME.map((p, i) => (
          <li key={p.titre} className="rounded-[14px] border-[3px] border-[var(--trait)] bg-[var(--carte)] p-6 space-y-2">
            <p className="font-[family-name:var(--titres)] text-5xl font-bold text-[var(--accent-texte)] [font-variant-numeric:lining-nums]">{i + 1}</p>
            <h2 className="text-3xl font-bold">{p.titre}</h2>
            <p className="text-lg leading-relaxed">{p.texte}</p>
          </li>
        ))}
      </ol>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-4xl sm:text-5xl font-bold">Les règles de l'atelier</h2>
          <ul className="space-y-3 text-lg">
            <li className="border-b-2 border-[var(--trait)] pb-3">On travaille sur la voiture de l'atelier, ou sur la tienne si tu viens avec.</li>
            <li className="border-b-2 border-[var(--trait)] pb-3">Personne ne passe sous un véhicule levé. Les gants et les lunettes sont fournis.</li>
            <li className="border-b-2 border-[var(--trait)] pb-3">Dix personnes au plus par atelier, pour que chacun mette les mains dans le moteur.</li>
            <li>Rien n'est vendu pendant l'atelier.</li>
          </ul>
        </div>
        <InscriptionSamedi />
      </div>
    </main>
  );
}
