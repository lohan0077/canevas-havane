import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import { AppelFinal, EnTetePage, Section } from "../_composants/Blocs";
import CarteDeTable from "../_composants/CarteDeTable";
import { photos } from "../_composants/donnees";

// « Et le jour J, sur chaque table, une carte : d'où vient le plat, et qui l'a
// transmis. » La carte s'écrit et se compose à mesure ; elle ne dit que l'histoire vraie
// de la famille (une origine inventée serait trompeuse) : le site le rappelle.
export const metadata: Metadata = {
  title: "La carte de table — Transmis, site de démonstration",
  description: "Sur chaque table, une carte : d'où vient le plat, et qui l'a transmis. Écrite avec ton histoire vraie. Site de démonstration.",
  ...adressesDeLaPage("/exemples/transmis/carte-de-table"),
};

export default function PageCarteDeTable() {
  return (
    <main>
      <EnTetePage titre="Le jour J, sur chaque table, une carte." photo={photos.papier}>
        D&apos;où vient le plat, et qui l&apos;a transmis. Écris-la : elle se compose à mesure. On n&apos;y met que ton histoire vraie.
      </EnTetePage>
      <Section>
        <Apparition><CarteDeTable /></Apparition>
      </Section>
      <AppelFinal />
    </main>
  );
}
