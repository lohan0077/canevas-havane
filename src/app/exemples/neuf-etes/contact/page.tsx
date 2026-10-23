import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import { EnTetePage, Surtitre, Titre } from "../_composants/Blocs";
import Formulaire from "../_composants/Formulaire";
import { entreprise, photos } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Contact — Neuf Étés (démonstration)",
  description: "Les coordonnées et le formulaire de contact d'une marque de piscines imaginaire de Drôme-Ardèche.",
  ...adressesDeLaPage("/exemples/neuf-etes/contact"),
};

export default function Contact() {
  return (
    <main>
      <EnTetePage surtitre="Contact" titre={"Une question\u00a0? *Appelle-nous.*"} photo={photos.mosaiqueEtBois}>
        Ou écris ici : on répond le jour même, en semaine. Pour un projet précis, le plus rapide
        reste de réserver la visite technique.
      </EnTetePage>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-8">
          <Apparition><Surtitre>Nous trouver</Surtitre></Apparition>
          <Apparition as="div" className="space-y-6 rounded-[2.5rem] bg-[var(--sombre)] p-8 text-[var(--sur-sombre)] sm:p-10">
            <dl className="space-y-6">
              <div>
                <dt className="text-[15px]">Téléphone</dt>
                <dd>
                  <a href={`tel:${entreprise.telephoneLien}`} className="font-[family-name:var(--titres)] text-[clamp(2rem,4.5vw,3rem)] font-bold tabular-nums text-[var(--accent)] underline-offset-4 hover:underline">
                    {entreprise.telephone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[15px]">Adresse</dt>
                <dd className="font-[family-name:var(--titres)] text-xl font-bold">{entreprise.adresse.join(", ")}</dd>
              </div>
              <div>
                <dt className="text-[15px]">Horaires</dt>
                <dd className="space-y-1">
                  {entreprise.horaires.map((h) => (
                    <span key={h.jours} className="block">
                      <span className="font-bold">{h.jours}</span> · {h.heures}
                    </span>
                  ))}
                </dd>
              </div>
              <div>
                <dt className="text-[15px]">Zone</dt>
                <dd>{entreprise.zone.join(", ")} · {entreprise.rayon}</dd>
              </div>
            </dl>
          </Apparition>
          <p className="text-[15px] text-[var(--doux)]">
            Numéro pris dans la tranche que l&apos;ARCEP réserve aux œuvres de fiction : il ne sonne chez personne.
          </p>
        </div>
        <div className="space-y-6">
          <Titre texte="Écrire *à l'équipe.*" taille="moyen" />
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
      </section>
    </main>
  );
}
