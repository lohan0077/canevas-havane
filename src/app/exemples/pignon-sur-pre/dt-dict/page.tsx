import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, Bouton, EnTetePage, Surtitre, TERRE } from "../_composants/Blocs";
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
      <EnTetePage surtitre="Avant de creuser" titre="Ta DT-DICT : *on t'aide.*" photo={photos.tranchee}>
        Gaz, électricité, eau, fibre&nbsp;: sous un jardin, il passe souvent plus de choses qu&apos;on ne croit. Avant de creuser,
        on déclare les travaux à ceux qui exploitent ces réseaux, pour qu&apos;ils disent où ils passent.
      </EnTetePage>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-[1fr_1fr] lg:items-start">
        <div className="space-y-6">
          <Apparition><Surtitre>Particuliers compris</Surtitre></Apparition>
          <TitreRevele texte="Celui qui creuse *la fait.*" className="font-[family-name:var(--titres)] text-[clamp(3rem,5.5vw,4.8rem)] font-normal leading-[0.92] tracking-[-0.03em]" classeAccent={TERRE} />
          <Apparition as="p" delai={150} className="max-w-md text-lg leading-relaxed text-[var(--doux)]">
            La déclaration ne vise pas que les entreprises&nbsp;: celui qui creuse chez lui la fait aussi. Elle prend un quart
            d&apos;heure&nbsp;; on préfère la faire avec toi que de te laisser deviner.
          </Apparition>
        </div>
        <Apparition de="zoom"><ChecklistDict /></Apparition>
      </section>

      <section className="px-3 sm:px-5">
        <div className="kit-grain rounded-[2.5rem] bg-[var(--sombre)] px-6 py-16 text-[var(--sur-sombre)] sm:px-12 md:py-24">
          <div className="mx-auto max-w-6xl space-y-10">
            <TitreRevele texte="Comment *ça se passe.*" className="font-[family-name:var(--titres)] text-[clamp(2.8rem,5vw,4.4rem)] font-normal leading-[0.92] tracking-[-0.03em]" classeAccent="italic font-light text-[#F2C98A]" />
            <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {ETAPES.map((e, i) => (
                <Apparition as="li" key={e.titre} delai={i * 110} className="space-y-2 rounded-[22px] border border-white/15 p-5">
                  <p className="font-[family-name:var(--titres)] text-4xl italic tabular-nums text-[#F2C98A]">{String(i + 1).padStart(2, "0")}</p>
                  <h2 className="font-[family-name:var(--titres)] text-[24px] font-normal leading-tight">{e.titre}</h2>
                  <p className="leading-relaxed text-[var(--sur-sombre)]/90">{e.texte}</p>
                </Apparition>
              ))}
            </ol>
            <p className="text-[15px] text-[var(--sur-sombre)]/90">
              Les délais et le détail de la démarche se lisent sur le téléservice officiel «&nbsp;Réseaux et canalisations&nbsp;».
              Ce site de démonstration ne les remplace pas.
            </p>
            <Bouton href={`${DOSSIER}/disponibilites`} variante="creme">Voir les samedis libres</Bouton>
          </div>
        </div>
      </section>

      <div className="pt-24 md:pt-32">
        <AppelFinal />
      </div>
    </main>
  );
}
