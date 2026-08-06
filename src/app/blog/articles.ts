export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  sections: { heading: string; paragraphs: string[] }[];
};

export const articles: Article[] = [
  {
    slug: "minimalisme-web-de-luxe",
    title: "L'impact du Minimalisme dans le Web de Luxe",
    excerpt:
      "Pourquoi l'absence de contenu est parfois la plus grande déclaration de valeur pour une marque de prestige, redéfinissant les codes de l'exclusivité numérique.",
    date: "12 Mars 2026",
    readTime: "6 min",
    category: "Site Internet",
    image: "/minimalist_luxury_office_blog_1773665242632.webp",
    sections: [
      {
        heading: "Le vide comme déclaration",
        paragraphs: [
          "Dans l'univers du luxe, chaque élément présent doit justifier son existence. Un site surchargé communique l'insécurité ; un site épuré communique la certitude. Les marques de prestige l'ont compris depuis longtemps dans leurs boutiques physiques : un produit exposé seul sur un piédestal vaut plus, aux yeux du visiteur, que cent produits alignés sur une étagère.",
          "Le web n'échappe pas à cette règle. L'espace blanc n'est pas un vide à combler, c'est un écrin. Il dirige le regard, hiérarchise l'information et confère à chaque mot, chaque image, un poids décuplé.",
        ],
      },
      {
        heading: "La lenteur maîtrisée",
        paragraphs: [
          "Contre-intuitivement, les expériences de luxe ne cherchent pas toujours l'efficacité immédiate. Une transition soignée, un défilement orchestré, une révélation progressive du contenu : autant de techniques qui transforment la visite en cérémonie.",
          "Attention toutefois : cette lenteur doit être un choix esthétique, jamais une contrainte technique. Un site lent à charger est une faute ; un site qui prend le temps de se dévoiler est une signature.",
        ],
      },
      {
        heading: "Ce que cela exige techniquement",
        paragraphs: [
          "Le minimalisme visuel repose paradoxalement sur une ingénierie exigeante : typographies chargées avec précision, images optimisées au pixel près, animations calibrées à la milliseconde. Moins il y a d'éléments, plus chacun doit être irréprochable.",
          "C'est toute la philosophie de notre atelier : la simplicité perçue est le produit d'une complexité maîtrisée.",
        ],
      },
    ],
  },
  {
    slug: "seo-semantique-au-dela-des-mots-cles",
    title: "SEO Sémantique : Au-delà des mots-clés",
    excerpt: "Comment dominer les résultats de recherche sans compromis esthétique.",
    date: "05 Mars 2026",
    readTime: "5 min",
    category: "SEO",
    image: "/seo-luxury-new.webp",
    sections: [
      {
        heading: "La fin du bourrage de mots-clés",
        paragraphs: [
          "Les moteurs de recherche ne comptent plus les occurrences d'un mot : ils comprennent le sens d'une page. L'algorithme évalue désormais la profondeur thématique, la cohérence du champ lexical et la capacité d'un contenu à répondre réellement à l'intention de recherche.",
          "Pour une marque haut de gamme, c'est une excellente nouvelle : il n'est plus nécessaire de sacrifier l'élégance rédactionnelle sur l'autel du référencement. Un texte bien écrit, précis et complet est devenu la meilleure stratégie SEO.",
        ],
      },
      {
        heading: "L'architecture sémantique",
        paragraphs: [
          "Le référencement moderne se joue à l'échelle du site entier. Chaque page doit occuper une place claire dans un maillage thématique : les pages piliers traitent les sujets larges, les pages satellites explorent les sous-thèmes, et les liens internes tissent la toile qui démontre votre autorité.",
          "Cette architecture invisible pour le visiteur est parfaitement lisible pour les moteurs — et c'est elle qui distingue un site qui existe d'un site qui domine.",
        ],
      },
      {
        heading: "La technique au service du contenu",
        paragraphs: [
          "Vitesse de chargement, données structurées, rendu serveur, balisage impeccable : les fondations techniques ne font pas gagner de positions à elles seules, mais leur absence en fait perdre. Notre approche : une base technique irréprochable, sur laquelle le contenu peut exprimer tout son potentiel.",
        ],
      },
    ],
  },
  {
    slug: "acquisition-haut-de-gamme",
    title: "L'Art de l'Acquisition Haut de Gamme",
    excerpt: "Guider l'utilisateur vers l'action avec des stratégies Ads ciblées.",
    date: "24 Février 2026",
    readTime: "5 min",
    category: "Ads",
    image: "/ads-luxury-new.webp",
    sections: [
      {
        heading: "Le paradoxe de la publicité de luxe",
        paragraphs: [
          "Une marque de prestige ne peut pas crier. La publicité digitale classique — promotions agressives, urgence artificielle, surenchère visuelle — détruit précisément ce qu'elle est censée vendre : la rareté et la désirabilité.",
          "L'acquisition haut de gamme repose sur l'inverse : des messages sobres, un ciblage chirurgical et des pages de destination qui prolongent l'expérience de marque au lieu de la rompre.",
        ],
      },
      {
        heading: "Cibler moins, convertir mieux",
        paragraphs: [
          "Sur Google Ads comme sur les plateformes sociales, la tentation est de maximiser le volume. Pour une offre premium, c'est une erreur : mieux vaut cent visiteurs qualifiés que dix mille curieux. Audiences affinées, mots-clés d'intention forte, exclusions rigoureuses : chaque euro investi doit toucher une personne réellement susceptible de devenir cliente.",
          "Le coût par clic est plus élevé ; le coût par client, lui, s'effondre.",
        ],
      },
      {
        heading: "Mesurer ce qui compte",
        paragraphs: [
          "Les impressions et les clics flattent les rapports mensuels mais ne paient pas les factures. Nous construisons chaque campagne autour d'un indicateur unique : la valeur générée par contact qualifié. C'est cette discipline de mesure qui transforme la publicité d'un centre de coût en levier de croissance.",
        ],
      },
    ],
  },
  {
    slug: "avenir-des-dashboards-sur-mesure",
    title: "L'Avenir des Dashboards Sur-Mesure",
    excerpt: "Explorer les nouvelles dimensions du pilotage d'entreprise tout-en-un.",
    date: "15 Février 2026",
    readTime: "6 min",
    category: "Applications Sur Mesure",
    image: "/edificia-dashboard.webp",
    sections: [
      {
        heading: "La fin des tableurs héroïques",
        paragraphs: [
          "Derrière la plupart des PME performantes se cache encore un fichier Excel tentaculaire, maintenu à bout de bras par une personne clé. Ce modèle atteint vite ses limites : erreurs silencieuses, données périmées, dépendance à un seul cerveau.",
          "Le dashboard sur mesure remplace cet artisanat fragile par un outil vivant : les données se consolident seules, les indicateurs se mettent à jour en temps réel, et chaque décideur voit exactement ce dont il a besoin.",
        ],
      },
      {
        heading: "Sur mesure ne veut pas dire complexe",
        paragraphs: [
          "Le piège des outils métier est de vouloir tout afficher. Un bon dashboard fait l'inverse : il tranche. Trois indicateurs vitaux en pleine lumière, le reste accessible en un clic mais jamais imposé. La valeur d'un outil de pilotage se mesure au nombre de décisions qu'il accélère, pas au nombre de graphiques qu'il affiche.",
        ],
      },
      {
        heading: "L'intelligence prédictive arrive",
        paragraphs: [
          "La prochaine génération d'outils ne se contente plus de décrire le passé : projection de trésorerie, détection d'anomalies, alertes avant que le problème ne devienne visible. C'est ce que nous avons construit pour Kéo et Edificia — des outils qui ne montrent pas seulement où en est l'entreprise, mais où elle va.",
        ],
      },
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
