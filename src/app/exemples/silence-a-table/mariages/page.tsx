import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, MARIAGES, MENUS, euros, prixParPersonne } from "../_composants/donnees";
import { Surtitre } from "../_composants/Blocs";

export const metadata: Metadata = {
  title: "Les mariages · Silence à Table — site de démonstration",
  description: "Chaque mariage devient une page : le nombre d'invités, le menu, le prix par personne. Des exemples, sur un site de démonstration.",
  ...adressesDeLaPage("/exemples/silence-a-table/mariages"),
};

export default function Mariages() {
  return (
    <div className="max-w-6xl mx-auto px-5 pt-10 pb-16 sm:pt-16 sm:pb-24 space-y-10">
      <div className="space-y-4">
        <Surtitre>Les mariages · exemples</Surtitre>
        <h1 className="text-[56px] sm:text-[88px] font-normal lowercase">une page par mariage.</h1>
        <p className="max-w-2xl text-lg leading-relaxed text-[var(--doux)]">
          Le nombre d&apos;invités, le menu de la saison, le prix par personne. Des mariages d&apos;exemple : aucun nom, aucune photo d&apos;invités.
        </p>
      </div>
      <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
        {MARIAGES.map((m) => (
          <li key={m.slug}>
            <Link href={`${DOSSIER}/mariages/${m.slug}`} className="grid grid-cols-[96px_1fr] items-center gap-5 py-5 sm:grid-cols-[160px_1fr_auto]">
              <div className="relative aspect-square overflow-hidden rounded-[18px]">
                <Image src={m.photo.src} alt={m.photo.alt} fill sizes="160px" className="object-cover" />
              </div>
              <div className="space-y-1">
                <p className="text-[12px] uppercase tracking-[0.22em] text-[var(--accent-texte)]">Mariage n° {m.numero} · {MENUS[m.menu].saison.toLowerCase()}</p>
                <h2 className="text-[30px] leading-tight lowercase">{m.titre}</h2>
                <p className="text-[15px] text-[var(--doux)] tabular-nums">{euros(prixParPersonne(m.invites))} TTC par personne · exemple</p>
              </div>
              <span aria-hidden="true" className="hidden sm:block text-3xl text-[var(--accent-texte)]">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
