import type { Metadata } from "next";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Sites de démonstration",
  description: "Les sites montrés dans les vidéos de Canevas Havane, construits pour de vrai : des entreprises imaginaires, des sites qui fonctionnent.",
  ...adressesDeLaPage("/exemples"),
};

// Une entrée par site de démonstration. Ces entreprises n'existent pas : elles ne
// figurent pas dans les réalisations, qui ne présentent que de vrais clients.
const sites = [
  {
    nom: "Premier Plongeon",
    chemin: "/exemples/premier-plongeon",
    metier: "Pisciniste",
    serie: "Remplir l'agenda",
    idee: "Le jardin qui dit quelle piscine rentre, une fourchette de prix honnête, et les dates de chantier qu'on bloque soi-même.",
  },
  {
    nom: "Neuf Étés",
    chemin: "/exemples/neuf-etes",
    metier: "Marque de piscines",
    serie: "Créer une marque",
    idee: "Une seule question — l'âge de tes enfants — et le nombre d'étés qu'il te reste avec eux, à la maison.",
  },
];

export default function ExemplesPage() {
  return (
    <div className="layout-safe-zone min-h-screen" style={{ paddingBottom: "100px" }}>
      <div className="max-centered-container px-6">
        <div className="text-center space-y-8 md:space-y-12 mb-20 md:mb-32">
          <div className="inline-flex items-center gap-3 px-4 md:px-6 py-2 rounded-full border border-[var(--color-foreground)]/5 bg-white/40 backdrop-blur-md">
            <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] md:tracking-[0.5em] text-[var(--color-foreground)]/70 italic">Sites de démonstration</span>
          </div>

          <h1 className="heading-display">
            <span className="block opacity-60">LES SITES</span>
            <span className="text-gradient block italic font-light">DES VIDÉOS.</span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-[var(--color-foreground)]/70 font-light leading-relaxed px-4">
            Les sites que je montre dans mes vidéos, construits pour de vrai.
            Les entreprises sont imaginaires ; les sites, eux, fonctionnent.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 w-full">
          {sites.map((site) => (
            <Link
              key={site.chemin}
              href={site.chemin}
              className="group glass-card !rounded-[2rem] p-8 md:p-12 flex flex-col gap-5 border border-[var(--color-foreground)]/10 hover:border-[var(--color-primary)] transition-colors duration-500"
            >
              <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] text-[var(--color-primary-texte)]">
                {site.metier} · série « {site.serie} »
              </span>
              <span className="text-4xl md:text-5xl font-serif font-medium text-[var(--color-foreground)]">{site.nom}</span>
              <span className="text-[var(--color-foreground)]/70 font-light text-base md:text-lg leading-relaxed">{site.idee}</span>
              <span className="text-sm font-bold uppercase tracking-widest text-[var(--color-foreground)] group-hover:text-[var(--color-primary-texte)] transition-colors">
                Ouvrir le site →
              </span>
            </Link>
          ))}
        </div>

        <p className="max-w-2xl mx-auto mt-16 text-center text-sm text-[var(--color-foreground)]/70 leading-relaxed">
          Entreprises fictives : les prix, les dates et les chantiers affichés sont des
          exemples. Ces pages ne sont pas proposées aux moteurs de recherche et
          n&apos;enregistrent rien de ce que vous y saisissez.
        </p>
      </div>
    </div>
  );
}
