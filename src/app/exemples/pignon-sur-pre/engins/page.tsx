import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import CarteLueur from "../../_kit/CarteLueur";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, EnTetePage, Surtitre, TERRE } from "../_composants/Blocs";
import PrixJours from "../_composants/PrixJours";
import { DOSSIER, MACHINES, euros, photos } from "../_composants/donnees";

// Les engins du samedi : la fiche de chacun (capacité du fabricant), le prix TTC livré,
// l'option avec chauffeur, et le calcul selon les jours pour la mini-pelle 1,5 t.
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

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MACHINES.map((m, i) => (
            <Apparition as="li" key={m.id} id={m.id} delai={(i % 3) * 110} de="zoom" className="scroll-mt-24">
              <CarteLueur className="h-full rounded-[26px]">
                <article className="flex h-full flex-col gap-4 rounded-[26px] border border-[var(--trait)] bg-[var(--carte)] p-6">
                  <h2 className="font-[family-name:var(--titres)] text-[30px] font-normal leading-none tracking-[-0.02em]">{m.nom}</h2>
                  <p className="leading-relaxed text-[var(--doux)]">{m.usage}</p>
                  <div className="space-y-1.5">
                    <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--doux)]">Capacité du fabricant</p>
                    <ul className="flex flex-wrap gap-1.5">
                      {m.fabricant.map((f) => (
                        <li key={f} className="rounded-full bg-[var(--fond)] px-3 py-1 text-[13px]">{f}</li>
                      ))}
                    </ul>
                  </div>
                  <dl className="mt-auto divide-y divide-[var(--trait)] border-y border-[var(--trait)] text-[15px]">
                    <div className="flex items-baseline justify-between gap-3 py-2.5">
                      <dt>La journée, livrée</dt>
                      <dd><span className="font-semibold tabular-nums">{euros(m.jour)} TTC</span> <span className="text-[12px] text-[var(--doux)]">exemple</span></dd>
                    </div>
                    {m.chauffeur && (
                      <div className="flex items-baseline justify-between gap-3 py-2.5">
                        <dt>Avec chauffeur</dt>
                        <dd><span className="font-semibold tabular-nums">{euros(m.chauffeur)} TTC</span> <span className="text-[12px] text-[var(--doux)]">exemple</span></dd>
                      </div>
                    )}
                  </dl>
                </article>
              </CarteLueur>
            </Apparition>
          ))}
        </ul>
      </section>

      <section className="border-y border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="space-y-6">
            <Apparition><Surtitre>La mini-pelle 1,5 t</Surtitre></Apparition>
            <TitreRevele texte="Combien de jours, *combien ça coûte.*" className="font-[family-name:var(--titres)] text-[clamp(3rem,5.5vw,4.8rem)] font-normal leading-[0.92] tracking-[-0.03em]" classeAccent={TERRE} />
            <Apparition as="p" delai={150} className="max-w-md text-lg leading-relaxed text-[var(--doux)]">
              Celle qu&apos;on réserve le plus&nbsp;: tranchées, fondations de terrasse, petites fouilles. Avant de creuser, la
              DT-DICT&nbsp;: <Link href={`${DOSSIER}/dt-dict`} className="font-semibold text-[var(--accent-texte)] underline underline-offset-4">on t&apos;aide</Link>.
            </Apparition>
            <Apparition de="rideau" className="relative hidden aspect-[4/3] overflow-hidden rounded-[26px] lg:block">
              <Image src={photos.tranchee.src} alt={photos.tranchee.alt} fill sizes="520px" className="object-cover" />
            </Apparition>
          </div>
          <Apparition de="zoom"><PrixJours id="mp15" /></Apparition>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32">
        <div className="mb-12 space-y-6">
          <Apparition><Surtitre>Ton week-end de chantier</Surtitre></Apparition>
          <TitreRevele texte="Fini *avant l'apéro.*" className="font-[family-name:var(--titres)] text-[clamp(3rem,6vw,5.4rem)] font-normal leading-[0.92] tracking-[-0.03em]" classeAccent={TERRE} />
        </div>
        <ol className="grid gap-6 md:grid-cols-4">
          {DEROULE.map((d, i) => (
            <Apparition as="li" key={d.titre} delai={i * 110} className="space-y-2 border-t-2 border-[var(--encre)] pt-4">
              <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[var(--accent-texte)]">{d.quand}</p>
              <h3 className="font-[family-name:var(--titres)] text-[26px] font-normal leading-tight">{d.titre}</h3>
              <p className="leading-relaxed text-[var(--doux)]">{d.texte}</p>
            </Apparition>
          ))}
        </ol>
        <p className="mt-8 text-[14px] text-[var(--doux)]">
          Les conditions pour conduire (âge, assurance) sont écrites dans le contrat de location (exemple). Aucune durée de
          chantier n&apos;est promise : c&apos;est le but, et ton terrain a le dernier mot.
        </p>
      </section>

      <AppelFinal />
    </main>
  );
}
