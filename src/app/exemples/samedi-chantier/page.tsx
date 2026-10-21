import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DEROULE, DOSSIER, MACHINES, PLANNING, QUESTIONS, SAMEDIS, euros, machine, photos } from "./_composants/donnees";
import { AppelFinal, CarteMachine, Faq, Repere, Titre } from "./_composants/Blocs";
import QuoiFaire from "./_composants/QuoiFaire";

// L'accueil de Samedi Chantier. La vidéo : « Sur l'accueil, pas de catalogue. Une
// seule question : tu veux faire quoi ? » puis « le site te dit quelle machine,
// combien de jours, et combien ça coûte », l'option « avec chauffeur » bien visible,
// et les vraies disponibilités. Autour : le samedi heure par heure, six machines (pas
// trois cents), la DT-DICT, les prix sans « sur demande », les questions.
export const metadata: Metadata = {
  title: "Samedi Chantier — site de démonstration",
  description: "Site de démonstration d'un loueur de mini-pelles imaginaire, réalisé par Canevas Havane : pas de catalogue, une question — tu veux faire quoi ?",
  ...adressesDeLaPage("/exemples/samedi-chantier"),
};

export default function SamediChantier() {
  const mp15 = PLANNING.find((l) => l.id === "mp15")!;

  return (
    <div>
      {/* 1 · L'ouverture : une question, pas un catalogue. */}
      <section className="px-3 pt-3 sm:px-5 sm:pt-5">
        <div className="max-w-7xl mx-auto rounded-[22px] border border-[var(--encre)] bg-[var(--accent)] text-[var(--sur-accent)] px-5 pt-6 pb-7 sm:px-10 sm:py-12 grid gap-7 lg:grid-cols-[1fr_1fr] lg:gap-14 lg:items-start">
          <div className="space-y-5 lg:pt-4">
            <p className="inline-flex rounded-full border border-[var(--encre)] px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-[0.12em]">
              Mini-pelles · livrées chez toi
            </p>
            <Titre niveau={1} className="text-[52px]! leading-[0.92]! sm:text-8xl!">Tu veux faire quoi&nbsp;?</Titre>
            <p className="max-w-md text-[17px] font-medium leading-snug">
              Pas de catalogue de trois cents machines. Dis-nous ton chantier : on te dit la machine, les jours, et le prix.
            </p>
          </div>
          <QuoiFaire />
        </div>
      </section>

      {/* 2 · Le samedi, heure par heure. */}
      <section className="mt-14 sm:mt-20 bg-[var(--sombre)] text-[var(--sur-sombre)] [--accent-texte:#F2B21B] [--doux:#C9C2B3]">
        <div className="relative h-[300px] sm:h-[460px] overflow-hidden">
          <Image src={photos.godet.src} alt={photos.godet.alt} fill sizes="100vw" className="object-cover" priority={false} />
          <div className="absolute left-4 bottom-4 sm:left-8 sm:bottom-8 rotate-[-3deg] rounded-[14px] bg-[var(--fond)] text-[var(--encre)] px-5 py-4 shadow-xl">
            <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#4A463E]">Samedi</p>
            <p className="font-[family-name:var(--titres)] text-5xl font-black tabular-nums leading-none">18 h</p>
            <p className="font-semibold">La tranchée est faite ✓</p>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-5 py-16 sm:py-24 grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-5">
            <Repere numero="01" clair>Ce qu&apos;on loue vraiment</Repere>
            <Titre>On ne loue pas une mini-pelle. <span className="text-[var(--accent-texte)]">On loue ton samedi.</span></Titre>
            <p className="text-lg leading-relaxed text-[var(--doux)]">
              Une machine choisie pour que ton chantier tienne dans la journée, livrée la veille,
              reprise le lundi. Toi, tu as juste ton samedi à vivre.
            </p>
          </div>
          <ol className="border-l border-[var(--sur-sombre)]/40">
            {DEROULE.map((d) => (
              <li key={d.quand} className="relative pl-7 pb-8 last:pb-0">
                <span aria-hidden="true" className="absolute -left-[7px] top-1.5 h-3.5 w-3.5 rounded-full bg-[var(--accent)]" />
                <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-[var(--accent-texte)] tabular-nums">{d.quand}</p>
                <h3 className="mt-1 text-2xl font-black uppercase tracking-[-0.01em]">{d.titre}</h3>
                <p className="mt-1 leading-relaxed text-[var(--doux)]">{d.texte}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 3 · Avec chauffeur, bien visible. */}
      <section className="max-w-6xl mx-auto px-5 py-16 sm:py-24">
        <div className="grid gap-8 rounded-[22px] border border-[var(--encre)] bg-[var(--carte)] p-6 sm:p-10 md:grid-cols-[1.2fr_1fr] md:items-center">
          <div className="space-y-4">
            <Repere numero="02">L&apos;option qu&apos;on cherche</Repere>
            <Titre>Pas envie de conduire&nbsp;? <span className="text-[var(--accent-texte)]">Avec chauffeur.</span></Titre>
            <p className="text-lg leading-relaxed">
              C&apos;est ce que beaucoup de gens cherchent sans le trouver. Ici, c&apos;est une case à cocher :
              notre chauffeur arrive avec la machine, creuse ta tranchée, et repart le soir.
            </p>
          </div>
          <div className="rounded-[18px] bg-[var(--accent)] border border-[var(--encre)] p-6 space-y-3">
            <p className="text-[12px] font-bold uppercase tracking-[0.14em]">Mini-pelle 1,5 t avec chauffeur</p>
            <p className="font-[family-name:var(--titres)] text-6xl font-black tabular-nums leading-none">{euros(machine("mp15").chauffeur!)}</p>
            <p className="font-semibold">TTC la journée · carburant compris · exemple</p>
            <Link href={`${DOSSIER}/mini-pelle-1-5-tonne#prix`} className="inline-flex h-12 items-center rounded-full bg-[var(--encre)] px-6 font-bold uppercase tracking-[0.04em] text-[var(--fond)]">
              Calculer mon prix
            </Link>
          </div>
        </div>
      </section>

      {/* 4 · Six machines, pas trois cents. */}
      <section id="machines" className="scroll-mt-20 border-t border-[var(--encre)]">
        <div className="max-w-6xl mx-auto px-5 py-16 sm:py-24 space-y-10">
          <div className="grid gap-5 md:grid-cols-2 md:items-end">
            <div className="space-y-4">
              <Repere numero="03">Les machines</Repere>
              <Titre>Six machines. <span className="text-[var(--accent-texte)]">Pas trois cents.</span></Titre>
            </div>
            <p className="text-lg leading-relaxed">
              Celles qui font les chantiers d&apos;un week-end, avec leur prix à la journée. Les caractéristiques
              sont celles du fabricant.
            </p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {MACHINES.map((m) => (
              <li key={m.id}>
                <CarteMachine m={m} lien={m.id === "mp15" ? `${DOSSIER}/mini-pelle-1-5-tonne` : undefined} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5 · Les vrais samedis libres. */}
      <section className="bg-[var(--carte)] border-y border-[var(--encre)]">
        <div className="max-w-6xl mx-auto px-5 py-16 sm:py-24 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div className="space-y-5">
            <Repere numero="04">Les disponibilités</Repere>
            <Titre>Les vrais samedis libres. <span className="text-[var(--accent-texte)]">Comme à l&apos;hôtel.</span></Titre>
            <p className="text-lg leading-relaxed">
              Machine par machine, samedi par samedi. Tu vois ce qui est libre, tu réserves en ligne, et la case
              passe à « réservé ». Pas d&apos;appel, pas de « je vous rappelle ».
            </p>
            <Link href={`${DOSSIER}/disponibilites`} className="inline-flex h-14 items-center rounded-full bg-[var(--encre)] px-7 font-black uppercase tracking-[0.04em] text-[var(--fond)]">
              Tous les samedis
            </Link>
          </div>
          <div className="rounded-[18px] border border-[var(--encre)] p-5 space-y-4">
            <p className="flex items-baseline justify-between gap-3">
              <span className="font-[family-name:var(--titres)] text-xl font-black uppercase">Mini-pelle 1,5 t</span>
              <span className="text-[13px] font-semibold text-[var(--doux)]">avril 2027</span>
            </p>
            <ul className="grid grid-cols-4 gap-2">
              {SAMEDIS.map((s, i) => {
                const pris = mp15.etats[i] === "pris";
                return (
                  <li key={s.id} className={`flex h-[64px] flex-col items-center justify-center rounded-[10px] border text-center ${pris ? "border-[var(--trait)] bg-[var(--fond)] text-[var(--doux)]" : "border-[var(--encre)]"}`}>
                    <span className="text-[13px] font-bold">{s.court}</span>
                    <span className="text-[11px] font-bold uppercase tracking-[0.06em]">{pris ? "Pris" : "Libre"}</span>
                  </li>
                );
              })}
            </ul>
            <p className="text-[13px] text-[var(--doux)]">Disponibilités d&apos;exemple : l&apos;entreprise est fictive.</p>
          </div>
        </div>
      </section>

      {/* 6 · La DT-DICT, avant le premier coup de godet. */}
      <section className="max-w-6xl mx-auto px-5 py-16 sm:py-24 grid gap-10 md:grid-cols-[1fr_1fr] md:items-center">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[22px] border border-[var(--encre)]">
          <Image src={photos.tranchee.src} alt={photos.tranchee.alt} fill sizes="(min-width: 768px) 540px, 100vw" className="object-cover" />
        </div>
        <div className="space-y-5">
          <Repere numero="05">Avant de creuser</Repere>
          <Titre>Ta DT-DICT&nbsp;: <span className="text-[var(--accent-texte)]">on t&apos;aide.</span></Titre>
          <p className="text-lg leading-relaxed">
            Sous ton jardin passent peut-être du gaz, de l&apos;électricité, de l&apos;eau ou la fibre. Avant de
            creuser, on déclare les travaux aux exploitants de ces réseaux : c&apos;est la DT-DICT, et elle vaut
            aussi pour les particuliers.
          </p>
          <p className="text-lg leading-relaxed">On la remplit avec toi, au téléphone. C&apos;est gratuit, et c&apos;est fait avant la livraison.</p>
          <Link href={`${DOSSIER}/dt-dict`} className="inline-flex font-bold underline decoration-[var(--accent)] decoration-[3px] underline-offset-4">
            Ce qu&apos;il te faut pour la remplir →
          </Link>
        </div>
      </section>

      {/* 7 · Les prix, sans « sur demande ». */}
      <section className="border-t border-[var(--encre)]">
        <div className="max-w-6xl mx-auto px-5 py-16 sm:py-24 space-y-10">
          <div className="space-y-4">
            <Repere numero="06">Les prix</Repere>
            <Titre>Pas de « prix sur demande ». <span className="text-[var(--accent-texte)]">Les prix.</span></Titre>
          </div>
          <div className="overflow-hidden rounded-[18px] border border-[var(--encre)] bg-[var(--carte)]">
            <table className="w-full text-left">
              <caption className="sr-only">Prix TTC d&apos;exemple, livraison et reprise comprises à 20 km</caption>
              <thead className="bg-[var(--encre)] text-[var(--fond)] text-[12px] uppercase tracking-[0.12em]">
                <tr>
                  <th scope="col" className="px-4 py-3 font-bold">Machine</th>
                  <th scope="col" className="px-4 py-3 font-bold text-right">1 jour</th>
                  <th scope="col" className="px-4 py-3 font-bold text-right hidden sm:table-cell">Jour en plus</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--trait)]">
                {MACHINES.map((m) => (
                  <tr key={m.id}>
                    <th scope="row" className="px-4 py-3.5 font-semibold">{m.court}</th>
                    <td className="px-4 py-3.5 text-right font-[family-name:var(--titres)] font-black tabular-nums">{euros(m.jour)}</td>
                    <td className="px-4 py-3.5 text-right tabular-nums hidden sm:table-cell">{euros(m.jourEnPlus)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[15px] leading-relaxed text-[var(--doux)]">
            Prix TTC d&apos;exemple. Livraison et reprise comprises dans un rayon de 20 km. Caution de 1 500 €, jamais
            encaissée si la machine revient comme elle est partie. Carburant : la machine arrive avec le plein.
          </p>
        </div>
      </section>

      {/* 8 · Ce qui arrive avec la machine. */}
      <section className="bg-[var(--carte)] border-y border-[var(--encre)]">
        <div className="max-w-6xl mx-auto px-5 py-16 sm:py-24 grid gap-10 md:grid-cols-[1.1fr_1fr] md:items-center">
          <div className="space-y-6">
            <Repere numero="07">Compris</Repere>
            <Titre>Ce qui arrive <span className="text-[var(--accent-texte)]">avec la machine.</span></Titre>
            <ul className="grid gap-3 sm:grid-cols-2">
              {["La livraison, vendredi soir", "Deux godets, 30 et 60 cm", "Vingt minutes de prise en main", "La reprise, lundi matin", "L'aide pour la DT-DICT", "Un numéro qui répond le samedi"].map((x) => (
                <li key={x} className="flex items-start gap-3 rounded-[12px] border border-[var(--trait)] px-4 py-3 font-semibold">
                  <span aria-hidden="true" className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[var(--accent)] text-[12px] font-black">✓</span>
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[22px] border border-[var(--encre)]">
            <Image src={photos.godets.src} alt={photos.godets.alt} fill sizes="(min-width: 768px) 520px, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      {/* 9 · Les questions. */}
      <section className="max-w-6xl mx-auto px-5 py-16 sm:py-24 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-4">
          <Repere numero="08">Questions</Repere>
          <Titre>Avant ton <span className="text-[var(--accent-texte)]">samedi.</span></Titre>
        </div>
        <Faq questions={QUESTIONS} />
      </section>

      <AppelFinal />
    </div>
  );
}
