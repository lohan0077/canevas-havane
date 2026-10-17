import type { Metadata } from "next";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import BandeauDemonstration from "../_composants/BandeauDemonstration";
import { DOSSIER, avis, chantiers, engagements, entreprise, equipe, methode, photos, questions } from "./_composants/donnees";
import { Intitule, PhotoPlaque, Plaque, styles as s } from "./_composants/Habillage";
import { AppelFinal, CarteChantier, GrilleGammes, Section } from "./_composants/Blocs";
import Jardin from "./_composants/Jardin";
import CompteARebours from "./_composants/CompteARebours";
import Creneaux from "./_composants/Creneaux";
import EnTete from "./_composants/EnTete";
import Faq from "./_composants/Faq";
import Ouverture from "./_composants/Ouverture";

// Le site imaginé dans la vidéo « Si je devais remplir l'agenda d'un pisciniste »,
// devenu un site complet : chaque idée de la vidéo y est en état de marche — le
// jardin qui dit quelle piscine rentre, le premier dimanche de juillet, une page
// par chantier, les dates qu'on bloque soi-même — au milieu de tout ce qu'un vrai
// pisciniste montre. Premier écran : le modèle « Monolith Hero » de MotionSites.
export const metadata: Metadata = {
  title: "Premier Plongeon — site de démonstration",
  description: "Site de démonstration d'un pisciniste imaginaire, réalisé par Canevas Havane : la piscine qui rentre dans ton jardin, et la date de chantier qu'on bloque soi-même.",
  ...adressesDeLaPage("/exemples/premier-plongeon"),
};

const CHIFFRES = [
  { valeur: entreprise.chiffres.piscines, libelle: "piscines posées" },
  { valeur: String(entreprise.depuis), libelle: "notre première coque" },
  { valeur: `${entreprise.chiffres.semaines} sem.`, libelle: "de chantier, en moyenne" },
  { valeur: `${entreprise.avis.note}/5`, libelle: `sur ${entreprise.avis.nombre} avis` },
];

