import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import Accordeon from "../_kit/Accordeon";
import Apparition from "../_kit/Apparition";
import Defilant from "../_kit/Defilant";
import RecitColle from "../_kit/RecitColle";
import TitreRevele from "../_kit/TitreRevele";
import { ACCENT, ACCENT_CLAIR, AppelFinal, Arche, Bouton, CarteMaison, Marches, Surtitre, TITRE } from "./_composants/Blocs";
import BoutonEstimer from "./_composants/BoutonEstimer";
import Calculateur from "./_composants/Calculateur";
import Raconter from "./_composants/Raconter";
import { DOSSIER, MAISONS, QUESTIONS, TRANCHES, VISITES, photos, pourcent } from "./_composants/donnees";

// L'accueil de Trois Marches, qui réunit les deux vidéos des agents immobiliers. De
// « Créer une marque » : chaque maison a son histoire, racontée par ceux qui y ont vécu ;
// la loi juste en dessous ; la dernière photo sur le perron. De « Remplir l'agenda » : le
// barème en page d'accueil (on glisse son prix, le site dit ce que l'agence prend au
// maximum), le compte rendu de chaque visite le soir même, et un seul bouton sur le premier
// écran : faire estimer ma maison. Premier écran : un collage, trois photos dans des arches,
// posées en escalier comme trois marches.
export const metadata: Metadata = {
  title: "Trois Marches — agence immobilière, site de démonstration",
  description:
    "Site de démonstration d'une agence immobilière imaginaire : le barème en page d'accueil, chaque annonce qui commence par l'histoire de la maison, le compte rendu de chaque visite le soir même.",
  ...adressesDeLaPage("/exemples/trois-marches"),
};

const REGLE = [
  { titre: "Le prix, honoraires inclus", texte: "En plus gros que le prix hors honoraires. C'est ce que paie l'acquéreur, alors c'est ce qu'on lit d'abord." },
  { titre: "Nos honoraires, en pourcentage", texte: "« Honoraires : 4 % TTC à la charge de l'acquéreur ». Qui paie, et combien, sur chaque annonce." },
  { titre: "Le barème, à un clic", texte: "Nos prix maximums, toutes taxes comprises, sur l'accueil, depuis chaque annonce, et en vitrine." },
  { titre: "L'énergie, en couleur", texte: "Les classes énergie et climat, et les dépenses d'énergie estimées. Même quand la maison est en E." },
];

const METHODE = [
  { titre: "Une visite, une heure", texte: "On regarde la maison avec vous, au créneau que vous avez choisi. Puis un avis de valeur écrit, à 0 €.", photo: photos.salon },
  { titre: "Son histoire, si vous voulez", texte: "Quelques souvenirs, vos mots, votre prénom. Relus et signés par vous avant la mise en ligne.", photo: photos.pierre },
  { titre: "Chaque visite, le soir même", texte: "Les visiteurs lisent l'histoire avant de venir. Après chaque visite, le compte rendu tombe sur votre page, le soir même.", photo: photos.lampe },
  { titre: "La dernière photo", texte: "Le jour de votre choix, sur le perron. Tirée sur papier, et jamais publiée.", photo: photos.perron },
];

const SOUVENIRS = [
  "Ici, nos trois enfants ont appris le vélo",
  "Dix-sept rentrées sur les marches",
  "Le figuier du fond donne plus qu'on ne peut en manger",
  "Vingt-huit Noëls autour de la même table",
  "Le café sous la voûte, quand il pleut aussi",
];

