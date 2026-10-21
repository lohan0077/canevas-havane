import type { Metadata } from "next";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, methode, photos } from "./_composants/donnees";
import { Affiche, Dessin, Faq, Intitule, Photo } from "./_composants/Blocs";
import Calcul from "./_composants/Calcul";
import RendezVous from "./_composants/RendezVous";

// L'accueil de Bonne Nouvelle. Dans l'ordre de la vidéo : pas un taux, le coup de fil
// qu'on attend ; on n'appelle que ses clients ; le dossier suivi comme un colis ; l'affiche
// « Oui ou non, on t'appelle » avec ses mentions, en vrai. Autour : les honoraires (et quand
// on les paie), la méthode, les questions, le rendez-vous qu'on prend soi-même.
export const metadata: Metadata = {
  title: "Bonne Nouvelle — site de démonstration",
  description:
    "Site de démonstration d'un cabinet de courtage imaginaire, réalisé par Canevas Havane : le dossier de prêt suivi comme un colis, et oui ou non, on t'appelle.",
  ...adressesDeLaPage("/exemples/bonne-nouvelle"),
};

const ONGLETS = ["Reçu", "Envoyé aux banques", "Réponse", "Fonds versés"];

export default function BonneNouvelle() {
  return (
    <div>
      {/* 1. L'ouverture. */}
      <section className="px-4 pt-12 sm:px-6 sm:pt-20">
        <div className="mx-auto max-w-3xl space-y-6 text-center">
          <p className="text-[12px] font-semibold tracking-[0.2em] text-[var(--accent-texte)] uppercase">Courtage en crédit immobilier · Lyon</p>
          <h1 className="text-[50px] font-normal tracking-[-0.03em] sm:text-[86px]">
            Le coup de fil <em className="font-normal">que tu attends.</em>
          </h1>
          <p className="mx-auto max-w-xl text-[17px] leading-relaxed text-[var(--doux)] sm:text-lg">
            Nous montons ton dossier de crédit immobilier, nous le présentons aux banques, et tu le
            suis comme un colis. Quand elles répondent, on t&apos;appelle. Oui ou non.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href={`${DOSSIER}/mon-dossier`} className="rounded-[12px] bg-[var(--encre)] px-6 py-3.5 font-semibold text-[var(--carte)]">Suivre un dossier d&apos;exemple</Link>
            <Link href="#rendez-vous" className="rounded-[12px] border border-[var(--encre)] px-6 py-3.5 font-semibold">Prendre rendez-vous</Link>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-5xl">
          <Dessin />
        </div>
        <div className="relative mx-auto -mt-6 max-w-4xl rounded-[24px] border border-[var(--trait)] bg-[var(--carte)] p-5 shadow-[0_40px_80px_-50px_rgba(27,42,65,0.6)] sm:-mt-16 sm:p-8">
          <div className="grid gap-5 sm:grid-cols-[1fr_1.2fr] sm:items-end">
            <p className="font-[family-name:var(--titres)] text-[28px] leading-tight sm:text-[34px]">Ton dossier se suit comme un colis.</p>
            <p className="text-[15px] leading-relaxed text-[var(--doux)]">Chaque étape, avec sa date. Plus besoin d&apos;appeler pour savoir où il en est : c&apos;est nous qui appelons.</p>
          </div>
          <ol className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {ONGLETS.map((o, i) => (
              <li key={o}>
                <Link href={`${DOSSIER}/mon-dossier`} className="flex h-full items-center justify-between gap-2 rounded-[14px] bg-[var(--fond)] px-4 py-3.5 text-[14px] font-semibold">
                  <span>
                    <span className="text-[var(--doux)] tabular-nums">0{i + 1} / </span>
                    {o}
                  </span>
                  <span aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 2. Oui ou non. */}
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-24 sm:px-6 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
        <Photo photo={photos.vert} sizes="(min-width: 1024px) 540px, 100vw" className="aspect-[4/3]" />
        <div className="space-y-6">
          <Intitule libelle="Pas un taux" titre={<>Un coup de fil. <em>Oui ou non.</em></>}>
            <p>
              Un courtier vend souvent un taux, et une flèche qui descend. Nous vendons le moment
              où ton téléphone sonne et où l&apos;on te dit ce que la banque a répondu. Si c&apos;est
              non, on t&apos;appelle aussi, et on t&apos;explique pourquoi.
            </p>
          </Intitule>
          <p className="rounded-[18px] border border-[var(--trait)] bg-[var(--carte)] p-4 text-[14px] leading-relaxed text-[var(--doux)]">
            Depuis le 11 août 2026, démarcher un particulier par téléphone sans son accord est interdit
            (code de la consommation, art. L223-1). Son propre client, lui, on l&apos;appelle : c&apos;est
            son dossier. Nous n&apos;appelons personne d&apos;autre.
          </p>
        </div>
      </section>

      {/* 3. Le suivi, en trois lignes. */}
      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-6 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
          <Intitule clair libelle="Suivre un dossier" titre={<>Reçu, envoyé, <em className="text-[#F2C14E]">réponse, fonds versés.</em></>}>
            <p>Entre ton numéro de dossier : chaque étape s&apos;affiche avec sa date et ce qui s&apos;y est passé. Deux dossiers d&apos;exemple t&apos;attendent, l&apos;un accordé, l&apos;autre refusé.</p>
          </Intitule>
          <ol className="space-y-3">
            {ONGLETS.map((o, i) => (
              <li key={o} className="flex items-center gap-4 rounded-[16px] bg-[#24364F] px-4 py-3.5">
                <span aria-hidden="true" className="grid h-9 w-9 place-items-center rounded-full bg-[#3FA36B] text-[14px] font-bold text-[#1B2A41]">✓</span>
                <span className="flex-1 text-[17px] font-semibold">{o}</span>
                <span className="text-[13px] text-[#C9D2DF]">{["3 mars", "6 mars", "21 mars", "28 avril"][i]}</span>
              </li>
            ))}
            <li>
              <Link href={`${DOSSIER}/mon-dossier`} className="mt-2 block rounded-[12px] bg-[#F2C14E] px-6 py-3.5 text-center font-semibold text-[#1B2A41]">Suivre le dossier n° 2 731</Link>
            </li>
          </ol>
        </div>
      </section>

      {/* 4. Ce que ça coûte. */}
      <section className="mx-auto max-w-6xl space-y-10 px-5 py-24 sm:px-6">
        <Intitule centre libelle="Honoraires" titre={<>Ce que tu nous paies, <em>et quand.</em></>}>
          <p>Glisse le montant que tu empruntes. Tu ne paies rien avant le versement des fonds : c&apos;est la loi, pour tous les courtiers.</p>
        </Intitule>
        <div className="mx-auto max-w-3xl">
          <Calcul />
        </div>
      </section>

      {/* 5. L'affiche. */}
      <section className="border-y border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-6 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
          <div className="space-y-6">
            <Intitule libelle="L'affiche" titre={<>Une seule affiche, <em>partout.</em></>}>
              <p>
                Et en bas, en vrai, lisibles : le nom, l&apos;adresse, le numéro ORIAS, et les phrases que
                la loi impose à toute publicité pour un crédit immobilier. Pas en corps 4.
              </p>
            </Intitule>
          </div>
          <Affiche />
        </div>
      </section>

      {/* 6. La méthode. */}
      <section className="mx-auto max-w-6xl space-y-12 px-5 py-24 sm:px-6">
        <Intitule libelle="Comment ça se passe" titre={<>Quatre étapes, <em>un coup de fil.</em></>} />
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {methode.map((m, i) => (
            <li key={m.titre} className="space-y-3 rounded-[22px] border border-[var(--trait)] bg-[var(--carte)] p-6">
              <p className="text-[13px] font-semibold text-[var(--doux)] tabular-nums">0{i + 1}</p>
              <h3 className="text-[26px] font-normal">{m.titre}</h3>
              <p className="text-[15px] leading-relaxed text-[var(--doux)]">{m.texte}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* 7. Deux photos. */}
      <section aria-label="Photos" className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-5 sm:px-6">
        <Photo photo={photos.jaune} sizes="(min-width: 1152px) 560px, 50vw" className="aspect-[3/4]" />
        <Photo photo={photos.porte} sizes="(min-width: 1152px) 560px, 50vw" className="mt-12 aspect-[3/4]" />
      </section>

      {/* 8. Questions. */}
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-24 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Intitule libelle="Questions" titre={<>Ce qu&apos;on nous <em>demande.</em></>} />
        <Faq />
      </section>

      {/* 9. Rendez-vous. */}
      <section id="rendez-vous" className="scroll-mt-20 bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="px-1">
            <Intitule clair libelle="Rendez-vous" titre={<>C&apos;est toi <em className="text-[#F2C14E]">qui choisis.</em></>}>
              <p>Une heure, au cabinet ou en visio, sans engagement. Le reste du temps, c&apos;est nous qui appelons, pour ton dossier.</p>
            </Intitule>
          </div>
          <RendezVous />
        </div>
      </section>
    </div>
  );
}
