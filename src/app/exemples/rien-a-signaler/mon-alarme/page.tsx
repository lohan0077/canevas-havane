import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { ACCENT_CLAIR, AppelFinal, Appli, EnTetePage, Surtitre } from "../_composants/Blocs";
import MonAlarme from "../_composants/MonAlarme";
import { KITS, NUANCE, PRIX_OUVERTURE, euros, photos } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mon alarme — Rien à Signaler, site de démonstration",
  description:
    "Ton animal d'abord, puis ton logement et ses ouvertures : le kit d'alarme qui va avec, et son prix TTC pose comprise. Sans télésurveillance. Site de démonstration.",
  ...adressesDeLaPage("/exemples/rien-a-signaler/mon-alarme"),
};

export default function PageMonAlarme() {
  return (
    <main>
      <EnTetePage surtitre="Mon alarme" titre="Ton animal d'abord. *Le reste ensuite.*" photo={photos.chat} origine="50% 35%">
        Trois questions, et le kit qui va avec : la centrale, les détecteurs, les sirènes, posés et réglés
        chez toi. Sans télésurveillance, sans abonnement.
      </EnTetePage>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-8 md:py-24 lg:grid-cols-[1.15fr_0.85fr]">
        <Apparition de="zoom">
          <Appli titre="Mon alarme" etat="Trois questions">
            <MonAlarme complet />
          </Appli>
        </Apparition>
        <Apparition delai={150} className="space-y-5 self-start">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-[var(--sombre)]">
            <Image src={photos.chatSoleil.src} alt={photos.chatSoleil.alt} fill sizes="(min-width: 1024px) 34vw, 100vw" className="object-cover" />
          </div>
          <div className="rounded-[2rem] bg-[var(--sombre)] p-7 text-[var(--sur-sombre)]">
            <p className="font-[family-name:var(--titres)] text-sm uppercase tracking-[0.18em]">Les prix · TTC, pose comprise</p>
            <ul className="mt-3 divide-y divide-white/15">
              {Object.values(KITS).map((k) => (
                <li key={k.nom} className="flex flex-wrap items-baseline justify-between gap-x-6 py-3.5">
                  <span>
                    <span className="block font-[family-name:var(--titres)] text-xl font-semibold">{k.nom}</span>
                    <span className="block text-sm text-[var(--sur-sombre)]/90">
                      {k.ouvertures} ouvertures · {k.mouvements} détecteur{k.mouvements > 1 ? "s" : ""} de mouvement · {k.exterieure ? "2 sirènes" : "1 sirène"}
                    </span>
                  </span>
                  <span className="font-[family-name:var(--titres)] text-3xl font-semibold tabular-nums tracking-[-0.03em]">{euros(k.prix)}</span>
                </li>
              ))}
              <li className="flex flex-wrap items-baseline justify-between gap-x-6 py-3.5">
                <span className="font-semibold">Une ouverture de plus</span>
                <span className="font-[family-name:var(--titres)] text-2xl font-semibold tabular-nums">{euros(PRIX_OUVERTURE)}</span>
              </li>
            </ul>
            <p className="mt-2 text-sm text-[var(--sur-sombre)]/90">Exemples · sans abonnement · sans télésurveillance.</p>
          </div>
        </Apparition>
      </section>

      <section className="border-y border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 md:grid-cols-2 md:py-28">
          <div className="space-y-6">
            <Apparition><Surtitre>Honnêtement</Surtitre></Apparition>
            <TitreRevele
              texte={"Les détecteurs «\u00a0animaux\u00a0», *et leurs limites.*"}
              className="font-[family-name:var(--titres)] text-[clamp(2.2rem,4.2vw,3.8rem)] font-semibold leading-[1] tracking-[-0.05em]"
              classeAccent={ACCENT_CLAIR}
            />
          </div>
          <Apparition delai={150} className="space-y-5 text-lg leading-relaxed">
            <p>{NUANCE}</p>
            <p>
              Ce qu&apos;on fait : choisir le matériel, le placer hors des perchoirs, le régler à la pose, et revenir
              si ça ne va pas. Ce qu&apos;on ne fait pas : promettre qu&apos;il ne sonnera jamais.
            </p>
            <p className="text-[var(--doux)]">
              Et personne ne regarde chez toi : Rien à Signaler ne fait pas de télésurveillance. Si la sirène sonne,
              ton téléphone le sait, et c&apos;est toi qui décides.
            </p>
          </Apparition>
        </div>
      </section>

      <AppelFinal />
    </main>
  );
}
