import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, EnTetePage, Surtitre } from "../_composants/Blocs";
import { PAPIERS, photos } from "../_composants/donnees";
import Echantillons from "../_composants/Echantillons";
import styles from "../_composants/Papier.module.css";

// La page des échantillons. La vidéo « Créer une marque » : « Sur le site, avant de
// commander, tu reçois ton papier. Par la poste. Tu touches, et après tu choisis. »
// L'outil est filmé tel quel (Videos/marque-imprimeurs/tournage.mjs).
export const metadata: Metadata = {
  title: "Les échantillons — À Garder, site de démonstration",
  description: "Les échantillons d'une imprimerie imaginaire : quatre papiers, par la poste, avant de commander. Démonstration réalisée par Canevas Havane.",
  ...adressesDeLaPage("/exemples/a-garder/echantillons"),
};

export default function LesEchantillons() {
  return (
    <main>
      <EnTetePage
        surtitre="Les échantillons"
        titre="Ton papier, *avant de commander.*"
        aside={
          <Apparition de="droite" delai={250} className="w-full">
            <Echantillons />
          </Apparition>
        }
      >
        Touche les papiers que tu veux recevoir. On te les envoie par la poste, offerts. Tu
        touches, tu compares chez toi, et après tu choisis.
      </EnTetePage>

      <section className="border-y border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto grid max-w-6xl gap-14 px-5 py-24 sm:px-8 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div className="space-y-7">
            <Apparition><Surtitre>Dans l&apos;enveloppe</Surtitre></Apparition>
            <TitreRevele
              texte="Quatre papiers, *pas quarante.*"
              className="text-[clamp(2.8rem,6vw,5rem)] font-normal italic leading-[0.95] tracking-[-0.03em]"
              classeAccent="not-italic text-[var(--accent-texte)]"
            />
            <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
              {PAPIERS.map((p, i) => (
                <Apparition as="li" key={p.id} delai={i * 100} className="flex items-center gap-5 py-5">
                  <span aria-hidden="true" className={`h-16 w-12 shrink-0 rounded-[3px] border border-[var(--trait)] shadow-sm ${styles[p.id]}`} />
                  <span>
                    <span className="block font-[family-name:var(--titres)] text-2xl italic">{p.nom} · {p.grammage}</span>
                    <span className="block text-[var(--doux)]">{p.texte}</span>
                  </span>
                </Apparition>
              ))}
              <li className="py-5 text-[var(--doux)]">Et une carte imprimée à la presse, pour voir l&apos;encre dans le papier.</li>
            </ul>
          </div>
          <Apparition de="rideau" className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-[6px] shadow-[0_40px_80px_-40px_rgba(30,42,90,.7)]">
            <Image src={photos.papiers.src} alt={photos.papiers.alt} fill sizes="(min-width: 768px) 384px, 90vw" className="kit-cinema-img object-cover" />
          </Apparition>
        </div>
      </section>

      <section className="mx-auto max-w-3xl space-y-6 px-5 py-24 text-center">
        <TitreRevele
          texte={"Pourquoi *par la poste ?*"}
          className="text-[clamp(2.8rem,6vw,5rem)] font-normal italic leading-[0.95] tracking-[-0.03em]"
          classeAccent="not-italic text-[var(--accent-texte)]"
        />
        <p className="text-xl leading-relaxed">
          Parce qu&apos;un écran ne dit ni l&apos;épaisseur, ni le grain, ni la façon dont l&apos;encre s&apos;y
          pose. Un faire-part, on le garde des années : il mérite qu&apos;on le choisisse avec les doigts.
        </p>
        <p className="text-[var(--doux)]">L&apos;enveloppe est offerte, que tu commandes ensuite ou non.</p>
      </section>

      <AppelFinal />
    </main>
  );
}
