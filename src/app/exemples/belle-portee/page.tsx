import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, LIVRABLES, bureau, photos, questions } from "./_composants/donnees";
import { Affiche, Faq, MurDeLaSemaine, Verifications } from "./_composants/Blocs";

// L'accueil de Belle Portée, le bureau d'études imaginé dans la vidéo « Si je devais
// créer un bureau d'études de zéro » : on ne vend pas des notes de calcul, on vend le
// mur qui disparaît. Le site ne dit jamais oui à distance : il dit quoi vérifier et
// propose une visite. Autour, ce qu'un vrai bureau montrerait.
export const metadata: Metadata = {
  title: "Belle Portée — site de démonstration",
  description: "Site de démonstration d'un bureau d'études structure imaginaire, réalisé par Canevas Havane : ton mur en photo, ce qu'on vérifiera, et une date de visite. Jamais de oui à distance.",
  ...adressesDeLaPage("/exemples/belle-portee"),
};

const RECHERCHES = ["prix bureau d étude mur porteur", "bureau d étude ouverture mur porteur", "ouverture mur porteur sans bureau d étude"];

const METHODE = [
  { titre: "La photo", texte: "Ton mur, ce qu'il y a au-dessus, la largeur voulue. Cinq minutes, depuis ton téléphone." },
  { titre: "La visite", texte: "On vient voir. On regarde les planchers, les appuis, la charpente. Pas de oui avant." },
  { titre: "Le calcul", texte: "La poutre, ses appuis, les étais du chantier : une note que le maçon suit à la lettre." },
  { titre: "La pose", texte: "Le jour où la poutre est posée, on repasse vérifier. Le mur peut partir." },
];

