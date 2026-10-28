import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DEROULE, DOSSIER, FAQ, MONTURES, entreprise, euros, photos } from "./_composants/donnees";
import Miroir from "./_composants/Miroir";
import Seance from "./_composants/Seance";
import Polaroids from "./_composants/Polaroids";
import { Verres } from "./_composants/Visage";

// Le site de la boutique imaginée dans la vidéo « Si je devais créer une boutique
// d'opticien » : le miroir te montre à l'envers ; À l'Endroit vend ton visage tel
// que les autres le voient. Une séance de trente minutes, cinq montures, un écran
// qui ne t'inverse pas, et les photos à emporter.
export const metadata: Metadata = {
  title: "À l'Endroit — site de démonstration",
  description: "Site de démonstration d'une boutique d'opticien imaginaire, réalisé par Canevas Havane : ton miroir te montre à l'envers, ici tu te vois comme on te voit.",
  ...adressesDeLaPage("/exemples/a-l-endroit"),
};

const Petit = ({ children, clair = false }: { children: React.ReactNode; clair?: boolean }) => (
  <p className={`text-xs font-bold uppercase tracking-[0.22em] ${clair ? "text-[#F29A84]" : "text-[var(--accent-texte)]"}`}>{children}</p>
);

export default function ALEndroit() {
  return (
    <main>
      {/* 1. Le nom, et son reflet */}
      <section className="mx-auto max-w-6xl px-5 pt-8 sm:pt-12">
        <h1 className="sr-only">À l&apos;Endroit, opticien : tu te vois comme on te voit</h1>
        <div aria-hidden="true" className="select-none font-[family-name:var(--titres)] leading-[0.82] whitespace-nowrap text-[16vw] sm:text-[9.5rem] lg:text-[11.5rem]">
          <span className="block">À l&apos;Endroit</span>
          <span className="block -scale-x-100 text-right text-[#E4E1DB]">À l&apos;Endroit</span>
        </div>
        <div className="mt-8 grid gap-8 md:grid-cols-[1fr_1.1fr] md:items-end">
          <div className="space-y-6">
            <p className="font-[family-name:var(--titres)] text-3xl sm:text-4xl leading-tight">
              Tu te vois <em>comme on te voit.</em>
            </p>
            <p className="max-w-md text-lg leading-relaxed">
              Opticien à {entreprise.ville}. Ici, on choisit ses lunettes devant un écran qui ne
              t&apos;inverse pas, et on repart avec les photos.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="#seance" className="inline-flex min-h-13 items-center justify-center rounded-full bg-[var(--accent)] px-7 font-semibold text-[var(--sur-accent)]">
                Réserver ma séance
              </Link>
              <Link href="#miroir" className="inline-flex min-h-13 items-center justify-center rounded-full border border-[var(--encre)] px-7 font-semibold">
                Pourquoi « à l&apos;endroit »&nbsp;?
              </Link>
            </div>
          </div>
          <Image
            src={photos.miroirTenu.src}
            width={photos.miroirTenu.largeur}
            height={photos.miroirTenu.hauteur}
            alt={photos.miroirTenu.alt}
            sizes="(min-width: 768px) 560px, 100vw"
            priority
            className="aspect-[4/5] w-full object-cover"
          />
        </div>
      </section>

      {/* 2. Le miroir ment */}
      <section id="miroir" className="mt-20 scroll-mt-14 bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:py-24 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <Petit clair>Le petit miroir du comptoir</Petit>
            <h2 className="text-5xl sm:text-7xl">Ton miroir <em className="text-[#F29A84]">te ment.</em></h2>
            <p className="max-w-lg text-lg leading-relaxed text-[#E2E6EA]">
              Il te montre à l&apos;envers : la gauche à droite, la droite à gauche. Tu choisis tes
              lunettes sur un visage que personne d&apos;autre ne voit. Touche « À l&apos;endroit ».
            </p>
          </div>
          <Miroir />
        </div>
      </section>

      {/* 3. Bizarre en photo */}
      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:py-24 md:grid-cols-[0.9fr_1.1fr] md:items-center">
        <Image
          src={photos.miroirFleur.src}
          width={photos.miroirFleur.largeur}
          height={photos.miroirFleur.hauteur}
          alt={photos.miroirFleur.alt}
          sizes="(min-width: 768px) 480px, 100vw"
          className="aspect-[3/4] w-full object-cover"
        />
        <div className="space-y-6">
          <Petit>Et en photo ?</Petit>
          <h2 className="text-5xl sm:text-6xl">Bizarre <em>en photo&nbsp;?</em></h2>
          <p className="text-lg leading-relaxed">
            C&apos;est sans doute pour ça. Ton visage, tu le connais par le miroir, à l&apos;envers.
            Les photos le montrent à l&apos;endroit, comme les autres le voient : il te paraît un
            peu étranger.
          </p>
          <p className="leading-relaxed text-[var(--doux)]">
            Alors on fait l&apos;inverse du comptoir : on te montre ce que les autres verront. Et
            tu choisis tes lunettes sur ce visage-là.
          </p>
        </div>
      </section>

      {/* 4. La séance */}
      <section id="seance" className="scroll-mt-14 border-y border-[var(--trait)] bg-[#EEF0F2]">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="space-y-6 max-lg:hidden">
            <Petit>La séance</Petit>
            <h2 className="text-6xl">Trente minutes, <em>cinq montures.</em></h2>
            <p className="max-w-md text-lg leading-relaxed">Et un écran qui ne t&apos;inverse pas. Tu réserves ici, en deux gestes.</p>
          </div>
          <Seance />
        </div>
      </section>

      {/* 5. Les photos */}
      <section className="mx-auto max-w-6xl space-y-12 px-5 py-16 sm:py-24">
        <div className="max-w-2xl space-y-5">
          <Petit>Après la séance</Petit>
          <h2 className="text-5xl sm:text-6xl">Tu repars avec <em>les photos.</em></h2>
          <p className="text-lg leading-relaxed">
            Une par monture, imprimée sur place. Pour choisir chez toi, tranquille, ou demander
            à quelqu&apos;un. Elles sont à toi : on n&apos;en garde aucune et on ne publie jamais
            une photo de client.
          </p>
        </div>
        <Polaroids />
        <p className="text-center text-sm text-[var(--doux)]">Exemple : des dessins à la place des photos, la boutique est fictive.</p>
      </section>

      {/* 6. Comment ça se passe */}
      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto max-w-6xl space-y-12 px-5 py-16 sm:py-24">
          <div className="max-w-2xl space-y-5">
            <Petit clair>Comment ça se passe</Petit>
            <h2 className="text-5xl sm:text-6xl">Trois temps, <em className="text-[#F29A84]">trente minutes.</em></h2>
          </div>
          <ol className="grid gap-10 md:grid-cols-3">
            {DEROULE.map((d) => (
              <li key={d.titre} className="space-y-3 border-t border-[#3A4A5C] pt-6">
                <p className="text-sm font-bold tabular-nums text-[#C9CED6]">{d.temps}</p>
                <h3 className="text-4xl">{d.titre}</h3>
                <p className="leading-relaxed text-[#E2E6EA]">{d.texte}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 7. Les montures */}
      <section id="montures" className="scroll-mt-14 mx-auto max-w-6xl space-y-10 px-5 py-16 sm:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl space-y-5">
            <Petit>La maison</Petit>
            <h2 className="text-5xl sm:text-6xl">Douze montures, <em>un mot chacune.</em></h2>
          </div>
          <Link href={`${DOSSIER}/seance`} className="font-semibold underline underline-offset-[6px]">Mettre cinq montures de côté</Link>
        </div>
        <ul className="grid grid-cols-2 border-l border-t border-[var(--trait)] sm:grid-cols-3 lg:grid-cols-4">
          {MONTURES.slice(0, 8).map((m) => (
            <li key={m.id} className="space-y-3 border-b border-r border-[var(--trait)] p-4 sm:p-5">
              <svg viewBox="0 0 160 72" className="w-full" aria-hidden="true">
                <Verres forme={m.forme} couleur={m.couleur} />
              </svg>
              <div>
                <h3 className="text-2xl">{m.nom}</h3>
                <p className="text-sm text-[var(--doux)]">{m.matiere}</p>
                <p className="text-sm font-semibold tabular-nums">{euros(m.prix)} TTC</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="text-sm text-[var(--doux)]">Prix de la monture seule, TTC, exemple. Les noms sont ceux de la maison : aucune marque.</p>
      </section>

      {/* 8. L'affiche */}
      <section className="bg-[#EEF0F2] border-y border-[var(--trait)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:py-24 md:grid-cols-2 md:items-center">
          <div className="mx-auto w-full max-w-sm rotate-[-3deg] bg-[var(--sombre)] p-8 text-[var(--sur-sombre)] shadow-[0_40px_60px_-40px_rgba(29,43,58,0.9)]">
            <p className="font-[family-name:var(--titres)] text-6xl leading-[0.95]">
              Ton miroir <em className="text-[#F29A84]">te ment.</em>
            </p>
            <p className="mt-10 text-xs font-bold uppercase tracking-[0.22em] text-[#C9CED6]">À l&apos;Endroit · opticien</p>
          </div>
          <div className="space-y-5">
            <Petit>Notre affiche</Petit>
            <h2 className="text-4xl sm:text-5xl">Une seule phrase, <em>partout en ville.</em></h2>
            <p className="text-lg leading-relaxed">
              Dans les vitrines des voisins, à l&apos;arrêt de bus, sur la porte. Et à
              l&apos;intérieur, l&apos;écran qui le prouve.
            </p>
          </div>
        </div>
      </section>

      {/* 9. Questions */}
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:py-24 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-5">
          <Petit>Questions</Petit>
          <h2 className="text-5xl sm:text-6xl">On te <em>répond.</em></h2>
        </div>
        <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
          {FAQ.map((x) => (
            <li key={x.q}>
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                  {x.q}
                  <span aria-hidden="true" className="font-[family-name:var(--titres)] text-3xl transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="max-w-2xl pb-6 pr-8 leading-relaxed text-[var(--doux)]">{x.r}</p>
              </details>
            </li>
          ))}
        </ul>
      </section>

      {/* 10. Venir */}
      <section className="mx-auto max-w-6xl px-5 pb-20">
        <div className="grid gap-10 border-t border-[var(--encre)] pt-12 md:grid-cols-[1.4fr_1fr]">
          <div className="space-y-6">
            <h2 className="text-5xl sm:text-7xl">À ton <em className="text-[var(--accent-texte)]">tour.</em></h2>
            <p className="max-w-md text-lg leading-relaxed">
              Les autres te voient à l&apos;endroit depuis toujours. Trente minutes suffisent pour
              te voir comme eux.
            </p>
            <Link href={`${DOSSIER}/seance`} className="inline-flex min-h-13 items-center justify-center rounded-full bg-[var(--accent)] px-7 font-semibold text-[var(--sur-accent)]">
              Réserver ma séance
            </Link>
          </div>
          <dl className="space-y-5 text-[15px]">
            <div><dt className="font-bold">Adresse</dt><dd>{entreprise.adresse}, {entreprise.ville}</dd></div>
            <div><dt className="font-bold">Téléphone</dt><dd><a href={`tel:${entreprise.telephoneLien}`} className="underline underline-offset-4">{entreprise.telephone}</a></dd></div>
            <div><dt className="font-bold">Horaires</dt><dd>{entreprise.horaires.map((h) => `${h.jours} : ${h.heures}`).join(" · ")}</dd></div>
          </dl>
        </div>
      </section>
    </main>
  );
}
