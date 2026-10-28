import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import Questionnaire from "../../_kit/Questionnaire";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, EnTetePage, Surtitre } from "../_composants/Blocs";
import { ETAPES, PHOTOS, QUESTIONS_APPEL } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Comment ça marche — Gâteaux Perdus, site de démonstration",
  description: "Comment une pâtisserie imaginaire refait le gâteau de ta grand-mère : la photo de la fiche, vingt minutes au téléphone, un à trois essais, et tu goûtes en premier.",
  ...adressesDeLaPage("/exemples/gateaux-perdus/comment-ca-marche"),
};

export default function CommentCaMarche() {
  return (
    <main>
      <EnTetePage surtitre="Comment ça marche" titre="Vingt minutes *au téléphone.*" photo={PHOTOS.farineMains} origine="40% 50%">
        La fiche dit la moitié. Ta mémoire dit le reste. Le pâtissier pose les questions.
      </EnTetePage>

      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 md:pb-32">
        <ol className="grid gap-5 md:grid-cols-4">
          {ETAPES.map((e, i) => (
            <Apparition as="li" key={e.titre} delai={i * 120} className="overflow-hidden rounded-[1.75rem] border border-[var(--trait)] bg-[var(--carte)]">
              <div className="relative aspect-[4/3] bg-[var(--sombre)]">
                <Image src={PHOTOS[e.photo].src} alt={PHOTOS[e.photo].alt} fill sizes="(min-width: 768px) 25vw, 100vw" className="object-cover" />
              </div>
              <div className="space-y-2 p-6">
                <p className="font-[family-name:var(--titres)] text-5xl italic text-[var(--accent-texte)]">{i + 1}.</p>
                <h2 className="text-2xl">{e.titre}</h2>
                <p className="leading-relaxed text-[var(--doux)]">{e.texte}</p>
              </div>
            </Apparition>
          ))}
        </ol>
      </section>

      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-2 lg:items-start">
          <div className="space-y-6">
            <Apparition><Surtitre clair>L&apos;appel</Surtitre></Apparition>
            <TitreRevele
              texte="Ce qu'il va *te demander.*"
              className="text-[clamp(2.8rem,6vw,5.2rem)] leading-[0.92] tracking-[-0.02em]"
              classeAccent="italic text-[#F3D88A]"
            />
            <Apparition as="ul" delai={150} className="space-y-2 font-[family-name:var(--f-caveat)] text-[34px] leading-tight text-[#E9B7C0]">
              {QUESTIONS_APPEL.map((q) => <li key={q}>— {q}</li>)}
            </Apparition>
            <Apparition as="p" delai={250} className="max-w-md leading-relaxed">
              Et, avant la commande : ce que contenait la recette, pour écrire ses allergènes sur la
              fiche du gâteau.
            </Apparition>
          </div>
          <Apparition de="droite" className="space-y-4">
            <Surtitre clair>Pour t&apos;échauffer</Surtitre>
            <Questionnaire
              surtitreResultat="On commencerait par"
              questions={[
                { question: "Le dessus, il était comment ?", options: [{ libelle: "Doré, un peu craquant", points: 2 }, { libelle: "Tout lisse, sucre glace", points: 1 }, { libelle: "Des fruits partout", points: 0 }] },
                { question: "On le coupait…", options: [{ libelle: "En tranches, comme un cake", points: 2 }, { libelle: "En parts, comme une tarte", points: 0 }, { libelle: "En couronne", points: 1 }] },
                { question: "Elle le faisait…", options: [{ libelle: "Tous les dimanches", points: 2 }, { libelle: "Aux anniversaires", points: 1 }, { libelle: "L'été, avec les fruits du jardin", points: 0 }] },
              ]}
              resultats={[
                { min: 0, titre: "Une tarte ou un clafoutis", texte: "Des fruits, une pâte, un four chaud : on part de là, et on cherche ensemble la pâte « comme d'hab »." },
                { min: 3, titre: "Un gâteau en couronne", texte: "Un moule à trous, du sucre glace : on teste la mie, plus ou moins serrée, jusqu'à ce que tu la reconnaisses." },
                { min: 5, titre: "Un quatre-quarts", texte: "Tout pareil, beurre compris. Salé ou doux ? C'est souvent là que tout se joue." },
              ]}
              mention="Un jeu pour se souvenir : rien n'est enregistré."
            />
          </Apparition>
        </div>
      </section>
      <AppelFinal />
    </main>
  );
}
