import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import { EnTetePage, VersRendezVous } from "../_composants/Blocs";
import Carnet from "../_composants/Carnet";
import Gravure from "../_composants/Gravure";
import { photos } from "../_composants/donnees";

// L'outil de la vidéo « Créer une marque » : « le carnet de famille. Où est quoi, qui
// appeler, ce qui est prévu. Tu le remplis chez toi, et tu le donnes à tes enfants. »
// Rien n'est envoyé ni conservé (CPCE L34-5 ; CMF L341-1, al. 1) : c'est le parent qui
// télécharge le PDF et qui le donne. Filmé : les trois onglets, la ligne « Logement »
// écrite, le PDF, puis le bandeau « c'est toi qui prends rendez-vous ».
export const metadata: Metadata = {
  title: "Le carnet de famille — Dimanche Midi, site de démonstration",
  description:
    "Le carnet de famille d'un cabinet de gestion de patrimoine imaginaire : où est quoi, qui appeler, ce qui est prévu. Il reste sur ton téléphone, et tu le télécharges en PDF.",
  ...adressesDeLaPage("/exemples/dimanche-midi/carnet"),
};

const POINTS = [
  { titre: "Il reste chez toi", texte: "Ce que tu écris ne quitte pas ta page. Le cabinet ne le reçoit pas, ne le lit pas, n'en garde rien." },
  { titre: "C'est toi qui le donnes", texte: "Télécharge-le en PDF, imprime-le, glisse-le dans la boîte bleue. Le cabinet n'écrit jamais à tes enfants." },
  { titre: "Pas besoin de tout savoir", texte: "Une ligne vide, c'est une question pour le prochain dimanche. C'est déjà utile." },
];

export default function PageCarnet() {
  return (
    <main>
      <EnTetePage surtitre="Un seul outil" titre="Le carnet *de famille.*" photo={photos.carnet} origine="40% 55%">
        Trois pages : où est quoi, qui appeler, ce qui est prévu. Écris ce que tu sais, laisse vide
        ce que tu ne sais pas.
      </EnTetePage>

      <section className="mx-auto grid grid-cols-1 max-w-7xl gap-14 px-4 py-16 sm:px-8 md:py-24 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <ul className="order-last space-y-6 px-1 lg:order-first lg:sticky lg:top-28">
          {POINTS.map((p, i) => (
            <Apparition as="li" key={p.titre} delai={i * 120} className="border-l-2 border-[#B5523B] pl-5">
              <p className="font-[family-name:var(--titres)] text-[30px] leading-tight">{p.titre}</p>
              <p className="mt-1 text-[16px] leading-relaxed text-[var(--doux)]">{p.texte}</p>
            </Apparition>
          ))}
        </ul>
        <Carnet />
      </section>

      <div className="mx-auto max-w-5xl overflow-hidden px-2 pb-12">
        <Gravure className="-ml-[30%] h-auto w-[160%] max-w-none sm:ml-0 sm:w-full" />
      </div>

      <VersRendezVous />
    </main>
  );
}
