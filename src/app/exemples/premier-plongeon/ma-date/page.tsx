import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import { entreprise } from "../_composants/donnees";
import { Intitule, Plaque, styles as s } from "../_composants/Habillage";
import { HautDePage, Section } from "../_composants/Blocs";
import Creneaux from "../_composants/Creneaux";
import Formulaire from "../_composants/Formulaire";

export const metadata: Metadata = {
  title: "Ma date — Premier Plongeon (démonstration)",
  description: "Choisir soi-même sa semaine de chantier et réserver la visite technique, chez un pisciniste imaginaire.",
  ...adressesDeLaPage("/exemples/premier-plongeon/ma-date"),
};

const ENSUITE = [
  { titre: "On t'appelle sous 24 h", texte: "Pour fixer l'heure de la visite technique, à la date qui t'arrange." },
  { titre: "La visite technique", texte: "Une heure chez toi : accès, sol, réseaux. Gratuite, sans engagement." },
  { titre: "Le devis ferme", texte: "Sous 72 h, avec ta semaine de chantier confirmée noir sur blanc." },
];

export default function MaDate() {
  return (
    <>
      <HautDePage />
      <main>
        <section className="max-w-6xl mx-auto px-5 sm:px-6 pt-14 sm:pt-20 pb-20 sm:pb-24 space-y-12">
          <Intitule niveau={1} libelle="Ma date" titre={<>Choisis ta semaine <span className="text-[#e8d1cb]">de chantier.</span></>}>
            Le planning réel, semaine par semaine. Tu bloques la tienne, on vient faire la
            visite technique, et elle est confirmée sur le devis.
          </Intitule>
          <Creneaux />
        </section>

        <Section sombre className="space-y-12">
          <Intitule libelle="Ensuite" titre={<>Ce qui se passe <span className="text-[#e8d1cb]">après.</span></>} />
          <ol className="grid gap-6 md:grid-cols-3">
            {ENSUITE.map((e, i) => (
              <li key={e.titre} className="h-full">
                <Plaque coupe={18} className="h-full">
                  <div className="h-full p-6 space-y-3">
                    <span className={`${s.titre} block text-4xl text-[#e8d1cb] tabular-nums`}>{String(i + 1).padStart(2, "0")}</span>
                    <h2 className={`${s.titre} text-xl`}>{e.titre}</h2>
                    <p className="leading-relaxed text-[#b9c0cc]">{e.texte}</p>
                  </div>
                </Plaque>
              </li>
            ))}
          </ol>
        </Section>

        <Section className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Intitule libelle="Visite technique" titre={<>Ou laisse-nous <span className="text-[#e8d1cb]">te rappeler.</span></>}>
            Pas encore de semaine en tête ? Laisse ton numéro : on t&apos;appelle pour fixer la
            visite technique. Ou appelle-nous au {entreprise.telephone}.
          </Intitule>
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
        </Section>
      </main>
    </>
  );
}
