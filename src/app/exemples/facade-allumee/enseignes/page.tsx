import type { Metadata } from "next";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import CalculPalier from "../../_kit/CalculPalier";
import { DOSSIER, enseignes } from "../_composants/donnees";
import Facade from "../_composants/Facade";

export const metadata: Metadata = {
  title: "Façade Allumée — site de démonstration",
  description: "Les enseignes d'un enseigniste imaginaire, leurs prix hors taxes d'exemple, et ce qui convient à la longueur de ta façade.",
  ...adressesDeLaPage("/exemples/facade-allumee/enseignes"),
};

const PALIERS = [
  { jusqua: 3, titre: "Une enseigne drapeau et la vitrophanie", prix: "à partir de 870 € HT · exemple", detail: "Sur une petite façade, on se fait voir de la rue plutôt que de face." },
  { jusqua: 5, titre: "Un caisson lumineux sur le bandeau", prix: "à partir de 1 300 € HT · exemple", detail: "Lisible de loin, simple à changer si l'activité évolue." },
  { jusqua: 8, titre: "Des lettres boîtier rétroéclairées", prix: "à partir de 2 400 € HT · exemple", detail: "Huit à douze lettres, et le halo sur la pierre." },
  { jusqua: 12, titre: "Lettres boîtier et enseigne drapeau", prix: "à partir de 3 090 € HT · exemple", detail: "Vue de face et en remontant la rue." },
];

export default function NosEnseignes() {
  return (
    <>
      <section className="mx-auto grid max-w-6xl gap-10 px-5 pb-16 pt-14 sm:pt-20 md:grid-cols-[1fr_0.9fr] md:items-center">
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent-texte)]">Nos enseignes</p>
          <h1 className="text-5xl sm:text-7xl">Ce qui va <span className="italic text-[var(--accent-texte)]">à ta façade.</span></h1>
          <p className="max-w-xl text-lg leading-relaxed text-[var(--doux)]">
            Glisse jusqu&apos;à la longueur de ta façade : voilà ce qu&apos;on te proposerait d&apos;abord.
            Le montage sur ta photo dira le reste.
          </p>
        </div>
        <CalculPalier
          etiquette="Longueur de ta façade"
          unite="m"
          min={2}
          max={12}
          depart={6}
          paliers={PALIERS}
          titreResultat="On te proposerait"
          legende="Prix hors taxes d'exemple, pose comprise : nos clients sont des professionnels. Le règlement local peut limiter la taille d'une enseigne ; on vérifie avant de dessiner."
        />
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20">
        <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
          {enseignes.map((e) => (
            <li key={e.id} id={e.id} className="grid gap-3 py-8 md:grid-cols-[0.9fr_1.4fr_0.7fr] md:items-baseline md:gap-8">
              <h2 className="text-3xl">{e.nom}</h2>
              <p className="leading-relaxed text-[var(--doux)]">{e.texte}</p>
              <p className="font-bold tabular-nums md:text-right">{e.prix}<span className="block text-sm font-normal text-[var(--doux)]">exemple · pose comprise</span></p>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-2 md:items-center">
          <figure className="mx-auto w-full max-w-[380px] space-y-3">
            <Facade id="fa-ens-nuit" enseigne="Librairie" style="blanches" nuit teinte="#3B2A2A" className="rounded-[14px]" />
            <figcaption className="text-center text-sm text-[var(--doux)]">Lettres blanches, le soir · façade dessinée</figcaption>
          </figure>
          <div className="space-y-5">
            <h2 className="text-5xl">Le soir, <span className="italic text-[var(--accent-texte)]">sans clignoter.</span></h2>
            <p className="text-lg leading-relaxed text-[var(--doux)]">
              Les enseignes clignotantes sont interdites, sauf pour les pharmacies et les services
              d&apos;urgence. Et une enseigne lumineuse s&apos;éteint entre 1 h et 6 h quand l&apos;activité a
              cessé (Code de l&apos;environnement, art. R. 581-59). On règle l&apos;horloge à la pose.
            </p>
            <Link href={DOSSIER} className="inline-flex min-h-[52px] items-center rounded-full bg-[var(--accent)] px-7 font-bold text-[var(--sur-accent)]">
              Essayer sur ma façade
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
