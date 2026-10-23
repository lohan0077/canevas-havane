import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import Questionnaire from "../../_kit/Questionnaire";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, Coin, CORAIL, EnTetePage, TITRE } from "../_composants/Blocs";
import { photos } from "../_composants/donnees";

// « Ensuite, une page qui répond honnêtement : DJ ou playlist. Même quand la réponse,
// c'est : prends une playlist. » La page de la recherche « mariage dj ou playlist » : la
// réponse franche, trois questions pour trancher, et ce qu'une playlist fait très bien.
// En bas, comme sur chaque page, les samedis encore libres (le gabarit du site).
export const metadata: Metadata = {
  title: "DJ ou playlist ? — Lundi d'Après, site de démonstration",
  description: "DJ ou playlist pour un mariage ? Une réponse honnête, même quand c'est : prenez une playlist. Site de démonstration.",
  ...adressesDeLaPage("/exemples/lundi-d-apres/dj-ou-playlist"),
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
    question: "Les invités aiment la même musique ?",
    options: [
      { libelle: "Oui, à peu près", points: 0 },
      { libelle: "Trois générations, trois goûts", points: 2 },
    ],
  },
];

const RESULTATS = [
  { min: 0, titre: "Prenez une playlist.", texte: "Franchement. Une bonne enceinte, une liste préparée à l'avance, quelqu'un qui la lance : votre dîner n'a pas besoin de nous. Gardez l'argent pour autre chose." },
  { min: 3, titre: "Une playlist peut suffire. Un DJ fera la différence.", texte: "Pour l'apéritif et le dîner, une playlist fait très bien l'affaire. C'est après le dessert que ça se joue : quelqu'un qui regarde la piste et change de chanson avant qu'elle se vide." },
  { min: 5, titre: "Là, il vous faut un DJ.", texte: "Beaucoup d'invités, trois générations, une piste qui doit tenir jusqu'à la fin : une playlist ne regarde pas la salle. C'est exactement ce pour quoi on vient." },
];

export default function DjOuPlaylist() {
  return (
    <main>
      <EnTetePage coin="la vraie question des mariés" titre={"DJ ou *playlist ?*"}>
        Un dîner calme à trente&nbsp;? <strong>Prenez une playlist.</strong> Une piste pleine jusqu&apos;au bout&nbsp;? Lisez la suite.
      </EnTetePage>

      <section id="reponse" className="scroll-mt-20 mx-auto grid max-w-7xl gap-4 px-5 py-20 sm:px-8 md:grid-cols-2 md:py-28">
        <Apparition de="gauche" className="space-y-4 rounded-[2rem] bg-[var(--carte)] p-8 ring-1 ring-[var(--trait)]">
          <Coin>ce qu&apos;une playlist fait très bien</Coin>
          <ul className="space-y-3 text-lg leading-relaxed">
            <li>— L&apos;accueil et l&apos;apéritif, en fond.</li>
            <li>— Un dîner où l&apos;on veut surtout se parler.</li>
            <li>— Une petite fête où tout le monde aime la même musique.</li>
          </ul>
        </Apparition>
        <Apparition de="droite" className="space-y-4 rounded-[2rem] bg-[var(--accent)] p-8 text-[var(--sur-accent)]">
          <p className="inline-flex items-center gap-2 rounded-full bg-[#2A190F] px-3.5 py-1.5 text-[13px] font-bold lowercase text-[#FFD9A0]">ce qu&apos;elle ne fait pas</p>
          <ul className="space-y-3 text-lg leading-relaxed">
            <li>— Regarder la piste, et changer avant qu&apos;elle se vide.</li>
            <li>— Faire danser la grand-mère et les cousins dans la même heure.</li>
            <li>— Tenir l&apos;heure de fin de la salle, et finir sur la bonne chanson.</li>
          </ul>
        </Apparition>
      </section>

      <section id="trancher" className="scroll-mt-20 mx-auto grid max-w-7xl gap-12 px-5 pb-24 sm:px-8 md:pb-32 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div className="space-y-6">
          <Apparition><Coin>trois questions</Coin></Apparition>
          <TitreRevele texte="Pour *trancher.*" className={`text-[clamp(3rem,6vw,5.4rem)] ${TITRE}`} classeAccent={CORAIL} />
          <Apparition de="rideau" className="relative hidden aspect-[3/2] overflow-hidden rounded-[2rem] lg:block">
            <Image src={photos.rayons.src} alt={photos.rayons.alt} fill sizes="480px" className="object-cover" />
          </Apparition>
        </div>
        <Apparition de="zoom">
          <Questionnaire questions={QUESTIONS} resultats={RESULTATS} surtitreResultat="Notre réponse, honnête" mention="Tout se calcule sur votre téléphone : rien n'est envoyé." />
        </Apparition>
      </section>

      <AppelFinal />
    </main>
  );
}
