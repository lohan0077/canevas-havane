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
import { AppelFinal, Bouton, Ruban, Surtitre } from "./_composants/Blocs";
import EnvoyerRecette from "./_composants/EnvoyerRecette";
import Fiche from "./_composants/Fiche";
import Invites from "./_composants/Invites";
import Rappel from "./_composants/Rappel";
import Samedi from "./_composants/Samedi";
import { DOSSIER, ETAPES, FICHES, GATEAUX, PHOTOS, QUESTIONS, QUESTIONS_APPEL, RAPPEL, SAMEDI } from "./_composants/donnees";

export const metadata: Metadata = {
  title: "Gâteaux Perdus — pâtisserie, site de démonstration",
  description:
    "Le site d'une pâtisserie imaginaire : envoie-nous la photo de la recette de ta grand-mère, même tachée, on la refait. Et pour tes fêtes : vous serez combien ? Le gâteau pour vingt, avec son prix.",
  ...adressesDeLaPage("/exemples/gateaux-perdus"),
};

export default function GateauxPerdus() {
  return (
    <main>
      {/* ---------- Premier écran, en deux moitiés : l'affiche, et la cuisine ---------- */}
      <section className="relative isolate grid min-h-[100svh] lg:grid-cols-[1.25fr_0.75fr]">
        <div className="relative flex flex-col justify-end gap-8 px-5 pb-12 pt-32 sm:px-8 lg:pb-16 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))] lg:pr-12">
          <Apparition><Surtitre>Pâtisserie · ceux qu&apos;on croyait perdus</Surtitre></Apparition>
          <TitreRevele
            as="h1"
            auChargement
            texte={"Le gâteau de ta grand\u2011mère. *Encore une fois.*"}
            className="text-[clamp(3.4rem,6.6vw,7.4rem)] leading-[0.92] tracking-[-0.025em]"
            classeAccent="italic text-[var(--accent-texte)]"
          />
          <Apparition as="p" delai={500} className="max-w-md text-xl leading-relaxed text-[var(--doux)]">
            On ne vend pas nos recettes. On refait la sienne — celle qu&apos;elle n&apos;a jamais écrite
            en entier. Une photo de sa fiche suffit. Même tachée.
          </Apparition>
          <Apparition delai={700} className="flex flex-wrap items-center gap-5">
            <Bouton href={`${DOSSIER}#envoyer`}>Envoie-nous sa recette</Bouton>
            <Link href={`${DOSSIER}#invites`} className="font-[family-name:var(--f-caveat)] text-2xl text-[var(--accent-texte)] underline decoration-1 underline-offset-4">
              ou : vous serez combien&nbsp;?
            </Link>
          </Apparition>
        </div>
        <div className="relative min-h-[70svh] lg:min-h-0">
          <div className="absolute inset-0 overflow-hidden bg-[var(--sombre)] lg:rounded-bl-[4rem]">
            <PhotoCinema src={PHOTOS.farineLivre.src} alt="" priority origine="45% 55%" sizes="(min-width: 1024px) 40vw, 100vw" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(61,29,19,0)_55%,rgba(61,29,19,0.55)_100%)]" />
          </div>
          <Apparition de="zoom" delai={900} className="absolute bottom-8 left-5 z-10 w-[min(78%,330px)] sm:left-8 lg:-left-28 lg:bottom-16">
            <Ruban className="-top-3 left-8 -rotate-6" />
            <Fiche fiche={FICHES[0]} angle={-5} />
          </Apparition>
        </div>
      </section>

      {/* ---------- Les questions du pâtissier, qui défilent ---------- */}
      <div className="border-y border-[var(--encre)] bg-[#F3D88A] py-5">
        <Defilant
          duree={44}
          separateur="✻"
          elements={[...QUESTIONS_APPEL, "Et il la refait.", "« C'est elle. »"]}
          classeElement="font-[family-name:var(--f-caveat)] text-3xl md:text-5xl whitespace-nowrap"
        />
      </div>

      {/* ---------- Vous serez combien ? ---------- */}
      <section id="invites" className="scroll-mt-20 mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32">
        <div className="mb-12 grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div className="space-y-6">
            <Apparition><Surtitre>Pour la fête</Surtitre></Apparition>
            <TitreRevele
              texte={"Vous serez *combien ?*"}
              className="text-[clamp(3.2rem,8vw,7.5rem)] leading-[0.9] tracking-[-0.025em]"
              classeAccent="italic text-[var(--accent-texte)]"
            />
          </div>
          <Apparition as="p" delai={200} className="text-xl leading-relaxed text-[var(--doux)]">
            Une seule question. Tu tapes vingt, le site te montre les gâteaux pour vingt — des
            recettes de famille retrouvées — avec leur prix et leurs allergènes.
          </Apparition>
        </div>
        <Apparition de="zoom">
          <Invites />
        </Apparition>
      </section>

      {/* ---------- Envoie-nous sa recette : la bande sombre ---------- */}
      <section id="envoyer" className="scroll-mt-16 px-3 sm:px-5">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
          <div aria-hidden="true" className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(233,183,192,0.25),transparent_65%)]" />
          <div className="relative mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-10 md:py-28 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="space-y-6">
              <Apparition><Surtitre clair>Un seul bouton</Surtitre></Apparition>
              <TitreRevele
                texte={"Envoie\u2011nous *sa recette.*"}
                className="text-[clamp(3.2rem,7.5vw,6.8rem)] leading-[0.9] tracking-[-0.025em]"
                classeAccent="italic text-[#F3D88A]"
              />
              <Apparition as="p" delai={200} className="max-w-md text-xl leading-relaxed">
                La photo de la fiche, du cahier, du dos d&apos;enveloppe. Même tachée, même
                incomplète. Le pâtissier t&apos;appelle, et il la refait.
              </Apparition>
              <Apparition as="ul" delai={300} className="space-y-1 font-[family-name:var(--f-caveat)] text-[28px] text-[#E9B7C0]">
                {QUESTIONS_APPEL.slice(0, 3).map((q) => <li key={q}>— {q}</li>)}
              </Apparition>
            </div>
            <Apparition de="droite" delai={150}>
              <EnvoyerRecette />
            </Apparition>
          </div>
        </div>
      </section>

      {/* ---------- De la fiche tachée à la première bouchée ---------- */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32">
        <div className="mb-6 space-y-6 md:mb-0">
          <Apparition><Surtitre>Comment ça marche</Surtitre></Apparition>
          <TitreRevele
            texte="De la fiche tachée *à la première bouchée.*"
            className="max-w-4xl text-[clamp(2.8rem,6vw,5.5rem)] leading-[0.95] tracking-[-0.02em]"
            classeAccent="italic text-[var(--accent-texte)]"
          />
        </div>
        <RecitColle
          etapes={ETAPES.map((e) => ({
            surtitre: e.surtitre,
            titre: e.titre,
            texte: <p>{e.texte}</p>,
            visuel: <Image src={PHOTOS[e.photo].src} alt={PHOTOS[e.photo].alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />,
          }))}
        />
      </section>

      {/* ---------- Le samedi : douze gâteaux, pas un de plus ---------- */}
      <section id="samedi" className="scroll-mt-16 bg-[var(--accent)] text-[var(--sur-accent)]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div className="space-y-6">
            <Apparition><p className="font-[family-name:var(--f-caveat)] text-[26px] leading-none">Le {SAMEDI.date}</p></Apparition>
            <TitreRevele
              texte="Douze gâteaux. *Pas un de plus.*"
              className="text-[clamp(3.2rem,8vw,7.2rem)] leading-[0.9] tracking-[-0.025em]"
              classeAccent="italic"
            />
            <Apparition as="p" delai={200} className="max-w-md text-xl leading-relaxed">
              Le samedi se commande en ligne. Le labo sort douze gâteaux ? Le site en vend douze.
              Quand c&apos;est complet, le samedi suivant est ouvert.
            </Apparition>
          </div>
          <Apparition de="zoom" delai={150}>
            <Samedi />
          </Apparition>
        </div>
      </section>

      {/* ---------- La seconde avant les bougies, et l'an prochain ---------- */}
      <section className="kit-grain relative isolate overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="relative min-h-[520px] overflow-hidden rounded-[2rem] lg:min-h-[680px]">
            <PhotoCinema src={PHOTOS.bougies.src} alt="" origine="50% 35%" sizes="(min-width: 1024px) 45vw, 100vw" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_45%,rgba(61,29,19,0.92)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 space-y-3 p-7 sm:p-9">
              <TitreRevele
                as="p"
                texte="Pas un gâteau. *La seconde avant les bougies.*"
                className="font-[family-name:var(--titres)] text-[clamp(2.4rem,4.5vw,3.8rem)] leading-[0.95]"
                classeAccent="italic text-[#F3D88A]"
              />
            </div>
          </div>
          <div className="space-y-8">
            <div className="space-y-5">
              <Apparition><Surtitre clair>À la livraison</Surtitre></Apparition>
              <TitreRevele
                texte={"Et l'an *prochain ?*"}
                className="text-[clamp(2.8rem,6vw,5.2rem)] leading-[0.92] tracking-[-0.02em]"
                classeAccent="italic text-[#E9B7C0]"
              />
              <Apparition as="p" delai={200} className="max-w-lg text-lg leading-relaxed">
                Le site pose une question, une seule, et la case n&apos;est jamais cochée d&apos;avance.
                Onze mois plus tard, si c&apos;est oui, un message : « {RAPPEL.prenom} a bientôt {RAPPEL.age + 1} ans.
                On refait {RAPPEL.court}&nbsp;? »
              </Apparition>
            </div>
            <Apparition de="droite" delai={150}>
              <Rappel />
            </Apparition>
          </div>
        </div>
      </section>

      {/* ---------- La vitrine : un bento de fiches et de gâteaux ---------- */}
      <section className="bg-[#F7E6CC]">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32">
          <div className="mb-12 grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
            <div className="space-y-6">
              <Apparition><Surtitre>La vitrine</Surtitre></Apparition>
              <TitreRevele
                texte="Leurs recettes, *épinglées.*"
                className="text-[clamp(3rem,7vw,6.5rem)] leading-[0.9] tracking-[-0.025em]"
                classeAccent="italic text-[var(--accent-texte)]"
              />
            </div>
            <Apparition as="p" delai={200} className="text-lg leading-relaxed text-[var(--doux)]">
              En vitrine, à côté des gâteaux, les vraies fiches des clients. Épinglées avec leur
              accord écrit, et seulement avec. Ici, des fiches inventées pour l&apos;exemple.
            </Apparition>
          </div>
          <ul className="grid gap-5 md:grid-cols-4 md:grid-rows-[260px_260px]">
            <Apparition as="li" de="zoom" className="md:col-span-2 md:row-span-2">
              <CarteLueur className="group h-full rounded-[2rem]">
                <Link href={`${DOSSIER}/gateaux#${GATEAUX[1].id}`} className="relative flex h-full min-h-[380px] flex-col justify-end overflow-hidden rounded-[2rem] bg-[var(--sombre)] p-7 text-[var(--sur-sombre)]">
                  <Image src={GATEAUX[1].photo.src} alt={GATEAUX[1].photo.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-[1.6s] group-hover:scale-[1.05]" />
                  <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(61,29,19,0)_40%,rgba(61,29,19,0.94)_100%)]" />
                  <span className="relative space-y-2">
                    <span className="block font-[family-name:var(--f-caveat)] text-2xl text-[#F3D88A]">d&apos;après la fiche de Mamie Jeanne</span>
                    <span className="block font-[family-name:var(--titres)] text-[clamp(2.2rem,4vw,3.4rem)] leading-none">{GATEAUX[1].nom}</span>
                  </span>
                </Link>
              </CarteLueur>
            </Apparition>
            {FICHES.slice(1, 3).map((f, i) => (
              <Apparition as="li" key={f.titre} delai={120 + i * 120} de="zoom" className="flex items-center justify-center px-3 py-4">
                <Fiche fiche={f} angle={i ? 2.5 : -3} punaise className="w-full" />
              </Apparition>
            ))}
            <Apparition as="li" delai={360} de="zoom" className="md:col-span-2">
              <Link href={`${DOSSIER}/la-vitrine`} className="group relative flex h-full min-h-[220px] items-end overflow-hidden rounded-[2rem] bg-[var(--sombre)] p-7 text-[var(--sur-sombre)]">
                <Image src={PHOTOS.gateauPommes.src} alt={PHOTOS.gateauPommes.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover opacity-80 transition-transform duration-[1.6s] group-hover:scale-[1.05]" />
                <span className="absolute inset-0 bg-[linear-gradient(90deg,rgba(61,29,19,0.94)_0%,rgba(61,29,19,0.5)_60%,rgba(61,29,19,0)_100%)]" />
                <span className="relative flex w-full items-end justify-between gap-4">
                  <span className="font-[family-name:var(--titres)] text-3xl leading-tight">Toute la vitrine</span>
                  <span aria-hidden="true" className="grid h-12 w-12 place-items-center rounded-full bg-[#F3D88A] text-[var(--encre)] transition-transform group-hover:-rotate-45">→</span>
                </span>
              </Link>
            </Apparition>
          </ul>
        </div>
      </section>

      {/* ---------- Le prix, en gros, et les allergènes ---------- */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32">
        <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <Apparition de="zoom" className="relative overflow-hidden rounded-[2.5rem] bg-[#F3D88A] p-8 sm:p-12">
            <p className="text-[12px] font-bold uppercase tracking-[0.18em]">Une recette refaite · prix d&apos;exemple</p>
            <p className="mt-6 font-[family-name:var(--titres)] leading-[0.85] tabular-nums">
              <span className="block text-[clamp(6rem,15vw,12rem)]">38&nbsp;€</span>
              <span className="block text-[clamp(2.4rem,5vw,4rem)] italic">le premier.</span>
            </p>
            <p className="mt-8 max-w-md text-lg leading-relaxed">
              Le premier gâteau refait, essais compris, pour six parts. Ensuite, il entre dans tes
              commandes au prix d&apos;un gâteau de la vitrine.
            </p>
          </Apparition>
          <div className="grid gap-5">
            <Apparition delai={150} className="rounded-[2.5rem] border border-[var(--trait)] bg-[var(--carte)] p-8">
              <p className="font-[family-name:var(--titres)] text-3xl">Et ses allergènes&nbsp;?</p>
              <p className="mt-3 text-lg leading-relaxed text-[var(--doux)]">
                Établis avec toi au téléphone, d&apos;après ce que contenait la recette, et écrits sur sa
                fiche avant la commande. La couronne de Jeanne : gluten, œufs, lait.
              </p>
            </Apparition>
            <Apparition delai={300} className="flex flex-col justify-between gap-6 rounded-[2.5rem] bg-[var(--sombre)] p-8 text-[var(--sur-sombre)]">
              <p className="font-[family-name:var(--titres)] text-3xl">Chaque gâteau, de 6 à 30 parts, avec ses 14 allergènes.</p>
              <Bouton href={`${DOSSIER}/gateaux`} variante="beurre">Voir les gâteaux</Bouton>
            </Apparition>
          </div>
        </div>
      </section>

      {/* ---------- Questions ---------- */}
      <section id="questions" className="scroll-mt-24 mx-auto grid max-w-7xl gap-12 px-5 pb-24 sm:px-8 md:pb-32 lg:grid-cols-[0.7fr_1.3fr]">
        <div className="space-y-6">
          <Apparition><Surtitre>Questions</Surtitre></Apparition>
          <TitreRevele
            texte="Avant d'envoyer *la photo.*"
            className="text-[clamp(2.8rem,5.5vw,5rem)] leading-[0.95] tracking-[-0.02em]"
            classeAccent="italic text-[var(--accent-texte)]"
          />
        </div>
        <Apparition delai={150}>
          <Accordeon questions={QUESTIONS.map((q) => ({ question: q.q, reponse: q.r }))} />
        </Apparition>
      </section>

      <AppelFinal />
    </main>
  );
}
