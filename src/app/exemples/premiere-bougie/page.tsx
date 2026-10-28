import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Accordeon from "../_kit/Accordeon";
import Apparition from "../_kit/Apparition";
import CarteLueur from "../_kit/CarteLueur";
import Defilant from "../_kit/Defilant";
import PhotoCinema from "../_kit/PhotoCinema";
import RecitColle from "../_kit/RecitColle";
import TitreRevele from "../_kit/TitreRevele";
import Bilan from "./_composants/Bilan";
import { AppelFinal, Bouton, Surtitre } from "./_composants/Blocs";
import ChaiseVide from "./_composants/ChaiseVide";
import Jour365 from "./_composants/Jour365";
import { BILAN, DOSSIER, ETAPES, POSTES, QUESTIONS, VERSEMENT, euros, photos, total } from "./_composants/donnees";

// L'accueil de Première Bougie. Une seule question (« Remplir l'agenda » : « Sur l'accueil,
// une seule question : ton poste est vide depuis combien de semaines ? »), les heures sur
// une chaise vide, et juste en dessous, vingt minutes pour définir le poste. Puis la marque
// (« Créer une marque ») : pas d'offres d'emploi, un seul chiffre — toujours là un an
// après, et parties —, le jour 365 et son gâteau à une bougie.
export const metadata: Metadata = {
  title: "Première Bougie — cabinet de recrutement, site de démonstration",
  description:
    "Le site d'un cabinet de recrutement imaginaire : une seule question — ton poste est vide depuis combien de semaines ? —, vingt minutes pour définir le poste, des honoraires ligne par ligne, et un seul bilan : combien de recrues sont toujours là un an après.",
  ...adressesDeLaPage("/exemples/premiere-bougie"),
};

const PHOTOS_ETAPES = [photos.chaiseOrange, photos.atelier, photos.chaiseRouge, photos.cupcake];

