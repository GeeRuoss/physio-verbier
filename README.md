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
