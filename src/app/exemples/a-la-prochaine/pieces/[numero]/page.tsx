import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../../_kit/Apparition";
import { AppelFinal, Bouton, Libelle } from "../../_composants/Blocs";
import Bijou from "../../_composants/Bijou";
import FilmFabrication from "../../_composants/FilmFabrication";
import { Reserver } from "../../_composants/Interactions";
import { CartePiece, Tampon } from "../../_composants/Pieces";
import { FicheNumero } from "../../_composants/Registre";
import { DOSSIER, PIECES, PROCHAINE, euros, grave, matiere, nomForme } from "../../_composants/donnees";

// « Chaque pièce a sa page et son numéro » : la page d'une pièce. Le film de sa
// fabrication ; quand elle est vendue, la page reste, avec un tampon, la date, et son
// registre — les prénoms de qui la porte, avec leur accord, et une ligne vide.
// Jamais le nom ni la ville de qui l'a achetée.

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
    title: `Pièce n° ${grave(p.numero)}, « ${p.nom} » — À la Prochaine, site de démonstration`,
    description: `Pièce n° ${p.numero}, « ${p.nom} » : ${nomForme(p).toLowerCase()}, ${matiere(p).toLowerCase()}, une sur une, chez une marque de bijoux imaginaire. Le film de sa fabrication, et son registre.`,
    ...adressesDeLaPage(`/exemples/a-la-prochaine/pieces/${p.numero}`),
  };
}

export default async function PagePiece({ params }: Props) {
  const { numero } = await params;
  const piece = PIECES.find((p) => String(p.numero) === numero);
  if (!piece) notFound();
  const voisines = PIECES.filter((p) => p.numero !== piece.numero && !p.partieLe).slice(-4).reverse();
  const partie = !!piece.partieLe;

  const fiche = [
    { t: "Numéro gravé", d: `${grave(piece.numero)} · 1 sur 1` },
    { t: "Matière", d: matiere(piece) },
    ...(piece.pierre ? [{ t: "Pierre", d: piece.pierre.nom }] : []),
    { t: "Taille", d: piece.taille },
    { t: "Faite à l'atelier", d: `le ${piece.faiteLe}` },
    { t: "Sortie", d: `le vendredi ${piece.sortie}, à 18 h` },
  ];

  return (
    <main>
      <section className="kit-grain relative bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-16 pt-28 sm:px-8 md:pt-32 lg:grid-cols-2 lg:items-center lg:gap-16 lg:pb-24">
          <div data-film="visuel" className="relative aspect-square overflow-hidden bg-[#0F211D]">
            {piece.photo ? (
              <Image src={piece.photo.src} alt={piece.photo.alt} fill sizes="(min-width: 1024px) 600px, 100vw" priority className="object-cover" />
            ) : (
              <Bijou piece={piece} className="h-full w-full p-10" />
            )}
            <span className="absolute bottom-0 left-0 bg-[var(--sombre)] px-3 pt-1 font-[family-name:var(--titres)] text-[64px] leading-none tabular-nums text-[var(--sur-sombre)]">[{grave(piece.numero)}]</span>
            {partie && <Tampon grand />}
          </div>
          <div className="space-y-6">
            <p className="text-[13px] text-[var(--sur-sombre)]/90">
              <Link href={`${DOSSIER}/pieces`} className="underline underline-offset-4">Les pièces</Link> / n° {grave(piece.numero)}
            </p>
            <p data-film="numero" className="text-[14px] font-semibold uppercase tracking-[0.2em] text-[#C9A86A]">
              Pièce n° {piece.numero} · une sur une
            </p>
            <h1 className="font-[family-name:var(--titres)] text-[clamp(3.4rem,7vw,6.4rem)] leading-[0.92] tracking-[-0.02em]">
              {nomForme(piece)} <em className="text-[#C9A86A]">«&nbsp;{piece.nom}&nbsp;»</em>
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-[var(--sur-sombre)]/90">{piece.histoire}</p>
            {partie ? (
              <p className="font-[family-name:var(--titres)] text-4xl">Partie le {piece.partieLe}.</p>
            ) : (
              <p className="flex items-baseline gap-3">
                <span className="font-[family-name:var(--titres)] text-6xl tabular-nums">{euros(piece.prix)}</span>
                <span className="text-[var(--sur-sombre)]/90">TTC · prix d&apos;exemple</span>
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div className="space-y-5">
          <Apparition><Libelle>Sa fabrication</Libelle></Apparition>
          <Apparition delai={100}>
            <FilmFabrication numero={piece.numero} />
          </Apparition>
        </div>
        <div className="space-y-8">
          {partie ? (
            <div data-film="partie" className="space-y-5">
              <Apparition><Libelle>Partie le {piece.partieLe}</Libelle></Apparition>
              <Apparition delai={100}>
                <FicheNumero piece={piece} />
              </Apparition>
              <p className="leading-relaxed text-[var(--doux)]">
                Sa page reste en ligne : sa fabrication, sa date, son numéro. Elle ne sera jamais refaite. Six autres pièces
                sortent {PROCHAINE.date}, à {PROCHAINE.heure}.
              </p>
              <Bouton href={`${DOSSIER}/transmettre`}>Tu l&apos;as reçue ? Inscris-toi</Bouton>
            </div>
          ) : (
            <div className="space-y-4">
              <Apparition><Libelle>Encore là</Libelle></Apparition>
              <Reserver numero={piece.numero} prix={piece.prix} taille={piece.taille} />
              <p className="text-sm text-[var(--doux)]">Livraison suivie ajoutée avant paiement · retour sous 14 jours · une taille d&apos;ajustage offerte. Ton prénom ouvrira son registre, si tu le veux.</p>
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
      </section>

      <section className="border-t border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <h2 className="font-[family-name:var(--titres)] text-5xl">Encore à l&apos;atelier</h2>
          <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">
            {voisines.map((p) => (
              <li key={p.numero}>
                <CartePiece piece={p} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <AppelFinal />
    </main>
  );
}
