import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import Composeur from "./_composants/Composeur";
import { DessinProduit } from "./_composants/Dessins";
import Ingredients from "./_composants/Ingredients";
import { COMPOSITIONS, DOSSIER, QUESTIONS_FREQUENTES, boutique, photos, produits, type Budget, type Gout } from "./_composants/donnees";

// Le site imaginé dans la vidéo « Si je devais remplir le carnet de commandes d'une
// épicerie fine » : l'épicerie ne vend pas trois cents produits, elle répond à une
// question — « on apporte quoi ? ». Trois questions, le coffret composé, commandé le
// matin, prêt le soir ; et la dégustation d'huiles d'olive, un samedi par mois.
// Mise en page inspirée du modèle « Editorial Collection CTA » de MotionSites
// (titre mi-romain mi-italique, beaucoup d'air, l'objet posé en bas) : transposée,
// pas copiée.
export const metadata: Metadata = {
  title: "On Apporte Quoi — site de démonstration",
  description: "Site de démonstration d'une épicerie fine imaginaire, réalisé par Canevas Havane : trois questions, et le coffret à apporter quand on est invité, prêt le soir même.",
  ...adressesDeLaPage("/exemples/on-apporte-quoi"),
};

const VITRINE: { gout: Gout; budget: Budget }[] = [
  { gout: "lesDeux", budget: 35 },
  { gout: "sucre", budget: 20 },
  { gout: "sale", budget: 50 },
];

const ETAPES = [
  { titre: "Tu réponds à trois questions", texte: "Combien vous serez, ce qu'ils aiment, ce que tu veux dépenser. Trente secondes, pas un catalogue." },
  { titre: "On compose le coffret", texte: "Deux à cinq produits qui vont ensemble, choisis pour ta soirée, avec leurs ingrédients et leurs allergènes sous les yeux." },
  { titre: "Tu passes le chercher à 18 h", texte: "Commandé avant midi, il t'attend le soir même, fermé d'une ficelle, avec ta carte glissée sous le ruban." },
];

