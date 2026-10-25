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
import { AppelFinal, Bouton, Surtitre } from "./_composants/Blocs";
import Carte from "./_composants/Carte";
import Compteur from "./_composants/Compteur";
import MoisParMois from "./_composants/MoisParMois";
import Plateau from "./_composants/Plateau";
import { DOSSIER, FROMAGES, MEULES, OCCASIONS, QUESTIONS, boutique, dateLisible, euros, photos, plateauPour } from "./_composants/donnees";

// Le site des deux vidéos des fromagers. Patience ne vend pas du fromage, elle vend du
// temps : l'âge de chaque fromage en jours, qui tourne pendant qu'on regarde, et la
// meule réservée six mois avant de la manger (« Créer une marque »). Sur l'accueil, un
// seul outil — « vous êtes combien ? » —, une carte par fromage, une page par occasion,
// commandé jeudi, prêt samedi (« Remplir le carnet de commandes »).
// Premier écran : la cave en plein cadre, et l'âge de la grande tomme sous une voûte.
export const metadata: Metadata = {
  title: "Patience — fromagerie, site de démonstration",
  description:
    "Le site d'une fromagerie imaginaire qui vend du temps : l'âge de chaque fromage en jours, la meule réservée six mois à l'avance, et le plateau composé selon le nombre d'invités, chaque fromage avec sa carte.",
  ...adressesDeLaPage("/exemples/patience"),
};

const tomme = FROMAGES[0];
const LIBRES = MEULES.nombre - MEULES.reservees.length;

const SIX_MOIS = [
  { surtitre: "Aujourd'hui", titre: "Tu choisis ton numéro.", texte: "Trente grandes tommes sont entrées en cave le 14 octobre. La tienne garde sa place, et son numéro, jusqu'au bout.", photo: photos.cave },
  { surtitre: "Chaque mois", titre: "Tu reçois une photo d'elle.", texte: "On la retourne, on la brosse, on la photographie. Croûte blanche le premier mois, dorée le sixième : tu la vois changer, de loin.", photo: photos.tommes },
  { surtitre: `Le ${MEULES.pret}`, titre: "Elle est prête.", texte: "C'est la fin d'affinage prévue, pas un compte à rebours. Si elle a besoin de quelques jours de plus, on te le dit, et elle attend.", photo: photos.bloc },
  { surtitre: MEULES.jourJ, titre: "On coupe les meules devant le quartier.", texte: "Le samedi d'après, devant la boutique. On ouvre les meules une à une, on goûte ensemble, et chacun repart avec la sienne.", photo: photos.coupe },
];

const SEMAINE = [
  { jour: "Jeudi", texte: "Tu dis combien vous serez, tu choisis ton créneau. Le lait de chaque fromage est écrit avant le bouton." },
  { jour: "Vendredi", texte: "On découpe, du plus doux au plus fort, et on pose une carte devant chaque fromage." },
  { jour: "Samedi, 10 h", texte: "Ton plateau t'attend au comptoir. Tu paies sur place." },
];

