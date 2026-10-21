import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import { CARNET_AU, CURE, ETATS, LOTS, PHOTOS, RECETTES } from "../_composants/donnees";
import { Coins, Technique } from "../_composants/Elements";
import { ReserverLot } from "../_composants/Interactifs";

export const metadata: Metadata = {
  title: "La Coulée — site de démonstration",
  description: "Le séchoir d'une savonnerie imaginaire : chaque lot de 96 savons, sa date de coulée et sa date de sortie, cinq semaines plus tard.",
  ...adressesDeLaPage("/exemples/la-coulee/sechoir"),
};

export default function Sechoir() {
  const lots = [...LOTS].reverse();
  return (
    <main>
      <section className="mx-auto max-w-6xl px-4 pb-10 pt-8 sm:px-8">
        <div className="flex justify-between gap-4">
          <Technique>Le séchoir</Technique>
          <Technique>Au {CARNET_AU}</Technique>
        </div>
        <h1 className="mt-5 text-[54px] font-bold uppercase leading-[0.9] tracking-[-0.035em] sm:text-[96px]">Chaque lot a sa date.</h1>
        <p className="mt-5 max-w-xl text-[19px] leading-relaxed">
          Un savon coulé à froid sèche cinq semaines sur les claies avant d&apos;être vendu. Voici le séchoir, étagère par
          étagère : ce qui sèche, ce qui sort, ce qui est parti.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-8" data-film="etageres">
        <ol className="space-y-3">
          {lots.map((l) => {
            const part = Math.min(1, l.jours / CURE);
            return (
              <li key={l.numero} className="relative bg-[var(--carte)] p-4 sm:p-6" data-lot={l.numero}>
                <Coins couleur={l.etat === "pret" ? "var(--accent)" : "var(--doux)"} />
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-[family-name:var(--titres)] text-[30px] font-bold leading-none">Lot {l.numero}</p>
                    <p className="mt-1 text-[16px]">{RECETTES[l.recette].nom} · {l.savons} savons</p>
                  </div>
                  <span className={`shrink-0 rounded-full px-3 py-1 font-mono text-[11px] font-bold uppercase ${l.etat === "epuise" ? "bg-[var(--encre)] text-[var(--fond)]" : l.etat === "pret" ? "bg-[var(--accent)] text-[var(--sur-accent)]" : "border border-[var(--encre)]"}`}>
                    {ETATS[l.etat]}
                  </span>
                </div>
                <div className="mt-4 flex gap-1" aria-hidden="true">
                  {Array.from({ length: 12 }, (_, k) => (
                    <span key={k} className="h-5 flex-1 rounded-[2px]" style={{ background: l.etat === "epuise" ? "#DCD4C6" : RECETTES[l.recette].teinte, outline: "1px solid #C9C0B0" }} />
                  ))}
                </div>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[var(--trait)]" aria-hidden="true">
                  <div className="h-full bg-[var(--accent)]" style={{ width: `${part * 100}%` }} />
                </div>
                <p className="mt-2 flex flex-wrap justify-between gap-x-4 font-mono text-[12px] uppercase tracking-[0.1em]">
                  <span>Coulé le {l.coule.replace(" 2026", "")}</span>
                  <span>{l.etat === "epuise" ? `Sorti le ${l.sortieCourte}` : `Sort le ${l.sortie}`}</span>
                </p>
                <p className="mt-1 font-mono text-[12px] uppercase tracking-[0.1em] text-[var(--doux)]">
                  {l.jours >= CURE ? `Séché ${CURE} jours` : `Séchage : ${l.jours} jours sur ${CURE}`}
                </p>
              </li>
            );
          })}
        </ol>
        <p className="mt-4 text-[15px] text-[var(--doux)]">Lots, dates et quantités d&apos;exemple.</p>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-8 md:grid-cols-2 md:items-start">
        <div className="space-y-5">
          <Technique>Épuisé, c&apos;est épuisé</Technique>
          <h2 className="text-[40px] font-bold uppercase leading-[0.95] tracking-[-0.03em] sm:text-5xl">Un lot, c&apos;est 96 savons.</h2>
          <p className="text-[19px] leading-relaxed">
            Quand ils sont partis, on n&apos;en refait pas en douce : le savon suivant aura un autre numéro, une autre
            date, et sa propre page. Réserve le tien dans le prochain lot.
          </p>
          <div className="overflow-hidden rounded-[6px]">
            <Image src={PHOTOS.cure.src} alt={PHOTOS.cure.alt} width={PHOTOS.cure.largeur} height={PHOTOS.cure.hauteur} sizes="(min-width: 768px) 540px, 94vw" className="h-auto w-full" />
          </div>
        </div>
        <ReserverLot />
      </section>
    </main>
  );
}
