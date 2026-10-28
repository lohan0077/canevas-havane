import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import Accordeon from "../_kit/Accordeon";
import Apparition from "../_kit/Apparition";
import CarteLueur from "../_kit/CarteLueur";
import Defilant from "../_kit/Defilant";
import TitreRevele from "../_kit/TitreRevele";
import Accueil from "./_composants/Accueil";
import { AppelFinal, Bouton, Surtitre } from "./_composants/Blocs";
import Cafetiere from "./_composants/Cafetiere";
import DateTorrefaction from "./_composants/DateTorrefaction";
import { IconeMethode } from "./_composants/Icones";
import Sachet from "./_composants/Sachet";
import Tasses from "./_composants/Tasses";
import { CAFES, DOSSIER, FINESSES, METHODES, ORDRE, ORDRE_METHODES, QUESTIONS, euros, photos } from "./_composants/donnees";

// Le site des deux vidéos des torréfacteurs. Moins le Quart ne vend pas un pays, il
// vend une heure : l'accueil suit l'heure du visiteur, et le soir il propose le déca
// (« Créer une marque »). Sur l'accueil, une seule question — « tu fais ton café
// comment ? » — donne la mouture et les deux cafés faits pour la cafetière ; chaque
// sachet porte sa date de torréfaction en gros ; l'abonnement se règle en tasses
// (« Remplir le carnet de commandes »).
// Premier écran : typographie et cadran sur un fond vivant qui passe du matin à la nuit.
export const metadata: Metadata = {
  title: "Moins le Quart — café torréfié, site de démonstration",
  description:
    "Le site d'une marque de café imaginaire qui vend une heure : l'accueil suit la tienne, une seule question donne la mouture et les deux cafés faits pour ta cafetière, et l'abonnement se règle en tasses.",
  ...adressesDeLaPage("/exemples/moins-le-quart"),
};

const SEMAINE = [
  { jour: "Mardi", texte: "On torréfie, une fournée par heure : 6 h 45, 15 h 45, puis le déca, à part. La date part au tampon sur chaque sachet." },
  { jour: "Mercredi", texte: "On moud pour ceux qui l'ont demandé, on ferme les sachets, les abonnements partent. Le comptoir rouvre à 6 h 45." },
  { jour: "Jeudi – samedi", texte: "Tu passes au comptoir, ou ton café arrive chez toi, quelques jours après sa torréfaction." },
];

