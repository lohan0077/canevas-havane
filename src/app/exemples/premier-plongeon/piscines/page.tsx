import type { Metadata } from "next";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, chantiers, gammes, options, photos } from "../_composants/donnees";
import { Intitule, PhotoPlaque, Plaque, styles as s } from "../_composants/Habillage";
import { AppelFinal, HautDePage, Section, TetePage } from "../_composants/Blocs";

export const metadata: Metadata = {
  title: "Nos piscines — Premier Plongeon (démonstration)",
  description: "Les quatre coques d'un pisciniste imaginaire, de 5 × 2,5 à 8 × 4 m : dimensions, jardin conseillé, prix pose comprise.",
  ...adressesDeLaPage("/exemples/premier-plongeon/piscines"),
};

const POURQUOI = [
  { titre: "Posée en une matinée", texte: "Fabriquée d'un seul tenant en atelier, la coque arrive prête : le chantier dure deux à trois semaines, pas deux mois." },
  { titre: "Une surface lisse", texte: "Pas de joints à refaire, peu d'algues qui s'accrochent : l'entretien se résume à l'essentiel." },
  { titre: "Un prix qui tient", texte: "La coque a un prix fixe ; ce qui varie, c'est le terrain. On le mesure à la visite technique, avant le devis." },
];

export default function Piscines() {
  return (
    <>
      <HautDePage />
      <main>
        <TetePage
          libelle="Nos piscines"
          titre={<>Une coque pour <span className="text-[#e8d1cb]">chaque jardin.</span></>}
          photo={photos.jardinFamilial}
          actions={
            <>
              <Link href={`${DOSSIER}/prix`} className={s.bouton}>Calculer mon prix</Link>
              <Link href={`${DOSSIER}/ma-date`} className={s.boutonFantome}>Choisir ma semaine</Link>
            </>
          }
        >
          Quatre tailles, de la cour de ville au grand jardin. Toutes posées en deux à trois
          semaines, toutes livrées filtration réglée et eau équilibrée.
        </TetePage>

        {gammes.map((g, i) => {
          const chantier = chantiers.find((c) => c.gamme === g.id);
          return (
            <Section key={g.id} id={g.id} sombre={i % 2 === 0} className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <PhotoPlaque photo={g.photo} ratio="4 / 3" sizes="(min-width: 1024px) 540px, 100vw" coupe={28} className={i % 2 ? "lg:order-last" : ""} />
              <div className="space-y-8">
                <Intitule libelle={`Gamme ${String(i + 1).padStart(2, "0")} · coque ${g.coque} m`} titre={g.nom}>
                  {g.phrase}
                </Intitule>
                <dl className="grid grid-cols-2 border-t border-[rgba(255,255,255,0.13)]">
                  {[
                    ["Dimensions", `${g.coque} m`],
                    ["Profondeur", g.profondeur],
                    ["Volume", `${g.volume} m³`],
                    ["Jardin conseillé", g.jardin],
                  ].map(([d, v]) => (
                    <div key={d} className="py-4 border-b border-[rgba(255,255,255,0.13)] odd:pr-4 even:pl-4 even:border-l">
                      <dt className={`${s.technique} text-[11px] text-[#8f98a8]`}>{d}</dt>
                      <dd className="pt-1 text-lg font-bold text-white">{v}</dd>
                    </div>
                  ))}
                </dl>
                <p className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className={`${s.titre} text-3xl text-[#7edbee]`}>{g.prix}</span>
                  <span className={`${s.technique} text-[11px] text-[#b9c0cc]`}>TTC, pose comprise · prix d&apos;exemple</span>
                </p>
                <div className="flex flex-wrap gap-x-8 gap-y-3">
                  <Link href={`${DOSSIER}/prix`} className={`${s.lien} ${s.technique} text-sm`}>Calculer pour mon jardin</Link>
                  {chantier && (
                    <Link href={`${DOSSIER}/chantiers/${chantier.slug}`} className={`${s.lien} ${s.technique} text-sm`}>
                      Voir le chantier n° {chantier.numero}
                    </Link>
                  )}
                </div>
              </div>
            </Section>
          );
        })}

        <Section className="space-y-14">
          <Intitule libelle="Les options" titre={<>Ce qu&apos;on ajoute <span className="text-[#e8d1cb]">le plus souvent.</span></>}>
            Chiffrées à part sur le devis, posées pendant le même chantier.
          </Intitule>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {options.map((o) => (
              <li key={o.nom} className="h-full">
                <Plaque coupe={18} className="h-full">
                  <div className="h-full p-6 space-y-3">
                    <h3 className={`${s.titre} text-xl`}>{o.nom}</h3>
                    <p className="leading-relaxed text-[#b9c0cc]">{o.detail}</p>
                    <p className={`${s.technique} text-xs text-[#e8d1cb]`}>{o.prix}</p>
                  </div>
                </Plaque>
              </li>
            ))}
          </ul>
          <p className="text-sm text-[#8f98a8]">Prix d&apos;exemple, TTC et pose comprise : l&apos;entreprise est fictive.</p>
        </Section>

        <Section sombre className="space-y-14">
          <Intitule libelle="Pourquoi une coque" titre={<>Le bon choix pour <span className="text-[#e8d1cb]">un été qui arrive vite.</span></>} />
          <ul className="grid gap-8 md:grid-cols-3">
            {POURQUOI.map((p) => (
              <li key={p.titre} className="space-y-2 border-t border-[rgba(255,255,255,0.13)] pt-5">
                <h3 className="font-bold text-lg text-white">{p.titre}</h3>
                <p className="leading-relaxed text-[#b9c0cc]">{p.texte}</p>
              </li>
            ))}
          </ul>
        </Section>

        <div className="pt-24">
          <AppelFinal />
        </div>
      </main>
    </>
  );
}
