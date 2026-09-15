"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

// Formule du contrat (article 8) : prix de rachat = 10 × le chiffre d'affaires
// mensuel moyen généré via le site (6 derniers mois), jamais moins que le plancher.
// Rendez-vous : CA = prestations réservées ; Vente : CA = ventes HT ;
// Devis : à défaut de CA mesurable, 50 × la rémunération mensuelle du partenariat.
const MULTIPLICATEUR_RACHAT = 10;
const MULTIPLICATEUR_RACHAT_DEVIS = 50;
const PLANCHER_RACHAT = 1500;

const euros = (n: number) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

type Modele = "rendez-vous" | "vente" | "devis";

const parametres: Record<
  Modele,
  {
    onglet: string;
    volume: { label: string; max: number; step: number; defaut: number; unite: string };
    taux: { label: string; min: number; max: number; step: number; defaut: number; unite: string };
  }
> = {
  "rendez-vous": {
    onglet: "Rendez-vous",
    volume: {
      label: "Rendez-vous pris via votre site, par mois",
      max: 200,
      step: 5,
      defaut: 40,
      unite: "rendez-vous",
    },
    taux: { label: "Montant par rendez-vous", min: 1, max: 30, step: 1, defaut: 5, unite: "€" },
  },
  vente: {
    onglet: "Vente en ligne",
    volume: {
      label: "Ventes réalisées via votre site, par mois",
      max: 20000,
      step: 100,
      defaut: 2000,
      unite: "€",
    },
    taux: { label: "Pourcentage des ventes", min: 1, max: 25, step: 1, defaut: 10, unite: "%" },
  },
  devis: {
    onglet: "Demandes de devis",
    volume: {
      label: "Demandes de devis qualifiées reçues, par mois",
      max: 100,
      step: 1,
      defaut: 10,
      unite: "demandes",
    },
    taux: { label: "Montant par demande", min: 5, max: 100, step: 5, defaut: 10, unite: "€" },
  },
};

