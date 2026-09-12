import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Conditions Générales de Vente",
  description: "Conditions générales de vente de Canevas Havane : prestations, prix, paiement, durée, propriété du site, résiliation et rachat.",
  ...adressesDeLaPage("/cgv"),
  robots: { index: false },
};

/** Dernière révision du texte — à mettre à jour à chaque modification de fond. */
const derniereMiseAJour = "12 septembre 2026";

const prestataire = {
  nomComplet: "Lohan Gault",
  marque: "Canevas Havane",
  adresse: "274 rue du Couas, 07430 Vernosc-lès-Annonay, France",
  siren: "927 448 647",
  siret: "927 448 647 00010",
  email: "gaultlohan@gmail.com",
};

const articles: { titre: string; contenu: React.ReactNode }[] = [
  {
    titre: "1. Objet et champ d'application",
    contenu: (
      <>
        <p>
          Les présentes conditions générales de vente régissent l'ensemble des prestations
          fournies par {prestataire.nomComplet}, entrepreneur individuel exerçant sous la
          marque {prestataire.marque}, {prestataire.adresse}, immatriculé sous le
          SIREN {prestataire.siren} (SIRET {prestataire.siret}), ci-après « le Prestataire ».
        </p>
        <p>
          Ces prestations sont <strong>exclusivement destinées à des professionnels</strong>{" "}
          agissant dans le cadre de leur activité — entreprises, associations, professions
          libérales — ci-après « le Client ». Elles ne s'adressent pas aux consommateurs au
          sens du code de la consommation.
        </p>
        <p>
          Toute commande implique l'acceptation sans réserve des présentes conditions, qui
          prévalent sur toutes conditions d'achat du Client, sauf accord écrit contraire.
        </p>
      </>
    ),
  },
  {
    titre: "2. Prestations proposées",
    contenu: (
      <>
        <p>Le Prestataire propose trois familles de prestations :</p>
        <ul className="space-y-3 list-disc pl-6">
          <li>
            <strong>Création de site internet en partenariat</strong> — conception,
            développement, hébergement et maintenance, sans avance de frais du Client. Le
            Prestataire se rémunère selon des modalités négociées et fixées au devis :
            montant forfaitaire ou pourcentage du bénéfice généré par le site.
          </li>
          <li>
            <strong>Référencement naturel (SEO)</strong> — prestation récurrente facturée
            par abonnement mensuel.
          </li>
          <li>
            <strong>Campagnes publicitaires (Ads)</strong> — prestation sur devis, établie
            après étude du marché du Client.
          </li>
        </ul>
        <p>
          Le contenu exact de chaque prestation est arrêté dans le devis signé, qui prévaut
          sur les descriptions commerciales figurant sur le site.
        </p>
      </>
    ),
  },
  {
    titre: "3. Devis et formation du contrat",
    contenu: (
      <>
        <p>
          Toute prestation fait l'objet d'un devis écrit détaillant son périmètre, ses
          modalités et son prix. Le devis est valable <strong>30 jours</strong> à compter de
          son émission.
        </p>
        <p>
          Le contrat est formé à la date de réception par le Prestataire du devis accepté,
          signé et daté par le Client. Aucune prestation n'est engagée avant cette date.
        </p>
      </>
    ),
  },
  {
    titre: "4. Prix",
    contenu: (
      <>
        <p>
          Les prix sont exprimés en euros et s'entendent <strong>nets de taxe</strong> :
          TVA non applicable, article 293 B du code général des impôts. Le Prestataire
          relève du régime de la franchise en base de TVA.
        </p>
        <ul className="space-y-3 list-disc pl-6">
          <li>
            <strong>Création de site en partenariat</strong> — aucun frais initial. La
            rémunération du Prestataire est négociée avec le Client et fixée au devis :
            soit un <strong>montant forfaitaire mensuel</strong>, soit un{" "}
            <strong>pourcentage du bénéfice mensuel</strong> généré par le site.
          </li>
          <li>
            <strong>Référencement naturel</strong> — <strong>150 € par mois</strong>,
            facturés indépendamment de la prestation de création.
          </li>
          <li>
            <strong>Campagnes publicitaires</strong> — sur devis. Le budget média est
            avancé et supporté par le Client ; il n'est pas inclus dans les honoraires.
          </li>
        </ul>
        <p>
          Les prix des prestations récurrentes peuvent être révisés une fois par an, moyennant
          un préavis écrit de deux mois. Le Client qui refuse la révision peut résilier sans
          frais avant sa prise d'effet.
        </p>
      </>
    ),
  },
  {
    titre: "5. Facturation et paiement",
    contenu: (
      <>
        <p>
          Les prestations récurrentes sont facturées mensuellement, à terme échu. La
          rémunération du partenariat est facturée mensuellement ; lorsqu'elle est assise
          sur le bénéfice, elle est calculée sur les résultats constatés le mois précédent,
          dont le Client communique les éléments.
        </p>
        <p>
          Sauf mention contraire au devis, les factures sont payables à{" "}
          <strong>30 jours</strong> à compter de leur date d'émission, par virement bancaire.
        </p>
        <p>
          Conformément aux articles L.441-10 et D.441-5 du code de commerce, tout retard de
          paiement entraîne de plein droit des pénalités calculées au taux d'intérêt de la
          Banque centrale européenne majoré de 10 points, ainsi qu'une indemnité forfaitaire
          pour frais de recouvrement de <strong>40 €</strong>, sans qu'un rappel soit
          nécessaire.
        </p>
        <p>
          En cas de défaut de paiement persistant plus de 30 jours après mise en demeure
          restée sans effet, le Prestataire peut suspendre les prestations en cours, y compris
          l'hébergement du site, après en avoir informé le Client par écrit avec un préavis de
          8 jours.
        </p>
      </>
    ),
  },
  {
    titre: "6. Durée, résiliation",
    contenu: (
      <>
        <p>
          Les prestations récurrentes sont conclues pour une durée indéterminée et peuvent
          être résiliées par l'une ou l'autre des parties, par écrit, moyennant un préavis
          de <strong>un mois</strong>. Les sommes dues au titre des prestations déjà exécutées
          restent exigibles.
        </p>
        <p>
          En cas de manquement grave de l'une des parties à ses obligations, l'autre partie
          peut résilier de plein droit après mise en demeure restée sans effet pendant
          15 jours.
        </p>
        <p>
          À la fin de la relation, le Prestataire restitue au Client, sur demande écrite
          formulée dans les 30 jours, les contenus et données propres au Client dans un format
          exploitable.
        </p>
      </>
    ),
  },
  {
    titre: "7. Propriété du site et rachat",
    contenu: (
      <>
        <p>
          Dans le cadre de la formule de partenariat sans avance de frais, le{" "}
          <strong>Prestataire demeure propriétaire du site</strong> — code source, architecture
          et développements — et en concède au Client un droit d'usage pour la durée du contrat.
        </p>
        <p>
          Le Client demeure en toute hypothèse propriétaire de sa marque, de ses contenus
          éditoriaux, de ses visuels et de ses données, qu'il garantit détenir les droits
          d'exploiter.
        </p>
        <p>
          Le Client peut à tout moment acquérir la pleine propriété du site. Le prix de rachat
          est égal, sauf accord différent formalisé au devis, à <strong>dix fois le bénéfice
          mensuel</strong> généré par le site, apprécié sur la moyenne des trois derniers mois.
          Le simulateur présenté sur le site est indicatif et ne constitue pas une offre ferme.
        </p>
        <p>
          Le rachat effectif transfère l'intégralité des droits d'exploitation au Client et met
          fin à la rémunération du partenariat, à compter du paiement complet du prix.
        </p>
      </>
    ),
  },
  {
    titre: "8. Obligations du Client",
    contenu: (
      <>
        <p>
          La bonne exécution des prestations suppose la collaboration active du Client. Celui-ci
          s'engage à fournir en temps utile les contenus, accès et informations nécessaires, à
          désigner un interlocuteur unique habilité à valider, et à communiquer de bonne foi les
          éléments comptables permettant de calculer la rémunération, lorsque celle-ci est
          assise sur le bénéfice.
        </p>
        <p>
          Les retards imputables au Client dans la fourniture de ces éléments décalent
          d'autant les délais convenus, sans que la responsabilité du Prestataire puisse
          être engagée.
        </p>
      </>
    ),
  },
  {
    titre: "9. Obligations et responsabilité du Prestataire",
    contenu: (
      <>
        <p>
          Le Prestataire est tenu d'une <strong>obligation de moyens</strong>. Il met en œuvre
          le soin et les compétences propres à sa profession, sans garantir un résultat
          commercial, un volume de trafic, un positionnement dans les moteurs de recherche ni
          un chiffre d'affaires déterminé — ces résultats dépendant de facteurs extérieurs
          qu'il ne maîtrise pas.
        </p>
        <p>
          La responsabilité du Prestataire est limitée aux dommages directs et prévisibles, et
          plafonnée au montant total des sommes effectivement perçues au titre de la prestation
          concernée au cours des douze mois précédant le fait générateur. Sont exclus les
          dommages indirects, notamment la perte de chiffre d'affaires, de clientèle ou de
          données non imputable au Prestataire.
        </p>
        <p>
          Le Prestataire ne peut être tenu responsable des interruptions imputables aux
          prestataires techniques tiers (hébergeur, registrar, moteurs de recherche, régies
          publicitaires) ni d'un cas de force majeure au sens de l'article 1218 du code civil.
        </p>
      </>
    ),
  },
  {
    titre: "10. Confidentialité et données personnelles",
    contenu: (
      <>
        <p>
          Chaque partie s'engage à préserver la confidentialité des informations non publiques
          reçues de l'autre, pendant la durée du contrat et les deux années qui suivent.
        </p>
        <p>
          Le traitement des données personnelles collectées par le Prestataire est décrit dans
          sa politique de confidentialité. Lorsque le Prestataire traite des données
          personnelles pour le compte du Client dans le cadre d'une prestation, il agit en
          qualité de sous-traitant au sens de l'article 28 du RGPD et un accord de
          sous-traitance est conclu.
        </p>
      </>
    ),
  },
  {
    titre: "11. Références commerciales",
    contenu: (
      <p>
        Sauf opposition écrite du Client, le Prestataire peut citer son nom, sa marque et
        présenter des visuels des réalisations effectuées à titre de référence commerciale,
        sur son site et ses supports de communication.
      </p>
    ),
  },
  {
    titre: "12. Droit applicable et litiges",
    contenu: (
      <>
        <p>
          Les présentes conditions sont soumises au <strong>droit français</strong>.
        </p>
        <p>
          En cas de différend, les parties s'engagent à rechercher une solution amiable avant
          toute action contentieuse. À défaut d'accord dans un délai de 30 jours à compter de
          la première réclamation écrite, le litige sera porté devant les tribunaux compétents
          du ressort du siège du Prestataire, y compris en cas de pluralité de défendeurs ou
          d'appel en garantie.
        </p>
      </>
    ),
  },
];

