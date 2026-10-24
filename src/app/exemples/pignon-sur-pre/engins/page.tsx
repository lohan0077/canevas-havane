import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import { AppelFinal, EnTetePage, Intitule, Section } from "../_composants/Blocs";
import PrixJours from "../_composants/PrixJours";
import { DOSSIER, MACHINES, euros, photos } from "../_composants/donnees";

// Les engins du samedi : la fiche de chacun (capacité du fabricant), le prix TTC livré,
// l'option avec chauffeur, et le calcul selon les jours pour la mini-pelle 1,5 t. Version
// carrée : une liste, une ligne par engin, plutôt qu'une colonne de cartes.
export const metadata: Metadata = {
  title: "Les engins — Pignon sur Pré, site de démonstration",
  description: "Mini-pelles, plaque vibrante, bétonnière, rogneuse, mini-dumper : le prix TTC livré, avec ou sans chauffeur, et les capacités du fabricant. Site de démonstration.",
  ...adressesDeLaPage("/exemples/pignon-sur-pre/engins"),
};

const DEROULE = [
  { quand: "Vendredi, 18 h", titre: "On livre", texte: "La machine arrive chez toi, sur notre camion. Elle passe le portail : on a mesuré au téléphone." },
  { quand: "Vendredi, 18 h 20", titre: "Vingt minutes de prise en main", texte: "On te montre les commandes, sur ton terrain, jusqu'à ce que ce soit naturel." },
  { quand: "Samedi, 8 h", titre: "Tu creuses", texte: "Ta DT-DICT est faite, les réponses sont arrivées : la journée est à toi." },
  { quand: "Lundi, 8 h", titre: "On reprend", texte: "Tu n'as rien à rapporter. On repart avec la machine, tu gardes ton week-end." },
];

export default function Engins() {
  return (
    <main>
      <EnTetePage surtitre="Les engins du samedi" titre="Pas trois cents machines. *Les bonnes.*" photo={photos.godet} origine="40% 60%">
        Six engins pour un chantier chez soi, livrés le vendredi soir, repris le lundi matin. Prix TTC, livraison comprise à
        20 km&nbsp;; avec chauffeur pour les mini-pelles et la rogneuse.
      </EnTetePage>

      <Section className="space-y-6">
        <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
          {MACHINES.map((m, i) => (
            <Apparition as="li" key={m.id} id={m.id} delai={(i % 3) * 90} className="grid scroll-mt-24 grid-cols-1 gap-4 py-8 lg:grid-cols-[1fr_1.1fr_15rem] lg:gap-10">
              <div className="space-y-2">
                <h2 className="font-[family-name:var(--titres)] text-[30px] font-normal leading-none tracking-[-0.02em]">{m.nom}</h2>
                <p className="leading-relaxed text-[var(--doux)]">{m.usage}</p>
              </div>
              <div className="space-y-2">
                <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-[var(--doux)]">Capacité du fabricant</p>
                <p className="leading-relaxed">{m.fabricant.join(" · ")}</p>
              </div>
              <dl className="space-y-1.5 text-[15px]">
                <div className="flex items-baseline justify-between gap-3">
                  <dt>La journée, livrée</dt>
                  <dd className="tabular-nums">{euros(m.jour)} TTC</dd>
                </div>
                {m.chauffeur && (
                  <div className="flex items-baseline justify-between gap-3">
                    <dt>Avec chauffeur</dt>
                    <dd className="tabular-nums">{euros(m.chauffeur)} TTC</dd>
                  </div>
                )}
                <p className="text-[12px] text-[var(--doux)]">Prix d&apos;exemple</p>
              </dl>
            </Apparition>
          ))}
        </ul>
      </Section>

      <Section fond="bg-[var(--carte)] border-y border-[var(--trait)]" className="grid grid-cols-1 gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
        <div className="space-y-10">
          <Intitule
            surtitre="La mini-pelle 1,5 t"
            titre="Combien de jours, *combien ça coûte.*"
            texte={
              <>
                Celle qu&apos;on réserve le plus&nbsp;: tranchées, fondations de terrasse, petites fouilles. Avant de creuser, la
                DT-DICT&nbsp;: <Link href={`${DOSSIER}/dt-dict`} className="text-[var(--accent-texte)] underline underline-offset-4">on t&apos;aide</Link>.
              </>
            }
          />
          <Apparition className="relative hidden aspect-[4/3] overflow-hidden rounded-2xl lg:block">
            <Image src={photos.tranchee.src} alt={photos.tranchee.alt} fill sizes="520px" className="object-cover" />
          </Apparition>
        </div>
        <Apparition delai={150}><PrixJours id="mp15" /></Apparition>
      </Section>

      <Section className="space-y-14">
        <Intitule surtitre="Ton week-end de chantier" titre="Fini *avant l'apéro.*" />
        <ol className="grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-6">
          {DEROULE.map((d, i) => (
            <Apparition as="li" key={d.titre} delai={i * 110} className="space-y-2 border-t border-[var(--encre)] pt-4">
              <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-[var(--doux)]">{d.quand}</p>
              <h3 className="font-[family-name:var(--titres)] text-2xl font-normal leading-tight">{d.titre}</h3>
              <p className="leading-relaxed text-[var(--doux)]">{d.texte}</p>
            </Apparition>
          ))}
        </ol>
        <p className="max-w-2xl text-[14px] text-[var(--doux)]">
          Les conditions pour conduire (âge, assurance) sont écrites dans le contrat de location (exemple). Aucune durée de
          chantier n&apos;est promise : c&apos;est le but, et ton terrain a le dernier mot.
        </p>
      </Section>

      <AppelFinal />
    </main>
  );
}
