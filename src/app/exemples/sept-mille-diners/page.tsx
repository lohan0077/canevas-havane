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
import { AppelFinal, Appli, Bouton, Surtitre } from "./_composants/Blocs";
import TaVie from "./_composants/TaVie";
import TesMurs from "./_composants/TesMurs";
import Ticket from "./_composants/Ticket";
import { COMPRIS, DOSSIER, ETAPES, FAQ, GAMMES, QUESTIONS_GUIDE, SOIREES, euros, photos } from "./_composants/donnees";

// L'accueil de Sept Mille Dîners. Il réunit les deux vidéos des cuisinistes : « Créer
// une marque » (le nom, les trois questions sur ta vie, le premier dîner) et « Remplir
// l'agenda » (la longueur de tes murs qui dessine ta cuisine et sa fourchette pose
// comprise, le guide, la pose filmée en accéléré). Composition du premier écran : un
// titre immense, et une arche — le bord d'une assiette — où respire la table du soir.
export const metadata: Metadata = {
  title: "Sept Mille Dîners — cuisines sur mesure, site de démonstration",
  description:
    "Le site d'une marque de cuisines imaginaire : pas de catalogue, trois questions sur ta vie et le plan qui va avec ; la longueur de tes murs et une fourchette TTC pose comprise ; le soir de la pose, le premier dîner.",
  ...adressesDeLaPage("/exemples/sept-mille-diners"),
};

const PHOTOS_ETAPES = [photos.salle, photos.comptoir, photos.planBois, photos.herbes, photos.service];

