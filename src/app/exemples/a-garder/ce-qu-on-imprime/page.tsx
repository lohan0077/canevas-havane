import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import CalculPalier from "../../_kit/CalculPalier";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, Bouton, EnTetePage, FairePart, MenuResto, Surtitre } from "../_composants/Blocs";
import { DOSSIER, photos } from "../_composants/donnees";
import Frigo from "../_composants/Frigo";

export const metadata: Metadata = {
  title: "Ce qu'on imprime — À Garder, site de démonstration",
  description: "Ce qu'imprime une imprimerie imaginaire : faire-part, menus, cartes à aimanter sur le frigo, avec des prix d'exemple.",
  ...adressesDeLaPage("/exemples/a-garder/ce-qu-on-imprime"),
};

const PALIERS = [
  { jusqua: 30, titre: "Petite série, coton 600 g", prix: "à partir de 129 € TTC · exemple", detail: "Enveloppes kraft comprises, bon à tirer avant impression." },
  { jusqua: 60, titre: "Série moyenne, coton 600 g", prix: "à partir de 189 € TTC · exemple", detail: "La plus demandée pour un mariage." },
  { jusqua: 120, titre: "Grande série, coton ou vergé", prix: "à partir de 299 € TTC · exemple", detail: "On imprime en deux passes, pour vérifier chaque feuille." },
  { jusqua: 200, titre: "Très grande série", prix: "à partir de 429 € TTC · exemple", detail: "On t'appelle avant, pour choisir ensemble le papier." },
];

export default function CeQuOnImprime() {
  return (
    <main>
      <EnTetePage surtitre="Ce qu'on imprime" titre="Trois choses, et *ce qu'on garde.*" photo={photos.cartes}>
        Des faire-part, des menus, des cartes. Rien qui finisse à la poubelle deux jours plus tard.
      </EnTetePage>

      <section className="border-y border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto max-w-6xl space-y-10 px-5 py-20 sm:px-8 md:py-28">
          <TitreRevele
            texte="La porte *du frigo.*"
            className="text-[clamp(2.8rem,6vw,5rem)] font-normal italic leading-[0.95] tracking-[-0.03em]"
            classeAccent="not-italic text-[var(--accent-texte)]"
          />
          <Apparition de="zoom"><Frigo /></Apparition>
        </div>
      </section>

      <section id="faire-part" className="scroll-mt-24 mx-auto grid max-w-6xl gap-14 px-5 py-24 sm:px-8 md:grid-cols-[0.8fr_1.2fr] md:items-center md:py-32">
        <Apparition de="zoom"><FairePart className="mx-auto w-[230px] sm:w-[290px]" /></Apparition>
        <div className="space-y-6">
          <Apparition><Surtitre>Les faire-part</Surtitre></Apparition>
          <TitreRevele
            texte={"Combien *en veux-tu\u202f?*"}
            className="text-[clamp(2.8rem,6vw,5rem)] font-normal italic leading-[0.95] tracking-[-0.03em]"
            classeAccent="not-italic text-[var(--accent-texte)]"
          />
          <p className="text-lg leading-relaxed">
            Mariage, naissance, baptême, et même un départ à la retraite. Papier coton ou vergé,
            presse typographique, enveloppes assorties.
          </p>
          <div className="[&_*]:[font-variant-numeric:lining-nums_tabular-nums]!">
            <CalculPalier
              etiquette="Nombre de faire-part"
              unite="faire-part"
              min={10}
              max={200}
              pas={10}
              depart={50}
              paliers={PALIERS}
              titreResultat="Pour toi"
              legende="Prix TTC d'exemple pour un particulier, maquette et enveloppes comprises. Le devis final dépend du papier et des couleurs."
            />
          </div>
        </div>
      </section>

      <section id="menus" className="scroll-mt-24 border-y border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto grid max-w-6xl gap-14 px-5 py-24 sm:px-8 md:grid-cols-2 md:items-center md:py-32">
          <div className="space-y-6">
            <Apparition><Surtitre>Les menus</Surtitre></Apparition>
            <TitreRevele
              texte="Le menu *de fête.*"
              className="text-[clamp(2.8rem,6vw,5rem)] font-normal italic leading-[0.95] tracking-[-0.03em]"
              classeAccent="not-italic text-[var(--accent-texte)]"
            />
            <p className="text-lg leading-relaxed">
              Le menu d&apos;un réveillon de famille (20 menus : 59&nbsp;€ TTC, exemple), ou la carte
              d&apos;un restaurant. Pour les restaurateurs, les prix sont hors taxes, sur devis : la
              première série des restaurants d&apos;en face est offerte.
            </p>
            <p className="text-[var(--doux)]">Le contenu d&apos;un menu de restaurant — plats, prix, mentions — reste celui du restaurant.</p>
          </div>
          <Apparition de="zoom"><MenuResto /></Apparition>
        </div>
      </section>

      <section id="cartes" className="scroll-mt-24 px-3 py-3 sm:px-5 sm:py-5">
        <div className="kit-grain mx-auto rounded-[2.5rem] bg-[var(--sombre)] px-6 py-24 text-center text-[var(--sur-sombre)] sm:px-10">
          <div className="mx-auto max-w-3xl space-y-6">
            <TitreRevele
              texte="Les cartes *du frigo.*"
              className="text-[clamp(2.8rem,6vw,5rem)] font-normal italic leading-[0.95] tracking-[-0.03em]"
              classeAccent="not-italic text-[#F5C76A]"
            />
            <p className="text-lg leading-relaxed">
              Cartes postales, dessins d&apos;enfants, listes de courses qui durent : couché mat ou kraft,
              coins arrondis, un aimant au dos si tu veux. 30 cartes : 45&nbsp;€ TTC, exemple.
            </p>
            <Bouton href={`${DOSSIER}/echantillons`} variante="clair">Toucher le papier d&apos;abord</Bouton>
          </div>
        </div>
      </section>

      <div className="h-20" />
      <AppelFinal />
    </main>
  );
}
