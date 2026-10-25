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
import { ACCENT, ACCENT_CLAIR, AppelFinal, Bouton, FenetreApp, SOMBRE, Surtitre, TITRE } from "./_composants/Blocs";
import { ChiffreDuMois, Courbe } from "./_composants/Delai";
import m from "./_composants/Mouvements.module.css";
import { FactureEncadree, Frise, LettreDeMission, Medaillon, Rosace } from "./_composants/Ornements";
import PremiereFacture from "./_composants/PremiereFacture";
import Simulateur from "./_composants/Simulateur";
import { DELAI_DU_MOIS, DOSSIER, EQUIPE, MENTIONS, MISSIONS, MOIS_DU_CHIFFRE, PREMIERES_FOIS, QUESTIONS, heures, photos } from "./_composants/donnees";

// L'accueil de Premier Billet, qui réunit les deux vidéos des experts-comptables. De
// « Créer une marque » : le nom, la première facture qu'on fête, l'outil pour la faire
// juste, le cadre. De « Remplir l'agenda » : les honoraires par mois (le statut, le
// chiffre d'affaires, et le prix tombe) et le délai de réponse, publié en haut du site,
// avec ses six derniers mois — y compris celui où il est monté. Premier écran éditorial :
// la gravure d'un billet, le titre au centre, trois pièces posées dessous.
export const metadata: Metadata = {
  title: "Premier Billet — cabinet d'expertise comptable, site de démonstration",
  description:
    "Site de démonstration d'un cabinet d'expertise comptable imaginaire : le premier se fête, les autres se comptent. Un outil pour votre première facture, vos honoraires par mois, et notre délai de réponse, publié chaque mois.",
  ...adressesDeLaPage("/exemples/premier-billet"),
};

