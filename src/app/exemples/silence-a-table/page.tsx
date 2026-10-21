import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { ALLERGENES, COMPRIS, DEGUSTATIONS, DOSSIER, MARIAGES, MENUS, METHODE, QUESTIONS, entreprise, euros, photos, prixParPersonne } from "./_composants/donnees";
import { CartesMenu, Faq, Surtitre } from "./_composants/Blocs";
import Invites from "./_composants/Invites";

// L'accueil de Silence à Table. La vidéo : « Sur l'accueil, une seule question :
// combien d'invités ? Tu glisses, et le prix par personne s'affiche. Avec un menu
// complet, en exemple. » Autour : les dix secondes de silence, une page par mariage, la
// dégustation en ligne, les allergènes plat par plat, la méthode, les questions.
export const metadata: Metadata = {
  title: "Silence à Table — site de démonstration",
  description: "Site de démonstration d'un traiteur de mariage imaginaire, réalisé par Canevas Havane : combien d'invités ? Le prix par personne s'affiche, avec un menu complet.",
  ...adressesDeLaPage("/exemples/silence-a-table"),
};

export default function SilenceATable() {
  const libres = DEGUSTATIONS.filter((d) => !d.pris).slice(0, 3);

  return (
    <div>
      {/* 1 · Une seule question : combien d'invités ? */}
      <section id="invites" className="scroll-mt-16 max-w-6xl mx-auto px-5 pt-8 pb-16 sm:pt-14 grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-start">
        <div className="space-y-5 lg:pt-6">
          <Surtitre>Traiteur de mariage · le prix affiché</Surtitre>
          <h1 className="text-[64px] sm:text-[96px] font-normal lowercase tracking-[-0.01em]">
            combien <span className="whitespace-nowrap">d&apos;invités&nbsp;?</span>
          </h1>
          <p className="text-[18px] leading-relaxed text-[var(--doux)]">
            Glisse : le prix par personne s&apos;affiche, toutes taxes comprises. Avec un menu complet, en exemple, juste en dessous.
          </p>
          <div className="relative hidden lg:block aspect-[4/3] overflow-hidden rounded-[28px]">
            <Image src={photos.sauce.src} alt={photos.sauce.alt} fill sizes="560px" className="object-cover" priority />
          </div>
        </div>
        <Invites />
      </section>

      {/* 2 · Le menu complet, en exemple. */}
      <section id="menu-exemple" className="scroll-mt-16 border-t border-[var(--trait)]">
        <div className="max-w-6xl mx-auto px-5 py-16 sm:py-24 space-y-8">
          <div className="grid gap-4 md:grid-cols-2 md:items-end">
            <div className="space-y-4">
              <Surtitre>Un menu complet, en exemple</Surtitre>
              <h2 className="text-[48px] sm:text-7xl font-normal lowercase">le menu de juin.</h2>
            </div>
            <p className="text-lg leading-relaxed text-[var(--doux)]">
              Ce que comprend le prix par personne, plat par plat, avec ce que chaque plat contient.
            </p>
          </div>
          <CartesMenu menu={MENUS.juin} />
          <div className="grid gap-6 rounded-[28px] bg-[var(--carte)] border border-[var(--trait)] p-6 sm:p-8 md:grid-cols-[1.2fr_1fr] md:items-center">
            <ul className="space-y-2.5">
              {COMPRIS.map((c) => (
                <li key={c} className="flex gap-3"><span aria-hidden="true" className="text-[var(--accent-texte)]">—</span>{c}</li>
              ))}
            </ul>
            <div className="space-y-3">
              <p className="font-[family-name:var(--titres)] text-[40px] leading-none tabular-nums">{euros(prixParPersonne(100))} <span className="font-[family-name:var(--texte)] text-[16px]">TTC par personne</span></p>
              <p className="text-[14px] text-[var(--doux)]">Pour 100 invités · prix d&apos;exemple</p>
              <Link href={`${DOSSIER}/degustation`} className="inline-flex h-12 items-center rounded-full bg-[var(--accent)] px-6 font-medium text-[var(--sur-accent)]">
                Viens goûter ce menu
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3 · Dix secondes de silence. */}
      <section className="bg-[var(--sombre)]">
        <div className="max-w-6xl mx-auto px-5 py-16 sm:py-24 grid gap-10 md:grid-cols-[1fr_1fr] md:items-center">
          <div className="relative aspect-square overflow-hidden rounded-[28px]">
            <Image src={photos.sauce.src} alt={photos.sauce.alt} fill sizes="(min-width: 768px) 540px, 100vw" className="object-cover" />
          </div>
          <div className="space-y-5">
            <Surtitre>Ce qu&apos;on vend vraiment</Surtitre>
            <p className="font-[family-name:var(--titres)] text-[48px] sm:text-7xl leading-[1.02] lowercase">
              pas un buffet. <span className="text-[var(--accent-texte)]">dix secondes de silence.</span>
            </p>
            <p className="text-lg leading-relaxed text-[var(--doux)]">
              Quand les assiettes arrivent toutes ensemble, au signal du chef, la salle se tait. Dix secondes. C&apos;est pour
              ce moment-là qu&apos;on cuisine.
            </p>
          </div>
        </div>
      </section>

      {/* 4 · Chaque mariage devient une page. */}
      <section className="max-w-6xl mx-auto px-5 py-16 sm:py-24 space-y-8">
        <div className="space-y-4">
          <Surtitre>Les mariages</Surtitre>
          <h2 className="text-[48px] sm:text-7xl font-normal lowercase">chaque mariage devient une page.</h2>
          <p className="max-w-2xl text-lg leading-relaxed text-[var(--doux)]">
            Le nombre d&apos;invités, le menu, le prix par personne. Ce que les futurs mariés tapent sur Google, avec la réponse.
          </p>
        </div>
        <ul className="grid gap-4 md:grid-cols-3">
          {MARIAGES.map((m) => (
            <li key={m.slug}>
              <Link href={`${DOSSIER}/mariages/${m.slug}`} className="group block overflow-hidden rounded-[24px] border border-[var(--trait)] bg-[var(--carte)]">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={m.photo.src} alt={m.photo.alt} fill sizes="(min-width: 768px) 360px, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-5 space-y-1">
                  <p className="text-[12px] uppercase tracking-[0.22em] text-[var(--accent-texte)]">Mariage n° {m.numero} · exemple</p>
                  <h3 className="text-[28px] leading-tight">{m.titre}</h3>
                  <p className="text-[15px] text-[var(--doux)] tabular-nums">{euros(prixParPersonne(m.invites))} TTC par personne · exemple</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* 5 · La dégustation, en ligne. */}
      <section className="border-y border-[var(--trait)] bg-[var(--carte)]">
        <div className="max-w-6xl mx-auto px-5 py-16 sm:py-24 grid gap-8 md:grid-cols-[1fr_1fr] md:items-center">
          <div className="space-y-4">
            <Surtitre>La dégustation</Surtitre>
            <h2 className="text-[48px] sm:text-6xl font-normal lowercase">elle se réserve en ligne. <span className="text-[var(--accent-texte)]">comme une table.</span></h2>
            <p className="text-lg leading-relaxed text-[var(--doux)]">Un samedi, pour deux. Tu goûtes ton menu, on note ce qui change. Offerte (exemple).</p>
          </div>
          <div className="space-y-3">
            {libres.map((d) => (
              <Link key={d.id} href={`${DOSSIER}/degustation`} className="flex items-center justify-between rounded-[18px] border border-[var(--trait)] bg-[var(--fond)] px-5 py-4">
                <span>
                  <span className="block font-[family-name:var(--titres)] text-[24px] leading-tight">{d.jour}</span>
                  <span className="block text-[14px] text-[var(--doux)]">{d.heure} · pour deux</span>
                </span>
                <span aria-hidden="true" className="text-[var(--accent-texte)] text-2xl">→</span>
              </Link>
            ))}
            <p className="text-[13px] text-[var(--doux)]">Créneaux d&apos;exemple : l&apos;entreprise est fictive.</p>
          </div>
        </div>
      </section>

      {/* 6 · Les allergènes, avant la commande. */}
      <section className="max-w-6xl mx-auto px-5 py-16 sm:py-24 grid gap-8 md:grid-cols-[1fr_1fr]">
        <div className="space-y-4">
          <Surtitre>Avant la commande</Surtitre>
          <h2 className="text-[48px] sm:text-6xl font-normal lowercase">les allergies, d&apos;abord.</h2>
          <p className="text-lg leading-relaxed text-[var(--doux)]">
            Chaque plat dit ce qu&apos;il contient, parmi les quatorze allergènes que la réglementation européenne oblige à
            signaler. Et avant de commander, on te demande les allergies et les régimes de chaque table.
          </p>
        </div>
        <ul className="flex flex-wrap content-start gap-2">
          {ALLERGENES.map((a) => (
            <li key={a} className="rounded-full border border-[var(--trait)] px-4 py-2 text-[15px]">{a}</li>
          ))}
        </ul>
      </section>

      {/* 7 · La méthode. */}
      <section className="border-t border-[var(--trait)]">
        <div className="max-w-6xl mx-auto px-5 py-16 sm:py-24 space-y-10">
          <h2 className="text-[48px] sm:text-6xl font-normal lowercase">de la question au silence.</h2>
          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {METHODE.map((m, i) => (
              <li key={m.titre} className="space-y-2 border-t border-[var(--accent)] pt-4">
                <p className="font-[family-name:var(--titres)] text-[40px] leading-none text-[var(--accent-texte)]">{i + 1}</p>
                <h3 className="text-[28px] leading-tight lowercase">{m.titre}</h3>
                <p className="leading-relaxed text-[var(--doux)]">{m.texte}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 8 · Les questions. */}
      <section className="max-w-6xl mx-auto px-5 pb-16 sm:pb-24 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-4">
          <Surtitre>Questions</Surtitre>
          <h2 className="text-[48px] sm:text-6xl font-normal lowercase">avant de goûter.</h2>
          <div className="relative hidden lg:block aspect-[2/3] overflow-hidden rounded-[28px]">
            <Image src={photos.poisson.src} alt={photos.poisson.alt} fill sizes="380px" className="object-cover" />
          </div>
        </div>
        <Faq questions={QUESTIONS} />
      </section>

      {/* 9 · L'appel. */}
      <section className="bg-[var(--sombre)]">
        <div className="max-w-6xl mx-auto px-5 py-16 sm:py-24 space-y-6">
          <p className="font-[family-name:var(--titres)] text-[48px] sm:text-7xl leading-[1.02] lowercase">
            on ne compare plus des devis. <span className="text-[var(--accent-texte)]">on vient goûter.</span>
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href={`${DOSSIER}/degustation`} className="inline-flex h-14 items-center rounded-full bg-[var(--accent)] px-7 text-[17px] font-medium text-[var(--sur-accent)]">
              Réserver ma dégustation
            </Link>
            <a href={`tel:${entreprise.telephoneLien}`} className="inline-flex h-14 items-center rounded-full border border-[var(--trait)] px-6 text-[17px] tabular-nums">
              {entreprise.telephone}
            </a>
          </div>
          <p className="text-sm text-[var(--doux)]">Numéro fictif, réservé par l&apos;ARCEP aux œuvres de fiction.</p>
        </div>
      </section>
    </div>
  );
}
