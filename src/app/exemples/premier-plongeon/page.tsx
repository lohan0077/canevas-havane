import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import BandeauDemonstration from "../_composants/BandeauDemonstration";
import PiedDemonstration from "../_composants/PiedDemonstration";
import CoupeDuChantier from "../_composants/CoupeDuChantier";
import { texte, libelles } from "./_composants/polices";
import { Intitule, Plaque, styles as s } from "./_composants/Habillage";
import Jardin from "./_composants/Jardin";
import CompteARebours from "./_composants/CompteARebours";
import Creneaux from "./_composants/Creneaux";
import Logo from "./_composants/Logo";
import Ouverture from "./_composants/Ouverture";

// Le site imaginé dans la vidéo « Si je devais remplir l'agenda d'un pisciniste ».
// Chaque idée de la vidéo est ici en état de marche : le jardin qui dit quelle
// piscine rentre, le premier dimanche de juillet, une page par chantier, les dates
// qu'on bloque soi-même. Tout le site parle la langue du modèle « Monolith Hero »
// de MotionSites, qui fait son premier écran : la nuit, des filets, des coins coupés.
export const metadata: Metadata = {
  title: "Premier Plongeon — site de démonstration",
  description: "Site de démonstration d'un pisciniste imaginaire, réalisé par Canevas Havane : la piscine qui rentre dans ton jardin, et la date de chantier qu'on bloque soi-même.",
  ...adressesDeLaPage("/exemples/premier-plongeon"),
};

const FILET = "border-[rgba(255,255,255,0.13)]";

export default function PremierPlongeon() {
  return (
    <div className={`${texte.variable} ${libelles.variable} font-[family-name:var(--pp-texte)] min-h-screen bg-[#04070d] text-[#e6eaf5]`}>
      {/* Le bandeau et l'ouverture partagent exactement un écran : le socle de
          l'ouverture reste visible quelle que soit la hauteur du bandeau. */}
      <div className="flex flex-col h-svh">
        <BandeauDemonstration entreprise="Premier Plongeon" />
        <Ouverture />
      </div>

      {/* Placée après l'ouverture, la barre défile avec elle puis reste en haut
          de l'écran pour tout le reste de la page. */}
      <div className={`sticky top-0 z-30 bg-[#04070d]/90 backdrop-blur border-b ${FILET}`}>
        <nav aria-label="Raccourcis" className="max-w-6xl mx-auto flex items-center justify-between gap-3 px-4 sm:px-6 py-4">
          <Link href="/exemples/premier-plongeon" aria-label="Premier Plongeon, accueil">
            <Logo replie />
          </Link>
          <ul className={`${s.technique} flex gap-5 sm:gap-8 text-[11px] sm:text-xs whitespace-nowrap`}>
            <li><a href="#prix" className="text-[#e6eaf5] hover:text-[#e8d1cb] transition-colors">Prix</a></li>
            <li><a href="#chantiers" className="text-[#e6eaf5] hover:text-[#e8d1cb] transition-colors">Chantiers</a></li>
            <li><a href="#date" className="text-[#e6eaf5] hover:text-[#e8d1cb] transition-colors">Ma date</a></li>
          </ul>
        </nav>
      </div>

      <main>
        <section id="prix" className="scroll-mt-20 max-w-6xl mx-auto px-5 sm:px-6 py-20 sm:py-28 grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center">
          <Intitule libelle="Ta piscine" titre={<>Ton jardin fait <span className="text-[#e8d1cb]">combien&nbsp;?</span></>}>
            Glisse le curseur : le plan te montre la piscine qui rentre, et ce
            qu&apos;elle coûte vraiment, pose comprise.
          </Intitule>
          <Jardin />
        </section>

        <section id="ete" className={`scroll-mt-20 border-y ${FILET} bg-[#070b13]`}>
          <div className="max-w-6xl mx-auto px-5 sm:px-6 py-20 sm:py-28 grid gap-12 lg:grid-cols-2 lg:items-center">
            <Plaque coupe={28} className="order-last lg:order-first">
              <Image
                src="/exemples/premier-plongeon/marches.webp"
                alt=""
                width={1600}
                height={900}
                sizes="(min-width: 1152px) 540px, (min-width: 1024px) 46vw, 100vw"
                className="block w-full h-auto"
              />
            </Plaque>
            <div className="space-y-10">
              <Intitule
                long
                libelle="Pourquoi on fait ça"
                titre={<>On ne vend pas une piscine. On vend le <span className="text-[#e8d1cb]">premier dimanche de juillet.</span></>}
              >
                Le jour où toute la famille saute en même temps. Pour qu&apos;il arrive à
                l&apos;heure, le chantier se cale au printemps.
              </Intitule>
              <CompteARebours />
            </div>
          </div>
        </section>

        <section id="chantiers" className="scroll-mt-20 max-w-6xl mx-auto px-5 sm:px-6 py-20 sm:py-28 space-y-12">
          <Intitule libelle="Nos chantiers" titre={<>Chaque chantier a <span className="text-[#e8d1cb]">sa page.</span></>}>
            La taille, la durée des travaux, le prix, et le chantier jour par jour.
            Exactement ce que tu cherches sur Google avant d&apos;appeler.
          </Intitule>
          <Link
            href="/exemples/premier-plongeon/chantiers/coque-8x4"
            className="group block focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-4"
          >
            <Plaque coupe={28}>
              <div className="grid md:grid-cols-[1.15fr_1fr]">
                <div className={`${s.quadrillage} px-5 py-8 sm:px-8 flex items-center`}>
                  <CoupeDuChantier etape={6} palette="nuit" fond="#070b13" libelle="Coupe de la piscine terminée, remplie d'eau" />
                </div>
                <div className="p-6 sm:p-10 space-y-4 flex flex-col justify-center">
                  <p className={`${s.technique} text-xs text-[#e8d1cb]`}>Chantier n° 27</p>
                  <p className={`${s.titre} text-3xl sm:text-4xl`}>Piscine coque {"8 × 4"}</p>
                  <p className="text-[#b9c0cc]">3 semaines de travaux · volet immergé · plage en bois</p>
                  <p className={`${s.technique} pt-2 text-sm text-white group-hover:text-[#e8d1cb] transition-colors`}>
                    Voir le chantier jour par jour{"\u00A0"}<span aria-hidden="true">→</span>
                  </p>
                </div>
              </div>
            </Plaque>
          </Link>
        </section>

        <section id="date" className={`scroll-mt-20 border-t ${FILET} bg-[#070b13]`}>
          <div className="max-w-6xl mx-auto px-5 sm:px-6 py-20 sm:py-28 space-y-12">
            <Intitule libelle="Ma date" titre={<>Chantiers 2027&nbsp;: <span className="text-[#e8d1cb]">les dates.</span></>}>
              Pas de formulaire de quatorze champs. Tu choisis ta semaine, tu la bloques,
              on vient faire la visite technique.
            </Intitule>
            <Creneaux />
          </div>
        </section>
      </main>

      <PiedDemonstration entreprise="Premier Plongeon" className={`bg-[#04070d] text-[#b9c0cc] border-t ${FILET}`} />
    </div>
  );
}
