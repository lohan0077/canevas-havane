import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import Accordeon from "../_kit/Accordeon";
import Apparition from "../_kit/Apparition";
import CarteLueur from "../_kit/CarteLueur";
import Defilant from "../_kit/Defilant";
import PhotoCinema from "../_kit/PhotoCinema";
import TitreRevele from "../_kit/TitreRevele";
import { AppelFinal, Bouton, COINS, EtiquettePrix, Surtitre } from "./_composants/Blocs";
import Frigo from "./_composants/Frigo";
import Pastille from "./_composants/Pastille";
import Soirs from "./_composants/Soirs";
import Ticket from "./_composants/Ticket";
import { DOSSIER, atelierInfo, cabinet, photos, questions, rayons, reponse, seances, ticket, totalTicket } from "./_composants/donnees";

// Le site des deux vidéos des diététiciens. De « Créer une marque » : le nom, le ticket
// de caisse ligne par ligne, le rayon qu'on fait ensemble, l'atelier du samedi matin. De
// « Remplir l'agenda » : la seule question de l'accueil (qu'y a-t-il dans votre frigo ?),
// la page diététicienne ou nutritionniste, les rendez-vous du soir. Premier écran : un
// collage d'étal de marché, des photos collées comme des étiquettes.
export const metadata: Metadata = {
  title: "Rayon Frais — cabinet de diététique, site de démonstration",
  description:
    "Le site d'un cabinet de diététique imaginaire qui part de vos courses : votre ticket de caisse, une photo de votre frigo, un rayon fait ensemble. Zéro kilo promis, des séances jusqu'à 20 h 30.",
  ...adressesDeLaPage("/exemples/rayon-frais"),
};

const BARRES = ["Un régime", "Des kilos promis", "Un avant-après", "Une liste d'aliments interdits"];
const TONS_RAYON = ["bg-[#F2C94C] text-[#1F3B24]", "bg-[var(--accent)] text-white", "bg-[var(--sombre)] text-[var(--sur-sombre)]"];

