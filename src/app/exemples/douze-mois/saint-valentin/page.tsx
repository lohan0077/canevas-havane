import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import Panier from "../../_kit/Panier";
import { AppelFinal, EnTetePage, Surtitre, Titre } from "../_composants/Blocs";
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
      <EnTetePage surtitre="Douze Mois · 14 février" titre={"Pas de roses. *Du mimosa.*"} photo={PHOTOS.mimosaLarge} origine="60% 40%">
        En février, ce qui fleurit en France, c&apos;est le mimosa. Les roses attendront juin. Pour
        la Saint-Valentin, on ne vendra donc pas une seule rose rouge.
      </EnTetePage>

      <section>
        <div className="mx-auto grid max-w-6xl gap-14 px-6 py-28 md:py-40 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <Apparition className="relative mx-auto aspect-[2/3] w-full max-w-sm overflow-hidden rounded-2xl">
            <Image src={PHOTOS.mimosaBranche.src} alt={PHOTOS.mimosaBranche.alt} fill sizes="(min-width: 1024px) 380px, 90vw" className="object-cover" />
          </Apparition>
          <div className="space-y-6">
            <Apparition><Surtitre>L&apos;affiche de la vitrine</Surtitre></Apparition>
            <Titre texte="Certains vont râler. *Tant mieux.*" />
            <Apparition as="p" delai={150} className="max-w-[26rem] text-lg leading-relaxed text-[var(--doux)]">
              Une seule affiche en vitrine, du jaune partout, et pas une rose rouge. Tant mieux&nbsp;: on
              parlera de la boutique. Et le premier mars, on dira au revoir au mimosa.
            </Apparition>
          </div>
        </div>
      </section>

      <section className="bg-[var(--carte)]">
        <div className="mx-auto grid max-w-6xl gap-14 px-6 py-28 md:py-40 lg:grid-cols-2">
          <div className="space-y-6">
            <Apparition><Surtitre>Réserver son mimosa</Surtitre></Apparition>
            <Titre texte="Retrait le *samedi 13 février.*" />
            <Apparition as="p" delai={150} className="max-w-[26rem] text-lg leading-relaxed text-[var(--doux)]">
              Le 14 février 2027 tombe un dimanche : on prépare tout le samedi 13, à prendre en
              boutique de 9 h 30 à 19 h, ou livré dans la ville. Réserver aide à commander au
              producteur la juste quantité.
            </Apparition>
          </div>
          <Apparition>
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
        </div>
      </section>
      <AppelFinal />
    </main>
  );
}
