import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import Accordeon from "../_kit/Accordeon";
import Apparition from "../_kit/Apparition";
import { AppelFinal, Appli, Bouton, Surtitre, Titre } from "./_composants/Blocs";
import TaVie from "./_composants/TaVie";
import TesMurs from "./_composants/TesMurs";
import { DOSSIER, ETAPES, FAQ, photos } from "./_composants/donnees";

// L'accueil de Sept Mille Dîners. Il réunit les deux vidéos des cuisinistes : « Créer
// une marque » (le nom, les trois questions sur ta vie, le premier dîner) et « Remplir
// l'agenda » (la longueur de tes murs qui dessine ta cuisine et sa fourchette pose
// comprise, le guide, la pose filmée en accéléré).
//
// Version « carrée » (24/10/2026) : sept écrans, une idée par écran, une grille et une
// échelle de texte communes. Les gammes au mètre, ce que la fourchette comprend, le
// déroulé du premier dîner et le guide vivent sur leurs pages. Les éléments filmés par
// les deux vidéos (#ta-vie, #tes-murs et leurs data-film) sont gardés.
export const metadata: Metadata = {
  title: "Sept Mille Dîners — cuisines sur mesure, site de démonstration",
  description:
    "Le site d'une marque de cuisines imaginaire : pas de catalogue, trois questions sur ta vie et le plan qui va avec ; la longueur de tes murs et une fourchette TTC pose comprise ; le soir de la pose, le premier dîner.",
  ...adressesDeLaPage("/exemples/sept-mille-diners"),
};

// Les pages qui prennent la suite de l'accueil.
const PAGES = [
  { href: `${DOSSIER}/le-premier-diner`, titre: "Le premier dîner, c'est nous", detail: "Le soir de la pose · offert sans condition" },
  { href: `${DOSSIER}/choisir-son-cuisiniste`, titre: "Comment choisir un bon cuisiniste", detail: "Même si ce n'est pas nous · cinq questions" },
  { href: `${DOSSIER}/tes-murs`, titre: "Ce que la fourchette comprend", detail: "Le mètre linéaire · la prise de cotes" },
];

/** Le haut de chaque écran : un numéro, un titre, une phrase. Toujours le même gabarit. */
function Intitule({ numero, surtitre, titre, texte, clair = false }: { numero: string; surtitre: string; titre: string; texte: string; clair?: boolean }) {
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_minmax(0,26rem)] lg:items-end">
      <div className="space-y-5">
        <Apparition><Surtitre clair={clair}>{numero} — {surtitre}</Surtitre></Apparition>
        <Titre texte={titre} clair={clair} />
      </div>
      <Apparition as="p" delai={150} className={`text-lg leading-relaxed ${clair ? "text-[var(--sur-sombre)]" : "text-[var(--doux)]"}`}>
        {texte}
      </Apparition>
    </div>
  );
}