export default function OnApporteQuoi() {
  return (
    <div>
      {/* 1 — La question, et l'outil qui y répond. */}
      <section id="composer" className="scroll-mt-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 pb-16 pt-10 sm:pt-16 lg:grid-cols-[1fr_1.05fr] lg:gap-16 lg:pb-24">
          <div className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent-texte)]">Épicerie fine · retrait le soir même</p>
            <h1 className="text-[3.4rem] font-medium tracking-[-0.02em] sm:text-7xl lg:text-[5.4rem]">
              <span className="block text-[1.6rem] font-normal tracking-normal sm:text-3xl">Invité ce soir&nbsp;?</span>
              On apporte <em className="font-normal text-[var(--accent-texte)]">quoi&nbsp;?</em>
            </h1>
            <p className="max-w-md text-lg leading-relaxed">
              Pas trois cents produits à faire défiler. Trois questions, et le coffret
              qu&apos;on apporterait à ta place, prêt à 18&nbsp;h.
            </p>
            <div aria-hidden="true" className="hidden items-end gap-2 border-b-[6px] border-[#C8A06A] pt-8 lg:flex">
              {(["huile", "miel", "sables", "tapenade", "nougat", "fleurDeSel"] as const).map((cle) => (
                <DessinProduit key={cle} dessin={produits[cle].dessin} teinte={produits[cle].teinte} className="h-24 w-[4.5rem]" />
              ))}
            </div>
          </div>
          <Composeur />
        </div>
      </section>

      {/* 2 — Trois engagements, en bandeau. */}
      <section aria-label="Nos engagements" className="border-y border-[var(--trait)] bg-[var(--carte)]">
        <ul className="mx-auto grid max-w-6xl divide-y divide-[var(--trait)] px-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {[
            ["Trois questions", "pas trois cents produits"],
            [`Commandé avant ${boutique.limite}`, `prêt à ${boutique.retrait}`],
            ["Ingrédients et allergènes", "affichés avant de commander"],
          ].map(([a, b]) => (
            <li key={a} className="py-6 sm:px-6 sm:first:pl-0">
              <p className="font-[family-name:var(--titres)] text-2xl font-semibold">{a}</p>
              <p className="text-[var(--doux)]">{b}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* 3 — Le parti pris. */}
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:py-28 md:grid-cols-[0.9fr_1.1fr] md:items-center">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] md:order-2">
          <Image src={photos.coffret.src} alt={photos.coffret.alt} fill sizes="(min-width: 768px) 560px, 100vw" className="object-cover" />
        </div>
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent-texte)]">Notre parti pris</p>
          <h2 className="text-4xl font-medium sm:text-5xl">
            On ne vend pas des produits. On vend la réponse à <em className="font-normal">une question.</em>
          </h2>
          <p className="text-lg leading-relaxed">
            Un soir de dîner, personne n&apos;a envie de comparer trois cents pots. On se
            demande seulement quoi apporter, pour qui, et combien mettre. C&apos;est la
            seule chose que notre site te demande.
          </p>
          <p className="text-lg leading-relaxed">
            Derrière le comptoir, on goûte tout ce qu&apos;on vend. Un coffret, c&apos;est
            notre avis, emballé.
          </p>
        </div>
      </section>

      {/* 4 — Comment ça se passe. */}
      <section className="bg-[var(--carte)]">
        <div className="mx-auto max-w-6xl space-y-12 px-5 py-20 sm:py-28">
          <h2 className="max-w-2xl text-4xl font-medium sm:text-5xl">
            Du matin <em className="font-normal">au soir.</em>
          </h2>
          <ol className="grid gap-10 md:grid-cols-3">
            {ETAPES.map((e, i) => (
              <li key={e.titre} className="space-y-3 border-t-2 border-[var(--encre)] pt-5">
                <p className="font-[family-name:var(--titres)] text-6xl font-light text-[var(--accent-texte)] [font-variant-numeric:lining-nums]">{i + 1}</p>
                <h3 className="text-2xl font-semibold">{e.titre}</h3>
                <p className="leading-relaxed text-[var(--doux)]">{e.texte}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5 — Quelques coffrets. */}
      <section className="mx-auto max-w-6xl space-y-10 px-5 py-20 sm:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent-texte)]">Les coffrets</p>
            <h2 className="text-4xl font-medium sm:text-5xl">Neuf coffrets, <em className="font-normal">pas un de plus.</em></h2>
          </div>
          <Link href={`${DOSSIER}/coffrets`} className="min-h-11 rounded-full border-2 border-[var(--encre)] px-5 py-2.5 font-semibold">
            Voir les neuf, avec leurs ingrédients
          </Link>
        </div>
        <ul className="grid gap-5 md:grid-cols-3">
          {VITRINE.map(({ gout, budget }) => {
            const c = COMPOSITIONS[gout][budget];
            return (
              <li key={c.nom} className="flex h-full flex-col gap-5 rounded-[28px] border border-[var(--trait)] bg-[var(--carte)] p-6">
                <div className="flex items-end justify-center gap-1 rounded-2xl bg-[#EFE6D3] px-4 pt-6">
                  {c.contenu.map((cle) => (
                    <DessinProduit key={cle} dessin={produits[cle].dessin} teinte={produits[cle].teinte} className="h-20 w-14" />
                  ))}
                </div>
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-2xl font-semibold">{c.nom}</h3>
                  <p className="whitespace-nowrap font-[family-name:var(--titres)] text-2xl font-semibold [font-variant-numeric:lining-nums]">{budget} €</p>
                </div>
                <p className="text-[var(--doux)]">{c.contenu.map((k) => produits[k].nom).join(" · ")}</p>
                <p className="mt-auto text-xs font-semibold uppercase tracking-[0.12em] text-[var(--doux)]">TTC · prix d&apos;exemple</p>
              </li>
            );
          })}
        </ul>
      </section>

      {/* 6 — Le petit mot. */}
      <section className="bg-[#EFE6D3]">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:py-28 md:grid-cols-2 md:items-center">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent-texte)]">Le petit mot</p>
            <h2 className="text-4xl font-medium sm:text-5xl">
              Tu tapes la phrase. <em className="font-normal">On l&apos;écrit à la main.</em>
            </h2>
            <p className="text-lg leading-relaxed">
              Une carte glissée sous le ruban, recopiée à la plume au comptoir. Cent quarante
              signes : de quoi dire merci, pas de quoi écrire un discours.
            </p>
          </div>
          <div className="relative mx-auto w-full max-w-sm">
            <div className="relative aspect-[3/4] overflow-hidden rounded-[28px]">
              <Image src={photos.miel.src} alt={photos.miel.alt} fill sizes="(min-width: 768px) 384px, 90vw" className="object-cover" />
            </div>
            <p className="absolute -bottom-8 -left-2 max-w-[16rem] -rotate-3 rounded-md bg-[#FFFDF8] px-6 py-5 font-[family-name:var(--f-caveat)] text-[1.75rem] leading-tight text-[#2A2118] shadow-[0_18px_40px_-20px_rgba(42,33,24,0.7)] sm:-left-10">
              Merci pour ce dîner. On rapporte le plat la prochaine fois&nbsp;!
            </p>
          </div>
        </div>
      </section>

      {/* 7 — Ce qu'il y a dedans. */}
      <section className="mx-auto grid max-w-6xl gap-12 px-5 pb-20 pt-28 sm:pb-28 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent-texte)]">Avant de commander</p>
          <h2 className="text-4xl font-medium sm:text-5xl">Ce qu&apos;il y a dedans, <em className="font-normal">sous tes yeux.</em></h2>
          <p className="text-lg leading-relaxed">
            Chaque produit du coffret affiche son poids, sa liste d&apos;ingrédients et ses
            allergènes, en gras, avant le bouton « Commander ». Si un invité ne mange pas
            de blé ou de fruits à coque, tu le vois tout de suite, et on remplace.
          </p>
          <article className="space-y-2 rounded-2xl border border-[var(--trait)] bg-[var(--carte)] p-5">
            <p className="flex items-baseline justify-between gap-4">
              <span className="font-[family-name:var(--titres)] text-xl font-semibold">{produits.sables.nom}</span>
              <span className="text-sm text-[var(--doux)] [font-variant-numeric:lining-nums]">{produits.sables.poids}</span>
            </p>
            <p className="leading-relaxed text-[var(--doux)]">
              Ingrédients : <Ingredients texte={produits.sables.ingredients} />
            </p>
            <p className="text-sm"><span className="font-semibold">Allergènes :</span> {produits.sables.allergenes.join(" · ")}</p>
          </article>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-[28px]">
          <Image src={photos.sables.src} alt={photos.sables.alt} fill sizes="(min-width: 768px) 480px, 100vw" className="object-cover" />
        </div>
      </section>

      {/* 8 — La dégustation. */}
      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:py-28 md:grid-cols-2 md:items-center">
          <div className="relative aspect-[3/2] overflow-hidden rounded-[28px]">
            <Image src={photos.huile.src} alt={photos.huile.alt} fill sizes="(min-width: 768px) 560px, 100vw" className="object-cover" />
          </div>
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#E9C46A]">Un samedi par mois</p>
            <h2 className="text-4xl font-medium sm:text-5xl">
              Samedi, on goûte <em className="font-normal">l&apos;huile d&apos;olive.</em>
            </h2>
            <p className="text-lg leading-relaxed">
              Quatre huiles, du pain, et ce qui les distingue. Vingt places autour de la
              table de l&apos;épicerie : c&apos;est ce qu&apos;elle tient, pas une de plus.
              Gratuit, sur inscription.
            </p>
            <Link href={`${DOSSIER}/degustations`} className="inline-flex min-h-12 items-center rounded-full bg-[#E9C46A] px-6 font-semibold text-[#2A2118]">
              Choisir mon samedi
            </Link>
          </div>
        </div>
      </section>

      {/* 9 — Questions. */}
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:py-28 md:grid-cols-[0.8fr_1.2fr]">
        <h2 className="text-4xl font-medium sm:text-5xl">
          Les questions <em className="font-normal">d&apos;avant.</em>
        </h2>
        <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
          {QUESTIONS_FREQUENTES.map((x) => (
            <li key={x.q}>
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                  {x.q}
                  <span aria-hidden="true" className="grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 border-[var(--trait)] text-xl transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="pb-6 pr-10 leading-relaxed text-[var(--doux)]">{x.r}</p>
              </details>
            </li>
          ))}
        </ul>
      </section>

      {/* 10 — Infos pratiques. */}
      <section id="infos" className="scroll-mt-16 border-t border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:py-24 md:grid-cols-3">
          <div className="space-y-4">
            <h2 className="text-4xl font-medium">La boutique</h2>
            <p className="leading-relaxed">
              {boutique.adresse}
              <br />
              <span className="text-[var(--doux)]">Retrait des coffrets au comptoir</span>
            </p>
            <p>
              <a href={`tel:${boutique.telephone.replace(/ /g, "")}`} className="text-xl font-semibold underline underline-offset-4 [font-variant-numeric:lining-nums]">
                {boutique.telephone}
              </a>
            </p>
          </div>
          <dl className="space-y-3">
            {boutique.horaires.map((h) => (
              <div key={h.jours} className="flex justify-between gap-4 border-b border-[var(--trait)] pb-3">
                <dt className="font-semibold">{h.jours}</dt>
                <dd className="text-[var(--doux)] [font-variant-numeric:lining-nums]">{h.heures}</dd>
              </div>
            ))}
          </dl>
          <div className="space-y-4 rounded-[28px] bg-[var(--accent)] p-6 text-[var(--sur-accent)]">
            <p className="font-[family-name:var(--titres)] text-3xl font-medium leading-tight">
              Invité ce soir&nbsp;? Il est encore temps.
            </p>
            <Link href={`${DOSSIER}#composer`} className="inline-flex min-h-12 items-center rounded-full bg-[var(--sur-accent)] px-6 font-semibold text-[var(--encre)]">
              Composer mon coffret
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
