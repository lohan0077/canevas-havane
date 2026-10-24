import Link from "next/link";
import { Marque } from "./Blocs";
import { DOSSIER, NAVIGATION, entreprise } from "./donnees";

/** Le pied du site : la promesse, les pages, le téléphone. */
export default function Pied() {
  const liens = [
    { href: DOSSIER, libelle: "Accueil" },
    { href: `${DOSSIER}#quoi`, libelle: "Tu veux faire quoi ?" },
    ...NAVIGATION,
    { href: `${DOSSIER}/le-bal`, libelle: "Le bal" },
    { href: `${DOSSIER}/reserver`, libelle: "Réserver ma tente" },
    { href: `${DOSSIER}/dt-dict`, libelle: "DT-DICT : on t'aide" },
  ];
  return (
    <footer className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 pb-16 pt-20 md:grid-cols-[1.3fr_1fr_1fr]">
        <div className="space-y-4">
          <Marque />
          <p className="max-w-xs leading-relaxed">
            Ta salle des fêtes, chez toi. Tentes de réception et engins de jardin, livrés, montés, repris. 12 rue de
            l&apos;Exemple, 00000 Exemple-Ville.
          </p>
        </div>
        <ul className="space-y-2">
          {liens.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="underline-offset-4 hover:underline">{l.libelle}</Link>
            </li>
          ))}
        </ul>
        <div className="space-y-2">
          <p className="text-[12px] font-medium uppercase tracking-[0.2em]">Nous joindre</p>
          <p className="font-[family-name:var(--titres)] text-2xl tabular-nums">{entreprise.telephone}</p>
          <p>Joignable tout le week-end de ta fête</p>
          <Link href={`${DOSSIER}/mentions-legales`} className="inline-block pt-2 underline underline-offset-4">Mentions légales et crédits</Link>
          <p className="text-sm">Prix TTC d&apos;exemple · capacités du fabricant</p>
        </div>
      </div>
    </footer>
  );
}
