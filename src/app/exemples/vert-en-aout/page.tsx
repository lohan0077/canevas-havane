import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import Accordeon from "../_kit/Accordeon";
import Apparition from "../_kit/Apparition";
import CarteLueur from "../_kit/CarteLueur";
import Defilant from "../_kit/Defilant";
import TitreRevele from "../_kit/TitreRevele";
import { ACCENT_SOMBRE, Affiche, Annee, AppelFinal, Arche, Bouton, Croquis, Feuille, Niveaux, Note, PrixEntretien, Surtitre, Titre } from "./_composants/Blocs";
import { Commune, TroisPhotos } from "./_composants/Interactifs";
import { ARBRES, DOSSIER, ETAPES, PHOTOS, PLANTES, QUESTIONS } from "./_composants/donnees";

// Le site de Vert en Août, le paysagiste des deux vidéos des paysagistes. Il garde la
// marque de « Créer une marque » — le jardin qui tient en août, la commune qui donne
// les plantes adaptées à l'été, la ligne d'arrosage du devis, l'affiche, l'album du
// 15 août — et toutes les idées de « Remplir l'agenda » : trois photos prises de la
// fenêtre (la seule demande), le croquis d'hiver et le chantier au printemps, une page
// par arbre, l'entretien et son crédit d'impôt à sa place. Premier écran : partagé en
// deux, le titre sur le vert profond, la photo dans une arche.
export const metadata: Metadata = {
  title: "Vert en Août — paysagiste, site de démonstration",
  description:
    "Le site d'un paysagiste imaginaire : des jardins qui ont peu soif, les plantes adaptées à l'été de ta commune, trois photos prises de ta fenêtre pour un croquis d'hiver, et l'album du 15 août, sans retouche.",
  ...adressesDeLaPage("/exemples/vert-en-aout"),
};

