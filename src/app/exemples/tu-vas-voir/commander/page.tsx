import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import { Libelle, Port } from "../_composants/Blocs";
import { Commande } from "../_composants/Formulaires";

export const metadata: Metadata = {
  title: "Tu Vas Voir — site de démonstration",
  description: "Commander n'importe quel livre dans une librairie imaginaire : à l'unité, sans frais de commande, retiré en boutique sans port.",
  ...adressesDeLaPage("/exemples/tu-vas-voir/commander"),
};

const REGLES = [
  { t: "À l'unité, sans frais", d: "Un seul livre, s'il le faut : tout libraire doit offrir ce service gratuitement (loi n° 81-766, art. 1)." },
  { t: "Au prix de l'éditeur", d: "Le prix d'un livre neuf est fixé par son éditeur. Le nôtre est le même que partout ailleurs." },
  { t: "Quelques jours", d: "Selon l'éditeur et le distributeur. On te prévient dès qu'il arrive." },
];

export default function Commander() {
  return (
    <div className="mx-auto max-w-6xl px-5 pb-16 pt-10 lg:pt-16">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-5">
          <Libelle n="—">Commander</Libelle>
          <h1 className="text-[46px] font-medium tracking-tight sm:text-[72px]">
            Pas en rayon&nbsp;? <em className="font-normal">On le fait venir.</em>
          </h1>
          <dl className="space-y-5 pt-2">
            {REGLES.map((r) => (
              <div key={r.t} className="border-t border-[var(--encre)] pt-4">
                <dt className="text-[22px] font-medium">{r.t}</dt>
                <dd className="mt-1 leading-relaxed text-[var(--doux)]">{r.d}</dd>
              </div>
            ))}
          </dl>
        </div>
        <Commande />
      </div>
      <div className="mt-16 space-y-5">
        <h2 className="text-[36px] font-medium sm:text-[48px]">Et le port&nbsp;?</h2>
        <Port />
        <p className="text-[13px] text-[var(--doux)]">Tarifs d&apos;envoi d&apos;exemple : 3,50 € sous 35 € de livres neufs, 1 € au-delà. La librairie est fictive.</p>
      </div>
    </div>
  );
}
