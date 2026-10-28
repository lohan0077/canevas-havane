import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../../_kit/Apparition";
import TitreRevele from "../../../_kit/TitreRevele";
import { AppelFinal, Bouton, EnTetePage, Surtitre } from "../../_composants/Blocs";
import Commande from "../../_composants/Commande";
import { Fruit } from "../../_composants/Dessins";
import Passeport from "../../_composants/Passeport";
import {
  DOSSIER, ESSENCES, FRUITIERS, LIVRAISON, PHOTOS, PLANTATION, essence, euros, fruitier, hauteur, metres, recolteDe, type Fruitier,
} from "../../_composants/donnees";

// La fiche d'un arbre, telle que les deux vidéos la décrivent : pour un arbre d'ombre,
// sa hauteur dans vingt ans ; pour un fruitier, l'été de sa première récolte ; pour
// tous, le passeport phytosanitaire montré en photo, et la commande sur le site.
export const dynamicParams = false;
export function generateStaticParams() {
  return [...ESSENCES, ...FRUITIERS].map((a) => ({ slug: a.slug }));
}

type Props = { params: Promise<{ slug: string }> };

const PREMIER: Record<Fruitier["fruit"], string> = {
  cerise: "Ta première *cerise.*",
  pomme: "Ta première *pomme.*",
  figue: "Ta première *figue.*",
  abricot: "Ton premier *abricot.*",
  poire: "Ta première *poire.*",
  prune: "Ta première *prune.*",
};

const PHOTO_OMBRE: Record<string, { src: string; alt: string }> = {
  tilleul: PHOTOS.fleursTilleul,
  "erable-champetre": PHOTOS.feuilles,
  micocoulier: PHOTOS.arbreSeul,
  "chene-pubescent": PHOTOS.tableOmbre,
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const e = essence(slug), a = fruitier(slug);
  if (!e && !a) return {};
  return {
    title: `${e ? e.nom : `${a!.espece} ${a!.variete}`} — Ombre Lente, site de démonstration`,
    description: e
      ? `${e.nom} : ${metres(e.depart)} à la livraison, ${metres(e.vingt)} dans vingt ans (exemple), passeport phytosanitaire en photo. Fiche d'une pépinière imaginaire.`
      : `${a!.espece} ${a!.variete} : première récolte estimée ${recolteDe(a!, "demi-tige").toLowerCase()}, passeport phytosanitaire en photo. Fiche d'une pépinière imaginaire.`,
    ...adressesDeLaPage(`/exemples/ombre-lente/arbres/${slug}`),
  };
}

function Etapes() {
  return (
    <section className="mx-auto max-w-7xl space-y-10 px-5 py-20 sm:px-8 md:py-28">
      <div className="space-y-5">
        <Apparition><Surtitre annee="25 novembre">La plantation</Surtitre></Apparition>
        <TitreRevele texte="Le planter, *avec tous les autres.*" className="text-[clamp(2.6rem,5.5vw,4.8rem)] leading-[0.95]" classeAccent="italic text-[var(--accent-texte)]" />
      </div>
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["La veille", "Laisse tremper les racines dans un seau d'eau une heure ou deux."],
          ["Le trou", "Large et profond comme une bêche et demie. Ameublis le fond."],
          ["Le collet", "Le collet (ou le bourrelet de la greffe) reste au-dessus du sol, jamais enterré."],
          ["Le tuteur", "Planté avant l'arbre, côté vent dominant. Puis un arrosoir, même s'il pleut."],
        ].map(([t, d], i) => (
          <Apparition as="li" key={t} delai={i * 100} className="space-y-2 rounded-[2rem] border border-[var(--trait)] bg-[var(--carte)] p-6">
            <p className="font-[family-name:var(--titres)] text-4xl italic text-[var(--accent-texte)] tabular-nums">0{i + 1}</p>
            <h3 className="text-2xl">{t}</h3>
            <p className="leading-relaxed text-[var(--doux)]">{d}</p>
          </Apparition>
        ))}
      </ol>
      <Apparition><Bouton href={`${DOSSIER}/sainte-catherine`} variante="vert">Le rendez-vous du 25 novembre</Bouton></Apparition>
    </section>
  );
}

