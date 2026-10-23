import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import Panier from "../../_kit/Panier";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, EnTetePage, Surtitre } from "../_composants/Blocs";
import { PHOTOS } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "14 février — Douze Mois, site de démonstration",
  description: "Pour la Saint-Valentin, une boutique de fleurs imaginaire ne vend pas une seule rose : du mimosa, la fleur de février.",
  ...adressesDeLaPage("/exemples/douze-mois/saint-valentin"),
};

// Le coup de lancement de la vidéo : à la Saint-Valentin, pas une rose. Du mimosa.
// Le 14 février 2027 tombe un dimanche : la boutique, ouverte du mardi au samedi,
// fait les retraits le samedi 13.
export default function SaintValentin() {
  return (
    <main>
      <EnTetePage surtitre="Douze Mois · 14 février" titre={"Pas de roses. Du *mimosa.*"} photo={PHOTOS.mimosaLarge} origine="60% 40%">
        En février, ce qui fleurit en France, c&apos;est le mimosa. Les roses attendront juin. Pour
        la Saint-Valentin, on ne vendra donc pas une seule rose rouge.
      </EnTetePage>

      <section className="bg-[var(--accent)] text-[var(--sur-accent)]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 md:grid-cols-[0.8fr_1.2fr] md:items-center md:py-28">
          <Apparition de="rideau" className="relative mx-auto aspect-[2/3] w-full max-w-sm overflow-hidden rounded-t-full">
            <Image src={PHOTOS.mimosaBranche.src} alt={PHOTOS.mimosaBranche.alt} fill sizes="(min-width: 768px) 380px, 100vw" className="object-cover" />
          </Apparition>
          <div className="space-y-6">
            <p className="text-[12px] font-bold uppercase tracking-[0.24em]">L&apos;affiche de la vitrine</p>
            <TitreRevele
              texte="Certains vont râler. *Tant mieux.*"
              className="font-normal text-[clamp(3rem,7vw,6.5rem)] leading-[0.9] tracking-[-0.04em]"
              classeAccent="italic"
            />
            <p className="max-w-lg text-xl leading-relaxed">
              Une seule affiche en vitrine, du jaune partout, et pas une rose rouge. Tant mieux : on
              parlera de la boutique. Et le premier mars, on dira au revoir au mimosa.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-2">
        <div className="space-y-6">
          <Apparition><Surtitre n="01">Réserver son mimosa</Surtitre></Apparition>
          <TitreRevele
            texte="Retrait le *samedi 13 février.*"
            className="font-normal text-[clamp(2.6rem,5vw,4.5rem)] leading-[0.95] tracking-[-0.035em]"
            classeAccent="italic text-[var(--accent-texte)]"
          />
          <Apparition as="p" delai={150} className="text-lg leading-relaxed text-[var(--doux)]">
            Le 14 février 2027 tombe un dimanche : on prépare tout le samedi 13, à prendre en
            boutique de 9 h 30 à 19 h, ou livré dans la ville. Réserver aide à commander au
            producteur la juste quantité.
          </Apparition>
        </div>
        <Apparition de="zoom">
          <Panier
            produits={[
              { nom: "La brassée de mimosa", detail: "quelques branches, rien d'autre", prix: 25 },
              { nom: "Mimosa et anémones", detail: "le jaune et le rouge de février", prix: 38 },
              { nom: "La carte écrite à la main", detail: "ta phrase, à l'encre", prix: 3 },
            ]}
            bouton="Réserver pour le 13 février"
            confirmation="Mimosa réservé pour le samedi 13 février."
            mention="Prix TTC d'exemple. Rien n'est payé en ligne : tu règles au retrait."
          />
        </Apparition>
      </section>
      <AppelFinal />
    </main>
  );
}
