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
import { AppelFinal, Bouton, CarteOccasion, Pastille } from "./_composants/Blocs";
import Course from "./_composants/Course";
import Depuis from "./_composants/Depuis";
import Quartier from "./_composants/Quartier";
import Velo from "./_composants/Velo";
import { COURSE, DEROULE, DOSSIER, EQUIPE, IMAGES, OCCASIONS, QUESTIONS, VELOS } from "./_composants/donnees";

// L'accueil de Tour du Quartier : la marque de la vidéo « Créer une marque » (on commence
// par là, une question d'abord, la première heure sur le parking, la course de lenteur)
// et les idées de « Remplir l'agenda » (le trajet de lundi matin, l'essai sur ton vrai
// trajet, l'occasion à la batterie testée). Premier écran plein cadre : une photo qui
// respire, le titre en bas, sur le vert du parc.
export const metadata: Metadata = {
  title: "Tour du Quartier — magasin de vélos, site de démonstration",
  description:
    "Le site d'un magasin de vélos imaginaire : t'as pas pédalé depuis combien de temps ? On commence sur le parking. Puis le trajet de lundi matin, l'essai sur ton vrai trajet et l'occasion à la batterie testée.",
  ...adressesDeLaPage("/exemples/tour-du-quartier"),
};

const PHOTOS_DEROULE = [IMAGES.atelier, IMAGES.arbre, IMAGES.parking, IMAGES.rue];

