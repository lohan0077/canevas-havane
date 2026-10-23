import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import Creneaux from "../../_kit/Creneaux";
import FondVivant from "../../_kit/FondVivant";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, Chapitre } from "../_composants/Blocs";
import Four from "../_composants/Four";
import { ouvertures } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "L'ouverture du four — Après Nous, site de démonstration",
  description: "Une fois par mois, le four d'un atelier de céramique imaginaire s'ouvre en direct, et les pièces sont en ligne le soir même.",
  ...adressesDeLaPage("/exemples/apres-nous/ouverture-du-four"),
};

const SOIREE = [
  { heure: "19 h", titre: "On ouvre", texte: "Le four a refroidi deux jours. La porte s'ouvre devant la caméra, pas avant." },
  { heure: "19 h 15", titre: "On sort les pièces", texte: "Une à une, avec leur numéro. On dit celles qui ont raté, et pourquoi : une fissure, une bulle, un émail qui a coulé trop loin." },
  { heure: "20 h", titre: "On photographie", texte: "Chaque pièce rejoint sa page, à côté de la vidéo de son tournage." },
  { heure: "21 h", titre: "En ligne", texte: "La fournée est en vente. Une seule de chaque : pas de liste d'attente, pas de réassort." },
];

export default function OuvertureDuFour() {
  return (
    <main>
      <section className="kit-grain relative isolate overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <FondVivant couleurs={["#2A190E", "#5A2E16", "#C2521F"]} vitesse={0.6} />
        <div className="absolute inset-0 bg-[var(--sombre)]/60" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-20 pt-32 sm:px-8 md:pt-40 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <Apparition>
              <p className="inline-flex items-center gap-2 border border-white/30 px-3 py-1.5 text-[12px] font-bold uppercase tracking-[0.16em]">
                <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[#E5533D]" />
                En direct · le troisième jeudi du mois
              </p>
            </Apparition>
            <TitreRevele
              as="h1"
              auChargement
              texte="L'ouverture *du four.*"
              className="font-[family-name:var(--titres)] text-[clamp(3.4rem,8vw,7.4rem)] leading-[0.92] tracking-[-0.02em]"
              classeAccent="italic text-[#E0B36A]"
            />
            <Apparition as="p" delai={300} className="max-w-lg text-lg leading-relaxed text-[var(--sur-sombre)]/90">
              Une fois par mois, on ouvre le four en direct. Tu vois sortir les pièces avant tout le monde, et le soir même,
              elles sont en ligne.
            </Apparition>
            <Apparition as="p" delai={400} className="font-[family-name:var(--titres)] text-3xl">
              Prochaine : {ouvertures.prochaine.date}, {ouvertures.prochaine.heure}.
            </Apparition>
          </div>
          <Apparition de="zoom" delai={200}>
            <Four />
          </Apparition>
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-12 px-5 py-20 sm:px-8 md:py-28">
        <div className="space-y-6">
          <Apparition><Chapitre>La soirée</Chapitre></Apparition>
          <TitreRevele
            texte="Une soirée, *quatre moments.*"
            className="font-[family-name:var(--titres)] text-[clamp(2.8rem,6vw,5.4rem)] leading-[0.95] tracking-[-0.02em]"
            classeAccent="italic text-[var(--accent-texte)]"
          />
        </div>
        <ol className="grid gap-8 md:grid-cols-4">
          {SOIREE.map((s, i) => (
            <Apparition as="li" key={s.heure} delai={i * 120} className="space-y-3 border-t-2 border-[var(--accent)] pt-5">
              <p className="font-[family-name:var(--titres)] text-4xl italic text-[var(--accent-texte)]">{s.heure}</p>
              <h2 className="font-[family-name:var(--titres)] text-2xl">{s.titre}</h2>
              <p className="leading-relaxed text-[var(--doux)]">{s.texte}</p>
            </Apparition>
          ))}
        </ol>
      </section>

      <section id="rappel" className="scroll-mt-24 border-y border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6">
            <Apparition><Chapitre>Les prochaines dates</Chapitre></Apparition>
            <TitreRevele
              texte="Note la date, *on ouvre à 19 h.*"
              className="font-[family-name:var(--titres)] text-[clamp(2.6rem,5vw,4.6rem)] leading-[0.95] tracking-[-0.02em]"
              classeAccent="italic text-[var(--accent-texte)]"
            />
            <Apparition as="p" delai={150} className="text-lg leading-relaxed text-[var(--doux)]">
              Choisis une soirée : elle s&apos;ajoute à ton agenda, sans inscription ni adresse à donner.
            </Apparition>
          </div>
          <Apparition de="zoom" delai={100}>
            <Creneaux
              colonnes={3}
              creneaux={[
                { libelle: ouvertures.derniere.court, sous: "jeudi · 19 h", pris: true },
                { libelle: ouvertures.prochaine.court, sous: "jeudi · 19 h" },
                { libelle: ouvertures.suivante.court, sous: "jeudi · 19 h" },
              ]}
              titreCarte="Le rendez-vous"
              bouton="Me le rappeler"
              confirmation="Rappel noté : {creneau}"
              note="Dates réelles du calendrier ; l'atelier, lui, est fictif. La soirée du 15 octobre est passée."
              libellePris="Passée"
              libelleLibre="À venir"
            />
          </Apparition>
        </div>
      </section>

      <section className="mx-auto max-w-4xl space-y-6 px-5 py-20 text-center sm:px-8 md:py-28">
        <TitreRevele
          texte="Une rareté *qui n'est pas inventée.*"
          className="font-[family-name:var(--titres)] text-[clamp(2.6rem,5vw,4.4rem)] leading-[0.98] tracking-[-0.02em]"
          classeAccent="italic text-[var(--accent-texte)]"
        />
        <Apparition as="p" delai={150} className="text-lg leading-relaxed">
          On n&apos;écrit jamais « bientôt épuisé ». Une pièce tournée à la main n&apos;existe qu&apos;une fois : quand elle
          est vendue, sa page le dit, et c&apos;est tout.
        </Apparition>
      </section>
      <AppelFinal />
    </main>
  );
}
