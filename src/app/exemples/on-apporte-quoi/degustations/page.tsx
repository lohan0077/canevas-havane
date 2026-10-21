import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Creneaux from "../../_kit/Creneaux";
import { DEGUSTATIONS, boutique, photos } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Dégustations — On Apporte Quoi, site de démonstration",
  description: "Un samedi par mois, l'épicerie On Apporte Quoi (entreprise fictive) fait goûter quatre huiles d'olive à vingt personnes. Choisir son samedi.",
  ...adressesDeLaPage("/exemples/on-apporte-quoi/degustations"),
};

const DEROULE = [
  { heure: "10 h 30", texte: "On s'assoit. Quatre huiles d'olive en coupelle, du pain, de l'eau." },
  { heure: "10 h 45", texte: "On goûte à l'aveugle, puis on compare : l'herbe coupée, l'amande, le piquant en fin de bouche." },
  { heure: "11 h 30", texte: "On dit d'où elles viennent, comment elles sont faites, et avec quoi les servir." },
  { heure: "12 h", texte: "Chacun repart avec sa fiche, et sans rien acheter s'il le veut." },
];

// La dégustation de la vidéo : « un samedi par mois, une dégustation d'huiles
// d'olive. Vingt places, les vraies. » Les dates sont de vrais samedis ; les places
// prises sont un exemple, et la page le dit. Aucune rareté inventée : vingt est le
// nombre de chaises.
export default function Degustations() {
  return (
    <div>
      <section className="mx-auto grid max-w-6xl gap-10 px-5 pb-16 pt-12 sm:pt-20 md:grid-cols-[1.1fr_0.9fr] md:items-end">
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent-texte)]">Un samedi par mois · gratuit</p>
          <h1 className="text-5xl font-medium sm:text-7xl">
            Samedi, on goûte <em className="font-normal text-[var(--accent-texte)]">l&apos;huile d&apos;olive.</em>
          </h1>
          <p className="max-w-xl text-lg leading-relaxed">
            Vingt places autour de la grande table de l&apos;épicerie. Pas une de plus :
            c&apos;est le nombre de chaises. Une heure et demie pour apprendre à dire ce
            qu&apos;on aime dans une huile, et pourquoi.
          </p>
        </div>
        <div className="relative aspect-[3/2] overflow-hidden rounded-[28px]">
          <Image src={photos.huile.src} alt={photos.huile.alt} fill sizes="(min-width: 768px) 460px, 100vw" className="object-cover" priority />
        </div>
      </section>

      <section id="dates" className="border-t border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto max-w-3xl space-y-8 px-5 py-16 sm:py-20">
          <div className="space-y-3">
            <h2 className="text-4xl font-medium sm:text-5xl">Choisis ton <em className="font-normal">samedi.</em></h2>
            <p className="text-lg leading-relaxed">De 10 h 30 à 12 h, à la boutique, {boutique.adresse}.</p>
          </div>
          <Creneaux
            creneaux={DEGUSTATIONS}
            colonnes={3}
            titreCarte="Ta place"
            bouton="Réserver ma place"
            confirmation="Place réservée : {creneau}, 10 h 30. Vingt chaises, dont la tienne."
            note="Dates réelles du calendrier ; les séances complètes sont un exemple : l'épicerie est fictive."
            libellePris="Complet"
            libelleLibre="20 places"
          />
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:py-24 md:grid-cols-[0.8fr_1.2fr]">
        <h2 className="text-4xl font-medium sm:text-5xl">Comment <em className="font-normal">ça se passe.</em></h2>
        <ol className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
          {DEROULE.map((d) => (
            <li key={d.heure} className="grid gap-2 py-5 sm:grid-cols-[7rem_1fr]">
              <p className="font-[family-name:var(--titres)] text-2xl font-semibold text-[var(--accent-texte)] [font-variant-numeric:lining-nums]">{d.heure}</p>
              <p className="text-lg leading-relaxed">{d.texte}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 sm:grid-cols-3">
          {[
            ["Ce qu'on sert", "Quatre huiles d'olive vierge extra, du pain de blé, de l'eau. Le pain contient du gluten : dis-le en réservant si tu n'en manges pas, on prévoit autre chose."],
            ["Ce que ça coûte", "Rien. La dégustation est gratuite et sans obligation d'achat."],
            ["Si tu ne viens pas", `Appelle le ${boutique.telephone} : ta chaise revient à quelqu'un d'autre.`],
          ].map(([t, x]) => (
            <div key={t} className="space-y-2 border-t border-[#F7F1E6]/30 pt-4">
              <h3 className="text-2xl font-medium">{t}</h3>
              <p className="leading-relaxed">{x}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
