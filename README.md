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

Google Maps et les réseaux sociaux sont des liens externes. Aucun iframe, script de suivi ni cookie applicatif. Les polices sont servies localement.

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

La photo d’accueil et les images Open Graph sont déclarées dans `src/data/media.ts`. Modifier cette source commune lors d’un changement de visuel. L’accueil dispose de compositions FR/EN dans `design/home-card.html`, qui réutilisent `src/assets/verbier.jpg` : réexporter les deux PNG à 1200 × 630 après un changement du panorama ou de la marque. Astro génère l’aperçu JPEG 1200 × 630 et une URL liée au contenu de l’image. Vérifier l’aperçu publié ; les messages WhatsApp déjà envoyés peuvent conserver leur ancienne vignette.

## Retours V2 du cabinet, 17 septembre 2026

Titres et bandeau de disciplines centrés, logo et navigation agrandis, rubans vert turquoise, espacements resserrés et hiérarchie des titres harmonisée. Le lien « Rencontrer notre équipe » suit l’engagement du cabinet ; les flèches des portraits sont supprimées. Les prénoms et les liens vers les soins partagent la même taille. Photo de physiothérapie en paysage depuis son original ; panorama d’accueil réexporté en 1920 px, aperçu social régénéré automatiquement.

Coordonnées du pied de page alignées avec leurs icônes. La page d’accès ajoute l’email et conserve uniquement la vitrine, centrée. La page rendez-vous reprend le texte fourni et le formulaire complet de première version, avec les libellés et thérapeutes corrigés ; retrait du bloc carte sur cette page. Le vert des choix et du bouton utilise la couleur commune du site. Le texte « Vous êtes unique » et les noms des soins sont légèrement réduits pour rester sous la hiérarchie de « Notre équipe ».

Contrôles V2 : build et 15 pages, 530 liens/ressources ; 12 pages FR/EN à 320, 390, 768, 1100 et 1440 px dans Chrome sans débordement ni image cassée. Menu mobile, préparation du message WhatsApp, date obligatoire et refus des dates passées contrôlés sans envoi.

Le popup automatique WhatsApp est supprimé (17 septembre 2026). Seul le bouton flottant WhatsApp subsiste ; aucun minuteur ni stockage de session associé au popup.

## Retours V3 du cabinet, 18 septembre 2026

Photo d’accueil et panorama hivernal fournis intégrés, lettres Verbier visibles dans le cadrage mobile/bureau et dans l’aperçu social. Photo de groupe issue du fichier original 1900 px, vitrine verticale plus lisible. Menu mobile sans texte visible, numérotation ni flèches ; libellé accessible conservé. Bouton WhatsApp flottant directement vers le cabinet ; retour en haut dans le pied de page pour éviter de recouvrir le contenu sur téléphone.

Horaires de rendez-vous jusqu’à 18h centralisés FR/EN et données structurées. Titres sans les points signalés, « Massage » au singulier, plans plus petits, pied de page réaligné et centré sur téléphone. Textes d’introduction des soins justifiés, techniques en gras, trait de la note supprimé. Montants réduits, cartes de tarifs uniformes, photo de salle recadrée à gauche et bas des informations pratiques aligné. Coordonnées cliquables dans l’accordéon de prise de rendez-vous. Formulaire turquoise clair, contacts centrés verticalement sur ordinateur, lien d’accès retiré du bloc contact.

Chaque correction a été vérifiée sur mobile et bureau : 12 pages FR/EN à 320, 390, 768, 1100 et 1440 px ; captures relues, navigation, message de réservation, validation de date, retour en haut et liens directs contrôlés sans envoi. Build : 15 pages, liens et ressources internes vérifiés.

## Retours V4 du cabinet, 23 septembre 2026

Bouton de rendez-vous du menu mobile arrondi et centré, fond crème commun aux écrans, icônes légèrement réduites et ajout du G aux avis Google. Retour en haut et bouton de préparation WhatsApp centrés sur téléphone. Logo du t-shirt visible grâce à une variante originale de la photo du genou. Titres et ponctuation corrigés en français et anglais.

