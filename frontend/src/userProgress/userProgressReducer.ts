import { userProgressAction, userProgressState } from "./userProgressTypes";

export const userProgressReducer = (state: userProgressState, action: userProgressAction): userProgressState => {
    switch (action.type) {
      case 'ADD_COMPLETED_SECTION':
        return {
          ...state,
          completedSections: [...state.completedSections, action.sectionName]
        };
      case 'SET_COMPLETED_SECTIONS':
        return {
          ...state,
          completedSections: state.completedSections
        };

      default:
        return state;
    }
  }