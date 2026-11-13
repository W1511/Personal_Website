export const site = {
  name: "Wardah Basil",
  tagline: "Capturing what words can’t",
  email: "wardahbasil2004@gmail.com",
  socials: {
    instagram: "https://www.instagram.com/wardaheck._/",
    linkedin: "https://www.linkedin.com/in/wardah-basil040404/",
  },
};

export const about = {
  greeting: "Hey, I’m Wardah!",
  heading: "Behind the Camera",
  paragraphs: [
    "I’m a filmmaker and content creator drawn to stories that feel human, honest, and worth remembering. Whether I’m behind a camera, piecing together an edit, taking photographs, or creating content for a brand, I love finding the small details that make someone stop, feel something, and pay attention.",
    "My experience has taken me from film and documentary production to marketing and social media, giving me the chance to tell stories in a lot of different ways. I’ve worked on everything from interviews and documentary projects to short-form videos, promotional content, and visual campaigns. I like being involved in the whole creative process, from figuring out the story to shaping how it finally looks and feels.",
    "I’m currently studying Film Studies at Lawrence University, but most of my learning happens by making things, trying new ideas, and figuring things out along the way. I’m always looking for the next story to tell and a more interesting way to tell it.",
  ],
  closer: "always looking for the next story →",
  polaroidSrc: "/about/DSC00860.jpg",
  annotations: {
    cat: "cat person, always",
    caffeine: "powered by caffeine",
    camera: "usually behind a camera",
  },
};

