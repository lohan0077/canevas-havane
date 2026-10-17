import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { CRENEAUX, DEROULE, DOSSIER, QUESTIONS, REGLES, SEANCE, photos } from "./_composants/donnees";
import { AppelFinal, Bouton, Faq, Surtitre } from "./_composants/Blocs";
import CurseurMinutes from "./_composants/CurseurMinutes";

// L'accueil de Minute Quarante. La vidéo : « Sur l'accueil, pas de portfolio. Deux
// photos de la même famille : minute un, et minute quarante. » Le curseur est là ;
// autour, ce qu'un vrai site de photographe de famille dit : la séance, le prix, la
// façon de s'habiller, les lieux, les questions, les dates.
export const metadata: Metadata = {
  title: "Minute Quarante — site de démonstration",
  description: "Site de démonstration d'une photographe de famille imaginaire, réalisé par Canevas Havane : pas de portfolio, la minute où tu oublies l'appareil.",
  ...adressesDeLaPage("/exemples/minute-quarante"),
};

const LIEUX = [
  { nom: "Le parc", texte: "Celui où vous allez le dimanche. Les enfants le connaissent : ils oublient l'appareil plus vite." },
  { nom: "La plage", texte: "Hors saison, de préférence. Le vent fait la moitié du travail." },
  { nom: "La forêt", texte: "En automne, pour les feuilles. On marche, on ramasse, on se cache." },
  { nom: "Chez toi", texte: "Le canapé, la cuisine, le goûter. Le plus simple, souvent le plus juste." },
];