export default function PremierPlongeon() {
  return (
    <>
      {/* Le bandeau et l'ouverture partagent exactement un écran : le socle de
          l'ouverture reste visible quelle que soit la hauteur du bandeau. */}
      <div className="flex flex-col h-svh">
        <BandeauDemonstration entreprise="Premier Plongeon" />
        <Ouverture />
      </div>

      {/* Placée après l'ouverture, la barre défile avec elle puis reste en haut. */}
      <EnTete />

      <main>
        <Section id="prix" className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center">
          <div className="space-y-8">
            <Intitule libelle={"Ton jardin fait combien\u00A0?"} titre={<>La piscine qui rentre, <span className="text-[#e8d1cb]">à l&apos;échelle.</span></>}>
              Glisse jusqu&apos;à la surface de ton jardin : le plan te montre la coque qui
              rentre, et ce qu&apos;elle coûte vraiment, pose comprise.
            </Intitule>
            <Link href={`${DOSSIER}/prix`} className={`${s.lien} ${s.technique} text-sm inline-block`}>Ce qui fait varier le prix</Link>
          </div>
          <Jardin />
        </Section>

        <section aria-label="Premier Plongeon en chiffres" className="border-b border-[rgba(255,255,255,0.13)]">
          <ul className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4">
            {CHIFFRES.map((c, i) => (
              <li
                key={c.libelle}
                className={`px-5 sm:px-6 py-10 sm:py-12 space-y-2 border-[rgba(255,255,255,0.13)] ${i % 2 ? "border-l" : ""} ${i > 1 ? "border-t lg:border-t-0" : ""} ${i === 2 ? "lg:border-l" : ""}`}
              >
                <p className={`${s.titre} text-4xl sm:text-5xl tabular-nums whitespace-nowrap`}>{c.valeur}</p>
                <p className={`${s.technique} text-[11px] text-[#b9c0cc]`}>{c.libelle}</p>
              </li>
            ))}
          </ul>
          <p className="max-w-6xl mx-auto px-5 sm:px-6 pb-6 text-xs text-[#8f98a8]">Chiffres et avis d&apos;exemple : l&apos;entreprise est fictive.</p>
        </section>

        <Section className="space-y-14">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Intitule libelle="Nos piscines" titre={<>Quatre coques, <span className="text-[#e8d1cb]">un jardin chacune.</span></>}>
              Une coque d&apos;un seul tenant, fabriquée en atelier, posée en une matinée.
              Choisis-la d&apos;après ton jardin, pas d&apos;après un catalogue.
            </Intitule>
            <Link href={`${DOSSIER}/piscines`} className={`${s.lien} ${s.technique} text-sm`}>Toutes les piscines</Link>
          </div>
          <GrilleGammes />
        </Section>


        <Section sombre className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <PhotoPlaque photo={photos.mosaiqueEtBois} ratio="4 / 3" sizes="(min-width: 1024px) 540px, 100vw" coupe={28} />
          <div className="space-y-10">
            <Intitule libelle="Nos engagements" titre={<>Ce qui change <span className="text-[#e8d1cb]">avec nous.</span></>} />
            <ul className="grid gap-8 sm:grid-cols-2">
              {engagements.map((e) => (
                <li key={e.titre} className="space-y-2 border-t border-[rgba(255,255,255,0.13)] pt-5">
                  <h3 className="font-bold text-lg text-white">{e.titre}</h3>
                  <p className="leading-relaxed text-[#b9c0cc]">{e.texte}</p>
                </li>
              ))}
            </ul>
          </div>
        </Section>

        <Section id="ete" sombre className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-10">
            <Intitule
              long
              libelle="Pourquoi on fait ça"
              titre={<>On ne vend pas une piscine. On vend le <span className="text-[#e8d1cb]">premier dimanche de juillet.</span></>}
            >
              Le jour où toute la famille saute en même temps. Pour qu&apos;il arrive à
              l&apos;heure, le chantier se cale au printemps.
            </Intitule>
            <CompteARebours />
          </div>
          <PhotoPlaque photo={photos.eteEnFamille} ratio="4 / 5" sizes="(min-width: 1024px) 460px, 100vw" coupe={28} />
        </Section>

        <Section className="space-y-14">
          <Intitule libelle="Comment ça se passe" titre={<>Quatre étapes, <span className="text-[#e8d1cb]">aucune surprise.</span></>}>
            De la première visite au premier plongeon, tu sais toujours ce qui vient ensuite,
            et quand.
          </Intitule>
          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {methode.map((m, i) => (
              <li key={m.titre} className="h-full">
                <Plaque coupe={18} className="h-full">
                  <div className="h-full p-6 space-y-4">
                    <p className="flex items-center justify-between">
                      <span className={`${s.titre} text-4xl text-[#e8d1cb] tabular-nums`}>{String(i + 1).padStart(2, "0")}</span>
                      <span className={`${s.technique} text-[11px] text-[#8f98a8]`}>{m.duree}</span>
                    </p>
                    <h3 className={`${s.titre} text-xl`}>{m.titre}</h3>
                    <p className="leading-relaxed text-[#b9c0cc]">{m.texte}</p>
                  </div>
                </Plaque>
              </li>
            ))}
          </ol>
          <Link href={`${DOSSIER}/ma-date`} className={s.bouton}>Réserver la visite technique</Link>
        </Section>

        <Section id="chantiers" sombre className="space-y-14">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Intitule libelle="Nos réalisations" titre={<>Chaque chantier a <span className="text-[#e8d1cb]">sa page.</span></>}>
              La taille, la durée des travaux, le prix, et le chantier jour par jour.
              Exactement ce que tu cherches sur Google avant d&apos;appeler.
            </Intitule>
            <Link href={`${DOSSIER}/chantiers`} className={`${s.lien} ${s.technique} text-sm`}>Toutes les réalisations</Link>
          </div>
          <ul className="grid gap-10 md:grid-cols-3">
            {chantiers.map((c) => (
              <li key={c.slug}>
                <CarteChantier chantier={c} />
              </li>
            ))}
          </ul>
        </Section>

        <Section className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-8">
            <Intitule libelle="Ils ont plongé" titre={<>{entreprise.avis.note}<span className="text-[#e8d1cb]">/5</span></>}>
              Sur {entreprise.avis.nombre} avis laissés après la mise en eau.
            </Intitule>
            <p className="text-sm text-[#8f98a8]">Avis d&apos;exemple : l&apos;entreprise et ses clients sont fictifs.</p>
          </div>
          <ul className="space-y-6">
            {avis.map((a) => (
              <li key={a.auteur}>
                <Plaque coupe={18}>
                  <figure className="p-6 sm:p-8 space-y-5">
                    <blockquote className="text-lg sm:text-xl leading-relaxed text-white">« {a.texte} »</blockquote>
                    <figcaption className="flex flex-wrap items-baseline justify-between gap-3">
                      <span className="font-bold text-white">{a.auteur}</span>
                      <span className={`${s.technique} text-[11px] text-[#b9c0cc]`}>{a.contexte}</span>
                    </figcaption>
                  </figure>
                </Plaque>
              </li>
            ))}
          </ul>
        </Section>

        <Section sombre className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-8">
            <Intitule libelle="L'équipe" titre={<>Trois noms, <span className="text-[#e8d1cb]">un numéro.</span></>}>
              Une petite équipe, et deux poseurs qui travaillent avec nous depuis le début.
              On intervient en {entreprise.zone.join(", ")}, dans un rayon de {entreprise.rayon}.
            </Intitule>
            <Link href={`${DOSSIER}/entreprise`} className={`${s.lien} ${s.technique} text-sm inline-block`}>Découvrir l&apos;entreprise</Link>
          </div>
          <ul className="border-y border-[rgba(255,255,255,0.13)] divide-y divide-[rgba(255,255,255,0.13)]">
            {equipe.map((p) => (
              <li key={p.nom} className="grid gap-5 py-7 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-8">
                <Plaque coupe={14} fond="#0e1522" className="w-16 h-16">
                  <span className={`${s.technique} grid h-full place-items-center text-lg text-[#e8d1cb]`}>{p.initiales}</span>
                </Plaque>
                <div className="space-y-1">
                  <h3 className={`${s.titre} text-2xl`}>{p.nom}</h3>
                  <p className={`${s.technique} text-[11px] text-[#e8d1cb]`}>{p.role}</p>
                  <p className="pt-1 text-[#b9c0cc]">{p.phrase}</p>
                </div>
              </li>
            ))}
          </ul>
        </Section>

        <Section className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-8">
            <Intitule libelle="Questions" titre={<>Avant le <span className="text-[#e8d1cb]">premier appel.</span></>} />
            <Link href={`${DOSSIER}/questions`} className={`${s.lien} ${s.technique} text-sm inline-block`}>Toutes les questions</Link>
          </div>
          <Faq questions={questions.slice(0, 5)} />
        </Section>

        <Section id="date" sombre className="space-y-12">
          <Intitule libelle="Ma date" titre={<>Chantiers 2027&nbsp;: <span className="text-[#e8d1cb]">les dates.</span></>}>
            Pas de formulaire de quatorze champs. Tu choisis ta semaine, tu la bloques,
            on vient faire la visite technique.
          </Intitule>
          <Creneaux />
        </Section>

        <div className="pt-24">
          <AppelFinal />
        </div>
      </main>
    </>
  );
}
