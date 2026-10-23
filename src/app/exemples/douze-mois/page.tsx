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
import { AppelFinal, Arche, Bouton, HeureLimite, Surtitre } from "./_composants/Blocs";
import Calendrier from "./_composants/Calendrier";
import ChoixMessage from "./_composants/ChoixMessage";
import MoisCourant from "./_composants/MoisCourant";
import MotRevele from "./_composants/MotRevele";
import Frise from "./_composants/Frise";
import { ABONNEMENT, DOSSIER, GESTES, MOIS, PHOTOS, PREMIERS, QUESTIONS, boutique, euros } from "./_composants/donnees";

export const metadata: Metadata = {
  title: "Douze Mois — boutique de fleurs, site de démonstration",
  description:
    "Le site d'une boutique de fleurs imaginaire qui ne vend que ce qui fleurit en France ce mois-ci : c'est pour dire quoi ? Le bouquet de la saison, la phrase écrite à la main, livré le jour même avant 14 h.",
  ...adressesDeLaPage("/exemples/douze-mois"),
};

export default function DouzeMois() {
  return (
    <main>
      {/* ---------- Premier écran : le nom, et deux planches en arche ---------- */}
      <section className="kit-grain relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div aria-hidden="true" className="absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(242,201,76,0.22),transparent_65%)]" />
        <div aria-hidden="true" className="absolute -bottom-52 -left-40 h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,rgba(232,110,146,0.18),transparent_65%)]" />
        <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end gap-8 px-5 pb-10 pt-28 sm:px-8 md:pb-14">
          <Frise />
          <Apparition className="flex flex-wrap items-center justify-between gap-4">
            <Surtitre clair>Fleurs de saison, rien d&apos;autre</Surtitre>
            <p className="font-[family-name:var(--titres)] text-xl italic">
              Ce mois-ci : <MoisCourant />
            </p>
          </Apparition>

          <h1 className="font-normal leading-[0.84] tracking-[-0.045em] text-[clamp(6rem,26vw,13.5rem)]">
            <span className="flex items-end gap-[0.12em]">
              <MotRevele texte="Douze" />
              <Apparition as="span" de="rideau" delai={500} className="mb-[0.06em] inline-block">
                <Arche src={PHOTOS.mimosa.src} origine="50% 30%" className="h-[0.86em] w-[0.6em]" />
              </Apparition>
            </span>
            <span className="flex items-end justify-end gap-[0.12em] sm:justify-start sm:pl-[1.4em]">
              <Apparition as="span" de="rideau" delai={700} className="mb-[0.06em] inline-block">
                <Arche src={PHOTOS.pivoine.src} className="h-[0.86em] w-[0.6em]" />
              </Apparition>
              <MotRevele texte="Mois" delai={250} className="italic text-[var(--accent)]" />
            </span>
          </h1>

          <div className="grid gap-8 border-t border-white/20 pt-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <TitreRevele
              as="p"
              auChargement
              delai={450}
              texte="Ce qui fleurit en France, *ce mois-ci.* Le reste, on ne le vend pas. Tu dis ce que tu veux dire ; on écrit la carte à la main."
              className="max-w-2xl font-[family-name:var(--titres)] text-[clamp(1.5rem,2.6vw,2.2rem)] leading-[1.18]"
              classeAccent="italic text-[var(--accent)]"
            />
            <Apparition delai={800} className="flex flex-wrap gap-3 lg:justify-end">
              <Bouton href={`${DOSSIER}#choix`}>C&apos;est pour dire quoi&nbsp;?</Bouton>
              <Bouton href={`${DOSSIER}#calendrier`} variante="contour">Le calendrier</Bouton>
            </Apparition>
          </div>
        </div>
      </section>

      {/* ---------- L'heure limite, en gros, en haut de la page ---------- */}
      <HeureLimite />

      {/* ---------- Les douze mois qui défilent ---------- */}
      <div className="border-b border-[var(--trait)] py-6">
        <Defilant
          duree={60}
          separateur="✿"
          elements={MOIS.map((m) => (
            <span key={m.n}>
              {m.nom}, <span className="italic text-[var(--accent-texte)]">{m.fleur.toLowerCase()}</span>
            </span>
          ))}
          classeElement="font-[family-name:var(--titres)] text-3xl md:text-5xl whitespace-nowrap tracking-[-0.02em]"
        />
      </div>

      {/* ---------- C'est pour dire quoi ? ---------- */}
      <section id="choix" className="scroll-mt-20 mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32">
        <div className="mb-12 grid gap-8 lg:grid-cols-[1fr_0.75fr] lg:items-end">
          <div className="space-y-6">
            <Apparition><Surtitre n="01">Ton bouquet</Surtitre></Apparition>
            <TitreRevele
              texte={"C'est pour dire *quoi ?*"}
              className="font-normal text-[clamp(3.2rem,8vw,7.5rem)] leading-[0.9] tracking-[-0.04em]"
              classeAccent="italic text-[var(--accent-texte)]"
            />
          </div>
          <Apparition as="p" delai={200} className="text-xl leading-relaxed text-[var(--doux)]">
            Pas quarante bouquets qui s&apos;appellent Tendresse. Une question. Le bouquet suit la
            saison, la phrase est écrite à la main sur la carte : tu n&apos;as qu&apos;à signer.
          </Apparition>
        </div>
        <Apparition de="zoom">
          <ChoixMessage />
        </Apparition>
      </section>

      {/* ---------- La règle de la boutique ---------- */}
      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 md:pb-32">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <Apparition><Surtitre n="02">La règle</Surtitre></Apparition>
            <TitreRevele
              texte="Une saison, *des fleurs.* Le reste, on ne le vend pas."
              className="font-normal text-[clamp(2.8rem,6vw,5.5rem)] leading-[0.95] tracking-[-0.035em]"
              classeAccent="italic text-[var(--accent-texte)]"
            />
            <Apparition as="p" delai={200} className="max-w-xl text-lg leading-relaxed text-[var(--doux)]">
              Quand il n&apos;y a presque rien, on le dit — et on fait de beaux bouquets avec ce
              qu&apos;il y a. Chardons en novembre, hellébores en décembre, et le mimosa attend février.
            </Apparition>
          </div>
          <ul className="divide-y divide-[var(--trait)] self-end border-y border-[var(--trait)] [--accent:#9B2C4B]">
            {["Des roses rouges en janvier", "Quarante bouquets nommés Tendresse", "Ce qui ne fleurit pas en France ce mois-ci"].map((t, i) => (
              <Apparition as="li" key={t} delai={i * 160} className="flex items-start gap-5 py-6">
                <span aria-hidden="true" className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[var(--encre)] text-sm">✕</span>
                <span className="font-[family-name:var(--titres)] text-[clamp(1.6rem,3vw,2.3rem)] leading-[1.1]">
                  <span className="kit-barre">{t}</span>
                </span>
              </Apparition>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Le calendrier, sur la bande sombre ---------- */}
      <section id="calendrier" className="scroll-mt-16 px-3 sm:px-5">
        <div className="kit-grain relative overflow-hidden rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
          <div className="mx-auto max-w-6xl space-y-12 px-5 py-20 sm:px-10 md:py-28">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
              <div className="space-y-6">
                <Apparition><Surtitre n="03" clair>Le calendrier</Surtitre></Apparition>
                <TitreRevele
                  texte="Tourne *les pages.*"
                  className="font-normal text-[clamp(3.2rem,8vw,7rem)] leading-[0.9] tracking-[-0.04em]"
                  classeAccent="italic text-[var(--accent)]"
                />
              </div>
              <Apparition as="p" delai={200} className="text-lg leading-relaxed">
                En février, du mimosa. En mai, des pivoines. En septembre, des dahlias. Et pas de
                roses en janvier : en France, elles ne fleurissent pas dehors.
              </Apparition>
            </div>
            <Calendrier />
            <Apparition className="flex justify-end">
              <Bouton href={`${DOSSIER}/calendrier`}>L&apos;année entière</Bouton>
            </Apparition>
          </div>
        </div>
      </section>

      {/* ---------- Le premier de chaque mois : un bento ---------- */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32">
        <div className="mb-12 grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div className="space-y-6">
            <Apparition><Surtitre n="04">Le premier de chaque mois</Surtitre></Apparition>
            <TitreRevele
              texte="Celle qui arrive, *celle qui s'en va.*"
              className="font-normal text-[clamp(2.8rem,6.5vw,6rem)] leading-[0.92] tracking-[-0.04em]"
              classeAccent="italic text-[var(--accent-texte)]"
            />
          </div>
          <Apparition as="p" delai={200} className="text-lg leading-relaxed text-[var(--doux)]">
            Le premier de chaque mois, une courte vidéo : la fleur qui arrive en boutique, et
            celle qui nous quitte jusqu&apos;à l&apos;an prochain. Calendrier d&apos;exemple.
          </Apparition>
        </div>
        <ul className="grid gap-4 md:grid-cols-3 md:grid-rows-[300px_300px]">
          {PREMIERS.map((m, i) => {
            const photo = PHOTOS[m.photo];
            const grand = i === 0;
            return (
              <Apparition as="li" key={m.n} delai={i * 140} de="zoom" className={grand ? "md:col-span-2 md:row-span-2" : ""}>
                <CarteLueur className="group h-full rounded-[1.75rem]">
                  <article className={`relative flex h-full flex-col justify-between overflow-hidden rounded-[1.75rem] bg-[var(--sombre)] p-6 text-[var(--sur-sombre)] ${grand ? "min-h-[460px] sm:p-9" : "min-h-[280px]"}`}>
                    <Image src={photo.src} alt={photo.alt} fill sizes={grand ? "(min-width: 768px) 66vw, 100vw" : "(min-width: 768px) 33vw, 100vw"} className="object-cover opacity-70 transition-transform duration-[1.6s] group-hover:scale-[1.06]" />
                    <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(42,21,32,0.35)_0%,rgba(42,21,32,0.15)_40%,rgba(42,21,32,0.94)_100%)]" />
                    <span className="relative flex items-center justify-between">
                      <span className="bg-[var(--sombre)] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em]">1<sup>er</sup> {m.nom.toLowerCase()}</span>
                      <span aria-hidden="true" className="grid h-12 w-12 place-items-center rounded-full bg-[var(--accent)] text-[var(--sur-accent)] transition-transform duration-500 group-hover:scale-110">▶</span>
                    </span>
                    <span className="relative space-y-3">
                      <span className={`block font-[family-name:var(--titres)] leading-[0.95] tracking-[-0.03em] ${grand ? "text-[clamp(3rem,6vw,5.5rem)]" : "text-4xl"}`}>
                        {m.fleur}
                      </span>
                      <span className="flex flex-wrap gap-x-6 gap-y-1 text-[15px]">
                        <span>Arrive : {MOIS[(m.n + 10) % 12].arrive}</span>
                        <span>S&apos;en va : {m.part}</span>
                      </span>
                    </span>
                  </article>
                </CarteLueur>
              </Apparition>
            );
          })}
        </ul>
      </section>

      {/* ---------- 14 février : pas une rose ---------- */}
      <section className="kit-grain relative isolate overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <PhotoCinema src={PHOTOS.mimosaLarge.src} alt="" className="opacity-70" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(42,21,32,0.94)_0%,rgba(42,21,32,0.8)_45%,rgba(42,21,32,0.3)_100%)]" />
        <div className="relative mx-auto max-w-7xl space-y-8 px-5 py-28 sm:px-8 md:py-40">
          <Apparition><Surtitre n="05" clair>14 février · le lancement</Surtitre></Apparition>
          <TitreRevele
            texte={"Pas de roses. Du *mimosa.*"}
            className="max-w-4xl font-normal text-[clamp(3.4rem,9vw,8.5rem)] leading-[0.88] tracking-[-0.04em]"
            classeAccent="italic text-[var(--accent)]"
          />
          <Apparition as="p" delai={200} className="max-w-lg text-xl leading-relaxed">
            À la Saint-Valentin, une seule affiche en vitrine, et pas une seule rose rouge. Certains
            vont râler. Tant mieux : on parlera de la boutique.
          </Apparition>
          <Apparition delai={300}>
            <Bouton href={`${DOSSIER}/saint-valentin`}>Réserver son mimosa</Bouton>
          </Apparition>
        </div>
      </section>

      {/* ---------- Trois gestes, et ta signature ---------- */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32">
        <div className="mb-6 space-y-6 md:mb-0">
          <Apparition><Surtitre n="06">Comment ça marche</Surtitre></Apparition>
          <TitreRevele
            texte="Trois gestes, *et ta signature.*"
            className="max-w-4xl font-normal text-[clamp(2.8rem,6vw,5.5rem)] leading-[0.95] tracking-[-0.035em]"
            classeAccent="italic text-[var(--accent-texte)]"
          />
        </div>
        <RecitColle
          etapes={GESTES.map((g) => ({
            surtitre: g.surtitre,
            titre: g.titre,
            texte: <p>{g.texte}</p>,
            visuel: <Image src={PHOTOS[g.photo].src} alt={PHOTOS[g.photo].alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />,
          }))}
        />
      </section>

      {/* ---------- Le bouquet du mois ---------- */}
      <section className="border-y border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6">
            <Apparition><Surtitre n="07">Le bouquet du mois</Surtitre></Apparition>
            <TitreRevele
              texte="Douze bouquets *par an.*"
              className="font-normal text-[clamp(2.8rem,6vw,5.5rem)] leading-[0.95] tracking-[-0.035em]"
              classeAccent="italic text-[var(--accent-texte)]"
            />
            <Apparition as="p" delai={200} className="max-w-md text-lg leading-relaxed text-[var(--doux)]">
              Chaque premier samedi, le bouquet de la saison, à prendre en boutique ou livré dans la
              ville. On s&apos;arrête quand tu veux.
            </Apparition>
            <Apparition delai={300} className="relative hidden aspect-[4/3] overflow-hidden rounded-t-full lg:block">
              <Image src={PHOTOS.atelier.src} alt={PHOTOS.atelier.alt} fill sizes="40vw" className="object-cover" />
            </Apparition>
          </div>
          <div className="space-y-4">
            {ABONNEMENT.map((a, i) => (
              <Apparition key={a.nom} delai={i * 140} de="droite">
                <div className={`flex items-end justify-between gap-6 p-7 sm:p-9 ${i === 1 ? "bg-[var(--sombre)] text-[var(--sur-sombre)]" : "border border-[var(--trait)] bg-[var(--fond)]"}`}>
                  <div className="space-y-1">
                    <p className="font-[family-name:var(--titres)] text-[clamp(2.2rem,4vw,3.4rem)] leading-none">{a.nom}</p>
                    <p className={i === 1 ? "" : "text-[var(--doux)]"}>{a.pour}</p>
                  </div>
                  <p className="font-[family-name:var(--titres)] text-[clamp(2.4rem,5vw,4rem)] leading-none [font-variant-numeric:lining-nums]">
                    {euros(a.prix)}
                    <span className="block text-right text-[12px] font-bold uppercase tracking-[0.18em] [font-family:var(--texte)]">par mois</span>
                  </p>
                </div>
              </Apparition>
            ))}
            <p className="text-sm text-[var(--doux)]">Prix TTC d&apos;exemple. Livraison dans la ville : {euros(boutique.livraison)}.</p>
          </div>
        </div>
      </section>

      {/* ---------- Questions ---------- */}
      <section id="questions" className="scroll-mt-24 mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[0.7fr_1.3fr]">
        <div className="space-y-6">
          <Apparition><Surtitre n="08">Questions</Surtitre></Apparition>
          <TitreRevele
            texte="Avant de *signer.*"
            className="font-normal text-[clamp(2.8rem,5.5vw,5rem)] leading-[0.95] tracking-[-0.035em]"
            classeAccent="italic text-[var(--accent-texte)]"
          />
          <Apparition as="p" delai={150} className="text-[var(--doux)]">
            Ou appelle-nous : <span className="font-bold tabular-nums text-[var(--encre)]">{boutique.telephone}</span>. On a écrit des
            milliers de cartes ; on trouvera les mots en deux minutes.
          </Apparition>
        </div>
        <Apparition delai={150}>
          <Accordeon questions={QUESTIONS.map((q) => ({ question: q.q, reponse: q.r }))} />
        </Apparition>
      </section>

      <AppelFinal />

      <p className="sr-only">
        <Link href={`${DOSSIER}/mentions-legales`}>Mentions légales et crédits</Link>
      </p>
    </main>
  );
}
