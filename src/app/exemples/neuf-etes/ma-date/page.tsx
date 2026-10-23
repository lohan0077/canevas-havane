import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import { EnTetePage, Surtitre, Titre } from "../_composants/Blocs";
import CompteARebours from "../_composants/CompteARebours";
import Creneaux from "../_composants/Creneaux";
import Formulaire from "../_composants/Formulaire";
import { entreprise, photos } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Ma date — Neuf Étés (démonstration)",
  description: "Choisir soi-même sa semaine de chantier et réserver la visite technique, chez une marque de piscines imaginaire.",
  ...adressesDeLaPage("/exemples/neuf-etes/ma-date"),
};

const ENSUITE = [
  { titre: "On t'appelle sous 24 h", texte: "Pour fixer l'heure de la visite technique, à la date qui t'arrange." },
  { titre: "La visite technique", texte: "Une heure chez toi : accès, sol, réseaux. Gratuite, sans engagement." },
  { titre: "Le devis ferme", texte: "Sous 72 h, avec ta semaine de chantier confirmée noir sur blanc." },
];

export default function MaDate() {
  return (
    <main>
      <EnTetePage surtitre="Ma date" titre="Choisis ta semaine *de chantier.*" photo={photos.reflets} origine="50% 40%">
        Le planning de la saison, semaine par semaine. Tu bloques la tienne, on vient faire la
        visite technique, et elle est confirmée sur le devis.
      </EnTetePage>

      <section id="date" className="scroll-mt-20 px-3 pt-3 sm:px-5 sm:pt-5">
        <div className="rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
          <div className="mx-auto max-w-6xl space-y-12 px-5 py-20 sm:px-10 md:py-28">
            <div className="space-y-6">
              <Apparition><Surtitre clair>Saison 2027</Surtitre></Apparition>
              <Titre texte="Les semaines, *une par une.*" clair taille="moyen" />
            </div>
            <Creneaux />
            <div className="border-t border-white/15 pt-10">
              <CompteARebours />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-12 px-5 py-24 sm:px-8 md:py-32">
        <div className="space-y-6">
          <Apparition><Surtitre>Ensuite</Surtitre></Apparition>
          <Titre texte="Ce qui se passe *après.*" />
        </div>
        <ol className="grid gap-5 md:grid-cols-3">
          {ENSUITE.map((e, i) => (
            <Apparition as="li" key={e.titre} delai={i * 120} className="rounded-[2rem] border border-[var(--trait)] bg-[var(--carte)] p-7">
              <span className="font-[family-name:var(--titres)] text-5xl font-normal text-[var(--accent-texte)]">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="mt-4 text-2xl font-bold">{e.titre}</h2>
              <p className="mt-3 leading-relaxed text-[var(--doux)]">{e.texte}</p>
            </Apparition>
          ))}
        </ol>
      </section>

      <section className="border-t border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6">
            <Apparition><Surtitre>Visite technique</Surtitre></Apparition>
            <Titre texte="Ou laisse-nous *te rappeler.*" taille="moyen" />
            <Apparition as="p" delai={200} className="text-xl leading-relaxed text-[var(--doux)]">
              Pas encore de semaine en tête ? Laisse ton numéro : on t&apos;appelle pour fixer la
              visite technique. Ou appelle-nous au <span className="font-bold tabular-nums">{entreprise.telephone}</span>.
            </Apparition>
          </div>
          <Formulaire
            champs={[
              { nom: "nom", libelle: "Ton nom", requis: true, autocomplete: "name" },
              { nom: "telephone", libelle: "Ton téléphone", type: "tel", requis: true, autocomplete: "tel" },
              { nom: "commune", libelle: "Ta commune", requis: true, autocomplete: "address-level2" },
              { nom: "projet", libelle: "Ton projet", type: "textarea", aide: "La surface du jardin, la taille qui te fait envie, une contrainte d'accès…" },
            ]}
            bouton="Être rappelé"
            confirmation="Demande de visite technique enregistrée"
          />
        </div>
      </section>
    </main>
  );
}
