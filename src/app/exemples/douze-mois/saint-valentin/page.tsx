import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Panier from "../../_kit/Panier";
import { PHOTOS } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "14 février — Douze Mois — site de démonstration",
  description: "Pour la Saint-Valentin, une boutique de fleurs imaginaire ne vend pas une seule rose : du mimosa, la fleur de février.",
  ...adressesDeLaPage("/exemples/douze-mois/saint-valentin"),
};

// Le coup de lancement de la vidéo : à la Saint-Valentin, pas une rose. Du mimosa.
// Le 14 février 2027 tombe un dimanche : la boutique, ouverte du mardi au samedi,
// fait les retraits le samedi 13.
export default function SaintValentin() {
  return (
    <main>
      <section className="bg-[#F6D965] text-[#3A2A10]">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.1fr_0.9fr] md:items-center md:py-20">
          <div className="space-y-6">
            <p className="text-[11px] uppercase tracking-[0.26em]">Douze Mois · 14 février</p>
            <h1 className="text-[72px] leading-[0.92] sm:text-[120px]">
              Pas de roses. Du <span className="italic text-[#8E2A1A]">mimosa.</span>
            </h1>
            <p className="max-w-md text-lg leading-relaxed">
              En février, ce qui fleurit en France, c&apos;est le mimosa. Les roses attendront juin.
              Pour la Saint-Valentin, on ne vendra donc pas une seule rose rouge.
            </p>
          </div>
          <div className="relative mx-auto aspect-[2/3] w-full max-w-sm overflow-hidden border border-[#3A2A10]">
            <Image src={PHOTOS.mimosa.src} alt={PHOTOS.mimosa.alt} width={PHOTOS.mimosa.largeur} height={PHOTOS.mimosa.hauteur} sizes="(min-width: 768px) 380px, 100vw" priority className="h-full w-full object-cover" />
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2">
        <div className="space-y-5">
          <p className="text-[11px] uppercase tracking-[0.26em] text-[var(--doux)]">Réserver son mimosa</p>
          <h2 className="text-5xl">Retrait le <span className="italic">samedi 13 février.</span></h2>
          <p className="leading-relaxed text-[var(--doux)]">
            Le 14 février 2027 tombe un dimanche : on prépare tout le samedi 13, à prendre en
            boutique de 9 h 30 à 19 h, ou livré dans la ville. Réserver aide à commander au
            producteur la juste quantité.
          </p>
        </div>
        <Panier
          produits={[
            { nom: "La brassée de mimosa", detail: "quelques branches, rien d'autre", prix: 25 },
            { nom: "Mimosa et anémones", detail: "le jaune et le rouge de février", prix: 38 },
            { nom: "La carte écrite à la main", detail: "ta phrase, à l'encre", prix: 3 },
          ]}
          bouton="Réserver pour le 13 février"
          confirmation="Mimosa réservé pour le samedi 13 février."
          mention="Prix TTC d'exemple. Rien n'est payé en ligne : tu règles au retrait."
        />
      </section>
    </main>
  );
}
