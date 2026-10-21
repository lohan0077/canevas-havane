import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, ENVOI, atelier, engagements, etapes, ouvertures, photos, pieces, questions } from "./_composants/donnees";
import Tour from "./_composants/Tour";
import Fournee from "./_composants/Fournee";
import Four from "./_composants/Four";
import Faq from "./_composants/Faq";

// Le site imaginé dans la vidéo « Si je devais remplir le carnet de commandes d'un
// céramiste » : on ne vend pas un bol, on vend les mains qui l'ont fait. Chaque
// pièce a sa page et la vidéo de son tournage, le four s'ouvre en direct une fois
// par mois, et chaque numéro n'existe qu'une fois. Ouverture inspirée du modèle
// « Kairo Studio » de MotionSites (de très grands italiques coupés par l'objet,
// une barre fine en capitales), transposée à un atelier de céramique.
export const metadata: Metadata = {
  title: "Sortie de Four — site de démonstration",
  description: "Site de démonstration d'un atelier de céramique imaginaire, réalisé par Canevas Havane : chaque pièce a sa page et la vidéo de son tournage, et le four s'ouvre en direct une fois par mois.",
  ...adressesDeLaPage("/exemples/sortie-de-four"),
};

const enLigne = pieces.filter((p) => !p.partie).length;

