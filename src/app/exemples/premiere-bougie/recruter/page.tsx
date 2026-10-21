import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Creneaux from "../../_kit/Creneaux";
import { ETAPES, HONORAIRES, entreprise, euros, photos } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Recruter avec nous · Première Bougie — site de démonstration",
  description: "Comment Première Bougie recrute, du jour −30 au jour 365, et des honoraires en partie payés à la première bougie. Cabinet fictif, prix d'exemple HT.",
  ...adressesDeLaPage("/exemples/premiere-bougie/recruter"),
};

const CRENEAUX = [
  { libelle: "Mar.", sous: "9 h" },
  { libelle: "Mar.", sous: "14 h", pris: true },
  { libelle: "Mer.", sous: "11 h" },
  { libelle: "Jeu.", sous: "16 h 30" },
  { libelle: "Ven.", sous: "9 h 30", pris: true },
  { libelle: "Ven.", sous: "15 h" },
];

export default function Recruter() {
  return (
    <main>
      <header className="mx-auto max-w-6xl space-y-5 px-5 pt-12 sm:pt-20">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-texte)]">Recruter avec nous</p>
        <h1 className="max-w-4xl text-[3rem] sm:text-7xl font-normal">On vise le jour 365, <em className="text-[var(--accent-texte)]">dès le jour −30.</em></h1>
      </header>
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:py-16 md:grid-cols-[1fr_1fr] md:items-start">
        <ol className="space-y-6">
          {ETAPES.map((e) => (
            <li key={e.titre} className="space-y-1 border-t-2 border-[var(--encre)] pt-4">
              <p className="text-sm font-semibold text-[var(--accent-texte)] [font-variant-numeric:lining-nums]">{e.jour}</p>
              <h2 className="text-3xl font-normal">{e.titre}</h2>
              <p className="leading-relaxed text-[var(--doux)]">{e.texte}</p>
            </li>
          ))}
        </ol>
        <Image src={photos.cupcake.src} width={photos.cupcake.largeur} height={photos.cupcake.hauteur} alt={photos.cupcake.alt} sizes="(min-width: 768px) 540px, 100vw" className="aspect-[4/5] w-full rounded-[28px] object-cover" />
      </section>
      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-2 md:items-center">
          <div className="space-y-3">
            <h2 className="text-4xl sm:text-5xl font-normal">Honoraires, <em className="text-[#F2C14E]">en deux fois.</em></h2>
            <p className="leading-relaxed text-[#DCDCE6]">Exemple · {HONORAIRES.exemple}. Un forfait écrit avant de commencer ; une partie n&apos;est due qu&apos;au jour 365, si la personne est toujours là.</p>
          </div>
          <div className="space-y-3 rounded-[28px] bg-[#2E2E4A] p-6">
            <p className="font-[family-name:var(--titres)] text-5xl [font-variant-numeric:lining-nums]">{euros(HONORAIRES.total)} HT</p>
            {HONORAIRES.parts.map((x) => (
              <p key={x.quand} className="flex justify-between gap-4 border-t border-[#3A3A55] pt-2 [font-variant-numeric:lining-nums]">
                <span>{x.quand}</span><span className="font-semibold">{x.part} % · {euros((HONORAIRES.total * x.part) / 100)}</span>
              </p>
            ))}
            <p className="text-xs text-[#C9C9DA]">Prix exemple, hors taxes : nos clients sont des entreprises. Placement gratuit pour les candidats.</p>
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-3">
          <h2 className="text-4xl sm:text-5xl font-normal">Le jour −30, <em className="text-[var(--accent-texte)]">c&apos;est quand&nbsp;?</em></h2>
          <p className="leading-relaxed">Une heure pour parler du poste, à ton bureau ou au nôtre ({entreprise.adresse}, {entreprise.ville}).</p>
          <p><a href={`tel:${entreprise.telephoneLien}`} className="font-semibold underline underline-offset-4">{entreprise.telephone}</a></p>
        </div>
        <Creneaux
          creneaux={CRENEAUX}
          colonnes={3}
          titreCarte="Ton jour −30"
          bouton="Réserver ce rendez-vous"
          confirmation="Réservé : {creneau}. On commence à compter."
          note="Créneaux pris : exemple."
        />
      </section>
    </main>
  );
}
