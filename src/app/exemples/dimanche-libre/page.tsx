import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { COURS, DEPANNAGE, DOSSIER, QUESTIONS, entreprise, euros, photos } from "./_composants/donnees";
import DeuxPortes from "./_composants/DeuxPortes";

// Le site imaginé dans la vidéo « Si je devais remplir le carnet de commandes d'un
// dépanneur informatique » : on ne vend pas du dépannage, on vend le dimanche où ton
// père ne t'appelle plus pour son imprimante. Deux portes sur l'accueil, des prix
// clairs, la vraie réponse sur le crédit d'impôt, des cours qui donnent envie.
// Mise en page inspirée du modèle « Playful Idea » de MotionSites (fond pastel,
// formes rondes, typographie franche), transposée à l'informatique à domicile.
export const metadata: Metadata = {
  title: "Dimanche Libre — site de démonstration",
  description: "Site de démonstration d'un dépanneur et formateur informatique imaginaire, réalisé par Canevas Havane : deux portes, des prix clairs, la vraie réponse sur le crédit d'impôt.",
  ...adressesDeLaPage("/exemples/dimanche-libre"),
};

const ETAPES = [
  { titre: "Tu appelles", texte: "On écoute, on te dit si c'est une panne ou un cours, et combien ça coûte, avant de venir." },
  { titre: "On vient chez toi", texte: "En semaine ou le samedi. On répare, ou on t'apprend : tu touches le clavier, pas nous." },
  { titre: "On laisse une fiche", texte: "Les étapes en gros, sur le frigo. Pour refaire seul, sans rappeler personne." },
];

const JOURS = ["L", "M", "M", "J", "V", "S", "D"];