export default function SeptMilleDiners() {
  return (
    <main>
      {/* ---------- Premier écran : le nombre, et la cocotte sur le feu ---------- */}
      <section className="flex min-h-[100svh] items-center bg-[var(--fond)]">
        <div className="mx-auto grid w-full max-w-6xl gap-14 px-6 pb-16 pt-32 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-8">
            <Apparition><Surtitre>Cuisines sur mesure · Ta Ville</Surtitre></Apparition>
            <Titre as="h1" texte="Sept mille *dîners.*" taille="geant" />
            <Apparition as="p" delai={300} className="max-w-[26rem] text-lg leading-relaxed text-[var(--doux)]">
              Une cuisine gardée vingt ans, c&apos;est 7&nbsp;300 dîners. On vend ceux-là ; les meubles sont fournis.
            </Apparition>
            <Apparition delai={450} className="space-y-4">
              <Bouton href="#ta-vie">Trois questions sur ta vie</Bouton>
              <p className="text-[13px] text-[var(--doux)]">20 ans × 365 soirs : un calcul, pas une durée de vie annoncée.</p>
            </Apparition>
          </div>
          <Apparition de="zoom" delai={150} className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[var(--sombre)]">
            <Image src={photos.cocotte.src} alt={photos.cocotte.alt} fill priority sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover object-[30%_50%]" />
          </Apparition>
        </div>
      </section>

      {/* ---------- 01. L'outil de la marque : trois questions sur ta vie ---------- */}
      <section id="ta-vie" className="scroll-mt-20 border-t border-[var(--trait)]">
        <div className="mx-auto max-w-6xl space-y-14 px-6 py-28 md:py-40">
          <Intitule
            numero="01"
            surtitre="Pas de catalogue"
            titre="Trois questions *sur ta vie.*"
            texte="Combien à table, qui cuisine, qui fait la vaisselle. Et le site te dessine le plan qui va avec ta vie. Pas avec la photo."
          />
          <Apparition delai={150}>
            <Appli adresse="Sept Mille Dîners · ta vie, ton plan" etape="Étape 1 sur 2">
              <TaVie />
            </Appli>
          </Apparition>
        </div>
      </section>

      {/* ---------- 02. L'outil de l'agenda : tes murs, ta fourchette ---------- */}
      <section id="tes-murs" className="scroll-mt-20 bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto max-w-6xl space-y-14 px-6 py-28 md:py-40">
          <Intitule
            clair
            numero="02"
            surtitre="Prix cuisine sur mesure avec pose"
            titre="Tes murs, *ton prix.*"
            texte="Tape la longueur de tes murs : le site dessine ta cuisine, meuble après meuble, avec une fourchette TTC, pose comprise. Le prix ferme vient au devis."
          />
          <Apparition delai={150}>
            <Appli adresse="Sept Mille Dîners · tes murs, ton prix" etape="Étape 2 sur 2">
              <TesMurs />
            </Appli>
          </Apparition>
          <Link href={`${DOSSIER}/tes-murs`} className="inline-block text-[15px] underline underline-offset-4">
            Le prix au mètre, et ce que la fourchette comprend
          </Link>
        </div>
      </section>

      {/* ---------- Une phrase, une photo : ce qu'on vend ---------- */}
      <section className="relative isolate flex min-h-[80svh] items-end overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <Image src={photos.planBois.src} alt="" fill sizes="100vw" className="object-cover opacity-80" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(36,31,27,0.1)_0%,rgba(36,31,27,0.35)_45%,rgba(36,31,27,0.92)_100%)]" />
        <div className="relative mx-auto w-full max-w-6xl space-y-5 px-6 pb-16 md:pb-24">
          <Apparition><Surtitre clair>Ce qu&apos;on vend</Surtitre></Apparition>
          <Titre texte="Pas des meubles. *La pièce où finissent toutes les soirées.*" clair className="max-w-3xl" />
        </div>
      </section>

      {/* ---------- 03. La preuve : du premier mot au premier dîner ---------- */}
      <section className="bg-[var(--carte)]">
        <div className="mx-auto max-w-6xl space-y-14 px-6 py-28 md:py-40">
          <Intitule
            numero="03"
            surtitre="Comment ça se passe"
            titre="Du premier mot *au premier dîner.*"
            texte="Les cotes chez toi, le plan, quatre jours de pose — filmés en accéléré si tu es d'accord —, et le soir de la pose, le premier dîner, offert sans condition."
          />
          <ol className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-5">
            {ETAPES.map((e, i) => (
              <Apparition as="li" key={e.titre} delai={i * 90} className="space-y-3 border-t border-[var(--trait)] pt-5">
                <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-[var(--doux)]">{String(i + 1).padStart(2, "0")} · {e.moment}</p>
                <h3 className="font-[family-name:var(--titres)] text-xl font-normal leading-snug">{e.titre}</h3>
                <p className="text-[15px] leading-relaxed text-[var(--doux)]">{e.texte}</p>
              </Apparition>
            ))}
          </ol>
          <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
            {PAGES.map((p) => (
              <li key={p.href}>
                <Link href={p.href} className="group grid gap-1 py-5 sm:grid-cols-[1fr_auto_auto] sm:items-baseline sm:gap-10">
                  <span className="font-[family-name:var(--titres)] text-2xl">{p.titre}</span>
                  <span className="text-[15px] text-[var(--doux)]">{p.detail}</span>
                  <span aria-hidden="true" className="hidden text-[var(--accent-texte)] transition-transform group-hover:translate-x-1 sm:inline">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- 04. Questions ---------- */}
      <section id="questions" className="scroll-mt-24">
        <div className="mx-auto grid max-w-6xl gap-14 px-6 py-28 md:py-40 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-6">
            <Apparition><Surtitre>04 — Questions</Surtitre></Apparition>
            <Titre texte="Avant de *passer à table.*" />
            <Apparition className="relative mt-6 hidden aspect-[4/5] overflow-hidden rounded-2xl bg-[var(--sombre)] lg:block">
              <Image src={photos.tasses.src} alt={photos.tasses.alt} fill sizes="30vw" className="object-cover" />
            </Apparition>
          </div>
          <Apparition delai={150} className="space-y-8">
            <Accordeon className="[font-variant-numeric:lining-nums]" questions={FAQ.map((q) => ({ question: q.q, reponse: q.r }))} />
            <Bouton href={`${DOSSIER}/choisir-son-cuisiniste`} variante="contour">Le guide : choisir un bon cuisiniste</Bouton>
          </Apparition>
        </div>
      </section>

      <AppelFinal />
    </main>
  );
}