export default function MoinsLeQuart() {
  return (
    <main>
      {/* ---------- Premier écran : l'accueil qui suit l'heure ---------- */}
      <Accueil />

      {/* ---------- Les heures, en bandeau ---------- */}
      <div className="bg-[var(--accent)] py-5 text-[var(--sur-accent)]">
        <Defilant
          duree={40}
          elements={[...ORDRE.map((k) => `${CAFES[k].heure} · ${CAFES[k].moment}`), "Torréfié mardi", "Pas quinze origines : trois heures"]}
          classeElement="font-[family-name:var(--titres)] text-2xl font-light whitespace-nowrap md:text-3xl"
        />
      </div>

      {/* ---------- Pas un pays. Une heure. ---------- */}
      <section className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-36">
        <Apparition><Surtitre>Notre idée</Surtitre></Apparition>
        <Apparition as="p" delai={150} className="mt-8 font-[family-name:var(--titres)] text-[clamp(2rem,4.6vw,4rem)] font-extralight leading-[1.05] tracking-[-0.03em] text-[var(--doux)]">
          <span className="kit-barre">Éthiopie. Notes de fruits rouges. Process lavé. Quinze origines.</span>
        </Apparition>
        <TitreRevele
          texte="Sept heures *moins le quart.*"
          className="mt-6 font-[family-name:var(--titres)] text-[clamp(3.2rem,8.5vw,8rem)] font-extralight leading-[0.92] tracking-[-0.05em]"
          classeAccent="font-[family-name:var(--texte)] italic font-normal text-[var(--accent-texte)]"
        />
        <Apparition as="p" delai={300} className="mt-10 max-w-2xl text-xl leading-relaxed">
          Les autres marques vendent un pays et une liste d&apos;arômes. Nous, une heure de la journée.
          Chaque café porte la sienne — toujours moins le quart, parce que le café arrive toujours un
          peu avant l&apos;heure.
        </Apparition>
      </section>

      {/* ---------- Tu fais ton café comment ? ---------- */}
      <section id="cafetiere" className="scroll-mt-16 px-3 sm:px-5">
        <div className="kit-grain relative overflow-hidden rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-10 md:py-28 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div className="space-y-7 lg:sticky lg:top-28 lg:self-start">
              <Apparition><Surtitre clair>Une seule question</Surtitre></Apparition>
              <TitreRevele
                texte={"Tu fais ton café *comment ?*"}
                className="font-[family-name:var(--titres)] text-[clamp(2.8rem,5.6vw,5.2rem)] font-extralight leading-[0.95] tracking-[-0.045em]"
                classeAccent="font-[family-name:var(--texte)] italic font-normal text-[#E8A24B]"
              />
              <Apparition as="p" delai={200} className="max-w-md text-xl leading-relaxed text-[var(--sur-sombre)]/90">
                On ne part pas du café, on part de ta cafetière. Tu la touches : on te dit la mouture, et
                les deux cafés de la maison faits pour elle. Pas quinze. Deux.
              </Apparition>
              <Apparition delai={300} className="relative hidden aspect-[3/2] overflow-hidden rounded-[2rem] lg:block">
                <Image src={photos.italienne.src} alt={photos.italienne.alt} fill sizes="(min-width: 1024px) 480px, 100vw" className="object-cover" />
              </Apparition>
            </div>
            <Apparition de="zoom" delai={150}>
              <Cafetiere />
            </Apparition>
          </div>
        </div>
      </section>

      {/* ---------- La gamme, et la date au tampon ---------- */}
      <section id="gamme" className="scroll-mt-16 mx-auto max-w-7xl space-y-16 px-5 py-24 sm:px-8 md:py-32">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div className="space-y-6">
            <Apparition><Surtitre>La gamme</Surtitre></Apparition>
            <TitreRevele
              texte="Trois cafés, *trois heures.*"
              className="font-[family-name:var(--titres)] text-[clamp(2.8rem,6vw,5.4rem)] font-extralight leading-[0.95] tracking-[-0.045em]"
              classeAccent="font-[family-name:var(--texte)] italic font-normal text-[var(--accent-texte)]"
            />
          </div>
          <Apparition as="p" delai={150} className="text-xl leading-relaxed text-[var(--doux)]">
            L&apos;heure est un nom, pas une consigne. Et sur chaque sachet, la date de torréfaction, en
            gros, au tampon : celui de cette semaine a été torréfié le <DateTorrefaction className="font-semibold text-[var(--encre)]" />.
          </Apparition>
        </div>
        <ul className="grid gap-10 md:grid-cols-3">
          {ORDRE.map((k, i) => (
            <Apparition as="li" key={k} delai={i * 140} de="zoom" className="space-y-6 text-center">
              <Sachet cafe={CAFES[k]} film={`sachet-${k}`} />
              <div className="space-y-1">
                <p className="font-[family-name:var(--titres)] text-2xl font-medium">{CAFES[k].nom}</p>
                <p className="text-[var(--doux)]">{CAFES[k].enLettres} · {CAFES[k].enClair}</p>
                <p className="tabular-nums">{euros(CAFES[k].prix)} TTC les 250 g <span className="text-sm text-[var(--doux)]">· exemple</span></p>
              </div>
            </Apparition>
          ))}
        </ul>
        <div className="flex justify-center"><Bouton href={`${DOSSIER}/cafes`} variante="encre">Les trois cafés en détail</Bouton></div>
      </section>

      {/* ---------- Torréfié mardi ---------- */}
      <section className="border-y border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[1fr_1fr] lg:items-center">
          <Apparition de="rideau" className="relative aspect-[16/10] overflow-hidden rounded-[2rem]">
            <Image src={photos.refroidissement.src} alt={photos.refroidissement.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </Apparition>
          <div className="space-y-7">
            <Apparition><Surtitre>Sur chaque sachet</Surtitre></Apparition>
            <TitreRevele
              texte="Torréfié *mardi.*"
              className="font-[family-name:var(--titres)] text-[clamp(3.4rem,8vw,7rem)] font-extralight leading-[0.9] tracking-[-0.05em]"
              classeAccent="font-[family-name:var(--texte)] italic font-normal text-[var(--accent-texte)]"
            />
            <Apparition as="p" delai={200} className="max-w-lg text-xl leading-relaxed">
              La date de torréfaction, écrite en gros, là où les autres mettent une date limite en petit.
              On torréfie le mardi ; le café part le mercredi.
            </Apparition>
            <Apparition delai={300} className="w-fit -rotate-3 rounded-2xl border-4 border-[#A63A16] bg-[var(--fond)] px-6 py-4 text-[#A63A16]">
              <p className="text-sm font-extrabold uppercase tracking-[0.2em]">Torréfié le</p>
              <p className="font-[family-name:var(--titres)] text-4xl font-semibold"><DateTorrefaction /></p>
            </Apparition>
          </div>
        </div>
      </section>

      {/* ---------- L'abonnement, en tasses ---------- */}
      <section id="abonnement" className="scroll-mt-16 mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="space-y-7 lg:sticky lg:top-28">
          <Apparition><Surtitre>L&apos;abonnement</Surtitre></Apparition>
          <TitreRevele
            texte="Il se règle *en tasses.*"
            className="font-[family-name:var(--titres)] text-[clamp(2.8rem,6vw,5.4rem)] font-extralight leading-[0.95] tracking-[-0.045em]"
            classeAccent="font-[family-name:var(--texte)] italic font-normal text-[var(--accent-texte)]"
          />
          <Apparition as="p" delai={200} className="max-w-md text-xl leading-relaxed text-[var(--doux)]">
            Pas en kilos, pas en mois. Tu dis combien de tasses tu bois par jour, et ton café arrive avant
            que le paquet soit vide.
          </Apparition>
          <Apparition delai={300} className="relative hidden aspect-[4/5] max-w-sm overflow-hidden rounded-[2rem] lg:block">
            <Image src={photos.tasses.src} alt={photos.tasses.alt} fill sizes="384px" className="object-cover" />
          </Apparition>
        </div>
        <Apparition de="zoom" delai={150}>
          <Tasses />
        </Apparition>
      </section>

      {/* ---------- Le soir, c'est le déca ---------- */}
      <section className="px-3 sm:px-5">
        <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-[#14202C] text-[#F2E3C9]">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-10 md:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-7">
              <Surtitre clair>21 h 45</Surtitre>
              <TitreRevele
                texte="Le soir, *c'est le déca.*"
                className="font-[family-name:var(--titres)] text-[clamp(2.8rem,6vw,5.4rem)] font-extralight leading-[0.95] tracking-[-0.045em]"
                classeAccent="font-[family-name:var(--texte)] italic font-normal text-[#E8A24B]"
              />
              <p className="max-w-lg text-xl leading-relaxed text-[#F2E3C9]/90">{CAFES.soir.phrase}</p>
              <p className="max-w-lg text-lg leading-relaxed text-[#F2E3C9]/90">
                Passe sur le site après dîner : l&apos;accueil te le propose de lui-même. Un café du soir,
                bon pour rien d&apos;autre que le goût.
              </p>
            </div>
            <Apparition de="zoom" className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-full">
              <Image src={photos.soir.src} alt={photos.soir.alt} fill sizes="(min-width: 1024px) 448px, 100vw" className="object-cover" />
            </Apparition>
          </div>
        </div>
      </section>

      {/* ---------- Le moulin de 6 h 45, et la semaine ---------- */}
      <section className="mx-auto max-w-7xl space-y-12 px-5 py-24 sm:px-8 md:py-32">
        <div className="space-y-6">
          <Apparition><Surtitre>La maison</Surtitre></Apparition>
          <TitreRevele
            texte="Chaque matin, *à 6 h 45 pile.*"
            className="max-w-4xl font-[family-name:var(--titres)] text-[clamp(2.8rem,6vw,5.4rem)] font-extralight leading-[0.95] tracking-[-0.045em]"
            classeAccent="font-[family-name:var(--texte)] italic font-normal text-[var(--accent-texte)]"
          />
        </div>
        <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <Apparition de="zoom" className="relative min-h-[26rem] overflow-hidden rounded-[2rem] bg-[var(--sombre)]">
            <Image src={photos.moulin.src} alt={photos.moulin.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </Apparition>
          <div className="grid gap-5">
            <Apparition delai={120} className="space-y-4 rounded-[2rem] bg-[var(--accent)] p-8 text-[var(--sur-accent)]">
              <p className="font-[family-name:var(--titres)] text-3xl font-light leading-tight">Une courte vidéo, tous les jours, publiée à sept heures moins le quart : le moulin qui tourne. Rien d&apos;autre.</p>
              <ol className="grid grid-cols-3 gap-3" aria-label="Les trois premières vidéos">
                {["Jour 1", "Jour 2", "Jour 3"].map((j) => (
                  <li key={j} className="rounded-2xl bg-[var(--fond)] px-3 py-4 text-center text-[var(--encre)]">
                    <p className="text-sm">{j}</p>
                    <p className="whitespace-nowrap font-[family-name:var(--titres)] text-xl font-light sm:text-2xl">6 h 45</p>
                  </li>
                ))}
              </ol>
            </Apparition>
            <Apparition delai={240} className="rounded-[2rem] border border-[var(--trait)] bg-[var(--carte)] p-8">
              <ol className="space-y-5">
                {SEMAINE.map((e) => (
                  <li key={e.jour} className="grid gap-2 border-t border-[var(--trait)] pt-4 first:border-0 first:pt-0 sm:grid-cols-[9rem_1fr]">
                    <p className="font-[family-name:var(--titres)] text-xl font-medium">{e.jour}</p>
                    <p className="leading-relaxed text-[var(--doux)]">{e.texte}</p>
                  </li>
                ))}
              </ol>
            </Apparition>
          </div>
        </div>
      </section>

      {/* ---------- En grain ou moulu ? ---------- */}
      <section className="border-y border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto max-w-7xl space-y-12 px-5 py-24 sm:px-8 md:py-28">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-end">
            <TitreRevele
              texte={"En grain *ou moulu ?*"}
              className="font-[family-name:var(--titres)] text-[clamp(2.6rem,5vw,4.6rem)] font-extralight leading-[0.95] tracking-[-0.045em]"
              classeAccent="font-[family-name:var(--texte)] italic font-normal text-[var(--accent-texte)]"
            />
            <Apparition as="p" delai={150} className="text-xl leading-relaxed text-[var(--doux)]">
              En grain si tu as un moulin. Sinon, on moud pour ta cafetière, le lendemain de la
              torréfaction. Voilà la mouture qu&apos;il lui faut.
            </Apparition>
          </div>
          <ol className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[...ORDRE_METHODES].sort((a, b) => METHODES[a].finesse - METHODES[b].finesse).map((cle, i) => (
              <Apparition as="li" key={cle} delai={i * 90} de="zoom">
                <CarteLueur className="h-full rounded-[1.5rem]">
                  <Link href={`${DOSSIER}#cafetiere`} className="flex h-full flex-col gap-3 rounded-[1.5rem] border border-[var(--trait)] bg-[var(--fond)] p-5">
                    <IconeMethode methode={cle} className="h-10 w-10" />
                    <span className="font-[family-name:var(--titres)] text-xl font-medium">{METHODES[cle].libelle}</span>
                    <span className="text-sm font-semibold uppercase tracking-[0.1em] text-[var(--accent-texte)]">{METHODES[cle].mouture}</span>
                    <span className="flex gap-1" aria-hidden="true">
                      {FINESSES.map((f, j) => <span key={f} className={`h-1.5 flex-1 rounded-full ${j === METHODES[cle].finesse ? "bg-[var(--encre)]" : "bg-[var(--trait)]"}`} />)}
                    </span>
                  </Link>
                </CarteLueur>
              </Apparition>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- L'affiche ---------- */}
      <section aria-label="L'affiche" className="bg-[var(--encre)] text-[var(--fond)]">
        <div className="mx-auto max-w-6xl px-5 py-28 text-center sm:px-8 md:py-40">
          <TitreRevele
            as="p"
            texte="Il est moins le *quart.*"
            className="font-[family-name:var(--titres)] text-[clamp(3.4rem,10vw,9.5rem)] font-extralight leading-[0.9] tracking-[-0.05em]"
            classeAccent="font-[family-name:var(--texte)] italic font-normal text-[#E8A24B]"
          />
          <p className="mt-8 font-[family-name:var(--titres)] text-sm uppercase tracking-[0.24em]">Moins le Quart · café torréfié</p>
        </div>
      </section>

      {/* ---------- Questions ---------- */}
      <section id="questions" className="scroll-mt-24 mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[0.75fr_1.25fr]">
        <div className="space-y-6">
          <Apparition><Surtitre>Vos questions</Surtitre></Apparition>
          <TitreRevele
            texte="Questions, *à toute heure.*"
            className="font-[family-name:var(--titres)] text-[clamp(2.6rem,5vw,4.6rem)] font-extralight leading-[0.95] tracking-[-0.045em]"
            classeAccent="font-[family-name:var(--texte)] italic font-normal text-[var(--accent-texte)]"
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
