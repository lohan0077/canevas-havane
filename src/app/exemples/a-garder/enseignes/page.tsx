import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import CalculPalier from "../../_kit/CalculPalier";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, Bouton, EnTetePage, Surtitre } from "../_composants/Blocs";
import { DOSSIER, enseignes, etapesEnseigne, photos } from "../_composants/donnees";
import Facade from "../_composants/Facade";

export const metadata: Metadata = {
  title: "Les enseignes — À Garder, site de démonstration",
  description: "Les enseignes d'une imprimerie imaginaire : ce qui va à la longueur de ta façade, leurs prix hors taxes d'exemple, et le soir sans clignoter.",
  ...adressesDeLaPage("/exemples/a-garder/enseignes"),
};

const PALIERS = [
  { jusqua: 3, titre: "Une enseigne drapeau et la vitrophanie", prix: "à partir de 870 € HT · exemple", detail: "Sur une petite façade, on se fait voir de la rue plutôt que de face." },
  { jusqua: 5, titre: "Un caisson lumineux sur le bandeau", prix: "à partir de 1 300 € HT · exemple", detail: "Lisible de loin, simple à changer si l'activité évolue." },
  { jusqua: 8, titre: "Des lettres boîtier rétroéclairées", prix: "à partir de 2 400 € HT · exemple", detail: "Huit à douze lettres, et le halo sur la pierre." },
  { jusqua: 12, titre: "Lettres boîtier et enseigne drapeau", prix: "à partir de 3 090 € HT · exemple", detail: "Vue de face et en remontant la rue." },
];

export default function LesEnseignes() {
  return (
    <main>
      <EnTetePage
        nuit
        surtitre="Les enseignes"
        titre="Ce qui va *à ta façade.*"
        aside={
          <Apparition de="zoom" delai={250} className="mx-auto w-full max-w-[380px]">
            <Facade id="ag-ens-nuit" enseigne="Librairie" style="blanches" nuit allumage teinte="#3B2A2A" className="rounded-[14px] shadow-[0_30px_80px_-20px_rgba(242,181,68,.4)]" />
          </Apparition>
        }
      >
        Une enseigne se garde dix ans au-dessus d&apos;une vitrine. Glisse jusqu&apos;à la longueur de ta
        façade : voilà ce qu&apos;on te proposerait d&apos;abord.
      </EnTetePage>

      <section className="mx-auto grid max-w-6xl gap-14 px-5 py-24 sm:px-8 md:grid-cols-[0.9fr_1.1fr] md:items-center">
        <div className="space-y-6">
          <Apparition><Surtitre>Pour commencer</Surtitre></Apparition>
          <TitreRevele
            texte={"Ta façade *fait combien\u202f?*"}
            className="text-[clamp(2.8rem,6vw,5rem)] font-normal italic leading-[0.95] tracking-[-0.03em]"
            classeAccent="not-italic text-[var(--accent-texte)]"
          />
          <p className="text-lg leading-relaxed text-[var(--doux)]">
            Le montage sur ta photo dira le reste. Le règlement local peut limiter la taille d&apos;une
            enseigne : on vérifie avant de dessiner.
          </p>
        </div>
        <Apparition de="zoom">
          <CalculPalier
            etiquette="Longueur de ta façade"
            unite="m"
            min={2}
            max={12}
            depart={6}
            paliers={PALIERS}
            titreResultat="On te proposerait"
            legende="Prix hors taxes d'exemple, pose comprise : pour les enseignes, nos clients sont des professionnels."
          />
        </Apparition>
      </section>

      <section className="border-y border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
            {enseignes.map((e, i) => (
              <Apparition as="li" key={e.id} id={e.id} delai={i * 80} className="grid gap-3 py-8 md:grid-cols-[0.9fr_1.4fr_0.7fr] md:items-baseline md:gap-8">
                <h2 className="text-3xl font-normal italic sm:text-4xl">{e.nom}</h2>
                <p className="leading-relaxed text-[var(--doux)]">{e.texte}</p>
                <p className="font-bold md:text-right">
                  {e.prix}
                  <span className="block text-sm font-normal text-[var(--doux)]">exemple · pose comprise</span>
                </p>
              </Apparition>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
        <div className="mb-12 space-y-6">
          <Apparition><Surtitre>Comment ça se passe</Surtitre></Apparition>
          <TitreRevele
            texte="De la photo *au premier soir.*"
            className="text-[clamp(2.8rem,6vw,5rem)] font-normal italic leading-[0.95] tracking-[-0.03em]"
            classeAccent="not-italic text-[var(--accent-texte)]"
          />
        </div>
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {etapesEnseigne.map((e, i) => (
            <Apparition as="li" key={e.titre} delai={i * 110} className="space-y-3 rounded-[1.6rem] border border-[var(--trait)] bg-[var(--carte)] p-6">
              <p className="font-[family-name:var(--titres)] text-5xl italic text-[var(--accent-texte)]">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="text-2xl font-normal">{e.titre}</h3>
              <p className="leading-relaxed text-[var(--doux)]">{e.texte}</p>
            </Apparition>
          ))}
        </ol>
      </section>

      <section className="px-3 sm:px-5">
        <div className="kit-grain relative overflow-hidden rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 sm:px-10 md:grid-cols-2 md:items-center">
            <Apparition de="rideau" className="relative aspect-[3/2] overflow-hidden rounded-[1.6rem]">
              <Image src={photos.soudure.src} alt={photos.soudure.alt} fill sizes="(min-width: 768px) 520px, 100vw" className="kit-cinema-img object-cover" />
            </Apparition>
            <div className="space-y-6">
              <TitreRevele
                texte="Le soir, *sans clignoter.*"
                className="text-[clamp(2.8rem,6vw,5rem)] font-normal italic leading-[0.95] tracking-[-0.03em]"
                classeAccent="not-italic text-[#F5C76A]"
              />
              <p className="text-lg leading-relaxed">
                Les enseignes clignotantes sont interdites, sauf pour les pharmacies et les services
                d&apos;urgence. Et une enseigne lumineuse s&apos;éteint entre 1 h et 6 h quand l&apos;activité a
                cessé (Code de l&apos;environnement, art. R. 581-59). On règle l&apos;horloge à la pose.
              </p>
              <Bouton href={`${DOSSIER}#boutique`} variante="clair">Essayer sur ma façade</Bouton>
            </div>
          </div>
        </div>
      </section>

      <div className="h-20" />
      <AppelFinal />
    </main>
  );
}
