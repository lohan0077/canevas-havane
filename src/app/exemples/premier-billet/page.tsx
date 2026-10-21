import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import Creneaux from "../_kit/Creneaux";
import { Faq, Intitule, Section } from "./_composants/Blocs";
import { FactureEncadree, Rosace } from "./_composants/Ornements";
import { DOSSIER, EQUIPE, HONORAIRES, MENTIONS, METHODE, MISSIONS, cabinet, photos } from "./_composants/donnees";

// L'accueil de Premier Billet. L'idée de la vidéo : ne pas vendre des bilans, mais fêter
// la première facture encaissée — comme le premier billet qu'un commerçant encadre.
// L'outil « Votre première facture » (page /premiere-facture), et le cadre envoyé aux
// clients du cabinet (page /le-cadre).
export const metadata: Metadata = {
  title: "Premier Billet — site de démonstration",
  description: "Site de démonstration d'un cabinet d'expertise comptable imaginaire, réalisé par Canevas Havane : le premier se fête, les autres se comptent. Un outil pour votre première facture.",
  ...adressesDeLaPage("/exemples/premier-billet"),
};

const CRENEAUX = [
  { libelle: "Mardi", sous: "10 h 00" },
  { libelle: "Mardi", sous: "15 h 30", pris: true },
  { libelle: "Mercredi", sous: "9 h 00" },
  { libelle: "Jeudi", sous: "14 h 00" },
  { libelle: "Vendredi", sous: "11 h 30", pris: true },
  { libelle: "Vendredi", sous: "16 h 00" },
];