export default function MinuteQuarante() {
  const libres = CRENEAUX.filter((c) => !c.pris).slice(0, 3);

  return (
    <main>
      {/* 1 · L'ouverture : le nom en grand, puis le curseur minute 1 → minute 40. */}
      <section className="max-w-6xl mx-auto px-5 pt-8 pb-16 sm:pt-12 lg:grid lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:items-start">
        <div className="space-y-6 lg:sticky lg:top-24">
          <p aria-hidden="true" className="select-none leading-[0.82] tracking-[-0.05em]">
            <span className="block text-[23vw] sm:text-[150px] lg:text-[128px] font-extrabold">Minute</span>
            <span className="block text-[23vw] sm:text-[150px] lg:text-[128px] font-[family-name:var(--titres)] italic font-normal text-[var(--accent-texte)] -mt-1">40′</span>
          </p>
          <h1 className="text-[32px] sm:text-5xl font-medium tracking-[-0.02em] max-w-xl">
            On ne vend pas des photos. On vend <span className="italic">la minute où tu oublies l&apos;appareil.</span>
          </h1>
          <p className="text-lg leading-relaxed max-w-lg">
            Pas de portfolio. Deux photos d&apos;une séance : la minute 1, et la minute 40.
            Glisse, et regarde ce qui se passe entre les deux.
          </p>
          <div className="hidden lg:flex flex-wrap gap-3">
            <Bouton href={`${DOSSIER}/reserver`}>Choisir ma date</Bouton>
            <Link href={`${DOSSIER}/seance-famille`} className="inline-flex items-center rounded-full border-2 border-[var(--encre)] px-6 min-h-[52px] font-bold">
              La séance · {SEANCE.prix}
            </Link>
          </div>
        </div>
        <div className="mt-10 lg:mt-0 space-y-3">
          <CurseurMinutes />
          <p className="text-sm text-[var(--doux)]">Photos d&apos;illustration (Unsplash) : l&apos;entreprise est fictive, ces familles ne sont pas des clientes.</p>
          <div className="flex flex-wrap gap-3 pt-3 lg:hidden">
            <Bouton href={`${DOSSIER}/reserver`}>Choisir ma date</Bouton>
            <Link href={`${DOSSIER}/seance-famille`} className="inline-flex items-center rounded-full border-2 border-[var(--encre)] px-6 min-h-[52px] font-bold">
              La séance · {SEANCE.prix}
            </Link>
          </div>
        </div>
      </section>

      {/* 2 · Le constat, dit franchement. */}
      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)] [--accent-texte:#E8A27F]">
        <div className="max-w-6xl mx-auto px-5 py-16 sm:py-24 grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-end">
          <h2 className="text-[40px] sm:text-6xl font-medium tracking-[-0.02em]">
            Tout le monde déteste être pris en photo. <span className="italic">Moi aussi.</span>
          </h2>
          <div className="space-y-4 text-lg leading-relaxed">
            <p>
              Le plus dur, dans une séance, ce n&apos;est pas le prix. C&apos;est la première
              minute : celle où personne ne sait quoi faire de ses mains.
            </p>
            <p>
              Alors on ne pose pas. On marche, on joue, on parle d&apos;autre chose. Et on
              attend que tu oublies l&apos;appareil.
            </p>
          </div>
        </div>
      </section>

      {/* 3 · Une séance, minute par minute. */}
      <section className="max-w-6xl mx-auto px-5 py-16 sm:py-24 space-y-10">
        <div className="space-y-4 max-w-2xl">
          <Surtitre numero="01">La séance, minute par minute</Surtitre>
          <h2 className="text-4xl sm:text-5xl font-medium tracking-[-0.02em]">Une heure, <span className="italic">et pas une pose.</span></h2>
        </div>
        <ol className="border-t border-[var(--encre)]">
          {DEROULE.map((d) => (
            <li key={d.minute} className="grid grid-cols-[76px_1fr] sm:grid-cols-[140px_1fr_1.4fr] gap-x-5 gap-y-1 border-b border-[var(--trait)] py-6">
              <p className="row-span-2 sm:row-span-1 font-[family-name:var(--titres)] italic text-5xl sm:text-6xl leading-none tabular-nums text-[var(--accent-texte)]">
                {d.minute}′
              </p>
              <h3 className="text-xl sm:text-2xl font-medium">{d.titre}</h3>
              <p className="leading-relaxed text-[var(--doux)]">{d.texte}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* 4 · Le prix, affiché. */}
      <section className="bg-[var(--carte)] border-y border-[var(--trait)]">
        <div className="max-w-6xl mx-auto px-5 py-16 sm:py-24 grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-[3/2] overflow-hidden rounded-[6px]">
            <Image src={photos.tirages.src} alt={photos.tirages.alt} fill sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" />
          </div>
          <div className="space-y-6">
            <Surtitre numero="02">{SEANCE.nom} · {SEANCE.duree}</Surtitre>
            <p className="font-[family-name:var(--titres)] text-7xl sm:text-8xl font-medium tracking-[-0.03em] leading-none">
              {SEANCE.prix} <span className="text-2xl font-[family-name:var(--texte)] font-bold tracking-normal align-middle">TTC</span>
            </p>
            <p className="text-lg">{SEANCE.photos} photos retouchées · prix d&apos;exemple</p>
            <ul className="space-y-2.5">
              {SEANCE.compris.slice(0, 3).map((c) => (
                <li key={c} className="flex gap-3 leading-relaxed">
                  <span aria-hidden="true" className="text-[var(--accent-texte)] font-bold">✓</span>
                  {c}
                </li>
              ))}
            </ul>
            <p className="text-[var(--doux)]">Pas de « tarifs sur demande » : le prix est le même pour tout le monde.</p>
            <div className="flex flex-wrap gap-3">
              <Bouton href={`${DOSSIER}/seance-famille`}>Tout ce qui est compris</Bouton>
            </div>
          </div>
        </div>
      </section>

      {/* 5 · Avant la séance : s'habiller. */}
      <section className="max-w-6xl mx-auto px-5 py-16 sm:py-24 grid gap-10 md:grid-cols-[1fr_1.1fr] md:items-center">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[6px] md:order-2">
          <Image src={photos.troisCouleurs.src} alt={photos.troisCouleurs.alt} fill sizes="(min-width: 768px) 500px, 100vw" className="object-cover" />
        </div>
        <div className="space-y-6">
          <Surtitre numero="03">Avant ta séance</Surtitre>
          <h2 className="text-4xl sm:text-5xl font-medium tracking-[-0.02em]">Comment <span className="italic">s&apos;habiller&nbsp;?</span></h2>
          <p className="text-lg leading-relaxed">C&apos;est la question qu&apos;on tape tous avant de venir. La réponse tient en trois lignes.</p>
          <ol className="space-y-4">
            {REGLES.map((r, i) => (
              <li key={r.id} className="flex gap-4">
                <span className="font-[family-name:var(--titres)] italic text-3xl leading-none text-[var(--accent-texte)] tabular-nums">{i + 1}</span>
                <span className="text-xl font-semibold leading-snug">{r.titre}</span>
              </li>
            ))}
          </ol>
          <Bouton href={`${DOSSIER}/s-habiller`}>Le guide et les palettes</Bouton>
        </div>
      </section>

      {/* 6 · La photo ratée de la semaine. */}
      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)] [--accent-texte:#E8A27F] overflow-hidden">
        <div className="max-w-6xl mx-auto px-5 py-16 sm:py-24 grid gap-12 md:grid-cols-2 md:items-center">
          <div className="space-y-6">
            <Surtitre>La ratée de la semaine</Surtitre>
            <h2 className="text-4xl sm:text-5xl font-medium tracking-[-0.02em]">Chaque séance finit par <span className="italic">une photo ratée.</span></h2>
            <p className="text-lg leading-relaxed">
              Floue, de travers, exprès. On la publie ici, une fois par semaine, seulement
              si la famille a dit oui, par écrit. Parce que voir les autres gênés au début,
              c&apos;est ce qui rassure le plus.
            </p>
          </div>
          <figure className="relative mx-auto w-[78%] max-w-sm rotate-[-4deg] bg-[#FBF8F3] p-3 pb-12 shadow-[0_30px_60px_-25px_rgba(0,0,0,.7)]">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image src={photos.ratee.src} alt={photos.ratee.alt} fill sizes="(min-width: 768px) 360px, 78vw" className="object-cover" />
            </div>
            <figcaption className="absolute bottom-3 left-0 right-0 text-center font-[family-name:var(--titres)] italic text-xl text-[#1F1A17]">semaine 46</figcaption>
            <p className="absolute -right-5 -top-4 rotate-[8deg] rounded-[4px] bg-[#F4EEE6] text-[#1F1A17] px-3 py-2 text-sm font-bold shadow-md">
              Publiée avec leur accord
            </p>
          </figure>
        </div>
        <p className="max-w-6xl mx-auto px-5 pb-8 text-sm">Photo d&apos;illustration (Unsplash), pas une séance réelle.</p>
      </section>

      {/* 7 · Les lieux. */}
      <section className="max-w-6xl mx-auto px-5 py-16 sm:py-24 space-y-10">
        <div className="space-y-4 max-w-2xl">
          <Surtitre numero="04">Où</Surtitre>
          <h2 className="text-4xl sm:text-5xl font-medium tracking-[-0.02em]">Un endroit que <span className="italic">vous connaissez déjà.</span></h2>
          <p className="text-lg leading-relaxed">Pas de studio, pas de fond gris. En extérieur, à 30 km autour de chez toi, ou chez toi.</p>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {LIEUX.map((l, i) => (
            <li key={l.nom} className="rounded-[6px] border border-[var(--trait)] bg-[var(--carte)] p-6 space-y-3">
              <p className="text-sm font-bold tabular-nums text-[var(--accent-texte)]">0{i + 1}</p>
              <h3 className="text-2xl font-medium">{l.nom}</h3>
              <p className="leading-relaxed text-[var(--doux)]">{l.texte}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* 8 · Les questions. */}
      <section className="max-w-6xl mx-auto px-5 pb-16 sm:pb-24 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-4">
          <Surtitre numero="05">Questions</Surtitre>
          <h2 className="text-4xl sm:text-5xl font-medium tracking-[-0.02em]">Avant de <span className="italic">réserver.</span></h2>
        </div>
        <Faq questions={QUESTIONS} />
      </section>

      {/* 9 · Les prochaines dates. */}
      <section className="max-w-6xl mx-auto px-5 pb-16 sm:pb-24 space-y-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-4">
            <Surtitre numero="06">Novembre</Surtitre>
            <h2 className="text-4xl sm:text-5xl font-medium tracking-[-0.02em]">Les prochaines <span className="italic">dates libres.</span></h2>
          </div>
          <Link href={`${DOSSIER}/reserver`} className="font-bold underline underline-offset-[6px] decoration-2 decoration-[var(--accent)]">Toutes les dates</Link>
        </div>
        <ul className="grid gap-3 sm:grid-cols-3">
          {libres.map((c) => (
            <li key={c.libelle + c.sous}>
              <Link href={`${DOSSIER}/reserver`} className="flex items-center justify-between gap-4 rounded-[6px] border-2 border-[var(--encre)] px-5 py-4">
                <span>
                  <span className="block text-lg font-bold">{c.libelle}</span>
                  <span className="block text-sm text-[var(--doux)]">{c.sous}</span>
                </span>
                <span aria-hidden="true" className="text-2xl">→</span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="text-sm text-[var(--doux)]">Dates d&apos;exemple : l&apos;entreprise est fictive.</p>
      </section>

      <AppelFinal />
    </main>
  );
}
