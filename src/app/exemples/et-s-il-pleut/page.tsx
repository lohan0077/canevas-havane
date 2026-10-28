import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import Accordeon from "../_kit/Accordeon";
import Apparition from "../_kit/Apparition";
import PhotoCinema from "../_kit/PhotoCinema";
import TitreRevele from "../_kit/TitreRevele";
import Bascule from "./_composants/Bascule";
import { ACCENT_SOMBRE, AppelFinal, Bouton, Surtitre, Titre } from "./_composants/Blocs";
import Formules from "./_composants/Formules";
import Retroplanning from "./_composants/Retroplanning";
import { DOSSIER, QUESTIONS, photos } from "./_composants/donnees";

// L'accueil d'« Et s'il pleut », la wedding planner des deux vidéos des wedding
// planners. De « Créer une marque » : le plan B, la bascule soleil / pluie (filmée,
// [data-film=bascule]). De « Remplir l'agenda » : une seule question, « tu te maries
// quand ? » (#ma-date, filmée), et le prix sur l'accueil (#prix, filmé).
//
// Version « carrée » (24/10/2026) : une idée par écran, sept écrans, une grille et une
// échelle de texte communes. Le protocole météo et le devis vivent sur « Deux
// versions », les parapluies et les coulisses sur leurs pages.
export const metadata: Metadata = {
  title: "Et s'il pleut — wedding planner, site de démonstration",
  description:
    "Le site d'une wedding planner imaginaire qui vend le plan B : chaque mariage en deux versions, soleil ou pluie, chiffrées dans le même devis ; ta date, ton rétroplanning et le prix, sur l'accueil.",
  ...adressesDeLaPage("/exemples/et-s-il-pleut"),
};

