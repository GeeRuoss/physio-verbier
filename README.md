# PhysioVerbier

Première version du site bilingue du cabinet. Astro génère des fichiers HTML/CSS/JS statiques, transportables sur GitHub Pages puis Infomaniak.

## Développement

Node.js 22.12 ou supérieur.

```sh
npm ci
npm run dev
npm run build
npm run check
npm run preview
```

Le chemin de prévisualisation est `/physio-verbier/`. Les contrôles `npm run check` ciblent le build de prévisualisation.

## Structure

- `src/pages/[...route].astro` : accueil, équipe, prestations, tarifs, localisation, contact et confidentialité, en français et en anglais.
- `src/layouts/Layout.astro` : navigation, pied de page, métadonnées et interactions communes.
- `src/data/content.json` : textes du site d’origine, relevés le 14 septembre 2026, balisage nettoyé.
- `src/data/site.ts` : textes de navigation, titres, routes et coordonnées.
- `src/styles/style.css` : style partagé, adaptations mobile/tablette/ordinateur.
- `public/images/` : photos du cabinet et de montagne, optimisées en WebP, logo d’origine.
- `CREDITS.md` : provenance des médias et des polices.

## Prévisualisation GitHub

Les modifications de `main` déclenchent la compilation, le contrôle des liens et la publication GitHub Pages. Toutes les pages portent `noindex, nofollow`, et robots.txt interdit l’indexation demandée aux robots. Cette indication n’est pas un contrôle d’accès : le lien de présentation est public.

Le préparateur de rendez-vous compose localement un message (soin, préférence de thérapeute, disponibilité et prénom facultatif). Aucun champ n’est enregistré sur le site. Le bouton ouvre WhatsApp avec un message prérempli ; le visiteur envoie ensuite lui-même et le cabinet confirme le rendez-vous. Aucun message n’est envoyé par les tests.

Google Maps et les réseaux sociaux sont des liens externes. Aucun iframe, script de suivi ni cookie applicatif. Un indicateur sessionStorage mémorise uniquement l’apparition de l’invitation WhatsApp. Les polices sont servies localement.

## Préparer Infomaniak

Pour compiler à la racine du domaine :

```sh
SITE_URL=https://physio-verbier.com BASE_PATH=/ PUBLIC_PREVIEW=false npm run build
```

Le contenu de `dist/` peut être servi par un hébergement web statique ou PHP. Le paramètre `PUBLIC_PREVIEW=false` retire la mention de prévisualisation, active l’indexation et les données structurées. Il ne branche pas le formulaire.

Avant la bascule finale :

1. Valider contenus, équipe, tarifs, droits des images et direction graphique avec le cabinet.
2. Confirmer la raison sociale, les mentions légales et le traitement des données avec le cabinet.
3. Configurer et tester le traitement réel du formulaire chez Infomaniak, avec validation serveur, anti-spam, transport chiffré, accès limités, et politique de conservation. Aucun secret n’est à mettre dans le frontend ou GitHub.
4. Mettre à jour les textes de confidentialité pour refléter l’hébergement et les traitements réellement utilisés.
5. Vérifier le site sur Infomaniak, conserver les anciennes URLs, puis seulement basculer le domaine après accord. Aucune modification DNS effectuée pour cette prévisualisation.

## État des avis

Un lien vers la fiche Google est proposé. Aucune note et aucun témoignage n’ont été inventés. La reprise de témoignages précis pourra être ajoutée après choix et validation du cabinet.

## Préservation SEO à la migration

Titres et descriptions spécifiques FR/EN, données MedicalClinic (coordonnées, horaires, profils officiels), canonical, hreflang et sitemap. Le miroir GitHub reste noindex. Aucun classement actuel n’a été mesuré.

Le sitemap WordPress relevé le 14 septembre 2026 conserve les mêmes chemins pour les pages métier. Deux anciennes adresses légales changent : appliquer les redirections 301 de `deployment/infomaniak.htaccess` lors de la migration, puis contrôler les autres URLs connues dans Search Console avant la bascule. Soumettre le sitemap du domaine définitif après mise en ligne et suivre les erreurs d’indexation.

## Retours du cabinet, 17 septembre 2026

Retours intégrés en français et en anglais : titres Montserrat droits et plus petits, navigation agrandie avec « Nous trouver », photos et boutons arrondis, rubans vert foncé, flèches et appels à WhatsApp allégés. Accueil avec le panorama de Verbier, le soin du genou, le texte de présentation d’origine et le chapitre « Notre approche ». Équipe présentée : Hannah et Sybille, y compris dans le préparateur de rendez-vous. Les portraits individuels de la page équipe sont circulaires.

Les tarifs privés restent inchangés. Le sous-titre proposé est « Séances privées », avec une mention distincte du régime LAMal/LAA sur ordonnance. La fiche d’accès utilise le nom PhysioVerbier dans la destination Google Maps et affiche les deux numéros de contact.

Les images existantes servent de relais avant les nouvelles photos du cabinet. La photo de groupe est conservée conformément à la demande de mise en page sous cette grande photo ; son remplacement pourra accompagner la prochaine séance photo.

Vérification : build et contrôle des 15 pages ; 12 pages FR/EN parcourues dans Chrome aux largeurs 320, 390, 768, 1100 et 1440 px ; menu mobile et message de rendez-vous vérifiés sans envoi.

## Image de partage

La photo d’accueil et l’image Open Graph proviennent de `src/data/media.ts`. Modifier cette source commune lors d’un changement de visuel. Astro génère l’aperçu JPEG 1200 × 630 et une URL liée au contenu de l’image. Vérifier l’aperçu publié ; les messages WhatsApp déjà envoyés peuvent conserver leur ancienne vignette.

## Retours V2 du cabinet, 17 septembre 2026

Titres et bandeau de disciplines centrés, logo et navigation agrandis, rubans vert turquoise, espacements resserrés et hiérarchie des titres harmonisée. Le lien « Rencontrer notre équipe » suit l’engagement du cabinet ; les flèches des portraits sont supprimées. Les prénoms et les liens vers les soins partagent la même taille. Photo de physiothérapie en paysage depuis son original ; panorama d’accueil réexporté en 1920 px, aperçu social régénéré automatiquement.

Coordonnées du pied de page alignées avec leurs icônes. La page d’accès ajoute l’email et conserve uniquement la vitrine, centrée. La page rendez-vous reprend le texte fourni et le formulaire complet de première version, avec les libellés et thérapeutes corrigés ; retrait du bloc carte sur cette page. Le vert des choix et du bouton utilise la couleur commune du site. Le texte « Vous êtes unique » et les noms des soins sont légèrement réduits pour rester sous la hiérarchie de « Notre équipe ».

Contrôles V2 : build et 15 pages, 530 liens/ressources ; 12 pages FR/EN à 320, 390, 768, 1100 et 1440 px dans Chrome sans débordement ni image cassée. Menu mobile, préparation du message WhatsApp, date obligatoire et refus des dates passées contrôlés sans envoi.
