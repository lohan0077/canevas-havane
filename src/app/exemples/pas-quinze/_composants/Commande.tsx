"use client";

import { useState } from "react";
import Panier from "../../_kit/Panier";
import { CAFES, METHODES, ORDRE_METHODES, type CleCafe } from "./donnees";

/** La commande au sachet : la mouture d'abord, puis les cafés (le panier du kit). */
export default function Commande() {
  const [mouture, setMouture] = useState("grain");
  const libelle = mouture === "grain" ? "en grain" : `moulu pour ${METHODES[mouture as keyof typeof METHODES].pour}`;
  return (
    <div className="space-y-4">
      <label className="block space-y-2">
        <span className="font-semibold">Mouture</span>
        <select value={mouture} onChange={(e) => setMouture(e.target.value)} className="w-full min-h-12 rounded-xl border-2 border-[var(--encre)] bg-[var(--carte)] px-3 text-base">
          <option value="grain">En grain</option>
          {ORDRE_METHODES.map((m) => <option key={m} value={m}>Moulu pour {METHODES[m].pour}</option>)}
        </select>
      </label>
      <Panier
        key={mouture}
        produits={(Object.keys(CAFES) as CleCafe[]).map((c) => ({ nom: CAFES[c].nom, detail: `${CAFES[c].enClair} · 250 g ${libelle}`, prix: CAFES[c].prix250 }))}
        bouton="Commander"
        confirmation={`Commande prête, ${libelle} : à retirer à la brûlerie dès mercredi.`}
        mention="Prix TTC d'exemple. Ingrédient : café torréfié (arabica), rien d'autre ; aucun des quatorze allergènes réglementaires. Paiement au retrait."
      />
    </div>
  );
}
