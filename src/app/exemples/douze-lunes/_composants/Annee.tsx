"use client";

import { createContext, useContext, useState } from "react";
import Link from "next/link";
import { DOSSIER, PROTOCOLES, type Espece } from "./donnees";

/* ---------- Le calcul : de la date de naissance aux rendez-vous ---------- */

const JOUR = 86_400_000;

/** « 12/09/2026 » → une date à midi (à l'abri des changements d'heure), ou null. */
function lireDate(texte: string) {
  const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(texte);
  if (!m) return null;
  const [j, mo, a] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const d = new Date(a, mo - 1, j, 12);
  return d.getFullYear() === a && d.getMonth() === mo - 1 && d.getDate() === j ? d : null;
}

/** Le cabinet est fermé le dimanche : un rendez-vous qui y tombe passe au lundi. */
function horsDimanche(d: Date) {
  return d.getDay() === 0 ? new Date(d.getTime() + JOUR) : d;
}

function ajouter(naissance: Date, e: { jours?: number; mois?: number }) {
  if (e.mois) return new Date(naissance.getFullYear(), naissance.getMonth() + e.mois, naissance.getDate(), 12);
  return new Date(naissance.getTime() + (e.jours ?? 0) * JOUR);
}

const formatJour = (d: Date) => d.toLocaleDateString("fr-FR", { weekday: "short", day: "numeric", month: "short" });
const formatLong = (d: Date) => d.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });

/** Les chiffres seulement, et les barres posées en tapant : « 12092026 » → « 12/09/2026 ». */
function masque(brut: string) {
  const c = brut.replace(/\D/g, "").slice(0, 8);
  return [c.slice(0, 2), c.slice(2, 4), c.slice(4, 8)].filter(Boolean).join("/");
}

type Visite = { date: Date; titre: string; detail: string; passee: boolean };
type Resultat = { espece: Espece; naissance: Date; visites: Visite[] };

type Etat = {
  espece: Espece;
  setEspece: (e: Espece) => void;
  saisie: string;
  setSaisie: (s: string) => void;
  erreur: string | null;
  resultat: Resultat | null;
  calculer: () => void;
};

const AnneeContexte = createContext<Etat | null>(null);
const useAnnee = () => {
  const c = useContext(AnneeContexte);
  if (!c) throw new Error("Le formulaire de l'année doit être dans <Annee>");
  return c;
};

