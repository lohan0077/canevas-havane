import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import BandeauDemonstration from "../../../_composants/BandeauDemonstration";
import PiedDemonstration from "../../../_composants/PiedDemonstration";
import CoupeDuChantier from "../../../_composants/CoupeDuChantier";
import { texte, libelles } from "../../_composants/polices";
import { Intitule, Plaque, styles as s } from "../../_composants/Habillage";
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

const CARACTERISTIQUES = ["3 semaines de travaux", "Volet immergé", "Plage en bois", "31 400 € TTC · exemple"];

const FILET = "border-[rgba(255,255,255,0.13)]";

export default function ChantierCoque8x4() {
  return (
    <div className={`${texte.variable} ${libelles.variable} font-[family-name:var(--pp-texte)] min-h-screen bg-[#04070d] text-[#e6eaf5]`}>
      <BandeauDemonstration entreprise="Premier Plongeon" />

      <header className={`sticky top-0 z-30 bg-[#04070d]/90 backdrop-blur border-b ${FILET}`}>
        <nav className="max-w-6xl mx-auto flex items-center justify-between gap-3 px-4 sm:px-6 py-4">
          <Link href="/exemples/premier-plongeon" aria-label="Premier Plongeon, accueil">
            <Logo replie />
          </Link>
          <ul className={`${s.technique} flex gap-5 sm:gap-8 text-[11px] sm:text-xs whitespace-nowrap`}>
            <li><Link href="/exemples/premier-plongeon#chantiers" className="text-[#e6eaf5] hover:text-[#e8d1cb] transition-colors">Chantiers</Link></li>
            <li><Link href="/exemples/premier-plongeon#prix" className="text-[#e6eaf5] hover:text-[#e8d1cb] transition-colors">Prix</Link></li>
            <li><Link href="/exemples/premier-plongeon#date" className="text-[#e6eaf5] hover:text-[#e8d1cb] transition-colors">Ma date</Link></li>
          </ul>
        </nav>
      </header>

      <main>
        <div className="max-w-6xl mx-auto px-5 sm:px-6 pt-10 sm:pt-14 space-y-12">
          <Plaque coupe={28}>
            <Image
              src="/exemples/premier-plongeon/profil.webp"
              alt=""
              width={1600}
              height={900}
              priority
              sizes="(min-width: 1152px) 1104px, 100vw"
              className="block w-full h-[34vh] min-h-[220px] max-h-[440px] object-cover"
            />
          </Plaque>

          <div className="space-y-8">
            <Intitule niveau={1} libelle="Chantier n° 27" titre={<>Piscine coque <span className="text-[#e8d1cb] whitespace-nowrap">{"8 × 4"}</span></>} />
            <ul className="flex flex-wrap gap-3">
              {CARACTERISTIQUES.map((x) => (
                <li key={x}>
                  <Plaque coupe={10}>
                    <span className={`${s.technique} block px-4 py-2.5 text-[11px] text-[#e6eaf5]`}>{x}</span>
                  </Plaque>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <ol className="max-w-6xl mx-auto px-5 sm:px-6 py-16 sm:py-20 space-y-6">
          {JOURS.map((j, i) => (
            <li key={j.jour}>
              <Plaque coupe={24}>
                <div className="grid md:grid-cols-[1.1fr_1fr]">
                  <div className={`${s.quadrillage} px-5 py-6 sm:px-8 flex items-center`}>
                    <CoupeDuChantier etape={j.etape} palette="nuit" fond="#070b13" libelle={`Coupe du chantier : ${j.titre.toLowerCase()}`} />
                  </div>
                  <div className="p-6 sm:p-8 space-y-3 flex flex-col justify-center">
                    <p className="flex items-center justify-between gap-4">
                      <span className={`${s.technique} text-xs text-[#e8d1cb]`}>{j.jour}</span>
                      <span className={`${s.technique} text-[11px] text-[#8f98a8]`}>Étape {i + 1} / {JOURS.length}</span>
                    </p>
                    <h2 className={`${s.titre} text-2xl sm:text-3xl`}>{j.titre}</h2>
                    <p className="text-[#b9c0cc] leading-relaxed">{j.texte}</p>
                  </div>
                </div>
              </Plaque>
            </li>
          ))}
        </ol>

        <div className="max-w-6xl mx-auto px-5 sm:px-6 pb-24 space-y-8">
          <p className="text-sm text-[#8f98a8]">
            Schémas à la place des photos : l&apos;entreprise est fictive. Sur un vrai site, ce
            sont les photos du chantier, publiées avec l&apos;accord du client.
          </p>
          <Plaque coupe={28}>
            <div className="p-8 sm:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <p className={`${s.titre} text-3xl sm:text-4xl`}>Une piscine comme celle-ci&nbsp;?</p>
              <Link href="/exemples/premier-plongeon#date" className={s.bouton}>
                Choisir ma date de chantier
              </Link>
            </div>
          </Plaque>
        </div>
      </main>

      <PiedDemonstration entreprise="Premier Plongeon" className={`bg-[#04070d] text-[#b9c0cc] border-t ${FILET}`} />
    </div>
  );
}
