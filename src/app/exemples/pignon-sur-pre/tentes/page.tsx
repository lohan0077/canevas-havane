import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import { AppelFinal, Bouton, CarteTente, EnTetePage, Faq, Intitule, PHOTO_TENTE, Section } from "../_composants/Blocs";
import { DOSSIER, OPTIONS, TENTES, WEEKEND, photos } from "../_composants/donnees";

// Les trois tentes, leur capacité (celle du fabricant), leur prix TTC d'exemple pour le
// week-end, ce qui est compris, le week-end raconté de vendredi à lundi (venu de
// l'accueil dans la version carrée), et ce qu'on pose avec.
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

      <Section className="space-y-6">
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {TENTES.map((t, i) => (
            <Apparition as="li" key={t.id} delai={i * 120}>
              <CarteTente t={t} photo={PHOTO_TENTE[t.id]} />
            </Apparition>
          ))}
        </ul>
        <p className="text-[13px] text-[var(--doux)]">Prix TTC d&apos;exemple. Capacité : celle du fabricant de chaque modèle, en invités assis à des tables rondes de dix.</p>
      </Section>

      <Section fond="bg-[var(--sombre)] text-[var(--sur-sombre)]" className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div className="space-y-10">
          <Intitule surtitre="Compris" titre="Dans le *prix.*" clair />
          <ul className="divide-y divide-white/15 border-y border-white/15 text-lg">
            {COMPRIS.map((c, i) => (
              <Apparition as="li" key={c} delai={i * 90} className="py-3.5">{c}</Apparition>
            ))}
          </ul>
        </div>
        <Apparition className="relative aspect-[4/3] overflow-hidden rounded-2xl">
          <Image src={photos.tenteNuit.src} alt={photos.tenteNuit.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        </Apparition>
      </Section>

      <Section className="space-y-14">
        <Intitule
          surtitre="De vendredi à lundi"
          titre="La tranchée finie *avant l'apéro.*"
          texte="Ton week-end, raconté de la visite du pré au démontage. Ton terrain a le dernier mot, mais c'est le but."
        />
        <ol className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
          {WEEKEND.map((w, i) => (
            <Apparition as="li" key={w.titre} delai={i * 90} className="grid grid-cols-1 gap-2 py-6 md:grid-cols-[12rem_1fr_1.4fr] md:items-baseline md:gap-8">
              <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-[var(--doux)]">{w.quand}</p>
              <h3 className="font-[family-name:var(--titres)] text-2xl font-normal leading-tight">{w.titre}</h3>
              <p className="leading-relaxed text-[var(--doux)]">{w.texte}</p>
            </Apparition>
          ))}
        </ol>
      </Section>

      <Section fond="bg-[var(--carte)] border-y border-[var(--trait)]" className="grid grid-cols-1 gap-16 lg:grid-cols-2">
        <div className="space-y-10">
          <Intitule surtitre="En plus" titre="Ce qu'on *pose avec.*" />
          <div className="space-y-3">
            <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
              {OPTIONS.map((o, i) => (
                <Apparition as="li" key={o.nom} delai={i * 90} className="flex items-baseline justify-between gap-4 py-4">
                  <span>
                    <span className="block text-[17px] font-medium">{o.nom}</span>
                    <span className="block text-[15px] text-[var(--doux)]">{o.detail}</span>
                  </span>
                  <span className="shrink-0 tabular-nums">{o.prix}</span>
                </Apparition>
              ))}
            </ul>
            <p className="text-[13px] text-[var(--doux)]">Prix TTC d&apos;exemple, pour le week-end.</p>
          </div>
        </div>
        <div className="space-y-10">
          <Intitule surtitre="Questions" titre="Avant de *choisir.*" />
          <Faq questions={QUESTIONS_TENTES} />
          <Bouton href={`${DOSSIER}#pre`}>Voir ma tente sur mon pré</Bouton>
        </div>
      </Section>

      <AppelFinal />
    </main>
  );
}
