import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import { KITS, NUANCE, PRIX_OUVERTURE, euros, photos } from "../_composants/donnees";
import MonAlarme from "../_composants/MonAlarme";

export const metadata: Metadata = {
  title: "Mon alarme · Rien à Signaler — site de démonstration",
  description: "Ton animal d'abord, puis ton logement et ses ouvertures : le kit d'alarme qui va avec, et son prix TTC pose comprise. Marque d'alarmes imaginaire, site de démonstration.",
  ...adressesDeLaPage("/exemples/rien-a-signaler/mon-alarme"),
};

export default function PageMonAlarme() {
  return (
    <div>
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-16 grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="space-y-5 min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-texte)]">Mon alarme</p>
          <h1 className="text-[3rem] sm:text-7xl font-bold tracking-[-0.045em] leading-[0.95]">Ton animal d&apos;abord. <span className="text-[var(--accent-texte)]">Le reste ensuite.</span></h1>
          <p className="text-xl leading-relaxed">
            Trois questions, et le kit qui va avec : la centrale, les détecteurs, les sirènes, posés et
            réglés chez toi.
          </p>
          <div className="hidden lg:block relative aspect-[4/3] rounded-[24px] overflow-hidden bg-[var(--sombre)]">
            <Image src={photos.chatSoleil.src} alt={photos.chatSoleil.alt} fill sizes="(min-width: 1024px) 460px, 100vw" className="object-cover" />
          </div>
        </div>
        <div className="min-w-0">
          <MonAlarme complet />
        </div>
        <div className="lg:hidden relative aspect-[4/3] rounded-[24px] overflow-hidden bg-[var(--sombre)]">
          <Image src={photos.chatSoleil.src} alt={photos.chatSoleil.alt} fill sizes="100vw" className="object-cover" />
        </div>
      </section>

      <section className="border-y border-[var(--trait)] bg-[#E8DFCC]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 grid gap-10 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-[-0.04em]">Les détecteurs « animaux », honnêtement.</h2>
            <p className="text-lg leading-relaxed">{NUANCE}</p>
            <p className="text-lg leading-relaxed">
              Ce qu&apos;on fait : choisir le matériel, le placer hors de ses perchoirs, le régler à la pose,
              et revenir si ça ne va pas. Ce qu&apos;on ne fait pas : promettre qu&apos;il ne sonnera jamais.
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-[-0.04em]">Les prix.</h2>
            <ul className="divide-y divide-[var(--trait)] border-y-2 border-[var(--encre)]">
              {Object.values(KITS).map((k) => (
                <li key={k.nom} className="flex flex-wrap items-baseline justify-between gap-x-6 py-4">
                  <span>
                    <span className="block text-xl font-bold">{k.nom}</span>
                    <span className="block text-sm">
                      {k.ouvertures} ouvertures · {k.mouvements} détecteur{k.mouvements > 1 ? "s" : ""} de mouvement · {k.exterieure ? "2 sirènes" : "1 sirène"}
                    </span>
                  </span>
                  <span className="font-[family-name:var(--titres)] text-3xl font-bold tabular-nums">{euros(k.prix)}</span>
                </li>
              ))}
              <li className="flex flex-wrap items-baseline justify-between gap-x-6 py-4">
                <span className="font-semibold">Une ouverture de plus</span>
                <span className="font-[family-name:var(--titres)] text-2xl font-bold tabular-nums">{euros(PRIX_OUVERTURE)}</span>
              </li>
            </ul>
            <p className="text-sm text-[var(--doux)]">TTC, pose comprise · exemples · sans abonnement · sans télésurveillance.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
