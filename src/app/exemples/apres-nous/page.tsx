import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import CalculPalier from "../_kit/CalculPalier";
import { DOSSIER, atelier, etapes, meubles, paliers, photos, questions, registres } from "./_composants/donnees";
import Plaque from "./_composants/Plaque";
import Repas from "./_composants/Repas";

// Le site de la marque imaginée dans la vidéo « Si je devais créer un atelier
// d'ébénisterie » : on ne vend pas une table, on vend celle où tes petits-enfants
// feront leurs devoirs. Sous chaque meuble, un numéro gravé ouvre son registre ; les
// dernières lignes sont vides. Mise en page inspirée du modèle « Heritage Grove » de
// MotionSites (papier crème, encre unique, capitales fines, planche gravée et
// colonnes de registre), transposée à un atelier d'ébénisterie.
export const metadata: Metadata = {
  title: "Après Nous — site de démonstration",
  description: "Site de démonstration d'un atelier d'ébénisterie imaginaire, réalisé par Canevas Havane : un numéro gravé sous chaque table, et son registre en ligne, dont les dernières lignes sont à toi.",
  ...adressesDeLaPage("/exemples/apres-nous"),
};

const table31 = registres[0];

/** Un intitulé de section, numéroté comme les chapitres d'un registre. */
function Chapitre({ numero, libelle }: { numero: string; libelle: string }) {
  return (
    <p className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.24em]">
      <span className="font-[family-name:var(--titres)] text-base normal-case tracking-normal">{numero}.</span>
      <span>{libelle}</span>
      <span aria-hidden="true" className="h-px flex-1 bg-current opacity-40" />
    </p>
  );
}

