import type { Metadata } from "next";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { Libelle } from "../_composants/Blocs";
import { TousLesConseils } from "../_composants/Formulaires";
import { DOSSIER } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Tu Vas Voir — site de démonstration",
  description: "Les conseils déjà écrits par les libraires d'une librairie imaginaire : si t'as adoré ce livre, lis ces trois-là.",
  ...adressesDeLaPage("/exemples/tu-vas-voir/conseils"),
};

export default function Conseils() {
  return (
    <div className="mx-auto max-w-6xl px-5 pb-16 pt-10 lg:pt-16">
      <Libelle n="—">Les conseils</Libelle>
      <h1 className="mt-4 max-w-3xl text-[46px] font-medium tracking-tight sm:text-[72px]">
        Si t&apos;as adoré celui-là, <em className="font-normal">lis ces trois-là.</em>
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--doux)]">
        Chaque conseil est écrit par un libraire de la boutique, à partir de livres qu&apos;il a lus. Ton livre n&apos;y est pas ?{" "}
        <Link href={`${DOSSIER}#conseil`} className="font-semibold text-[var(--encre)] underline underline-offset-4">Pose-nous la question</Link>.
      </p>
      <div className="mt-10">
        <TousLesConseils />
      </div>
      <p className="mt-6 text-[13px] text-[var(--doux)]">Conseils d&apos;exemple, libraires imaginaires : la librairie est fictive.</p>
    </div>
  );
}