export default function TourDuQuartier() {
  return (
    <main>
      {/* ---------- 1. Premier écran : on commence par là ---------- */}
      <section className="kit-grain relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <PhotoCinema src={IMAGES.mur.src} alt="" priority origine="35% 60%" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(31,74,54,0.25)_0%,rgba(31,74,54,0)_28%,rgba(31,74,54,0.86)_66%,rgba(31,74,54,0.98)_100%)]" />
        <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end gap-7 px-5 pb-10 pt-36 sm:px-8 md:pb-14">
          <Apparition className="flex flex-wrap gap-2">
            {["Pour ceux qui s'y remettent", "Dimanche matin : premières heures", "Pas de catalogue"].map((p) => (
              <span key={p} className="rounded-full bg-[color-mix(in_oklab,var(--sombre)_86%,transparent)] px-4 py-2 text-[14px] font-semibold ring-1 ring-white/25 backdrop-blur-md">
                {p}
              </span>
            ))}
          </Apparition>
          <TitreRevele
            as="h1"
            auChargement
            texte="On commence *par là.*"
            className="max-w-6xl font-[family-name:var(--titres)] text-[clamp(2.8rem,10.5vw,8.4rem)] font-bold leading-[0.92] tracking-[-0.055em]"
            classeAccent="text-[#F2C14E]"
          />
          <div className="grid gap-8 border-t border-white/25 pt-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <TitreRevele
              as="p"
              auChargement
              delai={350}
              texte="Pour ceux qui n'ont pas fait de vélo depuis quinze ans. *Et pour le trajet de lundi matin.*"
              className="max-w-2xl text-[clamp(1.35rem,2.3vw,1.9rem)] font-semibold leading-[1.25]"
              classeAccent="text-[#F2C14E]"
            />
            <Apparition delai={650} className="flex flex-wrap gap-3 lg:justify-end">
              <Bouton href={`${DOSSIER}#depuis`}>Depuis combien ?</Bouton>
              <Bouton href={`${DOSSIER}/lundi-matin`} variante="contour">Mon trajet de lundi</Bouton>
            </Apparition>
          </div>
        </div>
      </section>

      {/* ---------- 2. Le bandeau ---------- */}
      <div className="bg-[#F2C14E] py-4 text-[#1F3A2C]">
        <Defilant
          duree={42}
          separateur="●"
          elements={["Pas de cuissard", "Pas de chrono", "Une heure, avec Paul", "Vélo et casque prêtés", "Le dernier arrivé gagne", "L'essai sur ton vrai trajet", "Lundi, 8 h 30"]}
          classeElement="font-[family-name:var(--titres)] text-lg md:text-2xl font-bold tracking-[-0.02em] whitespace-nowrap"
        />
      </div>

      {/* ---------- 3. D'abord, une question ---------- */}
      <section id="depuis" className="scroll-mt-20 bg-[#FCEFD3]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div className="space-y-7">
            <Apparition><Pastille>Pas de catalogue</Pastille></Apparition>
            <h2 data-film="question" className="font-[family-name:var(--titres)] text-[clamp(2.3rem,5.4vw,4.6rem)] font-bold leading-[0.98] tracking-[-0.045em]">
              T&apos;as pas pédalé depuis combien de temps&nbsp;?
            </h2>
            <Apparition as="p" delai={150} className="max-w-md text-xl leading-relaxed text-[var(--doux)]">
              D&apos;abord une question. Glisse, et on te dit par où on commence — et avec qui.
            </Apparition>
            <Apparition de="zoom" delai={250} className="hidden lg:block">
              <Quartier className="h-auto w-full max-w-[420px]" />
            </Apparition>
          </div>
          <Depuis />
        </div>
      </section>

      {/* ---------- 4. La première heure, en récit ---------- */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-36">
        <div className="mb-10 grid gap-6 md:mb-4 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div className="space-y-6">
            <Apparition><Pastille>La première heure · offerte</Pastille></Apparition>
            <TitreRevele
              texte="Une heure, *avec Paul.*"
              className="font-[family-name:var(--titres)] text-[clamp(2.6rem,6vw,5.4rem)] font-bold leading-[0.95] tracking-[-0.05em]"
              classeAccent="text-[var(--accent-texte)]"
            />
          </div>
          <Apparition as="p" delai={150} className="text-xl leading-relaxed text-[var(--doux)]">
            Sur le parking du magasin, sans voiture et sans public. Vélo et casque prêtés, sans
            obligation d&apos;achat.
          </Apparition>
        </div>
        <RecitColle
          className="[&_h3]:font-bold [&_h3]:tracking-[-0.04em]"
          etapes={DEROULE.map((d, i) => ({
            surtitre: `Étape ${i + 1}`,
            titre: d.titre,
            texte: <p>{d.texte}</p>,
            visuel: <Image src={PHOTOS_DEROULE[i].src} alt={PHOTOS_DEROULE[i].alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />,
          }))}
        />
        <Apparition className="mt-6">
          <Bouton href={`${DOSSIER}/premiere-heure`} variante="vert">Réserver ma première heure</Bouton>
        </Apparition>
      </section>

      {/* ---------- 5. La course de lenteur : la bande sombre ---------- */}
      <section className="px-3 sm:px-5">
        <div className="kit-grain relative overflow-hidden rounded-[40px] bg-[var(--sombre)] text-[var(--sur-sombre)]">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:px-10 md:py-28 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="space-y-6">
              <Apparition><Pastille clair>Le premier dimanche · {COURSE.lieu}</Pastille></Apparition>
              <TitreRevele
                texte="Le dernier arrivé *gagne.*"
                className="font-[family-name:var(--titres)] text-[clamp(2.6rem,6vw,5.4rem)] font-bold leading-[0.95] tracking-[-0.05em]"
                classeAccent="text-[#F2C14E]"
              />
              <Apparition as="p" delai={150} className="max-w-md text-xl leading-relaxed">
                La course de lenteur : vingt mètres, le plus lentement possible. Pied à terre, on
                recommence. Rien à gagner. {COURSE.date}, {COURSE.heure}.
              </Apparition>
              <Apparition delai={250}>
                <Bouton href={`${DOSSIER}/course-de-lenteur`}>M&apos;inscrire, lentement</Bouton>
              </Apparition>
            </div>
            <Apparition de="zoom" delai={150}>
              <Course />
            </Apparition>
          </div>
        </div>
      </section>

      {/* ---------- 6. Pas de catalogue : trois vélos, trois prénoms ---------- */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-36">
        <div className="mb-14 grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <TitreRevele
            texte="Pas cinq cents vélos. *Trois.*"
            className="font-[family-name:var(--titres)] text-[clamp(2.6rem,6vw,5.4rem)] font-bold leading-[0.95] tracking-[-0.05em]"
            classeAccent="text-[var(--accent-texte)]"
          />
          <Apparition as="p" delai={150} className="text-xl leading-relaxed text-[var(--doux)]">
            Ceux qu&apos;on prête pour la première heure, et qu&apos;on vend à ceux qui y retournent. Prix
            TTC d&apos;exemple, aucune marque.
          </Apparition>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {VELOS.map((v, i) => (
            <Apparition key={v.nom} delai={i * 120} de="zoom">
              <CarteLueur className="h-full rounded-[36px] bg-[var(--carte)] shadow-[0_24px_50px_-34px_rgba(31,58,44,0.6)]">
                <div className="flex h-full flex-col gap-6 p-7">
                  <div className="grid h-40 place-items-center rounded-[28px] bg-[#E3EFD9]">
                    <Velo couleur={["#2E6B4F", "#C2412A", "#C9962E"][i]} batterie={i === 1} roues="#1F3A2C" className="h-28 w-auto" titre={`Dessin : ${v.nom.toLowerCase()}`} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-[family-name:var(--titres)] text-2xl font-bold tracking-[-0.03em]">{v.nom}</h3>
                    <p className="leading-relaxed text-[var(--doux)]">{v.texte}</p>
                  </div>
                  <p className="mt-auto font-[family-name:var(--titres)] text-lg font-semibold">{v.prix} <span className="font-[family-name:var(--texte)] text-sm font-normal text-[var(--doux)]">TTC · exemple</span></p>
                </div>
              </CarteLueur>
            </Apparition>
          ))}
          <Apparition de="zoom" delai={100} className="md:col-span-2">
            <div className="relative h-[340px] overflow-hidden rounded-[36px] bg-[var(--sombre)]">
              <PhotoCinema src={IMAGES.piste.src} alt={IMAGES.piste.alt} sizes="(min-width: 768px) 66vw, 100vw" origine="50% 70%" />
            </div>
          </Apparition>
          <Apparition de="zoom" delai={200}>
            <div className="flex h-full flex-col justify-between gap-6 rounded-[36px] bg-[#C2412A] p-7 text-[var(--sur-sombre)]">
              <p className="font-[family-name:var(--titres)] text-2xl font-bold tracking-[-0.03em]">Ceux qui t&apos;attendent</p>
              <ul className="space-y-3">
                {EQUIPE.map((e) => (
                  <li key={e.prenom} className="flex items-center gap-3">
                    <span aria-hidden="true" className="h-3 w-3 shrink-0 rounded-full" style={{ background: e.couleur }} />
                    <span><span className="font-bold">{e.prenom}</span> · {e.role}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Apparition>
        </div>
      </section>

      {/* ---------- 7. Le trajet de lundi matin ---------- */}
      <section className="px-3 sm:px-5">
        <div className="relative overflow-hidden rounded-[40px] bg-[#F2C14E] text-[#1F3A2C]">
          <div aria-hidden="true" className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#FCEFD3]/40" />
          <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:px-10 md:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-6">
              <Apparition>
                <p className="font-semibold">Et le jour où tu y retournes pour de bon</p>
              </Apparition>
              <TitreRevele
                texte="Le trajet de lundi matin."
                className="font-[family-name:var(--titres)] text-[clamp(2.6rem,6vw,5.4rem)] font-bold leading-[0.95] tracking-[-0.05em]"
              />
              <Apparition as="p" delai={150} className="max-w-md text-xl leading-relaxed">
                Pas de fiche technique à rallonge. Une question : ton trajet, c&apos;est combien ? Et
                l&apos;essai se réserve en ligne, sur ton vrai trajet, un samedi matin.
              </Apparition>
              <Apparition delai={250}>
                <Bouton href={`${DOSSIER}/lundi-matin`} variante="vert">Ton trajet, c&apos;est combien ?</Bouton>
              </Apparition>
            </div>
            <Apparition de="droite" delai={150}>
              <div className="rotate-[1.5deg] overflow-hidden rounded-[32px] bg-[var(--sombre)] text-[var(--sur-sombre)] shadow-[0_40px_80px_-35px_rgba(31,58,44,0.8)]">
                <div className="space-y-2 p-6">
                  <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#C3D9C9]">Aller simple · une côte</p>
                  <p className="font-[family-name:var(--titres)] text-5xl font-bold tabular-nums text-[#F2C14E]">12 km</p>
                </div>
                <div className="flex items-center gap-4 bg-[#F2C14E] p-5 text-[#1F3A2C]">
                  <Velo couleur="#1F3A2C" roues="#1F3A2C" className="h-14 w-24 shrink-0" />
                  <div>
                    <p className="text-[12px] font-bold uppercase tracking-[0.12em]">Pour toi</p>
                    <p className="font-[family-name:var(--titres)] text-xl font-bold leading-tight">Vélo électrique de ville</p>
                  </div>
                </div>
                <p className="p-5 text-[15px]">≈ 40 min · batterie de 500 Wh · estimation, à essayer sur ton vrai trajet</p>
              </div>
            </Apparition>
          </div>
        </div>
      </section>

      {/* ---------- 8. L'occasion ---------- */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-36">
        <div className="mb-12 grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div className="space-y-6">
            <Apparition><Pastille>L&apos;occasion · révisée à l&apos;atelier</Pastille></Apparition>
            <TitreRevele
              texte="Chaque vélo d'occasion *a sa fiche.*"
              className="font-[family-name:var(--titres)] text-[clamp(2.4rem,5.4vw,4.8rem)] font-bold leading-[0.95] tracking-[-0.05em]"
              classeAccent="text-[var(--accent-texte)]"
            />
          </div>
          <Apparition as="p" delai={150} className="text-xl leading-relaxed text-[var(--doux)]">
            La batterie testée, le résultat affiché. Et son marquage, comme la loi l&apos;impose.
          </Apparition>
        </div>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {OCCASIONS.map((o, i) => (
            <Apparition as="li" key={o.id} delai={i * 100} de="zoom">
              <CarteOccasion o={o} />
            </Apparition>
          ))}
        </ul>
      </section>

      {/* ---------- 9. Questions ---------- */}
      <section id="questions" className="scroll-mt-24 border-t border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="space-y-6">
            <Apparition><Pastille>Avant de venir</Pastille></Apparition>
            <TitreRevele
              texte="Ce qu'on nous *demande.*"
              className="font-[family-name:var(--titres)] text-[clamp(2.4rem,4.6vw,4rem)] font-bold leading-[0.95] tracking-[-0.05em]"
              classeAccent="text-[var(--accent-texte)]"
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
