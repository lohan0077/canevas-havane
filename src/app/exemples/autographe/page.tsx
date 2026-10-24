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
import { AppelFinal, Bouton, Surtitre } from "./_composants/Blocs";
import Composeur from "./_composants/Composeur";
import { DessinProduit } from "./_composants/Dessins";
import Pot, { PotMini } from "./_composants/Pot";
import Recherche from "./_composants/Recherche";
import Signature from "./_composants/Signature";
import {
  AUTEURS, COMPOSITIONS, DEDICACE, DEGUSTATIONS, DOSSIER, QUESTIONS, auteurDe, auteursDu, boutique, photos, produit, type Budget, type Gout,
} from "./_composants/donnees";

// Le site des deux vidéos des épiceries fines. Autographe vend des auteurs : chaque
// pot porte la signature de celui qui l'a fait, on y cherche quelqu'un, pas un
// produit (« Créer une marque »). Et il répond à la question des invités : trois
// questions, un coffret de pots signés, commandé le matin, prêt le soir, et une
// dégustation d'huiles d'olive un samedi par mois (« Remplir le carnet de commandes »).
// Premier écran : une composition éditoriale — le pot signé au centre, deux photos
// posées comme des tirages, le nom en très grand.
export const metadata: Metadata = {
  title: "Autographe — épicerie fine, site de démonstration",
  description:
    "Le site d'une épicerie fine imaginaire qui vend des auteurs : chaque pot est signé, on cherche quelqu'un plutôt qu'un produit, et trois questions composent le coffret à apporter, prêt le soir même.",
  ...adressesDeLaPage("/exemples/autographe"),
};

const helene = auteurDe("helene")!;
const joseph = auteurDe("joseph")!;
const NOMBRE_POTS = AUTEURS.reduce((n, a) => n + a.oeuvres.length, 0);

const VITRINE: { gout: Gout; budget: Budget }[] = [
  { gout: "lesDeux", budget: 35 },
  { gout: "sucre", budget: 20 },
  { gout: "sale", budget: 50 },
];

const LIVRE = [
  { surtitre: "Comme un livre", titre: "Un pot a un auteur.", texte: "Son prénom est écrit sur la collerette, plus gros que le produit, et sa signature en dessous. Tu sais qui a fait ce que tu manges.", photo: photos.pots },
  { surtitre: "Comme une collection", titre: "Un auteur a un numéro.", texte: "Hélène est l'auteure n° 12. On la retrouve sur le site, on lit comment elle travaille, et tout ce qu'elle fait.", photo: photos.mielCuillere },
  { surtitre: "Comme un écrivain", titre: "Un pot se dédicace.", texte: "Un samedi, les auteurs viennent signer leurs pots à la boutique. On fait la queue, on dit un mot, on repart avec un pot signé à la main.", photo: photos.plume },
];

