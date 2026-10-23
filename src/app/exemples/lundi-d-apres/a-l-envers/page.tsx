import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, Coin, CORAIL, EnTetePage, TITRE } from "../_composants/Blocs";
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
      <EnTetePage coin="exemple, du lundi au vendredi" titre="La soirée, *à l'envers.*">
        Une agence part du lieu, puis du menu, puis de l&apos;animation. Nous, on part de lundi&nbsp;: la phrase qu&apos;on veut entendre
        devant la machine à café. Et on remonte le temps.
      </EnTetePage>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="space-y-6 lg:sticky lg:top-28">
          <Apparition><Coin>un exemple, heure par heure</Coin></Apparition>
          <TitreRevele texte="On commence *par la fin.*" className={`text-[clamp(3rem,6vw,5.4rem)] ${TITRE}`} classeAccent={CORAIL} />
          <Apparition de="rideau" className="relative hidden aspect-[3/2] overflow-hidden rounded-[2rem] lg:block">
            <Image src={photos.cafe.src} alt={photos.cafe.alt} fill sizes="560px" className="object-cover" />
          </Apparition>
        </div>
        <ol className="space-y-3">
          {etapes.map((e, i) => (
            <Apparition as="li" key={e.heure} delai={i * 120} className={`space-y-1 rounded-[2rem] p-7 ${i === 0 ? "bg-[var(--sombre)] text-[var(--sur-sombre)]" : "bg-[var(--carte)] ring-1 ring-[var(--trait)]"}`}>
              <p className={`font-[family-name:var(--titres)] text-[34px] font-extrabold leading-none tracking-[-0.04em] ${i === 0 ? "text-[#FF8A6E]" : "text-[var(--accent-texte)]"}`}>{e.heure}</p>
              <h2 className="pt-2 font-[family-name:var(--titres)] text-[26px] font-bold leading-snug">{e.titre}</h2>
              <p className={`leading-relaxed ${i === 0 ? "text-[var(--sur-sombre)]/90" : "text-[var(--doux)]"}`}>{e.texte}</p>
            </Apparition>
          ))}
          <li className="px-2 text-[13px] text-[var(--doux)]">Exemple : la phrase et l&apos;entreprise sont inventées.</li>
        </ol>
      </section>

      <section className="bg-[#9AD1D4] text-[#2A190F] [--doux:#4A3424] [--encre:#2A190F]">
        <div className="mx-auto max-w-3xl space-y-6 px-5 py-20 sm:px-8 md:py-28">
          <Apparition><Coin>à vous d&apos;essayer</Coin></Apparition>
          <TitreRevele texte="Écrivez *votre phrase.*" className={`text-[clamp(3rem,6vw,5.4rem)] ${TITRE}`} classeAccent="text-[#8F2A14]" />
          <Apparition as="p" delai={150} className="text-lg leading-relaxed">Ou prenez un exemple&nbsp;: la soirée se construit à l&apos;envers, sous vos yeux.</Apparition>
          <Apparition de="zoom"><PhraseLundi /></Apparition>
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-10 px-5 py-24 sm:px-8 md:py-32">
        <TitreRevele texte="Les quatre *temps.*" className={`text-[clamp(3rem,6vw,5.4rem)] ${TITRE}`} classeAccent={CORAIL} />
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {METHODE.map((m, i) => (
            <Apparition as="li" key={m.titre} delai={i * 110} className="space-y-3 rounded-[2rem] bg-[var(--carte)] p-6 ring-1 ring-[var(--trait)]">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-[var(--accent)] font-[family-name:var(--titres)] text-lg font-extrabold text-[var(--sur-accent)]">{i + 1}</span>
              <h3 className="font-[family-name:var(--titres)] text-[26px] font-extrabold lowercase tracking-[-0.03em]">{m.titre}</h3>
              <p className="leading-relaxed text-[var(--doux)]">{m.texte}</p>
            </Apparition>
          ))}
        </ol>
      </section>

      <AppelFinal />
    </main>
  );
}
