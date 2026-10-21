import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, photos } from "../_composants/donnees";
import Dimanche from "../_composants/Dimanche";

export const metadata: Metadata = {
  title: "Le message du dimanche · Rien à Signaler — site de démonstration",
  description: "Chaque dimanche à 9 h, un seul message : le rapport automatique de ton alarme. Sans télésurveillance. Marque d'alarmes imaginaire, site de démonstration.",
  ...adressesDeLaPage("/exemples/rien-a-signaler/le-dimanche"),
};

const CE_QUIL_DIT = [
  { titre: "Les alertes de la semaine", texte: "Combien de fois la sirène a sonné, et quand. La plupart des semaines : zéro." },
  { titre: "Les fausses alertes", texte: "Celles que tu as arrêtées depuis ton téléphone. S'il y en a, on vient régler." },
  { titre: "L'état du matériel", texte: "Une pile faible, un détecteur qui ne répond plus : tu le sais avant que ça compte." },
];

export default function LeDimanche() {
  return (
    <div>
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-16 grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div className="space-y-5 min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-texte)]">Chaque dimanche, 9 h</p>
          <h1 className="text-[3rem] sm:text-7xl font-bold tracking-[-0.045em] leading-[0.95]">Un seul message. <span className="text-[var(--accent-texte)]">Rien à signaler.</span></h1>
          <p className="text-xl leading-relaxed">
            Pas de notification à chaque porte ouverte. Une fois par semaine, le dimanche matin, le
            résumé de ta semaine. La plupart du temps, il tient en une ligne.
          </p>
        </div>
        <div className="min-w-0">
          <Dimanche />
        </div>
      </section>

      <section className="border-y border-[var(--trait)] bg-[var(--carte)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 space-y-8">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-[-0.04em]">Ce que dit le message.</h2>
          <ul className="grid gap-3 md:grid-cols-3">
            {CE_QUIL_DIT.map((c) => (
              <li key={c.titre} className="rounded-[22px] bg-[var(--fond)] p-6 space-y-2">
                <h3 className="text-2xl font-bold tracking-[-0.02em]">{c.titre}</h3>
                <p className="text-lg leading-relaxed">{c.texte}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-center">
        <div className="relative aspect-[3/4] rounded-[26px] overflow-hidden bg-[var(--sombre)]">
          <Image src={photos.cle.src} alt={photos.cle.alt} fill sizes="(min-width: 768px) 480px, 100vw" className="object-cover" />
        </div>
        <div className="space-y-5">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-[-0.04em]">Qui l&apos;écrit&nbsp;? Personne.</h2>
          <p className="text-xl leading-relaxed">
            C&apos;est un rapport automatique de ton alarme : la centrale compte ce qu&apos;elle a enregistré,
            et l&apos;application te l&apos;envoie. Rien à Signaler ne fait pas de télésurveillance : aucune
            personne ne reçoit tes alertes, aucune personne ne regarde chez toi. Si la sirène sonne, c&apos;est
            ton téléphone qui le sait, et c&apos;est toi qui décides.
          </p>
          <Link href={`${DOSSIER}/mon-alarme`} className="inline-flex rounded-full bg-[var(--encre)] text-[var(--fond)] px-7 py-3.5 text-lg font-semibold">Composer mon alarme</Link>
        </div>
      </section>
    </div>
  );
}
