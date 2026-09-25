export const site = {
  name: "Wardah Basil",
  tagline: "Capturing what words can’t",
  email: "hello@wardahbasil.com",
  socials: {
    instagram: "https://instagram.com/",
    linkedin: "https://linkedin.com/",
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
  polaroidCaption: "on set / somewhere between takes",
  polaroidSrc: "/placeholders/about-polaroid.svg",
};

export const navItems = [
  { id: "about", label: "About" },
  { id: "photography", label: "Stills" },
  { id: "shorts", label: "Shorts" },
  { id: "films", label: "Films" },
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
  { id: "p01", src: "/placeholders/photo-01.svg", alt: "Portrait placeholder 01", orientation: "portrait", caption: "Golden hour portrait", frameNumber: "01" },
  { id: "p02", src: "/placeholders/photo-02.svg", alt: "Portrait placeholder 02", orientation: "portrait", caption: "Street lights", frameNumber: "02" },
  { id: "p03", src: "/placeholders/photo-ls-01.svg", alt: "Landscape placeholder 03", orientation: "landscape", caption: "Open road", frameNumber: "03" },
  { id: "p04", src: "/placeholders/photo-04.svg", alt: "Portrait placeholder 04", orientation: "portrait", caption: "Field notes", frameNumber: "04" },
  { id: "p05", src: "/placeholders/photo-05.svg", alt: "Portrait placeholder 05", orientation: "portrait", caption: "Soft focus", frameNumber: "05" },
  { id: "p06", src: "/placeholders/photo-06.svg", alt: "Portrait placeholder 06", orientation: "portrait", caption: "Night walk", frameNumber: "06" },
  { id: "p07", src: "/placeholders/photo-ls-02.svg", alt: "Landscape placeholder 07", orientation: "landscape", caption: "Harbor line", frameNumber: "07" },
  { id: "p08", src: "/placeholders/photo-08.svg", alt: "Portrait placeholder 08", orientation: "portrait", caption: "Window seat", frameNumber: "08" },
  { id: "p09", src: "/placeholders/photo-01.svg", alt: "Portrait placeholder 09", orientation: "portrait", caption: "Quiet doorway", frameNumber: "09" },
  { id: "p10", src: "/placeholders/photo-02.svg", alt: "Portrait placeholder 10", orientation: "portrait", caption: "After rehearsal", frameNumber: "10" },
  { id: "p11", src: "/placeholders/photo-03.svg", alt: "Portrait placeholder 11", orientation: "portrait", caption: "Mirror study", frameNumber: "11" },
  { id: "p12", src: "/placeholders/photo-ls-03.svg", alt: "Landscape placeholder 12", orientation: "landscape", caption: "Last light", frameNumber: "12" },
  { id: "p13", src: "/placeholders/photo-05.svg", alt: "Portrait placeholder 13", orientation: "portrait", caption: "Hands & light", frameNumber: "13" },
  { id: "p14", src: "/placeholders/photo-06.svg", alt: "Portrait placeholder 14", orientation: "portrait", caption: "Backstage", frameNumber: "14" },
  { id: "p15", src: "/placeholders/photo-07.svg", alt: "Portrait placeholder 15", orientation: "portrait", caption: "Still waiting", frameNumber: "15" },
  { id: "p16", src: "/placeholders/photo-08.svg", alt: "Portrait placeholder 16", orientation: "portrait", caption: "Call sheet", frameNumber: "16" },
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

export const shorts: Ticket[] = [
  {
    id: "s1",
    title: "Winds of Fate",
    role: "Director",
    year: "2024",
    synopsis: "A short about chance encounters and the weather that brings people together.",
    stubColor: "tungsten",
    posterSrc: "/placeholders/photo-01.svg",
  },
  {
    id: "s2",
    title: "Half Developed",
    role: "DP / Editor",
    year: "2025",
    synopsis: "Darkroom metaphors for growing up between cultures and expectations.",
    stubColor: "teal",
    posterSrc: "/placeholders/photo-03.svg",
  },
  {
    id: "s3",
    title: "Take Two",
    role: "Writer / Director",
    year: "2025",
    synopsis: "A comedy of errors on a student film set that somehow finds the truth.",
    stubColor: "cream",
    posterSrc: "/placeholders/photo-05.svg",
  },
];

export const films: Ticket[] = [
  {
    id: "f1",
    title: "Untitled Feature Reel",
    role: "Director",
    year: "2025",
    synopsis: "Placeholder reel — swap this stub for your feature or thesis film.",
    stubColor: "tungsten",
    posterSrc: "/placeholders/photo-02.svg",
  },
  {
    id: "f2",
    title: "Documentary Cut",
    role: "Producer",
    year: "2024",
    synopsis: "Observational portraits of people who make things with their hands.",
    stubColor: "teal",
    posterSrc: "/placeholders/photo-07.svg",
  },
];

export type ProjectBucket = {
  id: string;
  tool: string;
  note: string;
  items: string[];
  rotate: number;
  tint: string;
};

export const projects: ProjectBucket[] = [
  {
    id: "ps",
    tool: "Photoshop",
    note: "composites & poster stills",
    items: ["Festival poster A", "Color grade moodboard", "Title card study"],
    rotate: -3,
    tint: "#ffe0a8",
  },
  {
    id: "ai",
    tool: "Illustrator",
    note: "marks, frames, type",
    items: ["Logo lockups", "Storyboard frames", "Sticker sheet"],
    rotate: 2,
    tint: "#b8f3ee",
  },
  {
    id: "cv",
    tool: "Canva",
    note: "fast social cuts",
    items: ["Event flyer", "Reel covers", "Call sheet template"],
    rotate: -1.5,
    tint: "#ffc9b5",
  },
  {
    id: "wp",
    tool: "WordPress",
    note: "sites & showcases",
    items: ["Client landing", "Gallery layout", "Press kit page"],
    rotate: 2.5,
    tint: "#f0e2cf",
  },
];
