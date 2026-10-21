import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { COMPRIS, DOSSIER, FAQ, METHODE, PAS_COMPRIS, QUESTIONS_GUIDE, photos } from "./_composants/donnees";
import TesMurs from "./_composants/TesMurs";
import Faq from "./_composants/Faq";

// Le site du cuisiniste imaginé dans la vidéo « Si je devais remplir le carnet de
// commandes d'un cuisiniste » : on ne vend pas des meubles, on vend la pièce où
// finissent toutes les soirées. Mise en page inspirée du modèle « Interior Features » de
// MotionSites — salle sombre, cartes-photos à annotations, plan à l'échelle —,
// transposée à un cuisiniste.
export const metadata: Metadata = {
  title: "Jusqu'au Café — site de démonstration",
  description: "Site de démonstration d'un cuisiniste imaginaire, réalisé par Canevas Havane : la longueur de tes murs dessine ta cuisine, avec une fourchette TTC pose comprise, et un guide pour choisir un bon cuisiniste.",
  ...adressesDeLaPage("/exemples/jusqu-au-cafe"),
};

const CARTES = [
  { photo: photos.planBois, titre: "Tes murs, en mètres", note: "3,20 m × 2,40 m", href: "#murs" },
  { photo: photos.salle, titre: "Une fourchette, pose comprise", note: "TTC · exemple", href: "#murs" },
  { photo: photos.table, titre: "Qui prend les cotes ?", note: "Mathieu, mètre en main", href: `${DOSSIER}/choisir-son-cuisiniste` },
  { photo: photos.tasses, titre: "Qui revient ?", note: "Réglages compris, deux ans", href: `${DOSSIER}/choisir-son-cuisiniste` },
];

const Surtitre = ({ children, clair = false }: { children: React.ReactNode; clair?: boolean }) => (
  <p className={`text-xs font-bold uppercase tracking-[0.22em] ${clair ? "text-[#7A4E22]" : "text-[var(--accent-texte)]"}`}>{children}</p>
);

