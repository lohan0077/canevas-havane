import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Canevas Havane | Agence Web & Design de Prestige à Lyon",
  description: "Agence de création numérique haut de gamme : sites web sur mesure, identité de marque, SEO et acquisition. Concevons l'inoubliable pour votre marque.",
};

const services = [
  {
    title: "Identité de Marque",
    category: "Branding & Design",
    description: "Nous créons des univers visuels qui transcendent le simple logo pour devenir de véritables héritages.",
    items: ["Logotype & Iconographie", "Charte Graphique", "Direction Artistique", "Design Editorial"],
    color: "#F27438"
  },
  {
    title: "Expériences Digitales",
    category: "Web & Mobile",
    description: "Des interfaces haute couture alliant performance technologique et émotion esthétique.",
    items: ["UX/UI Design de Luxe", "Développement Next.js", "E-commerce Premium", "Applications Métier"],
    color: "#F27438"
  },
  {
    title: "Visibilité & Influence",
    category: "Marketing & SEO",
    description: "Dominez votre marché avec une stratégie de croissance élégante et chirurgicale.",
    items: ["SEO Sémantique", "Google Ads Performance", "Content Strategy", "Social Media Management"],
    color: "#F27438"
  }
];

const expertiseImages = [
  "/macbook-hero-final.webp",
  "/seo-luxury-new.webp",
  "/ads-luxury-new.webp"
];

const projects = [
  {
    title: "Kéo.fr",
    category: "Expérience Digitale",
    description: "Une plateforme de gestion immobilière de prestige, alliant performance logicielle et raffinement visuel.",
    image: "/macbook-hero-final.webp",
    year: "2025",
    slug: "keo"
  },
  {
    title: "Edificia.fr",
    category: "SaaS & Finance",
    description: "Un écosystème de pilotage financier pour entreprises exigeantes.",
    image: "/edificia-dashboard-2.webp",
    year: "2025",
    slug: "edificia"
  }
];

