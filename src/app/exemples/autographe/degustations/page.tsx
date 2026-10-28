import type { Metadata } from "next";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import Creneaux from "../../_kit/Creneaux";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, EnTetePage, Surtitre } from "../_composants/Blocs";
import { DessinProduit } from "../_composants/Dessins";
import { DEGUSTATIONS, DOSSIER, auteurDe, boutique, photos } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Dégustations — Autographe, site de démonstration",
  description: "Un samedi par mois, l'épicerie Autographe (entreprise fictive) fait goûter à l'aveugle les trois huiles d'olive de Lina, à vingt personnes. Choisir son samedi.",
  ...adressesDeLaPage("/exemples/autographe/degustations"),
};

const lina = auteurDe("lina")!;
const HUILES = lina.oeuvres.filter((o) => o.dessin === "bouteille");

const DEROULE = [
  { heure: "10 h 30", texte: "On s'assoit. Trois huiles d'olive en coupelle, du pain, de l'eau." },
  { heure: "10 h 45", texte: "On goûte à l'aveugle, puis on compare : l'herbe coupée, l'amande, le piquant en fin de bouche." },
  { heure: "11 h 30", texte: "On dit de quel olivier elles viennent, comment Lina les fait, et avec quoi les servir." },
  { heure: "12 h", texte: "Chacun repart avec sa fiche, et sans rien acheter s'il le veut." },
];

// La dégustation de la vidéo « Remplir le carnet de commandes » : un samedi par mois,
// une dégustation d'huiles d'olive, vingt places, les vraies. Les dates sont de vrais
// samedis ; la séance complète est un exemple, et la page le dit. Vingt, c'est le
// nombre de chaises : aucune rareté inventée.
export default function Degustations() {
  return (
    <main>
      <EnTetePage surtitre="Un samedi par mois · gratuit" titre="Samedi, on goûte *l'huile d'olive.*" photo={photos.huile} signature={2}>
        Vingt places autour de la grande table de l&apos;épicerie. Pas une de plus : c&apos;est le
        nombre de chaises. Une heure et demie pour apprendre à dire ce qu&apos;on aime dans une huile,
        et pourquoi.
      </EnTetePage>

      <section id="dates" className="scroll-mt-20 mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-6">
          <Apparition><Surtitre>Les dates</Surtitre></Apparition>
          <TitreRevele texte="Choisis ton *samedi.*" className="text-[clamp(2.6rem,5vw,4.6rem)] font-semibold leading-[0.95] tracking-[-0.03em]" classeAccent="font-normal italic text-[var(--accent-texte)]" />
          <Apparition as="p" delai={150} className="text-xl leading-relaxed text-[var(--doux)]">
            De 10 h 30 à 12 h, à la boutique, {boutique.adresse}. Vingt places par samedi.
          </Apparition>
        </div>
        <Apparition de="zoom" className="border-2 border-[var(--encre)] bg-[var(--carte)] p-5 sm:p-8">
          <Creneaux
            creneaux={DEGUSTATIONS}
            colonnes={3}
            titreCarte="Ta place"
            bouton="Réserver ma place"
            confirmation="Place réservée : {creneau}, 10 h 30. Vingt chaises, dont la tienne."
            note="Dates réelles du calendrier ; la séance complète est un exemple : l'épicerie est fictive."
            libellePris="Complet"
            libelleLibre="20 places"
          />
        </Apparition>
      </section>

      <section className="px-3 sm:px-5">
        <div className="kit-grain relative overflow-hidden rounded-[2rem] bg-[#3D4A1E] text-[#F6EFE3]">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-10 md:py-28 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div className="space-y-6">
              <Surtitre clair>Ce qu&apos;on goûte</Surtitre>
              <TitreRevele texte="Trois oliviers, *trois huiles.*" className="text-[clamp(2.6rem,5vw,4.6rem)] font-semibold leading-[0.95] tracking-[-0.03em]" classeAccent="font-normal italic text-[#E9C46A]" />
              <p className="text-xl leading-relaxed">
                Celles de <Link href={`${DOSSIER}/auteurs/lina`} className="underline underline-offset-4">Lina, auteure n° {lina.numero}</Link>,
                {" "}{lina.chiffre} {lina.lieu}. Chaque variété pressée à part, le millésime sur l&apos;étiquette.
              </p>
            </div>
            <ul className="grid grid-cols-3 gap-4">
              {HUILES.map((h, i) => (
                <Apparition as="li" key={h.nom} delai={i * 140} de="zoom" className="flex flex-col items-center gap-3 bg-[#F6EFE3] p-4 text-center text-[#1E2A4A]">
                  <DessinProduit dessin={h.dessin} teinte={h.teinte} className="h-28 w-20" />
                  <span className="font-[family-name:var(--titres)] text-xl font-semibold capitalize">{h.nom.split(" · ")[1]}</span>
                  <span className="text-sm">{h.poids}</span>
                </Apparition>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-6">
          <Apparition><Surtitre>Le déroulé</Surtitre></Apparition>
          <TitreRevele texte="Comment *ça se passe.*" className="text-[clamp(2.6rem,5vw,4.6rem)] font-semibold leading-[0.95] tracking-[-0.03em]" classeAccent="font-normal italic text-[var(--accent-texte)]" />
        </div>
        <ol className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
          {DEROULE.map((d, i) => (
            <Apparition as="li" key={d.heure} delai={i * 90} className="grid gap-2 py-6 sm:grid-cols-[8rem_1fr]">
              <p className="font-[family-name:var(--titres)] text-3xl font-semibold text-[var(--accent-texte)] [font-variant-numeric:lining-nums]">{d.heure}</p>
              <p className="text-xl leading-relaxed">{d.texte}</p>
            </Apparition>
          ))}
        </ol>
      </section>

      <section className="border-t-2 border-[var(--encre)] bg-[var(--carte)]">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 md:grid-cols-3">
          {[
            ["Ce qu'on sert", "Trois huiles d'olive vierge extra, du pain de blé, de l'eau. Le pain contient du gluten : dis-le en réservant si tu n'en manges pas, on prévoit autre chose."],
            ["Ce que ça coûte", "Rien. La dégustation est gratuite et sans obligation d'achat."],
            ["Si tu ne viens pas", `Appelle le ${boutique.telephone} : ta chaise revient à quelqu'un d'autre.`],
          ].map(([t, x], i) => (
            <Apparition key={t} delai={i * 100} className="space-y-3 border-t-2 border-[var(--encre)] pt-5">
              <h3 className="text-3xl font-semibold">{t}</h3>
              <p className="text-lg leading-relaxed text-[var(--doux)]">{x}</p>
            </Apparition>
          ))}
        </div>
      </section>

      <AppelFinal />
    </main>
  );
}
