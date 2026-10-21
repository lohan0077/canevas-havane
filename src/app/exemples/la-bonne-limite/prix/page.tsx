import type { Metadata } from "next";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER } from "../_composants/donnees";
import { Bornes } from "../_composants/Outils";

// « Le site répond au nombre de bornes. Tu choisis, tu vois la fourchette. » Prix TTC
// d'exemple, comme dans la vidéo ; la part de chacun rappelle les frais communs.
export const metadata: Metadata = {
  title: "La Bonne Limite — site de démonstration",
  description: "Combien coûte un bornage ? La fourchette au nombre de bornes, ce qui est compris et ce qui est sur devis, chez un géomètre-expert imaginaire.",
  ...adressesDeLaPage("/exemples/la-bonne-limite/prix"),
};

const COMPRIS = [
  "Le déplacement sur place",
  "La recherche des titres de propriété et des anciens plans",
  "La convocation des voisins",
  "La pose des bornes",
  "Le procès-verbal de bornage, signé par tous",
];

const SUR_DEVIS = [
  { titre: "Division d'un terrain", texte: "Dépend du nombre de lots et des documents à préparer pour le cadastre." },
  { titre: "Plan du terrain", texte: "Dépend de la surface et de ce qu'il faut relever." },
  { titre: "Implantation d'une maison", texte: "Dépend du plan de l'architecte et du terrain." },
];

export default function LesPrix() {
  return (
    <>
      <section className="mx-auto grid max-w-6xl gap-10 px-5 pb-16 pt-10 sm:pt-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="space-y-5">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--accent-texte)]">Les prix</p>
          <h1 className="text-[44px] font-bold tracking-tight sm:text-6xl">Combien coûte ton bornage&nbsp;?</h1>
          <p className="text-lg leading-relaxed text-[var(--doux)]">Choisis le nombre de bornes : la fourchette suit.</p>
        </div>
        <Bornes />
      </section>

      <section className="border-y border-[var(--trait)] bg-[#EEF0E6]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">Ce qui est compris</h2>
            <ul className="space-y-2.5">
              {COMPRIS.map((c) => (
                <li key={c} className="flex gap-3 leading-relaxed">
                  <span aria-hidden="true" className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[var(--accent)] text-[11px] text-[var(--sur-accent)]">✓</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">Pourquoi une fourchette</h2>
            <p className="leading-relaxed">
              Parce que deux terrains de même taille ne se ressemblent pas : des titres anciens à
              retrouver, une haie qui cache une borne, un troisième voisin à convoquer. Le devis
              écrit, remis avant toute intervention, donne le prix exact.
            </p>
            <p className="text-sm text-[var(--doux)]">Prix TTC d&apos;exemple pour un particulier : le cabinet est fictif.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-8 px-5 py-16">
        <h2 className="text-3xl font-bold tracking-tight">Sur devis</h2>
        <ul className="grid gap-4 md:grid-cols-3">
          {SUR_DEVIS.map((s) => (
            <li key={s.titre} className="rounded-[22px] border border-[var(--trait)] bg-[var(--carte)] p-5 space-y-2">
              <h3 className="text-xl font-bold">{s.titre}</h3>
              <p className="leading-relaxed text-[var(--doux)]">{s.texte}</p>
            </li>
          ))}
        </ul>
        <Link href={`${DOSSIER}#contact`} className="inline-flex min-h-[54px] items-center rounded-full bg-[var(--accent)] px-7 text-lg font-semibold text-[var(--sur-accent)]">
          Demander un devis
        </Link>
      </section>
    </>
  );
}
