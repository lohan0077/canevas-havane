import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { CONCERT, DOSSIER, PRIX, QUESTIONS, entreprise, photos } from "./_composants/donnees";
import { AppelFinal, Faq, Ornement, Surtitre } from "./_composants/Blocs";
import { ChoixMorceau } from "./_composants/Interactifs";

// L'accueil de Clair de Salon. La vidéo : « Sur l'accueil, pas de solfège. Une seule
// question : quel morceau tu rêves de jouer ? » La question est là ; autour, ce qu'une
// vraie marque de cours de piano dirait : le piano qui dort, la recherche des adultes
// qui reprennent, la méthode, le concert de salon, l'affiche, le prix, les questions.
export const metadata: Metadata = {
  title: "Clair de Salon — site de démonstration",
  description: "Site de démonstration d'une marque de cours de piano à domicile imaginaire, réalisé par Canevas Havane : pas de solfège, le morceau dont tu rêves.",
  ...adressesDeLaPage("/exemples/clair-de-salon"),
};

const ETAPES = [
  { titre: "Le morceau d'abord", texte: "Celui que tu as choisi. Le solfège vient en chemin, quand on en a besoin." },
  { titre: "Sur ton piano", texte: "Chez toi, sur l'instrument qui dort dans ton salon. Pas dans une salle de cours." },
  { titre: "Une étape à la fois", texte: "Quatre étapes par morceau. On passe à la suivante quand tu le décides." },
];

