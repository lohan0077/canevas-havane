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
import Bascule from "./_composants/Bascule";
import { AppelFinal, Bouton, Surtitre } from "./_composants/Blocs";
import Coulisses from "./_composants/Coulisses";
import Formules from "./_composants/Formules";
import Retroplanning from "./_composants/Retroplanning";
import { DOSSIER, MOMENTS, PROTOCOLE, QUESTIONS, photos } from "./_composants/donnees";

// L'accueil d'« Et s'il pleut », la wedding planner des deux vidéos des wedding
// planners. De « Créer une marque » : le plan B, la bascule soleil / pluie (filmée,
// [data-film=bascule]), les cent parapluies jaunes. De « Remplir l'agenda » : une seule
// question, « tu te maries quand ? » (#ma-date, filmée), le prix sur l'accueil (#prix,
// filmé), les coulisses plutôt que les couchers de soleil, la place d'invité.
export const metadata: Metadata = {
  title: "Et s'il pleut — wedding planner, site de démonstration",
  description:
    "Le site d'une wedding planner imaginaire qui vend le plan B : chaque mariage en deux versions, soleil ou pluie, chiffrées dans le même devis ; ta date, ton rétroplanning et le prix, sur l'accueil.",
  ...adressesDeLaPage("/exemples/et-s-il-pleut"),
};

