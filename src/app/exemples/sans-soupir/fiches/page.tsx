import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import { AppelFinal, EnTetePage } from "../_composants/Blocs";
import Bibliotheque from "../_composants/Bibliotheque";

// « Sur le site, toutes les fiches, gratuites, à imprimer. Parce que les gens tapent
// exactement ça » (suggestions Google « comment faire un appel vidéo … », relevées le
// 15/10/2026, voir la vidéo marque-depannage-info). Filmé tel quel
// (Videos/marque-depannage-info/tournage.mjs).
export const metadata: Metadata = {
  title: "Les fiches gratuites — Sans Soupir, site de démonstration",
  description: "Toutes les fiches de Sans Soupir, gratuites, en gros caractères, à imprimer : appeler en vidéo, écrire plus gros, reconnaître un faux message…",
  ...adressesDeLaPage("/exemples/sans-soupir/fiches"),
};

export default function Fiches() {
  return (
    <main>
      <EnTetePage surtitre="Gratuites · à imprimer" titre="Toutes *les fiches.*" teinte="#DCEBF3">
        Les mêmes que sur le frigo. En gros caractères, trois étapes, sans compte et sans adresse
        e-mail.
      </EnTetePage>
      <section className="mx-auto max-w-5xl px-5 py-20 sm:px-8">
        <Bibliotheque />
      </section>
      <AppelFinal />
    </main>
  );
}
