import type { ImageMetadata } from 'astro';
import content from './content.json';
import julie from '../assets/julie.jpg';
import tom from '../assets/tom.jpg';
import naomie from '../assets/naomie.jpg';

type Localized = { fr: string; en: string };
export type TeamMember = {
  name: string;
  therapist: boolean;
  photoId?: number;
  image?: ImageMetadata;
  position?: 'center' | 'top';
  role: Localized;
  biography: Localized;
};
export const teamMembers: TeamMember[] = [
  ...['Hannah', 'Sybille'].map((name, i) => ({
    name, therapist: true, photoId: 17 + i,
    role: { fr: content.fr.team[2 + i * 3], en: content.en.team[2 + i * 3] },
    biography: { fr: content.fr.team[3 + i * 3], en: content.en.team[3 + i * 3] },
  })),
  {
    name: 'Julie', therapist: true, image: julie, position: 'center',
    role: { fr: '<p><strong>Physiothérapeute</strong><br>Fr/En/Es</p>', en: '<p><strong>Physiotherapist</strong><br>Fr/En/Es</p>' },
    biography: {
      fr: `<p>Originaire d’Aix-en-Provence en France, Julie est diplômée en physiothérapie de l’Escola Universitària de la Salut i l’Esport à Barcelone, au sein d’un cursus entièrement anglophone.</p>
<p>Elle a exercé dans différents cabinets libéraux en France métropolitaine, ainsi qu’à La Réunion et en Guadeloupe, couvrant un large spectre de la physiothérapie : <strong>orthopédie, traumatologie, rééducation musculo-squelettique, gériatrie et neurologie.</strong><br>Son intérêt clinique se porte particulièrement sur <strong>l’ortho-traumatologie, les problématiques musculo-squelettiques et le drainage lymphatique, domaines dans lesquels elle aime accompagner ses patients vers une récupération optimale et durable.</strong></p>
<p>Fille de physiothérapeute, Julie a très tôt été sensibilisée à l’importance d’une prise en charge globale et humaine. <strong>Bienveillante et à l’écoute, elle place la relation de confiance et le patient au centre de son approche de soin.</strong><br>Récemment installée en Valais, Julie est ravie de mettre son expérience et sa bonne humeur au service des patients du cabinet.</p>
<p>Quand elle ne pratique pas la physiothérapie, Julie profite de la montagne pour skier, faire de la randonnée et assouvir sa passion pour la photographie.</p>`,
      en: `<p>Originally from Aix-en-Provence in France, Julie graduated in physiotherapy from the Escola Universitària de la Salut i l’Esport in Barcelona, completing a programme taught entirely in English.</p>
<p>She has worked in private practices in mainland France, Réunion and Guadeloupe, covering a broad range of physiotherapy: <strong>orthopaedics, traumatology, musculoskeletal rehabilitation, geriatrics and neurology.</strong><br>Her clinical interests focus particularly on <strong>orthopaedic and trauma rehabilitation, musculoskeletal conditions and lymphatic drainage, areas in which she enjoys supporting her patients towards an optimal and lasting recovery.</strong></p>
<p>As the daughter of a physiotherapist, Julie learned early on the importance of a holistic, person-centred approach. <strong>Caring and attentive, she places trust and the patient at the heart of her practice.</strong><br>Having recently settled in Valais, Julie is delighted to bring her experience and good humour to the clinic’s patients.</p>
<p>Outside physiotherapy, Julie enjoys the mountains through skiing, hiking and her passion for photography.</p>`,
    },
  },
  {
    name: 'Tom', therapist: true, image: tom, position: 'center',
    role: { fr: '<p><strong>Physiothérapeute · Masseur thérapeute · Coach sportif</strong><br>Fr/En/Es/Pt</p>', en: '<p><strong>Physiotherapist · Massage therapist · Personal trainer</strong><br>Fr/En/Es/Pt</p>' },
    biography: {
      fr: `<p>Originaire du sud de la France, Tom a choisi de partir au Portugal pour suivre ses <strong>quatre années d’études en physiothérapie au sein de la prestigieuse Egas Moniz School of Health &amp; Science, près de Lisbonne.</strong> Cette aventure lui a permis de vivre une expérience internationale enrichissante, d’apprendre le portugais et l’espagnol, mais surtout de se former auprès de professeurs et professionnels de santé aux parcours internationaux, qui ont contribué à façonner sa vision de la physiothérapie.</p>
<p>Animé par cette envie de découvrir de nouveaux horizons et de continuer à enrichir son expérience, Tom a choisi de rejoindre la Suisse en 2023, où il s’est installé pour poursuivre son parcours professionnel. Il y a développé son expérience en cabinet auprès d’une patientèle variée, avec un intérêt particulier pour <strong>la physiothérapie musculo-squelettique, la traumatologie et la rééducation sportive.</strong> En parallèle, il accompagne en tant que physio le <strong>Vevey-Sports, club de football emblématique évoluant en Promotion League.</strong></p>
<p>Pour Tom, la physiothérapie commence avant tout par <strong>l’écoute.</strong> Chaque patient possède son histoire, ses attentes et ses objectifs. Il accorde donc une grande importance à créer une relation de confiance et à adapter chaque séance aux besoins de la personne. Sa pratique associe <strong>thérapie manuelle, massages thérapeutiques, mobilisations, exercices thérapeutiques et renforcement,</strong> avec un équilibre entre techniques manuelles et approche active selon les besoins et les objectifs de chacun.</p>
<p>En dehors du cabinet, <strong>le sport et les activités en plein air</strong> occupent une place essentielle dans sa vie. Tom aime particulièrement la montagne, que ce soit à travers <strong>le ski, le trail</strong> ou simplement le plaisir d’être en extérieur. <strong>Être physiothérapeute à Verbier représente pour lui l’environnement idéal pour réunir le métier qu’il aime, sa passion pour le sport et son amour de la montagne.</strong></p>`,
      en: `<p>Originally from southern France, Tom chose to move to Portugal for his <strong>four-year physiotherapy degree at the prestigious Egas Moniz School of Health &amp; Science, near Lisbon.</strong> This enriching international experience gave him the opportunity to learn Portuguese and Spanish and, above all, to train with lecturers and healthcare professionals whose international backgrounds helped shape his approach to physiotherapy.</p>
<p>Keen to discover new horizons and broaden his experience, Tom moved to Switzerland in 2023 to continue his professional journey. He developed his experience in private practice with a varied patient population, with a particular interest in <strong>musculoskeletal physiotherapy, traumatology and sports rehabilitation.</strong> Alongside his clinic work, he serves as a physiotherapist for <strong>Vevey-Sports, the well-known football club playing in the Promotion League.</strong></p>
<p>For Tom, physiotherapy starts with <strong>listening.</strong> Every patient has their own story, expectations and goals. He therefore places great importance on building trust and adapting each session to the individual. His practice combines <strong>manual therapy, therapeutic massage, mobilisation, therapeutic exercises and strengthening,</strong> balancing hands-on techniques with an active approach according to each person’s needs and goals.</p>
<p>Outside the clinic, <strong>sport and outdoor activities</strong> are an essential part of his life. Tom particularly enjoys the mountains, whether through <strong>skiing, trail running</strong> or simply being outdoors. <strong>Working as a physiotherapist in Verbier offers him the ideal setting to bring together the profession he loves, his passion for sport and his love of the mountains.</strong></p>`,
    },
  },
  {
    name: 'Naomie', therapist: false, image: naomie, position: 'center',
    role: { fr: '<p><strong>Accueil et secrétariat · Responsable administrative · Responsable des opérations</strong><br>Fr/En</p>', en: '<p><strong>Reception and secretarial support · Administration manager · Operations manager</strong><br>Fr/En</p>' },
    biography: {
      fr: `<p>Originaire de la région, Naomie aime beaucoup vivre et travailler à Verbier. Elle a d’abord étudié en Valais puis a rejoint l’Université de Neuchâtel. <strong>Après avoir réussi en 2018 son Bachelor of Arts en Lettres et Sciences Humaines (Langue Anglaise/Psychologie &amp; Education /Communication),</strong> elle est revenue en Valais.</p>
<p>Naomie a alors eu <strong>l’opportunité de travailler au sein de différents milieux professionnels (notamment en agence immobilière, fiduciaire, magasin de sport),</strong> qui lui ont apporté beaucoup d’expérience, de nouveauté et qui lui ont permis de créer de belles relations humaines et professionnelles.</p>
<p>Dans la vie, elle est <strong>passionnée par l’escalade et le parapente.</strong> Naomie apprécie d’être en montagne pour grimper, voler, marcher, profiter du soleil et des paysages si incroyables qui nous entourent. Elle aime également passer du temps chez elle, au calme, sur le hamac. Elle y cueille les bonnes énergies et adore écouter les oiseaux !</p>
<p><strong>De nature bienveillante et à l’écoute des personnes qu’elle rencontre,</strong> c’est un plaisir pour Naomie de mettre son temps et son expérience à disposition pour les personnes que PhysioVerbier accompagne sur le chemin de la guérison et du bien-être.</p>`,
      en: `<p>Originally from the region, Naomie loves living and working in Verbier. She first studied in Valais before attending the University of Neuchâtel. <strong>After completing her Bachelor of Arts in Humanities in 2018 (English Language/Psychology &amp; Education/Communication),</strong> she returned to Valais.</p>
<p>Naomie then had <strong>the opportunity to work in a variety of professional settings, including a real estate agency, a fiduciary firm and a sports shop.</strong> These experiences brought her new skills and perspectives and helped her build rewarding personal and professional relationships.</p>
<p>In her free time, she is <strong>passionate about climbing and paragliding.</strong> Naomie enjoys being in the mountains to climb, fly, walk and make the most of the sunshine and the incredible landscapes around us. She also enjoys quiet time at home in her hammock, recharging and listening to the birds.</p>
<p><strong>Caring and attentive to the people she meets,</strong> Naomie is delighted to offer her time and experience to those whom PhysioVerbier supports on their journey towards recovery and well-being.</p>`,
    },
  },
];