export default function ClairDeSalon() {
  return (
    <main>
      {/* 1 · L'ouverture : le piano qui dort, en pleine page, la phrase au centre. */}
      <section className="relative isolate overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)] [--accent-texte:#E7C774]">
        <Image src={photos.pianoQuiDort.src} alt={photos.pianoQuiDort.alt} fill priority sizes="100vw" className="-z-10 object-cover object-[35%_50%] opacity-90" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(30,42,68,.4)_0%,rgba(30,42,68,0)_25%,rgba(30,42,68,.15)_55%,rgba(30,42,68,.95)_76%)]" />
        <div className="max-w-4xl mx-auto px-5 min-h-[86svh] flex flex-col items-center justify-between pt-8 pb-10 text-center">
          <p aria-hidden="true" className="grid h-16 w-16 place-items-center rounded-full border border-[var(--sur-sombre)] text-3xl">☾</p>
          <div className="space-y-6">
            <Surtitre>Cours de piano à domicile</Surtitre>
            <h1 className="text-[48px] sm:text-[84px] leading-[1.02]">
              Ton piano s&apos;est <span className="italic text-[var(--accent-texte)]">assez reposé.</span>
            </h1>
            <Link href="#morceau" className="inline-flex min-h-[52px] items-center rounded-full bg-[var(--sur-sombre)] text-[var(--encre)] px-7 font-semibold">
              Tu rêves de jouer quoi&nbsp;?
            </Link>
          </div>
        </div>
      </section>

      {/* 2 · La seule question. */}
      <section id="morceau" className="scroll-mt-16 max-w-6xl mx-auto px-5 py-16 sm:py-24 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-5">
          <Surtitre>Une seule question</Surtitre>
          <h2 data-film="question" className="text-5xl sm:text-6xl">Tu rêves de jouer <span className="italic text-[var(--accent-texte)]">quoi&nbsp;?</span></h2>
          <p className="text-lg leading-relaxed">
            Pour ceux qui reprennent après des années, et pour ceux qui n&apos;ont jamais osé :
            pas de solfège à l&apos;accueil. Quatre morceaux pour commencer, tous du domaine public. Touche celui qui te fait
            envie : son chemin s&apos;affiche, étape par étape.
          </p>
        </div>
        <ChoixMorceau />
      </section>

      {/* 3 · Ce que tapent les adultes. */}
      <section className="border-y border-[var(--encre)] bg-[var(--carte)]">
        <div className="max-w-6xl mx-auto px-5 py-16 sm:py-20 grid gap-10 md:grid-cols-2 md:items-center">
          <div className="relative aspect-[2/3] max-h-[560px] overflow-hidden">
            <Image src={photos.touches.src} alt={photos.touches.alt} fill sizes="(min-width: 768px) 480px, 100vw" className="object-cover" />
          </div>
          <div className="space-y-5">
            <Surtitre>Reprendre le piano après plusieurs années</Surtitre>
            <h2 className="text-4xl sm:text-5xl">Les doigts <span className="italic text-[var(--accent-texte)]">se souviennent.</span></h2>
            <p className="text-lg leading-relaxed">
              C&apos;est mot pour mot ce que tapent les adultes sur Google. Ils n&apos;ont pas
              besoin de repartir des gammes : ils ont besoin d&apos;un morceau, d&apos;un piano, et
              d&apos;une heure par semaine qui ne soit qu&apos;à eux.
            </p>
            <ul className="space-y-2">
              {["Des cours chez toi, sur ton piano", "Le soir ou le week-end", "À ton rythme, sans examen ni audition de juin"].map((x) => (
                <li key={x} className="flex gap-3"><span aria-hidden="true" className="text-[var(--accent-texte)]">♪</span>{x}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 4 · La méthode. */}
      <section className="max-w-6xl mx-auto px-5 py-16 sm:py-24 space-y-10">
        <div className="text-center space-y-4">
          <Ornement />
          <h2 className="text-4xl sm:text-6xl">Pas de solfège <span className="italic text-[var(--accent-texte)]">en premier.</span></h2>
        </div>
        <ol className="grid gap-8 md:grid-cols-3">
          {ETAPES.map((e, i) => (
            <li key={e.titre} className="text-center space-y-3">
              <p className="font-[family-name:var(--titres)] text-6xl italic text-[var(--accent-texte)] [font-variant-numeric:lining-nums]">{["I", "II", "III"][i]}</p>
              <h3 className="text-2xl">{e.titre}</h3>
              <p className="leading-relaxed text-[var(--doux)]">{e.texte}</p>
            </li>
          ))}
        </ol>
        <div className="relative aspect-[3/2] sm:aspect-[21/9] overflow-hidden">
          <Image src={photos.main.src} alt={photos.main.alt} fill sizes="(min-width: 1152px) 1104px, 100vw" className="object-cover" />
        </div>
      </section>

      {/* 5 · Le concert de salon. */}
      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)] [--accent-texte:#E7C774]">
        <div className="max-w-6xl mx-auto px-5 py-16 sm:py-24 grid gap-10 md:grid-cols-2 md:items-center">
          <div className="space-y-5">
            <Surtitre>Une fois par mois</Surtitre>
            <h2 className="text-4xl sm:text-6xl">Un concert de salon, <span className="italic text-[var(--accent-texte)]">chez un élève.</span></h2>
            <p className="text-lg leading-relaxed">
              {CONCERT.eleves} élèves au piano, {CONCERT.chaises} chaises, et les voisins.
              On joue ce qu&apos;on sait, même huit mesures. Entrée libre.
            </p>
            <Link href={`${DOSSIER}/concerts`} className="inline-flex min-h-[52px] items-center rounded-full border border-[var(--sur-sombre)] px-7 font-semibold">Le prochain concert</Link>
          </div>
          <figure className="mx-auto w-[86%] max-w-sm rotate-[-2deg] bg-[var(--fond)] text-[var(--encre)] p-7 text-center space-y-3 shadow-[0_30px_60px_-30px_rgba(0,0,0,.8)]">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8C3B3B]">Clair de Salon · invitation</p>
            <p className="font-[family-name:var(--titres)] text-4xl">Concert de salon</p>
            <p className="italic">{CONCERT.date}<br />{CONCERT.heure}</p>
            <p aria-hidden="true" className="flex justify-center gap-1 pt-2">
              {Array.from({ length: CONCERT.chaises }, (_, k) => <span key={k} className="h-3.5 w-3.5 rounded-[2px] border-2 border-[#1E2A44]" />)}
            </p>
            <figcaption className="text-sm">{CONCERT.eleves} élèves au piano · voisins bienvenus</figcaption>
          </figure>
        </div>
      </section>

      {/* 6 · L'affiche du lancement. */}
      <section className="max-w-6xl mx-auto px-5 py-16 sm:py-24 grid gap-10 md:grid-cols-2 md:items-center">
        <figure className="mx-auto w-[80%] max-w-xs rotate-[-3deg] bg-[var(--sombre)] p-8 pb-10 shadow-[0_30px_60px_-30px_rgba(30,42,68,.8)]">
          <p className="font-[family-name:var(--titres)] text-[40px] leading-[1.05] text-[#F6F0E1]">Ton piano s&apos;est <span className="italic text-[#E7C774]">assez reposé.</span></p>
          <figcaption className="mt-10 text-[11px] font-bold uppercase tracking-[0.2em] text-[#F6F0E1]">Clair de Salon · cours de piano chez toi</figcaption>
        </figure>
        <div className="space-y-5">
          <Surtitre>Le lancement</Surtitre>
          <h2 className="text-4xl sm:text-5xl">Une seule affiche, <span className="italic text-[var(--accent-texte)]">près des pianos qui dorment.</span></h2>
          <p className="text-lg leading-relaxed">
            Dans les halls d&apos;immeuble, chez le boulanger, à la médiathèque. Une phrase, sans
            promotion ni compte à rebours : chacun sait s&apos;il a un piano qui attend.
          </p>
        </div>
      </section>

      {/* 7 · Le prix, en bref. */}
      <section className="border-y border-[var(--encre)] bg-[var(--carte)]">
        <div className="max-w-6xl mx-auto px-5 py-14 sm:py-16 grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <div className="space-y-2">
            <Surtitre>Le prix</Surtitre>
            <p className="font-[family-name:var(--titres)] text-5xl [font-variant-numeric:lining-nums]">{PRIX.heure}&nbsp;€ TTC <span className="text-2xl italic">l&apos;heure de cours</span></p>
            <p className="text-[var(--doux)]">{PRIX.heure},00&nbsp;€ HT · déplacement compris · prix d&apos;exemple</p>
            <p className="text-[13px] text-[var(--doux)]">Avantage fiscal possible, sous conditions : le détail est sur la page des tarifs.</p>
          </div>
          <Link href={`${DOSSIER}/tarifs`} className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-[var(--accent)] text-[var(--sur-accent)] px-7 font-semibold">Tous les tarifs</Link>
        </div>
      </section>

      {/* 8 · Les questions. */}
      <section className="max-w-6xl mx-auto px-5 py-16 sm:py-24 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-4">
          <Surtitre>Questions</Surtitre>
          <h2 className="text-4xl sm:text-5xl">Avant le <span className="italic text-[var(--accent-texte)]">premier cours.</span></h2>
          <p className="text-[var(--doux)]">Avec {entreprise.prof}, professeure de piano (exemple).</p>
        </div>
        <Faq questions={QUESTIONS} />
      </section>

      <AppelFinal />
    </main>
  );
}
