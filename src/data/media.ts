import heroImage from "../assets/verbier.jpg";
import directionsImage from "../assets/directions-social.png";

// L’accueil et l’aperçu social partagent la même source.
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
