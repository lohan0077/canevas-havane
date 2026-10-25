import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, EnTetePage, Surtitre } from "../_composants/Blocs";
import Liste from "../_composants/Liste";
import { photos } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Ouvrir un restaurant — Reviens., site de démonstration",
  description:
    "La liste de base du matériel pour ouvrir une pizzeria, un restaurant rapide ou un bar, chiffrée en hors taxes, chez Reviens., dépôt de matériel professionnel imaginaire.",
  ...adressesDeLaPage("/exemples/reviens/ouvrir-un-restaurant"),
};

const CADRE = [
  ["Ce que la liste comprend", "Le gros matériel : cuisson, froid, laverie, extraction. Ce qui se commande en premier, et qui pèse le plus dans le budget."],
  ["Ce qu'elle ne comprend pas", "Le petit matériel, la vaisselle, l'installation, les raccordements électriques et l'évacuation : chiffrés après une visite."],
  ["Le prix", "Hors taxes, vente réservée aux professionnels. Le TTC est écrit sous le total. Prix d'exemple : le dépôt est fictif."],
];

export default function OuvrirUnRestaurant() {
  return (
    <main>
      <EnTetePage surtitre="Liste du matériel" n="01" titre="Pour ouvrir un restaurant, *la liste de base.*" photo={photos.four}>
        Pizzeria, restaurant rapide, bar : choisis ton métier. Le gros matériel qu&apos;il lui faut,
        chiffré, à commander d&apos;un coup.
      </EnTetePage>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div className="space-y-6 lg:sticky lg:top-28">
          <Apparition><Surtitre n="02">Ce que les gens tapent</Surtitre></Apparition>
          <TitreRevele
            texte={"«\u00a0Liste matériel pour ouvrir *un restaurant\u00a0».*"}
            className="font-[family-name:var(--titres)] text-[clamp(2.2rem,4.4vw,3.8rem)] font-black uppercase leading-[0.95] tracking-[-0.04em]"
            classeAccent="text-[var(--accent-texte)]"
          />
          <Apparition as="p" delai={150} className="max-w-md text-lg leading-relaxed text-[var(--doux)]">
            Décoche ce que tu as déjà : le total hors taxes suit. Puis « Tout commander » : le comptoir te
            rappelle pour la livraison et l&apos;installation.
          </Apparition>
          <Apparition className="relative hidden aspect-[3/4] overflow-hidden rounded-[18px] lg:block">
            <Image src={photos.louches.src} alt={photos.louches.alt} fill sizes="35vw" className="object-cover" />
          </Apparition>
        </div>
        <Liste />
      </section>

      <section className="border-y border-dashed border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto grid max-w-7xl gap-4 px-5 py-20 sm:px-8 md:grid-cols-3">
          {CADRE.map(([t, d], i) => (
            <Apparition key={t} delai={i * 120} de="zoom" className="space-y-3 rounded-[16px] border-2 border-[var(--encre)] bg-[var(--fond)] p-6">
              <p className="font-[family-name:var(--titres)] text-[13px] font-bold uppercase tracking-[0.2em] text-[var(--accent-texte)]">0{i + 3}</p>
              <h2 className="font-[family-name:var(--titres)] text-2xl font-black uppercase leading-tight">{t}</h2>
              <p className="text-[var(--doux)]">{d}</p>
            </Apparition>
          ))}
        </div>
      </section>

      <div className="h-20 md:h-28" />
      <AppelFinal />
    </main>
  );
}
