"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { articles } from "./articles";

const categories = [
  { id: "Applications Sur Mesure", label: "App Sur-Mesure", icon: "⚛", desc: "Outils Décisionnels & Dashboards", image: "/edificia-features.webp" },
  { id: "Site Internet", label: "Site Internet", icon: "✦", desc: "Digital Flagships & E-commerce de Luxe", image: "/macbook-hero-final.webp" },
  { id: "SEO", label: "SEO", icon: "◈", desc: "Omniprésence & Autorité", image: "/seo-luxury-new.webp" },
  { id: "Ads", label: "Ads", icon: "✺", desc: "Acquisition & Conversion", image: "/ads-luxury-new.webp" }
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const filteredArticles = activeCategory === "Tous"
    ? articles
    : articles.filter(a => a.category === activeCategory);

  async function handleNewsletterSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const email = new FormData(form).get("email");
    setNewsletterStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Inscription Newsletter",
          email,
          message: `Nouvelle inscription à la newsletter : ${email}`,
        }),
      });
      if (!response.ok) {
        setNewsletterStatus("error");
        return;
      }
      form.reset();
      setNewsletterStatus("success");
    } catch {
      setNewsletterStatus("error");
    }
  }

  return (
    <div className="layout-safe-zone min-h-screen" style={{ paddingBottom: '100px' }}>
      <div className="max-centered-container px-6">
        {/* Editorial Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 md:gap-12 mb-24 md:mb-48">
          <div className="space-y-6 md:space-y-8 max-w-3xl">
             <h4 className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.6em] text-[var(--color-primary)] mb-8 md:mb-12">Le Journal d'Exception</h4>
              <h1 className="heading-display text-left">
                RÉFLEXIONS & <br />
                <span className="opacity-10 italic font-light tracking-[-0.05em] uppercase">VISION.</span>
              </h1>
          </div>
          <div className="space-y-12 text-left lg:text-right w-full lg:w-auto">
            <p className="text-lg md:text-xl text-[var(--color-foreground)]/30 font-light max-w-sm lg:border-r border-[var(--color-foreground)]/10 lg:pr-8 pb-4">
              Une exploration immersive des frontières entre design de prestige et technologie de pointe.
            </p>
          </div>
        </div>

        {activeCategory === "Tous" ? (
          <>
            {/* Featured Bento - Category: Site Internet */}
            <button
              type="button"
              onClick={() => setActiveCategory("Site Internet")}
              className="relative w-full text-left lg:aspect-[21/11] min-h-[600px] md:min-h-[800px] mb-24 md:mb-32 rounded-[3rem] md:rounded-[4rem] overflow-hidden group cursor-pointer glass-card shadow-2xl transition-all duration-700 hover:scale-[1.01] bg-black"
            >
              <div className="absolute inset-0 z-0">
                <Image 
                  src={categories[1].image} 
                  alt={categories[1].label}
                  fill
                  className="object-cover opacity-60 group-hover:opacity-80 transition-all duration-1000 transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
              </div>

              <div className="relative z-20 h-full flex flex-col justify-center p-8 md:p-32 space-y-8 md:space-y-10">
                <div className="space-y-6 md:space-y-10 max-w-2xl">
                  <div className="flex items-center gap-4 md:gap-8">
                      <span className="text-3xl md:text-4xl text-[var(--color-primary)] group-hover:scale-110 transition-transform duration-500">{categories[1].icon}</span>
                      <span className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-white/70 italic">Expériences Web Immersives</span>
                  </div>
                  <h2 className="text-5xl md:text-8xl font-medium uppercase tracking-tight leading-[0.85] text-white font-serif">
                    {categories[1].label}
                  </h2>
                  <p className="text-lg md:text-2xl text-white/80 font-light max-w-xl leading-relaxed">
                    L'art de transformer une présence en ligne en un véritable vaisseau amiral numérique de prestige.
                  </p>
                  <div className="btn-glow-white !px-10 md:!px-16 !py-4 md:!py-6 inline-block mt-4 text-[10px] md:text-base">
                      Explorer les articles <span>→</span>
                  </div>
                </div>
              </div>
            </button>

            {/* Sub-categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-16 mb-32 md:mb-[15rem] section-spacer">
               {[categories[0], ...categories.slice(2)].map((cat, idx) => (
                 <button
                    type="button"
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`block w-full text-left space-y-12 group cursor-pointer ${idx === 1 ? 'lg:translate-y-24' : ''}`}
                 >
                    <div className="aspect-[4/5] glass-card overflow-hidden relative p-8 flex flex-col justify-end bg-[var(--color-foreground)]/[0.03] group-hover:bg-[var(--color-foreground)]/5 transition-all duration-1000 rounded-[2.5rem] md:rounded-[3rem]">
                       <Image 
                          src={cat.image}
                          alt={cat.label}
                          fill
                          className="object-contain opacity-20 group-hover:opacity-40 transition-opacity duration-700 p-8"
                       />
                       <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)]/80 via-transparent to-transparent z-10" />
                       
                       <div className="relative z-20 space-y-3 p-4 md:p-8">
                          <span className="text-3xl md:text-4xl text-[var(--color-primary)] opacity-40 group-hover:opacity-100 transition-opacity duration-700">{cat.icon}</span>
                          <h3 className="text-3xl md:text-4xl font-medium uppercase tracking-tight font-serif group-hover:text-[var(--color-primary)] transition-colors">{cat.label}</h3>
                          <p className="text-base md:text-lg text-[var(--color-foreground)]/50 font-light leading-relaxed line-clamp-2">
                            {cat.desc}
                          </p>
                          <div className="pt-4 flex items-center gap-2 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-[var(--color-primary)] opacity-100 md:opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-0 md:translate-y-4 group-hover:translate-y-0">
                            Explorer le Blog <span>→</span>
                          </div>
                       </div>
                    </div>
                 </button>
               ))}
            </div>
          </>
        ) : (
          /* Header for Filtered View (Keep existing logic or simplify) */
          <div className="mb-32 flex justify-between items-center border-b border-[var(--color-foreground)]/5 pb-12">
             <div className="space-y-4">
                <span className="text-[11px] font-black uppercase tracking-[0.5em] text-[var(--color-primary)] italic">Archive</span>
                <h2 className="text-6xl font-medium uppercase tracking-tight font-serif">{activeCategory}</h2>
             </div>
             <button 
                onClick={() => setActiveCategory("Tous")}
                className="group flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-[var(--color-foreground)]/30 hover:text-[var(--color-foreground)] transition-colors"
             >
                <span className="w-8 h-[1px] bg-current group-hover:w-16 transition-all duration-500"></span>
                Retour au Journal
             </button>
          </div>
        )}

        {/* Articles Grid */}
        {activeCategory === "Tous" && (
          <h2 className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.6em] text-[var(--color-primary)] mb-16 md:mb-24">
            Tous les articles
          </h2>
        )}
        {filteredArticles.length === 0 ? (
          <p className="text-lg text-[var(--color-foreground)]/40 font-light italic mb-32">
            Aucun article dans cette catégorie pour le moment.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-24 lg:gap-32 mb-32 md:mb-[20rem] section-spacer">
             {filteredArticles.map((article, idx) => (
                <Link href={`/blog/${article.slug}`} key={article.slug} className={`block space-y-8 md:space-y-12 group cursor-pointer ${idx === 1 ? 'lg:translate-y-32' : ''}`}>
                  <div className="aspect-[4/5] glass-card overflow-hidden relative flex items-center justify-center bg-[var(--color-foreground)]/[0.03] group-hover:bg-[var(--color-foreground)]/5 transition-all duration-1000 rounded-[2.5rem] md:rounded-[3rem]">
                     <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover opacity-60 group-hover:opacity-90 group-hover:scale-105 transition-all duration-1000"
                     />
                  </div>
                  <div className="space-y-6 md:space-y-8 px-2 md:px-4">
                     <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--color-primary)] italic">{article.category}</span>
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--color-foreground)]/20">{article.date}</span>
                     </div>
                     <h3 className="text-2xl md:text-3xl font-medium uppercase tracking-tight leading-[0.9] group-hover:text-[var(--color-primary)] transition-colors duration-700 font-serif">
                        {article.title}
                     </h3>
                     <p className="text-base md:text-lg text-[var(--color-foreground)]/50 font-light leading-relaxed">
                        {article.excerpt}
                     </p>
                     <div className="pt-6 border-t border-[var(--color-foreground)]/5 flex justify-between items-center group-hover:border-[var(--color-primary)]/20 transition-colors">
                        <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] text-[var(--color-foreground)]/30 group-hover:text-[var(--color-foreground)] transition-colors">Explorer l'article</span>
                        <div className="w-12 h-[1px] bg-[var(--color-foreground)]/10 group-hover:w-24 group-hover:bg-[var(--color-primary)] transition-all duration-700"></div>
                     </div>
                  </div>
               </Link>
             ))}
          </div>
        )}

        {/* Newsletter Editorial */}
        <div className="bg-[#1a1513] rounded-[3rem] md:rounded-[5rem] p-8 md:p-24 text-center space-y-8 overflow-hidden relative shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]" style={{ marginBottom: '0px', marginTop: '48px' }}>
           {/* Decorative elements */}
           <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none italic text-[20vw] lg:text-[10vw] font-medium text-white/5 whitespace-nowrap font-serif">
             Canevas Havane
           </div>
           
           <div className="space-y-4 relative z-10">
              <h4 className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.6em] md:tracking-[0.8em] text-[var(--color-primary)]">Exclusive insights</h4>
              <h2 className="text-3xl md:text-5xl lg:text-[6rem] font-medium uppercase tracking-tight leading-[0.9] md:leading-[0.8] text-white font-serif">
                REJOINDRE LE <br />
                <span className="text-gradient italic font-light">CERCLE.</span>
              </h2>
           </div>
           
           <p className="text-white/30 font-light text-lg md:text-2xl max-w-2xl mx-auto relative z-10 leading-relaxed">
             Nos analyses stratégiques les plus confidentielles, transmises exclusivement par voie numérique privée.
           </p>
           
           <div className="max-w-2xl mx-auto relative z-10 pt-8 md:pt-12">
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-6 md:gap-10 items-end">
                <div className="flex-1 w-full text-left space-y-4">
                  <label className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-white/20 ml-2">Email privilège</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="visionnaire@domaine.com"
                    className="w-full bg-transparent border-b-2 border-white/5 py-4 px-2 md:px-4 text-white focus:outline-none focus:border-[var(--color-primary)] transition-all duration-700 text-xl md:text-3xl font-light italic placeholder:text-white/5"
                  />
                </div>
                <button type="submit" disabled={newsletterStatus === "sending"} className="w-full sm:w-auto btn-glow-white !px-12 md:!px-16 !py-6 md:!py-8 !text-[10px] md:!text-[11px] whitespace-nowrap sm:mb-[2px] disabled:opacity-50 disabled:cursor-wait">
                  {newsletterStatus === "sending" ? "Envoi…" : "S'inscrire"}
                </button>
              </form>
              {newsletterStatus === "success" && (
                <p className="text-[11px] md:text-xs text-[var(--color-primary)] uppercase tracking-[0.3em] mt-8 font-medium" role="status">Bienvenue dans le Cercle. À très vite.</p>
              )}
              {newsletterStatus === "error" && (
                <p className="text-[11px] md:text-xs text-red-400 uppercase tracking-[0.3em] mt-8 font-medium" role="alert">L'inscription a échoué. Réessayez dans un instant.</p>
              )}
              <p className="text-[9px] md:text-[10px] text-white/10 uppercase tracking-[0.4em] md:tracking-[0.5em] mt-12 md:mt-16 italic font-medium px-4">Confidentialité de haut niveau garantie.</p>
           </div>
        </div>
      </div>
    </div>
  );
}
