import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Inscription from "../_composants/Inscription";
import { GOUTER, photos } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Le goûter numérique · Sans Soupir — site de démonstration",
  description: "Le goûter numérique de Sans Soupir : un samedi après-midi gratuit, à la médiathèque, pour poser toutes ses questions sur sa tablette. Démonstration de Canevas Havane.",
  ...adressesDeLaPage("/exemples/sans-soupir/gouter-numerique"),
};

const PROGRAMME = [
  { heure: "15 h 00", texte: "Le thé, les biscuits, et un tour de table : qu'est-ce qui t'embête ?" },
  { heure: "15 h 30", texte: "Par petites tables : appels vidéo, photos, messages, mots de passe." },
  { heure: "16 h 30", texte: "On imprime les fiches de chacun." },
  { heure: "17 h 00", texte: "Fin. Personne ne te vend rien en partant." },
];

export default function GouterNumerique() {
  return (
    <div>
      <section className="max-w-6xl mx-auto px-5 sm:px-6 pt-8 sm:pt-14 pb-14 grid gap-10 lg:grid-cols-2 lg:items-start">
        <div className="space-y-6">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--accent-texte)]">Gratuit · ouvert à tous</p>
          <h1 className="text-[44px] sm:text-7xl font-bold leading-[1.0] tracking-[-0.035em]">Le goûter numérique.</h1>
          <p className="text-xl leading-relaxed text-[var(--doux)]">Tu viens avec ta tablette, tu poses toutes tes questions. On répond, autant de fois qu&apos;il faut.</p>
          <p className="rounded-[24px] bg-[#FCE7BF] px-6 py-5 text-xl font-bold leading-snug">
            {GOUTER.date.charAt(0).toUpperCase() + GOUTER.date.slice(1)}
            <span className="block">{GOUTER.heure}, à {GOUTER.lieu}</span>
          </p>
          <div className="relative aspect-[3/2] overflow-hidden rounded-[30px]">
            <Image src={photos.gouter.src} alt={photos.gouter.alt} fill sizes="(min-width: 1024px) 540px, 100vw" className="object-cover" />
          </div>
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Dis-nous que tu viens</h2>
          <p className="text-lg text-[var(--doux)]">Juste pour prévoir les chaises et le thé. C&apos;est gratuit.</p>
          <Inscription />
        </div>
      </section>
      <section className="max-w-4xl mx-auto px-5 sm:px-6 pb-20 sm:pb-28 space-y-6">
        <h2 className="text-[38px] sm:text-5xl font-bold leading-[1.02] tracking-[-0.03em]">Le programme.</h2>
        <ol className="space-y-3">
          {PROGRAMME.map((p) => (
            <li key={p.heure} className="grid grid-cols-[96px_1fr] gap-4 rounded-[22px] bg-[var(--carte)] border border-[var(--trait)] px-5 py-4">
              <span className="font-[family-name:var(--titres)] text-xl font-bold tabular-nums">{p.heure.replace(/ /g, " ")}</span>
              <span className="text-lg leading-relaxed">{p.texte}</span>
            </li>
          ))}
        </ol>
        <p className="text-[var(--doux)]">Le lieu et la date sont des exemples : le goûter se tient avec l&apos;accord de la médiathèque, et rien n&apos;y est vendu.</p>
      </section>
    </div>
  );
}
