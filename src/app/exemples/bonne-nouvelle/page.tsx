import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import Accordeon from "../_kit/Accordeon";
import Apparition from "../_kit/Apparition";
import CarteLueur from "../_kit/CarteLueur";
import Defilant from "../_kit/Defilant";
import RecitColle from "../_kit/RecitColle";
import TitreRevele from "../_kit/TitreRevele";
import { ACCENT, ACCENT_JAUNE, Affiche, AppelEntrant, Bouton, Nuit, Surtitre, TITRE } from "./_composants/Blocs";
import Calcul from "./_composants/Calcul";
import Frise from "./_composants/Frise";
import Recherche from "./_composants/Recherche";
import Suivi from "./_composants/Suivi";
import { DOSSIER, ENGAGEMENTS, PHRASE_L322_2, methode, photos, questions, situations } from "./_composants/donnees";

// L'accueil de Bonne Nouvelle, qui réunit les deux vidéos des courtiers. De « Remplir
// l'agenda » : la phrase que la loi impose, en titre de l'accueil, comme chez tout courtier ;
// la frise de ce qu'on paie et quand ; une page par situation ; le créneau en bas de chaque
// page. De « Créer une marque » : le coup de fil qu'on attend, oui ou non ; le dossier qui se
// suit comme un colis ; l'affiche et ses mentions. Premier écran : la nuit qui coule, la
// phrase de la loi en très grand, et un appel qui arrive.
export const metadata: Metadata = {
  title: "Bonne Nouvelle — courtier en crédit immobilier, site de démonstration",
  description:
    "Site de démonstration d'un courtier en crédit immobilier imaginaire : la phrase que la loi impose en titre, le dossier suivi comme un colis, et oui ou non, on t'appelle.",
  ...adressesDeLaPage("/exemples/bonne-nouvelle"),
};

const ETAPES_COLIS = ["Reçu", "Envoyé aux banques", "Réponse des banques", "Fonds versés"];
const VISUELS = [photos.porte, photos.piece, photos.angle, photos.jaune];

