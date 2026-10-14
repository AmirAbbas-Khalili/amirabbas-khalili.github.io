export interface WorkPhoto { src: string; thumbnail: string; alt: string }
export interface WorkSection { id: string; title: string; description: string; photos: WorkPhoto[]; files?: {label: string; url: string}[]; links?: {label: string; url: string}[]; showGallery?: boolean; subItems?: {title: string; description: string}[] }

export const WORK_SECTIONS: WorkSection[] = [
  {
    id: 'engineering', title: 'Civil Engineering',
    description: 'Part-time site supervision for steel-frame and reinforced-concrete construction projects, as well as renovation works. Technical office tasks, including quantity surveying, cost estimation, progress reporting, and architectural drafting using AutoCAD. University internship experience in civil engineering projects.',
    photos: [
      {
            "src": "/images/optimized/civil-1-5dae2dcbfe.webp",
            "thumbnail": "/images/work-path/civil-1-thumb.webp",
            "alt": "Concrete formwork and scaffolding viewed from below"
      },
      {
            "src": "/images/work-path/civil-2.webp",
            "thumbnail": "/images/work-path/civil-2-thumb.webp",
            "alt": "Column formwork and reinforcement on a construction floor"
      },
      {
            "src": "/images/work-path/civil-3.webp",
            "thumbnail": "/images/work-path/civil-3-thumb.webp",
            "alt": "Interior partition framing beneath a concrete slab"
      },
      {
            "src": "/images/optimized/civil-4-4d4f057477.webp",
            "thumbnail": "/images/work-path/civil-4-thumb.webp",
            "alt": "Building services pipework before floor finishing"
      },
      {
            "src": "/images/optimized/civil-5-c6e8e7d6c6.webp",
            "thumbnail": "/images/work-path/civil-5-thumb.webp",
            "alt": "Reinforced-concrete building under construction"
      },
      {
            "src": "/images/work-path/civil-6.webp",
            "thumbnail": "/images/work-path/civil-6-thumb.webp",
            "alt": "Steel fabrication work inside a building"
      },
      {
            "src": "/images/optimized/civil-7-4c8bbaddca.webp",
            "thumbnail": "/images/work-path/civil-7-thumb.webp",
            "alt": "Concrete wall and unfinished stairwell"
      },
      {
            "src": "/images/optimized/civil-8-86b12a6e71.webp",
            "thumbnail": "/images/work-path/civil-8-thumb.webp",
            "alt": "Floor concrete placement around services pipework"
      },
      {
            "src": "/images/optimized/civil-9-d7f16b204b.webp",
            "thumbnail": "/images/work-path/civil-9-thumb.webp",
            "alt": "Construction yard with reinforcing steel and site cabin"
      },
      {
            "src": "/images/optimized/civil-10-deb9cc4641.webp",
            "thumbnail": "/images/work-path/civil-10-thumb.webp",
            "alt": "Beam reinforcement and slab formwork"
      },
      {
            "src": "/images/optimized/civil-11-d5231c87a4.webp",
            "thumbnail": "/images/work-path/civil-11-thumb.webp",
            "alt": "Column reinforcement and stacked formwork panels"
      },
      {
            "src": "/images/optimized/civil-12-6f660150a0.webp",
            "thumbnail": "/images/work-path/civil-12-thumb.webp",
            "alt": "Interior plastering and finishing materials"
      },
      {
            "src": "/images/work-path/civil-13.webp",
            "thumbnail": "/images/work-path/civil-13-thumb.webp",
            "alt": "Temporary props supporting slab construction"
      },
      {
            "src": "/images/work-path/civil-14.webp",
            "thumbnail": "/images/work-path/civil-14-thumb.webp",
            "alt": "Concrete pump and mixer truck at a building site"
      }
],
  },
  {id:'teaching', title:'Teaching', description:'Teaching English at a private language institute. Preparing and recording explanations of academic and research-related topics; sharing educational content across online platforms.', photos:[
    {src:'/images/optimized/teaching-1-8f9117af9f.webp', thumbnail:'/images/optimized/teaching-1-8f9117af9f.webp', alt:'English midterm answer sheet for level F8'},
    {src:'/images/optimized/teaching-2-8c6144510d.webp', thumbnail:'/images/optimized/teaching-2-8c6144510d.webp', alt:'English class assessment and grade sheet'},
    {src:'/images/optimized/teaching-3-ea415bf5df.webp', thumbnail:'/images/optimized/teaching-3-ea415bf5df.webp', alt:'Group photograph at the language institute'}
  ]},
  {id:'photo-editing', title:'Editorial', description:'Professional photo editing at a photography studio during the COVID-19 pandemic. Managing an Instagram page and providing photo-editing services to clients.', photos:[{src:'/images/optimized/editing-portfolio-bfa08caab8.webp', thumbnail:'/images/optimized/editing-portfolio-bfa08caab8.webp', alt:'Photo editing portfolio featuring portrait retouching, double exposure, and creative digital compositions'}], links:[{label:'View Instagram', url:'https://www.instagram.com/fars.ish/'}]},
];
