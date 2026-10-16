import type { Metadata } from "next";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import BandeauDemonstration from "../_composants/BandeauDemonstration";
import PiedDemonstration from "../_composants/PiedDemonstration";
import CoupeDuChantier from "../_composants/CoupeDuChantier";
import { titres, texte } from "./_composants/polices";
import Jardin from "./_composants/Jardin";
import CompteARebours from "./_composants/CompteARebours";
import Creneaux from "./_composants/Creneaux";
import Logo from "./_composants/Logo";

// Le site imaginé dans la vidéo « Si je devais remplir l'agenda d'un pisciniste ».
// Chaque idée de la vidéo est ici en état de marche : le jardin qui dit quelle
// piscine rentre, le premier dimanche de juillet, une page par chantier, les dates
// qu'on bloque soi-même.
export const metadata: Metadata = {
  title: "Premier Plongeon — site de démonstration",
  description: "Site de démonstration d'un pisciniste imaginaire, réalisé par Canevas Havane : la piscine qui rentre dans ton jardin, et la date de chantier qu'on bloque soi-même.",
  ...adressesDeLaPage("/exemples/premier-plongeon"),
};

export default function PremierPlongeon() {
  return (
    <div className={`${titres.variable} ${texte.variable} font-[family-name:var(--pp-texte)] min-h-screen bg-[#F6EFE4] text-[#0F3442]`}>
      <BandeauDemonstration entreprise="Premier Plongeon" />

      <header className="sticky top-0 z-30 bg-[#F6EFE4]/95 backdrop-blur border-b border-[#E7DCCB]">
        <nav className="max-w-5xl mx-auto flex items-center justify-between gap-3 px-4 sm:px-5 py-4">
          <Link href="/exemples/premier-plongeon" aria-label="Premier Plongeon, accueil">
            <Logo />
          </Link>
          <ul className="flex gap-3 sm:gap-8 text-sm font-bold whitespace-nowrap">
            <li><a href="#chantiers" className="hover:text-[#0E6E8C]">Chantiers</a></li>
            <li><a href="#prix" className="hover:text-[#0E6E8C]">Prix</a></li>
            <li><a href="#date" className="hover:text-[#0E6E8C]">Ma date</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <section id="prix" className="scroll-mt-24 max-w-5xl mx-auto px-5 pt-10 pb-16 sm:pt-16 grid gap-10 md:grid-cols-2 md:items-center">
          <div className="space-y-5">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#0E6E8C]">Ta piscine</p>
            <h1 className="font-[family-name:var(--pp-titres)] text-5xl sm:text-6xl font-semibold leading-[1.02] tracking-tight">
              Ton jardin fait <span className="italic text-[#0E6E8C]">combien&nbsp;?</span>
            </h1>
            <p className="text-lg leading-relaxed text-[#4A6470]">
              Glisse le curseur : le plan te montre la piscine qui rentre, et ce
              qu&apos;elle coûte vraiment, pose comprise.
            </p>
          </div>
          <Jardin />
        </section>

        <section className="bg-[#CDEFF6]">
          <div className="max-w-5xl mx-auto px-5 py-16 sm:py-20 space-y-10">
            <div className="space-y-4 max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#0E5A72]">Pourquoi on fait ça</p>
              <h2 className="font-[family-name:var(--pp-titres)] text-4xl sm:text-5xl font-semibold leading-[1.05] tracking-tight">
                On ne vend pas une piscine. On vend le <span className="italic">premier dimanche de juillet.</span>
              </h2>
              <p className="text-lg leading-relaxed">
                Le jour où toute la famille saute en même temps. Pour qu&apos;il arrive à
                l&apos;heure, le chantier se cale au printemps.
              </p>
            </div>
            <CompteARebours />
          </div>
        </section>

        <section id="chantiers" className="scroll-mt-24 max-w-5xl mx-auto px-5 py-16 sm:py-20 space-y-8">
          <div className="space-y-4 max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#0E6E8C]">Nos chantiers</p>
            <h2 className="font-[family-name:var(--pp-titres)] text-4xl sm:text-5xl font-semibold leading-[1.05] tracking-tight">
              Chaque chantier a <span className="italic">sa page.</span>
            </h2>
            <p className="text-lg leading-relaxed text-[#4A6470]">
              La taille, la durée des travaux, le prix, et le chantier jour par jour.
              Exactement ce que tu cherches sur Google avant d&apos;appeler.
            </p>
          </div>
          <Link
            href="/exemples/premier-plongeon/chantiers/coque-8x4"
            className="group block rounded-[28px] bg-white overflow-hidden shadow-[0_24px_60px_-34px_rgba(15,52,66,0.55)] md:grid md:grid-cols-2"
          >
            <div className="bg-[#E9F3EC] p-6 flex items-center">
              <CoupeDuChantier etape={6} libelle="Coupe de la piscine terminée, remplie d'eau" />
            </div>
            <div className="p-6 sm:p-8 space-y-3">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0E6E8C]">Chantier n° 27</p>
              <p className="font-[family-name:var(--pp-titres)] text-3xl font-semibold">Piscine coque {"8\u00A0×\u00A04"}</p>
              <p className="text-[#4A6470]">3 semaines de travaux · volet immergé · plage en bois</p>
              <p className="font-bold text-[#C4471D] group-hover:underline underline-offset-4">Voir le chantier jour par jour →</p>
            </div>
          </Link>
        </section>

        <section id="date" className="scroll-mt-24 bg-white/60 border-t border-[#E7DCCB]">
          <div className="max-w-5xl mx-auto px-5 py-16 sm:py-20 space-y-8">
            <div className="space-y-4 max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#0E6E8C]">Ma date</p>
              <h2 className="font-[family-name:var(--pp-titres)] text-4xl sm:text-5xl font-semibold leading-[1.05] tracking-tight">
                Chantiers 2027 : <span className="italic">les dates.</span>
              </h2>
              <p className="text-lg leading-relaxed text-[#4A6470]">
                Pas de formulaire de quatorze champs. Tu choisis ta semaine, tu la bloques,
                on vient faire la visite technique.
              </p>
            </div>
            <Creneaux />
          </div>
        </section>
      </main>

      <PiedDemonstration entreprise="Premier Plongeon" className="bg-[#0F3442] text-[#E4EEF1]" />
    </div>
  );
}