export default function DimancheLibre() {
  return (
    <div>
      {/* L'accueil : une seule question, deux portes. */}
      <section data-film="portes" className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 sm:pt-14 pb-16 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="space-y-5">
          <p className="inline-flex items-center gap-2 rounded-full bg-[var(--carte)] border border-[var(--trait)] px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em]">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#1B7A63]" />
            Informatique à domicile · {entreprise.ville}
          </p>
          <h1 className="isolate text-[52px] sm:text-7xl font-extrabold leading-[0.95] tracking-[-0.03em]">
            Qu&apos;est-ce qu&apos;il te <span className="relative inline-block">faut&nbsp;?<span aria-hidden="true" className="absolute -bottom-1 left-0 right-0 h-3 -z-10 rounded-full bg-[#FFD6CC]" /></span>
          </h1>
          <p className="hidden lg:block text-lg leading-relaxed text-[var(--doux)] max-w-md">Une panne à réparer, ou quelque chose à apprendre&nbsp;? Ce n&apos;est pas le même métier, pas le même prix, et pas le même crédit d&apos;impôt.</p>
        </div>
        <DeuxPortes />
      </section>

      {/* Le dimanche libre. */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-20 sm:pb-28">
        <div className="rounded-[36px] bg-[var(--carte)] border border-[var(--trait)] p-6 sm:p-12 grid gap-10 md:grid-cols-[1fr_0.9fr] md:items-center">
          <div className="space-y-5">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent-texte)]">Pourquoi ce nom</p>
            <h2 className="text-[38px] sm:text-5xl font-extrabold leading-[1.0] tracking-[-0.02em]">Le dimanche où ton père ne t&apos;appelle plus pour son imprimante.</h2>
            <p className="text-lg leading-relaxed text-[var(--doux)]">On passe chez lui en semaine. On répare ce qui est cassé, et on lui apprend le reste. Le dimanche, vous parlez d&apos;autre chose.</p>
          </div>
          <div aria-hidden="true" className="mx-auto w-full max-w-[290px] space-y-3">
            <div className="relative rounded-[30px] bg-[var(--sombre)] text-[var(--sur-sombre)] p-6 text-center space-y-2 rotate-[-3deg]">
              <p className="text-xs text-[#C9C0DD]">Dimanche · 14:32</p>
              <p className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#FF9A80] font-[family-name:var(--titres)] text-2xl font-extrabold text-[var(--encre)]">P</p>
              <p className="font-[family-name:var(--titres)] text-2xl font-extrabold">Papa</p>
              <p className="text-sm text-[#C9C0DD]">« L&apos;imprimante, elle marche plus. »</p>
              <span className="absolute left-4 right-4 top-1/2 h-[5px] rounded-full bg-[var(--accent)] -rotate-[14deg]" />
            </div>
            <p className="rounded-full bg-[#DDF6EC] px-5 py-3 text-center font-bold text-[#14614E]">Ce dimanche : pas d&apos;appel.</p>
          </div>
        </div>
      </section>

      {/* C'est cassé. */}
      <section className="px-3">
        <div className="max-w-6xl mx-auto rounded-[36px] bg-[#FFE8E1] px-5 py-14 sm:px-10 sm:py-20 grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent-texte)]">Porte 1 · C&apos;est cassé</p>
            <h2 className="text-[40px] sm:text-6xl font-extrabold leading-[0.98] tracking-[-0.02em]">Un prix clair, avant de venir.</h2>
            <ul className="space-y-2.5">
              {DEPANNAGE.forfaits.map((f) => (
                <li key={f.titre} className="flex items-baseline justify-between gap-4 rounded-[20px] bg-[var(--carte)] px-4 py-3.5">
                  <span><span className="block font-bold">{f.titre}</span><span className="text-sm text-[var(--doux)]">{f.detail}</span></span>
                  <strong className="shrink-0 tabular-nums">{euros(f.prix)} TTC</strong>
                </li>
              ))}
            </ul>
            <p className="text-sm text-[var(--doux)]">Prix d&apos;exemple, déplacement de {euros(DEPANNAGE.deplacement)} compris. Le dépannage n&apos;ouvre pas droit au crédit d&apos;impôt.</p>
            <Link href={`${DOSSIER}/c-est-casse`} className="inline-flex rounded-full bg-[var(--encre)] text-[var(--fond)] px-6 py-3.5 font-bold">Calculer mon dépannage</Link>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[30px]">
            <Image src={photos.imprimante.src} alt={photos.imprimante.alt} fill sizes="(min-width: 1024px) 540px, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      {/* Je veux apprendre. */}
      <section className="px-3 pt-3">
        <div className="max-w-6xl mx-auto rounded-[36px] bg-[#DDF6EC] px-5 py-14 sm:px-10 sm:py-20 space-y-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div className="space-y-5">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#14614E]">Porte 2 · Je veux apprendre</p>
              <h2 className="text-[40px] sm:text-6xl font-extrabold leading-[0.98] tracking-[-0.02em]">Des cours qui donnent envie.</h2>
              <p className="text-lg leading-relaxed text-[var(--doux)]">Une heure et demie chez toi, sur ton ordinateur ou ta tablette. Et une fiche à garder.</p>
            </div>
            <div className="relative aspect-[3/2] overflow-hidden rounded-[30px]">
              <Image src={photos.tablette.src} alt={photos.tablette.alt} fill sizes="(min-width: 1024px) 460px, 100vw" className="object-cover" />
            </div>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {COURS.map((c) => (
              <li key={c.id} className="rounded-[26px] bg-[var(--carte)] p-5 space-y-2">
                <p className="font-[family-name:var(--titres)] text-[22px] font-extrabold leading-tight">{c.titre}</p>
                <p className="text-sm leading-relaxed text-[var(--doux)]">{c.duree} chez toi</p>
              </li>
            ))}
          </ul>
          <Link href={`${DOSSIER}/j-apprends`} className="inline-flex rounded-full bg-[var(--encre)] text-[var(--fond)] px-6 py-3.5 font-bold">Voir les cours et leurs prix</Link>
        </div>
      </section>

      {/* La vraie réponse. */}
      <section className="px-3 pt-3">
        <div className="max-w-6xl mx-auto rounded-[36px] bg-[var(--sombre)] text-[var(--sur-sombre)] px-5 py-14 sm:px-10 sm:py-20 space-y-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#FF9A80]">Crédit d&apos;impôt · la vraie réponse</p>
          <p className="font-[family-name:var(--titres)] text-[44px] sm:text-7xl font-extrabold leading-[0.95] tracking-[-0.03em]">
            Le dépannage&nbsp;? <span className="text-[#FF9A80]">Non.</span>
          </p>
          <p className="max-w-2xl text-xl leading-relaxed">
            Les cours, l&apos;installation et la maintenance des logiciels chez toi&nbsp;: <strong className="text-[#7FD8BE]">oui, sous conditions</strong>, si l&apos;entreprise est déclarée services à la personne.
          </p>
          <p className="max-w-2xl text-[#C9C0DD]">Même si ça ne nous arrange pas : on préfère que tu l&apos;apprennes ici que sur ta déclaration.</p>
          <Link href={`${DOSSIER}/credit-d-impot`} className="inline-flex rounded-full bg-[var(--accent)] text-[var(--sur-accent)] px-6 py-3.5 font-bold">Vérifier ma situation</Link>
        </div>
      </section>

      {/* Comment ça se passe. */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28 space-y-10">
        <h2 className="text-[40px] sm:text-6xl font-extrabold leading-[0.98] tracking-[-0.02em] max-w-2xl">Comment ça se passe.</h2>
        <ol className="grid gap-4 md:grid-cols-3">
          {ETAPES.map((e, i) => (
            <li key={e.titre} className="rounded-[28px] bg-[var(--carte)] border border-[var(--trait)] p-6 space-y-3">
              <span className="font-[family-name:var(--titres)] text-5xl font-extrabold text-[var(--accent-texte)] tabular-nums">{i + 1}</span>
              <h3 className="text-2xl font-extrabold">{e.titre}</h3>
              <p className="leading-relaxed text-[var(--doux)]">{e.texte}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Jamais le dimanche. */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20 sm:pb-28 grid gap-8 lg:grid-cols-2 lg:items-center">
        <div className="space-y-4">
          <h2 className="text-[40px] sm:text-6xl font-extrabold leading-[0.98] tracking-[-0.02em]">Du lundi au samedi. <span className="text-[var(--accent-texte)]">Jamais le dimanche.</span></h2>
          <p className="text-lg leading-relaxed text-[var(--doux)]">{entreprise.zone}. Le dimanche, c&apos;est pour la famille — la tienne, et la nôtre.</p>
        </div>
        <ul aria-label="Jours d'intervention" className="grid grid-cols-7 gap-1.5 sm:gap-2.5">
          {JOURS.map((j, i) => (
            <li key={i} className={`flex aspect-[3/4] flex-col items-center justify-center gap-1 rounded-[18px] font-[family-name:var(--titres)] text-2xl font-extrabold ${i === 6 ? "bg-[var(--sombre)] text-[var(--sur-sombre)]" : "bg-[var(--carte)] border border-[var(--trait)]"}`}>
              {j}
              <span className={`text-sm ${i === 6 ? "text-[#FF9A80]" : "text-[#14614E]"}`}>{i === 6 ? "✕" : "✓"}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Questions. */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-20 sm:pb-28 space-y-8">
        <h2 className="text-[40px] sm:text-6xl font-extrabold leading-[0.98] tracking-[-0.02em]">Tes questions.</h2>
        <div className="space-y-2.5">
          {QUESTIONS.map((q) => (
            <details key={q.question} className="group rounded-[24px] bg-[var(--carte)] border border-[var(--trait)] px-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-[family-name:var(--titres)] text-xl font-extrabold leading-snug [&::-webkit-details-marker]:hidden">
                {q.question}
                <span aria-hidden="true" className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#FFE8E1] text-xl transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="pb-5 leading-relaxed text-[var(--doux)]">{q.reponse}</p>
            </details>
          ))}
        </div>
      </section>

      {/* L'appel. */}
      <section className="px-3 pb-3">
        <div className="max-w-6xl mx-auto rounded-[36px] bg-[#FFF1C9] overflow-hidden grid md:grid-cols-[1.2fr_0.8fr]">
          <div className="px-6 py-14 sm:px-12 sm:py-20 space-y-6">
            <h2 className="text-[44px] sm:text-6xl font-extrabold leading-[0.95] tracking-[-0.03em]">Rends-lui son dimanche.</h2>
            <p className="text-lg leading-relaxed text-[var(--doux)]">Et le tien. Un appel, on te dit si c&apos;est une panne ou un cours, et combien.</p>
            <a href={`tel:${entreprise.telephoneLien}`} className="inline-flex rounded-full bg-[var(--encre)] text-[var(--fond)] px-7 py-4 text-lg font-bold">{entreprise.telephone}</a>
          </div>
          <div className="relative min-h-[280px]">
            <Image src={photos.portable.src} alt={photos.portable.alt} fill sizes="(min-width: 768px) 420px, 100vw" className="object-cover object-[50%_45%]" />
          </div>
        </div>
      </section>
    </div>
  );
}
