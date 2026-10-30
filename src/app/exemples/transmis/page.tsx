import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import Accordeon from "../_kit/Accordeon";
import Apparition from "../_kit/Apparition";
import { AppelFinal, Bouton, CartesMenu, Intitule, Surtitre, TEINTE, Titre } from "./_composants/Blocs";
import CarrouselPlats from "./_composants/CarrouselPlats";
import EnvoiRecette from "./_composants/EnvoiRecette";
import Invites from "./_composants/Invites";
import InvitesExpress from "./_composants/InvitesExpress";
import { DOSSIER, ETAPES, MARIAGES, MENU_EXEMPLE, QUESTIONS, euros, photos, prixParPersonne } from "./_composants/donnees";

// L'accueil de Transmis. « Créer une marque » : « Sur le site, un seul bouton : envoie ta
// recette de famille. En photo. » (#recette, #cadre-photo). « Remplir l'agenda » : « Sur
// l'accueil, une seule question : combien d'invités ? Tu glisses, et le prix par personne
// s'affiche. Avec un menu complet, en exemple. » (#outil-invites, #menu-exemple).
//
// Version « carrée » (24/10/2026) : sept écrans, une idée par écran, une grille et une
// échelle de texte communes. Le carnet d'essais, la carte de table, la dégustation et le
// détail des prix vivent sur leurs pages. Depuis le 30/10/2026, le premier écran est un
// carrousel des plats de famille (CarrouselPlats) ; le titre, l'envoi de la recette et
// « combien d'invités ? » restent posés dessus.
export const metadata: Metadata = {
  title: "Transmis — traiteur, site de démonstration",
  description:
    "Le site d'une maison de traiteur imaginaire qui sert la recette de ta famille à cent vingt : envoie la page du cahier, vois le prix par personne selon tes invités, et viens goûter.",
  ...adressesDeLaPage("/exemples/transmis"),
};

// Les quatre temps, chacun sa photo : la page, la cuisine, la dégustation, le jour J.
const PHOTOS_ETAPES = [photos.papier, photos.mains, photos.ragout, photos.poisson];

