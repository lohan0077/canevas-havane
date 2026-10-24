import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, EnTetePage, Surtitre } from "../_composants/Blocs";
import Panne from "../_composants/Panne";
import { appareils, euros, photos } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "En panne — Reviens., site de démonstration",
  description:
    "Le service pièces de Reviens., dépôt de matériel professionnel imaginaire : la photo de la plaque de l'appareil, la pièce qu'il lui faut, et le vrai stock du dépôt.",
  ...adressesDeLaPage("/exemples/reviens/en-panne"),
};

const GESTES = [
  ["01", "La plaque", "Une photo de la plaque signalétique, collée au dos ou dans la porte de l'appareil."],
  ["02", "La pièce", "Le site lit le modèle, te montre ses pièces, et ce qu'il y a au dépôt, maintenant."],
  ["03", "Le comptoir", "Tu la réserves. Elle t'attend au comptoir — le samedi, jusqu'à 23 h."],
];

export default function EnPanne() {
  return (
    <main>
      <EnTetePage surtitre="Service pièces" n="01" titre="Une photo de la plaque. *La bonne pièce.*" photo={photos.louches}>
        Choisis l&apos;appareil, prends sa plaque en photo, ou tape son modèle. On te montre ses pièces, leur
        prix hors taxes et ce qu&apos;il y a sur les étagères du dépôt.
      </EnTetePage>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div className="space-y-8 lg:sticky lg:top-28">
          <Apparition><Surtitre n="02">Trois gestes</Surtitre></Apparition>
          <TitreRevele
            texte="Et la pièce *t'attend.*"
            className="font-[family-name:var(--titres)] text-[clamp(2.4rem,5vw,4.4rem)] font-black uppercase leading-[0.92] tracking-[-0.045em]"
            classeAccent="text-[var(--accent-texte)]"
          />
          <ol className="space-y-3">
            {GESTES.map(([n, t, d], i) => (
              <Apparition as="li" key={n} delai={i * 120} de="gauche" className="flex gap-4 rounded-[14px] border border-[var(--trait)] bg-[var(--carte)] p-5">
                <span className="font-[family-name:var(--titres)] text-3xl font-black tabular-nums text-[var(--accent-texte)]">{n}</span>
                <span>
                  <span className="block font-[family-name:var(--titres)] text-xl font-black uppercase">{t}</span>
                  <span className="text-[var(--doux)]">{d}</span>
                </span>
              </Apparition>
            ))}
          </ol>
          <Apparition className="relative hidden aspect-[4/3] overflow-hidden rounded-[18px] lg:block">
            <Image src={photos.piano.src} alt={photos.piano.alt} fill sizes="40vw" className="object-cover" />
          </Apparition>
        </div>
        <div>
          <div id="outil" className="scroll-mt-24 rounded-[22px] border border-white/15 bg-[#151E25] p-5 shadow-[0_50px_110px_-45px_rgba(0,0,0,0.85)] sm:p-7">
            <div className="mb-5 flex items-center justify-between gap-3 border-b border-dashed border-white/20 pb-3 font-[family-name:var(--titres)] text-[12px] font-bold uppercase tracking-[0.16em]">
              <span className="flex items-center gap-2 text-[#5CD68D]">
                <span aria-hidden="true" className="h-2 w-2 animate-pulse rounded-full bg-[#5CD68D]" />
                Comptoir pièces ouvert
              </span>
              <span className="text-[#B9C2CA]">Stock en direct</span>
            </div>
            <Panne ouvert />
          </div>
        </div>
      </section>

      <section className="px-3 pb-20 sm:px-5 md:pb-28">
        <div className="rounded-[22px] bg-[var(--sombre)] text-[var(--sur-sombre)]">
          <div className="mx-auto max-w-6xl space-y-10 px-7 py-20 sm:px-12">
            <div className="space-y-5">
              <Apparition><Surtitre clair n="03">Les modèles reconnus</Surtitre></Apparition>
              <TitreRevele
                texte="Leurs pièces, *et le stock.*"
                className="font-[family-name:var(--titres)] text-[clamp(2.3rem,4.6vw,4rem)] font-black uppercase leading-[0.92] tracking-[-0.045em]"
                classeAccent="text-[#E9D8B4]"
              />
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {appareils.map((a, i) => (
                <Apparition key={a.id} delai={i * 120} de="zoom" className="overflow-hidden rounded-[14px] border border-white/15 bg-[#151E25]">
                  <p className="border-b border-dashed border-white/20 px-5 py-4 font-[family-name:var(--titres)] font-black uppercase">
                    {a.modele} <span className="font-[family-name:var(--texte)] font-normal normal-case text-[#B9C2CA]">· {a.nom}</span>
                  </p>
                  <ul className="divide-y divide-white/10 text-sm">
                    {a.pieces.map((p) => (
                      <li key={p.ref} className="flex items-center justify-between gap-3 px-5 py-3">
                        <span className="text-[#F2EEE6]">{p.nom} <span className="text-[#B9C2CA]">{p.ref}</span></span>
                        <span className={`shrink-0 font-semibold tabular-nums ${p.stock ? "text-[#5CD68D]" : "text-[#F2B84B]"}`}>
                          {p.stock ? `${p.stock} · ` : `${p.delai} · `}{euros(p.prix)} HT
                        </span>
                      </li>
                    ))}
                  </ul>
                </Apparition>
              ))}
            </div>
            <p className="text-sm">Modèles, stocks et prix hors taxes d&apos;exemple. Aucune marque réelle : la plaque dit « FABRICANT ».</p>
          </div>
        </div>
      </section>

      <AppelFinal />
    </main>
  );
}
