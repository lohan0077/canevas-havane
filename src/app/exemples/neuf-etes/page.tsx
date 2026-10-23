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
import { ACCENT_SOMBRE, AppelFinal, Bouton, CarteChantier, GrilleGammes, Soleil, Surtitre, Titre } from "./_composants/Blocs";
import CalculEtes from "./_composants/CalculEtes";
import CompteARebours from "./_composants/CompteARebours";
import Creneaux from "./_composants/Creneaux";
import FilmChantier from "./_composants/FilmChantier";
import Jardin from "./_composants/Jardin";
import Ouverture from "./_composants/Ouverture";
import { DOSSIER, chantiers, methode, photos, questions, souvenirs } from "./_composants/donnees";

// Le site de Neuf Étés, la marque de piscines des deux vidéos des piscinistes. Il
// garde la marque de « Créer une marque » — le nom, l'âge des enfants et les étés qui
// restent, l'affiche, le chantier filmé jusqu'au premier plongeon — et toutes les
// idées de « Remplir l'agenda » : le jardin qui dit quelle coque rentre et à quel
// prix, une page par chantier, le compte à rebours, les dates qu'on bloque soi-même.
// Premier écran : le modèle « Monolith Hero » de MotionSites, aux couleurs de la marque.
export const metadata: Metadata = {
  title: "Neuf Étés — piscines familiales, site de démonstration",
  description:
    "Le site d'une marque de piscines imaginaire : combien d'étés il te reste avec tes enfants, la piscine qui rentre dans ton jardin, chaque chantier filmé jusqu'au premier plongeon, et la semaine de chantier qu'on bloque soi-même.",
  ...adressesDeLaPage("/exemples/neuf-etes"),
};

const CHANTIER_RACONTE = chantiers[0];
// Quatre jours du film sur l'accueil : le premier coup de pelle, la coque, la plage,
// le premier plongeon. Les six sont sur la page du chantier.
const JOURS_RACONTES = CHANTIER_RACONTE.jours.filter((j) => [1, 3, 5, 6].includes(j.etape));

