import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import { photos, programme } from "../_composants/donnees";
import { Intitule, Photo } from "../_composants/Blocs";
import Inscription from "../_composants/Inscription";

export const metadata: Metadata = {
  title: "Un dimanche par mois — Dimanche Midi, site de démonstration",
  description:
    "Un dimanche par mois, un cabinet de gestion de patrimoine imaginaire ouvre à midi : parents et enfants viennent ensemble ouvrir le carnet de famille.",
  ...adressesDeLaPage("/exemples/dimanche-midi/dimanche"),
};

export default function PageDimanche() {
  return (
    <div>
      <section className="mx-auto grid max-w-6xl gap-10 px-4 pt-10 pb-20 sm:px-6 sm:pt-16 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div className="space-y-8 px-1">
          <Intitule niveau={1} libelle="Un dimanche par mois" titre={<>Le cabinet ouvre <em>à midi.</em></>}>
            <p>Parents et enfants, ensemble, au cabinet, sur inscription. Sans frais. On ouvre le carnet de famille, et chacun pose ses questions.</p>
          </Intitule>
          <Photo photo={photos.lampe} sizes="(min-width: 1024px) 520px, 100vw" className="aspect-[4/3] rounded-[24px]" />
        </div>
        <Inscription />
      </section>

      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto max-w-6xl space-y-10 px-5 py-20 sm:px-6">
          <Intitule clair libelle="Le déroulé" titre={<>De midi <em className="text-[#D9B45A]">à trois heures.</em></>} />
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {programme.map((p) => (
              <li key={p.heure} className="space-y-2 rounded-[22px] bg-[#3A5848] p-6">
                <p className="font-[family-name:var(--titres)] text-[30px] text-[#D9B45A] [font-variant-numeric:lining-nums]">{p.heure}</p>
                <p className="text-[19px] font-semibold">{p.titre}</p>
                <p className="text-[15px] leading-relaxed text-[#E9D8B4]">{p.texte}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-3xl space-y-4 px-5 py-20 text-center sm:px-6">
        <p className="font-[family-name:var(--titres)] text-[30px] leading-snug">
          Vous venez. <em>Nous ne venons pas chez vous.</em>
        </p>
        <p className="text-[16px] leading-relaxed text-[var(--doux)]">
          Un rendez-vous à la maison, même demandé par la famille, serait du démarchage (code monétaire et financier,
          art. L341-1). Le dimanche se passe au cabinet : c&apos;est pour ça qu&apos;il existe.
        </p>
      </section>
    </div>
  );
}
