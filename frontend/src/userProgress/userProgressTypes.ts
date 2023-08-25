export type userProgressState = {
    completedSections: string[]
  };
  
export type userProgressAction =
    { type: 'ADD_COMPLETED_SECTION'; sectionName: string; } | { type: 'SET_COMPLETED_SECTIONS'; sectionNames: string[] };