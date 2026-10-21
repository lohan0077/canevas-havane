import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Questionnaire from "../../_kit/Questionnaire";
import { photos } from "../_composants/donnees";
import { Crochets, SamedisLibres } from "../_composants/Blocs";

// « Ensuite, une page qui répond honnêtement : DJ ou playlist. Même quand la réponse,
// c'est : prends une playlist. » La page de la recherche « mariage dj ou playlist » :
// la réponse franche, trois questions pour trancher, et ce qu'une playlist fait très
// bien. En bas, comme sur chaque page, les samedis encore libres.
export const metadata: Metadata = {
  title: "DJ ou playlist ? · Deux Heures — site de démonstration",
  description: "DJ ou playlist pour un mariage ? Une réponse honnête, même quand c'est : prends une playlist. Site de démonstration.",
  ...adressesDeLaPage("/exemples/deux-heures/dj-ou-playlist"),
};

const QUESTIONS = [
  {
    question: "Combien d'invités ?",
    options: [
      { libelle: "Une trentaine", points: 0 },
      { libelle: "Entre 60 et 100", points: 1 },
      { libelle: "Plus de 100", points: 2 },
    ],
  },
  {
    question: "Le soir, on danse ?",
    options: [
      { libelle: "Non, un dîner calme, on parle", points: 0 },
      { libelle: "Un peu, après le dessert", points: 1 },
      { libelle: "Oui, et le plus tard possible", points: 2 },
    ],
  },
  {
    question: "Les invités, ils aiment la même musique ?",
    options: [
      { libelle: "Oui, à peu près", points: 0 },
      { libelle: "Trois générations, trois goûts", points: 2 },
    ],
  },
];

const RESULTATS = [
  { min: 0, titre: "Prends une playlist.", texte: "Franchement. Une bonne enceinte, une liste préparée à l'avance, quelqu'un qui la lance : ton dîner n'a pas besoin de nous. Garde l'argent pour autre chose." },
  { min: 3, titre: "Une playlist peut suffire. Un DJ fera la différence.", texte: "Pour l'apéritif et le dîner, une playlist fait très bien l'affaire. C'est après le dessert que ça se joue : quelqu'un qui regarde la piste et change de chanson avant qu'elle se vide." },
  { min: 5, titre: "Là, il te faut un DJ.", texte: "Beaucoup d'invités, trois générations, une piste qui doit tenir jusqu'à la fin : une playlist ne regarde pas la salle. C'est exactement ce pour quoi on vient." },
];

export default function DjOuPlaylist() {
  return (
    <div>
      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute -top-32 right-[-200px] h-[480px] w-[700px] rotate-[18deg] bg-[radial-gradient(closest-side,rgba(123,97,255,.34),transparent)] blur-2xl" />
        <div className="relative max-w-6xl mx-auto px-5 pt-8 pb-14 sm:pt-14 grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div className="space-y-5">
            <Crochets>La vraie question</Crochets>
            <h1 className="text-[48px] sm:text-[96px] uppercase leading-[0.9] tracking-[-0.05em]">
              <span className="font-extrabold">DJ ou</span>
              <br />
              <span className="font-light">playlist&nbsp;?</span>
            </h1>
            <p className="text-xl leading-relaxed">
              Un dîner calme à trente&nbsp;? <strong>Prends une playlist.</strong> Une piste pleine jusqu&apos;au bout&nbsp;? Lis la suite.
            </p>
            <a href="#trancher" className="inline-flex h-12 items-center rounded-full bg-[var(--encre)] px-6 font-bold text-[var(--fond)]">
              Lire la réponse
            </a>
          </div>
          <div className="relative aspect-[3/2] overflow-hidden rounded-[28px]">
            <Image src={photos.bouleRose.src} alt={photos.bouleRose.alt} fill priority sizes="(min-width: 1024px) 540px, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section id="reponse" className="scroll-mt-16 border-t border-[var(--trait)]">
        <div className="max-w-6xl mx-auto px-5 py-16 sm:py-20 grid gap-6 md:grid-cols-2">
          <div className="rounded-[24px] border border-[var(--trait)] bg-[var(--carte)] p-6 space-y-3">
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[var(--doux)]">Ce qu&apos;une playlist fait très bien</p>
            <ul className="space-y-2 text-lg leading-relaxed">
              <li>— L&apos;accueil et l&apos;apéritif, en fond.</li>
              <li>— Un dîner où l&apos;on veut surtout se parler.</li>
              <li>— Une petite fête où tout le monde aime la même musique.</li>
            </ul>
          </div>
          <div className="rounded-[24px] border border-[var(--accent)] bg-[var(--carte)] p-6 space-y-3">
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[var(--accent-texte)]">Ce qu&apos;elle ne fait pas</p>
            <ul className="space-y-2 text-lg leading-relaxed">
              <li>— Regarder la piste, et changer avant qu&apos;elle se vide.</li>
              <li>— Faire danser la grand-mère et les cousins dans la même heure.</li>
              <li>— Tenir l&apos;heure de fin de la salle, et finir sur la bonne chanson.</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="trancher" className="scroll-mt-16 max-w-3xl mx-auto px-5 pb-16 sm:pb-24 space-y-5">
        <h2 className="text-[30px] sm:text-5xl font-extrabold uppercase leading-[1] tracking-[-0.03em]">Trois questions <span className="font-light">pour trancher</span></h2>
        <Questionnaire
          questions={QUESTIONS}
          resultats={RESULTATS}
          surtitreResultat="Notre réponse, honnête"
          mention="Tout se calcule sur ton téléphone : rien n'est envoyé."
        />
      </section>

      <SamedisLibres />
    </div>
  );
}
