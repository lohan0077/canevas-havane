"use client";

import { useEffect, useState } from "react";
import { jeudiDeLivraison } from "./donnees";

/** Le jeudi de livraison d'une commande passée aujourd'hui, calculé chez le visiteur. */
export default function Jeudi({ avant = "", apres = "" }: { avant?: string; apres?: string }) {
  const [jeudi, setJeudi] = useState<string | null>(null);
  useEffect(() => {
    const id = requestAnimationFrame(() => setJeudi(jeudiDeLivraison(new Date())));
    return () => cancelAnimationFrame(id);
  }, []);
  return (
    <>
      {avant}
      {jeudi ?? "jeudi"}
      {apres}
    </>
  );
}
