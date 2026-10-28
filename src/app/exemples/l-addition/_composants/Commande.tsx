"use client";

import { useEffect, useState } from "react";
import { jeudiDeLivraison, tailles } from "./donnees";

/**
 * Le choix de la taille, le vrai stock de chaque taille, la date de livraison (le
 * jeudi, calculé à partir d'aujourd'hui) et le bouton de commande. Rien n'est commandé :
 * la démonstration le dit.
 */
export default function Commande() {
  const [taille, setTaille] = useState("W32");
  const [jeudi, setJeudi] = useState<string | null>(null);
  const [commande, setCommande] = useState(false);
  const choisie = tailles.find((t) => t.taille === taille) ?? tailles[3];

  // La date se calcule chez le visiteur, après le premier affichage : la page est
  // statique, et la date du serveur ne serait pas celle du jour.
  useEffect(() => {
    const id = requestAnimationFrame(() => setJeudi(jeudiDeLivraison(new Date())));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="space-y-5" data-film="commande">
      <fieldset className="space-y-3">
        <legend className="text-sm font-bold uppercase tracking-[0.16em]">Ta taille · longueur 32</legend>
        <div className="grid grid-cols-4 gap-2">
          {tailles.map((t) => (
            <button
              key={t.taille}
              type="button"
              disabled={t.stock === 0 || commande}
              aria-pressed={t.taille === taille}
              onClick={() => setTaille(t.taille)}
              className={`rounded-lg border-2 py-2.5 text-center font-bold tabular-nums ${
                t.stock === 0
                  ? "border-[var(--trait)] text-[var(--doux)] line-through"
                  : t.taille === taille
                    ? "border-[var(--encre)] bg-[var(--encre)] text-[var(--fond)]"
                    : "border-[var(--trait)] bg-[var(--carte)]"
              }`}
            >
              {t.taille}
            </button>
          ))}
        </div>
      </fieldset>
      <p className="flex items-baseline gap-2" data-film="stock">
        <span className="font-[family-name:var(--titres)] text-3xl font-black tabular-nums">{choisie.stock}</span>{" "}
        <span>
          en {choisie.taille} : il en reste, <strong>pour de vrai.</strong>
        </span>
      </p>
      {commande ? (
        <div role="status" className="space-y-1 rounded-xl border-2 border-[var(--accent)] bg-[var(--carte)] p-4">
          <p className="text-lg font-bold">Commandé : livré {jeudi ?? "jeudi"}.</p>
          <p className="text-sm">Jean droit, {choisie.taille} · 120,00 € TTC, envoi compris.</p>
          <p className="text-sm text-[var(--doux)]">Démonstration : rien n&apos;est envoyé, rien n&apos;est payé.</p>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setCommande(true)}
          className="flex w-full items-center justify-between rounded-full bg-[var(--accent)] px-6 py-4 text-lg font-bold text-[var(--sur-accent)]"
        >
          <span>Commander · livré jeudi</span>
          <span aria-hidden="true">→</span>
        </button>
      )}
      <p className="text-sm text-[var(--doux)]">
        {jeudi ? `Commandé aujourd'hui, livré ${jeudi}.` : "Livré le jeudi."} Stock d&apos;exemple : sur le vrai site, celui
        de l&apos;entrepôt, mis à jour à chaque vente.
      </p>
    </div>
  );
}
