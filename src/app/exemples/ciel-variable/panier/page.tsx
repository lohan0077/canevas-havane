import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Panier from "../../_kit/Panier";
import { BULLETINS, ferme } from "../_composants/donnees";
import { Faits } from "../_composants/Meteo";
import PanierSemaine from "../_composants/PanierSemaine";
import { Libelle, Titre } from "../_composants/Blocs";

export const metadata: Metadata = {
  title: "Le panier — Ciel Variable — site de démonstration",
  description: "Le panier de légumes de la semaine d'une ferme imaginaire, décidé par le ciel : ce qu'il y a dedans, pourquoi, et la réservation pour samedi.",
  ...adressesDeLaPage("/exemples/ciel-variable/panier"),
};

const B = BULLETINS[0];

export default function LePanier() {
  return (
    <main className="mx-auto max-w-6xl px-4 pb-20 pt-12 sm:px-6 sm:pt-20">
      <div className="max-w-3xl space-y-5">
        <Libelle>Le panier · semaine {B.numero}</Libelle>
        <Titre niveau={1} className="text-[44px] sm:text-7xl">Le ciel a fait le tri</Titre>
        <p className="text-xl leading-snug">
          Le panier de cette semaine découle du bulletin n° {B.numero}. Ce qui a gelé n&apos;y est
          pas ; ce que la pluie a fait gonfler y est. On te le dit avant que tu réserves.
        </p>
      </div>

      <div className="mt-14 grid gap-14 md:grid-cols-2">
        <div className="space-y-10">
          <div className="space-y-3">
            <Libelle>Ce que le ciel a fait</Libelle>
            <Faits bulletin={B} />
          </div>
          <div className="space-y-3">
            <Libelle>Donc, dans le panier</Libelle>
            <PanierSemaine bulletin={B} ouvert="Salade" />
          </div>
        </div>
        <div className="space-y-6 md:sticky md:top-24 md:self-start">
          <Libelle>Réserver pour samedi</Libelle>
          <Panier
            produits={[
              { nom: "Le petit panier", detail: "pour 1 ou 2 · semaine " + B.numero, prix: 15 },
              { nom: "Le grand panier", detail: "pour 3 ou 4 · semaine " + B.numero, prix: 24 },
              { nom: "La botte d'herbes", detail: "persil, ciboulette, selon le ciel", prix: 2.5 },
            ]}
            bouton="Réserver pour samedi"
            confirmation={`Panier réservé : à retirer ${ferme.retrait}.`}
            mention="Prix TTC d'exemple. Rien n'est payé en ligne : tu règles au retrait, à la ferme."
          />
        </div>
      </div>
    </main>
  );
}
