import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import Creneaux from "../_kit/Creneaux";
import Annee from "./_composants/Annee";
import Appeler from "./_composants/Appeler";
import { Faq, Intitule, Section } from "./_composants/Blocs";
import { Croissant } from "./_composants/EnTete";
import Ouverture, { Ciel } from "./_composants/Ouverture";
import Plan from "./_composants/Plan";
import SectionAnnee from "./_composants/SectionAnnee";
import { FicheTarif } from "./_composants/Tarifs";
import { ACTES, DOSSIER, EQUIPE, SOINS, cabinet, photos } from "./_composants/donnees";

// L'accueil de Douze Lunes. Les trois idées de la vidéo y sont en état de marche :
// un seul champ (la date de naissance) qui pose toute la première année, chaque
// visite réservable d'un geste ; le soir, l'accueil qui devient la page de garde ;
// des prix datés, avec ce qu'ils comprennent et ce qui peut s'ajouter.
export const metadata: Metadata = {
  title: "Douze Lunes — site de démonstration",
  description: "Site de démonstration d'un cabinet vétérinaire imaginaire, réalisé par Canevas Havane : la première année de votre chaton posée dès sa naissance, et la garde du soir en haut de l'accueil.",
  ...adressesDeLaPage("/exemples/douze-lunes"),
};

const ETAPES = [
  { titre: "Sa date de naissance", texte: "Un seul champ, en haut de l'accueil. Rien d'autre à remplir." },
  { titre: "Son année, posée", texte: "Les cinq visites de sa première année, chacune avec sa date, selon le protocole du cabinet." },
  { titre: "Un geste par visite", texte: "Vous réservez celles que vous voulez ; le cabinet vous rappelle pour l'heure." },
];

const CRENEAUX = [
  { libelle: "Lundi", sous: "9 h 30", pris: true },
  { libelle: "Lundi", sous: "17 h 15" },
  { libelle: "Mardi", sous: "10 h 45" },
  { libelle: "Mercredi", sous: "8 h 45", pris: true },
  { libelle: "Jeudi", sous: "14 h 30" },
  { libelle: "Samedi", sous: "11 h 00" },
];

