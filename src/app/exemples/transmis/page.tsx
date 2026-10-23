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
import { AppelFinal, Bouton, CartesMenu, Eventail, MOUTARDE, Note, SAUCE, Tirage } from "./_composants/Blocs";
import EnvoiRecette from "./_composants/EnvoiRecette";
import Invites from "./_composants/Invites";
import { COMPRIS, DEGUSTATIONS, DOSSIER, ETAPES, MARIAGES, MENU_EXEMPLE, QUESTIONS, RECETTES, euros, photos, prixParPersonne } from "./_composants/donnees";

// L'accueil de Transmis. « Créer une marque » : « Sur le site, un seul bouton : envoie ta
// recette de famille. En photo. » (#recette). « Remplir l'agenda » : « Sur l'accueil, une
// seule question : combien d'invités ? Tu glisses, et le prix par personne s'affiche.
// Avec un menu complet, en exemple. » (#outil-invites, #menu-exemple).
export const metadata: Metadata = {
  title: "Transmis — traiteur, site de démonstration",
  description:
    "Le site d'une maison de traiteur imaginaire qui sert la recette de ta famille à cent vingt : envoie la page du cahier, viens goûter, et vois le prix par personne selon tes invités.",
  ...adressesDeLaPage("/exemples/transmis"),
};

const TITRE = "font-[family-name:var(--titres)] font-normal leading-[0.95] tracking-[-0.02em]";

