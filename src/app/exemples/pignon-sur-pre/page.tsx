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
import { AppelFinal, BLE, Bouton, CarteTente, Herbe, PHOTO_TENTE, Surtitre, TERRE } from "./_composants/Blocs";
import QuoiFaire from "./_composants/QuoiFaire";
import VueDuCiel from "./_composants/VueDuCiel";
import { DOSSIER, MACHINES, PLANNING, QUESTIONS, SAMEDIS, TENTES, WEEKEND, euros, photos } from "./_composants/donnees";

// L'accueil de Pignon sur Pré. « Créer une marque » : « Je vendrais la plus belle salle de
// la région. Le pré où t'as grandi. » et la tente posée sur la vue du ciel (#pre).
// « Remplir l'agenda » : « Sur l'accueil, pas de catalogue. Une seule question : tu veux
// faire quoi ? » (#quoi), la réponse, l'option avec chauffeur, et les vraies disponibilités.
export const metadata: Metadata = {
  title: "Pignon sur Pré — tentes et engins, site de démonstration",
  description:
    "Le site d'un loueur imaginaire de tentes de réception et d'engins de jardin : une seule question, « tu veux faire quoi ? », la tente posée sur ton pré vu du ciel, et les vraies disponibilités, réservables en ligne.",
  ...adressesDeLaPage("/exemples/pignon-sur-pre"),
};

const TITRE = "font-[family-name:var(--titres)] font-normal leading-[0.92] tracking-[-0.035em]";

