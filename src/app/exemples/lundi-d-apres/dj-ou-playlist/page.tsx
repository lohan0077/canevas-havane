import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import Questionnaire from "../../_kit/Questionnaire";
import { EnTetePage, KIT_EN_CASSE_NORMALE, Section, Titre } from "../_composants/Blocs";
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

const PLAYLIST = [
  ["Ce qu'une playlist fait très bien", ["L'accueil et l'apéritif, en fond.", "Un dîner où l'on veut surtout se parler.", "Une petite fête où tout le monde aime la même musique."]],
  ["Ce qu'elle ne fait pas", ["Regarder la piste, et changer avant qu'elle se vide.", "Faire danser la grand-mère et les cousins dans la même heure.", "Tenir l'heure de fin de la salle, et finir sur la bonne chanson."]],
] as const;

export default function DjOuPlaylist() {
  return (
    <main>
      <EnTetePage titre={"dj ou playlist\u00a0?"} photo={photos.micro} origine="50% 35%">
        Un dîner calme à trente&nbsp;? <strong className="font-medium">Prenez une playlist.</strong> Une piste pleine jusqu&apos;au bout&nbsp;? Lisez
        la suite.
      </EnTetePage>

      <Section id="reponse" className="grid grid-cols-1 gap-12 md:grid-cols-2">
        {PLAYLIST.map(([titre, lignes], i) => (
          <Apparition key={titre} delai={i * 120} className="space-y-5">
            <Titre texte={titre} taille="moyen" />
            <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)] text-lg leading-relaxed">
              {lignes.map((l) => (
                <li key={l} className="py-4">{l}</li>
              ))}
            </ul>
          </Apparition>
        ))}
      </Section>

      <Section id="trancher" fond="bg-[var(--carte)] border-y border-[var(--trait)]" className="grid grid-cols-1 gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div className="space-y-6">
          <Titre texte="trois questions pour trancher." />
          <Apparition as="p" delai={150} className="max-w-md text-lg leading-relaxed text-[var(--doux)]">
            Une réponse honnête, même quand c&apos;est : pas besoin de nous.
          </Apparition>
        </div>
        <Apparition delai={150} className={KIT_EN_CASSE_NORMALE}>
          <Questionnaire questions={QUESTIONS} resultats={RESULTATS} surtitreResultat="Notre réponse, honnête" mention="Tout se calcule sur votre téléphone : rien n'est envoyé." />
        </Apparition>
      </Section>
    </main>
  );
}
