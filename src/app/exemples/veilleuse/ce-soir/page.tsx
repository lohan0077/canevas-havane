import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, EnTetePage } from "../_composants/Blocs";
import EspaceClient from "../_composants/EspaceClient";

// L'espace client d'exemple. La vidéo « Créer une marque » : « Sur le site, dans ton
// espace client : qui vient ce soir. Son prénom, et les références de sa carte
// professionnelle. » Filmé tel quel (Videos/marque-securite/tournage.mjs).
export const metadata: Metadata = {
  title: "Qui vient ce soir — Veilleuse, site de démonstration",
  description: "L'espace client d'exemple de Veilleuse : le prénom de l'agent de ce soir, ses horaires et les références de sa carte professionnelle. Démonstration de Canevas Havane.",
  ...adressesDeLaPage("/exemples/veilleuse/ce-soir"),
};

const POINTS = [
  { titre: "Son prénom, pas un matricule", texte: "Tu sais qui sonne s'il faut sonner, et qui écrit le rapport du matin." },
  { titre: "Sa carte professionnelle", texte: "Les références, avant la nuit. La loi te permet de les demander ; tu n'as pas à le faire." },
  { titre: "Visible de toi seul", texte: "Ce sont des données personnelles de nos agents : elles restent dans ton espace, jamais sur une page publique." },
];

export default function CeSoir() {
  return (
    <main>
      <EnTetePage
        surtitre="Espace client · démonstration"
        titre="Qui vient *ce soir.*"
        aside={
          <Apparition de="droite" delai={250} className="w-full">
            <EspaceClient />
          </Apparition>
        }
      >
        Voici ce que voit un client de Veilleuse en ouvrant son espace, l&apos;après-midi. L&apos;agent,
        les prénoms et les numéros sont des exemples.
      </EnTetePage>

      <section className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
        <TitreRevele
          texte="Avant que tu *demandes.*"
          className="mb-14 text-[clamp(2.8rem,6vw,5rem)] font-normal leading-[0.98] tracking-[-0.02em]"
          classeAccent="text-[var(--accent-texte)]"
        />
        <ul className="grid gap-5 md:grid-cols-3">
          {POINTS.map((p, i) => (
            <Apparition as="li" key={p.titre} delai={i * 120} className="space-y-3 rounded-[2rem] border border-[var(--trait)] bg-[var(--carte)] p-7">
              <span aria-hidden="true" className="block h-3 w-3 rounded-full bg-[var(--accent)] shadow-[0_0_14px_4px_rgba(244,201,93,0.5)]" />
              <h2 className="text-3xl font-normal">{p.titre}</h2>
              <p className="leading-relaxed text-[var(--doux)]">{p.texte}</p>
            </Apparition>
          ))}
        </ul>
      </section>

      <AppelFinal />
    </main>
  );
}
