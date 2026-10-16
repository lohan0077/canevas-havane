import type { Metadata } from "next";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import BandeauDemonstration from "../../../_composants/BandeauDemonstration";
import PiedDemonstration from "../../../_composants/PiedDemonstration";
import CoupeDuChantier from "../../../_composants/CoupeDuChantier";
import { titres, texte } from "../../_composants/polices";
import Logo from "../../_composants/Logo";

// « Chaque chantier devient une page » : la page d'un chantier, telle que la vidéo la
// décrit. Elle répond à ce que les gens tapent (« piscine coque 8x4 prix ») avec la
// taille, la durée, le prix et le déroulé — ici en schémas, l'entreprise étant fictive.
export const metadata: Metadata = {
  title: "Piscine coque 8 × 4 — Premier Plongeon (démonstration)",
  description: "Page de chantier d'un pisciniste imaginaire : une piscine coque 8 × 4, trois semaines de travaux racontées jour par jour.",
  ...adressesDeLaPage("/exemples/premier-plongeon/chantiers/coque-8x4"),
};

const JOURS = [
  { jour: "Jour 1", titre: "Implantation et terrassement", texte: "On trace le bassin au sol, la pelle creuse. La terre part le jour même.", etape: 1 },
  { jour: "Jour 3", titre: "Lit de pose", texte: "Un lit de gravier compacté, mis à niveau au millimètre : c'est lui qui porte la coque.", etape: 2 },
  { jour: "Jour 5", titre: "Pose de la coque", texte: "La grue la dépose en une matinée. On vérifie le niveau avant de la lâcher.", etape: 3 },
  { jour: "Jours 6 à 8", titre: "Remblai et remplissage", texte: "On remblaie et on remplit en même temps, pour que la pression reste égale des deux côtés.", etape: 4 },
  { jour: "Jour 14", titre: "Margelles et plage", texte: "Les margelles, puis la plage en bois et le volet immergé.", etape: 5 },
  { jour: "Jour 21", titre: "Mise en eau", texte: "Filtration réglée, eau équilibrée. Le premier plongeon est pour eux.", etape: 6 },
];

export default function ChantierCoque8x4() {
  return (
    <div className={`${titres.variable} ${texte.variable} font-[family-name:var(--pp-texte)] min-h-screen bg-[#F6EFE4] text-[#0F3442]`}>
      <BandeauDemonstration entreprise="Premier Plongeon" />

      <header className="sticky top-0 z-30 bg-[#F6EFE4]/95 backdrop-blur border-b border-[#E7DCCB]">
        <nav className="max-w-5xl mx-auto flex items-center justify-between gap-3 px-4 sm:px-5 py-4">
          <Link href="/exemples/premier-plongeon" aria-label="Premier Plongeon, accueil">
            <Logo />
          </Link>
          <ul className="flex gap-3 sm:gap-8 text-sm font-bold whitespace-nowrap">
            <li><Link href="/exemples/premier-plongeon#chantiers" className="hover:text-[#0E6E8C]">Chantiers</Link></li>
            <li><Link href="/exemples/premier-plongeon#prix" className="hover:text-[#0E6E8C]">Prix</Link></li>
            <li><Link href="/exemples/premier-plongeon#date" className="hover:text-[#0E6E8C]">Ma date</Link></li>
          </ul>
        </nav>
      </header>

      <main className="max-w-5xl mx-auto px-5 pt-10 pb-20 space-y-12">
        <div className="space-y-5">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#0E6E8C]">Chantier n° 27</p>
          <h1 className="font-[family-name:var(--pp-titres)] text-5xl sm:text-6xl font-semibold leading-[1.02] tracking-tight">
            Piscine coque <span className="italic text-[#0E6E8C] whitespace-nowrap">8 × 4</span>
          </h1>
          <ul className="flex flex-wrap gap-2 text-sm font-bold">
            {["3 semaines de travaux", "Volet immergé", "Plage en bois", "31\u202F400\u00A0€ TTC · exemple"].map((x) => (
              <li key={x} className="rounded-full bg-white px-4 py-2 border border-[#E7DCCB]">{x}</li>
            ))}
          </ul>
        </div>

        <ol className="space-y-6">
          {JOURS.map((j) => (
            <li key={j.jour} className="rounded-[24px] bg-white overflow-hidden shadow-[0_20px_50px_-34px_rgba(15,52,66,0.6)] sm:grid sm:grid-cols-[1.1fr_1fr]">
              <div className="bg-[#E9F3EC] px-4 py-5 flex items-center">
                <CoupeDuChantier etape={j.etape} libelle={`Coupe du chantier : ${j.titre.toLowerCase()}`} fond="#E9F3EC" />
              </div>
              <div className="p-6 space-y-2">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0E6E8C]">{j.jour}</p>
                <p className="font-[family-name:var(--pp-titres)] text-2xl font-semibold">{j.titre}</p>
                <p className="text-[#4A6470] leading-relaxed">{j.texte}</p>
              </div>
            </li>
          ))}
        </ol>

        <p className="text-sm text-[#4A6470]">
          Schémas à la place des photos : l&apos;entreprise est fictive. Sur un vrai site, ce
          sont les photos du chantier, publiées avec l&apos;accord du client.
        </p>

        <div className="rounded-[28px] bg-[#0F3442] text-white p-8 sm:p-10 space-y-4 text-center">
          <p className="font-[family-name:var(--pp-titres)] text-3xl sm:text-4xl font-semibold">Une piscine comme celle-ci ?</p>
          <Link
            href="/exemples/premier-plongeon#date"
            className="inline-block rounded-full bg-[#C4471D] px-8 py-4 text-lg font-extrabold hover:bg-[#B5401A] transition-colors"
          >
            Choisir ma date de chantier
          </Link>
        </div>
      </main>

      <PiedDemonstration entreprise="Premier Plongeon" className="bg-[#0F3442] text-[#E4EEF1]" />
    </div>
  );
}
