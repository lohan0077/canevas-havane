"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          website: data.get("website"), // champ piège : vide chez un vrai visiteur
        }),
      });
      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        setErrorMessage(payload?.error ?? "L'envoi a échoué. Réessayez dans un instant.");
        setStatus("error");
        return;
      }
      form.reset();
      setStatus("success");
    } catch {
      setErrorMessage("Connexion impossible. Vérifiez votre réseau et réessayez.");
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center w-full" style={{ paddingTop: '200px', paddingBottom: '0px' }}>
      <div className="max-w-4xl w-full mx-auto px-6 flex flex-col items-center">
        {/* Header Section */}
        <div className="text-center space-y-8 md:space-y-12 mb-12 md:mb-24">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-[var(--color-foreground)]/5 bg-white/40 backdrop-blur-md">
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] animate-pulse shadow-[0_0_15px_var(--color-primary)]"></div>
            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] md:tracking-[0.5em] text-[var(--color-foreground)]/70 italic">Commençons l'ascension</span>
          </div>

          <h1 className="text-5xl md:text-9xl font-black uppercase leading-[0.8] tracking-tighter">
            <span className="block opacity-60">VOTRE</span>
            <span className="text-gradient block italic">HÉRITAGE.</span>
          </h1>

          <p className="max-w-xl mx-auto text-lg md:text-xl text-[var(--color-foreground)]/70 font-light leading-relaxed px-4">
            Chaque projet d'exception commence par une conversation. <br className="hidden md:block" />
            Décrivez votre vision, nous construirons votre impact.
          </p>
        </div>

        {/* Focused Form Section */}
        <div className="w-full glass-card p-8 md:p-24 space-y-12 md:space-y-20 relative overflow-hidden flex flex-col items-center rounded-[2rem] md:rounded-[3rem]">
          {/* Decorative Background Text */}
          <div className="absolute top-0 right-0 opacity-[0.02] select-none pointer-events-none translate-x-1/4 -translate-y-1/4">
             <span className="text-[40vw] md:text-[25vw] font-black uppercase tracking-tighter italic whitespace-nowrap">CONTACT</span>
          </div>

          <div className="relative z-10 space-y-3 md:space-y-4 text-center w-full">
            <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-[var(--color-secondary)]">Détails du Projet</h3>
            <p className="text-[var(--color-foreground)]/70 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] italic leading-loose">
              Informations confidentielles & privilégiées
            </p>
          </div>

          <form onSubmit={handleSubmit} className="relative z-10 space-y-12 md:space-y-16 max-w-2xl mx-auto w-full flex flex-col items-center">
            {/*
              Champ piège anti-robot. Un visiteur ne le voit jamais et un lecteur d'écran
              l'ignore (`aria-hidden` + `tabIndex={-1}`) ; la plupart des robots, eux,
              remplissent tout ce qui ressemble à un champ. S'il arrive rempli, le serveur
              jette le message en répondant quand même « envoyé ».
              `display: none` est évité volontairement : certains robots savent le repérer.
            */}
            <div
              className="absolute h-px w-px overflow-hidden border-0 p-0 whitespace-nowrap"
              style={{ clip: "rect(0 0 0 0)", clipPath: "inset(50%)", margin: "-1px" }}
              aria-hidden="true"
            >
              <label htmlFor="website">Ne pas remplir ce champ</label>
              <input
                type="text"
                id="website"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                defaultValue=""
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 w-full">
              <div className="space-y-3 md:space-y-4 group text-center flex flex-col items-center">
                <label className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-[var(--color-secondary)] group-focus-within:text-[var(--color-primary-texte)] transition-colors">Nom complet</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Jean-Sébastien Bach"
                  className="w-full bg-transparent border-b-2 border-[var(--color-foreground)]/10 py-3 md:py-4 focus:outline-none focus:border-[var(--color-primary)] transition-all duration-700 font-light text-xl md:text-2xl placeholder:text-[var(--color-foreground)]/70 text-center"
                />
              </div>
              <div className="space-y-3 md:space-y-4 group text-center flex flex-col items-center">
                <label className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-[var(--color-secondary)] group-focus-within:text-[var(--color-primary-texte)] transition-colors">Email de Prestige</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="jsb@canevas-havane.com"
                  className="w-full bg-transparent border-b-2 border-[var(--color-foreground)]/10 py-3 md:py-4 focus:outline-none focus:border-[var(--color-primary)] transition-all duration-700 font-light text-xl md:text-2xl placeholder:text-[var(--color-foreground)]/70 text-center"
                />
              </div>
            </div>

            <div className="space-y-3 md:space-y-4 group text-center flex flex-col items-center w-full">
              <label className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-[var(--color-secondary)] group-focus-within:text-[var(--color-primary-texte)] transition-colors">Votre Projet (Message)</label>
              <textarea
                rows={4}
                name="message"
                required
                placeholder="Décrivez l'impact que vous souhaitez créer..."
                className="w-full bg-transparent border-b-2 border-[var(--color-foreground)]/10 py-3 md:py-4 focus:outline-none focus:border-[var(--color-primary)] transition-all duration-700 font-light text-xl md:text-2xl placeholder:text-[var(--color-foreground)]/70 resize-none text-center"
              />
            </div>

            <div className="pt-8 md:pt-12 text-center flex flex-col items-center w-full">
              {status === "success" && (
                <p className="mb-8 text-sm font-medium tracking-wide text-[var(--color-primary-texte)]" role="status">
                  Message envoyé. Nous revenons vers vous sous 24h ouvrées.
                </p>
              )}
              {status === "error" && (
                <p className="mb-8 text-sm font-medium tracking-wide text-red-600" role="alert">
                  {errorMessage}
                </p>
              )}
              <button
                type="submit"
                disabled={status === "sending"}
                className="btn-premium !px-12 md:!px-24 !py-5 md:!py-7 !text-[10px] md:!text-xs shadow-2xl hover:shadow-[0_40px_100px_-15px_rgba(210,125,96,0.3)] disabled:opacity-50 disabled:cursor-wait"
              >
                {status === "sending" ? "Envoi en cours…" : "Initier le Dialogue"}
              </button>
              <p className="mt-8 md:mt-12 text-[9px] md:text-[10px] text-[var(--color-foreground)]/70 uppercase tracking-[0.4em] md:tracking-[0.5em] font-medium scale-90">
                — Réponse sélective sous 24h ouvrées —
              </p>
              {/* Information au moment de la collecte (art. 13 du RGPD) : le lien du
                  pied de page ne suffit pas, il doit être là où l'on saisit ses données. */}
              <p className="mt-6 max-w-xl text-xs md:text-sm text-[var(--color-foreground)]/70 font-light leading-relaxed">
                Votre nom, votre adresse email et votre message servent uniquement à
                répondre à votre demande. Ils ne sont ni vendus ni cédés. Vous pouvez
                demander à tout moment leur accès, leur rectification ou leur effacement —{" "}
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

        {/* Global Access Footer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24 text-center w-full mt-12 mb-12 md:mt-24 md:mb-24">
           <div className="space-y-3 md:space-y-6">
              <h4 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-[var(--color-primary-texte)]">Siège</h4>
              <p className="text-xl md:text-2xl font-black uppercase tracking-tight text-[var(--color-foreground)]">Ardèche, Fr.</p>
           </div>
            <div className="space-y-3 md:space-y-6">
               <h4 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-[var(--color-primary-texte)]">Atelier</h4>
               <p className="text-xl md:text-2xl font-black uppercase tracking-tight text-[var(--color-foreground)]">Sur Mesure</p>
            </div>
           <div className="space-y-3 md:space-y-6">
              <h4 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-[var(--color-primary-texte)]">Écrire</h4>
              <a
                href="mailto:gaultlohan@gmail.com"
                className="text-base md:text-lg font-black uppercase tracking-tight text-[var(--color-foreground)] hover:text-[var(--color-primary-texte)] transition-colors break-all"
              >
                gaultlohan@gmail.com
              </a>
           </div>
        </div>
      </div>
    </div>
  );
}