/** Tient l'état partagé entre le champ (dans l'ouverture) et le calendrier (plus bas). */
export default function Annee({ children }: { children: React.ReactNode }) {
  const [espece, setEspece] = useState<Espece>("chaton");
  const [saisie, setSaisieBrute] = useState("");
  const [erreur, setErreur] = useState<string | null>(null);
  const [resultat, setResultat] = useState<Resultat | null>(null);

  const calculer = () => {
    const naissance = lireDate(saisie);
    const maintenant = new Date();
    if (!naissance) return setErreur("Indiquez sa date de naissance, sous la forme jj/mm/aaaa.");
    if (naissance.getTime() > maintenant.getTime()) return setErreur("Cette date est à venir : indiquez le jour où il est né.");
    if (maintenant.getTime() - naissance.getTime() > 365 * JOUR) {
      return setErreur("Il a déjà plus d'un an : sa première année est derrière lui. Un bilan annuel suffit, appelez-nous.");
    }
    setErreur(null);
    const visites = PROTOCOLES[espece].map((e) => {
      const date = horsDimanche(ajouter(naissance, e));
      return { date, titre: e.titre, detail: e.detail, passee: date.getTime() < maintenant.getTime() - JOUR / 2 };
    });
    setResultat({ espece, naissance, visites });
    // Le calendrier est juste sous l'ouverture : on y descend.
    requestAnimationFrame(() => document.getElementById("annee")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  return (
    <AnneeContexte.Provider
      value={{
        espece,
        setEspece,
        saisie,
        setSaisie: (s) => setSaisieBrute(masque(s)),
        erreur,
        resultat,
        calculer,
      }}
    >
      {children}
    </AnneeContexte.Provider>
  );
}

/* ---------- Le champ : un seul, sa date de naissance ---------- */

export function ChampNaissance({ titreNiveau = 1 }: { titreNiveau?: 1 | 2 }) {
  const { espece, setEspece, saisie, setSaisie, erreur, calculer } = useAnnee();
  const Titre = titreNiveau === 1 ? "h1" : "h2";
  return (
    <form
      data-film="champ"
      onSubmit={(e) => {
        e.preventDefault();
        calculer();
      }}
      className="space-y-5"
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--accent-texte)]">
          {espece === "chaton" ? "Votre chaton" : "Votre chiot"}
        </p>
        <div role="radiogroup" aria-label="Votre animal" className="flex rounded-full border border-[var(--trait)] p-1 text-sm font-bold">
          {(["chaton", "chiot"] as const).map((e) => (
            <button
              key={e}
              type="button"
              role="radio"
              aria-checked={espece === e}
              onClick={() => setEspece(e)}
              className={`rounded-full px-3.5 py-1.5 capitalize transition-colors ${espece === e ? "bg-[var(--encre)] text-[var(--fond)]" : ""}`}
            >
              {e}
            </button>
          ))}
        </div>
      </div>
      <Titre className="text-[44px] sm:text-6xl">
        Il est né <em className="text-[var(--accent-texte)]">quand&nbsp;?</em>
      </Titre>
      <label className="block space-y-2">
        <span className="text-[15px] font-semibold">Date de naissance</span>
        <input
          id="naissance"
          name="naissance"
          inputMode="numeric"
          autoComplete="off"
          placeholder="jj/mm/aaaa"
          value={saisie}
          onChange={(e) => setSaisie(e.target.value)}
          aria-invalid={erreur ? true : undefined}
          aria-describedby={erreur ? "naissance-erreur" : undefined}
          className="w-full rounded-2xl border-2 border-[var(--trait)] bg-[var(--fond)] px-5 py-4 text-2xl font-semibold tracking-[0.06em] tabular-nums placeholder:text-[var(--doux)] focus:border-[var(--accent)] focus:outline-none"
        />
      </label>
      {erreur && (
        <p id="naissance-erreur" role="alert" className="text-[15px] font-semibold text-[var(--accent-texte)]">
          {erreur}
        </p>
      )}
      <button type="submit" className="w-full rounded-full bg-[var(--encre)] px-6 py-4 text-lg font-bold text-[var(--fond)]">
        Voir son année
      </button>
    </form>
  );
}

/* ---------- Le calendrier : chaque visite, sa date, réservable d'un geste ---------- */

