import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, PAPIERS, etapes, photos, questions } from "./_composants/donnees";
import { Faq, FairePart, MenuResto } from "./_composants/Blocs";
import { Cachet, Timbre } from "./_composants/Ornements";
import Frigo from "./_composants/Frigo";
import styles from "./_composants/Papier.module.css";

// L'accueil d'À Garder, l'imprimerie imaginée dans la vidéo « Si je devais créer une
// imprimerie de zéro » : on n'imprime que ce qu'on garde (faire-part, menus, cartes du
// frigo), et le papier arrive par la poste avant la commande. Le lancement — les
// menus du restaurant d'en face, signés en bas — y a sa place.
export const metadata: Metadata = {
  title: "À Garder — site de démonstration",
  description: "Site de démonstration d'une imprimerie imaginaire, réalisé par Canevas Havane : on n'imprime que ce qu'on garde, et ton papier arrive par la poste avant que tu choisisses.",
  ...adressesDeLaPage("/exemples/a-garder"),
};

export default function AGarder() {
  return (
    <>
      {/* 1 · L'ouverture : le nom immense, en italique, autour d'un faire-part. */}
      <section className="relative overflow-hidden px-5 pb-16 pt-8 sm:pt-12">
        <Timbre className="absolute right-4 top-6 w-16 rotate-[8deg] drop-shadow-md sm:right-10 sm:w-24" />
        <Cachet className="absolute bottom-10 left-6 hidden w-60 rotate-[-8deg] opacity-80 md:block" />
        <div className="mx-auto max-w-5xl">
          <p className="max-w-[14rem] text-sm font-bold uppercase leading-snug tracking-[0.16em] text-[var(--accent-texte)]">Imprimerie · faire-part, menus, cartes</p>
          <div className="relative mt-10 h-[330px] sm:mt-14 sm:h-[520px]">
            <h1 className="absolute inset-0 font-normal italic leading-none tracking-[-0.03em]">
              <span className="absolute left-0 top-0 z-0 text-[170px] leading-[0.9] sm:text-[300px]">À</span>{" "}
              <span className="absolute bottom-0 right-0 z-20 text-[92px] leading-[0.9] sm:text-[200px]">garder.</span>
            </h1>
            <FairePart className="absolute left-1/2 top-[46%] z-10 w-[205px] -translate-x-[40%] -translate-y-1/2 sm:w-[300px]" />
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
            <div className="max-w-xl space-y-3">
              <p className="font-[family-name:var(--titres)] text-3xl italic leading-tight sm:text-4xl">On n&apos;imprime que ce qu&apos;on garde.</p>
              <p className="text-lg leading-relaxed text-[var(--doux)]">
                Des faire-part, des menus, des cartes qu&apos;on aimante sur le frigo. Et avant de
                commander, ton papier arrive par la poste : tu touches, après tu choisis.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href={`${DOSSIER}/echantillons`} className="inline-flex min-h-[54px] items-center rounded-full bg-[var(--accent)] px-7 text-lg font-bold text-[var(--sur-accent)]">
                Recevoir mes échantillons
              </Link>
              <Link href={`${DOSSIER}/ce-qu-on-imprime`} className="inline-flex min-h-[54px] items-center rounded-full border-2 border-[var(--encre)] px-6 font-bold">
                Ce qu&apos;on imprime
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2 · Le contre-pied : pas de flyers. */}
      <section className="border-y border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:py-24 md:grid-cols-[0.8fr_1.2fr] md:items-center">
          <div aria-hidden="true" className="relative mx-auto h-[230px] w-[200px]">
            <div className="absolute inset-0 rotate-[-6deg] bg-[#FFD400] p-5 font-[family-name:var(--texte)] text-[#111111] shadow-lg">
              <p className="text-4xl font-bold leading-none [font-variant-numeric:lining-nums]">500 flyers</p>
              <p className="mt-3 text-xl font-bold text-[#B2321C] [font-variant-numeric:lining-nums]">−50 % · 48 h</p>
              <p className="mt-8 text-xs uppercase tracking-[0.14em]">Prix cassés</p>
            </div>
            <span className="absolute left-[-10%] top-1/2 h-[6px] w-[120%] -rotate-[38deg] rounded-full bg-[#C2381F]" />
          </div>
          <div className="space-y-5">
            <h2 className="text-6xl italic sm:text-7xl">Pas de flyers.</h2>
            <p className="max-w-xl text-xl leading-relaxed">
              Un flyer vit deux jours, puis finit à la poubelle. Un faire-part vit des années, au
              fond d&apos;une boîte ou sur la porte du frigo. On a choisi notre camp.
            </p>
            <p className="text-[var(--doux)]">D&apos;autres imprimeurs font très bien les flyers. Nous, on fait ce qu&apos;on garde.</p>
          </div>
        </div>
      </section>

      {/* 3 · Le frigo. */}
      <section id="frigo" className="mx-auto max-w-6xl space-y-10 px-5 py-20 sm:py-28">
        <div className="max-w-2xl space-y-4">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--accent-texte)]">Ce qu&apos;on imprime</p>
          <h2 className="text-6xl italic sm:text-7xl">Ce qu&apos;on aimante sur le frigo.</h2>
        </div>
        <Frigo />
      </section>

      {/* 4 · Le papier avant la commande. */}
      <section className="relative overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:py-28 md:grid-cols-2 md:items-center">
          <div className="space-y-6">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#F2B8A8]">Avant de commander</p>
            <h2 className="text-6xl italic sm:text-7xl">Ton papier, par la poste.</h2>
            <p className="text-xl leading-relaxed">
              Un écran ne dit rien d&apos;un papier. Alors on t&apos;envoie les quatre, dans une
              enveloppe, offerts. Tu les touches chez toi, à ta lumière. Et après, tu choisis.
            </p>
            <ul className="grid grid-cols-4 gap-2" aria-label="Les quatre papiers de l'enveloppe">
              {PAPIERS.map((p) => (
                <li key={p.id} className="space-y-1.5">
                  <span aria-hidden="true" className={`block h-16 rounded-[4px] ${styles[p.id]}`} />
                  <span className="block text-sm font-bold">{p.nom}</span>
                  <span className="block text-xs text-[#C9D0E8] [font-variant-numeric:lining-nums]">{p.grammage}</span>
                </li>
              ))}
            </ul>
            <Link href={`${DOSSIER}/echantillons`} className="inline-flex min-h-[54px] items-center rounded-full bg-[var(--accent)] px-7 text-lg font-bold text-[var(--sur-accent)]">
              Choisir mes papiers
            </Link>
          </div>
          <div className="relative">
            <Image src={photos.enveloppe.src} alt={photos.enveloppe.alt} width={photos.enveloppe.largeur} height={photos.enveloppe.hauteur} sizes="(min-width: 768px) 560px, 100vw" className="h-auto w-full rounded-[18px]" />
            <Cachet className="absolute -bottom-8 -right-4 w-40 rotate-[-10deg] opacity-0 sm:opacity-100" />
          </div>
        </div>
      </section>

      {/* 5 · Nos papiers. */}
      <section className="mx-auto max-w-6xl space-y-10 px-5 py-20 sm:py-28">
        <div className="max-w-2xl space-y-4">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--accent-texte)]">Nos papiers</p>
          <h2 className="text-6xl italic sm:text-7xl">Quatre papiers, pas quarante.</h2>
          <p className="text-lg leading-relaxed text-[var(--doux)]">Ceux qui tiennent dans le temps. On les connaît par cœur, et on te dit lequel va avec quoi.</p>
        </div>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PAPIERS.map((p) => (
            <li key={p.id} className="overflow-hidden rounded-[18px] border border-[var(--trait)] bg-[var(--carte)]">
              <span aria-hidden="true" className={`block h-28 ${styles[p.id]}`} />
              <div className="space-y-2 p-5">
                <h3 className="text-3xl italic">{p.nom} <span className="text-xl not-italic text-[var(--doux)] [font-variant-numeric:lining-nums]">{p.grammage}</span></h3>
                <p className="leading-relaxed">{p.texte}</p>
                <p className="text-sm font-bold text-[var(--accent-texte)]">{p.usage}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* 6 · La méthode. */}
      <section className="border-y border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto max-w-6xl space-y-12 px-5 py-20 sm:py-24">
          <h2 className="text-6xl italic sm:text-7xl">Du papier <span className="not-italic">au frigo.</span></h2>
          <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {etapes.map((e, i) => (
              <li key={e.titre} className="space-y-3 border-t-2 border-[var(--encre)] pt-4">
                <p className="font-[family-name:var(--titres)] text-5xl italic text-[var(--accent-texte)] [font-variant-numeric:lining-nums]">{i + 1}.</p>
                <h3 className="text-3xl">{e.titre}</h3>
                <p className="leading-relaxed text-[var(--doux)]">{e.texte}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 7 · Le lancement : les menus du restaurant d'en face. */}
      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:py-28 md:grid-cols-2 md:items-center">
        <div className="space-y-5 md:order-2">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--accent-texte)]">Restaurateurs du quartier</p>
          <h2 className="text-6xl italic sm:text-7xl">Vos menus, offerts.</h2>
          <p className="text-xl leading-relaxed">
            Pour l&apos;ouverture de l&apos;atelier, on imprime gratuitement la première série de menus
            des restaurants d&apos;en face. Et en bas, en petit : imprimé par À Garder.
          </p>
          <p className="text-[var(--doux)]">
            Le menu reste le vôtre : les plats, les prix et les mentions sont ceux du restaurant.
            Nous, on l&apos;imprime. Prix des séries suivantes hors taxes, sur devis.
          </p>
        </div>
        <MenuResto />
      </section>

      {/* 8 · L'atelier. */}
      <section id="atelier" className="scroll-mt-20 border-t border-[var(--trait)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:py-24 md:grid-cols-[0.8fr_1.2fr] md:items-center">
          <Image src={photos.casse.src} alt={photos.casse.alt} width={photos.casse.largeur} height={photos.casse.hauteur} sizes="(min-width: 768px) 440px, 100vw" className="h-auto w-full rounded-[18px]" />
          <div className="space-y-6">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--accent-texte)]">L&apos;atelier</p>
            <h2 className="text-6xl italic sm:text-7xl">Peu, et bien.</h2>
            <p className="text-xl leading-relaxed">
              Un atelier sur rue, une presse typographique pour les faire-part, une imprimante
              numérique pour les petites séries. On imprime peu à la fois, et on regarde chaque
              feuille avant de la mettre en boîte.
            </p>
            <Image src={photos.cartes.src} alt={photos.cartes.alt} width={photos.cartes.largeur} height={photos.cartes.hauteur} sizes="(min-width: 768px) 560px, 100vw" className="h-auto w-full rounded-[18px]" />
          </div>
        </div>
      </section>

      {/* 9 · Les questions. */}
      <section className="mx-auto grid max-w-6xl gap-10 px-5 pb-20 sm:pb-28 lg:grid-cols-[0.8fr_1.2fr]">
        <h2 className="text-6xl italic sm:text-7xl">Les questions qu&apos;on nous pose.</h2>
        <Faq questions={questions} />
      </section>

      {/* 10 · L'appel. */}
      <section className="relative overflow-hidden border-t border-[var(--trait)] bg-[var(--carte)]">
        <Timbre className="absolute right-5 top-6 w-14 rotate-[12deg] sm:w-20" />
        <div className="mx-auto max-w-3xl space-y-6 px-5 pb-24 pt-28 text-center">
          <h2 className="text-6xl italic sm:text-8xl">Commence par toucher.</h2>
          <p className="text-lg text-[var(--doux)]">Quatre papiers, une enveloppe, par la poste. Offerts.</p>
          <Link href={`${DOSSIER}/echantillons`} className="inline-flex min-h-[56px] items-center rounded-full bg-[var(--accent)] px-8 text-lg font-bold text-[var(--sur-accent)]">
            Recevoir mes échantillons
          </Link>
        </div>
      </section>
    </>
  );
}
