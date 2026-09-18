import heroImage from "../assets/verbier.jpg";

// L’accueil et l’aperçu social partagent la même source.
// Astro génère des URLs versionnées selon le contenu de l’image.
export { heroImage };
export const heroPosition = "bottom";
export const heroAlt = {
  fr: "Panorama de Verbier et des montagnes environnantes",
  en: "Panoramic view of Verbier and the surrounding mountains",
};
