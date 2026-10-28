import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, EnTetePage } from "../_composants/Blocs";
import Inscription from "../_composants/Inscription";
import { GOUTER, photos } from "../_composants/donnees";

// Le lancement de la vidéo « Créer une marque » : « un goûter numérique gratuit, à la
// médiathèque. Tu viens avec ta tablette, tu poses toutes tes questions. »
export const metadata: Metadata = {
  title: "Le goûter numérique — Sans Soupir, site de démonstration",
  description: "Le goûter numérique de Sans Soupir : un samedi après-midi gratuit, à la médiathèque, pour poser toutes ses questions sur sa tablette. Démonstration de Canevas Havane.",
  ...adressesDeLaPage("/exemples/sans-soupir/gouter-numerique"),
};

const PROGRAMME = [
  { heure: "15 h 00", texte: "Le thé, les biscuits, et un tour de table : qu'est-ce qui t'embête ?" },
  { heure: "15 h 30", texte: "Par petites tables : appels vidéo, photos, messages, mots de passe." },
  { heure: "16 h 30", texte: "On imprime les fiches de chacun." },
  { heure: "17 h 00", texte: "Fin. Personne ne te vend rien en partant." },
];

export default function GouterNumerique() {
  return (
    <main>
      <EnTetePage surtitre="Gratuit · ouvert à tous" titre="Le goûter *numérique.*" teinte="#F6AE2D" photo={photos.gouter}>
        Tu viens avec ta tablette, tu poses toutes tes questions. {GOUTER.date.charAt(0).toUpperCase() + GOUTER.date.slice(1)}, {GOUTER.heure}, à {GOUTER.lieu}.
      </EnTetePage>

      <section className="mx-auto grid max-w-6xl gap-14 px-5 py-24 sm:px-8 lg:grid-cols-2 lg:items-start">
        <div className="space-y-6">
          <TitreRevele texte="Dis-nous *que tu viens.*" className="text-[clamp(2.6rem,5.4vw,4.4rem)] font-extrabold leading-[0.96] tracking-[-0.04em]" classeAccent="text-[var(--accent-texte)]" />
          <p className="text-[20px] text-[var(--doux)]">Juste pour prévoir les chaises et le thé. C&apos;est gratuit.</p>
          <Apparition de="zoom"><Inscription /></Apparition>
        </div>
        <div className="space-y-6">
          <h2 className="text-[clamp(2.2rem,4vw,3.2rem)] font-extrabold leading-tight">Le programme</h2>
          <ol className="space-y-3">
            {PROGRAMME.map((p, i) => (
              <Apparition as="li" key={p.heure} delai={i * 120} className="grid grid-cols-[96px_1fr] gap-4 rounded-[1.6rem] border border-[var(--trait)] bg-[var(--carte)] px-5 py-4">
                <span className="font-[family-name:var(--titres)] text-xl font-extrabold">{p.heure}</span>
                <span className="text-lg leading-relaxed">{p.texte}</span>
              </Apparition>
            ))}
          </ol>
          <div className="relative aspect-[3/2] overflow-hidden rounded-[2.4rem]">
            <Image src={photos.pelote.src} alt={photos.pelote.alt} fill sizes="(min-width: 1024px) 540px, 100vw" className="object-cover object-[50%_60%]" />
          </div>
          <p className="text-[var(--doux)]">Le lieu et la date sont des exemples : le goûter se tient avec l&apos;accord de la médiathèque, et rien n&apos;y est vendu.</p>
        </div>
      </section>

      <AppelFinal />
    </main>
  );
}
