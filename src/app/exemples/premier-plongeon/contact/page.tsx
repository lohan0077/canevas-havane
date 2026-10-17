import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import { entreprise } from "../_composants/donnees";
import { Intitule, Plaque, styles as s } from "../_composants/Habillage";
import { HautDePage } from "../_composants/Blocs";
import Formulaire from "../_composants/Formulaire";

export const metadata: Metadata = {
  title: "Contact — Premier Plongeon (démonstration)",
  description: "Les coordonnées et le formulaire de contact d'un pisciniste imaginaire de Drôme-Ardèche.",
  ...adressesDeLaPage("/exemples/premier-plongeon/contact"),
};

export default function Contact() {
  return (
    <>
      <HautDePage />
      <main className="max-w-6xl mx-auto px-5 sm:px-6 pt-14 sm:pt-20 pb-24 grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-10">
          <Intitule niveau={1} libelle="Contact" titre={<>Une question&nbsp;? <span className="text-[#e8d1cb]">Appelle-nous.</span></>}>
            Ou écris ici : on répond le jour même, en semaine. Pour un projet précis, le plus
            rapide reste de réserver la visite technique.
          </Intitule>
          <Plaque coupe={22}>
            <dl className="p-6 sm:p-8 space-y-6">
              <div>
                <dt className={`${s.technique} text-[11px] text-[#8f98a8]`}>Téléphone</dt>
                <dd className="pt-1">
                  <a href={`tel:${entreprise.telephoneLien}`} className={`${s.lien} ${s.titre} text-3xl`}>{entreprise.telephone}</a>
                </dd>
              </div>
              <div>
                <dt className={`${s.technique} text-[11px] text-[#8f98a8]`}>Adresse</dt>
                <dd className="pt-1 text-white leading-relaxed">
                  {entreprise.adresse.map((l) => (
                    <span key={l} className="block">{l}</span>
                  ))}
                </dd>
              </div>
              <div>
                <dt className={`${s.technique} text-[11px] text-[#8f98a8]`}>Horaires</dt>
                <dd className="pt-1 space-y-1">
                  {entreprise.horaires.map((h) => (
                    <span key={h.jours} className="block text-[#b9c0cc]">
                      <span className="text-white">{h.jours}</span> · {h.heures}
                    </span>
                  ))}
                </dd>
              </div>
              <div>
                <dt className={`${s.technique} text-[11px] text-[#8f98a8]`}>Zone</dt>
                <dd className="pt-1 text-[#b9c0cc]">{entreprise.zone.join(", ")} · {entreprise.rayon}</dd>
              </div>
            </dl>
          </Plaque>
          <p className="text-sm text-[#8f98a8]">
            Numéro pris dans la tranche que l&apos;ARCEP réserve aux œuvres de fiction : il ne sonne chez personne.
          </p>
        </div>
        <div className="space-y-6">
          <h2 className={`${s.titre} text-3xl`}>Écrire à l&apos;équipe</h2>
          <Formulaire
            champs={[
              { nom: "nom", libelle: "Ton nom", requis: true, autocomplete: "name" },
              { nom: "telephone", libelle: "Ton téléphone", type: "tel", requis: true, autocomplete: "tel" },
              { nom: "message", libelle: "Ton message", type: "textarea", requis: true },
            ]}
            bouton="Envoyer"
            confirmation="Message bien reçu"
          />
        </div>
      </main>
    </>
  );
}
