import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import Cafetiere from "./_composants/Cafetiere";
import DateTorrefaction from "./_composants/DateTorrefaction";
import { IconeMethode } from "./_composants/Icones";
import Tasses from "./_composants/Tasses";
import { CAFES, DOSSIER, FINESSES, METHODES, ORDRE_METHODES, QUESTIONS, brulerie, euros, photos, type CleCafe } from "./_composants/donnees";

// Le site imaginé dans la vidéo « Si je devais remplir le carnet de commandes d'un
// torréfacteur » : on ne part pas du café, on part de la cafetière. Une seule
// question, la mouture et deux cafés ; la date de torréfaction en gros ;
// l'abonnement réglé en tasses. Premier écran inspiré du modèle « Daisy Wild » de
// MotionSites (l'objet sur un aplat de couleur, le produit et sa composition en
// regard), transposé en affiche orange et noire.
export const metadata: Metadata = {
  title: "Pas Quinze — site de démonstration",
  description: "Site de démonstration d'un torréfacteur imaginaire, réalisé par Canevas Havane : tu dis comment tu fais ton café, il te donne la mouture et les deux cafés faits pour ta cafetière.",
  ...adressesDeLaPage("/exemples/pas-quinze"),
};

const ETAPES = [
  { jour: "Mardi", texte: "On torréfie. Une fournée par café, et la date part au tampon sur chaque sachet." },
  { jour: "Mercredi", texte: "On moud pour ceux qui l'ont demandé, on ferme les sachets, on envoie les abonnements." },
  { jour: "Jeudi – samedi", texte: "Tu passes à la brûlerie, ou ton café arrive chez toi, quelques jours après sa torréfaction." },
];

