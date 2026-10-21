import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import { CONCERT } from "../_composants/donnees";
import { Ornement, Surtitre } from "../_composants/Blocs";
import { Chaises } from "../_composants/Interactifs";

// Le concert de salon de la vidéo : « Une fois par mois, un concert de salon, chez un
// élève. Six élèves, douze chaises, et les voisins. » Une invitation entre particuliers,
// entrée libre, un programme du domaine public.
export const metadata: Metadata = {
  title: "Concerts de salon · Clair de Salon — site de démonstration",
  description: "Une fois par mois, un concert de salon chez un élève : six élèves au piano, douze chaises, entrée libre. Site de démonstration d'une marque imaginaire.",
  ...adressesDeLaPage("/exemples/clair-de-salon/concerts"),
};

export default function Concerts() {
  return (
    <main className="max-w-6xl mx-auto px-5 pt-10 pb-20 sm:pt-16 grid gap-12 lg:grid-cols-2 lg:items-start">
      <div className="space-y-8">
        <div className="space-y-4">
          <Surtitre>Une fois par mois</Surtitre>
          <h1 className="text-[48px] sm:text-7xl">Concert <span className="italic text-[var(--accent-texte)]">de salon.</span></h1>
          <p className="text-lg leading-relaxed">
            Chez un élève qui l&apos;accepte, dans son salon, sur son piano. {CONCERT.eleves} élèves
            jouent ce qu&apos;ils savent ; {CONCERT.chaises} chaises pour les écouter. Entrée libre,
            voisins bienvenus.
          </p>
        </div>
        <div className="border border-[var(--encre)] bg-[var(--carte)] p-6 sm:p-8 text-center space-y-4">
          <Ornement />
          <p className="text-xs font-bold uppercase tracking-[0.2em]">Prochain concert</p>
          <p className="font-[family-name:var(--titres)] text-4xl">{CONCERT.date}</p>
          <p className="italic text-xl">{CONCERT.heure}, {CONCERT.chez}</p>
          <ol className="space-y-1.5 border-t border-[var(--trait)] pt-4 text-left">
            {CONCERT.programme.map((m, i) => (
              <li key={m} className="flex gap-3"><span className="font-[family-name:var(--titres)] italic text-[var(--accent-texte)] [font-variant-numeric:lining-nums]">{i + 1}.</span>{m}</li>
            ))}
          </ol>
          <p className="text-sm text-[var(--doux)]">Date et programme d&apos;exemple. Des œuvres du domaine public, jouées entre amis.</p>
        </div>
      </div>
      <div className="space-y-4 lg:pt-8">
        <h2 className="text-3xl">Garde-toi une chaise</h2>
        <Chaises />
      </div>
    </main>
  );
}
