import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import type { Fiche } from "./_kit/fiche";
import { SITES } from "./_registre";

export const metadata: Metadata = {
  title: "Sites de démonstration",
  description: "Les sites montrés dans les vidéos de Canevas Havane, construits pour de vrai : des entreprises imaginaires, des sites qui fonctionnent.",
  ...adressesDeLaPage("/exemples"),
};

// Les sites viennent de _registre.ts, écrit par outils/registre-exemples.mjs à partir
// de la fiche de chaque site. Ces entreprises n'existent pas : elles ne figurent pas
// dans les réalisations, qui ne présentent que de vrais clients.
// Un site par métier, montré dans ses deux vidéos.
type Site = Fiche & { chemin: string };
const sites = SITES.filter((s): s is Site => "secteur" in s);
const enAttente = SITES.filter((s) => !("secteur" in s));

const GROUPES: { cle: Fiche["groupe"]; titre: string; texte: string }[] = [
  { cle: "rendez-vous", titre: "Remplir l'agenda", texte: "Des métiers qui vivent du rendez-vous : le site le fait prendre." },
  { cle: "vente", titre: "Vendre en ligne", texte: "Des commerces et des marques : le site vend, ou fait venir en boutique." },
  { cle: "devis", titre: "Demander un devis", texte: "Des chantiers et des services : le site amène la demande, déjà qualifiée." },
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
            Un site par métier, montré dans ses deux vidéos, et construit pour de vrai.
            Les entreprises sont imaginaires ; les sites, eux, fonctionnent.
          </p>
        </div>

        <div className="space-y-24 md:space-y-32 w-full">
          {GROUPES.map((g) => {
            const duGroupe = sites.filter((s) => s.groupe === g.cle).sort((a, b) => a.metier.localeCompare(b.metier, "fr"));
            if (!duGroupe.length) return null;
            return (
              <section key={g.cle} className="space-y-10">
                <div className="space-y-3">
                  <h2 className="text-3xl md:text-5xl font-serif font-medium text-[var(--color-foreground)]">{g.titre}</h2>
                  <p className="text-[var(--color-foreground)]/70 font-light text-lg">{g.texte}</p>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {duGroupe.map((site) => (
                    <li key={site.chemin}>
                      <Link
                        href={site.chemin}
                        className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-[var(--color-foreground)]/10 bg-white/50 transition-colors duration-500 hover:border-[var(--color-primary)]"
                      >
                        <span className="relative block aspect-[4/3] overflow-hidden bg-[var(--color-foreground)]/5">
                          <Image
                            src={site.image}
                            alt=""
                            fill
                            sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                            className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                          />
                        </span>
                        <span className="flex flex-1 flex-col gap-3 p-7">
                          <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] text-[var(--color-foreground)]/70">{site.metier}</span>
                          <span className="text-3xl font-serif font-medium text-[var(--color-foreground)]">{site.nom}</span>
                          <span className="text-[var(--color-foreground)]/70 font-light text-base leading-relaxed">{site.idee}</span>
                          <span className="mt-auto pt-2 text-sm font-bold uppercase tracking-widest text-[var(--color-foreground)] group-hover:text-[var(--color-primary-texte)] transition-colors">
                            Ouvrir le site →
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}

          {enAttente.length > 0 && (
            <section className="space-y-6">
              <h2 className="text-2xl font-serif font-medium text-[var(--color-foreground)]">En cours de refonte</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {enAttente.map((site) => (
                  <li key={site.chemin}>
                    <Link href={site.chemin} className="block rounded-2xl border border-[var(--color-foreground)]/10 px-5 py-4 hover:border-[var(--color-primary)]">
                      <span className="font-serif text-xl text-[var(--color-foreground)]">{site.nom}</span>
                      <span className="block text-sm text-[var(--color-foreground)]/70">{site.metier}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
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
