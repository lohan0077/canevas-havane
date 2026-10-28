import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, EnTetePage, Surtitre } from "../_composants/Blocs";
import Mur from "../_composants/Mur";
import Promesse from "../_composants/Promesse";
import { photos } from "../_composants/donnees";

// « Sur le site, tu écris ta promesse. À qui, quel voyage, et depuis quand. Le site te
// dit depuis combien de temps tu la repousses. Et il te propose une date. Avec ce qu'il
// faut mettre de côté, chaque mois. » (« Créer une marque ») Puis le mur de la vitrine,
// où chacun colle son billet. Tout se calcule dans le navigateur ; rien n'est envoyé.
export const metadata: Metadata = {
  title: "Ta promesse — Parole Tenue, site de démonstration",
  description: "Écris le voyage que tu as promis : le site te dit depuis combien de temps tu le repousses, te propose une date et ce qu'il faut mettre de côté chaque mois. Démonstration, rien n'est envoyé.",
  ...adressesDeLaPage("/exemples/parole-tenue/ta-promesse"),
};

export default function TaPromesse() {
  return (
    <main>
      <EnTetePage surtitre="Ta promesse" titre="Le voyage que tu as *promis.*" photo={photos.islande}>
        À qui, quel voyage, et depuis quand. Trois réponses : le site te dit depuis combien de temps tu la
        repousses, et te propose une date.
      </EnTetePage>

      <section id="promesse" className="scroll-mt-20 mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-8 md:py-28 lg:grid-cols-[0.75fr_1.25fr]">
        <div className="space-y-6 lg:sticky lg:top-28 lg:self-start">
          <Apparition><Surtitre className="text-[var(--doux)]">Trois réponses</Surtitre></Apparition>
          <TitreRevele
            texte="Écris-la. *Le site compte.*"
            className="font-[family-name:var(--titres)] text-[clamp(2.6rem,5vw,4.4rem)] leading-[0.95] tracking-[-0.02em]"
            classeAccent="italic text-[var(--accent-texte)]"
          />
          <Apparition as="p" delai={150} className="text-lg leading-relaxed text-[var(--doux)]">
            Le montant mensuel est un calcul, pas un placement : l&apos;agence n&apos;encaisse rien d&apos;avance.
            L&apos;argent reste chez toi.
          </Apparition>
        </div>
        <Apparition de="zoom">
          <Promesse />
        </Apparition>
      </section>

      <section id="mur" className="scroll-mt-20 border-y border-[var(--trait)] bg-[#F3EAD8]">
        <div className="mx-auto max-w-7xl space-y-12 px-5 py-24 sm:px-8 md:py-28">
          <div className="max-w-3xl space-y-6">
            <Apparition><Surtitre className="text-[var(--doux)]">Le mur de la vitrine</Surtitre></Apparition>
            <TitreRevele
              texte="Colle ton billet *avec les autres.*"
              className="font-[family-name:var(--titres)] text-[clamp(2.6rem,5vw,4.4rem)] leading-[0.95] tracking-[-0.02em]"
              classeAccent="italic text-[var(--accent-texte)]"
            />
            <Apparition as="p" delai={150} className="text-lg leading-relaxed text-[var(--doux)]">
              Dans la vitrine de l&apos;agence, un mur où les passants écrivent leur voyage promis, sur un billet
              d&apos;avion en papier. Sans nom ni coordonnées.
            </Apparition>
          </div>
          <Mur />
        </div>
      </section>

      <div className="h-16" />
      <AppelFinal />
    </main>
  );
}