export default function ApresNous() {
  return (
    <>
      {/* I. L'ouverture : la phrase, puis la planche. */}
      <section className="px-5 pb-16 pt-10 sm:px-6 sm:pt-16">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em]">Ébénisterie · tables, bureaux, bancs</p>
          <h1 className="mt-6 text-[50px] sm:text-[96px]">
            Pour ceux qui <span className="italic">viendront après.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed">
            On ne vend pas une table. On fait celle où tes petits-enfants feront leurs devoirs. Et
            sous chacune, un numéro gravé ouvre son registre.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href={`${DOSSIER}/registre`} className="bg-[var(--encre)] px-7 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--fond)]">
              Lire un registre
            </Link>
            <Link href={`${DOSSIER}/meubles`} className="border border-[var(--encre)] px-7 py-4 text-sm font-semibold uppercase tracking-[0.2em]">
              Les meubles
            </Link>
          </div>
        </div>
        <figure className="mx-auto mt-14 max-w-5xl border border-[var(--encre)] p-2 sm:p-3">
          <Image
            src={photos.tableDuSoir.src}
            width={photos.tableDuSoir.largeur}
            height={photos.tableDuSoir.hauteur}
            alt={photos.tableDuSoir.alt}
            sizes="(min-width: 1024px) 1000px, 100vw"
            priority
            className="aspect-[4/5] w-full object-cover sepia-[.25] sm:aspect-[16/9]"
          />
          <figcaption className="flex justify-between gap-4 border-t border-[var(--encre)] px-1 pt-2 mt-2 text-[11px] font-semibold uppercase tracking-[0.2em]">
            <span className="whitespace-nowrap">Planche I</span>
            <span className="text-right">Une table, un soir d&apos;octobre</span>
          </figcaption>
        </figure>
      </section>

      {/* II. Le parti pris. */}
      <section className="bg-[var(--sombre)] px-5 py-20 text-[var(--sur-sombre)] sm:px-6 sm:py-28">
        <div className="mx-auto max-w-4xl space-y-8">
          <Chapitre numero="II" libelle="Ce qu'on fait" />
          <h2 className="text-5xl sm:text-7xl">
            Pas une table. <span className="italic text-[#E0B36A]">Celle de tes petits-enfants.</span>
          </h2>
          <p className="max-w-2xl text-lg leading-relaxed text-[#D9CBB8]">
            Beaucoup d'ébénistes parlent de chêne massif et de savoir-faire. Nous, on parle de ce qui
            se passera dessus : les repas, les devoirs, les jeux de société qui finissent mal. Une
            table qu&apos;on se passe. Pas une promesse de durée : une façon de la faire.
          </p>
        </div>
      </section>

      {/* III. Le registre. */}
      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-6 lg:grid-cols-2 lg:items-center">
        <div className="space-y-6">
          <Chapitre numero="III" libelle="Le registre" />
          <h2 className="text-5xl">
            Sous chaque table, <span className="italic">un numéro gravé.</span>
          </h2>
          <p className="text-lg leading-relaxed">
            Retourne la chaise, regarde sous le plateau : le numéro est gravé au fer. Tape-le sur ce
            site, et tu lis le registre du meuble — l&apos;arbre, les heures passées à l&apos;atelier,
            le premier repas.
          </p>
          <Link href={`${DOSSIER}/registre`} className="inline-block border-b border-[var(--encre)] pb-1 text-sm font-semibold uppercase tracking-[0.2em]">
            Taper un numéro
          </Link>
        </div>
        <Plaque className="w-full rotate-[-2deg] shadow-[0_30px_60px_-30px_rgba(59,36,22,0.6)]" />
      </section>

      {/* IV. Les lignes vides. */}
      <section className="border-y border-[var(--encre)] bg-[var(--carte)] px-5 py-20 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div className="space-y-6">
            <Chapitre numero="IV" libelle="Les lignes suivantes" />
            <h2 className="text-5xl">
              Les premières lignes, c&apos;est l&apos;atelier. <span className="italic">Les suivantes, c&apos;est toi.</span>
            </h2>
            <p className="text-lg leading-relaxed text-[var(--doux)]">
              À la livraison, tu reçois un code. Avec lui, tu écris la suite : le premier
              anniversaire, la tache de peinture, les devoirs de Léa en 2051.
            </p>
          </div>
          <ol className="border-t-2 border-[var(--encre)]" aria-label={`Registre de la table n° ${table31.numero}, exemple`}>
            {table31.lignes.map((l) => (
              <li key={l.texte} className="grid grid-cols-[4rem_1fr] border-b border-[var(--trait)] py-4">
                <span className="font-[family-name:var(--titres)] text-xl">{l.annee}</span>
                <span className="font-semibold">{l.texte}</span>
              </li>
            ))}
            {["Devoirs de Léa", "", ""].map((t, i) => (
              <li key={i} className="grid grid-cols-[4rem_1fr] border-b border-dashed border-[var(--accent-texte)] py-4">
                <span className="font-[family-name:var(--titres)] text-xl text-[var(--doux)]">{t ? "2051" : "20··"}</span>
                <span className="font-[family-name:var(--f-caveat)] text-2xl leading-none">{t}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* V. Les meubles. */}
      <section className="mx-auto max-w-6xl space-y-12 px-5 py-20 sm:px-6">
        <div className="space-y-6">
          <Chapitre numero="V" libelle="Les meubles" />
          <h2 className="text-5xl">
            Quatre meubles, <span className="italic">tous sur mesure.</span>
          </h2>
        </div>
        <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2">
          {meubles.map((m, i) => (
            <li key={m.id} className="space-y-4">
              {m.photo ? (
                <Image src={photos[m.photo].src} width={photos[m.photo].largeur} height={photos[m.photo].hauteur} alt={photos[m.photo].alt} sizes="(min-width: 640px) 50vw, 100vw" className="aspect-[4/3] w-full object-cover" />
              ) : (
                <div className="grid aspect-[4/3] place-items-center border border-[var(--trait)] bg-[var(--carte)]" aria-hidden="true">
                  <Plaque numero={["12", "47"][i - 2] ?? "1"} className="w-2/3" />
                </div>
              )}
              <div className="flex items-baseline justify-between gap-4 border-b border-[var(--encre)] pb-2">
                <h3 className="text-3xl">{m.nom}</h3>
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--doux)]">{m.delai}</span>
              </div>
              <p className="leading-relaxed text-[var(--doux)]">{m.texte}</p>
              <p className="font-semibold">{m.prix} TTC · exemple</p>
            </li>
          ))}
        </ul>
      </section>

      {/* VI. Le prix. */}
      <section className="bg-[var(--carte)] px-5 py-20 sm:px-6" id="prix">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="space-y-6">
            <Chapitre numero="VI" libelle="Le prix" />
            <h2 className="text-5xl">
              Combien coûte une table <span className="italic">sur mesure&nbsp;?</span>
            </h2>
            <p className="text-lg leading-relaxed text-[var(--doux)]">
              Ça dépend surtout d&apos;une chose : combien vous êtes autour. Glisse, tu as la taille
              et le prix de départ, en chêne huilé.
            </p>
          </div>
          <CalculPalier
            etiquette="Autour de la table"
            unite="personnes"
            min={2}
            max={14}
            depart={8}
            paliers={paliers}
            titreResultat="Ta table"
            legende="Prix TTC d'exemple, livraison et montage compris. Le noyer coûte environ un tiers de plus. Le prix exact est écrit sur le devis, après le dessin."
          />
        </div>
      </section>

      {/* VII. L'atelier. */}
      <section className="mx-auto max-w-6xl space-y-12 px-5 py-20 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div className="space-y-6">
            <Chapitre numero="VII" libelle="L'atelier" />
            <h2 className="text-5xl">
              De l&apos;arbre <span className="italic">au premier repas.</span>
            </h2>
          </div>
          <Image src={photos.huile.src} width={photos.huile.largeur} height={photos.huile.hauteur} alt={photos.huile.alt} sizes="(min-width: 1024px) 420px, 100vw" className="aspect-[16/10] w-full object-cover" />
        </div>
        <ol className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {etapes.map((e, i) => (
            <li key={e.titre} className="space-y-2 border-t border-[var(--encre)] pt-4">
              <p className="font-[family-name:var(--titres)] text-3xl">
                <span className="mr-3 text-base">{["I", "II", "III", "IV", "V", "VI"][i]}.</span>
                {e.titre}
              </p>
              <p className="leading-relaxed text-[var(--doux)]">{e.texte}</p>
            </li>
          ))}
        </ol>
        <Link href={`${DOSSIER}/atelier`} className="inline-block border-b border-[var(--encre)] pb-1 text-sm font-semibold uppercase tracking-[0.2em]">
          Comment on travaille
        </Link>
      </section>

      {/* VIII. Le premier repas. */}
      <section className="bg-[var(--sombre)] px-5 py-20 text-[var(--sur-sombre)] sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <Chapitre numero="VIII" libelle="Le premier repas" />
            <h2 className="text-5xl">
              Chaque table livrée, <span className="italic text-[#E0B36A]">on filme son premier repas.</span>
            </h2>
            <ul className="space-y-3 text-[#D9CBB8]">
              {[
                "Seulement si la famille le veut, avec un accord écrit.",
                "L'accord dit où la vidéo sera publiée. Rien d'autre.",
                "Filmée d'en haut : la table, les assiettes, les mains.",
                "Retirée sur simple demande, à tout moment.",
              ].map((t) => (
                <li key={t} className="flex gap-3">
                  <span aria-hidden="true" className="text-[#E0B36A]">—</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="[&_figcaption]:text-[#D9CBB8]">
            <Repas />
          </div>
        </div>
      </section>

      {/* IX. L'affiche. */}
      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="mx-auto w-full max-w-sm rotate-[-2deg] bg-[var(--sombre)] p-8 text-[var(--sur-sombre)] shadow-[0_30px_60px_-30px_rgba(59,36,22,0.8)]">
          <p className="font-[family-name:var(--titres)] text-[44px] leading-[1.02]">
            Tes petits-enfants feront leurs <span className="italic text-[#E0B36A]">devoirs</span> dessus.
          </p>
          <p className="mt-10 text-xs font-semibold uppercase tracking-[0.24em]">Après Nous · ébénisterie</p>
        </div>
        <div className="space-y-6">
          <Chapitre numero="IX" libelle="Notre seule affiche" />
          <h2 className="text-5xl">
            Une phrase, <span className="italic">pas de photo.</span>
          </h2>
          <p className="text-lg leading-relaxed text-[var(--doux)]">
            Pas de « savoir-faire depuis toujours », pas de chêne en gros plan. Une phrase que tout
            le monde comprend, et que personne n&apos;oublie en passant devant.
          </p>
        </div>
      </section>

      {/* X. Questions et atelier. */}
      <section className="border-t border-[var(--encre)] px-5 py-20 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-6">
            <Chapitre numero="X" libelle="Questions" />
            <h2 className="text-5xl">
              Avant de <span className="italic">dessiner.</span>
            </h2>
            <p className="text-[var(--doux)]">{atelier.horaires}.</p>
            <a href={`tel:${atelier.telephoneLien}`} className="inline-block font-[family-name:var(--titres)] text-4xl underline underline-offset-8">
              {atelier.telephone}
            </a>
          </div>
          <dl className="border-t border-[var(--encre)]">
            {questions.map((x) => (
              <div key={x.q} className="border-b border-[var(--trait)] py-5">
                <dt className="font-[family-name:var(--titres)] text-2xl">{x.q}</dt>
                <dd className="mt-2 leading-relaxed text-[var(--doux)]">{x.r}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
