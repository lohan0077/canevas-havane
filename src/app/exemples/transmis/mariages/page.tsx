import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import { AppelFinal, EnTetePage, Section } from "../_composants/Blocs";
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
      <EnTetePage surtitre="Les mariages · exemples" titre="Une page *par mariage.*" photo={photos.artichaut}>
        Le nombre d&apos;invités, le menu de la saison, le plat de la famille, le prix par personne. Des mariages d&apos;exemple : aucun
        nom, aucune photo d&apos;invités.
      </EnTetePage>
      <Section>
        <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
          {MARIAGES.map((m, i) => (
            <Apparition as="li" key={m.slug} delai={i * 110}>
              <Link href={`${DOSSIER}/mariages/${m.slug}`} className="group grid grid-cols-[96px_1fr] items-center gap-5 py-6 sm:grid-cols-[180px_1fr_auto] sm:gap-8">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <Image src={m.photo.src} alt={m.photo.alt} fill sizes="180px" className="object-cover" />
                </div>
                <div className="space-y-1.5">
                  <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-[var(--doux)]">Mariage n° {m.numero} · {m.menu.saison.toLowerCase()}</p>
                  <h2 className="font-[family-name:var(--titres)] text-[clamp(1.6rem,3vw,2.4rem)] font-normal leading-[1.05]">{m.titre}</h2>
                  <p className="text-[15px] tabular-nums text-[var(--doux)]">{m.menu.plat.nom} · {euros(prixParPersonne(m.invites))} TTC par personne · exemple</p>
                </div>
                <span aria-hidden="true" className="hidden text-2xl text-[var(--accent-texte)] transition-transform group-hover:translate-x-1 sm:block">→</span>
              </Link>
            </Apparition>
          ))}
        </ul>
      </Section>
      <AppelFinal />
    </main>
  );
}
