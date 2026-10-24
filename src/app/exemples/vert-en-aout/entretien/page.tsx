import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import CalculPalier from "../../_kit/CalculPalier";
import { AppelFinal, Bouton, EnTetePage, PrixEntretien, Surtitre, Titre } from "../_composants/Blocs";
import { DOSSIER, PALIERS_ENTRETIEN, PHOTOS, SAP } from "../_composants/donnees";

// La page entretien de la vidéo « Remplir l'agenda » : le prix en gros, le crédit
// d'impôt à côté, en plus petit (arrêté du 17 mars 2015, art. 5), et seulement avec ses
// conditions. L'entretien est assuré par une entreprise distincte, déclarée services à
// la personne, dont c'est l'activité exclusive ; la création reste à Vert en Août.
export const metadata: Metadata = {
  title: "L'entretien — Vert en Août (démonstration)",
  description: "L'entretien de jardin à l'année d'un paysagiste imaginaire : le prix d'abord, le crédit d'impôt à côté, en plus petit, avec ses conditions.",
  ...adressesDeLaPage("/exemples/vert-en-aout/entretien"),
};

const CONDITIONS = [
  ["Oui", `L'entretien est assuré par une entreprise déclarée services à la personne, dont c'est l'activité exclusive : ${SAP.entreprise} (${SAP.numero}).`],
  ["Oui", "Au jardin de ta résidence, en France (ou de celle d'un de tes ascendants)."],
  ["Oui", "Pour les petits travaux de jardinage : tonte, haies, désherbage, taille à hauteur d'homme."],
  ["Non", "Pour la création d'un jardin, le terrassement, ou un élagage qui demande de monter dans l'arbre."],
];

export default function Entretien() {
  return (
    <main>
      <EnTetePage surtitre="L'entretien à l'année" titre="Le prix *en gros.*" photo={PHOTOS.hiver} note="tonte · haies · désherbage">
        Un prix à l&apos;année, selon la taille de ton jardin, hors taxes et toutes taxes comprises.
        Le crédit d&apos;impôt à côté, en plus petit : c&apos;est la règle.
      </EnTetePage>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-2">
          <PrixEntretien />
          <p className="text-[13px] leading-snug text-[var(--doux)]">Arrêté du 17 mars 2015, art. 4 et 5 : prix HT et TTC ; avantage fiscal détaché du prix, en plus petit.</p>
        </div>
        <div className="space-y-6">
          <Apparition><Surtitre>{SAP.entreprise}</Surtitre></Apparition>
          <Titre texte="Une entreprise *à part,* pour l'entretien." taille="moyen" />
          <Apparition as="p" delai={200} className="text-xl leading-relaxed text-[var(--doux)]">
            Tonte, haies, désherbage, feuilles : c&apos;est tout ce qu&apos;elle fait, et c&apos;est pour ça
            qu&apos;elle peut être déclarée services à la personne. La création de jardin, elle, reste
            à Vert en Août.
          </Apparition>
        </div>
      </section>

      <section className="px-3 sm:px-5">
        <div className="rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-10 md:py-28 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div className="space-y-6">
              <Apparition><Surtitre clair>Pour ton jardin</Surtitre></Apparition>
              <Titre texte={"Combien de *mètres carrés\u00a0?*"} clair taille="moyen" />
              <Apparition as="p" delai={200} className="text-lg leading-relaxed">
                Glisse jusqu&apos;à la surface de ton jardin : la formule et son prix à l&apos;année.
              </Apparition>
            </div>
            <div className="space-y-3 rounded-[2rem] bg-[var(--fond)] p-5 text-[var(--encre)] sm:p-7">
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
              <p className="rounded-[1rem] bg-[#E7D7B4] px-4 py-3 text-[13px] leading-snug">
                Crédit d&apos;impôt possible : 50 % des sommes versées, sous conditions (CGI, art. 199 sexdecies).
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="conditions" className="scroll-mt-20 mx-auto max-w-5xl px-5 py-24 sm:px-8 md:py-32">
        <Apparition><Surtitre>Le crédit d&apos;impôt</Surtitre></Apparition>
        <Titre texte="Seulement *si…*" className="mt-6" />
        <ul className="mt-10 space-y-3">
          {CONDITIONS.map(([s, t], i) => (
            <Apparition as="li" key={t} delai={i * 110} className="flex gap-5 rounded-[1.75rem] border border-[var(--trait)] bg-[var(--carte)] p-6">
              <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full font-[family-name:var(--titres)] text-[14px] font-extrabold ${s === "Oui" ? "bg-[var(--sombre)] text-[var(--sur-sombre)]" : "bg-[#8C4A33] text-white"}`}>{s}</span>
              <span className="text-[18px] leading-relaxed">{t}</span>
            </Apparition>
          ))}
        </ul>
        <p className="mt-8 text-[15px] leading-relaxed text-[var(--doux)]">
          CGI, art. 199 sexdecies ; code du travail, art. L7232-1-1, L7232-1-2 et D7231-1 ; circulaire du
          3 janvier 2025, § I-5.2. Dépenses retenues dans la limite de 5 000 € par an et par foyer pour
          le petit jardinage (code du travail, art. D7233-5). La création de jardin est assurée par Vert
          en Août, entreprise distincte : elle n&apos;ouvre pas droit au crédit d&apos;impôt.
        </p>
        <div className="mt-10">
          <Bouton href={`${DOSSIER}#photos`} variante="sombre">Envoyer trois photos</Bouton>
        </div>
      </section>

      <AppelFinal />
    </main>
  );
}
