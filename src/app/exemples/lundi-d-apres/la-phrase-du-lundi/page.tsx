import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, Coin, CORAIL, CORAIL_CLAIR, EnTetePage, TITRE } from "../_composants/Blocs";
import { photos } from "../_composants/donnees";

// « Et sur Instagram, une rubrique : la vraie phrase du lundi. Une par événement. » La
// page qui explique la rubrique, et ses règles : une vraie phrase, jamais inventée,
// publiée seulement avec l'accord de l'entreprise et de la personne. Les phrases
// montrées ici sont des exemples, et le disent.
export const metadata: Metadata = {
  title: "La phrase du lundi — Lundi d'Après, site de démonstration",
  description: "Après chaque événement, la vraie phrase entendue lundi, publiée avec l'accord de l'entreprise et de la personne. Site de démonstration.",
  ...adressesDeLaPage("/exemples/lundi-d-apres/la-phrase-du-lundi"),
};

const EXEMPLES = [
  { phrase: "On refait ça quand ?", contexte: "Soirée d'entreprise, 140 personnes" },
  { phrase: "Je savais pas que le directeur dansait.", contexte: "Fête de fin d'année, 80 personnes" },
  { phrase: "L'équipe de nuit a gagné le quiz. Évidemment.", contexte: "Séminaire, 60 personnes" },
  { phrase: "Ils ont tenu la piste jusqu'à la dernière.", contexte: "Mariage, 120 invités" },
];

const REGLES = [
  { titre: "Une vraie phrase", texte: "Entendue lundi, mot pour mot. Jamais arrangée, jamais inventée : une phrase inventée serait un faux témoignage." },
  { titre: "L'accord de l'entreprise", texte: "Rien ne se publie sans l'accord écrit de l'entreprise cliente, ou des mariés." },
  { titre: "L'accord de la personne", texte: "Si on peut la reconnaître, elle donne son accord, par écrit. Sinon, la phrase reste entre nous." },
  { titre: "Sans nom", texte: "On publie la phrase et l'événement. Pas le nom de la personne, ni sa photo." },
];

export default function LaPhraseDuLundi() {
  return (
    <main>
      <EnTetePage coin="une par événement" titre="La phrase *du lundi.*">
        Après chaque événement, on passe à la machine à café, et on écoute. Une phrase revient toujours. C&apos;est elle qu&apos;on
        publie, chaque semaine, avec l&apos;accord de l&apos;entreprise et de la personne.
      </EnTetePage>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28">
        <div className="mb-10 space-y-5">
          <Apparition><Coin>à quoi ça ressemble · exemples</Coin></Apparition>
          <TitreRevele texte="Une phrase. *Un lundi.*" className={`text-[clamp(3rem,6vw,5.4rem)] ${TITRE}`} classeAccent={CORAIL} />
        </div>
        <ul className="grid gap-4 md:grid-cols-2">
          {EXEMPLES.map((x, i) => (
            <Apparition as="li" key={x.phrase} delai={i * 110} de="zoom" className={`flex min-h-[220px] flex-col justify-between rounded-[2rem] p-7 ${i % 3 === 0 ? "bg-[var(--sombre)] text-[var(--sur-sombre)]" : i % 3 === 1 ? "bg-[var(--accent)] text-[var(--sur-accent)]" : "bg-[#9AD1D4] text-[#2A190F]"}`}>
              <p className="font-[family-name:var(--titres)] text-[clamp(1.8rem,3vw,2.6rem)] font-extrabold leading-[1] tracking-[-0.03em]">« {x.phrase} »</p>
              <p className="pt-6 text-[14px] font-bold lowercase">{x.contexte} · exemple</p>
            </Apparition>
          ))}
        </ul>
        <p className="mt-5 text-[14px] text-[var(--doux)]">Ces phrases sont inventées pour la démonstration : l&apos;agence est fictive.</p>
      </section>

      <section className="px-3 sm:px-5">
        <div className="kit-grain grid overflow-hidden rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)] lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-8 px-6 py-16 sm:px-12 md:py-24">
            <TitreRevele texte="Les règles *de la rubrique.*" className={`text-[clamp(2.8rem,5.5vw,4.8rem)] ${TITRE}`} classeAccent={CORAIL_CLAIR} />
            <ol className="grid gap-5 sm:grid-cols-2">
              {REGLES.map((r, i) => (
                <Apparition as="li" key={r.titre} delai={i * 110} className="space-y-2 border-t border-white/20 pt-4">
                  <p className="font-[family-name:var(--titres)] text-[34px] font-extrabold leading-none text-[#FF8A6E]">{i + 1}</p>
                  <h2 className="font-[family-name:var(--titres)] text-[24px] font-extrabold lowercase tracking-[-0.03em]">{r.titre}</h2>
                  <p className="leading-relaxed text-[var(--sur-sombre)]/90">{r.texte}</p>
                </Apparition>
              ))}
            </ol>
          </div>
          <div className="relative min-h-[360px]">
            <Image src={photos.micro.src} alt={photos.micro.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <div className="pt-24 md:pt-32">
        <AppelFinal />
      </div>
    </main>
  );
}
