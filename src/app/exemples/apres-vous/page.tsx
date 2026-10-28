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
import { ACCENT, Affiche, AppelFinal, Bouton, PetitMot, Surtitre } from "./_composants/Blocs";
import Depart from "./_composants/Depart";
import Grille from "./_composants/Grille";
import Rapport from "./_composants/Rapport";
import { DOSSIER, PREUVES, PRESTATIONS, QUESTIONS, RECIT, entreprise, photos } from "./_composants/donnees";

export const metadata: Metadata = {
  title: "Après Vous — nettoyage de bureaux, site de démonstration",
  description:
    "Le site d'une entreprise de nettoyage de bureaux imaginaire : ceux qui passent après vous, le soir. L'équipe du soir, le rapport de passage chaque soir, et le prix en ligne, hors taxes.",
  ...adressesDeLaPage("/exemples/apres-vous"),
};

const TITRE = "font-[family-name:var(--titres)] font-normal leading-[0.95] tracking-[-0.015em]";

export default function ApresVous() {
  return (
    <main>
      {/* ---------- Premier écran : la ville derrière la vitre, et la politesse ---------- */}
      <section className="kit-grain relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <PhotoCinema src={photos.vitre.src} alt="" priority origine="55% 45%" className="opacity-55" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,18,34,0.78)_0%,rgba(11,18,34,0.45)_38%,rgba(11,18,34,0.6)_70%,#0B1222_100%)]" />
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[38%] h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(233,180,76,0.22),transparent)] blur-2xl" />
        <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-5 pb-12 pt-36 text-center sm:px-8">
          <Apparition><Surtitre>Nettoyage de bureaux · le soir</Surtitre></Apparition>
          <TitreRevele
            as="h1"
            auChargement
            texte="Après *vous.*"
            className="mt-8 font-[family-name:var(--titres)] text-[clamp(6rem,21vw,19rem)] font-normal leading-[0.8] tracking-[-0.03em]"
            classeAccent={ACCENT}
          />
          <TitreRevele
            as="p"
            auChargement
            delai={450}
            texte={"Une politesse. Et la vérité : *on arrive quand vous partez.*"}
            className="mt-8 max-w-3xl font-[family-name:var(--titres)] text-[clamp(1.7rem,3.4vw,2.8rem)] leading-[1.12]"
            classeAccent={ACCENT}
          />
          <Apparition delai={800} className="mt-10 flex flex-wrap justify-center gap-3">
            <Bouton href={`${DOSSIER}/prix`}>Votre prix, tout de suite</Bouton>
            <Bouton href={`${DOSSIER}/l-equipe-du-soir`} variante="filet">L&apos;équipe du soir</Bouton>
          </Apparition>
        </div>
        <Apparition as="ul" delai={1000} className="relative mx-auto grid w-full max-w-6xl grid-cols-1 border-t border-white/15 px-5 sm:grid-cols-3 sm:px-8">
          {[
            ["Le soir, après vous", "tous nos contrats, sans exception"],
            ["Un rapport, chaque soir", "ce qui a été fait, ce qu'on a remarqué"],
            ["Le prix en ligne, HT", "votre surface, vos passages, tout de suite"],
          ].map(([fort, doux], i) => (
            <li key={fort} className={`flex flex-col gap-1 py-5 sm:px-6 ${i > 0 ? "border-t border-white/15 sm:border-l sm:border-t-0" : "sm:pl-0"}`}>
              <span className="font-[family-name:var(--titres)] text-2xl italic">{fort}</span>
              <span className="text-[14px] text-[var(--sur-sombre)]/90">{doux}</span>
            </li>
          ))}
        </Apparition>
      </section>

      {/* ---------- Le soir, en défilé ---------- */}
      <div className="bg-[var(--accent)] py-5 text-[var(--sur-accent)]">
        <Defilant
          duree={44}
          separateur="◆"
          elements={["19 h 40 · on arrive", "14 bureaux", "les sanitaires", "les poubelles et le tri", "un store bloqué : signalé", "une fuite sous l'évier : signalée", "21 h 05 · alarme remise", "le petit mot, sur l'accueil"]}
          classeElement="whitespace-nowrap font-[family-name:var(--titres)] text-2xl italic md:text-3xl"
        />
      </div>

      {/* ---------- Pas du propre ---------- */}
      <section className="mx-auto grid max-w-6xl gap-14 px-5 py-24 sm:px-8 md:py-36 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="space-y-8">
          <Apparition><Surtitre>Ce qu&apos;on vend</Surtitre></Apparition>
          <Apparition as="p" className="text-lg text-[var(--doux)]">Toutes les entreprises de nettoyage ont le même nom&nbsp;:</Apparition>
          <ul className="space-y-1 font-[family-name:var(--titres)] text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.05] text-[var(--doux)]">
            {["Net ·····", "Clean ·····", "····· Pro Services"].map((n, i) => (
              <Apparition as="li" key={n} delai={i * 160}>
                <span className="kit-barre">{n}</span>
              </Apparition>
            ))}
          </ul>
          <TitreRevele
            texte="Nous, on vend *ceux qui passent après vous.*"
            className={`text-[clamp(3rem,6.5vw,5.6rem)] ${TITRE}`}
            classeAccent={ACCENT}
          />
          <Apparition as="p" delai={200} className="max-w-xl text-lg leading-relaxed text-[var(--doux)]">
            Pas du propre&nbsp;: des gens de confiance, dans vos bureaux, la nuit — quand vous avez éteint la lumière.
          </Apparition>
        </div>
        <Apparition de="rideau" className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-t-full border border-[var(--trait)]">
          <Image src={photos.nuit.src} alt={photos.nuit.alt} fill sizes="(min-width: 1024px) 440px, 90vw" className="object-cover" />
        </Apparition>
      </section>

      {/* ---------- Vous partez à quelle heure ? ---------- */}
      <section className="border-y border-[var(--trait)] bg-[var(--sombre)]">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="space-y-6 lg:sticky lg:top-28">
            <Apparition><Surtitre>Votre soir, le nôtre</Surtitre></Apparition>
            <TitreRevele texte={"Vous partez à *quelle heure ?*"} className={`text-[clamp(3rem,6vw,5.4rem)] ${TITRE}`} classeAccent={ACCENT} />
            <Apparition as="p" delai={150} className="max-w-md text-lg leading-relaxed text-[var(--doux)]">
              Glissez l&apos;heure où la dernière lumière s&apos;éteint&nbsp;: la soirée de l&apos;équipe se cale dessus. Rien
              ne se fait pendant que vous êtes là.
            </Apparition>
          </div>
          <Apparition de="zoom"><Depart /></Apparition>
        </div>
      </section>

      {/* ---------- Le rapport du soir : une bande sombre, arrondie ---------- */}
      <section className="px-3 py-24 sm:px-5 md:py-32">
        <div className="kit-grain relative overflow-hidden rounded-[2.5rem] border border-[var(--trait)] bg-[var(--carte)]">
          <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(111,183,168,0.18),transparent)]" />
          <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:px-10 md:py-28 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="space-y-6 lg:sticky lg:top-28 lg:self-start">
              <Apparition><Surtitre>Chaque soir, avant 21 h 30</Surtitre></Apparition>
              <TitreRevele texte="Le rapport *de passage.*" className={`text-[clamp(3rem,6.5vw,5.8rem)] ${TITRE}`} classeAccent={ACCENT} />
              <Apparition as="p" delai={150} className="max-w-md text-lg leading-relaxed text-[var(--doux)]">
                Arrivée 19 h 40. Quatorze bureaux, les sanitaires, les poubelles. Et ce qu&apos;on a remarqué en passant&nbsp;: un
                store bloqué, une fuite sous l&apos;évier — signalés avant que vous les voyiez.
              </Apparition>
              <Apparition as="p" delai={250} className="max-w-md text-[15px] leading-relaxed text-[var(--doux)]">
                Il dit ce qui a été fait, jamais qui l&apos;a fait&nbsp;: «&nbsp;{entreprise.equipe}&nbsp;».
              </Apparition>
              <Apparition delai={300}><Bouton href={`${DOSSIER}/rapport-de-passage`}>Ouvrir le rapport de mardi</Bouton></Apparition>
            </div>
            <Apparition de="droite"><Rapport choixDuSoir={false} /></Apparition>
          </div>
        </div>
      </section>

      {/* ---------- Le soir, raconté ---------- */}
      <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8 md:pb-36">
        <div className="mb-6 space-y-6 md:mb-0">
          <Apparition><Surtitre>Un soir chez vous</Surtitre></Apparition>
          <TitreRevele texte="De la dernière lumière *au petit mot.*" className={`max-w-4xl text-[clamp(3rem,6.5vw,5.8rem)] ${TITRE}`} classeAccent={ACCENT} />
        </div>
        <RecitColle
          etapes={RECIT.map((r) => ({
            surtitre: r.moment,
            titre: r.titre,
            texte: <p>{r.texte}</p>,
            visuel: <Image src={photos[r.photo].src} alt={photos[r.photo].alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />,
          }))}
        />
      </section>

      {/* ---------- Ce qu'on fait, ce qu'on prouve : le bento ---------- */}
      <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8 md:pb-36">
        <div className="mb-12 grid gap-6 md:grid-cols-[1fr_0.8fr] md:items-end">
          <div className="space-y-6">
            <Apparition><Surtitre>Tout, sauf vos papiers</Surtitre></Apparition>
            <TitreRevele texte="Ce qui se voit *lundi matin.*" className={`text-[clamp(3rem,6vw,5.4rem)] ${TITRE}`} classeAccent={ACCENT} />
          </div>
          <Apparition as="p" delai={150} className="text-lg leading-relaxed text-[var(--doux)]">
            On ne remarque le nettoyage que le jour d&apos;un oubli. Alors on fait tout ce qui se voit, et on vous apporte les
            preuves de ce qui ne se voit pas.
          </Apparition>
        </div>
        <ul className="grid auto-rows-[minmax(220px,auto)] gap-4 md:grid-cols-6">
          {PRESTATIONS.map((p, i) => {
            const large = i === 0;
            return (
              <Apparition as="li" key={p.titre} delai={i * 90} de="zoom" className={large ? "md:col-span-4" : "md:col-span-2"}>
                <CarteLueur className="h-full rounded-[14px]">
                  <div className="relative flex h-full min-h-[240px] flex-col justify-end overflow-hidden rounded-[14px] border border-[var(--trait)] bg-[var(--carte)] p-6">
                    {p.photo && (
                      <>
                        <Image src={photos[p.photo].src} alt="" fill sizes="(min-width: 768px) 60vw, 100vw" className="object-cover opacity-45" />
                        <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(27,42,74,0.2)_0%,rgba(27,42,74,0.95)_75%)]" />
                      </>
                    )}
                    <span className="relative space-y-2">
                      <span className="block font-[family-name:var(--titres)] text-[34px] leading-tight">{p.titre}</span>
                      <span className="block max-w-md leading-relaxed text-[var(--sur-sombre)]/90">{p.texte}</span>
                    </span>
                  </div>
                </CarteLueur>
              </Apparition>
            );
          })}
          <Apparition as="li" delai={450} de="zoom" className="md:col-span-6">
            <div className="grid gap-px overflow-hidden rounded-[14px] border border-[var(--accent)] bg-[var(--accent)] sm:grid-cols-2 lg:grid-cols-4">
              {PREUVES.map((p, i) => (
                <div key={p.titre} className="space-y-2 bg-[var(--sombre)] p-6">
                  <p className="font-[family-name:var(--titres)] text-3xl italic text-[var(--accent-texte)] tabular-nums">0{i + 1}</p>
                  <p className="text-lg font-semibold">{p.titre}</p>
                  <p className="text-[15px] leading-relaxed text-[var(--doux)]">{p.texte}</p>
                </div>
              ))}
            </div>
          </Apparition>
        </ul>
      </section>

      {/* ---------- Le prix, tout de suite : la grille comme une application ---------- */}
      <section id="prix" className="scroll-mt-24 bg-[#F5F1E8] text-[#121C33] [--doux:#4B5568] [--accent-texte:#7A4E06] [--encre:#121C33]">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div className="space-y-6">
            <Apparition><Surtitre>Nos prix · hors taxes</Surtitre></Apparition>
            <TitreRevele texte="Votre prix, *tout de suite.*" className={`text-[clamp(3rem,6.5vw,5.8rem)] ${TITRE}`} classeAccent="italic text-[#7A4E06]" />
            <Apparition as="p" delai={150} className="max-w-md text-lg leading-relaxed text-[var(--doux)]">
              Vos acheteurs tapent «&nbsp;prix au mètre carré&nbsp;». Alors la grille est en ligne&nbsp;: votre surface, vos passages par
              semaine, et votre prix mensuel. Hors taxes, parce que nos clients sont des entreprises&nbsp;; le prix ferme vient au
              devis, après une visite.
            </Apparition>
            <Apparition delai={250}>
              <Link href={`${DOSSIER}/prix`} className="text-lg font-semibold underline decoration-[#E9B44C] decoration-2 underline-offset-8">Toute la grille, et ce qui est compris →</Link>
            </Apparition>
          </div>
          {/* La grille garde la nuit du site : elle se détache, comme une application. */}
          <Apparition de="droite" className="[--encre:#F5F1E8] [--doux:#B9C0CF] [--accent-texte:#E9B44C] text-[var(--encre)]">
            <Grille />
          </Apparition>
        </div>
      </section>

      {/* ---------- Le petit mot, et l'affiche ---------- */}
      <section className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-36">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <Apparition><Surtitre>Chaque matin</Surtitre></Apparition>
            <TitreRevele texte="Un petit mot *sur le bureau.*" className={`text-[clamp(3rem,6vw,5.4rem)] ${TITRE}`} classeAccent={ACCENT} />
            <Apparition as="p" delai={150} className="max-w-md text-lg leading-relaxed text-[var(--doux)]">
              L&apos;heure du passage, et ce qu&apos;on a remarqué. Signé de l&apos;équipe du soir, pas d&apos;un prénom&nbsp;: le mot dit
              ce qui a été fait, pas qui l&apos;a fait.
            </Apparition>
            <Apparition as="p" delai={250} className="max-w-md text-lg leading-relaxed text-[var(--doux)]">
              Et dans les halls de bureaux, une seule affiche, posée avec l&apos;accord du gestionnaire de l&apos;immeuble.
            </Apparition>
            <Apparition delai={300}><Bouton href={`${DOSSIER}/un-bureau-la-nuit`} variante="filet">Notre série&nbsp;: un bureau, la nuit</Bouton></Apparition>
          </div>
          <div className="relative grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-4">
            <Apparition de="bas" className="[clip-path:none]"><PetitMot /></Apparition>
            <Apparition de="bas" delai={200} className="[clip-path:none] sm:mt-24"><Affiche /></Apparition>
          </div>
        </div>
      </section>

      {/* ---------- Questions ---------- */}
      <section id="questions" className="scroll-mt-24 border-t border-[var(--trait)]">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[0.75fr_1.25fr]">
          <div className="space-y-6">
            <Apparition><Surtitre>Questions</Surtitre></Apparition>
            <TitreRevele texte="Ce qu'on *nous demande.*" className={`text-[clamp(3rem,5.5vw,4.8rem)] ${TITRE}`} classeAccent={ACCENT} />
            <Apparition de="rideau" className="relative mt-4 hidden aspect-[2/3] max-w-xs overflow-hidden rounded-t-full lg:block">
              <Image src={photos.lampe.src} alt={photos.lampe.alt} fill sizes="320px" className="object-cover" />
            </Apparition>
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