export default function Home() {
  return (
    <main className="selection:bg-[var(--color-primary)] selection:text-white flex flex-col items-center bg-[var(--color-background)]">
      {/* Grand Hero Section - Majestic Background Integration */}
      <section className="relative w-full h-[110vh] min-h-[900px] flex items-center justify-center overflow-hidden">
        {/* The Grand Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-grand-final-4k.webp"
            alt="Canevas Havane Atelier"
            fill
            priority
            sizes="100vw"
            className="object-cover brightness-[1.05] contrast-[1.05]"
          />
          {/* Subtle overlay for depth and readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-background)]/20 via-transparent to-[var(--color-background)]" />
        </div>

        {/* Hero Content Container */}
        <div className="max-w-[1100px] w-full px-6 md:px-24 z-10 grid grid-cols-1 lg:grid-cols-2 items-center h-full pt-20 md:pt-32">
          {/* Left Column: Content */}
          <div className="flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-3 px-4 md:px-6 py-2 mb-8 md:mb-12 rounded-full border-white/10 bg-white/5 backdrop-blur-md">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] animate-pulse shadow-[0_0_10px_var(--color-primary)]"></div>
              <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] text-[#2C1E16]/80 italic">L'Excellence est Standard</span>
            </div>

            <h1 className="heading-display mb-8 md:mb-12 text-left w-full leading-[0.8] flex flex-col items-start">
              <span className="block opacity-20 transform transition-opacity duration-700 uppercase tracking-tighter whitespace-nowrap">CONCEVOIR</span>
              <span className="text-gradient block italic font-light uppercase tracking-tight ml-[0.1em] md:ml-[0.2em] whitespace-nowrap">L'INOUBLIABLE.</span>
            </h1>

            <p className="max-w-xl text-sm md:text-lg text-[#2C1E16]/80 mb-10 md:mb-16 leading-relaxed font-light tracking-tight">
              Nous créons des architectures numériques de prestige. <br className="hidden md:block" />
              Chaque pixel est une déclaration de <span className="text-[#2C1E16] font-normal italic font-serif">puissance</span> et d'<span className="text-[#2C1E16] font-normal italic font-serif">élegance</span>.
            </p>

            <div className="flex flex-col sm:flex-row gap-10 items-center">
              <Link href="/realisations" className="group flex items-center gap-4 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] overflow-hidden text-[#2C1E16]/60">
                <span className="h-[1px] w-8 bg-[#2C1E16]/20 group-hover:w-16 transition-all duration-500"></span>
                Découvrir l'Atelier
              </Link>
            </div>
          </div>
          
          {/* Right side is intentionally empty to let the background image (MacBook) shine through */}
          <div className="hidden lg:block h-full" />
        </div>
      </section>

      {/* Expertise Preview Section */}
      <section className="w-full bg-[var(--color-background)] py-32 mt-32">
        <div className="max-centered-container px-6">
          <div className="text-center space-y-8 mb-32">
            <h2 className="heading-display uppercase leading-[0.85] font-serif font-medium">
              <span className="block opacity-30">NOS CHAMPS D'</span>
              <span className="text-gradient block italic">EXPERTISE.</span>
            </h2>
          </div>

          <div className="space-y-24 md:space-y-48 w-full">
            {services.map((service, index) => (
              <div 
                key={service.title} 
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-32 items-center text-left w-full`}
              >
                <div className="flex-1 space-y-6 md:space-y-8 order-2 lg:order-1">
                  <div className="space-y-4">
                    <h4 className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em]" style={{ color: service.color }}>{service.category}</h4>
                    <h2 className="text-3xl md:text-6xl font-medium uppercase tracking-tight leading-none text-[var(--color-foreground)] font-serif">
                      {service.title}
                    </h2>
                  </div>
                  
                  <p className="text-lg md:text-xl text-[var(--color-foreground)]/70 font-light leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="flex-1 w-full order-1 lg:order-2">
                  <div className="aspect-[16/10] lg:aspect-square glass-card overflow-hidden group relative">
                    <Image
                      src={expertiseImages[index]}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110 opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-background)] to-transparent opacity-40 z-10" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section className="w-full bg-[var(--color-background)]" style={{ marginTop: '100px', paddingTop: '50px', paddingBottom: '50px' }}>
        <div className="max-centered-container px-6">
          <div className="text-center space-y-8" style={{ marginBottom: '50px' }}>
            <h2 className="heading-display uppercase leading-[0.85] font-serif font-medium">
              <span className="block opacity-30">NOS DERNIÈRES</span>
              <span className="text-gradient block italic font-light">RÉALISATIONS.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 lg:gap-32 w-full">
            {projects.map((project) => (
              <div key={project.title} className="group relative flex flex-col space-y-16">
                <Link 
                  href={`/realisations/${project.slug}`} 
                  className="aspect-[16/10] overflow-hidden glass-card relative bg-[var(--color-foreground)]/[0.02] rounded-[3rem] cursor-pointer block"
                >
                  <Image 
                    src={project.image} 
                    alt={project.title}
                    fill
                    className="object-contain opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 p-8 grayscale-[0.5] group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-foreground)]/40 to-transparent opacity-60 transition-opacity duration-700 z-10" />
                  
                  {/* Internal Link Indicator */}
                  <div className="absolute top-8 right-8 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                    <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
                    </div>
                  </div>
                </Link>

                <div className="space-y-4">
                  <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-[var(--color-primary)]">{project.category}</h4>
                  <Link 
                    href={`/realisations/${project.slug}`} 
                    className="text-4xl font-medium uppercase tracking-tight text-[var(--color-foreground)] group-hover:text-[var(--color-primary)] transition-colors duration-500 font-serif block"
                  >
                    {project.title}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Philosophy/Team Preview */}
      <section className="w-full bg-[var(--color-background)]" style={{ marginTop: '100px', paddingTop: '100px', paddingBottom: '50px' }}>
        <div className="max-centered-container px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
            <div className="space-y-10">
              <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-[var(--color-primary)]">L'Artisanat Digital</h4>
              <h2 className="text-4xl md:text-6xl font-medium uppercase tracking-tight leading-none font-serif">
                L'OPÉRA DU <br />
                <span className="opacity-20 italic">PIXEL.</span>
              </h2>
              <p className="text-xl text-[var(--color-foreground)]/70 font-light leading-relaxed">
                Chaque ligne de code est une note, chaque design est une symphonie. 
              </p>
            </div>
            <div className="relative aspect-[4/3] glass-card overflow-hidden">
              <Image 
                src="/pixel-opera.webp"
                alt="Signature Atelier"
                fill
                className="object-cover opacity-50 group-hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-7xl font-medium text-[var(--color-foreground)]/[0.05] select-none uppercase tracking-tighter font-serif">ARTISAN</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-[var(--color-background)] py-12 md:py-32">
        <div className="max-centered-container px-6">
          <div className="glass-card p-8 md:p-24 text-center space-y-8 md:space-y-12 w-full bg-[var(--color-foreground)] !rounded-[2rem] md:!rounded-[3rem]">
            <h2 className="text-3xl md:text-5xl font-medium uppercase tracking-tight leading-none text-white font-serif">
              Prêt à marquer <br />
              <span className="text-gradient italic font-light">L'Histoire ?</span>
            </h2>
            <Link href="/contact" className="btn-glow-white inline-block !px-6 md:!px-10">
              Entrer en contact
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
