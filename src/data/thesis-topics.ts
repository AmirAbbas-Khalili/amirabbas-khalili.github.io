export const THESIS_TOPICS = [
  {id:'lattice', keyword:'3D Lattice', title:'3D Lattice — Automated Workflow', short:'Python automates graph-based lattice design, COMSOL eigenfrequency analysis, and Abaqus compression simulations.', paragraphs:[
    'A 3D lattice is a periodic, interconnected structure made of repeating three-dimensional cells. In my thesis, these structures are designed as hollow cubes with different geometries on their six faces. Each face is represented as a graph consisting of nodes and edges.',
    'The design process is automated using Python. Based on initial parameters, the code generates a graph for one face, constructs the complete six-faced cubic geometry, and transfers it to COMSOL. Eigenfrequency analysis is then performed, and the results are exported. The geometry is also saved as a STEP file and imported into Abaqus, where compression simulations are configured and run. Finally, the simulation results are exported for further analysis.'
  ]},
  {id:'vibration', keyword:'Vibration Reduction', title:'Vibration Reduction', short:'Investigating how lattice geometry shapes band gaps, with an emphasis on wider gaps at lower frequencies.', paragraphs:[
    'The primary goal of my thesis is to investigate how different geometries affect the vibration-reduction performance of cubic lattice structures. The main focus is on identifying band gaps, which are frequency ranges in which wave propagation is restricted. Wider band gaps at lower frequencies are particularly desirable because they can provide more effective solutions for vibration control in a wider range of practical applications.'
  ]},
  {id:'energy', keyword:'Energy Absorption', title:'Energy Absorption', short:'Comparing compression responses to understand energy absorption, deformation, failure, and densification.', paragraphs:[
    'This part of the research investigates how different lattice geometries influence energy absorption under compression. Force–displacement curves are analyzed to evaluate the effects of geometry on energy absorption, elastic and plastic deformation, structural failure, and the densification point, at which the structure begins to compact significantly. Comparing these responses helps identify how different geometries affect the mechanical behavior and energy absorption capacity of lattice structures.'
  ]},
  {id:'gnn', keyword:'Deep Learning (GNN)', title:'Deep Learning (GNN)', short:'Learning relationships between graph geometry and band-gap behavior from thousands of lattice samples.', paragraphs:[
    'A Graph Neural Network (GNN) is developed to learn from thousands of lattice samples and identify relationships between graph geometry and band-gap behavior. The model uses multiple neural network layers and evaluation metrics to analyze the generated data and learn how geometric features influence band-gap performance. The aim is to identify the parameters and geometric configurations associated with desirable band gaps, including their width and frequency location.'
  ]},
  {id:'recommendation', keyword:'Recommendation', title:'Recommendation', short:'Using the trained model to identify promising geometries for specific frequency and vibration-control targets.', paragraphs:[
    'Once trained, the neural network can provide useful recommendations for lattice geometries that meet specific frequency targets or vibration-control requirements. By learning from previous simulations, the model can help identify promising designs, narrow down the available options, and reduce the need for repeated computational analyses.'
  ]},
  {id:'optimization', keyword:'Optimization', title:'Optimization', short:'Exploring geometry, symmetry, member dimensions, and cell spacing to improve band-gap performance.', paragraphs:[
    'After identifying promising lattice geometries, further studies can investigate how changes in member size, curvature, symmetry, mass-to-volume ratio, and spacing between cells affect performance. Different symmetry arrangements on each face and variations in the dimensions of nodes and edges can also be explored. The goal is to understand the influence of these parameters and identify configurations that offer improved band-gap performance.'
  ]},
  {id:'validation', keyword:'Validation', title:'Validation', short:'Vibration and compression tests on 3D-printed samples were used to validate the numerical models.', paragraphs:[
    'Following numerical modeling and simulations, selected lattice structures were fabricated using 3D printing. Vibration and compression tests were performed on the printed samples, and the experimental results were compared with numerical predictions. These comparisons were used to evaluate the accuracy and reliability of the simulation models and assess how well they represent the behavior of physical structures.'
  ]},
  {id:'inverse', keyword:'Inverse Design', title:'Inverse Design', short:'A potential future extension: generating lattice geometries from target frequency ranges and design constraints.', paragraphs:[
    'Inverse design is a potential future direction. Building on the dataset and insights developed through the research, a future model could be trained to suggest or generate new lattice geometries from target frequency ranges and other design constraints. Exploring this approach could help reduce reliance on trial-and-error design and make the development of lattice structures more efficient.'
  ]},
];

export const THESIS_TITLE = 'Design and Optimization of Three-Dimensional Lattice Structures for Vibration Reduction and Energy Absorption Using Deep Learning';
export const THESIS_SUMMARY = 'An automated workflow for 3D lattice design studies vibration reduction and energy absorption. Graph neural networks support design recommendations and optimization, and the numerical models were validated experimentally; inverse design is a potential future direction.';
