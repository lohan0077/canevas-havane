import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { ACCENT_CLAIR, AppelFinal, Appli, EnTetePage, Surtitre } from "../_composants/Blocs";
import Creneau from "../_composants/Creneau";
import { entreprise } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Choisir mon heure — L'Heure Dite, site de démonstration",
  description:
    "Choisis le jour et l'heure de ton appel parmi les cinq prochains jours ouvrables : on appelle à ce créneau, pas avant, et seulement pour ton devis. Site de démonstration.",
  ...adressesDeLaPage("/exemples/l-heure-dite/rendez-vous"),
};

const REGLES = [
  {
    titre: "Dans les cinq jours ouvrables",
    texte: "Un professionnel ne peut rappeler un particulier qui l'a demandé que dans les cinq jours ouvrables suivant la demande (C. consom., art. R223-4). Le site ne te propose donc que ces cinq jours-là, recalculés chaque jour, jours fériés retirés.",
  },
  {
    titre: "Seulement pour ton devis",
    texte: "L'appel ne porte que sur ce que tu as demandé (même article). Pas d'autre offre, pas de rappel « au cas où ».",
  },
  {
    titre: "À l'heure que tu as dite",
    texte: "Tu donnes ton accord pour une date et une heure précises, et nous pouvons en attester (art. L223-1). C'est ce créneau, et aucun autre.",
  },
];

// La page de l'appel. Le formulaire `data-film="creneau"` est filmé dans les deux vidéos :
// « Tu rappelles seulement ceux qui l'ont demandé. Dans les cinq jours ouvrables »
// (« Remplir l'agenda ») et « Mardi, dix-huit heures. Pas une minute avant » (« Créer une
// marque »).
export default function RendezVous() {
  return (
    <main>
      <EnTetePage surtitre="Ta demande de devis" titre={"Quand veux-tu *qu'on t'appelle ?*"}>
        Prends ton créneau, comme chez le coiffeur. On t&apos;appelle à ce moment-là, pas une minute avant, et
        seulement pour ton devis.
      </EnTetePage>

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-8 md:py-24 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <Apparition as="ul" className="space-y-4 text-lg lg:sticky lg:top-28 lg:pt-6">
          {["Un jour parmi les cinq prochains jours ouvrables", "Une heure parmi celles qu'on tient", "Pas une minute avant", "Seulement pour ton devis", `Tu préfères appeler ? ${entreprise.telephone}`].map((t) => (
            <li key={t} className="flex gap-3 border-b border-[var(--trait)] pb-4">
              <span aria-hidden="true" className="text-[var(--accent-texte)]">◷</span>
              {t}
            </li>
          ))}
        </Apparition>
        <Apparition de="zoom">
          <Appli titre="Ton appel" note="exemple · rien n'est envoyé">
            <Creneau />
          </Appli>
        </Apparition>
      </section>

      <section className="border-y border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto max-w-7xl space-y-12 px-5 py-20 sm:px-8 md:py-28">
          <div className="max-w-3xl space-y-6">
            <Apparition><Surtitre>Pourquoi ces règles</Surtitre></Apparition>
            <TitreRevele
              texte="La loi fixe un cadre. *On choisit l'heure dedans.*"
              className="font-[family-name:var(--titres)] text-[clamp(2.4rem,4.8vw,4.4rem)] leading-[0.98] tracking-[-0.03em]"
              classeAccent={ACCENT_CLAIR}
            />
          </div>
          <ol className="grid gap-4 md:grid-cols-3">
            {REGLES.map((r, i) => (
              <Apparition as="li" key={r.titre} de="zoom" delai={i * 140} className="space-y-3 rounded-[2rem] border border-[var(--trait)] bg-[var(--fond)] p-7">
                <p aria-hidden="true" className="font-[family-name:var(--titres)] text-5xl text-[var(--accent-texte)]">{i + 1}</p>
                <h2 className="font-[family-name:var(--titres)] text-2xl">{r.titre}</h2>
                <p className="leading-relaxed text-[var(--doux)]">{r.texte}</p>
              </Apparition>
            ))}
          </ol>
          <p className="max-w-2xl text-[15px] leading-relaxed text-[var(--doux)]">
            Sur un vrai site, ta demande servirait seulement à t&apos;appeler, et sa trace serait gardée trois ans,
            comme l&apos;exige le code de la consommation. Ici, c&apos;est une démonstration : rien n&apos;est envoyé,
            rien n&apos;est enregistré.
          </p>
        </div>
      </section>

      <AppelFinal />
    </main>
  );
}
