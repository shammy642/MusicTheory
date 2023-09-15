import { userProgressAction, userProgressState } from "./userProgressTypes";

export const userProgressReducer = (state: userProgressState, action: userProgressAction): userProgressState => {
    switch (action.type) {
      case 'ADD_COMPLETED_QUIZ':
        return {
          ...state,
          completedQuiz: action.quizId
        };
        case 'SET_COMPLETED_QUIZES':
          if (JSON.stringify(state.completedQuizes) === JSON.stringify(action.quizIds)) {
            return state;
          }
          return {
            completedQuizes: action.quizIds
          };

      default:
        return state;
    }
  }