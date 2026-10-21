import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import { MOIS, PHOTOS } from "../_composants/donnees";
import { Legende } from "../_composants/Blocs";

export const metadata: Metadata = {
  title: "Les douze mois — Douze Mois — site de démonstration",
  description: "Le calendrier des fleurs de saison en France, mois par mois, d'une boutique de fleurs imaginaire.",
  ...adressesDeLaPage("/exemples/douze-mois/calendrier"),
};

// Les douze planches à la fois : l'année entière, comme un mur de musée.
export default function LesDouzeMois() {
  return (
    <main className="mx-auto max-w-6xl px-4 pb-20 pt-12 sm:px-6 sm:pt-16">
      <div className="space-y-4 border-b border-[var(--encre)] pb-8">
        <Legende n="12">L&apos;année entière</Legende>
        <h1 className="text-6xl sm:text-8xl">Les douze <span className="italic">mois.</span></h1>
        <p className="max-w-xl leading-relaxed text-[var(--doux)]">
          Une fleur par mois, et celles qui l&apos;accompagnent. Calendrier indicatif : une saison
          avance ou recule selon la région et l&apos;année, on le confirme chaque mois avec les producteurs.
        </p>
      </div>
      <ol className="grid grid-cols-1 gap-px bg-[var(--encre)] sm:grid-cols-2 lg:grid-cols-3">
        {MOIS.map((m) => {
          const photo = m.photo ? PHOTOS[m.photo] : null;
          return (
            <li key={m.n} className="grid grid-cols-[96px_1fr] gap-4 bg-[var(--fond)] p-4">
              <div className="relative h-28 overflow-hidden border border-[var(--trait)] bg-[#E8E8E8]">
                {photo ? (
                  <Image src={photo.src} alt={photo.alt} width={photo.largeur} height={photo.hauteur} sizes="96px" className="h-full w-full object-cover" />
                ) : (
                  <span aria-hidden="true" className="grid h-full place-items-center font-[family-name:var(--titres)] text-6xl italic text-[var(--accent-texte)]">{m.fleur.charAt(0)}</span>
                )}
              </div>
              <div className="space-y-1">
                <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--doux)]">{String(m.n).padStart(2, "0")} · {m.nom}</p>
                <h2 className="text-3xl">{m.fleur}</h2>
                <p className="text-sm text-[var(--doux)]">Aussi : {m.aussi.join(", ")}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </main>
  );
}