export default function NeufEtes() {
  return (
    <main>
      {/* ---------- Premier écran : l'ouverture vidéo, en quatre chapitres ---------- */}
      {/* -mt-3 : l'en-tête flottant du kit laisse une marge de 12 px sous le bandeau. */}
      <div className="-mt-3 flex h-[100svh] min-h-[560px] flex-col">
        <Ouverture />
      </div>

      {/* ---------- Ce qui se passe l'été ---------- */}
      <div className="bg-[var(--accent)] py-5 text-[var(--sur-accent)]">
        <Defilant
          duree={44}
          elements={souvenirs}
          separateur={<Soleil className="inline h-6 w-6 align-[-3px] [&_circle]:fill-[#12445A] [&_g]:stroke-[#12445A]" />}
          classeElement="font-[family-name:var(--titres)] text-xl md:text-2xl font-bold tracking-[-0.01em] whitespace-nowrap"
        />
      </div>

      {/* ---------- L'outil de la marque : combien d'étés ---------- */}
      <section id="etes" className="scroll-mt-24 mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="space-y-7">
          <Apparition><Surtitre>L&apos;outil Neuf Étés</Surtitre></Apparition>
          <Titre texte={"Quel âge ont *tes enfants ?*"} taille="geant" />
          <Apparition as="p" delai={200} className="max-w-xl text-xl leading-relaxed text-[var(--doux)]">
            Une question qu&apos;aucun devis de piscine ne pose. Entre leur âge : le site compte
            les étés qu&apos;il te reste avec eux, à la maison. Un par an, jusqu&apos;à leurs 18 ans.
          </Apparition>
          <Apparition as="ul" delai={320} className="grid gap-3 sm:grid-cols-3">
            {[
              ["18 ans", "l'âge où l'on part, souvent"],
              ["1 été", "par an, pas un de plus"],
              ["0 envoi", "le calcul reste chez toi"],
            ].map(([fort, doux]) => (
              <li key={fort} className="rounded-[1.4rem] border border-[var(--trait)] bg-[var(--carte)] px-4 py-3">
                <span className="block font-[family-name:var(--titres)] text-2xl font-bold">{fort}</span>
                <span className="block text-[15px] text-[var(--doux)]">{doux}</span>
              </li>
            ))}
          </Apparition>
        </div>
        <Apparition de="droite" delai={150}>
          <CalculEtes />
        </Apparition>
      </section>

      {/* ---------- Ça vend du temps : l'affiche du lancement ---------- */}
      <section className="overflow-hidden bg-[var(--accent)] text-[var(--sur-accent)]">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-8 md:py-28 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-7">
            <Apparition><p className="font-[family-name:var(--titres)] text-sm font-bold uppercase tracking-[0.16em]">Pourquoi Neuf Étés</p></Apparition>
            <TitreRevele
              texte="Ça ne vend pas une piscine. *Ça vend du temps.*"
              className="text-[clamp(2.8rem,7vw,6.5rem)] font-bold leading-[0.95] tracking-[-0.035em]"
              classeAccent="italic font-normal"
            />
            <Apparition as="p" delai={200} className="max-w-xl text-xl leading-relaxed">
              Une piscine, tout le monde en vend : de l&apos;eau bleue et un transat. Nous, on
              construit l&apos;endroit où vont se passer les étés que tes enfants raconteront.
            </Apparition>
          </div>
          <Apparition de="zoom" delai={200} className="mx-auto w-full max-w-sm">
            <figure data-film="affiche" className="rotate-[-3deg] space-y-8 rounded-[1.75rem] bg-[var(--sombre)] p-9 text-[var(--sur-sombre)] shadow-[0_40px_80px_-40px_rgba(13,52,70,0.9)]">
              <p className="font-[family-name:var(--titres)] text-[3.4rem] font-bold leading-[1]">
                Il te reste <span className="block text-[var(--accent)]">9 étés.</span>
              </p>
              <figcaption className="flex items-center justify-between gap-3 border-t border-white/20 pt-5 font-[family-name:var(--titres)] text-sm font-bold uppercase tracking-[0.14em]">
                <span>Neuf Étés · piscines</span>
                <Soleil className="h-6 w-6" />
              </figcaption>
            </figure>
            <p className="mt-8 text-center text-[15px]">L&apos;affiche du lancement, partout, au printemps.</p>
          </Apparition>
        </div>
      </section>

      {/* ---------- Ton jardin fait combien ? Le calculateur en 3D ---------- */}
      <section id="prix" className="scroll-mt-20 px-3 pt-3 sm:px-5 sm:pt-5">
        <div className="kit-grain relative overflow-hidden rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
          <div className="mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-10 md:py-32 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div className="space-y-7 lg:sticky lg:top-28 lg:self-start lg:pt-10">
              <Apparition><Surtitre clair>Ton jardin fait combien&nbsp;?</Surtitre></Apparition>
              <Titre texte="La piscine qui *rentre.*" clair taille="geant" />
              <Apparition as="p" delai={200} className="max-w-md text-xl leading-relaxed">
                Glisse jusqu&apos;à la surface de ton jardin : la maquette te montre la coque qui
                rentre vraiment, à un mètre des limites, et ce qu&apos;elle coûte, pose comprise.
              </Apparition>
              <Apparition delai={300} className="flex flex-wrap gap-3">
                <Bouton href={`${DOSSIER}/prix`} variante="clair">Ce qui fait varier le prix</Bouton>
              </Apparition>
            </div>
            <Apparition de="zoom" delai={150}>
              <Jardin />
            </Apparition>
          </div>
        </div>
      </section>

      {/* ---------- Les coques, en bento ---------- */}
      <section className="mx-auto max-w-7xl space-y-14 px-5 py-24 sm:px-8 md:py-32">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div className="space-y-6">
            <Apparition><Surtitre>Nos piscines</Surtitre></Apparition>
            <Titre texte="Quatre coques, *un jardin chacune.*" />
          </div>
          <Apparition as="p" delai={200} className="text-xl leading-relaxed text-[var(--doux)]">
            Une coque d&apos;un seul tenant, fabriquée en atelier, posée en une matinée.
            Choisis-la d&apos;après ton jardin, pas d&apos;après un catalogue.
          </Apparition>
        </div>
        <GrilleGammes />
        <Apparition className="flex justify-end">
          <Bouton href={`${DOSSIER}/piscines`} variante="sombre">Toutes les piscines</Bouton>
        </Apparition>
      </section>

      {/* ---------- Le premier dimanche de juillet ---------- */}
      <section id="juillet" className="kit-grain relative isolate overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <PhotoCinema src={photos.eteEnFamille.src} alt="" origine="50% 70%" className="opacity-60" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,52,70,0.95)_0%,rgba(13,52,70,0.82)_55%,rgba(13,52,70,0.55)_100%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-28 sm:px-8 md:py-40 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div className="space-y-7">
            <Apparition><Surtitre clair>Le compte à rebours</Surtitre></Apparition>
            <TitreRevele
              texte="On ne vend pas une piscine. On vend le *premier dimanche de juillet.*"
              className="text-[clamp(2.6rem,6vw,5.5rem)] font-bold leading-[0.98] tracking-[-0.035em]"
              classeAccent={ACCENT_SOMBRE}
            />
            <Apparition as="p" delai={200} className="max-w-xl text-xl leading-relaxed">
              Le jour où toute la famille saute en même temps. Pour qu&apos;il arrive à l&apos;heure,
              le chantier se cale au printemps : le compte à rebours commence en janvier.
            </Apparition>
          </div>
          <Apparition delai={250}>
            <CompteARebours />
          </Apparition>
        </div>
      </section>

      {/* ---------- Le chantier, filmé jour après jour ---------- */}
      <section id="film" className="scroll-mt-24 border-b border-[var(--trait)] bg-[var(--carte)] py-24 md:py-32">
        <div className="mx-auto max-w-7xl space-y-6 px-5 sm:px-8">
          <Apparition><Surtitre>Chantier n° {CHANTIER_RACONTE.numero} · {CHANTIER_RACONTE.titre.replace("Piscine ", "")}</Surtitre></Apparition>
          <Titre texte="Filmé jour après jour, *jusqu'au premier plongeon.*" className="max-w-5xl" />
          <Apparition as="p" delai={200} className="max-w-2xl text-xl leading-relaxed text-[var(--doux)]">
            Avec l&apos;accord de la famille, chaque chantier est filmé, du premier coup de pelle au
            premier plongeon. Trois semaines, six étapes : en voici quatre, la page du chantier les montre toutes.
          </Apparition>
          <RecitColle
            className="pt-6"
            etapes={JOURS_RACONTES.map((j) => ({
              surtitre: j.jour,
              titre: j.titre,
              texte: <p>{j.texte}</p>,
              visuel: <FilmChantier jour={j} rang={CHANTIER_RACONTE.jours.indexOf(j) + 1} total={CHANTIER_RACONTE.jours.length} />,
            }))}
          />
          <Apparition className="pt-4">
            <Bouton href={`${DOSSIER}/chantiers/${CHANTIER_RACONTE.slug}`} variante="sombre">Voir la page du chantier</Bouton>
          </Apparition>
        </div>
      </section>

      {/* ---------- Une page par chantier ---------- */}
      <section id="chantiers" className="scroll-mt-24 mx-auto max-w-7xl space-y-14 px-5 py-24 sm:px-8 md:py-32">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div className="space-y-6">
            <Apparition><Surtitre>Nos chantiers</Surtitre></Apparition>
            <Titre texte="Chaque chantier a *sa page.*" />
          </div>
          <Apparition as="p" delai={200} className="text-xl leading-relaxed text-[var(--doux)]">
            La taille, la durée des travaux, le prix payé, et le film. Exactement ce que tu tapes
            sur Google avant d&apos;appeler un pisciniste : « piscine coque 8x4 prix ».
          </Apparition>
        </div>
        <ul className="grid gap-5 md:grid-cols-3">
          {chantiers.map((c, i) => (
            <Apparition as="li" key={c.slug} delai={i * 130} de="zoom">
              <CarteChantier chantier={c} />
            </Apparition>
          ))}
        </ul>
      </section>

      {/* ---------- Ma date : les semaines de chantier ---------- */}
      <section id="date" className="scroll-mt-20 px-3 sm:px-5">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
          <div className="mx-auto max-w-6xl space-y-12 px-5 py-24 sm:px-10 md:py-32">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
              <div className="space-y-6">
                <Apparition><Surtitre clair>Ma date</Surtitre></Apparition>
                <Titre texte={"Chantiers 2027 : *les dates, une par une.*"} clair />
              </div>
              <Apparition as="p" delai={200} className="text-xl leading-relaxed">
                Pas de formulaire de quatorze champs. Tu choisis ta semaine, tu la bloques, on
                vient faire la visite technique.
              </Apparition>
            </div>
            <Creneaux />
          </div>
        </div>
      </section>

      {/* ---------- Quatre étapes ---------- */}
      <section className="mx-auto max-w-7xl space-y-14 px-5 py-24 sm:px-8 md:py-32">
        <div className="space-y-6">
          <Apparition><Surtitre>Comment ça se passe</Surtitre></Apparition>
          <Titre texte="Quatre étapes, *aucune surprise.*" />
        </div>
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {methode.map((m, i) => (
            <Apparition as="li" key={m.titre} delai={i * 110} className="h-full">
              <CarteLueur className="h-full rounded-[2rem] border border-[var(--trait)] bg-[var(--carte)]">
                <div className="flex h-full flex-col gap-4 p-7">
                  <p className="flex items-center justify-between">
                    <span className="font-[family-name:var(--titres)] text-5xl font-bold tabular-nums text-[var(--accent-texte)]">{String(i + 1).padStart(2, "0")}</span>
                    <span className="rounded-full bg-[var(--fond)] px-3 py-1 text-[14px] font-bold">{m.duree}</span>
                  </p>
                  <h3 className="text-2xl font-bold">{m.titre}</h3>
                  <p className="leading-relaxed text-[var(--doux)]">{m.texte}</p>
                </div>
              </CarteLueur>
            </Apparition>
          ))}
        </ol>
        <Apparition>
          <Link href={`${DOSSIER}/ma-date`} className="font-[family-name:var(--titres)] text-lg font-bold text-[var(--accent-texte)] underline underline-offset-4">
            Réserver la visite technique →
          </Link>
        </Apparition>
      </section>

      {/* ---------- Questions ---------- */}
      <section id="questions" className="scroll-mt-24 border-t border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[0.75fr_1.25fr]">
          <div className="space-y-6">
            <Apparition><Surtitre>Questions</Surtitre></Apparition>
            <Titre texte="Avant le *premier appel.*" taille="moyen" />
            <Apparition className="relative mt-4 hidden aspect-[4/5] overflow-hidden rounded-[2rem] lg:block">
              <Image src={photos.bouee.src} alt={photos.bouee.alt} fill sizes="30vw" className="object-cover" />
            </Apparition>
          </div>
          <Apparition delai={150} className="space-y-8">
            <Accordeon questions={questions.slice(0, 7).map((q) => ({ question: q.q, reponse: q.r }))} />
            <Bouton href={`${DOSSIER}/questions`} variante="sombre">Toutes les questions</Bouton>
          </Apparition>
        </div>
      </section>

      <AppelFinal />
    </main>
  );
}
