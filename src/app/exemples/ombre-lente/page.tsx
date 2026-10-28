import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import Accordeon from "../_kit/Accordeon";
import Apparition from "../_kit/Apparition";
import CarteLueur from "../_kit/CarteLueur";
import Defilant from "../_kit/Defilant";
import FondVivant from "../_kit/FondVivant";
import PhotoCinema from "../_kit/PhotoCinema";
import RecitColle from "../_kit/RecitColle";
import TitreRevele from "../_kit/TitreRevele";
import ArbreQuiPousse from "./_composants/ArbreQuiPousse";
import { AppelFinal, Bouton, Surtitre } from "./_composants/Blocs";
import { Fruit } from "./_composants/Dessins";
import Ombre from "./_composants/Ombre";
import Passeport from "./_composants/Passeport";
import Recolte from "./_composants/Recolte";
import { CALENDRIER, DOSSIER, ESSENCES, FRUITIERS, PHOTOS, QUESTIONS, euros, recolteDe } from "./_composants/donnees";

export const metadata: Metadata = {
  title: "Ombre Lente — pépinière, site de démonstration",
  description:
    "Le site d'une pépinière imaginaire : glisse les années et l'ombre de ton arbre arrive sur ta terrasse ; choisis ton fruitier et le site t'annonce l'été de ta première récolte. Le passeport phytosanitaire sur chaque fiche, et tout le monde plante le 25 novembre.",
  ...adressesDeLaPage("/exemples/ombre-lente"),
};

const PHOTOS_CALENDRIER = [PHOTOS.vergerNovembre, PHOTOS.arrosage, PHOTOS.mainsPlantation, PHOTOS.jeuneArbre];
const PHOTOS_OMBRE = [PHOTOS.feuilles, PHOTOS.fleursTilleul, PHOTOS.arbreSeul, PHOTOS.tableOmbre];

