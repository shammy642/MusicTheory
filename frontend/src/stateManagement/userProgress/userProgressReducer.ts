import { userProgressAction, userProgressState } from "./userProgressTypes";

export const userProgressReducer = (state: userProgressState, action: userProgressAction): userProgressState => {
    switch (action.type) {
      case 'ADD_COMPLETED_EXERCISE':
        return {
          ...state,
          completedExercise: action.exerciseId
        };
        case 'SET_COMPLETED_EXERCISES':
          if (JSON.stringify(state.completedExercises) === JSON.stringify(action.exerciseIds)) {
            return state;
          }
          return {
            completedExercises: action.exerciseIds
          };

      default:
        return state;
    }
  }