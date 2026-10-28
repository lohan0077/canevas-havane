import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import Accordeon from "../_kit/Accordeon";
import Apparition from "../_kit/Apparition";
import CarteLueur from "../_kit/CarteLueur";
import Defilant from "../_kit/Defilant";
import FondVivant from "../_kit/FondVivant";
import PhotoCinema from "../_kit/PhotoCinema";
import RecitColle from "../_kit/RecitColle";
import TitreRevele from "../_kit/TitreRevele";
import { AppelFinal, Bouton, FOND_NUIT, Plaque, Surtitre } from "./_composants/Blocs";
import Cadran from "./_composants/Cadran";
import Horloge from "./_composants/Horloge";
import SoutienPsy from "./_composants/SoutienPsy";
import TroisClics from "./_composants/TroisClics";
import { DOSSIER, cabinet, champsAbsents, photos, porteOuverte, questions, rienAPreparer } from "./_composants/donnees";

// Le site des deux vidéos des psychologues. De « Créer une marque » : le nom, le titre
// de psychologue plus gros que tout, l'horloge de la première séance, la porte ouverte.
// De « Remplir l'agenda » : le rendez-vous en trois clics qui ne demande jamais
// pourquoi on vient, Mon soutien psy dit dès l'accueil, la carte bancaire acceptée.
// Premier écran : la typographie seule, sur la nuit prune qui bouge, et un cadran.
export const metadata: Metadata = {
  title: "Cinquante Minutes — cabinet de psychologue, site de démonstration",
  description:
    "Le site d'un cabinet de psychologue imaginaire : cinquante minutes où l'on n'a rien à prouver, une horloge qui raconte la première séance, et un rendez-vous en trois clics qui ne demande jamais pourquoi on vient.",
  ...adressesDeLaPage("/exemples/cinquante-minutes"),
};

const PHOTOS_RECIT = [photos.chaise, photos.fauteuil, photos.sablier, photos.entrouverte];

