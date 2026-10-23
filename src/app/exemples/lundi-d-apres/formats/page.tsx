import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Accordeon from "../../_kit/Accordeon";
import Apparition from "../../_kit/Apparition";
import CalculPalier from "../../_kit/CalculPalier";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, Bouton, Coin, CORAIL, CORAIL_CLAIR, EnTetePage, TITRE } from "../_composants/Blocs";
import { DOSSIER, FORMATS, FORMULES, PALIERS_ENTREPRISE, QUESTIONS, euros, photos } from "../_composants/donnees";

// Les formats et les prix : pour les entreprises, hors taxes (nos clients professionnels),
// avec l'ordre de grandeur selon l'effectif ; pour les mariages, le DJ, TTC. Exemples.
export const metadata: Metadata = {
  title: "Formats et prix — Lundi d'Après, site de démonstration",
  description: "Soirées d'entreprise, séminaires, fêtes de fin d'année (prix HT) et mariages (prix TTC) : les formats et un ordre de grandeur tout de suite. Site de démonstration, prix d'exemple.",
  ...adressesDeLaPage("/exemples/lundi-d-apres/formats"),
};

export default function Formats() {
  return (
    <main>
      <EnTetePage coin="entreprises : HT · mariages : TTC" titre="Formats *et prix.*">
        Un ordre de grandeur tout de suite, le devis détaillé ensuite. Pour une entreprise, glissez le nombre de participants&nbsp;;
        pour un mariage, la soirée du DJ est affichée.
      </EnTetePage>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="space-y-6">
          <Apparition><Coin>les entreprises · hors taxes</Coin></Apparition>
          <TitreRevele texte="Combien *de personnes ?*" className={`text-[clamp(3rem,6vw,5.2rem)] ${TITRE}`} classeAccent={CORAIL} />
          <Apparition as="p" delai={150} className="max-w-md text-lg leading-relaxed text-[var(--doux)]">
            Nos clients sont des entreprises&nbsp;: les prix sont hors taxes, par personne. Lieu, dîner, le moment de 23 h, le DJ, et
            nous.
          </Apparition>
        </div>
        <Apparition de="zoom">
          <CalculPalier
            etiquette="Effectif"
            unite="personnes"
            min={20}
            max={400}
            pas={10}
            depart={140}
            paliers={PALIERS_ENTREPRISE}
            titreResultat="Ordre de grandeur · exemple"
            legende="Prix hors taxes, par personne. Le devis dit tout, ligne par ligne."
          />
        </Apparition>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 md:pb-32">
        <ul className="grid gap-4 md:grid-cols-3">
          {FORMATS.map((f, i) => (
            <Apparition as="li" key={f.nom} delai={i * 110} de="zoom" className="space-y-3 rounded-[2rem] bg-[var(--carte)] p-7 ring-1 ring-[var(--trait)]">
              <h2 className="font-[family-name:var(--titres)] text-[30px] font-extrabold lowercase leading-[0.95] tracking-[-0.04em]">{f.nom}</h2>
              <p className="font-[family-name:var(--titres)] text-[19px] font-bold text-[var(--accent-texte)]">{f.prix}</p>
              <p className="text-[13px] font-bold uppercase tracking-[0.1em] text-[var(--doux)]">exemple</p>
              <p className="leading-relaxed text-[var(--doux)]">{f.detail}</p>
            </Apparition>
          ))}
        </ul>
      </section>

      <section className="px-3 sm:px-5">
        <div className="kit-grain relative isolate grid overflow-hidden rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)] lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8 px-6 py-16 sm:px-12 md:py-24">
            <Coin clair>les mariages · TTC</Coin>
            <TitreRevele texte="Le DJ, *jusqu'à la dernière.*" className={`text-[clamp(2.8rem,5.5vw,4.8rem)] ${TITRE}`} classeAccent={CORAIL_CLAIR} />
            <ul className="divide-y divide-white/15 border-y border-white/15">
              {FORMULES.map((f, i) => (
                <Apparition as="li" key={f.nom} delai={i * 110} className="flex items-baseline justify-between gap-5 py-5">
                  <span>
                    <span className="block font-[family-name:var(--titres)] text-[26px] font-extrabold lowercase tracking-[-0.03em]">{f.nom}</span>
                    <span className="block text-[15px] text-[var(--sur-sombre)]/90">{f.detail}</span>
                  </span>
                  <span className="shrink-0 text-right">
                    <span className="block font-[family-name:var(--titres)] text-[30px] font-extrabold tabular-nums text-[#FF8A6E]">{euros(f.prix)}</span>
                    <span className="block text-[12px] font-bold uppercase tracking-[0.1em]">TTC · exemple</span>
                  </span>
                </Apparition>
              ))}
            </ul>
            <Bouton href={`${DOSSIER}/samedis-libres`} variante="creme">voir les samedis libres</Bouton>
          </div>
          <div className="relative min-h-[320px]">
            <Image src={photos.bouleRose.src} alt={photos.bouleRose.alt} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[0.75fr_1.25fr]">
        <div className="space-y-6">
          <Apparition><Coin>vos questions</Coin></Apparition>
          <TitreRevele texte="Avant *le devis.*" className={`text-[clamp(3rem,5.5vw,4.8rem)] ${TITRE}`} classeAccent={CORAIL} />
        </div>
        <Apparition delai={150}><Accordeon questions={QUESTIONS.map((q) => ({ question: q.q, reponse: q.r }))} /></Apparition>
      </section>

      <AppelFinal />
    </main>
  );
}
