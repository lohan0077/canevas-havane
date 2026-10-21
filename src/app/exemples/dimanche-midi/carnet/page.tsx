import type { Metadata } from "next";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER } from "../_composants/donnees";
import { Intitule } from "../_composants/Blocs";
import Carnet from "../_composants/Carnet";

export const metadata: Metadata = {
  title: "Le carnet de famille — Dimanche Midi, site de démonstration",
  description:
    "Le carnet de famille d'un cabinet de gestion de patrimoine imaginaire : où est quoi, qui appeler, ce qui est prévu. Il reste sur ton téléphone, et tu le télécharges en PDF.",
  ...adressesDeLaPage("/exemples/dimanche-midi/carnet"),
};

const POINTS = [
  { titre: "Il reste chez toi", texte: "Ce que tu écris ne quitte pas ta page. Le cabinet ne le reçoit pas, ne le lit pas, n'en garde rien." },
  { titre: "C'est toi qui le donnes", texte: "Télécharge-le en PDF, imprime-le, glisse-le dans la boîte bleue. Le cabinet n'écrit jamais à tes enfants." },
  { titre: "Pas besoin de tout savoir", texte: "Une ligne vide, c'est une question pour le prochain dimanche. C'est déjà utile." },
];

export default function PageCarnet() {
  return (
    <div>
      <section className="mx-auto grid max-w-6xl gap-10 px-4 pt-10 pb-20 sm:px-6 sm:pt-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="space-y-8 px-1">
          <Intitule niveau={1} libelle="Un seul outil" titre={<>Le carnet <em>de famille.</em></>}>
            <p>Trois pages : où est quoi, qui appeler, ce qui est prévu. Écris ce que tu sais, laisse vide ce que tu ne sais pas.</p>
          </Intitule>
          <ul className="hidden space-y-5 lg:block">
            {POINTS.map((p) => (
              <li key={p.titre} className="border-l-2 border-[#B5523B] pl-5">
                <p className="font-[family-name:var(--titres)] text-[22px]">{p.titre}</p>
                <p className="text-[15px] leading-relaxed text-[var(--doux)]">{p.texte}</p>
              </li>
            ))}
          </ul>
        </div>
        <Carnet />
      </section>

      <section className="border-t border-[var(--trait)] bg-[#F3E7CF] lg:hidden">
        <ul className="mx-auto max-w-6xl space-y-5 px-5 py-14 sm:px-6">
          {POINTS.map((p) => (
            <li key={p.titre} className="border-l-2 border-[#B5523B] pl-5">
              <p className="font-[family-name:var(--titres)] text-[22px]">{p.titre}</p>
              <p className="text-[15px] leading-relaxed text-[var(--doux)]">{p.texte}</p>
            </li>
          ))}
        </ul>
      </section>

      <section data-film="en-parler" className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-5 py-16 sm:px-6">
          <p className="font-[family-name:var(--titres)] text-[32px] leading-tight">
            Et si tu veux en parler, <em className="text-[#D9B45A]">c&apos;est toi qui prends rendez-vous.</em>
          </p>
          <Link href={`${DOSSIER}#rendez-vous`} className="rounded-full bg-[var(--fond)] px-6 py-3.5 font-semibold text-[var(--encre)]">Prendre rendez-vous</Link>
        </div>
      </section>
    </div>
  );
}