export default function RayonFrais() {
  return (
    <main>
      {/* ---------- Premier écran : l'étal ---------- */}
      <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[var(--fond)]">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_80%_35%,rgba(242,201,76,0.35),transparent_70%),radial-gradient(35%_35%_at_10%_90%,rgba(194,64,42,0.12),transparent_70%)]" />
        <div className="mx-auto grid w-full max-w-7xl flex-1 items-center gap-12 px-5 pb-14 pt-28 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:pt-32">
          <div className="space-y-7">
            <Apparition><Surtitre>Diététicienne diplômée · {cabinet.dieteticienne}</Surtitre></Apparition>
            <TitreRevele
              as="h1"
              auChargement
              texte={"On part de *vos\u00a0courses.*"}
              className="text-[clamp(3.6rem,9.6vw,9.4rem)] font-bold leading-[0.86] tracking-[-0.035em]"
              classeAccent="text-[var(--accent-texte)]"
            />
            <Apparition as="p" delai={450} className="max-w-xl text-xl leading-relaxed">
              Pas un régime. À la première séance, vous venez avec votre ticket de caisse et une
              photo de votre frigo. Ensuite, si vous voulez, on va au rayon ensemble.
            </Apparition>
            <Apparition delai={650} className="flex flex-wrap gap-3">
              <Bouton href={`${DOSSIER}/reserver`}>Réserver un soir</Bouton>
              <Bouton href={`${DOSSIER}#frigo`} variante="contour">Votre frigo</Bouton>
            </Apparition>
            <Apparition as="ul" delai={800} className="flex flex-wrap gap-2 text-[15px] font-semibold">
              {["Zéro kilo promis", "Pas d'avant-après", "Séances jusqu'à 20 h 30"].map((t) => (
                <li key={t} className="rounded-full border-2 border-[var(--encre)] px-3.5 py-1.5">{t}</li>
              ))}
            </Apparition>
          </div>

          {/* Le collage : trois photos collées, un ticket, une pastille. */}
          <div className="relative mx-auto h-[420px] w-full max-w-[560px] sm:h-[560px] lg:h-[620px]">
            <Apparition de="zoom" delai={200} className="absolute left-0 top-4 w-[64%] rotate-[-4deg] border-[10px] border-white bg-white shadow-[0_30px_60px_-30px_rgba(31,59,36,0.6)]">
              <div className="relative aspect-[4/3]">
                <Image src={photos.cagettes.src} alt={photos.cagettes.alt} fill priority sizes="(min-width: 1024px) 360px, 64vw" className="object-cover" />
              </div>
            </Apparition>
            <Apparition de="zoom" delai={380} className="absolute right-0 top-0 w-[44%] rotate-[5deg] border-[10px] border-white bg-white shadow-[0_30px_60px_-30px_rgba(31,59,36,0.6)]">
              <div className="relative aspect-[3/4]">
                <Image src={photos.legumes.src} alt={photos.legumes.alt} fill priority sizes="(min-width: 1024px) 250px, 44vw" className="object-cover" />
              </div>
            </Apparition>
            <Apparition de="zoom" delai={560} className="absolute bottom-6 right-[6%] w-[58%] rotate-[3deg] border-[10px] border-white bg-white shadow-[0_30px_60px_-30px_rgba(31,59,36,0.6)]">
              <div className="relative aspect-[3/2]">
                <Image src={photos.poivrons.src} alt={photos.poivrons.alt} fill sizes="(min-width: 1024px) 330px, 58vw" className="object-cover" />
              </div>
            </Apparition>
            <Apparition de="droite" delai={760} className="absolute bottom-0 left-[2%] w-[42%] max-w-[200px] rotate-[-6deg]">
              <div className="bg-white px-4 pb-5 pt-4 text-[12px] shadow-[0_24px_40px_-20px_rgba(31,59,36,0.7)] [clip-path:polygon(0_0,100%_0,100%_calc(100%-8px),90%_100%,80%_calc(100%-8px),70%_100%,60%_calc(100%-8px),50%_100%,40%_calc(100%-8px),30%_100%,20%_calc(100%-8px),10%_100%,0_calc(100%-8px))]">
                <p className="text-center font-bold tracking-[0.18em]">TICKET</p>
                <ul className="mt-2 space-y-0.5 border-y border-dashed border-[#BFB6A3] py-1.5 tabular-nums">
                  {ticket.slice(0, 4).map((l) => (
                    <li key={l.article} className="flex justify-between gap-2"><span>{l.article}</span><span>{l.prix}</span></li>
                  ))}
                </ul>
                <p className="mt-1 flex justify-between font-bold tabular-nums"><span>TOTAL</span><span>{totalTicket}</span></p>
              </div>
            </Apparition>
            <Apparition de="zoom" delai={900} className="absolute left-[40%] top-[38%]">
              <Pastille className="relative rotate-[-8deg]" id="rf-cercle-accueil" />
            </Apparition>
          </div>
        </div>
      </section>

      {/* ---------- Ce qu'on ne vend pas ---------- */}
      <div className="bg-[var(--accent)] py-5 text-white">
        <Defilant
          duree={40}
          separateur="●"
          elements={["Zéro kilo promis", "Pas d'avant-après", "Votre ticket de caisse", "Une photo de votre frigo", "Le mardi soir, 19 h 30", "Le rayon, si vous voulez", "Samedi matin, au rayon frais"]}
          classeElement="font-[family-name:var(--titres)] text-xl font-bold whitespace-nowrap md:text-2xl"
        />
      </div>

      {/* ---------- La seule question : le frigo ---------- */}
      <section id="frigo" className="scroll-mt-20 px-3 py-3 sm:px-5 sm:py-5">
        <div className="kit-grain relative isolate overflow-hidden rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
          <PhotoCinema src={photos.cuisine.src} alt="" origine="40% 50%" className="opacity-45" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(35,79,43,0.55),rgba(35,79,43,0.92)_60%)]" />
          <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-10 md:py-28 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="space-y-6 px-2">
              <Apparition><Surtitre>Sur l&apos;accueil, une seule question</Surtitre></Apparition>
              <TitreRevele
                texte={"Mardi, *19 h 30.* Frigo ouvert."}
                className="text-[clamp(3rem,6.4vw,5.8rem)] font-bold leading-[0.92] tracking-[-0.03em]"
                classeAccent="text-[#F2C94C]"
              />
              <Apparition as="p" delai={200} className="max-w-md text-xl leading-relaxed text-[var(--sur-sombre)]/90">
                Je ne vends pas un régime. Je pars de votre mardi soir : ce qu&apos;il y a dans le
                frigo, qui rentre à quelle heure, qui cuisine.
              </Apparition>
            </div>
            <Apparition de="zoom" delai={150}>
              <Frigo />
            </Apparition>
          </div>
        </div>
      </section>

      {/* ---------- Le ticket de caisse, ligne par ligne ---------- */}
      <section id="ticket" className="scroll-mt-20 mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32">
        <div className="mb-14 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div className="space-y-6">
            <Apparition><Surtitre>La première séance, au cabinet</Surtitre></Apparition>
            <TitreRevele
              texte="Venez avec votre *ticket de caisse.*"
              className="text-[clamp(2.8rem,6.4vw,5.8rem)] font-bold leading-[0.92] tracking-[-0.03em]"
              classeAccent="text-[var(--accent-texte)]"
            />
          </div>
          <Apparition as="p" delai={150} className="text-xl leading-relaxed text-[var(--doux)]">
            Et avec la photo de votre frigo. On part de là, ligne par ligne : les mêmes questions
            pour chaque ligne. On comprend, on ne juge pas.
          </Apparition>
        </div>
        <Apparition de="zoom">
          <Ticket />
        </Apparition>
      </section>

      {/* ---------- Les rayons ---------- */}
      <section id="rayons" className="scroll-mt-20 bg-white py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div className="space-y-6">
              <Apparition><Surtitre>Si vous voulez</Surtitre></Apparition>
              <TitreRevele
                as="h2"
                texte="On va au rayon *ensemble.*"
                className="text-[clamp(2.8rem,6.4vw,5.8rem)] font-bold leading-[0.92] tracking-[-0.03em]"
                classeAccent="text-[var(--accent-texte)]"
              />
            </div>
            <Apparition as="p" delai={150} className="text-xl leading-relaxed text-[var(--doux)]">
              Dans le magasin où vous faites vos courses, avec son accord. Vous choisissez le
              rayon ; on regarde ce qui part dans le caddie, sans faire la morale à personne.
            </Apparition>
          </div>
          <ul className="grid gap-4 md:grid-cols-6">
            <Apparition as="li" de="zoom" className="relative order-last min-h-[320px] overflow-hidden rounded-[2rem] md:order-first md:col-span-3 md:row-span-3">
              <Image src={photos.panier.src} alt={photos.panier.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
              <div className="absolute inset-x-4 bottom-4 rounded-[1.5rem] bg-white p-5">
                <p className="font-[family-name:var(--titres)] text-2xl font-bold">Séance au rayon</p>
                <p className="mt-1 text-[15px] text-[var(--doux)] [font-variant-numeric:lining-nums]">45 min · 50 € (exemple) · en individuel</p>
              </div>
            </Apparition>
            {rayons.map((r, i) => (
              <Apparition as="li" key={r.id} delai={120 + i * 120} className="md:col-span-3">
                <CarteLueur className="h-full rounded-[2rem]">
                  <Link href={`${DOSSIER}/rayons`} id={i === 0 ? "vers-rayons" : undefined} className={`group flex h-full items-center gap-5 rounded-[2rem] p-6 sm:p-7 ${TONS_RAYON[i]}`}>
                    <span aria-hidden="true" className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-white/90 text-4xl transition-transform duration-500 group-hover:rotate-[-8deg]">{r.emoji}</span>
                    <span className="flex-1">
                      <span className="block font-[family-name:var(--titres)] text-3xl font-bold">{r.nom}</span>
                      <span className="block text-[15px]">{r.moment}</span>
                    </span>
                    <span aria-hidden="true" className="text-2xl transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </CarteLueur>
              </Apparition>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Ce qui n'est pas vendu ici ---------- */}
      <section className="relative overflow-hidden bg-[#F2C94C] text-[#1F3B24]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-8">
            <Apparition><Surtitre ton="vert">Nulle part sur ce site</Surtitre></Apparition>
            <ul className="space-y-2">
              {BARRES.map((b, i) => (
                <Apparition as="li" key={b} delai={i * 150} className="font-[family-name:var(--titres)] text-[clamp(2.4rem,5.6vw,5rem)] font-bold leading-[1.02] tracking-[-0.02em]">
                  <span className="kit-barre">{b}</span>
                </Apparition>
              ))}
            </ul>
            <TitreRevele
              texte="Juste vos courses, *rayon par rayon.*"
              className="text-[clamp(1.8rem,3.4vw,2.8rem)] font-bold leading-[1.05]"
              classeAccent="text-[#A8321E]"
            />
          </div>
          <Apparition de="zoom" delai={300} className="relative mx-auto grid h-64 w-64 place-items-center">
            <Pastille className="relative scale-[1.9]" id="rf-cercle-promis" />
          </Apparition>
        </div>
      </section>

      {/* ---------- Les soirs ---------- */}
      <section id="soirs" className="scroll-mt-20 mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div className="space-y-7">
          <Apparition><Surtitre>Les rendez-vous du soir</Surtitre></Apparition>
          <TitreRevele
            texte={"Le mardi soir, *jusqu'à 20 h 30.*"}
            className="text-[clamp(2.8rem,6vw,5.4rem)] font-bold leading-[0.92] tracking-[-0.03em]"
            classeAccent="text-[var(--accent-texte)]"
          />
          <Apparition as="p" delai={150} className="max-w-md text-xl leading-relaxed text-[var(--doux)]">
            Parce que c&apos;est là que tout se joue, et que c&apos;est souvent le seul moment
            libre. On réserve directement ici : un soir, une heure, un nom, un téléphone.
          </Apparition>
          <Apparition delai={250}>
            <Bouton href={`${DOSSIER}/reserver`} variante="vert">La page des soirs</Bouton>
          </Apparition>
        </div>
        <Apparition de="zoom" delai={150}>
          <Soirs />
        </Apparition>
      </section>

      {/* ---------- Les prix, comme sur une étiquette ---------- */}
      <section id="tarifs" className="scroll-mt-20 bg-white py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-14 space-y-6">
            <Apparition><Surtitre>Tarifs · exemples, TTC</Surtitre></Apparition>
            <TitreRevele
              texte="Les prix, comme *sur une étiquette.*"
              className="text-[clamp(2.8rem,6.4vw,5.8rem)] font-bold leading-[0.92] tracking-[-0.03em]"
              classeAccent="text-[var(--accent-texte)]"
            />
          </div>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {seances.map((s, i) => (
              <Apparition as="li" key={s.id} delai={i * 120} de="zoom" className="drop-shadow-[0_20px_30px_rgba(31,59,36,0.18)]">
                <EtiquettePrix {...s} ton={(["jaune", "creme", "tomate", "vert"] as const)[i]} incline={[-2, 1.5, -1, 2][i]} />
              </Apparition>
            ))}
          </ul>
          <p className="mt-10 text-[var(--doux)]">Une facture à chaque séance. Prix d&apos;exemple : le cabinet est fictif.</p>
        </div>
      </section>

      {/* ---------- L'atelier du samedi ---------- */}
      <section className="px-3 py-3 sm:px-5 sm:py-5">
        <div className="relative isolate grid overflow-hidden rounded-[2.5rem] bg-[var(--accent)] text-white lg:grid-cols-2">
          <div className="relative min-h-[300px] lg:min-h-full">
            <PhotoCinema src={photos.cagettes.src} alt={photos.cagettes.alt} origine="30% 60%" sizes="(min-width: 1024px) 50vw, 100vw" />
          </div>
          <div className="space-y-7 px-6 py-16 sm:px-12 md:py-24">
            <Apparition><Surtitre>Pour le lancement · à six</Surtitre></Apparition>
            <TitreRevele
              texte="Samedi matin, *au rayon frais.*"
              className="text-[clamp(2.8rem,5.6vw,5.2rem)] font-bold leading-[0.92] tracking-[-0.03em]"
              classeAccent="text-[#F2C94C]"
            />
            <Apparition as="p" delai={150} className="max-w-md text-xl leading-relaxed">
              Un atelier pour apprendre à lire les étiquettes. On parle d&apos;étiquettes, jamais du
              cas de chacun.
            </Apparition>
            <Apparition delai={250} className={`inline-grid grid-cols-3 gap-px bg-white/40 [font-variant-numeric:lining-nums] ${COINS}`}>
              {[[atelierInfo.date.replace("Samedi ", ""), "samedi"], [atelierInfo.heure, atelierInfo.duree], [`${atelierInfo.places} places`, `${atelierInfo.prix} · exemple`]].map(([fort, doux]) => (
                <div key={fort} className="bg-[#A8321E] px-4 py-3">
                  <p className="font-[family-name:var(--titres)] text-lg font-bold leading-tight">{fort}</p>
                  <p className="text-[13px]">{doux}</p>
                </div>
              ))}
            </Apparition>
            <Apparition delai={350}>
              <Bouton href={`${DOSSIER}/atelier`} variante="creme">Tout sur l&apos;atelier</Bouton>
            </Apparition>
          </div>
        </div>
      </section>

      {/* ---------- La diététicienne, et son titre ---------- */}
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div className="space-y-7">
          <Apparition><Surtitre>La question que tout le monde tape</Surtitre></Apparition>
          <TitreRevele
            texte="Diététicienne ou *nutritionniste ?*"
            className="text-[clamp(2.6rem,5.6vw,5rem)] font-bold leading-[0.95] tracking-[-0.03em]"
            classeAccent="text-[var(--accent-texte)]"
          />
          <Apparition as="p" delai={150} className="max-w-lg text-xl leading-relaxed text-[var(--doux)]">
            {reponse.court} Une page entière y répond, textes de loi à l&apos;appui.
          </Apparition>
          <Apparition delai={250}>
            <Bouton href={`${DOSSIER}/dieteticienne-ou-nutritionniste`} variante="vert">Lire la réponse</Bouton>
          </Apparition>
        </div>
        <Apparition de="zoom" delai={200} className="rotate-[2deg]">
          <div className={`bg-[var(--sombre)] p-8 text-[var(--sur-sombre)] sm:p-10 ${COINS}`}>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#F2C94C]">Mon diplôme</p>
            <p className="mt-3 font-[family-name:var(--titres)] text-4xl font-bold">{cabinet.dieteticienne}, diététicienne</p>
            <p className="mt-3 text-lg">{cabinet.diplome} (exemple)</p>
            <p className="text-lg [font-variant-numeric:lining-nums]">N° ADELI {cabinet.adeli} (exemple)</p>
            <p className="mt-6 border-t-2 border-dashed border-white/30 pt-4 text-[15px]">Code de la santé publique, art. L4371-2 et L4372-2 : un titre protégé par la loi.</p>
          </div>
        </Apparition>
      </section>

      {/* ---------- Questions ---------- */}
      <section id="questions" className="scroll-mt-24 border-t-2 border-dashed border-[var(--trait)]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="space-y-6">
            <Apparition><Surtitre>Questions</Surtitre></Apparition>
            <TitreRevele
              texte="Questions *de caisse.*"
              className="text-[clamp(2.6rem,5vw,4.6rem)] font-bold leading-[0.95] tracking-[-0.03em]"
              classeAccent="text-[var(--accent-texte)]"
            />
            <Apparition as="p" delai={150} className="text-[var(--doux)]">
              {cabinet.adresse}, {cabinet.ville} (exemple) · <span className="tabular-nums">{cabinet.telephone}</span>
            </Apparition>
          </div>
          <Apparition delai={150}>
            <Accordeon questions={questions.map((q) => ({ question: q.q, reponse: q.r }))} />
          </Apparition>
        </div>
      </section>

      <AppelFinal />
    </main>
  );
}
