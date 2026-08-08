export type PassMode = 'solo' | 'team';
export type TeamSize = 2 | 3;
export type PassTheme = 'jungle' | 'sunset' | 'midnight';

export type ExportFormat = 
  | 'builder-pass'
  | 'team-pass'
  | 'circle-frame'
  | 'square-frame'
  | 'instagram-story'
  | 'linkedin-frame';

export interface SocialHandles {
  instagram?: string;
  x?: string;
  github?: string;
  linkedin?: string;
  portfolio?: string;
}

export interface CropAdjustments {
  x: number;
  y: number;
  zoom: number;
  rotation: number;
  brightness: number; // 50 to 150 (100 default)
  contrast: number;   // 50 to 150 (100 default)
  saturation: number; // 50 to 150 (100 default)
  aspectShape: 'circle' | 'square';
}

export interface SoloMember {
  id: string;
  name: string;
  title: string; // Generated fun title e.g. "Neural Nomad"
  role: string;
  techStack: string[];
  hobbies: string[];
  collegeOrOrg: string;
  location: string;
  motto: string;
  avatarUrl: string | null;
  avatarCrop: CropAdjustments;
  socials: SocialHandles;
}

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  role: string;
  techStack: string[];
  hobbies: string[];
  avatarUrl: string | null;
  avatarCrop: CropAdjustments;
  socials: SocialHandles;
}

export interface StudioState {
  mode: PassMode;
  teamSize: TeamSize;
  builderId: string;
  teamName: string;
  expeditionTag: string;
  theme: PassTheme;
  solo: SoloMember;
  teamMembers: TeamMember[];
  selectedExportFormat: ExportFormat;
  generatedAt: string;
}
