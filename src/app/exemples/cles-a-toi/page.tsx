import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { CLES, DOSSIER, engagements, forfait, moniteurs, photos, questions } from "./_composants/donnees";
import Anneau from "./_composants/Anneau";
import PointDeDepart from "./_composants/PointDeDepart";
import Faq from "./_composants/Faq";

// Le site de la marque imaginée dans la vidéo « Si je devais créer une auto-école » :
// « Je passe te prendre », et un trousseau où chaque étape allume sa clé. Mise en
// page inspirée du modèle « Evergreen Finance » de MotionSites (grand titre centré,
// paysage aux cartes flottantes, rangée de cartes-photos), transposée à une
// auto-école et aux couleurs de la marque.
export const metadata: Metadata = {
  title: "Clés à Toi — site de démonstration",
  description: "Site de démonstration d'une auto-école imaginaire, réalisé par Canevas Havane : les leçons partent de chez toi, et un trousseau où chaque étape allume sa clé.",
  ...adressesDeLaPage("/exemples/cles-a-toi"),
};

const ETAPES_PHOTO = [
  { id: "sortie", photo: photos.sortie },
  { id: "nuit", photo: photos.nuit },
  { id: "autoroute", photo: photos.autoroute },
];

const COMMENT = [
  { titre: "L'évaluation", texte: "Une heure au volant, au départ de chez toi. On estime ensemble le nombre d'heures qu'il te faudra." },
  { titre: "Le contrat", texte: "Signé après l'évaluation, comme la loi le demande. Le nombre d'heures prévu y est écrit, le prix aussi, ligne par ligne." },
  { titre: "Les départs", texte: "Chaque leçon commence là où tu es : chez toi, au lycée, au travail. Tu choisis l'heure sur le site." },
  { titre: "Le trousseau", texte: "À chaque étape franchie, ton moniteur allume une clé. Tu vois où tu en es, sans demander." },
];

