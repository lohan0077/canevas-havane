import type { Metadata } from "next";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER } from "../_composants/donnees";
import { Surtitre } from "../_composants/Elements";
import { Devis } from "../_composants/Interactifs";

export const metadata: Metadata = {
  title: "Vert en Août — site de démonstration",
  description: "Le devis d'un paysagiste imaginaire, avec la ligne que personne ne met : l'arrosage qu'il faudra, l'été.",
  ...adressesDeLaPage("/exemples/vert-en-aout/devis"),
};

export default function PageDevis() {
  return (
    <main>
      <section className="mx-auto max-w-6xl px-5 pb-6 pt-8 sm:px-8">
        <Surtitre>Un devis, pour exemple</Surtitre>
        <h1 className="mt-4 max-w-3xl text-[34px] font-bold leading-[1.04] sm:text-6xl">La ligne que personne ne met.</h1>
        <p className="mt-5 max-w-xl text-[18px] leading-relaxed text-[var(--doux)]">
          Sur chaque devis, avant le total : l&apos;arrosage qu&apos;il faudra, l&apos;été. Une estimation, écrite noir sur
          blanc, pour que tu saches ce que ton jardin te demandera.
        </p>
      </section>
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-10 sm:px-8 md:grid-cols-[1.1fr_0.9fr] md:items-start">
        <Devis />
        <div className="space-y-6">
          <div className="rounded-[24px] bg-[var(--carte)] p-6 space-y-3">
            <h2 className="text-[22px] font-bold">Pourquoi cette ligne&nbsp;?</h2>
            <p className="leading-relaxed text-[var(--doux)]">
              Parce qu&apos;un jardin sec n&apos;est pas un jardin sans eau. La première année, ses racines ne sont pas
              encore descendues : il faut l&apos;aider. Le dire avant de signer, c&apos;est éviter la surprise de juillet.
            </p>
          </div>
          <div className="rounded-[24px] bg-[var(--carte)] p-6 space-y-3">
            <h2 className="text-[22px] font-bold">Et si l&apos;arrosage est restreint&nbsp;?</h2>
            <p className="leading-relaxed text-[var(--doux)]">
              On plante à l&apos;automne pour que la première année d&apos;arrosage tombe le moins possible en été, et on
              suit l&apos;arrêté de ta commune. Les restrictions sont graduées, de la vigilance à la crise.
            </p>
            <Link href={`${DOSSIER}#restrictions`} className="inline-block font-bold underline underline-offset-4">Les quatre niveaux</Link>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-8">
        <Link href={`${DOSSIER}#commune`} className="inline-block rounded-full bg-[var(--accent)] px-6 py-3.5 font-bold text-[var(--sur-accent)]">Les plantes pour ma commune</Link>
      </section>
    </main>
  );
}
