import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, Bouton, EnTetePage, Surtitre, TERRE } from "../_composants/Blocs";
import { DOSSIER, photos } from "../_composants/donnees";

// Le coup de lancement de la vidéo : « un bal, avec la mairie. Une tente sur la place du
// village, un samedi soir. Ouverte à tout le monde. » Une tente qui reçoit du public ne
// se monte pas sans l'autorisation de la mairie : la page le dit (voir
// Videos/marque-loueurs/SOURCES.md — CGPPP, art. L2122-1 ; ERP de type CTS). Date : un
// exemple (le 4 septembre 2027 est bien un samedi). Aucune buvette n'est annoncée.
export const metadata: Metadata = {
  title: "Le bal — Pignon sur Pré, site de démonstration",
  description: "Un bal sous la tente, sur la place du village, avec la mairie, entrée libre. Site de démonstration : l'événement est un exemple.",
  ...adressesDeLaPage("/exemples/pignon-sur-pre/le-bal"),
};

const ETAPES = [
  { titre: "La mairie d'abord", texte: "Occuper la place et y monter une tente qui reçoit du public, ça s'autorise. On dépose la demande avec le comité des fêtes, bien avant." },
  { titre: "La tente, la veille", texte: "Montée le vendredi, vérifiée, avec ses sorties dégagées et son plan affiché à l'entrée." },
  { titre: "Le bal", texte: "Un orchestre, un parquet, des guirlandes. Entrée libre, de 20 h à minuit." },
  { titre: "Le lendemain", texte: "On démonte dans la matinée, la place est rendue propre avant midi." },
];

const FICHE = [
  ["Quand", "Samedi 4 septembre 2027"],
  ["Où", "Place du village"],
  ["Entrée", "Libre"],
  ["Avec", "La mairie"],
];

export default function LeBal() {
  return (
    <main>
      <EnTetePage surtitre="Le lancement" titre="Bal ce *samedi.*" photo={photos.village} origine="60% 55%">
        Une tente sur la place du village, un samedi soir. Ouverte à tout le monde, avec la mairie. Événement d&apos;exemple&nbsp;:
        l&apos;entreprise est fictive.
      </EnTetePage>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[26px] border border-[var(--trait)] bg-[var(--trait)] md:grid-cols-4">
          {FICHE.map(([t, d], i) => (
            <Apparition key={t} delai={i * 90} className="space-y-1 bg-[var(--carte)] p-6">
              <dt className="text-[13px] uppercase tracking-[0.16em] text-[var(--accent-texte)]">{t}</dt>
              <dd className="font-[family-name:var(--titres)] text-[26px] leading-tight">{d}</dd>
            </Apparition>
          ))}
        </dl>
      </section>

      <section className="mx-auto max-w-7xl space-y-12 px-5 pb-24 sm:px-8 md:pb-32">
        <div className="space-y-6">
          <Apparition><Surtitre>Comment on l&apos;organise</Surtitre></Apparition>
          <TitreRevele texte="Une fête ouverte à tous, *ça s'autorise.*" className="max-w-4xl font-[family-name:var(--titres)] text-[clamp(3rem,6vw,5.4rem)] font-normal leading-[0.92] tracking-[-0.03em]" classeAccent={TERRE} />
          <Apparition as="p" delai={150} className="max-w-2xl text-lg leading-relaxed text-[var(--doux)]">
            Une tente qui reçoit du public ne se monte pas sans l&apos;autorisation de la mairie. Pour ce bal, c&apos;est la mairie qui
            nous accueille sur sa place.
          </Apparition>
        </div>
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ETAPES.map((e, i) => (
            <Apparition as="li" key={e.titre} delai={i * 110} className="space-y-2 border-t-2 border-[var(--encre)] pt-4">
              <p className="font-[family-name:var(--titres)] text-5xl italic text-[var(--accent-texte)]">{i + 1}</p>
              <h3 className="font-[family-name:var(--titres)] text-[26px] font-normal leading-tight">{e.titre}</h3>
              <p className="leading-relaxed text-[var(--doux)]">{e.texte}</p>
            </Apparition>
          ))}
        </ol>
      </section>

      <section className="px-3 sm:px-5">
        <div className="grid overflow-hidden rounded-[2.5rem] bg-[var(--accent)] text-[var(--sur-accent)] lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6 px-6 py-16 sm:px-12 md:py-24">
            <TitreRevele texte={"Et si on la faisait *chez nous ?*"} className="font-[family-name:var(--titres)] text-[clamp(3rem,6vw,5.4rem)] font-normal leading-[0.92] tracking-[-0.03em]" classeAccent="italic font-light" />
            <p className="max-w-lg text-lg leading-relaxed">
              Un comité des fêtes, une association, une commune&nbsp;: on monte le dossier avec la mairie. Un mariage dans le
              pré&nbsp;: on vient voir le terrain.
            </p>
            <Bouton href={`${DOSSIER}#pre`} variante="creme">Voir ma tente sur mon pré</Bouton>
          </div>
          <div className="relative min-h-[300px]">
            <Image src={photos.tenteNuit.src} alt={photos.tenteNuit.alt} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <div className="pt-24 md:pt-32">
        <AppelFinal />
      </div>
    </main>
  );
}
