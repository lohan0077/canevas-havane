import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { CLASSES, CRENEAUX, DOSSIER, METHODE, QUESTIONS, entreprise, photos } from "./_composants/donnees";
import { AppelFinal, Faq, Note } from "./_composants/Blocs";
import ChoixChapitre from "./_composants/ChoixChapitre";
import { CalculMois, PrixCours } from "./_composants/Prix";

// L'accueil du Bon Chapitre. La vidéo : « Sur l'accueil, pas de CV. Une seule
// question : quel chapitre bloque ? » puis « le site lui montre la première séance,
// minute par minute ». Autour : la page par classe, la méthode, le prix affiché selon
// l'arrêté du 17 mars 2015, les créneaux de la semaine, les questions des parents.
export const metadata: Metadata = {
  title: "Le Bon Chapitre — site de démonstration",
  description: "Site de démonstration d'une professeure de maths à domicile imaginaire, réalisé par Canevas Havane : pas de CV, une question — quel chapitre bloque ?",
  ...adressesDeLaPage("/exemples/le-bon-chapitre"),
};

export default function LeBonChapitre() {
  const libres = CRENEAUX.filter((c) => !c.pris).slice(0, 3);

  return (
    <main>
      {/* 1 · L'ouverture : pas de CV, une question, sur une page de cahier. */}
      <section className="max-w-6xl mx-auto px-5 pt-8 pb-14 sm:pt-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div className="space-y-5 lg:pt-6">
          <Note>Pas de CV. Une question.</Note>
          <h1 className="text-[40px] sm:text-6xl">
            Cours de maths à domicile, <span className="text-[var(--accent-texte)]">chapitre par chapitre.</span>
          </h1>
          <p className="text-lg leading-relaxed">
            Avec {entreprise.prof}, chez vous, une heure par semaine. On commence par le chapitre
            qui bloque, pas par un bilan.
          </p>
        </div>
        <ChoixChapitre />
      </section>

      {/* 2 · Le dimanche soir. */}
      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)] [--accent-texte:#F2C14E]">
        <div className="max-w-6xl mx-auto px-5 py-16 sm:py-24 grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div className="space-y-5">
            <h2 className="text-5xl sm:text-6xl">Pas des heures de maths. <span className="text-[var(--accent-texte)]">Des dimanches soir sans dispute.</span></h2>
            <p className="text-lg leading-relaxed">
              Le dimanche à 20 h, les devoirs sont faits, et personne n&apos;a crié. C&apos;est
              l&apos;image qu&apos;on vise. Pas une note : on ne promet aucune note, personne ne
              peut le faire honnêtement.
            </p>
          </div>
          <div className="mx-auto w-[82%] max-w-xs rotate-[3deg] rounded-[6px] bg-[var(--fond)] text-[var(--encre)] p-7 shadow-[0_30px_60px_-30px_rgba(0,0,0,.8)] space-y-4">
            <p className="font-[family-name:var(--titres)] text-4xl">Dimanche</p>
            <p className="font-[family-name:var(--titres)] text-6xl text-[#B23A27] [font-variant-numeric:lining-nums]">20 h</p>
            <ul className="space-y-1 font-[family-name:var(--f-caveat)] text-3xl">
              <li>✓ Devoirs faits</li>
              <li>✓ Sans dispute</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3 · Une page par classe. */}
      <section className="max-w-6xl mx-auto px-5 py-16 sm:py-24 grid gap-10 md:grid-cols-[1fr_1.1fr] md:items-center">
        <div className="relative aspect-[3/4] max-h-[520px] overflow-hidden rounded-[6px]">
          <Image src={photos.equerre.src} alt={photos.equerre.alt} fill sizes="(min-width: 768px) 460px, 100vw" className="object-cover" />
        </div>
        <div className="space-y-6">
          <Note>Une page par classe</Note>
          <h2 className="text-4xl sm:text-5xl">La méthode, le programme, <span className="text-[var(--accent-texte)]">le prix.</span></h2>
          <p className="text-lg leading-relaxed">
            Ce que tapent les parents, c&apos;est « prix cours particulier maths 3e ». Alors
            chaque classe a sa page, avec les trois réponses.
          </p>
          <ul className="grid grid-cols-5 gap-2">
            {CLASSES.map((c) => (
              <li key={c.classe}>
                {c.lien ? (
                  <Link href={`${DOSSIER}/maths-3e`} className="grid h-16 place-items-center rounded-[6px] bg-[var(--accent)] text-[var(--sur-accent)] font-[family-name:var(--titres)] text-2xl">
                    {c.classe}
                  </Link>
                ) : (
                  <span className="grid h-16 place-items-center rounded-[6px] border-2 border-dashed border-[var(--trait)] font-[family-name:var(--titres)] text-2xl text-[var(--doux)]">{c.classe}</span>
                )}
              </li>
            ))}
          </ul>
          <p className="text-sm text-[var(--doux)]">Démonstration : seule la page de 3e est construite, les autres suivraient le même modèle.</p>
        </div>
      </section>

      {/* 4 · La méthode. */}
      <section className="border-y-2 border-[var(--encre)] bg-[var(--carte)]">
        <div className="max-w-6xl mx-auto px-5 py-16 sm:py-20 space-y-10">
          <div className="grid gap-8 md:grid-cols-2 md:items-end">
            <h2 className="text-4xl sm:text-5xl">Une heure, <span className="text-[var(--accent-texte)]">quatre temps.</span></h2>
            <div className="relative aspect-[3/2] overflow-hidden rounded-[6px]">
              <Image src={photos.chrono.src} alt={photos.chrono.alt} fill sizes="(min-width: 768px) 560px, 100vw" className="object-cover" />
            </div>
          </div>
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {METHODE.map((m, i) => (
              <li key={m.titre} className="space-y-2 border-t-2 border-[var(--encre)] pt-4">
                <p className="font-[family-name:var(--f-caveat)] text-3xl text-[var(--accent-texte)]">{i + 1}.</p>
                <h3 className="text-2xl">{m.titre}</h3>
                <p className="leading-relaxed text-[var(--doux)]">{m.texte}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5 · Le prix, en grand ; l'avantage fiscal, à part. */}
      <section id="prix" className="scroll-mt-20 max-w-6xl mx-auto px-5 py-16 sm:py-24 grid gap-8 lg:grid-cols-2 lg:items-start">
        <div className="space-y-6">
          <Note>Le prix, en grand</Note>
          <h2 className="text-4xl sm:text-5xl">Le crédit d&apos;impôt, <span className="text-[var(--accent-texte)]">à part, en plus petit.</span></h2>
          <p className="text-lg leading-relaxed">
            C&apos;est la règle pour les cours à domicile : le prix à l&apos;heure, hors taxes et
            toutes taxes comprises, les frais annexes, et l&apos;avantage fiscal détaché du prix.
          </p>
          <CalculMois />
        </div>
        <PrixCours />
      </section>

      {/* 6 · Cette semaine. */}
      <section className="max-w-6xl mx-auto px-5 pb-16 sm:pb-24 space-y-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-4xl sm:text-5xl">Cette semaine, <span className="text-[var(--accent-texte)]">en vrai.</span></h2>
          <Link href={`${DOSSIER}/reserver`} className="font-bold underline underline-offset-4 decoration-2 decoration-[var(--accent)]">Tout l&apos;agenda</Link>
        </div>
        <ul className="grid gap-3 sm:grid-cols-3">
          {libres.map((c) => (
            <li key={c.libelle + c.sous}>
              <Link href={`${DOSSIER}/reserver`} className="flex items-center justify-between rounded-[6px] border-2 border-[var(--encre)] bg-[var(--carte)] px-5 py-4">
                <span>
                  <span className="block text-xl font-bold">{c.libelle}</span>
                  <span className="block text-sm text-[var(--doux)]">{c.sous}</span>
                </span>
                <span aria-hidden="true" className="font-[family-name:var(--f-caveat)] text-3xl text-[var(--accent-texte)]">→</span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="text-sm text-[var(--doux)]">Créneaux d&apos;exemple : l&apos;entreprise est fictive.</p>
      </section>

      {/* 7 · Les questions des parents. */}
      <section className="max-w-6xl mx-auto px-5 pb-16 sm:pb-24 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-4">
          <Note>Les questions des parents</Note>
          <h2 className="text-4xl sm:text-5xl">Avant le <span className="text-[var(--accent-texte)]">premier cours.</span></h2>
          <div className="relative hidden lg:block aspect-[3/4] overflow-hidden rounded-[6px]">
            <Image src={photos.crayonRouge.src} alt={photos.crayonRouge.alt} fill sizes="380px" className="object-cover" />
          </div>
        </div>
        <Faq questions={QUESTIONS} />
      </section>

      <AppelFinal />
    </main>
  );
}
