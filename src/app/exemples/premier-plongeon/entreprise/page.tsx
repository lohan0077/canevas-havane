import type { Metadata } from "next";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, engagements, entreprise, equipe, garanties, photos } from "../_composants/donnees";
import { Intitule, PhotoPlaque, Plaque, styles as s } from "../_composants/Habillage";
import { AppelFinal, HautDePage, Section, TetePage } from "../_composants/Blocs";

export const metadata: Metadata = {
  title: "L'entreprise — Premier Plongeon (démonstration)",
  description: "L'équipe, les engagements, les garanties et la zone d'intervention d'un pisciniste imaginaire de Drôme-Ardèche.",
  ...adressesDeLaPage("/exemples/premier-plongeon/entreprise"),
};

const COMMUNES = ["Valence", "Romans-sur-Isère", "Bourg-lès-Valence", "Guilherand-Granges", "Tournon-sur-Rhône", "Tain-l'Hermitage", "Crest", "Privas"];

export default function Entreprise() {
  return (
    <>
      <HautDePage />
      <main>
        <TetePage
          libelle="L'entreprise"
          titre={<>Pisciniste depuis {entreprise.depuis}, <span className="text-[#e8d1cb]">à {entreprise.ville}.</span></>}
          photo={photos.faceAuxMontagnes}
        >
          Julien Marchal a posé sa première coque en {entreprise.depuis}, dans le jardin de
          ses parents. Depuis, {entreprise.chiffres.piscines} piscines, une seule méthode :
          un prix écrit avant, une semaine choisie par toi, et un chantier qu&apos;on
          raconte chaque soir.
        </TetePage>

        <Section sombre className="space-y-14">
          <Intitule libelle="Nos engagements" titre={<>Quatre promesses, <span className="text-[#e8d1cb]">tenues par écrit.</span></>} />
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {engagements.map((e) => (
              <li key={e.titre} className="space-y-2 border-t border-[rgba(255,255,255,0.13)] pt-5">
                <h3 className="font-bold text-lg text-white">{e.titre}</h3>
                <p className="leading-relaxed text-[#b9c0cc]">{e.texte}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Intitule libelle="L'équipe" titre={<>Trois noms, <span className="text-[#e8d1cb]">un numéro.</span></>}>
            Et deux poseurs qui travaillent avec nous depuis le début. Ton interlocuteur te
            donne son numéro direct dès la visite technique.
          </Intitule>
          <ul className="border-y border-[rgba(255,255,255,0.13)] divide-y divide-[rgba(255,255,255,0.13)]">
            {equipe.map((p) => (
              <li key={p.nom} className="grid gap-5 py-7 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-8">
                <Plaque coupe={14} fond="#0e1522" className="w-16 h-16">
                  <span className={`${s.technique} grid h-full place-items-center text-lg text-[#e8d1cb]`}>{p.initiales}</span>
                </Plaque>
                <div className="space-y-1">
                  <h3 className={`${s.titre} text-2xl`}>{p.nom}</h3>
                  <p className={`${s.technique} text-[11px] text-[#e8d1cb]`}>{p.role}</p>
                  <p className="pt-1 text-[#b9c0cc]">{p.phrase}</p>
                </div>
              </li>
            ))}
          </ul>
        </Section>

        <Section sombre className="space-y-14">
          <Intitule libelle="Garanties" titre={<>Ce qui te protège <span className="text-[#e8d1cb]">après le chantier.</span></>}>
            Les garanties que la loi impose à tout constructeur, et l&apos;assurance qui va
            avec : l&apos;attestation est jointe à chaque devis.
          </Intitule>
          <ul className="grid gap-6 md:grid-cols-3">
            {garanties.map((g) => (
              <li key={g.titre} className="h-full">
                <Plaque coupe={18} className="h-full">
                  <div className="h-full p-6 sm:p-8 space-y-3">
                    <h3 className={`${s.titre} text-xl`}>{g.titre}</h3>
                    <p className="leading-relaxed text-[#b9c0cc]">{g.texte}</p>
                  </div>
                </Plaque>
              </li>
            ))}
          </ul>
        </Section>

        <Section className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-8">
            <Intitule libelle="Où on intervient" titre={<>{entreprise.zone.join(", ")}.</>}>
              Dans un rayon de {entreprise.rayon} : assez près pour être là le premier et le
              dernier jour de chaque chantier.
            </Intitule>
            <ul className="flex flex-wrap gap-3">
              {COMMUNES.map((c) => (
                <li key={c}>
                  <Plaque coupe={10}>
                    <span className={`${s.technique} block px-4 py-2.5 text-[11px] text-[#e6eaf5]`}>{c}</span>
                  </Plaque>
                </li>
              ))}
            </ul>
            <Link href={`${DOSSIER}/contact`} className={`${s.lien} ${s.technique} text-sm inline-block`}>Ta commune n&apos;y est pas ? Demande-nous</Link>
          </div>
          <PhotoPlaque photo={photos.vueDuCiel} ratio="4 / 3" sizes="(min-width: 1024px) 540px, 100vw" coupe={28} />
        </Section>

        <AppelFinal />
      </main>
    </>
  );
}
