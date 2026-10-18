export interface SkillCategory {
  id: string;
  title: string;
  items: string[];
  toolLabel?: string;
  tools?: string[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    "id": "engineering",
    "title": "Engineering",
    "items": [
      "Finite Element Analysis (FEA)",
      "Engineering Modeling and Simulation",
      "Structural Design and Analysis",
      "Geometric Optimization",
      "3D Printing and Additive Manufacturing"
    ],
    "toolLabel": "Software",
    "tools": [
      "COMSOL Multiphysics",
      "SIMULIA Abaqus",
      "AutoCAD",
      "Revit",
      "ETABS",
      "Civil 3D",
      "EPANET"
    ]
  },
  {
    "id": "coding",
    "title": "Programming & Data Science",
    "items": [
      "Python Programming and Engineering Tool Development",
      "Engineering Data Processing and Analysis",
      "Machine Learning and Deep Learning",
      "Data Management and Version Control",
      "Working with Kaggle Datasets and Project Notebooks"
    ],
    "toolLabel": "Tools",
    "tools": [
      "Python",
      "SQL",
      "Git",
      "GitHub"
    ]
  },
  {
    "id": "others",
    "title": "Research & Other Skills",
    "items": [
      "Research and Development (R&D)",
      "Technical Research and Documentation",
      "Teaching and Knowledge Sharing",
      "AI-Assisted Research and Engineering Workflows",
      "ICDL Skills + Power BI"
    ]
  }
];

export const SOFT_SKILLS = {
  "title": "Soft Skills",
  "items": [
    "Organization",
    "Independent and Collaborative Work",
    "Problem-Solving and Troubleshooting",
    "Quick Learning"
  ]
};