export default function Autographe() {
  return (
    <main>
      {/* ---------- Premier écran : le pot signé, deux tirages, le nom ---------- */}
      <section className="kit-grain relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[radial-gradient(ellipse_at_50%_38%,#FFF8EA_0%,#F6EFE3_55%,#EFE4D2_100%)]">
        <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col px-5 pb-8 pt-28 sm:px-8 md:pt-32">
          <div className="flex items-start justify-between gap-6">
            <Apparition><Surtitre>Épicerie fine · {boutique.ville}</Surtitre></Apparition>
            <Apparition delai={150} className="hidden text-right text-[13px] font-semibold uppercase tracking-[0.22em] text-[var(--doux)] md:block">
              Collection d&apos;automne
              <br />{AUTEURS.length} auteurs · {NOMBRE_POTS} pots
            </Apparition>
          </div>

          <div className="relative mt-6 grid flex-1 items-center gap-6 md:grid-cols-[1fr_1.1fr_1fr]">
            <Apparition de="gauche" delai={500} className="relative hidden self-start md:block">
              <figure className="mx-auto w-[min(15.5rem,85%)] -rotate-[5deg] bg-[#FFFCF6] p-3 pb-4 shadow-[0_30px_60px_-30px_rgba(30,42,74,0.55)]">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image src={photos.mielCuillere.src} alt={photos.mielCuillere.alt} fill priority sizes="272px" className="object-cover" />
                </div>
                <figcaption className="pt-3 text-center font-[family-name:var(--f-caveat)] text-2xl leading-none">Hélène, n° 12 · son miel</figcaption>
              </figure>
            </Apparition>
            <Apparition de="zoom" delai={150} className="relative z-10">
              <Pot auteur={helene} oeuvre={helene.oeuvres[0]} animee className="max-w-[15rem] sm:max-w-[18rem]" />
            </Apparition>
            <Apparition de="droite" delai={650} className="relative hidden self-start pt-6 md:block">
              <figure className="mx-auto w-[min(15.5rem,85%)] rotate-[4deg] bg-[#FFFCF6] p-3 pb-4 shadow-[0_30px_60px_-30px_rgba(30,42,74,0.55)]">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image src={photos.ruche.src} alt={photos.ruche.alt} fill priority sizes="272px" className="object-cover" />
                </div>
                <figcaption className="pt-3 text-center font-[family-name:var(--f-caveat)] text-2xl leading-none">Ses 80 ruches, en Ardèche</figcaption>
              </figure>
            </Apparition>
          </div>

          <TitreRevele
            as="h1"
            auChargement
            texte="Autographe"
            className="relative z-20 -mt-4 text-center text-[clamp(4.2rem,16.4vw,15rem)] font-semibold leading-[0.82] tracking-[-0.04em] md:-mt-6"
          />

          <div className="mt-7 grid gap-6 border-t-2 border-[var(--encre)] pt-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <TitreRevele
              as="p"
              auChargement
              delai={500}
              texte="Ici, un pot a un *auteur,* comme un livre. Son prénom sur l'étiquette, plus gros que le produit. Sa signature en dessous."
              className="max-w-2xl font-[family-name:var(--titres)] text-[clamp(1.4rem,2.3vw,1.9rem)] leading-[1.22]"
              classeAccent="italic text-[var(--accent-texte)]"
            />
            <Apparition delai={800} className="flex flex-wrap gap-3 lg:justify-end">
              <Bouton href={`${DOSSIER}#composer`}>{"On apporte quoi ?"}</Bouton>
              <Bouton href={`${DOSSIER}#chercher`} variante="contour">Chercher un auteur</Bouton>
            </Apparition>
          </div>
        </div>
      </section>

      {/* ---------- Les auteurs, en bandeau ---------- */}
      <div className="bg-[var(--accent)] py-5 text-[var(--sur-accent)]">
        <Defilant
          duree={44}
          elements={AUTEURS.map((a) => `${a.prenom}, ${a.metier} · n° ${a.numero}`)}
          classeElement="font-[family-name:var(--titres)] text-2xl italic whitespace-nowrap md:text-3xl"
        />
      </div>

      {/* ---------- On cherche quelqu'un ---------- */}
      <section id="chercher" className="scroll-mt-20 mx-auto grid max-w-7xl gap-x-12 gap-y-10 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="space-y-7 lg:col-start-1 lg:row-start-1 lg:self-end">
          <Apparition><Surtitre>La recherche</Surtitre></Apparition>
          <TitreRevele
            texte="Tu ne cherches pas un produit. Tu cherches *quelqu'un.*"
            className="text-[clamp(2.7rem,5.6vw,5.2rem)] font-semibold leading-[0.95] tracking-[-0.03em]"
            classeAccent="font-normal italic text-[var(--accent-texte)]"
          />
        </div>
        <Apparition de="zoom" delai={150} className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <Recherche />
        </Apparition>
        <Apparition as="p" delai={200} className="max-w-lg text-xl leading-relaxed text-[var(--doux)] lg:col-start-1 lg:row-start-2 lg:self-start">
          Un prénom, un métier, un lieu. Chaque réponse est une personne, avec sa page :
          comment elle travaille, et tout ce qu&apos;elle fait.
        </Apparition>
      </section>

      {/* ---------- On apporte quoi ? L'outil du coffret ---------- */}
      <section id="composer" className="scroll-mt-16 px-3 sm:px-5">
        <div className="kit-grain relative overflow-hidden rounded-[2rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-10 md:py-28 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div className="space-y-7 lg:sticky lg:top-28 lg:self-start">
              <Apparition><Surtitre clair>Le coffret du soir</Surtitre></Apparition>
              <TitreRevele
                texte={"Invité ce soir ? On apporte *quoi ?*"}
                className="text-[clamp(2.8rem,5.8vw,5.4rem)] font-semibold leading-[0.95] tracking-[-0.03em]"
                classeAccent="font-normal italic text-[#E8B4A8]"
              />
              <Apparition as="p" delai={200} className="max-w-md text-xl leading-relaxed text-[var(--sur-sombre)]/90">
                Pas des pots à faire défiler. Trois questions, et le coffret qu&apos;on apporterait à ta
                place : des pots signés par leurs auteurs, prêts à {boutique.retrait}.
              </Apparition>
              <Apparition as="ul" delai={300} className="space-y-3 text-lg">
                {[
                  "Trois questions, trente secondes",
                  `Commandé avant ${boutique.limite}, prêt à ${boutique.retrait}`,
                  "Ingrédients et allergènes avant de commander",
                  "Un mot pour tes hôtes, écrit à la main",
                ].map((t) => (
                  <li key={t} className="flex gap-3 border-b border-white/15 pb-3">
                    <span aria-hidden="true" className="text-[#E8B4A8]">✦</span>
                    {t}
                  </li>
                ))}
              </Apparition>
            </div>
            <Composeur />
          </div>
        </div>
      </section>

      {/* ---------- Un pot, c'est un livre ---------- */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32">
        <div className="mb-8 space-y-6 md:mb-0">
          <Apparition><Surtitre>Notre idée</Surtitre></Apparition>
          <TitreRevele
            texte="Un pot de confiture, *c'est un livre.*"
            className="max-w-4xl text-[clamp(2.8rem,6vw,5.6rem)] font-semibold leading-[0.95] tracking-[-0.03em]"
            classeAccent="font-normal italic text-[var(--accent-texte)]"
          />
        </div>
        <RecitColle
          etapes={LIVRE.map((e) => ({
            surtitre: e.surtitre,
            titre: e.titre,
            texte: <p>{e.texte}</p>,
            visuel: <Image src={e.photo.src} alt={e.photo.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />,
          }))}
        />
      </section>

      {/* ---------- Les auteurs, en mosaïque ---------- */}
      <section className="border-y-2 border-[var(--encre)] bg-[var(--carte)] py-24 md:py-32">
        <div className="mx-auto max-w-7xl space-y-12 px-5 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="space-y-6">
              <Apparition><Surtitre>La collection</Surtitre></Apparition>
              <TitreRevele
                texte="Six auteurs, *et tout ce qu'ils font.*"
                className="max-w-3xl text-[clamp(2.6rem,5.4vw,5rem)] font-semibold leading-[0.95] tracking-[-0.03em]"
                classeAccent="font-normal italic text-[var(--accent-texte)]"
              />
            </div>
            <Apparition delai={150}><Bouton href={`${DOSSIER}/auteurs`} variante="encre">Tout le catalogue</Bouton></Apparition>
          </div>
          <ul className="grid gap-4 md:grid-cols-3">
            {AUTEURS.map((a, i) => {
              const grand = i === 0;
              return (
                <Apparition as="li" key={a.slug} delai={i * 90} de="zoom" className={grand ? "md:col-span-2 md:row-span-2" : ""}>
                  <CarteLueur className="h-full">
                    <Link
                      href={`${DOSSIER}/auteurs/${a.slug}`}
                      data-auteur={a.slug}
                      className={`group relative flex h-full flex-col justify-between gap-6 overflow-hidden border-2 border-[var(--encre)] p-6 ${grand ? "min-h-[420px] bg-[var(--sombre)] text-[var(--sur-sombre)] md:min-h-full" : "min-h-[250px] bg-[var(--fond)]"}`}
                    >
                      {grand && (
                        <>
                          <Image src={photos.ruche.src} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover opacity-55 transition-transform duration-[1.4s] group-hover:scale-[1.05]" />
                          <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(30,42,74,0.15)_20%,rgba(30,42,74,0.95)_100%)]" />
                        </>
                      )}
                      <span className="relative flex items-start justify-between gap-3">
                        <span className={`px-2.5 py-1 text-sm font-semibold [font-variant-numeric:lining-nums] ${grand ? "bg-[var(--sombre)] text-[var(--sur-sombre)]" : "bg-[var(--encre)] text-[var(--fond)]"}`}>n° {a.numero}</span>
                        {!grand && <PotMini auteur={a} oeuvre={a.oeuvres[0]} petit />}
                      </span>
                      <span className="relative space-y-2">
                        <span className={`block font-[family-name:var(--titres)] font-semibold leading-none group-hover:italic ${grand ? "text-[clamp(4rem,8vw,7rem)]" : "text-5xl"}`}>{a.prenom}</span>
                        <Signature variante={a.signature} couleur={grand ? "#E8B4A8" : "#B43A2E"} className={grand ? "h-12 w-60" : "h-8 w-40"} />
                        <span className={`block ${grand ? "text-xl" : "text-[17px] text-[var(--doux)]"}`}>{a.metier}, {a.chiffre} {a.lieu}</span>
                      </span>
                    </Link>
                  </CarteLueur>
                </Apparition>
              );
            })}
          </ul>
          <p className="text-sm text-[var(--doux)]">Auteurs, prénoms, lieux et pots d&apos;exemple : l&apos;épicerie est fictive.</p>
        </div>
      </section>

      {/* ---------- La collerette ---------- */}
      <section className="mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div className="space-y-7">
          <Apparition><Surtitre>L&apos;étiquette</Surtitre></Apparition>
          <TitreRevele
            texte="Son nom d'abord. *Le produit ensuite.*"
            className="text-[clamp(2.6rem,5.4vw,5rem)] font-semibold leading-[0.95] tracking-[-0.03em]"
            classeAccent="font-normal italic text-[var(--accent-texte)]"
          />
          <Apparition as="ol" delai={200} className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
            {[
              ["Le prénom", "plus gros que le nom du produit"],
              ["La signature", "imprimée ; signée à la main le jour des dédicaces"],
              ["Le numéro", "celui de l'auteur dans la collection"],
              ["Au dos", "l'étiquette du producteur, intacte : ingrédients, allergènes, poids, origine"],
            ].map(([t, x], i) => (
              <li key={t} className="grid grid-cols-[2.5rem_1fr] gap-4 py-4">
                <span className="font-[family-name:var(--titres)] text-2xl text-[var(--accent-texte)] [font-variant-numeric:lining-nums]">{i + 1}</span>
                <span>
                  <span className="block font-[family-name:var(--titres)] text-2xl font-semibold">{t}</span>
                  <span className="text-lg text-[var(--doux)]">{x}</span>
                </span>
              </li>
            ))}
          </Apparition>
          <p className="max-w-lg text-[15px] leading-relaxed text-[var(--doux)]">
            La collerette s&apos;ajoute à l&apos;étiquette du producteur, elle ne la remplace pas. Et sur
            le site, chaque pot affiche ses ingrédients et ses allergènes en gras, avant de le mettre de
            côté.
          </p>
        </div>
        <Apparition de="zoom" className="relative">
          <div aria-hidden="true" className="absolute inset-x-6 bottom-0 top-10 rounded-t-full bg-[#EFE4D2]" />
          <div className="relative px-6 pb-10 pt-6">
            <Pot auteur={joseph} oeuvre={joseph.oeuvres[0]} className="max-w-[19rem]" />
          </div>
        </Apparition>
      </section>

      {/* ---------- Les coffrets ---------- */}
      <section className="bg-[#EFE4D2] py-24 md:py-32">
        <div className="mx-auto max-w-7xl space-y-12 px-5 sm:px-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-end">
            <div className="space-y-6">
              <Apparition><Surtitre>Les coffrets</Surtitre></Apparition>
              <TitreRevele
                texte="Neuf coffrets, *tous signés.*"
                className="text-[clamp(2.6rem,5.4vw,5rem)] font-semibold leading-[0.95] tracking-[-0.03em]"
                classeAccent="font-normal italic text-[var(--accent-texte)]"
              />
            </div>
            <Apparition as="p" delai={150} className="text-xl leading-relaxed text-[var(--doux)]">
              Trois goûts, trois budgets. Le prix comprend les pots, la boîte, la ficelle et la carte
              écrite à la main.
            </Apparition>
          </div>
          <ul className="grid gap-5 md:grid-cols-3">
            {VITRINE.map(({ gout, budget }, i) => {
              const c = COMPOSITIONS[gout][budget];
              return (
                <Apparition as="li" key={c.nom} delai={i * 120} de="zoom">
                  <CarteLueur className="h-full">
                    <div className="flex h-full flex-col gap-5 border-2 border-[var(--encre)] bg-[var(--carte)] p-6">
                      <div className="flex items-end justify-center gap-1 bg-[#C8A06A] px-4 pt-6">
                        {c.contenu.map((cle) => {
                          const { oeuvre } = produit(cle);
                          return <DessinProduit key={cle} dessin={oeuvre.dessin} teinte={oeuvre.teinte} className="h-20 w-14" />;
                        })}
                      </div>
                      <div className="flex items-baseline justify-between gap-3">
                        <h3 className="text-[1.7rem] font-semibold">{c.nom}</h3>
                        <p className="whitespace-nowrap font-[family-name:var(--titres)] text-3xl font-semibold [font-variant-numeric:lining-nums]">{budget} €</p>
                      </div>
                      <p className="text-lg text-[var(--doux)]">
                        Signé {auteursDu(c.contenu).map((a) => a.prenom).join(", ")}
                      </p>
                      <p className="mt-auto text-xs font-semibold uppercase tracking-[0.14em] text-[var(--doux)]">TTC · prix d&apos;exemple</p>
                    </div>
                  </CarteLueur>
                </Apparition>
              );
            })}
          </ul>
          <Apparition><Bouton href={`${DOSSIER}/coffrets`} variante="encre">Les neuf, avec leurs ingrédients</Bouton></Apparition>
        </div>
      </section>

      {/* ---------- Les samedis ---------- */}
      <section className="mx-auto max-w-7xl space-y-12 px-5 py-24 sm:px-8 md:py-32">
        <div className="space-y-6">
          <Apparition><Surtitre>Les samedis</Surtitre></Apparition>
          <TitreRevele
            texte="On signe. *On goûte.*"
            className="text-[clamp(2.8rem,6vw,5.6rem)] font-semibold leading-[0.95] tracking-[-0.03em]"
            classeAccent="font-normal italic text-[var(--accent-texte)]"
          />
        </div>
        <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <Apparition de="zoom" className="relative overflow-hidden bg-[var(--accent)] p-8 text-[var(--sur-accent)] sm:p-12">
            <p className="text-sm font-semibold uppercase tracking-[0.18em]">{DEDICACE.date} {DEDICACE.annee} · {DEDICACE.heure}</p>
            <h3 className="mt-5 text-[clamp(3rem,6vw,5.5rem)] font-semibold leading-[0.9]">Séance de <em className="font-normal">dédicace.</em></h3>
            <ol className="mt-8 divide-y divide-white/25 border-y border-white/25">
              {DEDICACE.programme.map((p) => {
                const a = auteurDe(p.slug)!;
                return (
                  <li key={p.slug} className="grid grid-cols-[7.5rem_1fr] gap-3 py-3.5">
                    <span className="text-[15px] tabular-nums">{p.heure}</span>
                    <span><span className="font-[family-name:var(--titres)] text-2xl font-semibold">{a.prenom}</span> <span className="text-[15px]">{p.quoi}</span></span>
                  </li>
                );
              })}
            </ol>
            <div className="mt-8"><Bouton href={`${DOSSIER}/dedicaces`} variante="clair">Le programme</Bouton></div>
            <Signature variante={1} couleur="#FBF7EF" className="pointer-events-none absolute -right-6 top-6 hidden h-20 w-80 opacity-60 sm:block" />
          </Apparition>
          <Apparition de="zoom" delai={150} className="relative isolate flex flex-col justify-between gap-8 overflow-hidden bg-[#3D4A1E] p-8 text-[#F6EFE3] sm:p-10">
            <Image src={photos.huile.src} alt="" fill sizes="(min-width: 1024px) 40vw, 100vw" className="-z-10 object-cover opacity-20" />
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.18em]">Un samedi par mois · gratuit</p>
              <h3 className="text-[clamp(2.4rem,4.4vw,3.8rem)] font-semibold leading-[0.95]">Samedi, on goûte <em className="font-normal">l&apos;huile d&apos;olive.</em></h3>
              <p className="text-lg leading-relaxed">
                Les trois huiles de Lina, à l&apos;aveugle. Vingt places autour de la grande table : c&apos;est
                le nombre de chaises, pas une de plus.
              </p>
            </div>
            <ul className="flex flex-wrap gap-2">
              {DEGUSTATIONS.slice(0, 4).map((d) => (
                <li key={d.libelle} className={`border px-3 py-1.5 text-[15px] font-semibold ${d.pris ? "border-white/40 line-through" : "border-[#E9C46A] bg-[#E9C46A] text-[#2A2118]"}`}>
                  {d.libelle}
                </li>
              ))}
            </ul>
            <Bouton href={`${DOSSIER}/degustations`} variante="clair">Choisir mon samedi</Bouton>
          </Apparition>
        </div>
      </section>

      {/* ---------- Questions ---------- */}
      <section id="questions" className="scroll-mt-24 border-t-2 border-[var(--encre)] bg-[var(--carte)]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[0.75fr_1.25fr]">
          <div className="space-y-6">
            <Apparition><Surtitre>Vos questions</Surtitre></Apparition>
            <TitreRevele
              texte="Les questions *d'avant.*"
              className="text-[clamp(2.6rem,5vw,4.6rem)] font-semibold leading-[0.95] tracking-[-0.03em]"
              classeAccent="font-normal italic text-[var(--accent-texte)]"
            />
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
