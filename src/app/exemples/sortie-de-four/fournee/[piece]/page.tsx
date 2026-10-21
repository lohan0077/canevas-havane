import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, ENVOI, boutonAchat, feminin, ouvertures, photos, pieceParSlug, pieces, prix } from "../../_composants/donnees";
import Tour from "../../_composants/Tour";
import Piece from "../../_composants/Piece";
import Acheter from "../../_composants/Acheter";

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
    title: `${p.nom} · Sortie de Four — site de démonstration`,
    description: `Site de démonstration d'un atelier de céramique imaginaire : la page du ${p.nom.toLowerCase()}, pièce unique, avec la vidéo de son tournage.`,
    ...adressesDeLaPage(`/exemples/sortie-de-four/fournee/${p.slug}`),
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
    <div className="mx-auto max-w-6xl px-5 pb-20 pt-8 sm:px-6">
      <nav aria-label="Fil d'Ariane" className="text-sm">
        <Link href={`${DOSSIER}/fournee`} className="underline underline-offset-4">La fournée</Link>
        <span aria-hidden="true"> / </span>
        <span aria-current="page">{p.nom}</span>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div className="space-y-6 lg:sticky lg:top-24">
          <div className="space-y-3" id="haut">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--accent-texte)]">{p.nom} · pièce unique</p>
            <h1 className="text-[52px] font-normal sm:text-7xl">
              {feminin(p.forme) ? "Celle que tu as vue" : "Celui que tu as vu"} <span className="italic text-[var(--accent-texte)]">naître.</span>
            </h1>
          </div>
          <Tour date={p.tourneLe} legende={`Le tournage du ${p.nom.toLowerCase()}, le ${p.tourneLe}. Ici, une animation : l'atelier est fictif, la vraie vidéo serait celle de cette pièce.`} />
        </div>

        <div className="space-y-8">
          <div className="flex items-center gap-5 rounded-[28px] border border-[var(--trait)] bg-[var(--carte)] p-5">
            <Piece forme={p.forme} email={p.email} className="w-28 shrink-0" titre={`Dessin du ${p.nom.toLowerCase()}`} />
            <div className="space-y-1">
              <p className="font-[family-name:var(--titres)] text-3xl leading-tight">{p.nom}</p>
              <p className="text-[var(--doux)]">{p.terre} émaillé, tourné le {p.tourneLe.replace(" 2026", "")}</p>
              <p className="text-2xl font-bold tabular-nums">
                {prix(p.prix)} <span className="text-sm font-semibold text-[var(--doux)]">TTC · exemple</span>
              </p>
            </div>
          </div>

          <Acheter nom={p.nom} bouton={boutonAchat(p.forme)} prix={prix(p.prix)} partie={p.partie} envoi={ENVOI.delai} />

          <dl className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
            {fiche.map(([t, d]) => (
              <div key={t} className="flex justify-between gap-6 py-3">
                <dt className="font-semibold">{t}</dt>
                <dd className="text-right text-[var(--doux)]">{d}</dd>
              </div>
            ))}
          </dl>

          <figure className="rotate-[-1.5deg] rounded-[6px] bg-[#FFF9EF] p-6 shadow-[0_18px_40px_-28px_rgba(42,27,18,0.6)]">
            <blockquote className="font-[family-name:var(--f-caveat)] text-3xl leading-snug text-[var(--encre)]">{p.note}</blockquote>
            <figcaption className="mt-3 text-sm text-[var(--doux)]">La note de l&apos;atelier, glissée dans le carton.</figcaption>
          </figure>

          {p.slug === "bol-112" && (
            <figure className="space-y-2">
              <Image src={photos.bol.src} width={photos.bol.largeur} height={photos.bol.hauteur} alt={photos.bol.alt} sizes="(min-width: 1024px) 480px, 100vw" className="aspect-[5/4] w-full rounded-[24px] object-cover" />
              <figcaption className="text-sm text-[var(--doux)]">Photo d&apos;illustration : l&apos;atelier et ses pièces sont fictifs.</figcaption>
            </figure>
          )}
        </div>
      </div>

      <section className="mt-20 space-y-8">
        <h2 className="text-4xl font-normal">
          Encore en ligne, <span className="italic">dans la même fournée.</span>
        </h2>
        <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {autres.map((x) => (
            <li key={x.slug}>
              <Link href={`${DOSSIER}/fournee/${x.slug}`} className="block space-y-2 rounded-[22px] border border-[var(--trait)] bg-[var(--carte)] p-4">
                <Piece forme={x.forme} email={x.email} className="mx-auto w-3/4" />
                <p className="font-[family-name:var(--titres)] text-2xl">{x.nom}</p>
                <p className="font-semibold tabular-nums">{prix(x.prix)}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
