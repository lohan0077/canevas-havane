import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import { AppelFinal, Bouton, EnTetePage, Intitule, Section } from "../_composants/Blocs";
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

      <Section className="space-y-14">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[var(--trait)] bg-[var(--trait)] md:grid-cols-4">
          {FICHE.map(([t, d], i) => (
            <Apparition key={t} delai={i * 90} className="space-y-2 bg-[var(--carte)] p-6">
              <dt className="text-[12px] font-medium uppercase tracking-[0.2em] text-[var(--doux)]">{t}</dt>
              <dd className="font-[family-name:var(--titres)] text-2xl leading-tight">{d}</dd>
            </Apparition>
          ))}
        </dl>
        <Intitule
          surtitre="Comment on l'organise"
          titre="Une fête ouverte à tous, *ça s'autorise.*"
          texte="Une tente qui reçoit du public ne se monte pas sans l'autorisation de la mairie. Pour ce bal, c'est la mairie qui nous accueille sur sa place."
        />
        <ol className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {ETAPES.map((e, i) => (
            <Apparition as="li" key={e.titre} delai={i * 110} className="space-y-2 border-t border-[var(--encre)] pt-4">
              <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-[var(--doux)]">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="font-[family-name:var(--titres)] text-2xl font-normal leading-tight">{e.titre}</h3>
              <p className="leading-relaxed text-[var(--doux)]">{e.texte}</p>
            </Apparition>
          ))}
        </ol>
      </Section>

      <Section fond="bg-[var(--sombre)] text-[var(--sur-sombre)]" className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div className="space-y-8">
          <Intitule
            surtitre="Chez vous aussi"
            titre="Et si on la faisait *chez nous ?*"
            texte="Un comité des fêtes, une association, une commune : on monte le dossier avec la mairie. Un mariage dans le pré : on vient voir le terrain."
            clair
          />
          <Bouton href={`${DOSSIER}#pre`} variante="clair">Voir ma tente sur mon pré</Bouton>
        </div>
        <Apparition className="relative aspect-[4/3] overflow-hidden rounded-2xl">
          <Image src={photos.tenteNuit.src} alt={photos.tenteNuit.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        </Apparition>
      </Section>

      <AppelFinal />
    </main>
  );
}
