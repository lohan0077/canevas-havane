import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import Accordeon from "../_kit/Accordeon";
import Apparition from "../_kit/Apparition";
import CarteLueur from "../_kit/CarteLueur";
import Defilant from "../_kit/Defilant";
import FondVivant from "../_kit/FondVivant";
import RecitColle from "../_kit/RecitColle";
import TitreRevele from "../_kit/TitreRevele";
import { AppelFinal, Bouton, Coin, CORAIL, CORAIL_CLAIR, MachineACafe, TITRE } from "./_composants/Blocs";
import Question from "./_composants/Question";
import { ACCUEIL, DOSSIER, FORMULES, QUESTIONS, SOIREE_MARIAGE, THEMES, euros, photos } from "./_composants/donnees";

// L'accueil de Lundi d'Après. « Créer une marque » : « Sur le site, une seule question :
// qu'est-ce que tes équipes doivent se raconter lundi ? », puis la soirée construite à
// l'envers (#question, onglet entreprise). « Remplir l'agenda » : « Sur l'accueil, une
// seule question : quelle chanson est interdite à ton mariage ? » (#interdite, onglet
// mariage). Une seule question, selon ce que l'on fête.
export const metadata: Metadata = {
  title: "Lundi d'Après — agence d'événements, site de démonstration",
  description:
    "Le site d'une agence d'événements imaginaire, soirées d'entreprise et mariages, DJ compris : une seule question — ce que vos équipes diront lundi, ou la chanson interdite à votre mariage.",
  ...adressesDeLaPage("/exemples/lundi-d-apres"),
};

const exemple = THEMES[0];
const ENVERS = [
  { heure: "Lundi, 9 h", titre: "« On ne savait pas que la compta chantait aussi bien. »", texte: "Le point de départ : la phrase qu'on veut entendre devant la machine à café. Tout le reste en découle.", photo: photos.cafe },
  { ...exemple.moment, photo: photos.micro },
  { ...exemple.diner, photo: photos.rayons },
  { ...ACCUEIL, photo: photos.croissants },
];

const OFFRES = [
  { titre: "La soirée d'entreprise", prix: "dès 95 € HT / personne", texte: "Construite à l'envers, à partir de la phrase de lundi. DJ compris.", href: `${DOSSIER}/a-l-envers`, photo: photos.micro, large: true },
  { titre: "Le séminaire", prix: "dès 260 € HT / personne", texte: "Une journée de travail, une soirée qu'on raconte.", href: `${DOSSIER}/formats`, photo: null, large: false },
  { titre: "La fête de fin d'année", prix: "dès 75 € HT / personne", texte: "Toute l'entreprise, familles comprises si vous le voulez.", href: `${DOSSIER}/formats`, photo: null, large: false },
  { titre: "Le mariage", prix: `${euros(FORMULES[0].prix)} TTC la soirée`, texte: "Le DJ, jusqu'à 2 h selon la salle, et la chanson interdite notée.", href: `${DOSSIER}/samedis-libres`, photo: photos.bouleRose, large: true },
];

