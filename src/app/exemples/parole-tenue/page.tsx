import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, ETAPES, FAQ, MENTIONS_TOURISME, VOYAGES, euros, photos } from "./_composants/donnees";
import Promesse from "./_composants/Promesse";
import Mur from "./_composants/Mur";

// Le site de l'agence imaginée dans la vidéo « Si je devais créer une agence de
// voyage » : elle ne vend pas des destinations, elle vend les promesses. On écrit la
// sienne ; le site compte depuis quand elle attend, propose une date et ce qu'il faut
// mettre de côté chaque mois.
export const metadata: Metadata = {
  title: "Parole Tenue — site de démonstration",
  description: "Site de démonstration d'une agence de voyage imaginaire, réalisé par Canevas Havane : écris le voyage que tu as promis, le site te dit depuis quand tu le repousses et te propose une date.",
  ...adressesDeLaPage("/exemples/parole-tenue"),
};

const Petit = ({ children, clair = false }: { children: React.ReactNode; clair?: boolean }) => (
  <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${clair ? "text-[#E9D8B4]" : "text-[var(--accent-texte)]"}`}>{children}</p>
);

export default function ParoleTenue() {
  return (
    <main>
      {/* 1. Le voyage que tu as promis */}
      <section className="mx-auto max-w-6xl px-5 pt-10 pb-16 sm:pt-16 text-center">
        <Petit>Agence de voyage</Petit>
        <h1 className="mx-auto mt-5 max-w-4xl text-[3.1rem] sm:text-7xl lg:text-[6.2rem] font-normal">
          Le voyage que tu as <em className="text-[var(--accent-texte)]">promis.</em>
        </h1>
        <div className="mt-10 grid items-center gap-8 lg:grid-cols-[1fr_2fr_1fr]">
          <p className="order-2 text-left text-lg leading-relaxed lg:order-1 lg:text-right">
            «&nbsp;On ira au Japon, <em>un jour.</em>&nbsp;» Tout le monde a un voyage promis. On ne vend que ça.
          </p>
          <figure className="order-1 lg:order-2">
            <Image src={photos.fuji.src} width={photos.fuji.largeur} height={photos.fuji.hauteur} alt={photos.fuji.alt} sizes="(min-width: 1024px) 560px, 100vw" priority className="aspect-[4/3] w-full rounded-t-full object-cover" />
          </figure>
          <div className="order-3 space-y-4 text-left">
            <p className="leading-relaxed text-[var(--doux)]">Tu l&apos;écris, on te dit depuis quand tu la repousses, et on te propose une date.</p>
            <Link href="#promesse" className="inline-flex min-h-13 items-center justify-center rounded-full bg-[var(--accent)] px-7 font-semibold text-[var(--sur-accent)]">
              Écrire ma promesse
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Tout le monde a un voyage promis */}
      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto max-w-6xl space-y-10 px-5 py-16 sm:py-24">
          <div className="max-w-2xl space-y-4">
            <Petit clair>Les phrases qu&apos;on dit tous</Petit>
            <h2 className="text-5xl sm:text-6xl font-normal">Tu l&apos;as dit <em className="text-[#F2A58E]">à qui&nbsp;?</em></h2>
          </div>
          <ul className="grid gap-x-10 gap-y-6 md:grid-cols-2">
            {VOYAGES.map((v) => (
              <li key={v.id} className="border-t border-[#3E5A52] pt-4 font-[family-name:var(--titres)] text-2xl sm:text-3xl italic leading-snug">
                «&nbsp;{v.phrase}&nbsp;»
              </li>
            ))}
          </ul>
          <p className="text-sm text-[#C9D8D2]">Des exemples de promesses, pas des témoignages.</p>
        </div>
      </section>

      {/* 3. La promesse */}
      <section id="promesse" className="scroll-mt-16 mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:py-24 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-5 lg:sticky lg:top-24 lg:self-start">
          <Petit>Ta promesse</Petit>
          <h2 className="text-5xl sm:text-6xl font-normal">On ira, <em className="text-[var(--accent-texte)]">promis.</em></h2>
          <p className="max-w-md text-lg leading-relaxed max-lg:hidden">
            Trois réponses : à qui tu l&apos;as promis, quel voyage, et depuis quand. Le site te dit
            le reste.
          </p>
        </div>
        <Promesse />
      </section>

      {/* 4. Comment on tient une promesse */}
      <section className="border-y-2 border-[var(--encre)] bg-[#F3EAD8]">
        <div className="mx-auto max-w-6xl space-y-12 px-5 py-16 sm:py-24">
          <div className="max-w-2xl space-y-4">
            <Petit>Comment ça se passe</Petit>
            <h2 className="text-5xl sm:text-6xl font-normal">Une promesse, <em>quatre étapes.</em></h2>
          </div>
          <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {ETAPES.map((e, i) => (
              <li key={e.titre} className="space-y-3">
                <span className="font-[family-name:var(--titres)] text-5xl italic text-[var(--accent-texte)] [font-variant-numeric:lining-nums]">{i + 1}.</span>
                <h3 className="text-2xl font-normal">{e.titre}</h3>
                <p className="leading-relaxed text-[var(--doux)]">{e.texte}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5. Les voyages promis */}
      <section className="mx-auto max-w-6xl space-y-10 px-5 py-16 sm:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl space-y-4">
            <Petit>Les voyages promis</Petit>
            <h2 className="text-5xl sm:text-6xl font-normal">Ceux qu&apos;on <em>repousse le plus.</em></h2>
          </div>
          <Link href={`${DOSSIER}/voyages`} className="font-semibold underline underline-offset-[6px]">Les six voyages, en détail</Link>
        </div>
        <ul className="grid gap-6 md:grid-cols-3">
          {VOYAGES.filter((v) => v.photo).map((v) => {
            const p = photos[v.photo!];
            return (
              <li key={v.id} className="space-y-3">
                <Image src={p.src} width={p.largeur} height={p.hauteur} alt={p.alt} sizes="(min-width: 768px) 360px, 100vw" className="aspect-[4/5] w-full rounded-t-full object-cover" />
                <h3 className="text-3xl font-normal">{v.nom}</h3>
                <p className="text-[var(--doux)]">{v.pourquoi[0].toUpperCase() + v.pourquoi.slice(1)} · {v.duree}</p>
                <p className="font-semibold [font-variant-numeric:lining-nums]">Budget exemple : {euros(v.budget)} pour deux</p>
              </li>
            );
          })}
        </ul>
      </section>

      {/* 6. L'affiche */}
      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:py-24 md:grid-cols-2 md:items-center">
          <div className="mx-auto w-full max-w-sm rotate-[-3deg] bg-[var(--fond)] p-8 text-[var(--encre)] shadow-[0_40px_60px_-40px_rgba(0,0,0,0.9)]">
            <p className="font-[family-name:var(--titres)] text-5xl leading-[1.02]">
              Tu avais dit «&nbsp;un jour&nbsp;». <em className="text-[var(--accent-texte)]">C&apos;est quand&nbsp;?</em>
            </p>
            <p className="mt-10 text-xs font-semibold uppercase tracking-[0.22em]">Parole Tenue · voyages</p>
          </div>
          <div className="space-y-5">
            <Petit clair>Notre affiche</Petit>
            <h2 className="text-4xl sm:text-5xl font-normal">Une seule question, <em className="text-[#F2A58E]">partout.</em></h2>
            <p className="text-lg leading-relaxed text-[#E8EFEC]">Sur les quais, dans les halls, au dos des cartes postales. Et une réponse sur le site : une date.</p>
          </div>
        </div>
      </section>

      {/* 7. Le mur de la vitrine */}
      <section id="mur" className="scroll-mt-16 mx-auto max-w-6xl space-y-10 px-5 py-16 sm:py-24">
        <div className="max-w-2xl space-y-4">
          <Petit>Dans la vitrine</Petit>
          <h2 className="text-5xl sm:text-6xl font-normal">Le mur des <em className="text-[var(--accent-texte)]">voyages promis.</em></h2>
          <p className="text-lg leading-relaxed">Les passants y écrivent le leur, sur un billet d&apos;avion en papier. Ici aussi.</p>
        </div>
        <Mur />
      </section>

      {/* 8. Une agence qu'on peut vérifier */}
      <section className="mx-auto max-w-6xl px-5 pb-16">
        <div className="grid gap-8 rounded-[6px] border-2 border-[var(--encre)] bg-[var(--carte)] p-6 sm:p-10 md:grid-cols-[1fr_1.2fr]">
          <div className="space-y-4">
            <Petit>Une promesse, ça se garantit</Petit>
            <h2 className="text-4xl sm:text-5xl font-normal">Immatriculée, <em>garantie, assurée.</em></h2>
            <p className="leading-relaxed text-[var(--doux)]">
              Si l&apos;agence fait défaut, sa garantie financière sert à rembourser les sommes versées.
              Atout France publie la liste des agences immatriculées.
            </p>
          </div>
          <dl className="grid gap-3 text-sm">
            {MENTIONS_TOURISME.map((m) => (
              <div key={m.libelle} className="border-t border-[var(--trait)] pt-3"><dt className="font-semibold">{m.libelle}</dt><dd className="text-[var(--doux)]">{m.valeur}</dd></div>
            ))}
          </dl>
        </div>
      </section>

      {/* 9. Questions */}
      <section className="mx-auto grid max-w-6xl gap-10 px-5 pb-16 sm:pb-24 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-4">
          <Petit>Questions</Petit>
          <h2 className="text-5xl sm:text-6xl font-normal">Avant de <em>promettre.</em></h2>
        </div>
        <ul className="divide-y-2 divide-[var(--trait)] border-y-2 border-[var(--encre)]">
          {FAQ.map((x) => (
            <li key={x.q}>
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                  {x.q}
                  <span aria-hidden="true" className="font-[family-name:var(--titres)] text-3xl transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="pb-6 pr-8 leading-relaxed text-[var(--doux)]">{x.r}</p>
              </details>
            </li>
          ))}
        </ul>
      </section>

      {/* 10. C'est quand ? */}
      <section className="bg-[#F3EAD8] border-t-2 border-[var(--encre)]">
        <div className="mx-auto max-w-4xl space-y-6 px-5 py-16 text-center sm:py-24">
          <h2 className="text-5xl sm:text-7xl font-normal">C&apos;est <em className="text-[var(--accent-texte)]">quand&nbsp;?</em></h2>
          <p className="mx-auto max-w-xl text-lg leading-relaxed">Trois réponses, une date. Le reste se construit au rendez-vous.</p>
          <Link href="#promesse" className="inline-flex min-h-13 items-center justify-center rounded-full bg-[var(--accent)] px-8 font-semibold text-[var(--sur-accent)]">
            Écrire ma promesse
          </Link>
        </div>
      </section>
    </main>
  );
}
