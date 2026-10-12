export interface RecommendationLetter {
  id: string;
  professor?: string;
  course?: string;
  year?: number;
  pdf?: string;
  scholar?: string;
  institution?: string;
  providedViaEmail?: boolean;
}
export const RECOMMENDATION_GROUPS: { title: string; letters: RecommendationLetter[] }[] = [
  {title: 'Recommendations – 2026', letters: Array.from({length:2}, (_,index) => ({id:`2026-${index+1}`, year:2026}))},
  {title: 'Recommendations – 2024', letters: [
  {
    "id": "2024-golroo",
    "pdf": "/files/recommendations/2024-golroo.pdf",
    "professor": "Dr. Amir Golroo",
    "course": "Systems Engineering",
    "scholar": "https://scholar.google.com/citations?user=b6siCZYAAAAJ&hl=en",
    "year": 2024,
    "institution": "Amirkabir University of Technology",
    "providedViaEmail": false
  },
  {
    "id": "2024-sadeghirad",
    "pdf": "/files/recommendations/2024-sadeghirad.pdf",
    "professor": "Dr. Alireza Sadeghirad",
    "course": "Strength of Materials (II) and Theory of Structures (I)",
    "scholar": "https://scholar.google.com/citations?hl=en&user=trn9SbUAAAAJ",
    "year": 2024,
    "institution": "Amirkabir University of Technology",
    "providedViaEmail": false
  },
  {
    "id": "2024-shahhosseini",
    "professor": "Dr. Vahid Shahhosseini",
    "course": "Road Construction Machinery",
    "scholar": "https://scholar.google.com/citations?user=KBK5B_MAAAAJ&hl=en",
    "year": 2024,
    "institution": "Amirkabir University of Technology",
    "providedViaEmail": true
  },
  {
    "id": "2024-khodadadi",
    "pdf": "/files/recommendations/2024-khodadadi.pdf",
    "professor": "Dr. Mojtaba Khodadadi",
    "course": "Pavement Laboratory",
    "scholar": "https://scholar.google.com/citations?user=Eopdg7UAAAAJ&hl=en",
    "year": 2024,
    "institution": "Amirkabir University of Technology",
    "providedViaEmail": false
  },
  {
    "id": "2024-homayoon",
    "pdf": "/files/recommendations/2024-homayoon.pdf",
    "professor": "Dr. Ladan Homayoon",
    "course": "Hydraulic Structures",
    "scholar": "https://scholar.google.com/citations?user=5Urmo7sAAAAJ&hl=en",
    "year": 2024,
    "institution": "Amirkabir University of Technology",
    "providedViaEmail": false
  }
]},
];
