import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, Arche, EnTetePage, Surtitre } from "../_composants/Blocs";
import Soiree from "../_composants/Soiree";
import { SOIREE, maison, photos } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "La soirée découverte — Relue, site de démonstration",
  description: "La soirée découverte de Relue, papeterie et boutique de jeux imaginaire : un jeudi par mois, quatre tables de six, dix jeux à tester. On réserve sa place sur le site.",
  ...adressesDeLaPage("/exemples/relue/soiree-decouverte"),
};

const DEROULE = [
  { heure: "20 h", texte: `On s'installe. ${maison.vendeuse} présente les dix jeux de la soirée.` },
  { heure: "20 h 15", texte: "Chaque table en essaie trois ou quatre, à son rythme." },
  { heure: "22 h", texte: "L'heure du fou rire, en général. On ne la programme pas." },
  { heure: "23 h", texte: "On range. Ceux qui veulent repartent avec le jeu qui les a fait rire ; les autres, avec rien." },
];

export default function SoireeDecouverte() {
  return (
    <main>
      <EnTetePage surtitre={`Un jeudi par mois · ${SOIREE.places} places · gratuite`} titre="La soirée *découverte.*" photo={photos.lancer}>
        {SOIREE.date}, {SOIREE.heure}. Tu testes dix jeux, et tu repars avec celui qui t&apos;a fait rire. On
        ne te demande rien d&apos;acheter : seulement de réserver ta place.
      </EnTetePage>

      <section className="mx-auto grid max-w-7xl gap-14 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div className="space-y-8 lg:sticky lg:top-28">
          <Apparition><Surtitre>Ta place</Surtitre></Apparition>
          <TitreRevele
            texte="Combien, *quelle table.*"
            className="font-[family-name:var(--titres)] text-[clamp(2.6rem,5vw,4.6rem)] font-normal leading-[0.95] tracking-[-0.03em]"
            classeAccent="italic text-[var(--accent-texte)]"
          />
          <Apparition as="p" delai={150} className="max-w-md text-xl leading-relaxed text-[var(--doux)]">
            Quatre tables de six. Tu dis combien vous venez, tu touches une table qui a la place, tu
            réserves. C&apos;est tout.
          </Apparition>
          <Apparition delai={200} className="rounded-[1.4rem] bg-[var(--sombre)] p-6 text-[var(--sur-sombre)]">
            <p className="font-[family-name:var(--titres)] text-3xl">{SOIREE.date} · {SOIREE.heure}</p>
            <p className="mt-1">{SOIREE.places} places · 4 tables de 6 · {SOIREE.jeux} jeux à tester</p>
          </Apparition>
        </div>
        <div id="reserver" className="scroll-mt-24 rounded-[2rem] border border-[var(--trait)] bg-[#F3EADA] p-4 sm:p-8">
          <Soiree />
        </div>
      </section>

      <section className="px-3 sm:px-5">
        <div className="kit-grain overflow-hidden rounded-[2rem] bg-[#24382E] text-[var(--sur-sombre)]">
          <div className="mx-auto grid max-w-6xl gap-14 px-6 py-20 sm:px-10 md:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-8">
              <Apparition><Surtitre clair>Le déroulé</Surtitre></Apparition>
              <TitreRevele
                texte={"De 20 h *à 23 h.*"}
                className="font-[family-name:var(--titres)] text-[clamp(2.6rem,5vw,4.6rem)] font-normal leading-[0.95] tracking-[-0.03em]"
                classeAccent="italic text-[#E9B44C]"
              />
              <ol className="space-y-5">
                {DEROULE.map((d, i) => (
                  <Apparition as="li" key={d.heure} delai={i * 120} de="gauche" className="flex gap-5 border-b border-white/20 pb-5">
                    <span className="w-24 shrink-0 font-[family-name:var(--titres)] text-2xl italic text-[#E9B44C] tabular-nums">{d.heure}</span>
                    <span className="text-lg leading-relaxed">{d.texte}</span>
                  </Apparition>
                ))}
              </ol>
            </div>
            <Apparition de="rideau">
              <Arche photo={photos.pionsVerts} className="aspect-[4/5] w-full" />
            </Apparition>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-10 px-5 py-24 sm:px-8 md:py-28">
        <TitreRevele
          texte="Les *prochaines.*"
          className="font-[family-name:var(--titres)] text-[clamp(2.6rem,5vw,4.6rem)] font-normal leading-[0.95] tracking-[-0.03em]"
          classeAccent="italic text-[var(--accent-texte)]"
        />
        <ul className="grid gap-4 sm:grid-cols-3">
          {[SOIREE.date, ...SOIREE.suivantes].map((d, i) => (
            <Apparition as="li" key={d} delai={i * 120} de="zoom" className="rounded-[1.4rem] border border-dashed border-[var(--encre)]/40 bg-[var(--carte)] p-6">
              <p className="font-[family-name:var(--titres)] text-3xl">{d}</p>
              <p className="mt-1 text-[var(--doux)]">{i === 0 ? "Réservations ouvertes" : "Ouverture des réservations un mois avant"}</p>
            </Apparition>
          ))}
        </ul>
        <p className="text-[var(--doux)]">Dates d&apos;exemple. Les dix jeux à tester sont annoncés une semaine avant chaque soirée.</p>
      </section>

      <AppelFinal />
    </main>
  );
}