function SonPasseport({ nom, latin, lot }: { nom: string; latin: string; lot: string }) {
  return (
    <section id="passeport" className="scroll-mt-20 bg-[#E9DDBF]">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-2 lg:items-center">
        <div className="space-y-5">
          <Apparition><Surtitre>Son passeport</Surtitre></Apparition>
          <h2 className="text-[clamp(2.6rem,5vw,4.6rem)] leading-[0.95]">L&apos;étiquette qui part <span className="italic text-[var(--accent-texte)]">avec lui.</span></h2>
          <p className="max-w-lg text-lg leading-relaxed">
            Expédié, ton {nom} voyage avec son passeport phytosanitaire, attaché à l&apos;arbre. C&apos;est
            obligatoire pour toute plante vendue à distance. Voici la photo de celui de ce lot.
          </p>
          <p className="text-[14px]">Règl. (UE) 2016/2031, art. 79, 81 et 83 · valeurs d&apos;exemple</p>
        </div>
        <Passeport latin={latin} lot={lot} />
      </div>
    </section>
  );
}

export default async function FicheArbre({ params }: Props) {
  const { slug } = await params;
  const e = essence(slug), a = fruitier(slug);
  if (!e && !a) notFound();

  if (e) {
    const photo = PHOTO_OMBRE[e.slug];
    const autres = ESSENCES.filter((x) => x.slug !== e.slug);
    return (
      <main>
        <EnTetePage surtitre={<>Arbre d&apos;ombre · <span className="normal-case italic tracking-normal">{e.latin}</span></>} titre={`${e.nom.split(" ")[0]}, *dans vingt ans.*`} photo={photo} origine="50% 40%">
          {e.phrase}
        </EnTetePage>
        <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div className="space-y-8">
            <Apparition className="grid grid-cols-3 gap-3">
              {[0, 10, 20].map((k) => (
                <div key={k} className="rounded-[1.5rem] border border-[var(--trait)] bg-[var(--carte)] p-4">
                  <p className="font-[family-name:var(--titres)] text-[38px] leading-none tabular-nums">{PLANTATION + k}</p>
                  <p className="mt-2 text-[15px] font-semibold tabular-nums">{metres(hauteur(e, k))}</p>
                  <p className="text-[12px] text-[var(--doux)]">{k === 0 ? "à la livraison" : "exemple"}</p>
                </div>
              ))}
            </Apparition>
            <dl className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
              {[["Nom botanique", e.latin], ["Sol et exposition", e.sol], ["Livré", `Le ${LIVRAISON.date}, racines nues, avec son passeport phytosanitaire`]].map(([t, d]) => (
                <div key={t} className="grid gap-1 py-4 sm:grid-cols-[180px_1fr]">
                  <dt className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[var(--doux)]">{t}</dt>
                  <dd className={`text-lg ${t === "Nom botanique" ? "italic" : ""}`}>{d}</dd>
                </div>
              ))}
            </dl>
            <Apparition><Bouton href={`${DOSSIER}#ombre`} variante="vert">Glisser les années</Bouton></Apparition>
          </div>
          <Apparition de="zoom">
            <Commande nom={e.nom} options={[{ id: "baliveau", libelle: "Baliveau · racines nues", detail: `${metres(e.depart)} environ à la livraison`, note: `${metres(e.vingt)} dans vingt ans, en bon sol (exemple)`, prix: e.prix }]} />
          </Apparition>
        </section>
        <SonPasseport nom={e.nom.split(" ")[0].toLowerCase()} latin={e.latin} lot={e.lot} />
        <Etapes />
        <section className="border-t border-[var(--trait)] bg-[var(--carte)]">
          <div className="mx-auto max-w-7xl space-y-6 px-5 py-16 sm:px-8">
            <h2 className="text-[clamp(2rem,4vw,3rem)]">Les autres arbres d&apos;ombre</h2>
            <ul className="grid gap-3 sm:grid-cols-3">
              {autres.map((x) => (
                <li key={x.slug}>
                  <Link href={`${DOSSIER}/arbres/${x.slug}`} className="block rounded-[1.5rem] border border-[var(--trait)] bg-[var(--fond)] p-5 hover:border-[var(--encre)]">
                    <span className="block font-[family-name:var(--titres)] text-2xl">{x.nom}</span>
                    <span className="text-[14px] text-[var(--doux)]">{metres(x.vingt)} dans vingt ans · {euros(x.prix)} TTC</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <AppelFinal />
      </main>
    );
  }

  const f = a!;
  const autres = FRUITIERS.filter((x) => x.slug !== f.slug);
  return (
    <main>
      <EnTetePage surtitre={<>{f.espece} · {f.variete}</>} titre={PREMIER[f.fruit]} photo={f.fruit === "cerise" ? PHOTOS.cerises : PHOTOS.vergerRangs} origine="50% 35%">
        {f.phrase}
      </EnTetePage>
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-[1fr_1fr] lg:items-start">
        <div className="space-y-8">
          <Apparition className="flex items-center gap-6 rounded-[2rem] bg-[var(--sombre)] p-6 text-[var(--sur-sombre)] sm:p-8">
            {f.fruit === "cerise" ? (
              <span className="relative block h-28 w-28 shrink-0 overflow-hidden rounded-full">
                <Image src={PHOTOS.cueillette.src} alt={PHOTOS.cueillette.alt} fill sizes="112px" className="object-cover" />
              </span>
            ) : (
              <Fruit fruit={f.fruit} className="h-28 w-28 shrink-0" />
            )}
            <span className="space-y-1">
              <span className="block text-[12px] font-semibold uppercase tracking-[0.16em] text-[#D9A441]">Première récolte estimée</span>
              <span className="block font-[family-name:var(--titres)] text-[44px] leading-none">{recolteDe(f, "demi-tige")}</span>
              <span className="block text-[15px] text-[#C9D3B8]">en demi-tige · {recolteDe(f, "scion").toLowerCase()} en scion · exemple</span>
            </span>
          </Apparition>
          <dl className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
            {[["Nom botanique", f.latin], ["Cueillette", f.cueillette], ["Pollinisation", f.pollinisation], ["Livré", `Le ${LIVRAISON.date}, racines nues, avec son passeport phytosanitaire`]].map(([t, d]) => (
              <div key={t} className="grid gap-1 py-4 sm:grid-cols-[180px_1fr]">
                <dt className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[var(--doux)]">{t}</dt>
                <dd className={`text-lg ${t === "Nom botanique" ? "italic" : ""}`}>{d}</dd>
              </div>
            ))}
          </dl>
        </div>
        <Apparition de="zoom">
          <Commande
            nom={`${f.espece} ${f.variete}`}
            options={(["demi-tige", "scion"] as const).map((forme) => ({
              id: forme,
              libelle: forme === "demi-tige" ? "Demi-tige · 2 ans" : "Scion · 1 an",
              detail: f.livre[forme],
              note: `Récolte estimée : ${recolteDe(f, forme).toLowerCase()}`,
              prix: f.prix[forme],
            }))}
          />
        </Apparition>
      </section>
      <SonPasseport nom={f.espece.toLowerCase()} latin={f.latin} lot={f.lot} />
      <Etapes />
      <section className="border-t border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto max-w-7xl space-y-6 px-5 py-16 sm:px-8">
          <h2 className="text-[clamp(2rem,4vw,3rem)]">Les autres fruitiers</h2>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {autres.map((x) => (
              <li key={x.slug}>
                <Link href={`${DOSSIER}/arbres/${x.slug}`} className="flex h-full flex-col rounded-[1.5rem] border border-[var(--trait)] bg-[var(--fond)] p-4 hover:border-[var(--encre)]">
                  <Fruit fruit={x.fruit} className="h-14 w-14" />
                  <span className="mt-2 font-semibold">{x.espece} {x.variete}</span>
                  <span className="text-[14px] text-[var(--doux)]">{recolteDe(x, "demi-tige")} · dès {euros(x.prix.scion)} TTC</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-sm text-[var(--doux)]">Prix TTC et années de récolte d&apos;exemple.</p>
        </div>
      </section>
      <AppelFinal />
    </main>
  );
}