export default function SimulateurRachat() {
  const [modele, setModele] = useState<Modele>("rendez-vous");
  const [statut, setStatut] = useState<"repos" | "envoi" | "envoye" | "erreur">("repos");
  const [messageErreur, setMessageErreur] = useState("");
  const [volumes, setVolumes] = useState<Record<Modele, number>>({
    "rendez-vous": parametres["rendez-vous"].volume.defaut,
    vente: parametres.vente.volume.defaut,
    devis: parametres.devis.volume.defaut,
  });
  const [tauxChoisis, setTauxChoisis] = useState<Record<Modele, number>>({
    "rendez-vous": parametres["rendez-vous"].taux.defaut,
    vente: parametres.vente.taux.defaut,
    devis: parametres.devis.taux.defaut,
  });

  // Prix moyen d'une prestation réservée — sert uniquement au modèle Rendez-vous,
  // dont le chiffre d'affaires ne se déduit pas du montant facturé par rendez-vous.
  const [prixPrestation, setPrixPrestation] = useState(50);

  const p = parametres[modele];
  const volume = volumes[modele];
  const taux = tauxChoisis[modele];

  const mensuel = modele === "vente" ? (volume * taux) / 100 : volume * taux;
  const rachatBrut =
    modele === "vente"
      ? volume * MULTIPLICATEUR_RACHAT
      : modele === "devis"
        ? mensuel * MULTIPLICATEUR_RACHAT_DEVIS
        : volume * prixPrestation * MULTIPLICATEUR_RACHAT;
  const rachat = Math.max(rachatBrut, PLANCHER_RACHAT);

  async function envoyerProposition(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const donnees = new FormData(form);
    setStatut("envoi");
    setMessageErreur("");

    const complement = String(donnees.get("message") ?? "").trim();
    const recapitulatif = [
      "Proposition envoyée depuis le simulateur :",
      `— Modèle : ${p.onglet}`,
      `— ${p.volume.label} : ${volume} ${p.volume.unite}`,
      `— ${p.taux.label} : ${taux} ${p.taux.unite}`,
      ...(modele === "rendez-vous" ? [`— Prix moyen d'une prestation réservée : ${euros(prixPrestation)}`] : []),
      `— Partenariat par mois (estimation) : ${euros(mensuel)}`,
      `— Prix de rachat (estimation) : ${euros(rachat)}`,
      ...(complement ? ["", `Message : ${complement}`] : []),
    ].join("\n");

    try {
      const reponse = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: donnees.get("name"),
          email: donnees.get("email"),
          message: recapitulatif,
          website: donnees.get("website"), // champ piège : vide chez un vrai visiteur
        }),
      });
      if (!reponse.ok) {
        const contenu = await reponse.json().catch(() => null);
        setMessageErreur(contenu?.error ?? "L'envoi a échoué. Réessayez dans un instant.");
        setStatut("erreur");
        return;
      }
      form.reset();
      setStatut("envoye");
    } catch {
      setMessageErreur("Connexion impossible. Vérifiez votre réseau et réessayez.");
      setStatut("erreur");
    }
  }

  return (
    <div className="glass-card rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 space-y-12">
      <div className="space-y-4 text-center">
        <h3 className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] text-[var(--color-primary-texte)]">
          Simulateur
        </h3>
        <p className="text-xl md:text-2xl font-light text-[var(--color-foreground)]/70 font-serif">
          Choisissez votre modèle, ajustez, lisez.
        </p>
      </div>

      {/* Choix du type de site */}
      <div className="flex flex-wrap justify-center gap-3" role="group" aria-label="Type de site">
        {(Object.keys(parametres) as Modele[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setModele(m)}
            aria-pressed={modele === m}
            className={`px-5 py-2.5 rounded-full text-[10px] md:text-[11px] font-black uppercase tracking-[0.25em] transition-all duration-500 border ${
              modele === m
                ? "bg-secondary text-white border-transparent"
                : "border-[var(--color-foreground)]/10 text-[var(--color-foreground)]/70 hover:border-[var(--color-foreground)]/30"
            }`}
          >
            {parametres[m].onglet}
          </button>
        ))}
      </div>

      <div className="max-w-xl mx-auto space-y-10">
        {/* Volume */}
        <div className="space-y-4">
          <label
            htmlFor="volume"
            className="block text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] text-[var(--color-secondary)] text-center"
          >
            {p.volume.label}
          </label>
          <div className="flex items-center justify-center gap-4">
            <input
              id="volume"
              type="number"
              min={0}
              step={p.volume.step}
              value={volume}
              onChange={(e) =>
                setVolumes({ ...volumes, [modele]: Math.max(0, Number(e.target.value) || 0) })
              }
              className="w-40 bg-transparent border-b-2 border-[var(--color-foreground)]/10 py-2 focus:outline-none focus:border-[var(--color-primary)] transition-all duration-700 font-light text-2xl md:text-4xl text-center"
            />
            <span className="text-lg md:text-xl font-light text-[var(--color-foreground)]/70">
              {p.volume.unite}
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={p.volume.max}
            step={p.volume.step}
            value={Math.min(volume, p.volume.max)}
            onChange={(e) => setVolumes({ ...volumes, [modele]: Number(e.target.value) })}
            aria-label={p.volume.label}
            className="w-full accent-[var(--color-primary)] cursor-pointer"
          />
        </div>

        {/* Taux ou montant, au choix */}
        <div className="space-y-4">
          <label
            htmlFor="taux"
            className="block text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] text-[var(--color-secondary)] text-center"
          >
            {p.taux.label}
          </label>
          <div className="flex items-center justify-center gap-4">
            <input
              id="taux"
              type="number"
              min={p.taux.min}
              max={p.taux.max}
              step={p.taux.step}
              value={taux}
              onChange={(e) =>
                setTauxChoisis({
                  ...tauxChoisis,
                  [modele]: Math.min(p.taux.max, Math.max(p.taux.min, Number(e.target.value) || p.taux.min)),
                })
              }
              className="w-28 bg-transparent border-b-2 border-[var(--color-foreground)]/10 py-2 focus:outline-none focus:border-[var(--color-primary)] transition-all duration-700 font-light text-2xl md:text-4xl text-center"
            />
            <span className="text-lg md:text-xl font-light text-[var(--color-foreground)]/70">
              {p.taux.unite}
            </span>
          </div>
          <input
            type="range"
            min={p.taux.min}
            max={p.taux.max}
            step={p.taux.step}
            value={taux}
            onChange={(e) => setTauxChoisis({ ...tauxChoisis, [modele]: Number(e.target.value) })}
            aria-label={p.taux.label}
            className="w-full accent-[var(--color-primary)] cursor-pointer"
          />
        </div>

        {/* Le prix de rachat du modèle Rendez-vous dépend des prestations réservées,
            pas du montant facturé par rendez-vous : on le demande. */}
        {modele === "rendez-vous" && (
          <div className="space-y-4">
            <label
              htmlFor="prix-prestation"
              className="block text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] text-[var(--color-secondary)] text-center"
            >
              Prix moyen d&apos;une prestation réservée
            </label>
            <div className="flex items-center justify-center gap-4">
              <input
                id="prix-prestation"
                type="number"
                min={10}
                max={300}
                step={5}
                value={prixPrestation}
                onChange={(e) =>
                  setPrixPrestation(Math.min(300, Math.max(10, Number(e.target.value) || 10)))
                }
                className="w-28 bg-transparent border-b-2 border-[var(--color-foreground)]/10 py-2 focus:outline-none focus:border-[var(--color-primary)] transition-all duration-700 font-light text-2xl md:text-4xl text-center"
              />
              <span className="text-lg md:text-xl font-light text-[var(--color-foreground)]/70">€</span>
            </div>
            <input
              type="range"
              min={10}
              max={300}
              step={5}
              value={prixPrestation}
              onChange={(e) => setPrixPrestation(Number(e.target.value))}
              aria-label="Prix moyen d'une prestation réservée"
              className="w-full accent-[var(--color-primary)] cursor-pointer"
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 pt-8 border-t border-[var(--color-foreground)]/5">
        <div className="space-y-3 text-center">
          <span className="block text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-[var(--color-foreground)]/70">
            Partenariat par mois
          </span>
          <p className="text-2xl md:text-4xl font-medium font-serif text-[var(--color-foreground)]">
            {euros(mensuel)}
          </p>
          <span className="block text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-[var(--color-foreground)]/70 italic">
            uniquement sur l&apos;activité passée via votre site
          </span>
        </div>

        <div className="space-y-3 text-center">
          <span className="block text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-[var(--color-primary-texte)]">
            Prix de rachat
          </span>
          <p className="text-2xl md:text-4xl font-medium font-serif text-[var(--color-primary-texte)]">
            {euros(rachat)}
          </p>
          <span className="block text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-[var(--color-foreground)]/70 italic">
            pour devenir propriétaire à 100 %
          </span>
        </div>
      </div>

      <p className="text-[10px] md:text-[11px] text-center text-[var(--color-foreground)]/70 uppercase tracking-[0.25em] leading-loose">
        Estimation indicative — montants et taux réels fixés au devis. <br />
        Rachat : dix fois le chiffre d&apos;affaires mensuel généré via votre site
        (moyenne sur six mois), plancher 1 500 € HT, sauf accord différent au devis.
      </p>

      {/* Envoi de la proposition */}
      <form
        onSubmit={envoyerProposition}
        className="relative max-w-xl mx-auto space-y-8 pt-10 border-t border-[var(--color-foreground)]/5"
      >
        <div className="space-y-3 text-center">
          <h4 className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] text-[var(--color-primary-texte)]">
            Envoyer cette proposition
          </h4>
          <p className="text-base md:text-lg text-[var(--color-foreground)]/70 font-light leading-relaxed">
            Vos réglages partent avec le message : nous revenons vers vous avec une réponse
            construite sur ces chiffres.
          </p>
        </div>

        {/*
          Champ piège anti-robot, identique au formulaire de contact. Un visiteur ne le
          voit jamais, un lecteur d'écran l'ignore ; un robot qui le remplit voit son
          message jeté côté serveur, qui répond quand même « envoyé ».
        */}
        <div
          className="absolute h-px w-px overflow-hidden border-0 p-0 whitespace-nowrap"
          style={{ clip: "rect(0 0 0 0)", clipPath: "inset(50%)", margin: "-1px" }}
          aria-hidden="true"
        >
          <label htmlFor="simulateur-website">Ne pas remplir ce champ</label>
          <input
            type="text"
            id="simulateur-website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            defaultValue=""
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3 group text-center">
            <label
              htmlFor="simulateur-nom"
              className="block text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] text-[var(--color-secondary)] group-focus-within:text-[var(--color-primary-texte)] transition-colors"
            >
              Votre nom
            </label>
            <input
              type="text"
              id="simulateur-nom"
              name="name"
              required
              maxLength={200}
              placeholder="Jean-Sébastien Bach"
              className="w-full bg-transparent border-b-2 border-[var(--color-foreground)]/10 py-3 focus:outline-none focus:border-[var(--color-primary)] transition-all duration-700 font-light text-lg md:text-xl placeholder:text-[var(--color-foreground)]/70 text-center"
            />
          </div>
          <div className="space-y-3 group text-center">
            <label
              htmlFor="simulateur-email"
              className="block text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] text-[var(--color-secondary)] group-focus-within:text-[var(--color-primary-texte)] transition-colors"
            >
              Votre email
            </label>
            <input
              type="email"
              id="simulateur-email"
              name="email"
              required
              maxLength={200}
              placeholder="jsb@canevas-havane.com"
              className="w-full bg-transparent border-b-2 border-[var(--color-foreground)]/10 py-3 focus:outline-none focus:border-[var(--color-primary)] transition-all duration-700 font-light text-lg md:text-xl placeholder:text-[var(--color-foreground)]/70 text-center"
            />
          </div>
        </div>

        <div className="space-y-3 group text-center">
          <label
            htmlFor="simulateur-message"
            className="block text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] text-[var(--color-secondary)] group-focus-within:text-[var(--color-primary-texte)] transition-colors"
          >
            Votre message — facultatif
          </label>
          <textarea
            id="simulateur-message"
            name="message"
            rows={3}
            maxLength={4000}
            placeholder="Votre activité, vos questions, ce que vous attendez du site…"
            className="w-full bg-transparent border-b-2 border-[var(--color-foreground)]/10 py-3 focus:outline-none focus:border-[var(--color-primary)] transition-all duration-700 font-light text-lg md:text-xl placeholder:text-[var(--color-foreground)]/70 resize-none text-center"
          />
        </div>

        <div className="text-center space-y-6">
          {statut === "envoye" && (
            <p className="text-sm font-medium tracking-wide text-[var(--color-primary-texte)]" role="status">
              Proposition envoyée. Nous revenons vers vous sous 24h ouvrées.
            </p>
          )}
          {statut === "erreur" && (
            <p className="text-sm font-medium tracking-wide text-red-600" role="alert">
              {messageErreur}
            </p>
          )}
          <button
            type="submit"
            disabled={statut === "envoi"}
            className="btn-premium !px-10 md:!px-16 !py-4 md:!py-5 !text-[10px] md:!text-xs disabled:opacity-50 disabled:cursor-wait"
          >
            {statut === "envoi" ? "Envoi en cours…" : "Envoyer cette proposition"}
          </button>
          {/* Information au moment de la collecte (art. 13 du RGPD) : elle doit être
              là où l'on saisit ses données, pas seulement au pied de page. */}
          <p className="max-w-md mx-auto text-xs md:text-sm text-[var(--color-foreground)]/70 font-light leading-relaxed">
            Votre nom, votre adresse email et vos réglages servent uniquement à répondre à
            votre demande. Ils ne sont ni vendus ni cédés —{" "}
            <Link
              href="/confidentialite"
              className="text-[var(--color-primary-texte)] underline decoration-1 underline-offset-4 hover:opacity-80 transition-opacity"
            >
              politique de confidentialité
            </Link>
            .
          </p>
        </div>
      </form>
    </div>
  );
}