export default function EtSilPleut() {
  return (
    <main>
      {/* ---------- Premier écran : un parapluie jaune sur l'eau, la question en Didot ---------- */}
      <section className="kit-grain relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
        {/* Le parapluie jaune posé sur l'eau, cadré bas : il flotte au-dessus du titre. */}
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
        <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end gap-8 px-5 pb-12 pt-36 sm:px-8 md:pb-16">
          <Apparition><Surtitre clair>Wedding planner · Rouen et la Normandie</Surtitre></Apparition>
          <TitreRevele
            as="h1"
            auChargement
            texte={"Et s'il *pleut ?*"}
            className="max-w-6xl text-[clamp(4.6rem,15vw,14rem)] font-normal leading-[0.86] tracking-[-0.04em]"
            classeAccent="italic text-[var(--accent)]"
          />
          <div className="grid gap-8 border-t border-white/25 pt-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <TitreRevele
              as="p"
              auChargement
              delai={450}
              texte="C'est prévu. Chaque mariage en *deux versions,* soleil ou pluie — et les deux dans le même devis."
              className="max-w-2xl font-[family-name:var(--titres)] text-[clamp(1.6rem,2.8vw,2.3rem)] leading-[1.18]"
              classeAccent="italic text-[var(--accent)]"
            />
            <Apparition delai={800} className="flex flex-wrap gap-3 lg:justify-end">
              <Bouton href={`${DOSSIER}#ma-date`}>Tu te maries quand&nbsp;?</Bouton>
              <Bouton href={`${DOSSIER}#deux-versions`} variante="contour">Voir les deux versions</Bouton>
            </Apparition>
          </div>
        </div>
      </section>

      {/* ---------- Les deux versions, qui défilent ---------- */}
      <div className="bg-[var(--accent)] py-5 text-[var(--sur-accent)]">
        <Defilant
          duree={58}
          elements={MOMENTS.map((m) => `${m.moment} · ${m.soleil.toLowerCase()} — ou ${m.pluie.toLowerCase()}`)}
          separateur="☂"
          classeElement="font-[family-name:var(--titres)] text-2xl italic whitespace-nowrap md:text-3xl"
        />
      </div>

      {/* ---------- Le contre-pied ---------- */}
      <section className="mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-8 md:py-36 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <div className="space-y-7">
          <Apparition><Surtitre>Ce qu&apos;on vend</Surtitre></Apparition>
          <Apparition as="h2" delai={100} className="text-[clamp(3rem,7vw,6.4rem)] font-normal leading-[0.96] tracking-[-0.03em]">
            <span className="kit-barre text-[var(--doux)]">Le mariage parfait.</span>{" "}
            <span className="italic">Le plan B.</span>
          </Apparition>
          <Apparition as="p" delai={200} className="max-w-xl text-xl leading-relaxed text-[var(--doux)]">
            La vraie question des mariés, ce n&apos;est pas le ciel bleu. C&apos;est : et s&apos;il pleut ? On
            le prévoit, on le chiffre, on le réserve. Et le jour J, tu as le droit d&apos;être invité à
            ton propre mariage.
          </Apparition>
        </div>
        <Apparition de="rideau" delai={150} className="relative aspect-[4/5] overflow-hidden rounded-t-full">
          <Image src={photos.fenetre.src} alt={photos.fenetre.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="kit-cinema-img object-cover" />
        </Apparition>
      </section>

      {/* ---------- Une seule question : tu te maries quand ? ---------- */}
      <section id="ma-date" className="scroll-mt-0 px-3 sm:px-5">
        <div className="kit-grain relative overflow-hidden rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
          <div aria-hidden="true" className="pointer-events-none absolute -left-32 -top-32 h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(242,194,48,.18),transparent_65%)]" />
          <div className="relative mx-auto grid max-w-6xl gap-14 px-4 py-24 sm:px-10 md:py-32 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="space-y-7 px-2 sm:px-0 lg:sticky lg:top-28">
              <Apparition><Surtitre clair>Sur l&apos;accueil, une seule question</Surtitre></Apparition>
              <TitreRevele
                texte={"Tu te maries *quand ?*"}
                className="text-[clamp(3.2rem,7vw,6.2rem)] font-normal leading-[0.94] tracking-[-0.03em]"
                classeAccent="italic text-[var(--accent)]"
              />
              <Apparition as="p" delai={150} className="max-w-md text-xl leading-relaxed">
                Tu entres ta date : le site compte les samedis qui restent et te sort ton rétroplanning,
                mois par mois. Le plan B y a sa ligne dès le premier mois.
              </Apparition>
            </div>
            <Apparition de="droite" delai={150} className="text-[var(--encre)]">
              <div className="rounded-[2.2rem] bg-white/10 p-1.5 ring-1 ring-white/15 shadow-[0_50px_100px_-40px_rgba(0,0,0,.6)] sm:p-2.5">
                <Retroplanning />
              </div>
            </Apparition>
          </div>
        </div>
      </section>

      {/* ---------- Deux versions : la bascule ---------- */}
      <section id="deux-versions" className="scroll-mt-24 mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-8 md:py-36 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div className="space-y-7">
          <Apparition><Surtitre>Chaque mariage a deux versions</Surtitre></Apparition>
          <TitreRevele
            texte="Soleil, *ou pluie.*"
            className="text-[clamp(3.2rem,7.5vw,6.6rem)] font-normal leading-[0.94] tracking-[-0.03em]"
            classeAccent="italic text-[var(--accent-texte)]"
          />
          <Apparition as="p" delai={150} className="max-w-md text-xl leading-relaxed text-[var(--doux)]">
            Tu bascules, et tu vois ton mariage dans les deux cas. Les lieux changent ; l&apos;heure, le
            déroulé et les gens restent.
          </Apparition>
          <Apparition delai={250}><Bouton href={`${DOSSIER}/deux-versions`} variante="ardoise">Le devis, les deux versions</Bouton></Apparition>
        </div>
        <Apparition de="zoom" delai={100}>
          <Bascule />
        </Apparition>
      </section>

      {/* ---------- Prévu, chiffré, réservé : le bento ---------- */}
      <section className="border-y border-[var(--trait)] bg-[#E4EAF1]">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32">
          <TitreRevele
            texte="Prévu. Chiffré. *Réservé.*"
            className="mb-14 text-[clamp(3rem,7vw,6.2rem)] font-normal leading-[0.94] tracking-[-0.03em]"
            classeAccent="italic text-[var(--accent-texte)]"
          />
          <ul className="grid gap-5 md:grid-cols-3">
            {(
              [
                ["Prévu", "Le lieu de repli trouvé en même temps que le lieu rêvé. Chaque prestataire briefé sur les deux versions.", "grange"],
                ["Chiffré", "Le plan B a ses lignes au devis, comme le plan A. Tu sais ce que coûte chaque version avant de signer.", "jardin"],
                ["Réservé", "La grange retenue à la même date, dès la signature. S'il fait beau, elle sert de vestiaire et de coin des enfants.", "arche"],
              ] as const
            ).map(([t, x, ph], i) => (
              <Apparition as="li" key={t} delai={i * 120} de="zoom">
                <CarteLueur className="group h-full rounded-[2rem]">
                  <div className="relative flex h-[440px] flex-col justify-end overflow-hidden rounded-[2rem] bg-[var(--sombre)] p-7 text-[var(--sur-sombre)]">
                    <Image src={photos[ph].src} alt={photos[ph].alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover opacity-55 transition-transform duration-[1.4s] group-hover:scale-105" />
                    <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(47,59,76,0.1)_25%,rgba(47,59,76,0.96)_100%)]" />
                    <span className="relative space-y-3">
                      <span className="block font-[family-name:var(--titres)] text-5xl italic text-[var(--accent)]">{t}.</span>
                      <span className="block text-[17px] leading-relaxed">{x}</span>
                    </span>
                  </div>
                </CarteLueur>
              </Apparition>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Le prix, sur l'accueil ---------- */}
      <section id="prix" className="scroll-mt-24 mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-8 md:py-36 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div className="space-y-7 lg:sticky lg:top-28">
          <Apparition><Surtitre>Les prix</Surtitre></Apparition>
          <TitreRevele
            texte="Sur l'accueil, *pas dans un PDF.*"
            className="text-[clamp(3rem,6.4vw,5.6rem)] font-normal leading-[0.96] tracking-[-0.03em]"
            classeAccent="italic text-[var(--accent-texte)]"
          />
          <Apparition as="p" delai={150} className="max-w-md text-xl leading-relaxed text-[var(--doux)]">
            Trois formules, plan B compris dans chacune. Le prix, ici, tout de suite — pas trois jours
            plus tard.
          </Apparition>
          <Apparition delai={250}><Link href={`${DOSSIER}/formules`} className="font-medium underline decoration-[var(--accent)] decoration-2 underline-offset-4">Le détail des formules</Link></Apparition>
        </div>
        <Apparition de="zoom" delai={100}><Formules /></Apparition>
      </section>

      {/* ---------- Le protocole météo ---------- */}
      <section className="border-t border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32">
          <div className="mb-6 space-y-7">
            <Apparition><Surtitre>Le protocole météo</Surtitre></Apparition>
            <TitreRevele
              texte="Le jour J, *tu ne regardes plus le ciel.*"
              className="max-w-5xl text-[clamp(3rem,6.6vw,5.8rem)] font-normal leading-[0.96] tracking-[-0.03em]"
              classeAccent="italic text-[var(--accent-texte)]"
            />
          </div>
          <RecitColle
            etapes={PROTOCOLE.map((p) => ({
              surtitre: p.quand,
              titre: p.quand === "Jour J" ? "C'est prévu." : p.quand === "J-7" ? "On regarde le ciel." : p.quand === "J-1" ? "On installe." : "On décide.",
              texte: <p>{p.texte}</p>,
              visuel: <Image src={photos[p.photo].src} alt={photos[p.photo].alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />,
            }))}
          />
        </div>
      </section>

      {/* ---------- Cent parapluies jaunes ---------- */}
      <section className="px-3 sm:px-5">
        <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
          <PhotoCinema src={photos.parapluies.src} alt="" className="opacity-45" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(47,59,76,0.97)_0%,rgba(47,59,76,0.85)_45%,rgba(47,59,76,0.35)_100%)]" />
          <div className="relative mx-auto max-w-6xl space-y-7 px-6 py-28 sm:px-10 md:py-40">
            <p className="font-[family-name:var(--titres)] text-[clamp(4rem,10vw,8rem)] italic leading-none text-[var(--accent)]">× 100</p>
            <TitreRevele
              texte="Cent parapluies jaunes, *aux prénoms des mariés.*"
              className="max-w-3xl text-[clamp(2.6rem,5.6vw,4.8rem)] font-normal leading-[0.98] tracking-[-0.03em]"
              classeAccent="italic"
            />
            <Apparition as="p" delai={150} className="max-w-lg text-xl leading-relaxed">
              À chaque mariage. Les invités repartent avec — et les invités d&apos;aujourd&apos;hui, ce sont
              les mariés de demain.
            </Apparition>
            <Apparition delai={250}><Bouton href={`${DOSSIER}/parapluies`}>Mettre vos prénoms dessus</Bouton></Apparition>
          </div>
        </div>
      </section>

      {/* ---------- Les coulisses ---------- */}
      <section className="mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-8 md:py-36 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-7">
          <Apparition><Surtitre>Sur nos réseaux</Surtitre></Apparition>
          <Apparition as="h2" delai={100} className="text-[clamp(3rem,7vw,6.2rem)] font-normal leading-[0.96] tracking-[-0.03em]">
            <span className="kit-barre text-[var(--doux)]">Pas de couchers de soleil.</span>{" "}
            <span className="italic text-[var(--accent-texte)]">Les coulisses.</span>
          </Apparition>
          <Apparition as="p" delai={200} className="max-w-md text-xl leading-relaxed text-[var(--doux)]">
            14 h 10 : l&apos;arche de fleurs n&apos;est pas là. 14 h 40 : montée. Les mariés n&apos;ont rien vu.
            Touche le téléphone pour la suite — un épisode d&apos;exemple.
          </Apparition>
          <Apparition delai={250}><Bouton href={`${DOSSIER}/coulisses`} variante="ardoise">Nos règles pour filmer</Bouton></Apparition>
        </div>
        <Apparition de="zoom" delai={100}><Coulisses /></Apparition>
      </section>

      {/* ---------- Questions ---------- */}
      <section id="questions" className="scroll-mt-24 border-t border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[0.75fr_1.25fr]">
          <div className="space-y-7">
            <Apparition><Surtitre>Vos questions</Surtitre></Apparition>
            <TitreRevele
              texte="Avant *le grand jour.*"
              className="text-[clamp(2.8rem,5.6vw,4.8rem)] font-normal leading-[0.96] tracking-[-0.03em]"
              classeAccent="italic text-[var(--accent-texte)]"
            />
          </div>
          <Apparition delai={150}><Accordeon questions={QUESTIONS} /></Apparition>
        </div>
      </section>

      <div className="h-3 bg-[var(--carte)] sm:h-5" />
      <div className="bg-[var(--carte)]"><AppelFinal /></div>
    </main>
  );
}
