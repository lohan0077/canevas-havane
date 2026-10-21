import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, FAQ, METHODE, POSTES, euros, photos, total } from "./_composants/donnees";
import ChaiseVide from "./_composants/ChaiseVide";

// Le site imaginé dans la vidéo « Si je devais remplir l'agenda d'un cabinet de
// recrutement » : les sites de cabinets parlent aux candidats ; celui-ci parle
// d'abord au dirigeant, de sa chaise vide. Une question, les heures en attente,
// vingt minutes pour définir le poste, des honoraires écrits ligne par ligne.
export const metadata: Metadata = {
  title: "Chaise Pleine — site de démonstration",
  description: "Site de démonstration d'un cabinet de recrutement imaginaire, réalisé par Canevas Havane : ton poste est vide depuis combien de semaines ? Vingt minutes pour le définir, des honoraires écrits.",
  ...adressesDeLaPage("/exemples/chaise-pleine"),
};

const Surtitre = ({ children, clair = false }: { children: React.ReactNode; clair?: boolean }) => (
  <p className={`text-sm font-bold ${clair ? "text-[#F28C6B]" : "text-[var(--accent-texte)]"}`}>{children}</p>
);

export default function ChaisePleine() {
  const exemple = POSTES[0];
  return (
    <main>
      {/* 1. La question */}
      <section id="chaise" className="scroll-mt-14 bg-[#2A343D] text-[#F4F1EA] bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:28px_28px]">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 pt-6 pb-14 sm:px-5 sm:pt-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <div className="space-y-5 lg:pt-6">
            <Surtitre clair>Pour le dirigeant qui doit recruter</Surtitre>
            <h1 className="text-[2.35rem] sm:text-6xl lg:text-7xl font-extrabold tracking-tight">
              Ton poste est vide depuis <span className="text-[#F28C6B]">combien de semaines&nbsp;?</span>
            </h1>
            <p className="max-w-lg text-lg leading-relaxed text-[#E1E6EA] max-lg:hidden">
              Les sites de cabinets parlent aux candidats. Celui-ci te parle de ta chaise vide :
              combien de temps, combien d&apos;heures de travail en attente, et comment la remplir.
            </p>
          </div>
          <div className="min-w-0">
            <ChaiseVide />
          </div>
        </div>
      </section>

      {/* 2. Le constat */}
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:py-24 md:grid-cols-2 md:items-center">
        <Image src={photos.chaiseOrange.src} width={photos.chaiseOrange.largeur} height={photos.chaiseOrange.hauteur} alt={photos.chaiseOrange.alt} sizes="(min-width: 768px) 540px, 100vw" className="aspect-[4/5] w-full rounded-2xl object-cover object-[100%_50%]" />
        <div className="space-y-6">
          <Surtitre>Le constat</Surtitre>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">On ne vend pas des CV. <span className="text-[var(--accent-texte)]">On vend la fin de la chaise vide.</span></h2>
          <div className="grid grid-cols-2 gap-3 text-[15px]">
            <div className="rounded-xl bg-[var(--carte)] p-4">
              <p className="font-bold">Ailleurs, pour les candidats</p>
              <ul className="mt-2 space-y-1 text-[var(--doux)]"><li>Des offres</li><li>Des conseils CV</li><li>Le mot « talent »</li></ul>
            </div>
            <div className="rounded-xl bg-[#2A343D] p-4 text-[#F4F1EA]">
              <p className="font-bold">Ici, pour toi</p>
              <ul className="mt-2 space-y-1 text-[#E1E6EA]"><li>Ta chaise vide, en heures</li><li>20 minutes pour le poste</li><li>Des prix, écrits</li></ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Méthode */}
      <section id="methode" className="scroll-mt-14 bg-[var(--carte)] border-y border-[var(--trait)]">
        <div className="mx-auto max-w-6xl space-y-12 px-5 py-16 sm:py-24">
          <div className="max-w-2xl space-y-4">
            <Surtitre>Méthode</Surtitre>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Cinq temps, <span className="text-[var(--accent-texte)]">zéro surprise.</span></h2>
          </div>
          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {METHODE.map((m, i) => (
              <li key={m.titre} className="space-y-3 border-t-4 border-[#2A343D] pt-4">
                <span className="font-[family-name:var(--titres)] text-4xl font-extrabold tabular-nums text-[var(--accent-texte)]">0{i + 1}</span>
                <h3 className="text-xl font-extrabold">{m.titre}</h3>
                <p className="leading-relaxed text-[var(--doux)]">{m.texte}</p>
              </li>
            ))}
          </ol>
          <p className="text-sm text-[var(--doux)]">Aucun délai promis : il dépend du poste et du marché. Tu sais chaque semaine où on en est.</p>
        </div>
      </section>

      {/* 4. Combien ça coûte */}
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:py-24 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div className="space-y-6">
          <Surtitre>Combien coûte un cabinet de recrutement&nbsp;?</Surtitre>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Pas « nous consulter ». <span className="text-[var(--accent-texte)]">Un exemple chiffré.</span></h2>
          <p className="text-lg leading-relaxed">C&apos;est ce que les gens tapent. Alors la réponse est sur le site : un forfait, ligne par ligne, pour trois postes types.</p>
          <Link href={`${DOSSIER}/honoraires`} className="inline-flex min-h-13 items-center justify-center rounded-xl bg-[var(--accent)] px-7 font-bold text-[var(--sur-accent)]">Voir les honoraires</Link>
        </div>
        <div className="rounded-2xl bg-[#2A343D] p-6 text-[#F4F1EA] sm:p-8 space-y-4">
          <p className="text-sm font-semibold text-[#F28C6B]">Exemple · {exemple.intitule.toLowerCase()}</p>
          <p className="font-[family-name:var(--titres)] text-5xl font-extrabold tabular-nums">Forfait {euros(total(exemple))} HT</p>
          <ul className="space-y-1.5 text-[15px] text-[#E1E6EA]">
            {exemple.lignes.slice(0, 4).map((l) => (<li key={l.quoi} className="flex justify-between gap-4"><span>{l.quoi}</span><span className="tabular-nums">{euros(l.montant)}</span></li>))}
            <li className="text-[#C9D2D9]">… et deux lignes de plus</li>
          </ul>
          <p className="text-xs text-[#C9D2D9]">Prix exemple, HT : nos clients sont des entreprises.</p>
        </div>
      </section>

      {/* 5. Les postes */}
      <section className="bg-[#2A343D] text-[#F4F1EA]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:py-24 md:grid-cols-2 md:items-center">
          <div className="space-y-5">
            <Surtitre clair>Les postes qu&apos;on remplit</Surtitre>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Les chaises qu&apos;on <span className="text-[#F28C6B]">voit le moins.</span></h2>
            <p className="text-lg leading-relaxed text-[#E1E6EA]">
              Chefs d&apos;atelier, techniciens, comptables, commerciaux terrain : les postes
              d&apos;une PME qui manquent tout de suite quand ils sont vides.
            </p>
            <ul className="flex flex-wrap gap-2">
              {["Industrie", "Bâtiment", "Maintenance", "Services aux entreprises", "Fonctions support"].map((s) => (
                <li key={s} className="rounded-full border border-[#5B6873] px-3 py-1.5 text-sm">{s}</li>
              ))}
            </ul>
          </div>
          <Image src={photos.atelier.src} width={photos.atelier.largeur} height={photos.atelier.hauteur} alt={photos.atelier.alt} sizes="(min-width: 768px) 540px, 100vw" className="aspect-[4/3] w-full rounded-2xl object-cover" />
        </div>
      </section>

      {/* 6. Candidats */}
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:py-24 md:grid-cols-[1fr_1fr] md:items-center">
        <div className="space-y-5">
          <Surtitre>Et les candidats&nbsp;?</Surtitre>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Placement gratuit <span className="text-[var(--accent-texte)]">pour les candidats.</span></h2>
          <p className="text-lg leading-relaxed">
            Aucun frais ne peut leur être demandé pour leur trouver un poste : c&apos;est le Code du
            travail (art. L.5321-3). Seule l&apos;entreprise qui recrute paie.
          </p>
          <Link href={`${DOSSIER}/candidats`} className="font-bold underline underline-offset-[6px]">Ce qu&apos;on fait de ta candidature</Link>
        </div>
        <Image src={photos.chaiseRouge.src} width={photos.chaiseRouge.largeur} height={photos.chaiseRouge.hauteur} alt={photos.chaiseRouge.alt} sizes="(min-width: 768px) 540px, 100vw" className="aspect-[4/3] w-full rounded-2xl object-cover" />
      </section>

      {/* 7. Engagements */}
      <section className="bg-[var(--carte)] border-y border-[var(--trait)]">
        <div className="mx-auto max-w-6xl space-y-10 px-5 py-16 sm:py-24">
          <h2 className="max-w-2xl text-4xl sm:text-5xl font-extrabold tracking-tight">Ce qu&apos;on <span className="text-[var(--accent-texte)]">s&apos;interdit.</span></h2>
          <ul className="grid gap-4 md:grid-cols-3">
            {[
              { t: "Présenter un CV sans accord", d: "Aucune candidature ne t'est envoyée sans l'accord écrit de la personne." },
              { t: "Publier tes noms", d: "Ni le nom de ton entreprise, ni celui de la personne recrutée. Jamais, nulle part." },
              { t: "Trier sur autre chose que le poste", d: "Âge, origine, situation de famille : rien de ce que la loi interdit n'entre dans le tri." },
            ].map((x) => (
              <li key={x.t} className="space-y-2 rounded-xl bg-[var(--fond)] p-5">
                <h3 className="text-xl font-extrabold">{x.t}</h3>
                <p className="leading-relaxed text-[var(--doux)]">{x.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 8. Questions */}
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:py-24 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-4">
          <Surtitre>Questions</Surtitre>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Ce que les dirigeants <span className="text-[var(--accent-texte)]">demandent.</span></h2>
        </div>
        <ul className="space-y-2">
          {FAQ.map((x) => (
            <li key={x.q}>
              <details className="group rounded-xl bg-[var(--carte)] px-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-bold [&::-webkit-details-marker]:hidden">
                  {x.q}
                  <span aria-hidden="true" className="text-xl text-[var(--accent-texte)] transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="pb-5 leading-relaxed text-[var(--doux)]">{x.r}</p>
              </details>
            </li>
          ))}
        </ul>
      </section>

      {/* 9. Dernier appel */}
      <section className="bg-[#2A343D] text-[#F4F1EA]">
        <div className="mx-auto max-w-4xl space-y-6 px-5 py-16 text-center sm:py-24">
          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight">Tu ne compares plus les tarifs. <span className="text-[#F28C6B]">Tu comptes tes semaines.</span></h2>
          <Link href="#chaise" className="inline-flex min-h-13 items-center justify-center rounded-xl bg-[#F28C6B] px-8 text-lg font-bold text-[#2A343D]">Compter mes semaines</Link>
        </div>
      </section>
    </main>
  );
}
