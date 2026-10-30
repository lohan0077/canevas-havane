import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import { AppelFinal, Bouton, EnTetePage, Titre } from "../_composants/Blocs";
import { DOSSIER, chantiers, gammes, options, photos } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Nos piscines — Neuf Étés (démonstration)",
  description: "Les quatre coques d'une marque de piscines imaginaire, de 5 × 2,5 à 8 × 4 m : dimensions, jardin conseillé, prix pose comprise.",
  ...adressesDeLaPage("/exemples/neuf-etes/piscines"),
};

const POURQUOI = [
  { titre: "Posée en une matinée", texte: "Fabriquée d'un seul tenant en atelier, la coque arrive prête : le chantier dure deux à trois semaines, pas deux mois." },
  { titre: "Une surface lisse", texte: "Pas de joints à refaire, peu d'algues qui s'accrochent : l'entretien se résume à l'essentiel." },
  { titre: "Un prix qui tient", texte: "La coque a un prix fixe ; ce qui varie, c'est le terrain. On le mesure à la visite technique, avant le devis." },
];

export default function Piscines() {
  return (
    <main>
      <EnTetePage
        titre="Une coque pour chaque jardin."
        photo={photos.jardinFamilial}
        actions={
          <>
            <Bouton href={`${DOSSIER}/prix`}>Calculer mon prix</Bouton>
            <Bouton href={`${DOSSIER}/ma-date`} variante="contour">Choisir ma semaine</Bouton>
          </>
        }
      >
        Quatre tailles, de la cour de ville au grand jardin. Toutes posées en deux à trois
        semaines, toutes livrées filtration réglée et eau équilibrée.
      </EnTetePage>

      {gammes.map((g, i) => {
        const chantier = chantiers.find((c) => c.gamme === g.id);
        return (
          <section key={g.id} id={g.id} className={`scroll-mt-24 ${i % 2 ? "bg-[var(--carte)]" : ""}`}>
            <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-2 lg:items-center">
              <Apparition de={i % 2 ? "droite" : "gauche"} className={`relative aspect-[4/3] overflow-hidden rounded-[2.5rem] ${i % 2 ? "lg:order-last" : ""}`}>
                <Image src={g.photo.src} alt={g.photo.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
                <span className="absolute left-5 top-5 rounded-full bg-[var(--sombre)] px-4 py-2 font-[family-name:var(--titres)] text-sm font-normal text-[var(--sur-sombre)]">
                  Coque {g.coque}{" "}m
                </span>
              </Apparition>
              <div className="space-y-7">
                <Titre texte={g.nom} taille="grand" />
                <Apparition as="p" delai={150} className="text-xl leading-relaxed text-[var(--doux)]">{g.phrase}</Apparition>
                <Apparition delai={250}>
                  <dl className="grid grid-cols-2 gap-3">
                  {[
                    ["Dimensions", `${g.coque} m`],
                    ["Profondeur", g.profondeur],
                    ["Volume", `${g.volume} m³`],
                    ["Jardin conseillé", g.jardin],
                  ].map(([d, v]) => (
                    <div key={d} className="rounded-[1.4rem] border border-[var(--trait)] bg-[var(--fond)] px-4 py-3">
                      <dt className="text-[14px] text-[var(--doux)]">{d}</dt>
                      <dd className="font-[family-name:var(--titres)] text-lg font-normal">{v}</dd>
                    </div>
                  ))}
                  </dl>
                </Apparition>
                <Apparition delai={300} className="flex flex-wrap items-center gap-x-6 gap-y-4 rounded-[1.75rem] bg-[var(--sombre)] px-6 py-5 text-[var(--sur-sombre)]">
                  <span className="font-[family-name:var(--titres)] text-3xl font-normal text-[var(--accent)]">{g.prix}</span>
                  <span className="text-[15px]">TTC, pose comprise. Prix d&apos;exemple.</span>
                </Apparition>
                <div className="flex flex-wrap gap-x-8 gap-y-3 font-[family-name:var(--titres)] font-normal">
                  <Link href={`${DOSSIER}/prix`} className="text-[var(--accent-texte)] underline underline-offset-4">Calculer pour mon jardin</Link>
                  {chantier && (
                    <Link href={`${DOSSIER}/chantiers/${chantier.slug}`} className="text-[var(--accent-texte)] underline underline-offset-4">
                      Voir le chantier n° {chantier.numero}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <section className="px-3 sm:px-5">
        <div className="rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
          <div className="mx-auto max-w-7xl space-y-14 px-5 py-24 sm:px-10 md:py-32">
            <Titre texte="Les options qu'on ajoute le plus souvent." />
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {options.map((o, i) => (
                <Apparition as="li" key={o.nom} delai={i * 110} className="h-full">
                  <div className="flex h-full flex-col gap-3 rounded-[2rem] border border-white/15 bg-[#0A2A39] p-7">
                    <h3 className="text-2xl font-bold">{o.nom}</h3>
                    <p className="flex-1 leading-relaxed">{o.detail}</p>
                    <p className="font-[family-name:var(--titres)] font-normal text-[var(--accent)]">{o.prix}</p>
                  </div>
                </Apparition>
              ))}
            </ul>
            <p className="text-[15px]">Prix d&apos;exemple, TTC et pose comprise : l&apos;entreprise est fictive.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-14 px-5 py-24 sm:px-8 md:py-32">
        <Titre texte={"Pourquoi une coque\u00a0? Pour un été qui arrive vite."} />
        <ul className="grid gap-5 md:grid-cols-3">
          {POURQUOI.map((p, i) => (
            <Apparition as="li" key={p.titre} delai={i * 120} className="rounded-[2rem] border border-[var(--trait)] bg-[var(--carte)] p-7">
              <h3 className="text-2xl font-bold">{p.titre}</h3>
              <p className="mt-3 leading-relaxed text-[var(--doux)]">{p.texte}</p>
            </Apparition>
          ))}
        </ul>
      </section>

      <AppelFinal />
    </main>
  );
}
