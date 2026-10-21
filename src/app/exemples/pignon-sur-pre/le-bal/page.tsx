import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, photos } from "../_composants/donnees";
import { Surtitre } from "../_composants/Blocs";

// Le coup de lancement de la vidéo : « un bal, avec la mairie. Une tente sur la place du
// village, un samedi soir. Ouverte à tout le monde. » Une tente qui reçoit du public ne
// se monte pas sans l'autorisation de la mairie : la page le dit (voir
// Videos/marque-loueurs/SOURCES.md — CGPPP, art. L2122-1 ; ERP de type CTS). Date : un
// exemple (le 4 septembre 2027 est bien un samedi). Aucune buvette n'est annoncée.
export const metadata: Metadata = {
  title: "Le bal · Pignon sur Pré — site de démonstration",
  description: "Un bal sous la tente, sur la place du village, avec la mairie, entrée libre. Site de démonstration : l'événement est un exemple.",
  ...adressesDeLaPage("/exemples/pignon-sur-pre/le-bal"),
};

const ETAPES = [
  { titre: "La mairie d'abord", texte: "Occuper la place et y monter une tente qui reçoit du public, ça s'autorise. On dépose la demande avec le comité des fêtes, bien avant." },
  { titre: "La tente, la veille", texte: "Montée le vendredi, vérifiée, avec ses sorties dégagées et son plan affiché à l'entrée." },
  { titre: "Le bal", texte: "Un orchestre, un parquet, des guirlandes. Entrée libre, de 20 h à minuit." },
  { titre: "Le lendemain", texte: "On démonte dans la matinée, la place est rendue propre avant midi." },
];

export default function LeBal() {
  return (
    <div>
      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="max-w-6xl mx-auto px-5 pt-10 pb-14 sm:py-20 grid gap-10 md:grid-cols-[1fr_1fr] md:items-center">
          <div className="space-y-5">
            <Surtitre clair>Le lancement</Surtitre>
            <h1 className="text-[52px] sm:text-7xl font-normal">Bal ce <em className="text-[#F2C98A]">samedi.</em></h1>
            <p className="text-lg leading-relaxed text-[#E4EBDA]">
              Une tente sur la place du village, un samedi soir. Ouverte à tout le monde, avec la mairie.
            </p>
            <dl className="grid grid-cols-2 gap-4 border-t border-[#E4EBDA]/40 pt-5">
              <div>
                <dt className="text-[13px] uppercase tracking-[0.16em] text-[#F2C98A]">Quand</dt>
                <dd className="font-[family-name:var(--titres)] text-2xl">Samedi 4 septembre 2027</dd>
              </div>
              <div>
                <dt className="text-[13px] uppercase tracking-[0.16em] text-[#F2C98A]">Où</dt>
                <dd className="font-[family-name:var(--titres)] text-2xl">Place du village</dd>
              </div>
              <div>
                <dt className="text-[13px] uppercase tracking-[0.16em] text-[#F2C98A]">Entrée</dt>
                <dd className="font-[family-name:var(--titres)] text-2xl">Libre</dd>
              </div>
              <div>
                <dt className="text-[13px] uppercase tracking-[0.16em] text-[#F2C98A]">Avec</dt>
                <dd className="font-[family-name:var(--titres)] text-2xl">La mairie</dd>
              </div>
            </dl>
            <p className="text-[13px] text-[#E4EBDA]">Événement d&apos;exemple : l&apos;entreprise est fictive.</p>
          </div>
          <div className="relative aspect-[3/2] overflow-hidden rounded-[28px]">
            <Image src={photos.village.src} alt={photos.village.alt} fill priority sizes="(min-width: 768px) 540px, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 py-16 sm:py-24 space-y-10">
        <div className="space-y-4">
          <Surtitre>Comment on l&apos;organise</Surtitre>
          <h2 className="text-[40px] sm:text-6xl font-normal">Une fête ouverte à tous, <em className="text-[var(--accent-texte)]">ça s&apos;autorise.</em></h2>
          <p className="max-w-2xl text-lg leading-relaxed text-[var(--doux)]">
            Une tente qui reçoit du public ne se monte pas sans l&apos;autorisation de la mairie. Pour ce bal, c&apos;est la mairie
            qui nous accueille sur sa place.
          </p>
        </div>
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ETAPES.map((e, i) => (
            <li key={e.titre} className="space-y-2 border-t-2 border-[var(--encre)] pt-4">
              <p className="font-[family-name:var(--titres)] text-4xl text-[var(--accent-texte)]">{i + 1}</p>
              <h3 className="text-[26px] leading-tight">{e.titre}</h3>
              <p className="leading-relaxed text-[var(--doux)]">{e.texte}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-[var(--carte)] border-y border-[var(--trait)]">
        <div className="max-w-4xl mx-auto px-5 py-16 sm:py-24 text-center space-y-6">
          <p className="font-[family-name:var(--titres)] text-[44px] sm:text-6xl leading-[1.05]">Et si on la faisait <em className="text-[var(--accent-texte)]">chez nous&nbsp;?</em></p>
          <p className="text-lg leading-relaxed text-[var(--doux)]">
            Un comité des fêtes, une association, une commune : on monte le dossier avec la mairie. Un mariage dans le pré :
            on vient voir le terrain.
          </p>
          <Link href={`${DOSSIER}#pre`} className="inline-flex h-14 items-center rounded-full bg-[var(--accent)] px-6 text-[17px] font-semibold text-[var(--sur-accent)]">
            Voir ma tente sur mon pré
          </Link>
        </div>
      </section>
    </div>
  );
}
