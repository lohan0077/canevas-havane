import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { ACCENT, AppelFinal, EnTetePage, Surtitre, TITRE } from "../_composants/Blocs";
import { FactureEncadree } from "../_composants/Ornements";
import { photos } from "../_composants/donnees";

// Le coup de lancement de la vidéo « Créer une marque », devenu une page : « Votre
// première facture mérite un cadre. » Réservé aux clients du cabinet : un geste discret,
// pas une promesse faite au public (décret n° 2012-432, art. 152 : moyens de promotion
// « mis en œuvre avec discrétion »).
export const metadata: Metadata = {
  title: "Le cadre — Premier Billet, site de démonstration",
  description: "Le jour où un client du cabinet encaisse sa première facture, il reçoit un cadre, par la poste, avec un mot. Page de démonstration d'un cabinet imaginaire.",
  ...adressesDeLaPage("/exemples/premier-billet/le-cadre"),
};

const ETAPES = [
  { titre: "Vous encaissez votre première facture", texte: "Celle qu'un client vous a payée, pas celle que vous avez envoyée." },
  { titre: "Nous le voyons passer", texte: "En tenant vos comptes, ou parce que vous nous le dites. Vous pouvez aussi préférer qu'on n'en fasse rien." },
  { titre: "Le cadre part par la poste", texte: "Un cadre en bois clair, votre première facture imprimée dedans, et un mot écrit à la main." },
];

export default function LeCadre() {
  return (
    <main>
      <EnTetePage
        vert
        surtitre="Pour nos clients"
        titre="Votre première facture *mérite un cadre.*"
        aCote={
          <div className="relative mx-auto max-w-[340px] pb-20">
            <FactureEncadree legende={false} className="-rotate-2" />
            <p className="absolute -bottom-2 right-0 rotate-[5deg] bg-[#FBF6EA] px-4 py-3 font-[family-name:var(--f-caveat)] text-[28px] leading-tight text-[#17302A] shadow-lg">
              Bravo pour la première.
              <span className="block text-right text-[21px]">— Premier Billet</span>
            </p>
          </div>
        }
      >
        Le jour où un client du cabinet encaisse sa première facture, nous lui envoyons le cadre.
        Par la poste, avec un mot. Ce n&apos;est pas une offre : c&apos;est une habitude de la
        maison, réservée à nos clients.
      </EnTetePage>

      <section className="mx-auto max-w-7xl space-y-12 px-5 py-24 sm:px-8 md:py-32">
        <div className="space-y-6">
          <Apparition><Surtitre>Comment ça se passe</Surtitre></Apparition>
          <TitreRevele texte="Trois temps, *aucune cérémonie.*" className={`text-[clamp(2.6rem,5.5vw,5rem)] ${TITRE}`} classeAccent={ACCENT} />
        </div>
        <ol className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {ETAPES.map((e, i) => (
            <Apparition as="li" key={e.titre} delai={i * 120} de="zoom" className="flex min-h-[300px] flex-col justify-between gap-8 border border-[var(--trait)] bg-[var(--carte)] p-7">
              <p className="font-[family-name:var(--titres)] text-[80px] font-semibold leading-none text-[var(--accent-texte)]">{i + 1}</p>
              <div className="space-y-3">
                <h2 className="text-[28px] font-semibold leading-tight">{e.titre}</h2>
                <p className="leading-relaxed text-[var(--doux)]">{e.texte}</p>
              </div>
            </Apparition>
          ))}
        </ol>
      </section>

      <section className="mx-auto grid grid-cols-1 max-w-7xl gap-12 px-5 pb-24 sm:px-8 md:pb-32 lg:grid-cols-2 lg:items-center">
        <Apparition de="rideau" className="relative aspect-[3/2] overflow-hidden">
          <Image src={photos.cadre.src} alt={photos.cadre.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="kit-cinema-img object-cover" />
        </Apparition>
        <div className="space-y-6">
          <Apparition><Surtitre>Pourquoi</Surtitre></Apparition>
          <TitreRevele texte="Un bilan, ça s'oublie. *Une première facture, jamais.*" className={`text-[clamp(2.4rem,4.8vw,4.4rem)] ${TITRE}`} classeAccent={ACCENT} />
          <Apparition as="p" delai={150} className="text-[19px] leading-relaxed text-[var(--doux)]">
            Les comptes annuels se rangent dans un classeur. La première facture, elle, raconte le
            jour où l&apos;entreprise a cessé d&apos;être un projet. Elle a sa place au mur, au-dessus
            du bureau ou de la caisse.
          </Apparition>
        </div>
      </section>

      <AppelFinal />
    </main>
  );
}
