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
import Maison from "./_composants/Maison";
import TaMaison from "./_composants/TaMaison";
import { DOSSIER, ETAPES, HONORAIRES, LOI, LOTISSEMENT, PROJETS, QUESTIONS, RECHERCHES, SAMEDIS, VISITE, agence, photos } from "./_composants/donnees";

// L'accueil de Pavillon Bis. Un seul outil (« Remplir l'agenda » : « Sur l'accueil, un
// seul outil. Ta maison fait combien ? Tu agrandis de combien ? Le site calcule. ») qui
// commence par la question de la marque : « Ta maison ressemble à laquelle ? » — et
// montre ce qu'on a fait de la même. Puis les maisons (une page par projet), le seuil
// de 150 m², le lotissement et le n° 14, le samedi matin.
export const metadata: Metadata = {
  title: "Pavillon Bis — architecte des pavillons des années 70, site de démonstration",
  description:
    "Le site d'une agence d'architecture imaginaire qui ne fait que les pavillons des années 70 : tu choisis ta maison, tu vois ce qu'on a fait de la même, le site calcule si l'architecte est obligatoire, et l'on réserve trente minutes un samedi matin.",
  ...adressesDeLaPage("/exemples/pavillon-bis"),
};

const PHOTOS_ETAPES = [photos.croquis, photos.sousSol, photos.maquette, photos.lumiere];
const DEUX = PROJETS.slice(1);

