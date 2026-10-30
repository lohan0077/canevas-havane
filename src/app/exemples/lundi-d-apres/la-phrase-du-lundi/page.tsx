import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import { EnTetePage, Section, Surtitre, Titre } from "../_composants/Blocs";
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
      <EnTetePage surtitre="Une par événement" titre="la phrase *du lundi.*" photo={photos.cafe} origine="40% 30%">
        Après chaque événement, on passe à la machine à café, et on écoute. Une phrase revient toujours. C&apos;est elle qu&apos;on
        publie, chaque semaine, avec l&apos;accord de l&apos;entreprise et de la personne.
      </EnTetePage>

      <Section className="space-y-14">
        <div className="space-y-5">
          <Apparition><Surtitre>À quoi ça ressemble · exemples</Surtitre></Apparition>
          <Titre texte="une phrase. *un lundi.*" />
        </div>
        <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
          {EXEMPLES.map((x, i) => (
            <Apparition as="li" key={x.phrase} delai={i * 100} className="grid grid-cols-1 gap-2 py-7 md:grid-cols-[1fr_auto] md:items-baseline md:gap-10">
              <p className="font-[family-name:var(--titres)] font-semibold text-[clamp(1.6rem,3vw,2.4rem)] leading-[1.1] tracking-[-0.02em]">«&nbsp;{x.phrase}&nbsp;»</p>
              <p className="text-[15px] text-[var(--doux)]">{x.contexte} · exemple</p>
            </Apparition>
          ))}
        </ul>
        <p className="text-[14px] text-[var(--doux)]">Ces phrases sont inventées pour la démonstration : l&apos;agence est fictive.</p>
      </Section>

      <Section fond="bg-[var(--sombre)] text-[var(--sur-sombre)]" className="space-y-14">
        <div className="space-y-5">
          <Apparition><Surtitre clair>Les règles de la rubrique</Surtitre></Apparition>
          <Titre texte="quatre règles, *sans exception.*" clair />
        </div>
        <ol className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {REGLES.map((r, i) => (
            <Apparition as="li" key={r.titre} delai={i * 110} className="space-y-3 border-t border-white/20 pt-5">
              <p className="text-[12px] font-medium uppercase tracking-[0.2em]">0{i + 1}</p>
              <h2 className="font-[family-name:var(--titres)] text-[24px] font-semibold lowercase">{r.titre}</h2>
              <p className="leading-relaxed">{r.texte}</p>
            </Apparition>
          ))}
        </ol>
      </Section>
    </main>
  );
}
