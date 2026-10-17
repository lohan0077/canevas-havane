import Link from "next/link";

/**
 * Le bandeau qui coiffe chaque site de démonstration. Il n'est pas négociable : sans
 * lui, un visiteur arrivé par un lien partagé prendrait l'entreprise pour une vraie
 * et pourrait chercher à la joindre.
 */
export default function BandeauDemonstration({ entreprise }: { entreprise: string }) {
  return (
    <div className="bg-[#1B1512] text-[#F3EDE4] text-[11px] sm:text-xs leading-snug px-4 py-2 text-center">
      Site de démonstration · {entreprise} est une entreprise fictive ·{" "}
      <Link href="/exemples" className="underline underline-offset-2 font-semibold">
        réalisé par Canevas Havane
      </Link>
    </div>
  );
}
