import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { CONTACT, DOSSIER, ESSENCES, PHOTOS, euros, metres } from "./_composants/donnees";
import { Branche, Faq, Passeport, Surtitre } from "./_composants/Elements";
import Ombre from "./_composants/Ombre";

// Le site de la marque imaginée dans la vidéo « Si je devais créer une pépinière de
// zéro » : on glisse les années, l'arbre grandit et son ombre arrive sur la terrasse.
// Premier écran inspiré du modèle « Evergreen Finance » de MotionSites : un grand
// titre centré, des arbres au trait de part et d'autre, des cartes posées sur l'image.
export const metadata: Metadata = {
  title: "Ombre Lente — site de démonstration",
  description:
    "Site de démonstration d'une pépinière imaginaire, réalisé par Canevas Havane : glisse les années, ton arbre grandit, et son ombre arrive sur ta terrasse.",
  ...adressesDeLaPage("/exemples/ombre-lente"),
};

const ETAPES = [
  ["Novembre", "On arrache ton arbre pendant son repos. Racines nues, enveloppées, étiquetées."],
  ["La semaine suivante", "Il arrive avec son passeport phytosanitaire, son tuteur et une fiche de plantation."],
  ["Les deux premiers étés", "Un arrosoir par semaine quand il fait sec. Ensuite, il se débrouille."],
  ["Vingt ans plus tard", "Tu déjeunes dessous. Et tu nous envoies la photo."],
];