export default function OmbreLente() {
  return (
    <main>
      {/* ---------- Premier écran : le nom seul, sur le sous-bois, et un arbre qui pousse ---------- */}
      <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <FondVivant couleurs={["#16291F", "#2A4A33", "#8C6A22"]} vitesse={0.5} />
        <div className="absolute inset-0 bg-[var(--sombre)]/40" />
        <ArbreQuiPousse className="pointer-events-none absolute bottom-0 left-1/2 h-[78%] max-h-[760px] -translate-x-1/2" />
        <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center gap-8 px-5 pb-12 pt-36 text-center sm:px-8">
          <Apparition><Surtitre clair annee="Val de Loire">Pépinière</Surtitre></Apparition>
          <TitreRevele
            as="h1"
            auChargement
            texte="Ombre *Lente*"
            className="text-[clamp(5.6rem,21vw,17rem)] leading-[0.82] tracking-[-0.03em]"
            classeAccent="italic text-[#D9A441]"
          />
          <TitreRevele
            as="p"
            auChargement
            delai={400}
            texte="On plante. *Le temps fait le reste.*"
            className="font-[family-name:var(--titres)] text-[clamp(1.7rem,3.4vw,2.8rem)] leading-tight"
            classeAccent="italic"
          />
          <Apparition delai={800} className="grid w-full max-w-3xl gap-3 sm:grid-cols-2">
            {[
              { href: `${DOSSIER}#ombre`, fort: "L'ombre de dans vingt ans", doux: "Glisse les années" },
              { href: `${DOSSIER}#recolte`, fort: "La première cerise dans trois", doux: "Tu cueilles quand ?" },
            ].map((x) => (
              <Link key={x.href} href={x.href} className="group flex items-center justify-between gap-4 rounded-full border border-white/20 bg-[var(--sombre)]/70 px-6 py-4 text-left backdrop-blur-md transition-colors hover:border-[#D9A441]">
                <span>
                  <span className="block font-[family-name:var(--titres)] text-[22px] leading-tight">{x.fort}</span>
                  <span className="block text-[14px]">{x.doux}</span>
                </span>
                <span aria-hidden="true" className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#D9A441] text-[#16291F] transition-transform group-hover:translate-x-1">→</span>
              </Link>
            ))}
          </Apparition>
        </div>
      </section>

      {/* ---------- Les années qui passent ---------- */}
      <div className="bg-[var(--accent)] py-5 text-[var(--sur-accent)]">
        <Defilant
          duree={52}
          separateur="✦"
          elements={["An 1 · un bâton", "An 3 · la première cerise", "An 7 · l'ombre sur l'herbe", "An 12 · la balançoire", "An 20 · tu déjeunes dessous", "Le 25 novembre · tout le monde plante"]}
          classeElement="font-[family-name:var(--titres)] text-3xl md:text-5xl italic whitespace-nowrap"
        />
      </div>

      {/* ---------- Glisse les années ---------- */}
      <section id="ombre" className="scroll-mt-20 mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32">
        <div className="mb-12 grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div className="space-y-6">
            <Apparition><Surtitre annee="2026 → 2046">L&apos;ombre</Surtitre></Apparition>
            <TitreRevele
              texte="Glisse *les années.*"
              className="text-[clamp(3.4rem,8.5vw,8rem)] leading-[0.88] tracking-[-0.02em]"
              classeAccent="italic text-[var(--accent-texte)]"
            />
          </div>
          <Apparition as="p" delai={200} className="text-xl leading-relaxed text-[var(--doux)]">
            Ton arbre grandit sous tes yeux. Et son ombre de fin d&apos;après-midi avance, année
            après année, jusqu&apos;à ta terrasse. Simulation d&apos;exemple, calculée chez toi.
          </Apparition>
        </div>
        <Apparition de="zoom">
          <Ombre />
        </Apparition>
      </section>

      {/* ---------- Ce qu'on vend : un bento de deux promesses ---------- */}
      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 md:pb-32">
        <div className="grid gap-5 lg:grid-cols-2">
          {[
            { photo: PHOTOS.terrasseOmbre, barre: "Des arbres.", fort: "De l'ombre. Celle que t'auras dans vingt ans.", lien: `${DOSSIER}/arbres/tilleul`, libelle: "Le tilleul" },
            { photo: PHOTOS.cerises, barre: "Un arbre.", fort: "La première cerise. L'été de ta première récolte, variété par variété.", lien: `${DOSSIER}/arbres/cerisier-burlat`, libelle: "Le cerisier Burlat" },
          ].map((c, i) => (
            <Apparition key={c.lien} delai={i * 150} de="zoom">
              <CarteLueur className="group h-full rounded-[2.5rem]">
                <Link href={c.lien} className="relative flex h-[560px] flex-col justify-end overflow-hidden rounded-[2.5rem] bg-[var(--sombre)] p-8 text-[var(--sur-sombre)] sm:p-10 md:h-[640px]">
                  <Image src={c.photo.src} alt={c.photo.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover opacity-75 transition-transform duration-[1.6s] group-hover:scale-[1.05]" />
                  <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(22,41,31,0.05)_30%,rgba(22,41,31,0.95)_100%)]" />
                  <span className="relative space-y-4">
                    <span className="block font-[family-name:var(--titres)] text-[clamp(1.8rem,3vw,2.4rem)]">
                      On ne vend pas <span className="kit-barre italic">{c.barre}</span>
                    </span>
                    <span className="block font-[family-name:var(--titres)] text-[clamp(2.4rem,4.4vw,3.8rem)] leading-[0.98]">{c.fort}</span>
                    <span className="inline-flex items-center gap-3 text-[15px] font-semibold">
                      {c.libelle} <span aria-hidden="true" className="grid h-9 w-9 place-items-center rounded-full bg-[#D9A441] text-[#16291F] transition-transform group-hover:translate-x-1">→</span>
                    </span>
                  </span>
                </Link>
              </CarteLueur>
            </Apparition>
          ))}
        </div>
      </section>

      {/* ---------- Tu cueilles quand ? : la bande sombre ---------- */}
      <section id="recolte" className="scroll-mt-16 px-3 sm:px-5">
        <div className="kit-grain relative overflow-hidden rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-10 md:py-28 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div className="space-y-6 lg:sticky lg:top-28">
              <Apparition><Surtitre clair annee="2029">La première récolte</Surtitre></Apparition>
              <TitreRevele
                texte={"Tu cueilles *quand ?*"}
                className="text-[clamp(3.2rem,7.5vw,6.8rem)] leading-[0.9] tracking-[-0.02em]"
                classeAccent="italic text-[#D9A441]"
              />
              <Apparition as="p" delai={200} className="max-w-md text-lg leading-relaxed">
                Choisis ton arbre : il grandit, et le site t&apos;annonce l&apos;été de ta première
                récolte. Estimé, variété par variété — pas promis.
              </Apparition>
            </div>
            <Apparition de="droite" delai={150} className="rounded-[2rem] bg-[var(--fond)] p-4 text-[var(--encre)] sm:p-6">
              <Recolte />
            </Apparition>
          </div>
        </div>
      </section>

      {/* ---------- Nos arbres ---------- */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div className="space-y-6">
            <Apparition><Surtitre>Nos arbres</Surtitre></Apparition>
            <TitreRevele
              texte="Dix arbres. *Tous lents.*"
              className="text-[clamp(3rem,7vw,6.5rem)] leading-[0.9] tracking-[-0.02em]"
              classeAccent="italic text-[var(--accent-texte)]"
            />
          </div>
          <Apparition><Bouton href={`${DOSSIER}/arbres`} variante="vert">Tout le catalogue</Bouton></Apparition>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ESSENCES.map((e, i) => (
            <Apparition as="li" key={e.slug} delai={i * 90}>
              <Link href={`${DOSSIER}/arbres/${e.slug}`} className="group relative flex h-72 flex-col justify-end overflow-hidden rounded-[2rem] bg-[var(--sombre)] p-6 text-[var(--sur-sombre)]">
                <Image src={PHOTOS_OMBRE[i].src} alt={PHOTOS_OMBRE[i].alt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover opacity-60 transition-transform duration-[1.4s] group-hover:scale-[1.06]" />
                <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(22,41,31,0)_30%,rgba(22,41,31,0.95)_100%)]" />
                <span className="relative">
                  <span className="block text-[12px] font-semibold uppercase tracking-[0.18em] text-[#D9A441]">Ombre · {euros(e.prix)}</span>
                  <span className="mt-1 block font-[family-name:var(--titres)] text-[30px] leading-tight">{e.nom}</span>
                </span>
              </Link>
            </Apparition>
          ))}
          {FRUITIERS.map((a, i) => (
            <Apparition as="li" key={a.slug} delai={(i % 4) * 90}>
              <Link href={`${DOSSIER}/arbres/${a.slug}`} className="group flex h-full min-h-56 flex-col justify-between rounded-[2rem] border border-[var(--trait)] bg-[var(--carte)] p-6 transition-colors hover:border-[var(--encre)]">
                <Fruit fruit={a.fruit} className="h-20 w-20 transition-transform duration-500 group-hover:-rotate-6" />
                <span>
                  <span className="block text-[12px] font-semibold uppercase tracking-[0.18em] text-[var(--accent-texte)]">Fruit · {recolteDe(a, "demi-tige").toLowerCase()}</span>
                  <span className="mt-1 block font-[family-name:var(--titres)] text-[28px] leading-tight">{a.espece} {a.variete}</span>
                </span>
              </Link>
            </Apparition>
          ))}
        </ul>
        <p className="mt-5 text-[13px] text-[var(--doux)]">Prix TTC et années de récolte d&apos;exemple.</p>
      </section>

      {/* ---------- Le passeport, montré ---------- */}
      <section id="passeport" className="scroll-mt-16 bg-[#E9DDBF]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <Apparition><Surtitre>C&apos;est la loi</Surtitre></Apparition>
            <TitreRevele
              texte="Son passeport, *montré sur chaque fiche.*"
              className="text-[clamp(2.8rem,6vw,5.4rem)] leading-[0.92] tracking-[-0.02em]"
              classeAccent="italic text-[var(--accent-texte)]"
            />
            <Apparition as="p" delai={200} className="max-w-lg text-lg leading-relaxed">
              Chaque arbre expédié voyage avec son passeport phytosanitaire, attaché à l&apos;arbre.
              C&apos;est obligatoire, pour toutes les pépinières. Nous, on le montre en photo avant
              l&apos;achat : tu sais ce que tu recevras.
            </Apparition>
            <Apparition as="p" delai={250} className="text-[14px]">Règl. (UE) 2016/2031, art. 79, 81 et 83 · valeurs d&apos;exemple</Apparition>
          </div>
          <Apparition de="zoom">
            <Passeport latin="Tilia cordata" lot="2026-12" />
          </Apparition>
        </div>
      </section>

      {/* ---------- L'affiche ---------- */}
      <section className="kit-grain relative isolate overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <PhotoCinema src={PHOTOS.arbreSeul.src} alt="" origine="50% 40%" className="opacity-60" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(22,41,31,0.55)_0%,rgba(22,41,31,0.8)_100%)]" />
        <div className="relative mx-auto max-w-6xl space-y-8 px-5 py-32 text-center sm:px-8 md:py-44">
          <Apparition><Surtitre clair>L&apos;affiche du lancement</Surtitre></Apparition>
          <TitreRevele
            texte="Le meilleur moment pour planter un arbre, c'était il y a *vingt ans.*"
            className="mx-auto max-w-5xl text-[clamp(2.8rem,6.6vw,6.2rem)] leading-[0.95] tracking-[-0.02em]"
            classeAccent="italic text-[#D9A441]"
          />
          <TitreRevele
            as="p"
            delai={500}
            texte={"Le deuxième, *c'est maintenant.*"}
            className="font-[family-name:var(--titres)] text-[clamp(2rem,4vw,3.4rem)]"
            classeAccent="italic"
          />
        </div>
      </section>

      {/* ---------- Le 25 novembre ---------- */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32">
        <div className="mb-6 space-y-6 md:mb-0">
          <Apparition><Surtitre annee="25 novembre">La Sainte-Catherine</Surtitre></Apparition>
          <TitreRevele
            texte="Tout bois *prend racine.*"
            className="max-w-4xl text-[clamp(3rem,7vw,6.5rem)] leading-[0.9] tracking-[-0.02em]"
            classeAccent="italic text-[var(--accent-texte)]"
          />
          <Apparition as="p" delai={150} className="max-w-xl text-lg leading-relaxed text-[var(--doux)]">
            Ce jour-là, tous les clients plantent leur arbre en même temps. Et chaque année, à la
            même date, ils nous envoient sa photo. Dans vingt ans, ça fait un film.
          </Apparition>
        </div>
        <RecitColle
          etapes={CALENDRIER.map(([d, t], i) => ({
            surtitre: `Étape ${i + 1}`,
            titre: d,
            texte: <p>{t}</p>,
            visuel: <Image src={PHOTOS_CALENDRIER[i].src} alt={PHOTOS_CALENDRIER[i].alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />,
          }))}
        />
        <Apparition className="mt-6 flex flex-wrap gap-3">
          <Bouton href={`${DOSSIER}/sainte-catherine`} variante="vert">Le rendez-vous du 25 novembre</Bouton>
          <Bouton href={`${DOSSIER}/vingt-ans`} variante="contour">Le film de vingt ans</Bouton>
        </Apparition>
      </section>

      {/* ---------- Questions ---------- */}
      <section id="questions" className="scroll-mt-24 border-t border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="space-y-6">
            <Apparition><Surtitre>Questions</Surtitre></Apparition>
            <TitreRevele
              texte="Avant de *planter.*"
              className="text-[clamp(2.8rem,5.5vw,5rem)] leading-[0.95] tracking-[-0.02em]"
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
