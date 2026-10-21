import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import { appareils, euros, photos } from "../_composants/donnees";
import Panne from "../_composants/Panne";

export const metadata: Metadata = {
  title: "En panne · Ton dépôt — site de démonstration",
  description: "Site de démonstration d'un fournisseur de matériel de restauration imaginaire : la photo de la plaque de l'appareil, la pièce qu'il lui faut, et le vrai stock du dépôt.",
  ...adressesDeLaPage("/exemples/ton-depot/en-panne"),
};

export default function EnPanne() {
  return (
    <>
      <section className="mx-auto grid grid-cols-1 max-w-6xl gap-10 px-5 pb-16 pt-8 sm:px-6 md:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--doux)]">Service pièces</p>
          <h1 className="text-[46px] font-extrabold leading-[0.98] tracking-tight sm:text-6xl">
            Une photo de la plaque. <span className="text-[var(--accent-texte)]">La bonne pièce.</span>
          </h1>
          <p className="text-lg leading-relaxed text-[var(--doux)]">
            Choisis l&apos;appareil, prends sa plaque en photo, ou tape son modèle. On te montre ses pièces,
            leur prix et ce qu&apos;il y a sur les étagères du dépôt, maintenant.
          </p>
          <Image src={photos.louches.src} width={photos.louches.largeur} height={photos.louches.hauteur} alt={photos.louches.alt} sizes="(min-width: 768px) 420px, 100vw" className="hidden aspect-[4/5] w-full rounded-[18px] object-cover md:block" />
        </div>
        <div className="rounded-[18px] border border-[var(--trait)] bg-[var(--carte)] p-5 sm:p-8" id="outil">
          <Panne ouvert />
        </div>
      </section>

      <section className="border-t border-[var(--trait)] bg-[var(--sombre)] px-5 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl space-y-8">
          <h2 className="text-4xl font-extrabold tracking-tight">Les modèles reconnus, et leurs pièces.</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {appareils.map((a) => (
              <div key={a.id} className="overflow-hidden rounded-[14px] border border-[var(--trait)] bg-[var(--carte)]">
                <p className="border-b border-[var(--trait)] px-4 py-3 font-bold">
                  {a.modele} <span className="font-normal text-[var(--doux)]">· {a.nom}</span>
                </p>
                <ul className="divide-y divide-[var(--trait)] text-sm">
                  {a.pieces.map((p) => (
                    <li key={p.ref} className="flex items-center justify-between gap-3 px-4 py-2.5">
                      <span>{p.nom} <span className="text-[var(--doux)]">{p.ref}</span></span>
                      <span className={`shrink-0 font-semibold tabular-nums ${p.stock ? "text-[#5CD68D]" : "text-[#F2B84B]"}`}>
                        {p.stock ? `${p.stock} · ` : `${p.delai} · `}{euros(p.prix)} HT
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-sm text-[var(--doux)]">Modèles, stocks et prix d&apos;exemple. Aucune marque réelle : la plaque dit « FABRICANT ».</p>
        </div>
      </section>
    </>
  );
}
