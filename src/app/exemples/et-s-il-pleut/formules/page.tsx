import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, EnTetePage } from "../_composants/Blocs";
import { FORMULES, euros, photos } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Les prix — Et s'il pleut, site de démonstration",
  description: "Les trois formules d'une wedding planner imaginaire, plan B compris dans chacune : le jour J, la moitié du chemin, de A à Z. Prix TTC d'exemple, affichés en clair.",
  ...adressesDeLaPage("/exemples/et-s-il-pleut/formules"),
};

const PAS_COMPRIS = [
  "Les prestataires eux-mêmes (lieu, traiteur, photographe…) : tu les paies directement, sans marge de notre part.",
  "Les frais de déplacement au-delà de 50 km de Rouen : annoncés au devis, avant de signer.",
  "Aucune commission reçue d'un prestataire : on n'est payés que par toi.",
];

export default function PageFormules() {
  return (
    <main>
      <EnTetePage surtitre="Les prix" titre="Trois formules. *Deux versions chacune.*" photo={photos.soir}>
        Affichés ici, pas dans un PDF envoyé trois jours plus tard. Le plan B est compris dans
        chacune. Le devis précis suit le premier rendez-vous, gratuit.
      </EnTetePage>

      <section className="mx-auto grid max-w-6xl gap-5 px-5 py-24 sm:px-8 lg:grid-cols-3">
        {FORMULES.map((f, i) => {
          const fort = i === 1;
          return (
            <Apparition as="article" key={f.id} id={`formule-${f.id}`} delai={i * 120} de="zoom" className={`space-y-5 rounded-[2.2rem] p-7 sm:p-9 ${fort ? "bg-[var(--sombre)] text-[var(--sur-sombre)]" : "border border-[var(--trait)] bg-[var(--carte)]"}`}>
              <p className={`text-xs font-medium uppercase tracking-[0.2em] ${fort ? "text-[var(--accent)]" : "text-[var(--accent-texte)]"}`}>0{i + 1} · {f.sous}</p>
              <h2 className="text-[38px] font-normal leading-tight">{f.titre}</h2>
              <p className="font-[family-name:var(--titres)] text-5xl italic">dès {euros(f.prix)}</p>
              <p className={`text-sm ${fort ? "" : "text-[var(--doux)]"}`}>TTC · prix d&apos;exemple · plan B compris</p>
              <ul className={`space-y-2.5 border-t pt-5 ${fort ? "border-white/20" : "border-[var(--trait)]"}`}>
                {f.compris.map((c) => (
                  <li key={c} className="flex gap-3"><span aria-hidden="true" className={fort ? "text-[var(--accent)]" : "text-[var(--accent-texte)]"}>☂</span>{c}</li>
                ))}
              </ul>
            </Apparition>
          );
        })}
      </section>

      <section className="bg-[#E4EAF1]">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-24 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <TitreRevele texte="Ce qui n'est *pas dedans.*" className="text-[clamp(2.6rem,5.4vw,4.6rem)] font-normal leading-[0.98]" classeAccent="italic text-[var(--accent-texte)]" />
            <ul className="space-y-4">
              {PAS_COMPRIS.map((p) => (
                <li key={p} className="border-t border-[var(--encre)] pt-4 text-lg leading-relaxed">{p}</li>
              ))}
            </ul>
          </div>
          <Apparition de="rideau" className="relative aspect-[4/5] overflow-hidden rounded-t-full">
            <Image src={photos.chaises.src} alt={photos.chaises.alt} fill sizes="(min-width: 1024px) 460px, 100vw" className="kit-cinema-img object-cover" />
          </Apparition>
        </div>
      </section>

      <AppelFinal />
    </main>
  );
}
