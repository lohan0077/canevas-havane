import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import Panier from "../_kit/Panier";
import { CONSEILS, DOSSIER, FAQ, LETTRE, PRODUITS, euros, maison, photos } from "./_composants/donnees";
import Faq from "./_composants/Faq";

// Le site de la marque imaginée dans la vidéo « Si je devais créer une marque de
// papeterie » : on ne vend pas du papier, on vend la lettre qu'on garde quarante ans.
// Mise en page inspirée du modèle « Editorial Collection CTA » de MotionSites — grand
// titre romain et italique, beaucoup d'air, l'objet posé à côté —, transposée à une
// papeterie.
export const metadata: Metadata = {
  title: "Relue — site de démonstration",
  description: "Site de démonstration d'une marque de papeterie imaginaire, réalisé par Canevas Havane : la lettre qu'on garde quarante ans, et un service qui te poste ta propre lettre dans un an, jour pour jour.",
  ...adressesDeLaPage("/exemples/relue"),
};

const Surtitre = ({ children }: { children: React.ReactNode }) => (
  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent-texte)]">{children}</p>
);

export default function Relue() {
  return (
    <div>
      {/* 1. L'ouverture. */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 pt-12 sm:pt-20 pb-16 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-7">
          <Surtitre>Papeterie · Ta Ville</Surtitre>
          <h1 className="font-normal text-[3.4rem] leading-[0.98] sm:text-8xl tracking-[-0.02em]">
            La lettre qu&apos;on garde <span className="italic text-[var(--accent-texte)]">quarante ans.</span>
          </h1>
          <p className="text-xl leading-relaxed max-w-md">
            On ne vend pas du papier. On vend celle qu&apos;on retrouve au grenier, dans une boîte à
            chaussures — et qu&apos;on relit debout.
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link href={`${DOSSIER}/dans-un-an`} className="rounded-full bg-[var(--sombre)] text-[var(--sur-sombre)] px-7 py-4 text-lg font-medium">
              T&apos;écrire une lettre
            </Link>
            <Link href="#papeterie" className="text-lg font-medium underline underline-offset-8 decoration-[var(--accent)]">
              La papeterie
            </Link>
          </div>
        </div>
        <div className="relative">
          <div className="relative aspect-[4/5] rounded-[4px] overflow-hidden bg-[var(--sombre)] shadow-[0_30px_60px_-30px_rgba(30,43,74,0.5)]">
            <Image src={photos.plume.src} alt={photos.plume.alt} fill priority sizes="(min-width: 1024px) 480px, 100vw" className="object-cover" />
          </div>
          <Link href={`${DOSSIER}/lettre-de-la-semaine`} className="absolute -bottom-6 left-4 right-4 sm:left-auto sm:-left-10 sm:right-auto sm:w-72 rounded-[6px] bg-[var(--carte)] border border-[var(--trait)] p-4 shadow-lg space-y-1">
            <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-texte)]">Cette semaine · lettre n° {LETTRE.numero}</span>
            <span className="block font-[family-name:var(--titres)] text-2xl italic">«&nbsp;{LETTRE.lignes[0]}&nbsp;»</span>
            <span className="block text-sm text-[var(--doux)]">Lue avec l&apos;accord de son auteur →</span>
          </Link>
        </div>
      </section>

      {/* 2. Le grenier. */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 pt-16 pb-20 grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-center">
        <div className="relative aspect-[3/2] rounded-[4px] overflow-hidden bg-[var(--sombre)] order-2 md:order-1">
          <Image src={photos.lettres.src} alt={photos.lettres.alt} fill sizes="(min-width: 768px) 500px, 100vw" className="object-cover" />
        </div>
        <div className="space-y-5 order-1 md:order-2">
          <Surtitre>Ce qu&apos;on vend vraiment</Surtitre>
          <h2 className="font-normal text-5xl sm:text-6xl leading-[1.02]">Personne ne relit un message. <span className="italic">Tout le monde relit une lettre.</span></h2>
          <p className="text-xl leading-relaxed">
            Notre papier est fait pour ça : épais, crème, qui ne jaunit pas vite. Le reste, c&apos;est toi
            qui l&apos;écris.
          </p>
        </div>
      </section>

      {/* 3. Le service : ta lettre dans un an. */}
      <section className="border-y border-[var(--trait)] bg-[var(--carte)]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20 grid gap-10 md:grid-cols-2 md:items-center">
          <div className="space-y-5">
            <Surtitre>Le service</Surtitre>
            <h2 className="font-normal text-5xl sm:text-7xl leading-[0.98]">Ta lettre, dans un an. <span className="italic">Jour pour jour.</span></h2>
            <p className="text-xl leading-relaxed">
              Tu t&apos;écris quelques lignes. On les imprime sur notre papier, on cachette, et on te
              la poste dans un an. Personne ne la lit avant toi.
            </p>
            <p className="text-[var(--doux)]">{euros(maison.prixService)} TTC, papier, cire et timbre compris · exemple.</p>
            <Link href={`${DOSSIER}/dans-un-an`} className="inline-flex rounded-full bg-[var(--accent)] text-[var(--sur-accent)] px-7 py-4 text-lg font-medium">
              T&apos;écrire une lettre
            </Link>
          </div>
          <svg viewBox="0 0 300 200" className="w-full max-w-md mx-auto drop-shadow-[0_18px_30px_rgba(30,43,74,0.2)]" aria-hidden="true">
            <rect x="4" y="14" width="292" height="182" rx="8" fill="#E9DCC3" />
            <path d="M4 196 L150 104 L296 196 Z" fill="#E2D2B4" />
            <path d="M4 22 L4 196 L130 112 Z M296 22 L296 196 L170 112 Z" fill="#DFCDAD" />
            <path d="M4 14 H296 L150 122 Z" fill="#D6C29E" />
            <circle cx="150" cy="118" r="20" fill="var(--accent)" />
            <text x="150" y="126" textAnchor="middle" fontSize="22" fill="#FFFFFF" style={{ fontFamily: "var(--titres)" }}>R</text>
            <rect x="238" y="26" width="42" height="50" rx="3" fill="var(--sombre)" />
            <circle cx="196" cy="58" r="32" fill="none" stroke="var(--sombre)" strokeWidth="2.5" />
            <text x="196" y="54" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--sombre)" letterSpacing="1">DANS</text>
            <text x="196" y="70" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--sombre)" letterSpacing="1">UN AN</text>
          </svg>
        </div>
      </section>

      {/* 4. L'affiche du lancement. */}
      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-24 text-center space-y-6">
          <p className="font-[family-name:var(--titres)] text-6xl sm:text-8xl leading-[0.95]">
            Personne n&apos;encadre <span className="italic text-[#E9B44C]">un texto.</span>
          </p>
          <p className="text-sm uppercase tracking-[0.2em]">Relue · papeterie</p>
        </div>
      </section>

      {/* 5. La papeterie. */}
      <section id="papeterie" className="scroll-mt-20 max-w-6xl mx-auto px-5 sm:px-8 py-20 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-5">
          <Surtitre>La papeterie</Surtitre>
          <h2 className="font-normal text-5xl sm:text-6xl leading-[1.02]">Le nécessaire. <span className="italic">Rien de plus.</span></h2>
          <p className="text-xl leading-relaxed">
            Quatre choses pour écrire une lettre qui tient quarante ans. Pas de pastel, pas de
            dorure, pas de phrase en anglais.
          </p>
          <div className="relative aspect-[4/5] max-w-sm rounded-[4px] overflow-hidden bg-[var(--sombre)]">
            <Image src={photos.cachet.src} alt={photos.cachet.alt} fill sizes="(min-width: 1024px) 384px, 100vw" className="object-cover" />
          </div>
        </div>
        <Panier produits={PRODUITS} bouton="Commander" confirmation="Commande prête" mention="Prix TTC d'exemple, livraison non comprise." />
      </section>

      {/* 6. La lettre de la semaine. */}
      <section className="border-y border-[var(--trait)] bg-[var(--carte)]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20 grid gap-10 md:grid-cols-[1fr_1fr] md:items-center">
          <div className="space-y-5">
            <Surtitre>Chaque semaine</Surtitre>
            <h2 className="font-normal text-5xl sm:text-6xl leading-[1.02]">Une vraie lettre, <span className="italic">lue à voix haute.</span></h2>
            <p className="text-xl leading-relaxed">
              Avec l&apos;accord de celui qui l&apos;a écrite. Pas de celui qui l&apos;a reçue : le papier
              lui appartient, le texte reste à son auteur.
            </p>
            <Link href={`${DOSSIER}/lettre-de-la-semaine`} className="inline-flex rounded-full bg-[var(--sombre)] text-[var(--sur-sombre)] px-7 py-4 text-lg font-medium">
              Écouter la lettre n° {LETTRE.numero}
            </Link>
          </div>
          <figure className="rounded-[6px] bg-[var(--fond)] border border-[var(--trait)] px-6 py-7 -rotate-1 shadow-[0_18px_40px_-18px_rgba(30,43,74,0.35)]">
            <blockquote className="space-y-1.5 font-[family-name:var(--titres)] italic text-2xl leading-snug">
              {LETTRE.lignes.slice(0, 4).map((l) => (
                <p key={l}>{l}</p>
              ))}
            </blockquote>
            <figcaption className="mt-4 text-sm text-[var(--doux)]">
              {LETTRE.signature} — {LETTRE.lieu} · lettre inventée pour l&apos;exemple
            </figcaption>
          </figure>
        </div>
      </section>

      {/* 7. Écrire une lettre qu'on garde. */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-20 space-y-10">
        <div className="space-y-4 max-w-2xl">
          <Surtitre>Quatre conseils</Surtitre>
          <h2 className="font-normal text-5xl sm:text-6xl leading-[1.02]">Écrire une lettre <span className="italic">qu&apos;on garde.</span></h2>
        </div>
        <ol className="grid gap-x-10 gap-y-8 md:grid-cols-2">
          {CONSEILS.map((c, i) => (
            <li key={c.titre} className="flex gap-5 border-t border-[var(--encre)] pt-5">
              <span className="font-[family-name:var(--titres)] text-4xl italic text-[var(--accent-texte)] tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <div className="space-y-2">
                <h3 className="font-normal text-3xl">{c.titre}</h3>
                <p className="text-lg leading-relaxed">{c.texte}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* 8. L'atelier, en image. */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 pb-20">
        <div className="relative aspect-[16/10] sm:aspect-[21/9] rounded-[4px] overflow-hidden bg-[var(--sombre)]">
          <Image src={photos.enveloppe.src} alt={photos.enveloppe.alt} fill sizes="(min-width: 1152px) 1088px, 100vw" className="object-cover" />
        </div>
        <p className="mt-4 font-[family-name:var(--titres)] text-3xl italic">Une adresse écrite à la main, c&apos;est déjà une lettre.</p>
      </section>

      {/* 9. Questions. */}
      <section className="max-w-4xl mx-auto px-5 sm:px-8 pb-20 space-y-8">
        <h2 className="font-normal text-5xl sm:text-6xl">Questions.</h2>
        <Faq questions={FAQ} />
      </section>

      {/* 10. Le dernier mot. */}
      <section className="px-5 sm:px-8 pb-20">
        <div className="max-w-6xl mx-auto rounded-[6px] bg-[var(--sombre)] text-[var(--sur-sombre)] px-6 py-16 sm:p-20 text-center space-y-7">
          <p className="font-[family-name:var(--titres)] text-5xl sm:text-7xl leading-[1]">
            Une lettre, ça s&apos;écrit <span className="italic text-[#E9B44C]">pour être relue.</span>
          </p>
          <Link href={`${DOSSIER}/dans-un-an`} className="inline-flex rounded-full bg-[#E9B44C] text-[var(--sombre)] px-8 py-4 text-lg font-medium">
            T&apos;écrire une lettre
          </Link>
        </div>
      </section>
    </div>
  );
}
