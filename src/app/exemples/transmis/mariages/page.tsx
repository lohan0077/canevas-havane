import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import CarteLueur from "../../_kit/CarteLueur";
import { AppelFinal, EnTetePage } from "../_composants/Blocs";
import { DOSSIER, MARIAGES, euros, photos, prixParPersonne } from "../_composants/donnees";

// « Ensuite, chaque mariage devient une page. » La liste des mariages d'exemple : le
// nombre d'invités, le menu, le plat de famille, le prix par personne.
export const metadata: Metadata = {
  title: "Les mariages — Transmis, site de démonstration",
  description: "Chaque mariage devient une page : le nombre d'invités, le menu, le plat de famille, le prix par personne. Des exemples, sur un site de démonstration.",
  ...adressesDeLaPage("/exemples/transmis/mariages"),
};

export default function Mariages() {
  return (
    <main>
      <EnTetePage note="les mariages · exemples" titre="Une page *par mariage.*" photo={photos.sauce}>
        Le nombre d&apos;invités, le menu de la saison, le plat de la famille, le prix par personne. Des mariages d&apos;exemple&nbsp;:
        aucun nom, aucune photo d&apos;invités.
      </EnTetePage>
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28">
        <ul className="space-y-4">
          {MARIAGES.map((m, i) => (
            <Apparition as="li" key={m.slug} delai={i * 120} de="bas">
              <CarteLueur className="rounded-[26px]">
                <Link href={`${DOSSIER}/mariages/${m.slug}`} className="group grid items-center gap-5 rounded-[26px] border border-[var(--trait)] bg-[var(--carte)] p-4 sm:grid-cols-[220px_1fr_auto] sm:p-5">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[18px]">
                    <Image src={m.photo.src} alt={m.photo.alt} fill sizes="220px" className="object-cover transition-transform duration-[1.2s] group-hover:scale-[1.06]" />
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-[12px] uppercase tracking-[0.22em] text-[var(--accent-texte)]">Mariage n° {m.numero} · {m.menu.saison.toLowerCase()}</p>
                    <h2 className="font-[family-name:var(--titres)] text-[clamp(2rem,4vw,3.2rem)] font-normal leading-[1.02]">{m.titre}</h2>
                    <p className="font-[family-name:var(--f-caveat)] text-[24px] leading-tight text-[#1E3A6E]">{m.transmis}</p>
                    <p className="text-[15px] tabular-nums text-[var(--doux)]">{euros(prixParPersonne(m.invites))} TTC par personne · exemple</p>
                  </div>
                  <span aria-hidden="true" className="hidden h-14 w-14 place-items-center rounded-full bg-[var(--accent)] text-2xl text-[var(--sur-accent)] transition-transform duration-500 group-hover:-rotate-45 sm:grid">→</span>
                </Link>
              </CarteLueur>
            </Apparition>
          ))}
        </ul>
      </section>
      <AppelFinal />
    </main>
  );
}