export default function CinquanteMinutes() {
  return (
    <main>
      {/* ---------- Premier écran : le nom en petit, le titre en grand ---------- */}
      <section className="kit-grain relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <FondVivant couleurs={FOND_NUIT} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,rgba(42,24,48,0.2),rgba(42,24,48,0.8)_75%)]" />
        <Cadran className="absolute left-1/2 top-[46%] w-[min(135vw,960px)] -translate-x-1/2 -translate-y-1/2" />
        <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-5 pb-8 pt-28 text-center sm:px-8 sm:pt-36">
          <Apparition>
            <p className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-[var(--sombre)]/60 px-4 py-1.5 text-[13px] backdrop-blur-md">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
              {cabinet.psychologue} · {cabinet.ville}
            </p>
          </Apparition>
          <TitreRevele
            as="h1"
            auChargement
            texte="Cinquante Minutes"
            className="mt-7 font-normal italic text-[clamp(1.7rem,3.2vw,2.6rem)] leading-none"
          />
          <TitreRevele
            as="p"
            auChargement
            delai={200}
            texte="Psychologue"
            className="mt-2 font-[family-name:var(--titres)] uppercase leading-[0.86] tracking-[-0.015em] text-[clamp(2.6rem,12.2vw,12.4rem)]"
          />
          <TitreRevele
            as="p"
            auChargement
            delai={500}
            texte="Cinquante minutes où vous n'avez *rien à prouver.*"
            className="mt-6 max-w-2xl font-[family-name:var(--titres)] text-[clamp(1.35rem,2.5vw,2.1rem)] leading-[1.2]"
            classeAccent="italic text-[var(--accent)]"
          />
          <Apparition delai={750} className="mt-8 flex flex-wrap justify-center gap-3">
            <Bouton href={`${DOSSIER}/rendez-vous`}>Rendez-vous</Bouton>
            <Bouton href={`${DOSSIER}/premiere-seance`} variante="contour">La première séance</Bouton>
          </Apparition>
          <Apparition delai={900} className="mt-6 flex w-full justify-center">
            <SoutienPsy />
          </Apparition>
        </div>
        <Apparition as="ul" delai={1050} className="relative mx-auto grid w-full max-w-5xl grid-cols-1 gap-2 px-5 pb-8 text-[14px] sm:grid-cols-3 sm:px-8">
          {[
            [`${cabinet.seance.prix} · ${cabinet.seance.duree}`, "prix d'exemple"],
            ["Carte bancaire acceptée", "espèces, virement"],
            ["Urgence : 15 · 3114", "jour et nuit"],
          ].map(([fort, doux]) => (
            <li key={fort} className="flex items-baseline justify-between gap-3 rounded-full border border-white/15 bg-[var(--sombre)]/70 px-5 py-2.5 backdrop-blur-md">
              <span className="font-semibold">{fort}</span>
              <span className="text-[13px] text-[var(--sur-sombre)]/85">{doux}</span>
            </li>
          ))}
        </Apparition>
      </section>

      {/* ---------- Ce qu'on n'a pas à faire ---------- */}
      <div className="bg-[var(--accent)] py-5 text-[var(--sur-accent)]">
        <Defilant
          duree={44}
          separateur="○"
          elements={["Rien à prouver", "Rien à préparer", "Pas de motif à écrire", "Carte bancaire acceptée", "Partenaire Mon soutien psy", "Cinquante minutes, pas une de moins", "La suite, c'est vous qui décidez"]}
          classeElement="font-[family-name:var(--titres)] text-xl italic whitespace-nowrap md:text-2xl"
        />
      </div>

      {/* ---------- Le premier message ---------- */}
      <section className="mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-8 md:py-36 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="space-y-8">
          <Apparition><Surtitre>Pourquoi trois clics</Surtitre></Apparition>
          <Apparition as="p" className="font-[family-name:var(--titres)] text-[clamp(2.4rem,5.2vw,4.6rem)] leading-[1.02] text-[var(--doux)]">
            Le plus dur, ce n&apos;est pas <span className="kit-barre">la première séance.</span>
          </Apparition>
          <TitreRevele
            texte="C'est le *premier message.*"
            className="font-normal text-[clamp(3rem,7vw,6.4rem)] leading-[0.95] tracking-[-0.02em]"
            classeAccent="italic text-[var(--accent-texte)]"
          />
          <Apparition as="p" delai={200} className="max-w-xl text-xl leading-relaxed text-[var(--doux)]">
            Appeler, expliquer, se justifier à un répondeur : beaucoup renoncent là. Ici, il suffit
            de cliquer. Même à minuit, depuis son lit.
          </Apparition>
        </div>
        <Apparition de="rideau" className="relative mx-auto aspect-[3/4] w-full max-w-[400px] overflow-hidden rounded-t-[999px] rounded-b-[12px]">
          <Image src={photos.nuit.src} alt={photos.nuit.alt} fill sizes="(min-width: 1024px) 400px, 90vw" className="object-cover" />
          <p className="absolute inset-x-4 bottom-4 rounded-full bg-[var(--sombre)] px-4 py-2 text-center text-[14px] text-[var(--sur-sombre)]">Minuit. Depuis son lit.</p>
        </Apparition>
      </section>

      {/* ---------- Le rendez-vous en trois clics ---------- */}
      <section id="rendez-vous" className="scroll-mt-20 bg-[#B9C7B2] text-[var(--encre)]">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-24 sm:px-8 md:py-32 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="space-y-8 px-1 lg:sticky lg:top-28">
            <Apparition><p className="flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.28em]"><span aria-hidden="true" className="h-px w-8 bg-current" />Prendre rendez-vous</p></Apparition>
            <TitreRevele
              texte="Trois clics. *Rien à expliquer.*"
              className="font-normal text-[clamp(2.8rem,6vw,5.4rem)] leading-[0.96] tracking-[-0.02em]"
              classeAccent="italic"
            />
            <ol className="space-y-3">
              {["La séance", "Le jour", "L'heure"].map((t, i) => (
                <Apparition as="li" key={t} delai={i * 120} de="gauche" className="flex items-baseline gap-5 border-b border-[var(--encre)]/25 pb-3">
                  <span className="font-[family-name:var(--titres)] text-4xl italic tabular-nums">{i + 1}</span>
                  <span className="text-xl">{t}</span>
                </Apparition>
              ))}
            </ol>
            <Apparition as="p" delai={300} className="max-w-md text-lg leading-relaxed">
              Puis un nom et un téléphone, pour pouvoir vous rappeler si le cabinet doit déplacer un
              rendez-vous. Pas de motif : ce qui vous amène, vous le direz en séance.
            </Apparition>
          </div>
          <Apparition de="zoom">
            <TroisClics />
          </Apparition>
        </div>
      </section>

      {/* ---------- Ce que le site ne demande pas, et ce qu'il dit ---------- */}
      <section id="tarifs" className="scroll-mt-24 mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-36">
        <div className="mb-14 grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div className="space-y-6">
            <Apparition><Surtitre>Avant de venir</Surtitre></Apparition>
            <TitreRevele
              texte="Tout ce qu'il faut savoir. *Rien à dire.*"
              className="font-normal text-[clamp(2.8rem,6vw,5.4rem)] leading-[0.96] tracking-[-0.02em]"
              classeAccent="italic text-[var(--accent-texte)]"
            />
          </div>
          <Apparition as="p" delai={150} className="text-xl leading-relaxed text-[var(--doux)]">
            Le prix, le paiement, le remboursement, les urgences : écrits avant. Et ce que le site
            ne vous demandera jamais.
          </Apparition>
        </div>
        <div className="grid gap-4 md:grid-cols-6">
          <Apparition de="zoom" className="md:col-span-4 md:row-span-2">
            <CarteLueur className="h-full rounded-[2rem]">
              <div className="flex h-full flex-col justify-between gap-10 rounded-[2rem] bg-[var(--sombre)] p-7 text-[var(--sur-sombre)] sm:p-10">
                <div className="space-y-4">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">Trois champs absents</p>
                  <ul className="space-y-3">
                    {champsAbsents.map((c, i) => (
                      <Apparition as="li" key={c} delai={i * 160} className="font-[family-name:var(--titres)] text-[clamp(1.8rem,3.6vw,3rem)] leading-[1.1]">
                        <span className="kit-barre">{c}</span>
                      </Apparition>
                    ))}
                  </ul>
                </div>
                <p className="max-w-lg leading-relaxed text-[var(--sur-sombre)]/90">
                  Ce qui amène quelqu&apos;un chez un psychologue est une donnée de santé. Le site
                  n&apos;en a pas besoin pour vous donner un rendez-vous : il ne la demande pas, et
                  ne l&apos;enregistre nulle part. <span className="text-[var(--sur-sombre)]/85">RGPD, art. 4 (15) et art. 9.</span>
                </p>
              </div>
            </CarteLueur>
          </Apparition>
          <Apparition delai={120} className="md:col-span-2">
            <div className="h-full rounded-[2rem] border border-[var(--trait)] bg-[var(--carte)] p-7">
              <p className="text-sm text-[var(--doux)]">La séance · {cabinet.seance.duree}</p>
              <p className="mt-2 font-[family-name:var(--titres)] text-[5.5rem] leading-none tabular-nums">{cabinet.seance.prix}</p>
              <p className="mt-3 text-sm text-[var(--doux)]">Prix d&apos;exemple. Le même à 9 h et à 19 h 30.</p>
            </div>
          </Apparition>
          <Apparition delai={240} className="md:col-span-2">
            <div className="h-full rounded-[2rem] bg-[var(--accent)] p-7 text-[var(--sur-accent)]">
              <p className="font-[family-name:var(--titres)] text-3xl leading-tight">Carte bancaire <em>acceptée.</em></p>
              <p className="mt-3">Espèces et virement aussi. Une facture à chaque séance.</p>
            </div>
          </Apparition>
          <Apparition delai={120} className="md:col-span-2">
            <div className="h-full rounded-[2rem] border border-[var(--trait)] bg-[var(--carte)] p-7">
              <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-[var(--accent-texte)]">Remboursement</p>
              <p className="mt-3 font-[family-name:var(--titres)] text-3xl leading-tight">Partenaire Mon soutien psy</p>
              <p className="mt-3 text-[var(--doux)]">Partenariat d&apos;exemple. Le détail : au premier rendez-vous, et sur ameli.fr.</p>
            </div>
          </Apparition>
          <Apparition delai={240} de="zoom" className="relative min-h-[260px] overflow-hidden rounded-[2rem] md:col-span-2">
            <Image src={photos.fauteuil.src} alt={photos.fauteuil.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
            <p className="absolute inset-x-4 bottom-4 rounded-full bg-[var(--carte)] px-4 py-2 text-center text-[15px]">Le fauteuil que vous voulez.</p>
          </Apparition>
          <Apparition delai={360} className="md:col-span-2">
            <div className="flex h-full flex-col justify-between gap-4 rounded-[2rem] border-2 border-[var(--encre)] p-7">
              <p className="font-[family-name:var(--titres)] text-5xl tabular-nums">15 · 3114</p>
              <p className="leading-relaxed">Si c&apos;est urgent, n&apos;attendez pas un rendez-vous : le 15. Pour une pensée suicidaire, la vôtre ou celle d&apos;un proche : le 3114, jour et nuit.</p>
            </div>
          </Apparition>
        </div>
      </section>

      {/* ---------- L'horloge de la première séance ---------- */}
      <section id="horloge" className="scroll-mt-20 px-3 sm:px-5">
        <div className="kit-grain relative overflow-hidden rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
          <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(60%_50%_at_75%_40%,rgba(201,162,126,0.18),transparent_70%)]" />
          <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-24 sm:px-10 md:py-32 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
            <div className="space-y-7 px-1">
              <Apparition><Surtitre clair>La première séance</Surtitre></Apparition>
              <TitreRevele
                texte="Une horloge de *cinquante minutes.*"
                className="font-normal text-[clamp(2.8rem,4.6vw,4.4rem)] leading-[0.98] tracking-[-0.02em]"
                classeAccent="italic text-[var(--accent)]"
              />
              <Apparition as="p" delai={200} className="max-w-md text-lg leading-relaxed text-[var(--sur-sombre)]/90">
                Faites glisser le temps : elle raconte ce qui se passe, minute après minute. Un
                déroulé, pas une promesse.
              </Apparition>
              <Apparition delai={300}>
                <Bouton href={`${DOSSIER}/premiere-seance`} variante="clair">Les cinquante minutes en entier</Bouton>
              </Apparition>
            </div>
            <Apparition de="zoom" delai={150}>
              <Horloge clair />
            </Apparition>
          </div>
        </div>
      </section>

      {/* ---------- Rien à préparer : le récit ---------- */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-36">
        <div className="mb-10 space-y-6 md:mb-4">
          <Apparition><Surtitre>Ce que vous trouverez</Surtitre></Apparition>
          <TitreRevele
            texte="Rien à préparer. *Tout est dit avant.*"
            className="max-w-4xl font-normal text-[clamp(2.8rem,6vw,5.4rem)] leading-[0.96] tracking-[-0.02em]"
            classeAccent="italic text-[var(--accent-texte)]"
          />
        </div>
        <RecitColle
          etapes={rienAPreparer.map((r, i) => ({
            surtitre: `0${i + 1}`,
            titre: r.titre,
            texte: <p>{r.texte}</p>,
            visuel: <Image src={PHOTOS_RECIT[i].src} alt={PHOTOS_RECIT[i].alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />,
          }))}
        />
      </section>

      {/* ---------- Le titre, plus gros que le nom ---------- */}
      <section className="border-y border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-2 lg:items-center">
          <div className="space-y-7">
            <Apparition><Surtitre>Sur la porte</Surtitre></Apparition>
            <TitreRevele
              texte="Le nom en petit. *Le titre en grand.*"
              className="font-normal text-[clamp(2.8rem,6vw,5.4rem)] leading-[0.96] tracking-[-0.02em]"
              classeAccent="italic text-[var(--accent-texte)]"
            />
            <Apparition as="p" delai={150} className="max-w-xl text-lg leading-relaxed text-[var(--doux)]">
              « Psychologue » est un titre protégé par la loi : seuls les titulaires d&apos;un
              diplôme fixé par les textes peuvent le porter. Sur la plaque comme ici, c&apos;est lui
              qu&apos;on lit d&apos;abord.
            </Apparition>
            <Apparition delai={250}>
              <dl className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-[1.25rem] border border-[var(--trait)] bg-[var(--fond)] p-5">
                <dt className="text-sm text-[var(--doux)]">Diplôme</dt>
                <dd className="mt-1 font-semibold">{cabinet.diplome} (exemple)</dd>
              </div>
              <div className="rounded-[1.25rem] border border-[var(--trait)] bg-[var(--fond)] p-5">
                <dt className="text-sm text-[var(--doux)]">N° ADELI</dt>
                <dd className="mt-1 font-semibold tabular-nums">{cabinet.adeli} (exemple)</dd>
              </div>
              </dl>
            </Apparition>
            <p className="text-sm text-[var(--doux)]">Loi n° 85-772 du 25 juillet 1985, art. 44.</p>
          </div>
          <Apparition de="zoom" delai={200} className="rotate-[-2deg]">
            <Plaque />
          </Apparition>
        </div>
      </section>

      {/* ---------- La porte ouverte ---------- */}
      <section className="px-3 py-3 sm:px-5 sm:py-5">
        <div className="kit-grain relative isolate overflow-hidden rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
          <PhotoCinema src={photos.entrouverte.src} alt="" origine="20% 60%" className="opacity-60" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(42,24,48,0.96)_0%,rgba(42,24,48,0.82)_55%,rgba(42,24,48,0.45)_100%)]" />
          <div className="relative mx-auto max-w-6xl space-y-8 px-6 py-24 sm:px-10 md:py-36">
            <Apparition><Surtitre clair>Pour l&apos;ouverture</Surtitre></Apparition>
            <TitreRevele
              texte="Porte ouverte. On ne vous demandera *rien.*"
              className="max-w-4xl font-normal text-[clamp(2.8rem,6.4vw,6rem)] leading-[0.96] tracking-[-0.02em]"
              classeAccent="italic text-[var(--accent)]"
            />
            <Apparition as="p" delai={200} className="font-[family-name:var(--titres)] text-3xl italic tabular-nums">
              {porteOuverte.date} · {porteOuverte.heures}
            </Apparition>
            <ul className="max-w-xl space-y-3">
              {porteOuverte.regles.slice(0, 3).map((r, i) => (
                <Apparition as="li" key={r} delai={300 + i * 120} className="flex gap-4 border-b border-white/15 pb-3 text-lg">
                  <span aria-hidden="true" className="text-[var(--accent)]">—</span>
                  {r}
                </Apparition>
              ))}
            </ul>
            <Apparition delai={600}>
              <Bouton href={`${DOSSIER}/porte-ouverte`}>Tout savoir sur la soirée</Bouton>
            </Apparition>
          </div>
        </div>
      </section>

      {/* ---------- Questions ---------- */}
      <section id="questions" className="scroll-mt-24 mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 md:py-36 lg:grid-cols-[0.7fr_1.3fr]">
        <div className="space-y-6">
          <Apparition><Surtitre>Questions</Surtitre></Apparition>
          <TitreRevele
            texte="Avant *la porte.*"
            className="font-normal text-[clamp(2.8rem,5.5vw,5rem)] leading-[0.96] tracking-[-0.02em]"
            classeAccent="italic text-[var(--accent-texte)]"
          />
          <Apparition as="p" delai={150} className="text-[var(--doux)]">
            {cabinet.adresse}, {cabinet.ville} (exemple) · <span className="tabular-nums">{cabinet.telephone}</span>
          </Apparition>
          <Apparition delai={250}>
            <Link href={`${DOSSIER}/rendez-vous`} className="font-semibold text-[var(--accent-texte)] underline underline-offset-4">Prendre rendez-vous →</Link>
          </Apparition>
        </div>
        <Apparition delai={150}>
          <Accordeon questions={questions.map((q) => ({ question: q.q, reponse: q.r }))} />
        </Apparition>
      </section>

      <AppelFinal />
    </main>
  );
}
