import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { COURS, DOSSIER, PLANNING, TARIFS, photos, questions, studio } from "./_composants/donnees";
import Question from "./_composants/Question";
import Faq from "./_composants/Faq";

// Le site imaginé dans la vidéo « Si je devais remplir l'agenda d'un studio de
// pilates » : l'accueil tient en une question, « Tu touches tes pieds ? », qui envoie
// au bon cours ; la visite du studio se regarde avant de venir ; la place se réserve
// sans appeler. Mise en page inspirée du modèle « Wellness Hero » de MotionSites
// (camaïeu doux, grand titre à empattements fins, navigation en pilule flottante,
// petites pastilles), transposée en vert sauge.
export const metadata: Metadata = {
  title: "Pas Souple — site de démonstration",
  description: "Site de démonstration d'un studio de pilates imaginaire, réalisé par Canevas Havane : une seule question, « Tu touches tes pieds ? », et le cours qui va avec.",
  ...adressesDeLaPage("/exemples/pas-souple"),
};

const PASTILLES = ["Petit groupe", "Tapis fourni", "Aucun niveau demandé"];

export default function PasSouple() {
  const premiers = PLANNING.flatMap((j) => j.cours.map((c) => ({ ...c, jour: j.jour }))).filter((c) => c.nom === "Premiers pas");
  return (
    <main>
      {/* 1. L'accueil : une seule question. */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 sm:pt-16 pb-16 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
        <Question />
        <div className="relative hidden lg:block aspect-[3/4] overflow-hidden rounded-[30px] bg-[var(--sombre)]">
          <Image src={photos.tapis.src} alt={photos.tapis.alt} fill priority sizes="420px" className="object-cover" />
        </div>
      </section>

      {/* 2. Le parti pris. */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <div className="relative sm:aspect-[16/8] rounded-[34px] overflow-hidden bg-[var(--carte)]">
          <div className="relative aspect-[3/2] sm:absolute sm:inset-0 sm:aspect-auto bg-[var(--sombre)]">
            <Image src={photos.pieds.src} alt={photos.pieds.alt} fill sizes="(min-width: 1152px) 1152px, 100vw" className="object-cover object-bottom" />
          </div>
          <div className="relative sm:absolute sm:left-6 sm:bottom-6 sm:max-w-lg sm:rounded-[26px] bg-[var(--carte)] p-6 space-y-3">
            <h2 className="text-4xl sm:text-5xl font-light tracking-[-0.02em]">Le droit d'être raide <span className="font-normal text-[var(--accent-texte)]">comme un piquet.</span></h2>
            <p className="text-[var(--doux)]">Pas de corps parfait en vitrine. Un studio pour ceux qui pensent que le pilates, ce n'est pas pour eux.</p>
          </div>
        </div>
        <ul className="mt-4 flex flex-wrap gap-2">
          {PASTILLES.map((p) => (
            <li key={p} className="rounded-full border border-[var(--trait)] bg-[var(--carte)] px-4 py-2 text-sm font-semibold">{p}</li>
          ))}
        </ul>
      </section>

      {/* 3. Les cours. */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20 space-y-10">
        <h2 className="text-5xl sm:text-6xl font-light tracking-[-0.02em] max-w-3xl">Trois cours, <span className="font-normal text-[var(--accent-texte)]">du tout premier au suivant.</span></h2>
        <ul className="grid gap-3 md:grid-cols-3">
          {COURS.map((c, i) => (
            <li key={c.nom} className={`rounded-[28px] p-6 space-y-3 ${i === 0 ? "bg-[var(--sombre)] text-[var(--sur-sombre)]" : "bg-[var(--carte)]"}`}>
              <p className={`text-sm font-semibold uppercase tracking-[0.16em] ${i === 0 ? "" : "text-[var(--accent-texte)]"}`}>{c.pour}</p>
              <h3 className="text-3xl">{c.nom}</h3>
              <p className={`leading-relaxed ${i === 0 ? "" : "text-[var(--doux)]"}`}>{c.texte}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* 4. La visite. */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20 grid gap-8 lg:grid-cols-2 lg:items-center">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[30px] bg-[var(--sombre)]">
          <Image src={photos.studio.src} alt={photos.studio.alt} fill sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" />
        </div>
        <div className="space-y-5">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent-texte)]">Avant de venir</p>
          <h2 className="text-5xl sm:text-6xl font-light tracking-[-0.02em]">Trente secondes pour <span className="font-normal text-[var(--accent-texte)]">ne plus avoir peur.</span></h2>
          <p className="text-lg leading-relaxed text-[var(--doux)]">
            L'entrée, le vestiaire, la prof qui te dit bonjour. Tu sais où tu mets les pieds
            avant d'y mettre les pieds.
          </p>
          <Link href={`${DOSSIER}/le-studio`} className="inline-flex rounded-full bg-[var(--accent)] px-6 py-3.5 font-semibold text-[var(--sur-accent)]">Faire la visite</Link>
        </div>
      </section>

      {/* 5. Les cours Premiers pas de la semaine. */}
      <section className="bg-[var(--carte)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 grid gap-10 lg:grid-cols-2">
          <div className="space-y-5">
            <h2 className="text-5xl sm:text-6xl font-light tracking-[-0.02em]">Le planning, <span className="font-normal text-[var(--accent-texte)]">en vrai.</span></h2>
            <p className="text-lg leading-relaxed text-[var(--doux)]">Pas de PDF à télécharger. Le planning de la semaine, sur le site, et ta place réservée sans appeler.</p>
            <Link href={`${DOSSIER}/planning`} className="inline-flex rounded-full border border-[var(--encre)] px-6 py-3 font-semibold">Tout le planning</Link>
          </div>
          <ul className="space-y-2">
            {premiers.map((c) => (
              <li key={c.jour + c.heure} className="flex items-center justify-between gap-4 rounded-[22px] bg-[var(--fond)] px-5 py-4">
                <span>
                  <span className="block font-[family-name:var(--titres)] text-2xl">{c.jour}, {c.heure}</span>
                  <span className="block text-[var(--doux)]">Premiers pas · avec {c.prof}</span>
                </span>
                <Link href={`${DOSSIER}/planning#jour-${c.jour.toLowerCase()}`} className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-[var(--sur-accent)]">Réserver</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 6. Les prix. */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 space-y-8">
        <h2 className="text-5xl sm:text-6xl font-light tracking-[-0.02em]">Les prix, <span className="font-normal text-[var(--accent-texte)]">sans détour.</span></h2>
        <ul className="grid gap-3 md:grid-cols-3">
          {TARIFS.map((t) => (
            <li key={t.nom} className="rounded-[28px] bg-[var(--carte)] p-6 space-y-2">
              <p className="font-[family-name:var(--titres)] text-4xl">{t.prix}</p>
              <p className="text-lg font-semibold">{t.nom}</p>
              <p className="text-[var(--doux)]">{t.detail}</p>
            </li>
          ))}
        </ul>
        <p className="text-sm text-[var(--doux)]">Prix TTC d'exemple : le studio est fictif.</p>
      </section>

      {/* 7. Les profs. */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20 grid gap-3 md:grid-cols-[1fr_1fr_1fr]">
        <h2 className="text-5xl font-light tracking-[-0.02em] md:pr-6">Deux profs, <span className="font-normal text-[var(--accent-texte)]">zéro jugement.</span></h2>
        {[{ p: "Jeanne", t: "Les cours Premiers pas du mardi et le pilates doux. Commence toujours par demander comment ça va." }, { p: "Malik", t: "Le pilates tapis et les cours du samedi matin. Montre chaque mouvement deux fois, la deuxième plus simple." }].map((x) => (
          <div key={x.p} className="rounded-[28px] bg-[var(--carte)] p-6 space-y-2">
            <p aria-hidden="true" className="grid h-14 w-14 place-items-center rounded-full bg-[var(--sombre)] font-[family-name:var(--titres)] text-2xl text-[var(--sur-sombre)]">{x.p[0]}</p>
            <h3 className="text-3xl">{x.p}</h3>
            <p className="leading-relaxed text-[var(--doux)]">{x.t}</p>
          </div>
        ))}
      </section>

      {/* 8. Questions. */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-20 space-y-8">
        <h2 className="text-5xl sm:text-6xl font-light tracking-[-0.02em]">Questions.</h2>
        <Faq questions={questions} />
      </section>

      {/* 9. Le dernier mot. */}
      <section className="px-4 sm:px-6">
        <div className="max-w-6xl mx-auto rounded-[34px] bg-[var(--sombre)] px-6 py-14 sm:p-16 text-[var(--sur-sombre)] space-y-6 text-center">
          <p className="font-[family-name:var(--titres)] text-5xl sm:text-7xl font-light tracking-[-0.02em]">Tu viens <span className="font-normal">mardi&nbsp;?</span></p>
          <p className="text-lg">Premiers pas, 19 h, 50 minutes. {studio.adresse} (adresse d'exemple).</p>
          <Link href={`${DOSSIER}/planning`} className="inline-flex rounded-full bg-[var(--sur-sombre)] px-7 py-4 text-lg font-semibold text-[var(--sombre)]">Réserver ma place</Link>
        </div>
      </section>
    </main>
  );
}
