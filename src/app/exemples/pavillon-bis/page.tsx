import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import Accordeon from "../_kit/Accordeon";
import Apparition from "../_kit/Apparition";
import { AppelFinal, Bouton, Surtitre, Titre } from "./_composants/Blocs";
import Carrousel from "./_composants/Carrousel";
import Maison from "./_composants/Maison";
import TaMaison from "./_composants/TaMaison";
import { DOSSIER, LOTISSEMENT, PROJETS, QUESTIONS, VISITE, photos } from "./_composants/donnees";

// L'accueil de Pavillon Bis, l'agence d'architecture des deux vidéos des architectes. Un
// seul outil (« Remplir l'agenda » : « Sur l'accueil, un seul outil. Ta maison fait
// combien ? Tu agrandis de combien ? Le site calcule. »), qui commence par la question de
// la marque : « Ta maison ressemble à laquelle ? » — et montre ce qu'on a fait de la même.
//
// Version « carrée » (24/10/2026) : une idée par écran, sept écrans, une grille et une
// échelle de texte communes. Depuis le 30/10/2026, le premier écran est la maquette 3D
// des trois pavillons, où l'on entre voir l'avant et l'après (Carrousel.tsx). La règle des 150 m², la méthode et les honoraires vivent sur
// la page du samedi ; le lotissement se joue sur la page du n° 14. Les éléments filmés
// par les deux vidéos (data-film de l'outil) sont gardés.
export const metadata: Metadata = {
  title: "Pavillon Bis — architecte des pavillons des années 70, site de démonstration",
  description:
    "Le site d'une agence d'architecture imaginaire qui ne fait que les pavillons des années 70 : tu choisis ta maison, tu vois ce qu'on a fait de la même, le site calcule si l'architecte est obligatoire, et l'on réserve trente minutes un samedi matin.",
  ...adressesDeLaPage("/exemples/pavillon-bis"),
};

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

