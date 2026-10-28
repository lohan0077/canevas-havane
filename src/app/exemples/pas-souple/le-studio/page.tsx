import type { Metadata } from "next";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, studio } from "../_composants/donnees";
import Visite from "../_composants/Visite";

export const metadata: Metadata = {
  title: "Le studio · Pas Souple — site de démonstration",
  description: "La visite de Pas Souple, studio de pilates imaginaire : l'entrée, le vestiaire, la prof qui dit bonjour, avant même de venir.",
  ...adressesDeLaPage("/exemples/pas-souple/le-studio"),
};

const PRATIQUE = [
  { titre: "Ce qui est fourni", texte: "Tapis, coussins, briques, sangles. Tu viens les mains vides." },
  { titre: "Ce qu'il faut apporter", texte: "Une tenue souple, des chaussettes si tu veux, une bouteille d'eau." },
  { titre: "Le vestiaire", texte: "Casiers qui ferment à clé, bancs, une douche. Ouvert un quart d'heure avant chaque cours." },
  { titre: "L'accès", texte: "Rez-de-chaussée, sans marche. Arrêt de bus à deux minutes (adresse d'exemple)." },
];

export default function LeStudio() {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 sm:pt-14 pb-20 space-y-16">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
        <div className="space-y-5">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent-texte)]">La visite</p>
          <h1 className="text-5xl sm:text-7xl font-light tracking-[-0.03em] leading-[1]">Trente secondes, <span className="font-normal text-[var(--accent-texte)]">avant de venir.</span></h1>
          <p className="text-lg leading-relaxed text-[var(--doux)]">
            L'entrée, le vestiaire, la prof qui te dit bonjour. Des photos à la place de la vidéo :
            le studio est fictif. Personne n'y est filmé sans son accord.
          </p>
        </div>
        <div id="visite" className="scroll-mt-24">
          <Visite />
        </div>
      </div>
      <ul className="grid gap-3 sm:grid-cols-2">
        {PRATIQUE.map((p) => (
          <li key={p.titre} className="rounded-[28px] bg-[var(--carte)] p-6 space-y-2">
            <h2 className="text-3xl font-light">{p.titre}</h2>
            <p className="leading-relaxed text-[var(--doux)]">{p.texte}</p>
          </li>
        ))}
      </ul>
      <div className="rounded-[34px] bg-[var(--sombre)] p-8 text-[var(--sur-sombre)] space-y-4">
        <p className="font-[family-name:var(--titres)] text-4xl font-light">{studio.adresse}</p>
        <p>Adresse d'exemple. Les cours ont lieu au rez-de-chaussée.</p>
        <Link href={`${DOSSIER}/planning`} className="inline-flex rounded-full bg-[var(--sur-sombre)] px-6 py-3.5 font-semibold text-[var(--sombre)]">Voir le planning</Link>
      </div>
    </main>
  );
}