export default function JusquAuCafe() {
  return (
    <div>
      {/* 1. L'ouverture : la phrase, puis les quatre cartes annotées. */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 sm:pt-20 pb-16 space-y-12">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <Surtitre>Cuisiniste · Ta Ville</Surtitre>
          <h1 className="text-[2.9rem] sm:text-7xl font-light tracking-[-0.02em]">
            La pièce où finissent <span className="italic text-[var(--accent-texte)]">toutes les soirées.</span>
          </h1>
          <p className="text-xl leading-relaxed text-[var(--doux)] max-w-xl mx-auto">
            On ne vend pas des meubles. On dessine la cuisine où tout le monde reste, jusqu&apos;au café.
            Ça commence par la longueur de tes murs.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="#murs" className="rounded-full bg-[var(--accent)] text-[var(--sur-accent)] px-7 py-3.5 text-lg font-bold">Dessiner ma cuisine</Link>
            <Link href={`${DOSSIER}/choisir-son-cuisiniste`} className="rounded-full border border-[var(--encre)] px-7 py-3.5 text-lg font-semibold">Le guide</Link>
          </div>
        </div>
        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {CARTES.map((c, i) => (
            <li key={c.titre}>
              <Link href={c.href} className="group block rounded-[22px] overflow-hidden border border-[var(--trait)] bg-[var(--carte)]">
                <span className="relative block aspect-[4/5] bg-[var(--fond)]">
                  <Image src={c.photo.src} alt={c.photo.alt} fill priority={i < 2} sizes="(min-width: 1024px) 270px, 50vw" className="object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                  <span className="absolute left-2 top-2 rounded-full bg-[var(--fond)]/90 border border-[var(--accent)] px-2.5 py-1 text-[11px] font-bold text-[var(--accent-texte)]">{c.note}</span>
                </span>
                <span className="flex items-start gap-2 p-3">
                  <span className="grid place-items-center shrink-0 w-6 h-6 rounded-full bg-[var(--accent)] text-[var(--sur-accent)] text-xs font-bold">{i + 1}</span>
                  <span className="text-sm font-semibold leading-snug">{c.titre}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* 2. Tes murs, en mètres. */}
      <section id="murs" className="scroll-mt-20 border-y border-[var(--trait)] bg-[var(--carte)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-5">
            <Surtitre>Ta cuisine</Surtitre>
            <h2 className="text-5xl sm:text-6xl font-light">Tes murs, <span className="italic">en mètres.</span></h2>
            <p className="text-xl leading-relaxed text-[var(--doux)]">
              Tu tapes la longueur de tes murs, tu choisis une gamme : le site dessine ta cuisine, et
              te donne une fourchette, pose comprise. Avant même de venir.
            </p>
            <p className="text-sm text-[var(--doux)]">Calcul fait dans ton navigateur : rien n&apos;est envoyé, rien n&apos;est enregistré.</p>
          </div>
          <div className="rounded-[26px] bg-[var(--fond)] border border-[var(--trait)] p-4 sm:p-6">
            <TesMurs />
          </div>
        </div>
      </section>

      {/* 3. Pose comprise : ce que ça veut dire. */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 space-y-10">
        <div className="space-y-4 max-w-3xl">
          <Surtitre>Ce que vous tapez</Surtitre>
          <h2 className="text-4xl sm:text-6xl font-light">« Prix cuisine sur mesure <span className="italic">avec pose</span> ».</h2>
          <p className="text-xl leading-relaxed text-[var(--doux)]">Alors on vous dit ce que « pose comprise » comprend. Et ce qu&apos;elle ne comprend pas.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-[22px] border border-[var(--accent)] p-6 space-y-3">
            <h3 className="text-2xl font-normal">Compris dans la fourchette</h3>
            <ul className="space-y-2 text-lg">
              {COMPRIS.map((x) => (
                <li key={x} className="flex gap-3"><span aria-hidden="true" className="text-[var(--accent-texte)]">✓</span>{x}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-[22px] border border-[var(--trait)] p-6 space-y-3">
            <h3 className="text-2xl font-normal">Pas compris</h3>
            <ul className="space-y-2 text-lg text-[var(--doux)]">
              {PAS_COMPRIS.map((x) => (
                <li key={x} className="flex gap-3"><span aria-hidden="true">—</span>{x}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 4. Le guide, même si ce n'est pas nous. */}
      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 grid gap-10 md:grid-cols-[1fr_1fr] md:items-center">
          <div className="space-y-5">
            <Surtitre clair>Le guide</Surtitre>
            <h2 className="text-5xl sm:text-6xl font-light">Comment choisir un bon cuisiniste. <span className="italic text-[#7A4E22]">Même si ce n&apos;est pas nous.</span></h2>
            <p className="text-xl leading-relaxed">Les questions à poser à tous ceux que tu verras. Nous compris.</p>
            <Link href={`${DOSSIER}/choisir-son-cuisiniste`} className="inline-flex rounded-full bg-[var(--sur-sombre)] text-[var(--sombre)] px-7 py-3.5 text-lg font-bold">Lire les questions</Link>
          </div>
          <ol className="space-y-3">
            {QUESTIONS_GUIDE.slice(0, 3).map((q, i) => (
              <li key={q.id} className="flex items-baseline gap-4 rounded-[20px] border border-[#CDBFA8] p-5">
                <span className="font-[family-name:var(--titres)] text-3xl italic text-[#7A4E22]">{i + 1}</span>
                <span className="font-[family-name:var(--titres)] text-2xl">{q.question}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5. La méthode. */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 space-y-10">
        <div className="space-y-4 max-w-2xl">
          <Surtitre>La méthode</Surtitre>
          <h2 className="text-5xl sm:text-6xl font-light">Des cotes <span className="italic">au premier café.</span></h2>
        </div>
        <ol className="grid gap-3 md:grid-cols-4">
          {METHODE.map((m, i) => (
            <li key={m.titre} className="rounded-[22px] bg-[var(--carte)] border border-[var(--trait)] p-6 space-y-3">
              <span className="font-[family-name:var(--titres)] text-4xl italic text-[var(--accent-texte)]">0{i + 1}</span>
              <h3 className="text-2xl font-normal">{m.titre}</h3>
              <p className="text-lg leading-relaxed text-[var(--doux)]">{m.texte}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* 6. La pose, en accéléré. */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20 grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-center">
        <div className="relative mx-auto w-full max-w-[300px] aspect-[9/16] rounded-[28px] overflow-hidden border border-[var(--trait)] bg-[var(--carte)]">
          <Image src={photos.table.src} alt={photos.table.alt} fill sizes="300px" className="object-cover" />
          <span className="absolute left-3 top-3 rounded-full bg-[var(--fond)]/90 px-3 py-1 text-xs font-bold">● × 60 · Jour 4</span>
          <span aria-hidden="true" className="absolute left-3 right-3 bottom-4 h-1.5 rounded-full bg-[var(--fond)]/70">
            <span className="block h-full w-full rounded-full bg-[var(--accent)]" />
          </span>
        </div>
        <div className="space-y-5">
          <Surtitre>Chaque pose</Surtitre>
          <h2 className="text-5xl sm:text-6xl font-light">Quatre jours. <span className="italic">Trente secondes.</span></h2>
          <p className="text-xl leading-relaxed text-[var(--doux)]">
            Chaque pose est filmée en accéléré, et publiée. Seulement avec ton accord écrit, et sans rien
            montrer de chez toi : ni adresse, ni famille, ni objets personnels.
          </p>
        </div>
      </section>

      {/* 7. Le plan de travail, le soir. */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <div className="relative aspect-[4/3] sm:aspect-[21/9] rounded-[26px] overflow-hidden bg-[var(--carte)]">
          <Image src={photos.planBois.src} alt={photos.planBois.alt} fill sizes="(min-width: 1152px) 1104px, 100vw" className="object-cover" />
        </div>
        <p className="mt-4 font-[family-name:var(--titres)] text-3xl italic text-[var(--doux)]">Les meubles sont la partie facile. Le reste, c&apos;est vous.</p>
      </section>

      {/* 8. Questions. */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-20 space-y-8">
        <h2 className="text-5xl sm:text-6xl font-light text-center">Questions.</h2>
        <Faq questions={FAQ} />
      </section>

      {/* 9. Le dernier mot. */}
      <section className="px-4 sm:px-6 pb-20">
        <div className="max-w-6xl mx-auto rounded-[30px] bg-[var(--sombre)] text-[var(--sur-sombre)] px-6 py-14 sm:p-16 text-center space-y-6">
          <p className="font-[family-name:var(--titres)] text-5xl sm:text-7xl font-light leading-[1.02]">
            Tu sais déjà <span className="italic text-[#7A4E22]">qui reviendra.</span>
          </p>
          <p className="text-xl">Si une porte frotte : nous. C&apos;est écrit sur le devis.</p>
          <Link href={`${DOSSIER}/ma-cuisine#cotes`} className="inline-flex rounded-full bg-[var(--sur-sombre)] text-[var(--sombre)] px-8 py-4 text-lg font-bold">
            Réserver la prise de cotes
          </Link>
        </div>
      </section>
    </div>
  );
}
