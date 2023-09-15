import { quizesAction, quizesState } from "./quizesTypes";

export const quizesReducer = (state: quizesState, action: quizesAction): quizesState => {
    switch (action.type) {
        case 'SET_ALL_QUIZES':
          if (JSON.stringify(state.quizes) === JSON.stringify(action.quizes)) {
            return state;
          }
          return {
            quizes: action.quizes
          };

      default:
        return state;
    }
  }