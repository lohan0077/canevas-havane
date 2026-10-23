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
import { ACCENT_CLAIR, ACCENT_SOMBRE, Affiche, AppelFinal, Appli, Bouton, LaRegle, Monogramme, Surtitre } from "./_composants/Blocs";
import Creneau from "./_composants/Creneau";
import Journee from "./_composants/Journee";
import { DEFILE, DOSSIER, ETAPES, PANNEAUX, POMPES, QUESTIONS, VISITE, entreprise, photos } from "./_composants/donnees";

// L'accueil de L'Heure Dite. Il réunit les deux vidéos du métier : « Créer une marque »
// (le nom, l'heure de l'appel choisie par le client, l'affiche et son message France
// Rénov') et « Remplir l'agenda » (pas des économies : midi ; le toit heure par heure et
// le conseil « lance la machine » ; le rappel seulement sur demande ; le lien France
// Rénov' tout en haut). Premier écran partagé en deux : le nom en didone, et l'horloge
// qui marque midi.
export const metadata: Metadata = {
  title: "L'Heure Dite — pompes à chaleur et panneaux solaires, site de démonstration",
  description:
    "Le site d'un installateur de pompes à chaleur et de panneaux solaires imaginaire : tu choisis le jour et l'heure de ton appel ; le site te montre ton toit heure par heure et te dit quand lancer la machine. Pas de démarchage, et France Rénov' tout en haut.",
  ...adressesDeLaPage("/exemples/l-heure-dite"),
};

const PHOTOS_ETAPES = [photos.fauteuil, photos.radiateur, photos.tuiles, photos.unite, photos.ciel];

