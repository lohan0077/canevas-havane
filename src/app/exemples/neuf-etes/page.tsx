import type { Metadata } from "next";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import BandeauDemonstration from "../_composants/BandeauDemonstration";
import PiedDemonstration from "../_composants/PiedDemonstration";
import CoupeDuChantier from "../_composants/CoupeDuChantier";
import { titres, texte } from "./_composants/polices";
import CalculEtes from "./_composants/CalculEtes";

// Le site de la marque imaginée dans la vidéo « Si je devais créer une marque de
// piscines » : un seul outil, l'âge des enfants, et le nombre d'étés qui restent.
export const metadata: Metadata = {
  title: "Neuf Étés — site de démonstration",
  description: "Site de démonstration d'une marque de piscines imaginaire, réalisé par Canevas Havane : combien d'étés te reste-t-il avec tes enfants, à la maison ?",
  ...adressesDeLaPage("/exemples/neuf-etes"),
};

const CHANTIER = [
  { jour: "Jour 1", etape: 1 },
  { jour: "Jour 5", etape: 3 },
  { jour: "Jour 21", etape: 6 },
];

export default function NeufEtes() {
  return (
    <div className={`${titres.variable} ${texte.variable} font-[family-name:var(--ne-texte)] min-h-screen bg-[#FFF8EC] text-[#12445A]`}>
      <BandeauDemonstration entreprise="Neuf Étés" />

      <header className="max-w-5xl mx-auto flex items-center justify-between gap-4 px-5 py-5">
        <Link href="/exemples/neuf-etes" className="flex items-center gap-3" aria-label="Neuf Étés, accueil">
          <span aria-hidden="true" className="grid place-items-center w-11 h-11 rounded-full bg-[#12445A] text-[#F6C445] font-[family-name:var(--ne-titres)] text-2xl font-bold">9</span>
          <span className="font-[family-name:var(--ne-titres)] text-2xl font-bold tracking-tight">Neuf Étés</span>
        </Link>
        <a href="#chantiers" className="text-sm font-bold underline underline-offset-4">Nos chantiers</a>
      </header>

      <main>
        <section className="max-w-5xl mx-auto px-5 pt-6 pb-16 grid gap-10 md:grid-cols-2 md:items-start">
          <div className="space-y-5 md:pt-6">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#176F8C]">Le calcul de l&apos;été</p>
            <h1 className="font-[family-name:var(--ne-titres)] text-5xl sm:text-6xl font-bold leading-[1.04] tracking-tight">
              Quel âge ont <span className="italic text-[#176F8C]">tes enfants&nbsp;?</span>
            </h1>
            <p className="text-lg leading-relaxed">
              Une seule question. Et une réponse qu&apos;aucun devis de piscine ne t&apos;a
              jamais donnée.
            </p>
          </div>
          <CalculEtes />
        </section>

        <section className="bg-[#12445A] text-[#FFF8EC]">
          <div className="max-w-5xl mx-auto px-5 py-16 sm:py-20 grid gap-10 md:grid-cols-2 md:items-center">
            <div className="space-y-4">
              <h2 className="font-[family-name:var(--ne-titres)] text-4xl sm:text-5xl font-bold leading-[1.05]">
                Ça ne vend pas une piscine. <span className="text-[#F6C445]">Ça vend du temps.</span>
              </h2>
              <p className="text-lg leading-relaxed text-[#D9E6EB]">
                Neuf Étés construit des piscines familiales. Les étés commencent ici.
              </p>
            </div>
            <div className="mx-auto w-full max-w-xs rotate-[-3deg] rounded-[20px] bg-[#FFF8EC] text-[#12445A] p-8 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)] space-y-6">
              <p className="font-[family-name:var(--ne-titres)] text-5xl font-bold leading-[1.02]">
                Il te reste <span className="block text-[#176F8C]">9 étés.</span>
              </p>
              <p className="text-xs font-bold uppercase tracking-[0.18em]">Neuf Étés · piscines</p>
            </div>
          </div>
        </section>

        <section id="chantiers" className="scroll-mt-8 max-w-5xl mx-auto px-5 py-16 sm:py-20 space-y-8">
          <div className="space-y-4 max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#176F8C]">Nos chantiers</p>
            <h2 className="font-[family-name:var(--ne-titres)] text-4xl sm:text-5xl font-bold leading-[1.05]">
              Jour après jour, jusqu&apos;au <span className="italic text-[#176F8C]">premier plongeon.</span>
            </h2>
            <p className="text-lg leading-relaxed">
              Chaque chantier est filmé, avec l&apos;accord de la famille, du premier coup de
              pelle au premier plongeon.
            </p>
          </div>
          <ol className="grid gap-5 sm:grid-cols-3">
            {CHANTIER.map((c) => (
              <li key={c.jour} className="rounded-[22px] bg-white p-4 space-y-3 shadow-[0_18px_40px_-30px_rgba(18,68,90,0.6)]">
                <CoupeDuChantier etape={c.etape} libelle={`Chantier, ${c.jour.toLowerCase()}`} fond="#FFFFFF" eau="#1F8FB3" />
                <p className="font-[family-name:var(--ne-titres)] text-2xl font-bold">{c.jour}</p>
              </li>
            ))}
          </ol>
          <p className="text-sm text-[#5B7480]">
            Schémas à la place des vidéos : la marque est fictive.
          </p>
        </section>
      </main>

      <PiedDemonstration entreprise="Neuf Étés" className="bg-[#12445A] text-[#D9E6EB]" />
    </div>
  );
}
