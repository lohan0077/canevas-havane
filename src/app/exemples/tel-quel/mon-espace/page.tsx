import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import { Intitule } from "../_composants/Blocs";
import Espace from "../_composants/Espace";

export const metadata: Metadata = {
  title: "Un séjour, en photos — Tel Quel, site de démonstration",
  description:
    "L'espace propriétaire d'une conciergerie imaginaire : pour chaque séjour, deux photos sous le même angle, avant l'arrivée et après le départ, et la liste de remise en place.",
  ...adressesDeLaPage("/exemples/tel-quel/mon-espace"),
};

export default function MonEspace() {
  return (
    <div className="mx-auto max-w-5xl space-y-12 px-4 pt-10 pb-20 sm:px-6 sm:pt-16">
      <div className="space-y-5 px-1">
        <Intitule niveau={1} surtitre="Ton espace propriétaire · exemple" titre={<>Chaque séjour, <em className="text-[var(--accent-texte)]">en deux photos.</em></>}>
          <p>
            Le jour du départ, tu reçois ce message. Les photos d&apos;avant et d&apos;après sont ici,
            avec ce qui a été remis en place, séjour par séjour.
          </p>
        </Intitule>
        <p className="max-w-2xl rounded-2xl border border-[var(--trait)] bg-[var(--carte)] p-4 text-[14px] leading-relaxed text-[var(--doux)]">
          Espace d&apos;exemple. Sur un vrai site, il serait réservé au propriétaire, et les photos
          seraient celles de son logement. Les séjours n&apos;y ont qu&apos;un numéro : ni adresse, ni
          date d&apos;absence n&apos;apparaissent sur ce site.
        </p>
      </div>
      <Espace />
    </div>
  );
}