export default function LHeureDite() {
  return (
    <main>
      {/* ---------- Premier écran : le nom, et l'horloge qui marque midi ---------- */}
      <section className="relative isolate grid min-h-[100svh] overflow-hidden bg-[var(--fond)] lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative flex flex-col justify-end gap-8 px-5 pb-12 pt-32 sm:px-10 lg:pb-16 lg:pl-[max(2.5rem,calc((100vw-80rem)/2+2rem))] lg:pr-12">
          <Apparition><Surtitre>Pompes à chaleur et solaire · Exemple-Ville</Surtitre></Apparition>
          <TitreRevele
            as="h1"
            auChargement
            texte="L'Heure *Dite.*"
            className="font-[family-name:var(--titres)] text-[clamp(4.6rem,11.5vw,11rem)] leading-[0.86] tracking-[-0.04em]"
            classeAccent={ACCENT_CLAIR}
          />
          <TitreRevele
            as="p"
            auChargement
            delai={350}
            texte="Tu choisis l'heure de l'appel. *On appelle à cette heure-là.* Et ton toit, lui, te dit l'heure de la machine."
            className="max-w-xl font-[family-name:var(--titres)] text-[clamp(1.5rem,2.4vw,2.1rem)] leading-[1.18]"
            classeAccent="italic"
          />
          <Apparition delai={650} className="flex flex-wrap gap-3">
            <Bouton href={`${DOSSIER}/rendez-vous`} variante="nuit">Choisir mon heure</Bouton>
            <Bouton href="#journee" variante="contour">Ton toit, heure par heure</Bouton>
          </Apparition>
          <Apparition as="ul" delai={850} className="grid gap-px border-t border-[var(--trait)] pt-5 text-[15px] sm:grid-cols-3">
            {[
              ["Pas de démarchage", "c'est la loi, pour tous"],
              ["Appel à l'heure dite", "dans les 5 jours ouvrables"],
              ["Aucune aide promise", "France Rénov' t'informe"],
            ].map(([fort, doux]) => (
              <li key={fort} className="pr-4">
                <span className="block font-semibold">{fort}</span>
                <span className="block text-[var(--doux)]">{doux}</span>
              </li>
            ))}
          </Apparition>
        </div>
        <div className="relative min-h-[70svh] p-3 sm:p-5 lg:min-h-0 lg:pl-0 lg:pt-28">
          <Apparition de="rideau" className="relative h-full min-h-[66svh] overflow-hidden rounded-[2.5rem] bg-[var(--sombre)] lg:min-h-0">
            <PhotoCinema src={photos.horloge.src} alt={photos.horloge.alt} priority origine="45% 45%" sizes="(min-width: 1024px) 48vw, 100vw" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(24,48,31,0)_45%,rgba(24,48,31,0.55)_100%)]" />
          </Apparition>
          <Apparition de="droite" delai={900} className="absolute left-7 right-7 top-8 sm:left-auto sm:right-10 sm:w-[300px] lg:top-36">
            <div className="rounded-[1.5rem] bg-[var(--carte)] p-4 shadow-[0_24px_50px_-24px_rgba(24,48,31,0.7)]">
              <p className="flex items-center justify-between text-[13px] text-[var(--doux)]">
                <span className="flex items-center gap-2 font-semibold text-[var(--encre)]"><Monogramme className="h-5 w-5" /> L&apos;Heure Dite</span>
                <span>mardi, 18:00</span>
              </p>
              <p className="mt-2 font-[family-name:var(--titres)] text-[1.4rem] leading-tight">On t&apos;appelle mardi à 18 h.</p>
              <p className="text-[15px] text-[var(--doux)]">Pas avant. Et seulement pour ton devis.</p>
            </div>
          </Apparition>
          <Apparition de="gauche" delai={1150} className="absolute bottom-10 left-7 sm:left-10">
            <div className="rounded-[1.5rem] bg-[var(--sombre)] px-5 py-4 text-[var(--sur-sombre)] shadow-[0_24px_50px_-24px_rgba(0,0,0,0.6)]">
              <p className="text-[12px] font-semibold uppercase tracking-[0.2em]">Toit plein sud · été</p>
              <p className="font-[family-name:var(--titres)] text-2xl">Lance la machine <em className="text-[#F2B27A]">à 12 h 30</em></p>
            </div>
          </Apparition>
        </div>
      </section>

      {/* ---------- Le bandeau des heures ---------- */}
      <div className="bg-[var(--accent)] py-5 text-[var(--sur-accent)]">
        <Defilant
          duree={46}
          separateur="◷"
          elements={DEFILE}
          classeElement="font-[family-name:var(--titres)] text-2xl italic whitespace-nowrap md:text-3xl"
        />
      </div>

      {/* ---------- Pas des économies : midi ---------- */}
      <section className="mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-8 md:py-36 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-8">
          <Apparition><Surtitre>Ce qu&apos;on vend</Surtitre></Apparition>
          <Apparition as="p" className="font-[family-name:var(--titres)] text-[clamp(3rem,7vw,6.4rem)] leading-[0.94] tracking-[-0.03em]">
            Pas <span className="kit-barre">des économies.</span>
            <br />
            <em className="text-[var(--accent-texte)]">Midi.</em>
          </Apparition>
          <Apparition as="p" delai={200} className="max-w-xl text-xl leading-relaxed text-[var(--doux)]">
            Plein sud, ton toit produit surtout autour de midi. Alors on ne t&apos;annonce aucun chiffre en très
            gros : on te montre ta journée, heure par heure, et le moment où lancer la machine.
          </Apparition>
        </div>
        <div className="grid grid-cols-[1.1fr_0.9fr] items-end gap-4">
          <Apparition de="zoom" className="relative aspect-[3/4] overflow-hidden rounded-[2rem] bg-[var(--sombre)]">
            <Image src={photos.panneaux.src} alt={photos.panneaux.alt} fill sizes="(min-width: 1024px) 24vw, 50vw" className="object-cover" />
          </Apparition>
          <div className="grid gap-4">
            <Apparition de="zoom" delai={150} className="relative aspect-square overflow-hidden rounded-full bg-[var(--sombre)]">
              <Image src={photos.linge.src} alt={photos.linge.alt} fill sizes="(min-width: 1024px) 20vw, 45vw" className="object-cover" />
            </Apparition>
            <Apparition de="zoom" delai={300} className="rounded-[1.5rem] border border-[var(--trait)] bg-[var(--carte)] p-5">
              <p className="whitespace-nowrap font-[family-name:var(--titres)] text-4xl leading-none sm:text-5xl">{"13\u00a0h\u00a030"}</p>
              <p className="mt-2 text-[15px] text-[var(--doux)]">le pic d&apos;un toit plein sud en été, à l&apos;heure légale (forme indicative)</p>
            </Apparition>
          </div>
        </div>
      </section>

      {/* ---------- Outil n° 1 : ton toit, heure par heure ---------- */}
      <section className="scroll-mt-24 px-3 sm:px-5">
        <div className="kit-grain relative overflow-hidden rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
          <div className="mx-auto grid max-w-6xl gap-12 px-3 py-20 sm:px-10 md:py-28 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div className="space-y-6 px-2 sm:px-0 lg:sticky lg:top-28">
              <Apparition><Surtitre clair>Ta journée</Surtitre></Apparition>
              <TitreRevele
                texte="Ton toit, *heure par heure.*"
                className="font-[family-name:var(--titres)] text-[clamp(2.8rem,5.6vw,5.2rem)] leading-[0.95] tracking-[-0.03em]"
                classeAccent={ACCENT_SOMBRE}
              />
              <Apparition as="p" delai={150} className="text-lg leading-relaxed text-[var(--sur-sombre)]/90">
                Dis où regarde ton toit. La courbe te montre quand il produit ; glisse l&apos;heure pour la suivre.
                Ton toit regarde l&apos;ouest ? La courbe glisse vers le soir, et le site te dit quand lancer la machine.
              </Apparition>
              <Apparition delai={250}><Bouton href={`${DOSSIER}/ma-journee`} variante="clair">Lire la courbe</Bouton></Apparition>
            </div>
            <Apparition id="journee" de="zoom" delai={150} className="scroll-mt-24">
              <Appli titre="Ta journée" note="forme indicative">
                <Journee titre={false} />
              </Appli>
            </Apparition>
          </div>
        </div>
      </section>

      {/* ---------- Et quand il fait gris ? ---------- */}
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 md:grid-cols-2 md:items-center md:py-32">
        <Apparition de="zoom" className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-[var(--sombre)]">
          <Image src={photos.gris.src} alt={photos.gris.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
        </Apparition>
        <div className="space-y-6">
          <Apparition><Surtitre>La question qu&apos;on nous pose</Surtitre></Apparition>
          <TitreRevele
            texte={"Et quand il fait *gris ?*"}
            className="font-[family-name:var(--titres)] text-[clamp(2.8rem,5.6vw,5rem)] leading-[0.95] tracking-[-0.03em]"
            classeAccent={ACCENT_CLAIR}
          />
          <Apparition as="p" delai={150} className="text-xl leading-relaxed text-[var(--doux)]">
            Ton toit produit beaucoup moins, mais il ne s&apos;arrête pas : la lumière passe à travers les nuages.
            Touche « Gris » dans la courbe : elle s&apos;aplatit. On ne t&apos;annonce aucun chiffre ; on mesure ton vrai
            toit à la visite.
          </Apparition>
        </div>
      </section>

      {/* ---------- Outil n° 2 : l'heure de l'appel ---------- */}
      <section id="appel" className="scroll-mt-24 border-y border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-24 sm:px-8 md:py-32 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="space-y-6 px-1 lg:sticky lg:top-28">
            <Apparition><Surtitre>Comme chez le coiffeur</Surtitre></Apparition>
            <TitreRevele
              texte="Ton appel, *à l'heure dite.*"
              className="font-[family-name:var(--titres)] text-[clamp(2.8rem,5.6vw,5.2rem)] leading-[0.95] tracking-[-0.03em]"
              classeAccent={ACCENT_CLAIR}
            />
            <Apparition as="p" delai={150} className="text-lg leading-relaxed text-[var(--doux)]">
              Ton numéro, la case qui dit que c&apos;est toi qui demandes, un jour parmi les cinq prochains jours
              ouvrables, une heure. On appelle à ce moment-là, pas une minute avant, et seulement pour ton devis.
            </Apparition>
          </div>
          <Apparition de="zoom" delai={150}>
            <Appli titre="Quand veux-tu qu'on t'appelle ?" note="exemple">
              <Creneau />
            </Appli>
          </Apparition>
        </div>
      </section>

      <div className="pt-24 md:pt-36">
        <LaRegle />
      </div>

      {/* ---------- Ce qu'on installe : le bento ---------- */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-36">
        <div className="mb-12 grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div className="space-y-6">
            <Apparition><Surtitre>Ce qu&apos;on installe</Surtitre></Apparition>
            <TitreRevele
              texte="De la chaleur prise dehors. *Du courant pris au toit.*"
              className="font-[family-name:var(--titres)] text-[clamp(2.6rem,5vw,4.6rem)] leading-[0.98] tracking-[-0.03em]"
              classeAccent={ACCENT_CLAIR}
            />
          </div>
          <Apparition as="p" delai={150} className="text-lg leading-relaxed text-[var(--doux)]">
            Prix TTC, pose comprise, à titre d&apos;exemple. Le prix ferme est au devis écrit, après la visite.
          </Apparition>
        </div>
        <div className="grid gap-4 md:grid-cols-6">
          {POMPES.map((p, i) => (
            <Apparition key={p.nom} de="zoom" delai={i * 120} className="md:col-span-2">
              <CarteLueur className="flex h-full flex-col justify-between gap-6 rounded-[2rem] border border-[var(--trait)] bg-[var(--carte)] p-7">
                <div className="space-y-2">
                  <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-[var(--accent-texte)]">Pompe à chaleur</p>
                  <p className="font-[family-name:var(--titres)] text-3xl">{p.nom}</p>
                  <p className="font-[family-name:var(--titres)] text-xl italic">{p.phrase}</p>
                  <p className="text-[16px] leading-relaxed text-[var(--doux)]">{p.texte}</p>
                </div>
                <p className="font-[family-name:var(--titres)] text-4xl tabular-nums">{p.prix}<span className="ml-2 font-[family-name:var(--texte)] text-sm text-[var(--doux)]">exemple</span></p>
              </CarteLueur>
            </Apparition>
          ))}
          <Apparition de="zoom" className="relative min-h-[320px] overflow-hidden rounded-[2rem] bg-[var(--sombre)] text-[var(--sur-sombre)] md:col-span-3">
            <Image src={photos.tuiles.src} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover opacity-55" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(24,48,31,0.35)_0%,rgba(24,48,31,0.95)_100%)]" />
            <div className="absolute inset-x-7 bottom-7 space-y-3">
              <p className="text-[13px] font-semibold uppercase tracking-[0.2em]">Panneaux solaires · pose comprise</p>
              <ul className="divide-y divide-white/20">
                {PANNEAUX.map((p) => (
                  <li key={p.taille} className="flex items-baseline justify-between gap-4 py-2">
                    <span><span className="font-semibold">{p.taille}</span> <span className="text-[14px] text-[var(--sur-sombre)]/90">· {p.detail}</span></span>
                    <span className="whitespace-nowrap font-[family-name:var(--titres)] text-2xl tabular-nums">{p.prix}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Apparition>
          <Apparition de="zoom" delai={150} className="flex flex-col justify-between gap-6 rounded-[2rem] bg-[var(--accent)] p-7 text-[var(--sur-accent)] md:col-span-3">
            <p className="font-[family-name:var(--titres)] text-3xl leading-tight">On mesure <em>avant de proposer.</em></p>
            <ul className="space-y-2 text-[16px]">
              {VISITE.map((v) => (
                <li key={v} className="flex gap-3"><span aria-hidden="true">◷</span>{v}</li>
              ))}
            </ul>
            <Link href={`${DOSSIER}/pompes-a-chaleur`} className="font-semibold underline underline-offset-4">Nos pompes à chaleur et nos panneaux →</Link>
          </Apparition>
        </div>
      </section>

      {/* ---------- Le récit ---------- */}
      <section className="border-y border-[var(--trait)] bg-[var(--carte)] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-10 space-y-6 md:mb-4">
            <Apparition><Surtitre>Comment ça se passe</Surtitre></Apparition>
            <TitreRevele
              texte="De l'heure dite *à ton premier midi.*"
              className="max-w-4xl font-[family-name:var(--titres)] text-[clamp(2.8rem,6vw,5.4rem)] leading-[0.95] tracking-[-0.03em]"
              classeAccent={ACCENT_CLAIR}
            />
          </div>
          <RecitColle
            etapes={ETAPES.map((e, i) => ({
              surtitre: e.moment,
              titre: e.titre,
              texte: <p>{e.texte}</p>,
              visuel: <Image src={PHOTOS_ETAPES[i].src} alt={PHOTOS_ETAPES[i].alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />,
            }))}
          />
        </div>
      </section>

      {/* ---------- L'affiche du lancement ---------- */}
      <section className="mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-8 md:py-36 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div className="space-y-6">
          <Apparition><Surtitre>Pour le lancement</Surtitre></Apparition>
          <TitreRevele
            texte="Une seule affiche. *Et le message France Rénov' en bas.*"
            className="font-[family-name:var(--titres)] text-[clamp(2.6rem,5vw,4.6rem)] leading-[0.98] tracking-[-0.03em]"
            classeAccent={ACCENT_CLAIR}
          />
          <Apparition as="p" delai={150} className="text-lg leading-relaxed text-[var(--doux)]">
            Vous choisissez l&apos;heure, on appelle à cette heure-là. Depuis le 1er octobre 2026, toute publicité
            pour ces travaux porte le message du service public, mot pour mot. Sur le site, il est tout en haut
            de chaque page, pas caché en bas.
          </Apparition>
        </div>
        <Apparition de="zoom" delai={150}>
          <Affiche />
        </Apparition>
      </section>

      {/* ---------- Questions ---------- */}
      <section id="questions" className="scroll-mt-24 border-t border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="space-y-6">
            <Apparition><Surtitre>Vos questions</Surtitre></Apparition>
            <TitreRevele
              texte="Ce qu'on nous *demande.*"
              className="font-[family-name:var(--titres)] text-[clamp(2.6rem,5vw,4.5rem)] leading-[0.95] tracking-[-0.03em]"
              classeAccent={ACCENT_CLAIR}
            />
            <p className="text-[15px] text-[var(--doux)]">Ou appelle-nous : <span className="font-semibold text-[var(--encre)] tabular-nums">{entreprise.telephone}</span></p>
          </div>
          <Apparition delai={150}>
            <Accordeon questions={QUESTIONS.map((q) => ({ question: q.q, reponse: q.r }))} />
          </Apparition>
        </div>
      </section>

      <div className="bg-[var(--carte)] pt-3 sm:pt-5">
        <AppelFinal />
      </div>
    </main>
  );
}