export default function BellePortee() {
  return (
    <>
      {/* 1 · L'ouverture : l'aplat jaune, le titre en capitales, le chantier dans son cadre. */}
      <section className="bg-[var(--accent)] text-[var(--sur-accent)]">
        <div className="mx-auto max-w-6xl p-3 sm:p-5">
          <div className="grid border-2 border-[var(--encre)] md:grid-cols-[1fr_1.05fr]">
            <div className="flex flex-col justify-between gap-10 p-5 sm:p-8">
              <div className="space-y-5">
                <p className="text-xs font-bold uppercase tracking-[0.18em]">{bureau.titre}</p>
                <h1 className="text-[56px] font-bold uppercase leading-[0.92] tracking-[-0.01em] sm:text-8xl">
                  Ouvrez grand.
                </h1>
              </div>
              <div className="space-y-5">
                <p className="max-w-md text-lg leading-relaxed">
                  Tu veux abattre un mur porteur&nbsp;? On calcule la poutre qui le remplace. Et on
                  vient le voir avant de te dire oui.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link href={`${DOSSIER}/mon-mur`} className="inline-flex min-h-[52px] items-center bg-[var(--encre)] px-6 text-sm font-bold uppercase tracking-[0.1em] text-[#F2B134]">
                    Mon mur en photo
                  </Link>
                  <Link href={`${DOSSIER}/visite`} className="inline-flex min-h-[52px] items-center border-2 border-[var(--encre)] px-5 text-sm font-bold uppercase tracking-[0.1em]">
                    La visite
                  </Link>
                </div>
              </div>
            </div>
            <div className="border-t-2 border-[var(--encre)] p-3 md:border-l-2 md:border-t-0 sm:p-5">
              <Image src={photos.cuisine.src} alt={photos.cuisine.alt} width={photos.cuisine.largeur} height={photos.cuisine.hauteur} priority sizes="(min-width: 768px) 560px, 100vw" className="h-full w-full border-2 border-[var(--encre)] object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* 2 · Le contre-pied : pas des calculs, le mur qui disparaît. */}
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:py-24 md:grid-cols-2 md:items-center">
        <div className="space-y-5">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent-texte)]">Ce qu&apos;on vend</p>
          <h2 className="text-5xl font-bold uppercase leading-[0.95] sm:text-6xl">
            <span className="text-[var(--doux)] line-through decoration-[var(--accent)] decoration-4">Des calculs.</span>{" "}
            Le mur qui disparaît.
          </h2>
          <p className="text-lg leading-relaxed">
            Personne ne rêve d&apos;une note de calcul. On rêve de la cuisine ouverte sur le salon,
            de la lumière qui traverse. La note de calcul, c&apos;est ce qui permet que le plafond
            reste où il est.
          </p>
        </div>
        <div className="border-2 border-[var(--encre)] bg-[var(--carte)] p-5">
          <p className="flex items-center gap-3 border-2 border-[var(--trait)] px-4 py-3 text-[var(--doux)]">
            <span aria-hidden="true">⌕</span> bureau d&apos;étude mur porteur
          </p>
          <ul className="pt-2">
            {RECHERCHES.map((r, i) => (
              <li key={r} className={`px-4 py-2.5 ${i === 2 ? "bg-[var(--accent)] font-bold" : ""}`}>{r}</li>
            ))}
          </ul>
          <p className="px-4 pt-3 text-sm text-[var(--doux)]">Suggestions de recherche relevées le 15 octobre 2026. La troisième, on la comprend. On y répond plus bas.</p>
        </div>
      </section>

      {/* 3 · Ton mur, en photo. */}
      <section className="border-y-2 border-[var(--encre)] bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:py-24 md:grid-cols-2 md:items-center">
          <div className="space-y-5">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#F2B134]">Sur le site</p>
            <h2 className="text-5xl font-bold uppercase leading-[0.95] sm:text-6xl">Ton mur, en photo.</h2>
            <p className="text-lg leading-relaxed text-[#D8DDE4]">
              Tu prends ton mur en photo. Tu dis ce qu&apos;il y a au-dessus, et la largeur que tu
              veux ouvrir. On te répond ce qu&apos;on vérifiera — jamais « oui, ça passe ».
            </p>
            <Link href={`${DOSSIER}/mon-mur`} className="inline-flex min-h-[52px] items-center bg-[var(--accent)] px-6 text-sm font-bold uppercase tracking-[0.1em] text-[var(--sur-accent)]">
              Essayer avec mon mur
            </Link>
          </div>
          <Image src={photos.etais.src} alt={photos.etais.alt} width={photos.etais.largeur} height={photos.etais.hauteur} sizes="(min-width: 768px) 560px, 100vw" className="h-auto w-full border-2 border-[#F3EEE4]" />
        </div>
      </section>

      {/* 4 · Avant de dire oui. */}
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:py-24 md:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-5">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent-texte)]">Avant de dire oui</p>
          <h2 className="text-5xl font-bold uppercase leading-[0.95] sm:text-6xl">On vient voir ton mur.</h2>
          <p className="text-lg leading-relaxed">
            Une photo ne montre ni le sens des planchers ni l&apos;état des appuis. Alors on vient,
            et on regarde trois choses.
          </p>
          <Link href={`${DOSSIER}/visite`} className="inline-flex min-h-[52px] items-center bg-[var(--encre)] px-6 text-sm font-bold uppercase tracking-[0.1em] text-[#F2B134]">
            Choisir ma date de visite
          </Link>
        </div>
        <Verifications />
      </section>

      {/* 5 · La méthode. */}
      <section className="border-y-2 border-[var(--encre)]">
        <ol className="mx-auto grid max-w-6xl sm:grid-cols-2 lg:grid-cols-4">
          {METHODE.map((m, i) => (
            <li key={m.titre} className={`space-y-3 border-[var(--encre)] p-6 ${i > 0 ? "border-t-2 sm:border-t-0" : ""} ${i % 2 ? "sm:border-l-2" : ""} ${i > 1 ? "sm:border-t-2 lg:border-t-0" : ""} ${i === 2 ? "lg:border-l-2" : ""}`}>
              <p className="font-[family-name:var(--titres)] text-6xl font-bold text-[var(--accent-texte)]">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="text-2xl font-bold uppercase">{m.titre}</h3>
              <p className="leading-relaxed text-[var(--doux)]">{m.texte}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* 6 · Ce qu'on livre, et ce que ça coûte. */}
      <section className="mx-auto max-w-6xl space-y-10 px-5 py-20 sm:py-24">
        <div className="max-w-2xl space-y-4">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent-texte)]">Ce qu&apos;on livre</p>
          <h2 className="text-5xl font-bold uppercase leading-[0.95] sm:text-6xl">Trois prix, écrits.</h2>
        </div>
        <ul className="grid border-2 border-[var(--encre)] md:grid-cols-3">
          {LIVRABLES.map((l, i) => (
            <li key={l.titre} className={`flex flex-col justify-between gap-6 bg-[var(--carte)] p-6 ${i > 0 ? "border-t-2 border-[var(--encre)] md:border-l-2 md:border-t-0" : ""}`}>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold uppercase">{l.titre}</h3>
                <p className="leading-relaxed text-[var(--doux)]">{l.texte}</p>
              </div>
              <p className="text-xl font-bold">{l.prix} <span className="text-sm font-normal text-[var(--doux)]">· exemple</span></p>
            </li>
          ))}
        </ul>
        <p className="text-sm text-[var(--doux)]">Prix TTC d&apos;exemple pour un particulier : le bureau est fictif. Le devis écrit précède toute intervention.</p>
      </section>

      {/* 7 · Le mur de la semaine. */}
      <section className="bg-[var(--accent)] text-[var(--sur-accent)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:py-24 md:grid-cols-2 md:items-center">
          <div className="space-y-5">
            <p className="text-xs font-bold uppercase tracking-[0.18em]">Chaque vendredi</p>
            <h2 className="text-5xl font-bold uppercase leading-[0.95] sm:text-6xl">Le mur de la semaine.</h2>
            <p className="text-lg leading-relaxed">
              Une courte vidéo : un mur, avant, après, et la poutre qui le remplace. Tournée chez
              des clients, avec leur accord écrit.
            </p>
          </div>
          <MurDeLaSemaine />
        </div>
      </section>

      {/* 8 · Le lancement : au rayon des masses. */}
      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:py-24 md:grid-cols-2 md:items-center">
        <Affiche />
        <div className="space-y-5">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent-texte)]">Au rayon des masses</p>
          <h2 className="text-5xl font-bold uppercase leading-[0.95] sm:text-6xl">Avant la masse, le calcul.</h2>
          <p className="text-lg leading-relaxed">
            Notre affiche, posée avec l&apos;accord des magasins de bricolage, là où l&apos;on achète la
            masse pour abattre un mur. Le meilleur moment pour y penser.
          </p>
          <Image src={photos.poutre.src} alt={photos.poutre.alt} width={photos.poutre.largeur} height={photos.poutre.hauteur} sizes="(min-width: 768px) 560px, 100vw" className="h-auto w-full border-2 border-[var(--encre)]" />
        </div>
      </section>

      {/* 9 · Les questions. */}
      <section className="border-t-2 border-[var(--encre)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:py-24 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-6">
            <h2 className="text-5xl font-bold uppercase leading-[0.95] sm:text-6xl">Les questions.</h2>
            <Image src={photos.charpente.src} alt={photos.charpente.alt} width={photos.charpente.largeur} height={photos.charpente.hauteur} sizes="(min-width: 1024px) 400px, 100vw" className="hidden h-auto w-full border-2 border-[var(--encre)] lg:block" />
          </div>
          <Faq questions={questions} />
        </div>
      </section>
    </>
  );
}