export default function ClesAToi() {
  return (
    <main>
      {/* 1. L'ouverture : la phrase, puis la route et ses cartes flottantes. */}
      <section className="px-4 sm:px-6 pt-10 sm:pt-16 pb-16">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <p className="inline-flex items-center gap-2 rounded-full border border-[var(--trait)] bg-[var(--carte)] px-4 py-1.5 font-[family-name:var(--titres)] text-sm font-semibold">
            Auto-école · Ta Ville
          </p>
          <h1 className="text-[56px] sm:text-8xl font-bold tracking-[-0.04em] leading-[0.95]">
            Je passe <span className="text-[var(--accent-texte)]">te prendre.</span>
          </h1>
          <p className="text-xl sm:text-2xl leading-relaxed max-w-xl mx-auto">
            Tes leçons partent de chez toi. Et sur le site, ton trousseau : une clé par
            étape, jusqu'à la dernière.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href={`${DOSSIER}/trousseau`} className="rounded-full bg-[var(--sombre)] text-[var(--sur-sombre)] px-7 py-3.5 font-[family-name:var(--titres)] text-lg font-semibold">
              Voir le trousseau
            </Link>
            <Link href={`${DOSSIER}/formules`} className="rounded-full border-2 border-[var(--encre)] px-7 py-3 font-[family-name:var(--titres)] text-lg font-semibold">
              Les formules
            </Link>
          </div>
        </div>

        <div className="relative max-w-6xl mx-auto mt-12 aspect-[4/5] sm:aspect-[16/8] rounded-[36px] overflow-hidden bg-[var(--sombre)]">
          <Image src={photos.foret.src} alt={photos.foret.alt} fill priority sizes="(min-width: 1152px) 1152px, 100vw" className="object-cover" />
          <div className="absolute left-3 right-3 bottom-3 sm:left-6 sm:bottom-6 sm:right-auto sm:w-[340px] rounded-[26px] bg-[var(--carte)] p-4 flex items-center gap-3 sm:block sm:space-y-1">
            <div className="w-[136px] shrink-0 sm:w-auto">
              <Anneau allumees={CLES.map((c) => c.id)} permis={false} />
            </div>
            <div className="space-y-1">
              <p className="font-[family-name:var(--titres)] text-sm font-bold">Le trousseau de Léa</p>
              <p className="font-[family-name:var(--titres)] text-2xl font-bold leading-none">4 clés sur 5</p>
              <p className="text-sm text-[var(--doux)]">Exemple. La dernière s'allume le jour du permis.</p>
            </div>
          </div>
          <div className="absolute top-3 right-3 sm:top-6 sm:right-6 rounded-[22px] bg-[var(--sombre)] text-[var(--sur-sombre)] px-5 py-4 max-w-[230px]">
            <p className="font-[family-name:var(--titres)] text-xs font-bold uppercase tracking-[0.14em] text-[var(--accent)]">Prochain départ</p>
            <p className="font-[family-name:var(--titres)] text-lg font-bold leading-snug">Devant le lycée, mercredi 17 h</p>
          </div>
        </div>
      </section>

      {/* 2. Je passe te prendre, en vrai. */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="space-y-5">
          <p className="font-[family-name:var(--titres)] text-sm font-bold uppercase tracking-[0.16em] text-[var(--accent-texte)]">La promesse, en vrai</p>
          <h2 className="text-5xl sm:text-6xl font-bold tracking-[-0.03em]">Pas de rendez-vous à l'école. On vient.</h2>
          <p className="text-xl leading-relaxed">
            Chaque leçon commence là où tu es, et se termine au même endroit. Tu choisis le
            point de départ et l'heure : c'est ton moniteur qui fait le trajet.
          </p>
        </div>
        <PointDeDepart />
      </section>

      {/* 3. Une clé par étape. */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 space-y-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <p className="font-[family-name:var(--titres)] text-sm font-bold uppercase tracking-[0.16em] text-[var(--accent-texte)]">Le trousseau</p>
            <h2 className="text-5xl sm:text-6xl font-bold tracking-[-0.03em]">Une clé par étape.</h2>
            <p className="text-xl leading-relaxed">Le code, la première sortie, la nuit, l'autoroute. Et la dernière : le permis.</p>
          </div>
          <Link href={`${DOSSIER}/trousseau`} className="rounded-full bg-[var(--accent)] text-[var(--sur-accent)] px-6 py-3 font-[family-name:var(--titres)] font-semibold">
            Ouvrir le trousseau
          </Link>
        </div>
        <ul className="grid grid-cols-2 lg:grid-cols-5 gap-3">
          <li className="rounded-[26px] bg-[var(--sombre)] text-[var(--sur-sombre)] p-5 flex flex-col justify-between min-h-[260px]">
            <svg viewBox="0 0 80 80" className="w-16 h-16" aria-hidden="true">
              <path d="M40 6 L74 70 H6 Z" fill="var(--sur-sombre)" stroke="var(--accent)" strokeWidth="5" strokeLinejoin="round" />
              <path d="M40 30 V50 M40 58 V60" stroke="var(--sombre)" strokeWidth="6" strokeLinecap="round" />
            </svg>
            <div>
              <p className="font-[family-name:var(--titres)] text-xs font-bold uppercase tracking-[0.14em] text-[var(--accent)]">Clé 1</p>
              <h3 className="text-2xl font-bold">{CLES[0].nom}</h3>
            </div>
          </li>
          {ETAPES_PHOTO.map((e, i) => {
            const cle = CLES.find((c) => c.id === e.id)!;
            return (
              <li key={e.id} className="relative rounded-[26px] overflow-hidden min-h-[260px] bg-[var(--sombre)]">
                <Image src={e.photo.src} alt={e.photo.alt} fill sizes="(min-width: 1024px) 220px, 50vw" className="object-cover" />
                <div className="absolute left-2 right-2 bottom-2 rounded-2xl bg-[var(--carte)] px-3.5 py-2.5">
                  <p className="font-[family-name:var(--titres)] text-xs font-bold uppercase tracking-[0.14em] text-[var(--accent-texte)]">Clé {i + 2}</p>
                  <h3 className="text-lg font-bold leading-tight">{cle.nom}</h3>
                </div>
              </li>
            );
          })}
          <li className="col-span-2 lg:col-span-1 rounded-[26px] border-2 border-dashed border-[var(--doux)] p-5 flex flex-col justify-between gap-6 lg:min-h-[260px]">
            <svg viewBox="0 0 80 80" className="w-16 h-16" aria-hidden="true">
              <circle cx="24" cy="40" r="17" fill="none" stroke="var(--doux)" strokeWidth="4" strokeDasharray="5 4" />
              <path d="M41 40 H74 M64 40 V50 M72 40 V47" stroke="var(--doux)" strokeWidth="4" strokeLinecap="round" strokeDasharray="5 4" />
            </svg>
            <div>
              <p className="font-[family-name:var(--titres)] text-xs font-bold uppercase tracking-[0.14em]">Clé 5 · la dernière</p>
              <h3 className="text-2xl font-bold">Le permis</h3>
              <p className="text-[var(--doux)]">Elle s'allume le jour où tu l'as.</p>
            </div>
          </li>
        </ul>
      </section>

      {/* 4. Ce qu'on vend. */}
      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <p className="font-[family-name:var(--titres)] text-5xl sm:text-7xl font-bold tracking-[-0.04em] leading-[0.98]">
            Ça ne vend pas des heures de conduite. <span className="text-[var(--accent)]">Ça vend les clés.</span>
          </p>
          <div className="relative aspect-[3/4] rounded-[30px] overflow-hidden bg-[var(--carte)]">
            <Image src={photos.cle.src} alt={photos.cle.alt} fill sizes="(min-width: 768px) 420px, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      {/* 5. Comment ça marche. */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 space-y-10">
        <h2 className="text-5xl sm:text-6xl font-bold tracking-[-0.03em] max-w-2xl">Du premier départ à la dernière clé.</h2>
        <ol className="grid gap-3 md:grid-cols-4">
          {COMMENT.map((c, i) => (
            <li key={c.titre} className="rounded-[26px] bg-[var(--carte)] border border-[var(--trait)] p-6 space-y-3">
              <span className="grid place-items-center w-11 h-11 rounded-full bg-[var(--accent)] text-[var(--sur-accent)] font-[family-name:var(--titres)] text-lg font-bold">{i + 1}</span>
              <h3 className="text-2xl font-bold">{c.titre}</h3>
              <p className="text-lg leading-relaxed">{c.texte}</p>
            </li>
          ))}
        </ol>
        <p className="text-[var(--doux)]">Code de la route, art. L213-2 : le contrat est conclu après une évaluation préalable du candidat.</p>
      </section>

      {/* 6. La formule. */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <div className="rounded-[36px] bg-[var(--accent)] text-[var(--sur-accent)] p-7 sm:p-12 grid gap-8 md:grid-cols-[1fr_1fr] md:items-end">
          <div className="space-y-4">
            <p className="font-[family-name:var(--titres)] text-sm font-bold uppercase tracking-[0.16em]">La formule · exemple</p>
            <p className="font-[family-name:var(--titres)] text-6xl sm:text-7xl font-bold tracking-[-0.04em] tabular-nums">{forfait.total.toLocaleString("fr-FR").replace(/\u202f|\u00a0/g, " ")}&nbsp;€<span className="text-2xl sm:text-3xl tracking-normal"> TTC</span></p>
            <p className="text-xl leading-relaxed">10 h de code, 20 h au volant, départs de chez toi compris. L'examen du code reste à ta charge.</p>
          </div>
          <div className="space-y-4">
            <ul className="space-y-2 text-lg">
              {forfait.inclus.map((x) => (
                <li key={x} className="flex gap-3"><span aria-hidden="true">✓</span>{x}</li>
              ))}
            </ul>
            <Link href={`${DOSSIER}/formules`} className="inline-flex rounded-full bg-[var(--sombre)] text-[var(--sur-sombre)] px-6 py-3 font-[family-name:var(--titres)] font-semibold">
              Le détail, ligne par ligne
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Ce qu'on ne fera pas. */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20 space-y-10">
        <h2 className="text-5xl sm:text-6xl font-bold tracking-[-0.03em]">Ce qu'on ne fera pas.</h2>
        <ul className="grid gap-3 md:grid-cols-3">
          {engagements.map((e) => (
            <li key={e.titre} className="rounded-[26px] border-2 border-[var(--encre)] p-6 space-y-3">
              <h3 className="text-2xl font-bold">{e.titre}</h3>
              <p className="text-lg leading-relaxed">{e.texte}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* 8. Les moniteurs. */}
      <section className="bg-[var(--carte)] border-y border-[var(--trait)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 grid gap-10 md:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-4">
            <h2 className="text-5xl sm:text-6xl font-bold tracking-[-0.03em]">Ceux qui passent te prendre.</h2>
            <p className="text-xl leading-relaxed">Deux enseignants de la conduite, titulaires de l'autorisation d'enseigner. Prénoms d'exemple.</p>
          </div>
          <ul className="space-y-3">
            {moniteurs.map((m) => (
              <li key={m.prenom} className="flex gap-5 rounded-[26px] bg-[var(--fond)] p-6">
                <span aria-hidden="true" className="grid place-items-center shrink-0 w-16 h-16 rounded-full bg-[var(--sombre)] text-[var(--accent)] font-[family-name:var(--titres)] text-2xl font-bold">{m.initiale}</span>
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold">{m.prenom}</h3>
                  <p className="text-lg leading-relaxed">{m.texte}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 9. Questions. */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-20 space-y-8">
        <h2 className="text-5xl sm:text-6xl font-bold tracking-[-0.03em] text-center">Questions.</h2>
        <Faq questions={questions} />
      </section>

      {/* 10. Le dernier mot. */}
      <section className="px-4 sm:px-6 pb-20">
        <div className="max-w-6xl mx-auto rounded-[36px] bg-[var(--sombre)] text-[var(--sur-sombre)] px-6 py-14 sm:p-16 text-center space-y-6">
          <p className="font-[family-name:var(--titres)] text-5xl sm:text-7xl font-bold tracking-[-0.04em] leading-[0.98]">
            Mercredi, 17&nbsp;h ? <span className="text-[var(--accent)]">Je passe te prendre.</span>
          </p>
          <p className="text-xl">Ça commence par une évaluation d'une heure, au départ de chez toi.</p>
          <Link href={`${DOSSIER}/formules#evaluation`} className="inline-flex rounded-full bg-[var(--accent)] text-[var(--sur-accent)] px-8 py-4 font-[family-name:var(--titres)] text-lg font-bold">
            Réserver mon évaluation
          </Link>
        </div>
      </section>
    </main>
  );
}
