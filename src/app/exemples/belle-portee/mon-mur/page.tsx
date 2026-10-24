import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import { AppelFinal, EnTetePage, Surtitre } from "../_composants/Blocs";
import MonMur from "../_composants/MonMur";
import { photos } from "../_composants/donnees";

// La vidéo « Créer une marque » : « Sur le site, tu prends ton mur en photo. Tu dis ce
// qu'il y a au-dessus, et la largeur que tu veux ouvrir. » L'outil, filmé tel quel.
export const metadata: Metadata = {
  title: "Mon mur en photo — Belle Portée, site de démonstration",
  description: "Ton mur en photo, ce qu'il y a au-dessus, la largeur à ouvrir : ce que la visite vérifiera. Démonstration d'un bureau d'études structure imaginaire.",
  ...adressesDeLaPage("/exemples/belle-portee/mon-mur"),
};

export default function PageMonMur() {
  return (
    <main>
      <EnTetePage surtitre="Ton projet" titre="Ton mur, *en photo.*" photo={photos.etais} cote="LA LARGEUR QUE TU VEUX">
        Trois réponses, et on sait quoi regarder en arrivant. La photo reste sur ton téléphone : rien
        n&apos;est envoyé.
      </EnTetePage>
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-8 md:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div className="order-2 space-y-6 lg:order-1 lg:sticky lg:top-28">
          <Apparition><Surtitre>Pour une photo utile</Surtitre></Apparition>
          <Apparition as="ul" delai={100} className="space-y-3 border-l-4 border-[var(--accent)] pl-4 text-lg leading-relaxed">
            <li>Prends le mur de face, en entier, du sol au plafond.</li>
            <li>Si tu peux, une deuxième photo du plafond, au-dessus du mur.</li>
            <li>Pas besoin de mesurer au millimètre : on mesurera sur place.</li>
          </Apparition>
          <Apparition delai={200} className="border-2 border-[var(--encre)] bg-[var(--encre)] p-5 text-[var(--sur-sombre)]">
            <p className="font-[family-name:var(--titres)] text-2xl font-black uppercase leading-none">Pas de oui <span className="text-[#F2B134]">à distance.</span></p>
            <p className="mt-2 leading-relaxed text-[var(--sur-sombre)]/90">Le site te dit ce que la visite vérifiera. La poutre, c&apos;est la note de calcul qui la fixera, après.</p>
          </Apparition>
        </div>
        <div className="order-1 lg:order-2">
          <MonMur />
        </div>
      </section>
      <AppelFinal />
    </main>
  );
}