export default function VertEnAout() {
  return (
    <main>
      {/* ---------- Premier écran : partagé en deux ---------- */}
      <section className="kit-grain relative isolate -mt-3 flex min-h-[100svh] flex-col overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <p aria-hidden="true" className="pointer-events-none absolute -bottom-[0.18em] left-1/2 -translate-x-1/2 select-none font-[family-name:var(--titres)] text-[32vw] font-black leading-none tracking-[-0.06em] text-transparent [-webkit-text-stroke:1.5px_rgba(224,184,92,0.16)]">
          AOÛT
        </p>
        <div className="relative mx-auto grid w-full max-w-7xl flex-1 items-center gap-12 px-5 pb-16 pt-32 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:pb-20">
          <div className="space-y-8">
            <Apparition><Surtitre clair>Paysagiste · jardins secs · Nord Ardèche</Surtitre></Apparition>
            <TitreRevele
              as="h1"
              auChargement
              texte="Le jardin qui tient *en août.*"
              className="text-[clamp(3.6rem,9.4vw,8.75rem)] font-black leading-[0.9] tracking-[-0.05em]"
              classeAccent={ACCENT_SOMBRE}
            />
            <Apparition as="p" delai={450} className="max-w-xl text-xl leading-relaxed">
              Tout le monde montre son jardin en avril. Nous, on dessine des jardins qui ont peu
              soif, et on les juge le 15 août.
            </Apparition>
            <Apparition delai={650} className="flex flex-wrap gap-3">
              <Bouton href={`${DOSSIER}#commune`}>Tape ta commune</Bouton>
              <Bouton href={`${DOSSIER}#photos`} variante="contour">Envoyer trois photos</Bouton>
            </Apparition>
            <Apparition as="ul" delai={850} className="grid gap-3 sm:grid-cols-3">
              {[
                ["1re année", "on arrose l'été"],
                ["Croquis d'hiver", "chantier au printemps"],
                ["Le 15 août", "l'album, sans retouche"],
              ].map(([fort, doux]) => (
                <li key={fort} className="rounded-[1.25rem] border border-white/15 bg-[var(--sombre)] px-4 py-3">
                  <span className="block font-[family-name:var(--titres)] text-[17px] font-extrabold">{fort}</span>
                  <span className="block text-[14px]">{doux}</span>
                </li>
              ))}
            </Apparition>
          </div>
          <div className="relative mx-auto w-full max-w-[520px]">
            <Apparition de="zoom" delai={200}>
              <Arche photo={PHOTOS.jardinSec} respire priority sizes="(min-width: 1024px) 520px, 90vw" className="h-[58svh] min-h-[380px] max-h-[640px]" />
            </Apparition>
            <Apparition de="gauche" delai={700} className="absolute -bottom-8 -left-3 w-[78%] max-w-[300px] rotate-[-4deg] sm:-left-10">
              <Affiche className="p-6 [&_p:nth-of-type(2)]:text-[2.1rem]" />
            </Apparition>
            <span aria-hidden="true" className="absolute -right-2 top-8 grid h-24 w-24 rotate-[10deg] place-items-center rounded-full bg-[var(--accent)] text-center font-[family-name:var(--titres)] text-[var(--sur-accent)] shadow-[0_20px_40px_-20px_rgba(0,0,0,0.6)] sm:-right-6">
              <span className="text-[26px] font-black leading-none">15/08</span>
            </span>
          </div>
        </div>
      </section>

      {/* ---------- La palette, qui défile ---------- */}
      <div className="bg-[var(--accent)] py-5 text-[var(--sur-accent)]">
        <Defilant
          duree={46}
          elements={PLANTES.map((p) => p.nom)}
          separateur={<Feuille className="inline h-6 w-6 align-[-4px] [&_path:first-child]:fill-[#22341F] [&_path:last-child]:stroke-[#E0B85C]" />}
          classeElement="font-[family-name:var(--titres)] text-xl md:text-2xl font-extrabold tracking-[-0.01em] whitespace-nowrap"
        />
      </div>

      {/* ---------- Avril, août ---------- */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div className="space-y-6">
            <Apparition><Surtitre>Pourquoi août</Surtitre></Apparition>
            <Titre texte="Tout le monde montre son jardin *en avril.*" />
          </div>
          <Apparition as="p" delai={200} className="text-xl leading-relaxed text-[var(--doux)]">
            Une pelouse bien verte, photographiée au printemps. En été, le préfet peut restreindre
            l&apos;arrosage, et la pelouse devient jaune paille. Nous, on préfère qu&apos;on juge nos
            jardins le 15 août.
          </Apparition>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {[
            { photo: PHOTOS.fenetre, mois: "Avril", note: "ce qu'on montre" },
            { photo: PHOTOS.paille, mois: "Août", note: "ce qu'on vit" },
          ].map((x, i) => (
            <Apparition as="figure" key={x.mois} de={i ? "droite" : "gauche"} className="relative aspect-[4/3] overflow-hidden rounded-[2.5rem] bg-[var(--sombre)]">
              <Image src={x.photo.src} alt={x.photo.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
              <figcaption className="absolute bottom-5 left-5 flex items-center gap-3 rounded-full bg-[var(--sombre)] px-5 py-2.5 text-[var(--sur-sombre)]">
                <span className="font-[family-name:var(--titres)] text-2xl font-black">{x.mois}</span>
                <Note className="text-[var(--accent)]">{x.note}</Note>
              </figcaption>
            </Apparition>
          ))}
        </div>
      </section>

      {/* ---------- L'outil de la marque : ta commune ---------- */}
      <section id="commune" className="scroll-mt-20 px-3 sm:px-5">
        <div className="kit-grain relative overflow-hidden rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
          <div className="mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-10 md:py-32 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div className="space-y-7 lg:sticky lg:top-28">
              <Apparition><Surtitre clair>Chez toi, l&apos;été</Surtitre></Apparition>
              <Titre texte="Tape ta *commune.*" clair taille="geant" />
              <Apparition as="p" delai={200} className="max-w-md text-xl leading-relaxed">
                Le site te montre les plantes adaptées à l&apos;été chez toi, selon ton sol et ton
                exposition. Avec, pour chacune, l&apos;arrosage qu&apos;il lui faudra.
              </Apparition>
            </div>
            <Apparition de="zoom" delai={150}>
              <Commune />
            </Apparition>
          </div>
        </div>
      </section>

      {/* ---------- La seule demande : trois photos ---------- */}
      <section id="photos" className="scroll-mt-20 mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="space-y-7">
          <Apparition><Surtitre>Une seule demande</Surtitre></Apparition>
          <Titre texte="Trois photos, *de ta fenêtre.*" taille="geant" />
          <Apparition as="p" delai={200} className="max-w-lg text-xl leading-relaxed text-[var(--doux)]">
            Pas de formulaire de quinze champs. Trois photos de ton jardin, prises de là où tu le
            regardes chaque matin. On ne vend pas un jardin : on dessine la vue depuis ta fenêtre de
            cuisine.
          </Apparition>
          <Apparition delai={300} className="relative hidden aspect-[16/10] max-w-md overflow-hidden rounded-[2rem] lg:block">
            <Image src={PHOTOS.fenetre.src} alt="" fill sizes="28rem" className="object-cover" />
          </Apparition>
        </div>
        <Apparition de="droite" delai={150}>
          <TroisPhotos />
        </Apparition>
      </section>

      {/* ---------- Le croquis d'hiver ---------- */}
      <section id="croquis" className="scroll-mt-20 bg-[#8C4A33] text-[#FBF3E6]">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-2 lg:items-center">
          <div className="space-y-7">
            <Apparition><p className="font-[family-name:var(--titres)] text-sm font-bold uppercase tracking-[0.16em]">Le croquis d&apos;hiver</p></Apparition>
            <TitreRevele
              texte="En hiver, un croquis. *Au printemps, le chantier.*"
              className="text-[clamp(2.6rem,6vw,5.25rem)] font-extrabold leading-[0.98] tracking-[-0.035em]"
              classeAccent="font-[family-name:var(--texte)] italic font-normal"
            />
            <Apparition as="p" delai={200} className="max-w-lg text-xl leading-relaxed">
              De novembre à février, on dessine ton jardin, vu de ta fenêtre, avec des plantes qui ont
              peu soif. Tu as l&apos;hiver pour y réfléchir ; le chantier part dès que la terre se
              réchauffe.
            </Apparition>
            <p className="text-[16px]">Le croquis : 150 € TTC, déduits du chantier si tu nous le confies · exemple</p>
          </div>
          <Apparition de="zoom" delai={150} className="rotate-[1.5deg]">
            <Croquis />
          </Apparition>
        </div>
      </section>

      {/* ---------- L'année : l'hiver n'est plus un trou ---------- */}
      <section className="mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div className="space-y-7">
          <Apparition><Surtitre>L&apos;année</Surtitre></Apparition>
          <Titre texte="Ton hiver n'est plus *un trou dans l'agenda.*" taille="moyen" />
          <Apparition as="p" delai={200} className="text-xl leading-relaxed text-[var(--doux)]">
            Au printemps, tout le monde appelle en même temps. En dessinant l&apos;hiver, ton
            chantier est prêt à partir en mars, au lieu d&apos;attendre l&apos;été.
          </Apparition>
        </div>
        <Apparition delai={150}>
          <Annee />
        </Apparition>
      </section>

      {/* ---------- L'eau, l'été : l'affiche ---------- */}
      <section id="restrictions" className="scroll-mt-20 bg-[#E7D7B4]">
        <div className="mx-auto max-w-7xl space-y-14 px-5 py-24 sm:px-8 md:py-32">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="space-y-7">
              <Apparition><Surtitre>L&apos;eau, l&apos;été</Surtitre></Apparition>
              <Titre texte={"Arrosage restreint\u00a0? *Ce jardin a peu soif.*"} />
              <Apparition as="p" delai={200} className="max-w-xl text-xl leading-relaxed">
                En été, le préfet peut restreindre l&apos;arrosage. Les restrictions sont graduées : ce
                qui est permis chez toi, c&apos;est l&apos;arrêté de ton département qui le dit — sur la
                plateforme officielle VigiEau, ou en mairie. L&apos;affiche du lancement sort pendant
                ces semaines-là.
              </Apparition>
            </div>
            <Apparition de="zoom" delai={200} className="mx-auto w-full max-w-sm rotate-[3deg]">
              <Affiche />
            </Apparition>
          </div>
          <Niveaux />
          <p className="text-[15px]">D&apos;après service-public.gouv.fr, « Êtes-vous concerné par des restrictions d&apos;eau ? », 7 juillet 2026.</p>
        </div>
      </section>

      {/* ---------- Le devis ---------- */}
      <section className="mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-2 lg:items-center">
        <div className="space-y-7">
          <Apparition><Surtitre>Sur chaque devis</Surtitre></Apparition>
          <Titre texte="Une ligne que *personne ne met.*" />
          <Apparition as="p" delai={200} className="max-w-lg text-xl leading-relaxed text-[var(--doux)]">
            L&apos;arrosage qu&apos;il faudra, l&apos;été : combien de temps, à quel rythme, jusqu&apos;à
            quand. Pour que tu saches, avant de signer, ce que ton jardin te demandera.
          </Apparition>
          <Apparition delai={300}>
            <Bouton href={`${DOSSIER}/devis`} variante="sombre">Voir un devis</Bouton>
          </Apparition>
        </div>
        <Apparition de="droite" delai={150} className="relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2.5rem]">
            <Image src={PHOTOS.pots.src} alt={PHOTOS.pots.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
          <div className="-mt-20 ml-auto mr-4 w-[86%] max-w-sm rotate-[-2deg] rounded-[1rem] border-2 border-[#84432C] bg-[#F8EEDB] p-5 text-[#2F4A2C] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.5)] sm:mr-8">
            <p className="font-[family-name:var(--titres)] text-[12px] font-bold uppercase tracking-[0.16em] text-[#84432C]">Devis n° 27 · arrosage à prévoir</p>
            <p className="font-[family-name:var(--titres)] text-[22px] font-extrabold leading-tight">La 1<sup>re</sup> année, l&apos;été</p>
            <p className="text-[14px]">Ensuite : en cas de canicule · estimation</p>
          </div>
        </Apparition>
      </section>

      {/* ---------- Une page par arbre ---------- */}
      <section className="border-y border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto max-w-7xl space-y-14 px-5 py-24 sm:px-8 md:py-32">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
            <div className="space-y-6">
              <Apparition><Surtitre>Une page par arbre</Surtitre></Apparition>
              <Titre texte={"Quand *tailler\u00a0?*"} taille="geant" />
            </div>
            <Apparition as="p" delai={200} className="text-xl leading-relaxed text-[var(--doux)]">
              La question qu&apos;on tape tous un jour. La réponse de ton jardinier en trois lignes,
              arbre par arbre, et en bas, un bouton pour réserver la taille.
            </Apparition>
          </div>
          <ul className="grid gap-4 md:grid-cols-3 md:grid-rows-2">
            {ARBRES.map((a, i) => (
              <Apparition as="li" key={a.slug} de="zoom" delai={i * 120} className={i === 0 ? "md:col-span-2 md:row-span-2" : ""}>
                <CarteLueur className="h-full rounded-[2rem]">
                  <Link
                    href={`${DOSSIER}/arbres/${a.slug}`}
                    data-arbre={a.slug}
                    className={`group relative flex h-full flex-col justify-end overflow-hidden rounded-[2rem] bg-[var(--sombre)] p-7 text-[var(--sur-sombre)] ${i === 0 ? "min-h-[420px] md:min-h-[560px]" : "min-h-[260px]"}`}
                  >
                    {a.photo && (
                      <>
                        <Image src={a.photo.src} alt="" fill sizes={i === 0 ? "(min-width: 768px) 66vw, 100vw" : "(min-width: 768px) 33vw, 100vw"} className="object-cover opacity-70 transition-transform duration-[1.4s] ease-out group-hover:scale-[1.06]" />
                        <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(34,52,31,0.05)_25%,rgba(34,52,31,0.94)_100%)]" />
                      </>
                    )}
                    <Note className="absolute right-6 top-6 rotate-[-4deg] text-[var(--accent)]">{a.saison}</Note>
                    <span className="relative space-y-2">
                      <span className={`block font-[family-name:var(--titres)] font-extrabold leading-[1] tracking-[-0.03em] ${i === 0 ? "text-5xl md:text-6xl" : "text-3xl"}`}>{a.question}</span>
                      <span className="block max-w-lg text-[15px]">{a.reponse[0]}</span>
                      <span className="flex items-center gap-2 pt-1 font-[family-name:var(--titres)] text-[15px] font-bold text-[var(--accent)]">
                        Trois lignes, et réserver la taille
                        <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                      </span>
                    </span>
                  </Link>
                </CarteLueur>
              </Apparition>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- L'entretien : le prix en gros ---------- */}
      <section className="mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-2 lg:items-center">
        <div className="space-y-7">
          <Apparition><Surtitre>L&apos;entretien à l&apos;année</Surtitre></Apparition>
          <Titre texte="Le prix *d'abord.*" />
          <Apparition as="p" delai={200} className="max-w-lg text-xl leading-relaxed text-[var(--doux)]">
            Tonte, haies, désherbage : un prix à l&apos;année, selon la taille du jardin. Le crédit
            d&apos;impôt, quand il s&apos;applique, est écrit à côté, en plus petit, avec ses conditions.
          </Apparition>
          <Apparition delai={300}>
            <Bouton href={`${DOSSIER}/entretien`} variante="sombre">Calculer pour mon jardin</Bouton>
          </Apparition>
        </div>
        <Apparition de="zoom" delai={150}>
          <PrixEntretien />
        </Apparition>
      </section>

      {/* ---------- Le 15 août : l'album ---------- */}
      <section className="px-3 sm:px-5">
        <div className="kit-grain relative overflow-hidden rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
          <div className="mx-auto max-w-7xl space-y-12 px-5 py-24 sm:px-10 md:py-32">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
              <div className="space-y-6">
                <Apparition><Surtitre clair>Chaque 15 août</Surtitre></Apparition>
                <Titre texte="Nos jardins, *sans retouche.*" clair />
              </div>
              <Apparition as="p" delai={200} className="text-xl leading-relaxed">
                Le jour le plus dur de l&apos;année pour un jardin, on publie nos jardins, avec
                l&apos;accord de leurs propriétaires. Même ceux qui ont souffert.
              </Apparition>
            </div>
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {Array.from({ length: 6 }, (_, k) => (
                <Apparition as="li" key={k} delai={k * 90} de="bas" className={`${k % 2 ? "rotate-[2deg]" : "rotate-[-2deg]"}`}>
                  <span className="block rounded-[0.75rem] bg-[var(--fond)] p-2.5 pb-4 text-[var(--encre)] shadow-[0_20px_40px_-24px_rgba(0,0,0,0.8)]">
                    <span className="grid aspect-square place-items-center rounded-[0.4rem] border-2 border-dashed border-[#B9AD8E] bg-[var(--carte)] font-[family-name:var(--titres)] text-[22px] font-black text-[var(--accent-texte)]">
                      15/08
                    </span>
                    <span className="mt-2 block text-center text-[13px]">Jardin n° {k + 1} · à venir</span>
                  </span>
                </Apparition>
              ))}
            </ul>
            <div className="flex flex-wrap items-center justify-between gap-5">
              <p className="max-w-xl text-[15px]">L&apos;album 2027 est vide : il n&apos;y a pas encore de jardin à montrer. Aucune photo n&apos;est inventée.</p>
              <Bouton href={`${DOSSIER}/15-aout`} variante="clair">Le principe de l&apos;album</Bouton>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- De la fenêtre au 15 août ---------- */}
      <section className="mx-auto max-w-7xl space-y-14 px-5 py-24 sm:px-8 md:py-32">
        <div className="space-y-6">
          <Apparition><Surtitre>Comment ça se passe</Surtitre></Apparition>
          <Titre texte="De ta fenêtre *au 15 août.*" />
        </div>
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ETAPES.map((e, i) => (
            <Apparition as="li" key={e.titre} delai={i * 110} className="h-full">
              <CarteLueur className="h-full rounded-[2rem] border border-[var(--trait)] bg-[var(--carte)]">
                <div className="flex h-full flex-col gap-4 p-7">
                  <span className="font-[family-name:var(--titres)] text-5xl font-black tabular-nums text-[var(--accent-texte)]">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="text-2xl font-extrabold">{e.titre}</h3>
                  <p className="leading-relaxed text-[var(--doux)]">{e.texte}</p>
                </div>
              </CarteLueur>
            </Apparition>
          ))}
        </ol>
      </section>

      {/* ---------- Questions ---------- */}
      <section id="questions" className="scroll-mt-24 border-t border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[0.75fr_1.25fr]">
          <div className="space-y-6">
            <Apparition><Surtitre>Questions</Surtitre></Apparition>
            <Titre texte="Avant *la visite.*" taille="moyen" />
            <Apparition className="mt-4 hidden lg:block">
              <Arche photo={PHOTOS.allee} sizes="30vw" className="aspect-[3/4] w-full max-w-xs" />
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
