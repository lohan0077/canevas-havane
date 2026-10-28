import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, FORMULE, photos } from "../_composants/donnees";
import { AppelFinal, Programme } from "../_composants/Blocs";

// La vidéo : « Et sur le site, pas de "ma vie a changé". Juste le programme des trois
// heures. » La page s'ouvre sur la phrase barrée, puis les trois heures, puis ce qui
// n'est pas promis.
export const metadata: Metadata = {
  title: "Le programme · Dimanche Soir — site de démonstration",
  description: "Le programme des trois heures de coaching de Dimanche Soir, cabinet imaginaire : la question, les options, ce que tu testes. Aucune promesse de résultat.",
  ...adressesDeLaPage("/exemples/dimanche-soir/programme"),
};

const PAS_PROMIS = ["Que ta question sera « résolue »", "Que tu sauras quoi faire en sortant", "Que ta vie va changer"];

export default function ProgrammePage() {
  return (
    <main>
      <section data-film="programme" className="max-w-6xl mx-auto px-5 pt-10 pb-16 sm:pt-16 sm:pb-24">
        <Programme titreNiveau={1} />
      </section>

      <section className="bg-[var(--sombre)]">
        <div className="max-w-6xl mx-auto px-5 py-16 sm:py-24 grid gap-10 md:grid-cols-2 md:items-center">
          <div className="space-y-5">
            <h2 className="text-5xl sm:text-6xl">Ce qui n&apos;est <span className="italic text-[var(--accent-texte)]">pas promis.</span></h2>
            <ul className="space-y-3">
              {PAS_PROMIS.map((p) => (
                <li key={p} className="flex gap-3 text-xl"><span aria-hidden="true" className="text-[var(--accent-texte)]">✕</span>{p}</li>
              ))}
            </ul>
            <p className="text-lg leading-relaxed text-[var(--doux)]">
              Personne ne peut le savoir d&apos;avance. Ce qui est promis, c&apos;est le format : trois
              heures, dans cet ordre, avec ta question au centre.
            </p>
          </div>
          <div className="relative aspect-[2/3] max-h-[520px] w-full overflow-hidden rounded-[28px]">
            <Image src={photos.abatJour.src} alt={photos.abatJour.alt} fill sizes="(min-width: 768px) 440px, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 py-16 sm:py-20 grid gap-6 md:grid-cols-3">
        {[
          { t: "Trois soirs", d: "Un par semaine, le mardi ou le jeudi, à 19 h ou 20 h." },
          { t: "Une heure chacun", d: "Au cabinet ou en visio. La même heure, trois semaines de suite." },
          { t: `${FORMULE.prix} TTC`, d: "Les trois séances, payées une par une, 90 € TTC chacune (exemple)." },
        ].map((x) => (
          <div key={x.t} className="rounded-[28px] bg-[var(--carte)] p-7 space-y-2">
            <h2 className="text-4xl italic">{x.t}</h2>
            <p className="leading-relaxed text-[var(--doux)]">{x.d}</p>
          </div>
        ))}
        <Link href={`${DOSSIER}/reserver`} className="md:col-span-3 inline-flex min-h-[56px] items-center justify-center rounded-full bg-[var(--accent)] text-[var(--sur-accent)] text-lg font-semibold">
          Choisir mes trois soirs
        </Link>
      </section>

      <AppelFinal />
    </main>
  );
}
