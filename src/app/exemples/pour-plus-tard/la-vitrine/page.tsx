import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import { MUR, photos } from "../_composants/donnees";
import { Bouton, Cartel } from "../_composants/Blocs";
import DepotPhoto from "../_composants/DepotPhoto";

// Le coup de lancement de la vidéo : « Apporte la plus vieille photo de ta famille. On
// l'expose en vitrine, avec ton accord. » Le mur est dessiné (des cadres et des années,
// aucune photo réelle) ; le dépôt se prépare ici, et rien n'est envoyé.
export const metadata: Metadata = {
  title: "La vitrine · Pour Plus Tard — site de démonstration",
  description: "Apporte la plus vieille photo de ta famille : exposée en vitrine en novembre, avec l'accord de chacun. Site de démonstration réalisé par Canevas Havane.",
  ...adressesDeLaPage("/exemples/pour-plus-tard/la-vitrine"),
};

const REGLES = [
  { titre: "Avec l'accord de chacun", texte: "Des personnes sur la photo si elles sont vivantes, ou de leurs proches. Sans accord, la photo ne va pas en vitrine." },
  { titre: "L'original repart avec toi", texte: "On la scanne devant toi, au comptoir. C'est un tirage qui est exposé, jamais ta photo." },
  { titre: "Plutôt une photo de famille", texte: "Un vieux portrait de studio reste protégé soixante-dix ans après la mort de son photographe. Une photo prise par un grand-oncle, elle, est à la famille." },
];

export default function LaVitrine() {
  return (
    <main>
      <section className="max-w-6xl mx-auto px-5 pt-8 pb-14 sm:pt-12 space-y-8">
        <Cartel numero="1">La vitrine · du 2 au 28 novembre 2026</Cartel>
        <h1 className="text-[48px] sm:text-7xl font-normal max-w-4xl">
          Apporte ta plus vieille <span className="italic">photo.</span>
        </h1>
        <p className="text-lg leading-relaxed max-w-2xl">
          Du 2 au 28 novembre, la vitrine du studio devient un mur : les plus
          vieilles photos de famille du quartier, une par famille, de la plus ancienne à la
          plus récente. Et en bas à droite, un cadre vide.
        </p>
      </section>

      <section aria-label="Le mur de la vitrine, dessiné" className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="max-w-6xl mx-auto px-5 py-14 sm:py-20 space-y-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em]">En vitrine · les plus vieilles photos du quartier</p>
          <ul className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            {MUR.map((annee, i) => (
              <li key={annee} className={`bg-[#F3EBDD] p-2 pb-1 ${i % 3 === 1 ? "rotate-[1.5deg]" : i % 3 === 2 ? "-rotate-1" : ""}`}>
                <div aria-hidden="true" className={`aspect-[4/5] ${["bg-[linear-gradient(#b9a17f_0_55%,#7a6249_55%)]", "bg-[radial-gradient(circle_at_50%_40%,#cdb48e_0_30%,#8c735a_31%)]", "bg-[linear-gradient(160deg,#d3bf9c_0_50%,#6e5946_50%)]"][i % 3]} [filter:sepia(.4)]`} />
                <p className="pt-1 text-center text-sm font-bold text-[#3B2F2A] tabular-nums">{annee}</p>
              </li>
            ))}
            <li className="border-2 border-dashed border-[#F3EBDD] p-2 pb-1 grid">
              <div className="aspect-[4/5] grid place-items-center text-center font-[family-name:var(--titres)] text-xl italic">Et nous&nbsp;?</div>
              <p className="pt-1 text-center text-sm font-bold tabular-nums">2026</p>
            </li>
          </ul>
          <p className="text-sm">Cadres dessinés : aucune photo réelle n&apos;est montrée ici, l&apos;entreprise est fictive.</p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 py-16 sm:py-20 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
        <div className="space-y-8">
          <div className="space-y-4">
            <Cartel numero="2">Les règles du mur</Cartel>
            <h2 className="text-4xl sm:text-5xl font-normal">Trois règles, <span className="italic">pas une de plus.</span></h2>
          </div>
          <ol className="space-y-6">
            {REGLES.map((r, i) => (
              <li key={r.titre} className="border-t border-[var(--encre)] pt-4 space-y-2">
                <p className="text-xs font-bold tabular-nums">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="text-2xl font-normal">{r.titre}</h3>
                <p className="leading-relaxed text-[var(--doux)]">{r.texte}</p>
              </li>
            ))}
          </ol>
          <div className="relative aspect-[16/9] overflow-hidden">
            <Image src={photos.pageQuiAttend.src} alt={photos.pageQuiAttend.alt} fill sizes="(min-width: 1024px) 520px, 100vw" className="object-cover" />
          </div>
        </div>
        <div className="space-y-4">
          <Cartel numero="3">Préparer ton dépôt</Cartel>
          <DepotPhoto />
        </div>
      </section>

      <section className="border-t border-[var(--encre)]">
        <div className="max-w-6xl mx-auto px-5 py-16 sm:py-20 text-center space-y-6">
          <h2 className="text-4xl sm:text-6xl font-normal max-w-3xl mx-auto">
            Et toi, <span className="italic">qu&apos;est-ce que tu laisseras&nbsp;?</span>
          </h2>
          <p className="text-lg leading-relaxed max-w-xl mx-auto">
            Chacun repart du mur avec la même question. La réponse tient dans une boîte de
            vingt tirages.
          </p>
          <Bouton href="/exemples/pour-plus-tard/la-boite">Voir la boîte</Bouton>
        </div>
      </section>
    </main>
  );
}
