import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { adressesDeLaPage } from "@/lib/seo";
import { FicheNumero } from "../../_composants/Registre";
import { Libelle } from "../../_composants/Blocs";
import { DOSSIER, REGISTRE, bijouDe } from "../../_composants/donnees";

// « Ce numéro a sa page » : la page d'un bijou au registre, à garder dans ses favoris.

export const dynamicParams = false;

export function generateStaticParams() {
  return REGISTRE.map((n) => ({ numero: n.numero }));
}

type Props = { params: Promise<{ numero: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { numero } = await params;
  const n = REGISTRE.find((x) => x.numero === numero);
  if (!n) return {};
  const b = bijouDe(n);
  return {
    title: "À la Prochaine — site de démonstration",
    description: `Le n° ${n.numero} au registre d'une marque de bijoux imaginaire : ${b.type.toLowerCase()} « ${b.nom}\u00a0», et les prénoms de qui l'a porté.`,
    ...adressesDeLaPage(`/exemples/a-la-prochaine/registre/${n.numero}`),
  };
}

export default async function PageNumero({ params }: Props) {
  const { numero } = await params;
  const n = REGISTRE.find((x) => x.numero === numero);
  if (!n) notFound();
  const b = bijouDe(n);
  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-5 pb-16 pt-8 md:grid-cols-2 md:items-start lg:pt-14">
      <div className="space-y-5">
        <p className="text-[13px] text-[var(--doux)]">
          <Link href={`${DOSSIER}/registre`} className="underline underline-offset-4">Le registre</Link> / n° {n.numero}
        </p>
        <Libelle>N° {n.numero}</Libelle>
        <h1 className="text-[56px] sm:text-[72px]">
          {b.type} <em>«&nbsp;{b.nom}&nbsp;»</em>
        </h1>
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image src={b.image.src} alt={b.image.alt} width={b.image.largeur} height={b.image.hauteur} sizes="(min-width: 768px) 540px, 100vw" priority className="h-full w-full object-cover" />
        </div>
      </div>
      <div className="space-y-6">
        <FicheNumero n={n} />
        <p className="leading-relaxed text-[var(--doux)]">{b.texte}</p>
        <Link href={`${DOSSIER}/transmettre`} className="inline-flex min-h-12 items-center rounded-full bg-[var(--accent)] px-7 text-[13px] font-semibold uppercase tracking-[0.18em] text-[var(--sur-accent)]">
          Tu l&apos;as reçu ? Inscris-toi
        </Link>
      </div>
    </div>
  );
}
