export type userProgressState = {
    completedQuizes: number[];
    completedQuiz?: number;
  };
  
export type userProgressAction =
    { type: 'ADD_COMPLETED_QUIZ'; quizId: number} | { type: 'SET_COMPLETED_QUIZES'; quizIds: number[] };