export default function Transmis() {
  return (
    <main>
      {/* ---------- Premier écran : les plats de famille, en carrousel ---------- */}
      <CarrouselPlats
        titre={
          <div className="space-y-5 lg:space-y-7">
            <Surtitre clair>Transmis, maison de traiteur</Surtitre>
            <h1 className="max-w-[7em] font-[family-name:var(--titres)] text-[clamp(2.3rem,9.8vw,5.6rem)] font-normal leading-[1] tracking-[-0.012em]">
              Le plat de ta grand-mère, servi à 120.
            </h1>
            <Apparition as="p" delai={450} className="hidden max-w-[30rem] text-lg leading-relaxed sm:block">
              Une recette, ça ne s&apos;achète pas : ça se transmet. Envoie la page du cahier, on la refait en cuisine, tu viens
              goûter, et le jour J, on la sert à tous tes invités.
            </Apparition>
          </div>
        }
        invites={<Apparition delai={650}><InvitesExpress /></Apparition>}
        appel={<Apparition delai={750}><Bouton href={`${DOSSIER}#recette`} className="w-full justify-center gap-2 whitespace-nowrap px-4 sm:w-auto sm:gap-3 sm:px-6">Envoyer ma recette</Bouton></Apparition>}
      />

      {/* ---------- Un seul bouton : envoie ta recette ---------- */}
      <section id="recette" className="scroll-mt-24">
        <div className="mx-auto grid max-w-6xl gap-16 px-6 py-28 md:py-40 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <Titre texte="Envoie ta recette de famille." />
            <Apparition as="p" delai={150} className="max-w-md text-lg leading-relaxed text-[var(--doux)]">
              En photo. La page du cahier, telle qu&apos;elle est : tachée de sauce, raturée, avec «&nbsp;une bonne poignée&nbsp;» en
              guise de mesure. C&apos;est elle qu&apos;on veut.
            </Apparition>
          </div>
          <Apparition delai={150} className={`rounded-2xl border border-[var(--trait)] ${TEINTE} p-4 sm:p-6`}>
            <EnvoiRecette />
          </Apparition>
        </div>
      </section>

      {/* ---------- Combien d'invités ? Le prix par personne, et un menu complet ---------- */}
      <section id="invites" className="scroll-mt-20 bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto max-w-6xl space-y-14 px-6 py-28 md:py-40">
          <Intitule
            clair
            titre={"Combien d'invités\u00a0?"}
            texte="Tu glisses, et le prix par personne s'affiche, toutes taxes comprises, pour un menu complet. Pas de « sur devis » pour savoir si tu peux te le permettre."
          />
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <Apparition delai={150}><Invites /></Apparition>
            <div id="menu-exemple" className="scroll-mt-24 space-y-5">
              <h3 className="font-[family-name:var(--titres)] text-[26px] font-normal leading-tight text-balance">
                Un menu complet, en exemple&nbsp;: le {MENU_EXEMPLE.saison.toLowerCase()}
              </h3>
              <CartesMenu menu={MENU_EXEMPLE} empile />
              <p className="text-[15px] leading-relaxed">
                {euros(prixParPersonne(100))} TTC par personne pour 100 invités (exemple) : entrée, le plat de ta famille, dessert,
                service, vaisselle, eaux et café.{" "}
                <Link href={`${DOSSIER}/prix`} className="underline underline-offset-4">Le détail du prix</Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Une phrase, une photo : les dix secondes de silence ---------- */}
      <section id="silence" className="relative isolate flex min-h-[88svh] items-end overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <Image src={photos.sauce.src} alt="" fill sizes="100vw" className="object-cover object-[50%_22%] opacity-80" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(31,16,25,0.15)_0%,rgba(31,16,25,0.5)_42%,rgba(31,16,25,0.96)_78%)]" />
        <div className="relative mx-auto w-full max-w-6xl space-y-5 px-6 pb-16 md:pb-24">
          <Titre texte="On ne vend pas un repas. On vend dix secondes de silence, quand le plat de ta grand-mère arrive." clair className="max-w-3xl" />
        </div>
      </section>

      {/* ---------- De la recette à la table, et une page par mariage ---------- */}
      <section id="table" className="scroll-mt-24 bg-[var(--carte)]">
        <div className="mx-auto max-w-6xl space-y-14 px-6 py-28 md:py-40">
          <Intitule
            titre="Et c'est ta grand-mère qui valide."
            texte="On refait la recette en cuisine, essai après essai. Tu viens goûter ; c'est elle qui dit « c'est ça ». Et chaque mariage devient une page."
          />
          <ol className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4 lg:gap-6">
            {ETAPES.map((e, i) => (
              <Apparition as="li" key={e.titre} delai={i * 90} className="space-y-4">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                  <Image src={PHOTOS_ETAPES[i].src} alt={PHOTOS_ETAPES[i].alt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
                </div>
                <p className="text-[15px] text-[var(--doux)]">Étape {i + 1}</p>
                <h3 className="font-[family-name:var(--titres)] text-xl font-normal leading-snug">{e.titre}</h3>
              </Apparition>
            ))}
          </ol>
          <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
            {MARIAGES.map((m) => (
              <li key={m.slug}>
                <Link href={`${DOSSIER}/mariages/${m.slug}`} className="group grid gap-1 py-5 sm:grid-cols-[1fr_auto_auto] sm:items-baseline sm:gap-10">
                  <span className="font-[family-name:var(--titres)] text-2xl group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">{m.titre}</span>
                  <span className="text-[15px] text-[var(--doux)]">{m.menu.plat.nom}, {euros(prixParPersonne(m.invites))} TTC par personne</span>
                  <span className="text-[15px] font-medium text-[var(--accent-texte)] underline underline-offset-4">Voir ce mariage</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3">
            <Bouton href={`${DOSSIER}/de-la-recette-a-la-table`} variante="contour">Lire le carnet d&apos;essais</Bouton>
            <Bouton href={`${DOSSIER}/carte-de-table`} variante="contour">Écrire la carte de table</Bouton>
          </div>
        </div>
      </section>

      {/* ---------- Questions ---------- */}
      <section id="questions" className="scroll-mt-24">
        <div className="mx-auto grid max-w-6xl gap-14 px-6 py-28 md:py-40 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-6">
            <Titre texte="Avant de nous écrire." />
            <Apparition className="relative mt-6 hidden aspect-[4/5] overflow-hidden rounded-2xl lg:block">
              <Image src={photos.mains.src} alt={photos.mains.alt} fill sizes="30vw" className="object-cover" />
            </Apparition>
          </div>
          <Apparition delai={150}>
            <Accordeon questions={QUESTIONS.slice(0, 5).map((q) => ({ question: q.q, reponse: q.r }))} />
          </Apparition>
        </div>
      </section>

      <AppelFinal />
    </main>
  );
}
