import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Panier from "../../_kit/Panier";
import Creneaux from "../../_kit/Creneaux";
import { CRENEAUX, FORMULE, INVENTAIRE, entreprise, photos } from "../_composants/donnees";
import { Cartel } from "../_composants/Blocs";
import AtelierBoite from "../_composants/AtelierBoite";

// La page de la boîte : l'étiquette qu'on écrit soi-même, le prix détaillé (TTC,
// marqué exemple), les boîtes en plus, et les dates de séance qu'on réserve.
export const metadata: Metadata = {
  title: "La boîte · Pour Plus Tard — site de démonstration",
  description: "Une séance et une boîte de vingt tirages à ton nom, livrée chez toi : 390 € TTC (prix d'exemple). Site de démonstration réalisé par Canevas Havane.",
  ...adressesDeLaPage("/exemples/pour-plus-tard/la-boite"),
};

export default function LaBoite() {
  return (
    <main>
      <section className="max-w-6xl mx-auto px-5 pt-8 pb-14 sm:pt-12 grid gap-10 md:grid-cols-[1.1fr_1fr] md:items-end">
        <div className="space-y-6">
          <Cartel numero="1">La boîte</Cartel>
          <h1 className="text-[52px] sm:text-7xl font-normal">
            Vingt tirages, <span className="italic">une boîte, ton nom.</span>
          </h1>
          <p className="text-lg leading-relaxed">
            {FORMULE.nom}, {FORMULE.prix} TTC (prix d&apos;exemple). La boîte arrive chez toi par
            la poste, ficelée, trois semaines après la séance.
          </p>
        </div>
        <div className="relative aspect-[3/2] overflow-hidden">
          <Image src={photos.colis.src} alt={photos.colis.alt} fill priority sizes="(min-width: 768px) 520px, 100vw" className="object-cover" />
        </div>
      </section>

      <section className="border-y border-[var(--encre)] bg-[var(--carte)]">
        <div className="max-w-6xl mx-auto px-5 py-14 sm:py-20 space-y-10">
          <div className="space-y-4 max-w-2xl">
            <Cartel numero="2">L&apos;étiquette</Cartel>
            <h2 className="text-4xl sm:text-6xl font-normal">Écris le nom <span className="italic">sur la boîte.</span></h2>
          </div>
          <AtelierBoite />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 py-16 sm:py-20 grid gap-10 lg:grid-cols-2 lg:items-start">
        <div className="space-y-6">
          <Cartel numero="3">Le prix, en entier</Cartel>
          <h2 className="text-4xl sm:text-6xl font-normal">Une boîte de plus <span className="italic">pour les grands-parents&nbsp;?</span></h2>
          <ul className="border-t border-[var(--encre)]">
            {INVENTAIRE.slice(0, 4).map((x) => (
              <li key={x.n} className="flex gap-3 border-b border-[var(--trait)] py-3">
                <span className="text-xs font-bold tabular-nums pt-1">{x.n}</span>
                <span>{x.titre}</span>
              </li>
            ))}
          </ul>
          <p className="leading-relaxed text-[var(--doux)]">
            Livraison comprise en France métropolitaine. Séance à 30 km autour du studio,
            déplacement compris. Tout est payé le jour de la séance, rien en ligne (exemple).
          </p>
        </div>
        <Panier
          produits={[
            { nom: FORMULE.nom, detail: "La séance et la boîte à ton nom", prix: FORMULE.prixNombre },
            { nom: "Boîte en double", detail: "Les mêmes vingt tirages, pour quelqu'un d'autre", prix: 120 },
            { nom: "Tirage 30 × 40", detail: "Ta préférée, en grand, papier mat", prix: 45 },
          ]}
          bouton="Préparer ma commande"
          confirmation="Commande prête : on la confirme ensemble le jour de la séance."
          mention="Prix TTC d'exemple, livraison comprise. Les boîtes en plus se commandent après la séance."
        />
      </section>

      <section id="reserver" className="scroll-mt-20 border-t border-[var(--encre)]">
        <div className="max-w-6xl mx-auto px-5 py-16 sm:py-20 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-5">
            <Cartel numero="4">Réserver</Cartel>
            <h2 className="text-4xl sm:text-6xl font-normal">Les séances <span className="italic">de novembre.</span></h2>
            <p className="text-lg leading-relaxed">
              Choisis une date ; on se rappelle pour le lieu. Ou appelle le{" "}
              <a href={`tel:${entreprise.telephoneLien}`} className="underline underline-offset-4 tabular-nums">{entreprise.telephone}</a>{" "}
              (numéro fictif, réservé par l&apos;ARCEP aux œuvres de fiction).
            </p>
          </div>
          <Creneaux
            creneaux={CRENEAUX}
            colonnes={2}
            titreCarte="Ta séance"
            bouton="Réserver cette séance"
            confirmation="Séance réservée. On t'appelle pour le lieu."
            note="Créneaux pris : exemple, l'entreprise est fictive."
          />
        </div>
      </section>
    </main>
  );
}