Techniques alignées avec le texte des soins, montants réduits, accordéon aligné au bas de la photo et coordonnées sans soulignement permanent. Espacements augmentés autour des informations d’accès. Panorama de Clambin affiché sans couper son crédit ; adresse et rendez-vous alignés. Fond du préparateur éclairci et phrases d’introduction davantage espacées.

Contrôles V4 : build et liens internes ; 12 pages FR/EN aux largeurs 320, 390, 768 et 1440 px, sans débordement. Captures mobile et bureau relues, alignements, boutons mobiles, menu, retour en haut et composition du message WhatsApp vérifiés sans envoi. L’image de partage reste synchronisée avec le panorama de l’accueil, inchangé dans cette révision.

### Aperçu de la page d’accès

Les pages `localisation/` et `en/location/` disposent d’un visuel de partage « Find your way », avec l’adresse du cabinet, distinct du panorama des autres pages. Source dans `src/data/media.ts`, JPEG 1200 × 630 généré par Astro avec URL liée au contenu ; Open Graph et Twitter utilisent cette image et son texte alternatif. Composition avec le vrai logo et le plan existant, source éditable dans `design/directions-card.html` (export Chromium à 1200 × 630 après chargement des polices). Les boutons Google Maps, Apple Plans et Waze conservent leurs itinéraires réels.

### Aperçus de l’accueil

Cartes FR/EN avec vrai logo, photo de Verbier entière et prestations. Source `design/home-card.html` : rendu français par défaut, anglais avec `?lang=en`, après chargement des polices dans Chromium à 1200 × 630. Exports `src/assets/home-social-fr.png` et `home-social-en.png`. Les pages d’accès conservent leur carte « Find your way ».

## Retours V5 du cabinet, 25 septembre 2026

Équipe complétée avec Julie, Tom et Naomie sur l’accueil et dans les biographies FR/EN. Les personnes, portraits et textes sont centralisés dans `src/data/team.ts` ; la liste de réservation en dérive en excluant l’administration. Les langues de Hannah et Sybille commencent par le français. Les rôles ont la même taille de texte que les biographies.

Icône retirée uniquement du titre « Nous joindre par téléphone » du pied de page. Montants réduits à 18 px ; panneau d’informations pratiques centré par rapport à la photo, avec davantage d’espace avant les informations d’accès. Espaces égaux avant et après la grande photo de la page d’accès. Point final ajouté au titre de contact, fond du préparateur issu du vert du pied de page éclairci, bouton WhatsApp centré à toutes les largeurs. Fond crème vérifié sur téléphone et bureau.

Contrôle point par point : 12 pages FR/EN à 320, 390, 768 et 1440 px, captures relues, portraits, cinq profils, quatre thérapeutes dans le formulaire, centrages, espacements, tarifs, langues, liens et message WhatsApp sans envoi. Le build contrôle 15 pages et 543 liens/ressources. Les cartes de partage accueil et accès restent dédiées et vérifiées.

## Retours V6 du cabinet, 25 septembre 2026

Boutons Google Maps, Apple Plans et Waze centrés sur téléphone. Portrait de Naomie centré à la source commune, sur l’accueil et la page équipe. La carte de la page d’accès partage désormais les colonnes et espacements du bloc téléphone : leurs bords gauches sont alignés, avec empilement cohérent sous 900 px. Titre du préparateur centré et texte sous le bouton WhatsApp justifié en FR/EN. Les valeurs et fonctions du formulaire restent identiques.

Contrôles ciblés : pages accueil, équipe, accès et contact FR/EN à 320, 390, 768, 900 et 1440 px ; cadrages relus, centrage par rangée des trois liens Maps, alignement carte/téléphone, centrage du titre et du bouton, justification du texte, message WhatsApp sans envoi. Build : 15 pages et 543 liens/ressources. Aperçus de partage vérifiés.

Ajustement du portrait de Naomie après contrôle visuel : cadrage du visage légèrement rapproché et décalé dans le composant commun, sans modifier la photo originale. Accueil et équipe FR/EN vérifiés à 320, 390, 768 et 1440 px ; cadre et bordure conservés.
