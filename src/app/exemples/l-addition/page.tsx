import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, euros, marque, photos, produits, questions, tailles, ttc } from "./_composants/donnees";
import Addition from "./_composants/Addition";
import Jeudi from "./_composants/Jeudi";

// Le site imaginé dans la vidéo « Si je devais remplir le carnet de commandes d'une
// marque de vêtements » : pas de promo, pas de compte à rebours. Sur chaque fiche,
// l'addition (le prix décomposé), le jour de livraison et le vrai stock. Ouverture
// inspirée du modèle « Orla Fashion » de MotionSites (un nom immense en haut à gauche,
// une colonne de liens fine, une phrase courte, le produit en grand), transposée à une
// marque de jeans — sans mannequin : le vêtement seul.
export const metadata: Metadata = {
  title: "L'Addition — site de démonstration",
  description: "Site de démonstration d'une marque de vêtements imaginaire, réalisé par Canevas Havane : pas de promo, le prix décomposé ligne par ligne, une date de livraison et le vrai stock.",
  ...adressesDeLaPage("/exemples/l-addition"),
};

const PAS_ICI = ["−20 % sur ta première commande", "Offre qui expire dans dix minutes", "Soldes, ventes privées, « dernières pièces »"];
const maxStock = Math.max(...tailles.map((t) => t.stock));

