import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { adressesDeLaPage } from "@/lib/seo";
import Bijou, { nomForme } from "../../_composants/Bijou";
import { CartePiece, Tampon } from "../../_composants/Pieces";
import FilmFabrication from "../../_composants/FilmFabrication";
import { Reserver } from "../../_composants/Interactions";
import { DOSSIER, PIECES, PROCHAINE, euros } from "../../_composants/donnees";

// « Sur ton site, chaque pièce a sa page et son numéro » : la page d'une pièce. Quand
// elle est vendue, la page reste, avec un tampon et la date — rien sur l'acheteuse.

export const dynamicParams = false;

export function generateStaticParams() {
  return PIECES.map((p) => ({ numero: String(p.numero) }));
}

type Props = { params: Promise<{ numero: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { numero } = await params;
  const p = PIECES.find((x) => String(x.numero) === numero);
  if (!p) return {};
  return {
    title: "Jamais Deux — site de démonstration",
    description: `Pièce n° ${p.numero}, « ${p.nom}\u00a0» : ${nomForme(p).toLowerCase()} en argent, une sur une, chez une créatrice de bijoux imaginaire.`,
    ...adressesDeLaPage(`/exemples/jamais-deux/pieces/${p.numero}`),
  };
}

export default async function PagePiece({ params }: Props) {
  const { numero } = await params;
  const piece = PIECES.find((p) => String(p.numero) === numero);
  if (!piece) notFound();
  const voisines = PIECES.filter((p) => p.numero !== piece.numero && !p.partieLe).slice(-4).reverse();
  const partie = !!piece.partieLe;

  const fiche = [
    { t: "Numéro", d: `${piece.numero} · 1 sur 1` },
    { t: "Matière", d: piece.matiere },
    ...(piece.pierre ? [{ t: "Pierre", d: piece.pierre.nom }] : []),
    { t: "Taille", d: piece.taille },
    { t: "Faite à l'atelier", d: `le ${piece.faiteLe}` },
    { t: "Sortie", d: `le vendredi ${piece.sortie}` },
  ];

  return (
    <div>
      <div className="mx-auto max-w-6xl px-5 pt-5 text-[13px] text-[var(--doux)]">
        <Link href={`${DOSSIER}/pieces`} className="underline underline-offset-4">Les pièces</Link> / n° {piece.numero}
      </div>
      <section className="mx-auto grid max-w-6xl gap-8 px-5 pb-16 pt-5 lg:grid-cols-2 lg:items-start lg:gap-x-14 lg:pt-10">
        <div className="lg:col-start-1 lg:row-start-1">
          <div data-film="visuel" className="relative aspect-square overflow-hidden bg-[var(--sombre)]">
            {piece.photo ? (
              <Image src={piece.photo.src} alt={piece.photo.alt} width={1200} height={800} sizes="(min-width: 1024px) 560px, 100vw" priority className="h-full w-full object-cover" />
            ) : (
              <Bijou piece={piece} className="h-full w-full p-10" />
            )}
            <span className="absolute bottom-0 left-0 bg-[var(--sombre)] px-3 pt-1 font-[family-name:var(--titres)] text-[64px] leading-none tabular-nums text-[var(--sur-sombre)]">[{piece.numero}]</span>
            {partie && <Tampon grand />}
          </div>
        </div>
        <div className="space-y-7 lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <div className="space-y-3">
            <p data-film="numero" className="text-[13px] font-semibold uppercase tracking-[0.16em] text-[var(--accent-texte)]">
              Pièce n° {piece.numero} · 1 sur 1
            </p>
            <h1 className="text-[56px] sm:text-[72px]">
              {nomForme(piece)} <em>«&nbsp;{piece.nom}&nbsp;»</em>
            </h1>
            <p className="text-lg leading-relaxed text-[var(--doux)]">{piece.histoire}</p>
          </div>

          {partie ? (
            <div data-film="partie" className="space-y-3 border-y border-[var(--trait)] py-6">
              <p className="font-[family-name:var(--titres)] text-4xl">Partie le {piece.partieLe}.</p>
              <p className="leading-relaxed text-[var(--doux)]">
                Sa page reste en ligne : sa fabrication, sa date, son numéro. Elle ne sera jamais refaite. Six autres pièces sortent {PROCHAINE.date}, à {PROCHAINE.heure}.
              </p>
              <Link href={`${DOSSIER}#vendredi`} className="inline-flex min-h-12 items-center gap-3 bg-[var(--encre)] px-6 text-[13px] font-semibold uppercase tracking-[0.14em] text-[var(--fond)]">
                La sortie du vendredi <span aria-hidden="true">→</span>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="flex items-baseline gap-3">
                <span className="font-[family-name:var(--titres)] text-5xl tabular-nums">{euros(piece.prix)}</span>
                <span className="text-[var(--doux)]">TTC · prix d&apos;exemple</span>
              </p>
              <Reserver numero={piece.numero} prix={piece.prix} taille={piece.taille} />
              <p className="text-sm text-[var(--doux)]">Livraison suivie ajoutée avant paiement · retour sous 14 jours · une taille d&apos;ajustage offerte.</p>
            </div>
          )}

          <dl className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
            {fiche.map((l) => (
              <div key={l.t} className="flex justify-between gap-6 py-3">
                <dt className="text-[var(--doux)]">{l.t}</dt>
                <dd className="text-right font-semibold">{l.d}</dd>
              </div>
            ))}
          </dl>
          <p className="text-[13px] text-[var(--doux)]">Exemple : la marque, la pièce et ses dates sont fictives.</p>
        </div>
        {/* Sur téléphone, le film vient après la fiche ; sur grand écran, sous la photo. */}
        {!partie && (
          <div className="lg:col-start-1 lg:row-start-2">
            <FilmFabrication numero={piece.numero} />
          </div>
        )}
      </section>

      <section className="border-t border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <h2 className="text-4xl sm:text-5xl">Encore à l&apos;atelier</h2>
          <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">
            {voisines.map((p) => (
              <li key={p.numero}>
                <CartePiece piece={p} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
