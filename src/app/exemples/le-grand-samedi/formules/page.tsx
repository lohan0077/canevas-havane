import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, FORMULES, entreprise, euros, photos } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Les prix · Le Grand Samedi — site de démonstration",
  description: "Les trois formules du Grand Samedi, wedding planner imaginaire : le jour J, la moitié du chemin, de A à Z. Prix TTC d'exemple, affichés en clair.",
  ...adressesDeLaPage("/exemples/le-grand-samedi/formules"),
};

const PAS_COMPRIS = [
  "Les prestataires eux-mêmes (lieu, traiteur, photographe…) : tu les paies directement, sans marge de notre part.",
  "Les frais de déplacement au-delà de 50 km de Bordeaux : annoncés au devis, avant de signer.",
  "Aucune commission reçue d'un prestataire : on n'est payés que par toi.",
];

export default function Formules() {
  return (
    <div>
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 sm:pt-14 pb-14 space-y-6">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-[var(--accent-texte)]">Les prix</p>
        <h1 className="text-[56px] sm:text-8xl font-normal leading-[0.94] tracking-[-0.02em]">Trois formules. <span className="italic text-[var(--accent-texte)]">Un prix chacune.</span></h1>
        <p className="max-w-xl text-lg leading-relaxed text-[var(--doux)]">Affichés ici, pas dans un PDF envoyé trois jours plus tard. Le devis précis suit le premier rendez-vous, gratuit.</p>
      </section>

      <section data-film="formules" className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 grid gap-4 lg:grid-cols-3">
        {FORMULES.map((f, i) => (
          <article key={f.id} id={`formule-${f.id}`} className={`rounded-[30px] p-6 sm:p-8 space-y-5 ${i === 1 ? "bg-[var(--sombre)] text-[var(--sur-sombre)]" : "bg-[var(--carte)] border border-[var(--trait)]"}`}>
            <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${i === 1 ? "text-[#D9B98A]" : "text-[var(--accent-texte)]"}`}>0{i + 1} · {f.sous}</p>
            <h2 className="text-[40px] font-normal leading-tight">{f.titre}</h2>
            <p className="font-[family-name:var(--titres)] text-5xl italic tabular-nums">dès {euros(f.prix)}</p>
            <p className={`text-sm ${i === 1 ? "text-[#CDBDB5]" : "text-[var(--doux)]"}`}>TTC · prix d&apos;exemple</p>
            <ul className={`space-y-2.5 border-t pt-5 ${i === 1 ? "border-[#4A3238]" : "border-[var(--trait)]"}`}>
              {f.compris.map((c) => (
                <li key={c} className="flex gap-3"><span aria-hidden="true" className={i === 1 ? "text-[#D9B98A]" : "text-[var(--accent-texte)]"}>✦</span>{c}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="bg-[#F1E4DA]">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-16 sm:py-20 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <h2 className="text-[42px] sm:text-6xl font-normal leading-[0.98]">Ce qui n&apos;est <span className="italic">pas dedans.</span></h2>
            <ul className="space-y-4">
              {PAS_COMPRIS.map((p) => (
                <li key={p} className="border-t border-[var(--encre)] pt-4 text-lg leading-relaxed">{p}</li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[30px]">
            <Image src={photos.soir.src} alt={photos.soir.alt} fill sizes="(min-width: 1024px) 460px, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-5 sm:px-6 py-20 space-y-6 text-center">
        <h2 className="text-[42px] sm:text-6xl font-normal leading-[0.98]">D&apos;abord, <span className="italic text-[var(--accent-texte)]">ta date.</span></h2>
        <p className="text-lg text-[var(--doux)]">Le rétroplanning te dit ce qui presse. Le prix, tu le connais déjà.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <Link href={`${DOSSIER}#ma-date`} className="rounded-full bg-[var(--accent)] text-[var(--sur-accent)] px-7 py-4 font-semibold">Entrer ma date</Link>
          <a href={`tel:${entreprise.telephoneLien}`} className="rounded-full border border-[var(--encre)] px-7 py-4 font-semibold">{entreprise.telephone}</a>
        </div>
      </section>
    </div>
  );
}