export default function SeptMilleDiners() {
  return (
    <main>
      {/* ---------- Premier écran : le nombre, et la table dans une arche ---------- */}
      <section className="kit-grain relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[var(--fond)]">
        <div aria-hidden="true" className="absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(181,82,59,0.16),transparent_65%)]" />
        <div className="relative mx-auto grid w-full max-w-7xl flex-1 gap-10 px-5 pb-12 pt-32 sm:px-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-center lg:gap-14 lg:pt-32">
          <div className="flex flex-col justify-end gap-7">
            <Apparition><Surtitre>Cuisines sur mesure · Ta Ville</Surtitre></Apparition>
            <TitreRevele
              as="h1"
              auChargement
              texte="Sept mille *dîners.*"
              className="font-[family-name:var(--titres)] text-[clamp(4.4rem,12vw,11.5rem)] leading-[0.84] tracking-[-0.045em]"
              classeAccent="italic text-[var(--accent-texte)]"
            />
            <TitreRevele
              as="p"
              auChargement
              delai={350}
              texte="On vend des dîners. *Les meubles sont fournis.*"
              className="max-w-2xl font-[family-name:var(--titres)] text-[clamp(1.6rem,3vw,2.5rem)] leading-[1.12] tracking-[-0.01em]"
              classeAccent="italic"
            />
            <Apparition delai={650} className="flex flex-wrap gap-3">
              <Bouton href="#ta-vie">Trois questions sur ta vie</Bouton>
              <Bouton href="#tes-murs" variante="contour">Tes murs, ton prix</Bouton>
            </Apparition>
          </div>
          <div className="relative mx-auto aspect-[3/4] w-full max-w-[380px] lg:h-[min(64svh,600px)] lg:w-auto lg:max-w-none">
            <Apparition de="zoom" delai={200} className="absolute inset-0 overflow-hidden [border-radius:50%_50%_2rem_2rem/38%_38%_2rem_2rem] bg-[var(--sombre)] shadow-[0_40px_80px_-40px_rgba(36,31,27,0.7)]">
              <PhotoCinema src={photos.table.src} alt={photos.table.alt} priority origine="50% 38%" sizes="(min-width: 1024px) 32vw, 90vw" />
            </Apparition>
            <Apparition de="gauche" delai={700} className="absolute -left-6 bottom-6 p-3 sm:-left-12">
              <p className="rotate-[-4deg] rounded-2xl border border-[var(--trait)] bg-[var(--carte)] px-4 py-3 shadow-[0_18px_40px_-20px_rgba(36,31,27,0.6)]">
                <span className="block font-[family-name:var(--titres)] text-2xl italic">Dîner n° 1</span>
                <span className="block text-sm text-[var(--doux)]">le soir de la pose, chez toi</span>
              </p>
            </Apparition>
          </div>
        </div>
        <Apparition as="ul" delai={900} className="relative mx-auto grid w-full max-w-7xl gap-px border-t border-[var(--trait)] px-5 sm:grid-cols-3 sm:px-8">
          {[
            ["20 ans × 365 soirs = 7 300", "un calcul, pas une durée de vie annoncée"],
            ["Le premier dîner, offert", "sans condition, compté dans aucun prix"],
            ["Une fourchette dès le site", "TTC, pose comprise, selon tes murs"],
          ].map(([fort, doux]) => (
            <li key={fort} className="py-5 sm:pr-6">
              <span className="block font-[family-name:var(--titres)] text-xl [font-variant-numeric:lining-nums]">{fort}</span>
              <span className="block text-[15px] text-[var(--doux)]">{doux}</span>
            </li>
          ))}
        </Apparition>
      </section>

      {/* ---------- Ce qui finit sur le plan de travail ---------- */}
      <div className="bg-[var(--accent)] py-5 text-[var(--sur-accent)]">
        <Defilant
          duree={44}
          separateur="✶"
          elements={SOIREES}
          classeElement="font-[family-name:var(--titres)] text-2xl italic whitespace-nowrap md:text-3xl"
        />
      </div>

      {/* ---------- Pas des meubles ---------- */}
      <section className="mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-8 md:py-36 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-8">
          <Apparition><Surtitre>Ce qu&apos;on vend</Surtitre></Apparition>
          <Apparition as="p" className="font-[family-name:var(--titres)] text-[clamp(2.8rem,6vw,5.4rem)] leading-[0.98] tracking-[-0.03em]">
            Pas <span className="kit-barre">des meubles.</span>
            <br />
            <span className="italic text-[var(--accent-texte)]">La pièce où finissent toutes les soirées.</span>
          </Apparition>
          <Apparition as="p" delai={200} className="max-w-xl text-xl leading-relaxed text-[var(--doux)]">
            La photo que tout le monde fait : une cuisine impeccable, et personne dedans. Une cuisine, si
            tu la gardes vingt ans, ça fait 7&nbsp;300 dîners. C&apos;est eux qu&apos;on dessine.
          </Apparition>
        </div>
        <div className="grid grid-cols-[1.1fr_0.9fr] items-end gap-4">
          <Apparition de="zoom" className="relative aspect-[3/5] overflow-hidden [border-radius:50%_50%_1.5rem_1.5rem/30%_30%_1.5rem_1.5rem] bg-[var(--sombre)]">
            <Image src={photos.cocotte.src} alt={photos.cocotte.alt} fill sizes="(min-width: 1024px) 24vw, 50vw" className="object-cover object-[30%_50%]" />
          </Apparition>
          <div className="grid gap-4">
            <Apparition de="zoom" delai={150} className="relative aspect-square overflow-hidden rounded-full bg-[var(--sombre)]">
              <Image src={photos.herbes.src} alt={photos.herbes.alt} fill sizes="(min-width: 1024px) 20vw, 45vw" className="object-cover" />
            </Apparition>
            <Apparition de="zoom" delai={300} className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-[var(--sombre)]">
              <Image src={photos.tasses.src} alt={photos.tasses.alt} fill sizes="(min-width: 1024px) 20vw, 45vw" className="object-cover" />
            </Apparition>
          </div>
        </div>
      </section>

      {/* ---------- Outil n° 1 : trois questions sur ta vie ---------- */}
      <section id="ta-vie" className="scroll-mt-20 px-3 sm:px-5">
        <div className="kit-grain relative overflow-hidden rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
          <div className="mx-auto max-w-6xl space-y-12 px-3 py-20 sm:px-10 md:py-28">
            <div className="grid gap-6 px-2 sm:px-0 lg:grid-cols-[1fr_0.8fr] lg:items-end">
              <div className="space-y-6">
                <Apparition><Surtitre clair>Pas de catalogue</Surtitre></Apparition>
                <TitreRevele
                  texte="Trois questions *sur ta vie.*"
                  className="font-[family-name:var(--titres)] text-[clamp(2.8rem,6.5vw,6rem)] leading-[0.95] tracking-[-0.035em]"
                  classeAccent="italic text-[#F0B49B]"
                />
              </div>
              <Apparition as="p" delai={150} className="text-xl leading-relaxed text-[var(--sur-sombre)]/90">
                Combien à table, qui cuisine, qui fait la vaisselle. Et le site te dessine le plan qui va
                avec ta vie. Pas avec la photo.
              </Apparition>
            </div>
            <Apparition de="zoom" delai={150}>
              <Appli adresse="Sept Mille Dîners · ta vie, ton plan" etape="Étape 1 sur 2">
                <TaVie />
              </Appli>
            </Apparition>
          </div>
        </div>
      </section>

      {/* ---------- Outil n° 2 : tes murs, ta fourchette ---------- */}
      <section id="tes-murs" className="scroll-mt-20 mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-36">
        <div className="mb-12 grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-end">
          <div className="space-y-6">
            <Apparition><Surtitre>Ce que vous tapez : « prix cuisine sur mesure avec pose »</Surtitre></Apparition>
            <TitreRevele
              texte="Tes murs, *en mètres.*"
              className="font-[family-name:var(--titres)] text-[clamp(3rem,7vw,6.5rem)] leading-[0.92] tracking-[-0.04em]"
              classeAccent="italic text-[var(--accent-texte)]"
            />
          </div>
          <Apparition as="div" delai={150} className="space-y-4">
            <p className="text-xl leading-relaxed text-[var(--doux)]">
              Tape la longueur de tes murs, d&apos;un angle à l&apos;autre. Le site dessine ta cuisine, meuble après
              meuble, avec une fourchette TTC, pose comprise. Le prix ferme vient au devis.
            </p>
            <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)] text-[15px]">
              {GAMMES.map((g) => (
                <li key={g.id} className="flex flex-wrap items-baseline justify-between gap-x-4 py-2.5">
                  <span><span className="font-semibold">{g.nom}</span> <span className="text-[var(--doux)]">· {g.detail}</span></span>
                  <span className="lining-nums tabular-nums">{euros(g.min)} – {euros(g.max)} le mètre</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-[var(--doux)]">Prix au mètre linéaire, TTC, pose comprise, hors électroménager · exemple.</p>
          </Apparition>
        </div>
        <Apparition de="zoom">
          <Appli adresse="Sept Mille Dîners · tes murs, ton prix" etape="Étape 2 sur 2">
            <TesMurs />
          </Appli>
        </Apparition>
      </section>

      {/* ---------- Le bento : la pose, le retour, ce qui est compris ---------- */}
      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 md:pb-36">
        <div className="grid gap-4 md:grid-cols-6">
          <Apparition de="zoom" className="relative overflow-hidden rounded-[2rem] bg-[var(--accent)] p-7 text-[var(--sur-accent)] sm:p-10 md:col-span-4 md:row-span-2">
            <div className="grid h-full gap-8 sm:grid-cols-[1fr_auto] sm:items-end">
              <div className="flex h-full flex-col justify-between gap-8">
                <p className="text-sm font-semibold uppercase tracking-[0.2em]">Chaque pose, filmée</p>
                <p className="font-[family-name:var(--titres)] leading-[0.86] tracking-[-0.04em] [font-variant-numeric:lining-nums]">
                  <span className="block text-[clamp(4.5rem,11vw,9rem)]">4 jours.</span>
                  <span className="block text-[clamp(3rem,7vw,6rem)] italic">30 secondes.</span>
                </p>
                <p className="max-w-md text-lg leading-relaxed">
                  Les meubles qui se montent, en accéléré. Seulement avec ton accord écrit, et sans rien
                  montrer de chez toi : ni adresse, ni famille, ni objets personnels.
                </p>
              </div>
              <div className="relative mx-auto aspect-[9/16] w-[190px] overflow-hidden rounded-[1.6rem] border-4 border-[var(--sur-accent)] bg-[var(--sombre)]">
                <Image src={photos.comptoir.src} alt={photos.comptoir.alt} fill sizes="190px" className="object-cover" />
                <span className="absolute left-2.5 top-2.5 rounded-full bg-[var(--sombre)] px-2.5 py-1 text-xs font-bold text-[var(--sur-sombre)]">× 60 · Jour 4</span>
                <span aria-hidden="true" className="absolute bottom-3 left-3 right-3 h-1.5 overflow-hidden rounded-full bg-white/40">
                  <span className="block h-full w-3/4 rounded-full bg-[var(--sur-accent)]" />
                </span>
              </div>
            </div>
          </Apparition>
          <Apparition de="zoom" delai={120} className="md:col-span-2">
            <CarteLueur className="h-full rounded-[2rem] border border-[var(--trait)] bg-[var(--carte)] p-7">
              <p className="font-[family-name:var(--titres)] text-3xl leading-tight">Si une porte frotte&nbsp;: <span className="italic text-[var(--accent-texte)]">nous.</span></p>
              <p className="mt-3 text-[17px] leading-relaxed text-[var(--doux)]">Les réglages des portes et des tiroirs sont compris dans le prix, pendant deux ans. C&apos;est écrit sur le devis.</p>
            </CarteLueur>
          </Apparition>
          <Apparition de="zoom" delai={240} className="md:col-span-2">
            <CarteLueur className="h-full rounded-[2rem] bg-[var(--sombre)] p-7 text-[var(--sur-sombre)]">
              <p className="text-sm font-semibold uppercase tracking-[0.2em]">Pose comprise, ça comprend</p>
              <ul className="mt-4 space-y-2 text-[16px]">
                {COMPRIS.slice(0, 5).map((c) => (
                  <li key={c} className="flex gap-2.5"><span aria-hidden="true" className="text-[#F0B49B]">✓</span>{c}</li>
                ))}
              </ul>
            </CarteLueur>
          </Apparition>
          <Apparition de="zoom" delai={120} className="relative min-h-[300px] overflow-hidden rounded-[2rem] bg-[var(--sombre)] text-[var(--sur-sombre)] md:col-span-3">
            <Image src={photos.planBois.src} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover opacity-60" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_25%,rgba(36,31,27,0.92)_100%)]" />
            <p className="absolute bottom-6 left-7 right-7 font-[family-name:var(--titres)] text-3xl italic leading-tight">Les meubles sont la partie facile. Le reste, c&apos;est vous.</p>
          </Apparition>
          <Apparition de="zoom" delai={240} className="flex flex-col justify-between gap-6 rounded-[2rem] border border-[var(--trait)] bg-[var(--carte)] p-7 md:col-span-3">
            <p className="font-[family-name:var(--titres)] text-3xl leading-tight">Un devis ligne par ligne, <span className="italic text-[var(--accent-texte)]">avec la date de pose écrite.</span></p>
            <p className="text-[17px] leading-relaxed text-[var(--doux)]">Chaque meuble, le plan, l&apos;évier, la pose, les raccordements. Pas une ligne « cuisine complète ».</p>
            <Link href={`${DOSSIER}/tes-murs`} className="font-semibold text-[var(--accent-texte)] underline-offset-4 hover:underline">Ce que la fourchette comprend, et ne comprend pas →</Link>
          </Apparition>
        </div>
      </section>

      {/* ---------- Du premier mot au premier dîner ---------- */}
      <section className="border-y border-[var(--trait)] bg-[var(--carte)] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-10 space-y-6 md:mb-4">
            <Apparition><Surtitre>Comment ça se passe</Surtitre></Apparition>
            <TitreRevele
              texte="Du premier mot *au premier dîner.*"
              className="max-w-4xl font-[family-name:var(--titres)] text-[clamp(2.8rem,6vw,5.5rem)] leading-[0.95] tracking-[-0.035em]"
              classeAccent="italic text-[var(--accent-texte)]"
            />
          </div>
          <RecitColle
            etapes={ETAPES.map((e, i) => ({
              surtitre: e.moment,
              titre: e.titre,
              texte: <p>{e.texte}</p>,
              visuel: <Image src={PHOTOS_ETAPES[i].src} alt={PHOTOS_ETAPES[i].alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />,
            }))}
          />
        </div>
      </section>

      {/* ---------- Le premier dîner ---------- */}
      <section className="relative isolate overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <PhotoCinema src={photos.service.src} alt="" origine="60% 40%" className="opacity-35" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(36,31,27,0.96)_0%,rgba(36,31,27,0.82)_55%,rgba(36,31,27,0.55)_100%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-8 md:py-36 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="space-y-7">
            <Apparition><Surtitre clair>Le soir de la pose</Surtitre></Apparition>
            <TitreRevele
              texte="Le premier dîner, *c'est nous.*"
              className="font-[family-name:var(--titres)] text-[clamp(3rem,7vw,6.5rem)] leading-[0.93] tracking-[-0.035em]"
              classeAccent="italic text-[#F0B49B]"
            />
            <Apparition as="p" delai={150} className="max-w-xl text-xl leading-relaxed text-[var(--sur-sombre)]/90">
              Le soir de chaque pose, on cuisine le premier dîner. Chez toi, dans ta nouvelle cuisine. Offert
              sans condition : il n&apos;est compté dans aucun prix, et tu peux le refuser.
            </Apparition>
            <Apparition delai={250}><Bouton href={`${DOSSIER}/le-premier-diner`} variante="clair">Comment se passe ce soir-là</Bouton></Apparition>
          </div>
          <Apparition de="droite" delai={200}>
            <Ticket />
          </Apparition>
        </div>
      </section>

      {/* ---------- Le guide ---------- */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-36">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <Apparition><Surtitre>Le guide</Surtitre></Apparition>
            <TitreRevele
              texte="Comment choisir un bon cuisiniste. *Même si ce n'est pas nous.*"
              className="font-[family-name:var(--titres)] text-[clamp(2.6rem,5vw,4.6rem)] leading-[0.98] tracking-[-0.03em]"
              classeAccent="italic text-[var(--accent-texte)]"
            />
            <Apparition as="p" delai={150} className="text-lg leading-relaxed text-[var(--doux)]">
              Trois magasins, trois plans qu&apos;on ne sait pas comparer. Alors posez les mêmes questions à tous
              ceux que vous verrez, nous compris. On ne dit rien des autres : on dit ce qu&apos;on répond.
            </Apparition>
            <Apparition delai={250}><Bouton href={`${DOSSIER}/choisir-son-cuisiniste`}>Lire les cinq questions</Bouton></Apparition>
          </div>
          <ol className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
            {QUESTIONS_GUIDE.slice(0, 3).map((q, i) => (
              <Apparition as="li" key={q.id} delai={i * 140} className="grid gap-3 py-8 sm:grid-cols-[auto_1fr] sm:gap-8">
                <span aria-hidden="true" className="font-[family-name:var(--titres)] text-6xl italic leading-none text-[var(--accent-texte)] [font-variant-numeric:lining-nums]">{i + 1}</span>
                <div className="space-y-3">
                  <p className="font-[family-name:var(--titres)] text-[clamp(1.8rem,3.4vw,2.6rem)] leading-tight">{q.question}</p>
                  <p className="text-[17px] leading-relaxed text-[var(--doux)]">{q.pourquoi}</p>
                </div>
              </Apparition>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- Questions ---------- */}
      <section id="questions" className="scroll-mt-24 border-t border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="space-y-6">
            <Apparition><Surtitre>Vos questions</Surtitre></Apparition>
            <TitreRevele
              texte="Avant de *passer à table.*"
              className="font-[family-name:var(--titres)] text-[clamp(2.6rem,5vw,4.5rem)] leading-[0.95] tracking-[-0.035em]"
              classeAccent="italic text-[var(--accent-texte)]"
            />
          </div>
          <Apparition delai={150}>
            <Accordeon className="[font-variant-numeric:lining-nums]" questions={FAQ.map((q) => ({ question: q.q, reponse: q.r }))} />
          </Apparition>
        </div>
      </section>

      <div className="bg-[var(--carte)] pt-3 sm:pt-5">
        <AppelFinal />
      </div>
    </main>
  );
}
