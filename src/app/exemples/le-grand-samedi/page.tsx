import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, QUESTIONS, entreprise, photos } from "./_composants/donnees";
import Formules from "./_composants/Formules";
import Retroplanning from "./_composants/Retroplanning";

// Le site imaginé dans la vidéo « Si je devais remplir le carnet de mariages d'une
// wedding planner » : une seule question sur l'accueil — tu te maries quand ? — et le
// rétroplanning mois par mois ; les prix en clair, sur l'accueil ; les coulisses du
// jour J ; et le droit d'être invité à son propre mariage. Ouverture inspirée du
// modèle « Luxury Botanical » de MotionSites (titre mêlant romain et italique en haut
// à gauche, une image chaude, une pilule d'appel), transposée au mariage.
export const metadata: Metadata = {
  title: "Le Grand Samedi — site de démonstration",
  description: "Site de démonstration d'une wedding planner imaginaire, réalisé par Canevas Havane : tu te maries quand ? Le rétroplanning mois par mois, et les prix en clair.",
  ...adressesDeLaPage("/exemples/le-grand-samedi"),
};

const JOUR_J = [
  { heure: "10 h", texte: "On arrive avant tout le monde. Le déroulé est imprimé, chaque prestataire a le sien." },
  { heure: "14 h", texte: "Ce qui coince, on le règle dans l'allée de service. Toi, tu es ailleurs." },
  { heure: "19 h", texte: "Les discours, le dîner, les horaires tenus, sans que personne regarde sa montre." },
  { heure: "Minuit", texte: "On part après le dernier invité. Toi, tu restes." },
];

const DEBUT = [
  { titre: "Un premier rendez-vous", texte: "Une heure, gratuite, chez toi ou au téléphone. On parle de toi, pas de nos formules." },
  { titre: "Un devis précis", texte: "La formule, ce qui est compris, ce qui ne l'est pas. Ligne par ligne, en euros." },
  { titre: "Ton rétroplanning", texte: "Mois par mois, jusqu'au grand samedi. Et un seul numéro à appeler." },
];