export function Calendrier() {
  const { resultat } = useAnnee();
  const [nom, setNom] = useState("");
  const [reserves, setReserves] = useState<number[]>([]);

  if (!resultat) {
    return (
      <div className="rounded-[28px] border-2 border-dashed border-[var(--trait)] p-8 text-center space-y-3">
        <p className="font-[family-name:var(--titres)] text-3xl">Son année s&apos;affichera ici.</p>
        <p className="text-[var(--doux)]">
          Indiquez sa date de naissance{" "}
          <a href="#naissance" className="font-semibold text-[var(--encre)] underline underline-offset-4">dans le champ</a>
          {" "}: les cinq rendez-vous de sa première année se posent tout seuls.
        </p>
      </div>
    );
  }

  const { naissance, visites, espece } = resultat;
  const debut = naissance.getTime();
  const fin = visites[visites.length - 1].date.getTime();
  const position = (d: Date) => ((d.getTime() - debut) / (fin - debut)) * 100;

  return (
    <div data-film="calendrier" className="rounded-[28px] bg-[var(--carte)] border border-[var(--trait)] overflow-hidden">
      <div className="p-6 sm:p-8 space-y-5 border-b border-[var(--trait)]">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 className="text-3xl sm:text-4xl">L&apos;année de {nom.trim() || (espece === "chaton" ? "votre chaton" : "votre chiot")}</h3>
          <p className="text-[var(--doux)]">né le {formatLong(naissance)}</p>
        </div>
        <label className="flex items-center gap-3 text-[15px]">
          <span className="shrink-0 font-semibold">Son prénom</span>
          <input
            value={nom}
            onChange={(e) => setNom(e.target.value.slice(0, 18))}
            placeholder="facultatif"
            className="min-w-0 flex-1 rounded-xl border border-[var(--trait)] bg-[var(--fond)] px-3 py-2 placeholder:text-[var(--doux)]"
          />
        </label>
        {/* Douze lunes : la frise de l'année, mois par mois, et les visites dessus. */}
        <div aria-hidden="true" className="relative pt-2 pb-6">
          <div className="flex justify-between">
            {Array.from({ length: 13 }, (_, k) => (
              <span key={k} className={`h-2.5 w-2.5 rounded-full ${k === 0 ? "bg-[var(--encre)]" : "bg-[var(--trait)]"}`} />
            ))}
          </div>
          {visites.map((v) => (
            <span
              key={v.titre}
              className={`absolute top-0 h-[18px] w-[18px] -translate-x-1/2 rounded-full border-[3px] border-[var(--carte)] ${v.passee ? "bg-[var(--doux)]" : "bg-[var(--accent)]"}`}
              style={{ left: `calc(5px + (100% - 10px) * ${position(v.date) / 100})` }}
            />
          ))}
          <span className="absolute left-0 bottom-0 text-xs text-[var(--doux)]">Naissance</span>
          <span className="absolute right-0 bottom-0 text-xs text-[var(--doux)]">1 an</span>
        </div>
      </div>
      <ol className="divide-y divide-[var(--trait)]">
        {visites.map((v, i) => {
          const pris = reserves.includes(i);
          return (
            <li key={v.titre} className="grid grid-cols-[66px_1fr] gap-x-4 px-6 py-5 sm:grid-cols-[80px_1fr_auto] sm:items-center sm:px-8">
              <p className="row-span-2 font-bold leading-tight sm:row-span-1">
                <span className="block text-[13px] uppercase tracking-[0.08em] text-[var(--doux)]">{formatJour(v.date).split(" ")[0]}</span>
                <span className="block text-lg">{formatJour(v.date).split(" ").slice(1).join(" ")}</span>
              </p>
              <div className="min-w-0">
                <p className="text-lg font-bold leading-snug">{v.titre}</p>
                <p className="text-[15px] leading-snug text-[var(--doux)]">{v.detail}</p>
              </div>
              <div className="pt-3 sm:pt-0">
                {v.passee ? (
                  <span className="text-sm font-semibold text-[var(--doux)]">Date passée</span>
                ) : (
                  <button
                    type="button"
                    data-film={`reserver-${i}`}
                    onClick={() => setReserves((r) => (pris ? r.filter((x) => x !== i) : [...r, i]))}
                    aria-pressed={pris}
                    className={`rounded-full px-5 py-2.5 text-[15px] font-bold transition-colors ${pris ? "bg-[var(--encre)] text-[var(--fond)]" : "bg-[var(--accent)] text-[var(--sur-accent)]"}`}
                  >
                    {pris ? "Réservé ✓" : "Réserver"}
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ol>
      <div className="space-y-2 bg-[var(--fond)] px-6 py-5 sm:px-8 text-sm text-[var(--doux)]" role="status">
        {reserves.length > 0 ? (
          <p className="font-semibold text-[var(--encre)]">
            {reserves.length === 1 ? "Une visite réservée" : `${reserves.length} visites réservées`} : le cabinet vous rappelle pour l&apos;heure.
            {" "}Démonstration : rien n&apos;est envoyé, rien n&apos;est enregistré.
          </p>
        ) : null}
        <p>
          Exemple · le calendrier suit le protocole du cabinet, ajusté à chaque animal dès la première visite.
          {visites.some((v) => v.passee) ? " Une visite passée se rattrape : appelez-nous." : ""}{" "}
          <Link href={`${DOSSIER}/tarifs`} className="font-semibold text-[var(--encre)] underline underline-offset-4">Le prix de chaque visite</Link>
        </p>
      </div>
    </div>
  );
}
