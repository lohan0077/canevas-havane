import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Creneaux from "../../_kit/Creneaux";
import { Intitule, Section } from "../_composants/Blocs";
import Maison from "../_composants/Maison";
import { LOTISSEMENT, VISITE } from "../_composants/donnees";

// Le coup de lancement de la vidéo, devenu une page : « Samedi, venez voir le n° 14. »
// Avec l'accord des propriétaires (C. civ., art. 9 : respect de la vie privée) ; une vraie
// date ; des groupes réduits parce que la maison est habitée — pas une fausse rareté.
export const metadata: Metadata = {
  title: "Samedi, le n° 14 — Pavillon Bis, site de démonstration",
  description: "Une invitation à visiter une maison des années 70 transformée, avec l'accord de ses propriétaires. Page de démonstration d'une agence d'architecture imaginaire.",
  ...adressesDeLaPage("/exemples/pavillon-bis/visite-du-14"),
};

const PROGRAMME = [
  { quoi: "Le garage du sous-sol, devenu le séjour", detail: "Ouvert sur le jardin, de plain-pied." },
  { quoi: "L'escalier intérieur", detail: "Celui qui manquait depuis 1976 entre les deux niveaux." },
  { quoi: "Les plans, avant et après", detail: "Posés sur la table du séjour : prenez-les en photo." },
];

export default function VisiteDu14() {
  return (
    <main>
      <section style={{ background: "#A63F2A" }} className="text-[#F4EFE6]">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 pb-14 pt-10 sm:px-6 sm:pt-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-5">
            <p className="font-[family-name:var(--titres)] text-[14px] font-bold uppercase tracking-[0.12em]">{LOTISSEMENT.nom} · {VISITE.date}</p>
            <h1 className="text-[52px] font-extrabold leading-[0.98] tracking-[-0.035em] sm:text-[84px]">Samedi, venez voir le n°&nbsp;14.</h1>
            <p className="max-w-lg text-[18px] leading-relaxed">
              La même maison que la vôtre, deuxième version. {VISITE.date}, {VISITE.heures}. Les
              propriétaires ont accepté d&apos;ouvrir leur porte : on visite par petits groupes.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 rounded-[28px] bg-[#F4EFE6] p-4 text-[#2F3B35]">
            <figure>
              <Maison modele="sous-sol" className="block h-auto w-full" libelle="Le n° 14 avant : un pavillon de 1976 sur sous-sol, garage en bas" />
              <figcaption className="mt-1 text-center text-[13px] font-bold">Les voisins</figcaption>
            </figure>
            <figure>
              <Maison modele="sous-sol" apres className="block h-auto w-full" libelle="Le n° 14 après : le sous-sol devenu séjour, une grande baie sur le jardin" />
              <figcaption className="mt-1 text-center text-[13px] font-bold">Le n° 14</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <Section className="grid gap-10 lg:grid-cols-2">
        <Intitule surtitre="Ce que vous verrez" titre="Trois choses, en vingt minutes." />
        <ol className="space-y-4">
          {PROGRAMME.map((p, i) => (
            <li key={p.quoi} className="grid grid-cols-[3rem_1fr] gap-4 border-b-2 border-[var(--trait)] pb-4">
              <span className="font-[family-name:var(--titres)] text-[40px] font-extrabold leading-none text-[var(--accent-texte)]">{i + 1}</span>
              <span>
                <span className="block font-[family-name:var(--titres)] text-[21px] font-bold">{p.quoi}</span>
                <span className="block text-[var(--doux)]">{p.detail}</span>
              </span>
            </li>
          ))}
        </ol>
      </Section>

      <Section sombre className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <Intitule surtitre="Choisir une heure" titre="Par petits groupes.">
          La maison est habitée : on la visite à quelques-uns, et l&apos;on respecte les pièces que
          ses propriétaires gardent fermées.
        </Intitule>
        <div className="max-w-2xl">
          <Creneaux
            creneaux={VISITE.creneaux}
            colonnes={3}
            titreCarte="Votre visite du n° 14"
            bouton="Je viens"
            confirmation="C'est noté : samedi, {creneau}. On vous attend au n° 14."
            note="Heures d'exemple : la visite est imaginaire, comme le lotissement."
            libellePris="Complet"
          />
        </div>
      </Section>

      <Section className="max-w-3xl! space-y-3 text-[var(--doux)]">
        <p className="leading-relaxed">
          Sur un vrai site, cette page ne donne jamais l&apos;adresse exacte : elle est envoyée aux
          personnes inscrites, avec l&apos;accord des propriétaires, qui ont choisi ce qu&apos;ils montrent.
          Ici, le lotissement, la maison et la date de visite sont des exemples.
        </p>
      </Section>
    </main>
  );
}
