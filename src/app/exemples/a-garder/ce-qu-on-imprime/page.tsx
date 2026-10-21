import type { Metadata } from "next";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import CalculPalier from "../../_kit/CalculPalier";
import { DOSSIER } from "../_composants/donnees";
import { FairePart, MenuResto } from "../_composants/Blocs";
import Frigo from "../_composants/Frigo";

export const metadata: Metadata = {
  title: "À Garder — site de démonstration",
  description: "Ce qu'imprime une imprimerie imaginaire : faire-part, menus, cartes à aimanter sur le frigo, avec des prix d'exemple.",
  ...adressesDeLaPage("/exemples/a-garder/ce-qu-on-imprime"),
};

const PALIERS = [
  { jusqua: 30, titre: "Petite série, coton 600 g", prix: "à partir de 129\u00A0€ TTC · exemple", detail: "Enveloppes kraft comprises, bon à tirer avant impression." },
  { jusqua: 60, titre: "Série moyenne, coton 600 g", prix: "à partir de 189\u00A0€ TTC · exemple", detail: "La plus demandée pour un mariage." },
  { jusqua: 120, titre: "Grande série, coton ou vergé", prix: "à partir de 299\u00A0€ TTC · exemple", detail: "On imprime en deux passes, pour vérifier chaque feuille." },
  { jusqua: 200, titre: "Très grande série", prix: "à partir de 429\u00A0€ TTC · exemple", detail: "On t'appelle avant, pour choisir ensemble le papier." },
];

export default function CeQuOnImprime() {
  return (
    <>
      <section className="mx-auto max-w-6xl space-y-6 px-5 pb-12 pt-10 sm:pt-16">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--accent-texte)]">Ce qu&apos;on imprime</p>
        <h1 className="max-w-4xl text-6xl font-normal italic sm:text-8xl">Trois choses, et ce qu&apos;on garde.</h1>
        <p className="max-w-2xl text-xl leading-relaxed text-[var(--doux)]">
          Des faire-part, des menus, des cartes. Rien qui finisse à la poubelle deux jours plus
          tard.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20">
        <Frigo />
      </section>

      <section id="faire-part" className="border-y border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-[0.8fr_1.2fr] md:items-center">
          <FairePart className="mx-auto w-[230px] sm:w-[280px]" />
          <div className="space-y-6">
            <h2 className="text-5xl italic sm:text-6xl">Les faire-part.</h2>
            <p className="text-lg leading-relaxed">
              Mariage, naissance, baptême, et même un départ à la retraite. Papier coton ou vergé,
              presse typographique, enveloppes assorties. Combien en veux-tu&nbsp;?
            </p>
            {/* Zilla Slab a des chiffres bas de casse : le kit pose `tabular-nums`, on y ajoute les chiffres alignés. */}
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
        </div>
      </section>

      <section id="menus" className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-2 md:items-center">
        <div className="space-y-5">
          <h2 className="text-5xl italic sm:text-6xl">Les menus.</h2>
          <p className="text-lg leading-relaxed">
            Le menu de fête d&apos;une famille (20 menus : 59&nbsp;€ TTC, exemple), ou la carte d&apos;un
            restaurant. Pour les restaurateurs, les prix sont hors taxes, sur devis : la première
            série des restaurants d&apos;en face est offerte.
          </p>
          <p className="text-[var(--doux)]">Le contenu d&apos;un menu de restaurant — plats, prix, mentions — reste celui du restaurant.</p>
        </div>
        <MenuResto />
      </section>

      <section id="cartes" className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto max-w-4xl space-y-5 px-5 py-20 text-center">
          <h2 className="text-5xl italic sm:text-6xl">Les cartes du frigo.</h2>
          <p className="text-lg leading-relaxed">
            Cartes postales, dessins d&apos;enfants, listes de courses qui durent : couché mat ou
            kraft, coins arrondis, un aimant au dos si tu veux. 30 cartes : 45&nbsp;€ TTC, exemple.
          </p>
          <Link href={`${DOSSIER}/echantillons`} className="inline-flex min-h-[54px] items-center rounded-full bg-[var(--accent)] px-7 text-lg font-bold text-[var(--sur-accent)]">
            Toucher le papier d&apos;abord
          </Link>
        </div>
      </section>
    </>
  );
}