export default function PavillonBis() {
  const [grand] = PROJETS;
  return (
    <main>
      {/* ---------- Premier écran : partagé en deux, la photo dans une arche ---------- */}
      <section className="kit-grain relative isolate overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="relative mx-auto grid min-h-[100svh] max-w-7xl gap-10 px-5 pb-10 pt-28 sm:px-8 sm:pt-32 lg:grid-cols-[1.12fr_0.88fr] lg:items-end lg:gap-16 lg:pb-16 lg:pt-36">
          <div className="space-y-7 sm:space-y-8">
            <Apparition>
              <Surtitre>{agence.metier}</Surtitre>
            </Apparition>
            <TitreRevele
              as="h1"
              auChargement
              texte="Ta maison, *deuxième version.*"
              className="font-[family-name:var(--titres)] text-[clamp(3.9rem,7.4vw,8rem)] font-semibold leading-[0.88] tracking-[-0.045em]"
              classeAccent="italic font-normal text-[var(--accent)]"
            />
            <Apparition as="p" delai={450} className="hidden max-w-xl text-[clamp(1.1rem,1.6vw,1.3rem)] leading-relaxed sm:block">
              Pas de villa blanche sur un terrain vide : on ne fait que les pavillons des années 70.
              Plain-pied, sur sous-sol, à étage — il y en a des lotissements entiers. Le tien a déjà
              une jumelle qu&apos;on a transformée.
            </Apparition>
            <Apparition delai={650} className="flex flex-wrap gap-3 max-sm:[&_a]:px-5">
              <Bouton href={`${DOSSIER}#outil`}>Architecte ou pas&nbsp;?</Bouton>
              <Bouton href={`${DOSSIER}/visite-du-14`} variante="contour">Samedi, le n°&nbsp;14</Bouton>
            </Apparition>
          </div>

          <Apparition de="rideau" delai={200} className="relative px-[44px] pt-[44px] sm:mx-8 lg:mx-0">
            {/* Les anneaux des années 70, autour de l'arche. */}
            <span aria-hidden="true" className="absolute inset-0 rounded-t-[999px] border-[13px] border-b-0 border-[#7C9A6B]" />
            <span aria-hidden="true" className="absolute inset-x-[22px] bottom-0 top-[22px] rounded-t-[999px] border-[13px] border-b-0 border-[#C8553D]" />
            <div className="relative h-[42svh] min-h-[300px] overflow-hidden rounded-b-[2rem] rounded-t-[999px] border-[8px] border-[var(--accent)] lg:h-[62svh]">
              <PhotoCinema src={photos.lotissement.src} alt={photos.lotissement.alt} priority sizes="(min-width: 1024px) 45vw, 100vw" origine="40% 60%" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(38,50,44,0.55)_100%)]" />
            </div>
            <p className="relative -mt-8 mx-6 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 rounded-2xl bg-[var(--sombre)] px-5 py-3 text-[15px] shadow-[0_20px_40px_-20px_rgba(0,0,0,0.6)]">
              <span className="font-semibold">Un lotissement, un seul plan</span>
              <span>des centaines de maisons identiques</span>
            </p>
          </Apparition>
        </div>
      </section>

      {/* ---------- Ce qu'on tape déjà ---------- */}
      <div className="bg-[var(--accent)] py-5 text-[var(--sur-accent)]">
        <Defilant
          duree={44}
          separateur="◐"
          elements={RECHERCHES.map((r) => `« ${r} »`)}
          classeElement="font-[family-name:var(--titres)] text-xl md:text-2xl italic whitespace-nowrap"
        />
      </div>

      {/* ---------- Un seul outil ---------- */}
      <section id="outil" className="scroll-mt-20 mx-auto max-w-7xl px-4 py-24 sm:px-8 md:py-32">
        <div className="mb-12 grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div className="space-y-6">
            <Apparition><Surtitre className="text-[var(--doux)]">Sur l&apos;accueil, un seul outil</Surtitre></Apparition>
            <TitreRevele
              texte={"Architecte *ou pas\u202f?*"}
              className="font-[family-name:var(--titres)] text-[clamp(3.2rem,8vw,7.5rem)] font-semibold leading-[0.9] tracking-[-0.045em]"
              classeAccent="italic font-normal text-[var(--accent-texte)]"
            />
          </div>
          <Apparition as="p" delai={200} className="text-xl leading-relaxed text-[var(--doux)]">
            C&apos;est ce que tout le monde tape avant d&apos;appeler. Choisis ta maison, dis-nous ce que
            tu ajoutes : le site calcule — et te dit honnêtement quand tu n&apos;as pas besoin de nous.
          </Apparition>
        </div>
        <Apparition de="zoom">
          <TaMaison />
        </Apparition>
      </section>

      {/* ---------- Pas du neuf ---------- */}
      <section className="px-3 sm:px-5">
        <div className="kit-grain relative overflow-hidden rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 sm:px-10 md:py-32 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-8">
              <Apparition><Surtitre>Pas du neuf</Surtitre></Apparition>
              <ul className="space-y-1 font-[family-name:var(--titres)] text-[clamp(2rem,4.6vw,3.6rem)] leading-[1.05] tracking-[-0.03em]">
                {["Une maison neuve,", "toute blanche,", "sur un terrain vide."].map((t, i) => (
                  <Apparition as="li" key={t} delai={i * 180}>
                    <span className="kit-barre">{t}</span>
                  </Apparition>
                ))}
              </ul>
              <TitreRevele
                texte="Les pavillons des *années 70,* et rien d'autre."
                className="font-[family-name:var(--titres)] text-[clamp(2.4rem,5.4vw,4.6rem)] font-semibold leading-[0.95] tracking-[-0.04em]"
                classeAccent="italic font-normal text-[var(--accent)]"
              />
              <Apparition as="p" delai={200} className="max-w-lg text-lg leading-relaxed">
                Des maisons qui existent, qu&apos;on habite, et qu&apos;on connaît par cœur à force de les
                ouvrir : le garage du sous-sol, le couloir central, le toit mal isolé. {agence.signature}
              </Apparition>
            </div>
            <Apparition de="droite" delai={150} className="relative mx-auto w-full max-w-md">
              <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[2rem]">
                <Image src={photos.salon.src} alt={photos.salon.alt} fill sizes="(min-width: 1024px) 420px, 90vw" className="object-cover" />
              </div>
              <p className="absolute -left-3 bottom-8 rotate-[-4deg] rounded-full bg-[var(--accent)] px-5 py-2 font-[family-name:var(--titres)] text-xl italic text-[var(--sur-accent)]">
                1972 – 1982
              </p>
            </Apparition>
          </div>
        </div>
      </section>

      {/* ---------- Les maisons : une page par projet ---------- */}
      <section id="maisons" className="scroll-mt-20 mx-auto max-w-7xl px-4 py-24 sm:px-8 md:py-32">
        <div className="mb-14 grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div className="space-y-6">
            <Apparition><Surtitre className="text-[var(--doux)]">Les trois maisons</Surtitre></Apparition>
            <TitreRevele
              texte="Chaque projet a *sa page.*"
              className="font-[family-name:var(--titres)] text-[clamp(3rem,7vw,6.5rem)] font-semibold leading-[0.92] tracking-[-0.045em]"
              classeAccent="italic font-normal text-[var(--accent-texte)]"
            />
          </div>
          <Apparition as="p" delai={200} className="text-xl leading-relaxed text-[var(--doux)]">
            La maison, son année, sa surface, ce qu&apos;on en a fait, le budget et la durée. Exactement
            ce qu&apos;on tape avant d&apos;appeler un architecte.
          </Apparition>
        </div>
        <ul className="grid gap-5 lg:grid-cols-[1.25fr_1fr] lg:grid-rows-2">
          <Apparition as="li" de="zoom" className="lg:row-span-2">
            <CarteLueur className="group h-full rounded-[2.5rem]">
              <Link href={`${DOSSIER}/projets/${grand.slug}`} className="flex h-full flex-col justify-between gap-8 overflow-hidden rounded-[2.5rem] bg-[var(--sombre)] p-7 text-[var(--sur-sombre)] sm:p-10">
                <span className="flex items-center justify-between">
                  <span className="rounded-full border border-white/25 px-3 py-1 text-sm">{grand.nom} · {grand.annee}</span>
                  <span aria-hidden="true" className="grid h-12 w-12 place-items-center rounded-full bg-[var(--accent)] text-[var(--sur-accent)] transition-transform duration-500 group-hover:-rotate-45">→</span>
                </span>
                <span className="block overflow-hidden rounded-[1.8rem] bg-[#F6E2B8] transition-transform duration-700 group-hover:scale-[1.02]">
                  <Maison modele={grand.modele} apres decor className="block h-auto w-full" />
                </span>
                <span className="space-y-3">
                  <span className="block font-[family-name:var(--titres)] text-[clamp(2.2rem,4vw,3.4rem)] font-semibold leading-[0.98] tracking-[-0.03em]">{grand.titre}</span>
                  <span className="flex flex-wrap gap-2 text-[15px]">
                    {[grand.budget, grand.duree, grand.autorisation].map((f) => (
                      <span key={f} className="rounded-full bg-white/10 px-3 py-1">{f}</span>
                    ))}
                    <span className="rounded-full bg-[var(--accent)] px-3 py-1 font-semibold text-[var(--sur-accent)]">architecte obligatoire</span>
                  </span>
                </span>
              </Link>
            </CarteLueur>
          </Apparition>
          {DEUX.map((p, i) => (
            <Apparition as="li" key={p.slug} de="zoom" delai={(i + 1) * 140}>
              <CarteLueur className="group h-full rounded-[2.5rem]">
                <Link href={`${DOSSIER}/projets/${p.slug}`} className="grid h-full gap-5 rounded-[2.5rem] border border-[var(--trait)] bg-[var(--carte)] p-6 sm:grid-cols-[0.9fr_1.1fr] sm:items-center sm:p-7">
                  <span className="block overflow-hidden rounded-[1.6rem] bg-[#E8DCC6]">
                    <Maison modele={p.modele} apres decor className="block h-auto w-full transition-transform duration-700 group-hover:scale-[1.04]" />
                  </span>
                  <span className="space-y-2">
                    <span className="block text-[14px] font-semibold uppercase tracking-[0.14em] text-[var(--accent-texte)]">{p.nom} · {p.annee}</span>
                    <span className="block font-[family-name:var(--titres)] text-[1.75rem] font-semibold leading-[1.02] tracking-[-0.02em]">{p.titre}</span>
                    <span className="block text-[15px] text-[var(--doux)]">{p.budget} · {p.duree} · {p.autorisation.toLowerCase()}</span>
                  </span>
                </Link>
              </CarteLueur>
            </Apparition>
          ))}
        </ul>
        <p className="mt-6 text-[14px] text-[var(--doux)]">Projets dessinés et budgets de travaux TTC d&apos;exemple : l&apos;agence est fictive.</p>
      </section>

      {/* ---------- Le seuil de 150 m² ---------- */}
      <section className="bg-[#A63F2A] text-[#F4EFE6]">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <Apparition><Surtitre>La règle, sans détour</Surtitre></Apparition>
            <p aria-hidden="true" className="font-[family-name:var(--titres)] text-[clamp(7rem,17vw,15rem)] font-semibold leading-[0.8] tracking-[-0.06em]">
              150<span className="text-[0.4em] italic font-normal">&nbsp;m²</span>
            </p>
            <TitreRevele
              texte={"Au-delà, avec permis\u00a0: *architecte obligatoire.* En dessous\u202f? On te le dit aussi."}
              className="max-w-xl font-[family-name:var(--titres)] text-[clamp(1.8rem,3vw,2.6rem)] font-semibold leading-[1.08] tracking-[-0.02em]"
              classeAccent="italic font-normal"
            />
          </div>
          <ol className="divide-y divide-white/25 border-y border-white/25">
            {LOI.map((l, i) => (
              <Apparition as="li" key={l.titre} delai={i * 120} className="grid grid-cols-[3.5rem_1fr] gap-4 py-8">
                <span className="font-[family-name:var(--titres)] text-[2.4rem] italic leading-none">{i + 1}</span>
                <span className="space-y-2">
                  <span className="block font-[family-name:var(--titres)] text-[1.7rem] font-semibold leading-tight">{l.titre}</span>
                  <span className="block text-lg leading-relaxed">{l.texte}</span>
                </span>
              </Apparition>
            ))}
            <li className="py-6 text-[15px]">
              Loi n° 77-2 du 3 janvier 1977, art. 3 et 4 ; code de l&apos;urbanisme, art. R431-2 et R*421-14.
            </li>
          </ol>
        </div>
      </section>

      {/* ---------- La méthode, en récit ---------- */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-36">
        <div className="mb-10 space-y-6 md:mb-4">
          <Apparition><Surtitre className="text-[var(--doux)]">Comment on travaille</Surtitre></Apparition>
          <TitreRevele
            texte="De ta maison *à sa jumelle.*"
            className="max-w-4xl font-[family-name:var(--titres)] text-[clamp(2.8rem,6vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.045em]"
            classeAccent="italic font-normal text-[var(--accent-texte)]"
          />
        </div>
        <RecitColle
          etapes={ETAPES.map((e, i) => ({
            surtitre: `Étape ${i + 1}`,
            titre: e.titre,
            texte: <p>{e.texte}</p>,
            visuel: <Image src={PHOTOS_ETAPES[i].src} alt={PHOTOS_ETAPES[i].alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />,
          }))}
        />
      </section>

      {/* ---------- Le lotissement et le n° 14 ---------- */}
      <section className="px-3 sm:px-5">
        <div className="overflow-hidden rounded-[2.5rem] bg-[var(--accent)] text-[var(--sur-accent)]">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:px-10 md:py-28 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div className="space-y-7">
              <Apparition><Surtitre>{LOTISSEMENT.nom} · {VISITE.date}</Surtitre></Apparition>
              <TitreRevele
                texte={"Samedi, venez voir *le n° 14.*"}
                className="font-[family-name:var(--titres)] text-[clamp(3rem,7vw,6rem)] font-semibold leading-[0.9] tracking-[-0.045em]"
                classeAccent="italic font-normal"
              />
              <Apparition as="p" delai={200} className="max-w-lg text-lg leading-relaxed">
                Dans un lotissement, toutes les maisons sont identiques. Tu en transformes une, et tous
                les voisins voient la leur. Avec l&apos;accord de ses propriétaires, le n° 14 ouvre sa
                porte un samedi matin.
              </Apparition>
              <Apparition delai={300}>
                <Bouton href={`${DOSSIER}/visite-du-14`} variante="sombre">Transformer le n° 14, et venir le voir</Bouton>
              </Apparition>
            </div>
            <Apparition de="zoom" delai={150}>
              <ul aria-hidden="true" className="grid grid-cols-6 gap-2 rounded-[2rem] bg-[#F6E2B8] p-4 sm:p-6">
                {Array.from({ length: 24 }, (_, k) => (
                  <li key={k} className={k === 13 ? "relative z-10 scale-125 rounded-lg bg-[var(--carte)] p-0.5 shadow-lg" : "p-0.5"}>
                    <Maison modele="sous-sol" apres={k === 13} className="block h-auto w-full" />
                  </li>
                ))}
              </ul>
            </Apparition>
          </div>
        </div>
      </section>

      {/* ---------- Le samedi matin ---------- */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-7">
            <Apparition><Surtitre className="text-[var(--doux)]">Un samedi matin par mois</Surtitre></Apparition>
            <TitreRevele
              texte="Trente minutes pour savoir *si ton projet tient.*"
              className="font-[family-name:var(--titres)] text-[clamp(2.8rem,6vw,5.2rem)] font-semibold leading-[0.95] tracking-[-0.045em]"
              classeAccent="italic font-normal text-[var(--accent-texte)]"
            />
            <Apparition as="p" delai={200} className="max-w-xl text-xl leading-relaxed text-[var(--doux)]">
              À l&apos;agence ou en visio, le premier samedi de chaque mois. Les vrais créneaux sont en
              ligne : tu choisis, tu réserves. {agence.prixSamedi} (exemple), déduits si tu nous confies la mission.
            </Apparition>
            <Apparition delai={300}>
              <Bouton href={`${DOSSIER}/rendez-vous`} variante="sombre">Voir les créneaux du samedi</Bouton>
            </Apparition>
          </div>
          <ul className="grid gap-4">
            {SAMEDIS.map((s, i) => (
              <Apparition as="li" key={s.id} de="droite" delai={i * 150}>
                <Link href={`${DOSSIER}/rendez-vous`} className="group flex items-center justify-between gap-6 rounded-[2rem] border border-[var(--trait)] bg-[var(--carte)] px-6 py-6 transition-colors hover:border-[var(--encre)] sm:px-8">
                  <span>
                    <span className="block font-[family-name:var(--titres)] text-[clamp(1.8rem,3vw,2.4rem)] font-semibold leading-none tracking-[-0.02em]">{s.libelle}</span>
                    <span className="mt-2 block text-[15px] text-[var(--doux)]">de 9 h à 12 h · six créneaux de 30 minutes</span>
                  </span>
                  <span aria-hidden="true" className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[var(--accent)] text-[var(--sur-accent)] transition-transform duration-500 group-hover:translate-x-1">→</span>
                </Link>
              </Apparition>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Honoraires ---------- */}
      <section className="border-y border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-6">
            <Apparition><Surtitre className="text-[var(--doux)]">Honoraires</Surtitre></Apparition>
            <TitreRevele
              texte="Dits *avant* de commencer."
              className="font-[family-name:var(--titres)] text-[clamp(2.8rem,5.5vw,4.8rem)] font-semibold leading-[0.95] tracking-[-0.045em]"
              classeAccent="italic font-normal text-[var(--accent-texte)]"
            />
            <Apparition as="p" delai={150} className="max-w-md text-lg leading-relaxed text-[var(--doux)]">
              Au forfait, fixé avant le début de la mission, ou selon la mission. Avant tout engagement,
              nous t&apos;en communiquons les modalités ; elles figurent au contrat.
            </Apparition>
            <Apparition delai={250} className="relative hidden aspect-[3/2] overflow-hidden rounded-[2rem] lg:block">
              <Image src={photos.croquis.src} alt={photos.croquis.alt} fill sizes="460px" className="object-cover" />
            </Apparition>
          </div>
          <ul className="divide-y divide-[var(--trait)] self-start border-y border-[var(--trait)]">
            {HONORAIRES.map(([quoi, prix, note], i) => (
              <Apparition as="li" key={quoi} delai={i * 110} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-7">
                <span className="space-y-1">
                  <span className="block font-[family-name:var(--titres)] text-[1.6rem] font-semibold leading-tight">{quoi}</span>
                  <span className="block text-[15px] text-[var(--doux)]">{note}</span>
                </span>
                <span className="text-right font-[family-name:var(--titres)] text-[clamp(1.8rem,3vw,2.4rem)] font-semibold tabular-nums">
                  {prix}
                  <span className="block text-[13px] font-normal text-[var(--doux)]">exemple</span>
                </span>
              </Apparition>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Questions ---------- */}
      <section id="questions" className="scroll-mt-24 mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 md:py-36 lg:grid-cols-[0.7fr_1.3fr]">
        <div className="space-y-6">
          <Apparition><Surtitre className="text-[var(--doux)]">Questions</Surtitre></Apparition>
          <TitreRevele
            texte="Ce que les voisins *demandent.*"
            className="font-[family-name:var(--titres)] text-[clamp(2.6rem,5vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.045em]"
            classeAccent="italic font-normal text-[var(--accent-texte)]"
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