export default function Patience() {
  return (
    <main>
      {/* ---------- Premier écran : la cave, et l'âge de la grande tomme ---------- */}
      <section className="kit-grain relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <PhotoCinema src={photos.cave.src} alt="" priority origine="50% 35%" className="opacity-50" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(28,20,14,0.7)_0%,rgba(28,20,14,0.45)_40%,rgba(28,20,14,0.95)_100%)]" />
        <div className="relative mx-auto grid w-full max-w-7xl flex-1 items-end gap-10 px-5 pb-10 pt-36 sm:px-8 md:pb-14 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-8">
            <Apparition><Surtitre clair>Fromagerie · cave d&apos;affinage · {boutique.ville}</Surtitre></Apparition>
            <TitreRevele
              as="h1"
              auChargement
              texte="Affiné *sans se presser.*"
              className="text-[clamp(4rem,10.5vw,9.5rem)] leading-[0.88] tracking-[-0.035em]"
              classeAccent="italic text-[#E3B85C]"
            />
            <Apparition as="p" delai={500} className="max-w-lg text-xl leading-relaxed text-[var(--sur-sombre)]/90">
              Ici, on ne vend pas du fromage. On vend le temps qu&apos;il a passé en cave — compté en
              jours, à la seconde près.
            </Apparition>
            <Apparition delai={700} className="flex flex-wrap gap-3">
              <Bouton href={`${DOSSIER}#plateau`}>{"Vous êtes combien ?"}</Bouton>
              <Bouton href={`${DOSSIER}/meules`} variante="contour">Réserver une meule</Bouton>
            </Apparition>
          </div>
          <Apparition id="age" de="zoom" delai={300} className="scroll-mt-20">
            <div className="rounded-t-[12rem] rounded-b-[1.5rem] border border-white/20 bg-[var(--sombre)]/75 px-7 pb-8 pt-16 backdrop-blur-md sm:px-10 sm:pt-24">
              <p className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-[#E3B85C]">{tomme.nom} · n° {tomme.numero} · exemple</p>
              <p className="mt-2 text-center font-[family-name:var(--titres)] text-2xl italic">Elle est en cave depuis…</p>
              <div className="mt-5">
                <Compteur entree={tomme.entree} dureeJours={tomme.dureeJours} taille="geant" sombre film="age" />
              </div>
              <p className="mt-4 text-sm text-[var(--sur-sombre)]/90">Lait {tomme.lait.toLowerCase().replace(",", "")} · {tomme.poids}</p>
            </div>
          </Apparition>
        </div>
      </section>

      {/* ---------- La cave, en bandeau ---------- */}
      <div className="bg-[var(--accent)] py-5 text-[var(--sur-accent)]">
        <Defilant
          duree={52}
          elements={FROMAGES.map((f) => `${f.nom} · en cave depuis le ${dateLisible(f.entree).replace(/ \d{4}$/, "")}`)}
          separateur="◆"
          classeElement="font-[family-name:var(--titres)] text-2xl italic whitespace-nowrap md:text-3xl"
        />
      </div>

      {/* ---------- Pas du fromage. Du temps. ---------- */}
      <section className="mx-auto max-w-6xl px-5 py-24 text-center sm:px-8 md:py-36">
        <Apparition><Surtitre>Notre idée</Surtitre></Apparition>
        <TitreRevele
          texte="Pas du fromage. *Du temps.*"
          className="mt-8 text-[clamp(3.4rem,9vw,8.5rem)] leading-[0.92] tracking-[-0.035em]"
          classeAccent="italic text-[var(--accent-texte)]"
        />
        <Apparition as="p" delai={200} className="mx-auto mt-8 max-w-2xl text-xl leading-relaxed text-[var(--doux)]">
          Celui qu&apos;il a passé en cave, retourné, brossé, goûté. Tout ce qu&apos;on vend ici a
          attendu. Alors on affiche combien.
        </Apparition>
        <Apparition as="ul" delai={300} className="mx-auto mt-14 grid max-w-4xl gap-4 sm:grid-cols-3">
          {[
            [String(FROMAGES.length), "fromages en cave, pas cent cinquante"],
            [String(MEULES.nombre), "meules à réserver, pas une de plus"],
            [String(MEULES.dureeJours), "jours d'affinage pour la grande tomme"],
          ].map(([chiffre, texte]) => (
            <li key={texte} className="rounded-t-[6rem] rounded-b-[1rem] border-2 border-[var(--encre)] bg-[var(--carte)] px-5 pb-6 pt-10">
              <p className="font-[family-name:var(--titres)] text-7xl italic text-[var(--accent-texte)] [font-variant-numeric:lining-nums]">{chiffre}</p>
              <p className="mt-2 text-lg">{texte}</p>
            </li>
          ))}
        </Apparition>
      </section>

      {/* ---------- Vous êtes combien ? L'outil du plateau ---------- */}
      <section id="plateau" className="scroll-mt-16 px-3 sm:px-5">
        <div className="kit-grain relative overflow-hidden rounded-t-[3rem] rounded-b-[2rem] bg-[var(--sombre)] text-[var(--sur-sombre)] sm:rounded-t-[10rem]">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 pb-20 pt-24 sm:px-10 md:pb-28 md:pt-36 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div className="space-y-7 lg:sticky lg:top-28 lg:self-start">
              <Apparition><Surtitre clair>Le plateau</Surtitre></Apparition>
              <TitreRevele
                texte={"« Il vient d'où, *celui-là ? »*"}
                className="text-[clamp(2.8rem,5.6vw,5.2rem)] leading-[0.95] tracking-[-0.03em]"
                classeAccent="italic text-[#E3B85C]"
              />
              <Apparition as="p" delai={200} className="max-w-md text-xl leading-relaxed text-[var(--sur-sombre)]/90">
                La question que tes invités vont poser. Dis-nous combien vous serez : on compose le
                plateau, et chaque fromage arrive avec sa réponse.
              </Apparition>
              <Apparition as="ul" delai={300} className="space-y-3 text-lg">
                {["Le poids, le prix par personne", "Une carte posée devant chaque fromage", "Commandé jeudi, prêt samedi matin", "Retrait en boutique, paiement sur place"].map((t) => (
                  <li key={t} className="flex gap-3 border-b border-white/15 pb-3">
                    <span aria-hidden="true" className="text-[#E3B85C]">◆</span>
                    {t}
                  </li>
                ))}
              </Apparition>
            </div>
            <Apparition de="zoom" delai={150}>
              <Plateau />
            </Apparition>
          </div>
        </div>
      </section>

      {/* ---------- Les cartes ---------- */}
      <section id="cartes" className="scroll-mt-20 mx-auto max-w-7xl space-y-14 px-5 py-24 sm:px-8 md:py-32">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div className="space-y-6">
            <Apparition><Surtitre>Une carte par fromage</Surtitre></Apparition>
            <TitreRevele
              texte="Qui le fait, d'où il vient, son lait. *Et la phrase à dire à table.*"
              className="text-[clamp(2.6rem,5vw,4.8rem)] leading-[0.95] tracking-[-0.03em]"
              classeAccent="italic text-[var(--accent-texte)]"
            />
          </div>
          <Apparition as="p" delai={150} className="text-xl leading-relaxed text-[var(--doux)]">
            Et son âge, qui tourne. Personne ne choisit dans cent cinquante vignettes : ici, six
            fromages, et pour chacun quelqu&apos;un à nommer.
          </Apparition>
        </div>
        <ul className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {FROMAGES.map((f, i) => (
            <Apparition as="li" key={f.numero} delai={(i % 3) * 120}>
              <Carte f={f} />
            </Apparition>
          ))}
        </ul>
        <p className="text-sm text-[var(--doux)]">Fromages, producteurs, distances et dates d&apos;exemple : la fromagerie est fictive. C&apos;est nous qui les affinons, dans notre cave.</p>
      </section>

      {/* ---------- Six mois, pas à pas ---------- */}
      <section className="border-y-2 border-[var(--encre)] bg-[var(--carte)]">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32">
          <div className="mb-8 space-y-6 md:mb-0">
            <Apparition><Surtitre>Réserver une meule</Surtitre></Apparition>
            <TitreRevele
              texte="Tu la réserves aujourd'hui. *Tu la manges dans six mois.*"
              className="max-w-5xl text-[clamp(2.8rem,5.8vw,5.4rem)] leading-[0.95] tracking-[-0.03em]"
              classeAccent="italic text-[var(--accent-texte)]"
            />
          </div>
          <RecitColle
            etapes={SIX_MOIS.map((e) => ({
              surtitre: e.surtitre,
              titre: e.titre,
              texte: <p>{e.texte}</p>,
              visuel: <Image src={e.photo.src} alt={e.photo.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />,
            }))}
          />
          <div className="mt-16 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
            <Apparition de="zoom" className="flex flex-col justify-between gap-8 rounded-t-[8rem] rounded-b-[1.5rem] bg-[var(--sombre)] px-8 pb-8 pt-20 text-[var(--sur-sombre)]">
              <div>
                <p className="font-[family-name:var(--titres)] text-[clamp(5rem,10vw,8rem)] italic leading-none text-[#E3B85C] [font-variant-numeric:lining-nums]">{LIBRES}</p>
                <p className="mt-3 text-xl">meules libres sur {MEULES.nombre}, entrées en cave le 14 octobre. {MEULES.nom}, {MEULES.poids}, {euros(MEULES.prixKg * parseFloat(MEULES.poids))} TTC · exemple.</p>
              </div>
              <Bouton href={`${DOSSIER}/meules`}>Choisir ma meule</Bouton>
            </Apparition>
            <Apparition de="zoom" delai={150} className="space-y-6 rounded-[1.5rem] border-2 border-[var(--encre)] bg-[var(--fond)] p-8">
              <p className="font-[family-name:var(--titres)] text-4xl leading-tight">Une photo d&apos;elle, <em className="text-[var(--accent-texte)]">chaque mois.</em></p>
              <MoisParMois />
              <p className="text-sm text-[var(--doux)]">Dessins à la place des photos : la meule est fictive.</p>
            </Apparition>
          </div>
        </div>
      </section>

      {/* ---------- L'affiche ---------- */}
      <section aria-label="L'affiche" className="bg-[var(--accent)] text-[var(--sur-accent)]">
        <div className="mx-auto max-w-6xl px-5 py-24 text-center sm:px-8 md:py-36">
          <TitreRevele
            as="p"
            texte="Ce fromage sera prêt le *14 avril.*"
            className="font-[family-name:var(--titres)] text-[clamp(3.2rem,9vw,8.5rem)] leading-[0.92] tracking-[-0.035em]"
            classeAccent="italic"
          />
          <Apparition as="p" delai={300} className="mx-auto mt-10 max-w-xl text-xl leading-relaxed">
            Et le samedi d&apos;après, le 17 avril à 10 h, on coupe les meules devant tout le quartier.
          </Apparition>
          <p className="mt-8 text-sm font-semibold uppercase tracking-[0.3em]">Patience · fromagerie</p>
        </div>
      </section>

      {/* ---------- Une page par occasion ---------- */}
      <section className="mx-auto max-w-7xl space-y-12 px-5 py-24 sm:px-8 md:py-32">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-end">
          <div className="space-y-6">
            <Apparition><Surtitre>Par occasion</Surtitre></Apparition>
            <TitreRevele
              texte="Une page *par tablée.*"
              className="text-[clamp(2.8rem,6vw,5.4rem)] leading-[0.95] tracking-[-0.03em]"
              classeAccent="italic text-[var(--accent-texte)]"
            />
          </div>
          <Apparition as="p" delai={150} className="text-xl leading-relaxed text-[var(--doux)]">
            Ce que tout le monde tape avant de recevoir : « plateau de fromage pour 10 personnes ». La
            réponse a sa page : combien de fromages, combien de grammes, combien ça coûte.
          </Apparition>
        </div>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {OCCASIONS.map((o, i) => {
            const p = plateauPour(o.personnes);
            return (
              <Apparition as="li" key={o.slug} delai={i * 100} de="zoom">
                <CarteLueur className="h-full rounded-t-[5rem] rounded-b-[1rem]">
                  <Link href={`${DOSSIER}/plateaux/${o.slug}`} className="group flex h-full flex-col justify-between gap-8 rounded-t-[5rem] rounded-b-[1rem] border-2 border-[var(--encre)] bg-[var(--carte)] px-6 pb-6 pt-14">
                    <span className="text-center font-[family-name:var(--titres)] text-5xl italic [font-variant-numeric:lining-nums]">{o.court}</span>
                    <span className="space-y-2">
                      <span className="block text-lg font-semibold leading-snug">{o.titre}</span>
                      <span className="block text-[15px] text-[var(--doux)] [font-variant-numeric:lining-nums]">{p.fromages.length} fromages · {p.poids} · {euros(p.parPersonne)} par personne</span>
                      <span className="inline-block pt-2 font-semibold underline underline-offset-4 group-hover:no-underline">Voir le plateau →</span>
                    </span>
                  </Link>
                </CarteLueur>
              </Apparition>
            );
          })}
        </ul>
      </section>

      {/* ---------- Commandé jeudi, prêt samedi ---------- */}
      <section className="px-3 sm:px-5">
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
          <Image src={photos.plateau.src} alt="" fill sizes="100vw" className="-z-10 object-cover opacity-25" />
          <div className="mx-auto max-w-6xl space-y-12 px-5 py-20 sm:px-10 md:py-28">
            <TitreRevele
              texte="Commandé jeudi, *prêt samedi.*"
              className="text-[clamp(2.8rem,6vw,5.4rem)] leading-[0.95] tracking-[-0.03em]"
              classeAccent="italic text-[#E3B85C]"
            />
            <ol className="grid gap-8 md:grid-cols-3">
              {SEMAINE.map((e, i) => (
                <Apparition as="li" key={e.jour} delai={i * 140} className="space-y-3 border-t border-white/30 pt-5">
                  <p className="font-[family-name:var(--titres)] text-3xl italic text-[#E3B85C]">{e.jour}</p>
                  <p className="text-lg leading-relaxed">{e.texte}</p>
                </Apparition>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ---------- Questions ---------- */}
      <section id="questions" className="scroll-mt-24 mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[0.75fr_1.25fr]">
        <div className="space-y-6">
          <Apparition><Surtitre>Vos questions</Surtitre></Apparition>
          <TitreRevele
            texte="Questions *de patience.*"
            className="text-[clamp(2.6rem,5vw,4.6rem)] leading-[0.95] tracking-[-0.03em]"
            classeAccent="italic text-[var(--accent-texte)]"
          />
        </div>
        <Apparition delai={150}>
          <Accordeon questions={QUESTIONS.map((q) => ({ question: q.q, reponse: q.r }))} />
        </Apparition>
      </section>

      <AppelFinal />
    </main>
  );
}
