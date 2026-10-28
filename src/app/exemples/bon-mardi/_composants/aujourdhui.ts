"use client";

import { useSyncExternalStore } from "react";

const sAbonner = () => () => {};
const lireAujourdhui = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};
/** La date du jour chez le visiteur ; `null` pendant le rendu serveur. */
export function useAujourdhui(): string | null {
  return useSyncExternalStore(sAbonner, lireAujourdhui, () => null);
}
