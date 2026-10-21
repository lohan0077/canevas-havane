import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { ARBRES, CONTACT, DOSSIER, PHOTOS, euros, recolteDe } from "./_composants/donnees";
import { Fruit } from "./_composants/Dessins";
import Recolte from "./_composants/Recolte";
import Passeport from "./_composants/Passeport";
import { Faq } from "./_composants/Pied";

// Le site imaginé dans la vidéo « Si je devais remplir le carnet de commandes d'une
// jardinerie » : on choisit son arbre, le site annonce l'été de la première récolte ;
// l'arbre part avec son passeport phytosanitaire, montré sur chaque fiche ; et tout
// le monde plante le 25 novembre. Premier écran inspiré du modèle « Cinematic
// Landing Page » de MotionSites (un grand titre posé au pied d'une photo plein cadre).
export const metadata: Metadata = {
  title: "Premier Fruit — site de démonstration",
  description:
    "Site de démonstration d'une pépinière imaginaire, réalisé par Canevas Havane : choisis ton arbre fruitier, le site t'annonce l'été de ta première récolte.",
  ...adressesDeLaPage("/exemples/premier-fruit"),
};

const DELAIS = [
  ["Figuier", "2 à 3 ans", "Été"],
  ["Abricotier", "2 à 4 ans", "Été"],
  ["Pommier", "2 à 5 ans", "Automne"],
  ["Cerisier", "3 à 5 ans", "Été"],
  ["Prunier", "3 à 5 ans", "Été"],
  ["Poirier", "3 à 6 ans", "Fin d'été"],
];

const PILIERS = [
  ["I", "Une année de récolte", "Chaque arbre affiche l'été de sa première récolte, estimé pour une plantation en novembre."],
  ["II", "Un passeport en photo", "Chaque arbre expédié voyage avec son passeport phytosanitaire. On te le montre avant l'achat."],
  ["III", "Un jour pour planter", "Livré le 24 novembre. Planté le 25, le jour de la Sainte-Catherine, avec tous les autres."],
];

const ETAPES = [
  ["Tu choisis", "Ton arbre, sa forme, et l'été où tu veux cueillir."],
  ["On arrache", "En novembre, quand l'arbre dort : racines nues, protégées, étiquetées."],
  ["Il voyage", "Avec son passeport phytosanitaire, un guide de plantation et un tuteur."],
  ["Tu plantes", "Le 25 novembre. Et tu nous envoies la photo, si tu veux."],
];

