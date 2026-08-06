import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Expertise — Web, SEO & Acquisition",
  description: "Architecture web sur mesure, design d'exception, SEO sémantique et campagnes d'acquisition : les expertises de Canevas Havane au service de votre marque.",
};

const services = [
  {
    category: "Architecture Web",
    title: "SITES DE PRESTIGE",
    description: "Nous ne construisons pas de simples sites web, nous érigeons des palais numériques. Performance extrème, design sur-mesure et expérience utilisateur fluide.",
    items: ["E-commerce de Luxe", "Plateformes Institutionnelles", "Applications Web Progressives", "Expériences Immersives"],
    color: "var(--color-primary)"
  },
  {
    category: "Visibilité & Croissance",
    title: "SEO & DOMINATION",
    description: "L'excellence mérite d'être vue. Nous optimisons votre présence pour que vous soyez la seule option évidente dans votre industrie.",
    items: ["Audit de Positionnement", "Stratégie de Contenu Havane", "Netlinking de Haute Qualité", "Optimisation Sémantique"],
    color: "var(--color-primary)"
  },
  {
    category: "Acquisition Haute Fidélité",
    title: "PUBS & PERFORMANCES",
    description: "Transformez votre audience en une clientèle fidèle par des campagnes publicitaires chirurgicales et esthétiques.",
    items: ["Meta Ads de Prestige", "Google Ads Stratégique", "Funnel de Conversion Haut de Gamme", "Analyse de Données"],
    color: "var(--color-primary)"
  }
];

const expertiseImages = [
  "/macbook-hero-final.webp",
  "/seo-luxury-new.webp",
  "/ads-luxury-new.webp"
];

export default function ExpertisePage() {
  return (
    <div className="layout-safe-zone min-h-screen" style={{ paddingBottom: '100px' }}>
      <div className="max-centered-container px-6">
        {/* Hero Section */}
        <div className="text-center space-y-8 mb-24 md:mb-48">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-[var(--color-foreground)]/5 bg-white/40 backdrop-blur-md">
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] animate-pulse shadow-[0_0_10px_var(--color-primary)]"></div>
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[var(--color-foreground)]/60 italic">Maîtrise & Savoir-faire</span>
          </div>
          
          <h1 className="heading-display">
            <span className="block opacity-30">NOS CHAMPS D'</span>
            <span className="text-gradient block italic font-light">EXPERTISE.</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-[var(--color-foreground)]/60 font-light leading-relaxed px-4">
            L'alliance de la rigueur technique et de l'élégance artistique. <br className="hidden md:block" />
            Explorez nos piliers de création pour votre réussite.
          </p>
        </div>

        {/* Services List */}
        <div className="space-y-24 md:space-y-48 w-full section-spacer">
          {services.map((service, index) => (
            <div 
              key={service.title} 
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 md:gap-16 lg:gap-32 items-center text-left w-full`}
            >
              <div className="flex-1 space-y-8 order-2 lg:order-none">
                <div className="space-y-4 text-center lg:text-left">
                  <h4 className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em]" style={{ color: service.color }}>{service.category}</h4>
                  <h2 className="text-3xl md:text-6xl font-medium uppercase tracking-tight leading-tight md:leading-none text-[var(--color-foreground)] font-serif">
                    {service.title}
                  </h2>
                </div>
                
                <p className="text-lg md:text-xl text-[var(--color-foreground)]/70 font-light leading-relaxed text-center lg:text-left px-4 lg:px-0">
                  {service.description}
                </p>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 pt-4 px-6 lg:px-0">
                  {service.items.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-[10px] md:text-xs font-black uppercase tracking-widest text-[var(--color-foreground)]/40">
                      <span className="w-1 h-1 rounded-full bg-[var(--color-primary)] shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex-1 w-full order-1 lg:order-none">
                <div className="aspect-[4/5] lg:aspect-square glass-card overflow-hidden group relative rounded-3xl md:rounded-[3rem]">
                  <Image
                    src={expertiseImages[index]}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110 opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-background)] to-transparent opacity-40 z-10" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-8xl md:text-[12rem] font-medium text-[var(--color-foreground)]/[0.05] select-none uppercase tracking-tighter z-20 font-serif">
                      {index + 1 < 10 ? `0${index + 1}` : index + 1}
                    </span>
                  </div>
                  {/* Decorative Elements inside card */}
                  <div className="absolute bottom-8 left-8 right-8 top-8 md:bottom-12 md:left-12 md:right-12 md:top-12 border border-white/10 rounded-2xl md:rounded-[2rem] group-hover:scale-105 transition-transform duration-700 ease-out z-30" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="glass-card p-10 md:p-24 text-center space-y-10 md:space-y-12 w-full rounded-[3rem] md:rounded-[4rem]" style={{ marginBottom: '0px', marginTop: '64px md:100px' }}>
          <h2 className="text-3xl md:text-5xl font-medium uppercase tracking-tight leading-[1.1] md:leading-none text-white font-serif px-4">
            Prêt à définir de <br />
            <span className="text-gradient italic font-light">Nouveaux Standards ?</span>
          </h2>
          <Link href="/contact" className="btn-glow-white !px-10 md:!px-16 !py-4 md:!py-5">
            Lancer mon projet
          </Link>
        </div>
      </div>
    </div>
  );
}
