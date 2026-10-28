"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

// La demande d'appel de /bio passe par la même route que le formulaire de contact
// (/api/contact) : mêmes champs (nom, email, message, champ piège), même validation
// et même limite d'envoi côté serveur. Le métier et le mot du visiteur sont rangés
// dans le message — aucune donnée de plus que ce que /confidentialite annonce.

const CHAMP =
  "mt-2 w-full rounded-xl border border-[var(--color-foreground)]/20 bg-white/70 px-4 py-3 text-base text-[var(--color-foreground)] placeholder:text-[var(--color-foreground)]/70 focus:border-[var(--color-foreground)] focus:outline-none";
const ETIQUETTE = "block text-[15px] font-medium text-[var(--color-foreground)]";

export default function DemandeAppel() {
  const [etat, setEtat] = useState<"repos" | "envoi" | "envoye" | "erreur">("repos");
  const [erreur, setErreur] = useState("");

  async function envoyer(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const mot = String(data.get("mot") ?? "").trim();
    setEtat("envoi");
    setErreur("");

    try {
      const reponse = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: `Demande d'appel de 15 minutes (page /bio).\nMétier : ${String(data.get("metier") ?? "").trim()}\n\n${mot || "—"}`,
          website: data.get("website"), // champ piège : vide chez un vrai visiteur
        }),
      });
      if (!reponse.ok) {
        const contenu = await reponse.json().catch(() => null);
        setErreur(contenu?.error ?? "L'envoi a échoué. Réessayez dans un instant.");
        setEtat("erreur");
        return;
      }
      form.reset();
      setEtat("envoye");
    } catch {
      setErreur("Connexion impossible. Vérifiez votre réseau et réessayez.");
      setEtat("erreur");
    }
  }

  return (
    <form onSubmit={envoyer} className="relative mt-10 space-y-6">
      {/* Champ piège anti-robot, comme sur /contact : invisible et hors du parcours
          clavier ; s'il arrive rempli, le serveur répond « envoyé » sans envoyer. */}
      <div
        className="absolute h-px w-px overflow-hidden border-0 p-0 whitespace-nowrap"
        style={{ clip: "rect(0 0 0 0)", clipPath: "inset(50%)", margin: "-1px" }}
        aria-hidden="true"
      >
        <label htmlFor="bio-website">Ne pas remplir ce champ</label>
        <input type="text" id="bio-website" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <label className={ETIQUETTE}>
          Votre nom
          <input type="text" name="name" required maxLength={200} autoComplete="name" className={CHAMP} />
        </label>
        <label className={ETIQUETTE}>
          Votre email
          <input type="email" name="email" required maxLength={200} autoComplete="email" className={CHAMP} />
        </label>
      </div>
      <label className={ETIQUETTE}>
        Votre métier
        <input type="text" name="metier" required maxLength={200} placeholder="Pisciniste, fleuriste, ostéopathe…" className={CHAMP} />
      </label>
      <label className={ETIQUETTE}>
        Un mot, si vous voulez
        <textarea name="mot" rows={3} maxLength={4000} placeholder="Ce qui vous a parlé dans la vidéo, votre ville…" className={`${CHAMP} resize-none`} />
      </label>

      {etat === "envoye" && (
        <p className="text-[15px] font-medium text-[var(--color-primary-texte)]" role="status">
          C&apos;est noté. Je vous écris sous 24 heures ouvrées avec trois créneaux.
        </p>
      )}
      {etat === "erreur" && (
        <p className="text-[15px] font-medium text-red-700" role="alert">
          {erreur}
        </p>
      )}

      <button
        type="submit"
        disabled={etat === "envoi"}
        className="inline-flex h-12 items-center justify-center rounded-full bg-[var(--color-foreground)] px-7 text-[15px] font-medium text-[var(--color-background)] transition-opacity hover:opacity-90 disabled:cursor-wait disabled:opacity-60"
      >
        {etat === "envoi" ? "Envoi en cours…" : "Demander mon appel"}
      </button>

      {/* Information au moment de la collecte (art. 13 du RGPD), comme sur /contact. */}
      <p className="text-sm leading-relaxed text-[var(--color-foreground)]/80">
        Votre nom, votre adresse email et votre message servent uniquement à répondre à
        votre demande. Ils ne sont ni vendus ni cédés. Vous pouvez demander à tout moment
        leur accès, leur rectification ou leur effacement —{" "}
        <Link href="/confidentialite" className="text-[var(--color-primary-texte)] underline decoration-1 underline-offset-4">
          politique de confidentialité
        </Link>
        .
      </p>
    </form>
  );
}
