import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import { euros } from "../_composants/calendrier";
import { AppelFinal, DevisExemple, Etiquette, Section } from "../_composants/Blocs";

export const metadata: Metadata = {
  title: "Tarifs et devis · Bon Mardi — site de démonstration",
  description: "Les tarifs de Bon Mardi (main-d'œuvre, camion, fournitures), hors taxes et toutes taxes comprises, et ce que dit ton devis gratuit : le montant HT et TTC, et que ce prix est définitif.",
  ...adressesDeLaPage("/exemples/bon-mardi/tarifs"),
};

const TARIFS: { groupe: string; lignes: [string, number][] }[] = [
  { groupe: "Main-d'œuvre", lignes: [["Déménageur, l'heure", 38], ["Chef d'équipe, l'heure", 44]] },
  { groupe: "Camion et chauffeur", lignes: [["Camion 20 m³ avec hayon, la demi-journée", 150], ["Le kilomètre au-delà de 30 km", 1.5]] },
  { groupe: "Fournitures", lignes: [["Carton standard", 2.5], ["Carton penderie", 10], ["Rouleau d'adhésif", 3]] },
  { groupe: "Petit matériel", lignes: [["Diable, sangles, couvertures, housses", 0]] },
];

const DEVIS = [
  "La prestation exacte : volume, adresses, étages, date, ce qu'on démonte et remonte",
  "Le montant HT et TTC du déménagement",
  "La mention que ce prix est définitif",
  "Remis gratuitement, par écrit, avant tout contrat",
];

export default function Tarifs() {
  return (
    <>
      <Section className="space-y-10">
        <div className="max-w-3xl space-y-5">
          <Etiquette>Tarifs et devis</Etiquette>
          <h1 className="text-[50px] sm:text-7xl font-extrabold tracking-[-0.04em] leading-[0.95]">Nos tarifs, en clair.</h1>
          <p className="text-lg leading-relaxed">
            Ce qui compose le prix de ton déménagement. Les prix du calendrier en sont la somme
            pour un volume donné, à moins de 30&nbsp;km&nbsp;; le mardi est notre prix de base. Tarifs
            d'exemple, TTC pour les particuliers, HT pour mémoire.
          </p>
        </div>
        <div className="overflow-hidden rounded-[20px] border-2 border-[var(--encre)] bg-[var(--carte)]">
          {TARIFS.map((g) => (
            <div key={g.groupe} className="border-b-2 border-[var(--encre)] last:border-b-0">
              <h2 className="bg-[var(--accent)] text-[var(--sur-accent)] px-4 py-2 text-lg font-extrabold">{g.groupe}</h2>
              <div className="grid grid-cols-[1fr_auto_auto] gap-x-4 px-4 pt-2 text-xs font-bold uppercase tracking-[0.1em] text-[var(--doux)]">
                <span /> <span className="w-20 text-right">HT</span> <span className="w-20 text-right">TTC</span>
              </div>
              <ul className="divide-y divide-[var(--trait)]">
                {g.lignes.map(([nom, ht]) => (
                  <li key={nom} className="grid grid-cols-[1fr_auto_auto] items-baseline gap-x-4 px-4 py-3">
                    <span>{nom}</span>
                    <span className="w-20 text-right tabular-nums text-[var(--doux)]">{ht ? euros(ht, true) : "compris"}</span>
                    <span className="w-20 text-right tabular-nums font-bold">{ht ? euros(Math.round(ht * 120) / 100, true) : "compris"}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="text-sm text-[var(--doux)]">Tarifs d'exemple : l'entreprise est fictive. TVA à 20&nbsp;%.</p>
      </Section>

      <div className="bg-[var(--carte)] border-y-2 border-[var(--encre)]">
        <Section className="grid gap-10 md:grid-cols-2 md:items-center">
          <div className="space-y-5">
            <Etiquette>Ton devis</Etiquette>
            <h2 className="text-[44px] sm:text-6xl font-extrabold tracking-[-0.03em] leading-[0.98]">Ce que dit ton devis.</h2>
            <ul className="space-y-3">
              {DEVIS.map((d) => (
                <li key={d} className="flex gap-3 text-lg leading-snug">
                  <span aria-hidden="true" className="mt-1.5 h-4 w-4 shrink-0 rounded-sm border-2 border-[var(--encre)] bg-[var(--accent)]" />
                  {d}
                </li>
              ))}
            </ul>
            <p className="text-sm text-[var(--doux)]">
              C'est ce que prévoit l'arrêté du 27 avril 2010 relatif à la publicité des prix des
              prestations de déménagement, qui demande aussi que les tarifs soient affichés dans
              l'entreprise.
            </p>
          </div>
          <DevisExemple />
        </Section>
      </div>

      <AppelFinal />
    </>
  );
}
