/** Shared across the Me page and Study Path. */
export const EDUCATION = [
  {id:'bachelor', title:"Bachelor's Degree", chapter:'Past', degree:'Civil Engineering', university:'Amirkabir University of Technology', location:'', gpa:'15.76/20', rank:'12th out of 102 students', class:'bg-accent'},
  {id:'master', title:"Master's Degree", chapter:'Present', degree:'Smart Building Engineering', university:'Tarbiat Modares University', location:'Tehran', gpa:'17.96/20', rank:'2nd out of 12 students', class:'bg-violet'},
].map(degree => ({...degree, info:degree.id === 'bachelor'
  ? `I earned my bachelor’s degree in ${degree.degree} from ${degree.university}.`
  : `I am pursuing a master’s degree in ${degree.degree} at ${degree.university}${degree.location ? ' in ' + degree.location : ''}.`
}));
