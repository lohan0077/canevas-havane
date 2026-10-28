import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import { EnTetePage, Section, Surtitre, Titre } from "../_composants/Blocs";
import PhraseLundi from "../_composants/PhraseLundi";
import { ACCUEIL, METHODE, THEMES, photos } from "../_composants/donnees";

// « Et on construit la soirée à l'envers, à partir de cette phrase. » Un exemple complet,
// heure par heure en remontant le temps, puis l'outil : à vous d'écrire la phrase.
export const metadata: Metadata = {
  title: "La soirée à l'envers — Lundi d'Après, site de démonstration",
  description: "Une agence part du lieu, puis du menu. Nous, on part de lundi : la soirée construite à l'envers, à partir de la phrase que vos équipes se diront. Site de démonstration.",
  ...adressesDeLaPage("/exemples/lundi-d-apres/a-l-envers"),
};

const exemple = THEMES[0];

export default function ALEnvers() {
  const etapes = [
    { heure: "Lundi, 9 h", titre: "« On ne savait pas que la compta chantait aussi bien. »", texte: "Le point de départ. Tout le reste en découle." },
    exemple.moment,
    exemple.diner,
    ACCUEIL,
  ];
  return (
    <main>
      <EnTetePage surtitre="Exemple, du lundi au vendredi" titre="la soirée, *à l'envers.*" photo={photos.croissants} origine="50% 45%">
        Une agence part du lieu, puis du menu, puis de l&apos;animation. Nous, on part de lundi : la phrase qu&apos;on veut entendre
        devant la machine à café. Et on remonte le temps.
      </EnTetePage>

      <Section className="grid grid-cols-1 gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div className="space-y-6 lg:sticky lg:top-28">
          <Apparition><Surtitre>Un exemple, heure par heure</Surtitre></Apparition>
          <Titre texte="on commence *par la fin.*" />
        </div>
        <ol className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
          {etapes.map((e, i) => (
            <Apparition as="li" key={e.heure} delai={i * 110} className="grid grid-cols-1 gap-2 py-6 sm:grid-cols-[8rem_1fr] sm:gap-8">
              <p className={`font-[family-name:var(--titres)] text-[28px] leading-none tracking-[-0.03em] ${i === 0 ? "text-[var(--accent-texte)]" : ""}`}>{e.heure}</p>
              <div className="space-y-1">
                <h2 className="font-[family-name:var(--titres)] text-[24px] font-normal leading-snug">{e.titre}</h2>
                <p className="leading-relaxed text-[var(--doux)]">{e.texte}</p>
              </div>
            </Apparition>
          ))}
          <li className="py-4 text-[13px] text-[var(--doux)]">Exemple : la phrase et l&apos;entreprise sont inventées.</li>
        </ol>
      </Section>

      <Section fond="bg-[var(--carte)] border-y border-[var(--trait)]" className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-start">
        <div className="space-y-6">
          <Apparition><Surtitre>À vous d&apos;essayer</Surtitre></Apparition>
          <Titre texte="écrivez *votre phrase.*" />
          <Apparition as="p" delai={150} className="max-w-md text-lg leading-relaxed text-[var(--doux)]">
            Ou prenez un exemple : la soirée se construit à l&apos;envers, sous vos yeux.
          </Apparition>
        </div>
        <Apparition delai={150}><PhraseLundi /></Apparition>
      </Section>

      <Section className="space-y-14">
        <div className="space-y-5">
          <Apparition><Surtitre>La méthode</Surtitre></Apparition>
          <Titre texte="les quatre *temps.*" />
        </div>
        <ol className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {METHODE.map((m, i) => (
            <Apparition as="li" key={m.titre} delai={i * 110} className="space-y-3 border-t border-[var(--trait)] pt-5">
              <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-[var(--doux)]">0{i + 1}</p>
              <h3 className="font-[family-name:var(--titres)] text-[24px] font-normal lowercase">{m.titre}</h3>
              <p className="leading-relaxed text-[var(--doux)]">{m.texte}</p>
            </Apparition>
          ))}
        </ol>
      </Section>
    </main>
  );
}