export default function PremierFruit() {
  return (
    <main>
      {/* Ouverture : la photo plein cadre, le titre en très grand à son pied. */}
      <section aria-labelledby="pf-titre">
        <div className="relative h-[calc(100svh-104px)] min-h-[540px] max-h-[880px] overflow-hidden bg-[var(--sombre)]">
          <Image src={PHOTOS.cerises.src} alt={PHOTOS.cerises.alt} fill priority sizes="100vw" className="object-cover object-[50%_35%]" />
          <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgba(46,26,22,0.55)_0%,rgba(46,26,22,0)_28%,rgba(46,26,22,0.15)_50%,rgba(46,26,22,0.94)_86%)]" />
          <div className="absolute inset-x-0 top-0 flex justify-between gap-4 px-5 pt-5 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#F8EDE0] sm:px-8">
            <span>Pépinière · arbres fruitiers</span>
            <span className="hidden sm:inline">Saison 2026 – 2027</span>
          </div>
          <div className="absolute inset-x-0 bottom-0 px-5 pb-7 sm:px-8 sm:pb-10">
            <div className="mx-auto max-w-6xl space-y-4">
              <p className="inline-block rounded-full bg-[#F8EDE0] px-4 py-1.5 text-[13px] font-semibold text-[var(--encre)]">
                Cerisier Burlat · récolte estimée : été 2029 · exemple
              </p>
              <h1 id="pf-titre" className="font-normal text-[#FBF3E8] text-[clamp(56px,15vw,190px)] leading-[0.9] tracking-[-0.01em]">
                <span className="whitespace-nowrap">La première</span> <span className="italic text-[#F2B5A8]">cerise.</span>
              </h1>
            </div>
          </div>
        </div>
        <div className="mx-auto grid max-w-6xl gap-6 px-5 py-10 sm:px-8 md:grid-cols-[1.4fr_1fr] md:items-end">
          <p className="text-[22px] leading-snug sm:text-[26px]">
            On ne vend pas un arbre. On vend la première cerise, et l&apos;été où tu la cueilleras.
          </p>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <a href="#recolte" className="rounded-full bg-[var(--accent)] px-6 py-3.5 font-semibold text-[var(--sur-accent)]">Je cueille quand ?</a>
            <Link href={`${DOSSIER}/arbres`} className="rounded-full border-2 border-[var(--encre)] px-6 py-3 font-semibold">Les arbres</Link>
          </div>
        </div>
      </section>

      {/* L'outil de la vidéo : l'arbre, et l'été de la première récolte. */}
      <section id="recolte" className="scroll-mt-20 border-t border-[var(--trait)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="space-y-5 lg:pt-6">
            <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[var(--accent-texte)]">Ton arbre</p>
            <h2 className="font-normal text-[46px] sm:text-6xl">Tu cueilles <span className="italic">quand&nbsp;?</span></h2>
            <p className="text-lg leading-relaxed text-[var(--doux)]">
              Choisis ton arbre : il grandit sous tes yeux, année après année, jusqu&apos;à l&apos;été de ta première
              récolte. Une estimation, variété par variété, pour un arbre planté en novembre.
            </p>
            <p className="hidden lg:block text-sm text-[var(--doux)]">
              Le délai dépend aussi du porte-greffe, du sol et de l&apos;entretien : on te le dit plutôt que de te le promettre.
            </p>
          </div>
          <Recolte />
        </div>
      </section>

      {/* Ce que la pépinière vend vraiment. */}
      <section className="bg-[var(--carte)] border-y border-[var(--trait)]">
        <ul className="mx-auto grid max-w-6xl divide-y divide-[var(--trait)] px-5 sm:px-8 md:grid-cols-3 md:divide-x md:divide-y-0">
          {PILIERS.map(([n, t, d]) => (
            <li key={n} className="space-y-3 py-9 md:px-8 md:first:pl-0 md:last:pr-0">
              <p className="font-[family-name:var(--titres)] text-5xl text-[var(--accent-texte)]">{n}</p>
              <h3 className="font-normal text-[28px]">{t}</h3>
              <p className="leading-relaxed text-[var(--doux)]">{d}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* La question que tout le monde se pose avant d'acheter un fruitier. */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <div className="space-y-5">
            <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[var(--accent-texte)]">La question</p>
            <h2 className="font-normal text-[40px] sm:text-5xl">Combien de temps avant les premiers fruits&nbsp;?</h2>
            <p className="text-lg leading-relaxed text-[var(--doux)]">
              C&apos;est ce que tout le monde se demande avant d&apos;acheter un fruitier. Voici l&apos;ordre de grandeur,
              après plantation d&apos;un jeune arbre greffé.
            </p>
          </div>
          <div className="rounded-[26px] border border-[var(--trait)] bg-[var(--carte)] p-2">
            <table className="w-full text-left">
              <caption className="sr-only">Délai avant les premiers fruits, par espèce</caption>
              <thead>
                <tr className="text-[12px] uppercase tracking-[0.14em] text-[var(--doux)]">
                  <th scope="col" className="px-4 py-3 font-semibold">Espèce</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Premiers fruits</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Saison</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--trait)]">
                {DELAIS.map(([e, d, s]) => (
                  <tr key={e}>
                    <th scope="row" className="px-4 py-3.5 font-semibold">{e}</th>
                    <td className="px-4 py-3.5 tabular-nums">{d}</td>
                    <td className="px-4 py-3.5 text-[var(--doux)]">{s}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="px-4 pb-3 pt-2 text-[13px] text-[var(--doux)]">
              Ordres de grandeur : la variété, le porte-greffe, la forme et le sol font varier le délai.
            </p>
          </div>
        </div>
      </section>

      {/* Le catalogue, chaque arbre avec son année. */}
      <section className="border-t border-[var(--trait)] bg-[#F1E6D6]">
        <div className="mx-auto max-w-6xl space-y-10 px-5 py-16 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div className="space-y-4">
              <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[var(--accent-texte)]">Nos arbres</p>
              <h2 className="font-normal text-[40px] sm:text-5xl">Six arbres, six étés.</h2>
            </div>
            <Link href={`${DOSSIER}/arbres`} className="font-semibold underline underline-offset-4">Tout le catalogue</Link>
          </div>
          <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
            {ARBRES.map((a) => (
              <li key={a.slug}>
                <Link href={`${DOSSIER}/arbres/${a.slug}`} className="group block h-full rounded-[22px] border border-[var(--trait)] bg-[var(--carte)] p-4 sm:p-6">
                  <Fruit fruit={a.fruit} className="h-20 w-20 sm:h-28 sm:w-28 transition-transform group-hover:-rotate-6" />
                  <p className="mt-3 font-[family-name:var(--titres)] text-[24px] leading-tight sm:text-3xl">{a.espece}</p>
                  <p className="text-[15px] text-[var(--doux)]">{a.variete}</p>
                  <p className="mt-3 text-[14px] font-semibold text-[var(--accent-texte)]">Récolte estimée : {recolteDe(a, "demi-tige").toLowerCase()}</p>
                  <p className="text-[14px] tabular-nums">dès {euros(a.prix.scion)} TTC · exemple</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Le passeport phytosanitaire : une obligation, montrée plutôt que cachée. */}
      <section id="passeport" className="scroll-mt-20 bg-[#E8D6BA]">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:items-center">
          <div className="space-y-5">
            <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#7E1621]">Le passeport</p>
            <h2 className="font-normal text-[40px] sm:text-5xl">Ton arbre voyage avec son passeport.</h2>
            <p className="text-lg leading-relaxed">
              Un arbre vendu à distance part toujours avec son passeport phytosanitaire : c&apos;est obligatoire, et
              toutes les pépinières qui expédient y sont tenues. Nous, on en montre la photo sur chaque fiche, pour que tu
              saches exactement ce que tu recevras.
            </p>
            <p className="text-[15px] leading-relaxed text-[#4F3B2F]">
              Règlement (UE) 2016/2031, articles 79, 81 et 83 : une étiquette au format commun, avec le nom botanique, la
              pépinière, le lot et le pays d&apos;origine.
            </p>
          </div>
          <Passeport latin="Prunus avium" lot="2026-47" />
        </div>
      </section>

      {/* Le rendez-vous de la Sainte-Catherine. */}
      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-6">
            <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#E8B9A8]">Mercredi 25 novembre 2026</p>
            <h2 className="font-normal text-[56px] leading-[0.95] sm:text-7xl">Le 25 novembre, on plante.</h2>
            <p className="font-[family-name:var(--titres)] text-[26px] italic leading-snug text-[#F2C9BE]">
              « À la Sainte-Catherine, tout bois prend racine. »
            </p>
            <p className="text-lg leading-relaxed">
              Ce jour-là, tous nos clients plantent leur arbre en même temps. Et ceux qui le veulent nous envoient la
              photo.
            </p>
            <Link href={`${DOSSIER}/sainte-catherine`} className="inline-block rounded-full bg-[#F8EDE0] px-6 py-3.5 font-semibold text-[var(--encre)]">
              Le rendez-vous du 25 novembre
            </Link>
          </div>
          <div className="relative mx-auto w-full max-w-[360px] overflow-hidden rounded-[200px_200px_24px_24px]">
            <Image src={PHOTOS.vergerNovembre.src} alt={PHOTOS.vergerNovembre.alt} width={PHOTOS.vergerNovembre.largeur} height={PHOTOS.vergerNovembre.hauteur} sizes="(min-width: 1024px) 360px, 90vw" className="h-auto w-full" />
          </div>
        </div>
      </section>

      {/* La méthode, de la pépinière au jardin. */}
      <section className="mx-auto max-w-6xl space-y-10 px-5 py-16 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-end">
          <div className="space-y-4">
            <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[var(--accent-texte)]">Comment ça marche</p>
            <h2 className="font-normal text-[40px] sm:text-5xl">De nos rangs à ton jardin.</h2>
          </div>
          <div className="overflow-hidden rounded-[26px]">
            <Image src={PHOTOS.pepiniere.src} alt={PHOTOS.pepiniere.alt} width={PHOTOS.pepiniere.largeur} height={PHOTOS.pepiniere.hauteur} sizes="(min-width: 1024px) 620px, 92vw" className="h-auto w-full" />
          </div>
        </div>
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ETAPES.map(([t, d], i) => (
            <li key={t} className="rounded-[22px] border border-[var(--trait)] bg-[var(--carte)] p-6 space-y-2">
              <p className="font-[family-name:var(--titres)] text-4xl text-[var(--accent-texte)] tabular-nums">0{i + 1}</p>
              <h3 className="font-normal text-2xl">{t}</h3>
              <p className="leading-relaxed text-[var(--doux)]">{d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Questions fréquentes. */}
      <section className="border-t border-[var(--trait)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-4">
            <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[var(--accent-texte)]">Questions</p>
            <h2 className="font-normal text-[40px] sm:text-5xl">Avant de planter.</h2>
          </div>
          <Faq />
        </div>
      </section>

      {/* Nous trouver. */}
      <section id="contact" className="scroll-mt-20 bg-[var(--carte)] border-t border-[var(--trait)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:items-center">
          <div className="overflow-hidden rounded-[26px]">
            <Image src={PHOTOS.arrosage.src} alt={PHOTOS.arrosage.alt} width={PHOTOS.arrosage.largeur} height={PHOTOS.arrosage.hauteur} sizes="(min-width: 1024px) 540px, 92vw" className="h-auto w-full" />
          </div>
          <div className="space-y-5">
            <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[var(--accent-texte)]">Nous trouver</p>
            <h2 className="font-normal text-[40px] sm:text-5xl">Ou viens le choisir sur place.</h2>
            <p className="text-lg leading-relaxed text-[var(--doux)]">
              La pépinière est ouverte pendant la saison de plantation. On te montre les rangs, tu choisis ton arbre, on
              l&apos;arrache devant toi.
            </p>
            <dl className="space-y-3 text-lg">
              <div><dt className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[var(--doux)]">Adresse</dt><dd>{CONTACT.adresse}</dd></div>
              <div><dt className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[var(--doux)]">Horaires</dt><dd>{CONTACT.horaires}</dd></div>
              <div><dt className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[var(--doux)]">Téléphone</dt><dd className="font-semibold tabular-nums">{CONTACT.telephone}</dd></div>
            </dl>
          </div>
        </div>
      </section>
    </main>
  );
}
