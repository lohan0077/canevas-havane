import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import Accordeon from "../_kit/Accordeon";
import Apparition from "../_kit/Apparition";
import CarteLueur from "../_kit/CarteLueur";
import Defilant from "../_kit/Defilant";
import PhotoCinema from "../_kit/PhotoCinema";
import RecitColle from "../_kit/RecitColle";
import TitreRevele from "../_kit/TitreRevele";
import { AppelFinal, Bouton, Note, Surtitre } from "./_composants/Blocs";
import TitreLignes from "./_composants/TitreLignes";
import UneQuestion from "./_composants/UneQuestion";
import { styleCahier } from "./_composants/cahier";
import { CHAPITRES, CLASSES, CONCERT, DOSSIER, MORCEAUX, PRIX, QUESTIONS, SEMAINE, entreprise, photos } from "./_composants/donnees";

// L'accueil de Clair de Salon. Les deux vidéos y sont : « Sur l'accueil, pas de
// solfège. Une seule question : quel morceau tu rêves de jouer ? » (marque) et « Sur
// l'accueil, pas de CV. Une seule question : quel chapitre bloque ? » (agenda) — la même
// question, selon qu'on la pose pour soi ou pour son enfant.
export const metadata: Metadata = {
  title: "Clair de Salon — cours particuliers à domicile, site de démonstration",
  description:
    "Le site d'une entreprise imaginaire de cours à domicile, piano et maths : une seule question à l'accueil, le chemin du morceau ou la première séance écrits d'avance, le prix en grand.",
  ...adressesDeLaPage("/exemples/clair-de-salon"),
};

const gymnopedie = MORCEAUX[0];
const PHOTOS_CHEMIN = [photos.touches, photos.main, photos.clavierSoir, photos.pianoQuiDort];
const TEXTES_CHEMIN = [
  "Pas une gamme : les huit premières mesures du morceau que tu as choisi. Le jour même, tu les entends chez toi.",
  "La main gauche porte tout. On la pose seule, lentement, jusqu'à ce qu'elle tienne sans y penser.",
  "Les deux mains ensemble, à petite vitesse. C'est l'étape qui demande le plus de soirées, et c'est normal.",
  "Le jour où tu le joues en entier. Au salon, pour toi — ou au concert du mois, si tu veux.",
];
const DEFILANT = MORCEAUX.flatMap((m, i) => [m.titre, CHAPITRES[i]?.nom]).filter(Boolean) as string[];

