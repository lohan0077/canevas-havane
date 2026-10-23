import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Accordeon from "../../_kit/Accordeon";
import Apparition from "../../_kit/Apparition";
import { AppelFinal, EnTetePage, Surtitre, Titre } from "../_composants/Blocs";
import { FORMULES, QUESTIONS, euros, photos } from "../_composants/donnees";

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

const PRESTATAIRES = QUESTIONS.filter((q) => q.question.startsWith("Vous travaillez"));

export default function PageFormules() {
  return (
    <main>
      <EnTetePage surtitre="Les prix" titre="Trois formules. *Deux versions chacune.*" photo={photos.soir}>
        Affichés ici, pas dans un PDF envoyé trois jours plus tard. Le plan B est compris dans
        chacune. Le devis précis suit le premier rendez-vous, gratuit.
      </EnTetePage>

      <section className="mx-auto grid max-w-6xl gap-5 px-6 py-28 md:py-40 lg:grid-cols-3">
        {FORMULES.map((f, i) => {
          const fort = i === 1;
          return (
            <Apparition as="article" key={f.id} id={`formule-${f.id}`} delai={i * 120} className={`space-y-5 rounded-2xl p-7 sm:p-9 ${fort ? "bg-[var(--sombre)] text-[var(--sur-sombre)]" : "border border-[var(--trait)] bg-[var(--carte)]"}`}>
              <p className={`text-[12px] font-medium uppercase tracking-[0.2em] ${fort ? "" : "text-[var(--doux)]"}`}>0{i + 1} — {f.sous}</p>
              <h2 className="font-[family-name:var(--titres)] text-[2rem] font-normal leading-tight">{f.titre}</h2>
              <p className="font-[family-name:var(--titres)] text-4xl italic">dès {euros(f.prix)}</p>
              <p className={`text-[15px] ${fort ? "" : "text-[var(--doux)]"}`}>TTC · prix d&apos;exemple · plan B compris</p>
              <ul className={`space-y-2.5 border-t pt-5 ${fort ? "border-white/20" : "border-[var(--trait)]"}`}>
                {f.compris.map((c) => (
                  <li key={c} className="leading-relaxed">{c}</li>
                ))}
              </ul>
            </Apparition>
          );
        })}
      </section>

      <section className="bg-[var(--carte)]">
        <div className="mx-auto grid max-w-6xl gap-16 px-6 py-28 md:py-40 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <Apparition><Surtitre>Ce qui n&apos;est pas dedans</Surtitre></Apparition>
            <Titre texte="Pas de marge, *pas de commission.*" />
            <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
              {PAS_COMPRIS.map((p) => (
                <li key={p} className="py-4 text-lg leading-relaxed text-[var(--doux)]">{p}</li>
              ))}
            </ul>
            <Accordeon questions={PRESTATAIRES} />
          </div>
          <Apparition className="relative aspect-[4/5] overflow-hidden rounded-2xl">
            <Image src={photos.chaises.src} alt={photos.chaises.alt} fill sizes="(min-width: 1024px) 460px, 100vw" className="object-cover" />
          </Apparition>
        </div>
      </section>

      <AppelFinal />
    </main>
  );
}