export default function PasQuinze() {
  return (
    <div>
      {/* 1 — La question, sur un aplat, et l'objet en regard. */}
      <section id="cafetiere" className="scroll-mt-14 grid md:grid-cols-2">
        <div className="bg-[var(--accent)] px-5 pb-10 pt-8 text-[var(--encre)] sm:px-10 sm:pt-12 md:order-2">
          <div className="mx-auto max-w-lg space-y-6">
            <p className="text-sm font-bold uppercase tracking-[0.18em]">Torréfacteur · ton café</p>
            <h1 className="text-[2.6rem] font-black uppercase leading-[0.95] tracking-[-0.02em] sm:text-6xl">
              Tu fais ton café comment&nbsp;?
            </h1>
            <Cafetiere />
          </div>
        </div>
        <div className="relative min-h-[18rem] bg-[#F4D35E] md:order-1 md:min-h-full">
          <Image src={photos.italienne.src} alt={photos.italienne.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" priority />
        </div>
      </section>

      {/* 2 — Pas quinze. Deux. */}
      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto max-w-6xl space-y-8 px-5 py-20 sm:py-28">
          <p className="font-[family-name:var(--titres)] text-[3.2rem] font-black uppercase leading-[0.95] sm:text-8xl">
            <span className="block text-[#D9CBBB] line-through decoration-[#F26B3A] decoration-4">Quinze origines.</span>
            <span className="block text-[#F26B3A]">Deux cafés.</span>
          </p>
          <p className="max-w-2xl text-lg leading-relaxed">
            Quinze origines, c&apos;est quinze questions — et des mots que personne ne
            comprend. On a goûté chaque café dans chaque cafetière. Pour la tienne, on en
            garde deux, décrits avec des mots de tous les jours.
          </p>
        </div>
      </section>

      {/* 3 — Torréfié mardi. */}
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:py-28 md:grid-cols-[1fr_1fr] md:items-center">
        <div aria-hidden="true" className="relative mx-auto w-full max-w-[18rem] rotate-[-3deg]">
          <div className="h-6 rounded-t-md bg-[#8A6A45]" />
          <div className="space-y-6 rounded-b-[14px] bg-[#C8A06A] px-6 pb-8 pt-6 text-[#1A1410] shadow-[0_30px_50px_-30px_rgba(26,20,16,0.8)]">
            <p className="font-[family-name:var(--titres)] text-xl font-black uppercase">Pas Quinze.</p>
            <div className="space-y-1">
              <p className="font-[family-name:var(--titres)] text-3xl font-black">Brésil</p>
              <p className="text-sm font-semibold">rond, noisette · 250 g · grain</p>
            </div>
            <div className="-rotate-6 rounded-lg border-[3px] border-[#A63A16] bg-[#FBF6EE] px-3 py-2 text-center text-[#A63A16]">
              <p className="text-xs font-extrabold uppercase tracking-[0.16em]">Torréfié le</p>
              <p className="font-[family-name:var(--titres)] text-2xl font-black leading-tight"><DateTorrefaction /></p>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--accent-texte)]">Sur chaque sachet</p>
          <h2 className="text-4xl font-black uppercase leading-[0.95] sm:text-6xl">Torréfié <span className="text-[var(--accent-texte)]">mardi.</span></h2>
          <p className="text-lg leading-relaxed">
            La date de torréfaction, écrite en gros, là où les autres mettent une date
            limite en petit. Le sachet en vente cette semaine a été torréfié le{" "}
            <DateTorrefaction className="font-bold" />.
          </p>
          <div className="relative aspect-[16/9] overflow-hidden rounded-[22px]">
            <Image src={photos.refroidissement.src} alt={photos.refroidissement.alt} fill sizes="(min-width: 768px) 520px, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      {/* 4 — En grain ou moulu ? */}
      <section className="border-y-[3px] border-[var(--encre)] bg-[var(--carte)]">
        <div className="mx-auto max-w-6xl space-y-10 px-5 py-20 sm:py-24">
          <div className="max-w-2xl space-y-4">
            <h2 className="text-4xl font-black uppercase leading-[0.95] sm:text-5xl">En grain <span className="text-[var(--accent-texte)]">ou moulu&nbsp;?</span></h2>
            <p className="text-lg leading-relaxed">
              En grain si tu as un moulin. Sinon, on moud pour ta cafetière, le jour même
              de la torréfaction. Voilà la mouture qu&apos;il lui faut.
            </p>
          </div>
          <ol className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {[...ORDRE_METHODES].sort((a, b) => METHODES[a].finesse - METHODES[b].finesse).map((cle) => (
              <li key={cle} className="space-y-3 rounded-2xl border-2 border-[var(--trait)] p-4">
                <IconeMethode methode={cle} className="h-10 w-10" />
                <p className="font-[family-name:var(--titres)] text-lg font-bold">{METHODES[cle].libelle}</p>
                <p className="text-sm font-bold uppercase tracking-[0.1em] text-[var(--accent-texte)]">{METHODES[cle].mouture}</p>
                <div className="flex gap-1" aria-hidden="true">
                  {FINESSES.map((f, i) => <span key={f} className={`h-1.5 flex-1 rounded-full ${i === METHODES[cle].finesse ? "bg-[var(--encre)]" : "bg-[var(--trait)]"}`} />)}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5 — L'abonnement, en tasses. */}
      <section id="abonnement" className="scroll-mt-14 mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:py-28 md:grid-cols-[0.9fr_1.1fr] md:items-start">
        <div className="space-y-6 md:sticky md:top-24">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--accent-texte)]">L&apos;abonnement</p>
          <h2 className="text-4xl font-black uppercase leading-[0.95] sm:text-6xl">Il se règle <span className="text-[var(--accent-texte)]">en tasses.</span></h2>
          <p className="text-lg leading-relaxed">
            Pas en kilos, pas en mois. Tu dis combien de tasses tu bois par jour, et ton
            café arrive avant que le paquet soit vide.
          </p>
          <div className="relative hidden aspect-[3/4] max-w-xs overflow-hidden rounded-[22px] md:block">
            <Image src={photos.tasses.src} alt={photos.tasses.alt} fill sizes="320px" className="object-cover" />
          </div>
        </div>
        <Tasses />
      </section>

      {/* 6 — Les six cafés. */}
      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto max-w-6xl space-y-10 px-5 py-20 sm:py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-4xl font-black uppercase leading-[0.95] sm:text-5xl">Six cafés <span className="text-[#F26B3A]">en tout.</span></h2>
            <Link href={`${DOSSIER}/cafes`} className="inline-flex min-h-12 items-center rounded-full bg-[#F26B3A] px-6 font-bold text-[var(--encre)]">Voir les cafés</Link>
          </div>
          <ul className="grid gap-px overflow-hidden rounded-[22px] bg-[#FBF6EE]/20 sm:grid-cols-2 lg:grid-cols-3">
            {(Object.keys(CAFES) as CleCafe[]).map((c) => (
              <li key={c} className="flex items-center gap-4 bg-[var(--sombre)] p-5">
                <span aria-hidden="true" className="h-12 w-12 shrink-0 rounded-full" style={{ background: CAFES[c].teinte }} />
                <span className="min-w-0 flex-1">
                  <span className="block font-[family-name:var(--titres)] text-xl font-bold">{CAFES[c].nom}</span>
                  <span className="block text-[#D9CBBB]">{CAFES[c].enClair}</span>
                </span>
                <span className="text-sm tabular-nums">{euros(CAFES[c].prix250)}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-[#D9CBBB]">Cafés et prix TTC d&apos;exemple, pour 250 g : la brûlerie est fictive.</p>
        </div>
      </section>

      {/* 7 — La semaine de la brûlerie. */}
      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:py-28 md:grid-cols-2 md:items-center">
        <div className="relative aspect-[2/3] max-h-[34rem] overflow-hidden rounded-[22px] md:order-2">
          <Image src={photos.filtre.src} alt={photos.filtre.alt} fill sizes="(min-width: 768px) 480px, 100vw" className="object-cover" />
        </div>
        <div className="space-y-8">
          <h2 className="text-4xl font-black uppercase leading-[0.95] sm:text-5xl">Une semaine <span className="text-[var(--accent-texte)]">à la brûlerie.</span></h2>
          <ol className="space-y-6">
            {ETAPES.map((e) => (
              <li key={e.jour} className="grid grid-cols-[7.5rem_1fr] gap-4 border-t-[3px] border-[var(--encre)] pt-4">
                <p className="font-[family-name:var(--titres)] text-lg font-black uppercase">{e.jour}</p>
                <p className="leading-relaxed">{e.texte}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 8 — Questions. */}
      <section className="border-t-[3px] border-[var(--encre)] bg-[var(--carte)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:py-24 md:grid-cols-[0.8fr_1.2fr]">
          <h2 className="text-4xl font-black uppercase leading-[0.95] sm:text-5xl">Les vraies <span className="text-[var(--accent-texte)]">questions.</span></h2>
          <ul className="divide-y-2 divide-[var(--trait)] border-y-2 border-[var(--trait)]">
            {QUESTIONS.map((x) => (
              <li key={x.q}>
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-bold [&::-webkit-details-marker]:hidden">
                    {x.q}
                    <span aria-hidden="true" className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[var(--encre)] text-xl text-[var(--fond)] transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="pb-6 pr-10 leading-relaxed text-[var(--doux)]">{x.r}</p>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 9 — La brûlerie. */}
      <section id="brulerie" className="scroll-mt-14 bg-[#F4D35E] text-[var(--encre)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:grid-cols-2 sm:py-24">
          <div className="space-y-4">
            <h2 className="text-4xl font-black uppercase leading-[0.95] sm:text-5xl">La brûlerie</h2>
            <p className="text-lg">{brulerie.adresse}</p>
            <p><a href={`tel:${brulerie.telephone.replace(/ /g, "")}`} className="text-2xl font-extrabold underline underline-offset-4 tabular-nums">{brulerie.telephone}</a></p>
            <p className="max-w-sm">Le mardi, la boutique est fermée : on torréfie. Les autres jours, tu goûtes avant de choisir.</p>
          </div>
          <dl className="space-y-3 self-end">
            {brulerie.horaires.map((h) => (
              <div key={h.jours} className="flex justify-between gap-4 border-b-2 border-[var(--encre)] pb-3">
                <dt className="font-bold">{h.jours}</dt>
                <dd className="text-right">{h.heures}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </div>
  );
}