export default function Transmis() {
  return (
    <main>
      {/* ---------- Premier écran : le papier, le titre, les fiches en éventail ---------- */}
      <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[var(--fond)] [background-image:repeating-linear-gradient(180deg,transparent_0_39px,rgba(201,214,227,.45)_39px_40px)]">
        <div aria-hidden="true" className="absolute inset-y-0 left-[8%] hidden w-px bg-[#E3A39A] md:block" />
        <Apparition de="gauche" delai={700} className="absolute left-[3%] top-[22%] hidden w-[220px] [clip-path:none] xl:block">
          <Tirage photo={photos.mains} angle={-6} sizes="220px" />
        </Apparition>
        <Apparition de="droite" delai={850} className="absolute right-[3%] top-[18%] hidden w-[230px] [clip-path:none] xl:block">
          <Tirage photo={photos.ragout} angle={5} sizes="230px" />
        </Apparition>
        <div className="relative mx-auto flex w-full max-w-5xl flex-1 flex-col items-center px-5 pt-32 text-center sm:px-8 md:pt-40">
          <Apparition><Note className="mx-auto w-fit">maison de traiteur · depuis la recette</Note></Apparition>
          <TitreRevele
            as="h1"
            auChargement
            texte="Le plat de ta grand-mère, *servi à 120.*"
            className={`mt-6 text-[clamp(3.6rem,9.5vw,8.6rem)] ${TITRE}`}
            classeAccent={SAUCE}
          />
          <Apparition as="p" delai={500} className="mt-7 max-w-2xl text-lg leading-relaxed text-[var(--doux)] md:text-xl">
            Une recette, ça ne s&apos;achète pas&nbsp;: ça se transmet. Envoie la page du cahier, on la refait en cuisine, tu viens
            goûter — et le jour J, on la sert à tous tes invités.
          </Apparition>
          <Apparition delai={700} className="mt-8 flex flex-wrap justify-center gap-3">
            <Bouton href={`${DOSSIER}#recette`}>Envoyer ma recette</Bouton>
            <Bouton href={`${DOSSIER}#invites`} variante="trait">Combien d&apos;invités&nbsp;?</Bouton>
          </Apparition>
          <div className="mt-auto w-full pt-10">
            <Eventail />
          </div>
        </div>
      </section>

      {/* ---------- Les recettes, en défilé ---------- */}
      <div className="bg-[var(--sombre)] py-5 text-[var(--sur-sombre)]">
        <Defilant
          duree={50}
          separateur="✻"
          elements={RECETTES.map((r) => `${r.plat} de ${r.de}, ${r.annee}`)}
          classeElement="whitespace-nowrap font-[family-name:var(--titres)] text-2xl italic md:text-3xl"
        />
      </div>

      {/* ---------- Un seul bouton : envoie ta recette ---------- */}
      <section id="recette" className="scroll-mt-24 mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div className="space-y-6 lg:sticky lg:top-28">
          <Apparition><Note>un seul bouton.</Note></Apparition>
          <TitreRevele texte="Envoie ta recette *de famille.*" className={`text-[clamp(3rem,6.5vw,5.8rem)] ${TITRE}`} classeAccent={SAUCE} />
          <Apparition as="p" delai={150} className="max-w-md text-lg leading-relaxed text-[var(--doux)]">
            En photo. La page du cahier, telle qu&apos;elle est&nbsp;: tachée de sauce, raturée, avec «&nbsp;une bonne poignée&nbsp;» en
            guise de mesure. C&apos;est elle qu&apos;on veut.
          </Apparition>
        </div>
        <Apparition de="zoom" className="rounded-[28px] border border-[var(--trait)] bg-[#F3EAD7] p-4 shadow-[0_40px_80px_-50px_rgba(31,59,45,.8)] sm:p-7">
          <EnvoiRecette />
        </Apparition>
      </section>

      {/* ---------- Combien d'invités ? : la bande sombre aux coins arrondis ---------- */}
      <section id="invites" className="scroll-mt-20 px-3 sm:px-5">
        <div className="kit-grain relative overflow-hidden rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
          <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(233,196,106,0.2),transparent)]" />
          <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:px-10 md:py-28 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div className="space-y-6">
              <Apparition><Note clair>une seule question</Note></Apparition>
              <TitreRevele texte={"Combien *d'invités ?*"} className={`text-[clamp(3.4rem,7vw,6.4rem)] ${TITRE}`} classeAccent={MOUTARDE} />
              <Apparition as="p" delai={150} className="max-w-md text-lg leading-relaxed text-[var(--sur-sombre)]/90">
                Tu glisses, et le prix par personne s&apos;affiche. Toutes taxes comprises, pour un menu complet. Pas de «&nbsp;sur
                devis&nbsp;» pour savoir si tu peux te le permettre.
              </Apparition>
            </div>
            <Apparition de="droite"><Invites /></Apparition>
          </div>
        </div>
      </section>

      {/* ---------- Le menu complet, en exemple ---------- */}
      <section id="menu-exemple" className="scroll-mt-20 mx-auto max-w-7xl space-y-10 px-5 py-24 sm:px-8 md:py-32">
        <div className="grid gap-6 md:grid-cols-2 md:items-end">
          <div className="space-y-5">
            <Apparition><Note>un menu complet, en exemple</Note></Apparition>
            <TitreRevele texte="Le menu *de juin.*" className={`text-[clamp(3rem,6.5vw,5.8rem)] ${TITRE}`} classeAccent={SAUCE} />
          </div>
          <Apparition as="p" delai={150} className="text-lg leading-relaxed text-[var(--doux)]">
            Une entrée et un dessert de saison, et au milieu, le plat de ta famille. Chaque plat dit ce qu&apos;il contient&nbsp;:
            les quatorze allergènes, plat par plat.
          </Apparition>
        </div>
        <CartesMenu menu={MENU_EXEMPLE} />
        <Apparition className="grid gap-6 rounded-[28px] border border-[var(--trait)] bg-[var(--carte)] p-6 sm:p-8 md:grid-cols-[1.2fr_1fr] md:items-center">
          <ul className="grid gap-2.5 sm:grid-cols-2">
            {COMPRIS.map((c) => (
              <li key={c} className="flex gap-3"><span aria-hidden="true" className="text-[var(--accent-texte)]">✓</span>{c}</li>
            ))}
          </ul>
          <div className="space-y-3">
            <p className="font-[family-name:var(--titres)] text-[52px] leading-none tabular-nums">
              {euros(prixParPersonne(100))} <span className="font-[family-name:var(--texte)] text-[16px]">TTC par personne</span>
            </p>
            <p className="text-[14px] text-[var(--doux)]">Pour 100 invités · prix d&apos;exemple</p>
            <Bouton href={`${DOSSIER}/degustation`}>Viens goûter ce menu</Bouton>
          </div>
        </Apparition>
      </section>

      {/* ---------- De la recette à la table, raconté ---------- */}
      <section className="border-y border-[var(--trait)] bg-[#F3EAD7]">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32">
          <div className="mb-6 space-y-5 md:mb-0">
            <Apparition><Note>de la page à la table</Note></Apparition>
            <TitreRevele texte="Et c'est ta grand-mère *qui valide.*" className={`max-w-4xl text-[clamp(3rem,6.5vw,5.8rem)] ${TITRE}`} classeAccent={SAUCE} />
          </div>
          <RecitColle
            etapes={ETAPES.map((e, i) => ({
              surtitre: `Étape ${i + 1}`,
              titre: e.titre,
              texte: <p>{e.texte}</p>,
              visuel: <Image src={photos[e.photo].src} alt={photos[e.photo].alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />,
            }))}
          />
          <Apparition className="mt-6"><Bouton href={`${DOSSIER}/de-la-recette-a-la-table`}>Ouvrir le carnet d&apos;essais</Bouton></Apparition>
        </div>
      </section>

      {/* ---------- Dix secondes de silence ---------- */}
      <section className="kit-grain relative isolate overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <PhotoCinema src={photos.sauce.src} alt="" origine="50% 50%" className="opacity-45" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(22,41,31,0.55)_0%,rgba(22,41,31,0.92)_75%)]" />
        <div className="relative mx-auto max-w-5xl space-y-6 px-5 py-32 text-center sm:px-8 md:py-44">
          <Apparition><Note clair className="mx-auto w-fit">le jour J</Note></Apparition>
          <TitreRevele
            texte={"Les assiettes arrivent. *Dix secondes de silence.*"}
            className={`mx-auto text-[clamp(3rem,7.5vw,6.8rem)] ${TITRE}`}
            classeAccent={MOUTARDE}
          />
          <Apparition as="p" delai={200} className="mx-auto max-w-2xl text-lg leading-relaxed text-[var(--sur-sombre)]/90">
            Toutes ensemble, au signal du chef. Et sur chaque table, une carte&nbsp;: d&apos;où vient le plat, et qui l&apos;a
            transmis. Ça ne vend pas un repas&nbsp;: ça vend de la mémoire.
          </Apparition>
          <Apparition delai={300} className="flex justify-center"><Bouton href={`${DOSSIER}/carte-de-table`} variante="creme">Écrire ma carte de table</Bouton></Apparition>
        </div>
      </section>

      {/* ---------- Une page par mariage : le bento ---------- */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32">
        <div className="mb-12 grid gap-6 md:grid-cols-[1fr_0.8fr] md:items-end">
          <div className="space-y-5">
            <Apparition><Note>ce que les gens tapent</Note></Apparition>
            <TitreRevele texte="Chaque mariage *devient une page.*" className={`text-[clamp(3rem,6.5vw,5.8rem)] ${TITRE}`} classeAccent={SAUCE} />
          </div>
          <Apparition as="p" delai={150} className="text-lg leading-relaxed text-[var(--doux)]">
            «&nbsp;Combien coûte un traiteur de mariage pour 100 personnes&nbsp;?&nbsp;» Voilà la réponse&nbsp;: le nombre d&apos;invités, le menu,
            le plat de famille, le prix par personne. Des exemples&nbsp;: aucun nom, aucune photo d&apos;invités.
          </Apparition>
        </div>
        <ul className="grid gap-4 md:grid-cols-6">
          {MARIAGES.map((m, i) => (
            <Apparition as="li" key={m.slug} delai={i * 120} de="zoom" className={i === 0 ? "md:col-span-3 md:row-span-2" : "md:col-span-3"}>
              <CarteLueur className="h-full rounded-[26px]">
                <Link href={`${DOSSIER}/mariages/${m.slug}`} className="group relative flex h-full min-h-[260px] flex-col justify-end overflow-hidden rounded-[26px] bg-[var(--sombre)] p-6 text-[var(--sur-sombre)] md:min-h-[300px]">
                  <Image src={m.photo.src} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover opacity-55 transition-transform duration-[1.4s] ease-out group-hover:scale-[1.06]" />
                  <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(22,41,31,0.15)_20%,rgba(22,41,31,0.95)_100%)]" />
                  <span className="relative space-y-2">
                    <span className="block text-[12px] uppercase tracking-[0.22em] text-[#E9C46A]">Mariage n° {m.numero} · exemple</span>
                    <span className="block font-[family-name:var(--titres)] text-[clamp(2rem,3.4vw,3rem)] leading-[1.02]">{m.titre}</span>
                    <span className="block text-[15px] text-[var(--sur-sombre)]/90">{m.menu.plat.nom} · {euros(prixParPersonne(m.invites))} TTC par personne</span>
                  </span>
                </Link>
              </CarteLueur>
            </Apparition>
          ))}
        </ul>
      </section>

      {/* ---------- La dégustation ---------- */}
      <section className="border-t border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="space-y-6">
            <Apparition><Note>pour remplir le carnet</Note></Apparition>
            <TitreRevele texte="Tu viens *goûter.*" className={`text-[clamp(3.2rem,7vw,6.2rem)] ${TITRE}`} classeAccent={SAUCE} />
            <Apparition as="p" delai={150} className="max-w-md text-lg leading-relaxed text-[var(--doux)]">
              La dégustation se réserve en ligne, comme une table au restaurant&nbsp;: un samedi, une heure, pour deux. Tu
              goûtes ton menu et le dernier essai de ta recette.
            </Apparition>
            <Apparition delai={250}><Bouton href={`${DOSSIER}/degustation`}>Réserver ma dégustation</Bouton></Apparition>
          </div>
          <Apparition de="droite" className="grid grid-cols-2 gap-2.5">
            {DEGUSTATIONS.map((c) => (
              <div key={c.id} className={`rounded-[18px] border px-4 py-3 ${c.pris ? "border-[var(--trait)] text-[var(--doux)]" : "border-[var(--encre)]/30 bg-[var(--fond)]"}`}>
                <p className="font-[family-name:var(--titres)] text-[22px] leading-tight">{c.jour}</p>
                <p className="text-[14px]">{c.heure} · pour deux · {c.pris ? "complet" : "libre"}</p>
              </div>
            ))}
            <p className="col-span-2 text-[13px] text-[var(--doux)]">Créneaux d&apos;exemple : l&apos;entreprise est fictive.</p>
          </Apparition>
        </div>
      </section>

      {/* ---------- Questions ---------- */}
      <section id="questions" className="scroll-mt-24 mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[0.75fr_1.25fr]">
        <div className="space-y-6">
          <Apparition><Note>tes questions</Note></Apparition>
          <TitreRevele texte="Avant de *nous écrire.*" className={`text-[clamp(3rem,5.5vw,4.8rem)] ${TITRE}`} classeAccent={SAUCE} />
          <Apparition de="droite" className="mt-6 hidden max-w-[260px] [clip-path:none] lg:block">
            <Tirage photo={photos.papier} angle={-3} sizes="260px" />
          </Apparition>
        </div>
        <Apparition delai={150}>
          <Accordeon questions={QUESTIONS.map((q) => ({ question: q.q, reponse: q.r }))} />
        </Apparition>
      </section>

      <AppelFinal />
    </main>
  );
}