export default function LeGrandSamedi() {
  return (
    <div>
      {/* L'ouverture : une seule question. */}
      <section id="ma-date" className="scroll-mt-16 max-w-6xl mx-auto px-4 sm:px-6 pt-8 sm:pt-14 pb-16 grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-start">
        <div className="space-y-6">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-[var(--doux)]">Wedding planner · {entreprise.region}</p>
          <h1 className="text-[64px] sm:text-8xl font-normal leading-[0.92] tracking-[-0.02em]">
            Tu te maries <span className="italic text-[var(--accent-texte)]">quand&nbsp;?</span>
          </h1>
          <p className="max-w-md text-lg leading-relaxed text-[var(--doux)]">Une seule question. Écris ta date : le site compte les samedis qui restent et te sort ton rétroplanning, mois par mois.</p>
          <div className="relative hidden lg:block aspect-[4/5] overflow-hidden rounded-[32px]">
            <Image src={photos.arche.src} alt={photos.arche.alt} fill preload loading="eager" sizes="540px" className="object-cover" />
          </div>
        </div>
        <Retroplanning />
      </section>

      {/* La promesse. */}
      <section className="bg-[#F1E4DA]">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-20 sm:py-28 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-[var(--accent-texte)]">Ce qu&apos;on vend vraiment</p>
            <h2 className="text-[46px] sm:text-7xl font-normal leading-[0.98]">Pas l&apos;organisation. <span className="italic text-[var(--accent-texte)]">Le droit d&apos;être invité à son propre mariage.</span></h2>
            <p className="max-w-lg text-lg leading-relaxed text-[var(--doux)]">Le jour J, tu ne réponds à aucun prestataire, tu ne cherches aucune rallonge, tu ne regardes pas ta montre. Tu es là, c&apos;est tout.</p>
          </div>
          <div aria-hidden="true" className="mx-auto w-full max-w-[320px] rotate-[-3deg] rounded-[6px] bg-[var(--carte)] px-8 py-10 text-center shadow-[0_30px_60px_-30px_rgba(42,26,31,0.45)] space-y-4 outline outline-1 outline-offset-[-14px] outline-[#C69C5D]">
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-[var(--doux)]">Invitation</p>
            <p className="font-[family-name:var(--titres)] text-3xl italic">Les mariés</p>
            <p className="text-sm">sont invités au mariage</p>
            <p className="font-[family-name:var(--titres)] text-3xl italic text-[var(--accent-texte)]">des mariés.</p>
            <p className="text-sm text-[var(--doux)]">Un samedi, le leur.</p>
          </div>
        </div>
      </section>

      {/* Les prix, en clair. */}
      <section id="prix" className="scroll-mt-16 max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-5">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-[var(--accent-texte)]">Les prix</p>
          <h2 className="text-[46px] sm:text-7xl font-normal leading-[0.98]">En clair. <span className="italic">Sur l&apos;accueil.</span></h2>
          <p className="max-w-md text-lg leading-relaxed text-[var(--doux)]">Pas dans un PDF envoyé trois jours plus tard. Sans prix, on croit que c&apos;est trop cher, et on fait tout seuls.</p>
          <Link href={`${DOSSIER}/formules`} className="inline-block font-medium underline underline-offset-4 decoration-[#C69C5D]">Le détail des formules →</Link>
        </div>
        <Formules />
      </section>

      {/* Le jour J. */}
      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-20 sm:py-28 grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[32px]">
            <Image src={photos.soir.src} alt={photos.soir.alt} fill sizes="(min-width: 1024px) 540px, 100vw" className="object-cover" />
          </div>
          <div className="space-y-8">
            <h2 className="text-[46px] sm:text-6xl font-normal leading-[0.98]">Le jour J, <span className="italic text-[#D9B98A]">heure par heure.</span></h2>
            <ol className="space-y-5">
              {JOUR_J.map((j) => (
                <li key={j.heure} className="grid grid-cols-[84px_1fr] gap-4 border-t border-[#4A3238] pt-4">
                  <span className="font-[family-name:var(--titres)] text-3xl italic text-[#D9B98A]">{j.heure.replace(" ", " ")}</span>
                  <span className="leading-relaxed text-[#CDBDB5]">{j.texte}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Les coulisses. */}
      <section className="max-w-6xl mx-auto px-5 sm:px-6 py-20 sm:py-28 grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="relative aspect-[3/4] max-h-[560px] overflow-hidden rounded-[32px]">
          <Image src={photos.chaises.src} alt={photos.chaises.alt} fill sizes="(min-width: 1024px) 480px, 100vw" className="object-cover object-[50%_60%]" />
        </div>
        <div className="space-y-6">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-[var(--accent-texte)]">Sur nos réseaux</p>
          <h2 className="text-[46px] sm:text-7xl font-normal leading-[0.98]">Pas de couchers de soleil. <span className="italic text-[var(--accent-texte)]">Les coulisses.</span></h2>
          <p className="text-lg leading-relaxed text-[var(--doux)]">Ce que les invités n&apos;ont pas vu : l&apos;arche en retard, la rallonge introuvable, la pluie à 15 h. Toujours avec l&apos;accord écrit des mariés, jamais un prestataire nommé.</p>
          <Link href={`${DOSSIER}/coulisses`} className="inline-flex rounded-full bg-[var(--accent)] text-[var(--sur-accent)] px-6 py-3.5 font-semibold">Voir un épisode d&apos;exemple</Link>
        </div>
      </section>

      {/* Pour commencer. */}
      <section id="rendez-vous" className="scroll-mt-16 bg-[#F1E4DA]">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-20 sm:py-24 space-y-12">
          <h2 className="text-[46px] sm:text-7xl font-normal leading-[0.98]">Pour commencer.</h2>
          <ol className="grid gap-6 md:grid-cols-3">
            {DEBUT.map((d, i) => (
              <li key={d.titre} className="space-y-3 border-t border-[var(--encre)] pt-5">
                <p className="font-[family-name:var(--titres)] text-5xl italic text-[var(--accent-texte)]">{i + 1}</p>
                <h3 className="text-3xl font-normal">{d.titre}</h3>
                <p className="leading-relaxed text-[var(--doux)]">{d.texte}</p>
              </li>
            ))}
          </ol>
          <a href={`tel:${entreprise.telephoneLien}`} className="inline-flex rounded-full bg-[var(--accent)] text-[var(--sur-accent)] px-7 py-4 font-semibold">Prendre le premier rendez-vous · {entreprise.telephone}</a>
        </div>
      </section>

      {/* Questions. */}
      <section className="max-w-4xl mx-auto px-5 sm:px-6 py-20 sm:py-28 space-y-8">
        <h2 className="text-[46px] sm:text-7xl font-normal leading-[0.98]">Ce que les couples <span className="italic">nous demandent.</span></h2>
        <div className="border-t border-[var(--trait)]">
          {QUESTIONS.map((q) => (
            <details key={q.question} className="group border-b border-[var(--trait)]">
              <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6 py-5 font-[family-name:var(--titres)] text-[28px] leading-tight [&::-webkit-details-marker]:hidden">
                {q.question}
                <span aria-hidden="true" className="text-2xl text-[var(--accent-texte)] transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="pb-6 text-lg leading-relaxed text-[var(--doux)]">{q.reponse}</p>
            </details>
          ))}
        </div>
      </section>

      {/* La photo de fin, sur mobile. */}
      <section className="lg:hidden px-4 pb-16">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[32px]">
          <Image src={photos.arche.src} alt={photos.arche.alt} fill sizes="100vw" className="object-cover" />
        </div>
        <p className="mt-4 text-center font-[family-name:var(--titres)] text-3xl italic">À ton grand samedi.</p>
      </section>
    </div>
  );
}
