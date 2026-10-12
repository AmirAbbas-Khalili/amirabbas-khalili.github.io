export type SectionTint = 'blue' | 'aqua' | 'violet';

export interface SectionMeta {
  id: string;
  title: string;
  href: string;
  group: 'main' | 'hybrid';
  tagline: string;
  icon: string[];
  tint: SectionTint;
}

export const ICONS: Record<string, string[]> = {
  me: [
    'M20 21a8 8 0 1 0-16 0',
    'M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8',
  ],
  'study-path': [
    'm2 9.5 10-5 10 5-10 5z',
    'M6 12v4c0 1.7 2.7 3 6 3s6-1.3 6-3v-4',
    'M22 9.5V15',
  ],
  courses: ['m12 3 10 5.5L12 14 2 8.5z', 'm2 13.5 10 5.5 10-5.5'],
  skills: ['M8 8h8v8H8z', 'M5 5h14v14H5z', 'M12 2v3M12 19v3M2 12h3M19 12h3'],
  'work-path': [
    'M4 8h16v12H4z',
    'M9 8V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2',
    'M4 13h16',
  ],
  participations: [
    'M7 4h10v5a5 5 0 0 1-10 0z',
    'M7 6H4a3 3 0 0 0 3 4',
    'M17 6h3a3 3 0 0 1-3 4',
    'M12 14v3',
    'M8 21h8M10 17h4v4h-4z',
  ],
  goal: [
    'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18',
    'm15.5 8.5-2 5-5 2 2-5z',
  ],
  recommendations: [
    'M4 6h16v12H4z',
    'm4 7 8 6 8-6',
  ],
  'english-score': [
    'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18',
    'M3 12h18',
    'M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18',
  ],
  contact: [
    'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18',
    'M16 12v1.5a2.5 2.5 0 0 0 5 0V12a9 9 0 1 0-3.5-7.1',
    'M16 12a4 4 0 1 0-4 4',
  ],
};

export const TINT_TILE: Record<SectionTint, string> = {
  blue: 'bg-accent/10 text-accent',
  aqua: 'bg-aqua/10 text-aqua',
  violet: 'bg-violet/10 text-violet',
};

export const SECTIONS: SectionMeta[] = [
  {
    id: 'me',
    title: 'Me',
    href: '/me/',
    group: 'main',
    tagline: 'Introduction, background, and CV.',
    icon: ICONS.me,
    tint: 'blue',
  },
  {
    id: 'study-path',
    title: 'Study Path',
    href: '/study-path/',
    group: 'main',
    tagline: "Bachelor's, Master's, thesis, and articles.",
    icon: ICONS['study-path'],
    tint: 'blue',
  },
  {
    id: 'courses',
    title: 'Courses',
    href: '/courses/',
    group: 'main',
    tagline: 'Technical coursework and training.',
    icon: ICONS.courses,
    tint: 'aqua',
  },
  {
    id: 'skills',
    title: 'Expertise',
    href: '/skills/',
    group: 'main',
    tagline: 'Tools, code, and craft.',
    icon: ICONS.skills,
    tint: 'aqua',
  },
  {
    id: 'work-path',
    title: 'Work Path',
    href: '/work-path/',
    group: 'hybrid',
    tagline: 'Teaching, engineering practice, and creative work.',
    icon: ICONS['work-path'],
    tint: 'violet',
  },
  {
    id: 'participations',
    title: 'Participations',
    href: '/participations/',
    group: 'hybrid',
    tagline: 'Competitions, events, and activities.',
    icon: ICONS.participations,
    tint: 'violet',
  },
  {
    id: 'goal',
    title: 'Goal',
    href: '/goal/',
    group: 'hybrid',
    tagline: 'Long-term direction and research interests.',
    icon: ICONS.goal,
    tint: 'blue',
  },
  {
    id: 'recommendations',
    title: 'Recommendations',
    href: '/recommendations/',
    group: 'hybrid',
    tagline: 'Letters from professors.',
    icon: ICONS.recommendations,
    tint: 'aqua',
  },
  {
    id: 'english-score',
    title: 'English Score',
    href: '/english-score/',
    group: 'hybrid',
    tagline: 'Language proficiency records.',
    icon: ICONS['english-score'],
    tint: 'blue',
  },
  {
    id: 'contact',
    title: 'Contact',
    href: '/contact/',
    group: 'hybrid',
    tagline: 'Ways to get in touch.',
    icon: ICONS.contact,
    tint: 'aqua',
  },
];

export const MAIN_NAV = SECTIONS.filter((s) => s.group === 'main');
export const HYBRID_NAV = SECTIONS.filter((s) => s.group === 'hybrid');

export interface Language {
  code: string;
  label: string;
  href: string;
  enabled: boolean;
}

export const LANGUAGES: Language[] = [
  { code: 'en', label: 'EN', href: '/', enabled: true },
  { code: 'fa', label: 'فا', href: '/fa/', enabled: true },
];

export type ContactChannel = {
  id: string;
  label: string;
  handle: string;
  href: string;
  note?: string;
  featured?: boolean;
};

export const CONTACT_CHANNELS: ContactChannel[] = [
  { id: 'email', label: 'Email', handle: 'Amirkhalili.work@gmail.com', href: 'mailto:Amirkhalili.work@gmail.com', featured: true },
  { id: 'linkedin', label: 'LinkedIn', handle: 'amirjas', href: 'https://www.linkedin.com/in/amirjas', featured: true },
  { id: 'github', label: 'GitHub', handle: 'amirabbas-khalili', href: 'https://github.com/amirabbas-khalili', featured: true },
  { id: 'instagram', label: 'Instagram', handle: '@amir.khalili_nmw', href: 'https://www.instagram.com/amir.khalili_nmw/' },
  { id: 'telegram', label: 'Telegram', handle: '@Amirjas', href: 'https://t.me/Amirjas' },
];

export const BACKGROUNDS: Record<string, string | undefined> = {
  me: undefined,
  'study-path': undefined,
  courses: undefined,
  skills: undefined,
  'work-path': undefined,
  participations: undefined,
  goal: undefined,
  recommendations: undefined,
  'english-score': undefined,
  contact: undefined,
};
