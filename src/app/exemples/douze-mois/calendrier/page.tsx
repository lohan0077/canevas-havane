import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Accordeon from "../../_kit/Accordeon";
import Apparition from "../../_kit/Apparition";
import { AppelFinal, EnTetePage, Surtitre, Titre } from "../_composants/Blocs";
import { ABONNEMENT, MOIS, PHOTOS, PREMIERS, QUESTIONS, euros } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Les douze mois — Douze Mois, site de démonstration",
  description: "Le calendrier des fleurs de saison en France, mois par mois, d'une boutique de fleurs imaginaire : la fleur du mois, celles qui l'accompagnent, celle qui arrive et celle qui s'en va.",
  ...adressesDeLaPage("/exemples/douze-mois/calendrier"),
};

const deux = (n: number) => String(n).padStart(2, "0");

// L'année entière : les douze planches, la règle de la boutique, la vidéo du premier
// de chaque mois, le bouquet du mois — ce que l'accueil « carré » ne garde pas.
export default function LesDouzeMois() {
  return (
    <main>
      <EnTetePage surtitre="L'année entière" titre="Les douze *mois.*" photo={PHOTOS.tulipe} origine="40% 50%">
        Une fleur par mois, et celles qui l&apos;accompagnent. Calendrier indicatif : une saison
        avance ou recule selon la région et l&apos;année ; on le confirme chaque mois avec les producteurs.
      </EnTetePage>

      <section>
        <div className="mx-auto max-w-6xl space-y-14 px-6 py-28 md:py-40">
          <div className="space-y-5">
            <Apparition><Surtitre>Douze planches</Surtitre></Apparition>
            <Titre texte="Une fleur, *un mois.*" />
          </div>
          <ol className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-6">
            {MOIS.map((m, i) => {
              const photo = PHOTOS[m.photo];
              return (
                <Apparition as="li" key={m.n} delai={(i % 4) * 80} className="space-y-3" id={`mois-${m.n}`}>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[var(--sombre)]">
                    <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
                  </div>
                  <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-[var(--doux)]">{deux(m.n)} · {m.nom}</p>
                  <h2 className="text-[1.75rem] font-normal leading-tight">{m.fleur}</h2>
                  <p className="text-[15px] leading-relaxed text-[var(--doux)]">Aussi : {m.aussi.join(", ")}. Arrive : {m.arrive}.</p>
                </Apparition>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto grid max-w-6xl gap-14 px-6 py-28 md:py-40 lg:grid-cols-[1fr_1fr]">
          <div className="space-y-5">
            <Apparition><Surtitre clair>La règle</Surtitre></Apparition>
            <Titre texte="Une saison, des fleurs. *Le reste, on ne le vend pas.*" clair />
            <Apparition as="p" delai={150} className="max-w-[26rem] text-lg leading-relaxed">
              Quand il n&apos;y a presque rien, on le dit — et on fait de beaux bouquets avec ce qu&apos;il y a.
            </Apparition>
          </div>
          <ul className="divide-y divide-white/15 self-end border-y border-white/15">
            {["Des roses rouges en janvier", "Quarante bouquets nommés Tendresse", "Ce qui ne fleurit pas en France ce mois-ci"].map((t, i) => (
              <Apparition as="li" key={t} delai={i * 120} className="flex items-baseline gap-5 py-5">
                <span className="text-[12px] font-medium tracking-[0.2em]">{deux(i + 1)}</span>
                <span className="font-[family-name:var(--titres)] text-2xl"><span className="kit-barre">{t}</span></span>
              </Apparition>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl space-y-14 px-6 py-28 md:py-40">
          <div className="grid gap-8 lg:grid-cols-[1fr_minmax(0,26rem)] lg:items-end">
            <div className="space-y-5">
              <Apparition><Surtitre>Le premier de chaque mois</Surtitre></Apparition>
              <Titre texte="Celle qui arrive, *celle qui s'en va.*" />
            </div>
            <Apparition as="p" delai={150} className="text-lg leading-relaxed text-[var(--doux)]">
              Le premier de chaque mois, une courte vidéo : la fleur qui arrive en boutique, et celle qui
              nous quitte jusqu&apos;à l&apos;an prochain. Calendrier d&apos;exemple.
            </Apparition>
          </div>
          <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
            {PREMIERS.map((m) => (
              <li key={m.n} className="grid gap-1 py-5 sm:grid-cols-[12rem_1fr_1fr] sm:items-baseline sm:gap-8">
                <span className="text-[12px] font-medium uppercase tracking-[0.2em] text-[var(--doux)]">1er {m.nom.toLowerCase()}</span>
                <span className="font-[family-name:var(--titres)] text-2xl">{m.fleur}</span>
                <span className="text-[15px] text-[var(--doux)]">Arrive : {MOIS[(m.n + 10) % 12].arrive} · s&apos;en va : {m.part}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-[var(--carte)]">
        <div className="mx-auto grid max-w-6xl gap-14 px-6 py-28 md:py-40 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-5">
            <Apparition><Surtitre>Le bouquet du mois</Surtitre></Apparition>
            <Titre texte="Douze bouquets *par an.*" />
            <Apparition as="p" delai={150} className="max-w-[26rem] text-lg leading-relaxed text-[var(--doux)]">
              Chaque premier samedi, le bouquet de la saison, à prendre en boutique ou livré dans la ville.
              On s&apos;arrête quand tu veux.
            </Apparition>
          </div>
          <div>
            <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
              {ABONNEMENT.map((a) => (
                <li key={a.nom} className="flex items-baseline justify-between gap-6 py-5">
                  <span>
                    <span className="block font-[family-name:var(--titres)] text-2xl">{a.nom}</span>
                    <span className="text-[15px] text-[var(--doux)]">{a.pour}</span>
                  </span>
                  <span className="font-[family-name:var(--titres)] text-2xl tabular-nums">{euros(a.prix)}<span className="text-[15px] text-[var(--doux)]"> / mois</span></span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[13px] text-[var(--doux)]">Prix TTC d&apos;exemple. Livraison dans la ville : 6 €.</p>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto grid max-w-6xl gap-14 px-6 py-28 md:py-40 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-5">
            <Apparition><Surtitre>Questions</Surtitre></Apparition>
            <Titre texte="Et quand il n'y a *presque rien ?*" />
          </div>
          <Apparition delai={150}>
            <Accordeon nom="questions-calendrier" questions={QUESTIONS.slice(4).map((q) => ({ question: q.q, reponse: q.r }))} />
          </Apparition>
        </div>
      </section>
      <AppelFinal />
    </main>
  );
}