export default function LundiDApres() {
  return (
    <main>
      {/* ---------- Premier écran : la typographie seule, sur le fond vivant ---------- */}
      <section className="kit-grain relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <FondVivant couleurs={["#2A190F", "#B8381F", "#3E6E73"]} vitesse={1.1} />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(42,25,15,0.55)_0%,rgba(42,25,15,0.35)_50%,rgba(42,25,15,0.8)_100%)]" />
        <div className="relative mx-auto grid w-full max-w-7xl flex-1 gap-10 px-5 pb-14 pt-36 sm:px-8 md:pt-44 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
          <div className="space-y-8">
            <Apparition><Coin clair>agence d&apos;événements · entreprises et mariages</Coin></Apparition>
            <TitreRevele
              as="h1"
              auChargement
              texte="Ce dont vous parlerez *lundi.*"
              className={`text-[clamp(4.2rem,12.5vw,12.5rem)] ${TITRE} leading-[0.85]`}
              classeAccent={CORAIL_CLAIR}
            />
            <Apparition as="p" delai={500} className="max-w-xl text-lg leading-relaxed text-[var(--sur-sombre)]/90 md:text-xl">
              Une soirée d&apos;entreprise, un mariage&nbsp;: on ne vend pas un cocktail, on vend le lundi matin d&apos;après. On
              construit l&apos;événement à l&apos;envers, à partir de ce qu&apos;on s&apos;en racontera. DJ compris.
            </Apparition>
            <Apparition delai={700} className="flex flex-wrap gap-3">
              <Bouton href={`${DOSSIER}#question`}>une seule question</Bouton>
              <Bouton href={`${DOSSIER}/samedis-libres`} variante="trait">les samedis libres</Bouton>
            </Apparition>
          </div>
          <Apparition de="droite" delai={600} className="hidden lg:block">
            <MachineACafe />
            <p className="mt-2 text-center text-[13px] text-[var(--sur-sombre)]/90">Phrases d&apos;exemple : l&apos;agence est fictive.</p>
          </Apparition>
        </div>
      </section>

      {/* ---------- Ce qu'on fait, en défilé ---------- */}
      <div className="bg-[var(--accent)] py-5 text-[var(--sur-accent)]">
        <Defilant
          duree={40}
          separateur="●"
          elements={["soirées d'entreprise", "séminaires", "mariages", "le DJ compris", "la soirée construite à l'envers", "la chanson interdite, notée", "les samedis libres, en ligne", "les prix affichés"]}
          classeElement="whitespace-nowrap font-[family-name:var(--titres)] text-2xl font-extrabold lowercase tracking-[-0.03em] md:text-4xl"
        />
      </div>

      {/* ---------- Une seule question : l'outil, comme une application ---------- */}
      <section id="question" className="scroll-mt-20 bg-[#9AD1D4] text-[#2A190F] [--doux:#4A3424] [--encre:#2A190F]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <div className="space-y-6 lg:sticky lg:top-28">
            <Apparition><Coin>une seule question</Coin></Apparition>
            <TitreRevele texte="Vous fêtez *quoi ?*" className={`text-[clamp(3.2rem,7vw,6.2rem)] ${TITRE}`} classeAccent="text-[#8F2A14]" />
            <Apparition as="p" delai={150} className="max-w-md text-lg leading-relaxed">
              Pas de formulaire de contact, pas de «&nbsp;faites le show&nbsp;». Une seule question, selon ce que vous fêtez&nbsp;: ce
              que vos équipes diront lundi, ou la chanson qui ne passera pas à votre mariage.
            </Apparition>
          </div>
          <Apparition de="zoom"><Question /></Apparition>
        </div>
      </section>

      {/* ---------- La soirée à l'envers, racontée ---------- */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32">
        <div className="mb-6 space-y-6 md:mb-0">
          <Apparition><Coin>exemple, du lundi au vendredi</Coin></Apparition>
          <TitreRevele texte="La soirée, *à l'envers.*" className={`max-w-4xl text-[clamp(3.2rem,7vw,6.4rem)] ${TITRE}`} classeAccent={CORAIL} />
        </div>
        <RecitColle
          etapes={ENVERS.map((e) => ({
            surtitre: e.heure,
            titre: e.titre,
            texte: <p>{e.texte}</p>,
            visuel: <Image src={e.photo.src} alt={e.photo.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />,
          }))}
        />
        <Apparition className="mt-6"><Bouton href={`${DOSSIER}/a-l-envers`} variante="cafe">construire la nôtre</Bouton></Apparition>
      </section>

      {/* ---------- Ce qu'on organise : le bento ---------- */}
      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 md:pb-32">
        <div className="mb-12 grid gap-6 md:grid-cols-[1fr_0.8fr] md:items-end">
          <div className="space-y-6">
            <Apparition><Coin>ce qu&apos;on organise</Coin></Apparition>
            <TitreRevele texte="Pas un cocktail. *Le lundi.*" className={`text-[clamp(3.2rem,7vw,6.4rem)] ${TITRE}`} classeAccent={CORAIL} />
          </div>
          <Apparition as="p" delai={150} className="text-lg leading-relaxed text-[var(--doux)]">
            Les prix sont affichés&nbsp;: hors taxes pour les entreprises, nos clients professionnels&nbsp;; TTC pour les mariages.
            Ce sont des exemples, et le devis dit tout, ligne par ligne.
          </Apparition>
        </div>
        <ul className="grid gap-4 md:grid-cols-3">
          {OFFRES.map((o, i) => (
            <Apparition as="li" key={o.titre} delai={i * 110} de="zoom" className={o.large ? "md:col-span-2" : ""}>
              <CarteLueur className="h-full rounded-[2rem]">
                <Link href={o.href} className={`group relative flex h-full min-h-[280px] flex-col justify-end overflow-hidden rounded-[2rem] p-7 ${o.photo ? "bg-[var(--sombre)] text-[var(--sur-sombre)]" : "bg-[var(--carte)] ring-1 ring-[var(--trait)]"}`}>
                  {o.photo && (
                    <>
                      <Image src={o.photo.src} alt="" fill sizes="(min-width: 768px) 66vw, 100vw" className="object-cover opacity-50 transition-transform duration-[1.4s] ease-out group-hover:scale-[1.06]" />
                      <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(42,25,15,0.1)_20%,rgba(42,25,15,0.95)_100%)]" />
                    </>
                  )}
                  <span aria-hidden="true" className="absolute right-6 top-6 grid h-12 w-12 place-items-center rounded-full bg-[var(--accent)] text-xl font-bold text-[var(--sur-accent)] transition-transform duration-500 group-hover:rotate-45">↗</span>
                  <span className="relative space-y-2">
                    <span className={`block text-[14px] font-bold ${o.photo ? "text-[#FFD9A0]" : "text-[var(--accent-texte)]"}`}>{o.prix} · exemple</span>
                    <span className="block font-[family-name:var(--titres)] text-[clamp(2rem,3.4vw,3rem)] font-extrabold lowercase leading-[0.95] tracking-[-0.04em]">{o.titre}</span>
                    <span className={`block max-w-md ${o.photo ? "text-[var(--sur-sombre)]/90" : "text-[var(--doux)]"}`}>{o.texte}</span>
                  </span>
                </Link>
              </CarteLueur>
            </Apparition>
          ))}
        </ul>
      </section>

      {/* ---------- La piste encore pleine : la bande sombre aux coins arrondis ---------- */}
      <section className="px-3 sm:px-5">
        <div className="kit-grain relative isolate overflow-hidden rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
          <Image src={photos.bouleOr.src} alt="" fill sizes="100vw" className="object-cover opacity-30" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(42,25,15,0.95)_0%,rgba(42,25,15,0.75)_60%,rgba(42,25,15,0.55)_100%)]" />
          <div className="relative mx-auto max-w-6xl space-y-12 px-6 py-24 sm:px-10 md:py-32">
            <div className="max-w-3xl space-y-6">
              <Apparition><Coin clair>un mariage, côté piste</Coin></Apparition>
              <TitreRevele texte="La piste encore pleine, *à deux heures.*" className={`text-[clamp(3rem,7vw,6.2rem)] ${TITRE}`} classeAccent={CORAIL_CLAIR} />
              <Apparition as="p" delai={150} className="max-w-xl text-lg leading-relaxed text-[var(--sur-sombre)]/90">
                On ne vend pas du son. On regarde la salle, on change de chanson avant que la piste se vide, et on finit sur la
                bonne. L&apos;heure de fin, c&apos;est la salle qui la fixe.
              </Apparition>
            </div>
            <ol className="grid gap-px overflow-hidden rounded-[2rem] bg-white/15 sm:grid-cols-2 lg:grid-cols-4">
              {SOIREE_MARIAGE.map((m, i) => (
                <Apparition as="li" key={m.heure} delai={i * 120} className="space-y-2 bg-[#2A190F] p-6">
                  <p className="font-[family-name:var(--titres)] text-[44px] font-extrabold leading-none tracking-[-0.04em] text-[#FF8A6E]">{m.heure}</p>
                  <p className="font-[family-name:var(--titres)] text-xl font-bold lowercase">{m.titre}</p>
                  <p className="text-[15px] leading-relaxed text-[var(--sur-sombre)]/90">{m.texte}</p>
                </Apparition>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ---------- DJ ou playlist ? : la réponse honnête ---------- */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32">
        <Apparition de="zoom" className="grid gap-10 rounded-[2.5rem] bg-[var(--accent)] p-8 text-[var(--sur-accent)] sm:p-14 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div className="space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full bg-[#2A190F] px-3.5 py-1.5 text-[13px] font-bold lowercase text-[#FFD9A0]">la vraie question des mariés</p>
            <p className={`text-[clamp(3rem,7vw,6.4rem)] ${TITRE}`}>
              Un dîner calme à trente&nbsp;? Prenez une playlist.
            </p>
            <p className="max-w-xl text-lg leading-relaxed">
              Une page qui répond honnêtement à «&nbsp;DJ ou playlist&nbsp;?&nbsp;». Même quand la réponse, c&apos;est&nbsp;: pas besoin
              de nous.
            </p>
          </div>
          <div className="lg:justify-self-end"><Bouton href={`${DOSSIER}/dj-ou-playlist`} variante="cafe">trois questions pour trancher</Bouton></div>
        </Apparition>
      </section>

      {/* ---------- Le lancement : des croissants un lundi ---------- */}
      <section className="mx-auto grid max-w-7xl gap-12 px-5 pb-24 sm:px-8 md:grid-cols-2 md:items-center md:pb-32">
        <Apparition de="gauche" className="relative aspect-[4/3] overflow-hidden rounded-[2.5rem]">
          <Image src={photos.croissants.src} alt={photos.croissants.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          <p className="absolute bottom-5 left-5 right-5 rounded-[1.5rem] bg-[#FF6B4A] p-5 font-[family-name:var(--titres)] text-[clamp(1.6rem,3vw,2.4rem)] font-extrabold lowercase leading-[0.95] tracking-[-0.03em] text-[#2A190F]">
            ça, c&apos;est lundi. imaginez le vendredi.
          </p>
        </Apparition>
        <div className="space-y-6">
          <Apparition><Coin>notre lancement</Coin></Apparition>
          <TitreRevele texte="Des croissants, *un lundi matin.*" className={`text-[clamp(3rem,6vw,5.4rem)] ${TITRE}`} classeAccent={CORAIL} />
          <Apparition as="p" delai={150} className="max-w-md text-lg leading-relaxed text-[var(--doux)]">
            Achetés chez le boulanger d&apos;à côté, livrés dans les bureaux du quartier, sans rien demander en échange. Avec un mot.
            Et chaque semaine, la vraie phrase du lundi, publiée avec l&apos;accord de l&apos;entreprise et de la personne.
          </Apparition>
          <Apparition delai={250}><Bouton href={`${DOSSIER}/la-phrase-du-lundi`} variante="cafe">la phrase du lundi</Bouton></Apparition>
        </div>
      </section>

      {/* ---------- Questions ---------- */}
      <section id="questions" className="scroll-mt-24 border-t border-[var(--trait)]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[0.75fr_1.25fr]">
          <div className="space-y-6">
            <Apparition><Coin>vos questions</Coin></Apparition>
            <TitreRevele texte="Avant de *nous appeler.*" className={`text-[clamp(3rem,5.5vw,4.8rem)] ${TITRE}`} classeAccent={CORAIL} />
          </div>
          <Apparition delai={150}>
            <Accordeon questions={QUESTIONS.map((q) => ({ question: q.q, reponse: q.r }))} />
          </Apparition>
        </div>
      </section>

      <AppelFinal />
    </main>
  );
}
