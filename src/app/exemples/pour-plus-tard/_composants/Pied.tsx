import Link from "next/link";
import MotGeant from "../../_kit/MotGeant";
import { Marque } from "./Blocs";
import { DOSSIER, NAVIGATION, studio } from "./donnees";

/** Le pied du site : le studio, la formule, ses pages, et le nom en lettres géantes. */
export default function Pied() {
  return (
    <footer className="overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 pb-10 pt-20 sm:px-10 md:grid-cols-3">
        <div className="space-y-4">
          <Marque />
          <p className="leading-relaxed">
            {studio.metier}
            <br />
            {studio.zone}
          </p>
        </div>
        <div className="space-y-3">
          <p className="text-[12px] font-semibold uppercase tracking-[0.22em]">Une seule formule</p>
          <p className="leading-relaxed">Une séance d&apos;une heure, et une boîte de vingt tirages livrée chez toi. 390 € TTC (exemple).</p>
          <p className="tabular-nums">{studio.telephone}</p>
        </div>
        <ul className="space-y-2">
          {[...NAVIGATION, { href: `${DOSSIER}/reserver`, libelle: "Réserver" }, { href: `${DOSSIER}/mentions-legales`, libelle: "Mentions légales et crédits" }].map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="underline-offset-4 hover:underline">{l.libelle}</Link>
            </li>
          ))}
        </ul>
      </div>
      <MotGeant texte="Pour Plus Tard" chasse={1.95} className="px-4 pb-3 font-[family-name:var(--titres)] italic text-[#C9A27E]" />
    </footer>
  );
}
