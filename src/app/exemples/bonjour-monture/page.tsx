import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { ATELIER, DOSSIER, EQUIPE, ETAPES, FAQ, VISAGES, entreprise, photos } from "./_composants/donnees";
import TroisQuestions from "./_composants/TroisQuestions";
import Plateau from "./_composants/Plateau";
import { Faq, FormeVisage, Surtitre } from "./_composants/Blocs";

// Le site imaginé dans la vidéo « Si je devais remplir l'agenda d'un opticien » :
// pas un créneau de quinze minutes, un plateau de douze montures préparé au prénom
// du client, après trois questions. Puis une page par vraie question (« quelle
// monture pour un visage rond »). Aucun mot sur la vue ni sur le remboursement.
export const metadata: Metadata = {
  title: "Bonjour Monture — site de démonstration",
  description: "Site de démonstration d'un opticien imaginaire, réalisé par Canevas Havane : trois questions avant l'essayage, et douze montures qui t'attendent sur un plateau à ton prénom.",
  ...adressesDeLaPage("/exemples/bonjour-monture"),
};

export default function BonjourMonture() {
  return (
    <main>
      {/* 1. Ouverture */}
      <section className="mx-auto max-w-6xl px-5 pt-10 sm:pt-16">
        <div className="grid gap-6 lg:grid-cols-[1fr_2.4fr] lg:gap-12">
          <p className="text-[11px] font-bold uppercase leading-relaxed tracking-[0.2em] text-[var(--doux)] lg:pt-4">
            Opticien · {entreprise.ville}
            <br />
            Essayages préparés, sur rendez-vous
          </p>
          <div className="space-y-7">
            <h1 className="text-[2.9rem] sm:text-7xl lg:text-[5.6rem]">
              <span className="line-through decoration-[var(--accent)] decoration-[3px]">Pas un rendez-vous.</span>
              <br />
              Un plateau, à ton <em className="text-[var(--accent-texte)]">prénom.</em>
            </h1>
            <p className="max-w-xl text-lg leading-relaxed">
              Avant de venir, trois questions. Quand tu arrives, douze montures de la boutique
              t&apos;attendent, choisies pour toi, avec ton prénom posé devant.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="#questions" className="inline-flex min-h-13 items-center justify-center rounded-full bg-[var(--accent)] px-7 text-base font-bold text-[var(--sur-accent)]">
                Répondre aux trois questions
              </Link>
              <Link href={`${DOSSIER}/visages/rond`} className="inline-flex min-h-13 items-center justify-center rounded-full border border-[var(--encre)] px-7 text-base font-bold">
                Quelle monture pour mon visage&nbsp;?
              </Link>
            </div>
          </div>
        </div>
        <figure className="mt-12 sm:mt-16">
          <Image
            src={photos.verte.src}
            width={photos.verte.largeur}
            height={photos.verte.hauteur}
            alt={photos.verte.alt}
            sizes="(min-width: 1152px) 1112px, 100vw"
            priority
            className="aspect-[4/3] sm:aspect-[21/9] w-full rounded-[4px] object-cover"
          />
          <figcaption className="mt-3 grid grid-cols-3 gap-3 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--doux)]">
            <span>12 montures</span>
            <span className="text-center">45 minutes</span>
            <span className="text-right">1 prénom</span>
          </figcaption>
        </figure>
      </section>

      {/* 2. Le constat */}
      <section className="mt-20 bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:py-24 md:grid-cols-2">
          <div className="space-y-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#B9C6CB]">D&apos;habitude</p>
            <p className="font-[family-name:var(--titres)] text-4xl sm:text-5xl leading-[1.08]">
              Vingt paires essayées au hasard. Et à la fin : <em>« je vais réfléchir ».</em>
            </p>
            <p className="leading-relaxed text-[#D5DDE0]">Un mur de montures, un créneau de quinze minutes, et personne qui sait ce que tu cherches.</p>
          </div>
          <div className="space-y-4 border-t border-[#3C4B52] pt-10 md:border-t-0 md:border-l md:pl-12 md:pt-0">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#B9C6CB]">Ici</p>
            <p className="font-[family-name:var(--titres)] text-4xl sm:text-5xl leading-[1.08]">
              Douze, choisies avant que tu arrives. Et à la fin : <em>« celles-là ».</em>
            </p>
            <p className="leading-relaxed text-[#D5DDE0]">On a lu tes trois réponses la veille. Le plateau t&apos;attend sur la table du fond.</p>
          </div>
        </div>
      </section>

      {/* 3. Les trois questions */}
      <section id="questions" className="scroll-mt-16 mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:py-24 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div className="space-y-5">
          <Surtitre>Avant ton essayage</Surtitre>
          <h2 className="text-5xl sm:text-6xl">
            Trois <em className="text-[var(--accent-texte)]">questions.</em>
          </h2>
          <p className="max-w-md text-lg leading-relaxed text-[var(--doux)] max-lg:hidden">
            Pas de formulaire de dix champs : quand tu les portes, si on doit les remarquer, et ta
            couleur. Le reste se voit en essayant.
          </p>
        </div>
        <TroisQuestions />
      </section>

      {/* 4. Le plateau */}
      <section className="border-y border-[var(--trait)] bg-[#EFE6DA]">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="space-y-5">
            <Surtitre>Le jour de l&apos;essayage</Surtitre>
            <h2 className="text-5xl sm:text-6xl">
              Douze montures <em className="text-[var(--accent-texte)]">t&apos;attendent.</em>
            </h2>
            <p className="text-lg leading-relaxed">
              Choisies pour toi parmi celles de la boutique, rangées sur un plateau de bois, ton
              prénom devant. Pas deux cents : douze. On compare, on écarte, on garde celles qui te
              ressemblent.
            </p>
          </div>
          <Plateau />
        </div>
      </section>

      {/* 5. Comment ça se passe */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:py-24 space-y-12">
        <div className="max-w-2xl space-y-4">
          <Surtitre>Comment ça se passe</Surtitre>
          <h2 className="text-5xl sm:text-6xl">Quatre temps, <em className="text-[var(--accent-texte)]">pas un de plus.</em></h2>
        </div>
        <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {ETAPES.map((e, i) => (
            <li key={e.titre} className="space-y-3 border-t-2 border-[var(--encre)] pt-5">
              <p className="flex items-baseline justify-between text-xs font-bold uppercase tracking-[0.16em]">
                <span className="tabular-nums text-[var(--accent-texte)]">0{i + 1}</span>
                <span className="text-[var(--doux)]">{e.duree}</span>
              </p>
              <h3 className="text-3xl">{e.titre}</h3>
              <p className="leading-relaxed text-[var(--doux)]">{e.texte}</p>
            </li>
          ))}
        </ol>
        <Link href={`${DOSSIER}/essayage`} className="inline-flex min-h-13 items-center justify-center rounded-full bg-[var(--accent)] px-7 text-base font-bold text-[var(--sur-accent)]">
          Réserver mon essayage
        </Link>
      </section>

      {/* 6. Une page par vraie question */}
      <section className="bg-[var(--carte)] border-y border-[var(--trait)]">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:py-24 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div className="space-y-10">
            <div className="space-y-4">
              <Surtitre>Une page par vraie question</Surtitre>
              <h2 className="text-5xl sm:text-6xl">Quelle monture pour <em className="text-[var(--accent-texte)]">ton visage&nbsp;?</em></h2>
              <p className="max-w-xl text-lg leading-relaxed text-[var(--doux)]">
                C&apos;est ce que tout le monde tape avant de pousser la porte. Pour chaque forme, les
                montures de la boutique qui lui vont, et pourquoi.
              </p>
            </div>
            <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
              {VISAGES.map((v) => (
                <li key={v.slug}>
                  <Link href={`${DOSSIER}/visages/${v.slug}`} className="group flex items-center gap-5 py-5">
                    <FormeVisage forme={v.slug} className="h-14 w-11 shrink-0" />
                    <span className="flex-1">
                      <span className="block font-[family-name:var(--titres)] text-2xl sm:text-3xl">{v.recherche}</span>
                      <span className="block text-sm text-[var(--doux)]">{v.idee}</span>
                    </span>
                    <span aria-hidden="true" className="text-2xl transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <Image
            src={photos.ronde.src}
            width={photos.ronde.largeur}
            height={photos.ronde.hauteur}
            alt={photos.ronde.alt}
            sizes="(min-width: 1024px) 420px, 100vw"
            className="aspect-[4/5] w-full rounded-[4px] object-cover"
          />
        </div>
      </section>

      {/* 7. L'atelier */}
      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:py-24 lg:grid-cols-2 lg:items-center">
        <Image
          src={photos.ecaille.src}
          width={photos.ecaille.largeur}
          height={photos.ecaille.hauteur}
          alt={photos.ecaille.alt}
          sizes="(min-width: 1024px) 540px, 100vw"
          className="aspect-[3/2] w-full rounded-[4px] object-cover"
        />
        <div className="space-y-8">
          <div className="space-y-4">
            <Surtitre>L&apos;atelier, au fond</Surtitre>
            <h2 className="text-5xl sm:text-6xl">Et après, <em className="text-[var(--accent-texte)]">on s&apos;en occupe.</em></h2>
          </div>
          <ul className="space-y-5">
            {ATELIER.map((a) => (
              <li key={a.titre} className="grid gap-1 sm:grid-cols-[10rem_1fr] sm:gap-6">
                <h3 className="text-2xl">{a.titre}</h3>
                <p className="leading-relaxed text-[var(--doux)]">{a.texte}</p>
              </li>
            ))}
          </ul>
          <p className="rounded-xl border border-[var(--trait)] bg-[var(--carte)] px-5 py-4 text-sm font-semibold">
            Un devis détaillé t&apos;est remis gratuitement, avant tout achat.
          </p>
        </div>
      </section>

      {/* 8. L'équipe */}
      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto max-w-6xl space-y-12 px-5 py-16 sm:py-24">
          <div className="max-w-2xl space-y-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#B9C6CB]">L&apos;équipe</p>
            <h2 className="text-5xl sm:text-6xl">Trois prénoms, <em>un plateau.</em></h2>
          </div>
          <ul className="grid gap-10 md:grid-cols-3">
            {EQUIPE.map((p) => (
              <li key={p.prenom} className="space-y-4 border-t border-[#3C4B52] pt-6">
                <span aria-hidden="true" className="grid h-16 w-16 place-items-center rounded-full border border-[#B9C6CB] font-[family-name:var(--titres)] text-2xl italic">{p.initiales}</span>
                <h3 className="text-3xl">{p.prenom}</h3>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#B9C6CB]">{p.role}</p>
                <p className="leading-relaxed text-[#D5DDE0]">« {p.phrase} »</p>
              </li>
            ))}
          </ul>
          <p className="text-sm text-[#B9C6CB]">Prénoms d&apos;exemple : l&apos;entreprise est fictive.</p>
        </div>
      </section>

      {/* 9. Questions */}
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:py-24 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-4">
          <Surtitre>Questions</Surtitre>
          <h2 className="text-5xl sm:text-6xl">Avant de <em className="text-[var(--accent-texte)]">venir.</em></h2>
        </div>
        <Faq questions={FAQ} />
      </section>

      {/* 10. Venir */}
      <section className="border-t border-[var(--trait)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:py-24 md:grid-cols-[1.3fr_1fr] md:items-end">
          <div className="space-y-6">
            <h2 className="text-5xl sm:text-7xl">
              À samedi, <em className="text-[var(--accent-texte)]">Camille&nbsp;?</em>
            </h2>
            <p className="max-w-lg text-lg leading-relaxed">
              Trois questions, un créneau, et ton plateau se prépare. Tu peux aussi passer sans
              rendez-vous pour un ajustage.
            </p>
            <Link href={`${DOSSIER}/essayage`} className="inline-flex min-h-13 items-center justify-center rounded-full bg-[var(--accent)] px-7 text-base font-bold text-[var(--sur-accent)]">
              Réserver mon essayage
            </Link>
          </div>
          <dl className="grid gap-5 text-sm">
            <div>
              <dt className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--accent-texte)]">Adresse</dt>
              <dd className="mt-1 text-base">{entreprise.adresse}, {entreprise.ville}</dd>
            </div>
            <div>
              <dt className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--accent-texte)]">Téléphone</dt>
              <dd className="mt-1 text-base"><a href={`tel:${entreprise.telephoneLien}`} className="font-semibold underline underline-offset-4">{entreprise.telephone}</a></dd>
            </div>
            <div>
              <dt className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--accent-texte)]">Horaires</dt>
              <dd className="mt-1 text-base">{entreprise.horaires.map((h) => `${h.jours} : ${h.heures}`).join(" · ")}</dd>
            </div>
          </dl>
        </div>
      </section>
    </main>
  );
}