export default function SortieDeFour() {
  return (
    <div>
      {/* 1. L'ouverture : la phrase coupée par la pièce qui naît. */}
      <section className="relative overflow-hidden px-4 pb-16 pt-8 sm:px-6 sm:pt-12">
        <div className="mx-auto max-w-6xl">
          <p className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--trait)] pb-3 text-[11px] font-bold uppercase tracking-[0.2em]">
            <span>Céramiques tournées à la main</span>
            <span>Fournée du {ouvertures.derniere.court} · {enLigne} pièces en ligne</span>
          </p>
          <h1 className="mt-8 text-center font-normal">
            <span className="block text-[54px] leading-[0.95] sm:text-[104px]">Celui que</span>
            <span className="block text-[54px] italic leading-[0.95] sm:text-[104px]">tu as vu</span>
          </h1>
          <div className="relative mx-auto mt-6 w-[86%] max-w-xl">
            <div className="overflow-hidden rounded-t-[999px] rounded-b-[28px] border border-[var(--trait)]">
              <Image
                src={photos.tournage.src}
                width={photos.tournage.largeur}
                height={photos.tournage.hauteur}
                alt={photos.tournage.alt}
                sizes="(min-width: 640px) 576px, 86vw"
                priority
                className="aspect-[4/5] w-full object-cover sm:aspect-[5/4]"
              />
            </div>
            <span className="absolute -right-3 top-6 rotate-6 rounded-full bg-[var(--accent)] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[var(--sur-accent)]">
              Pièce unique
            </span>
          </div>
          <p className="-mt-2 text-center font-[family-name:var(--titres)] text-[96px] italic leading-[0.9] text-[var(--accent-texte)] sm:-mt-6 sm:text-[168px]">
            naître.
          </p>
          <div className="mx-auto mt-6 max-w-xl space-y-6 text-center">
            <p className="text-lg leading-relaxed">
              Des bols, des tasses, des vases, tournés un par un. Chaque pièce a sa page, et sur
              sa page, les vingt secondes où elle est née sur le tour.
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Link href={`${DOSSIER}/fournee`} className="rounded-full bg-[var(--accent)] px-7 py-4 text-center text-lg font-bold text-[var(--sur-accent)]">
                Voir la fournée
              </Link>
              <Link href={`${DOSSIER}/fournee/bol-112`} className="rounded-full border-2 border-[var(--encre)] px-7 py-3.5 text-center text-lg font-bold">
                Le bol n° 112
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Le parti pris. */}
      <section className="bg-[var(--sombre)] px-5 py-20 text-[var(--sur-sombre)] sm:px-6 sm:py-28">
        <div className="mx-auto max-w-4xl space-y-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em]">Ce qu&apos;on vend</p>
          <h2 className="text-5xl font-normal sm:text-7xl">
            Pas un bol. <span className="italic text-[#E39A6E]">Les mains qui l&apos;ont fait.</span>
          </h2>
          <p className="max-w-2xl text-lg leading-relaxed text-[#D9C3AE]">
            Un bol en grès, on en trouve à six euros. Celui-ci, tu l&apos;as vu monter sur le tour,
            tu sais quel jour il est né et qui l&apos;a tourné. Il n&apos;existe qu&apos;une fois.
          </p>
        </div>
      </section>

      {/* 3. Une page par pièce, et sa vidéo. */}
      <section id="tournage" className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <Tour date="3 octobre 2026" legende="Le tournage du bol n° 112. Ici, une animation : l'atelier est fictif, la vidéo serait celle de la pièce." />
        <div className="space-y-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--accent-texte)]">Une page par pièce</p>
          <h2 className="text-5xl font-normal">
            Vingt secondes <span className="italic">sur le tour.</span>
          </h2>
          <p className="text-lg leading-relaxed">
            On filme chaque tournage, du début à la fin. La vidéo est rangée avec le numéro de la
            pièce : sur sa page, tu regardes ton bol en train de naître. Pas un bol comme lui.
            Lui.
          </p>
          <Link href={`${DOSSIER}/fournee/bol-112`} className="inline-block font-semibold underline underline-offset-8 decoration-2 decoration-[var(--accent)]">
            La page du bol n° 112
          </Link>
        </div>
      </section>

      {/* 4. Les trois engagements. */}
      <section className="border-y border-[var(--trait)] bg-[var(--carte)]">
        <ol className="mx-auto grid max-w-6xl md:grid-cols-3">
          {engagements.map((e, i) => (
            <li key={e.titre} className={`space-y-3 px-5 py-10 sm:px-8 ${i ? "border-t border-[var(--trait)] md:border-l md:border-t-0" : ""}`}>
              <p className="font-[family-name:var(--titres)] text-5xl italic text-[var(--accent-texte)]">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="text-3xl font-normal">{e.titre}</h3>
              <p className="leading-relaxed text-[var(--doux)]">{e.texte}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* 5. La fournée. */}
      <section className="mx-auto max-w-6xl space-y-10 px-5 py-20 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="space-y-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--accent-texte)]">Sortie du four le {ouvertures.derniere.date}</p>
            <h2 className="text-5xl font-normal">
              La fournée <span className="italic">d&apos;octobre.</span>
            </h2>
          </div>
          <Link href={`${DOSSIER}/fournee`} className="font-semibold underline underline-offset-8 decoration-2 decoration-[var(--accent)]">
            Toute la fournée · {pieces.length} pièces
          </Link>
        </div>
        <Fournee limite={4} />
        <p className="text-sm text-[var(--doux)]">Pièces, prix et ventes d&apos;exemple : l&apos;atelier est fictif. Prix TTC.</p>
      </section>

      {/* 6. L'ouverture du four. */}
      <section id="four" className="bg-[var(--sombre)] px-5 py-20 text-[var(--sur-sombre)] sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full border border-[#F3EADF]/40 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em]">
              <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[#E5533D]" />
              En direct · une fois par mois
            </p>
            <h2 className="text-5xl font-normal sm:text-6xl">
              L&apos;ouverture <span className="italic text-[#E39A6E]">du four.</span>
            </h2>
            <p className="text-lg leading-relaxed text-[#D9C3AE]">
              Le troisième jeudi du mois, à 19 h, on ouvre le four devant la caméra. On sort les
              pièces une à une, on les montre, on dit lesquelles ont raté. Celles qui ont survécu
              sont en ligne le soir même.
            </p>
            <p className="font-[family-name:var(--titres)] text-3xl">
              Prochaine : {ouvertures.prochaine.date}, {ouvertures.prochaine.heure}.
            </p>
            <Link href={`${DOSSIER}/ouverture-du-four`} className="inline-block rounded-full bg-[var(--sur-sombre)] px-7 py-3.5 font-bold text-[var(--sombre)]">
              Le rendez-vous du mois
            </Link>
          </div>
          <Four />
        </div>
      </section>

      {/* 7. Acheter en ligne. */}
      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-6 lg:grid-cols-2 lg:items-center">
        <Image
          src={photos.etagere.src}
          width={photos.etagere.largeur}
          height={photos.etagere.hauteur}
          alt={photos.etagere.alt}
          sizes="(min-width: 1024px) 560px, 100vw"
          className="aspect-[4/3] w-full rounded-[28px] object-cover"
        />
        <div className="space-y-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--accent-texte)]">Sans passer à l&apos;atelier</p>
          <h2 className="text-5xl font-normal">
            Céramique artisanale, <span className="italic">en ligne.</span>
          </h2>
          <dl className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
            {[
              ["L'envoi", `${ENVOI.prix} TTC, exemple. Chaque pièce est ${ENVOI.delai}.`],
              ["L'emballage", "Papier froissé, carton double, rien en plastique. Si elle arrive cassée, une photo suffit : on te rembourse."],
              ["Le retour", "Quatorze jours après la réception pour changer d'avis, comme pour tout achat à distance."],
              ["L'atelier", "Ouvert le samedi matin. Mais tout ce qui est en vente est ici."],
            ].map(([t, d]) => (
              <div key={t} className="grid gap-1 py-4 sm:grid-cols-[9rem_1fr] sm:gap-6">
                <dt className="font-bold">{t}</dt>
                <dd className="text-[var(--doux)]">{d}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 8. La méthode. */}
      <section className="bg-[var(--carte)] px-5 py-20 sm:px-6">
        <div className="mx-auto max-w-6xl space-y-12">
          <div className="max-w-2xl space-y-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--accent-texte)]">Comment naît une pièce</p>
            <h2 className="text-5xl font-normal">
              Six étapes, <span className="italic">un mois.</span>
            </h2>
          </div>
          <ol className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {etapes.map((e, i) => (
              <li key={e.titre} className="space-y-3 border-t-2 border-[var(--encre)] pt-5">
                <p className="flex items-baseline justify-between text-sm font-bold uppercase tracking-[0.14em]">
                  <span>Étape {i + 1}</span>
                  <span className="text-[var(--doux)]">{e.duree}</span>
                </p>
                <h3 className="text-3xl font-normal">{e.titre}</h3>
                <p className="leading-relaxed text-[var(--doux)]">{e.texte}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 9. Les questions. */}
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--accent-texte)]">Questions</p>
          <h2 className="text-5xl font-normal">
            Avant de <span className="italic">l&apos;adopter.</span>
          </h2>
        </div>
        <Faq questions={questions} />
      </section>

      {/* 10. L'atelier. */}
      <section className="px-5 pb-20 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-8 rounded-[32px] bg-[var(--accent)] px-6 py-12 text-[var(--sur-accent)] sm:px-12 md:grid-cols-[1.3fr_1fr] md:items-end">
          <div className="space-y-4">
            <h2 className="text-5xl font-normal sm:text-6xl">
              La prochaine sort <span className="italic">le {ouvertures.prochaine.court}</span>
            </h2>
            <p className="text-lg">
              Pour une question sur une pièce, l&apos;atelier répond au téléphone le samedi matin.
            </p>
          </div>
          <div className="space-y-2 md:text-right">
            <a href={`tel:${atelier.telephoneLien}`} className="block font-[family-name:var(--titres)] text-4xl underline underline-offset-8">
              {atelier.telephone}
            </a>
            <p>{atelier.adresse}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
