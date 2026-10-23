import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import CalculPalier from "../../_kit/CalculPalier";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, EnTetePage, HeureLimite, Surtitre } from "../_composants/Blocs";
import { PHOTOS, boutique } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Livraison — Douze Mois, site de démonstration",
  description: "Livraison de fleurs le jour même par une boutique imaginaire : commandé avant 14 h, livré aujourd'hui, dans la ville et les communes voisines.",
  ...adressesDeLaPage("/exemples/douze-mois/livraison"),
};

export default function Livraison() {
  return (
    <main>
      <EnTetePage surtitre="Livraison" titre="On livre *nous-mêmes.*" photo={PHOTOS.velo} origine="50% 60%">
        À vélo-cargo dans la ville, en voiture au-delà, du mardi au samedi. Aucun réseau de
        livraison : c&apos;est la boutique qui sonne à la porte.
      </EnTetePage>
      <HeureLimite />
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-2">
        <div className="space-y-6">
          <Apparition><Surtitre n="01">Ma rue est-elle livrée ?</Surtitre></Apparition>
          <TitreRevele
            texte={"À combien de la boutique *habite-t-il ?*"}
            className="font-normal text-[clamp(2.6rem,5vw,4.5rem)] leading-[0.95] tracking-[-0.035em]"
            classeAccent="italic text-[var(--accent-texte)]"
          />
          <Apparition as="p" delai={150} className="text-lg leading-relaxed">
            Glisse jusqu&apos;à la distance : tu vois le tarif, et jusqu&apos;à quelle heure commander pour
            aujourd&apos;hui.
          </Apparition>
          <Apparition as="ul" delai={250} className="divide-y divide-[var(--trait)] border-y border-[var(--trait)] text-lg">
            <li className="py-4">{boutique.livraisons}.</li>
            <li className="py-4">Si personne n&apos;est là, on appelle ; puis on laisse le bouquet chez un voisin, ou on revient le lendemain.</li>
            <li className="py-4">Retrait en boutique : gratuit, {boutique.horaires.toLowerCase()}.</li>
          </Apparition>
          <Apparition delai={300} className="relative hidden aspect-[16/10] overflow-hidden rounded-t-full lg:block">
            <Image src={PHOTOS.dahliasJardin.src} alt={PHOTOS.dahliasJardin.alt} fill sizes="45vw" className="object-cover" />
          </Apparition>
        </div>
        <Apparition de="zoom" className="lg:sticky lg:top-28 lg:self-start">
          <CalculPalier
            etiquette="Distance de la boutique"
            unite="km"
            min={1}
            max={25}
            depart={4}
            titreResultat="Livraison"
            paliers={[
              { jusqua: 3, titre: "Dans le quartier, à vélo", prix: "6 € TTC", detail: "Commandé avant 14 h, livré aujourd'hui." },
              { jusqua: 8, titre: "Dans la ville", prix: "9 € TTC", detail: "Commandé avant 14 h, livré aujourd'hui." },
              { jusqua: 15, titre: "Les communes voisines", prix: "12 € TTC", detail: "Commandé avant 12 h, livré aujourd'hui ; après, demain matin." },
              { jusqua: 25, titre: "Trop loin pour nous", detail: "On ne livre pas si loin : le bouquet t'attend en boutique, ou on te conseille un fleuriste près de chez lui." },
            ]}
            legende="Tarifs et distances d'exemple : la boutique est fictive. Rien n'est envoyé."
          />
        </Apparition>
      </section>
      <AppelFinal />
    </main>
  );
}
