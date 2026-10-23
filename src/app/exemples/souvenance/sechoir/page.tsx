import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { EnTetePage, Surtitre } from "../_composants/Blocs";
import { ReserverLot } from "../_composants/Interactifs";
import { CARNET_AU, CURE, ETATS, LOTS, PHOTOS, savonDe } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Le séchoir — Souvenance, site de démonstration",
  description: "Le séchoir d'une savonnerie imaginaire : chaque lot de 96 savons, sa date de coulée et sa date de sortie, cinq semaines plus tard.",
  ...adressesDeLaPage("/exemples/souvenance/sechoir"),
};

export default function Sechoir() {
  const lots = [...LOTS].reverse();
  return (
    <main>
      <EnTetePage surtitre={`Le séchoir · carnet au ${CARNET_AU}`} titre="Chaque lot *a sa date.*" photo={PHOTOS.cure}>
        Un savon coulé à froid sèche cinq semaines sur les claies avant d&apos;être vendu. Voici le séchoir, étagère par
        étagère : ce qui sèche, ce qui sort, ce qui est parti.
      </EnTetePage>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-8 md:py-24" data-film="etageres">
        <ol className="space-y-4">
          {lots.map((l, i) => {
            const s = savonDe(l.savon);
            const part = Math.min(1, l.jours / CURE);
            return (
              <Apparition as="li" key={l.numero} delai={i * 90} data-lot={l.numero} className={`overflow-hidden rounded-[2rem] border ${l.etat === "pret" ? "border-[var(--encre)] bg-[var(--carte)]" : "border-[var(--trait)] bg-[var(--carte)]"}`}>
                <div className="grid gap-5 p-5 sm:grid-cols-[1fr_auto] sm:items-start sm:p-7">
                  <div>
                    <p className="font-[family-name:var(--titres)] text-[38px] leading-none tabular-nums">Lot {l.numero}</p>
                    <p className="mt-1 font-[family-name:var(--titres)] text-[20px] italic">{s.nom} <span className="font-[family-name:var(--texte)] text-[15px] not-italic text-[var(--doux)]">· {l.savons} savons</span></p>
                  </div>
                  <span className={`justify-self-start rounded-full px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-[0.12em] sm:justify-self-end ${l.etat === "epuise" ? "bg-[var(--encre)] text-[var(--fond)]" : l.etat === "pret" ? "bg-[var(--accent)] text-[var(--sur-accent)]" : "border border-[var(--encre)]"}`}>
                    {ETATS[l.etat]}
                  </span>
                </div>
                <div className="flex gap-1 px-5 sm:px-7" aria-hidden="true">
                  {Array.from({ length: 12 }, (_, k) => (
                    <span key={k} className="h-7 flex-1 rounded-[5px]" style={{ background: l.etat === "epuise" ? "#E4DACB" : s.fond, outline: `1px solid ${l.etat === "epuise" ? "#D3C6B4" : s.bord}` }} />
                  ))}
                </div>
                <div className="mx-5 mt-4 h-1.5 overflow-hidden rounded-full bg-[var(--trait)] sm:mx-7" aria-hidden="true">
                  <div className="h-full rounded-full bg-[var(--accent-texte)]" style={{ width: `${part * 100}%` }} />
                </div>
                <p className="flex flex-wrap justify-between gap-x-4 gap-y-1 px-5 pb-5 pt-3 text-[13px] font-semibold uppercase tracking-[0.1em] sm:px-7 sm:pb-7">
                  <span>Coulé le {l.coule.replace(" 2026", "")}</span>
                  <span>{l.etat === "epuise" ? `Sorti le ${l.sortieCourte}` : `Sort le ${l.sortie}`}</span>
                  <span className="w-full text-[var(--doux)]">{l.jours >= CURE ? `Séché ${CURE} jours` : `Séchage : ${l.jours} jours sur ${CURE}`}</span>
                </p>
              </Apparition>
            );
          })}
        </ol>
        <p className="mt-5 text-[15px] text-[var(--doux)]">Lots, dates et quantités d&apos;exemple.</p>
      </section>

      <section id="reserver" className="scroll-mt-24 px-3 pb-5 sm:px-5">
        <div className="mx-auto grid max-w-7xl gap-12 rounded-[2.5rem] bg-[#EADFCF] px-4 py-16 sm:px-10 md:py-24 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <Apparition><Surtitre>Épuisé, c&apos;est épuisé</Surtitre></Apparition>
            <TitreRevele
              texte="Un lot, *c'est 96 savons.*"
              className="font-[family-name:var(--titres)] text-[clamp(2.8rem,5.5vw,5rem)] leading-[0.95] tracking-[-0.02em]"
              classeAccent="italic text-[var(--accent-texte)]"
            />
            <Apparition as="p" delai={150} className="text-[19px] leading-relaxed text-[#5A4450]">
              Quand ils sont partis, on n&apos;en refait pas en douce : le savon suivant aura un autre numéro, une autre
              date. Réserve le tien dans le prochain lot.
            </Apparition>
            <Apparition de="rideau" delai={200} className="relative aspect-[16/10] overflow-hidden rounded-[2rem]">
              <Image src={PHOTOS.rang.src} alt={PHOTOS.rang.alt} fill sizes="(min-width: 1024px) 560px, 92vw" className="object-cover" />
            </Apparition>
          </div>
          <Apparition de="zoom" delai={150}>
            <ReserverLot />
          </Apparition>
        </div>
      </section>
    </main>
  );
}