export default function OmbreLente() {
  return (
    <main>
      {/* Ouverture : le titre centré, les branches au trait, l'image et ses cartes. */}
      <section className="relative overflow-hidden">
        <Branche className="pointer-events-none absolute -left-10 top-10 hidden w-56 md:block" />
        <Branche className="pointer-events-none absolute -right-10 top-10 hidden w-56 md:block" miroir />
        <div className="mx-auto max-w-3xl px-5 pb-10 pt-12 text-center sm:pt-20">
          <Surtitre>Pépinière d&apos;arbres d&apos;ombrage</Surtitre>
          <h1 className="mt-5 text-[58px] font-normal leading-[0.98] tracking-[-0.01em] sm:text-[88px]">
            L&apos;ombre de dans <span className="italic text-[var(--accent-texte)]">vingt&nbsp;ans.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-md text-[18px] leading-relaxed text-[var(--doux)]">
            On ne vend pas des arbres. On vend l&apos;ombre que tu auras sur ta terrasse, un été de 2046.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="#ombre" className="rounded-full bg-[var(--accent)] px-6 py-3.5 font-semibold text-[var(--sur-accent)]">Glisse les années</a>
            <Link href={`${DOSSIER}/arbres`} className="rounded-full border border-[var(--encre)] px-6 py-3.5 font-semibold">Nos quatre arbres</Link>
          </div>
        </div>
        <div className="relative mx-auto max-w-5xl px-5 sm:px-8">
          <div className="overflow-hidden rounded-[36px]">
            <Image src={PHOTOS.arbreSeul.src} alt={PHOTOS.arbreSeul.alt} width={PHOTOS.arbreSeul.largeur} height={PHOTOS.arbreSeul.hauteur} priority sizes="(min-width: 1024px) 960px, 92vw" className="h-[340px] w-full object-cover object-[50%_40%] sm:h-[480px]" />
          </div>
          <div className="relative -mt-16 grid grid-cols-2 gap-3 px-3 sm:-mt-20 sm:px-10">
            <div className="rounded-[22px] border border-[var(--trait)] bg-[var(--carte)] p-4 shadow-[0_20px_40px_-28px_rgba(31,58,43,0.5)] sm:p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--doux)]">An 1</p>
              <p className="mt-1 font-[family-name:var(--titres)] text-[30px] leading-none">un bâton</p>
              <p className="mt-2 text-[13px] text-[var(--doux)]">1,5 m · exemple</p>
            </div>
            <div className="rounded-[22px] bg-[var(--sombre)] p-4 text-[var(--sur-sombre)] shadow-[0_20px_40px_-28px_rgba(31,58,43,0.5)] sm:p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#D9A441]">An 20</p>
              <p className="mt-1 font-[family-name:var(--titres)] text-[30px] leading-none">tu déjeunes dessous</p>
              <p className="mt-2 text-[13px] text-[#C9D3B8]">9 m · exemple</p>
            </div>
          </div>
        </div>
      </section>

      {/* L'outil de la vidéo. */}
      <section id="ombre" className="scroll-mt-20">
        <div className="mx-auto grid max-w-5xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            <Surtitre>Ton arbre, dans le temps</Surtitre>
            <h2 className="text-[48px] font-normal sm:text-6xl">Glisse <span className="italic">les années.</span></h2>
            <p className="text-[17px] leading-relaxed text-[var(--doux)]">
              Ton arbre grandit. Et son ombre de fin d&apos;après-midi avance, été après été, jusqu&apos;à ta terrasse.
            </p>
            <p className="hidden text-[14px] leading-relaxed text-[var(--doux)] lg:block">
              Une simulation d&apos;exemple : une croissance moyenne, en bon sol. Ton arbre fera peut-être mieux,
              peut-être moins bien. On préfère te le dire.
            </p>
          </div>
          <Ombre />
        </div>
      </section>

      {/* Le manifeste. */}
      <section className="bg-[var(--carte)]">
        <div className="mx-auto grid max-w-5xl gap-10 px-5 py-20 sm:px-8 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div className="space-y-6">
            <Surtitre>Pourquoi « lente »</Surtitre>
            <p className="font-[family-name:var(--titres)] text-[40px] leading-[1.08] sm:text-5xl">
              Un arbre, ça prend son temps. On ne fait pas semblant du contraire.
            </p>
            <p className="text-[17px] leading-relaxed text-[var(--doux)]">
              Pas de promesse de croissance express, pas d&apos;arbre de 4 mètres livré en camion-grue. Un jeune arbre,
              planté en novembre, qui s&apos;installe. Un arbre planté jeune reprend mieux, et rattrape souvent les grands.
            </p>
          </div>
          <div className="overflow-hidden rounded-[36px]">
            <Image src={PHOTOS.feuilles.src} alt={PHOTOS.feuilles.alt} width={PHOTOS.feuilles.largeur} height={PHOTOS.feuilles.hauteur} sizes="(min-width: 768px) 420px, 92vw" className="h-auto w-full" />
          </div>
        </div>
      </section>

      {/* An 1, an 20. */}
      <section>
        <div className="mx-auto grid max-w-5xl gap-10 px-5 py-20 sm:px-8 md:grid-cols-2 md:items-center">
          <div className="order-2 space-y-8 md:order-1">
            <div className="space-y-2 border-b border-[var(--trait)] pb-8">
              <p className="font-[family-name:var(--titres)] text-[72px] leading-none text-[var(--accent-texte)]">An 1</p>
              <p className="text-[22px]">Un bâton, et un tuteur.</p>
            </div>
            <div className="space-y-2">
              <p className="font-[family-name:var(--titres)] text-[72px] leading-none text-[var(--accent-texte)]">An 20</p>
              <p className="text-[22px]">Tu déjeunes dessous.</p>
              <p className="text-[14px] text-[var(--doux)]">La hauteur à vingt ans dépend de l&apos;essence, du sol et de la taille.</p>
            </div>
          </div>
          <div className="order-1 mx-auto w-full max-w-[380px] overflow-hidden rounded-[200px_200px_36px_36px] md:order-2">
            <Image src={PHOTOS.tableOmbre.src} alt={PHOTOS.tableOmbre.alt} width={PHOTOS.tableOmbre.largeur} height={PHOTOS.tableOmbre.hauteur} sizes="(min-width: 768px) 380px, 90vw" className="h-auto w-full" />
          </div>
        </div>
      </section>

      {/* Les essences. */}
      <section className="border-y border-[var(--trait)] bg-[#EAE2CF]">
        <div className="mx-auto max-w-5xl space-y-10 px-5 py-20 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div className="space-y-4">
              <Surtitre>Nos arbres</Surtitre>
              <h2 className="text-[44px] font-normal sm:text-5xl">Quatre ombres <span className="italic">différentes.</span></h2>
            </div>
            <Link href={`${DOSSIER}/arbres`} className="font-semibold underline underline-offset-4">Voir les quatre</Link>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {ESSENCES.map((e) => (
              <li key={e.slug}>
                <Link href={`${DOSSIER}/arbres/${e.slug}`} className="flex h-full items-start justify-between gap-4 rounded-[26px] bg-[var(--carte)] p-6">
                  <span className="space-y-1.5">
                    <span className="block font-[family-name:var(--titres)] text-[30px] leading-tight">{e.nom}</span>
                    <span className="block text-[14px] italic text-[var(--doux)]">{e.latin}</span>
                    <span className="block pt-2 text-[15px] leading-relaxed">{e.phrase}</span>
                  </span>
                  <span className="shrink-0 text-right">
                    <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--doux)]">À 20 ans</span>
                    <span className="block text-2xl font-bold tabular-nums">~{metres(e.vingt)}</span>
                    <span className="block text-[12px] text-[var(--doux)]">exemple</span>
                    <span className="mt-3 block text-[15px] font-semibold tabular-nums">{euros(e.prix)} TTC</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Le passeport : la loi, montrée sur chaque fiche. */}
      <section id="passeport" className="scroll-mt-20">
        <div className="mx-auto max-w-5xl space-y-10 px-5 py-20 sm:px-8">
          <div className="max-w-2xl space-y-5">
            <Surtitre>Le passeport</Surtitre>
            <h2 className="text-[44px] font-normal sm:text-5xl">Chaque arbre expédié part avec son passeport.</h2>
            <p className="text-[17px] leading-relaxed text-[var(--doux)]">
              C&apos;est la loi : tout arbre vendu à distance voyage avec son passeport phytosanitaire, et toutes les
              pépinières qui expédient y sont tenues. On le montre sur chaque fiche, tel que tu le recevras.
            </p>
            <p className="text-[14px] text-[var(--doux)]">Règlement (UE) 2016/2031, articles 79, 81 et 83 · valeurs d&apos;exemple</p>
          </div>
          <Passeport latin="Tilia cordata" lot="2026-12" />
        </div>
      </section>

      {/* L'affiche du lancement. */}
      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto max-w-4xl px-5 py-24 text-center sm:px-8">
          <p className="font-[family-name:var(--titres)] text-[44px] leading-[1.05] sm:text-7xl">
            Le meilleur moment pour planter un arbre, c&apos;était il y a <span className="italic text-[#D9A441]">vingt ans.</span>
          </p>
          <p className="mt-8 text-[20px]">Le deuxième, c&apos;est maintenant.</p>
          <p className="mt-3 text-[13px] text-[#C9D3B8]">Proverbe, souvent dit chinois, d&apos;origine incertaine.</p>
        </div>
      </section>

      {/* Le film de vingt ans. */}
      <section>
        <div className="mx-auto grid max-w-5xl gap-8 px-5 py-20 sm:px-8 md:grid-cols-2 md:items-center">
          <div className="space-y-5">
            <Surtitre>Une photo par an</Surtitre>
            <h2 className="text-[44px] font-normal sm:text-5xl">Dans vingt ans, ça fait <span className="italic">un film.</span></h2>
            <p className="text-[17px] leading-relaxed text-[var(--doux)]">
              Chaque année, à la date anniversaire de ta plantation, tu prends ton arbre en photo, du même endroit. On te
              rappelle la date. Au bout de vingt ans, on monte le film.
            </p>
            <Link href={`${DOSSIER}/vingt-ans`} className="inline-block rounded-full border border-[var(--encre)] px-6 py-3.5 font-semibold">Voir comment ça marche</Link>
          </div>
          <ol className="grid grid-cols-4 gap-2" aria-label="Quatre photos du même arbre, en dessin">
            {[0, 5, 10, 20].map((k, i) => (
              <li key={k} className="space-y-2 text-center">
                <div className="flex aspect-[3/4] items-end justify-center rounded-[14px] bg-[#EAF0E2] pb-3">
                  <span aria-hidden="true" className="block rounded-full bg-[#4E6E3A]" style={{ width: `${12 + i * 14}px`, height: `${12 + i * 14}px`, marginBottom: `${6 + i * 6}px` }} />
                </div>
                <p className="text-[13px] font-semibold tabular-nums">{2026 + k}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* La méthode. */}
      <section className="bg-[var(--carte)] border-y border-[var(--trait)]">
        <div className="mx-auto max-w-5xl space-y-10 px-5 py-20 sm:px-8">
          <div className="max-w-xl space-y-4">
            <Surtitre>Comment ça se passe</Surtitre>
            <h2 className="text-[44px] font-normal sm:text-5xl">Lentement, et dans l&apos;ordre.</h2>
          </div>
          <ol className="grid gap-px overflow-hidden rounded-[26px] border border-[var(--trait)] bg-[var(--trait)] sm:grid-cols-2">
            {ETAPES.map(([t, d], i) => (
              <li key={t} className="space-y-2 bg-[var(--carte)] p-7">
                <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[var(--accent-texte)]">Étape {i + 1}</p>
                <h3 className="text-[30px] font-normal">{t}</h3>
                <p className="leading-relaxed text-[var(--doux)]">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Questions. */}
      <section>
        <div className="mx-auto grid max-w-5xl gap-10 px-5 py-20 sm:px-8 md:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-4">
            <Surtitre>Questions</Surtitre>
            <h2 className="text-[44px] font-normal sm:text-5xl">Avant de planter.</h2>
          </div>
          <Faq />
        </div>
      </section>

      {/* Nous trouver. */}
      <section id="contact" className="scroll-mt-20 bg-[#EAE2CF]">
        <div className="mx-auto max-w-3xl space-y-6 px-5 py-20 text-center sm:px-8">
          <Surtitre>Nous trouver</Surtitre>
          <h2 className="text-[44px] font-normal sm:text-5xl">Viens voir les rangs.</h2>
          <p className="text-[17px] leading-relaxed text-[var(--doux)]">
            On te montre les arbres de la saison, et on t&apos;aide à choisir la place du tien : l&apos;ombre, le voisin,
            les racines.
          </p>
          <dl className="mx-auto grid max-w-xl gap-4 text-left sm:grid-cols-3">
            {[["Adresse", CONTACT.adresse], ["Ouvert", CONTACT.horaires], ["Téléphone", CONTACT.telephone]].map(([t, d]) => (
              <div key={t} className="rounded-[20px] bg-[var(--carte)] p-5">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--doux)]">{t}</dt>
                <dd className="mt-1 font-semibold">{d}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </main>
  );
}