export default function PignonSurPre() {
  return (
    <main>
      {/* ---------- Premier écran : le pré au couchant, plein cadre ---------- */}
      <section className="kit-grain relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <PhotoCinema src={photos.pre.src} alt="" priority origine="50% 70%" className="opacity-80" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(30,48,21,0.78)_0%,rgba(30,48,21,0.35)_42%,rgba(30,48,21,0.25)_62%,rgba(30,48,21,0.9)_100%)]" />
        <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-between gap-10 px-5 pb-16 pt-36 sm:px-8 md:pb-20 md:pt-44">
          <div className="space-y-7">
            <Apparition><Surtitre clair>Pignon sur Pré · tentes et engins, livrés chez toi</Surtitre></Apparition>
            <TitreRevele
              as="h1"
              auChargement
              texte="Ta salle des fêtes, *chez toi.*"
              className={`max-w-5xl text-[clamp(4rem,11vw,10.5rem)] ${TITRE}`}
              classeAccent={BLE}
            />
          </div>
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <TitreRevele
              as="p"
              auChargement
              delai={450}
              texte="La plus belle salle de la région, *c'est le pré où tu as grandi.* On y pose la tente, et on prépare le terrain."
              className="max-w-xl text-[clamp(1.25rem,2vw,1.6rem)] leading-[1.3]"
              classeAccent="font-[family-name:var(--titres)] italic text-[#F2C98A]"
            />
            <Apparition delai={800} className="flex flex-wrap gap-3">
              <Bouton href={`${DOSSIER}#pre`}>Poser une tente sur mon pré</Bouton>
              <Bouton href={`${DOSSIER}#quoi`} variante="trait">Tu veux faire quoi&nbsp;?</Bouton>
            </Apparition>
          </div>
        </div>
        <Herbe couleur="#B04E2F" />
      </section>

      {/* ---------- Le samedi, en défilé ---------- */}
      <div className="bg-[var(--accent)] py-5 text-[var(--sur-accent)]">
        <Defilant
          duree={46}
          separateur="✿"
          elements={["une fête dans le pré", "120 invités assis", "la tranchée finie avant l'apéro", "montée la veille", "livrée chez toi", "avec chauffeur", "un bal sur la place", "démontée le lundi"]}
          classeElement="whitespace-nowrap font-[family-name:var(--titres)] text-2xl italic md:text-3xl"
        />
      </div>

      {/* ---------- Tu veux faire quoi ? ---------- */}
      <section id="quoi" className="scroll-mt-24 mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div className="space-y-6 lg:sticky lg:top-28">
          <Apparition><Surtitre>Pas de catalogue</Surtitre></Apparition>
          <TitreRevele texte={"Tu veux faire *quoi ?*"} className={`text-[clamp(3.4rem,7.5vw,6.8rem)] ${TITRE}`} classeAccent={TERRE} />
          <Apparition as="p" delai={150} className="max-w-md text-lg leading-relaxed text-[var(--doux)]">
            Une seule question. Tu choisis, et le site te dit quelle tente ou quelle machine, combien de jours, et combien ça
            coûte, livrée. Avec chauffeur si tu préfères regarder.
          </Apparition>
          <Apparition as="p" delai={250} className="max-w-md font-[family-name:var(--titres)] text-2xl italic leading-snug text-[var(--accent-texte)]">
            On ne loue pas une mini-pelle. On loue ton samedi.
          </Apparition>
        </div>
        <Apparition de="zoom"><QuoiFaire /></Apparition>
      </section>

      {/* ---------- La vue du ciel : bande sombre aux coins arrondis ---------- */}
      <section className="px-3 sm:px-5">
        <div id="pre" className="kit-grain relative scroll-mt-20 overflow-hidden rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
          <div aria-hidden="true" className="pointer-events-none absolute -left-32 -top-32 h-[480px] w-[480px] rounded-full bg-[radial-gradient(closest-side,rgba(242,201,138,0.18),transparent)]" />
          <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:px-10 md:py-28 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div className="space-y-6 lg:sticky lg:top-28">
              <Apparition><Surtitre clair>Ton pré, vu du ciel</Surtitre></Apparition>
              <TitreRevele texte="Tape ton adresse. *On pose la tente.*" className={`text-[clamp(3rem,6.5vw,5.8rem)] ${TITRE}`} classeAccent={BLE} />
              <Apparition as="p" delai={150} className="max-w-md text-lg leading-relaxed text-[var(--sur-sombre)]/90">
                À l&apos;échelle, avec les tables. Tu vois tout de suite si elle rentre, et où. Ça rentre&nbsp;? Tu réserves. Et tu
                préviens les voisins.
              </Apparition>
            </div>
            <Apparition de="droite" className="rounded-[28px] bg-[var(--fond)] p-4 text-[var(--encre)] sm:p-6">
              <VueDuCiel />
            </Apparition>
          </div>
        </div>
      </section>

      {/* ---------- Ce qu'on loue : le bento ---------- */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32">
        <div className="mb-12 grid gap-6 md:grid-cols-[1fr_0.8fr] md:items-end">
          <div className="space-y-6">
            <Apparition><Surtitre>Ce qu&apos;on loue</Surtitre></Apparition>
            <TitreRevele texte="Trois tentes, *six engins.*" className={`text-[clamp(3rem,6.5vw,5.8rem)] ${TITRE}`} classeAccent={TERRE} />
          </div>
          <Apparition as="p" delai={150} className="text-lg leading-relaxed text-[var(--doux)]">
            Pas trois cents machines&nbsp;: celles qu&apos;il faut pour un samedi chez soi. Les capacités sont celles du fabricant,
            les prix sont TTC et livrés, en exemple.
          </Apparition>
        </div>
        <ul className="grid gap-4 md:grid-cols-3">
          {TENTES.map((t, i) => (
            <Apparition as="li" key={t.id} delai={i * 120} de="zoom" className="group">
              <CarteLueur className="h-full rounded-[26px]">
                <Link href={`${DOSSIER}/tentes`} className="block h-full">
                  <CarteTente t={t} photo={PHOTO_TENTE[t.id]} />
                </Link>
              </CarteLueur>
            </Apparition>
          ))}
          <Apparition as="li" delai={360} de="zoom" className="md:col-span-3">
            <div className="grid overflow-hidden rounded-[26px] bg-[var(--sombre)] text-[var(--sur-sombre)] lg:grid-cols-[0.9fr_1.1fr]">
              <div className="relative min-h-[260px]">
                <Image src={photos.godet.src} alt={photos.godet.alt} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
              </div>
              <div className="space-y-5 p-6 sm:p-10">
                <p className="font-[family-name:var(--titres)] text-[38px] leading-none tracking-[-0.02em]">Les engins du samedi</p>
                <ul className="grid gap-x-8 sm:grid-cols-2">
                  {MACHINES.map((m) => (
                    <li key={m.id} className="flex items-baseline justify-between gap-3 border-b border-white/15 py-3">
                      <span className="font-medium">{m.court}</span>
                      <span className="whitespace-nowrap text-[15px] tabular-nums text-[var(--sur-sombre)]/90">{euros(m.jour)} / jour</span>
                    </li>
                  ))}
                </ul>
                <p className="text-[14px] text-[var(--sur-sombre)]/90">TTC, livrées et reprises à 20 km · exemple. Mini-pelles et rogneuse aussi avec chauffeur.</p>
                <Bouton href={`${DOSSIER}/engins`} variante="creme">Voir les engins</Bouton>
              </div>
            </div>
          </Apparition>
        </ul>
      </section>

      {/* ---------- Le week-end, raconté ---------- */}
      <section className="border-y border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32">
          <div className="mb-6 space-y-6 md:mb-0">
            <Apparition><Surtitre>De vendredi à lundi</Surtitre></Apparition>
            <TitreRevele texte="La tranchée finie *avant l'apéro.*" className={`max-w-4xl text-[clamp(3rem,6.5vw,5.8rem)] ${TITRE}`} classeAccent={TERRE} />
          </div>
          <RecitColle
            etapes={WEEKEND.map((w) => ({
              surtitre: w.quand,
              titre: w.titre,
              texte: <p>{w.texte}</p>,
              visuel: <Image src={photos[w.photo].src} alt={photos[w.photo].alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />,
            }))}
          />
        </div>
      </section>

      {/* ---------- Les vraies disponibilités ---------- */}
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div className="space-y-6">
          <Apparition><Surtitre>Comme une chambre d&apos;hôtel</Surtitre></Apparition>
          <TitreRevele texte="Les vraies *disponibilités.*" className={`text-[clamp(3rem,6.5vw,5.8rem)] ${TITRE}`} classeAccent={TERRE} />
          <Apparition as="p" delai={150} className="max-w-md text-lg leading-relaxed text-[var(--doux)]">
            Tente par tente, machine par machine, samedi par samedi. Tu vois ce qui est libre, tu réserves en ligne. Pas de «&nbsp;prix
            sur demande&nbsp;», pas de «&nbsp;dernière place&nbsp;».
          </Apparition>
          <Apparition delai={250}><Bouton href={`${DOSSIER}/disponibilites`}>Réserver mon samedi</Bouton></Apparition>
        </div>
        <Apparition de="droite" className="overflow-hidden rounded-[26px] border border-[var(--trait)] bg-[var(--carte)]">
          <table className="w-full text-left text-[15px]">
            <caption className="sr-only">Aperçu des disponibilités de juin 2027, exemple</caption>
            <thead>
              <tr className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
                <th scope="col" className="px-4 py-3 font-[family-name:var(--titres)] text-lg font-normal italic">Juin 2027</th>
                {SAMEDIS.slice(0, 4).map((s) => (
                  <th key={s.id} scope="col" className="px-2 py-3 text-center text-[13px] font-semibold">{s.court}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--trait)]">
              {PLANNING.map((l) => (
                <tr key={l.id}>
                  <th scope="row" className="px-4 py-3 font-medium">{l.court}</th>
                  {l.etats.map((e, i) => (
                    <td key={i} className="px-2 py-3 text-center">
                      <span className={`inline-block min-w-[58px] rounded-full px-2 py-1 text-[12px] font-semibold uppercase tracking-[0.06em] ${e === "pris" ? "bg-[var(--fond)] text-[var(--doux)]" : "bg-[#E4EED9] text-[#22311B]"}`}>
                        {e === "pris" ? "Pris" : "Libre"}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="border-t border-[var(--trait)] px-4 py-3 text-[13px] text-[var(--doux)]">Disponibilités d&apos;exemple : l&apos;entreprise est fictive.</p>
        </Apparition>
      </section>

      {/* ---------- Le bal ---------- */}
      <section className="px-3 sm:px-5">
        <div className="kit-grain relative isolate overflow-hidden rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
          <PhotoCinema src={photos.village.src} alt="" origine="60% 60%" className="opacity-50" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(30,48,21,0.95)_0%,rgba(30,48,21,0.7)_55%,rgba(30,48,21,0.35)_100%)]" />
          <div className="relative max-w-3xl space-y-6 px-6 py-24 sm:px-12 md:py-32">
            <Apparition><Surtitre clair>Le lancement · avec la mairie</Surtitre></Apparition>
            <TitreRevele texte="Bal ce *samedi.*" className={`text-[clamp(3.6rem,9vw,8rem)] ${TITRE}`} classeAccent={BLE} />
            <Apparition as="p" delai={150} className="max-w-xl text-lg leading-relaxed text-[var(--sur-sombre)]/90">
              Une tente sur la place du village, un samedi soir, ouverte à tout le monde. Une tente qui reçoit du public ne se
              monte pas sans l&apos;autorisation de la mairie&nbsp;: c&apos;est elle qui nous accueille. Et tout le village repart
              avec la même idée&nbsp;: et si on la faisait chez nous&nbsp;?
            </Apparition>
            <Apparition delai={250}><Bouton href={`${DOSSIER}/le-bal`} variante="creme">Le bal du lancement</Bouton></Apparition>
          </div>
        </div>
      </section>

      {/* ---------- Questions ---------- */}
      <section id="questions" className="scroll-mt-24 mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[0.75fr_1.25fr]">
        <div className="space-y-6">
          <Apparition><Surtitre>Tes questions</Surtitre></Apparition>
          <TitreRevele texte="Avant de *réserver.*" className={`text-[clamp(3rem,5.5vw,4.8rem)] ${TITRE}`} classeAccent={TERRE} />
          <Apparition de="rideau" className="relative mt-4 hidden aspect-[3/4] max-w-xs overflow-hidden rounded-t-full lg:block">
            <Image src={photos.tenteJardin.src} alt={photos.tenteJardin.alt} fill sizes="320px" className="object-cover" />
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
