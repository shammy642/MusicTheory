import { exercisesAction, exercisesState } from "./exercisesTypes";

export const exercisesReducer = (state: exercisesState, action: exercisesAction): exercisesState => {
    switch (action.type) {
        case 'SET_ALL_EXERCISES':
          if (JSON.stringify(state.exercises) === JSON.stringify(action.exercises)) {
            return state;
          }
          return {
            exercises: action.exercises
          };

      default:
        return state;
    }
  }