export default function CGV() {
  return (
    <div className="layout-safe-zone min-h-screen pb-48">
      <div className="max-centered-container px-6 max-w-4xl">
        <div className="mb-16 md:mb-24 space-y-6">
          <h1 className="text-3xl md:text-6xl font-medium uppercase tracking-tight text-[var(--color-foreground)] font-serif">
            Conditions Générales de Vente
          </h1>
          <div className="h-[1px] w-24 bg-[var(--color-primary)]"></div>
          <p className="text-[var(--color-foreground)]/70 text-xs uppercase tracking-[0.3em]">
            Dernière mise à jour : {derniereMiseAJour}
          </p>
        </div>

        <div className="space-y-16 text-[var(--color-foreground)]/70 font-light leading-loose section-spacer">
          {articles.map((article) => (
            <section key={article.titre} className="space-y-6">
              <h2 className="text-xs font-black uppercase tracking-[0.4em] text-[var(--color-primary-texte)]">
                {article.titre}
              </h2>
              {article.contenu}
            </section>
          ))}

          <section className="space-y-6">
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-[var(--color-primary-texte)]">
              Contact
            </h2>
            <p>
              Pour toute question relative aux présentes conditions :{" "}
              <a
                href={`mailto:${prestataire.email}`}
                className="text-[var(--color-primary-texte)] hover:underline decoration-1 underline-offset-4"
              >
                {prestataire.email}
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
