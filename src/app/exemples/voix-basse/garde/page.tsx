import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Accordeon from "../../_kit/Accordeon";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import Appeler from "../_composants/Appeler";
import { Bouton, Ciel, Croissant, EtatDuCabinet, Surtitre } from "../_composants/Blocs";
import Plan from "../_composants/Plan";
import { DOSSIER, cabinet } from "../_composants/donnees";

// La page de garde : celle qu'on ouvre à vingt-trois heures (vidéo « Remplir
// l'agenda »). Une seule page, qui dit qui appeler et où aller. Elle met en œuvre une
// obligation réelle : le vétérinaire assure la continuité des soins et en informe le
// public (Code rural, R242-48, IV). Le service de garde, son adresse et son numéro sont
// fictifs. Elle est toujours au visage du soir.
export const metadata: Metadata = {
  title: "La garde — Voix Basse, site de démonstration",
  description: "Ton animal ne va pas bien et le cabinet est fermé : qui appeler cette nuit, où aller. Page de démonstration d'un cabinet vétérinaire imaginaire.",
  ...adressesDeLaPage("/exemples/voix-basse/garde"),
};

const SIGNES = [
  "Il respire mal, la bouche ouverte, ou ses gencives sont pâles ou bleues",
  "Il ne tient plus debout, ou il est tombé et ne se relève pas",
  "Il a avalé un produit, un médicament ou une plante dont tu doutes",
  "Il saigne et cela ne s'arrête pas",
  "Son ventre gonfle et il essaie de vomir sans y arriver",
  "Un chat mâle va et revient de sa litière sans uriner",
];

const EMPORTER = ["Son carnet de santé", "L'emballage de ce qu'il a avalé, s'il y en a un", "Une couverture, et sa caisse pour un chat"];

const QUESTIONS_GARDE = [
  { question: "Combien coûte une consultation de garde ?", reponse: "Le service de garde a son propre tarif, plus élevé la nuit et le dimanche. Il te le donne au téléphone, avant que tu partes." },
  { question: "Et si j'hésite à appeler ?", reponse: "Appelle quand même. Le vétérinaire de garde te dira s'il faut venir tout de suite, ou si cela peut attendre l'ouverture du cabinet." },
  { question: "Le cabinet aura-t-il le compte rendu ?", reponse: "Oui : le service de garde nous le transmet, et nous reprenons le suivi dès l'ouverture." },
];

export default function Garde() {
  return (
    <main>
      <section data-film="garde" className="relative overflow-hidden">
        <Ciel />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-20 pt-28 sm:px-8 md:pt-36 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div className="space-y-7">
            <p className="inline-flex items-center gap-2 rounded-full border border-[var(--trait)] bg-[var(--carte)] px-4 py-2 text-sm font-bold">
              <Croissant className="h-4 w-4 text-[var(--accent-texte)]" />
              <EtatDuCabinet />
            </p>
            <Apparition><Surtitre>Urgence cette nuit</Surtitre></Apparition>
            <TitreRevele
              as="h1"
              auChargement
              texte={"Ton animal ne va *pas bien ?*"}
              className="text-[clamp(3rem,7vw,6.4rem)] leading-[0.95] tracking-[-0.02em]"
              classeAccent="italic text-[var(--accent-texte)]"
            />
            <Apparition as="p" delai={300} className="max-w-lg text-xl leading-relaxed text-[var(--doux)]">
              Une seule page : qui appeler, où aller. Le cabinet est fermé ; la garde est assurée
              par le service de garde du secteur.
            </Apparition>
          </div>
          <Apparition de="zoom" delai={200} className="space-y-6 rounded-[2rem] border border-[var(--trait)] bg-[var(--carte)] p-6 sm:p-8" data-film="carte-garde">
            <div className="space-y-1">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--doux)]">Vétérinaire de garde ce soir</p>
              <p className="font-[family-name:var(--titres)] text-4xl">{cabinet.garde.nom}</p>
              <p className="text-[var(--doux)]">à {cabinet.garde.distance} · ouvert toute la nuit · {cabinet.garde.adresse}</p>
            </div>
            <Appeler numero={cabinet.garde.telephone} />
            <Plan depart="Le cabinet" arrivee="La garde" duree={`${cabinet.garde.distance}, ${cabinet.garde.trajet}`} />
            <p className="text-sm text-[var(--doux)]">
              Exemple : le service de garde, son adresse et son numéro sont fictifs. Sur un vrai
              site, cette carte affiche la garde du soir, mise à jour chaque jour.
            </p>
          </Apparition>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-2">
        <div className="space-y-8">
          <Apparition><Surtitre>N&apos;attends pas</Surtitre></Apparition>
          <TitreRevele texte="Les signes qui n'attendent *pas le matin.*" className="text-[clamp(2.4rem,4.6vw,4.2rem)] leading-[0.95]" classeAccent="italic text-[var(--accent-texte)]" />
          <ul className="space-y-3">
            {SIGNES.map((s, i) => (
              <Apparition as="li" key={s} delai={i * 70} className="flex gap-3 rounded-2xl border border-[var(--trait)] bg-[var(--carte)] p-4 leading-snug">
                <span aria-hidden="true" className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--accent)]" />
                {s}
              </Apparition>
            ))}
          </ul>
          <p className="text-[var(--doux)]">En cas de doute, appelle : c&apos;est le rôle de la garde.</p>
        </div>
        <div className="space-y-8">
          <Apparition><Surtitre>Avant de partir</Surtitre></Apparition>
          <TitreRevele texte="Ce qu'il faut *emporter.*" className="text-[clamp(2.4rem,4.6vw,4.2rem)] leading-[0.95]" classeAccent="italic text-[var(--accent-texte)]" />
          <ul className="space-y-3">
            {EMPORTER.map((s) => (
              <li key={s} className="flex items-center gap-3 border-b border-[var(--trait)] pb-3 text-lg">
                <span aria-hidden="true" className="font-bold text-[var(--accent-texte)]">✓</span>
                {s}
              </li>
            ))}
          </ul>
          <p className="leading-relaxed text-[var(--doux)]">
            Ne lui donne ni à manger ni médicament sans l&apos;avis du vétérinaire de garde : il te
            dira au téléphone quoi faire en attendant.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 pb-24 sm:px-8 md:pb-32 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-6">
          <Apparition><Surtitre>La continuité des soins</Surtitre></Apparition>
          <TitreRevele texte="Fermés, *pas absents.*" className="text-[clamp(2.4rem,4.6vw,4.2rem)] leading-[0.95]" classeAccent="italic text-[var(--accent-texte)]" />
          <Apparition as="p" delai={150} className="text-lg leading-relaxed text-[var(--doux)]">
            Hors de nos horaires, la garde est assurée par le service de garde du secteur, dans le
            cadre d&apos;une convention entre vétérinaires. Notre code de déontologie nous demande
            de te le dire (Code rural, art. R242-48) : on le dit en haut de l&apos;écran, le soir venu.
          </Apparition>
          <Bouton href={DOSSIER} variante="contour">Revenir à l&apos;accueil</Bouton>
        </div>
        <Apparition delai={150}>
          <Accordeon questions={QUESTIONS_GARDE} />
        </Apparition>
      </section>
    </main>
  );
}
