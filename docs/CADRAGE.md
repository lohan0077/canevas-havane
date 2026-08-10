# Cadrage — Canevas Havane

> Écrit le 10/08/2026, après coup : le site existait depuis août 2026 sans document de
> cadrage. Ce texte reconstitue ce que le site fait réellement — il est tiré du code, des
> pages publiées et des CGV, pas d'un entretien. **Les points marqués « à confirmer » n'ont
> pas de réponse dans le code ; ils attendent celle de Lohan.**
>
> Son intérêt n'est pas rétrospectif. C'est la référence qui permettra, dans six mois, de
> dire si une idée nouvelle est dans le périmètre ou non — et de ne pas redécouvrir en
> chemin qu'ajouter un paiement en ligne change la nature juridique du site.

## Ce que c'est

Le site vitrine de **Canevas Havane**, agence de création numérique. Lohan Gault,
micro-entreprise, SIREN 927 448 647, Vernosc-lès-Annonay (Ardèche).

Il a **un seul but** : qu'un dirigeant de PME qui découvre l'agence prenne contact. Tout le
reste — les études de cas, le journal, la page tarifs — sert cet objectif unique.

## Pour qui

Des **dirigeants de PME**, en France, qui cherchent un site haut de gamme et qui hésitent
devant l'avance de frais. Ce ne sont pas des acheteurs techniques : ils jugent sur l'allure,
la crédibilité des références et la clarté de l'offre.

Les CGV le disent explicitement, et cela a des conséquences juridiques : les prestations
sont **exclusivement destinées à des professionnels**, jamais à des consommateurs au sens du
code de la consommation. C'est ce qui rend légitimes l'absence de droit de rétractation et
l'absence de médiateur de la consommation. **Si un jour l'agence vend à des particuliers,
les deux deviennent obligatoires** — et les CGV sont à réécrire avant la première vente.

## Le modèle économique

Site livré **sans avance de frais**, rémunération sur le bénéfice généré. Abonnement SEO à
150 €/mois. Rachat possible à 10 × le bénéfice mensuel. TVA non applicable — franchise en
base, article 293 B du CGI.

Aucun paiement n'a lieu sur le site : tout se règle hors ligne, par devis et facture.

## Le parcours critique

Un seul, et il tient en une phrase : **un visiteur arrive, comprend l'offre, remplit le
formulaire de contact, et Lohan reçoit son message.**

C'est le seul chemin qui, s'il casse, fait perdre de l'argent. D'où trois conséquences qui
gouvernent les priorités techniques :

1. **La disponibilité du formulaire prime sur tout le reste.** Un formulaire fermé une heure
   coûte plus qu'une page mal alignée. C'est pourquoi le plafond global de 40 envois/heure
   n'est décompté qu'au moment où un e-mail va réellement partir, et pourquoi les requêtes
   venues d'un autre site sont refusées avant d'entamer le moindre compteur.
2. **Échouer en se fermant.** Si la configuration d'envoi manque, la route refuse (503) au
   lieu de faire croire à un envoi. Un message perdu en silence, c'est un client perdu sans
   qu'on le sache.
3. **`/api/health` renvoie 503 si l'envoi n'est plus configuré** — c'est le seul moyen
   d'apprendre que le formulaire est en panne autrement que par le silence du téléphone.

## Hors périmètre — et pourquoi

Ces absences sont des décisions, pas des retards. Chacune coûterait cher à introduire :

| Hors périmètre | Ce que l'ajouter impliquerait |
|---|---|
| Base de données | Le socle entier : schéma, cloisonnement, sauvegardes restaurables, migrations |
| Comptes utilisateurs | Authentification, autorisations, RGPD sur des données de compte |
| Paiement en ligne | Webhooks signés, idempotence, facturation, cycle d'abonnement complet |
| Traceurs et mesure d'audience | Bandeau de consentement, registre, refonte de la politique de confidentialité |
| Multilingue | Doublement du contenu, `hreflang`, canoniques par langue |

**Le bandeau de cookies a été retiré parce qu'il n'y a aucun traceur.** Prétendre recueillir
un consentement qu'on n'a pas besoin de recueillir est aussi faux que l'inverse. Si un
traceur est ajouté un jour, le bandeau et `/confidentialite` se mettent à jour **dans le
même commit** — pas après.

## Données personnelles

Une seule collecte : **nom, adresse e-mail et message**, via le formulaire de contact.

- **Base légale** : intérêt légitime — répondre à une demande commerciale entrante.
- **Destinataires** : Google (acheminement de l'e-mail) et Hetzner (hébergement). Aucun
  autre. Les polices sont servies depuis le domaine, il n'y a plus aucune requête vers un
  tiers au chargement d'une page.
- **Ce qui n'est pas stocké** : rien. Aucune base, aucun journal de contenu. Le message
  transite et arrive dans une boîte Gmail ; c'est là qu'il vit, et sa durée de conservation
  est celle de la boîte.
- **Adresses IP** : gardées en mémoire vive le temps d'une fenêtre de limitation de débit
  (15 minutes, 1 heure au plus), jamais écrites sur disque, perdues au redémarrage.
- **Information au point de collecte** : présente sous le formulaire, avec le lien vers
  `/confidentialite`.

*À confirmer par Lohan : la durée de conservation réelle des messages dans Gmail, et s'il
existe une règle d'archivage ou de suppression.*

## Contraintes réglementaires

- **LCEN** — mentions légales complètes : identité, SIREN, adresse, contact, directeur de la
  publication, hébergeur.
- **RGPD** — politique de confidentialité avec base légale, durées, destinataires, droits et
  voie de réclamation CNIL.
- **Franchise en base de TVA** — la mention de l'article 293 B doit figurer sur le site
  **et sur les factures**.
- **Facturation électronique** — obligation de *réception* pour toutes les entreprises à
  partir de septembre 2026, émission échelonnée ensuite. Le site n'émet aucune facture ;
  cela concerne l'activité de Lohan, pas ce dépôt. *À confirmer : le choix de la plateforme
  de dématérialisation.*
- **Accessibilité** — l'obligation légale (RGAA) vise le secteur public et les grandes
  entreprises ; elle ne s'impose pas ici. Le seuil WCAG AA est tenu par choix, et vérifié à
  chaque poussée par `outils/contraste.mjs`.

## Ce qui compte comme fini

Une modification est finie quand :

```bash
npx tsc --noEmit && npm run lint && npm test
```

passe, que la chaîne de vérification passe au vert dans GitHub, et que le site répond après
mise en ligne. Pour un changement visible, s'ajoute la mesure de contraste — automatique
depuis le 10/08/2026.

## Ce qui reste à décider

Ces questions n'ont pas de réponse dans le code. Elles ne bloquent rien aujourd'hui, mais
chacune coûtera plus cher plus tard :

1. **Combien de temps les messages de prospects sont-ils gardés ?** La politique de
   confidentialité annonce une durée ; il faut qu'une pratique réelle y corresponde.
2. **Que se passe-t-il si Lohan est indisponible ?** Le site promet une réponse sous 24 h
   ouvrées. Aucun relais n'existe.
3. **Le dépôt est public.** C'est un choix défendable — il montre le travail — mais il
   signifie que toute erreur future de configuration est publique le temps d'un commit.
   À reconfirmer sciemment plutôt qu'à subir.
4. **Aucune mesure d'audience.** L'agence vend du référencement et ne mesure pas le sien :
   `canevas-havane.com` est absent de PushRank, alors que `edificia.fr` et `kéo.fr` y sont.
