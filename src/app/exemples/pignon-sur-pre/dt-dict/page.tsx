import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import { AppelFinal, Bouton, EnTetePage, Intitule, Section } from "../_composants/Blocs";
import ChecklistDict from "../_composants/ChecklistDict";
import { DOSSIER, photos } from "../_composants/donnees";

// « Avant de creuser : ta DT-DICT, on t'aide. » Ce que c'est, qui la fait (les
// particuliers aussi), où (le téléservice « Réseaux et canalisations », ou la mairie),
// et ce qu'il faut avoir sous la main. Aucun délai n'est affirmé : il se lit sur le
// téléservice officiel. Voir Videos/agenda-loueurs/SOURCES.md.
export const metadata: Metadata = {
  title: "DT-DICT — Pignon sur Pré, site de démonstration",
  description: "Avant de creuser, la déclaration aux exploitants de réseaux : ce que c'est, qui la fait, ce qu'il faut pour la remplir. Site de démonstration.",
  ...adressesDeLaPage("/exemples/pignon-sur-pre/dt-dict"),
};

const ETAPES = [
  { titre: "Tu nous appelles", texte: "Avec ton adresse et le tracé de ta tranchée. Un quart d'heure suffit." },
  { titre: "On la remplit ensemble", texte: "Sur le téléservice « Réseaux et canalisations », le guichet unique de la DT-DICT. Sans internet, elle se dépose aussi en mairie." },
  { titre: "Les exploitants répondent", texte: "Chacun dit où passent ses réseaux et ce qu'il faut respecter. On attend leurs réponses avant de creuser." },
  { titre: "On livre", texte: "Les réponses sont là, la machine arrive. Si elles tardent, on décale ta location sans frais (exemple)." },
];

export default function DtDict() {
  return (
    <main>
      <EnTetePage surtitre="Avant de creuser" titre={"Ta DT-DICT\u00a0: *on t'aide.*"} photo={photos.tranchee}>
        Gaz, électricité, eau, fibre&nbsp;: sous un jardin, il passe souvent plus de choses qu&apos;on ne croit. Avant de creuser,
        on déclare les travaux à ceux qui exploitent ces réseaux, pour qu&apos;ils disent où ils passent.
      </EnTetePage>

      <Section className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:items-start lg:gap-16">
        <Intitule
          surtitre="Particuliers compris"
          titre="Celui qui creuse *la fait.*"
          texte="La déclaration ne vise pas que les entreprises : celui qui creuse chez lui la fait aussi. Elle prend un quart d'heure ; on préfère la faire avec toi que de te laisser deviner."
        />
        <Apparition delai={150}><ChecklistDict /></Apparition>
      </Section>

      <Section fond="bg-[var(--sombre)] text-[var(--sur-sombre)]" className="space-y-14">
        <Intitule surtitre="Pas à pas" titre="Comment *ça se passe.*" clair />
        <ol className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {ETAPES.map((e, i) => (
            <Apparition as="li" key={e.titre} delai={i * 110} className="space-y-2 border-t border-white/30 pt-4">
              <p className="text-[12px] font-medium uppercase tracking-[0.2em]">{String(i + 1).padStart(2, "0")}</p>
              <h2 className="font-[family-name:var(--titres)] text-2xl font-normal leading-tight">{e.titre}</h2>
              <p className="leading-relaxed">{e.texte}</p>
            </Apparition>
          ))}
        </ol>
        <div className="space-y-6">
          <p className="max-w-2xl text-[15px]">
            Les délais et le détail de la démarche se lisent sur le téléservice officiel «&nbsp;Réseaux et canalisations&nbsp;».
            Ce site de démonstration ne les remplace pas.
          </p>
          <Bouton href={`${DOSSIER}/disponibilites`} variante="clair">Voir les samedis libres</Bouton>
        </div>
      </Section>

      <AppelFinal />
    </main>
  );
}
