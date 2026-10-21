import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import { Intitule, Section } from "../_composants/Blocs";
import { FactureEncadree } from "../_composants/Ornements";
import { photos } from "../_composants/donnees";

// Le coup de lancement de la vidéo, devenu une page : « Votre première facture mérite un
// cadre. » Réservé aux clients du cabinet : un geste discret, pas une promesse faite au
// public (décret n° 2012-432, art. 152 : moyens de promotion « mis en œuvre avec
// discrétion »).
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
      <Section sombre className="grid gap-12 pt-12 sm:pt-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <Intitule niveau={1} surtitre="Pour nos clients" titre={<>Votre première facture <em className="font-normal">mérite un cadre.</em></>}>
          Le jour où un client du cabinet encaisse sa première facture, nous lui envoyons le
          cadre. Par la poste, avec un mot. Ce n&apos;est pas une offre : c&apos;est une habitude
          de la maison, réservée à nos clients.
        </Intitule>
        <div className="relative pb-24">
          <FactureEncadree className="mx-auto w-full max-w-[320px] -rotate-2" />
          <p className="absolute bottom-0 right-0 rotate-[5deg] bg-[#FBF6EA] px-4 py-3 font-[family-name:var(--f-caveat)] text-[26px] leading-tight text-[#1E3B32] shadow-lg">
            Bravo pour la première.
            <span className="block text-right text-[20px]">— Premier Billet</span>
          </p>
        </div>
      </Section>

      <Section className="space-y-12">
        <Intitule surtitre="Comment ça se passe" titre="Trois temps, aucune cérémonie." />
        <ol className="grid gap-px border border-[var(--trait)] bg-[var(--trait)] md:grid-cols-3">
          {ETAPES.map((e, i) => (
            <li key={e.titre} className="space-y-3 bg-[var(--carte)] p-7">
              <p className="font-[family-name:var(--titres)] text-[44px] font-semibold leading-none text-[var(--accent-texte)]">{i + 1}</p>
              <h2 className="text-[26px] font-semibold leading-tight">{e.titre}</h2>
              <p className="leading-relaxed text-[var(--doux)]">{e.texte}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="relative aspect-[3/2] overflow-hidden border border-[var(--trait)]">
          <Image src={photos.cadre.src} alt={photos.cadre.alt} fill sizes="(min-width: 1024px) 540px, 100vw" className="object-cover" />
        </div>
        <Intitule surtitre="Pourquoi" titre={<>Un bilan, ça s&apos;oublie. <em className="font-normal">Une première facture, jamais.</em></>}>
          Les comptes annuels se rangent dans un classeur. La première facture, elle, raconte le
          jour où l&apos;entreprise a cessé d&apos;être un projet. Elle a sa place au mur, au-dessus du
          bureau ou de la caisse.
        </Intitule>
      </Section>
    </main>
  );
}