export default function LAddition() {
  return (
    <>
      {/* 1. L'ouverture. */}
      <section className="px-4 pb-12 pt-8 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-start justify-between gap-6">
            <h1 className="text-[64px] font-black leading-[0.86] tracking-[-0.05em] sm:text-[150px]">
              L&apos;Addi&shy;tion<span className="text-[var(--accent-texte)]">.</span>
            </h1>
            <ul className="hidden shrink-0 pt-3 text-right text-sm leading-6 sm:block">
              {produits.map((p) => (
                <li key={p.id}>
                  {p.nom} · {euros(ttc(p), false)}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-8 grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-end">
            <div className="space-y-6">
              <p className="max-w-sm text-xl leading-snug">
                Des jeans, des vestes, des chemises. Pas de promo. Sur chaque fiche, l&apos;addition :
                ce que tu paies, ligne par ligne.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href={`${DOSSIER}/jean-droit`} className="rounded-full bg-[var(--accent)] px-6 py-3.5 font-bold text-[var(--sur-accent)]">
                  Le jean droit · 120 € TTC
                </Link>
                <Link href="#addition" className="rounded-full border-2 border-[var(--encre)] px-6 py-3 font-bold">
                  Voir l&apos;addition
                </Link>
              </div>
            </div>
            <Image
              src={photos.pile.src}
              width={photos.pile.largeur}
              height={photos.pile.hauteur}
              alt={photos.pile.alt}
              sizes="(min-width: 768px) 660px, 100vw"
              priority
              className="aspect-[4/3] w-full rounded-[20px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* 2. Ce qu'on ne fait pas. */}
      <section className="bg-[var(--sombre)] px-5 py-16 text-[var(--sur-sombre)] sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:items-center">
          <h2 className="text-5xl font-black tracking-tight sm:text-6xl">Pas de promo. Jamais.</h2>
          <div className="space-y-4">
            <ul className="space-y-2 text-lg">
              {PAS_ICI.map((t) => (
                <li key={t} className="text-[#AFC3E0] line-through decoration-2">{t}</li>
              ))}
            </ul>
            <p className="text-[#C9D4E5]">
              Le prix est le même le 1er janvier et le 1er juillet. Si un vêtement doit baisser, il
              baisse pour tout le monde, pour de bon, et on dit pourquoi.
            </p>
          </div>
        </div>
      </section>

      {/* 3. L'addition. */}
      <section id="addition" className="scroll-mt-20 px-5 py-20 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="space-y-5">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--accent-texte)]">L&apos;addition</p>
            <h2 className="text-5xl font-black tracking-tight">Le prix, décomposé.</h2>
            <p className="text-lg leading-relaxed">
              La toile, la couture, les rivets, l&apos;envoi, la TVA. Et ce que la marque garde. Touche une
              ligne : elle te dit à quoi sert cet argent.
            </p>
            <Link href={`${DOSSIER}/pourquoi-ce-prix`} className="inline-block font-bold underline underline-offset-4">
              Pourquoi ce prix, ligne par ligne
            </Link>
          </div>
          <Addition choix />
        </div>
      </section>

      {/* 4. La question qu'on tape. */}
      <section className="border-y-2 border-[var(--encre)] bg-[var(--carte)] px-5 py-16 sm:px-6">
        <div className="mx-auto max-w-4xl space-y-6">
          <div className="flex items-center gap-3 rounded-full border-2 border-[var(--trait)] px-5 py-3 text-lg">
            <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" aria-hidden="true">
              <circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" strokeWidth="2.4" />
              <path d="M15.5 15.5 21 21" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
            </svg>
            <span>pourquoi le made in france est cher</span>
          </div>
          <h2 className="text-4xl font-black tracking-tight sm:text-5xl">La question qu&apos;on tape avant d&apos;acheter. La réponse est sur la fiche.</h2>
          <p className="text-lg leading-relaxed text-[var(--doux)]">
            Un vêtement coûte ce que coûtent sa toile, ses heures de couture et son envoi. On ne le
            cache pas derrière une étiquette : on l&apos;écrit. Recherche relevée sur Google le 15 octobre 2026.
          </p>
        </div>
      </section>

      {/* 5. Livré jeudi. */}
      <section className="px-5 py-20 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:items-center">
          <div className="space-y-5">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--accent-texte)]">La livraison</p>
            <h2 className="text-6xl font-black tracking-tight sm:text-7xl">
              Livré <span className="text-[var(--accent-texte)]">jeudi.</span>
            </h2>
            <p className="text-lg leading-relaxed">
              Pas « livraison rapide ». Un jour. On prépare le lundi, on expédie le mardi, ça arrive le
              jeudi. La date est écrite avant que tu commandes.
            </p>
          </div>
          <div className="rounded-[20px] bg-[var(--accent)] p-8 text-[var(--sur-accent)]">
            <p className="text-sm font-bold uppercase tracking-[0.18em]">Commandé aujourd&apos;hui</p>
            <p className="mt-3 font-[family-name:var(--titres)] text-4xl font-black tracking-tight">
              <Jeudi avant="Livré " apres="." />
            </p>
            <p className="mt-4 text-sm">Commande passée jusqu&apos;au lundi soir : livrée le jeudi de la même semaine.</p>
          </div>
        </div>
      </section>

      {/* 6. Le vrai stock. */}
      <section className="bg-[var(--carte)] px-5 py-20 sm:px-6">
        <div className="mx-auto max-w-6xl space-y-10">
          <div className="max-w-2xl space-y-4">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--accent-texte)]">Le stock</p>
            <h2 className="text-5xl font-black tracking-tight">Il en reste 14. Pour de vrai.</h2>
            <p className="text-lg leading-relaxed text-[var(--doux)]">
              Quand un modèle part vite, on le dit avec le vrai chiffre. Pas « dernières pièces » : le
              nombre, taille par taille. Voici le jean droit, en longueur 32.
            </p>
          </div>
          <ul className="grid grid-cols-7 items-end gap-2 sm:gap-4" aria-label="Stock du jean droit par taille, exemple">
            {tailles.map((t) => (
              <li key={t.taille} className="flex flex-col items-center gap-2">
                <span className="text-sm font-bold tabular-nums">{t.stock}</span>
                <span
                  aria-hidden="true"
                  className={`w-full rounded-t-md ${t.taille === "W32" ? "bg-[var(--accent)]" : "bg-[var(--trait)]"}`}
                  style={{ height: `${Math.max(4, (t.stock / maxStock) * 160)}px` }}
                />
                <span className="text-xs font-bold">{t.taille}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-[var(--doux)]">Stock d&apos;exemple. Sur le vrai site, celui de l&apos;entrepôt, mis à jour à chaque vente. Le W36 est épuisé : la page le dit.</p>
        </div>
      </section>

      {/* 7. Les vêtements. */}
      <section className="px-5 py-20 sm:px-6">
        <div className="mx-auto max-w-6xl space-y-10">
          <h2 className="text-5xl font-black tracking-tight">Trois vêtements. Trois additions.</h2>
          <ul className="grid gap-6 md:grid-cols-3">
            {produits.map((p, i) => (
              <li key={p.id} className="flex flex-col justify-between gap-6 rounded-[20px] border-2 border-[var(--encre)] p-6">
                <div className="space-y-2">
                  <p className="text-sm font-bold tabular-nums text-[var(--doux)]">0{i + 1}</p>
                  <h3 className="text-3xl font-black tracking-tight">{p.nom}</h3>
                  <p>{p.sous} · {p.composition}</p>
                </div>
                <div className="flex items-end justify-between gap-4">
                  <p className="text-2xl font-black tabular-nums">{euros(ttc(p))}</p>
                  {p.id === "jean" ? (
                    <Link href={`${DOSSIER}/jean-droit`} className="rounded-full bg-[var(--encre)] px-4 py-2 text-sm font-bold text-[var(--fond)]">La fiche</Link>
                  ) : (
                    <span className="text-xs text-[var(--doux)]">TTC · exemple</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 8. La toile. */}
      <section className="bg-[var(--sombre)] px-5 py-20 text-[var(--sur-sombre)] sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:items-center">
          <Image src={photos.toile.src} width={photos.toile.largeur} height={photos.toile.hauteur} alt={photos.toile.alt} sizes="(min-width: 768px) 560px, 100vw" className="aspect-[3/2] w-full rounded-[20px] object-cover" />
          <div className="space-y-5">
            <h2 className="text-5xl font-black tracking-tight">100 % coton. Écrit avant l&apos;achat.</h2>
            <p className="text-lg leading-relaxed text-[#C9D4E5]">
              La composition est sur chaque fiche, avant le bouton, et cousue dans chaque vêtement.
              « 100 % » seulement quand il n&apos;y a qu&apos;une fibre : ici, du coton, et rien d&apos;autre.
            </p>
            <dl className="divide-y divide-[#F7F6F2]/25 border-y border-[#F7F6F2]/25">
              {[
                ["Toile", "Denim 13,5 onces, brut, non lavé"],
                ["Fil", "Coton, couleur cuivre"],
                ["Entretien", "30 °C, à l'envers, pas de sèche-linge"],
              ].map(([t, d]) => (
                <div key={t} className="flex justify-between gap-6 py-3">
                  <dt className="font-bold">{t}</dt>
                  <dd className="text-right text-[#C9D4E5]">{d}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* 9. Questions. */}
      <section className="px-5 py-20 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <h2 className="text-5xl font-black tracking-tight">Les questions qu&apos;on nous pose.</h2>
          <div className="divide-y-2 divide-[var(--encre)] border-y-2 border-[var(--encre)]">
            {questions.map((x) => (
              <details key={x.q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-xl font-bold [&::-webkit-details-marker]:hidden">
                  {x.q}
                  <span aria-hidden="true" className="text-2xl transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="pt-3 leading-relaxed text-[var(--doux)]">{x.r}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Service client. */}
      <section className="px-5 pb-20 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 rounded-[20px] border-2 border-[var(--encre)] bg-[var(--carte)] p-8 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <h2 className="text-3xl font-black tracking-tight">Une question sur une taille&nbsp;?</h2>
            <p className="text-[var(--doux)]">{marque.horaires}, quelqu'un te répond au téléphone.</p>
          </div>
          <a href={`tel:${marque.telephoneLien}`} className="rounded-full bg-[var(--encre)] px-6 py-4 text-center text-xl font-bold tabular-nums text-[var(--fond)]">
            {marque.telephone}
          </a>
        </div>
      </section>
    </>
  );
}
