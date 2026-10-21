import type { Metadata } from "next";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import Creneaux from "../../_kit/Creneaux";
import { DOSSIER, ouvertures } from "../_composants/donnees";
import Four from "../_composants/Four";

export const metadata: Metadata = {
  title: "L'ouverture du four · Sortie de Four — site de démonstration",
  description: "Site de démonstration d'un atelier de céramique imaginaire : une fois par mois, le four s'ouvre en direct, et les pièces sont en ligne le soir même.",
  ...adressesDeLaPage("/exemples/sortie-de-four/ouverture-du-four"),
};

const SOIREE = [
  { heure: "19 h", titre: "On ouvre", texte: "Le four a refroidi deux jours. La porte s'ouvre devant la caméra, pas avant." },
  { heure: "19 h 15", titre: "On sort les pièces", texte: "Une à une, avec leur numéro. On dit celles qui ont raté, et pourquoi : une fissure, une bulle, un émail qui a coulé trop loin." },
  { heure: "20 h", titre: "On photographie", texte: "Chaque pièce rejoint sa page, à côté de la vidéo de son tournage." },
  { heure: "21 h", titre: "En ligne", texte: "La fournée est en vente. Une seule de chaque : pas de liste d'attente, pas de réassort." },
];

export default function OuvertureDuFour() {
  return (
    <div>
      <section className="bg-[var(--sombre)] px-5 pb-20 pt-12 text-[var(--sur-sombre)] sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full border border-[#F3EADF]/40 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em]">
              <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[#E5533D]" />
              En direct · le troisième jeudi du mois
            </p>
            <h1 className="text-[56px] font-normal sm:text-8xl">
              L&apos;ouverture <span className="italic text-[#E39A6E]">du four.</span>
            </h1>
            <p className="text-lg leading-relaxed text-[#D9C3AE]">
              Une fois par mois, on ouvre le four en direct. Tu vois sortir les pièces avant tout le
              monde, et le soir même, elles sont en ligne.
            </p>
            <p className="font-[family-name:var(--titres)] text-4xl">
              Prochaine : {ouvertures.prochaine.date}, {ouvertures.prochaine.heure}.
            </p>
          </div>
          <Four />
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-10 px-5 py-20 sm:px-6">
        <h2 className="text-5xl font-normal">
          Une soirée, <span className="italic">quatre moments.</span>
        </h2>
        <ol className="grid gap-8 md:grid-cols-4">
          {SOIREE.map((s) => (
            <li key={s.heure} className="space-y-3 border-t-2 border-[var(--accent)] pt-4">
              <p className="font-[family-name:var(--titres)] text-4xl italic text-[var(--accent-texte)]">{s.heure}</p>
              <h3 className="text-2xl font-normal">{s.titre}</h3>
              <p className="leading-relaxed text-[var(--doux)]">{s.texte}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-[var(--carte)] px-5 py-20 sm:px-6" id="rappel">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--accent-texte)]">Les prochaines dates</p>
            <h2 className="text-5xl font-normal">
              Note la date, <span className="italic">on ouvre à 19 h.</span>
            </h2>
            <p className="text-lg leading-relaxed text-[var(--doux)]">
              Choisis une soirée : elle s'ajoute à ton agenda, sans inscription ni adresse à donner.
            </p>
          </div>
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
            note="Dates réelles du calendrier ; l'atelier, lui, est fictif. La soirée du 15 octobre est passée."
            libellePris="Passée"
            libelleLibre="À venir"
          />
        </div>
      </section>

      <section className="mx-auto max-w-4xl space-y-6 px-5 py-20 text-center sm:px-6">
        <h2 className="text-5xl font-normal">
          Une rareté <span className="italic">qui n&apos;est pas inventée.</span>
        </h2>
        <p className="text-lg leading-relaxed">
          On n&apos;écrit jamais « bientôt épuisé ». Une pièce tournée à la main n&apos;existe qu&apos;une fois :
          quand elle est vendue, sa page le dit, et c&apos;est tout.
        </p>
        <Link href={`${DOSSIER}/fournee`} className="inline-block rounded-full bg-[var(--accent)] px-7 py-4 text-lg font-bold text-[var(--sur-accent)]">
          Voir la fournée d&apos;octobre
        </Link>
      </section>
    </div>
  );
}