export default function TroisMarches() {
  return (
    <main>
      {/* ---------- Premier écran : un collage, trois arches en escalier ---------- */}
      <section className="relative flex min-h-[100svh] flex-col overflow-hidden">
        <div className="mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 items-center gap-12 px-5 pb-12 pt-28 sm:px-8 lg:grid-cols-[1fr_1fr]">
          <div className="space-y-7">
            <Apparition><Surtitre>Agence immobilière · Lyon</Surtitre></Apparition>
            <TitreRevele
              as="h1"
              auChargement
              texte={"Chaque maison a *son\u00a0histoire.*"}
              className={`text-[clamp(3.6rem,6.6vw,6.8rem)] ${TITRE} leading-[0.92]`}
              classeAccent={ACCENT}
            />
            <Apparition as="p" delai={450} className="max-w-lg text-[19px] leading-relaxed text-[var(--doux)]">
              On ne vend pas des mètres carrés. Chaque annonce commence par ceux qui y ont vécu ; notre
              barème est en page d&apos;accueil ; et à chaque vente, on prend la dernière photo de
              famille, sur le perron.
            </Apparition>
            <Apparition delai={650} className="max-w-sm space-y-3">
              <BoutonEstimer />
              <p className="text-center text-[14px] text-[var(--doux)]">Avis de valeur écrit : 0&nbsp;€ · le créneau, c&apos;est vous qui le choisissez</p>
            </Apparition>
          </div>
          <div className="relative grid h-[54svh] min-h-[360px] grid-cols-3 items-end gap-3 sm:gap-5 lg:h-[66svh]" aria-label="Trois maisons, trois histoires">
            <Apparition de="rideau" delai={200} className="h-[64%]"><Arche photo={photos.pierre} priority sizes="(min-width: 1024px) 15vw, 33vw" className="h-full w-full" /></Apparition>
            <Apparition de="rideau" delai={380} className="h-[82%]"><Arche photo={photos.escalier} priority sizes="(min-width: 1024px) 15vw, 33vw" className="h-full w-full" /></Apparition>
            <Apparition de="rideau" delai={560} className="h-full"><Arche photo={photos.perron} priority sizes="(min-width: 1024px) 15vw, 33vw" className="h-full w-full" /></Apparition>
            <span aria-hidden="true" className="absolute -bottom-3 left-0 right-0 h-px bg-[var(--encre)]" />
          </div>
        </div>
      </section>

      {/* ---------- Le barème, en page d'accueil ---------- */}
      <section id="bareme" className="scroll-mt-24 px-3 sm:px-5">
        <div className="kit-grain relative overflow-hidden rounded-[2.5rem] bg-[#3E3A36] text-[#F7F2E8]">
          <div className="mx-auto grid grid-cols-1 max-w-6xl gap-14 px-5 py-20 sm:px-10 md:py-28 lg:grid-cols-[1fr_0.95fr] lg:items-center">
            <div className="space-y-8">
              <Apparition><Surtitre clair>Le barème</Surtitre></Apparition>
              <TitreRevele
                texte="Le barème, *en page d'accueil.*"
                className={`text-[clamp(3rem,6.6vw,6rem)] ${TITRE}`}
                classeAccent={ACCENT_CLAIR}
              />
              <Apparition as="p" delai={150} className="max-w-lg text-[19px] leading-relaxed text-[#F7F2E8]/90">
                Glisse le prix de ta maison : le site te dit ce que l&apos;agence prend, au maximum, et qui le
                paie. Le montant exact est écrit dans le mandat, et il ne dépasse jamais ces taux.
              </Apparition>
              <ul className="divide-y divide-white/15 border-y border-white/15">
                {TRANCHES.map((t, i) => (
                  <Apparition as="li" key={t.libelle} delai={200 + i * 100} className="flex items-baseline justify-between gap-4 py-4">
                    <span className="text-[16px]">{t.libelle}</span>
                    <span className="font-[family-name:var(--titres)] text-[34px] tabular-nums text-[#F2C3A6]">{pourcent(t.taux)}</span>
                  </Apparition>
                ))}
              </ul>
              <p className="text-[14px] text-[#F7F2E8]/90">TTC, à la charge de l&apos;acquéreur · barème d&apos;exemple · <Link href={`${DOSSIER}/bareme`} className="underline underline-offset-4">le barème complet</Link></p>
            </div>
            <Apparition de="zoom" delai={150}>
              <Calculateur />
            </Apparition>
          </div>
        </div>
      </section>

      {/* ---------- Les souvenirs, qui défilent ---------- */}
      <div className="py-10">
        <Defilant
          duree={52}
          separateur={<Marches className="h-4 w-9 text-[var(--accent)]" />}
          elements={SOUVENIRS}
          classeElement="whitespace-nowrap font-[family-name:var(--f-caveat)] text-[40px] leading-none text-[var(--encre)] md:text-[52px]"
        />
      </div>

      {/* ---------- L'histoire d'abord ---------- */}
      <section className="mx-auto grid grid-cols-1 max-w-7xl gap-12 px-5 pb-24 pt-6 sm:px-8 md:pb-36 lg:grid-cols-[1fr_1fr] lg:items-center">
        <Apparition de="rideau" className="relative aspect-[4/3] overflow-hidden rounded-t-[999px]">
          <Image src={photos.velo.src} alt={photos.velo.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="kit-cinema-img object-cover" />
        </Apparition>
        <div className="space-y-7">
          <Apparition><Surtitre>L&apos;histoire d&apos;abord</Surtitre></Apparition>
          <TitreRevele
            texte="Une annonce commence par *ceux qui y ont vécu.*"
            className={`text-[clamp(2.8rem,5.6vw,5.2rem)] ${TITRE}`}
            classeAccent={ACCENT}
          />
          <Apparition as="blockquote" delai={150} className="border-l-2 border-[var(--accent)] pl-5">
            <p className="font-[family-name:var(--f-caveat)] text-[38px] leading-[1.12]">«&nbsp;Ici, nos trois enfants ont appris le vélo, dans l&apos;allée.&nbsp;»</p>
            <footer className="mt-2 text-[15px] text-[var(--doux)]">Claire, qui vend la maison · exemple</footer>
          </Apparition>
          <Apparition as="p" delai={250} className="text-[18px] leading-relaxed text-[var(--doux)]">
            Avant la surface et le nombre de chambres : un souvenir, raconté par ceux qui partent. Des
            souvenirs seulement ; l&apos;état de la maison, c&apos;est notre travail et celui des diagnostics.
          </Apparition>
          <Apparition delai={300}><Bouton href={`${DOSSIER}/maisons/maison-5-pieces`} variante="encre">Lire l&apos;histoire de cette maison</Bouton></Apparition>
        </div>
      </section>

      {/* ---------- Les maisons ---------- */}
      <section id="maisons" className="scroll-mt-24 border-y border-[var(--trait)] bg-[#E9EFE6] py-24 md:py-32">
        <div className="mx-auto max-w-7xl space-y-14 px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
            <div className="space-y-6">
              <Apparition><Surtitre>Les maisons</Surtitre></Apparition>
              <TitreRevele texte="Trois maisons, *trois histoires.*" className={`text-[clamp(3rem,6.6vw,6rem)] ${TITRE}`} classeAccent={ACCENT} />
            </div>
            <Apparition as="p" delai={150} className="text-[19px] leading-relaxed text-[var(--doux)]">
              Puis, juste en dessous, ce que la loi impose : le prix honoraires inclus en plus gros, nos
              honoraires, le lien vers le barème, l&apos;énergie.
            </Apparition>
          </div>
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {MAISONS.map((m, i) => (
              <Apparition as="li" key={m.slug} delai={i * 140} de="zoom">
                <CarteMaison maison={m} />
              </Apparition>
            ))}
          </ul>
          <p className="text-[14px] text-[var(--doux)]">Annonces d&apos;exemple : l&apos;agence est fictive, les maisons et leurs histoires aussi. Aucune adresse n&apos;est donnée.</p>
        </div>
      </section>

      {/* ---------- Juste en dessous, la loi ---------- */}
      <section className="mx-auto max-w-7xl space-y-12 px-5 py-24 sm:px-8 md:py-32">
        <div className="space-y-6">
          <Apparition><Surtitre>Ça, c&apos;est la loi</Surtitre></Apparition>
          <TitreRevele texte="Juste en dessous, *ce qui est dû.*" className={`max-w-4xl text-[clamp(2.8rem,5.6vw,5.2rem)] ${TITRE}`} classeAccent={ACCENT} />
        </div>
        <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {REGLE.map((r, i) => (
            <Apparition as="li" key={r.titre} delai={i * 110} className="flex min-h-[260px] flex-col justify-between gap-6 rounded-t-[999px] border border-[var(--trait)] bg-[var(--carte)] px-7 pb-7 pt-16">
              <p className="text-center font-[family-name:var(--titres)] text-[40px] italic text-[var(--accent-texte)]">{["I", "II", "III", "IV"][i]}</p>
              <div className="space-y-2">
                <h3 className="text-[25px] font-normal leading-tight">{r.titre}</h3>
                <p className="leading-relaxed text-[var(--doux)]">{r.texte}</p>
              </div>
            </Apparition>
          ))}
        </ol>
        <p className="text-[14px] text-[var(--doux)]">Arrêté du 10 janvier 2017, art. 2 et 3 ; loi n° 70-9, art. 6-1 ; code de la construction et de l&apos;habitation, art.&nbsp;<span className="whitespace-nowrap">L126-33</span>.</p>
      </section>

      {/* ---------- Le suivi du soir : une bande sombre ---------- */}
      <section className="px-3 sm:px-5">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[#2E2B28] text-[#F7F2E8]">
          <Image src={photos.crepuscule.src} alt="" fill sizes="100vw" className="object-cover opacity-30" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(46,43,40,0.96)_0%,rgba(46,43,40,0.85)_50%,rgba(46,43,40,0.6)_100%)]" />
          <div className="relative mx-auto grid grid-cols-1 max-w-6xl gap-12 px-5 py-20 sm:px-10 md:py-28 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div className="space-y-7">
              <Apparition><Surtitre clair>Le suivi du soir</Surtitre></Apparition>
              <TitreRevele texte="Chaque vendeur a sa page. *Le compte rendu tombe le soir même.*" className={`text-[clamp(2.8rem,5.6vw,5.2rem)] ${TITRE}`} classeAccent={ACCENT_CLAIR} />
              <Apparition as="p" delai={150} className="max-w-lg text-[18px] leading-relaxed text-[#F7F2E8]/90">
                Après chaque visite : ce qui a plu, ce qui freine, la suite. Les visiteurs ne sont jamais
                nommés. Le vendeur n&apos;a plus à relancer l&apos;agence : il sait tout, le soir même.
              </Apparition>
              <Apparition delai={250}><Bouton href={`${DOSSIER}/suivi`} variante="clair">Voir la page d&apos;un vendeur</Bouton></Apparition>
            </div>
            <ul className="space-y-3">
              {VISITES.map((v, i) => (
                <Apparition as="li" key={v.date} delai={200 + i * 260} de="droite" className="rounded-[1.5rem] bg-[#F7F2E8] p-5 text-[#3E3A36] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.7)]">
                  <p className="flex items-center justify-between text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--accent-texte)]">
                    <span>Trois Marches · visite {i + 1}</span>
                    <span className="tabular-nums">{v.envoi}</span>
                  </p>
                  <p className="mt-2 font-[family-name:var(--titres)] text-[24px] leading-tight">{v.phrase}</p>
                  <p className="mt-1 text-[14px] text-[var(--doux)]">{v.jour} {v.date}, visite de {v.heure} · {v.suite.split(".")[0]}.</p>
                </Apparition>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------- Raconte ta maison ---------- */}
      <section id="raconter" className="scroll-mt-24 mx-auto max-w-7xl space-y-12 px-5 py-24 sm:px-8 md:py-32">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div className="space-y-6">
            <Apparition><Surtitre>Vous vendez</Surtitre></Apparition>
            <TitreRevele texte="Raconte *ta maison.*" className={`text-[clamp(3rem,6.6vw,6rem)] ${TITRE}`} classeAccent={ACCENT} />
          </div>
          <Apparition as="p" delai={150} className="text-[19px] leading-relaxed text-[var(--doux)]">
            Un souvenir, ton prénom, depuis quand tu y vis : voilà comment ton annonce commencerait.
          </Apparition>
        </div>
        <Apparition de="zoom" className="rounded-[2rem] border border-[var(--trait)] bg-[var(--carte)] p-5 shadow-[0_40px_80px_-50px_rgba(62,58,54,0.6)] sm:p-10">
          <Raconter />
        </Apparition>
      </section>

      {/* ---------- Comment on vend : le récit ---------- */}
      <section className="border-y border-[var(--trait)] bg-[var(--carte)] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-10 space-y-6 md:mb-4">
            <Apparition><Surtitre>Comment on vend</Surtitre></Apparition>
            <TitreRevele texte="Quatre temps, *pas plus.*" className={`text-[clamp(3rem,6.6vw,6rem)] ${TITRE}`} classeAccent={ACCENT} />
          </div>
          <RecitColle
            etapes={METHODE.map((m, i) => ({
              surtitre: `${i + 1}`,
              titre: m.titre,
              texte: <p>{m.texte}</p>,
              visuel: <Image src={m.photo.src} alt={m.photo.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />,
            }))}
          />
        </div>
      </section>

      {/* ---------- La dernière photo ---------- */}
      <section className="mx-auto grid grid-cols-1 max-w-7xl gap-14 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <Apparition de="zoom" className="relative mx-auto w-full max-w-[380px] rotate-[-3deg] bg-white p-4 pb-16 shadow-[0_30px_60px_-20px_rgba(62,58,54,0.35)]">
          <div className="relative aspect-[3/4]">
            <Image src={photos.perron.src} alt={photos.perron.alt} fill sizes="380px" className="object-cover" />
          </div>
          <p className="absolute bottom-4 left-0 right-0 text-center font-[family-name:var(--f-caveat)] text-[28px]">Le perron · le dernier matin</p>
        </Apparition>
        <div className="space-y-7">
          <Apparition><Surtitre>La dernière photo</Surtitre></Apparition>
          <TitreRevele texte="Avant de partir, *on vous prend en photo.*" className={`text-[clamp(2.8rem,5.6vw,5.2rem)] ${TITRE}`} classeAccent={ACCENT} />
          <Apparition as="p" delai={150} className="text-[18px] leading-relaxed text-[var(--doux)]">
            À chaque vente, une séance sur le perron, le jour de votre choix, et la photo tirée sur papier.
            Offerte, sans surcoût. Seulement si chacun est d&apos;accord, par écrit, et jamais publiée : elle
            est à vous.
          </Apparition>
          <Apparition delai={250}><Bouton href={`${DOSSIER}/la-derniere-photo`}>Choisir le moment</Bouton></Apparition>
        </div>
      </section>

      {/* ---------- Questions ---------- */}
      <section id="questions" className="scroll-mt-24 mx-auto grid grid-cols-1 max-w-7xl gap-12 px-5 pb-24 sm:px-8 md:pb-32 lg:grid-cols-[0.75fr_1.25fr]">
        <div className="space-y-6">
          <Apparition><Surtitre>Questions</Surtitre></Apparition>
          <TitreRevele texte="Ce qu'on nous *demande.*" className={`text-[clamp(2.8rem,5.6vw,5rem)] ${TITRE}`} classeAccent={ACCENT} />
          <Arche photo={photos.creme} sizes="(min-width: 1024px) 30vw, 100vw" className="hidden aspect-[3/4] w-full max-w-[300px] lg:block" />
        </div>
        <Apparition delai={150}>
          <Accordeon questions={QUESTIONS.map((q) => ({ question: q.q, reponse: q.r }))} />
        </Apparition>
      </section>

      <AppelFinal />
    </main>
  );
}
