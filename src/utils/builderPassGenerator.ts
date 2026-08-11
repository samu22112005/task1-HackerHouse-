import { StudioState, CropAdjustments } from '../types/builder';

export const DEFAULT_CROP_ADJUSTMENTS: CropAdjustments = {
  x: 0,
  y: 0,
  zoom: 1,
  rotation: 0,
  brightness: 100,
  contrast: 100,
  saturation: 100,
  aspectShape: 'circle',
};

export const PRESET_STICKERS = [
  "🥥 Coconut Powered",
  "⚡ 5 AM Shack Hack",
  "🏄 Wave Surfer",
  "🌴 Villa #3 Squad",
  "🔥 Superteam Goa",
  "☕ Cold Brew Hacking",
  "🎶 Sunset DJ",
  "🚀 Ship or Dip"
];

export const BUILDER_TITLES = [
  "Neural Nomad",
  "Fullstack Surfer",
  "Terminal Wizard",
  "Stack Surfer",
  "Open Source Ranger",
  "Algorithm Alchemist",
  "Cloud Climber",
  "Pixel Explorer",
  "Code Voyager",
  "Cyber Nomad",
  "Goa Hacker",
  "Vector Craftsman"
];

export const SEARCHABLE_TECH_STACKS = [
  "Java", "Spring Boot", "React", "Next.js", "Node.js", 
  "Python", "Flutter", "Android", "TypeScript", "Machine Learning", 
  "Blockchain", "Cloud & DevOps", "Rust", "Go", 
  "C++", "Web3", "Open Source", "Security", "Tailwind CSS", "GraphQL"
];

export const PRESET_HOBBIES = [
  "Surfing", "DJing & Music", "Gaming", "Photography", 
  "Coffee Crafting", "Stargazing", "Hiking & Trekking", 
  "Vinyl Collecting", "Scuba Diving", "Chess", "Poetry"
];

export const MOTTO_SUGGESTIONS = [
  "Building non-stop until sunrise in Goa.",
  "Ship fast, surf hard under the palm trees.",
  "Hacking with creative magic till 5 AM.",
  "Zero downtime, maximum Goa vibes.",
  "Converting Goan coconut water into production code.",
  "Where open source meets the Arabian Sea.",
  "Crafting the future from Villa #3 in Goa.",
  "Code by day, coastal vibes by night."
];

export const PRESET_ROLES = [
  "Fullstack Architect",
  "Frontend Engineer & Creative UI",
  "Smart Contract Specialist",
  "Product Designer & UI/UX",
  "Systems Hacker",
  "DevOps & Cloud Specialist",
  "Mobile App Lead",
  "Open Source Lead"
];

export function getRandomBuilderTitle(): string {
  const randomIndex = Math.floor(Math.random() * BUILDER_TITLES.length);
  return BUILDER_TITLES[randomIndex];
}

export function getRandomMotto(): string {
  const randomIndex = Math.floor(Math.random() * MOTTO_SUGGESTIONS.length);
  return MOTTO_SUGGESTIONS[randomIndex];
}

export function generateHHGoaID(): string {
  const randNum = Math.floor(10000 + Math.random() * 90000);
  return `HHGOA-2026-EXP-${randNum}`;
}

export function createEmptyStudioState(): StudioState {
  return {
    mode: 'solo',
    teamSize: 2,
    builderId: generateHHGoaID(),
    teamName: 'Expedition Team',
    expeditionTag: '#FrameInGoa',
    theme: 'jungle',
    selectedStickers: ['🥥 Coconut Powered', '⚡ 5 AM Shack Hack'],
    solo: {
      id: '1',
      name: '',
      title: '',
      role: '',
      techStack: [],
      hobbies: [],
      collegeOrOrg: '',
      location: '',
      motto: '',
      avatarUrl: null,
      avatarCrop: DEFAULT_CROP_ADJUSTMENTS,
      socials: {},
    },
    teamMembers: [
      {
        id: '1',
        name: '',
        title: '',
        role: '',
        techStack: [],
        hobbies: [],
        avatarUrl: null,
        avatarCrop: DEFAULT_CROP_ADJUSTMENTS,
        socials: {},
      },
      {
        id: '2',
        name: '',
        title: '',
        role: '',
        techStack: [],
        hobbies: [],
        avatarUrl: null,
        avatarCrop: DEFAULT_CROP_ADJUSTMENTS,
        socials: {},
      },
      {
        id: '3',
        name: '',
        title: '',
        role: '',
        techStack: [],
        hobbies: [],
        avatarUrl: null,
        avatarCrop: DEFAULT_CROP_ADJUSTMENTS,
        socials: {},
      },
    ],
    selectedExportFormat: 'builder-pass',
    generatedAt: new Date().toISOString(),
  };
}
