import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, ETAPES, QUESTIONS, RECETTES, entreprise, photos } from "./_composants/donnees";
import { Eventail, Faq, Note } from "./_composants/Blocs";
import EnvoiRecette from "./_composants/EnvoiRecette";

// L'accueil de Transmis. La vidéo : « Sur le site, un seul bouton : envoie ta recette
// de famille. En photo. La page du cahier, tachée de sauce. » Autour : ce qu'on vend
// (de la mémoire), le chemin de la page à la table, la carte de table, le prix par
// personne, les allergies, la vidéo du mois (avec l'accord de la personne filmée).
export const metadata: Metadata = {
  title: "Transmis — site de démonstration",
  description: "Site de démonstration d'une maison de traiteur imaginaire, réalisé par Canevas Havane : envoie la page du cahier, on sert la recette de ta famille à 120.",
  ...adressesDeLaPage("/exemples/transmis"),
};

export default function Transmis() {
  return (
    <div>
      {/* 1 · Le nom, et les recettes de famille en éventail. */}
      <section className="overflow-hidden px-5 pt-10 pb-12 sm:pt-16 text-center">
        <p className="text-[12px] font-semibold uppercase tracking-[0.28em] text-[var(--doux)]">Maison de traiteur</p>
        <h1 className="mt-3 text-[84px] sm:text-[160px] italic font-normal tracking-[-0.02em] leading-[0.9]">Transmis</h1>
        <p className="mx-auto mt-4 max-w-md font-[family-name:var(--titres)] text-[24px] sm:text-[30px] leading-snug">
          La recette de ta famille, <em className="text-[var(--accent-texte)]">servie à 120.</em>
        </p>
        <div className="mt-8">
          <Eventail />
        </div>
        <ul className="mx-auto mt-6 flex max-w-2xl flex-wrap justify-center gap-2">
          {RECETTES.map((r) => (
            <li key={r.plat} className="rounded-full border border-[var(--trait)] bg-[var(--carte)] px-4 py-1.5 text-[14px]">
              {r.plat} <span className="text-[var(--doux)]">· {r.de}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-[13px] text-[var(--doux)]">Des exemples : les prénoms sont inventés.</p>
      </section>

      {/* 2 · Un seul bouton : envoie ta recette. */}
      <section id="recette" className="scroll-mt-16 border-y border-[var(--trait)] bg-[#F3EAD7]">
        <div className="max-w-6xl mx-auto px-5 py-14 sm:py-20 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="space-y-4 lg:pt-4">
            <Note>Un seul bouton.</Note>
            <h2 className="text-[42px] sm:text-6xl font-normal">Envoie ta recette <em className="text-[var(--accent-texte)]">de famille.</em></h2>
            <p className="text-lg leading-relaxed">
              En photo. La page du cahier, telle qu&apos;elle est : tachée de sauce, raturée, avec « une bonne poignée » en
              guise de mesure. C&apos;est elle qu&apos;on veut.
            </p>
          </div>
          <EnvoiRecette />
        </div>
      </section>

      {/* 3 · Pas un repas : de la mémoire. */}
      <section className="max-w-6xl mx-auto px-5 py-16 sm:py-24 grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-center">
        <div className="relative mx-auto aspect-[2/3] w-full max-w-sm overflow-hidden rounded-[6px] rotate-[-1.5deg] shadow-[0_30px_60px_-34px_rgba(31,59,45,.7)]">
          <Image src={photos.mains.src} alt={photos.mains.alt} fill sizes="(min-width: 768px) 380px, 90vw" className="object-cover" />
        </div>
        <div className="space-y-5">
          <Note>Ce qu&apos;on sert vraiment</Note>
          <p className="font-[family-name:var(--titres)] text-[44px] sm:text-6xl leading-[1.05]">
            Pas un repas. <em className="text-[var(--accent-texte)]">De la mémoire.</em>
          </p>
          <p className="text-lg leading-relaxed text-[var(--doux)]">
            Une recette, ça ne s&apos;achète pas : ça se transmet. Tout le monde a mangé des verrines à un mariage. Personne
            n&apos;a mangé la blanquette de ta grand-mère, à cent vingt, le jour où tu te maries.
          </p>
        </div>
      </section>

      {/* 4 · De la page à la table. */}
      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)] [--doux:#C8D3CB] [--accent-texte:#E9C46A]">
        <div className="max-w-6xl mx-auto px-5 py-16 sm:py-24 space-y-10">
          <h2 className="text-[42px] sm:text-6xl font-normal">De la page <em className="text-[var(--accent-texte)]">à la table.</em></h2>
          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ETAPES.map((e, i) => (
              <li key={e.titre} className="space-y-2 border-t border-[var(--sur-sombre)]/40 pt-4">
                <p className="font-[family-name:var(--f-caveat)] text-[34px] leading-none text-[var(--accent-texte)]">{i + 1}.</p>
                <h3 className="text-[26px] italic leading-tight">{e.titre}</h3>
                <p className="leading-relaxed text-[var(--doux)]">{e.texte}</p>
              </li>
            ))}
          </ol>
          <Link href={`${DOSSIER}/de-la-recette-a-la-table`} className="inline-flex h-12 items-center rounded-full bg-[var(--sur-sombre)] px-6 font-semibold text-[var(--sombre)]">
            Le carnet d&apos;essais
          </Link>
        </div>
      </section>

      {/* 5 · La carte de table. */}
      <section className="max-w-6xl mx-auto px-5 py-16 sm:py-24 grid gap-10 md:grid-cols-[1fr_1fr] md:items-center">
        <div className="space-y-5">
          <Note>Le jour J</Note>
          <h2 className="text-[42px] sm:text-6xl font-normal">Sur chaque table, <em className="text-[var(--accent-texte)]">une carte.</em></h2>
          <p className="text-lg leading-relaxed text-[var(--doux)]">
            D&apos;où vient le plat, et qui l&apos;a transmis. Écrite avec toi, avec ton histoire vraie : on n&apos;invente ni une
            date, ni une ville.
          </p>
          <Link href={`${DOSSIER}/carte-de-table`} className="inline-flex h-12 items-center rounded-full bg-[var(--accent)] px-6 font-semibold text-[var(--sur-accent)]">
            Écrire ma carte
          </Link>
        </div>
        <div className="mx-auto w-full max-w-sm rotate-[2deg] rounded-[6px] border border-[var(--trait)] bg-[var(--carte)] px-7 py-9 text-center shadow-[0_26px_50px_-30px_rgba(31,59,45,.6)]">
          <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-[var(--doux)]">Plat principal</p>
          <p className="mt-3 font-[family-name:var(--titres)] text-[30px] italic leading-tight">La blanquette de Mamie Jo</p>
          <span aria-hidden="true" className="mx-auto my-5 block h-px w-16 bg-[var(--accent)]" />
          <p className="leading-relaxed">Recette écrite en 1962, à Roanne.</p>
          <p className="mt-2 leading-relaxed">Transmise à Léa, sa petite-fille, qui se marie ce soir.</p>
          <p className="mt-6 font-[family-name:var(--titres)] text-[20px] italic text-[var(--accent-texte)]">Transmis</p>
          <p className="mt-4 text-[12px] text-[var(--doux)]">Carte d&apos;exemple</p>
        </div>
      </section>

      {/* 6 · Le prix et les allergies. */}
      <section className="border-y border-[var(--trait)] bg-[var(--carte)]">
        <div className="max-w-6xl mx-auto px-5 py-16 sm:py-24 grid gap-10 md:grid-cols-[1fr_1fr]">
          <div className="space-y-4">
            <Note>Le prix, sans détour</Note>
            <h2 className="text-[42px] sm:text-6xl font-normal">
              <span className="[font-variant-numeric:lining-nums]">68 €</span> par personne, <em className="text-[var(--accent-texte)]">pour 120.</em>
            </h2>
            <p className="text-lg leading-relaxed text-[var(--doux)]">
              Toutes taxes comprises, prix d&apos;exemple : entrée, le plat de ta famille, dessert, service, vaisselle, eaux et
              café. Les essais et la dégustation sont compris.
            </p>
            <Link href={`${DOSSIER}/prix`} className="inline-flex font-semibold underline decoration-[var(--accent)] decoration-2 underline-offset-[6px]">
              Le prix selon le nombre d&apos;invités →
            </Link>
          </div>
          <div className="space-y-4">
            <Note>Avant de commander</Note>
            <h2 className="text-[42px] sm:text-5xl font-normal">Les allergies, <em className="text-[var(--accent-texte)]">d&apos;abord.</em></h2>
            <p className="text-lg leading-relaxed text-[var(--doux)]">
              Dès le premier essai, on note les allergènes de ta recette. Avant la commande, on te demande les allergies et
              les régimes de tes invités. Et chaque plat servi dit ce qu&apos;il contient.
            </p>
            <p className="rounded-[12px] bg-[#F3EAD7] p-4 text-[15px] leading-relaxed">
              Blanquette de Mamie Jo : <strong>lait, œufs, céleri</strong> (exemple).
            </p>
          </div>
        </div>
      </section>

      {/* 7 · La vidéo du mois. */}
      <section className="max-w-6xl mx-auto px-5 py-16 sm:py-24 grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <div className="space-y-5">
          <Note>Chaque mois</Note>
          <h2 className="text-[42px] sm:text-6xl font-normal">Une grand-mère, sa recette, <em className="text-[var(--accent-texte)]">120 assiettes.</em></h2>
          <p className="text-lg leading-relaxed text-[var(--doux)]">
            Une vidéo par mois : la page du cahier, les essais, la validation, le jour J. Filmée avec l&apos;accord écrit de la
            personne, et seulement si elle le veut.
          </p>
        </div>
        <div className="relative aspect-[3/2] overflow-hidden rounded-[6px] shadow-[0_26px_50px_-30px_rgba(31,59,45,.6)]">
          <Image src={photos.papier.src} alt={photos.papier.alt} fill sizes="(min-width: 768px) 460px, 100vw" className="object-cover" />
        </div>
      </section>

      {/* 8 · Les questions. */}
      <section className="max-w-6xl mx-auto px-5 pb-16 sm:pb-24 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-4">
          <Note>Les questions</Note>
          <h2 className="text-[42px] sm:text-6xl font-normal">Avant d&apos;ouvrir <em className="text-[var(--accent-texte)]">le cahier.</em></h2>
          <div className="relative hidden lg:block aspect-[2/3] overflow-hidden rounded-[6px]">
            <Image src={photos.ragout.src} alt={photos.ragout.alt} fill sizes="380px" className="object-cover" />
          </div>
        </div>
        <Faq questions={QUESTIONS} />
      </section>

      {/* 9 · L'affiche. */}
      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="max-w-4xl mx-auto px-5 py-16 sm:py-24 text-center space-y-6">
          <p className="font-[family-name:var(--titres)] text-[44px] sm:text-7xl leading-[1.05]">
            Ta grand-mère a une <em className="text-[#E9C46A]">recette&nbsp;?</em>
          </p>
          <p className="text-lg">On la sert à 120.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href={`${DOSSIER}#recette`} className="inline-flex h-14 items-center rounded-full bg-[var(--accent)] px-7 text-[17px] font-semibold text-[var(--sur-accent)]">
              Envoyer ma recette
            </Link>
            <a href={`tel:${entreprise.telephoneLien}`} className="inline-flex h-14 items-center rounded-full border border-[var(--sur-sombre)] px-6 text-[17px] tabular-nums">
              {entreprise.telephone}
            </a>
          </div>
          <p className="text-sm text-[#C8D3CB]">Numéro fictif, réservé par l&apos;ARCEP aux œuvres de fiction.</p>
        </div>
      </section>
    </div>
  );
}