const PAGES = [
  { href: `${DOSSIER}/deux-versions#devis`, titre: "Le devis, en deux versions", detail: "Le plan B ligne par ligne, et le protocole météo" },
  { href: `${DOSSIER}/parapluies`, titre: "Cent parapluies jaunes", detail: "Aux prénoms des mariés, les invités repartent avec" },
  { href: `${DOSSIER}/coulisses`, titre: "Les coulisses", detail: "Ce que les invités n'ont pas vu, avec l'accord des mariés" },
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

export default function EtSilPleut() {
  return (
    <main>
      {/* ---------- Premier écran : un parapluie jaune sur l'eau, la question ---------- */}
      <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
        {/* Le parapluie posé sur l'eau, cadré bas : il flotte au-dessus du titre. */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="kit-parallaxe absolute -inset-[8%]">
            <Image
              src={photos.lac.src}
              alt=""
              fill
              priority
              sizes="100vw"
              className="kit-cinema-img object-cover object-[50%_84%] opacity-75"
              style={{ "--kit-origine": "45% 62%" } as React.CSSProperties}
            />
          </div>
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(47,59,76,0.75)_0%,rgba(47,59,76,0.15)_30%,rgba(47,59,76,0.35)_55%,rgba(47,59,76,0.97)_88%)]" />
        <div className="absolute inset-x-0 bottom-0 h-3/5 bg-[linear-gradient(180deg,transparent,rgba(47,59,76,0.7)_45%)] sm:hidden" />
        <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col justify-end gap-7 px-6 pb-14 pt-36 md:pb-20">
          <Apparition><Surtitre clair>Wedding planner · Rouen et la Normandie</Surtitre></Apparition>
          <TitreRevele
            as="h1"
            auChargement
            texte={"Et s'il *pleut ?*"}
            className="text-[clamp(3.6rem,10vw,8.5rem)] font-normal leading-[0.95] tracking-[-0.03em]"
            classeAccent={ACCENT_SOMBRE}
          />
          <Apparition as="p" delai={450} className="max-w-[26rem] text-lg leading-relaxed">
            C&apos;est prévu. Chaque mariage en deux versions, soleil ou pluie — et les deux dans le
            même devis.
          </Apparition>
          <Apparition delai={650}>
            <Bouton href={`${DOSSIER}#deux-versions`}>Voir les deux versions</Bouton>
          </Apparition>
        </div>
      </section>

      {/* ---------- 01. L'outil de la marque : chaque mariage en deux versions ---------- */}
      <section id="deux-versions" className="scroll-mt-24">
        <div className="mx-auto grid max-w-6xl gap-16 px-6 py-28 md:py-40 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <Apparition><Surtitre>01 — Deux versions</Surtitre></Apparition>
            <Titre texte="Soleil, *ou pluie.*" />
            <Apparition as="p" delai={150} className="max-w-[26rem] text-lg leading-relaxed text-[var(--doux)]">
              Tu bascules, et tu vois ton mariage dans les deux cas. Les lieux changent ; l&apos;heure, le
              déroulé et les gens restent.
            </Apparition>
          </div>
          <Apparition delai={150}>
            <Bascule />
          </Apparition>
        </div>
      </section>

      {/* ---------- 02. Une seule question : tu te maries quand ? ---------- */}
      <section id="ma-date" className="scroll-mt-0 bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto grid max-w-6xl gap-16 px-6 py-28 md:py-40 lg:grid-cols-2 lg:items-start">
          <div className="space-y-6 lg:sticky lg:top-28">
            <Apparition><Surtitre clair>02 — Ta date</Surtitre></Apparition>
            <Titre texte={"Tu te maries *quand ?*"} clair />
            <Apparition as="p" delai={150} className="max-w-[26rem] text-lg leading-relaxed">
              Une seule question sur l&apos;accueil. Tu entres ta date : le site compte les samedis qui
              restent et te sort ton rétroplanning, mois par mois.
            </Apparition>
          </div>
          <Apparition delai={150} className="text-[var(--encre)]">
            <Retroplanning />
          </Apparition>
        </div>
      </section>

      {/* ---------- Une phrase, une photo : le plan B ---------- */}
      <section className="relative isolate flex min-h-[88svh] items-end overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <PhotoCinema src={photos.fenetre.src} alt="" origine="50% 50%" className="opacity-80" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(47,59,76,0.1)_0%,rgba(47,59,76,0.35)_45%,rgba(47,59,76,0.94)_100%)]" />
        <div className="relative mx-auto w-full max-w-6xl space-y-5 px-6 pb-16 md:pb-24">
          <Apparition><Surtitre clair>Ce qu&apos;on vend</Surtitre></Apparition>
          <Titre texte="On ne vend pas le mariage parfait. On vend *le plan B.*" clair className="max-w-3xl" />
        </div>
      </section>

      {/* ---------- 03. Le prix, sur l'accueil ---------- */}
      <section id="prix" className="scroll-mt-24 bg-[var(--carte)]">
        <div className="mx-auto max-w-6xl space-y-14 px-6 py-28 md:py-40">
          <Intitule
            numero="03"
            surtitre="Les prix"
            titre="Sur l'accueil, *pas dans un PDF.*"
            texte="Trois formules, plan B compris dans chacune. Le prix, ici, tout de suite — pas trois jours plus tard."
          />
          <div className="grid gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            <Apparition delai={100}><Formules /></Apparition>
            <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
              {PAGES.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} className="group grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 py-5">
                    <span className="font-[family-name:var(--titres)] text-2xl font-normal">{p.titre}</span>
                    <span aria-hidden="true" className="text-[var(--accent-texte)] transition-transform group-hover:translate-x-1">→</span>
                    <span className="col-span-2 text-[15px] text-[var(--doux)]">{p.detail}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------- 04. Questions ---------- */}
      <section id="questions" className="scroll-mt-24">
        <div className="mx-auto grid max-w-6xl gap-14 px-6 py-28 md:py-40 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-6">
            <Apparition><Surtitre>04 — Questions</Surtitre></Apparition>
            <Titre texte="Avant *le grand jour.*" />
            <Apparition className="relative mt-6 hidden aspect-[4/5] overflow-hidden rounded-2xl lg:block">
              <Image src={photos.arche.src} alt={photos.arche.alt} fill sizes="30vw" className="object-cover" />
            </Apparition>
          </div>
          <Apparition delai={150}>
            <Accordeon questions={QUESTIONS.slice(0, 5)} />
          </Apparition>
        </div>
      </section>

      <AppelFinal />
    </main>
  );
}
