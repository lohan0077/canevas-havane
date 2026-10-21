import type { Metadata } from "next";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import Questionnaire from "../../_kit/Questionnaire";
import { DOSSIER, ETAPES, QUESTIONS_APPEL } from "../_composants/donnees";
import { Surtitre } from "../_composants/Blocs";

export const metadata: Metadata = {
  title: "Comment ça marche — Gâteaux Perdus — site de démonstration",
  description: "Comment une pâtisserie imaginaire refait le gâteau d'une grand-mère d'après la photo de sa fiche : l'appel, les essais, la première bouchée.",
  ...adressesDeLaPage("/exemples/gateaux-perdus/comment-ca-marche"),
};

export default function CommentCaMarche() {
  return (
    <main className="mx-auto max-w-6xl px-4 pb-20 pt-12 sm:px-6 sm:pt-16">
      <div className="mx-auto max-w-3xl space-y-5 text-center">
        <Surtitre centre>Comment ça marche</Surtitre>
        <h1 className="text-[48px] leading-[1] text-[var(--accent)] sm:text-[80px]">Vingt minutes <span className="italic text-[var(--accent-texte)]">au téléphone.</span></h1>
        <p className="text-lg leading-relaxed">La fiche dit la moitié. Ta mémoire dit le reste. Le pâtissier pose les questions.</p>
      </div>

      <ol className="mt-14 grid gap-8 md:grid-cols-4">
        {ETAPES.map((e, i) => (
          <li key={e.titre} className="space-y-3 border-t border-[var(--accent)] pt-5">
            <p className="font-[family-name:var(--titres)] text-5xl italic text-[var(--accent-texte)]">{i + 1}.</p>
            <h2 className="text-2xl">{e.titre}</h2>
            <p className="leading-relaxed text-[var(--doux)]">{e.texte}</p>
          </li>
        ))}
      </ol>

      <section className="mt-20 grid gap-10 md:grid-cols-2 md:items-start">
        <div className="space-y-5">
          <Surtitre>L&apos;appel</Surtitre>
          <h2 className="text-5xl leading-[1.02]">Ce qu&apos;il va <span className="italic text-[var(--accent-texte)]">te demander.</span></h2>
          <ul className="space-y-2 font-[family-name:var(--f-caveat)] text-[32px] leading-tight text-[#2E2A4A]">
            {QUESTIONS_APPEL.map((q) => <li key={q}>— {q}</li>)}
          </ul>
          <p className="leading-relaxed text-[var(--doux)]">
            Et, avant la commande : ce que contenait la recette, pour écrire ses allergènes sur la
            fiche du gâteau.
          </p>
        </div>
        <div className="space-y-4">
          <Surtitre>Pour t&apos;échauffer</Surtitre>
          <Questionnaire
            surtitreResultat="On commencerait par"
            questions={[
              { question: "Le dessus, il était comment ?", options: [{ libelle: "Doré, un peu craquant", points: 2 }, { libelle: "Tout lisse, sucre glace", points: 1 }, { libelle: "Des fruits partout", points: 0 }] },
              { question: "On le coupait…", options: [{ libelle: "En tranches, comme un cake", points: 2 }, { libelle: "En parts, comme une tarte", points: 0 }, { libelle: "En couronne", points: 1 }] },
              { question: "Elle le faisait…", options: [{ libelle: "Tous les dimanches", points: 2 }, { libelle: "Aux anniversaires", points: 1 }, { libelle: "L'été, avec les fruits du jardin", points: 0 }] },
            ]}
            resultats={[
              { min: 0, titre: "Une tarte ou un clafoutis", texte: "Des fruits, une pâte, un four chaud : on part de là, et on cherche ensemble la pâte « comme d'hab »." },
              { min: 3, titre: "Un gâteau en couronne", texte: "Un moule à trous, du sucre glace : on teste la mie, plus ou moins serrée, jusqu'à ce que tu la reconnaisses." },
              { min: 5, titre: "Un quatre-quarts", texte: "Tout pareil, beurre compris. Salé ou doux ? C'est souvent là que tout se joue." },
            ]}
            mention="Un jeu pour se souvenir : rien n'est enregistré."
          />
        </div>
      </section>

      <div className="mt-16 text-center">
        <Link href={`${DOSSIER}#envoyer`} className="inline-block rounded-full bg-[var(--accent)] px-8 py-4 font-[family-name:var(--titres)] text-2xl text-[var(--sur-accent)]">Envoyer la photo</Link>
      </div>
    </main>
  );
}
