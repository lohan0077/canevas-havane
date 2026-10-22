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
import ListeNon from "./_composants/ListeNon";
import { DOSSIER, cabinet, gestes, photos, questions, questionsHebdo, seance, seanceAdulte } from "./_composants/donnees";

export const metadata: Metadata = {
  title: "Le Pourquoi — cabinet d'ostéopathie, site de démonstration",
  description:
    "Le site d'un cabinet d'ostéopathie imaginaire qui explique tout : chaque geste a sa page, ce que l'ostéopathe ne fait pas est écrit, le prix est affiché, et l'on réserve dès 7 h.",
  ...adressesDeLaPage("/exemples/le-pourquoi"),
};

const PHOTOS_SEANCE = [photos.attente, photos.omoplate, photos.mains, photos.table];

export default function LePourquoi() {
  return (
    <main>
      {/* ---------- Premier écran ---------- */}
      <section className="kit-grain relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <PhotoCinema src={photos.colonne.src} alt="" priority origine="62% 38%" className="opacity-55" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(19,42,36,0.55)_0%,rgba(19,42,36,0.2)_40%,rgba(19,42,36,0.92)_100%)]" />
        <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end gap-8 px-5 pb-10 pt-36 sm:px-8 md:pb-14">
          <Apparition>
            <Surtitre clair>{cabinet.titre} · {cabinet.ville}</Surtitre>
          </Apparition>
          <TitreRevele
            as="h1"
            auChargement
            texte={"Pourquoi\u202f?"}
            className="font-semibold leading-[0.8] tracking-[-0.06em] text-[clamp(5.5rem,21vw,19rem)]"
          />
          <div className="grid gap-8 border-t border-white/20 pt-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <TitreRevele
              as="p"
              auChargement
              delai={350}
              texte="L'ostéopathie, *expliquée.* Chaque geste a sa page. Ce que je ne fais pas est écrit. Le prix est affiché."
              className="max-w-2xl font-[family-name:var(--titres)] text-[clamp(1.5rem,2.6vw,2.1rem)] leading-[1.2] tracking-[-0.01em]"
              classeAccent="font-[family-name:var(--texte)] italic text-[#F0A07A]"
            />
            <Apparition delai={700} className="flex flex-wrap gap-3 lg:justify-end">
              <Bouton href={`${DOSSIER}/rendez-vous`}>Prendre rendez-vous</Bouton>
              <Bouton href={`${DOSSIER}#gestes`} variante="contour">Voir les gestes</Bouton>
            </Apparition>
          </div>
          <Apparition as="ul" delai={900} className="grid grid-cols-1 gap-3 font-[family-name:var(--titres)] text-[15px] sm:grid-cols-3">
            {[
              [`${seanceAdulte.prix} · ${seanceAdulte.duree}`, "prix d'exemple, affiché"],
              ["Dès 7 h, jusqu'à 20 h 45", "avant ou après le travail"],
              ["Facture à chaque séance", "pour votre mutuelle"],
            ].map(([fort, doux]) => (
              <li key={fort} className="flex items-baseline justify-between gap-3 rounded-2xl border border-white/15 bg-[var(--sombre)]/60 px-4 py-3 backdrop-blur-md">
                <span className="font-semibold">{fort}</span>
                <span className="text-[13px] text-[var(--sur-sombre)]/85">{doux}</span>
              </li>
            ))}
          </Apparition>
        </div>
      </section>

      {/* ---------- Les questions qu'on n'ose pas poser ---------- */}
      <div className="bg-[var(--accent)] py-5 text-[var(--sur-accent)]">
        <Defilant
          duree={46}
          elements={[...gestes.map((g) => g.question), ...questionsHebdo.slice(3).map((q) => q.q)]}
          classeElement="font-[family-name:var(--titres)] text-xl md:text-2xl font-medium tracking-[-0.01em] whitespace-nowrap"
        />
      </div>

      {/* ---------- Les gestes ---------- */}
      <section id="gestes" className="scroll-mt-24 mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-36">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div className="space-y-6">
            <Apparition><Surtitre>Les gestes</Surtitre></Apparition>
            <TitreRevele
              texte="Chaque geste a *sa page.*"
              className="text-[clamp(3rem,7vw,6.5rem)] font-semibold leading-[0.95] tracking-[-0.045em]"
              classeAccent="font-[family-name:var(--texte)] italic font-normal text-[var(--accent-texte)]"
            />
          </div>
          <Apparition as="p" delai={200} className="text-xl leading-relaxed text-[var(--doux)]">
            Ce que je fais, pourquoi je le fais, et ce que ça ne promet pas. Les trois questions que
            vous tapez sur Google, avant même de venir.
          </Apparition>
        </div>

        <ul className="mt-16 grid gap-5 md:grid-cols-3">
          {gestes.map((g, i) => (
            <Apparition as="li" key={g.slug} delai={i * 140} de="zoom">
              <CarteLueur className="group h-full rounded-[2rem]">
                <Link
                  href={`${DOSSIER}/gestes/${g.slug}`}
                  data-geste={g.slug}
                  className="relative flex h-[460px] flex-col justify-between overflow-hidden rounded-[2rem] bg-[var(--sombre)] p-7 text-[var(--sur-sombre)] md:h-[540px]"
                >
                  <Image
                    src={photos[g.photo].src}
                    alt={photos[g.photo].alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover opacity-60 transition-transform duration-[1.4s] ease-out group-hover:scale-[1.07]"
                  />
                  <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(19,42,36,0.1)_30%,rgba(19,42,36,0.95)_100%)]" />
                  <span className="relative flex items-center justify-between font-[family-name:var(--titres)]">
                    <span className="rounded-full bg-[var(--sombre)]/70 px-3 py-1 text-sm backdrop-blur">Geste n° {g.numero}</span>
                    <span aria-hidden="true" className="grid h-11 w-11 place-items-center rounded-full bg-[var(--accent)] text-[var(--sur-accent)] transition-transform duration-500 group-hover:-rotate-45">→</span>
                  </span>
                  <span className="relative space-y-3">
                    <span className="block font-[family-name:var(--titres)] text-[2.1rem] font-semibold leading-[1.02] tracking-[-0.03em]">{g.question}</span>
                    <span className="block text-[15px] text-[var(--sur-sombre)]/90">Sur Google : « {g.recherche} »</span>
                  </span>
                </Link>
              </CarteLueur>
            </Apparition>
          ))}
        </ul>
      </section>

      {/* ---------- Ce que je ne fais pas ---------- */}
      <section className="px-3 sm:px-5">
        <div className="kit-grain relative overflow-hidden rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 sm:px-10 md:py-32 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="space-y-6 lg:sticky lg:top-28 lg:self-start">
              <Apparition><Surtitre clair>Comme tout ostéopathe</Surtitre></Apparition>
              <TitreRevele
                texte="Ce que je ne fais *pas.*"
                className="text-[clamp(2.8rem,6vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.045em]"
                classeAccent="font-[family-name:var(--texte)] italic font-normal text-[#F0A07A]"
              />
              <Apparition as="p" delai={200} className="max-w-md text-lg leading-relaxed text-[var(--sur-sombre)]/90">
                La page la plus importante du site. Une limite dite, c&apos;est une surprise de moins
                — et c&apos;est souvent ce qui décide à réserver.
              </Apparition>
              <Apparition delai={300}>
                <Bouton href={`${DOSSIER}/ce-que-je-ne-fais-pas`} variante="clair">Lire la page</Bouton>
              </Apparition>
            </div>
            <ListeNon />
          </div>
        </div>
      </section>

      {/* ---------- La séance ---------- */}
      <section id="seance" className="scroll-mt-24 mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-36">
        <div className="mb-10 space-y-6 md:mb-4">
          <Apparition><Surtitre>La séance</Surtitre></Apparition>
          <TitreRevele
            texte="Un *pourquoi* à chaque étape."
            className="max-w-4xl text-[clamp(2.8rem,6vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.045em]"
            classeAccent="font-[family-name:var(--texte)] italic font-normal text-[var(--accent-texte)]"
          />
        </div>
        <RecitColle
          etapes={seance.map((s, i) => ({
            surtitre: s.moment,
            titre: s.etape,
            texte: (
              <p>
                <span className="font-[family-name:var(--titres)] font-semibold text-[var(--encre)]">Pourquoi ? </span>
                {s.pourquoi}
              </p>
            ),
            visuel: <Image src={PHOTOS_SEANCE[i].src} alt={PHOTOS_SEANCE[i].alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />,
          }))}
        />
      </section>

      {/* ---------- Le prix, en gros ---------- */}
      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 md:pb-36">
        <div className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
          <Apparition de="zoom" className="relative overflow-hidden rounded-[2.5rem] bg-[var(--accent)] p-8 text-[var(--sur-accent)] sm:p-12">
            <p className="font-[family-name:var(--titres)] text-sm uppercase tracking-[0.18em]">Séance adulte · prix d&apos;exemple</p>
            <p className="mt-6 font-[family-name:var(--titres)] font-semibold leading-[0.85] tracking-[-0.06em] tabular-nums">
              <span className="block text-[clamp(6rem,15vw,13rem)]">{seanceAdulte.prix}</span>
              <span className="block text-[clamp(3rem,7vw,6rem)]">{seanceAdulte.duree}</span>
            </p>
            <p className="mt-8 max-w-md text-lg leading-relaxed">Le même prix à 7 h et à 20 h. Aucune majoration, aucun « à partir de ».</p>
          </Apparition>
          <div className="grid gap-5">
            <Apparition delai={150} className="rounded-[2.5rem] border border-[var(--trait)] bg-[var(--carte)] p-8">
              <p className="font-[family-name:var(--titres)] text-3xl font-semibold tracking-[-0.03em]">Une facture, à chaque séance.</p>
              <p className="mt-3 text-lg leading-relaxed text-[var(--doux)]">Pour demander une prise en charge à votre mutuelle, si votre contrat le prévoit.</p>
            </Apparition>
            <Apparition delai={300} className="flex flex-col justify-between gap-6 rounded-[2.5rem] bg-[var(--sombre)] p-8 text-[var(--sur-sombre)]">
              <p className="font-[family-name:var(--titres)] text-3xl font-semibold tracking-[-0.03em]">Tous les tarifs, en quatre lignes.</p>
              <Bouton href={`${DOSSIER}/seance-et-prix`}>Voir la séance et le prix</Bouton>
            </Apparition>
          </div>
        </div>
      </section>

      {/* ---------- Une question par semaine ---------- */}
      <section className="border-y border-[var(--trait)] bg-[var(--carte)] py-24 md:py-32">
        <div className="mx-auto max-w-7xl space-y-12 px-5 sm:px-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-end">
            <TitreRevele
              texte="Une question de patient, *chaque semaine.*"
              className="text-[clamp(2.6rem,5.5vw,5rem)] font-semibold leading-[0.95] tracking-[-0.045em]"
              classeAccent="font-[family-name:var(--texte)] italic font-normal text-[var(--accent-texte)]"
            />
            <Apparition as="p" delai={150} className="text-lg leading-relaxed text-[var(--doux)]">
              Une réponse filmée d&apos;une minute, au cabinet. Jamais un patient à l&apos;image.
              Calendrier d&apos;exemple : celui d&apos;un lancement en janvier 2027.
            </Apparition>
          </div>
          <ol className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8">
            {questionsHebdo.map((q, i) => (
              <Apparition as="li" key={q.n} delai={i * 90} de="droite" className="w-[78vw] max-w-[340px] shrink-0 snap-start">
                <div className="flex h-full min-h-[260px] flex-col justify-between rounded-[2rem] border border-[var(--trait)] bg-[var(--fond)] p-6">
                  <div className="flex items-center justify-between font-[family-name:var(--titres)] text-sm text-[var(--doux)]">
                    <span>Semaine {q.n}</span>
                    <span>{q.date}</span>
                  </div>
                  <p className="font-[family-name:var(--titres)] text-[1.7rem] font-semibold leading-[1.08] tracking-[-0.025em]">{q.q}</p>
                  {q.geste ? (
                    <Link href={`${DOSSIER}/gestes/${q.geste}`} className="font-[family-name:var(--titres)] text-[15px] font-semibold text-[var(--accent-texte)] underline-offset-4 hover:underline">
                      Lire la réponse →
                    </Link>
                  ) : (
                    <span className="font-[family-name:var(--titres)] text-[15px] text-[var(--doux)]">À venir</span>
                  )}
                </div>
              </Apparition>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- Questions ---------- */}
      <section id="questions" className="scroll-mt-24 mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 md:py-36 lg:grid-cols-[0.7fr_1.3fr]">
        <div className="space-y-6">
          <Apparition><Surtitre>Vos questions</Surtitre></Apparition>
          <TitreRevele
            texte="Ce qu'on me demande *le plus.*"
            className="text-[clamp(2.6rem,5vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.045em]"
            classeAccent="font-[family-name:var(--texte)] italic font-normal text-[var(--accent-texte)]"
          />
        </div>
        <Apparition delai={150}>
          <Accordeon questions={questions.map((q) => ({ question: q.q, reponse: q.r }))} />
        </Apparition>
      </section>

      <AppelFinal />
    </main>
  );
}
