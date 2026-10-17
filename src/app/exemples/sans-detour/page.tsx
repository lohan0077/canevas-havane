import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import Agenda from "./_composants/Agenda";
import { AppelFinal, Intitule, ListeNon, Photographie, Questions, Serif } from "./_composants/Blocs";
import { DOSSIER, cabinet, deroule, jeFais, photos, seanceAdulte } from "./_composants/donnees";

// Le site imaginé dans la vidéo « Si je devais remplir l'agenda d'un ostéopathe » :
// la page « Ce que je ne fais pas », le prix et la durée en gros avec la facture pour
// la mutuelle, et des créneaux à 7 h et à 20 h réservables en ligne. Premier écran
// inspiré du modèle « KnowSugar » de MotionSites (carte arrondie, photo au centre,
// mentions dans les coins, titre en deux voix), transposé au cabinet.
export const metadata: Metadata = {
  title: "Sans Détour — site de démonstration",
  description:
    "Site de démonstration d'un cabinet d'ostéopathie imaginaire, réalisé par Canevas Havane : ce que l'ostéopathe ne fait pas, le prix en gros, et des créneaux à 7 h et à 20 h.",
  ...adressesDeLaPage("/exemples/sans-detour"),
};

export default function SansDetour() {
  return (
    <main>
      {/* 1. L'ouverture : une carte arrondie, la photo, les mentions dans les coins. */}
      <section className="px-3 sm:px-6 pt-3 sm:pt-6">
        <div className="relative max-w-6xl mx-auto min-h-[600px] sm:min-h-[640px] overflow-hidden rounded-[32px] bg-[var(--sombre)] text-white">
          <Image src={photos.mainsDos.src} alt={photos.mainsDos.alt} fill priority sizes="(min-width: 1152px) 1152px, 100vw" className="object-cover object-[50%_30%]" />
          <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,24,22,0.72)_0%,rgba(18,24,22,0.25)_38%,rgba(18,24,22,0.86)_72%,rgba(18,24,22,0.96)_100%)]" />
          <div className="relative flex min-h-[600px] sm:min-h-[640px] flex-col justify-between p-5 sm:p-10">
            <div className="flex justify-between gap-6 text-[13px] leading-snug font-semibold">
              <p>{cabinet.praticien}<br />{cabinet.titre}</p>
              <p className="text-right">
                Séance adulte<br />{seanceAdulte.duree} · {seanceAdulte.prix}
              </p>
            </div>
            <div className="space-y-7">
              <h1 className="text-[46px] sm:text-7xl font-extrabold tracking-[-0.04em]">
                L&apos;ostéopathie, <Serif>sans détour.</Serif>
              </h1>
              <p className="max-w-md text-lg leading-relaxed text-[#E4E8E5]">
                Ce que je fais, ce que je ne fais pas, le prix et l&apos;heure : tout est écrit
                avant que vous poussiez la porte.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href={`${DOSSIER}/reserver`} className="flex items-center justify-center min-h-14 rounded-full bg-[#F1EFEA] px-7 text-lg font-extrabold text-[#1C2321]">
                  Réserver un créneau
                </Link>
                <Link href={`${DOSSIER}/ce-que-je-ne-fais-pas`} className="flex items-center justify-center min-h-14 rounded-full border-2 border-white/70 px-7 text-lg font-bold">
                  Ce que je ne fais pas
                </Link>
              </div>
              <p className="text-xs text-[#C9D0CC]">Prix d&apos;exemple · le cabinet est fictif</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. La page la plus importante, en résumé. */}
      <section className="px-3 sm:px-6 pt-3 sm:pt-6" id="ne-fais-pas">
        <div className="max-w-6xl mx-auto rounded-[32px] bg-[var(--sombre)] text-[var(--sur-sombre)] px-5 py-14 sm:px-12 sm:py-20 grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-8">
            <Intitule clair numero="01" surtitre="Comme tout ostéopathe — décret n° 2007-435" titre={<>Ce que je ne fais <Serif>pas.</Serif></>}>
              Ces trois lignes valent pour tous les ostéopathes. Je les écris en premier, parce
              que c&apos;est ce qu&apos;on ne vous dit jamais.
            </Intitule>
            <Link href={`${DOSSIER}/ce-que-je-ne-fais-pas`} className="inline-flex items-center gap-3 min-h-12 rounded-full bg-[#F1EFEA] px-6 font-extrabold text-[#1C2321]">
              Lire la page en entier <span aria-hidden="true">→</span>
            </Link>
          </div>
          <ListeNon />
        </div>
      </section>

      {/* 3. Le prix et la durée, en gros. */}
      <section className="max-w-6xl mx-auto px-5 sm:px-6 py-20 sm:py-28 grid gap-12 lg:grid-cols-2 lg:items-center" id="prix">
        <div className="space-y-6">
          <Intitule numero="02" surtitre="La séance adulte" titre={<>Le prix, <Serif>en gros.</Serif></>}>
            Pas de « tarif sur demande ». La durée, le prix, et la facture que vous remettez à
            votre mutuelle.
          </Intitule>
          <Link href={`${DOSSIER}/seance-et-prix`} className="inline-flex items-center gap-3 font-extrabold underline underline-offset-[6px] decoration-2 decoration-[var(--accent)]">
            Tous les tarifs <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="rounded-[32px] bg-[var(--carte)] border border-[var(--trait)] p-6 sm:p-10">
          <p className="flex flex-wrap items-baseline gap-x-5 font-extrabold tracking-[-0.05em] tabular-nums">
            <span className="text-[76px] sm:text-[110px] leading-none">{seanceAdulte.duree.replace(" min", "")}<span className="text-3xl sm:text-4xl tracking-[-0.02em]"> min</span></span>
            <span className="text-[76px] sm:text-[110px] leading-none text-[var(--accent-texte)]">{seanceAdulte.prix}</span>
          </p>
          <ul className="mt-8 divide-y divide-[var(--trait)] border-y border-[var(--trait)] text-[17px]">
            <li className="flex justify-between gap-4 py-3.5"><span>Facture remise</span><span className="font-bold">à chaque séance</span></li>
            <li className="flex justify-between gap-4 py-3.5"><span>Paiement</span><span className="font-bold">carte, espèces, chèque</span></li>
            <li className="flex justify-between gap-4 py-3.5"><span>Séance à 7 h ou à 20 h</span><span className="font-bold">même prix</span></li>
          </ul>
          <p className="mt-4 text-sm text-[var(--doux)]">Prix d&apos;exemple, TTC. Le cabinet est fictif.</p>
        </div>
      </section>

      {/* 4. La séance, minute par minute. */}
      <section className="bg-[var(--carte)] border-y border-[var(--trait)]">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-20 sm:py-28 space-y-14">
          <Intitule numero="03" surtitre="Avant de réserver" titre={<>La séance, <Serif>expliquée avant.</Serif></>}>
            Quarante-cinq minutes, et vous savez à chaque instant ce qui se passe sur la table.
          </Intitule>
          <ol className="grid gap-px overflow-hidden rounded-[28px] bg-[var(--trait)] sm:grid-cols-2 lg:grid-cols-5">
            {deroule.map((d) => (
              <li key={d.titre} className="bg-[var(--carte)] p-6 space-y-3">
                <p className="text-sm font-bold tabular-nums text-[var(--accent-texte)]">{d.minute} min</p>
                <h3 className="text-2xl font-extrabold tracking-[-0.02em]">{d.titre}</h3>
                <p className="leading-relaxed text-[var(--doux)]">{d.texte}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5. L'agenda : 7 h et 20 h, réservables. */}
      <section id="agenda" className="max-w-6xl mx-auto px-5 sm:px-6 py-20 sm:py-28 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] scroll-mt-20">
        <div className="space-y-8">
          <Intitule numero="04" surtitre="Agenda en ligne" titre={<>7 h – 20 h. <Serif>Sans poser sa journée.</Serif></>}>
            Avant le travail ou après. Vous choisissez le jour, l&apos;heure, et vous laissez un
            nom et un téléphone. Rien d&apos;autre.
          </Intitule>
          <Photographie photo={photos.epaule} sizes="(min-width: 1024px) 460px, 100vw" className="hidden lg:block aspect-[4/5]" />
        </div>
        <Agenda />
      </section>

      {/* 6. Ce que je fais. */}
      <section className="max-w-6xl mx-auto px-5 sm:px-6 pb-20 sm:pb-28 grid gap-10 lg:grid-cols-2 lg:items-center">
        <Photographie photo={photos.mains} sizes="(min-width: 1024px) 560px, 100vw" className="aspect-[3/2]" />
        <div className="space-y-8">
          <Intitule numero="05" surtitre="Et ce que je fais" titre={<>Quatre choses, <Serif>à chaque fois.</Serif></>} />
          <ul className="space-y-4">
            {jeFais.map((j, i) => (
              <li key={j} className="flex gap-4 text-lg leading-relaxed">
                <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 border-[var(--encre)] text-sm font-extrabold tabular-nums">{i + 1}</span>
                {j}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 7. Le praticien : le titre et le diplôme, comme sur la plaque. */}
      <section className="px-3 sm:px-6">
        <div className="max-w-6xl mx-auto rounded-[32px] bg-[#E6E2D9] px-5 py-14 sm:px-12 sm:py-20 grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <Intitule numero="06" surtitre="Le praticien" titre={<>Un nom, <Serif>un diplôme.</Serif></>}>
            L&apos;ostéopathe indique son diplôme sur sa plaque et sur tout document. Ici, il
            est écrit en premier.
          </Intitule>
          <div className="rounded-[24px] bg-[var(--carte)] border border-[var(--trait)] p-7 sm:p-9 space-y-5 shadow-[0_24px_50px_-36px_rgba(28,35,33,0.6)]">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--doux)]">Sur la plaque du cabinet</p>
            <p className="text-4xl font-extrabold tracking-[-0.03em]">{cabinet.praticien}</p>
            <p className="text-2xl"><Serif>{cabinet.titre}</Serif></p>
            <dl className="grid gap-3 border-t border-[var(--trait)] pt-5 text-[15px]">
              <div className="space-y-0.5"><dt className="text-sm text-[var(--doux)]">Diplôme</dt><dd className="font-semibold">{cabinet.diplome}</dd></div>
              <div className="space-y-0.5"><dt className="text-sm text-[var(--doux)]">N° ADELI</dt><dd className="font-semibold tabular-nums">{cabinet.adeli} (exemple)</dd></div>
            </dl>
          </div>
        </div>
      </section>

      {/* 8. Le cabinet. */}
      <section className="max-w-6xl mx-auto px-5 sm:px-6 py-20 sm:py-28 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="grid grid-cols-[1.4fr_1fr] gap-3">
          <Photographie photo={photos.attente} sizes="(min-width: 1024px) 380px, 60vw" className="aspect-[4/5]" />
          <Photographie photo={photos.table} sizes="(min-width: 1024px) 260px, 40vw" className="aspect-[2/3] self-end" />
        </div>
        <div className="space-y-8">
          <Intitule numero="07" surtitre="Le cabinet" titre={<>Au 2e étage, <Serif>avec ascenseur.</Serif></>} />
          <dl className="divide-y divide-[var(--trait)] border-y border-[var(--trait)] text-[17px]">
            <div className="py-4 space-y-1"><dt className="text-sm font-bold uppercase tracking-[0.14em] text-[var(--doux)]">Adresse</dt><dd className="font-semibold">{cabinet.adresse}, {cabinet.ville}</dd></div>
            <div className="py-4 space-y-1"><dt className="text-sm font-bold uppercase tracking-[0.14em] text-[var(--doux)]">Horaires</dt><dd className="font-semibold">{cabinet.horaires}</dd></div>
            <div className="py-4 space-y-1"><dt className="text-sm font-bold uppercase tracking-[0.14em] text-[var(--doux)]">Téléphone</dt><dd className="font-semibold tabular-nums">{cabinet.telephone}</dd></div>
          </dl>
        </div>
      </section>

      {/* 9. Questions. */}
      <section className="max-w-6xl mx-auto px-5 sm:px-6 pb-20 sm:pb-28 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <Intitule numero="08" surtitre="Questions" titre={<>Avant le <Serif>premier rendez-vous.</Serif></>} />
        <Questions />
      </section>

      {/* 10. Réserver. */}
      <AppelFinal />
    </main>
  );
}