export default function PavillonBis() {
  return (
    <main>
      {/* ---------- Premier écran : les trois pavillons, et l'on entre ---------- */}
      <Carrousel />

      {/* ---------- 01. Le seul outil : ta maison, et architecte ou pas ---------- */}
      <section id="outil" className="scroll-mt-20">
        <div className="mx-auto max-w-6xl space-y-14 px-6 py-28 md:py-40">
          <Intitule
            numero="01"
            surtitre="Ta maison"
            titre={"Architecte *ou pas ?*"}
            texte="Choisis ta maison : tu vois ce qu'on a fait de la même. Dis ce que tu ajoutes : le site calcule, et te dit honnêtement quand tu n'as pas besoin de nous."
          />
          {/* Sans apparition : l'outil est filmé dès la première image des deux vidéos. */}
          <TaMaison />
        </div>
      </section>

      {/* ---------- Une phrase, une photo : pas du neuf ---------- */}
      <section className="relative isolate flex min-h-[88svh] items-end overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <Image src={photos.salon.src} alt="" fill sizes="100vw" className="object-cover object-[50%_60%] opacity-90" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(21,24,28,0.08)_0%,rgba(21,24,28,0.35)_45%,rgba(21,24,28,0.94)_100%)]" />
        <div className="relative mx-auto w-full max-w-6xl space-y-5 px-6 pb-16 md:pb-24">
          <Apparition><Surtitre clair>Pas du neuf</Surtitre></Apparition>
          <Titre texte="Pas de villa blanche sur un terrain vide : *les pavillons des années 70,* et rien d'autre." clair className="max-w-3xl" />
        </div>
      </section>

      {/* ---------- 02. Les maisons : une page par projet ---------- */}
      <section id="maisons" className="scroll-mt-20 bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto max-w-6xl space-y-14 px-6 py-28 md:py-40">
          <Intitule
            clair
            numero="02"
            surtitre="Les trois maisons"
            titre="Chaque projet a *sa page.*"
            texte="La maison, son année, ce qu'on en a fait, le budget et la durée. Exactement ce qu'on tape avant d'appeler un architecte."
          />
          <ul className="grid gap-x-6 gap-y-6 md:grid-cols-3 md:gap-y-10">
            {PROJETS.map((p, i) => (
              <Apparition as="li" key={p.slug} delai={i * 110}>
                <Link href={`${DOSSIER}/projets/${p.slug}`} className="group grid grid-cols-[7.5rem_1fr] items-center gap-5 md:block md:space-y-5">
                  <span className="block overflow-hidden rounded-xl bg-[#2C333B] md:rounded-2xl">
                    <Maison modele={p.modele} apres decor className="block h-auto w-full transition-transform duration-700 group-hover:scale-[1.03]" />
                  </span>
                  <span className="block space-y-2">
                    <span className="block text-[12px] font-medium uppercase tracking-[0.2em]">{p.nom} · {p.annee}</span>
                    <span className="block font-[family-name:var(--titres)] text-[1.35rem] font-medium leading-[1.08] tracking-[-0.03em] md:text-[1.75rem]">{p.titre}</span>
                    <span className="flex items-center justify-between gap-3 text-[15px]">
                      <span>{p.budget} · {p.duree}</span>
                      <span aria-hidden="true" className="text-[var(--accent-clair)] transition-transform group-hover:translate-x-1">→</span>
                    </span>
                  </span>
                </Link>
              </Apparition>
            ))}
          </ul>
          <p className="text-[14px]">Projets dessinés et budgets de travaux TTC d&apos;exemple : l&apos;agence est fictive.</p>
        </div>
      </section>

      {/* ---------- 03. Le n° 14 : tout le lotissement est invité ---------- */}
      <section className="bg-[var(--carte)]">
        <div className="mx-auto grid max-w-6xl gap-14 px-6 py-28 md:py-40 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <Apparition><Surtitre>03 — {LOTISSEMENT.nom}</Surtitre></Apparition>
            <Titre texte={"Samedi, venez voir *le n° 14.*"} />
            <Apparition as="p" delai={150} className="max-w-[26rem] text-lg leading-relaxed text-[var(--doux)]">
              Dans un lotissement, toutes les maisons sont identiques. On en transforme une, et tous les
              voisins voient la leur. {VISITE.date}, avec l&apos;accord de ses propriétaires.
            </Apparition>
            <Apparition delai={250}>
              <Bouton href={`${DOSSIER}/visite-du-14`} variante="contour">Voir le lotissement</Bouton>
            </Apparition>
          </div>
          <Apparition delai={150}>
            <ul aria-hidden="true" className="grid grid-cols-6 gap-2 rounded-2xl bg-[#DCE0DE] p-5 sm:p-7">
              {Array.from({ length: 24 }, (_, k) => (
                <li key={k} className={k === 13 ? "relative z-10 scale-125 rounded-lg bg-[var(--carte)] p-0.5 shadow-lg" : "p-0.5"}>
                  <Maison modele="sous-sol" apres={k === 13} className="block h-auto w-full" />
                </li>
              ))}
            </ul>
          </Apparition>
        </div>
      </section>

      {/* ---------- 04. Questions ---------- */}
      <section id="questions" className="scroll-mt-24">
        <div className="mx-auto grid max-w-6xl gap-14 px-6 py-28 md:py-40 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-6">
            <Apparition><Surtitre>04 — Questions</Surtitre></Apparition>
            <Titre texte="Ce que les voisins *demandent.*" />
            <Apparition className="relative mt-6 hidden aspect-[3/2] overflow-hidden rounded-2xl lg:block">
              <Image src={photos.croquis.src} alt={photos.croquis.alt} fill sizes="30vw" className="object-cover" />
            </Apparition>
          </div>
          <Apparition delai={150} className="space-y-8">
            <Accordeon questions={QUESTIONS.slice(0, 5).map((q) => ({ question: q.q, reponse: q.r }))} />
            <Bouton href={`${DOSSIER}/rendez-vous`} variante="contour">La règle, les honoraires, le samedi</Bouton>
          </Apparition>
        </div>
      </section>

      <AppelFinal />
    </main>
  );
}
