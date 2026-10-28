import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, euros, photos, produits, ttc, tva } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Pourquoi ce prix · L'Addition — site de démonstration",
  description: "Site de démonstration d'une marque de vêtements imaginaire : pourquoi un jean coûte 120 €, ligne par ligne — la toile, la couture, l'envoi, la TVA, et ce que la marque garde.",
  ...adressesDeLaPage("/exemples/l-addition/pourquoi-ce-prix"),
};

const jean = produits[0];
const COULEURS: Record<string, string> = { toile: "#23395B", couture: "#3F5F8F", rivets: "#7C93B8", envoi: "#A9B9D3", tva: "#4B4F5A", marque: "#14161C" };
const parts = [
  ...jean.lignes.filter((l) => !l.marque),
  { id: "tva", libelle: "TVA 20 %", montant: tva(jean), detail: "Elle n'est pas à nous : 20 % du prix hors taxe, reversés à l'État." },
  ...jean.lignes.filter((l) => l.marque),
];

export default function PourquoiCePrix() {
  const total = ttc(jean);
  return (
    <>
      <section className="mx-auto max-w-6xl space-y-6 px-5 pb-12 pt-10 sm:px-6">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--accent-texte)]">Pourquoi ce prix</p>
        <h1 className="max-w-4xl text-5xl font-black tracking-tight sm:text-7xl">Un jean à 120 €, ligne par ligne.</h1>
        <p className="max-w-2xl text-lg leading-relaxed">
          On tape « pourquoi le made in France est cher » parce qu&apos;on ne sait pas de quoi un prix est
          fait. Voici le nôtre, sans rien cacher. Montants d&apos;exemple, calcul exact.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-6">
        <div className="flex h-16 w-full overflow-hidden rounded-xl border-2 border-[var(--encre)]" role="img" aria-label="Répartition des 120 € du jean droit, exemple">
          {parts.map((p) => (
            <span key={p.id} style={{ width: `${(p.montant / total) * 100}%`, background: COULEURS[p.id] }} />
          ))}
        </div>
        <ol className="mt-10 divide-y-2 divide-[var(--encre)] border-y-2 border-[var(--encre)]">
          {parts.map((p) => (
            <li key={p.id} className="grid gap-3 py-6 sm:grid-cols-[3rem_1fr_auto] sm:items-baseline">
              <span aria-hidden="true" className="h-6 w-6 rounded-md" style={{ background: COULEURS[p.id] }} />
              <div className="space-y-1">
                <h2 className="text-2xl font-black tracking-tight">{p.libelle}</h2>
                <p className="max-w-2xl leading-relaxed text-[var(--doux)]">{p.detail}</p>
              </div>
              <p className="text-3xl font-black tabular-nums">
                {euros(p.montant)}
                <span className="ml-2 text-sm font-bold text-[var(--doux)]">{Math.round((p.montant / total) * 100)} %</span>
              </p>
            </li>
          ))}
        </ol>
        <p className="mt-6 flex items-baseline justify-between text-3xl font-black">
          <span>Total TTC</span>{" "}
          <span className="tabular-nums">{euros(total)}</span>
        </p>
      </section>

      <section className="bg-[var(--sombre)] px-5 py-20 text-[var(--sur-sombre)] sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:items-center">
          <div className="space-y-5">
            <h2 className="text-5xl font-black tracking-tight">Ce qu&apos;on ne trouvera pas dans l&apos;addition.</h2>
            <ul className="space-y-3 text-lg text-[#C9D4E5]">
              <li>Une remise de bienvenue gonflée d&apos;avance dans le prix.</li>
              <li>Une « origine » écrite sans pouvoir la prouver.</li>
              <li>Un budget de publicité caché dans la ligne « toile ».</li>
            </ul>
            <Link href={`${DOSSIER}/jean-droit`} className="inline-block rounded-full bg-[var(--sur-sombre)] px-6 py-3.5 font-bold text-[var(--sombre)]">
              Voir le jean droit
            </Link>
          </div>
          <Image src={photos.rouleaux.src} width={photos.rouleaux.largeur} height={photos.rouleaux.hauteur} alt={photos.rouleaux.alt} sizes="(min-width: 768px) 560px, 100vw" className="aspect-[3/2] w-full rounded-[20px] object-cover" />
        </div>
      </section>
    </>
  );
}