export default function PremierBillet() {
  return (
    <main>
      <section className="relative overflow-hidden border-b-[3px] border-double border-[var(--trait)]">
        <Rosace className="pointer-events-none absolute -left-40 top-10 h-[28rem] w-[28rem] text-[var(--accent)] opacity-25" />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-5 pb-16 pt-12 sm:px-6 sm:pt-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-7">
            <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-[var(--accent-texte)]">Expertise comptable · créateurs d&apos;entreprise</p>
            <h1 className="text-[50px] font-semibold leading-[1.02] tracking-[-0.01em] sm:text-[82px]">
              Le premier se fête. <em className="font-normal">Les autres se comptent.</em>
            </h1>
            <p className="max-w-xl text-[18px] leading-relaxed text-[var(--doux)]">
              Premier Billet accompagne les entreprises qui commencent. Nous tenons vos comptes,
              comme tout cabinet ; et nous n&apos;oublions pas le jour où vous avez encaissé votre
              première facture.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href={`${DOSSIER}/premiere-facture`} className="inline-flex min-h-[54px] items-center bg-[var(--encre)] px-7 font-semibold text-[var(--fond)]">
                Faire ma première facture
              </Link>
              <Link href="#rendez-vous" className="inline-flex min-h-[54px] items-center border border-[var(--encre)] px-7 font-semibold">
                Rencontrer le cabinet
              </Link>
            </div>
          </div>
          <FactureEncadree className="mx-auto w-full max-w-[360px] rotate-[1.5deg]" />
        </div>
      </section>

      <Section className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <Intitule surtitre="Le premier billet" titre={<>Au-dessus de la caisse, <em className="font-normal">un billet encadré.</em></>}>
          <p>
            Certains commerçants encadrent le premier billet qu&apos;ils ont reçu, au-dessus de la
            caisse. Il ne vaut pas plus que les autres. Il dit seulement : ici, quelque chose a
            commencé.
          </p>
          <p className="mt-4">
            Nous faisons de la comptabilité, des bilans, des déclarations. Mais pour une
            entreprise qui démarre, la date qui compte, c&apos;est celle de la première facture payée.
          </p>
        </Intitule>
        <div className="relative aspect-[16/10] overflow-hidden border border-[var(--trait)]">
          <Image src={photos.poterie.src} alt={photos.poterie.alt} fill sizes="(min-width: 1024px) 540px, 100vw" className="object-cover" />
        </div>
      </Section>

      <Section className="grid gap-10 border-y-[3px] border-double border-[var(--trait)] lg:grid-cols-[1fr_1fr] lg:items-center">
        <Intitule surtitre="Un outil gratuit" titre={<>Votre première facture, <em className="font-normal">juste du premier coup.</em></>}>
          Les mentions de base, cochées à mesure que vous remplissez ; un aperçu de la facture ;
          et un tampon quand rien ne manque. Pour tout le monde, client du cabinet ou non.
          <p className="mt-6">
            <Link href={`${DOSSIER}/premiere-facture`} className="inline-flex min-h-[52px] items-center bg-[var(--encre)] px-6 font-semibold text-[var(--fond)]">
              Ouvrir l&apos;outil
            </Link>
          </p>
        </Intitule>
        <ul aria-label="Les mentions que l'outil vérifie" className="border border-[var(--trait)] bg-[var(--carte)]">
          {MENTIONS.map((m, i) => (
            <li key={m} className="flex items-center gap-4 border-b border-dashed border-[var(--trait)] px-5 py-3.5 last:border-0">
              <span className="font-[family-name:var(--titres)] text-[22px] font-semibold tabular-nums text-[var(--accent-texte)]">{i + 1}</span>
              {m}
            </li>
          ))}
        </ul>
      </Section>

      <Section sombre className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="space-y-8">
          <Intitule surtitre="Pour nos clients" titre={<>Votre première facture <em className="font-normal">mérite un cadre.</em></>}>
            Le jour où un client du cabinet encaisse sa première facture, nous lui envoyons le
            cadre. Par la poste, avec un mot écrit à la main. C&apos;est tout.
          </Intitule>
          <Link href={`${DOSSIER}/le-cadre`} className="inline-flex min-h-[52px] items-center bg-[var(--accent)] px-6 font-semibold text-[var(--sur-accent)]">
            Comment ça se passe
          </Link>
        </div>
        <div className="relative aspect-[3/2] overflow-hidden">
          <Image src={photos.colis.src} alt={photos.colis.alt} fill sizes="(min-width: 1024px) 540px, 100vw" className="object-cover" />
        </div>
      </Section>

      <Section id="missions" className="space-y-12">
        <Intitule surtitre="Missions" titre={<>Les autres factures, <em className="font-normal">nous les comptons.</em></>}>
          De la création au premier bilan, ce qu&apos;un cabinet d&apos;expertise comptable fait
          pour une entreprise qui commence.
        </Intitule>
        <ol className="grid gap-px border border-[var(--trait)] bg-[var(--trait)] sm:grid-cols-2">
          {MISSIONS.map((m, i) => (
            <li key={m.titre} className="space-y-2 bg-[var(--carte)] p-7">
              <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-[var(--accent-texte)]">N° {i + 1}</p>
              <h3 className="text-[28px] font-semibold">{m.titre}</h3>
              <p className="leading-relaxed text-[var(--doux)]">{m.texte}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="honoraires" className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <Intitule surtitre="Honoraires" titre="Écrits avant de commencer.">
          Hors taxes : notre clientèle est professionnelle. Ce sont des exemples ; vos honoraires
          sont fixés par écrit dans la lettre de mission, avant le début de la mission.
        </Intitule>
        <ul className="border-t-[3px] border-double border-[var(--trait)]">
          {HONORAIRES.map((h) => (
            <li key={h.offre} className="flex items-baseline justify-between gap-6 border-b border-[var(--trait)] py-5">
              <span>
                <span className="block text-[18px] font-semibold">{h.offre}</span>
                <span className="block text-[15px] text-[var(--doux)]">{h.detail}</span>
              </span>
              <span className="shrink-0 text-right font-[family-name:var(--titres)] text-[22px] font-semibold">
                {h.prix}
                {h.prix !== "Gratuit" && <span className="block font-[family-name:var(--texte)] text-[12px] font-normal text-[var(--doux)]">exemple</span>}
              </span>
            </li>
          ))}
        </ul>
      </Section>

      <Section sombre className="space-y-12">
        <Intitule surtitre="Méthode" titre="Quatre premières fois." />
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {METHODE.map((m, i) => (
            <li key={m.titre} className="space-y-3 border-t border-[var(--accent)] pt-5">
              <p className="font-[family-name:var(--titres)] text-[44px] font-semibold leading-none text-[var(--accent-texte)]">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="text-[24px] font-semibold">{m.titre}</h3>
              <p className="leading-relaxed text-[var(--doux)]">{m.texte}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <Intitule surtitre="Le cabinet" titre="Trois personnes, une adresse.">
          {cabinet.adresse.join(", ")}. Présentées par leurs initiales : le cabinet est fictif.
        </Intitule>
        <ul className="border-t-[3px] border-double border-[var(--trait)]">
          {EQUIPE.map((p) => (
            <li key={p.initiales} className="flex items-center gap-5 border-b border-[var(--trait)] py-5">
              <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full border-2 border-[var(--accent)] font-[family-name:var(--titres)] text-xl font-semibold">{p.initiales}</span>
              <span>
                <span className="block text-[13px] font-semibold uppercase tracking-[0.16em] text-[var(--accent-texte)]">{p.role}</span>
                <span className="block text-[17px]">{p.phrase}</span>
              </span>
            </li>
          ))}
        </ul>
      </Section>

      <Section className="grid gap-10 pt-0 lg:grid-cols-[0.8fr_1.2fr]">
        <Intitule surtitre="Questions" titre="Avant le premier rendez-vous." />
        <Faq />
      </Section>

      <Section id="rendez-vous" className="grid gap-10 border-t-[3px] border-double border-[var(--trait)] lg:grid-cols-[0.8fr_1.2fr]">
        <Intitule surtitre="Rendez-vous" titre="Une heure, pour votre projet.">
          Au cabinet ou par téléphone, au {cabinet.telephone} (numéro de fiction : il ne sonne chez personne).
        </Intitule>
        <div className="max-w-2xl">
          <Creneaux
            creneaux={CRENEAUX}
            colonnes={3}
            titreCarte="Votre premier rendez-vous"
            bouton="Réserver ce créneau"
            confirmation="Rendez-vous réservé : nous vous attendons."
            note="Créneaux d'exemple. Sur un vrai site, ils suivent l'agenda réel du cabinet."
          />
        </div>
      </Section>
    </main>
  );
}
