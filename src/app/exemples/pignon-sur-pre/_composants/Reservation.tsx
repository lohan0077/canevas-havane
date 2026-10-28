"use client";

import { useState, useSyncExternalStore } from "react";
import { SAMEDIS, TENTES, euros, tente as trouver } from "./donnees";

const majuscule = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);

// L'accueil envoie ici avec « #t-10x15 » : la tente choisie sur la vue du ciel. Le
// fragment est lu comme une source extérieure (rien côté serveur, qui ne le voit pas).
const ecouterFragment = (rappel: () => void) => {
  window.addEventListener("hashchange", rappel);
  return () => window.removeEventListener("hashchange", rappel);
};
const tenteDuFragment = () => {
  const m = window.location.hash.match(/^#t-(.+)$/);
  return m && TENTES.some((x) => x.id === m[1]) ? m[1] : null;
};

/**
 * La réservation : la tente, le samedi, le récapitulatif, et « Réserver ma tente ».
 * Une fois réservée, le site donne le mot pour les voisins, tout prêt. Rien n'est
 * envoyé : la page le dit. Les samedis « pris » sont un exemple.
 */
export default function Reservation() {
  const fragment = useSyncExternalStore(ecouterFragment, tenteDuFragment, () => null);
  const [choisie, setId] = useState<string | null>(null);
  const id = choisie ?? fragment ?? "10x15";
  const [samedi, setSamedi] = useState<string | null>(null);
  const [reservee, setReservee] = useState(false);
  const [copie, setCopie] = useState<"" | "fait" | "impossible">("");
  const t = trouver(id);
  const jour = SAMEDIS.find((s) => s.id === samedi) ?? null;

  const mot = jour
    ? `Bonjour,\n\nLe ${jour.long}, on fait la fête dans le pré, sous une tente. Il y aura du monde et un peu de musique, jusque tard. Si ça vous gêne, sonnez : on en parle volontiers. Et si vous voulez passer boire un café dimanche matin, vous êtes les bienvenus.\n\nVos voisins`
    : "";

  return (
    <div className="space-y-8">
      <fieldset className="space-y-3">
        <legend className="font-[family-name:var(--titres)] text-2xl mb-3">1. La tente</legend>
        <div className="grid gap-2 sm:grid-cols-3">
          {TENTES.map((x) => (
            <label
              key={x.id}
              className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl border px-4 py-3 ${x.id === id ? "border-[var(--encre)] bg-[var(--carte)]" : "border-[var(--trait)]"}`}
            >
              <span>
                <span className="block font-[family-name:var(--titres)] text-[21px]">{x.largeur} × {x.longueur} m</span>
                <span className="block text-[13px] text-[var(--doux)]">{x.invites} invités assis · capacité du fabricant</span>
              </span>
              <input type="radio" name="tente" value={x.id} checked={x.id === id} onChange={() => { setId(x.id); setReservee(false); }} className="h-5 w-5 accent-[var(--accent)]" />
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset id="samedis" className="space-y-3">
        <legend className="font-[family-name:var(--titres)] text-2xl mb-3">2. Le samedi</legend>
        <div className="grid grid-cols-3 gap-2">
          {SAMEDIS.map((x) => (
            <button
              key={x.id}
              type="button"
              data-film={`samedi-${x.id}`}
              disabled={x.pris}
              aria-pressed={x.id === samedi}
              onClick={() => { setSamedi(x.id); setReservee(false); }}
              className={`rounded-xl border py-3 text-center ${x.pris ? "border-[var(--trait)] text-[var(--doux)] cursor-not-allowed" : x.id === samedi ? "border-[var(--encre)] bg-[var(--sombre)] text-[var(--sur-sombre)]" : "border-[var(--encre)] bg-[var(--carte)]"}`}
            >
              <span className="block text-[12px] uppercase tracking-[0.12em]">Samedi</span>
              <span className="block font-[family-name:var(--titres)] text-[22px] leading-tight">{x.court}</span>
              <span className="block text-[12px]">{x.pris ? "Pris" : "Libre"}</span>
            </button>
          ))}
        </div>
        <p className="text-[13px] text-[var(--doux)]">Samedis d&apos;exemple : l&apos;entreprise est fictive.</p>
      </fieldset>

      <div id="recapitulatif" className="rounded-2xl bg-[var(--sombre)] text-[var(--sur-sombre)] p-6 space-y-4 [--doux:#C9D6BC]">
        {jour ? (
          <>
            <p className="text-[13px] uppercase tracking-[0.14em] text-[#F2C98A]">{majuscule(jour.long)}</p>
            <p className="font-[family-name:var(--titres)] text-[30px] leading-tight">Ta tente rentre <em>dans le pré.</em></p>
            <p className="text-[15px]">{t.largeur} × {t.longueur} m · {t.invites} invités assis (capacité du fabricant) · montage la veille</p>
            <p className="font-[family-name:var(--titres)] text-[28px]">{euros(t.prix)} <span className="text-[14px] font-[family-name:var(--texte)]">TTC le week-end · exemple</span></p>
            {reservee ? (
              <div role="status" className="rounded-xl bg-[var(--fond)] text-[var(--encre)] p-4 space-y-1">
                <p className="font-[family-name:var(--titres)] text-[24px]">Tente réservée&nbsp;: {jour.court}.</p>
                <p className="text-[13px] text-[#4F5A45]">Démonstration : rien n&apos;est envoyé, rien n&apos;est enregistré. On viendrait voir le pré trois semaines avant.</p>
              </div>
            ) : (
              <button type="button" onClick={() => setReservee(true)} className="flex h-12 w-full items-center justify-center rounded-full bg-[var(--accent)] text-[15px] font-medium text-[var(--sur-accent)]">
                Réserver ma tente
              </button>
            )}
          </>
        ) : (
          <p className="font-[family-name:var(--titres)] text-[24px] leading-snug">Choisis un samedi libre : le récapitulatif s&apos;affiche ici.</p>
        )}
      </div>

      {reservee && jour && (
        <div id="voisins" className="rounded-2xl border border-[var(--encre)] bg-[var(--carte)] p-6 space-y-4">
          <p className="font-[family-name:var(--titres)] text-[30px] leading-tight">Et maintenant, <em>préviens les voisins.</em></p>
          <p className="text-[15px] text-[var(--doux)]">Le mot est prêt. Change ce que tu veux, puis glisse-le dans leur boîte aux lettres.</p>
          <label className="sr-only" htmlFor="psp-mot">Le mot pour les voisins</label>
          <textarea
            id="psp-mot"
            defaultValue={mot}
            key={mot}
            rows={8}
            className="w-full rounded-xl border border-[var(--trait)] bg-[var(--fond)] p-4 font-[family-name:var(--titres)] text-[17px] leading-relaxed"
          />
          <button
            type="button"
            onClick={async () => {
              const zone = document.getElementById("psp-mot") as HTMLTextAreaElement | null;
              try {
                await navigator.clipboard.writeText(zone?.value ?? mot);
                setCopie("fait");
              } catch {
                zone?.select();
                setCopie("impossible");
              }
            }}
            className="inline-flex h-12 items-center rounded-full border border-[var(--encre)] px-5 font-medium"
          >
            Copier le mot
          </button>
          <p aria-live="polite" className="text-[13px] text-[var(--doux)]">
            {copie === "fait" ? "Copié. Il ne reste qu'à l'imprimer." : copie === "impossible" ? "Le texte est sélectionné : copie-le avec ton téléphone." : ""}
          </p>
        </div>
      )}
    </div>
  );
}