export const navItems = [
  { id: "about", label: "About" },
  { id: "photography", label: "Stills" },
  { id: "shorts", label: "Shorts" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
] as const;

export type PhotoOrientation = "portrait" | "landscape";

export type PhotoFrame = {
  id: string;
  src: string;
  alt: string;
  orientation: PhotoOrientation;
  caption: string;
  frameNumber: string;
};

export const photos: PhotoFrame[] = [
  { id: "p01", src: "/stills/01.jpg", alt: "Portrait in an underpass", orientation: "portrait", caption: "Golden hour portrait", frameNumber: "01" },
  { id: "p02", src: "/stills/02.jpg", alt: "Portrait against an orange wall", orientation: "portrait", caption: "Street lights", frameNumber: "02" },
  { id: "p03", src: "/stills/03.jpg", alt: "Couple walking and holding hands", orientation: "landscape", caption: "Open road", frameNumber: "03" },
  { id: "p04", src: "/stills/04.jpg", alt: "Josef’s sign at dusk", orientation: "portrait", caption: "Field notes", frameNumber: "04" },
  { id: "p05", src: "/stills/05.jpg", alt: "Black and white portrait", orientation: "portrait", caption: "Soft focus", frameNumber: "05" },
  { id: "p06", src: "/stills/06.jpg", alt: "Couple running on the street", orientation: "portrait", caption: "Night walk", frameNumber: "06" },
  { id: "p07", src: "/stills/07.jpg", alt: "Guitarist performing on stage", orientation: "landscape", caption: "Harbor line", frameNumber: "07" },
  { id: "p08", src: "/stills/08.jpg", alt: "Couple leaning together by a wall", orientation: "portrait", caption: "Window seat", frameNumber: "08" },
  { id: "p09", src: "/stills/09.jpg", alt: "Michelangelo’s Coffee House window", orientation: "portrait", caption: "Quiet doorway", frameNumber: "09" },
  { id: "p10", src: "/stills/10.jpg", alt: "Photographer seen from behind", orientation: "portrait", caption: "After rehearsal", frameNumber: "10" },
  { id: "p11", src: "/stills/11.jpg", alt: "Photographer holding a camera and flash", orientation: "portrait", caption: "Mirror study", frameNumber: "11" },
  { id: "p12", src: "/stills/12.jpg", alt: "Keyboardist performing on stage", orientation: "landscape", caption: "Last light", frameNumber: "12" },
  { id: "p13", src: "/stills/13.jpg", alt: "Graduation cap and 2026 tassel", orientation: "portrait", caption: "Hands & light", frameNumber: "13" },
  { id: "p14", src: "/stills/14.jpg", alt: "Graduate on a bridge", orientation: "portrait", caption: "Backstage", frameNumber: "14" },
  { id: "p15", src: "/stills/15.jpg", alt: "Adjusting a graduation cap", orientation: "portrait", caption: "Still waiting", frameNumber: "15" },
  { id: "p16", src: "/stills/16.jpg", alt: "Portrait with camera and flash", orientation: "portrait", caption: "Call sheet", frameNumber: "16" },
];

export const stillsTopRoll = photos.slice(0, 8);
export const stillsBottomRoll = photos.slice(8, 16);

export type Ticket = {
  id: string;
  title: string;
  role: string;
  year: string;
  synopsis: string;
  stubColor: "tungsten" | "teal" | "cream";
  /** Drop an mp4/webm in /public and set this path to enable real playback */
  videoSrc?: string;
  posterSrc?: string;
};

export type ShortFilm = {
  id: string;
  title: string;
  year: string;
  runtime: string;
  role: string;
  synopsis: string;
  videoUrl: string;
};

export const shorts: ShortFilm[] = [
  {
    id: "s1",
    title: "CTRL + R",
    year: "2026",
    runtime: "3 MIN 6 SEC",
    role: "Experimental Documentary",
    synopsis:
      "Made with found news footage, CTRL + R captures the uncertainty of being an international student in the U.S., where every refresh can bring another policy change, another piece of bad news, and another question about the future.",
    videoUrl: "https://youtu.be/nke9L9HfccQ",
  },
  {
    id: "s2",
    title: "Home",
    year: "2025",
    runtime: "2 MIN 24 SEC",
    role: "Short Film",
    synopsis:
      "Home is a short film about the emotional weight of being far away from the people you love. Made with found footage from personal phone memories, it explores homesickness, distance, and the small moments that make you realize how much you miss home.",
    videoUrl: "https://youtu.be/LY3AG5BLK_g",
  },
  {
    id: "s3",
    title: "Do You Miss It?",
    year: "2025",
    runtime: "39 SEC",
    role: "Stop-Motion Animation",
    synopsis:
      "This stop-motion animation uses colored sand to create images that have to be destroyed in order for the next one to exist. Frame by frame, the sand shifts from one moment into another, playing with the idea that once something changes, you can remember what was there, but you can’t fully get it back.",
    videoUrl: "https://youtu.be/zBtDppx_bf0",
  },
  {
    id: "s4",
    title: "The One",
    year: "2024",
    runtime: "1 MIN 18 SEC",
    role: "Short Film",
    synopsis:
      "The One is a short film told entirely without dialogue. It follows a young woman who feels disconnected from her own life and explores the comfort of having someone to turn to when everything becomes overwhelming. At its core, the film is about presence, connection, and finding support during difficult moments.",
    videoUrl: "https://youtu.be/MlrwPyKV_BI",
  },
];

export type SelectedWork = {
  id: string;
  src: string;
  title: string;
  span?: "default" | "wide";
};

export const selectedWorks: SelectedWork[] = [
  {
    id: "magazine-cover",
    src: "/projects/coverpagefinal.jpg",
    title: "Magazine Cover",
  },
  {
    id: "magazine-spread",
    src: "/projects/Double_spreadfinalfinal.jpg",
    title: "Magazine Editorial Spread",
    span: "wide",
  },
  {
    id: "room-illustration",
    src: "/projects/Illustration.jpg",
    title: "Room Illustration",
  },
  {
    id: "packaging-illustration",
    src: "/projects/Malborojpeg.jpeg",
    title: "Packaging Illustration",
  },
  {
    id: "pizza-stand",
    src: "/projects/PizzaIllustration.jpg",
    title: "Pizza Stand Illustration",
  },
];
