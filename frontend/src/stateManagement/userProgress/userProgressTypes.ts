export type userProgressState = {
    completedExercises: number[];
    completedExercise?: number;
  };
  
export type userProgressAction =
    { type: 'ADD_COMPLETED_EXERCISE'; exerciseId: number} | { type: 'SET_COMPLETED_EXERCISES'; exerciseIds: number[] };