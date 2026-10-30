import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Accordeon from "../../_kit/Accordeon";
import Apparition from "../../_kit/Apparition";
import CalculPalier from "../../_kit/CalculPalier";
import { Bouton, EnTetePage, KIT_EN_CASSE_NORMALE, Section, Surtitre, Titre } from "../_composants/Blocs";
import { DOSSIER, FORMATS, FORMULES, PALIERS_ENTREPRISE, QUESTIONS, SOIREE_MARIAGE, euros, photos } from "../_composants/donnees";

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
      <EnTetePage titre="formats et prix." photo={photos.croissants} origine="50% 60%">
        Un ordre de grandeur tout de suite, le devis détaillé ensuite. Pour une entreprise, glissez le nombre de participants :
        les prix sont hors taxes. Pour un mariage, la soirée du DJ est affichée, toutes taxes comprises.
      </EnTetePage>

      <Section className="grid grid-cols-1 gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="space-y-6">
          <Surtitre>Pour les entreprises, hors taxes</Surtitre>
          <Titre texte={"combien de personnes\u00a0?"} />
          <Apparition as="p" delai={150} className="max-w-md text-lg leading-relaxed text-[var(--doux)]">
            Nos clients sont des entreprises : les prix sont hors taxes, par personne. Lieu, dîner, le moment de 23 h, le DJ, et
            nous.
          </Apparition>
          <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
            {FORMATS.map((f) => (
              <li key={f.nom} className="py-4">
                <p className="font-[family-name:var(--titres)] font-semibold text-[22px] lowercase">{f.nom}</p>
                <p className="text-[15px] text-[var(--doux)]">{f.prix} (exemple)</p>
              </li>
            ))}
          </ul>
        </div>
        <Apparition delai={150} className={KIT_EN_CASSE_NORMALE}>
          <CalculPalier
            etiquette="Effectif"
            unite="personnes"
            min={20}
            max={400}
            pas={10}
            depart={140}
            paliers={PALIERS_ENTREPRISE}
            titreResultat="Ordre de grandeur, en exemple"
            legende="Prix hors taxes, par personne. Le devis dit tout, ligne par ligne."
          />
        </Apparition>
      </Section>

      <Section fond="bg-[var(--sombre)] text-[var(--sur-sombre)]" className="grid grid-cols-1 gap-16 lg:grid-cols-2">
        <div className="space-y-6">
          <Surtitre clair>Pour les mariages, toutes taxes comprises</Surtitre>
          <Titre texte="le dj, jusqu'à la dernière." clair />
          <ul className="divide-y divide-white/15 border-y border-white/15">
            {FORMULES.map((f) => (
              <li key={f.nom} className="flex items-baseline justify-between gap-5 py-5">
                <span>
                  <span className="block font-[family-name:var(--titres)] font-semibold text-[24px] lowercase">{f.nom}</span>
                  <span className="block text-[15px]">{f.detail}</span>
                </span>
                <span className="shrink-0 text-right">
                  <span className="block font-[family-name:var(--titres)] font-semibold text-[28px] tabular-nums">{euros(f.prix)}</span>
                  <span className="block text-[13px]">TTC, exemple</span>
                </span>
              </li>
            ))}
          </ul>
          <Bouton href={`${DOSSIER}/samedis-libres`}>Voir les samedis libres</Bouton>
        </div>
        <ol className="divide-y divide-white/15 border-y border-white/15 self-start">
          {SOIREE_MARIAGE.map((m) => (
            <li key={m.heure} className="grid grid-cols-[4.5rem_1fr] gap-4 py-5">
              <span className="font-[family-name:var(--titres)] font-semibold text-[26px] leading-none">{m.heure}</span>
              <span>
                <span className="block font-medium">{m.titre}</span>
                <span className="block text-[15px] leading-relaxed">{m.texte}</span>
              </span>
            </li>
          ))}
        </ol>
      </Section>

      <Section className="grid grid-cols-1 gap-14 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-6">
          <Titre texte="avant le devis." />
        </div>
        <Apparition delai={150}><Accordeon questions={QUESTIONS.map((q) => ({ question: q.q, reponse: q.r }))} /></Apparition>
      </Section>
    </main>
  );
}
