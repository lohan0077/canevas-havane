import type { Metadata } from "next";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import CalculPalier from "../../_kit/CalculPalier";
import { DOSSIER, PALIERS_ENTRETIEN, SAP } from "../_composants/donnees";
import { PrixEntretien, Surtitre } from "../_composants/Elements";

// La page entretien de la vidéo : le prix en gros, le crédit d'impôt à côté, en plus
// petit (arrêté du 17 mars 2015, art. 5), et seulement avec ses conditions.
export const metadata: Metadata = {
  title: "Vue Cadrée — site de démonstration",
  description: "L'entretien de jardin à l'année d'un paysagiste imaginaire : le prix d'abord, le crédit d'impôt à côté, en plus petit, avec ses conditions.",
  ...adressesDeLaPage("/exemples/vue-cadree/entretien"),
};

const CONDITIONS = [
  ["Oui", "L'entretien est assuré par une entreprise déclarée services à la personne, dont c'est l'activité exclusive : " + SAP.entreprise + " (" + SAP.numero + ")."],
  ["Oui", "Au jardin de ta résidence, en France (ou de celle d'un de tes ascendants)."],
  ["Oui", "Pour les petits travaux de jardinage : tonte, haies, désherbage, taille à hauteur d'homme."],
  ["Non", "Pour la création d'un jardin, le terrassement, ou un élagage qui demande de monter dans l'arbre."],
];

export default function Entretien() {
  return (
    <main>
      <section className="mx-auto grid max-w-6xl gap-10 px-5 pb-16 pt-10 sm:px-8 md:grid-cols-2 md:items-start">
        <div className="space-y-5">
          <Surtitre>L&apos;entretien à l&apos;année</Surtitre>
          <h1 className="text-[48px] font-bold leading-[1] sm:text-7xl">Le prix en gros.</h1>
          <p className="text-[18px] leading-relaxed text-[var(--doux)]">
            Un prix à l&apos;année, selon la taille de ton jardin, hors taxes et toutes taxes comprises. Le crédit
            d&apos;impôt à côté, en plus petit : c&apos;est la règle.
          </p>
        </div>
        <div className="space-y-2">
          <PrixEntretien />
          <p className="text-[12px] leading-snug text-[var(--doux)]">Arrêté du 17 mars 2015, art. 4 et 5 : prix HT et TTC ; avantage fiscal détaché du prix, en plus petit.</p>
        </div>
      </section>

      <section className="border-y border-[var(--trait)] bg-[#E3EBDD]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-[0.8fr_1.2fr] md:items-start">
          <div className="space-y-4">
            <Surtitre>Pour ton jardin</Surtitre>
            <h2 className="text-[40px] font-bold leading-[1.02] sm:text-5xl">Combien de mètres carrés&nbsp;?</h2>
            <p className="text-[17px] leading-relaxed">Glisse jusqu&apos;à la surface de ton jardin : la formule et son prix à l&apos;année.</p>
          </div>
          <div className="[font-variant-numeric:lining-nums]">
            <CalculPalier
              etiquette="Surface du jardin"
              unite="m²"
              min={100}
              max={1500}
              pas={50}
              depart={500}
              paliers={PALIERS_ENTRETIEN}
              titreResultat="Ton entretien à l'année"
              legende="Prix d'exemple, HT et TTC identiques : TVA non applicable, art. 293 B du CGI. Le devis se fait après visite."
            />
            <p className="mt-3 rounded-[14px] bg-[var(--carte)] px-4 py-3 text-[13px] leading-snug">
              Crédit d&apos;impôt possible : 50 % des sommes versées, sous conditions (CGI, art. 199 sexdecies).
            </p>
          </div>
        </div>
      </section>

      <section id="conditions" className="scroll-mt-20 mx-auto max-w-4xl px-5 py-16 sm:px-8">
        <Surtitre>Le crédit d&apos;impôt</Surtitre>
        <h2 className="mt-4 text-[40px] font-bold leading-[1.02] sm:text-5xl">Seulement si…</h2>
        <ul className="mt-8 space-y-3">
          {CONDITIONS.map(([s, t]) => (
            <li key={t} className="flex gap-4 rounded-[18px] border border-[var(--trait)] bg-[var(--carte)] p-5">
              <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-[13px] font-bold ${s === "Oui" ? "bg-[var(--accent)] text-[var(--sur-accent)]" : "bg-[#A04A2F] text-white"}`}>{s}</span>
              <span className="text-[17px] leading-relaxed">{t}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-[14px] leading-relaxed text-[var(--doux)]">
          CGI, art. 199 sexdecies ; code du travail, art. L7232-1-1, L7232-1-2 et D7231-1 ; circulaire du 3 janvier
          2025, § I-5.2. Dépenses retenues dans la limite de 5 000 € par an et par foyer pour le petit jardinage (code
          du travail, art. D7233-5). La création de jardin est assurée par Vue Cadrée, entreprise distincte : elle
          n&apos;ouvre pas droit au crédit d&apos;impôt.
        </p>
        <Link href={`${DOSSIER}#photos`} className="mt-8 inline-block rounded-full bg-[var(--accent)] px-6 py-3.5 font-semibold text-[var(--sur-accent)]">Envoyer trois photos</Link>
      </section>
    </main>
  );
}
