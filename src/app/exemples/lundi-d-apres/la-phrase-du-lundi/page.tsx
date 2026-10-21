import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import { photos } from "../_composants/donnees";
import { Coin } from "../_composants/Blocs";

// « Et sur Instagram, une rubrique : la vraie phrase du lundi. Une par événement. » La
// page qui explique la rubrique, et ses règles : une vraie phrase, jamais inventée,
// publiée seulement avec l'accord de l'entreprise et de la personne. Les phrases
// montrées ici sont des exemples, et le disent.
export const metadata: Metadata = {
  title: "La phrase du lundi · Lundi d'Après — site de démonstration",
  description: "Après chaque événement, la vraie phrase entendue lundi, publiée avec l'accord de l'entreprise et de la personne. Site de démonstration.",
  ...adressesDeLaPage("/exemples/lundi-d-apres/la-phrase-du-lundi"),
};

const EXEMPLES = [
  { phrase: "On refait ça quand ?", contexte: "Soirée d'entreprise, 140 personnes" },
  { phrase: "Je savais pas que le directeur dansait.", contexte: "Fête de fin d'année, 80 personnes" },
  { phrase: "L'équipe de nuit a gagné le quiz. Évidemment.", contexte: "Séminaire, 60 personnes" },
];

const REGLES = [
  { titre: "Une vraie phrase", texte: "Entendue lundi, mot pour mot. Jamais arrangée, jamais inventée : une phrase inventée serait un faux témoignage." },
  { titre: "L'accord de l'entreprise", texte: "Rien ne se publie sans l'accord écrit de l'entreprise cliente." },
  { titre: "L'accord de la personne", texte: "Si on peut la reconnaître, elle donne son accord, par écrit. Sinon, la phrase reste entre nous." },
  { titre: "Sans nom", texte: "On publie la phrase et l'événement. Pas le nom de la personne, ni sa photo." },
];

export default function LaPhraseDuLundi() {
  return (
    <div>
      <section className="max-w-6xl mx-auto px-5 pt-8 pb-14 sm:pt-14 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div className="space-y-5">
          <Coin>une par événement</Coin>
          <h1 className="text-[48px] sm:text-[84px] font-bold lowercase leading-[0.95] tracking-[-0.04em]">la phrase du lundi</h1>
          <p className="text-lg leading-relaxed text-[var(--doux)]">
            Après chaque événement, on passe à la machine à café, et on écoute. Une phrase revient toujours. C&apos;est elle
            qu&apos;on publie, chaque semaine, avec l&apos;accord de l&apos;entreprise et de la personne.
          </p>
        </div>
        <div className="relative aspect-[3/4] max-w-sm overflow-hidden rounded-[32px] lg:justify-self-end">
          <Image src={photos.micro.src} alt={photos.micro.alt} fill priority sizes="(min-width: 1024px) 380px, 90vw" className="object-cover" />
        </div>
      </section>

      <section className="bg-[var(--encre)] text-[var(--fond)]">
        <div className="max-w-6xl mx-auto px-5 py-16 sm:py-20 space-y-6">
          <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-[#FFD9A0]">À quoi ça ressemble · exemples</p>
          <ul className="grid gap-3 md:grid-cols-3">
            {EXEMPLES.map((x) => (
              <li key={x.phrase} className="rounded-[28px] bg-[#FFF4E6]/10 p-6 space-y-3">
                <p className="font-[family-name:var(--titres)] text-[26px] font-semibold leading-snug">« {x.phrase} »</p>
                <p className="text-[14px] text-[#D8C9B4]">{x.contexte} · exemple</p>
              </li>
            ))}
          </ul>
          <p className="text-[14px] text-[#D8C9B4]">Ces phrases sont inventées pour la démonstration : l&apos;agence est fictive.</p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 py-16 sm:py-24 space-y-8">
        <h2 className="text-[36px] sm:text-5xl font-bold lowercase leading-[1] tracking-[-0.03em]">les règles de la rubrique</h2>
        <ol className="grid gap-3 sm:grid-cols-2">
          {REGLES.map((r, i) => (
            <li key={r.titre} className="flex gap-4 rounded-[28px] bg-[var(--carte)] p-6">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--accent)] font-[family-name:var(--titres)] text-lg font-bold">{i + 1}</span>
              <div className="space-y-1">
                <h3 className="text-[22px] font-bold lowercase">{r.titre}</h3>
                <p className="leading-relaxed text-[var(--doux)]">{r.texte}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
