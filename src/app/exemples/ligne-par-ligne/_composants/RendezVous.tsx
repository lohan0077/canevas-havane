"use client";

import { useState } from "react";

const SEMAINE = [
  { jour: "Lundi", heures: ["9 h 30", "16 h"] },
  { jour: "Mardi", heures: ["10 h", "14 h 30", "17 h"] },
  { jour: "Mercredi", heures: ["11 h", "18 h"] },
  { jour: "Jeudi", heures: ["9 h", "12 h 30"] },
  { jour: "Vendredi", heures: ["10 h 30", "15 h"] },
];

/**
 * Le rendez-vous se prend en ligne : au cabinet ou en visio, 45 minutes. Jamais chez le
 * client : se rendre à son domicile ou à son travail est un acte de démarchage, même à sa
 * demande (CMF L341-1, al. 2) ; le bouton « Et chez moi ? » l'explique. Créneaux d'exemple,
 * rien n'est envoyé.
 */
export default function RendezVous() {
  const [lieu, setLieu] = useState<"au cabinet" | "en visio">("au cabinet");
  const [chezMoi, setChezMoi] = useState(false);
  const [creneau, setCreneau] = useState<{ jour: string; heure: string } | null>(null);
  const [confirme, setConfirme] = useState(false);

  return (
    <div data-film="rendez-vous" className="space-y-5 rounded-[28px] border border-[var(--trait)] bg-[var(--carte)] p-5 sm:p-7">
      <div className="space-y-2.5">
        <p className="text-[13px] font-semibold text-[var(--doux)]">Où ?</p>
        <div className="flex flex-wrap items-center gap-2">
          {(["au cabinet", "en visio"] as const).map((l) => (
            <button
              key={l}
              type="button"
              data-film={l === "en visio" ? "visio" : "cabinet"}
              aria-pressed={lieu === l}
              onClick={() => {
                setLieu(l);
                setConfirme(false);
              }}
              className={`min-h-11 rounded-full px-5 text-[15px] font-semibold first-letter:uppercase ${
                lieu === l ? "bg-[var(--accent)] text-[var(--sur-accent)]" : "border border-[var(--trait)]"
              }`}
            >
              {l}
            </button>
          ))}
          <button
            type="button"
            data-film="chez-moi"
            aria-expanded={chezMoi}
            aria-controls="lpl-chez-moi"
            onClick={() => setChezMoi((c) => !c)}
            className="min-h-11 px-2 text-[14px] font-semibold underline decoration-dotted underline-offset-4"
          >
            Et chez moi&nbsp;?
          </button>
        </div>
        <p id="lpl-chez-moi" hidden={!chezMoi} className="rounded-[14px] bg-[#F4E9E1] p-3.5 text-[14px] leading-relaxed text-[#6E2F17]">
          Non, même si tu me le demandes : un rendez-vous chez toi ou à ton travail serait du démarchage
          (code monétaire et financier, art. L341-1). Au cabinet, ou en visio.
        </p>
      </div>

      <div className="space-y-2">
        <p className="text-[13px] font-semibold text-[var(--doux)]">Quand ? La semaine prochaine, 45 minutes</p>
        <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
          {SEMAINE.map((j) => (
            <li key={j.jour} className="flex flex-wrap items-center gap-x-3 gap-y-2 py-2.5">
              <span className="w-[5.5rem] text-[15px] font-semibold">{j.jour}</span>
              {j.heures.map((h) => {
                const choisi = creneau?.jour === j.jour && creneau.heure === h;
                return (
                  <button
                    key={h}
                    type="button"
                    data-film={`${j.jour.toLowerCase()}-${h.replace(/\D+/g, "")}`}
                    aria-pressed={choisi}
                    aria-label={`${j.jour} ${h}`}
                    onClick={() => {
                      setCreneau({ jour: j.jour, heure: h });
                      setConfirme(false);
                    }}
                    className={`min-h-10 rounded-full px-3.5 text-[14px] font-semibold tabular-nums ${
                      choisi ? "bg-[var(--encre)] text-[var(--carte)]" : "bg-[var(--fond)] hover:bg-[#E8E5DA]"
                    }`}
                  >
                    {h}
                  </button>
                );
              })}
            </li>
          ))}
        </ul>
      </div>

      {confirme && creneau ? (
        <div role="status" className="space-y-1 rounded-[16px] border-2 border-[var(--accent)] p-4">
          <p className="text-[17px] font-semibold">
            Rendez-vous noté : {creneau.jour.toLowerCase()} {creneau.heure}, {lieu}.
          </p>
          <p className="text-[14px] text-[var(--doux)]">Démonstration : rien n&apos;est envoyé, rien n&apos;est enregistré.</p>
        </div>
      ) : (
        <button
          type="button"
          data-film="reserver"
          disabled={!creneau}
          onClick={() => setConfirme(true)}
          className="w-full rounded-full bg-[var(--accent)] px-6 py-4 text-[16px] font-semibold text-[var(--sur-accent)] disabled:cursor-not-allowed"
        >
          {creneau ? `Réserver ${creneau.jour.toLowerCase()} ${creneau.heure}, ${lieu}` : "Choisis un créneau"}
        </button>
      )}
      <p className="text-[12px] leading-relaxed text-[var(--doux)]">
        Créneaux d&apos;exemple. Personne ne t&apos;appelle pour te proposer un rendez-vous, et rien de ce que tu choisis ici n&apos;est transmis.
      </p>
    </div>
  );
}
