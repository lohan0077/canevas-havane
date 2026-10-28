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
import { AppelFinal, Bouton, Surtitre } from "./_composants/Blocs";
import { QuestionSouvenir, RechercheLot, ReserverLot } from "./_composants/Interactifs";
import { Pain } from "./_composants/Pain";
import { CARNET_AU, DOSSIER, ETATS, FABRICATION, LOTS, PHOTOS, PHOTO_DU_SAVON, PRIX, PROCHAIN, QUESTIONS, SAVONS, dernierLot, savonDe } from "./_composants/donnees";

// L'accueil de Souvenance : la question de la vidéo « Créer une marque » (ça sentait
// quoi, chez toi, enfant ?) et le numéro de lot de « Remplir l'agenda », qui se tape
// ici même. Premier écran : le bois d'une vieille armoire qui respire, la question
// en Didone, centrée.
export const metadata: Metadata = {
  title: "Souvenance — savonnerie, site de démonstration",
  description:
    "Le site d'une savonnerie imaginaire : pas de type de peau, une seule question — ça sentait quoi, chez toi, enfant ? — et un numéro de lot qui dit le jour où ton savon a été coulé.",
  ...adressesDeLaPage("/exemples/souvenance"),
};

const SOUVENIRS = [
  "Le linge qui sèche au soleil",
  "L'armoire de ta grand-mère",
  "Le jardin après la pluie",
  "La cire sur les meubles",
  "La laine du pull du dimanche",
  "Le grenier en été",
  "Le savon du lavabo de l'école",
];

const AILLEURS = ["Peau sèche ?", "Mixte ?", "Sensible ?", "Grasse ?"];

