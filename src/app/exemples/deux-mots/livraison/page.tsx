import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import CalculPalier from "../../_kit/CalculPalier";
import { boutique } from "../_composants/donnees";
import { HeureLimite, Libelle } from "../_composants/Blocs";

export const metadata: Metadata = {
  title: "Livraison — Deux Mots — site de démonstration",
  description: "Livraison de fleurs le jour même par un fleuriste imaginaire : commandé avant 14 h, livré aujourd'hui, dans la ville et les communes voisines.",
  ...adressesDeLaPage("/exemples/deux-mots/livraison"),
};

export default function Livraison() {
  return (
    <main>
      <HeureLimite niveau={1} />
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-2">
        <div className="space-y-6">
          <Libelle>Ma rue est-elle livrée ?</Libelle>
          <h2 className="text-5xl">
            À combien de la boutique <span className="italic text-[var(--accent-texte)]">habite-t-il&nbsp;?</span>
          </h2>
          <p className="text-lg leading-relaxed">
            On livre nous-mêmes, à vélo-cargo dans la ville, en voiture au-delà. Glisse jusqu&apos;à la
            distance : tu vois le tarif, et jusqu&apos;à quelle heure commander pour aujourd&apos;hui.
          </p>
          <ul className="space-y-3 text-lg">
            <li>· Du mardi au samedi, de 10 h à 19 h.</li>
            <li>· Si personne n&apos;est là, on appelle ; puis on laisse le bouquet chez un voisin ou on revient le lendemain.</li>
            <li>· Retrait en boutique : gratuit, {boutique.horaires[0].heures}.</li>
          </ul>
        </div>
        <CalculPalier
          etiquette="Distance de la boutique"
          unite="km"
          min={1}
          max={25}
          depart={4}
          titreResultat="Livraison"
          paliers={[
            { jusqua: 3, titre: "Dans le quartier, à vélo", prix: "6 € TTC", detail: "Commandé avant 14 h, livré aujourd'hui." },
            { jusqua: 8, titre: "Dans la ville", prix: "9 € TTC", detail: "Commandé avant 14 h, livré aujourd'hui." },
            { jusqua: 15, titre: "Les communes voisines", prix: "12 € TTC", detail: "Commandé avant 12 h, livré aujourd'hui ; après, demain matin." },
            { jusqua: 25, titre: "Trop loin pour nous", detail: "On ne livre pas si loin : le bouquet t'attend en boutique, ou on te conseille un fleuriste près de chez lui." },
          ]}
          legende="Tarifs et distances d'exemple : la boutique est fictive. Rien n'est envoyé."
        />
      </div>
    </main>
  );
}
