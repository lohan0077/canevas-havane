import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import { AppelFinal, EnTetePage, Surtitre } from "../_composants/Blocs";
import { cabinet, photos } from "../_composants/donnees";

// La page des candidats. Le site parle aux dirigeants (« Remplir l'agenda » : « Le site
// parle aux candidats. Et le dirigeant qui doit recruter, lui, ne trouve rien. ») ; mais
// une chaise ne se remplit pas sans eux : placement gratuit (C. trav., art. L.5321-3),
// accord avant chaque envoi, rien de publié.
export const metadata: Metadata = {
  title: "Candidats — Première Bougie, site de démonstration",
  description: "Placement gratuit pour les candidats, et ce que le cabinet fait (et ne fait pas) d'une candidature. Cabinet fictif, site de démonstration.",
  ...adressesDeLaPage("/exemples/premiere-bougie/candidats"),
};

const ENGAGEMENTS = [
  { t: "Rien à payer", d: "Le placement est gratuit pour toi : aucune rétribution ne peut t'être demandée pour te trouver un poste (code du travail, art. L.5321-3). C'est l'entreprise qui recrute qui paie." },
  { t: "Ton accord avant chaque envoi", d: "Ta candidature n'est présentée à une entreprise qu'après ton accord écrit, pour ce poste-là." },
  { t: "Rien de publié", d: "Ni ton nom, ni ton parcours, ni l'entreprise qui t'a recruté. Pas de « ils nous ont fait confiance ». La photo de ta première bougie, seulement si tu le veux." },
  { t: "Tes données, pas plus longtemps que nécessaire", d: "Une vraie candidature serait conservée le temps du recrutement, puis supprimée, sauf accord de ta part. Tu peux demander l'accès ou l'effacement à tout moment." },
];

export default function Candidats() {
  return (
    <main>
      <EnTetePage surtitre="Candidats" titre="Placement gratuit, *pour toi.*">
        Ce site parle aux dirigeants. Mais une chaise ne se remplit pas sans toi : voilà ce qu&apos;on te doit.
      </EnTetePage>

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-8 md:py-28 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
        <ul className="grid gap-5 sm:grid-cols-2">
          {ENGAGEMENTS.map((e, i) => (
            <Apparition as="li" key={e.t} de="zoom" delai={i * 100} className={`space-y-3 rounded-[2rem] p-7 ${i === 0 ? "bg-[var(--accent)] text-[var(--sur-accent)]" : "border border-[var(--trait)] bg-[var(--carte)]"}`}>
              <span className="block font-[family-name:var(--titres)] text-[1.8rem] leading-tight">{e.t}</span>
              <span className={`block text-[16px] leading-relaxed ${i === 0 ? "" : "text-[var(--doux)]"}`}>{e.d}</span>
            </Apparition>
          ))}
        </ul>
        <div className="space-y-5">
          <Apparition de="rideau" className="relative aspect-square overflow-hidden rounded-[2rem]">
            <Image src={photos.chaiseRouge.src} alt={photos.chaiseRouge.alt} fill sizes="(min-width: 1024px) 420px, 100vw" className="object-cover" />
          </Apparition>
          <div className="space-y-2 rounded-[2rem] bg-[var(--sombre)] p-7 text-[var(--sur-sombre)]">
            <Surtitre>Pas d&apos;offres sur ce site</Surtitre>
            <p className="leading-relaxed">
              Le cabinet est fictif : aucune offre, aucun dépôt de CV. Un vrai cabinet le ferait par un
              formulaire séparé, avec ton accord.
            </p>
            <p className="pt-1 text-[15px] tabular-nums">{cabinet.telephone} · numéro de fiction</p>
          </div>
        </div>
      </section>

      <AppelFinal />
    </main>
  );
}
