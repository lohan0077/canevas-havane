"use client";

import { useEffect, useState } from "react";

/** La date du prochain dimanche, calculée chez le visiteur (une vraie date, pas un compte à rebours). */
export default function ProchainDimanche() {
  const [date, setDate] = useState<string | null>(null);
  useEffect(() => {
    const d = new Date();
    const ecart = (7 - d.getDay()) % 7 || (d.getHours() >= 21 ? 7 : 0);
    d.setDate(d.getDate() + ecart);
    // Calcul fait après l'affichage : le serveur ne connaît pas l'heure du visiteur.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDate(d.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" }));
  }, []);
  return <>{date ? `${date}, 21 h` : "dimanche, 21 h"}</>;
}
