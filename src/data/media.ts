import heroImage from "../assets/verbier.jpg";
import directionsImage from "../assets/directions-social.png";
import homeFrenchImage from "../assets/home-social-fr.png";
import homeEnglishImage from "../assets/home-social-en.png";

// Le panorama est la source de la page et de la composition design/home-card.html.
// Astro génère des URLs versionnées selon le contenu de l’image.
export { heroImage };
export const heroPosition = "bottom";
export const heroAlt = {
  fr: "Panorama de Verbier et des montagnes environnantes",
  en: "Panoramic view of Verbier and the surrounding mountains",
};

// Aperçu spécifique aux pages d’accès FR/EN.
export { directionsImage };
export const directionsAlt = {
  fr: "Find your way — PhysioVerbier, Route de Verbier Station 74, 1936 Verbier. Plan du quartier et emplacement du cabinet.",
  en: "Find your way — PhysioVerbier, Route de Verbier Station 74, 1936 Verbier. Neighbourhood map and clinic location.",
};

export const homeSocialImages = { fr: homeFrenchImage, en: homeEnglishImage };
export const homeSocialAlt = {
  fr: "PhysioVerbier : vos soins à Verbier. Physiothérapie, massage et sport. Panorama de Verbier.",
  en: "PhysioVerbier: your care in Verbier. Physiotherapy, massage and sport. Panorama of Verbier.",
};
