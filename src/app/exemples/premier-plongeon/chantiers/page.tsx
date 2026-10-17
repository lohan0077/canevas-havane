import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import { chantiers, photos, photosDeChantier } from "../_composants/donnees";
import { Intitule, PhotoPlaque } from "../_composants/Habillage";
import { AppelFinal, CarteChantier, HautDePage, Section, TetePage } from "../_composants/Blocs";

export const metadata: Metadata = {
  title: "Nos réalisations — Premier Plongeon (démonstration)",
  description: "Les chantiers d'un pisciniste imaginaire, chacun sur sa page : la taille, la durée, le prix, et le déroulé jour par jour.",
  ...adressesDeLaPage("/exemples/premier-plongeon/chantiers"),
};

export default function Realisations() {
  return (
    <>
      <HautDePage />
      <main>
        <TetePage libelle="Nos réalisations" titre={<>Chaque chantier a <span className="text-[#e8d1cb]">sa page.</span></>} photo={photos.terrassement}>
          La taille, la durée des travaux, le prix, et le chantier raconté jour par jour.
          Exactement ce que tu cherches avant d&apos;appeler un pisciniste — alors on le montre.
        </TetePage>

        <Section sombre>
          <ul className="grid gap-12 md:grid-cols-3">
            {chantiers.map((c) => (
              <li key={c.slug}>
                <CarteChantier chantier={c} titre="h2" />
              </li>
            ))}
          </ul>
        </Section>

        <Section className="space-y-12">
          <Intitule libelle="Sur le chantier" titre={<>Trois semaines, <span className="text-[#e8d1cb]">en images.</span></>}>
            Le terrassement, les engins, puis le bassin prêt à recevoir l&apos;eau. Photos
            d&apos;illustration : sur un vrai site, ce sont celles de tes voisins, publiées
            avec leur accord.
          </Intitule>
          <ul className="grid gap-6 md:grid-cols-3">
            {photosDeChantier.map((p) => (
              <li key={p.src}>
                <PhotoPlaque photo={p} ratio="4 / 5" sizes="(min-width: 768px) 360px, 100vw" coupe={22} />
              </li>
            ))}
          </ul>
        </Section>

        <AppelFinal />
      </main>
    </>
  );
}