export default function BonneNouvelle() {
  return (
    <main>
      {/* ---------- Premier écran : la phrase de la loi, en titre ---------- */}
      <section id="accueil" className="kit-grain relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[#1B2A41] text-[#FFF8EC]">
        <Nuit voile={38} />
        <span aria-hidden="true" className="pointer-events-none absolute -left-6 top-16 font-[family-name:var(--titres)] text-[42vw] leading-none text-[#F2C14E] opacity-[0.07] sm:text-[30vw]">«</span>
        <div className="relative mx-auto grid grid-cols-1 w-full max-w-7xl flex-1 items-center gap-12 px-5 pb-14 pt-32 sm:px-8 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="space-y-8">
            <Apparition><Surtitre clair>Avant toute chose</Surtitre></Apparition>
            <TitreRevele
              as="h1"
              auChargement
              texte={PHRASE_L322_2.replace("Aucun versement,", "*Aucun versement,*")}
              className="max-w-5xl font-[family-name:var(--titres)] text-[clamp(2.3rem,5.4vw,5.4rem)] font-medium leading-[1.02] tracking-[-0.03em]"
              classeAccent={ACCENT_JAUNE}
            />
            <Apparition as="p" delai={700} data-film="c-est-la-loi" className="max-w-2xl border-l-4 border-[#F2C14E] pl-5 text-[18px] leading-relaxed text-[#E6EBF2]">
              C&apos;est la loi, pour tous les courtiers en crédit immobilier (C. consom., art. L322-2).
              On préfère te le dire en premier. Et le reste du temps, on t&apos;appelle : oui ou non.
            </Apparition>
            <Apparition delai={850} className="flex flex-wrap gap-3">
              <Bouton href={`${DOSSIER}#rendez-vous`}>Choisir mon créneau</Bouton>
              <Bouton href={`${DOSSIER}#frise`} variante="contour">Quand est-ce que je paie&nbsp;?</Bouton>
            </Apparition>
          </div>
          <Apparition de="droite" delai={1100} className="lg:justify-self-end">
            <AppelEntrant className="w-full max-w-[360px] lg:rotate-[2deg]" />
          </Apparition>
        </div>
      </section>

      {/* ---------- Le colis, qui défile ---------- */}
      <div className="bg-[#F2C14E] py-5 text-[#1B2A41]">
        <Defilant
          duree={40}
          elements={[...ETAPES_COLIS, "Oui ou non, on t'appelle", "Rien avant le versement des fonds", "Le coup de fil que tu attends"]}
          classeElement="whitespace-nowrap font-[family-name:var(--titres)] text-[26px] font-semibold tracking-[-0.02em] md:text-[34px]"
        />
      </div>

      {/* ---------- Le coup de fil que tu attends ---------- */}
      <section className="mx-auto grid grid-cols-1 max-w-7xl gap-12 px-5 py-24 sm:px-8 md:py-36 lg:grid-cols-[1fr_1fr] lg:items-center">
        <Apparition de="rideau" className="relative aspect-[4/3] overflow-hidden rounded-[2rem]">
          <Image src={photos.vert.src} alt={photos.vert.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="kit-cinema-img object-cover" />
        </Apparition>
        <div className="space-y-7">
          <Apparition><Surtitre>Pas un taux</Surtitre></Apparition>
          <TitreRevele
            texte="Le coup de fil *que tu attends.*"
            className={`text-[clamp(3rem,6.4vw,6rem)] ${TITRE}`}
            classeAccent={ACCENT}
          />
          <Apparition as="p" delai={150} className="text-[19px] leading-relaxed text-[var(--doux)]">
            Nous ne vendons pas un taux. Nous vendons le moment où ton téléphone sonne et où l&apos;on
            te dit ce que la banque a répondu. Si c&apos;est non, on t&apos;appelle aussi, et on
            t&apos;explique pourquoi.
          </Apparition>
          <Apparition as="p" delai={250} className="rounded-[1.25rem] border border-[var(--trait)] bg-white p-5 text-[15px] leading-relaxed text-[var(--doux)]">
            Depuis le 11 août 2026, démarcher un particulier par téléphone sans son accord est interdit
            (code de la consommation, art. L223-1). Son propre client, lui, on l&apos;appelle : c&apos;est
            son dossier. Nous n&apos;appelons personne d&apos;autre.
          </Apparition>
        </div>
      </section>

      {/* ---------- Le dossier, comme un colis : l'application ---------- */}
      <section className="px-3 sm:px-5">
        <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-[#1B2A41] text-[#FFF8EC]">
          <div className="mx-auto grid grid-cols-1 max-w-6xl gap-12 px-5 py-20 sm:px-10 md:py-28 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="space-y-8">
              <Apparition><Surtitre clair>Suivre un dossier</Surtitre></Apparition>
              <TitreRevele
                texte="Ton dossier se suit *comme un colis.*"
                className={`text-[clamp(3rem,6.4vw,5.8rem)] ${TITRE}`}
                classeAccent={ACCENT_JAUNE}
              />
              <Apparition as="p" delai={150} className="text-[19px] leading-relaxed text-[#E6EBF2]">
                Reçu, envoyé aux banques, réponse, fonds versés : chaque étape, avec sa date. Plus besoin
                d&apos;appeler pour savoir où il en est. Deux dossiers d&apos;exemple : l&apos;un accordé,
                l&apos;autre refusé.
              </Apparition>
              <ol className="relative grid grid-cols-4 gap-2 pt-2" aria-label="Les quatre étapes">
                <span aria-hidden="true" className="absolute left-[12%] right-[12%] top-[1.55rem] h-[3px] rounded-full bg-[#3FA36B]" />
                {ETAPES_COLIS.map((e, i) => (
                  <Apparition as="li" key={e} delai={300 + i * 180} de="zoom" className="relative flex flex-col items-center gap-2 text-center">
                    <span aria-hidden="true" className="grid h-9 w-9 place-items-center rounded-full bg-[#3FA36B] text-[14px] font-bold text-[#10251A]">✓</span>
                    <span className="text-[13px] font-bold leading-tight">{e}</span>
                  </Apparition>
                ))}
              </ol>
              <Apparition delai={500}><Bouton href={`${DOSSIER}/mon-dossier`}>Suivre le dossier n° 2 731</Bouton></Apparition>
            </div>
            <Apparition de="zoom" delai={150}>
              <Suivi ouvert />
            </Apparition>
          </div>
        </div>
      </section>

      {/* ---------- Quand est-ce que je paie : la frise ---------- */}
      <section id="frise" className="scroll-mt-24 mx-auto grid grid-cols-1 max-w-7xl gap-14 px-5 py-24 sm:px-8 md:py-36 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div className="space-y-7 lg:sticky lg:top-28">
          <Apparition><Surtitre>Quand je paie</Surtitre></Apparition>
          <TitreRevele
            texte="Une frise. *Pas de surprise.*"
            className={`text-[clamp(3rem,6.4vw,6rem)] ${TITRE}`}
            classeAccent={ACCENT}
          />
          <Apparition as="p" delai={150} className="text-[19px] leading-relaxed text-[var(--doux)]">
            Rendez-vous, dossier, offre de la banque : zéro euro. Tu paies quand les fonds sont versés.
            Touche une étape pour savoir ce qui s&apos;y passe.
          </Apparition>
          <Apparition delai={250}><Bouton href={`${DOSSIER}/honoraires`} variante="nuit">Nos honoraires, en détail</Bouton></Apparition>
        </div>
        <div className="space-y-6">
          <Apparition de="droite"><Frise /></Apparition>
          <Apparition de="droite" delai={150}><Calcul /></Apparition>
        </div>
      </section>

      {/* ---------- Une page par situation : un bento ---------- */}
      <section id="situations" className="scroll-mt-24 border-y border-[var(--trait)] bg-[#F7EBD3] py-24 md:py-32">
        <div className="mx-auto max-w-7xl space-y-12 px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
            <div className="space-y-6">
              <Apparition><Surtitre>Ta situation</Surtitre></Apparition>
              <TitreRevele
                texte="Chaque situation *a sa page.*"
                className={`text-[clamp(3rem,6.4vw,6rem)] ${TITRE}`}
                classeAccent={ACCENT}
              />
            </div>
            <Apparition as="p" delai={150} className="text-[19px] leading-relaxed text-[var(--doux)]">
              Ce que regardent les banques, les pièces à réunir, un dossier anonymisé. Mot pour mot ce
              que les gens tapent avant d&apos;appeler.
            </Apparition>
          </div>
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {situations.map((s, i) => (
              <Apparition as="li" key={s.slug} delai={i * 120} de="zoom">
                <CarteLueur className="h-full rounded-[2rem] bg-white">
                  <Link href={`${DOSSIER}/situations/${s.slug}`} className="group flex h-full min-h-[340px] flex-col justify-between gap-10 rounded-[2rem] border border-[var(--trait)] p-7">
                    <span className="flex items-center gap-2 rounded-full bg-[var(--fond)] px-4 py-2 text-[13px] font-semibold">
                      <span aria-hidden="true">⌕</span> {s.recherche}
                    </span>
                    <span className="font-[family-name:var(--titres)] text-[40px] font-medium leading-[0.98] tracking-[-0.03em]">
                      {s.titre} <em className="font-normal text-[var(--accent-texte)]">{s.accent}</em>
                    </span>
                    <span className="flex items-center justify-between text-[15px] font-bold">
                      Lire la page
                      <span aria-hidden="true" className="grid h-11 w-11 place-items-center rounded-full bg-[#1B2A41] text-[#FFF8EC] transition-transform duration-500 group-hover:-rotate-45">→</span>
                    </span>
                  </Link>
                </CarteLueur>
              </Apparition>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Comment ça se passe : le récit ---------- */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32">
        <div className="mb-10 space-y-6 md:mb-4">
          <Apparition><Surtitre>Comment ça se passe</Surtitre></Apparition>
          <TitreRevele
            texte="Quatre étapes, *un coup de fil.*"
            className={`text-[clamp(3rem,6.4vw,6rem)] ${TITRE}`}
            classeAccent={ACCENT}
          />
        </div>
        <RecitColle
          etapes={methode.map((m, i) => ({
            surtitre: `0${i + 1}`,
            titre: m.titre,
            texte: <p>{m.texte}</p>,
            visuel: <Image src={VISUELS[i].src} alt={VISUELS[i].alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />,
          }))}
        />
      </section>

      {/* ---------- L'affiche, sur le jaune ---------- */}
      <section className="px-3 sm:px-5">
        <div className="grid grid-cols-1 gap-12 overflow-hidden rounded-[2.5rem] bg-[#F2C14E] px-5 py-20 text-[#1B2A41] sm:px-10 md:py-28 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div className="mx-auto max-w-xl space-y-7">
            <Surtitre>Pour le lancement</Surtitre>
            <TitreRevele
              texte="Une seule affiche, *partout.*"
              className={`text-[clamp(3rem,6.4vw,6rem)] ${TITRE}`}
              classeAccent="italic font-normal"
            />
            <p className="text-[19px] leading-relaxed">
              Et en bas, en vrai, lisibles : le nom, l&apos;adresse, le numéro ORIAS, et les phrases que la
              loi impose à toute publicité pour un crédit immobilier. Pas en corps 4.
            </p>
          </div>
          <Apparition de="zoom"><Affiche className="mx-auto max-w-md -rotate-2" /></Apparition>
        </div>
      </section>

      {/* ---------- Ce qu'on fait, ce qu'on ne fera pas ---------- */}
      <section className="mx-auto max-w-7xl space-y-12 px-5 py-24 sm:px-8 md:py-32">
        <div className="space-y-6">
          <Apparition><Surtitre>Nos engagements</Surtitre></Apparition>
          <TitreRevele
            texte="Ce qu'on fait. *Ce qu'on ne fera pas.*"
            className={`max-w-4xl text-[clamp(2.8rem,5.6vw,5.2rem)] ${TITRE}`}
            classeAccent={ACCENT}
          />
        </div>
        <ul className="divide-y divide-[var(--trait)] border-y-2 border-[#1B2A41]">
          {ENGAGEMENTS.map((e, i) => (
            <Apparition as="li" key={e.oui} delai={i * 140} className="grid grid-cols-1 gap-4 py-7 md:grid-cols-2 md:gap-12">
              <p className="flex gap-4 text-[20px] leading-snug"><span aria-hidden="true" className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#3FA36B] text-[15px] font-bold text-[#10251A]">✓</span>{e.oui}</p>
              <p className="flex gap-4 text-[20px] leading-snug text-[var(--doux)]"><span aria-hidden="true" className="grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 border-[#1B2A41] text-[14px] font-bold text-[#1B2A41]">✕</span>{e.non}</p>
            </Apparition>
          ))}
        </ul>
      </section>

      {/* ---------- Les questions, telles qu'on les tape ---------- */}
      <section className="border-t border-[var(--trait)] bg-white">
        <div className="mx-auto grid grid-cols-1 max-w-7xl gap-14 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-7">
            <Apparition><Surtitre>Comment sont-ils payés&nbsp;?</Surtitre></Apparition>
            <TitreRevele
              texte="Ce que tout le monde *se demande.*"
              className={`text-[clamp(2.8rem,5.6vw,5.2rem)] ${TITRE}`}
              classeAccent={ACCENT}
            />
            <Apparition as="p" delai={150} className="text-[17px] leading-relaxed text-[var(--doux)]">
              « Courtier immobilier comment sont ils payés » : c&apos;est ce que propose un moteur de
              recherche quand on commence à taper « courtier immobilier comment » (suggestion relevée le
              15 octobre 2026). Tape ta question, ou touche une suggestion.
            </Apparition>
            <Apparition delai={200}><Recherche /></Apparition>
          </div>
          <Apparition delai={150}>
            <Accordeon questions={questions.map((q) => ({ question: q.q, reponse: q.r }))} />
          </Apparition>
        </div>
      </section>
    </main>
  );
}
