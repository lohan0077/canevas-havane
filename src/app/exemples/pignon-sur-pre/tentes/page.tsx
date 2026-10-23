import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import CarteLueur from "../../_kit/CarteLueur";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, Bouton, CarteTente, EnTetePage, Faq, PHOTO_TENTE, Surtitre, TERRE } from "../_composants/Blocs";
import { DOSSIER, OPTIONS, TENTES, photos } from "../_composants/donnees";

// Les trois tentes, leur capacité (celle du fabricant), leur prix TTC d'exemple pour le
// week-end, ce qui est compris, et ce qu'on pose avec.
export const metadata: Metadata = {
  title: "Les tentes — Pignon sur Pré, site de démonstration",
  description: "Trois tentes de réception, de 60 à 240 invités assis selon le fabricant, montées la veille. Site de démonstration, prix d'exemple.",
  ...adressesDeLaPage("/exemples/pignon-sur-pre/tentes"),
};

const COMPRIS = [
  "La visite du pré, trois semaines avant",
  "La livraison, dans un rayon de 30 km",
  "Le montage le vendredi, le démontage le lundi",
  "Les côtés amovibles, fermés ou ouverts",
  "Un numéro joignable tout le week-end",
];

const QUESTIONS_TENTES = [
  { q: "Pourquoi « capacité du fabricant » ?", r: "Parce que c'est lui qui conçoit chaque modèle et l'indique dans sa notice. On ne calcule pas une capacité à la louche : on te donne la sienne, puis on regarde avec toi ce que la piste ou le buffet retirent." },
  { q: "On peut la fermer s'il fait froid ?", r: "Oui : les côtés se ferment. Un chauffage d'appoint se prévoit à la visite, selon le modèle et la notice du fabricant." },
  { q: "Faut-il une autorisation ?", r: "Pour une fête ouverte au public, oui : une tente qui reçoit du public ne se monte pas sans l'autorisation de la mairie, et on prépare le dossier avec toi. Pour une fête privée, demande à ta mairie : on te dit quoi lui demander." },
];

export default function Tentes() {
  return (
    <main>
      <EnTetePage surtitre="Les tentes" titre="Trois tentes, *un week-end.*" photo={photos.tenteJardin} origine="50% 40%">
        Montées le vendredi, démontées le lundi. Les prix sont TTC, pour le week-end, montage et démontage compris&nbsp;: des
        exemples, l&apos;entreprise est fictive.
      </EnTetePage>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28">
        <ul className="grid gap-4 md:grid-cols-3">
          {TENTES.map((t, i) => (
            <Apparition as="li" key={t.id} delai={i * 120} de="zoom" className="group">
              <CarteLueur className="h-full rounded-[26px]">
                <CarteTente t={t} photo={PHOTO_TENTE[t.id]} />
              </CarteLueur>
            </Apparition>
          ))}
        </ul>
        <p className="mt-5 text-[13px] text-[var(--doux)]">Prix TTC d&apos;exemple. Capacité : celle du fabricant de chaque modèle, en invités assis à des tables rondes de dix.</p>
      </section>

      <section className="px-3 sm:px-5">
        <div className="kit-grain grid overflow-hidden rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)] lg:grid-cols-2">
          <div className="space-y-6 px-6 py-16 sm:px-12 md:py-24">
            <Surtitre clair>Compris</Surtitre>
            <TitreRevele texte="Dans le *prix.*" className="font-[family-name:var(--titres)] text-[clamp(3rem,6vw,5rem)] font-normal leading-[0.92] tracking-[-0.03em]" classeAccent="italic font-light text-[#F2C98A]" />
            <ul className="space-y-3 text-lg">
              {COMPRIS.map((c, i) => (
                <Apparition as="li" key={c} delai={i * 90} className="flex gap-3 border-b border-white/15 pb-3">
                  <span aria-hidden="true" className="text-[#F2C98A]">✿</span>
                  {c}
                </Apparition>
              ))}
            </ul>
          </div>
          <div className="relative min-h-[320px]">
            <Image src={photos.tenteNuit.src} alt={photos.tenteNuit.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-2">
        <div className="space-y-6">
          <Apparition><Surtitre>En plus</Surtitre></Apparition>
          <TitreRevele texte="Ce qu'on *pose avec.*" className="font-[family-name:var(--titres)] text-[clamp(3rem,5.5vw,4.8rem)] font-normal leading-[0.92] tracking-[-0.03em]" classeAccent={TERRE} />
          <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
            {OPTIONS.map((o, i) => (
              <Apparition as="li" key={o.nom} delai={i * 90} className="flex items-baseline justify-between gap-4 py-4">
                <span>
                  <span className="block font-[family-name:var(--titres)] text-2xl">{o.nom}</span>
                  <span className="block text-[15px] text-[var(--doux)]">{o.detail}</span>
                </span>
                <span className="shrink-0 font-semibold">{o.prix}</span>
              </Apparition>
            ))}
          </ul>
          <p className="text-[13px] text-[var(--doux)]">Prix TTC d&apos;exemple, pour le week-end.</p>
        </div>
        <div className="space-y-6">
          <Apparition><Surtitre>Questions</Surtitre></Apparition>
          <TitreRevele texte="Avant de *choisir.*" className="font-[family-name:var(--titres)] text-[clamp(3rem,5.5vw,4.8rem)] font-normal leading-[0.92] tracking-[-0.03em]" classeAccent={TERRE} />
          <Faq questions={QUESTIONS_TENTES} />
          <Bouton href={`${DOSSIER}#pre`}>Voir ma tente sur mon pré</Bouton>
        </div>
      </section>

      <AppelFinal />
    </main>
  );
}