export default function ClairDeSalon() {
  const libres = SEMAINE.filter((c) => !c.pris).slice(0, 3);

  return (
    <main>
      {/* ---------- Premier écran : le salon, le soir ---------- */}
      <section className="kit-grain relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <PhotoCinema src={photos.salon.src} alt="" priority origine="50% 62%" className="opacity-80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(30,42,68,0.55)_0%,rgba(30,42,68,0.35)_45%,rgba(30,42,68,0.75)_80%),linear-gradient(180deg,rgba(30,42,68,0.6)_0%,rgba(30,42,68,0.1)_40%,rgba(30,42,68,0.97)_100%)]" />
        <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center gap-8 px-4 pb-10 pt-32 text-center sm:px-8">
          <Apparition de="zoom">
            <p aria-hidden="true" className="grid h-16 w-16 place-items-center rounded-full border border-[#E7C774] text-3xl text-[#E7C774]">☾</p>
          </Apparition>
          <Apparition delai={100}>
            <Surtitre clair centre>Cours particuliers à domicile · piano et maths</Surtitre>
          </Apparition>
          <TitreLignes
            lignes={["Le piano qui dort.", "Le chapitre qui *bloque.*"]}
            className="text-[clamp(2.55rem,7.4vw,6.9rem)] leading-[0.98] tracking-[-0.02em] [text-shadow:0_2px_30px_rgba(30,42,68,0.6)]"
            classeAccent="italic text-[#E7C774]"
          />
          <Apparition as="p" delai={700} className="max-w-2xl text-lg leading-relaxed text-[var(--sur-sombre)]/90 sm:text-xl">
            Des cours chez toi, une heure par semaine. Pas de CV, pas de solfège : on commence par
            ce qui compte — le morceau dont tu rêves, ou le chapitre du dernier contrôle.
          </Apparition>
          <Apparition delai={850} className="flex flex-wrap justify-center gap-3">
            <Bouton href={`${DOSSIER}#question-piano`}>Tu rêves de jouer quoi&nbsp;?</Bouton>
            <Bouton href={`${DOSSIER}#question-maths`} variante="contour">Quel chapitre bloque&nbsp;?</Bouton>
          </Apparition>
        </div>
        <Apparition as="ul" delai={1000} className="relative mx-auto grid w-full max-w-6xl grid-cols-1 gap-3 px-5 pb-8 text-[15px] sm:grid-cols-3 sm:px-8">
          {[
            [`${PRIX.heure} € TTC l'heure`, "piano ou maths · exemple"],
            ["Chez toi", "sur ton piano, à ta table"],
            ["Le soir, le mercredi", "réservable en ligne"],
          ].map(([fort, doux]) => (
            <li key={fort} className="flex items-baseline justify-between gap-3 rounded-2xl border border-white/15 bg-[var(--sombre)]/70 px-4 py-3 backdrop-blur-md">
              <span className="font-semibold">{fort}</span>
              <span className="text-[13px] text-[var(--sur-sombre)]/85">{doux}</span>
            </li>
          ))}
        </Apparition>
      </section>

      {/* ---------- Ce qu'on joue, ce qui bloque ---------- */}
      <div className="bg-[var(--accent)] py-5 text-[var(--sur-accent)]">
        <Defilant
          duree={42}
          separateur="☾"
          elements={DEFILANT}
          classeElement="font-[family-name:var(--titres)] text-2xl italic md:text-3xl whitespace-nowrap"
        />
      </div>

      {/* ---------- Une seule question ---------- */}
      <section id="question" className="relative scroll-mt-20 px-4 py-24 sm:px-8 md:py-32">
        <span id="question-piano" className="absolute top-0 scroll-mt-20" />
        <span id="question-maths" className="absolute top-0 scroll-mt-20" />
        <div className="mx-auto max-w-6xl space-y-12">
          <div className="space-y-6 text-center">
            <Apparition><Surtitre centre>L&apos;accueil</Surtitre></Apparition>
            <TitreRevele
              texte="Pas de CV. Pas de solfège. *Une seule question.*"
              className="mx-auto max-w-4xl text-[clamp(2.7rem,6.5vw,6rem)] leading-[0.98] tracking-[-0.02em]"
              classeAccent="italic text-[var(--accent-texte)]"
            />
            <Apparition as="p" delai={200} className="mx-auto max-w-2xl text-lg leading-relaxed text-[var(--doux)]">
              Pour toi, au piano, ou pour ton enfant, en maths. Touche une réponse : le site écrit
              la suite avant même le premier cours.
            </Apparition>
          </div>
          <UneQuestion />
        </div>
      </section>

      {/* ---------- Ce qu'on vend vraiment ---------- */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-8 md:pb-36">
        <div className="mb-12 grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div className="space-y-6">
            <Apparition><Surtitre>Ce qu&apos;on vend vraiment</Surtitre></Apparition>
            <TitreRevele
              texte="Pas des heures de cours. *Des soirées.*"
              className="text-[clamp(2.7rem,6vw,5.5rem)] leading-[0.98] tracking-[-0.02em]"
              classeAccent="italic text-[var(--accent-texte)]"
            />
          </div>
          <Apparition as="p" delai={150} className="text-lg leading-relaxed text-[var(--doux)]">
            Le piano qu&apos;on rouvre un mardi soir. Le dimanche où les devoirs sont faits à
            20 h, et où personne n&apos;a crié. C&apos;est l&apos;image qu&apos;on vise ; on ne promet
            ni note, ni durée.
          </Apparition>
        </div>
        <div className="grid gap-4 md:grid-cols-6">
          <Apparition de="zoom" className="md:col-span-4">
            <CarteLueur className="h-full rounded-[2rem]">
              <div className="relative flex h-[460px] flex-col justify-end overflow-hidden rounded-[2rem] bg-[var(--sombre)] p-7 text-[var(--sur-sombre)] sm:p-10 md:h-[520px]">
                <Image src={photos.clavierSoir.src} alt={photos.clavierSoir.alt} fill sizes="(min-width: 768px) 66vw, 100vw" className="object-cover opacity-60" />
                <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(30,42,68,0.05)_25%,rgba(30,42,68,0.95)_100%)]" />
                <div className="relative space-y-3">
                  <p className="text-[12px] font-bold uppercase tracking-[0.24em] text-[#E7C774]">Au piano</p>
                  <p className="max-w-xl font-[family-name:var(--titres)] text-[clamp(2.2rem,4.5vw,3.8rem)] leading-[1]">
                    Pas des cours. Le moment où on te dit&nbsp;: <span className="italic text-[#E7C774]">« Encore&nbsp;! »</span>
                  </p>
                </div>
              </div>
            </CarteLueur>
          </Apparition>
          <Apparition de="zoom" delai={140} className="md:col-span-2">
            <div className="relative h-full min-h-[460px] overflow-hidden rounded-[2rem] border border-[var(--trait)] p-7 pl-14" style={styleCahier}>
              <Note>En maths</Note>
              <p className="mt-6 font-[family-name:var(--titres)] text-5xl">Dimanche</p>
              <p className="font-[family-name:var(--titres)] text-7xl text-[var(--accent-texte)] [font-variant-numeric:lining-nums]">20 h</p>
              <ul className="mt-6 space-y-1 font-[family-name:var(--f-caveat)] text-[34px] leading-tight">
                <li>✓ Devoirs faits</li>
                <li>✓ Sans dispute</li>
              </ul>
              <p className="mt-6 text-[15px] leading-snug text-[var(--doux)]">Pas des heures de maths : des dimanches soir sans dispute.</p>
            </div>
          </Apparition>
          {[
            ["Chez toi", "Sur l'instrument qui dort dans ton salon, à la table où les devoirs coincent. Pas dans une salle."],
            ["Une heure par semaine", "Le même jour, la même heure, la même professeure. Piano le soir, maths le mercredi."],
            ["Deux lignes après le cours", "Ce qu'on a fait, ce qu'on revoit. Aux parents, ou à toi. Pas de bulletin."],
          ].map(([titre, texte], i) => (
            <Apparition key={titre} delai={i * 120} className="md:col-span-2">
              <div className="h-full space-y-3 rounded-[2rem] border border-[var(--trait)] bg-[var(--carte)] p-7">
                <p aria-hidden="true" className="font-[family-name:var(--titres)] text-4xl italic text-[var(--accent-texte)] [font-variant-numeric:lining-nums]">{["I", "II", "III"][i]}</p>
                <h3 className="text-2xl">{titre}</h3>
                <p className="leading-relaxed text-[var(--doux)]">{texte}</p>
              </div>
            </Apparition>
          ))}
        </div>
      </section>

      {/* ---------- Le chemin, étape par étape ---------- */}
      <section className="border-y border-[var(--trait)] bg-[var(--carte)] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-10 grid gap-6 md:mb-4 lg:grid-cols-[1fr_0.8fr] lg:items-end">
            <div className="space-y-6">
              <Apparition><Surtitre>Ton chemin · {gymnopedie.titre}</Surtitre></Apparition>
              <TitreRevele
                texte="Étape par étape, *jusqu'au morceau entier.*"
                className="text-[clamp(2.7rem,6vw,5.5rem)] leading-[0.98] tracking-[-0.02em]"
                classeAccent="italic text-[var(--accent-texte)]"
              />
            </div>
            <Apparition delai={200} className="space-y-5">
              <p className="text-lg leading-relaxed text-[var(--doux)]">
                Quatre étapes par morceau. On passe à la suivante quand tu le décides ; le solfège
                vient en chemin, quand on en a besoin.
              </p>
              <Bouton href={`${DOSSIER}/ton-chemin`}>Suivre ton chemin</Bouton>
            </Apparition>
          </div>
          <RecitColle
            etapes={gymnopedie.etapes.map((e, i) => ({
              surtitre: `Étape ${i + 1}`,
              titre: e,
              texte: <p>{TEXTES_CHEMIN[i]}</p>,
              visuel: <Image src={PHOTOS_CHEMIN[i].src} alt={PHOTOS_CHEMIN[i].alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />,
            }))}
          />
        </div>
      </section>

      {/* ---------- Ce qu'on tape sur Google ---------- */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-8 md:py-36">
        <div className="mb-14 space-y-6 text-center">
          <Apparition><Surtitre centre>Ce qu&apos;on tape, mot pour mot</Surtitre></Apparition>
          <TitreRevele
            texte="Deux recherches. *Deux pages.*"
            className="text-[clamp(2.7rem,6vw,5.5rem)] leading-[0.98] tracking-[-0.02em]"
            classeAccent="italic text-[var(--accent-texte)]"
          />
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          {[
            { qui: "Les adultes qui reprennent", requete: "reprendre le piano après plusieurs années", page: `${DOSSIER}/ton-chemin`, lien: "Ton chemin", texte: "Ils n'ont pas besoin de repartir des gammes : d'un morceau, d'un piano, et d'une heure qui ne soit qu'à eux.", photo: photos.touches },
            { qui: "Les parents", requete: "prix cours particulier maths 3ème", page: `${DOSSIER}/maths-3e`, lien: "Maths, 3e", texte: "Alors chaque classe a sa page, avec les trois réponses : la méthode, le programme, le prix.", photo: photos.equerre },
          ].map((c, i) => (
            <Apparition key={c.requete} de={i ? "droite" : "gauche"}>
              <div className="flex h-full flex-col overflow-hidden rounded-[2rem] border border-[var(--trait)] bg-[var(--carte)] sm:flex-row">
                <div className="relative h-56 shrink-0 sm:h-auto sm:w-[38%]">
                  <Image src={c.photo.src} alt={c.photo.alt} fill sizes="(min-width: 1024px) 20vw, (min-width: 640px) 38vw, 100vw" className="object-cover" />
                </div>
                <div className="flex flex-1 flex-col justify-between gap-6 p-6 sm:p-8">
                  <div className="space-y-4">
                    <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-[var(--doux)]">{c.qui}</p>
                    <p className="flex items-center gap-3 rounded-full border border-[var(--trait)] bg-[var(--fond)] px-4 py-3 text-[15px] shadow-inner">
                      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 shrink-0 text-[var(--doux)]"><circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" strokeWidth="2" /><path d="m15.5 15.5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                      <span className="min-w-0">{c.requete}</span>
                    </p>
                    <p className="leading-relaxed text-[var(--doux)]">{c.texte}</p>
                  </div>
                  <Link href={c.page} className="group inline-flex items-center gap-2 font-[family-name:var(--titres)] text-2xl italic text-[var(--accent-texte)]">
                    {c.lien} <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </div>
            </Apparition>
          ))}
        </div>
        <Apparition delai={200} className="mt-5 grid grid-cols-5 gap-2 sm:gap-3">
          {CLASSES.map((c) =>
            c.lien ? (
              <Link key={c.classe} href={`${DOSSIER}/maths-3e`} className="grid h-20 place-items-center rounded-2xl bg-[var(--sombre)] font-[family-name:var(--titres)] text-3xl text-[var(--sur-sombre)] transition-transform hover:scale-[1.03]">
                {c.classe}
              </Link>
            ) : (
              <span key={c.classe} className="grid h-20 place-items-center rounded-2xl border-2 border-dashed border-[var(--trait)] font-[family-name:var(--titres)] text-3xl text-[var(--doux)]">{c.classe}</span>
            ),
          )}
        </Apparition>
        <p className="mt-3 text-sm text-[var(--doux)]">Démonstration : seule la page de 3e est construite, les autres suivraient le même modèle.</p>
      </section>

      {/* ---------- Le concert de salon ---------- */}
      <section className="px-3 sm:px-5">
        <div className="kit-grain relative overflow-hidden rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
          <div className="mx-auto grid max-w-6xl gap-14 px-6 py-24 sm:px-10 md:py-32 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-6">
              <Apparition><Surtitre clair>Une fois par mois</Surtitre></Apparition>
              <TitreRevele
                texte="Un concert de salon, *chez un élève.*"
                className="text-[clamp(2.8rem,6vw,5.5rem)] leading-[0.98] tracking-[-0.02em]"
                classeAccent="italic text-[#E7C774]"
              />
              <Apparition as="p" delai={200} className="max-w-lg text-lg leading-relaxed text-[var(--sur-sombre)]/90">
                {CONCERT.eleves} élèves au piano, {CONCERT.chaises} chaises, et les voisins. On joue ce
                qu&apos;on sait, même huit mesures. Entrée libre, des œuvres du domaine public.
              </Apparition>
              <Apparition delai={300}>
                <Bouton href={`${DOSSIER}/concerts`} variante="clair">Garder une chaise</Bouton>
              </Apparition>
            </div>
            <Apparition de="zoom" delai={150}>
              <figure className="mx-auto w-[88%] max-w-sm rotate-[-2.5deg] space-y-4 bg-[var(--fond)] p-8 text-center text-[var(--encre)] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.85)]">
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--accent-texte)]">Clair de Salon · invitation</p>
                <p className="font-[family-name:var(--titres)] text-5xl leading-none">Concert de salon</p>
                <p className="text-lg italic">{CONCERT.date}<br />{CONCERT.heure}, {CONCERT.chez}</p>
                <p aria-hidden="true" className="flex justify-center gap-1.5 pt-2">
                  {Array.from({ length: CONCERT.chaises }, (_, k) => <span key={k} className="h-4 w-4 rounded-[3px] border-2 border-[var(--encre)]" />)}
                </p>
                <figcaption className="text-sm">{CONCERT.eleves} élèves au piano · voisins bienvenus · exemple</figcaption>
              </figure>
            </Apparition>
          </div>
        </div>
      </section>

      {/* ---------- Le prix, en grand ---------- */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-8 md:py-36">
        <div className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
          <Apparition de="zoom" className="relative overflow-hidden rounded-[2.5rem] bg-[var(--accent)] p-8 text-[var(--sur-accent)] sm:p-12">
            <p className="text-[12px] font-bold uppercase tracking-[0.22em]">Piano ou maths · chez toi · prix d&apos;exemple</p>
            <p className="mt-6 font-[family-name:var(--titres)] leading-[0.85] [font-variant-numeric:lining-nums]">
              <span className="block text-[clamp(6.5rem,17vw,14rem)]">{PRIX.heure}&nbsp;€</span>
              <span className="block text-[clamp(2.2rem,5vw,4rem)] italic">TTC, l&apos;heure</span>
            </p>
            <p className="mt-8 max-w-md text-lg leading-relaxed">{PRIX.heure},00&nbsp;€ HT · TVA non applicable dans cet exemple · déplacement compris. Le même prix le soir et le mercredi.</p>
          </Apparition>
          <div className="grid gap-5">
            <Apparition delai={150} className="rounded-[2.5rem] border border-dashed border-[var(--doux)] bg-[var(--carte)] p-7">
              <p className="text-[13px] font-bold">Avantage fiscal, à part, sous conditions</p>
              <p className="mt-2 text-[13px] leading-snug text-[var(--doux)]">
                Crédit d&apos;impôt de 50&nbsp;%, dans la limite d&apos;un plafond annuel : {PRIX.heure * PRIX.credit}&nbsp;€ l&apos;heure après
                crédit d&apos;impôt. Cours chez l&apos;élève, en individuel, activité déclarée (exemple).
              </p>
            </Apparition>
            <Apparition delai={300} className="flex flex-col justify-between gap-6 rounded-[2.5rem] bg-[var(--sombre)] p-8 text-[var(--sur-sombre)]">
              <p className="font-[family-name:var(--titres)] text-3xl leading-tight">C&apos;est la règle des cours à domicile : <span className="italic text-[#E7C774]">le prix d&apos;abord.</span></p>
              <Bouton href={`${DOSSIER}/tarifs`}>Tous les tarifs</Bouton>
            </Apparition>
          </div>
        </div>
      </section>

      {/* ---------- Cette semaine, en vrai ---------- */}
      <section className="border-y border-[var(--trait)] bg-[var(--carte)] py-20 md:py-28">
        <div className="mx-auto max-w-7xl space-y-10 px-5 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <TitreRevele
              texte="Cette semaine, *en vrai.*"
              className="text-[clamp(2.6rem,5.5vw,5rem)] leading-[0.98] tracking-[-0.02em]"
              classeAccent="italic text-[var(--accent-texte)]"
            />
            <Bouton href={`${DOSSIER}/reserver`} variante="contour">Tout l&apos;agenda</Bouton>
          </div>
          <ul className="grid gap-4 sm:grid-cols-3">
            {libres.map((c, i) => (
              <Apparition as="li" key={c.id} delai={i * 120} de="droite">
                <Link href={`${DOSSIER}/reserver`} className="group flex items-center justify-between rounded-[1.75rem] border border-[var(--trait)] bg-[var(--fond)] px-6 py-5 transition-colors hover:border-[var(--encre)]">
                  <span>
                    <span className="block text-[12px] font-bold uppercase tracking-[0.2em] text-[var(--doux)]">{c.matiere}</span>
                    <span className="block font-[family-name:var(--titres)] text-3xl">{c.jour}</span>
                    <span className="block text-[var(--doux)]">{c.date} · {c.heure}</span>
                  </span>
                  <span aria-hidden="true" className="grid h-12 w-12 place-items-center rounded-full bg-[var(--accent)] text-[var(--sur-accent)] transition-transform group-hover:-rotate-45">→</span>
                </Link>
              </Apparition>
            ))}
          </ul>
          <p className="text-sm text-[var(--doux)]">Créneaux d&apos;exemple : l&apos;entreprise est fictive. Ou par téléphone : {entreprise.telephone}.</p>
        </div>
      </section>

      {/* ---------- Questions ---------- */}
      <section id="questions" className="mx-auto grid max-w-7xl scroll-mt-24 gap-12 px-5 py-24 sm:px-8 md:py-36 lg:grid-cols-[0.7fr_1.3fr]">
        <div className="space-y-6">
          <Apparition><Surtitre>Avant le premier cours</Surtitre></Apparition>
          <TitreRevele
            texte="Ce qu'on nous demande *le plus.*"
            className="text-[clamp(2.6rem,5vw,4.5rem)] leading-[0.98] tracking-[-0.02em]"
            classeAccent="italic text-[var(--accent-texte)]"
          />
          <p className="text-[var(--doux)]">Piano avec {entreprise.pianiste}, maths avec {entreprise.mathematicienne} (prénoms d&apos;exemple).</p>
        </div>
        <Apparition delai={150}>
          <Accordeon questions={QUESTIONS.map((q) => ({ question: q.q, reponse: q.r }))} />
        </Apparition>
      </section>

      <AppelFinal />
    </main>
  );
}
