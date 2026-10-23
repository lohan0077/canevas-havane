import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../../_kit/Apparition";
import Acheter from "../../_composants/Acheter";
import { AppelFinal, CHANFREIN } from "../../_composants/Blocs";
import Piece from "../../_composants/Piece";
import Tour from "../../_composants/Tour";
import { DOSSIER, ENVOI, boutonAchat, feminin, ouvertures, photos, pieceParSlug, pieces, prix } from "../../_composants/donnees";

// La page d'une pièce : la vidéo de son tournage, sa fiche, son prix, et le bouton
// d'achat — ou « Partie », si quelqu'un l'a déjà prise. Une page par numéro.
export function generateStaticParams() {
  return pieces.map((p) => ({ piece: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ piece: string }> }): Promise<Metadata> {
  const { piece } = await params;
  const p = pieceParSlug(piece);
  if (!p) return {};
  return {
    title: `${p.nom} — Après Nous, site de démonstration`,
    description: `La page du ${p.nom.toLowerCase()}, pièce unique d'un atelier de céramique imaginaire, avec la vidéo de son tournage.`,
    ...adressesDeLaPage(`/exemples/apres-nous/fournee/${p.slug}`),
  };
}

export default async function PagePiece({ params }: { params: Promise<{ piece: string }> }) {
  const { piece } = await params;
  const p = pieceParSlug(piece);
  if (!p) notFound();
  const autres = pieces.filter((x) => x.slug !== p.slug && !x.partie).slice(0, 4);
  const fiche: [string, string][] = [
    ["Numéro", `${p.numero} · pièce unique`],
    ["Terre", p.terre],
    ["Émail", p.emailNom],
    ["Dimensions", p.dimensions],
    [feminin(p.forme) ? "Tournée le" : "Tourné le", p.tourneLe],
    ["Sortie du four", ouvertures.derniere.date],
  ];

  return (
    <main>
      <section className="kit-grain relative bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-16 pt-28 sm:px-8 md:pt-32 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:pb-24">
          <div className="space-y-5" id="haut">
            <nav aria-label="Fil d'Ariane" className="text-sm text-[var(--sur-sombre)]/90">
              <Link href={`${DOSSIER}/fournee`} className="underline underline-offset-4">La fournée</Link>
              <span aria-hidden="true"> / </span>
              <span aria-current="page">{p.nom}</span>
            </nav>
            <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#E0B36A]">{p.nom} · pièce unique</p>
            <h1 className="font-[family-name:var(--titres)] text-[clamp(3rem,6vw,5.6rem)] leading-[0.95] tracking-[-0.02em]">
              {feminin(p.forme) ? "Celle que tu as vue" : "Celui que tu as vu"} <span className="italic text-[#E0B36A]">naître.</span>
            </h1>
            <p className="max-w-md text-lg leading-relaxed text-[var(--sur-sombre)]/90">
              Vingt secondes : {feminin(p.forme) ? "la" : "le"} {p.forme}, sur le tour, en train de naître. Fais glisser la
              barre, ou lance la vidéo.
            </p>
          </div>
          <Tour date={p.tourneLe.replace(" 2026", "")} legende={`Le tournage, le ${p.tourneLe} : ${p.nom}. Ici, une animation : l'atelier est fictif, la vraie vidéo serait celle de cette pièce.`} />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:py-24 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-8">
          <Apparition className={`flex items-center gap-5 border border-[var(--trait)] bg-[var(--carte)] p-5 ${CHANFREIN}`}>
            <Piece forme={p.forme} email={p.email} className="w-28 shrink-0" titre={`Dessin du ${p.nom.toLowerCase()}`} />
            <div className="space-y-1">
              <p className="font-[family-name:var(--titres)] text-3xl leading-tight">{p.nom}</p>
              <p className="text-[var(--doux)]">{p.terre} émaillé, tourné le {p.tourneLe.replace(" 2026", "")}</p>
              <p className="text-2xl font-bold tabular-nums">
                {prix(p.prix)} <span className="text-sm font-semibold text-[var(--doux)]">TTC · exemple</span>
              </p>
            </div>
          </Apparition>
          <Acheter nom={p.nom} bouton={boutonAchat(p.forme)} prix={prix(p.prix)} partie={p.partie} envoi={`${ENVOI.prix}, ${ENVOI.delai}`} />
          <dl className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
            {fiche.map(([t, d]) => (
              <div key={t} className="flex justify-between gap-6 py-3">
                <dt className="font-semibold">{t}</dt>
                <dd className="text-right text-[var(--doux)]">{d}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="space-y-8">
          <Apparition as="figure" de="droite" className="rotate-[-1.5deg] bg-[#FFF9EF] p-7 shadow-[0_18px_40px_-28px_rgba(42,27,18,0.6)]">
            <blockquote className="font-[family-name:var(--f-caveat)] text-[2.1rem] leading-snug text-[var(--encre)]">{p.note}</blockquote>
            <figcaption className="mt-3 text-sm text-[var(--doux)]">La note de l&apos;atelier, glissée dans le carton.</figcaption>
          </Apparition>
          {p.slug === "bol-112" && (
            <Apparition as="figure" de="rideau" className="space-y-2">
              <div className={`relative aspect-[5/4] overflow-hidden ${CHANFREIN}`}>
                <Image src={photos.bol.src} alt={photos.bol.alt} fill sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" />
              </div>
              <figcaption className="text-sm text-[var(--doux)]">Photo d&apos;illustration : l&apos;atelier et ses pièces sont fictifs.</figcaption>
            </Apparition>
          )}
        </div>
      </section>

      <section className="border-t border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto max-w-7xl space-y-8 px-5 py-16 sm:px-8">
          <h2 className="font-[family-name:var(--titres)] text-[clamp(2.2rem,4vw,3.4rem)] leading-tight">
            Encore en ligne, <span className="italic text-[var(--accent-texte)]">dans la même fournée.</span>
          </h2>
          <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {autres.map((x) => (
              <li key={x.slug}>
                <Link href={`${DOSSIER}/fournee/${x.slug}`} className={`block space-y-2 border border-[var(--trait)] bg-[var(--fond)] p-4 ${CHANFREIN}`}>
                  <Piece forme={x.forme} email={x.email} className="mx-auto w-3/4" />
                  <p className="font-[family-name:var(--titres)] text-2xl">{x.nom}</p>
                  <p className="font-semibold tabular-nums">{prix(x.prix)}</p>
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