export default function Souvenance() {
  const aVenir = LOTS.filter((l) => l.etat !== "epuise");
  return (
    <main>
      {/* ---------- Premier écran ---------- */}
      <section className="kit-grain relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <PhotoCinema src={PHOTOS.bois.src} alt="" priority origine="40% 60%" className="opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,rgba(42,24,32,0.35),rgba(42,24,32,0.88)_72%)]" />
        <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-5 pb-10 pt-32 text-center sm:px-8">
          <Apparition><Surtitre clair>Savons coulés à froid · fait main</Surtitre></Apparition>
          <TitreRevele
            as="h1"
            auChargement
            texte={"Ça sentait quoi, *chez toi ?*"}
            className="mt-7 font-[family-name:var(--titres)] text-[clamp(4rem,11.5vw,11.5rem)] leading-[0.88] tracking-[-0.03em]"
            classeAccent="italic text-[#E8C4BC]"
          />
          <Apparition as="p" delai={500} className="mt-8 max-w-xl text-[19px] leading-relaxed text-[var(--sur-sombre)]/90">
            On ne te demandera pas ton type de peau. Un souvenir d&apos;enfance, le savon qui sent comme lui — et sur
            chaque savon, un numéro qui raconte le jour où il a été coulé.
          </Apparition>
          <Apparition delai={700} className="mt-9 flex flex-wrap justify-center gap-3">
            <Bouton href={`${DOSSIER}#souvenir`}>Trouver ton savon</Bouton>
            <Bouton href={`${DOSSIER}#lot`} variante="contour">Taper mon numéro de lot</Bouton>
          </Apparition>
        </div>
        <Apparition as="ul" delai={900} className="relative mx-auto grid w-full max-w-6xl grid-cols-1 gap-3 px-5 pb-8 text-[15px] sm:grid-cols-3 sm:px-8">
          {[
            ["Pas de type de peau", "une seule question"],
            ["Un lot, un numéro", "96 savons, une date"],
            [`Lot ${PROCHAIN.numero}`, `sort ${PROCHAIN.sortie}`],
          ].map(([fort, doux]) => (
            <li key={fort} className="flex items-baseline justify-between gap-3 rounded-full border border-white/15 bg-[var(--sombre)]/70 px-5 py-3 backdrop-blur-md">
              <span className="font-[family-name:var(--titres)] text-[18px] italic">{fort}</span>
              <span className="text-[13px] text-[var(--sur-sombre)]/90">{doux}</span>
            </li>
          ))}
        </Apparition>
      </section>

      {/* ---------- Les souvenirs qui défilent ---------- */}
      <div className="bg-[var(--accent)] py-5 text-[var(--sur-accent)]">
        <Defilant
          duree={52}
          elements={SOUVENIRS}
          separateur="✦"
          classeElement="font-[family-name:var(--titres)] text-2xl italic whitespace-nowrap md:text-3xl"
        />
      </div>

      {/* ---------- Le contre-pied ---------- */}
      <section className="mx-auto max-w-6xl px-5 py-24 text-center sm:px-8 md:py-32">
        <Apparition><div className="flex justify-center"><Surtitre>Pas de type de peau</Surtitre></div></Apparition>
        <Apparition as="ul" delai={150} data-film="types-de-peau" className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-2 font-[family-name:var(--titres)] text-[clamp(2rem,5vw,4rem)] leading-none text-[var(--doux)]">
          {AILLEURS.map((a) => (
            <li key={a}><span className="kit-barre [background-image:linear-gradient(#8A4A5C,#8A4A5C)]">{a}</span></li>
          ))}
        </Apparition>
        <TitreRevele
          texte="Ici, on te demande *où tu as grandi.*"
          className="mx-auto mt-10 max-w-4xl font-[family-name:var(--titres)] text-[clamp(2.8rem,6.5vw,6rem)] leading-[0.98] tracking-[-0.02em]"
          classeAccent="italic text-[var(--accent-texte)]"
        />
        <Apparition as="p" delai={200} className="mx-auto mt-8 max-w-xl text-[19px] leading-relaxed text-[var(--doux)]">
          Un savon Souvenance ne promet rien à ta peau. Il porte un souvenir : une odeur que tu reconnaîtrais les yeux
          fermés. Et il te dit ce qu&apos;il contient.
        </Apparition>
      </section>

      {/* ---------- L'outil de « Créer une marque » : la question ---------- */}
      <section id="souvenir" className="scroll-mt-24 px-3 sm:px-5">
        <div className="mx-auto grid max-w-7xl gap-12 rounded-[2.5rem] bg-[#EADFCF] px-4 py-16 sm:px-10 md:py-24 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
          <div className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <Apparition><Surtitre>Une seule question</Surtitre></Apparition>
            <TitreRevele
              texte="Ton savon, *en une question.*"
              className="font-[family-name:var(--titres)] text-[clamp(2.8rem,5.5vw,5rem)] leading-[0.95] tracking-[-0.02em]"
              classeAccent="italic text-[var(--accent-texte)]"
            />
            <Apparition as="p" delai={150} className="text-[19px] leading-relaxed text-[#5A4450]">
              Trois souvenirs, trois savons. Tu choisis le tien : il arrive avec son nom, son odeur, son lot et son prix.
            </Apparition>
            <Apparition as="ol" delai={250} className="space-y-3 border-t border-[#D3C2AE] pt-6 text-[16px]">
              {["Tu choisis un souvenir", "Le savon arrive, avec son lot", "Tu le commandes, ou tu viens le sentir"].map((t, i) => (
                <li key={t} className="flex gap-4">
                  <span className="font-[family-name:var(--titres)] text-[22px] italic leading-none text-[var(--accent-texte)]">{i + 1}</span>
                  {t}
                </li>
              ))}
            </Apparition>
          </div>
          <Apparition de="zoom" delai={100}>
            <QuestionSouvenir />
          </Apparition>
        </div>
      </section>

      {/* ---------- L'outil de « Remplir l'agenda » : le numéro de lot ---------- */}
      <section id="lot" className="scroll-mt-20 px-3 pt-5 sm:px-5">
        <div className="kit-grain relative overflow-hidden rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-10 md:py-28 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div className="space-y-6 lg:sticky lg:top-28">
              <Apparition><Surtitre clair>Carnet au {CARNET_AU}</Surtitre></Apparition>
              <TitreRevele
                texte="Ton savon *a un numéro.*"
                className="font-[family-name:var(--titres)] text-[clamp(3rem,6.5vw,6rem)] leading-[0.92] tracking-[-0.02em]"
                classeAccent="italic text-[#E8C4BC]"
              />
              <Apparition as="p" delai={150} className="max-w-md text-[19px] leading-relaxed text-[var(--sur-sombre)]/90">
                Tape-le : tu vois le jour où ton savon a été coulé, quand il est sorti du séchoir, et ce qu&apos;il y a
                dedans.
              </Apparition>
              <Apparition as="p" delai={250} className="max-w-md border-l-2 border-[#C9A9A6] pl-4 text-[15px] leading-relaxed text-[var(--sur-sombre)]/90">
                Le numéro de lot est obligatoire sur tous les cosmétiques, comme la liste des ingrédients (règl. (CE)
                n° 1223/2009, art. 19). Ici, il sert aussi à retrouver l&apos;histoire de ton savon.
              </Apparition>
            </div>
            <Apparition de="droite" delai={100}>
              <RechercheLot />
            </Apparition>
          </div>
        </div>
      </section>

      {/* ---------- Les trois savons ---------- */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-36">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div className="space-y-6">
            <Apparition><Surtitre>Les savons · {PRIX} € TTC · exemple</Surtitre></Apparition>
            <TitreRevele
              texte="Trois souvenirs, *trois savons.*"
              className="font-[family-name:var(--titres)] text-[clamp(3rem,7vw,6.5rem)] leading-[0.92] tracking-[-0.02em]"
              classeAccent="italic text-[var(--accent-texte)]"
            />
          </div>
          <Apparition as="p" delai={200} className="text-[19px] leading-relaxed text-[var(--doux)]">
            Une même base d&apos;huile d&apos;olive et d&apos;huile de coco, et un souvenir. Sur chaque page, l&apos;odeur
            décrite, et l&apos;étiquette telle qu&apos;elle est imprimée.
          </Apparition>
        </div>
        <ul className="mt-16 grid gap-5 md:grid-cols-3">
          {SAVONS.map((s, i) => {
            const p = PHOTOS[PHOTO_DU_SAVON[s.slug]];
            const lot = dernierLot(s.slug);
            return (
              <Apparition as="li" key={s.slug} delai={i * 140} de="zoom">
                <CarteLueur className="group h-full rounded-t-[999px] rounded-b-[2rem]">
                  <Link href={`${DOSSIER}/savons#${s.slug}`} className="relative flex h-[520px] flex-col justify-end overflow-hidden rounded-t-[999px] rounded-b-[2rem] bg-[var(--sombre)] p-6 text-[var(--sur-sombre)] md:h-[600px]">
                    <Image src={p.src} alt={p.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover opacity-70 transition-transform duration-[1.4s] ease-out group-hover:scale-[1.07]" />
                    <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(42,24,32,0)_30%,rgba(42,24,32,0.94)_100%)]" />
                    <span className="relative mb-6 block w-[70%] self-center transition-transform duration-700 group-hover:-translate-y-2">
                      <Pain savon={s} lot={lot.numero} incline={[-5, 4, -3][i]} />
                    </span>
                    <span className="relative flex items-end justify-between gap-4">
                      <span className="space-y-1">
                        <span className="block font-[family-name:var(--titres)] text-[2rem] italic leading-tight">{s.nom}</span>
                        <span className="block text-[15px] text-[var(--sur-sombre)]/90">{s.odeur}</span>
                      </span>
                      <span aria-hidden="true" className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[var(--accent)] text-[var(--sur-accent)] transition-transform duration-500 group-hover:-rotate-45">→</span>
                    </span>
                  </Link>
                </CarteLueur>
              </Apparition>
            );
          })}
        </ul>
      </section>

      {/* ---------- Le séchoir, et le prochain lot ---------- */}
      <section id="prochain" className="scroll-mt-24 border-y border-[var(--trait)] bg-[var(--carte)] py-24 md:py-32">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_0.9fr]">
          <div className="space-y-6">
            <Apparition><Surtitre>Le séchoir</Surtitre></Apparition>
            <TitreRevele
              texte="Chaque lot a *sa date de sortie.*"
              className="font-[family-name:var(--titres)] text-[clamp(2.8rem,6vw,5.4rem)] leading-[0.95] tracking-[-0.02em]"
              classeAccent="italic text-[var(--accent-texte)]"
            />
            <Apparition as="p" delai={150} className="max-w-lg text-[19px] leading-relaxed text-[var(--doux)]">
              Un savon coulé à froid sèche cinq semaines avant d&apos;être vendu. Le jour où il est prêt, il part en
              ligne. Quand il est vendu, il est vendu.
            </Apparition>
            <Apparition as="ul" delai={250} className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
              {aVenir.map((l) => (
                <li key={l.numero} className="flex items-center gap-4 py-4">
                  <span className="h-9 w-9 shrink-0 rounded-[8px]" style={{ background: savonDe(l.savon).fond, outline: `1px solid ${savonDe(l.savon).bord}` }} aria-hidden="true" />
                  <span className="flex flex-1 flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                    <span>
                      <span className="font-[family-name:var(--titres)] text-[22px] tabular-nums">Lot {l.numero}</span>{" "}
                      <span className="text-[16px] italic">· {savonDe(l.savon).nom}</span>
                    </span>
                    <span className="text-[13px] font-semibold uppercase tracking-[0.12em]">{l.sortieCourte} · {ETATS[l.etat]}</span>
                  </span>
                </li>
              ))}
            </Apparition>
            <Apparition delai={300}>
              <Bouton href={`${DOSSIER}/sechoir`} variante="encre">Voir tout le séchoir</Bouton>
            </Apparition>
          </div>
          <Apparition de="zoom" delai={150}>
            <ReserverLot />
          </Apparition>
        </div>
      </section>

      {/* ---------- Saponifié à froid : le récit d'un lot ---------- */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-36">
        <div className="mb-10 grid gap-6 md:mb-4 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div className="space-y-6">
            <Apparition><Surtitre>Saponifié à froid, c&apos;est quoi&nbsp;?</Surtitre></Apparition>
            <TitreRevele
              texte="Un lot, *de la coulée au mercredi.*"
              className="max-w-4xl font-[family-name:var(--titres)] text-[clamp(2.8rem,6vw,5.4rem)] leading-[0.95] tracking-[-0.02em]"
              classeAccent="italic text-[var(--accent-texte)]"
            />
          </div>
          <Apparition delai={200} className="space-y-4">
            <p className="text-[19px] leading-relaxed text-[var(--doux)]">
              Des huiles et de la soude, mélangées sans chauffer, qui deviennent savon. La réponse complète est sur sa
              page.
            </p>
            <Bouton href={`${DOSSIER}/saponifie-a-froid`} variante="encre">Lire la réponse</Bouton>
          </Apparition>
        </div>
        <RecitColle
          etapes={FABRICATION.map((e) => ({
            surtitre: e.moment,
            titre: e.titre,
            texte: <p>{e.texte}</p>,
            visuel: <Image src={PHOTOS[e.photo].src} alt={PHOTOS[e.photo].alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />,
          }))}
        />
      </section>

      {/* ---------- L'affiche, et le prochain savon ---------- */}
      <section className="px-3 sm:px-5">
        <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
          <PhotoCinema src={PHOTOS.armoire.src} alt="" origine="50% 40%" className="opacity-35" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(42,24,32,0.96)_0%,rgba(42,24,32,0.8)_55%,rgba(42,24,32,0.55)_100%)]" />
          <div className="relative mx-auto max-w-6xl space-y-8 px-6 py-24 sm:px-10 md:py-36">
            <Apparition><Surtitre clair>L&apos;affiche du lancement</Surtitre></Apparition>
            <TitreRevele
              texte={"Chez ta grand-mère, ça sentait *quoi ?*"}
              className="max-w-4xl font-[family-name:var(--titres)] text-[clamp(3rem,7.5vw,7rem)] leading-[0.92] tracking-[-0.02em]"
              classeAccent="italic text-[#E8C4BC]"
            />
            <Apparition as="p" delai={200} className="max-w-lg text-[19px] leading-relaxed text-[var(--sur-sombre)]/90">
              Réponds-nous. L&apos;odeur la plus citée deviendra le prochain savon — après sa formule, son évaluation
              de sécurité et sa déclaration, comme pour tout cosmétique.
            </Apparition>
            <Apparition delai={300}>
              <Bouton href={`${DOSSIER}/prochain-savon`} variante="clair">Proposer une odeur</Bouton>
            </Apparition>
          </div>
        </div>
      </section>

      {/* ---------- Le nom ---------- */}
      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-24 sm:px-8 md:grid-cols-[0.8fr_1.2fr] md:items-center md:py-32">
        <Apparition de="zoom" className="relative mx-auto flex aspect-[3/4] w-full max-w-[420px] flex-col justify-between overflow-hidden rounded-t-[999px] rounded-b-[2rem] border border-[var(--trait)] bg-[var(--carte)] px-8 pb-10 pt-24 text-center">
          <span aria-hidden="true" className="font-[family-name:var(--titres)] text-[11rem] italic leading-[0.7] text-[var(--accent)]">S</span>
          <span className="space-y-3">
            <span className="block font-[family-name:var(--titres)] text-[34px] leading-none">souvenance</span>
            <span className="block text-[14px] uppercase tracking-[0.24em] text-[var(--doux)]">nom féminin · littéraire</span>
            <span className="block border-t border-[var(--trait)] pt-4 font-[family-name:var(--titres)] text-[22px] italic leading-snug">Souvenir. « J&apos;en ai gardé la souvenance. »</span>
          </span>
        </Apparition>
        <div className="space-y-6">
          <Apparition><Surtitre>Le nom</Surtitre></Apparition>
          <TitreRevele
            texte="Souvenance, *un vieux mot.*"
            className="font-[family-name:var(--titres)] text-[clamp(2.8rem,6vw,5.4rem)] leading-[0.95] tracking-[-0.02em]"
            classeAccent="italic text-[var(--accent-texte)]"
          />
          <Apparition as="p" delai={150} className="text-[19px] leading-relaxed">
            Il veut dire souvenir. On le trouve chez Balzac, et plus beaucoup ailleurs : un mot un peu oublié, comme
            l&apos;odeur de l&apos;armoire où ta grand-mère rangeait les draps.
          </Apparition>
          <Apparition as="p" delai={250} className="font-[family-name:var(--titres)] text-[30px] italic text-[var(--accent-texte)]">
            Ça sentait comme ça, chez toi.
          </Apparition>
        </div>
      </section>

      {/* ---------- Questions ---------- */}
      <section id="questions" className="scroll-mt-24 border-t border-[var(--trait)]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="space-y-6">
            <Apparition><Surtitre>Questions</Surtitre></Apparition>
            <TitreRevele
              texte="Avant de *choisir.*"
              className="font-[family-name:var(--titres)] text-[clamp(2.8rem,5vw,4.6rem)] leading-[0.95] tracking-[-0.02em]"
              classeAccent="italic text-[var(--accent-texte)]"
            />
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
