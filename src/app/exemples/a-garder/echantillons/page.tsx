import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import { PAPIERS, photos } from "../_composants/donnees";
import Echantillons from "../_composants/Echantillons";
import { Cachet } from "../_composants/Ornements";
import styles from "../_composants/Papier.module.css";

// La page des échantillons. La vidéo : « Sur le site, avant de commander, tu reçois
// ton papier. Par la poste. Tu touches, et après tu choisis. » L'outil est filmé
// tel quel (Videos/marque-imprimeurs/tournage.mjs).
export const metadata: Metadata = {
  title: "À Garder — site de démonstration",
  description: "Les échantillons d'une imprimerie imaginaire : quatre papiers, par la poste, avant de commander. Démonstration réalisée par Canevas Havane.",
  ...adressesDeLaPage("/exemples/a-garder/echantillons"),
};

export default function LesEchantillons() {
  return (
    <>
      <section className="relative overflow-hidden">
        <Cachet className="absolute -right-10 top-4 w-48 rotate-[10deg] opacity-70" />
        <div className="mx-auto grid max-w-6xl gap-10 px-5 pb-20 pt-10 sm:pt-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="space-y-5 lg:pt-6">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--accent-texte)]">Les échantillons</p>
            <h1 className="text-6xl font-normal italic sm:text-7xl">Ton papier, avant de commander.</h1>
            <p className="text-xl leading-relaxed">
              Touche les papiers que tu veux recevoir. On te les envoie par la poste, offerts.
              Tu touches, tu compares chez toi, et après tu choisis.
            </p>
          </div>
          <Echantillons />
        </div>
      </section>

      <section className="border-y border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div className="space-y-6">
            <h2 className="text-5xl italic sm:text-6xl">Dans l&apos;enveloppe.</h2>
            <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
              {PAPIERS.map((p) => (
                <li key={p.id} className="flex items-center gap-4 py-4">
                  <span aria-hidden="true" className={`h-14 w-11 shrink-0 rounded-[3px] border border-[var(--trait)] ${styles[p.id]}`} />
                  <span>
                    <span className="block text-lg font-bold [font-variant-numeric:lining-nums]">{p.nom} · {p.grammage}</span>
                    <span className="block text-[var(--doux)]">{p.usage}</span>
                  </span>
                </li>
              ))}
              <li className="py-4 text-[var(--doux)]">Et une carte imprimée à la presse, pour voir l&apos;encre dans le papier.</li>
            </ul>
          </div>
          <Image src={photos.papiers.src} alt={photos.papiers.alt} width={photos.papiers.largeur} height={photos.papiers.hauteur} sizes="(min-width: 768px) 440px, 100vw" className="mx-auto h-auto w-full max-w-sm rounded-[18px]" />
        </div>
      </section>

      <section className="mx-auto max-w-3xl space-y-5 px-5 py-20 text-center">
        <h2 className="text-5xl italic sm:text-6xl">Pourquoi par la poste&nbsp;?</h2>
        <p className="text-xl leading-relaxed">
          Parce qu&apos;un écran ne dit ni l&apos;épaisseur, ni le grain, ni la façon dont l&apos;encre
          s&apos;y pose. Un faire-part, on le garde des années : il mérite qu&apos;on le choisisse avec
          les doigts.
        </p>
        <p className="text-[var(--doux)]">L&apos;enveloppe est offerte, que tu commandes ensuite ou non.</p>
      </section>
    </>
  );
}