const VISUELS = [
  <Image key="feuilles" src={photos.feuilles.src} alt={photos.feuilles.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />,
  <div key="lettre" className="absolute inset-0 grid place-items-center bg-[#17302A] p-8">
    <Rosace className="absolute h-[140%] w-[140%] text-[#C9A227] opacity-20" />
    <LettreDeMission className="relative w-full max-w-[380px] -rotate-2 max-lg:scale-[0.58]" />
  </div>,
  <div key="facture" className="absolute inset-0 grid place-items-center bg-[#E9DFC6] p-8">
    <Rosace className="absolute h-[130%] w-[130%] text-[#C9A227] opacity-40" />
    <FactureEncadree legende={false} className="relative w-full max-w-[320px] rotate-[2deg] max-lg:scale-[0.7]" />
  </div>,
  <Image key="canape" src={photos.canape.src} alt={photos.canape.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />,
];

export default function PremierBillet() {
  return (
    <main>
      {/* ---------- Premier écran : la gravure, le titre, trois pièces ---------- */}
      <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[var(--fond)]">
        <Rosace className={`${m.tourne} pointer-events-none absolute left-1/2 top-[42%] -z-10 h-[150vmin] w-[150vmin] -translate-x-1/2 -translate-y-1/2 text-[var(--accent)] opacity-35`} traits={48} />
        <Rosace className={`${m.tourneInverse} pointer-events-none absolute left-1/2 top-[42%] -z-10 h-[78vmin] w-[78vmin] -translate-x-1/2 -translate-y-1/2 text-[var(--accent)] opacity-30`} ry={60} />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_40%,transparent_0%,var(--fond)_72%)]" />
        <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-5 pb-12 pt-32 text-center sm:px-8 md:pt-36">
          <Apparition><Surtitre centre>Expertise comptable · créateurs d&apos;entreprise</Surtitre></Apparition>
          <TitreRevele
            as="h1"
            auChargement
            texte={"Le premier *se\u00a0fête.*"}
            className={`mt-8 max-w-6xl text-[clamp(3.8rem,14vw,10rem)] ${TITRE} leading-[0.86]`}
            classeAccent={ACCENT}
          />
          <TitreRevele
            as="p"
            auChargement
            delai={380}
            texte="Les autres se comptent."
            className="mt-5 font-[family-name:var(--titres)] text-[clamp(1.7rem,3.6vw,3.1rem)] italic leading-tight text-[var(--doux)]"
          />
          <Apparition as="p" delai={700} className="mt-7 max-w-xl text-[18px] leading-relaxed text-[var(--doux)]">
            Un cabinet pour les entreprises qui commencent. Le prix est affiché, le délai de réponse
            aussi. Et le jour où vous encaissez votre première facture, nous ne l&apos;oublions pas.
          </Apparition>
          <Apparition delai={850} className="mt-9 flex flex-wrap justify-center gap-3">
            <Bouton href={`${DOSSIER}/premiere-facture`}>Faire ma première facture</Bouton>
            <Bouton href={`${DOSSIER}#honoraires`} variante="contour">Mes honoraires, par mois</Bouton>
          </Apparition>

          {/* Trois pièces posées sous le titre : la facture encadrée, le chiffre du mois, le prix. */}
          <div className="mt-16 grid grid-cols-1 w-full max-w-5xl gap-5 text-left sm:grid-cols-3 sm:items-end">
            <Apparition de="zoom" delai={1000} className="sm:-rotate-2">
              <Link href={`${DOSSIER}/delai`} className="block border border-[var(--trait)] bg-[var(--carte)] p-5 shadow-[0_30px_60px_-34px_rgba(10,25,20,0.55)] transition-transform hover:-translate-y-1">
                <span className="flex items-center justify-between text-[12px] font-semibold uppercase tracking-[0.14em]">
                  <span>Chiffre du mois</span>
                  <span className="bg-[var(--accent)] px-1.5 py-0.5 text-[var(--sur-accent)]">exemple</span>
                </span>
                <span className="mt-3 block font-[family-name:var(--titres)] text-[54px] font-semibold leading-none tabular-nums">{heures(DELAI_DU_MOIS)}</span>
                <span className="mt-2 block text-[14px] text-[var(--doux)]">Délai moyen de réponse, {MOIS_DU_CHIFFRE}</span>
              </Link>
            </Apparition>
            <Apparition de="zoom" delai={1150} className="order-first sm:order-none">
              <FactureEncadree legende={false} className="mx-auto w-full max-w-[300px]" />
            </Apparition>
            <Apparition de="zoom" delai={1300} className="sm:rotate-2">
              <Link href={`${DOSSIER}#honoraires`} className="block border border-[var(--trait)] bg-[#17302A] p-5 text-[#F3EBD8] shadow-[0_30px_60px_-34px_rgba(10,25,20,0.6)] transition-transform hover:-translate-y-1">
                <span className="flex items-center justify-between text-[12px] font-semibold uppercase tracking-[0.14em]">
                  <span>SASU · 80 000 €</span>
                  <span className="text-[#E0C25A]">exemple</span>
                </span>
                <span className="mt-3 block font-[family-name:var(--titres)] text-[54px] font-semibold leading-none tabular-nums">149&nbsp;€</span>
                <span className="mt-2 block text-[14px] text-[#F3EBD8]/90">HT par mois, fixé dans la lettre de mission</span>
              </Link>
            </Apparition>
          </div>
        </div>
      </section>

      {/* ---------- Les six mentions, qui défilent ---------- */}
      <div className="border-y border-[#0F221D] bg-[#17302A] py-5 text-[#F3EBD8]">
        <Defilant
          duree={48}
          separateur={<Medaillon className="h-7 w-7 text-[#C9A227] [&_span:last-child]:text-[10px]" />}
          elements={[...MENTIONS, "Juste du premier coup"]}
          classeElement="whitespace-nowrap font-[family-name:var(--titres)] text-2xl italic md:text-3xl"
        />
      </div>

      {/* ---------- Le premier billet ---------- */}
      <section className="mx-auto grid grid-cols-1 max-w-7xl gap-12 px-5 py-24 sm:px-8 md:py-36 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <Apparition de="rideau" className="relative">
          <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[16/12]">
            <Image src={photos.poterie.src} alt={photos.poterie.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="kit-cinema-img object-cover" />
          </div>
          <p className="absolute bottom-4 right-4 border border-[var(--trait)] bg-[var(--carte)] px-5 py-3 font-[family-name:var(--titres)] text-[19px] italic shadow-lg sm:bottom-6 sm:right-6">
            Six bols en grès. <span className="not-italic font-semibold">Facture n°&nbsp;0001.</span>
          </p>
        </Apparition>
        <div className="space-y-7">
          <Apparition><Surtitre>Le premier billet</Surtitre></Apparition>
          <TitreRevele
            texte="Au-dessus de la caisse, *un billet encadré.*"
            className={`text-[clamp(2.8rem,6vw,5.4rem)] ${TITRE}`}
            classeAccent={ACCENT}
          />
          <Apparition as="p" delai={150} className="text-[19px] leading-relaxed text-[var(--doux)]">
            Certains commerçants encadrent le premier billet qu&apos;ils ont reçu, au-dessus de la
            caisse. Il ne vaut pas plus que les autres. Il dit seulement : ici, quelque chose a commencé.
          </Apparition>
          <Apparition as="p" delai={250} className="text-[19px] leading-relaxed text-[var(--doux)]">
            Nous faisons de la comptabilité, des bilans, des déclarations. Mais pour une entreprise
            qui démarre, la date qui compte, c&apos;est celle de la première facture payée.
          </Apparition>
          <Frise className="text-[var(--accent)]" />
        </div>
      </section>

      {/* ---------- L'outil, comme une application ---------- */}
      <section id="outil" className="scroll-mt-24 border-y-[3px] border-double border-[var(--trait)] bg-[var(--carte)] py-24 md:py-32">
        <div className="mx-auto max-w-7xl space-y-12 px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
            <div className="space-y-6">
              <Apparition><Surtitre>Un outil gratuit</Surtitre></Apparition>
              <TitreRevele
                texte="Votre première facture, *juste du premier coup.*"
                className={`text-[clamp(2.8rem,6vw,5.4rem)] ${TITRE}`}
                classeAccent={ACCENT}
              />
            </div>
            <Apparition as="p" delai={150} className="text-[19px] leading-relaxed text-[var(--doux)]">
              Les mentions de base, cochées à mesure que vous remplissez ; un aperçu de la facture ; et
              un tampon quand rien ne manque. Pour tout le monde, client du cabinet ou non.
            </Apparition>
          </div>
          <Apparition de="zoom">
            <FenetreApp titre="premier-billet · votre première facture">
              <PremiereFacture compact />
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[var(--trait)] bg-[var(--fond)] px-5 py-4 sm:px-8">
                <p className="text-[15px] text-[var(--doux)]">Le formulaire complet, champ par champ, est sur la page de l&apos;outil.</p>
                <Bouton href={`${DOSSIER}/premiere-facture`}>Ouvrir l&apos;outil</Bouton>
              </div>
            </FenetreApp>
          </Apparition>
        </div>
      </section>

      {/* ---------- Les honoraires : deux questions, le prix tombe ---------- */}
      <section id="honoraires" className="scroll-mt-24 mx-auto grid grid-cols-1 max-w-7xl gap-14 px-5 py-24 sm:px-8 md:py-36 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div className="space-y-7">
          <Apparition><Surtitre>Honoraires</Surtitre></Apparition>
          <TitreRevele
            texte="Deux questions. *Le prix tombe.*"
            className={`text-[clamp(2.8rem,6vw,5.4rem)] ${TITRE}`}
            classeAccent={ACCENT}
          />
          <Apparition as="p" delai={150} className="text-[19px] leading-relaxed text-[var(--doux)]">
            Votre statut, votre chiffre d&apos;affaires : le prix s&apos;affiche, par mois, avant tout
            échange. Il ne remplace pas la lettre de mission, qui le fixe par écrit avant de
            commencer ; il vous évite simplement d&apos;attendre un devis pour le connaître.
          </Apparition>
          <Apparition delai={250}>
            <Bouton href={`${DOSSIER}/honoraires`} variante="contour">Le détail, statut par statut</Bouton>
          </Apparition>
        </div>
        <Apparition de="droite" delai={100}>
          <Simulateur />
        </Apparition>
      </section>

      {/* ---------- Le chiffre du mois : une bande vert profond ---------- */}
      <section id="delai" className="scroll-mt-24 px-3 sm:px-5">
        <div style={SOMBRE} className="kit-grain relative isolate overflow-hidden rounded-[2rem] bg-[var(--fond)] text-[var(--encre)]">
          <Rosace className={`${m.tourne} pointer-events-none absolute -right-48 -top-48 h-[40rem] w-[40rem] text-[var(--accent)] opacity-25`} />
          <div className="relative mx-auto grid grid-cols-1 max-w-6xl gap-12 px-5 py-20 sm:px-10 md:py-28 lg:grid-cols-2 lg:items-start">
            <div className="space-y-8">
              <Apparition><Surtitre clair>Le chiffre du mois</Surtitre></Apparition>
              <TitreRevele
                texte="Notre délai de réponse, *publié.*"
                className={`text-[clamp(2.8rem,6vw,5.4rem)] ${TITRE}`}
                classeAccent={ACCENT_CLAIR}
              />
              <Apparition as="p" delai={150} className="text-[19px] leading-relaxed text-[var(--doux)]">
                Le délai moyen entre votre message et notre première réponse écrite. Calculé chaque
                mois, et publié en haut de ce site, qu&apos;il soit bon ou non.
              </Apparition>
              <Apparition delai={200}><ChiffreDuMois /></Apparition>
            </div>
            <div className="space-y-6 lg:pt-56">
              <Apparition delai={250}><Courbe /></Apparition>
              <Apparition delai={300}>
                <Bouton href={`${DOSSIER}/delai`} variante="or">Comment il est calculé</Bouton>
              </Apparition>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Le cadre : un bento ---------- */}
      <section className="mx-auto max-w-7xl space-y-12 px-5 py-24 sm:px-8 md:py-36">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div className="space-y-6">
            <Apparition><Surtitre>Pour nos clients</Surtitre></Apparition>
            <TitreRevele
              texte="Votre première facture *mérite un cadre.*"
              className={`text-[clamp(2.8rem,6vw,5.4rem)] ${TITRE}`}
              classeAccent={ACCENT}
            />
          </div>
          <Apparition as="p" delai={150} className="text-[19px] leading-relaxed text-[var(--doux)]">
            Le jour où un client du cabinet encaisse sa première facture, nous lui envoyons le cadre.
            Par la poste, avec un mot écrit à la main. C&apos;est tout.
          </Apparition>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:grid-rows-[300px_300px]">
          <Apparition de="zoom" className="relative min-h-[320px] overflow-hidden md:col-span-2 md:row-span-2">
            <Image src={photos.cadre.src} alt={photos.cadre.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="kit-cinema-img object-cover" />
            <span className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgba(23,48,42,0.85))] p-6 pt-20" aria-hidden="true" />
            <p className="absolute bottom-5 left-6 right-6 bg-[#17302A] px-4 py-3 text-[15px] text-[#F3EBD8] md:w-fit">Un cadre en bois clair, votre facture dedans.</p>
          </Apparition>
          <Apparition de="zoom" delai={120} className="relative min-h-[260px] overflow-hidden md:col-span-2">
            <Image src={photos.colis.src} alt={photos.colis.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </Apparition>
          <Apparition de="zoom" delai={220} className="flex min-h-[220px] flex-col justify-between border border-[var(--trait)] bg-[var(--carte)] p-6">
            <p className="font-[family-name:var(--f-caveat)] text-[34px] leading-tight text-[#17302A]">Bravo pour la première.</p>
            <p className="text-right font-[family-name:var(--f-caveat)] text-[24px] text-[#17302A]">— Premier Billet</p>
          </Apparition>
          <Apparition de="zoom" delai={320} className="flex min-h-[220px] flex-col justify-between bg-[#17302A] p-6 text-[#F3EBD8]">
            <p className="font-[family-name:var(--titres)] text-[26px] font-semibold leading-tight">Réservé aux clients du cabinet.</p>
            <Link href={`${DOSSIER}/le-cadre`} className="inline-flex items-center gap-2 font-semibold text-[#E0C25A] underline-offset-4 hover:underline">
              Comment ça se passe <span aria-hidden="true">→</span>
            </Link>
          </Apparition>
        </div>
      </section>

      {/* ---------- Quatre premières fois : le récit ---------- */}
      <section className="border-y-[3px] border-double border-[var(--trait)] bg-[var(--carte)] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-10 space-y-6 md:mb-4">
            <Apparition><Surtitre>Méthode</Surtitre></Apparition>
            <TitreRevele
              texte="Quatre *premières fois.*"
              className={`text-[clamp(2.8rem,6vw,5.4rem)] ${TITRE}`}
              classeAccent={ACCENT}
            />
          </div>
          <RecitColle
            etapes={PREMIERES_FOIS.map((p, i) => ({
              surtitre: `${String(i + 1).padStart(2, "0")} · ${p.moment}`,
              titre: p.titre,
              texte: <p>{p.texte}</p>,
              visuel: VISUELS[i],
            }))}
          />
        </div>
      </section>

      {/* ---------- Le dimanche soir : une photo plein cadre ---------- */}
      <section className="kit-grain relative isolate flex min-h-[86svh] items-end overflow-hidden bg-[#17302A] text-[#F3EBD8]">
        <PhotoCinema src={photos.pieds.src} alt="" origine="50% 60%" parallaxe className="opacity-75" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(23,48,42,0.15)_0%,rgba(23,48,42,0.55)_45%,rgba(23,48,42,0.94)_100%)]" />
        <div className="relative mx-auto w-full max-w-7xl space-y-6 px-5 pb-16 pt-40 sm:px-8 md:pb-24">
          <Surtitre clair>Vos soirées</Surtitre>
          <TitreRevele
            texte="Le dimanche soir *reste à vous.*"
            className={`max-w-4xl text-[clamp(3rem,8vw,7rem)] ${TITRE}`}
            classeAccent={ACCENT_CLAIR}
          />
          <Apparition as="p" delai={200} className="max-w-xl text-[19px] leading-relaxed text-[#F3EBD8]/90">
            Vous photographiez vos justificatifs quand ils arrivent, depuis votre téléphone. Nous
            les classons et les rapprochons du lundi au vendredi. Sans tableur, le dimanche.
          </Apparition>
        </div>
      </section>

      {/* ---------- Missions et cabinet ---------- */}
      <section className="mx-auto max-w-7xl space-y-14 px-5 py-24 sm:px-8 md:py-36">
        <div className="space-y-6">
          <Apparition><Surtitre>Missions</Surtitre></Apparition>
          <TitreRevele
            texte="Les autres factures, *nous les comptons.*"
            className={`max-w-4xl text-[clamp(2.8rem,6vw,5.4rem)] ${TITRE}`}
            classeAccent={ACCENT}
          />
        </div>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {MISSIONS.map((x, i) => (
            <Apparition as="li" key={x.titre} delai={i * 110} de="zoom">
              <CarteLueur className="h-full border border-[var(--trait)] bg-[var(--carte)]">
                <div className="flex h-full min-h-[300px] flex-col justify-between gap-8 p-7">
                  <span className="flex items-start justify-between">
                    <span className="font-[family-name:var(--titres)] text-[64px] font-semibold leading-none text-[var(--accent-texte)]">{x.numero}</span>
                    <span aria-hidden="true" className="mt-5 h-px w-14 bg-[var(--accent)]" />
                  </span>
                  <span className="space-y-3">
                    <span className="block font-[family-name:var(--titres)] text-[30px] font-semibold leading-tight">{x.titre}</span>
                    <span className="block leading-relaxed text-[var(--doux)]">{x.texte}</span>
                  </span>
                </div>
              </CarteLueur>
            </Apparition>
          ))}
        </ul>
        <div className="grid grid-cols-1 gap-8 border-t-[3px] border-double border-[var(--trait)] pt-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-3">
            <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-semibold">Trois personnes, une adresse.</h2>
            <p className="text-[var(--doux)]">Présentées par leurs initiales : le cabinet est fictif.</p>
          </div>
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {EQUIPE.map((p, i) => (
              <Apparition as="li" key={p.initiales} delai={i * 100} className="space-y-3">
                <span className="relative grid h-20 w-20 place-items-center rounded-full border-2 border-[var(--accent)] font-[family-name:var(--titres)] text-2xl font-semibold">
                  <span aria-hidden="true" className="absolute inset-1 rounded-full border border-[var(--trait)]" />
                  {p.initiales}
                </span>
                <span className="block text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--accent-texte)]">{p.role}</span>
                <span className="block text-[16px] leading-relaxed">{p.phrase}</span>
              </Apparition>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Questions ---------- */}
      <section id="questions" className="scroll-mt-24 mx-auto grid grid-cols-1 max-w-7xl gap-12 px-5 pb-24 sm:px-8 md:pb-36 lg:grid-cols-[0.7fr_1.3fr]">
        <div className="space-y-6">
          <Apparition><Surtitre>Questions</Surtitre></Apparition>
          <TitreRevele
            texte="Avant le premier *rendez-vous.*"
            className={`text-[clamp(2.6rem,5vw,4.6rem)] ${TITRE}`}
            classeAccent={ACCENT}
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