export default function DouzeLunes() {
  const sterilisation = ACTES.find((a) => a.id === "sterilisation-chatte") ?? ACTES[0];
  return (
    <main>
      <Annee>
        <Ouverture />
        <Section id="annee" className="pt-14 sm:pt-20">
          <SectionAnnee />
        </Section>
      </Annee>

      <Section className="space-y-12">
        <Intitule surtitre="Comment ça marche" titre={<>Pas au hasard des urgences. <span className="text-[var(--accent-texte)]">Dès la naissance.</span></>} pleines={3}>
          On ne vous appelle pas pour vous rappeler un vaccin oublié : son année est écrite
          avant qu&apos;il en ait besoin.
        </Intitule>
        <ol className="grid gap-5 md:grid-cols-3">
          {ETAPES.map((e, i) => (
            <li key={e.titre} className="rounded-[28px] border border-[var(--trait)] bg-[var(--carte)] p-7 space-y-3">
              <p className="font-[family-name:var(--titres)] text-5xl text-[var(--accent-texte)] tabular-nums">{i + 1}</p>
              <h3 className="text-2xl">{e.titre}</h3>
              <p className="leading-relaxed text-[var(--doux)]">{e.texte}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[32px]">
          <Image src={photos.visite.src} alt={photos.visite.alt} fill sizes="(min-width: 1024px) 500px, 100vw" className="object-cover" />
        </div>
        <div className="space-y-10">
          <Intitule surtitre="Les soins" titre="Ce que l'on fait au cabinet." pleines={6} />
          <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {SOINS.map((s) => (
              <li key={s.titre} className="space-y-1.5 border-t border-[var(--trait)] pt-4">
                <h3 className="text-xl">{s.titre}</h3>
                <p className="leading-relaxed text-[var(--doux)]">{s.texte}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div className="space-y-8">
          <Intitule surtitre="Les prix" titre={<>Clair, honnête <span className="text-[var(--accent-texte)]">et daté.</span></>} pleines={9}>
            Chaque acte a sa fiche : le prix, ce qui est compris, ce qui peut s&apos;ajouter, et
            la date du tarif. C&apos;est ce que demande notre code de déontologie (Code rural,
            art. R242-35) ; on l&apos;affiche avant que vous ne le demandiez.
          </Intitule>
          <Link href={`${DOSSIER}/tarifs`} className="inline-flex min-h-[52px] items-center rounded-full bg-[var(--encre)] px-7 font-bold text-[var(--fond)]">
            Tous les tarifs
          </Link>
        </div>
        <FicheTarif acte={sterilisation} />
      </Section>

      <Section sombre className="relative overflow-hidden">
        <Ciel />
        <div className="relative grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-8">
            <Intitule surtitre="Le soir" titre={<>Le soir, ce site <span className="text-[var(--accent-texte)]">change de visage.</span></>} pleines={12}>
              À la fermeture, l&apos;accueil devient la page de garde : qui appeler, où aller,
              en haut de l&apos;écran. Parce qu&apos;à vingt-trois heures, personne ne cherche nos
              horaires. Essayez l&apos;interrupteur, en haut de l&apos;écran.
            </Intitule>
            <Link href={`${DOSSIER}/garde`} className="inline-flex min-h-[52px] items-center gap-2.5 rounded-full bg-[var(--accent)] px-7 font-bold text-[var(--sur-accent)]">
              <Croissant className="h-5 w-5" />
              La page de garde
            </Link>
          </div>
          <div className="relative mx-auto aspect-[2/3] w-full max-w-[340px] overflow-hidden rounded-[32px]">
            <Image src={photos.nuit.src} alt={photos.nuit.alt} fill sizes="340px" className="object-cover" />
          </div>
        </div>
      </Section>

      <Section id="cabinet" className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-8">
          <Intitule surtitre="Le cabinet" titre="Deux vétérinaires, un accueil, une salle pour les chats." pleines={5}>
            Les chats attendent à part, loin des chiens. Les chiots ont leur créneau de fin
            d&apos;après-midi. Et le téléphone répond aux heures d&apos;ouverture.
          </Intitule>
          <div className="relative aspect-[3/2] overflow-hidden rounded-[28px]">
            <Image src={photos.chiot.src} alt={photos.chiot.alt} fill sizes="(min-width: 1024px) 480px, 100vw" className="object-cover" />
          </div>
        </div>
        <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)] self-start">
          {EQUIPE.map((p) => (
            <li key={p.initiales} className="flex items-center gap-5 py-6">
              <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-[var(--carte)] border border-[var(--trait)] font-[family-name:var(--titres)] text-xl">
                {p.initiales}
              </span>
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.14em] text-[var(--accent-texte)]">{p.role}</p>
                <p className="text-lg">{p.phrase}</p>
              </div>
            </li>
          ))}
          <li className="py-5 text-sm text-[var(--doux)]">
            Équipe d&apos;exemple, présentée par ses initiales : le cabinet est fictif.
          </li>
        </ul>
      </Section>

      <Section id="rendez-vous" className="space-y-10">
        <Intitule surtitre="Une consultation" titre="Un rendez-vous cette semaine." pleines={7}>
          Pour une consultation ordinaire, choisissez un créneau et bloquez-le. Pour une
          urgence pendant nos heures d&apos;ouverture, appelez : on vous prend dans la journée.
        </Intitule>
        <div className="max-w-2xl">
          <Creneaux
            creneaux={CRENEAUX}
            colonnes={3}
            titreCarte="Votre consultation"
            bouton="Bloquer ce créneau"
            confirmation="Créneau bloqué : le cabinet vous rappelle pour confirmer."
            note="Créneaux d'exemple. Sur un vrai site, ils suivent l'agenda réel du cabinet."
          />
        </div>
      </Section>

      <Section className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <Intitule surtitre="Questions" titre="Avant d'appeler." pleines={10} />
        <Faq />
      </Section>

      <Section id="venir" className="grid gap-12 lg:grid-cols-2 lg:items-start">
        <div className="space-y-8">
          <Intitule surtitre="Nous trouver" titre="Au cabinet." pleines={12}>
            {cabinet.adresse.join(", ")}. Parking devant le cabinet ; les caisses de transport
            passent la porte sans détour.
          </Intitule>
          <ul className="space-y-2 text-lg">
            {cabinet.horaires.map((h) => (
              <li key={h.jours} className="flex flex-wrap justify-between gap-x-6 border-b border-[var(--trait)] pb-2">
                <span className="font-semibold">{h.jours}</span>
                <span className="text-[var(--doux)]">{h.heures}</span>
              </li>
            ))}
          </ul>
          <div className="max-w-sm">
            <Appeler numero={cabinet.telephone} libelle="Appeler le cabinet" />
          </div>
        </div>
        <Plan depart="Vous" arrivee="Douze Lunes" duree="Adresse d'exemple" bouton="Le chemin" />
      </Section>
    </main>
  );
}