export default function PremiereBougie() {
  const exemple = POSTES[0];
  return (
    <main>
      <ChaiseVide />

      {/* ---------- Du jour −30 au jour 365 ---------- */}
      <div className="bg-[var(--accent)] py-5 text-[var(--sur-accent)]">
        <Defilant
          duree={40}
          separateur="✦"
          elements={["Jour −30 · le poste", "Jour 0 · l'arrivée", "Jour 30", "Jour 90", "Jour 180", "Jour 365 · la première bougie"]}
          classeElement="font-[family-name:var(--titres)] text-xl md:text-2xl whitespace-nowrap"
        />
      </div>

      {/* ---------- Pas des talents ---------- */}
      <section className="px-3 pt-3 sm:px-5 sm:pt-5">
        <div className="kit-grain relative overflow-hidden rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 sm:px-10 md:py-32 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-8">
              <Apparition><Surtitre>Ce que vendent les autres</Surtitre></Apparition>
              <ul className="space-y-1 font-[family-name:var(--titres)] text-[clamp(2.2rem,5vw,4rem)] leading-[1.05]">
                {["Des talents.", "Des CV placés.", "Des offres d'emploi."].map((t, i) => (
                  <Apparition as="li" key={t} delai={i * 180}>
                    <span className="kit-barre">{t}</span>
                  </Apparition>
                ))}
              </ul>
              <TitreRevele
                texte="Nous, on vend *le premier anniversaire.*"
                className="font-[family-name:var(--titres)] text-[clamp(2.6rem,5.6vw,4.8rem)] leading-[0.95] tracking-[-0.02em]"
                classeAccent="italic text-[var(--accent)]"
              />
              <Apparition as="p" delai={200} className="max-w-lg text-lg leading-relaxed">
                Le jour où ta nouvelle recrue fête sa première année chez toi. Jour 365. Le cabinet ne
                compte pas les CV placés : il compte les anniversaires.
              </Apparition>
            </div>
            <Apparition de="zoom" delai={150} className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-[2rem]">
              <Image src={photos.cupcake.src} alt={photos.cupcake.alt} fill sizes="(min-width: 1024px) 380px, 90vw" className="object-cover" />
              <p className="absolute bottom-4 left-4 rounded-full bg-[var(--accent)] px-4 py-1.5 font-[family-name:var(--titres)] text-lg text-[var(--sur-accent)]">Jour 365</p>
            </Apparition>
          </div>
        </div>
      </section>

      {/* ---------- Le bilan : un seul chiffre ---------- */}
      <section id="bilan" className="scroll-mt-20 mx-auto grid max-w-7xl gap-12 px-4 py-24 sm:px-8 md:py-32 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="space-y-7">
          <Apparition><Surtitre className="text-[var(--doux)]">Le bilan</Surtitre></Apparition>
          <TitreRevele
            texte="Pas d'offres d'emploi. *Un seul chiffre.*"
            className="font-[family-name:var(--titres)] text-[clamp(3rem,6.6vw,5.8rem)] leading-[0.92] tracking-[-0.02em]"
            classeAccent="italic text-[var(--accent-texte)]"
          />
          <Apparition as="p" delai={150} className="max-w-lg text-xl leading-relaxed text-[var(--doux)]">
            Combien de recrues sont toujours là, un an après. Et combien sont parties : les deux chiffres,
            sans tri. C&apos;est ça, la confiance.
          </Apparition>
          <Apparition as="p" delai={250} className="font-[family-name:var(--titres)] text-[clamp(2rem,4vw,3rem)] leading-tight">
            <span className="tabular-nums">{BILAN.toujoursLa}</span> sur <span className="tabular-nums">{BILAN.recrues}</span>, toujours là.{" "}
            <em className="whitespace-nowrap text-[var(--accent-texte)]"><span className="tabular-nums">{BILAN.parties}</span>&nbsp;parties.</em>
          </Apparition>
          <Apparition delai={350}>
            <Bouton href={`${DOSSIER}/bilan`} variante="sombre">Comment on compte</Bouton>
          </Apparition>
        </div>
        <Apparition de="zoom">
          <Bilan />
        </Apparition>
      </section>

      {/* ---------- Le récit, du jour −30 au jour 365 ---------- */}
      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 md:pb-36">
        <div className="mb-10 space-y-6 md:mb-4">
          <Apparition><Surtitre className="text-[var(--doux)]">Une première année</Surtitre></Apparition>
          <TitreRevele
            texte="Du jour −30 *au jour 365.*"
            className="max-w-4xl font-[family-name:var(--titres)] text-[clamp(2.8rem,6vw,5.4rem)] leading-[0.95] tracking-[-0.02em]"
            classeAccent="italic text-[var(--accent-texte)]"
          />
        </div>
        <RecitColle
          etapes={ETAPES.map((e, i) => ({
            surtitre: e.jour,
            titre: e.titre,
            texte: <p>{e.texte}</p>,
            visuel: <Image src={PHOTOS_ETAPES[i].src} alt={PHOTOS_ETAPES[i].alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />,
          }))}
        />
      </section>

      {/* ---------- Sa première bougie, à la date près ---------- */}
      <section className="bg-[var(--accent)] text-[var(--sur-accent)]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 md:py-28 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div className="space-y-6">
            <Apparition><Surtitre>Le jour 365</Surtitre></Apparition>
            <TitreRevele
              texte="Sa première bougie, *à la date près.*"
              className="font-[family-name:var(--titres)] text-[clamp(2.8rem,6vw,5.2rem)] leading-[0.95] tracking-[-0.02em]"
              classeAccent="italic"
            />
            <Apparition as="p" delai={150} className="max-w-md text-lg leading-relaxed">
              Ce jour-là, un gâteau livré dans l&apos;entreprise. Une seule bougie. La date est dans le
              contrat dès l&apos;arrivée.
            </Apparition>
          </div>
          <Apparition de="zoom">
            <Jour365 />
          </Apparition>
        </div>
      </section>

      {/* ---------- Un an. Toujours là. ---------- */}
      <section className="relative isolate overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <PhotoCinema src={photos.gateau.src} alt="" origine="70% 40%" className="opacity-70" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(27,27,48,0.96)_0%,rgba(27,27,48,0.8)_45%,rgba(27,27,48,0.25)_100%)]" />
        <div className="relative mx-auto max-w-7xl space-y-7 px-5 py-28 sm:px-8 md:py-40">
          <Apparition><Surtitre>Le lancement</Surtitre></Apparition>
          <TitreRevele
            texte="Un an. *Toujours là.*"
            className="font-[family-name:var(--titres)] text-[clamp(4rem,11vw,10rem)] leading-[0.88] tracking-[-0.03em]"
            classeAccent="italic text-[var(--accent)]"
          />
          <Apparition as="p" delai={200} className="max-w-xl text-xl leading-relaxed">
            À chaque première année, un gâteau livré dans l&apos;entreprise. Et la photo part sur LinkedIn —
            seulement avec l&apos;accord de la personne, et celui de l&apos;entreprise. Sinon, pas de photo.
          </Apparition>
        </div>
      </section>

      {/* ---------- Les honoraires ---------- */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32">
        <div className="mb-12 grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div className="space-y-6">
            <Apparition><Surtitre className="text-[var(--doux)]">Honoraires</Surtitre></Apparition>
            <TitreRevele
              texte={"Combien coûte un cabinet de recrutement ? *Ligne par ligne.*"}
              className="font-[family-name:var(--titres)] text-[clamp(2.6rem,5.4vw,4.6rem)] leading-[0.95] tracking-[-0.02em]"
              classeAccent="italic text-[var(--accent-texte)]"
            />
          </div>
          <Apparition as="p" delai={150} className="text-xl leading-relaxed text-[var(--doux)]">
            Pas « nous consulter ». Un forfait écrit et signé avant de commencer, en HT : nos clients sont
            des entreprises.
          </Apparition>
        </div>
        <div className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
          <Apparition de="zoom" className="rounded-[2.5rem] bg-[var(--sombre)] p-8 text-[var(--sur-sombre)] sm:p-12">
            <p className="text-[13px] font-bold uppercase tracking-[0.16em] text-[var(--accent)]">Exemple · {exemple.intitule.toLowerCase()}</p>
            <p className="mt-6 font-[family-name:var(--titres)] text-[clamp(4rem,10vw,8rem)] leading-[0.85] tabular-nums">{euros(total(exemple))}</p>
            <p className="mt-2 font-[family-name:var(--titres)] text-3xl italic text-[var(--accent)]">HT, forfait</p>
            <p className="mt-8 max-w-md text-lg leading-relaxed">{exemple.contexte}. Sept lignes, de la définition du poste au gâteau du jour 365.</p>
          </Apparition>
          <div className="grid gap-5">
            {VERSEMENT.map((v, i) => (
              <Apparition key={v.quand} delai={150 + i * 120}>
                <CarteLueur className={`h-full rounded-[2.5rem] ${i ? "bg-[var(--accent)] text-[var(--sur-accent)]" : "border border-[var(--trait)] bg-[var(--carte)]"}`}>
                  <div className="flex h-full flex-col justify-between gap-6 p-8">
                    <p className="text-[13px] font-bold uppercase tracking-[0.16em]">{v.quand}</p>
                    <p className="font-[family-name:var(--titres)] text-[3.2rem] leading-none">{v.part}&nbsp;%</p>
                  </div>
                </CarteLueur>
              </Apparition>
            ))}
          </div>
        </div>
        <Apparition delai={200} className="mt-8">
          <Bouton href={`${DOSSIER}/honoraires`}>Voir le détail, ligne par ligne</Bouton>
        </Apparition>
      </section>

      {/* ---------- Questions ---------- */}
      <section id="questions" className="scroll-mt-24 border-t border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="space-y-6">
            <Apparition><Surtitre className="text-[var(--doux)]">Questions</Surtitre></Apparition>
            <TitreRevele
              texte="Ce que les dirigeants *demandent.*"
              className="font-[family-name:var(--titres)] text-[clamp(2.6rem,5vw,4.5rem)] leading-[0.95] tracking-[-0.02em]"
              classeAccent="italic text-[var(--accent-texte)]"
            />
          </div>
          <Apparition delai={150}>
            <Accordeon questions={QUESTIONS.map((q) => ({ question: q.q, reponse: q.r }))} />
          </Apparition>
        </div>
      </section>

      <div className="h-3 sm:h-5" />
      <AppelFinal />
    </main>
  );
}
