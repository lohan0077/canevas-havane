import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Accordeon from "../../_kit/Accordeon";
import Apparition from "../../_kit/Apparition";
import { Affiche, AppelFinal, Appli, EnTetePage, LaRegle, Surtitre, Titre } from "../_composants/Blocs";
import Creneau from "../_composants/Creneau";
import { ETAPES, QUESTIONS, entreprise } from "../_composants/donnees";

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

// La page de l'appel. Le formulaire `data-film="creneau"` (#telephone, #accord,
// #choix-jour, #heure-18, « Réserver mon appel ») est filmé dans les deux vidéos : « Tu
// rappelles seulement ceux qui l'ont demandé. Dans les cinq jours ouvrables » (« Remplir
// l'agenda ») et « Mardi, dix-huit heures. Pas une minute avant » (« Créer une marque »).
export default function RendezVous() {
  return (
    <main>
      <EnTetePage surtitre="Ta demande de devis" titre={"Quand veux-tu *qu'on t'appelle ?*"}>
        Prends ton créneau, comme chez le coiffeur. On t&apos;appelle à ce moment-là, pas une minute avant, et seulement
        pour ton devis.
      </EnTetePage>

      <section className="mx-auto grid max-w-6xl gap-14 px-6 py-20 md:py-28 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <Apparition as="ul" className="divide-y divide-[var(--trait)] border-y border-[var(--trait)] text-lg lg:sticky lg:top-28">
          {["Un jour parmi les cinq prochains jours ouvrables", "Une heure parmi celles qu'on tient", "Pas une minute avant", "Seulement pour ton devis", `Tu préfères appeler ? ${entreprise.telephone}`].map((t) => (
            <li key={t} className="py-4">{t}</li>
          ))}
        </Apparition>
        <Apparition>
          <Appli titre="Ton appel" note="exemple · rien n'est envoyé">
            <Creneau />
          </Appli>
        </Apparition>
      </section>

      <LaRegle />

      <section className="mx-auto max-w-6xl space-y-14 px-6 py-28 md:py-40">
        <div className="space-y-5">
          <Apparition><Surtitre>Pourquoi ces règles</Surtitre></Apparition>
          <Titre texte="La loi fixe un cadre. *On choisit l'heure dedans.*" className="max-w-3xl" />
        </div>
        <ol className="grid gap-10 md:grid-cols-3 md:gap-6">
          {REGLES.map((r, i) => (
            <Apparition as="li" key={r.titre} delai={i * 120} className="space-y-3 border-t border-[var(--trait)] pt-5">
              <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-[var(--doux)]">{String(i + 1).padStart(2, "0")}</p>
              <h2 className="font-[family-name:var(--titres)] text-2xl font-bold tracking-[-0.025em]">{r.titre}</h2>
              <p className="leading-relaxed text-[var(--doux)]">{r.texte}</p>
            </Apparition>
          ))}
        </ol>
        <p className="max-w-2xl text-[15px] leading-relaxed text-[var(--doux)]">
          Sur un vrai site, ta demande servirait seulement à t&apos;appeler, et sa trace serait gardée trois ans, comme
          l&apos;exige le code de la consommation. Ici, c&apos;est une démonstration : rien n&apos;est envoyé, rien n&apos;est enregistré.
        </p>
        {/* Les questions que l'accueil ne garde pas (il en montre cinq). */}
        <Apparition className="max-w-3xl">
          <Accordeon nom="questions-appel" questions={QUESTIONS.slice(5).map((q) => ({ question: q.q, reponse: q.r }))} />
        </Apparition>
      </section>

      <section className="bg-[var(--carte)]">
        <div className="mx-auto grid max-w-6xl gap-14 px-6 py-28 md:py-40 lg:grid-cols-2 lg:items-start">
          <div className="space-y-10">
            <div className="space-y-5">
              <Apparition><Surtitre>Ensuite</Surtitre></Apparition>
              <Titre texte="De l'heure dite *à ton premier midi.*" />
            </div>
            <ol className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
              {ETAPES.map((e) => (
                <Apparition as="li" key={e.titre} className="grid gap-1 py-5 sm:grid-cols-[11rem_1fr] sm:gap-6">
                  <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-[var(--doux)]">{e.moment}</p>
                  <div className="space-y-1">
                    <h3 className="font-[family-name:var(--titres)] text-xl font-bold tracking-[-0.025em]">{e.titre}</h3>
                    <p className="text-[15px] leading-relaxed text-[var(--doux)]">{e.texte}</p>
                  </div>
                </Apparition>
              ))}
            </ol>
          </div>
          <div className="space-y-6">
            <Apparition><Surtitre>L&apos;affiche du lancement</Surtitre></Apparition>
            <Apparition delai={150}>
              <Affiche />
            </Apparition>
          </div>
        </div>
      </section>

      <AppelFinal />
    </main>
  );
}
