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
  greeting: "Hey, I'm Wardah!",
  body: `I'm a 20-year-old majoring in Film Studies and minoring in Data Science at Lawrence University — currently a Junior. Growing up in a society where children were mostly forced to choose traditional fields like medicine or engineering, I found my passion in photography and video making. It became my way of capturing emotions and stories that I struggled to express in words. What started as taking simple shots of nature turned into a deep love for documenting real, unfiltered moments.`,
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

export type PhotoFrame = {
  id: string;
  title: string;
  src: string;
  rotation: number;
};

export const photos: PhotoFrame[] = [
  { id: "p1", title: "Golden hour portrait", src: "/placeholders/photo-01.svg", rotation: -2 },
  { id: "p2", title: "Street lights", src: "/placeholders/photo-02.svg", rotation: 1.5 },
  { id: "p3", title: "Mirror study", src: "/placeholders/photo-03.svg", rotation: -1 },
  { id: "p4", title: "Field notes", src: "/placeholders/photo-04.svg", rotation: 2.5 },
  { id: "p5", title: "Soft focus", src: "/placeholders/photo-05.svg", rotation: -1.5 },
  { id: "p6", title: "Night walk", src: "/placeholders/photo-06.svg", rotation: 1 },
  { id: "p7", title: "Hands & light", src: "/placeholders/photo-07.svg", rotation: -2.5 },
  { id: "p8", title: "Window seat", src: "/placeholders/photo-08.svg", rotation: 0.5 },
];

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
